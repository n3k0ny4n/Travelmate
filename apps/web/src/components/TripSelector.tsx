import { useTrips, useCreateTrip } from '../api/trips'
import { useAppStore } from '../store'
import { useState } from 'react'

export function TripSelector() {
  const { data: trips } = useTrips()
  const activeTripId = useAppStore((s) => s.activeTripId)
  const setActiveTripId = useAppStore((s) => s.setActiveTripId)
  const createTrip = useCreateTrip()
  const [creating, setCreating] = useState(false)
  const [newName, setNewName] = useState('')

  if (!trips) return null

  return (
    <div style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 13, color: '#6b7280', fontWeight: 500 }}>Resa:</span>
        <select
          value={activeTripId ?? ''}
          onChange={(e) => setActiveTripId(e.target.value || null)}
          style={{ flex: 1, minWidth: 140, padding: '6px 8px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 14 }}
        >
          <option value="">-- välj resa --</option>
          {trips.map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
        {!creating && (
          <button onClick={() => setCreating(true)}
            style={{ padding: '6px 12px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, fontSize: 13, cursor: 'pointer' }}>
            + Ny resa
          </button>
        )}
      </div>
      {creating && (
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            const trip = await createTrip.mutateAsync({
              name: newName,
              startDate: new Date() as any,
              endDate: new Date() as any,
            })
            setActiveTripId(trip.id)
            setCreating(false)
            setNewName('')
          }}
          style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Resenamn"
            required
            style={{ flex: 1, padding: '6px 10px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 14 }}
          />
          <button type="submit"
            style={{ padding: '6px 12px', background: '#10b981', color: '#fff', border: 'none', borderRadius: 6, fontSize: 13, cursor: 'pointer' }}>
            Skapa
          </button>
          <button type="button" onClick={() => setCreating(false)}
            style={{ padding: '6px 12px', background: '#e5e7eb', border: 'none', borderRadius: 6, fontSize: 13, cursor: 'pointer' }}>
            Avbryt
          </button>
        </form>
      )}
    </div>
  )
}
