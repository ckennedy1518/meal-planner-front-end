import { useEffect, useState } from 'react';
import { useMealPlannerStore } from '../state/useMealPlannerStore';

interface IUseIsLoggedInResult {
    isChecking: boolean;
    isLoggedIn: boolean | null;
}

/**
 * Checks whether a Supabase session exists when the component mounts.
 * Returns the current auth state so the UI can render a loading state until the check completes.
 */
export function useIsLoggedIn(): IUseIsLoggedInResult {
    const client = useMealPlannerStore((state) => state.client);
    const stateToken = useMealPlannerStore((state) => state.token);
    const [isChecking, setIsChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function checkLoginStatus() {
            try {
                const { data, error } = await client.auth.getSession();

                // component can unmount before the async call returns
                if (!isMounted) {
                    return;
                }

                if (error !== null || data.session?.access_token === null) {
                    console.log('Error getting session: ', error?.message);
                    setIsChecking(false);
                    setIsLoggedIn(false);
                    return;
                }

                const supabaseToken = data.session?.access_token;
                if (supabaseToken === stateToken) {
                    setIsLoggedIn(true);
                    setIsChecking(false);
                } else {
                    console.log('Token mismatch, logging out.');
                    setIsLoggedIn(false);
                    setIsChecking(false);
                }
            } catch (error) {
                console.log('Error checking login status: ', error);
                if (isMounted) {
                    setIsLoggedIn(false);
                    setIsChecking(false);
                }
            }
        }

        void checkLoginStatus();

        return () => {
            isMounted = false;
        };
    }, [client, stateToken]);

    return { isChecking, isLoggedIn };
}
