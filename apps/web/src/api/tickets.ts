import { apiFetch } from './client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Ticket } from '@reseboken/shared'

export function useTickets(tripId: string | null) {
  return useQuery<Ticket[]>({
    queryKey: ['tickets', tripId],
    queryFn: () => apiFetch<Ticket[]>(`/trips/${tripId}/tickets`),
    enabled: !!tripId,
  })
}

export function useCreateTicket(tripId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: any) =>
      apiFetch<Ticket>(`/trips/${tripId}/tickets`, { method: 'POST', body: JSON.stringify(data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tickets', tripId] }),
  })
}

export function useUpdateTicket(tripId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...data }: any) =>
      apiFetch<Ticket>(`/trips/${tripId}/tickets/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tickets', tripId] }),
  })
}

export function useDeleteTicket(tripId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => apiFetch(`/trips/${tripId}/tickets/${id}`, { method: 'DELETE' }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tickets', tripId] }),
  })
}
