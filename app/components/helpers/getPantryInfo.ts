import { useMealPlannerStore } from '@/app/state/useMealPlannerStore';
import { GetPantryInfoResponse } from '@/app/utilities/types';

export async function getPantryInfo(token: string): Promise<void> {
    if (token === null) {
        return;
    }

    try {
        // TODO: get url based on if running locally?
        // need local ip rather than localhost since phone isn't running backend
        const response = await fetch(
            'http://192.168.0.126:8080/getPantryInfo',
            {
                method: 'GET',
                headers: {
                    Accept: '*/*',
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (!response.ok) {
            throw new Error('getPantryInfo response not ok.');
        }

        const getPantryInfoResponse =
            (await response?.json()) as GetPantryInfoResponse;
        getPantryInfoResponse?.pantry_items?.forEach((ingredient) => {
            useMealPlannerStore.getState().addIngredient(ingredient);
        });
    } catch (error) {
        console.warn(`Error in getPantryInfo: ${error}`);
    }
}
