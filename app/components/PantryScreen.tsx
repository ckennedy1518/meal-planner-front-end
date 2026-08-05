import { useCallback, useEffect, useState } from 'react';
import { Button } from 'react-native';
import { useIsLoggedIn } from '../hooks/useIsLoggedIn';
import { useMealPlannerStore } from '../state/useMealPlannerStore';
import { Ingredient } from '../utilities/types';
import { CancelChangesConfirmation } from './CancelChangesConfirmation';
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
    const addingIngredients: Ingredient[] = useMealPlannerStore(
        (state) => state.addingIngredients
    );
    const editingIngredients: Ingredient[] = useMealPlannerStore(
        (state) => state.editingIngredients
    );
    const removingIngredients: Ingredient[] = useMealPlannerStore(
        (state) => state.removingIngredients
    );
    const groceryLists = useMealPlannerStore((state) => state.groceryLists);

    const [isGroceryModalViewOpen, setIsGroceryModalViewOpen] = useState(false);
    const [isPantryInEditMode, setIsPantryInEditMode] = useState(false);
    const [isCancelChangesModalOpen, setIsCancelChangesModalOpen] =
        useState(false);

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

    // display ingredients on the screen correctly based on current changes in state
    useEffect(() => {
        editingIngredients.forEach((ingredient) => {
            const indexInRemoving = removingIngredients.findIndex(
                (i) => i.name === ingredient.name
            );
            if (indexInRemoving !== -1) {
                return;
            }

            const index = ingredients.findIndex(
                (i) => i.name === ingredient.name
            );
            if (index !== -1) {
                ingredients[index] = ingredient;
            }
        });

        removingIngredients.forEach((ingredient) => {
            const index = ingredients.findIndex(
                (i) => i.name === ingredient.name
            );
            if (index !== -1) {
                ingredients.splice(index, 1);
            }
        });
    }, [ingredients, editingIngredients, removingIngredients]);

    const goGroceryShopping = useCallback(() => {}, []);
    const savePantryChanges = useCallback(() => {
        // TODO: implement saving pantry changes to the server
        useMealPlannerStore.getState().resetChanges();
        setIsPantryInEditMode(false);
    }, []);
    const cancelPantryChanges = useCallback(() => {
        if (
            addingIngredients.length > 0 ||
            editingIngredients.length > 0 ||
            removingIngredients.length > 0
        ) {
            setIsCancelChangesModalOpen(true);
        } else {
            setIsPantryInEditMode(false);
        }
    }, [addingIngredients, editingIngredients, removingIngredients]);
    const addIngredient = useCallback(() => {
        useMealPlannerStore.getState().addIngredient({
            name: '',
            quantity: 0,
            unit: 'C',
            isStaple: false
        });
    }, []);

    return (
        <>
            <ThemedText>Pantry Screen</ThemedText>
            {ingredients.map((i) => (
                <IngredientDisplay
                    key={'ingredient_name:' + i.name}
                    ingredient={i}
                    isInEditMode={isPantryInEditMode}
                />
            ))}
            {addingIngredients.map((i) => (
                <IngredientDisplay
                    key={'adding_ingredient_name:' + i.name}
                    ingredient={i}
                    isInEditMode={isPantryInEditMode}
                />
            ))}
            {isPantryInEditMode && (
                <Button title="Add New Ingredient" onPress={addIngredient} />
            )}
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
            {isPantryInEditMode ? (
                <>
                    <Button title="Save Changes" onPress={savePantryChanges} />
                    <Button
                        title="Cancel Changes"
                        onPress={cancelPantryChanges}
                    />
                </>
            ) : (
                <Button
                    title="Edit Pantry"
                    onPress={() => setIsPantryInEditMode(true)}
                />
            )}
            {isCancelChangesModalOpen && (
                <CancelChangesConfirmation
                    setIsCancelChangesModalOpen={setIsCancelChangesModalOpen}
                    setIsPantryInEditMode={setIsPantryInEditMode}
                />
            )}
        </>
    );
}
