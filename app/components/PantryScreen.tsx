import { useEffect } from 'react';
import { useIsLoggedIn } from '../hooks/useIsLoggedIn';
import { useMealPlannerStore } from '../state/useMealPlannerStore';
import { Ingredient } from '../utilities/types';
import { getPantryInfo } from './helpers/getPantryInfo';
import { IngredientDisplay } from './IngredientDisplay';
import { ThemedText } from './ThemedText';

export function PantryScreen(): React.JSX.Element {
    const { isChecking, isLoggedIn } = useIsLoggedIn();
    const token: string | null = useMealPlannerStore((state) => state.token);
    const ingredients: Ingredient[] = useMealPlannerStore(
        (state) => state.allIngredients
    );

    useEffect(() => {
        if (!isChecking && !isLoggedIn) {
            useMealPlannerStore.getState().logout();
        }
    }, [isChecking, isLoggedIn]);

    useEffect(() => {
        if (token !== null) {
            getPantryInfo(token);
        }
    }, [token]);

    // TODO: display ingredients
    // TODO: "I went grocery shopping" button
    // TODO: Allow manual adding of ingredients

    return (
        <>
            <ThemedText>Pantry Screen</ThemedText>
            {ingredients.forEach((i) => (
                <IngredientDisplay ingredient={i} />
            ))}
        </>
    );
}
