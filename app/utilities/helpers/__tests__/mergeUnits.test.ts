import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Ingredient, Unit } from '../../types';
import { getConversionRatio } from '../getConversionRatio';
import { mergeUnits } from '../mergeUnits';

describe('mergeUnits', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });

    it('adds quantities when the ingredients have the same name and compatible units', () => {
        const ingredient1: Ingredient = {
            name: 'Sugar',
            quantity: 1,
            unit: 'C',
            secondaryQuantity: undefined,
            secondaryUnit: undefined
        };
        const ingredient2: Ingredient = {
            name: 'Sugar',
            quantity: 16,
            unit: 'Tbsp',
            secondaryQuantity: undefined,
            secondaryUnit: undefined
        };

        const result = mergeUnits(ingredient1, ingredient2, true);

        expect(result).toBe(ingredient1);
        expect(ingredient1.quantity).toBe(2);
        expect(ingredient2.quantity).toBe(1);
    });

    it('subtracts quantities when isAdding is false', () => {
        const ingredient1: Ingredient = {
            name: 'Milk',
            quantity: 2,
            unit: 'C',
            secondaryQuantity: undefined,
            secondaryUnit: undefined
        };
        const ingredient2: Ingredient = {
            name: 'Milk',
            quantity: 48,
            unit: 'tsp',
            secondaryQuantity: undefined,
            secondaryUnit: undefined
        };

        const result = mergeUnits(ingredient1, ingredient2, false);

        expect(result).toBe(ingredient1);
        expect(ingredient1.quantity).toBe(1);
        expect(ingredient2.quantity).toBe(1);
    });

    it.each([
        {
            ingredient1Unit: 'C' as Unit,
            ingredient2Unit: 'Tbsp' as Unit,
            quantity1: 1,
            quantity2: 16,
            expected: 2
        },
        {
            ingredient1Unit: 'Tbsp' as Unit,
            ingredient2Unit: 'C' as Unit,
            quantity1: 1,
            quantity2: 1,
            expected: 17
        },
        {
            ingredient1Unit: 'tsp' as Unit,
            ingredient2Unit: 'C' as Unit,
            quantity1: 1,
            quantity2: 1,
            expected: 49
        },
        {
            ingredient1Unit: 'fl oz' as Unit,
            ingredient2Unit: 'C' as Unit,
            quantity1: 1,
            quantity2: 1,
            expected: 9
        },
        {
            ingredient1Unit: 'g' as Unit,
            ingredient2Unit: 'oz' as Unit,
            quantity1: 1,
            quantity2: 1,
            expected: 29.3495
        },
        {
            ingredient1Unit: 'oz' as Unit,
            ingredient2Unit: 'g' as Unit,
            quantity1: 1,
            quantity2: 28.3495,
            expected: 2
        },
        {
            ingredient1Unit: 'lbs' as Unit,
            ingredient2Unit: 'oz' as Unit,
            quantity1: 1,
            quantity2: 16,
            expected: 2
        },
        {
            ingredient1Unit: 'mL' as Unit,
            ingredient2Unit: 'C' as Unit,
            quantity1: 1,
            quantity2: 1,
            expected: 237.588
        }
    ])(
        'adds quantities correctly for $ingredient1Unit and $ingredient2Unit',
        ({
            ingredient1Unit,
            ingredient2Unit,
            quantity1,
            quantity2,
            expected
        }) => {
            const ingredient1: Ingredient = {
                name: 'Test Ingredient',
                quantity: quantity1,
                unit: ingredient1Unit,
                secondaryQuantity: undefined,
                secondaryUnit: undefined
            };
            const ingredient2: Ingredient = {
                name: 'Test Ingredient',
                quantity: quantity2,
                unit: ingredient2Unit,
                secondaryQuantity: undefined,
                secondaryUnit: undefined
            };

            const multiplier = getConversionRatio(
                ingredient1.unit,
                ingredient2.unit
            );
            const result = mergeUnits(ingredient1, ingredient2, true);

            expect(result).toBe(ingredient1);
            expect(ingredient1.quantity).toBeCloseTo(expected);
            expect(multiplier).toBeDefined();
            if (multiplier !== undefined) {
                expect(ingredient2.quantity).toBeCloseTo(
                    quantity2 * multiplier
                );
            }
        }
    );

    it('returns undefined and warns when ingredient names do not match', () => {
        const warnSpy = jest
            .spyOn(console, 'warn')
            .mockImplementation(() => undefined);
        const ingredient1: Ingredient = {
            name: 'Salt',
            quantity: 1,
            unit: 'C',
            secondaryQuantity: undefined,
            secondaryUnit: undefined
        };
        const ingredient2: Ingredient = {
            name: 'Pepper',
            quantity: 1,
            unit: 'C',
            secondaryQuantity: undefined,
            secondaryUnit: undefined
        };

        const result = mergeUnits(ingredient1, ingredient2, true);

        expect(result).toBeUndefined();
        expect(warnSpy).toHaveBeenCalled();
    });

    it('returns undefined and warns when units cannot be converted', () => {
        const warnSpy = jest
            .spyOn(console, 'warn')
            .mockImplementation(() => undefined);
        const ingredient1: Ingredient = {
            name: 'Flour',
            quantity: 1,
            unit: 'C',
            secondaryQuantity: undefined,
            secondaryUnit: undefined
        };
        const ingredient2: Ingredient = {
            name: 'Flour',
            quantity: 1,
            unit: 'g',
            secondaryQuantity: undefined,
            secondaryUnit: undefined
        };

        const result = mergeUnits(ingredient1, ingredient2, true);

        expect(result).toBeUndefined();
        expect(warnSpy).toHaveBeenCalled();
    });
});
