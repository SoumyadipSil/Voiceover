import { useState } from 'react'
import PaywallModal from '../components/PaywallModal'

const voices = [
  { name: 'Kabir', lang: 'HI / EN', style: 'Warm Narrative', avatar: 'K' },
  { name: 'Ananya', lang: 'BN / EN', style: 'Expressive', avatar: 'A' },
  { name: 'Rohan', lang: 'EN (IN)', style: 'Deep Docu', avatar: 'R' },
  { name: 'Priya', lang: 'HI / EN', style: 'Fast-Paced YT', avatar: 'P' },
  { name: 'Arjun', lang: 'Bengali', style: 'Authoritative', avatar: 'J' },
  { name: 'Meera', lang: 'HI / EN', style: 'Calm & Clear', avatar: 'M' },
]

const voiceOptions = [
  { name: 'Richard', label: 'authoritative, deeply resonant voice', gender: 'Male', tags: ['American', 'Narrative & Story'], tone: 'Middle-aged Male', accent: 'American' },
  { name: 'Ariana', label: 'sassy & husky tone', gender: 'Female', tags: ['American', 'Animation & Characters'], tone: 'Female', accent: 'American' },
  { name: 'Carter', label: 'relaxed, friendly & confident', gender: 'Male', tags: ['American', 'Conversational'], tone: 'Young Male', accent: 'American' },
  { name: 'Ella', label: 'calm and soft spoken', gender: 'Female', tags: ['British', 'Social Media'], tone: 'Female', accent: 'British' },
  { name: 'Avery', label: 'youthful & energetic tone', gender: 'Female', tags: ['American', 'Conversational'], tone: 'Young Female', accent: 'American' },
  { name: 'Sophie', label: 'lively and upbeat voice', gender: 'Female', tags: ['American', 'Advertisement'], tone: 'Female', accent: 'American' },
  { name: 'Ethan', label: 'versatile narrator', gender: 'Male', tags: ['American', 'Narrative & Story'], tone: 'Male', accent: 'American' },
  { name: 'Grace', label: 'confident teenager', gender: 'Female', tags: ['American', 'Commercial'], tone: 'Teen Female', accent: 'American' },
]

const emotions = ['Neutral', 'Calm', 'Happy', 'Sad', 'Dramatic', 'Fearful', 'Energetic', 'Whisper']

const waveBarHeights = [12, 20, 36, 24, 48, 32, 16, 44, 36, 56, 28, 40, 52, 20, 60, 36, 48, 24, 40, 64, 28, 52, 16, 44, 36, 56, 24, 48, 32, 60, 20, 44, 36, 52, 28, 40, 64, 24, 16, 48, 28, 36, 52, 20, 44, 60, 32, 40, 16, 24, 48, 36, 56, 28, 44, 20, 60, 32, 48, 24, 36, 52, 16, 40]

