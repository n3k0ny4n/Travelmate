import { apiFetch } from './client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { TransportLeg } from '@reseboken/shared'

export function useTransport(tripId: string | null) {
  return useQuery<TransportLeg[]>({
    queryKey: ['transport', tripId],
    queryFn: () => apiFetch<TransportLeg[]>(`/trips/${tripId}/transport`),
    enabled: !!tripId,
  })
}

export function useCreateTransportLeg(tripId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: any) =>
      apiFetch<TransportLeg>(`/trips/${tripId}/transport`, { method: 'POST', body: JSON.stringify(data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['transport', tripId] }),
  })
}

export function useUpdateTransportLeg(tripId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...data }: any) =>
      apiFetch<TransportLeg>(`/trips/${tripId}/transport/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['transport', tripId] }),
  })
}

export function useDeleteTransportLeg(tripId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => apiFetch(`/trips/${tripId}/transport/${id}`, { method: 'DELETE' }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['transport', tripId] }),
  })
}
