import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { Button } from 'react-native';
import { useIsLoggedIn } from '../hooks/useIsLoggedIn';
import { useMealPlannerStore } from '../state/useMealPlannerStore';
import { ThemedText } from './ThemedText';

library.add(faUser);

export function UserSettingsScreen(): React.JSX.Element {
    const { isChecking, isLoggedIn } = useIsLoggedIn();

    useEffect(() => {
        if (!isChecking && !isLoggedIn) {
            useMealPlannerStore.getState().logout();
        }
    }, [isChecking, isLoggedIn]);

    // TODO: Add optional settings (screen always on)
    // TODO: (day 2) add photo
    // TODO: (day 2) edit email
    // TODO: (day 2) Reset password?

    return (
        <>
            <ThemedText>User Settings Screen</ThemedText>
            <Button
                title="Logout"
                onPress={() => useMealPlannerStore.getState().logout()}
            />
        </>
    );
}
