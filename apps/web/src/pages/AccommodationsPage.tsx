import { useAppStore } from '../store'
import { useAccommodations } from '../api/accommodations'

export function AccommodationsPage() {
  const activeTripId = useAppStore((s) => s.activeTripId)
  const { data: accommodations, isLoading } = useAccommodations(activeTripId)

  if (!activeTripId) return <div style={{ padding: 24, color: '#6b7280', textAlign: 'center' }}>Välj en resa.</div>
  if (isLoading) return <div style={{ padding: 24, textAlign: 'center', color: '#6b7280' }}>Laddar…</div>

  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ background: '#1e3a5f', color: '#fff', padding: '20px 16px 16px' }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>🏠 Boenden</h2>
      </div>
      <div style={{ padding: '16px' }}>
        {(!accommodations || accommodations.length === 0) && (
          <p style={{ color: '#6b7280', textAlign: 'center' }}>Inga boenden tillagda.</p>
        )}
        {accommodations?.map((a: any) => (
          <div key={a.id} style={{ background: '#fff', borderRadius: 12, padding: '16px', marginBottom: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
            <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>{a.name}</div>
            {a.address && <div style={{ color: '#6b7280', fontSize: 14, marginBottom: 4 }}>📍 {a.address}</div>}
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 8 }}>
              {a.checkInAt && (
                <div style={{ fontSize: 13 }}>
                  <span style={{ color: '#6b7280' }}>Incheckning:</span>{' '}
                  <strong>{new Date(a.checkInAt).toLocaleString('sv-SE', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</strong>
                </div>
              )}
              {a.checkOutAt && (
                <div style={{ fontSize: 13 }}>
                  <span style={{ color: '#6b7280' }}>Utcheckning:</span>{' '}
                  <strong>{new Date(a.checkOutAt).toLocaleString('sv-SE', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</strong>
                </div>
              )}
            </div>
            {a.bookingRef && <div style={{ marginTop: 8, fontSize: 13, color: '#374151' }}>Bokningsref: <code style={{ background: '#f3f4f6', padding: '1px 6px', borderRadius: 4 }}>{a.bookingRef}</code></div>}
            {a.bookingUrl && <div style={{ marginTop: 4 }}><a href={a.bookingUrl} target="_blank" rel="noreferrer" style={{ color: '#2563eb', fontSize: 13 }}>Visa bokning →</a></div>}
            {a.hostName && <div style={{ marginTop: 8, fontSize: 13, color: '#374151' }}>Värd: {a.hostName}{a.hostPhone ? ` · ${a.hostPhone}` : ''}</div>}
            {a.rules && (
              <div style={{ marginTop: 10, background: '#fef9c3', borderRadius: 8, padding: '10px', fontSize: 13, color: '#713f12' }}>
                📋 <strong>Regler:</strong> {a.rules}
              </div>
            )}
            {a.notes && <div style={{ marginTop: 8, fontSize: 13, color: '#6b7280' }}>💬 {a.notes}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}
