import { useMealPlannerStore } from '@/app/state/useMealPlannerStore';
import { Ingredient } from '@/app/utilities/types';

export async function getPantryInfo(token: string): Promise<void> {
    if (token === null) {
        return;
    }

    try {
        // TODO: get url based on if running locally?
        const response = await fetch('http://localhost:8080/getPantryInfo', {
            method: 'GET',
            headers: {
                Accept: '*/*',
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('getPantryInfo response not ok.');
        }

        const ingredients = (await response?.json()) as Ingredient[];
        ingredients.forEach((ingredient) => {
            useMealPlannerStore.getState().addIngredient(ingredient);
        });
    } catch (error) {
        console.warn(`Error in getPantryInfo: ${error}`);
    }
}
