import { StateCreator } from 'zustand';
import { mergeUnits } from '../utilities/helpers/mergeUnits';
import { GroceryList, Ingredient } from '../utilities/types';

export interface IPantrySlice {
    allIngredients: Ingredient[];
    groceryLists: GroceryList[];
    addingIngredients: Ingredient[];
    editingIngredients: Ingredient[];
    removingIngredients: Ingredient[];
    addIngredient: (ingredient: Ingredient) => void;
    removeIngredient: (
        ingredient: Ingredient,
        shouldRemoveEntirely: boolean
    ) => void;
    addGroceryList: (groceryList: GroceryList) => void;
    addAddingIngredient: (ingredient: Ingredient) => void;
    removeAddingIngredient: (ingredient: Ingredient) => void;
    addEditingIngredient: (ingredient: Ingredient) => void;
    removeEditingIngredient: (ingredient: Ingredient) => void;
    addRemovingIngredient: (ingredient: Ingredient) => void;
    removeRemovingIngredient: (ingredient: Ingredient) => void;
    resetChanges: () => void;
}

export const createPantrySlice: StateCreator<IPantrySlice> = (set) => ({
    allIngredients: [],
    groceryLists: [],
    addingIngredients: [],
    editingIngredients: [],
    removingIngredients: [],
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
        })),
    addAddingIngredient: (ingredient: Ingredient) =>
        set((state) => ({
            addingIngredients: [...state.addingIngredients, ingredient]
        })),
    removeAddingIngredient: (ingredient: Ingredient) =>
        set((state) => ({
            addingIngredients: state.addingIngredients.filter(
                (i) => i.name !== ingredient.name
            )
        })),
    addEditingIngredient: (ingredient: Ingredient) =>
        set((state) => {
            if (
                state.editingIngredients.find((i) => i.name === ingredient.name)
            ) {
                return {
                    editingIngredients: state.editingIngredients.map((i) =>
                        i.name === ingredient.name ? ingredient : i
                    )
                };
            } else {
                return {
                    editingIngredients: [
                        ...state.editingIngredients,
                        ingredient
                    ]
                };
            }
        }),
    removeEditingIngredient: (ingredient: Ingredient) =>
        set((state) => ({
            editingIngredients: state.editingIngredients.filter(
                (i) => i.name !== ingredient.name
            )
        })),
    addRemovingIngredient: (ingredient: Ingredient) =>
        set((state) => ({
            removingIngredients: [...state.removingIngredients, ingredient]
        })),
    removeRemovingIngredient: (ingredient: Ingredient) =>
        set((state) => ({
            removingIngredients: state.removingIngredients.filter(
                (i) => i.name !== ingredient.name
            )
        })),
    resetChanges: () =>
        set((state) => ({
            addingIngredients: [],
            editingIngredients: [],
            removingIngredients: []
        }))
});
