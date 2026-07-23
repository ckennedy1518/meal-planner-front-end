import { create } from 'zustand';
import { createLoginInfoSlice, ILoginInfoSlice } from './createLoginInfoSlice';
import { createModeSlice, IModeSlice } from './createModeSlice';

export const useMealPlannerStore = create<ILoginInfoSlice & IModeSlice>(
    (...a) => ({
        ...createLoginInfoSlice(...a),
        ...createModeSlice(...a)
    })
);
