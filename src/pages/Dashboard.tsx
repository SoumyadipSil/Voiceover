import { useEffect, useRef, useState } from 'react'
import PaywallModal from '../components/PaywallModal'
import { deepgramVoices, fishAudioVoice, synthesizeSpeech, ttsModels, type TtsModelId } from '../lib/tts'

const voices = [
  { name: 'Kabir', lang: 'HI / EN', style: 'Warm Narrative', avatar: 'K' },
  { name: 'Ananya', lang: 'BN / EN', style: 'Expressive', avatar: 'A' },
  { name: 'Rohan', lang: 'EN (IN)', style: 'Deep Docu', avatar: 'R' },
  { name: 'Priya', lang: 'HI / EN', style: 'Fast-Paced YT', avatar: 'P' },
  { name: 'Arjun', lang: 'Bengali', style: 'Authoritative', avatar: 'J' },
  { name: 'Meera', lang: 'HI / EN', style: 'Calm & Clear', avatar: 'M' },
]

const voiceOptions = [
  { id: 'richard', name: 'Richard', label: 'authoritative, deeply resonant voice', gender: 'Male', tags: ['American', 'Narrative & Story'], tone: 'Middle-aged Male', accent: 'American' },
  { id: 'ariana', name: 'Ariana', label: 'sassy & husky tone', gender: 'Female', tags: ['American', 'Animation & Characters'], tone: 'Female', accent: 'American' },
  { id: 'carter', name: 'Carter', label: 'relaxed, friendly & confident', gender: 'Male', tags: ['American', 'Conversational'], tone: 'Young Male', accent: 'American' },
  { id: 'ella', name: 'Ella', label: 'calm and soft spoken', gender: 'Female', tags: ['British', 'Social Media'], tone: 'Female', accent: 'British' },
  { id: 'avery', name: 'Avery', label: 'youthful & energetic tone', gender: 'Female', tags: ['American', 'Conversational'], tone: 'Young Female', accent: 'American' },
  { id: 'sophie', name: 'Sophie', label: 'lively and upbeat voice', gender: 'Female', tags: ['American', 'Advertisement'], tone: 'Female', accent: 'American' },
  { id: 'ethan', name: 'Ethan', label: 'versatile narrator', gender: 'Male', tags: ['American', 'Narrative & Story'], tone: 'Male', accent: 'American' },
  { id: 'grace', name: 'Grace', label: 'confident teenager', gender: 'Female', tags: ['American', 'Commercial'], tone: 'Teen Female', accent: 'American' },
]

type VoiceOption = (typeof voiceOptions)[number]

const deepgramVoiceOptions: VoiceOption[] = deepgramVoices.map(voiceId => {
  const name = voiceId.replace('flux-', '').replace('-en', '').replace(/-/g, ' ')
  return {
    id: voiceId,
    name: name.replace(/\b\w/g, character => character.toUpperCase()),
    label: 'Deepgram Flux production voice',
    gender: 'Voice',
    tags: ['English', 'Flux TTS'],
    tone: 'English (US)',
    accent: 'English',
  }
})

const fishVoiceOptions: VoiceOption[] = [{
  id: fishAudioVoice,
  name: 'S2.1 Pro',
  label: 'natural expressive provider voice',
  gender: 'Voice',
  tags: ['Expressive', 'Fish Audio'],
  tone: 'Provider voice',
  accent: 'Multilingual',
}]

const nvidiaVoiceOptions: VoiceOption[] = [{
  id: 'nvidia-reference',
  name: 'Reference Voice',
  label: 'voice cloned from your uploaded sample',
  gender: 'Your sample',
  tags: ['Zero-shot', 'NVIDIA NIM'],
  tone: 'Reference sample',
  accent: 'Sample-based',
}]

const voiceCatalog: Record<TtsModelId, VoiceOption[]> = {
  'nvidia/magpie-tts-zeroshot': nvidiaVoiceOptions,
  'deepgram/flux-tts:free': deepgramVoiceOptions,
  'fish-audio/s2.1-pro-free:free': fishVoiceOptions,
}

const emotions = ['Neutral', 'Calm', 'Happy', 'Sad', 'Dramatic', 'Fearful', 'Energetic', 'Whisper']

const waveBarHeights = [12, 20, 36, 24, 48, 32, 16, 44, 36, 56, 28, 40, 52, 20, 60, 36, 48, 24, 40, 64, 28, 52, 16, 44, 36, 56, 24, 48, 32, 60, 20, 44, 36, 52, 28, 40, 64, 24, 16, 48, 28, 36, 52, 20, 44, 60, 32, 40, 16, 24, 48, 36, 56, 28, 44, 20, 60, 32, 48, 24, 36, 52, 16, 40]

