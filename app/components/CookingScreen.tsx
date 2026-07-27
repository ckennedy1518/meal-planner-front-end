import { useEffect } from 'react';
import { useIsLoggedIn } from '../hooks/useIsLoggedIn';
import { useMealPlannerStore } from '../state/useMealPlannerStore';
import { Recipe } from '../utilities/types';
import { CookingOption } from './CookingOption';
import { ThemedText } from './ThemedText';

export function CookingScreen(): React.JSX.Element {
    const { isChecking, isLoggedIn } = useIsLoggedIn();
    const selectedRecipe: Recipe | null = useMealPlannerStore(
        (state) => state.selectedRecipe
    );

    useEffect(() => {
        if (!isChecking && !isLoggedIn) {
            useMealPlannerStore.getState().logout();
        }
    }, [isChecking, isLoggedIn]);

    // TODO: implement CookingOption (suggest recipe to start cooking?)
    // TODO: display cooking instructions/ingredients
    // TODO: respect always on setting in user settings (maybe do that here instead?)

    return selectedRecipe === null ? (
        <>
            <CookingOption />
        </>
    ) : (
        <>
            {selectedRecipe && (
                <ThemedText>Cooking {selectedRecipe.name}</ThemedText>
            )}
        </>
    );
}
