import { useLoginInfo } from '../useLoginInfo';

/**
 * Checks if the user is currently logged in. Sets values in zustand store accordingly.
 */
export async function isLoggedIn(): Promise<void> {
    const isLoggedIn = useLoginInfo((state) => state.isLoggedIn);
    if (!isLoggedIn) {
        return;
    }

    const client = useLoginInfo((state) => state.client);
    const { data, error } = await client.auth.getSession();
    if (error !== null || data.session?.access_token === null) {
        console.log('Error getting session: ', error?.message);
        useLoginInfo.getState().logout();
        return;
    }

    const supabaseToken = data.session?.access_token;
    const stateToken = useLoginInfo((state) => state.token);
    if (supabaseToken !== stateToken) {
        console.log('Token mismatch, logging out.');
        useLoginInfo.getState().logout();
    }
}
