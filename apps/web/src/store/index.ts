import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppState {
  activeTripId: string | null
  setActiveTripId: (id: string | null) => void
  saveStatus: 'idle' | 'saving' | 'saved' | 'error'
  setSaveStatus: (status: AppState['saveStatus']) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      activeTripId: null,
      setActiveTripId: (id) => set({ activeTripId: id }),
      saveStatus: 'idle',
      setSaveStatus: (saveStatus) => set({ saveStatus }),
    }),
    { name: 'reseboken-app', partialize: (s) => ({ activeTripId: s.activeTripId }) }
  )
)
