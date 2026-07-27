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

    // TODO: display ingredients
    // TODO: "I went grocery shopping" button
    // TODO: Allow manual adding of ingredients

    return <ThemedText>Pantry Screen</ThemedText>;
}
