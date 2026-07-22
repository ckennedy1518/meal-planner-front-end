import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type Store = {
  user: string | null
  token: string | null
  login: (user: string, token: string) => void
  logout: () => void
  updateData: () => void
}

export const useLoginInfo = create<Store>()(
  devtools(
    (set) => ({
      user: null,
      token: null,
      login: (user, token) => set({ user, token }, undefined, 'auth/login'),
      logout: () => set({ user: null, token: null }, undefined, 'auth/logout'),
      updateData: () =>
        set({ user: 'updated' }, undefined, 'internal/updateData'),
    }),
    {
      name: 'AuthStore',
      // Filter out actions matching these regex patterns
      actionsDenylist: ['internal/.*'], // Hides all 'internal/*' actions
    },
  ),
);
