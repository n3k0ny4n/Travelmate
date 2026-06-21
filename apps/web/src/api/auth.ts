import { apiFetch } from './client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export interface AuthUser {
  id: string
  username: string
  email: string
  role: 'EDITOR' | 'VIEWER'
}

export function useMe() {
  return useQuery<AuthUser | null>({
    queryKey: ['me'],
    queryFn: () => apiFetch<AuthUser>('/auth/me').catch(() => null),
    staleTime: 5 * 60 * 1000,
    retry: false,
  })
}

export function useRequestMagicLink() {
  return useMutation({
    mutationFn: (username: string) =>
      apiFetch('/auth/request', { method: 'POST', body: JSON.stringify({ username }) }),
  })
}

export function useLogout() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: () => apiFetch('/auth/logout', { method: 'POST' }),
    onSuccess: () => {
      qc.clear()
      window.location.href = '/login'
    },
  })
}
