import { useMealPlannerStore } from '../state/useMealPlannerStore';

/**
 * Checks if the user is currently logged in. Sets values in zustand store accordingly.
 */
export async function useIsLoggedIn(): Promise<void> {
    const isLoggedIn = useMealPlannerStore((state) => state.isLoggedIn);
    if (!isLoggedIn) {
        return;
    }

    const client = useMealPlannerStore((state) => state.client);
    const { data, error } = await client.auth.getSession();
    if (error !== null || data.session?.access_token === null) {
        console.log('Error getting session: ', error?.message);
        useMealPlannerStore.getState().logout();
        return;
    }

    const supabaseToken = data.session?.access_token;
    const stateToken = useMealPlannerStore((state) => state.token);
    if (supabaseToken !== stateToken) {
        console.log('Token mismatch, logging out.');
        useMealPlannerStore.getState().logout();
    }
}
