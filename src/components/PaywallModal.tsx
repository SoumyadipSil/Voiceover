import { useState } from 'react'

interface Props {
  onClose: () => void
  onUpgrade: () => void
}

export default function PaywallModal({ onClose, onUpgrade }: Props) {
  const [selected, setSelected] = useState<'creator' | 'pack'>('creator')

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(9,10,15,0.85)', backdropFilter: 'blur(20px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl p-8 flex flex-col gap-6 animate-fade-up"
        style={{
          background: 'linear-gradient(145deg, #111520 0%, #0D0F17 100%)',
          border: '1px solid rgba(0,210,223,0.2)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.8), 0 0 60px rgba(0,210,223,0.12)',
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          style={{ background: '#1a1f2e', color: '#4f5a72' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#F0F4FF')}
          onMouseLeave={e => (e.currentTarget.style.color = '#4f5a72')}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: 'rgba(0,210,223,0.12)', boxShadow: '0 0 24px rgba(0,210,223,0.2)' }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="13" stroke="#00d2df" strokeWidth="1.5" strokeDasharray="3 2" />
              <path d="M14 7v14M7 14h14" stroke="#00d2df" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="tag tag-accent">1-minute free limit reached</div>
          <h2 className="font-display text-2xl font-bold" style={{ color: '#F0F4FF', letterSpacing: '-0.03em' }}>
            Your script is ready.<br />
            <span className="text-gradient">Unlock the full audio.</span>
          </h2>
          <p style={{ color: '#8892aa', fontSize: '14px', lineHeight: '1.6', maxWidth: '400px' }}>
            Your 1-minute free preview rendered perfectly. Upgrade to export the complete audio with full commercial rights.
          </p>
        </div>

        {/* Feature badges */}
        <div
          className="grid grid-cols-3 gap-3 rounded-xl p-4"
          style={{ background: '#0D0F17', border: '1px solid #1e2a40' }}
        >
          {[
            { icon: '✦', label: 'Commercial YouTube rights' },
            { icon: '◈', label: 'Bengali & Hindi voices' },
            { icon: '⚡', label: 'Priority generation queue' },
          ].map(f => (
            <div key={f.label} className="flex items-center gap-2">
              <span style={{ color: '#00d2df', fontSize: '14px' }}>{f.icon}</span>
              <span style={{ color: '#8892aa', fontSize: '12px', fontWeight: 500 }}>{f.label}</span>
            </div>
          ))}
        </div>

        {/* Plan options */}
        <div className="grid grid-cols-2 gap-4">
          {/* Creator plan */}
          <div
            className="relative rounded-xl p-5 flex flex-col gap-4 cursor-pointer transition-all"
            style={{
              background: selected === 'creator' ? 'rgba(0,210,223,0.07)' : '#0D0F17',
              border: selected === 'creator' ? '1px solid rgba(0,210,223,0.35)' : '1px solid #1e2a40',
              boxShadow: selected === 'creator' ? '0 0 24px rgba(0,210,223,0.1)' : 'none',
            }}
            onClick={() => setSelected('creator')}
          >
            <div
              className="absolute -top-2.5 left-4 px-2.5 py-0.5 rounded-full text-xs font-bold"
              style={{ background: '#00d2df', color: '#090A0F', letterSpacing: '0.04em' }}
            >
              MOST POPULAR
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="font-display text-3xl font-bold" style={{ color: '#F0F4FF' }}>$29</span>
                <span style={{ color: '#4f5a72', fontSize: '13px' }}>/month</span>
              </div>
              <div style={{ color: '#F0F4FF', fontWeight: 600, marginTop: 4 }}>Creator Pro</div>
              <p style={{ color: '#4f5a72', fontSize: '12px', marginTop: 4, lineHeight: '1.5' }}>
                180 min/month · Unlimited voices · Studio exports · Commercial rights
              </p>
            </div>
            <button
              className="btn-primary w-full py-2.5 rounded-xl text-sm font-semibold"
              onClick={(e) => { e.stopPropagation(); onUpgrade(); }}
            >
              Upgrade to Creator →
            </button>
          </div>

          {/* Pack */}
          <div
            className="rounded-xl p-5 flex flex-col gap-4 cursor-pointer transition-all"
            style={{
              background: selected === 'pack' ? 'rgba(0,210,223,0.04)' : '#0D0F17',
              border: selected === 'pack' ? '1px solid rgba(0,210,223,0.2)' : '1px solid #1e2a40',
            }}
            onClick={() => setSelected('pack')}
          >
            <div>
              <div className="flex items-baseline gap-1">
                <span className="font-display text-3xl font-bold" style={{ color: '#F0F4FF' }}>$5</span>
                <span style={{ color: '#4f5a72', fontSize: '13px' }}>one-time</span>
              </div>
              <div style={{ color: '#F0F4FF', fontWeight: 600, marginTop: 4 }}>Single Video Pack</div>
              <p style={{ color: '#4f5a72', fontSize: '12px', marginTop: 4, lineHeight: '1.5' }}>
                20 minutes one-time · Perfect for finishing this video now
              </p>
            </div>
            <button
              className="btn-ghost w-full py-2.5 rounded-xl text-sm font-semibold"
              onClick={(e) => { e.stopPropagation(); onUpgrade(); }}
            >
              Add 20 minutes ($5)
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between" style={{ color: '#4f5a72', fontSize: '12px' }}>
          <div className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect x="1" y="4" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M4 4V3a2 2 0 114 0v1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            Encrypted Stripe checkout
          </div>
          <span>7-day refund · Cancel anytime</span>
        </div>
      </div>
    </div>
  )
}
