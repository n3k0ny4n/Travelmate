import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useMe } from './api/auth'
import { LoginPage } from './pages/LoginPage'
import { AuthVerifyPage } from './pages/AuthVerifyPage'
import { TodayPage } from './pages/TodayPage'
import { OverviewPage } from './pages/OverviewPage'
import { AccommodationsPage } from './pages/AccommodationsPage'
import { TransportPage } from './pages/TransportPage'
import { TicketsPage } from './pages/TicketsPage'
import { MapPage } from './pages/MapPage'
import { TodosPage } from './pages/TodosPage'
import { MediaPage } from './pages/MediaPage'
import { BottomNav } from './components/BottomNav'
import { TripSelector } from './components/TripSelector'
import { SaveIndicator } from './components/SaveIndicator'
import { useAppStore } from './store'

const qc = new QueryClient({
  defaultOptions: { queries: { staleTime: 30_000, retry: 1 } },
})

function AppShell() {
  const { data: me, isLoading } = useMe()
  const activeTripId = useAppStore((s) => s.activeTripId)

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#6b7280', fontSize: 16 }}>Laddar…</div>
      </div>
    )
  }

  if (!me) return <Navigate to="/login" replace />

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', minHeight: '100vh', background: '#f8fafc' }}>
      <header style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px' }}>
          <span style={{ fontWeight: 800, fontSize: 18, color: '#1e3a5f' }}>✈️ Reseboken</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <SaveIndicator />
            <span style={{ fontSize: 13, color: '#6b7280' }}>{me.username}</span>
          </div>
        </div>
        <TripSelector />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<TodayPage />} />
          <Route path="/overview" element={<OverviewPage />} />
          <Route path="/accommodations" element={<AccommodationsPage />} />
          <Route path="/transport" element={<TransportPage />} />
          <Route path="/tickets" element={<TicketsPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/todos" element={<TodosPage />} />
          <Route path="/media" element={<MediaPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={qc}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth/verify" element={<AuthVerifyPage />} />
          <Route path="/*" element={<AppShell />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
