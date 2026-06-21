import { apiFetch } from './client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { AgendaItem } from '@reseboken/shared'

export function useAgenda(tripId: string | null) {
  return useQuery<AgendaItem[]>({
    queryKey: ['agenda', tripId],
    queryFn: () => apiFetch<AgendaItem[]>(`/trips/${tripId}/agenda`),
    enabled: !!tripId,
  })
}

export function useCreateAgendaItem(tripId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: any) =>
      apiFetch<AgendaItem>(`/trips/${tripId}/agenda`, { method: 'POST', body: JSON.stringify(data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['agenda', tripId] }),
  })
}

export function useUpdateAgendaItem(tripId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...data }: any) =>
      apiFetch<AgendaItem>(`/trips/${tripId}/agenda/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['agenda', tripId] }),
  })
}

export function useDeleteAgendaItem(tripId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => apiFetch(`/trips/${tripId}/agenda/${id}`, { method: 'DELETE' }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['agenda', tripId] }),
  })
}
