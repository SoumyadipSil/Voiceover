import { useState } from 'react'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import History from './pages/History'
import Billing from './pages/Billing'
import Settings from './pages/Settings'
import Sidebar from './components/Sidebar'
import PaywallModal from './components/PaywallModal'

type Page = 'landing' | 'login' | 'signup' | 'dashboard' | 'history' | 'billing' | 'settings'

function AppShell({ initialPage }: { initialPage: 'dashboard' | 'history' | 'billing' | 'settings' }) {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'history' | 'billing' | 'settings'>(initialPage)
  const [showPaywall, setShowPaywall] = useState(false)

  const usagePercent = 0
  const minutesLeft = 60
  const totalMinutes = 1

  return (
    <div className="min-h-screen flex" style={{ background: '#090A0F' }}>
      <Sidebar
        currentPage={currentPage}
        onNavigate={p => setCurrentPage(p as 'dashboard' | 'history' | 'billing' | 'settings')}
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
              onClick={() => setCurrentPage('settings')}
            >
              R
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {currentPage === 'dashboard' && (
            <Dashboard onShowPaywall={() => setShowPaywall(true)} />
          )}
          {currentPage === 'history' && <History />}
          {currentPage === 'billing' && (
            <Billing onUpgrade={() => setShowPaywall(true)} />
          )}
          {currentPage === 'settings' && <Settings />}
        </main>
      </div>

      {showPaywall && (
        <PaywallModal
          onClose={() => setShowPaywall(false)}
          onUpgrade={() => {
            setShowPaywall(false)
            setCurrentPage('billing')
          }}
        />
      )}
    </div>
  )
}

export default function App() {
  const [page, setPage] = useState<Page>('landing')
  const [authed, setAuthed] = useState(false)

  if (authed && (page === 'dashboard' || page === 'history' || page === 'billing' || page === 'settings')) {
    return <AppShell initialPage={page === 'dashboard' || page === 'history' || page === 'billing' || page === 'settings' ? page : 'dashboard'} />
  }

  if (page === 'login' || page === 'signup') {
    return (
      <Auth
        mode={page === 'login' ? 'login' : 'signup'}
        onSuccess={() => {
          setAuthed(true)
          setPage('dashboard')
        }}
        onBackToLanding={() => setPage('landing')}
      />
    )
  }

  return (
    <Landing
      onGetStarted={() => setPage('signup')}
      onLogin={() => setPage('login')}
    />
  )
}
