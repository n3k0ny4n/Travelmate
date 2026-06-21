import { NavLink } from 'react-router-dom'
import { useAppStore } from '../store'

const navItems = [
  { to: '/', label: 'Idag', icon: '📅', end: true },
  { to: '/overview', label: 'Översikt', icon: '🗓' },
  { to: '/accommodations', label: 'Boenden', icon: '🏨' },
  { to: '/transport', label: 'Transport', icon: '🚗' },
  { to: '/tickets', label: 'Biljetter', icon: '🎫' },
  { to: '/map', label: 'Karta', icon: '🗺' },
  { to: '/todos', label: 'Todos', icon: '✅' },
  { to: '/media', label: 'Media', icon: '📷' },
]

export function BottomNav() {
  const activeTripId = useAppStore((s) => s.activeTripId)
  if (!activeTripId) return null
  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      display: 'flex', background: '#fff',
      borderTop: '1px solid #e5e7eb',
      paddingBottom: 'env(safe-area-inset-bottom)',
      zIndex: 100,
      overflowX: 'auto',
    }}>
      {navItems.map(({ to, label, icon, end }) => (
        <NavLink key={to} to={to} end={end} style={({ isActive }) => ({
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
          padding: '8px 4px', textDecoration: 'none',
          color: isActive ? '#2563eb' : '#6b7280',
          fontSize: 11, fontWeight: isActive ? 600 : 400,
          gap: 2,
        })}>
          <span style={{ fontSize: 22 }}>{icon}</span>
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
