import { useAppStore } from '../store'
import { useQuery } from '@tanstack/react-query'
import { apiFetch } from '../api/client'

const MODE_ICON: Record<string, string> = { CAR: '🚗', FERRY: '⛴️', OTHER: '🚌' }

export function TransportPage() {
  const activeTripId = useAppStore((s) => s.activeTripId)
  const { data: legs, isLoading } = useQuery({
    queryKey: ['transport', activeTripId],
    queryFn: () => apiFetch<any[]>(`/trips/${activeTripId}/transport`),
    enabled: !!activeTripId,
  })

  if (!activeTripId) return <div style={{ padding: 24, color: '#6b7280', textAlign: 'center' }}>Välj en resa.</div>
  if (isLoading) return <div style={{ padding: 24, textAlign: 'center', color: '#6b7280' }}>Laddar…</div>

  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ background: '#1e3a5f', color: '#fff', padding: '20px 16px 16px' }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>🚢 Transport</h2>
      </div>
      <div style={{ padding: 16 }}>
        {(!legs || legs.length === 0) && <p style={{ color: '#6b7280', textAlign: 'center' }}>Inga transporter tillagda.</p>}
        {legs?.map((leg: any) => (
          <div key={leg.id} style={{ background: '#fff', borderRadius: 12, padding: '14px', marginBottom: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 24 }}>{MODE_ICON[leg.mode] ?? '🚌'}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{leg.from} → {leg.to}</div>
                <div style={{ fontSize: 12, color: '#6b7280' }}>{leg.mode}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {leg.departAt && <div style={{ fontSize: 13 }}>Avgång: <strong>{new Date(leg.departAt).toLocaleString('sv-SE', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</strong></div>}
              {leg.arriveAt && <div style={{ fontSize: 13 }}>Ankomst: <strong>{new Date(leg.arriveAt).toLocaleString('sv-SE', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</strong></div>}
            </div>
            {leg.bookingRef && <div style={{ marginTop: 6, fontSize: 13 }}>Ref: <code style={{ background: '#f3f4f6', padding: '1px 6px', borderRadius: 4 }}>{leg.bookingRef}</code></div>}
            {leg.notes && <div style={{ marginTop: 6, fontSize: 13, color: '#6b7280' }}>💬 {leg.notes}</div>}
            {leg.tickets?.length > 0 && (
              <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {leg.tickets.map((t: any) => (
                  <div key={t.id} style={{ background: '#f0fdf4', borderRadius: 8, padding: '8px 10px', fontSize: 13 }}>
                    🎫 <strong>{t.label}</strong>
                    {t.value && <div style={{ fontFamily: 'monospace', fontSize: 12, marginTop: 2 }}>{t.value}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
