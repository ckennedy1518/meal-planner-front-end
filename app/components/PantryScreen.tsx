import { useEffect } from 'react';
import { useIsLoggedIn } from '../hooks/useIsLoggedIn';
import { useMealPlannerStore } from '../state/useMealPlannerStore';
import { Ingredient } from '../utilities/types';
import { getPantryInfo } from './helpers/getPantryInfo';
import { IngredientDisplay } from './IngredientDisplay';
import { ThemedText } from './ThemedText';

let lastRequestedToken: string | null = null;

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
        if (token !== null && token !== lastRequestedToken) {
            lastRequestedToken = token;
            getPantryInfo(token);
        }

        if (token === null) {
            lastRequestedToken = null;
        }
    }, [token]);

    // TODO: display ingredients
    // TODO: "I went grocery shopping" button
    // TODO: Allow manual adding of ingredients

    return (
        <>
            <ThemedText>Pantry Screen</ThemedText>
            {ingredients.map((i) => (
                <IngredientDisplay key={i.name} ingredient={i} />
            ))}
        </>
    );
}
