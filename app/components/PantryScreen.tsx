import { useCallback, useEffect, useState } from 'react';
import { Button } from 'react-native';
import { useIsLoggedIn } from '../hooks/useIsLoggedIn';
import { useMealPlannerStore } from '../state/useMealPlannerStore';
import { Ingredient } from '../utilities/types';
import { GroceryModalView } from './GroceryModalView';
import { getGroceryLists } from './helpers/getGroceryLists';
import { getPantryInfo } from './helpers/getPantryInfo';
import { IngredientDisplay } from './IngredientDisplay';
import { ThemedText } from './ThemedText';

let lastRequestedToken: string | null = null;

/**
 * this is inside a Parallax scroll view
 * @returns Pantry information for display
 */
export function PantryScreen(): React.JSX.Element {
    const { isChecking, isLoggedIn } = useIsLoggedIn();
    const token: string | null = useMealPlannerStore((state) => state.token);
    const ingredients: Ingredient[] = useMealPlannerStore(
        (state) => state.allIngredients
    );
    const groceryLists = useMealPlannerStore((state) => state.groceryLists);
    const [isGroceryModalViewOpen, setIsGroceryModalViewOpen] = useState(false);

    useEffect(() => {
        if (!isChecking && !isLoggedIn) {
            useMealPlannerStore.getState().reset();
        }
    }, [isChecking, isLoggedIn]);

    useEffect(() => {
        // if the token has changed, request pantry info from the server
        if (token !== null && token !== lastRequestedToken) {
            lastRequestedToken = token;
            getPantryInfo(token);

            // only need to get grocery lists if there are none stored in state
            if (groceryLists.length === 0) {
                getGroceryLists(token);
            }
        }

        if (token === null) {
            lastRequestedToken = null;
        }
    }, [token]);

    const goGroceryShopping = useCallback(() => {}, []);

    // TODO: display ingredients
    // TODO: "I went grocery shopping" button
    // TODO: Allow manual adding of ingredients

    return (
        <>
            <ThemedText>Pantry Screen</ThemedText>
            {ingredients.map((i) => (
                <IngredientDisplay
                    key={'ingredient_name:' + i.name}
                    ingredient={i}
                />
            ))}
            <Button
                title="I went grocery shopping"
                onPress={() => setIsGroceryModalViewOpen(true)}
                disabled={groceryLists.length === 0}
            />
            {isGroceryModalViewOpen && (
                <GroceryModalView
                    groceryLists={groceryLists}
                    setIsGroceryModalViewOpen={setIsGroceryModalViewOpen}
                />
            )}
        </>
    );
}
