import { useLoginInfo } from "./useLoginInfo";

export function useIsLoggedIn() {
    const user = useLoginInfo((state) => state.user);
    const token = useLoginInfo((state) => state.token);

    // TODO: call go service to validate token and user

    return !!user && !!token;
};