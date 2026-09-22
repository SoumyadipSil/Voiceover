import { useState, useEffect } from 'react'
import ShaderBackground from '../components/ShaderBackground'

interface Props {
  onGetStarted: () => void
  onLogin: () => void
}

const voices = [
  { name: 'Kabir', lang: 'Hindi · English', style: 'Warm Narrative', avatar: '🎙️' },
  { name: 'Ananya', lang: 'Bengali · English', style: 'Expressive & Rich', avatar: '🎤' },
  { name: 'Rohan', lang: 'English (India)', style: 'Deep Documentary', avatar: '🔊' },
  { name: 'Priya', lang: 'Hindi · English', style: 'Fast-Paced YT', avatar: '⚡' },
  { name: 'Arjun', lang: 'Bengali', style: 'Authoritative', avatar: '📢' },
  { name: 'Meera', lang: 'Hindi · English', style: 'Calm & Soothing', avatar: '🌊' },
  { name: 'Dev', lang: 'English (India)', style: 'Energetic Creator', avatar: '🔥' },
  { name: 'Sia', lang: 'Bengali · Hindi', style: 'Storyteller', avatar: '✨' },
]

const faqItems = [
  { q: 'How much audio can I generate for free?', a: 'Every account gets 1 full minute of free audio generation — forever. This is your audition credit to test voice quality and workflow before committing.' },
  { q: 'Does Voiceover support Bengali and Hindi pronunciation accurately?', a: 'Yes — our neural models are trained on native dialect data, not generic Western AI speech. Bengali and Hindi voices include authentic inflections, regional intonation, and correct pronunciation of loanwords.' },
  { q: 'Can I use the audio for commercial YouTube monetization?', a: 'Creator, Studio, and pay-as-you-go plans include full commercial licensing. Free tier audio is for personal use and evaluation only.' },
  { q: 'What audio formats can I download?', a: 'MP3 (128k / 320k), WAV (24-bit / 48kHz), and FLAC on Creator and Studio plans. Free tier exports MP3 128k.' },
  { q: 'Is there a word limit per generation?', a: 'No hard word limit. Scripts are processed in segments and stitched seamlessly. Studio plan handles scripts up to 30,000 words in a single generation.' },
]

const steps = [
  {
    num: '01',
    title: 'Paste your script',
    desc: 'Drop in your YouTube script. Add optional markers like [pause=1.2s] or [emphasis] for precise control.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <line x1="7" y1="8" x2="17" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="7" y1="12" x2="14" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="7" y1="16" x2="11" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Pick your voice',
    desc: 'Choose from 30+ neural voices in English, Hindi, and Bengali. Preview before you commit.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="8" y="2" width="8" height="12" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 12c0 4.418 3.582 8 8 8s8-3.582 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="12" y1="20" x2="12" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Download your MP3',
    desc: 'Studio-quality audio ready in seconds. Export to Premiere, CapCut, or directly to YouTube.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 3v13M7 12l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="3" y1="21" x2="21" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
]

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    desc: 'Try before you buy',
    features: ['1 minute lifetime audio', '3 voice options', 'MP3 128k export', 'Personal use only'],
    cta: 'Get Started Free',
    featured: false,
  },
  {
    name: 'Starter',
    price: '$15',
    period: '/month',
    desc: 'For occasional creators',
    features: ['30 min/month audio', '15 voices · HI/EN/BN', 'MP3 320k export', 'Commercial rights', 'Email support'],
    cta: 'Start Starter',
    featured: false,
  },
  {
    name: 'Creator',
    price: '$29',
    period: '/month',
    desc: 'For serious YouTube channels',
    features: ['180 min/month audio', '30+ voices · all languages', 'MP3 + WAV export', 'Commercial rights', 'CapCut / Premiere sync', 'Priority generation'],
    cta: 'Start Creating',
    featured: true,
  },
  {
    name: 'Studio',
    price: '$79',
    period: '/month',
    desc: 'For agencies & power creators',
    features: ['Unlimited generation', 'All 50+ voices', 'FLAC + stems export', 'Commercial rights', 'API access', 'Dedicated support', 'SRT subtitle export'],
    cta: 'Go Studio',
    featured: false,
  },
]

