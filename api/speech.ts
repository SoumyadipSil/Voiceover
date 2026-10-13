import type { IncomingMessage, ServerResponse } from 'node:http'

interface SpeechRequest {
  model?: string
  input?: string
  voice?: string
  language?: string
  referenceAudio?: string
  response_format?: 'mp3' | 'pcm'
}

interface VercelRequest extends IncomingMessage {
  body?: SpeechRequest | string
}

interface VercelResponse extends ServerResponse {
  status: (code: number) => VercelResponse
  json: (payload: unknown) => VercelResponse
  send: (payload: Buffer) => VercelResponse
}

const NVIDIA_MODEL = 'nvidia/magpie-tts-zeroshot'
const NVIDIA_VOICE = 'Magpie-Multilingual.EN-US.Aria'
const OPENROUTER_MODELS = new Set(['fish-audio/s2.1-pro-free:free', 'deepgram/flux-tts:free'])
const NVIDIA_ENDPOINT = process.env.NVIDIA_TTS_URL || 'https://ai.api.nvidia.com/v1/audio/speech'
const OPENROUTER_ENDPOINT = process.env.OPENROUTER_TTS_URL || 'https://openrouter.ai/api/v1/audio/speech'
const MAX_INPUT_LENGTH = 10_000
const MAX_REFERENCE_AUDIO_BYTES = 8 * 1024 * 1024
const PROVIDER_TIMEOUT_MS = 60_000

function errorResponse(res: VercelResponse, status: number, message: string) {
  res.setHeader('Cache-Control', 'no-store')
  return res.status(status).json({ error: message })
}

function readBody(req: VercelRequest): SpeechRequest {
  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    throw new Error('Request body must be an object.')
  }
  return body as SpeechRequest
}

function decodeReferenceAudio(referenceAudio: string) {
  const base64 = referenceAudio.replace(/^data:audio\/[^;]+;base64,/, '')
  if (!/^[A-Za-z0-9+/]*={0,2}$/.test(base64) || base64.length % 4 !== 0) return null
  return Buffer.from(base64, 'base64')
}

function providerErrorMessage(payload: string) {
  try {
    const parsed = JSON.parse(payload) as { error?: { message?: string } | string }
    if (typeof parsed.error === 'string') return parsed.error
    if (parsed.error && typeof parsed.error === 'object') return parsed.error.message || ''
  } catch {
    return ''
  }
  return ''
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return errorResponse(res, 405, 'Only POST requests are supported.')

  let body: SpeechRequest
  try {
    body = readBody(req)
  } catch {
    return errorResponse(res, 400, 'Request body must be valid JSON.')
  }

  const { model, input, voice, language, referenceAudio, response_format = 'mp3' } = body
  if (!input?.trim()) return errorResponse(res, 400, 'Text input is required.')
  if (input.length > MAX_INPUT_LENGTH) return errorResponse(res, 413, `Text input is limited to ${MAX_INPUT_LENGTH.toLocaleString()} characters per request.`)
  if (model !== NVIDIA_MODEL && !OPENROUTER_MODELS.has(model || '')) {
    return errorResponse(res, 400, 'Unsupported speech model.')
  }
  if (response_format !== 'mp3' && response_format !== 'pcm') {
    return errorResponse(res, 400, 'Unsupported response format.')
  }

  const isNvidia = model === NVIDIA_MODEL
  const apiKey = isNvidia ? process.env.NVIDIA_API_KEY : process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    return errorResponse(res, 503, isNvidia ? 'NVIDIA TTS is not configured on the server.' : 'OpenRouter TTS is not configured on the server.')
  }

  if (isNvidia && !referenceAudio) {
    return errorResponse(res, 400, 'NVIDIA zero-shot TTS requires a short reference audio sample.')
  }

  const referenceBytes = referenceAudio ? decodeReferenceAudio(referenceAudio) : null
  if (isNvidia && (!referenceBytes || referenceBytes.length === 0)) {
    return errorResponse(res, 400, 'Reference audio must be a valid base64 audio file.')
  }
  if (referenceBytes && referenceBytes.length > MAX_REFERENCE_AUDIO_BYTES) {
    return errorResponse(res, 413, 'Reference audio must be smaller than 8 MB.')
  }

  const providerPayload: Record<string, unknown> = {
    model,
    input: input.trim(),
    response_format,
  }

  if (voice) providerPayload.voice = voice
  if (language) providerPayload.language = language
  if (isNvidia) {
    providerPayload.voice = voice || NVIDIA_VOICE
    providerPayload.audio_prompt = referenceAudio!.replace(/^data:[^;]+;base64,/, '')
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), PROVIDER_TIMEOUT_MS)

  try {
    const providerResponse = await fetch(isNvidia ? NVIDIA_ENDPOINT : OPENROUTER_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Accept: response_format === 'mp3' ? 'audio/mpeg' : 'audio/pcm',
        ...(isNvidia ? {} : { 'HTTP-Referer': process.env.OPENROUTER_SITE_URL || '' }),
      },
      body: JSON.stringify(providerPayload),
      signal: controller.signal,
    })

    if (!providerResponse.ok) {
      const errorText = await providerResponse.text()
      console.error('Speech provider rejected the request', {
        model,
        status: providerResponse.status,
        message: providerErrorMessage(errorText) || errorText.slice(0, 500),
      })
      return errorResponse(res, 502, 'The speech provider rejected the request.')
    }

    const audio = Buffer.from(await providerResponse.arrayBuffer())
    if (audio.length === 0) return errorResponse(res, 502, 'The speech provider returned an empty audio response.')

    res.status(200)
    res.setHeader('Content-Type', response_format === 'mp3' ? 'audio/mpeg' : 'audio/pcm')
    res.setHeader('Content-Length', audio.length)
    res.setHeader('Cache-Control', 'private, no-store')
    return res.send(audio)
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return errorResponse(res, 504, 'Speech generation timed out. Please try again.')
    }
    console.error('Speech provider request failed', error)
    return errorResponse(res, 502, 'Unable to reach the speech provider.')
  } finally {
    clearTimeout(timeout)
  }
}
