import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation, useNavigate, useOutletContext } from 'react-router-dom'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import History from './pages/History'
import Billing from './pages/Billing'
import Settings from './pages/Settings'
import Sidebar from './components/Sidebar'
import PaywallModal from './components/PaywallModal'
import { isSupabaseConfigured, supabase } from './lib/supabase'

type AppPage = 'dashboard' | 'history' | 'billing' | 'settings'
type AppShellContext = { onShowPaywall: () => void }

function ProtectedRoute({ authed }: { authed: boolean }) {
  return authed ? <Outlet /> : <Navigate to="/" replace />
}

function AuthLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#090A0F', color: '#8892aa' }}>
      Restoring your session...
    </div>
  )
}

function DashboardRoute() {
  const { onShowPaywall } = useOutletContext<AppShellContext>()
  return <Dashboard onShowPaywall={onShowPaywall} />
}

function BillingRoute() {
  const { onShowPaywall } = useOutletContext<AppShellContext>()
  return <Billing onUpgrade={onShowPaywall} />
}

function AppShell() {
  const navigate = useNavigate()
  const location = useLocation()
  const currentPage = location.pathname.slice(1) as AppPage
  const [showPaywall, setShowPaywall] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [userInitial, setUserInitial] = useState('C')
  const [profileName, setProfileName] = useState('Creator')
  const [profileEmail, setProfileEmail] = useState('')
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    if (!supabase) return

    supabase.auth.getUser().then(({ data }) => {
      const name = data.user?.user_metadata?.full_name || data.user?.email?.split('@')[0] || 'Creator'
      const email = data.user?.email || ''
      setUserInitial(name.trim().charAt(0).toUpperCase())
      setProfileName(name)
      setProfileEmail(email)
    })
  }, [])

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('[data-profile-menu-root]')) {
        setProfileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [])

  const handleLogout = async () => {
    setProfileMenuOpen(false)

    if (supabase) {
      await supabase.auth.signOut()
    }

    localStorage.removeItem('voiceover-demo-auth')
    navigate('/login')
  }

  const usagePercent = 0
  const minutesLeft = 60
  const totalMinutes = 1

  return (
    <div className="min-h-screen flex" style={{ background: '#090A0F' }}>
      <Sidebar
        currentPage={currentPage}
        onNavigate={page => navigate(`/${page}`)}
        onLogoClick={() => navigate('/dashboard')}
        onToggleCollapse={() => setSidebarCollapsed(value => !value)}
        collapsed={sidebarCollapsed}
        usagePercent={usagePercent}
        minutesLeft={minutesLeft}
        totalMinutes={totalMinutes}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen" style={{ marginLeft: sidebarCollapsed ? 72 : 224 }}>
        {/* Top header bar */}
        <header
          className="flex items-center justify-between px-6 h-14 flex-shrink-0 sticky top-0 z-30"
          style={{
            background: 'rgba(9,10,15,0.9)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid #151c2e',
          }}
        >
          <div
            style={{
              color: '#4f5a72',
              fontSize: '13px',
              background: 'transparent',
              border: 'none',
              padding: 0,
            }}
          >
            <span style={{ color: '#F0F4FF', fontWeight: 500 }}>Voiceover</span>
            <span style={{ margin: '0 6px' }}>/</span>
            <span style={{ textTransform: 'capitalize' }}>{currentPage}</span>
          </div>
          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-2 rounded-lg px-3 py-1.5"
              style={{ background: '#111520', border: '1px solid #1e2a40' }}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <circle cx="6" cy="6" r="5" stroke="#4f5a72" strokeWidth="1.3" />
                <path d="M10 10l2.5 2.5" stroke="#4f5a72" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              <input
                className="bg-transparent border-none outline-none text-xs"
                style={{ color: '#F0F4FF', width: 160 }}
                placeholder="Search scripts, voices..."
              />
            </div>
            <div data-profile-menu-root style={{ position: 'relative' }}>
              <button
                type="button"
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer"
                style={{ background: 'rgba(0,210,223,0.15)', color: '#00d2df', border: '1px solid rgba(0,210,223,0.2)' }}
                onClick={() => setProfileMenuOpen(value => !value)}
                aria-haspopup="menu"
                aria-expanded={profileMenuOpen}
              >
                {userInitial}
              </button>

              {profileMenuOpen && (
                <div
                  className="absolute right-0 top-full mt-3 rounded-2xl border shadow-2xl"
                  style={{
                    width: 260,
                    background: '#0d1118',
                    borderColor: '#1e2a40',
                    boxShadow: '0 20px 45px rgba(0,0,0,0.35)',
                    zIndex: 50,
                  }}
                >
                  <div className="flex items-center gap-3 border-b px-4 py-3" style={{ borderColor: '#151c2e' }}>
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold"
                      style={{ background: 'rgba(0,210,223,0.15)', color: '#00d2df' }}
                    >
                      {userInitial}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-white">{profileName}</div>
                      <div className="truncate text-xs text-[#8892aa]">{profileEmail || 'creator@voiceover.ai'}</div>
                    </div>
                  </div>

                  <div className="p-2 text-sm">
                    <button type="button" onClick={() => { setProfileMenuOpen(false); navigate('/settings') }} className="w-full rounded-xl px-3 py-2 text-left text-[#e7ecf6] hover:bg-[#111827]">Account Settings</button>
                    <button type="button" onClick={() => { setProfileMenuOpen(false); navigate('/settings') }} className="w-full rounded-xl px-3 py-2 text-left text-[#e7ecf6] hover:bg-[#111827]">Security Settings</button>
                    <button type="button" onClick={() => { setProfileMenuOpen(false); navigate('/history') }} className="w-full rounded-xl px-3 py-2 text-left text-[#e7ecf6] hover:bg-[#111827]">Cloud Save</button>
                    <button type="button" onClick={() => { setProfileMenuOpen(false); navigate('/history') }} className="w-full rounded-xl px-3 py-2 text-left text-[#e7ecf6] hover:bg-[#111827]">File History</button>
                    <button type="button" onClick={() => { setProfileMenuOpen(false); navigate('/billing') }} className="w-full rounded-xl px-3 py-2 text-left text-[#e7ecf6] hover:bg-[#111827]">Subscription</button>

                    <button
                      type="button"
                      onClick={() => setDarkMode(value => !value)}
                      className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-[#e7ecf6] hover:bg-[#111827]"
                    >
                      <span>Dark mode</span>
                      <span className="inline-flex h-5 w-9 items-center rounded-full px-1" style={{ background: darkMode ? 'rgba(0,210,223,0.2)' : '#1f2937' }}>
                        <span className="h-3.5 w-3.5 rounded-full bg-white" style={{ transform: darkMode ? 'translateX(14px)' : 'translateX(0)', transition: 'transform 0.2s ease' }} />
                      </span>
                    </button>

                    <button type="button" onClick={handleLogout} className="mt-2 w-full rounded-xl border px-3 py-2 text-left font-medium text-[#fca5a5]" style={{ borderColor: '#2a1f2b', background: 'rgba(239,68,68,0.06)' }}>Logout</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet context={{ onShowPaywall: () => setShowPaywall(true) }} />
        </main>
      </div>

      {showPaywall && (
        <PaywallModal
          onClose={() => setShowPaywall(false)}
          onUpgrade={() => {
            setShowPaywall(false)
            navigate('/billing')
          }}
        />
      )}
    </div>
  )
}

function AppRoutes({ authed, setAuthed }: { authed: boolean; setAuthed: (value: boolean) => void }) {
  const navigate = useNavigate()

  return (
    <Routes>
        <Route
          path="/"
          element={
            <Landing
              isAuthed={authed}
              onGetStarted={() => navigate('/signup')}
              onLogin={() => navigate('/login')}
              onOpenDashboard={() => navigate('/dashboard')}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Auth
              mode="login"
              onSuccess={() => {
                setAuthed(true)
                navigate('/dashboard')
              }}
              onBackToLanding={() => navigate('/')}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <Auth
              mode="signup"
              onSuccess={() => {
                setAuthed(true)
                navigate('/dashboard')
              }}
              onBackToLanding={() => navigate('/')}
            />
          }
        />
        <Route element={<ProtectedRoute authed={authed} />}>
          <Route element={<AppShell />}>
            <Route path="/dashboard" element={<DashboardRoute />} />
            <Route path="/history" element={<History />} />
            <Route path="/billing" element={<BillingRoute />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  const [authed, setAuthed] = useState<boolean | null>(() => (
    isSupabaseConfigured ? null : localStorage.getItem('voiceover-demo-auth') === 'true'
  ))

  useEffect(() => {
    if (!supabase) return

    supabase.auth.getSession().then(({ data }) => {
      setAuthed(Boolean(data.session))
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthed(Boolean(session))
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  return (
    <BrowserRouter>
      {authed === null ? <AuthLoading /> : <AppRoutes authed={authed} setAuthed={setAuthed} />}
    </BrowserRouter>
  )
}
