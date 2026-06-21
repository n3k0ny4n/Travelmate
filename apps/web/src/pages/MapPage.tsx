import { useEffect, useRef } from 'react'
import { useAppStore } from '../store'
import { useTrip } from '../api/trips'

export function MapPage() {
  const activeTripId = useAppStore((s) => s.activeTripId)
  const { data: trip } = useTrip(activeTripId)
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return
    import('leaflet').then((L) => {
      // leaflet css loaded via index.css
      const map = L.map(mapRef.current!).setView([57.7, 11.9], 6)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map)
      mapInstanceRef.current = map
    })
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!mapInstanceRef.current || !trip) return
    import('leaflet').then((L) => {
      const map = mapInstanceRef.current
      const markers: any[] = []

      const addMarker = (lat: number, lng: number, label: string, color = 'blue') => {
        const icon = L.divIcon({
          html: `<div style="background:${color === 'red' ? '#ef4444' : '#2563eb'};color:#fff;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;box-shadow:0 2px 6px rgba(0,0,0,0.3)">${label[0]}</div>`,
          iconSize: [28, 28],
          className: '',
        })
        const m = L.marker([lat, lng], { icon }).addTo(map).bindPopup(label)
        markers.push(m)
        return m
      }

      trip.agendaItems.forEach((item: any) => {
        if (item.locationLat && item.locationLng) {
          addMarker(item.locationLat, item.locationLng, item.title, 'blue')
        }
      })
      trip.accommodations.forEach((a: any) => {
        if (a.lat && a.lng) {
          addMarker(a.lat, a.lng, a.name, 'red')
        }
      })

      if (markers.length > 0) {
        const group = L.featureGroup(markers)
        map.fitBounds(group.getBounds().pad(0.2))
      }
    })
  }, [trip])

  if (!activeTripId) return <div style={{ padding: 24, color: '#6b7280', textAlign: 'center' }}>Välj en resa.</div>

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 57px)' }}>
      <div style={{ background: '#1e3a5f', color: '#fff', padding: '16px 16px 12px' }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>🗺️ Karta</h2>
      </div>
      <div ref={mapRef} style={{ flex: 1 }} />
    </div>
  )
}
