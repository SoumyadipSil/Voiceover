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
  body?: SpeechRequest
}

interface VercelResponse extends ServerResponse {
  status: (code: number) => VercelResponse
  json: (payload: unknown) => VercelResponse
  send: (payload: Buffer) => VercelResponse
}

const NVIDIA_MODEL = 'nvidia/magpie-tts-zeroshot'
const OPENROUTER_MODELS = new Set(['fish-audio/s2.1-pro-free', 'deepgram/flux-tts'])
const NVIDIA_ENDPOINT = process.env.NVIDIA_TTS_URL || 'https://ai.api.nvidia.com/v1/audio/speech'
const OPENROUTER_ENDPOINT = 'https://openrouter.ai/api/v1/audio/speech'

function errorResponse(res: VercelResponse, status: number, message: string) {
  return res.status(status).json({ error: message })
}

function readBody(req: VercelRequest): SpeechRequest {
  if (typeof req.body === 'string') return JSON.parse(req.body) as SpeechRequest
  return req.body || {}
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
  if (input.length > 10000) return errorResponse(res, 413, 'Text input is limited to 10,000 characters per request.')
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

  const providerPayload: Record<string, unknown> = {
    model,
    input,
    response_format,
  }

  if (voice) providerPayload.voice = voice
  if (language) providerPayload.language = language
  if (isNvidia && referenceAudio) providerPayload.audio_prompt = referenceAudio

  try {
    const providerResponse = await fetch(isNvidia ? NVIDIA_ENDPOINT : OPENROUTER_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        ...(isNvidia ? {} : { 'HTTP-Referer': process.env.OPENROUTER_SITE_URL || '' }),
      },
      body: JSON.stringify(providerPayload),
    })

    if (!providerResponse.ok) {
      const errorText = await providerResponse.text()
      let message = errorText || `Provider request failed (${providerResponse.status})`
      try {
        const parsed = JSON.parse(errorText) as { error?: { message?: string } | string }
        if (typeof parsed.error === 'string') message = parsed.error
        if (parsed.error && typeof parsed.error === 'object' && parsed.error.message) message = parsed.error.message
      } catch {
        // Keep the provider's plain-text message.
      }
      return errorResponse(res, providerResponse.status, message)
    }

    const audio = Buffer.from(await providerResponse.arrayBuffer())
    res.status(200)
    res.setHeader('Content-Type', response_format === 'mp3' ? 'audio/mpeg' : 'audio/pcm')
    res.setHeader('Content-Length', audio.length)
    res.setHeader('Cache-Control', 'private, no-store')
    return res.send(audio)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to reach the speech provider.'
    return errorResponse(res, 502, message)
  }
}
