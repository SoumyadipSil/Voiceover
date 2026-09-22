import { useState } from 'react'

interface Props {
  mode?: 'login' | 'signup'
  onSuccess: () => void
  onBackToLanding: () => void
}

export default function Auth({ mode: initialMode = 'signup', onSuccess, onBackToLanding }: Props) {
  const [mode, setMode] = useState(initialMode)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onSuccess()
    }, 900)
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 relative"
      style={{ background: '#090A0F' }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none grid-bg"
        style={{ opacity: 0.6 }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 0%, rgba(0,210,223,0.08) 0%, transparent 60%)' }}
      />

      {/* Back button */}
      <button
        onClick={onBackToLanding}
        className="absolute top-6 left-6 btn-ghost px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back
      </button>

      <div className="w-full max-w-md relative z-10 animate-fade-up">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: '#111520', border: '1px solid #1e2a40', boxShadow: '0 0 32px rgba(0,210,223,0.12)' }}
          >
            <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
              <rect x="3" y="9" width="4" height="10" rx="2" fill="#00d2df" />
              <rect x="9" y="5" width="4" height="18" rx="2" fill="#00d2df" />
              <rect x="15" y="7" width="4" height="14" rx="2" fill="#48effc" />
              <rect x="21" y="11" width="4" height="6" rx="2" fill="#00d2df" />
            </svg>
          </div>
          <h1
            className="font-display font-bold text-2xl"
            style={{ color: '#F0F4FF', letterSpacing: '-0.04em' }}
          >
            {mode === 'login' ? 'Welcome back' : 'Start creating'}
          </h1>
          <p style={{ color: '#4f5a72', fontSize: '14px', marginTop: 6 }}>
            {mode === 'login'
              ? 'Sign in to your Voiceover account'
              : '1 free minute included — no credit card needed'}
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-7"
          style={{
            background: '#0D0F17',
            border: '1px solid #1e2a40',
            boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
          }}
        >
          {/* Toggle */}
          <div
            className="flex rounded-xl p-1 mb-6"
            style={{ background: '#111520', border: '1px solid #151c2e' }}
          >
            {(['signup', 'login'] as const).map(m => (
              <button
                key={m}
                className="flex-1 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: mode === m ? '#00d2df' : 'transparent',
                  color: mode === m ? '#090A0F' : '#4f5a72',
                }}
                onClick={() => setMode(m)}
              >
                {m === 'signup' ? 'Sign up' : 'Log in'}
              </button>
            ))}
          </div>

          {/* Google OAuth */}
          <button
            className="btn-ghost w-full py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-3 mb-5"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853" />
              <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div style={{ flex: 1, height: 1, background: '#1e2a40' }} />
            <span style={{ color: '#4f5a72', fontSize: '12px' }}>or</span>
            <div style={{ flex: 1, height: 1, background: '#1e2a40' }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === 'signup' && (
              <div>
                <label style={{ color: '#8892aa', fontSize: '13px', fontWeight: 500, display: 'block', marginBottom: 6 }}>
                  Full name
                </label>
                <input
                  className="input-field w-full px-4 py-3 rounded-xl text-sm"
                  placeholder="Your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>
            )}

            <div>
              <label style={{ color: '#8892aa', fontSize: '13px', fontWeight: 500, display: 'block', marginBottom: 6 }}>
                Email address
              </label>
              <input
                type="email"
                className="input-field w-full px-4 py-3 rounded-xl text-sm"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label style={{ color: '#8892aa', fontSize: '13px', fontWeight: 500 }}>
                  Password
                </label>
                {mode === 'login' && (
                  <button type="button" style={{ color: '#00d2df', fontSize: '12px', background: 'none', border: 'none', cursor: 'pointer' }}>
                    Forgot password?
                  </button>
                )}
              </div>
              <input
                type="password"
                className="input-field w-full px-4 py-3 rounded-xl text-sm"
                placeholder={mode === 'signup' ? 'Min. 8 characters' : '••••••••'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full py-3.5 rounded-xl text-sm font-semibold mt-1 flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div
                    className="w-4 h-4 rounded-full border-2"
                    style={{ borderColor: '#090A0F', borderTopColor: 'transparent', animation: 'spin-slow 0.8s linear infinite' }}
                  />
                  {mode === 'signup' ? 'Creating account...' : 'Signing in...'}
                </>
              ) : (
                mode === 'signup' ? 'Create free account →' : 'Sign in to Voiceover →'
              )}
            </button>
          </form>

          {mode === 'signup' && (
            <p style={{ color: '#4f5a72', fontSize: '11px', textAlign: 'center', marginTop: 16, lineHeight: 1.6 }}>
              By signing up, you agree to our{' '}
              <a href="#" style={{ color: '#8892aa', textDecoration: 'underline' }}>Terms of Service</a>{' '}
              and{' '}
              <a href="#" style={{ color: '#8892aa', textDecoration: 'underline' }}>Privacy Policy</a>.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