function WaveformPlayer({ isPlaying }: { isPlaying: boolean }) {
  const playheadPos = 42

  return (
    <div
      className="rounded-xl p-4"
      style={{ background: '#0a0c13', border: '1px solid #151c2e' }}
    >
      <div className="flex items-center justify-between mb-2">
        <span style={{ color: '#00d2df', fontSize: '12px', fontFamily: 'monospace', fontWeight: 700 }}>
          00:42.10
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
        <span style={{ color: '#4f5a72', fontSize: '12px', fontFamily: 'monospace' }}>02:45.00</span>
      </div>

      <div
        className="relative flex items-center gap-[2px] overflow-hidden"
        style={{ height: 72 }}
      >
        {waveBarHeights.map((h, i) => (
          <div
            key={i}
            className={isPlaying ? 'animate-wave-bar' : ''}
            style={{
              width: '3px',
              height: `${h}px`,
              borderRadius: '2px',
              background: i < playheadPos ? '#00d2df' : '#1e2a40',
              opacity: i < playheadPos ? (0.4 + (h / 64) * 0.6) : 0.3,
              flexShrink: 0,
              animationDuration: isPlaying ? `${0.8 + (i % 7) * 0.12}s` : undefined,
              animationDelay: isPlaying ? `${(i % 11) * 0.08}s` : undefined,
              transformOrigin: 'center',
            }}
          />
        ))}

        <div
          className="absolute top-0 bottom-0 w-0.5 flex flex-col items-center pointer-events-none"
          style={{ left: `${(playheadPos / waveBarHeights.length) * 100}%`, background: 'rgba(240,244,255,0.9)' }}
        >
          <div
            style={{ width: 10, height: 10, borderRadius: '50%', background: '#00d2df', boxShadow: '0 0 8px #00d2df', marginTop: -5 }}
          />
        </div>

        <div
          className="absolute top-0 bottom-0 right-0 flex items-center justify-center"
          style={{ width: `${((waveBarHeights.length - playheadPos - 5) / waveBarHeights.length) * 100}%`, background: 'linear-gradient(90deg, transparent, rgba(9,10,15,0.6))' }}
        />
      </div>

      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2">
          <button
            style={{ width: 32, height: 32, borderRadius: 8, background: '#111520', border: '1px solid #1e2a40', color: '#8892aa', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M12 2L2 7l10 5V2z" fill="currentColor" opacity="0.5" />
              <line x1="2" y1="2" x2="2" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          <button
            style={{
              width: 40, height: 40, borderRadius: '50%', background: '#00d2df', color: '#090A0F',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              boxShadow: '0 0 16px rgba(0,210,223,0.4)',
              border: 'none',
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
            style={{ width: 32, height: 32, borderRadius: 8, background: '#111520', border: '1px solid #1e2a40', color: '#8892aa', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
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
                style={{
                  padding: '4px 8px',
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  color: s === '1.0x' ? '#00d2df' : '#4f5a72',
                  fontWeight: s === '1.0x' ? 700 : 400,
                  background: s === '1.0x' ? 'rgba(0,210,223,0.1)' : 'transparent',
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
            className="btn-ghost px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1v7M2.5 5l3.5 3.5L9.5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              <line x1="1" y1="11" x2="11" y2="11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            Export MP3
          </button>
          <button
            className="btn-ghost px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M4 6h4M6 4v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            Regen Take
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Dashboard({ onShowPaywall }: { onShowPaywall?: () => void }) {
  const [selectedVoice, setSelectedVoice] = useState(0)
  const [showVoicePanel, setShowVoicePanel] = useState(false)
  const [selectedEmotion, setSelectedEmotion] = useState('Neutral')
  const [script, setScript] = useState(`In the sweltering autumn of 476 AD, the Western Roman Empire did not collapse with an apocalyptic roar. It surrendered with a tired, silent whimper.

General Odoacer marched into Ravenna, deposing sixteen-year-old Romulus Augustulus without shedding a single drop of imperial blood. The golden standards were packed into wooden chests and dispatched to Constantinople.`)
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showPaywallState, setShowPaywallState] = useState(false)
  const [pace, setPace] = useState(1.05)
  const [pitch, setPitch] = useState(-1.2)
  const [breathiness, setBreathiness] = useState(18)

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

  const handleGenerate = () => {
    if (estDurationSecs > freeMinutes) {
      openPaywall()
      return
    }
    setGenerating(true)
    setGenerated(false)
    setTimeout(() => {
      setGenerating(false)
      setGenerated(true)
      setIsPlaying(true)
    }, 2200)
  }

  const activeVoice = voiceOptions[selectedVoice % voiceOptions.length]
  const selectedVoiceSummary = voices[selectedVoice % voices.length]

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
                    <div className="text-[11px] uppercase tracking-[0.12em] text-[#4f5a72]">{selectedVoiceSummary.lang} · Aura neural v3.4</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button type="button" className="rounded-lg border px-3 py-1.5 text-[11px] font-medium" style={{ background: '#111520', borderColor: '#1e2a40', color: '#8892aa' }}>
                  Voice
                </button>
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
                <button type="button" className="rounded-lg border px-2.5 py-1.5 text-[11px] font-medium" style={{ background: '#111520', borderColor: '#1e2a40', color: '#8892aa' }}>
                  + Insert Pause
                </button>
                <button type="button" className="rounded-lg border px-2.5 py-1.5 text-[11px] font-medium" style={{ background: '#111520', borderColor: '#1e2a40', color: '#8892aa' }}>
                  Emphasis
                </button>
                <button type="button" className="rounded-lg border px-2.5 py-1.5 text-[11px] font-medium" style={{ background: '#111520', borderColor: '#1e2a40', color: '#8892aa' }}>
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
                Engine: <span style={{ color: '#00d2df' }}>Aura-v3.4 Neural (Sub-40ms)</span>
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

            <WaveformPlayer isPlaying={isPlaying} />
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

            <div className="voice-selection-body grid gap-5 bg-[#eef2f8] p-5 xl:grid-cols-[minmax(0,1.9fr)_340px]">
              <div className="rounded-2xl border border-[#dfe7f3] bg-white p-4">
                <div className="voice-selection-toolbar mb-4 flex gap-3">
                  <div className="voice-selection-search flex flex-1 items-center gap-2 rounded-xl border border-[#dfe7f3] bg-[#f8fafc] px-3 py-2.5">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                      <circle cx="6.5" cy="6.5" r="4.5" stroke="#64748b" strokeWidth="1.5" />
                      <path d="M10.5 10.5L13.5 13.5" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <input type="text" placeholder="Search" className="w-full border-none bg-transparent text-sm text-[#0f172a] outline-none placeholder:text-[#94a3b8]" />
                  </div>

                  <div className="voice-selection-filter flex items-center gap-2 rounded-xl border border-[#dfe7f3] bg-[#f8fafc] px-3 py-2.5 text-sm text-[#475569]">
                    <span>Category</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 4.5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <div className="voice-selection-filter flex items-center gap-2 rounded-xl border border-[#dfe7f3] bg-[#f8fafc] px-3 py-2.5 text-sm text-[#475569]">
                    <span>Gender</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 4.5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <div className="voice-selection-filter flex items-center gap-2 rounded-xl border border-[#dfe7f3] bg-[#f8fafc] px-3 py-2.5 text-sm text-[#475569]">
                    <span>Age</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 4.5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <div className="voice-selection-filter flex items-center gap-2 rounded-xl border border-[#dfe7f3] bg-[#f8fafc] px-3 py-2.5 text-sm text-[#475569]">
                    <span>Accent</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 4.5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pb-3 text-xs font-medium text-[#475569]">
                  <button type="button" className="rounded-full border border-[#dfe7f3] bg-[#f8fafc] px-3 py-1.5">Pro Voices</button>
                  <button type="button" className="rounded-full border border-[#dfe7f3] bg-[#f8fafc] px-3 py-1.5">FlashX Voices</button>
                  <button type="button" className="rounded-full border border-[#dfe7f3] bg-[#f8fafc] px-3 py-1.5">Pro Voices (2.0)</button>
                  <button type="button" className="rounded-full border border-[#dfe7f3] bg-[#f8fafc] px-3 py-1.5">Pro Voices (1.0)</button>
                </div>

                <div className="voice-selection-grid grid gap-3 md:grid-cols-2">
                  {voiceOptions.map((voice, index) => (
                    <button
                      key={voice.name}
                      type="button"
                      onClick={() => {
                        setSelectedVoice(index)
                        setShowVoicePanel(false)
                      }}
                      className={`voice-selection-card rounded-2xl border p-4 text-left transition hover:border-[#9cc3ff] hover:bg-[#f8fbff] ${selectedVoice === index ? 'voice-selection-card-active' : ''}`}
                      style={{
                        borderColor: selectedVoice === index ? '#7db5ff' : '#dfe7f3',
                        background: selectedVoice === index ? '#eef6ff' : '#fff',
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
                  ))}
                </div>
              </div>

              <aside className="voice-selection-preview rounded-2xl border border-[#dfe7f3] bg-white p-4">
                <div className="mb-4 flex items-center justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fef3e2] text-2xl font-bold text-[#d97706]">{selectedVoiceSummary.avatar}</div>
                </div>

                <div className="mb-2 text-xl font-semibold text-[#0f172a]">{activeVoice.name} - {activeVoice.label}</div>
                <div className="mb-4 text-sm text-[#475569]">{activeVoice.gender}</div>

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

                <button type="button" onClick={() => setShowVoicePanel(false)} className="w-full rounded-xl bg-[#2563eb] px-4 py-3 text-base font-semibold text-white shadow-lg shadow-blue-200">Submit</button>
              </aside>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
