import { create } from 'zustand';
import { createLoginInfoSlice, ILoginInfoSlice } from './createLoginInfoSlice';
import { createModeSlice, IModeSlice } from './createModeSlice';
import { createPantrySlice, IPantrySlice } from './createPantrySlice';
import { createRecipesSlice, IRecipesSlice } from './createRecipesSlice';

export const useMealPlannerStore = create<
    ILoginInfoSlice & IModeSlice & IRecipesSlice & IPantrySlice
>((...a) => ({
    ...createLoginInfoSlice(...a),
    ...createModeSlice(...a),
    ...createRecipesSlice(...a),
    ...createPantrySlice(...a)
}));
