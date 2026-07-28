import { Ingredient } from '../types';
import { getConversionRatio } from './getConversionRatio';

export function mergeUnits(
    ingredient1: Ingredient,
    ingredient2: Ingredient,
    isAdding: boolean
): Ingredient | undefined {
    const multiplier = getConversionRatio(ingredient1.unit, ingredient2.unit);

    if (ingredient1.name !== ingredient2.name || multiplier === undefined) {
        console.warn(
            `Unable to merge units. ingredient1 name: ${ingredient1.name}; ingredient1 unit: ${ingredient1.unit}; ingredient2 name: ${ingredient2.name}; ingredient2 unit: ${ingredient2.unit}`
        );
        return undefined;
    }

    // ingredient2.unit = ingredient1.unit
    ingredient2.quantity *= multiplier;

    if (isAdding) {
        ingredient1.quantity += ingredient2.quantity;
    } else {
        ingredient1.quantity -= ingredient2.quantity;
    }

    return ingredient1;
}