function AnimatedWaveform({ barCount = 40, height = 64, color = '#00d2df' }: { barCount?: number; height?: number; color?: string }) {
  const baseHeights = [20, 36, 52, 28, 60, 40, 16, 48, 36, 56, 24, 44, 60, 32, 52, 20, 40, 56, 36, 64, 28, 48, 16, 52, 40, 60, 24, 44, 36, 56, 20, 48, 32, 64, 28, 52, 40, 16, 44, 60]
  return (
    <div className="flex items-center gap-[3px]" style={{ height }}>
      {Array.from({ length: barCount }, (_, i) => {
        const bh = baseHeights[i % baseHeights.length]
        const duration = 0.8 + (i % 7) * 0.15
        const delay = (i % 11) * 0.1
        return (
          <div
            key={i}
            className="waveform-bar animate-wave-bar flex-shrink-0"
            style={{
              height: `${bh}px`,
              background: i < barCount * 0.45
                ? color
                : `${color}30`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
              opacity: i < barCount * 0.45 ? 0.6 + (bh / 64) * 0.4 : 0.25,
            }}
          />
        )
      })}
    </div>
  )
}

function StatBadge({ value, label, icon }: { value: string; label: string; icon: React.ReactNode }) {
  return (
    <div className="flex min-w-0 flex-1 items-center justify-center gap-3 px-4 py-4 text-left">
      <div
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg"
        style={{ background: '#151c2e', color: '#00d2df', border: '1px solid #1e2a40' }}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <span
          className="block font-display text-lg font-bold text-gradient"
          style={{ letterSpacing: '-0.04em' }}
        >
          {value}
        </span>
        <span
          className="block truncate"
          style={{ color: '#4f5a72', fontSize: '9px', letterSpacing: '0.02em' }}
        >
          {label}
        </span>
      </div>
    </div>
  )
}

