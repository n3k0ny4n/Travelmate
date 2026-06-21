import { apiFetch } from './client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Trip } from '@reseboken/shared'

export function useTrips() {
  return useQuery<Trip[]>({
    queryKey: ['trips'],
    queryFn: () => apiFetch<Trip[]>('/trips'),
  })
}

export function useTrip(id: string | null) {
  return useQuery<Trip & { days: any[]; agendaItems: any[]; accommodations: any[]; transportLegs: any[]; tickets: any[]; todos: any[]; reminders: any[]; media: any[] }>({
    queryKey: ['trip', id],
    queryFn: () => apiFetch(`/trips/${id}`),
    enabled: !!id,
  })
}

export function useCreateTrip() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<Trip>) =>
      apiFetch<Trip>('/trips', { method: 'POST', body: JSON.stringify(data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['trips'] }),
  })
}

export function useUpdateTrip(id: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<Trip>) =>
      apiFetch<Trip>(`/trips/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['trip', id] })
      qc.invalidateQueries({ queryKey: ['trips'] })
    },
  })
}

export function useDeleteTrip() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => apiFetch(`/trips/${id}`, { method: 'DELETE' }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['trips'] }),
  })
}
