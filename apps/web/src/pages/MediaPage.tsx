import { useState } from 'react'
import { useAppStore } from '../store'
import { useDeleteMedia, uploadFile, useCreateMedia } from '../api/media'
import { useMe } from '../api/auth'
import { useQuery } from '@tanstack/react-query'
import { apiFetch } from '../api/client'

interface MediaWithFile {
  id: string
  tripId: string
  fileId: string
  caption?: string | null
  linkedType?: string | null
  linkedId?: string | null
  createdAt: string
  file: { id: string; mimeType: string; storageKey: string; originalName: string; size: number }
}

function useMediaWithFiles(tripId: string | null) {
  return useQuery<MediaWithFile[]>({
    queryKey: ['media', tripId],
    queryFn: () => apiFetch<MediaWithFile[]>(`/trips/${tripId}/media`),
    enabled: !!tripId,
  })
}

export function MediaPage() {
  const activeTripId = useAppStore((s) => s.activeTripId)
  const { data: user } = useMe()
  const { data: mediaList, isLoading } = useMediaWithFiles(activeTripId)
  const deleteMedia = useDeleteMedia(activeTripId ?? '')
  const createMedia = useCreateMedia(activeTripId ?? '')
  const [uploading, setUploading] = useState(false)
  const [fullscreenItem, setFullscreenItem] = useState<string | null>(null)
  const isEditor = user?.role === 'EDITOR'

  if (!activeTripId) return <div style={{ padding: 24, textAlign: 'center', color: '#6b7280' }}>Välj en resa.</div>
  if (isLoading) return <div style={{ padding: 24, textAlign: 'center', color: '#6b7280' }}>Laddar…</div>

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !activeTripId) return
    setUploading(true)
    try {
      const uploaded = await uploadFile(activeTripId, file)
      await createMedia.mutateAsync({ fileId: uploaded.id })
    } catch (err) {
      alert('Uppladdning misslyckades')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ padding: '16px 16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Media</h2>
        {isEditor && (
          <label style={{
            display: 'inline-block', padding: '8px 16px', background: '#2563eb',
            color: '#fff', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer',
            opacity: uploading ? 0.6 : 1,
          }}>
            {uploading ? 'Laddar upp…' : '+ Ladda upp'}
            <input type="file" accept="image/*,video/*,application/pdf" onChange={handleUpload} style={{ display: 'none' }} disabled={uploading} />
          </label>
        )}
      </div>

      {(mediaList ?? []).length === 0 ? (
        <div style={{ padding: 24, textAlign: 'center', color: '#9ca3af' }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>📷</div>
          <p>Inga bilder eller filer uppladdade.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 8, padding: 16 }}>
          {(mediaList ?? []).map((item) => {
            const isImage = item.file?.mimeType?.startsWith('image/')
            const src = `/uploads/${item.file?.storageKey}`
            return (
              <div key={item.id} style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', background: '#e5e7eb', aspectRatio: '1' }}>
                {isImage ? (
                  <img
                    src={src}
                    alt={item.caption ?? item.file?.originalName ?? ''}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
                    onClick={() => setFullscreenItem(src)}
                  />
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 4 }}>
                    <span style={{ fontSize: 40 }}>📄</span>
                    <span style={{ fontSize: 11, color: '#6b7280', padding: '0 8px', textAlign: 'center', wordBreak: 'break-word' }}>
                      {item.file?.originalName}
                    </span>
                  </div>
                )}
                {item.caption && (
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '4px 8px', fontSize: 11 }}>
                    {item.caption}
                  </div>
                )}
                {isEditor && (
                  <button
                    onClick={() => { if (confirm('Ta bort?')) deleteMedia.mutate(item.id) }}
                    style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', borderRadius: 4, padding: '2px 6px', fontSize: 12, cursor: 'pointer' }}
                  >
                    ✕
                  </button>
                )}
              </div>
            )
          })}
        </div>
      )}

      {fullscreenItem && (
        <div
          onClick={() => setFullscreenItem(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
        >
          <img src={fullscreenItem} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: 8 }} />
        </div>
      )}
    </div>
  )
}
