import { useEffect } from 'react';
import { useIsLoggedIn } from '../hooks/useIsLoggedIn';
import { useMealPlannerStore } from '../state/useMealPlannerStore';
import { ThemedText } from './ThemedText';

export function PlanningScreen(): React.JSX.Element {
    const { isChecking, isLoggedIn } = useIsLoggedIn();

    useEffect(() => {
        if (!isChecking && !isLoggedIn) {
            useMealPlannerStore.getState().logout();
        }
    }, [isChecking, isLoggedIn]);

    // TODO: Add recipe (link or image or manual) - maybe start with just manual?
    // TODO: Choose which recipe(s) for which days
    // TODO: Generate shopping list
    //          At moment of generation, give option to add each item
    //          Suggested parts at top?
    // TODO: Add recipe dates to calendar (and grocery shopping time)
    // TODO: (day 2) suggest recipe based on ingredients in pantry

    return <ThemedText>Planning Screen</ThemedText>;
}
