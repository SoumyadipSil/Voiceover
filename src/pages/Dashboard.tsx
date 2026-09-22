import { useState, useRef, useEffect } from 'react'
import PaywallModal from '../components/PaywallModal'

const voices = [
  { name: 'Kabir', lang: 'HI / EN', style: 'Warm Narrative', avatar: '🎙️' },
  { name: 'Ananya', lang: 'BN / EN', style: 'Expressive', avatar: '🎤' },
  { name: 'Rohan', lang: 'EN (IN)', style: 'Deep Docu', avatar: '🔊' },
  { name: 'Priya', lang: 'HI / EN', style: 'Fast-Paced YT', avatar: '⚡' },
  { name: 'Arjun', lang: 'Bengali', style: 'Authoritative', avatar: '📢' },
  { name: 'Meera', lang: 'HI / EN', style: 'Calm & Clear', avatar: '🌊' },
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
      {/* Timestamps */}
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

      {/* Waveform bars */}
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

        {/* Playhead */}
        <div
          className="absolute top-0 bottom-0 w-0.5 flex flex-col items-center pointer-events-none"
          style={{ left: `${(playheadPos / waveBarHeights.length) * 100}%`, background: 'rgba(240,244,255,0.9)' }}
        >
          <div
            style={{ width: 10, height: 10, borderRadius: '50%', background: '#00d2df', boxShadow: '0 0 8px #00d2df', marginTop: -5 }}
          />
        </div>

        {/* Lock overlay on locked section */}
        <div
          className="absolute top-0 bottom-0 right-0 flex items-center justify-center"
          style={{ width: `${((waveBarHeights.length - playheadPos - 5) / waveBarHeights.length) * 100}%`, background: 'linear-gradient(90deg, transparent, rgba(9,10,15,0.6))' }}
        />
      </div>

      {/* Controls */}
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
  const [selectedEmotion, setSelectedEmotion] = useState('Neutral')
  const [script, setScript] = useState(`In the sweltering autumn of 476 AD, the Western Roman Empire did not collapse with an apocalyptic roar. It surrendered with a tired, silent whimper.

General Odoacer marched into Ravenna, deposing sixteen-year-old Romulus Augustulus without shedding a single drop of imperial blood. The golden standards were packed into wooden chests and dispatched to Constantinople.`)
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showPaywall, setShowPaywall] = useState(false)
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

  const handleGenerate = () => {
    if (estDurationSecs > freeMinutes) {
      setShowPaywall(true)
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

  return (
    <div className="flex flex-col gap-5 p-5 overflow-y-auto h-full">
      {/* Top bar */}
      <div
        className="flex items-center justify-between rounded-xl px-4 py-3"
        style={{ background: '#0D0F17', border: '1px solid #1e2a40' }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: '#111520', color: '#00d2df', border: '1px solid #1e2a40' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="5" y="1" width="6" height="9" rx="3" stroke="currentColor" strokeWidth="1.4" />
              <path d="M2 8c0 3.314 2.686 6 6 6s6-2.686 6-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <div style={{ color: '#F0F4FF', fontWeight: 600, fontSize: '14px', letterSpacing: '-0.02em' }}>
              The Fall of Rome — Episode 4
            </div>
            <div style={{ color: '#4f5a72', fontSize: '12px' }}>Saved to cloud 2m ago · Faceless YT Engine</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div
            className="px-3 py-1.5 rounded-lg flex items-center gap-2"
            style={{ background: '#111520', border: '1px solid #1e2a40' }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M1.5 7.5L6.5 2.5L11.5 7.5M4 10.5h5" stroke="#f59e0b" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <span style={{ color: '#f59e0b', fontSize: '12px', fontWeight: 600 }}>
              Free: 0s / 1 min used
            </span>
          </div>
          <button
            className="btn-primary px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5"
            onClick={() => setShowPaywall(true)}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1L1 5h3v6h4V5h3L6 1z" fill="currentColor" />
            </svg>
            Upgrade to Creator
          </button>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        {/* Left: script + voices */}
        <div className="xl:col-span-8 flex flex-col gap-5">

          {/* Voice selector */}
          <div
            className="rounded-xl p-4"
            style={{ background: '#0D0F17', border: '1px solid #1e2a40' }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span style={{ color: '#00d2df', fontSize: '14px' }}>◈</span>
                <span style={{ color: '#F0F4FF', fontWeight: 600, fontSize: '14px' }}>Neural Storytellers</span>
                <span style={{ color: '#4f5a72', fontSize: '12px' }}>(High Intonation)</span>
              </div>
              <div
                className="flex items-center rounded-lg overflow-hidden"
                style={{ background: '#111520', border: '1px solid #151c2e' }}
              >
                {['All', 'Hindi', 'Bengali', 'EN (IN)'].map((f, i) => (
                  <button
                    key={f}
                    style={{
                      padding: '4px 10px',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: i === 0 ? '#00d2df' : '#4f5a72',
                      background: i === 0 ? 'rgba(0,210,223,0.1)' : 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {voices.map((v, i) => (
                <div
                  key={v.name}
                  className={`voice-card p-3 ${selectedVoice === i ? 'selected' : ''}`}
                  onClick={() => setSelectedVoice(i)}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {selectedVoice === i && (
                      <div className="absolute top-2 right-2">
                        <span className="flex h-2 w-2 relative">
                          <span
                            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                            style={{ background: '#00d2df' }}
                          />
                          <span
                            className="relative inline-flex rounded-full h-2 w-2"
                            style={{ background: '#00d2df' }}
                          />
                        </span>
                      </div>
                    )}
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                      style={{ background: '#1a1f2e' }}
                    >
                      {v.avatar}
                    </div>
                    <div className="min-w-0">
                      <div style={{ color: '#F0F4FF', fontWeight: 600, fontSize: '13px' }}>{v.name}</div>
                      <div style={{ color: selectedVoice === i ? '#00d2df' : '#4f5a72', fontSize: '11px', fontWeight: 500 }}>{v.style}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span
                      style={{
                        fontSize: '10px', fontWeight: 700, letterSpacing: '0.04em',
                        color: '#4f5a72', fontFamily: 'monospace',
                      }}
                    >
                      {v.lang}
                    </span>
                    <div
                      style={{
                        width: 22, height: 22, borderRadius: '50%',
                        background: selectedVoice === i ? 'rgba(0,210,223,0.2)' : '#1a1f2e',
                        border: `1px solid ${selectedVoice === i ? 'rgba(0,210,223,0.4)' : '#1e2a40'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: selectedVoice === i ? '#00d2df' : '#4f5a72', cursor: 'pointer',
                      }}
                    >
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor">
                        <path d="M1.5 1l5 3-5 3V1z" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Script area */}
          <div
            className="rounded-xl p-4 flex flex-col gap-3"
            style={{ background: '#0D0F17', border: '1px solid #1e2a40' }}
          >
            {/* Toolbar */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                {[
                  { label: 'Insert Pause', tag: '[pause=1.2s]' },
                  { label: 'Emphasis', tag: '[emphasis]' },
                  { label: 'Whisper', tag: '[whisper]' },
                ].map(({ label, tag }) => (
                  <button
                    key={label}
                    onClick={() => setScript(s => s + ' ' + tag)}
                    className="btn-ghost px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1"
                  >
                    <span style={{ color: '#00d2df' }}>+</span> {label}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setScript('')}
                style={{ color: '#4f5a72', fontSize: '12px', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#ef4444')}
                onMouseLeave={e => (e.currentTarget.style.color = '#4f5a72')}
              >
                Clear
              </button>
            </div>

            {/* Textarea */}
            <div
              className="rounded-xl p-4"
              style={{ background: '#111520', border: '1px solid #151c2e' }}
            >
              <textarea
                className="w-full bg-transparent border-none outline-none resize-y"
                style={{
                  color: '#F0F4FF', fontSize: '14px', lineHeight: 1.8,
                  minHeight: 160, fontFamily: 'inherit',
                }}
                placeholder="Paste your script here... Use [pause=1.2s] for dramatic pauses, [emphasis] for key words."
                value={script}
                onChange={e => setScript(e.target.value)}
              />

              {/* Stats bar */}
              <div
                className="flex items-center justify-between pt-3 mt-3 flex-wrap gap-2"
                style={{ borderTop: '1px solid #151c2e' }}
              >
                <div className="flex items-center gap-4 flex-wrap">
                  <span style={{ color: '#4f5a72', fontSize: '12px', fontFamily: 'monospace' }}>
                    Words: <strong style={{ color: '#F0F4FF' }}>{wordCount}</strong>
                  </span>
                  <span style={{ color: '#4f5a72', fontSize: '12px', fontFamily: 'monospace' }}>
                    Chars: <strong style={{ color: '#F0F4FF' }}>{charCount.toLocaleString()}</strong>
                  </span>
                  <span style={{ color: '#4f5a72', fontSize: '12px', fontFamily: 'monospace' }}>
                    Est. Duration: <strong style={{ color: '#00d2df' }}>{estDurationStr}</strong>
                  </span>
                </div>
                {estDurationSecs > freeMinutes && (
                  <span style={{ color: '#f59e0b', fontSize: '12px', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 2L1 10h10L6 2z" stroke="currentColor" strokeWidth="1.2" />
                      <line x1="6" y1="5.5" x2="6" y2="7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      <circle cx="6" cy="9" r="0.5" fill="currentColor" />
                    </svg>
                    Exceeds free 1-min limit
                  </span>
                )}
              </div>
            </div>

            {/* Generate button */}
            <div className="flex items-center justify-between flex-wrap gap-3 pt-1">
              <div style={{ color: '#4f5a72', fontSize: '12px', fontFamily: 'monospace' }}>
                Engine: <span style={{ color: '#00d2df' }}>Aura-v3.4 Neural (Sub-40ms)</span>
              </div>
              <button
                className="btn-primary px-8 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 animate-glow-pulse"
                onClick={handleGenerate}
                disabled={generating || !script.trim()}
              >
                {generating ? (
                  <>
                    <div
                      style={{
                        width: 16, height: 16, borderRadius: '50%',
                        border: '2px solid rgba(9,10,15,0.3)',
                        borderTopColor: '#090A0F',
                        animation: 'spin-slow 0.7s linear infinite',
                      }}
                    />
                    Synthesizing voice...
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 1L2 7h4v8h4V7h4L8 1z" />
                    </svg>
                    Generate Studio Audio
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Audio player - shown after generation */}
          {(generated || true) && (
            <div
              className="rounded-xl p-4 flex flex-col gap-3"
              style={{ background: '#0D0F17', border: '1px solid #1e2a40' }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{
                      background: '#10f0b0',
                      boxShadow: '0 0 8px #10f0b0',
                      animation: isPlaying ? 'dot-blink 1s ease-in-out infinite' : 'none',
                    }}
                  />
                  <span style={{ color: '#F0F4FF', fontWeight: 600, fontSize: '14px' }}>Master Audio Track</span>
                  <span style={{ color: '#4f5a72', fontSize: '12px', fontFamily: 'monospace' }}>take_04_kabir_rome.wav</span>
                </div>
                <button
                  className="btn-ghost px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5"
                  onClick={() => setGenerated(false)}
                >
                  + Generate Another
                </button>
              </div>

              <WaveformPlayer isPlaying={isPlaying} />
            </div>
          )}
        </div>

        {/* Right: controls */}
        <div className="xl:col-span-4 flex flex-col gap-5">
          {/* Emotion */}
          <div
            className="rounded-xl p-4 flex flex-col gap-4"
            style={{ background: '#0D0F17', border: '1px solid #1e2a40' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span style={{ color: '#10f0b0' }}>◆</span>
                <span style={{ color: '#F0F4FF', fontWeight: 600, fontSize: '14px' }}>Emotional Delivery</span>
              </div>
              <span style={{ color: '#4f5a72', fontSize: '11px' }}>v2.1 Latent</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {emotions.map(e => (
                <button
                  key={e}
                  onClick={() => setSelectedEmotion(e)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                  style={{
                    background: selectedEmotion === e ? 'rgba(0,210,223,0.12)' : '#111520',
                    color: selectedEmotion === e ? '#00d2df' : '#8892aa',
                    border: `1px solid ${selectedEmotion === e ? 'rgba(0,210,223,0.3)' : '#1e2a40'}`,
                    boxShadow: selectedEmotion === e ? '0 0 12px rgba(0,210,223,0.12)' : 'none',
                  }}
                >
                  {e}
                </button>
              ))}
            </div>

            {/* Sliders */}
            <div className="flex flex-col gap-3 pt-1">
              {[
                { label: 'Pacing Speed', value: pace, set: setPace, min: 0.75, max: 1.5, step: 0.05, fmt: (v: number) => `${v.toFixed(2)}x`, leftLabel: 'Contemplative', rightLabel: 'High Retention' },
                { label: 'Pitch & Resonance', value: pitch, set: setPitch, min: -6, max: 6, step: 0.2, fmt: (v: number) => `${v > 0 ? '+' : ''}${v.toFixed(1)} st`, leftLabel: 'Deep', rightLabel: 'Bright' },
                { label: 'Breathiness', value: breathiness, set: setBreathiness, min: 0, max: 100, step: 1, fmt: (v: number) => `${v}%`, leftLabel: 'Radio Gate', rightLabel: 'Organic' },
              ].map(s => (
                <div
                  key={s.label}
                  className="rounded-xl p-3 flex flex-col gap-2"
                  style={{ background: '#111520', border: '1px solid #151c2e' }}
                >
                  <div className="flex items-center justify-between">
                    <span style={{ color: '#8892aa', fontSize: '12px', fontWeight: 500 }}>{s.label}</span>
                    <span style={{ color: '#00d2df', fontSize: '12px', fontFamily: 'monospace', fontWeight: 700 }}>
                      {s.fmt(s.value)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={s.min}
                    max={s.max}
                    step={s.step}
                    value={s.value}
                    onChange={e => s.set(parseFloat(e.target.value))}
                    style={{ width: '100%', accentColor: '#00d2df', height: 4 }}
                  />
                  <div className="flex items-center justify-between">
                    <span style={{ color: '#4f5a72', fontSize: '10px' }}>{s.leftLabel}</span>
                    <span style={{ color: '#4f5a72', fontSize: '10px' }}>{s.rightLabel}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Retention meter */}
          <div
            className="rounded-xl p-4 flex flex-col gap-3"
            style={{ background: '#0D0F17', border: '1px solid #1e2a40' }}
          >
            <div className="flex items-center gap-2">
              <span style={{ color: '#00d2df' }}>↑</span>
              <span style={{ color: '#F0F4FF', fontWeight: 600, fontSize: '14px' }}>YouTube Retention Meter</span>
            </div>
            <p style={{ color: '#8892aa', fontSize: '12px', lineHeight: 1.6 }}>
              {voices[selectedVoice].name}'s current pacing delivers an estimated{' '}
              <strong style={{ color: '#F0F4FF' }}>64.8% average view duration</strong>{' '}
              for history essays based on 14,000 channels.
            </p>
            <div style={{ background: '#111520', borderRadius: 4, height: 6, overflow: 'hidden', border: '1px solid #151c2e' }}>
              <div
                style={{
                  width: '72%',
                  height: '100%',
                  background: 'linear-gradient(90deg, #10f0b0, #00d2df)',
                  borderRadius: 4,
                  animation: 'progress-bar 1s ease-out forwards',
                }}
              />
            </div>
            <div className="flex items-center justify-between">
              <span style={{ color: '#4f5a72', fontSize: '11px', fontFamily: 'monospace' }}>Baseline: 42%</span>
              <span style={{ color: '#10f0b0', fontSize: '11px', fontWeight: 700 }}>+22.8% vs average</span>
            </div>
          </div>

          {/* Export integrations */}
          <div
            className="rounded-xl p-4 flex flex-col gap-3"
            style={{ background: '#0D0F17', border: '1px solid #1e2a40' }}
          >
            <span style={{ color: '#4f5a72', fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Studio Export Integrations
            </span>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Premiere XML', icon: '🎬' },
                { label: 'CapCut Sync', icon: '📱' },
                { label: 'Stems / Vocal', icon: '🎚️' },
                { label: 'Timecode SRT', icon: '📄' },
              ].map(({ label, icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-lg p-2.5"
                  style={{ background: '#111520', border: '1px solid #151c2e' }}
                >
                  <span style={{ fontSize: '14px' }}>{icon}</span>
                  <span style={{ color: '#8892aa', fontSize: '12px' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showPaywall && (
        <PaywallModal
          onClose={() => setShowPaywall(false)}
          onUpgrade={() => setShowPaywall(false)}
        />
      )}
    </div>
  )
}
