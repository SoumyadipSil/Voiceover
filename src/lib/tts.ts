export type TtsModelId = 'nvidia/magpie-tts-zeroshot' | 'fish-audio/s2.1-pro-free' | 'deepgram/flux-tts'

export type TtsResponseFormat = 'mp3' | 'pcm'

export const ttsModels: Array<{
  id: TtsModelId
  name: string
  provider: string
  description: string
  requiresReferenceAudio?: boolean
}> = [
  {
    id: 'nvidia/magpie-tts-zeroshot',
    name: 'Magpie Zero-Shot',
    provider: 'NVIDIA NIM',
    description: 'Expressive synthesis from a short reference sample.',
    requiresReferenceAudio: true,
  },
  {
    id: 'deepgram/flux-tts',
    name: 'Flux TTS',
    provider: 'OpenRouter',
    description: 'Fast production voices with a broad English voice library.',
  },
  {
    id: 'fish-audio/s2.1-pro-free',
    name: 'S2.1 Pro',
    provider: 'OpenRouter',
    description: 'Natural expressive speech with provider-specific voice IDs.',
  },
]

export const deepgramVoices = [
  'flux-alexis-en', 'flux-bree-en', 'flux-brittany-en', 'flux-brooke-en', 'flux-bruce-en',
  'flux-cliff-en', 'flux-cole-en', 'flux-colin-en', 'flux-conor-en', 'flux-donovan-en',
  'flux-drew-en', 'flux-elise-en', 'flux-gemma-en', 'flux-haley-en', 'flux-hannah-en',
  'flux-heather-en', 'flux-jack-en', 'flux-kai-en', 'flux-kelsey-en', 'flux-kit-en',
  'flux-maeve-en', 'flux-marcelo-en', 'flux-marcus-en', 'flux-meena-en', 'flux-meghan-en',
  'flux-miles-en', 'flux-naveen-en', 'flux-paige-en', 'flux-priya-en', 'flux-rufus-en',
  'flux-sean-en', 'flux-sharon-en', 'flux-sienna-en', 'flux-tanner-en', 'flux-wade-en',
  'flux-wes-en',
]

export const fishAudioVoice = 'b347db033a6549378b48d00acb0d06cd'

export interface SynthesizeSpeechRequest {
  model: TtsModelId
  input: string
  voice?: string
  language?: string
  referenceAudio?: string
  responseFormat?: TtsResponseFormat
}

export async function synthesizeSpeech(request: SynthesizeSpeechRequest): Promise<Blob> {
  const response = await fetch('/api/speech', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...request,
      response_format: request.responseFormat ?? 'mp3',
    }),
  })

  if (!response.ok) {
    let message = `Speech generation failed (${response.status})`
    try {
      const payload = await response.json() as { error?: string }
      if (payload.error) message = payload.error
    } catch {
      // Preserve the HTTP status when the provider returns a non-JSON error.
    }
    throw new Error(message)
  }

  return response.blob()
}
