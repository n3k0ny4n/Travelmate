import { useAppStore } from '../store'
import { useTrip } from '../api/trips'

const TYPE_ICON: Record<string, string> = {
  TRAVEL: '🚗', FERRY: '⛴️', CHECKIN: '🏨', CHECKOUT: '🧳',
  MEAL: '🍽️', ACTIVITY: '🎯', NOTE: '📝',
}

const REMINDER_ICON: Record<string, string> = {
  ALARM: '⏰', FUEL: '⛽', PACK: '🎒', OTHER: '📌',
}

function formatTime(t?: string | null) {
  return t ?? ''
}

export function TodayPage() {
  const activeTripId = useAppStore((s) => s.activeTripId)
  const { data: trip, isLoading } = useTrip(activeTripId)

  if (!activeTripId) {
    return (
      <div style={{ padding: 24, textAlign: 'center', color: '#6b7280' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>✈️</div>
        <p>Välj en resa i listan ovan för att se dagens agenda.</p>
      </div>
    )
  }

  if (isLoading) return <div style={{ padding: 24, textAlign: 'center', color: '#6b7280' }}>Laddar…</div>
  if (!trip) return <div style={{ padding: 24, textAlign: 'center', color: '#ef4444' }}>Resa hittades inte.</div>

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const todayDay = trip.days.find((d: any) => {
    const dayDate = new Date(d.date)
    dayDate.setHours(0, 0, 0, 0)
    return dayDate.getTime() === today.getTime()
  })

  const tomorrowDay = trip.days.find((d: any) => {
    const dayDate = new Date(d.date)
    dayDate.setHours(0, 0, 0, 0)
    return dayDate.getTime() === tomorrow.getTime()
  })

  const todayItems = todayDay
    ? trip.agendaItems
        .filter((i: any) => i.dayId === todayDay.id)
        .sort((a: any, b: any) => (a.startTime ?? '').localeCompare(b.startTime ?? '') || a.order - b.order)
    : []

  const tonightAccommodation = trip.accommodations.find((a: any) => {
    if (!a.checkInAt) return false
    const ci = new Date(a.checkInAt)
    ci.setHours(0, 0, 0, 0)
    return ci <= today && (!a.checkOutAt || new Date(a.checkOutAt) > today)
  })

  const todayReminders = todayDay
    ? trip.reminders.filter((r: any) => r.dayId === todayDay.id)
    : []

  const todayTransportLegs = todayDay
    ? trip.transportLegs.filter((tl: any) => {
        if (!tl.departAt) return false
        const d = new Date(tl.departAt)
        d.setHours(0, 0, 0, 0)
        return d.getTime() === today.getTime()
      })
    : []

  const todayTickets = todayTransportLegs.flatMap((tl: any) =>
    trip.tickets.filter((t: any) => t.transportLegId === tl.id)
  )

  const isTripPast = new Date(trip.endDate) < today
  const isTripFuture = new Date(trip.startDate) > today

  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ background: 'linear-gradient(135deg, #1e3a5f, #2563eb)', color: '#fff', padding: '20px 16px 16px' }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>{trip.name}</h2>
        <p style={{ margin: '4px 0 0', fontSize: 14, opacity: 0.8 }}>
          {today.toLocaleDateString('sv-SE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        {isTripFuture && <p style={{ margin: '8px 0 0', fontSize: 13, background: 'rgba(255,255,255,0.15)', borderRadius: 6, padding: '4px 10px', display: 'inline-block' }}>Resan startar {new Date(trip.startDate).toLocaleDateString('sv-SE')}</p>}
        {isTripPast && <p style={{ margin: '8px 0 0', fontSize: 13, background: 'rgba(255,255,255,0.15)', borderRadius: 6, padding: '4px 10px', display: 'inline-block' }}>Resan avslutades {new Date(trip.endDate).toLocaleDateString('sv-SE')}</p>}
      </div>

      <div style={{ padding: '0 0 8px' }}>
        {!todayDay && !isTripPast && !isTripFuture && (
          <div style={{ padding: '24px 16px', textAlign: 'center', color: '#6b7280' }}>
            Ingen dagplan skapad för idag.
          </div>
        )}

        {todayDay && (
          <>
            {todayItems.length > 0 && (
              <section style={{ margin: '16px 16px 0' }}>
                <h3 style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 600, color: '#374151' }}>Dagens agenda</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {todayItems.map((item: any) => (
                    <div key={item.id} style={{
                      background: '#fff', borderRadius: 12, padding: '12px 14px',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.08)', borderLeft: '4px solid #2563eb',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 20 }}>{TYPE_ICON[item.type] ?? '📌'}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 600, fontSize: 15 }}>{item.title}</div>
                          {(item.startTime || item.endTime) && (
                            <div style={{ color: '#6b7280', fontSize: 13, marginTop: 2 }}>
                              {formatTime(item.startTime)}{item.endTime ? ` – ${item.endTime}` : ''}
                            </div>
                          )}
                          {item.locationAddress && (
                            <div style={{ color: '#6b7280', fontSize: 13, marginTop: 2 }}>📍 {item.locationAddress}</div>
                          )}
                          {item.description && (
                            <div style={{ color: '#374151', fontSize: 13, marginTop: 4 }}>{item.description}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {tonightAccommodation && (
              <section style={{ margin: '20px 16px 0' }}>
                <h3 style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 600, color: '#374151' }}>🏠 Var vi sover ikväll</h3>
                <div style={{ background: '#fff', borderRadius: 12, padding: '14px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
                  <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{tonightAccommodation.name}</div>
                  {tonightAccommodation.address && <div style={{ color: '#6b7280', fontSize: 14 }}>📍 {tonightAccommodation.address}</div>}
                  {tonightAccommodation.checkInAt && (
                    <div style={{ color: '#374151', fontSize: 14, marginTop: 6 }}>
                      Incheckning: {new Date(tonightAccommodation.checkInAt).toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  )}
                  {tonightAccommodation.rules && (
                    <div style={{ marginTop: 8, padding: '8px', background: '#fef9c3', borderRadius: 8, fontSize: 13, color: '#713f12' }}>
                      📋 {tonightAccommodation.rules}
                    </div>
                  )}
                  {tonightAccommodation.notes && (
                    <div style={{ marginTop: 6, fontSize: 13, color: '#6b7280' }}>{tonightAccommodation.notes}</div>
                  )}
                </div>
              </section>
            )}

            {todayTickets.length > 0 && (
              <section style={{ margin: '20px 16px 0' }}>
                <h3 style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 600, color: '#374151' }}>🎫 Biljetter idag</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {todayTickets.map((ticket: any) => (
                    <div key={ticket.id} style={{ background: '#fff', borderRadius: 12, padding: '12px 14px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
                      <div style={{ fontWeight: 600 }}>{ticket.label}</div>
                      {ticket.value && <div style={{ marginTop: 4, fontSize: 13, fontFamily: 'monospace', background: '#f3f4f6', padding: '4px 8px', borderRadius: 6 }}>{ticket.value}</div>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {todayReminders.length > 0 && (
              <section style={{ margin: '20px 16px 0' }}>
                <h3 style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 600, color: '#374151' }}>Påminnelser</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {todayReminders.map((r: any) => (
                    <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fef9c3', borderRadius: 10, padding: '10px 12px' }}>
                      <span style={{ fontSize: 20 }}>{REMINDER_ICON[r.type] ?? '📌'}</span>
                      <div>
                        <div style={{ fontWeight: 500, fontSize: 14 }}>{r.text}</div>
                        {r.triggerHint && <div style={{ color: '#6b7280', fontSize: 12 }}>{r.triggerHint}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {tomorrowDay && (
          <section style={{ margin: '24px 16px 0' }}>
            <h3 style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 600, color: '#374151' }}>🌅 Imorgon</h3>
            <div style={{ background: '#eff6ff', borderRadius: 12, padding: '14px', border: '1px solid #bfdbfe' }}>
              {tomorrowDay.title && <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{tomorrowDay.title}</div>}
              {tomorrowDay.summary
                ? <p style={{ margin: 0, color: '#1e40af', fontSize: 14 }}>{tomorrowDay.summary}</p>
                : <p style={{ margin: 0, color: '#6b7280', fontSize: 14 }}>Ingen sammanfattning.</p>
              }
            </div>
            {trip.reminders.filter((r: any) => r.dayId === tomorrowDay.id).length > 0 && (
              <div style={{ marginTop: 10 }}>
                {trip.reminders
                  .filter((r: any) => r.dayId === tomorrowDay.id)
                  .map((r: any) => (
                    <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: '#fef3c7', borderRadius: 8, marginTop: 6 }}>
                      <span>{REMINDER_ICON[r.type] ?? '📌'}</span>
                      <span style={{ fontSize: 13 }}>{r.text}</span>
                    </div>
                  ))}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  )
}
