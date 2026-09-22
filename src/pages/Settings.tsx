import { useState } from 'react'

export default function Settings() {
  const [name, setName] = useState('Rahul Sharma')
  const [email, setEmail] = useState('rahul@example.com')
  const [emailNotifs, setEmailNotifs] = useState(true)
  const [weeklyDigest, setWeeklyDigest] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="flex flex-col gap-5 p-5 max-w-2xl">
      <div>
        <h1 className="font-display font-bold text-xl" style={{ color: '#F0F4FF', letterSpacing: '-0.04em' }}>
          Settings
        </h1>
        <p style={{ color: '#4f5a72', fontSize: '13px', marginTop: 2 }}>
          Manage your account, preferences, and security.
        </p>
      </div>

      {/* Profile */}
      <div
        className="rounded-xl p-5 flex flex-col gap-4"
        style={{ background: '#0D0F17', border: '1px solid #1e2a40' }}
      >
        <span style={{ color: '#F0F4FF', fontSize: '14px', fontWeight: 600 }}>Profile Information</span>

        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold flex-shrink-0"
            style={{ background: 'rgba(0,210,223,0.12)', color: '#00d2df', border: '1px solid rgba(0,210,223,0.2)' }}
          >
            R
          </div>
          <div>
            <button className="btn-ghost px-4 py-2 rounded-xl text-sm font-medium">
              Change avatar
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label style={{ color: '#8892aa', fontSize: '12px', fontWeight: 500, display: 'block', marginBottom: 6 }}>
              Full name
            </label>
            <input
              className="input-field w-full px-4 py-3 rounded-xl text-sm"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div>
            <label style={{ color: '#8892aa', fontSize: '12px', fontWeight: 500, display: 'block', marginBottom: 6 }}>
              Email address
            </label>
            <input
              type="email"
              className="input-field w-full px-4 py-3 rounded-xl text-sm"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
        </div>

        <button
          className="btn-primary px-6 py-2.5 rounded-xl text-sm font-semibold self-start flex items-center gap-2"
          onClick={handleSave}
        >
          {saved ? (
            <>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7l4 4 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Saved!
            </>
          ) : 'Save changes'}
        </button>
      </div>

      {/* Password */}
      <div
        className="rounded-xl p-5 flex flex-col gap-4"
        style={{ background: '#0D0F17', border: '1px solid #1e2a40' }}
      >
        <span style={{ color: '#F0F4FF', fontSize: '14px', fontWeight: 600 }}>Change Password</span>
        <div className="flex flex-col gap-3">
          {['Current password', 'New password', 'Confirm new password'].map(label => (
            <div key={label}>
              <label style={{ color: '#8892aa', fontSize: '12px', fontWeight: 500, display: 'block', marginBottom: 6 }}>
                {label}
              </label>
              <input
                type="password"
                className="input-field w-full px-4 py-3 rounded-xl text-sm"
                placeholder="••••••••"
              />
            </div>
          ))}
        </div>
        <button className="btn-ghost px-6 py-2.5 rounded-xl text-sm font-medium self-start">
          Update password
        </button>
      </div>

      {/* Email preferences */}
      <div
        className="rounded-xl p-5 flex flex-col gap-4"
        style={{ background: '#0D0F17', border: '1px solid #1e2a40' }}
      >
        <span style={{ color: '#F0F4FF', fontSize: '14px', fontWeight: 600 }}>Email Preferences</span>
        <div className="flex flex-col gap-3">
          {[
            { label: 'Generation notifications', desc: 'Get an email when your audio is ready', value: emailNotifs, set: setEmailNotifs },
            { label: 'Weekly creator digest', desc: 'Tips, new voices, and platform updates', value: weeklyDigest, set: setWeeklyDigest },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between">
              <div>
                <div style={{ color: '#F0F4FF', fontSize: '13px', fontWeight: 500 }}>{item.label}</div>
                <div style={{ color: '#4f5a72', fontSize: '12px', marginTop: 2 }}>{item.desc}</div>
              </div>
              <button
                onClick={() => item.set(!item.value)}
                style={{
                  width: 40, height: 22, borderRadius: 11,
                  background: item.value ? '#00d2df' : '#1e2a40',
                  position: 'relative', cursor: 'pointer', border: 'none',
                  transition: 'background 0.2s',
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: 16, height: 16, borderRadius: '50%', background: 'white',
                    position: 'absolute', top: 3,
                    left: item.value ? 21 : 3,
                    transition: 'left 0.2s',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                  }}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Danger zone */}
      <div
        className="rounded-xl p-5 flex flex-col gap-4"
        style={{ background: '#0D0F17', border: '1px solid rgba(239,68,68,0.15)' }}
      >
        <span style={{ color: '#ef4444', fontSize: '14px', fontWeight: 600 }}>Danger Zone</span>
        <div className="flex items-center justify-between">
          <div>
            <div style={{ color: '#F0F4FF', fontSize: '13px', fontWeight: 500 }}>Delete account</div>
            <div style={{ color: '#4f5a72', fontSize: '12px', marginTop: 2 }}>
              Permanently delete your account and all generated audio. This cannot be undone.
            </div>
          </div>
          <button
            className="px-4 py-2 rounded-xl text-sm font-medium flex-shrink-0"
            style={{
              background: 'rgba(239,68,68,0.08)', color: '#ef4444',
              border: '1px solid rgba(239,68,68,0.2)',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(239,68,68,0.15)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(239,68,68,0.08)'
            }}
          >
            Delete account
          </button>
        </div>
      </div>
    </div>
  )
}
