import { StateCreator } from 'zustand';
import { Mode } from '../utilities/types';

export interface IModeSlice {
    mode: Mode | null;
    screenAlwaysOn: boolean;
    setMode: (mode: Mode | null) => void;
    setScreenAlwaysOn: (screenAlwaysOn: boolean) => void;
}

export const createModeSlice: StateCreator<IModeSlice> = (set) => ({
    mode: null,
    screenAlwaysOn: false,
    setMode: (mode: Mode | null) => set(() => ({ mode })),
    setScreenAlwaysOn: (screenAlwaysOn: boolean) =>
        set(() => ({ screenAlwaysOn }))
});
