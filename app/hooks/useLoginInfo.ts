import { SupabaseClient } from '@supabase/supabase-js';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createSupabaseClient } from './helpers/createSupabaseClient';

type Store = {
    isLoggedIn: boolean | null;
    user: string | null;
    token: string | null;
    client: SupabaseClient;
    login: (user: string, token: string) => void;
    logout: () => void;
    refreshToken: (token: string) => void;
};

export const useLoginInfo = create<Store>()(
    devtools(
        (set) => ({
            isLoggedIn: null,
            user: null,
            token: null,
            client: createSupabaseClient(),
            login: (user, token) =>
                set({ user, token, isLoggedIn: true }, undefined, 'auth/login'),
            logout: () =>
                set(
                    { user: null, token: null, isLoggedIn: false },
                    undefined,
                    'auth/logout'
                ),
            refreshToken: (token) =>
                set({ token: token }, undefined, 'internal/updateData')
        }),
        {
            name: 'AuthStore',
            // Filter out actions matching these regex patterns
            actionsDenylist: ['internal/.*'] // Hides all 'internal/*' actions
        }
    )
);
