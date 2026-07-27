import { useEffect } from 'react';
import { useIsLoggedIn } from '../hooks/useIsLoggedIn';
import { useMealPlannerStore } from '../state/useMealPlannerStore';
import { ThemedText } from './ThemedText';

export function PantryScreen(): React.JSX.Element {
    const { isChecking, isLoggedIn } = useIsLoggedIn();

    useEffect(() => {
        if (!isChecking && !isLoggedIn) {
            useMealPlannerStore.getState().logout();
        }
    }, [isChecking, isLoggedIn]);

    return <ThemedText>Pantry Screen</ThemedText>;
}