export default function Landing({ onGetStarted, onLogin }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [playingVoice, setPlayingVoice] = useState<number | null>(null)
  const [navScrolled, setNavScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setNavScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <div className="min-h-screen" style={{ background: '#090A0F' }}>
      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 h-16 transition-all duration-300"
        style={{
          background: navScrolled ? 'rgba(9,10,15,0.95)' : 'transparent',
          backdropFilter: navScrolled ? 'blur(20px)' : 'none',
          borderBottom: navScrolled ? '1px solid #151c2e' : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="8" fill="#111520" />
            <rect x="5" y="11" width="3" height="6" rx="1.5" fill="#00d2df" />
            <rect x="10" y="7" width="3" height="14" rx="1.5" fill="#00d2df" />
            <rect x="15" y="9" width="3" height="10" rx="1.5" fill="#48effc" />
            <rect x="20" y="12" width="3" height="4" rx="1.5" fill="#00d2df" />
          </svg>
          <span className="font-display font-bold text-base" style={{ color: '#F0F4FF', letterSpacing: '-0.03em' }}>
            Voiceover
          </span>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-7">
          {['Features', 'Pricing', 'FAQ'].map(l => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              style={{ color: '#8892aa', fontSize: '14px', fontWeight: 500, textDecoration: 'none', transition: 'color 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#F0F4FF')}
              onMouseLeave={e => (e.currentTarget.style.color = '#8892aa')}
            >
              {l}
            </a>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <button
            className="btn-ghost px-4 py-2 rounded-xl text-sm font-medium"
            onClick={onLogin}
          >
            Log in
          </button>
          <button
            className="btn-primary px-5 py-2 rounded-xl text-sm font-semibold"
            onClick={onGetStarted}
          >
            Get Started Free
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-16 pb-24 text-center overflow-hidden">
        <ShaderBackground />

        {/* Background glow */}
        <div
          className="hero-glow z-[1]"
          style={{ top: '30%', left: '50%', transform: 'translate(-50%, -50%)' }}
        />
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,210,223,0.06) 0%, transparent 60%)',
          }}
        />

        {/* Badge */}
        <div
          className="relative z-10"
        >
        <div
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full animate-fade-up"
          style={{
            background: 'rgba(0,210,223,0.08)',
            border: '1px solid rgba(0,210,223,0.2)',
            animationDelay: '0s',
          }}
        >
          <span style={{ color: '#00d2df', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            ✦ Now with Bengali & Hindi support
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-display font-bold animate-fade-up"
          style={{
            fontSize: 'clamp(40px, 6vw, 80px)',
            lineHeight: 1.08,
            letterSpacing: '-0.04em',
            maxWidth: '900px',
            animationDelay: '0.1s',
            opacity: 0,
          }}
        >
          <span style={{ color: '#F0F4FF' }}>Script to voiceover</span>
          <br />
          <span className="text-gradient-hero">in 60 seconds.</span>
          <br />
          <span style={{ color: '#F0F4FF' }}>No mic, no editing,</span>
          <br />
          <span style={{ color: '#8892aa' }}>no burnout.</span>
        </h1>

        <p
          className="mt-6 animate-fade-up"
          style={{
            color: '#8892aa',
            fontSize: 'clamp(16px, 2vw, 20px)',
            lineHeight: 1.6,
            maxWidth: '540px',
            animationDelay: '0.2s',
            opacity: 0,
          }}
        >
          Turn your faceless channel into a revenue engine. Studio-quality AI narration in English, Hindi, and Bengali — with emotional nuance and natural sync.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-wrap items-center justify-center gap-4 mt-10 animate-fade-up"
          style={{ animationDelay: '0.3s', opacity: 0 }}
        >
          <button
            className="btn-primary px-8 py-3.5 rounded-xl text-base font-semibold animate-glow-pulse"
            onClick={onGetStarted}
          >
            Start for free — 1 min included
          </button>
          <button
            className="btn-ghost px-6 py-3.5 rounded-xl text-base font-medium flex items-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M6.5 5.5l4 2.5-4 2.5V5.5z" fill="currentColor" />
            </svg>
            Watch demo
          </button>
        </div>

        {/* Hero waveform UI mockup */}
        <div
          className="mt-20 w-full max-w-4xl animate-fade-up"
          style={{
            animationDelay: '0.5s',
            opacity: 0,
          }}
        >
          <div
            className="rounded-2xl p-5 overflow-hidden"
            style={{
              background: '#0D0F17',
              border: '1px solid #1e2a40',
              boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,210,223,0.08)',
            }}
          >
            {/* Mock toolbar */}
            <div className="flex items-center gap-2 mb-4">
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444', opacity: 0.7 }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b', opacity: 0.7 }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981', opacity: 0.7 }} />
              <div
                style={{ flex: 1, height: 28, borderRadius: 8, background: '#111520', border: '1px solid #1e2a40', marginLeft: 8, display: 'flex', alignItems: 'center', paddingLeft: 10 }}
              >
                <span style={{ color: '#4f5a72', fontSize: '11px' }}>voiceover.app/studio</span>
              </div>
            </div>

            {/* Waveform + player */}
            <div
              className="rounded-xl p-4"
              style={{ background: '#111520', border: '1px solid #151c2e' }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: '#10f0b0', boxShadow: '0 0 8px #10f0b0', animation: 'dot-blink 1.2s ease-in-out infinite' }}
                  />
                  <span style={{ color: '#F0F4FF', fontSize: '13px', fontWeight: 600 }}>Master Audio Track</span>
                  <span style={{ color: '#4f5a72', fontSize: '12px' }}>take_01_kabir_intro.wav</span>
                </div>
                <button
                  className="btn-primary px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1v7M2.5 5l3.5 3.5L9.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="1" y1="11" x2="11" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  Export MP3
                </button>
              </div>
              <AnimatedWaveform barCount={64} height={72} color="#00d2df" />
              <div className="flex items-center justify-between mt-3">
                <span style={{ color: '#00d2df', fontSize: '12px', fontFamily: 'monospace' }}>00:42.10</span>
                <div className="flex items-center gap-2">
                  {['0.75x', '1.0x', '1.25x'].map(s => (
                    <button
                      key={s}
                      style={{
                        fontSize: '11px',
                        fontFamily: 'monospace',
                        color: s === '1.0x' ? '#00d2df' : '#4f5a72',
                        fontWeight: s === '1.0x' ? 700 : 400,
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <span style={{ color: '#4f5a72', fontSize: '12px', fontFamily: 'monospace' }}>02:45.00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          className="mt-16 flex w-full max-w-4xl flex-col overflow-hidden rounded-xl animate-fade-up sm:flex-row"
          style={{
            animationDelay: '0.6s',
            opacity: 0,
            background: 'rgba(13,15,23,0.9)',
            border: '1px solid #1e2a40',
            boxShadow: '0 16px 40px rgba(0,0,0,0.25)',
          }}
        >
          <StatBadge
            value="14,000+"
            label="Active creators"
            icon={<span style={{ fontSize: '14px', fontWeight: 700 }}>▣</span>}
          />
          <div className="hidden w-px bg-[#1e2a40] sm:block" />
          <StatBadge
            value="2.4M+"
            label="Minutes generated"
            icon={<span style={{ fontSize: '14px', fontWeight: 700 }}>▥</span>}
          />
          <div className="hidden w-px bg-[#1e2a40] sm:block" />
          <StatBadge
            value="4.9/5.0"
            label="Creator rating"
            icon={<span style={{ fontSize: '14px' }}>★</span>}
          />
        </div>
        </div>
      </section>

      {/* How it works */}
      <section id="features" className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="tag tag-accent mb-4">How it works</div>
            <h2
              className="font-display font-bold"
              style={{ fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.04em', color: '#F0F4FF' }}
            >
              From Raw Idea to YouTube-Ready{' '}
              <span className="text-gradient">in 3 Steps</span>
            </h2>
            <p style={{ color: '#8892aa', fontSize: '16px', marginTop: 16, maxWidth: 480, marginInline: 'auto' }}>
              No recording setup. No editing hours. Just your script and a download button.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="card-glow rounded-2xl p-7 flex flex-col gap-5 transition-all duration-300"
                style={{
                  background: '#0D0F17',
                  border: '1px solid #1e2a40',
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                <div className="flex items-start justify-between">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(0,210,223,0.1)', color: '#00d2df', border: '1px solid rgba(0,210,223,0.15)' }}
                  >
                    {step.icon}
                  </div>
                  <span
                    className="font-display font-bold"
                    style={{ fontSize: '40px', color: '#151c2e', letterSpacing: '-0.06em', lineHeight: 1 }}
                  >
                    {step.num}
                  </span>
                </div>
                <div>
                  <h3 style={{ color: '#F0F4FF', fontSize: '17px', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 8 }}>
                    {step.title}
                  </h3>
                  <p style={{ color: '#8892aa', fontSize: '14px', lineHeight: 1.6 }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Voice showcase */}
      <section className="py-24 px-6" style={{ background: '#0a0c13' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="tag tag-emerald mb-4">Voice Ensemble</div>
            <h2
              className="font-display font-bold"
              style={{ fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.04em', color: '#F0F4FF' }}
            >
              Curated Voices{' '}
              <span className="text-gradient">Engineered for Retention</span>
            </h2>
            <p style={{ color: '#8892aa', fontSize: '16px', marginTop: 12, maxWidth: 500, marginInline: 'auto' }}>
              Accurately tuned for long-form YouTube essays, historical explainers, and fast-paced Shorts.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-2 mb-8 justify-center flex-wrap">
            {['All', 'Hindi', 'Bengali', 'English (IN)'].map((f, i) => (
              <button
                key={f}
                className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
                style={{
                  background: i === 0 ? '#00d2df' : '#111520',
                  color: i === 0 ? '#090A0F' : '#8892aa',
                  border: '1px solid',
                  borderColor: i === 0 ? '#00d2df' : '#1e2a40',
                }}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {voices.map((v, i) => (
              <div
                key={v.name}
                className={`voice-card p-4 flex flex-col gap-3 ${playingVoice === i ? 'selected' : ''}`}
                onClick={() => setPlayingVoice(playingVoice === i ? null : i)}
              >
                {/* Avatar */}
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: '#1a1f2e' }}
                  >
                    {v.avatar}
                  </div>
                  <div className="min-w-0">
                    <div style={{ color: '#F0F4FF', fontWeight: 600, fontSize: '14px' }}>{v.name}</div>
                    <div style={{ color: '#00d2df', fontSize: '11px', fontWeight: 500 }}>{v.style}</div>
                  </div>
                </div>

                {/* Lang tag + play */}
                <div className="flex items-center justify-between">
                  <span className="tag tag-accent" style={{ fontSize: '10px' }}>{v.lang}</span>
                  <button
                    className="w-7 h-7 rounded-full flex items-center justify-center transition-all"
                    style={{
                      background: playingVoice === i ? '#00d2df' : 'rgba(0,210,223,0.1)',
                      color: playingVoice === i ? '#090A0F' : '#00d2df',
                      border: '1px solid rgba(0,210,223,0.2)',
                    }}
                  >
                    {playingVoice === i ? (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                        <rect x="1" y="1" width="3" height="8" />
                        <rect x="6" y="1" width="3" height="8" />
                      </svg>
                    ) : (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                        <path d="M2 1l7 4-7 4V1z" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Mini waveform when playing */}
                {playingVoice === i && (
                  <div className="flex items-center gap-[2px]" style={{ height: 20 }}>
                    {Array.from({ length: 20 }, (_, j) => (
                      <div
                        key={j}
                        className="waveform-bar animate-wave-bar"
                        style={{
                          height: `${8 + (j % 5) * 5}px`,
                          width: '2px',
                          animationDuration: `${0.6 + (j % 4) * 0.2}s`,
                          animationDelay: `${j * 0.05}s`,
                          background: '#00d2df',
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiation */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div
            className="rounded-2xl p-12 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(0,210,223,0.08) 0%, rgba(16,240,176,0.04) 100%)',
              border: '1px solid rgba(0,210,223,0.2)',
            }}
          >
            {/* Background glow */}
            <div
              className="absolute right-0 top-0 w-96 h-96 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse, rgba(0,210,223,0.12) 0%, transparent 70%)',
                filter: 'blur(40px)',
              }}
            />

            <div className="relative grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="tag tag-accent mb-5">Native Dialect Advantage</div>
                <h2
                  className="font-display font-bold mb-4"
                  style={{ fontSize: 'clamp(24px, 3vw, 40px)', letterSpacing: '-0.04em', color: '#F0F4FF' }}
                >
                  Trained on Native Dialects,{' '}
                  <span className="text-gradient">Not Generic Western Data</span>
                </h2>
                <p style={{ color: '#8892aa', fontSize: '15px', lineHeight: 1.7, marginBottom: 20 }}>
                  Generic AI tools stumble on regional inflections, retroflex consonants, and mixed-language conversational flow. Voiceover sounds like an authentic resident, not an automated translation.
                </p>
                <div className="flex flex-col gap-3">
                  {[
                    'Native Bengali/Hindi intonation with correct retroflex sounds',
                    'Code-switching between English and Hindi naturally',
                    'Emotional modifiers: Dramatic, Calm, Energetic, Somber',
                    'Up to 67% higher average view duration vs generic AI voices',
                  ].map(f => (
                    <div key={f} className="flex items-start gap-2.5">
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: 'rgba(0,210,223,0.15)', color: '#00d2df' }}
                      >
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M1 4l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </div>
                      <span style={{ color: '#8892aa', fontSize: '14px', lineHeight: 1.5 }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* vs comparison */}
              <div className="flex flex-col gap-4">
                <div
                  className="rounded-xl p-5"
                  style={{ background: '#0D0F17', border: '1px solid #1e2a40' }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span style={{ color: '#4f5a72', fontSize: '12px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      Generic AI Tools
                    </span>
                    <span className="tag" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)', fontSize: '10px' }}>
                      Fails Bengali/Hindi
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {['Flat regional accent', 'No retroflex sounds', 'Mispronounces loanwords', 'Robot-like inflection'].map(f => (
                      <div key={f} className="flex items-center gap-2">
                        <span style={{ color: '#ef4444', fontSize: '12px' }}>✕</span>
                        <span style={{ color: '#4f5a72', fontSize: '13px' }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="rounded-xl p-5"
                  style={{ background: 'rgba(0,210,223,0.05)', border: '1px solid rgba(0,210,223,0.2)' }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gradient font-semibold" style={{ fontSize: '13px', letterSpacing: '-0.02em' }}>
                      Voiceover Neural Engine
                    </span>
                    <span className="tag tag-emerald" style={{ fontSize: '10px' }}>Native Cultured</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {['Authentic dialect intonation', 'Native retroflex phonemes', 'Culturally aware pacing', 'Emotional depth & warmth'].map(f => (
                      <div key={f} className="flex items-center gap-2">
                        <span style={{ color: '#10f0b0', fontSize: '12px' }}>✓</span>
                        <span style={{ color: '#8892aa', fontSize: '13px' }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6" style={{ background: '#0a0c13' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="tag tag-accent mb-4">Transparent Creator Pricing</div>
            <h2
              className="font-display font-bold"
              style={{ fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.04em', color: '#F0F4FF' }}
            >
              Simple pricing,{' '}
              <span className="text-gradient">no surprises</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`pricing-card ${plan.featured ? 'featured' : ''} p-6 flex flex-col gap-5 relative`}
              >
                {plan.featured && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold"
                    style={{ background: '#00d2df', color: '#090A0F', whiteSpace: 'nowrap', letterSpacing: '0.04em' }}
                  >
                    MOST POPULAR
                  </div>
                )}
                <div>
                  <div style={{ color: '#8892aa', fontSize: '13px', marginBottom: 6 }}>{plan.name}</div>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span
                      className={`font-display font-bold ${plan.featured ? 'text-gradient' : ''}`}
                      style={{ fontSize: '32px', letterSpacing: '-0.05em', color: plan.featured ? undefined : '#F0F4FF' }}
                    >
                      {plan.price}
                    </span>
                    <span style={{ color: '#4f5a72', fontSize: '13px' }}>{plan.period}</span>
                  </div>
                  <div style={{ color: '#4f5a72', fontSize: '12px' }}>{plan.desc}</div>
                </div>

                <div className="flex flex-col gap-2.5 flex-1">
                  {plan.features.map(f => (
                    <div key={f} className="flex items-start gap-2">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 2, color: plan.featured ? '#00d2df' : '#4f5a72' }}>
                        <circle cx="7" cy="7" r="6.5" stroke="currentColor" strokeOpacity="0.4" />
                        <path d="M4 7l2 2 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                      </svg>
                      <span style={{ color: '#8892aa', fontSize: '13px', lineHeight: 1.4 }}>{f}</span>
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${plan.featured ? 'btn-primary' : 'btn-ghost'}`}
                  onClick={onGetStarted}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="tag tag-accent mb-4">Clarity & Answers</div>
            <h2
              className="font-display font-bold"
              style={{ fontSize: 'clamp(24px, 3.5vw, 42px)', letterSpacing: '-0.04em', color: '#F0F4FF' }}
            >
              Everything You Need to Know{' '}
              <span className="text-gradient">Before Creating</span>
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {faqItems.map((item, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden transition-all"
                style={{
                  background: '#0D0F17',
                  border: openFaq === i ? '1px solid rgba(0,210,223,0.2)' : '1px solid #1e2a40',
                }}
              >
                <button
                  className="w-full flex items-center justify-between p-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span style={{ color: '#F0F4FF', fontSize: '15px', fontWeight: 500, letterSpacing: '-0.01em' }}>
                    {item.q}
                  </span>
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ml-4 transition-all"
                    style={{
                      background: openFaq === i ? 'rgba(0,210,223,0.15)' : '#1a1f2e',
                      color: openFaq === i ? '#00d2df' : '#4f5a72',
                      transform: openFaq === i ? 'rotate(45deg)' : 'none',
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5" style={{ borderTop: '1px solid #151c2e' }}>
                    <p style={{ color: '#8892aa', fontSize: '14px', lineHeight: 1.7, paddingTop: 16 }}>
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-2xl p-14 text-center relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #0D0F17 0%, rgba(0,210,223,0.05) 100%)',
              border: '1px solid rgba(0,210,223,0.15)',
              boxShadow: '0 0 80px rgba(0,210,223,0.08)',
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 100%, rgba(0,210,223,0.08) 0%, transparent 70%)' }}
            />
            <div className="tag tag-emerald mb-5 mx-auto" style={{ width: 'fit-content' }}>Zero Editing Setup</div>
            <h2
              className="font-display font-bold mb-4"
              style={{ fontSize: 'clamp(28px, 4vw, 52px)', letterSpacing: '-0.04em', color: '#F0F4FF' }}
            >
              Your Next 100K-Subscriber Channel
              <br />
              <span className="text-gradient">Starts With One Click.</span>
            </h2>
            <p style={{ color: '#8892aa', fontSize: '16px', lineHeight: 1.6, maxWidth: 520, marginInline: 'auto', marginBottom: 32 }}>
              Stop wasting hours recording bad takes in cheap USB microphones. Generate studio-grade narration in Bengali, Hindi, and English easily.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <button
                className="btn-primary px-10 py-4 rounded-xl text-base font-semibold animate-glow-pulse"
                onClick={onGetStarted}
              >
                Get Started Free →
              </button>
              <button
                className="btn-ghost px-6 py-4 rounded-xl text-sm font-medium"
                onClick={onGetStarted}
              >
                Explore Voices
              </button>
            </div>
            <p style={{ color: '#4f5a72', fontSize: '12px', marginTop: 20 }}>
              No credit card required · 1 free minute forever
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #151c2e', background: '#090A0F' }} className="py-16 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                  <rect width="28" height="28" rx="8" fill="#111520" />
                  <rect x="5" y="11" width="3" height="6" rx="1.5" fill="#00d2df" />
                  <rect x="10" y="7" width="3" height="14" rx="1.5" fill="#00d2df" />
                  <rect x="15" y="9" width="3" height="10" rx="1.5" fill="#48effc" />
                  <rect x="20" y="12" width="3" height="4" rx="1.5" fill="#00d2df" />
                </svg>
                <span className="font-display font-bold text-sm" style={{ color: '#F0F4FF', letterSpacing: '-0.03em' }}>Voiceover</span>
              </div>
              <p style={{ color: '#4f5a72', fontSize: '13px', lineHeight: 1.6 }}>
                High-fidelity synthetic voice generation for creators, documentarians, and faceless content generators worldwide.
              </p>
            </div>

            {[
              { title: 'Product', links: ['Voice Library', 'Studio Editor', 'API Docs', 'Pricing'] },
              { title: 'Developers', links: ['Documentation', 'API Reference', 'Changelog', 'Status'] },
              { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Licensing', 'Cookies'] },
            ].map(col => (
              <div key={col.title}>
                <div style={{ color: '#F0F4FF', fontSize: '12px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 16 }}>
                  {col.title}
                </div>
                <div className="flex flex-col gap-3">
                  {col.links.map(l => (
                    <a
                      key={l}
                      href="#"
                      style={{ color: '#4f5a72', fontSize: '13px', textDecoration: 'none', transition: 'color 0.15s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#8892aa')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#4f5a72')}
                    >
                      {l}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid #151c2e', paddingTop: 24 }} className="flex items-center justify-between flex-wrap gap-4">
            <span style={{ color: '#4f5a72', fontSize: '13px' }}>
              © 2026 Voiceover. All rights reserved.
            </span>
            <div className="flex items-center gap-4">
              {['Twitter', 'YouTube', 'Discord'].map(s => (
                <a
                  key={s}
                  href="#"
                  style={{ color: '#4f5a72', fontSize: '13px', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#00d2df')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#4f5a72')}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