function WaveformPlayer({
  isPlaying,
  audioUrl,
  onPlayingChange,
}: {
  isPlaying: boolean
  audioUrl: string
  onPlayingChange: (playing: boolean) => void
}) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const waveformRef = useRef<HTMLDivElement>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playbackRate, setPlaybackRate] = useState(1)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !audioUrl) return

    audio.load()
    audio.play().then(() => onPlayingChange(true)).catch(() => onPlayingChange(false))
  }, [audioUrl, onPlayingChange])

  const togglePlayback = () => {
    const audio = audioRef.current
    if (!audioUrl || !audio) return

    if (audio.paused) {
      audio.play().then(() => onPlayingChange(true)).catch(() => onPlayingChange(false))
    } else {
      audio.pause()
      onPlayingChange(false)
    }
  }

  const seekBy = (seconds: number) => {
    const audio = audioRef.current
    if (!audioUrl || !audio) return
    audio.currentTime = Math.max(0, Math.min(audio.duration || 0, audio.currentTime + seconds))
  }

  const seekToPointer = (event: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    const waveform = waveformRef.current
    if (!audioUrl || !audio || !waveform || !duration) return
    const bounds = waveform.getBoundingClientRect()
    const position = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width))
    audio.currentTime = position * duration
  }

  const changePlaybackRate = () => {
    const nextRate = playbackRate === 1.25 ? 0.75 : playbackRate === 0.75 ? 1 : 1.25
    setPlaybackRate(nextRate)
    if (audioRef.current) audioRef.current.playbackRate = nextRate
  }

  const downloadAudio = () => {
    if (!audioUrl) return
    const link = document.createElement('a')
    link.href = audioUrl
    link.download = 'voiceover-generation.mp3'
    link.click()
  }

  const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds)) return '00:00'
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
  }

  const progress = duration > 0 ? currentTime / duration : 0

  return (
    <div
      className="rounded-xl p-4"
      style={{ background: '#0a0c13', border: '1px solid #151c2e' }}
    >
      <div className="flex items-center justify-between mb-2">
        <span style={{ color: '#00d2df', fontSize: '12px', fontFamily: 'monospace', fontWeight: 700 }}>
          {formatTime(currentTime)}
        </span>
        <span
          style={{ color: '#f59e0b', fontSize: '12px', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: 4 }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <rect x="1" y="3" width="8" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
            <path d="M3.5 3V2a1.5 1.5 0 013 0v1" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          Paywall at 01:00
        </span>
        <span style={{ color: '#4f5a72', fontSize: '12px', fontFamily: 'monospace' }}>{formatTime(duration)}</span>
      </div>

      <div
        ref={waveformRef}
        onClick={seekToPointer}
        role="slider"
        aria-label="Audio progress"
        aria-valuemin={0}
        aria-valuemax={duration || 0}
        aria-valuenow={currentTime}
        tabIndex={audioUrl ? 0 : -1}
        className="relative flex items-center gap-[2px] overflow-hidden"
        style={{ height: 72, cursor: audioUrl ? 'pointer' : 'default' }}
      >
        {waveBarHeights.map((h, i) => (
          <div
            key={i}
            className={isPlaying ? 'animate-wave-bar' : ''}
            style={{
              width: '3px',
              height: `${h}px`,
              borderRadius: '2px',
              background: i / waveBarHeights.length < progress ? '#00d2df' : '#1e2a40',
              opacity: i / waveBarHeights.length < progress ? (0.4 + (h / 64) * 0.6) : 0.3,
              flexShrink: 0,
              animationDuration: isPlaying ? `${0.8 + (i % 7) * 0.12}s` : undefined,
              animationDelay: isPlaying ? `${(i % 11) * 0.08}s` : undefined,
              transformOrigin: 'center',
            }}
          />
        ))}

        <div
          className="absolute top-0 bottom-0 w-0.5 flex flex-col items-center pointer-events-none"
          style={{ left: `${progress * 100}%`, background: 'rgba(240,244,255,0.9)' }}
        >
          <div
            style={{ width: 10, height: 10, borderRadius: '50%', background: '#00d2df', boxShadow: '0 0 8px #00d2df', marginTop: -5 }}
          />
        </div>

      </div>

      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => seekBy(-10)}
            aria-label="Skip back 10 seconds"
            style={{ width: 32, height: 32, borderRadius: 8, background: '#111520', border: '1px solid #1e2a40', color: '#8892aa', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: audioUrl ? 'pointer' : 'default', opacity: audioUrl ? 1 : 0.5 }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M12 2L2 7l10 5V2z" fill="currentColor" opacity="0.5" />
              <line x1="2" y1="2" x2="2" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={togglePlayback}
            aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
            style={{
              width: 40, height: 40, borderRadius: '50%', background: '#00d2df', color: '#090A0F',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              boxShadow: '0 0 16px rgba(0,210,223,0.4)',
              border: 'none',
              opacity: audioUrl ? 1 : 0.5,
            }}
          >
            {isPlaying ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                <rect x="1" y="1" width="4.5" height="12" />
                <rect x="8.5" y="1" width="4.5" height="12" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                <path d="M2 1l11 6-11 6V1z" />
              </svg>
            )}
          </button>
          <button
            type="button"
            onClick={() => seekBy(10)}
            aria-label="Skip forward 10 seconds"
            style={{ width: 32, height: 32, borderRadius: 8, background: '#111520', border: '1px solid #1e2a40', color: '#8892aa', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: audioUrl ? 'pointer' : 'default', opacity: audioUrl ? 1 : 0.5 }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2l10 5-10 5V2z" fill="currentColor" opacity="0.5" />
              <line x1="12" y1="2" x2="12" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          <div
            className="flex items-center rounded-lg overflow-hidden"
            style={{ background: '#111520', border: '1px solid #1e2a40' }}
          >
            {['0.75x', '1.0x', '1.25x'].map(s => (
              <button
                key={s}
                type="button"
                onClick={() => { const rate = Number.parseFloat(s); setPlaybackRate(rate); if (audioRef.current) audioRef.current.playbackRate = rate }}
                style={{
                  padding: '4px 8px',
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  color: playbackRate === Number.parseFloat(s) ? '#00d2df' : '#4f5a72',
                  fontWeight: playbackRate === Number.parseFloat(s) ? 700 : 400,
                  background: playbackRate === Number.parseFloat(s) ? 'rgba(0,210,223,0.1)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={downloadAudio}
            disabled={!audioUrl}
            aria-label="Download MP3"
            className="btn-ghost px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5"
            style={{ opacity: audioUrl ? 1 : 0.5 }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1v7M2.5 5l3.5 3.5L9.5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              <line x1="1" y1="11" x2="11" y2="11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            Export MP3
          </button>
          <button
            type="button"
            onClick={changePlaybackRate}
            disabled={!audioUrl}
            aria-label="Change playback speed"
            className="btn-ghost px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5"
            style={{ opacity: audioUrl ? 1 : 0.5 }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M4 6h4M6 4v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            Speed {playbackRate.toFixed(2)}x
          </button>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={audioUrl || undefined}
        preload="metadata"
        className="hidden"
        onLoadedMetadata={event => setDuration(event.currentTarget.duration)}
        onTimeUpdate={event => setCurrentTime(event.currentTarget.currentTime)}
        onPlay={() => onPlayingChange(true)}
        onPause={() => onPlayingChange(false)}
        onEnded={() => {
          setCurrentTime(0)
          onPlayingChange(false)
        }}
      />
    </div>
  )
}

export default function Dashboard({ onShowPaywall }: { onShowPaywall?: () => void }) {
  const [selectedVoice, setSelectedVoice] = useState(0)
  const [showVoicePanel, setShowVoicePanel] = useState(false)
  const [selectedModel, setSelectedModel] = useState<TtsModelId>('nvidia/magpie-tts-zeroshot')
  const [providerVoice, setProviderVoice] = useState('flux-priya-en')
  const [referenceAudio, setReferenceAudio] = useState('')
  const [voiceSearch, setVoiceSearch] = useState('')
  const [voiceGender, setVoiceGender] = useState('All genders')
  const [voiceAccent, setVoiceAccent] = useState('All accents')
  const [voiceCategory, setVoiceCategory] = useState('All categories')
  const [selectedEmotion, setSelectedEmotion] = useState('Neutral')
  const [script, setScript] = useState(`In the sweltering autumn of 476 AD, the Western Roman Empire did not collapse with an apocalyptic roar. It surrendered with a tired, silent whimper.

General Odoacer marched into Ravenna, deposing sixteen-year-old Romulus Augustulus without shedding a single drop of imperial blood. The golden standards were packed into wooden chests and dispatched to Constantinople.`)
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioUrl, setAudioUrl] = useState('')
  const [showPaywallState, setShowPaywallState] = useState(false)
  const [generationError, setGenerationError] = useState('')
  const [pace, setPace] = useState(1.05)
  const [pitch, setPitch] = useState(-1.2)
  const [breathiness, setBreathiness] = useState(18)
  const scriptInputRef = useRef<HTMLTextAreaElement>(null)

  const wordCount = script.trim() ? script.trim().split(/\s+/).length : 0
  const charCount = script.length
  const estDurationSecs = Math.round(wordCount / 2.5)
  const estDurationStr = estDurationSecs > 60
    ? `${Math.floor(estDurationSecs / 60)}m ${estDurationSecs % 60}s`
    : `${estDurationSecs}s`

  const freeMinutes = 60

  const openPaywall = () => {
    setShowPaywallState(true)
    onShowPaywall?.()
  }

  const handleGenerate = async () => {
    if (estDurationSecs > freeMinutes) {
      openPaywall()
      return
    }

    setGenerationError('')
    setGenerating(true)
    setGenerated(false)

    try {
      const audioBlob = await synthesizeSpeech({
        model: selectedModel,
        input: script.trim(),
        voice: selectedModel === 'nvidia/magpie-tts-zeroshot' ? undefined : selectedModel === 'fish-audio/s2.1-pro-free:free' ? fishAudioVoice : providerVoice,
        referenceAudio: selectedModel === 'nvidia/magpie-tts-zeroshot' ? referenceAudio : undefined,
        responseFormat: 'mp3',
      })
      setAudioUrl(currentUrl => {
        if (currentUrl) URL.revokeObjectURL(currentUrl)
        return URL.createObjectURL(audioBlob)
      })
      setGenerating(false)
      setGenerated(true)
      setIsPlaying(true)
    } catch (error) {
      setGenerating(false)
      setGenerationError(error instanceof Error ? error.message : 'Unable to generate audio.')
    }
  }

  const insertScriptCommand = (command: 'pause' | 'emphasis' | 'whisper') => {
    const textarea = scriptInputRef.current
    const start = textarea?.selectionStart ?? script.length
    const end = textarea?.selectionEnd ?? start
    const selectedText = script.slice(start, end)
    const marker = command === 'pause' ? '[pause=1.0s]' : command === 'emphasis' ? '[emphasis]' : '[whisper]'
    const closingMarker = command === 'pause' ? '' : `[/ ${command}]`.replace('/ ', '/')
    const insertion = selectedText ? `${marker}${selectedText}${closingMarker}` : `${marker} `
    const nextScript = `${script.slice(0, start)}${insertion}${script.slice(end)}`
    setScript(nextScript)

    requestAnimationFrame(() => {
      textarea?.focus()
      const cursorPosition = start + insertion.length
      textarea?.setSelectionRange(cursorPosition, cursorPosition)
    })
  }

  const availableVoices = voiceCatalog[selectedModel]
  const filteredVoices = availableVoices.filter(voice => {
    const query = voiceSearch.trim().toLowerCase()
    const matchesSearch = !query || `${voice.name} ${voice.label} ${voice.tags.join(' ')}`.toLowerCase().includes(query)
    const matchesGender = voiceGender === 'All genders' || voice.gender === voiceGender
    const matchesAccent = voiceAccent === 'All accents' || voice.accent === voiceAccent
    const matchesCategory = voiceCategory === 'All categories' || voice.tags.includes(voiceCategory)
    return matchesSearch && matchesGender && matchesAccent && matchesCategory
  })
  const activeVoice = availableVoices[selectedVoice % availableVoices.length]
  const selectedVoiceSummary = {
    name: activeVoice.name,
    style: activeVoice.tone,
    lang: activeVoice.accent,
    avatar: activeVoice.name.charAt(0).toUpperCase(),
  }
  const selectedModelConfig = ttsModels.find(model => model.id === selectedModel) ?? ttsModels[0]

  const handleReferenceAudioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('audio/')) {
      setGenerationError('Choose an audio file for the NVIDIA reference sample.')
      return
    }

    if (file.size > 8 * 1024 * 1024) {
      setGenerationError('Reference audio must be smaller than 8 MB.')
      return
    }

    const reader = new FileReader()
    reader.onload = () => setReferenceAudio(String(reader.result))
    reader.readAsDataURL(file)
    setGenerationError('')
  }

  const handleModelChange = (modelId: TtsModelId) => {
    setSelectedModel(modelId)
    setSelectedVoice(0)
    setVoiceSearch('')
    setVoiceGender('All genders')
    setVoiceAccent('All accents')
    setVoiceCategory('All categories')
    if (modelId === 'deepgram/flux-tts:free') setProviderVoice(deepgramVoices[0])
  }

  return (
    <div className="flex h-full flex-col gap-5 overflow-y-auto p-5">
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(300px,0.95fr)]">
        <div className="flex flex-col gap-5">
          <div
            className="rounded-2xl border p-3"
            style={{ background: '#0D0F17', borderColor: '#1e2a40' }}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl text-lg font-semibold"
                  style={{ background: '#00d2df', color: '#0b1220' }}
                >
                    {selectedVoiceSummary.avatar}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                      <span>{selectedVoiceSummary.name}</span>
                    <span className="font-medium text-[#4f5a72]">—</span>
                      <span className="font-medium text-[#8892aa]">{selectedVoiceSummary.style}</span>
                  </div>
                    <div className="text-[11px] uppercase tracking-[0.12em] text-[#4f5a72]">{selectedVoiceSummary.lang} · {selectedModelConfig.provider} · {selectedModelConfig.name}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setShowVoicePanel(true)} className="rounded-lg border px-3 py-1.5 text-[11px] font-medium" style={{ background: '#111520', borderColor: '#1e2a40', color: '#8892aa' }}>
                  Change Voice
                </button>
              </div>
            </div>
          </div>

          <div
            className="rounded-2xl border p-4"
            style={{ background: '#0D0F17', borderColor: '#1e2a40' }}
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => insertScriptCommand('pause')} className="rounded-lg border px-2.5 py-1.5 text-[11px] font-medium" style={{ background: '#111520', borderColor: '#1e2a40', color: '#8892aa' }}>
                  + Insert Pause
                </button>
                <button type="button" onClick={() => insertScriptCommand('emphasis')} className="rounded-lg border px-2.5 py-1.5 text-[11px] font-medium" style={{ background: '#111520', borderColor: '#1e2a40', color: '#8892aa' }}>
                  Emphasis
                </button>
                <button type="button" onClick={() => insertScriptCommand('whisper')} className="rounded-lg border px-2.5 py-1.5 text-[11px] font-medium" style={{ background: '#111520', borderColor: '#1e2a40', color: '#8892aa' }}>
                  Whisper
                </button>
              </div>

              <button
                type="button"
                className="text-[12px] font-medium"
                style={{ color: '#4f5a72' }}
                onClick={() => setScript('')}
              >
                Clear
              </button>
            </div>

            <div className="rounded-xl border p-4" style={{ background: '#111520', borderColor: '#151c2e' }}>
              <textarea
                ref={scriptInputRef}
                className="w-full resize-none border-none bg-transparent text-[15px] leading-8 outline-none"
                style={{ color: '#F0F4FF', minHeight: 170, fontFamily: 'inherit' }}
                value={script}
                onChange={event => setScript(event.target.value)}
                placeholder="Paste your script here..."
              />

              <div className="mt-3 flex items-center justify-between gap-2 border-t border-[#151c2e] pt-3 text-[12px]">
                <div className="flex items-center gap-4 text-[#4f5a72]">
                  <span>
                    Words: <strong className="text-white">{wordCount}</strong>
                  </span>
                  <span>
                    Chars: <strong className="text-white">{charCount.toLocaleString()}</strong>
                  </span>
                  <span>
                    Est. Duration: <strong style={{ color: '#00d2df' }}>{estDurationStr}</strong>
                  </span>
                </div>

                {estDurationSecs > freeMinutes && (
                  <span className="flex items-center gap-1.5" style={{ color: '#f59e0b' }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M6 2L1 10h10L6 2z" stroke="currentColor" strokeWidth="1.2" />
                      <line x1="6" y1="5.5" x2="6" y2="7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      <circle cx="6" cy="9" r="0.5" fill="currentColor" />
                    </svg>
                    Exceeds free limit
                  </span>
                )}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="text-[12px] text-[#4f5a72]">
                Engine: <span style={{ color: '#00d2df' }}>{selectedModelConfig.provider} · {selectedModelConfig.name}</span>
              </div>

              <button
                type="button"
                onClick={handleGenerate}
                className="flex items-center gap-2 rounded-xl px-7 py-3 text-sm font-semibold"
                disabled={generating || !script.trim()}
                style={{
                  background: '#00d2df',
                  color: '#090A0F',
                  boxShadow: '0 0 24px rgba(0,210,223,0.35)',
                  opacity: generating || !script.trim() ? 0.7 : 1,
                }}
              >
                {generating ? (
                  <>
                    <span className="h-4 w-4 rounded-full border-2 border-[#090A0F]/30 border-t-[#090A0F]" style={{ display: 'inline-block', animation: 'spin-slow 0.7s linear infinite' }} />
                    Synthesizing voice...
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                      <path d="M8 1L2 7h4v8h4V7h4L8 1z" />
                    </svg>
                    Generate Studio Audio
                  </>
                )}
              </button>
              {generationError && <p className="mt-3 text-right text-xs text-red-300">{generationError}</p>}
            </div>
          </div>

          <div
            className="rounded-2xl border p-4"
            style={{ background: '#0D0F17', borderColor: '#1e2a40' }}
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: '#10f0b0', boxShadow: '0 0 8px #10f0b0' }} />
                <span className="text-sm font-semibold text-white">Master Audio Track</span>
                <span className="text-[11px] font-mono text-[#4f5a72]">take_04_kabir_rome.wav</span>
              </div>

              <button type="button" className="rounded-lg border px-3 py-1.5 text-[11px] font-medium" style={{ background: '#111520', borderColor: '#1e2a40', color: '#8892aa' }}>
                + Generate Another
              </button>
            </div>

            <WaveformPlayer isPlaying={isPlaying} audioUrl={audioUrl} onPlayingChange={setIsPlaying} />
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div
            className="rounded-2xl border p-4"
            style={{ background: '#0D0F17', borderColor: '#1e2a40' }}
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span style={{ color: '#10f0b0' }}>◆</span>
                <span className="text-sm font-semibold text-white">Emotional Delivery</span>
              </div>
              <span className="text-[11px] text-[#4f5a72]">v2.1 Latent</span>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              {emotions.map(emotion => (
                <button
                  key={emotion}
                  type="button"
                  onClick={() => setSelectedEmotion(emotion)}
                  className="rounded-lg border px-3 py-1.5 text-[11px] font-medium transition-all"
                  style={{
                    background: selectedEmotion === emotion ? 'rgba(0,210,223,0.12)' : '#111520',
                    borderColor: selectedEmotion === emotion ? 'rgba(0,210,223,0.3)' : '#1e2a40',
                    color: selectedEmotion === emotion ? '#00d2df' : '#8892aa',
                    boxShadow: selectedEmotion === emotion ? '0 0 12px rgba(0,210,223,0.12)' : 'none',
                  }}
                >
                  {emotion}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {[
                { label: 'Pacing Speed', value: pace, set: setPace, min: 0.75, max: 1.5, step: 0.05, fmt: (v: number) => `${v.toFixed(2)}x`, leftLabel: 'Deep', rightLabel: 'High Retention' },
                { label: 'Pitch & Resonance', value: pitch, set: setPitch, min: -6, max: 6, step: 0.2, fmt: (v: number) => `${v > 0 ? '+' : ''}${v.toFixed(1)} st`, leftLabel: 'Neutral', rightLabel: 'Bright' },
                { label: 'Breathiness', value: breathiness, set: setBreathiness, min: 0, max: 100, step: 1, fmt: (v: number) => `${v}%`, leftLabel: 'Radio Gate', rightLabel: 'Organic' },
              ].map(control => (
                <div key={control.label} className="rounded-xl border p-3" style={{ background: '#111520', borderColor: '#151c2e' }}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[12px] font-medium text-[#8892aa]">{control.label}</span>
                    <span className="font-mono text-[12px] font-bold" style={{ color: '#00d2df' }}>{control.fmt(control.value)}</span>
                  </div>
                  <input
                    type="range"
                    min={control.min}
                    max={control.max}
                    step={control.step}
                    value={control.value}
                    onChange={event => control.set(Number(event.target.value))}
                    className="w-full"
                    style={{ accentColor: '#00d2df', height: 4 }}
                  />
                  <div className="mt-2 flex items-center justify-between text-[10px] text-[#4f5a72]">
                    <span>{control.leftLabel}</span>
                    <span>{control.rightLabel}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="rounded-2xl border p-4"
            style={{ background: '#0D0F17', borderColor: '#1e2a40' }}
          >
            <div className="mb-2 flex items-center gap-2">
              <span style={{ color: '#00d2df' }}>↑</span>
              <span className="text-sm font-semibold text-white">YouTube Retention Meter</span>
            </div>

            <p className="mb-3 text-[12px] leading-6 text-[#8892aa]">
              {selectedVoiceSummary.name}'s current pacing delivers an estimated <strong className="text-white">64.8% average view duration</strong> for history essays based on 14,000 channels.
            </p>

            <div className="overflow-hidden rounded-md border" style={{ background: '#111520', borderColor: '#151c2e', height: 8 }}>
              <div style={{ width: '72%', height: '100%', background: 'linear-gradient(90deg, #10f0b0, #00d2df)' }} />
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px]">
              <span style={{ color: '#4f5a72' }}>Baseline: 42%</span>
              <span style={{ color: '#10f0b0', fontWeight: 700 }}>+22.8% vs average</span>
            </div>
          </div>

          <div
            className="rounded-2xl border p-4"
            style={{ background: '#0D0F17', borderColor: '#1e2a40' }}
          >
            <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#4f5a72]">
              Studio Export Integrations
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Premiere XML', icon: '🎬' },
                { label: 'CapCut Sync', icon: '📱' },
                { label: 'Stems / Vocal', icon: '🎚️' },
                { label: 'Timecode SRT', icon: '📄' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-2 rounded-lg border p-2.5" style={{ background: '#111520', borderColor: '#151c2e' }}>
                  <span className="text-sm">{item.icon}</span>
                  <span className="text-[12px] text-[#8892aa]">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showPaywallState && (
        <PaywallModal
          onClose={() => setShowPaywallState(false)}
          onUpgrade={() => setShowPaywallState(false)}
        />
      )}

      {showVoicePanel && (
        <div className="voice-selection-backdrop fixed inset-0 z-50 flex items-start justify-center bg-black/55 p-4 pt-8">
          <div className="voice-selection-modal w-full max-w-[1200px] overflow-hidden rounded-2xl border border-[#dfe7f3] bg-[#f5f7fb] shadow-2xl">
            <div className="voice-selection-header flex items-center justify-between border-b border-[#e5e9f2] bg-white px-5 py-4">
              <div className="text-[15px] font-semibold text-[#1f2937]">Voice Selection</div>
              <button type="button" onClick={() => setShowVoicePanel(false)} className="voice-selection-close flex h-8 w-8 items-center justify-center rounded-full border border-[#dfe7f3] bg-white text-lg text-[#475569]" aria-label="Close voice selection">×</button>
            </div>

            <div className="voice-selection-tabs flex items-center gap-3 border-b border-[#e5e9f2] bg-white px-5 py-4">
              <button type="button" className="voice-selection-tab voice-selection-tab-active rounded-full border border-[#bdd5f6] bg-[#eff6ff] px-4 py-2 text-sm font-semibold text-[#1d4ed8]">Pro Voices</button>
              <button type="button" className="voice-selection-tab rounded-full border border-[#dfe7f3] bg-[#f8fafc] px-4 py-2 text-sm font-medium text-[#475569]">Default Voices</button>
              <button type="button" className="voice-selection-tab voice-selection-collection-tab ml-auto rounded-full border border-[#dfe7f3] bg-[#f8fafc] px-4 py-2 text-sm font-medium text-[#475569]">My Collection</button>
            </div>

            <div className="voice-selection-models grid gap-2 border-b border-[#151c2e] bg-[#0a0c13] p-4 md:grid-cols-3">
              {ttsModels.map(model => (
                <button
                  key={model.id}
                  type="button"
                  onClick={() => handleModelChange(model.id)}
                  className={`voice-selection-model text-left ${selectedModel === model.id ? 'voice-selection-model-active' : ''}`}
                >
                  <span className="block text-xs font-semibold">{model.name}</span>
                  <span className="mt-1 block text-[10px] uppercase tracking-[0.08em] opacity-70">{model.provider}</span>
                  <span className="mt-2 block text-[11px] leading-4 opacity-75">{model.description}</span>
                </button>
              ))}
            </div>

            <div className="voice-selection-body grid gap-5 bg-[#eef2f8] p-5 xl:grid-cols-[minmax(0,1.9fr)_340px]">
              <div className="voice-selection-library rounded-2xl border border-[#dfe7f3] bg-white p-4">
                <div className="voice-selection-toolbar mb-4 flex gap-3">
                  <div className="voice-selection-search flex flex-1 items-center gap-2 rounded-xl border border-[#dfe7f3] bg-[#f8fafc] px-3 py-2.5">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                      <circle cx="6.5" cy="6.5" r="4.5" stroke="#64748b" strokeWidth="1.5" />
                      <path d="M10.5 10.5L13.5 13.5" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <input type="text" placeholder={`Search ${availableVoices.length} voices`} value={voiceSearch} onChange={event => setVoiceSearch(event.target.value)} className="w-full border-none bg-transparent text-sm text-[#0f172a] outline-none placeholder:text-[#94a3b8]" />
                  </div>

                  <select value={voiceCategory} onChange={event => setVoiceCategory(event.target.value)} className="voice-selection-filter rounded-xl border border-[#dfe7f3] bg-[#f8fafc] px-3 py-2.5 text-sm text-[#475569]">
                    <option>All categories</option>
                    {[...new Set(availableVoices.flatMap(voice => voice.tags))].map(category => <option key={category}>{category}</option>)}
                  </select>
                  <select value={voiceGender} onChange={event => setVoiceGender(event.target.value)} className="voice-selection-filter rounded-xl border border-[#dfe7f3] bg-[#f8fafc] px-3 py-2.5 text-sm text-[#475569]">
                    <option>All genders</option>
                    {[...new Set(availableVoices.map(voice => voice.gender))].map(gender => <option key={gender}>{gender}</option>)}
                  </select>
                  <select value={voiceAccent} onChange={event => setVoiceAccent(event.target.value)} className="voice-selection-filter rounded-xl border border-[#dfe7f3] bg-[#f8fafc] px-3 py-2.5 text-sm text-[#475569]">
                    <option>All accents</option>
                    {[...new Set(availableVoices.map(voice => voice.accent))].map(accent => <option key={accent}>{accent}</option>)}
                  </select>
                </div>

                <div className="flex items-center justify-between gap-3 pb-3 text-xs font-medium text-[#475569]">
                  <span>{filteredVoices.length} voices available</span>
                  {(voiceSearch || voiceGender !== 'All genders' || voiceAccent !== 'All accents' || voiceCategory !== 'All categories') && (
                    <button type="button" onClick={() => { setVoiceSearch(''); setVoiceGender('All genders'); setVoiceAccent('All accents'); setVoiceCategory('All categories') }} className="text-[#00d2df]">Clear filters</button>
                  )}
                </div>

                <div className="voice-selection-grid grid gap-3 md:grid-cols-2">
                  {filteredVoices.map(voice => {
                    const voiceIndex = availableVoices.findIndex(item => item.id === voice.id)
                    return (
                    <button
                      key={voice.name}
                      type="button"
                      onClick={() => {
                        setSelectedVoice(voiceIndex)
                        if (selectedModel === 'deepgram/flux-tts:free') setProviderVoice(voice.id)
                      }}
                      className={`voice-selection-card rounded-2xl border p-4 text-left transition hover:border-[#9cc3ff] hover:bg-[#f8fbff] ${selectedVoice === voiceIndex ? 'voice-selection-card-active' : ''}`}
                      style={{
                        borderColor: selectedVoice === voiceIndex ? '#7db5ff' : '#dfe7f3',
                        background: selectedVoice === voiceIndex ? '#eef6ff' : '#fff',
                      }}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#edf4ff] text-sm font-semibold text-[#1d4ed8]">{voice.name.charAt(0)}</div>
                          <div>
                            <div className="text-base font-semibold text-[#0f172a]">{voice.name}</div>
                            <div className="text-sm text-[#475569]">{voice.tone}</div>
                          </div>
                        </div>
                        <div className="text-xs font-medium text-[#64748b]">{voice.gender}</div>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {voice.tags.map(tag => (
                          <span key={tag} className="rounded-full border border-[#bde7d0] bg-[#ebfdf5] px-2 py-1 text-[11px] font-medium text-[#0f766e]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </button>
                    )
                  })}
                </div>
              </div>

              <aside className="voice-selection-preview rounded-2xl border border-[#dfe7f3] bg-white p-4">
                <div className="mb-4 flex items-center justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fef3e2] text-2xl font-bold text-[#d97706]">{selectedVoiceSummary.avatar}</div>
                </div>

                <div className="mb-2 text-xl font-semibold text-[#0f172a]">{activeVoice.name} - {activeVoice.label}</div>
                <div className="mb-4 text-sm text-[#475569]">{activeVoice.gender}</div>

                <div className="mb-4 rounded-xl border border-[#dfe7f3] bg-[#f8fafc] p-3">
                  <div className="mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#64748b]">{selectedModelConfig.name} voice</div>
                  {selectedModel === 'nvidia/magpie-tts-zeroshot' ? (
                    <label className="block cursor-pointer rounded-lg border border-dashed border-[#2a3147] bg-[#111520] p-3 text-xs text-[#8892aa]">
                      <span className="font-medium text-[#f0f4ff]">Reference audio sample</span>
                      <span className="mt-1 block">Upload 3 to 10 seconds of clean speech.</span>
                      <input type="file" accept="audio/*" onChange={handleReferenceAudioChange} className="mt-3 block w-full text-xs text-[#8892aa]" />
                      {referenceAudio && <span className="mt-2 block text-[#10f0b0]">Reference sample ready</span>}
                    </label>
                  ) : selectedModel === 'fish-audio/s2.1-pro-free:free' ? (
                    <p className="text-xs leading-5 text-[#8892aa]">This provider uses a fixed provider voice ID. The model is ready for text-only synthesis.</p>
                  ) : (
                    <select value={providerVoice} onChange={event => setProviderVoice(event.target.value)} className="w-full rounded-lg border border-[#1e2a40] bg-[#111520] px-3 py-2 text-xs text-[#f0f4ff] outline-none">
                      {deepgramVoices.map(voice => <option key={voice} value={voice}>{voice.replace('flux-', '').replace('-en', '')}</option>)}
                    </select>
                  )}
                </div>

                <div className="voice-selection-languages mb-4 rounded-xl border border-[#dfe7f3] bg-[#f8fafc] px-3 py-2 text-sm text-[#475569]">
                  <div className="mb-2 font-medium text-[#1f2937]">Supported Languages (32)</div>
                  <div className="flex flex-wrap gap-2">
                    {['Arabic', 'Bulgarian', 'Chinese', 'Croatian', 'Czech', 'Danish', 'Dutch', 'English', 'Filipino', 'Finnish', 'French', 'German', 'Greek', 'Hindi', 'Hungarian', 'Indonesian', 'Italian'].map(language => (
                      <span key={language} className="rounded-full border border-[#dfe7f3] bg-white px-2 py-1 text-[11px] text-[#475569]">{language}</span>
                    ))}
                  </div>
                </div>

                <div className="voice-selection-collab mb-5 rounded-xl border border-[#dfe7f3] bg-[#f8fafc] p-3 text-sm text-[#475569]">
                  In collaboration with <span className="font-semibold text-[#1d4ed8]">IELEnglishLabs</span>
                </div>

                <button type="button" onClick={() => setShowVoicePanel(false)} className="w-full rounded-xl bg-[#00d2df] px-4 py-3 text-base font-semibold text-[#090a0f] shadow-lg shadow-cyan-950/30">Apply voice</button>
              </aside>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
