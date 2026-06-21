import { apiFetch } from './client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Day } from '@reseboken/shared'

export function useDays(tripId: string | null) {
  return useQuery<Day[]>({
    queryKey: ['days', tripId],
    queryFn: () => apiFetch<Day[]>(`/trips/${tripId}/days`),
    enabled: !!tripId,
  })
}

export function useCreateDay(tripId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: any) =>
      apiFetch<Day>(`/trips/${tripId}/days`, { method: 'POST', body: JSON.stringify(data) }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['days', tripId] })
      qc.invalidateQueries({ queryKey: ['trip', tripId] })
    },
  })
}

export function useUpdateDay(tripId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...data }: Partial<Day> & { id: string }) =>
      apiFetch<Day>(`/trips/${tripId}/days/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['days', tripId] })
      qc.invalidateQueries({ queryKey: ['trip', tripId] })
    },
  })
}

export function useDeleteDay(tripId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => apiFetch(`/trips/${tripId}/days/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['days', tripId] })
      qc.invalidateQueries({ queryKey: ['trip', tripId] })
    },
  })
}
