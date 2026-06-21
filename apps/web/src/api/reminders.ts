import { apiFetch } from './client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Reminder } from '@reseboken/shared'

export function useReminders(tripId: string | null) {
  return useQuery<Reminder[]>({
    queryKey: ['reminders', tripId],
    queryFn: () => apiFetch<Reminder[]>(`/trips/${tripId}/reminders`),
    enabled: !!tripId,
  })
}

export function useCreateReminder(tripId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: any) =>
      apiFetch<Reminder>(`/trips/${tripId}/reminders`, { method: 'POST', body: JSON.stringify(data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['reminders', tripId] }),
  })
}

export function useUpdateReminder(tripId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...data }: any) =>
      apiFetch<Reminder>(`/trips/${tripId}/reminders/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['reminders', tripId] }),
  })
}

export function useDeleteReminder(tripId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => apiFetch(`/trips/${tripId}/reminders/${id}`, { method: 'DELETE' }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['reminders', tripId] }),
  })
}
