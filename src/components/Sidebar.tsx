import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

interface Props {
  currentPage: string
  onNavigate: (page: string) => void
  onLogoClick?: () => void
  onToggleCollapse?: () => void
  collapsed?: boolean
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

export default function Sidebar({
  currentPage,
  onNavigate,
  onLogoClick,
  onToggleCollapse,
  collapsed = false,
  usagePercent = 0,
  minutesLeft = 0,
  totalMinutes = 1,
}: Props) {
  const [displayName, setDisplayName] = useState('Creator')
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (!supabase) return

    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) return
      setDisplayName(data.user.user_metadata?.full_name || data.user.email?.split('@')[0] || 'Creator')
      setEmail(data.user.email || '')
    })
  }, [])

  const initials = displayName
    .split(' ')
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <aside
      className="fixed left-0 top-0 h-full flex flex-col justify-between py-4 z-40 transition-all duration-200"
      style={{
        width: collapsed ? 72 : 224,
        background: '#0a0c13',
        borderRight: '1px solid #151c2e',
      }}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between px-3 pt-2">
          <button
            type="button"
            onClick={onLogoClick}
            className="flex items-center gap-3 text-left"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: onLogoClick ? 'pointer' : 'default',
              padding: 0,
            }}
          >
            <LogoMark />
            {!collapsed && (
              <span
                className="font-display font-bold text-base"
                style={{ color: '#F0F4FF', letterSpacing: '-0.03em' }}
              >
                Voiceover
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            style={{
              width: 26,
              height: 26,
              borderRadius: 8,
              border: '1px solid #1e2a40',
              background: '#111520',
              color: '#8892aa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            {collapsed ? '→' : '←'}
          </button>
        </div>

        <div className="px-2" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <nav className="flex flex-col gap-0.5">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                className={`sidebar-item w-full text-left ${currentPage === id ? 'active' : ''}`}
                onClick={() => onNavigate(id)}
                style={{
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  paddingLeft: collapsed ? 10 : 12,
                  paddingRight: collapsed ? 10 : 12,
                }}
              >
                <Icon size={18} />
                {!collapsed && <span>{label}</span>}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="px-3 flex flex-col gap-3" style={{ alignItems: collapsed ? 'center' : 'stretch' }}>
        <div
          className="rounded-xl p-3 flex flex-col gap-2.5"
          style={{
            background: '#111520',
            border: '1px solid #1e2a40',
            width: collapsed ? 52 : '100%',
            padding: collapsed ? 8 : 12,
          }}
        >
          {!collapsed && (
            <>
              <div className="flex items-center justify-between">
                <span style={{ color: '#4f5a72', fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Free Plan
                </span>
                <span style={{ color: '#00d2df', fontSize: '12px', fontWeight: 600 }}>
                  {minutesLeft}s left
                </span>
              </div>

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
            </>
          )}

          {collapsed && (
            <button
              className="btn-primary w-full py-2 rounded-lg text-xs font-semibold"
              onClick={() => onNavigate('billing')}
              style={{ padding: '8px 6px' }}
            >
              ↑
            </button>
          )}
        </div>

        <div className="flex items-center gap-2.5 px-1 py-1" style={{ width: '100%', justifyContent: collapsed ? 'center' : 'flex-start' }}>
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
            style={{ background: 'rgba(0,210,223,0.15)', color: '#00d2df' }}
          >
            {initials}
          </div>
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span style={{ color: '#8892aa', fontSize: '12px', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {displayName}
              </span>
              <span style={{ color: '#4f5a72', fontSize: '11px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {email || 'Free tier'}
              </span>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
