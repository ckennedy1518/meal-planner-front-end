import { SupabaseClient } from '@supabase/supabase-js';
import { StateCreator } from 'zustand';
import { createSupabaseClient } from '../hooks/helpers/createSupabaseClient';

export interface ILoginInfoSlice {
    isLoggedIn: boolean | null;
    user: string | null;
    token: string | null;
    client: SupabaseClient;
    login: (user: string | null, token: string | null) => void;
    logout: () => void;
    refreshToken: (token: string | null) => void;
}

export const createLoginInfoSlice: StateCreator<ILoginInfoSlice> = (set) => ({
    isLoggedIn: null,
    user: null,
    token: null,
    client: createSupabaseClient(),

    login: (user: string | null, token: string | null) =>
        set(() => ({
            user,
            token,
            isLoggedIn: true
        })),
    logout: () =>
        set(() => ({
            user: null,
            token: null,
            isLoggedIn: false
        })),
    refreshToken: (token: string | null) => set(() => ({ token }))
});
