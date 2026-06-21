import { useAppStore } from '../store'
import { useQuery } from '@tanstack/react-query'
import { apiFetch } from '../api/client'

const KIND_ICON: Record<string, string> = { QR: '◻️', BARCODE: '▦', PDF: '📄', IMAGE: '🖼️' }

export function TicketsPage() {
  const activeTripId = useAppStore((s) => s.activeTripId)
  const { data: tickets, isLoading } = useQuery({
    queryKey: ['tickets', activeTripId],
    queryFn: () => apiFetch<any[]>(`/trips/${activeTripId}/tickets`),
    enabled: !!activeTripId,
  })

  if (!activeTripId) return <div style={{ padding: 24, color: '#6b7280', textAlign: 'center' }}>Välj en resa.</div>
  if (isLoading) return <div style={{ padding: 24, textAlign: 'center', color: '#6b7280' }}>Laddar…</div>

  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ background: '#1e3a5f', color: '#fff', padding: '20px 16px 16px' }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>🎫 Biljetter</h2>
      </div>
      <div style={{ padding: 16 }}>
        {(!tickets || tickets.length === 0) && <p style={{ color: '#6b7280', textAlign: 'center' }}>Inga biljetter tillagda.</p>}
        {tickets?.map((t: any) => (
          <div key={t.id} style={{ background: '#fff', borderRadius: 12, padding: '16px', marginBottom: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 24 }}>{KIND_ICON[t.kind] ?? '🎫'}</span>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{t.label}</div>
            </div>
            {t.value && (
              <div style={{ marginTop: 8, padding: '12px', background: '#f3f4f6', borderRadius: 8, fontSize: 14, fontFamily: 'monospace', wordBreak: 'break-all' }}>
                {t.value}
              </div>
            )}
            {t.fileId && (
              <div style={{ marginTop: 8 }}>
                <img src={`/uploads/${t.fileId}`} alt={t.label}
                  style={{ maxWidth: '100%', borderRadius: 8 }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
