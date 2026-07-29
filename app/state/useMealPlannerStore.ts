import { create } from 'zustand';
import { createLoginInfoSlice, ILoginInfoSlice } from './createLoginInfoSlice';
import { createModeSlice, IModeSlice } from './createModeSlice';
import { createPantrySlice, IPantrySlice } from './createPantrySlice';
import { createRecipesSlice, IRecipesSlice } from './createRecipesSlice';

interface IStoreSlice {
    reset: () => void;
}

const initialState = {
    isLoggedIn: null,
    user: null,
    token: null,
    mode: null,
    screenAlwaysOn: false,
    plannedRecipes: [],
    storedRecipes: [],
    selectedRecipe: null,
    allIngredients: []
};

export const useMealPlannerStore = create<
    ILoginInfoSlice & IModeSlice & IRecipesSlice & IPantrySlice & IStoreSlice
>((set, get, store) => {
    const loginSlice = createLoginInfoSlice(set, get, store);
    const modeSlice = createModeSlice(set, get, store);
    const recipesSlice = createRecipesSlice(set, get, store);
    const pantrySlice = createPantrySlice(set, get, store);

    return {
        ...loginSlice,
        ...modeSlice,
        ...recipesSlice,
        ...pantrySlice,
        reset: () =>
            set({
                ...initialState,
                client: loginSlice.client
            })
    };
});
