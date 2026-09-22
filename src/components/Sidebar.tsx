interface Props {
  currentPage: string
  onNavigate: (page: string) => void
  onExitToDashboard?: () => void
  usagePercent?: number
  minutesLeft?: number
  totalMinutes?: number
}

const navItems = [
  { id: 'dashboard', label: 'Generate', icon: MicIcon },
  { id: 'history', label: 'History', icon: HistoryIcon },
  { id: 'billing', label: 'Billing', icon: CardIcon },
  { id: 'settings', label: 'Settings', icon: SettingsIcon },
]

function MicIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <rect x="6" y="1" width="6" height="9" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 9c0 3.314 2.686 6 6 6s6-2.686 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="9" y1="15" x2="9" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="6" y1="17" x2="12" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function HistoryIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 5.5V9.5l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function CardIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <rect x="1.5" y="3.5" width="15" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <line x1="1.5" y1="7.5" x2="16.5" y2="7.5" stroke="currentColor" strokeWidth="1.5" />
      <line x1="4" y1="11.5" x2="7" y2="11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function SettingsIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 1.5v2M9 14.5v2M1.5 9h2M14.5 9h2M3.459 3.459l1.414 1.414M13.127 13.127l1.414 1.414M14.541 3.459l-1.414 1.414M4.873 13.127l-1.414 1.414" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function LogoMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="8" fill="#111520" />
      <rect x="5" y="11" width="3" height="6" rx="1.5" fill="#00d2df" />
      <rect x="10" y="7" width="3" height="14" rx="1.5" fill="#00d2df" />
      <rect x="15" y="9" width="3" height="10" rx="1.5" fill="#48effc" />
      <rect x="20" y="12" width="3" height="4" rx="1.5" fill="#00d2df" />
    </svg>
  )
}

export default function Sidebar({ currentPage, onNavigate, usagePercent = 0, minutesLeft = 0, totalMinutes = 1 }: Props) {
  return (
    <aside
      className="fixed left-0 top-0 h-full w-56 flex flex-col justify-between py-4 z-40"
      style={{
        background: '#0a0c13',
        borderRight: '1px solid #151c2e',
      }}
    >
      <div className="flex flex-col gap-6">
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 pt-2">
          <LogoMark />
          <span
            className="font-display font-bold text-base"
            style={{ color: '#F0F4FF', letterSpacing: '-0.03em' }}
          >
            Voiceover
          </span>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-0.5 px-2">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`sidebar-item w-full text-left ${currentPage === id ? 'active' : ''}`}
              onClick={() => onNavigate(id)}
            >
              <Icon />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Usage meter */}
      <div className="px-3 flex flex-col gap-3">
        <div
          className="rounded-xl p-3 flex flex-col gap-2.5"
          style={{ background: '#111520', border: '1px solid #1e2a40' }}
        >
          <div className="flex items-center justify-between">
            <span style={{ color: '#4f5a72', fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Free Plan
            </span>
            <span style={{ color: '#00d2df', fontSize: '12px', fontWeight: 600 }}>
              {minutesLeft}s left
            </span>
          </div>

          {/* Bar */}
          <div style={{ background: '#1a1f2e', borderRadius: 4, height: 4, overflow: 'hidden' }}>
            <div
              style={{
                width: `${usagePercent}%`,
                height: '100%',
                background: usagePercent > 80 ? '#ef4444' : 'linear-gradient(90deg, #00d2df, #48effc)',
                borderRadius: 4,
                transition: 'width 0.5s ease',
              }}
            />
          </div>

          <div style={{ color: '#4f5a72', fontSize: '11px' }}>
            {totalMinutes - minutesLeft}s used of {totalMinutes}min
          </div>

          <button
            className="btn-primary w-full py-2 rounded-lg text-xs font-semibold"
            onClick={() => onNavigate('billing')}
          >
            Upgrade Plan ↑
          </button>
        </div>

        {/* User avatar */}
        <div className="flex items-center gap-2.5 px-1 py-1">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
            style={{ background: 'rgba(0,210,223,0.15)', color: '#00d2df' }}
          >
            R
          </div>
          <div className="flex flex-col min-w-0">
            <span style={{ color: '#8892aa', fontSize: '12px', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              Rahul Sharma
            </span>
            <span style={{ color: '#4f5a72', fontSize: '11px' }}>Free tier</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
