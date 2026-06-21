import { apiFetch } from './client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Todo } from '@reseboken/shared'

export function useTodos(tripId: string | null) {
  return useQuery<Todo[]>({
    queryKey: ['todos', tripId],
    queryFn: () => apiFetch<Todo[]>(`/trips/${tripId}/todos`),
    enabled: !!tripId,
  })
}

export function useCreateTodo(tripId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: { text: string }) =>
      apiFetch<Todo>(`/trips/${tripId}/todos`, { method: 'POST', body: JSON.stringify(data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['todos', tripId] }),
  })
}

export function useUpdateTodo(tripId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...data }: Partial<Todo> & { id: string }) =>
      apiFetch<Todo>(`/trips/${tripId}/todos/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    onMutate: async ({ id, done }) => {
      await qc.cancelQueries({ queryKey: ['todos', tripId] })
      const prev = qc.getQueryData<Todo[]>(['todos', tripId])
      if (prev && done !== undefined) {
        qc.setQueryData(['todos', tripId], prev.map(t => t.id === id ? { ...t, done } : t))
      }
      return { prev }
    },
    onError: (_err, _v, ctx) => {
      if (ctx?.prev) qc.setQueryData(['todos', tripId], ctx.prev)
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ['todos', tripId] }),
  })
}

export function useDeleteTodo(tripId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => apiFetch(`/trips/${tripId}/todos/${id}`, { method: 'DELETE' }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['todos', tripId] }),
  })
}
