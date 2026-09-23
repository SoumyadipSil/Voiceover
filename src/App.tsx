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
  const [userInitial, setUserInitial] = useState('C')

  useEffect(() => {
    if (!supabase) return

    supabase.auth.getUser().then(({ data }) => {
      const name = data.user?.user_metadata?.full_name || data.user?.email || 'Creator'
      setUserInitial(name.trim().charAt(0).toUpperCase())
    })
  }, [])

  const usagePercent = 0
  const minutesLeft = 60
  const totalMinutes = 1

  return (
    <div className="min-h-screen flex" style={{ background: '#090A0F' }}>
      <Sidebar
        currentPage={currentPage}
        onNavigate={page => navigate(`/${page}`)}
        usagePercent={usagePercent}
        minutesLeft={minutesLeft}
        totalMinutes={totalMinutes}
      />

      {/* Main content */}
      <div className="flex-1 ml-56 flex flex-col min-h-screen">
        {/* Top header bar */}
        <header
          className="flex items-center justify-between px-6 h-14 flex-shrink-0 sticky top-0 z-30"
          style={{
            background: 'rgba(9,10,15,0.9)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid #151c2e',
          }}
        >
          <div style={{ color: '#4f5a72', fontSize: '13px' }}>
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
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer"
              style={{ background: 'rgba(0,210,223,0.15)', color: '#00d2df', border: '1px solid rgba(0,210,223,0.2)' }}
              onClick={() => navigate('/settings')}
            >
              {userInitial}
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
        <Route path="/" element={<Landing onGetStarted={() => navigate('/signup')} onLogin={() => navigate('/login')} />} />
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
