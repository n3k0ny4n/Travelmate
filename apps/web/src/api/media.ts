import { apiFetch } from './client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Media } from '@reseboken/shared'

export function useMedia(tripId: string | null) {
  return useQuery<Media[]>({
    queryKey: ['media', tripId],
    queryFn: () => apiFetch<Media[]>(`/trips/${tripId}/media`),
    enabled: !!tripId,
  })
}

export function useCreateMedia(tripId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: any) =>
      apiFetch<Media>(`/trips/${tripId}/media`, { method: 'POST', body: JSON.stringify(data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['media', tripId] }),
  })
}

export function useUpdateMedia(tripId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...data }: any) =>
      apiFetch<Media>(`/trips/${tripId}/media/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['media', tripId] }),
  })
}

export function useDeleteMedia(tripId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => apiFetch(`/trips/${tripId}/media/${id}`, { method: 'DELETE' }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['media', tripId] }),
  })
}

export async function uploadFile(tripId: string, file: File) {
  const formData = new FormData()
  formData.append('file', file)
  const res = await fetch(`/api/trips/${tripId}/files`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  })
  if (!res.ok) throw new Error('Upload failed')
  return res.json()
}
