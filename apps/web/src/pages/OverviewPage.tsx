import { useAppStore } from '../store'
import { useTrip } from '../api/trips'
import { useNavigate } from 'react-router-dom'

const TYPE_ICON: Record<string, string> = {
  TRAVEL: '🚗', FERRY: '⛴️', CHECKIN: '🏨', CHECKOUT: '🧳',
  MEAL: '🍽️', ACTIVITY: '🎯', NOTE: '📝',
}

export function OverviewPage() {
  const activeTripId = useAppStore((s) => s.activeTripId)
  const { data: trip, isLoading } = useTrip(activeTripId)

  if (!activeTripId) return <div style={{ padding: 24, color: '#6b7280', textAlign: 'center' }}>Välj en resa.</div>
  if (isLoading) return <div style={{ padding: 24, color: '#6b7280', textAlign: 'center' }}>Laddar…</div>
  if (!trip) return null

  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ background: '#1e3a5f', color: '#fff', padding: '20px 16px 16px' }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>{trip.name}</h2>
        <p style={{ margin: '4px 0 0', fontSize: 13, opacity: 0.8 }}>
          {new Date(trip.startDate).toLocaleDateString('sv-SE')} – {new Date(trip.endDate).toLocaleDateString('sv-SE')}
        </p>
        {trip.description && <p style={{ margin: '8px 0 0', fontSize: 14, opacity: 0.9 }}>{trip.description}</p>}
      </div>
      <div style={{ padding: '12px 0' }}>
        {trip.days.map((day: any) => {
          const items = trip.agendaItems
            .filter((i: any) => i.dayId === day.id)
            .sort((a: any, b: any) => (a.startTime ?? '').localeCompare(b.startTime ?? '') || a.order - b.order)
          return (
            <div key={day.id} style={{ margin: '0 16px 20px', background: '#fff', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
              <div style={{ background: '#f1f5f9', padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{day.title ?? new Date(day.date).toLocaleDateString('sv-SE', { weekday: 'long', month: 'short', day: 'numeric' })}</div>
                <div style={{ color: '#64748b', fontSize: 12 }}>{new Date(day.date).toLocaleDateString('sv-SE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
              </div>
              {items.length === 0 ? (
                <div style={{ padding: '12px 14px', color: '#9ca3af', fontSize: 14 }}>Inga aktiviteter planerade.</div>
              ) : (
                <div>
                  {items.map((item: any, idx: number) => (
                    <div key={item.id} style={{
                      padding: '10px 14px',
                      borderBottom: idx < items.length - 1 ? '1px solid #f1f5f9' : 'none',
                      display: 'flex', gap: 10, alignItems: 'flex-start',
                    }}>
                      <span style={{ fontSize: 18, marginTop: 1 }}>{TYPE_ICON[item.type] ?? '📌'}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 500, fontSize: 14 }}>{item.title}</div>
                        {item.startTime && <div style={{ color: '#6b7280', fontSize: 12 }}>{item.startTime}{item.endTime ? ` – ${item.endTime}` : ''}</div>}
                        {item.locationAddress && <div style={{ color: '#6b7280', fontSize: 12 }}>📍 {item.locationAddress}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {day.summary && (
                <div style={{ padding: '8px 14px', background: '#eff6ff', borderTop: '1px solid #e0f2fe', fontSize: 13, color: '#1e40af' }}>
                  💡 {day.summary}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
