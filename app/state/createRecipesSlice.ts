import { StateCreator } from 'zustand';
import { Recipe } from '../utilities/types';

export interface IRecipesSlice {
    plannedRecipes: Recipe[];
    storedRecipes: Recipe[];
    selectedRecipe: Recipe | null;
    addPlannedRecipe: (recipe: Recipe) => void;
    removePlannedRecipe: (recipe: Recipe) => void;
    addStoredRecipe: (recipe: Recipe) => void;
    removeStoredRecipe: (recipe: Recipe) => void;
    setSelectedRecipe: (recipe: Recipe | null) => void;
}

export const createRecipesSlice: StateCreator<IRecipesSlice> = (set) => ({
    plannedRecipes: [],
    storedRecipes: [],
    selectedRecipe: null,
    addPlannedRecipe: (recipe: Recipe) =>
        set((state) => ({ plannedRecipes: [...state.plannedRecipes, recipe] })),
    removePlannedRecipe: (recipe: Recipe) =>
        set((state) => ({
            plannedRecipes: state.plannedRecipes.filter(
                (r) => r.name !== recipe.name
            )
        })),

    addStoredRecipe: (recipe: Recipe) =>
        set((state) => ({ storedRecipes: [...state.storedRecipes, recipe] })),
    removeStoredRecipe: (recipe: Recipe) =>
        set((state) => ({
            storedRecipes: state.storedRecipes.filter(
                (r) => r.name !== recipe.name
            )
        })),
    setSelectedRecipe: (recipe: Recipe | null) =>
        set({ selectedRecipe: recipe })
});
