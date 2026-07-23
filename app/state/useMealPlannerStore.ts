import { create } from 'zustand';
import { createLoginInfoSlice, ILoginInfoSlice } from './createLoginInfoSlice';
import { createModeSlice, IModeSlice } from './createModeSlice';
import { createRecipesSlice, IRecipesSlice } from './createRecipesSlice';

export const useMealPlannerStore = create<
    ILoginInfoSlice & IModeSlice & IRecipesSlice
>((...a) => ({
    ...createLoginInfoSlice(...a),
    ...createModeSlice(...a),
    ...createRecipesSlice(...a)
}));
