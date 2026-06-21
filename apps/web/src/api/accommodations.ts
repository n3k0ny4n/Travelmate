import { apiFetch } from './client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Accommodation } from '@reseboken/shared'

export function useAccommodations(tripId: string | null) {
  return useQuery<Accommodation[]>({
    queryKey: ['accommodations', tripId],
    queryFn: () => apiFetch<Accommodation[]>(`/trips/${tripId}/accommodations`),
    enabled: !!tripId,
  })
}

export function useCreateAccommodation(tripId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: any) =>
      apiFetch<Accommodation>(`/trips/${tripId}/accommodations`, { method: 'POST', body: JSON.stringify(data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['accommodations', tripId] }),
  })
}

export function useUpdateAccommodation(tripId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...data }: any) =>
      apiFetch<Accommodation>(`/trips/${tripId}/accommodations/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['accommodations', tripId] }),
  })
}

export function useDeleteAccommodation(tripId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => apiFetch(`/trips/${tripId}/accommodations/${id}`, { method: 'DELETE' }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['accommodations', tripId] }),
  })
}
