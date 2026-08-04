import { StateCreator } from 'zustand';
import { mergeUnits } from '../utilities/helpers/mergeUnits';
import { GroceryList, Ingredient } from '../utilities/types';

export interface IPantrySlice {
    allIngredients: Ingredient[];
    groceryLists: GroceryList[];
    addIngredient: (ingredient: Ingredient) => void;
    removeIngredient: (
        ingredient: Ingredient,
        shouldRemoveEntirely: boolean
    ) => void;
    addGroceryList: (groceryList: GroceryList) => void;
}

export const createPantrySlice: StateCreator<IPantrySlice> = (set) => ({
    allIngredients: [],
    groceryLists: [],
    addIngredient: (ingredient: Ingredient) =>
        set((state) => {
            const doesIngredientExist = state.allIngredients.find(
                (existing) =>
                    existing.name.toLowerCase() ===
                    ingredient.name.toLowerCase()
            );

            if (doesIngredientExist !== undefined) {
                return {
                    allIngredients: state.allIngredients.map((existing) =>
                        existing.name.toLowerCase() ===
                        ingredient.name.toLowerCase()
                            ? (mergeUnits(existing, ingredient, true) ??
                              existing)
                            : existing
                    )
                };
            }

            return { allIngredients: [...state.allIngredients, ingredient] };
        }),
    removeIngredient: (ingredient: Ingredient, shouldRemoveEntirely: boolean) =>
        set((state) => {
            if (shouldRemoveEntirely) {
                return {
                    allIngredients: state.allIngredients.filter(
                        (i) => i.name !== ingredient.name
                    )
                };
            }

            return {
                allIngredients: state.allIngredients.map((existing) =>
                    existing.name.toLowerCase() ===
                    ingredient.name.toLowerCase()
                        ? (mergeUnits(existing, ingredient, false) ?? existing)
                        : existing
                )
            };
        }),
    addGroceryList: (groceryList: GroceryList) =>
        set((state) => ({
            groceryLists: [...state.groceryLists, groceryList]
        }))
});
