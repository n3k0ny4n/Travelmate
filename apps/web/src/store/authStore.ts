import { create } from 'zustand'

interface User {
  id: string
  username: string
  email: string
  role: 'EDITOR' | 'VIEWER'
  createdAt: string
}

interface AuthState {
  user: User | null
  isLoading: boolean
  setUser: (user: User | null) => void
  clearUser: () => void
  fetchMe: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  fetchMe: async () => {
    try {
      set({ isLoading: true })
      const res = await fetch('/api/auth/me', { credentials: 'include' })
      if (res.ok) {
        const user = await res.json()
        set({ user, isLoading: false })
      } else {
        set({ user: null, isLoading: false })
      }
    } catch {
      set({ user: null, isLoading: false })
    }
  },
}))
