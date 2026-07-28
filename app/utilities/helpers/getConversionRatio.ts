import { Unit } from '../types';

/**
 * Helper to convert between units. e.g. if unit1 = 'Tbsp' and unit2 = 'C' this will return 16.
 * @param unit1
 * @param unit2
 * @returns How many of unit 1 are in unit 2. Returns undefined if the conversion doesn't make sense (e.g. between a weight (lbs) and a measurement (C))
 */
export function getConversionRatio(
    unit1: Unit,
    unit2: Unit
): number | undefined {
    const convTable: (number | undefined)[][] = [];
    // unit 1 C
    convTable.push([
        1,
        1 / 16,
        1 / 48,
        1 / 8,
        undefined,
        undefined,
        1 / 236.588,
        undefined
    ]);
    // unit 1 Tbsp
    convTable.push([
        16,
        1,
        1 / 3,
        2,
        undefined,
        undefined,
        1 / 14.7868,
        undefined
    ]);
    // unit 1 tsp
    convTable.push([48, 3, 1, 6, undefined, undefined, 1 / 4.928, undefined]);
    // unit 1 fl oz
    convTable.push([
        8,
        1 / 2,
        1 / 6,
        1,
        undefined,
        undefined,
        1 / 29.5735,
        undefined
    ]);
    // unit 1 g
    convTable.push([
        undefined,
        undefined,
        undefined,
        undefined,
        1,
        453.592,
        undefined,
        28.3495
    ]);
    // unit 1 lbs
    convTable.push([
        undefined,
        undefined,
        undefined,
        undefined,
        1 / 453.592,
        1,
        undefined,
        1 / 16
    ]);
    // unit 1 mL
    convTable.push([
        236.588,
        14.7868,
        4.928,
        29.5735,
        undefined,
        undefined,
        1,
        undefined
    ]);
    // unit 1 oz
    convTable.push([
        undefined,
        undefined,
        undefined,
        undefined,
        1 / 28.3495,
        16,
        undefined,
        1
    ]);

    const num1 = getUnitNumberHelper(unit1);
    const num2 = getUnitNumberHelper(unit2);
    if (num1 > convTable.length || num2 > convTable[num1].length) {
        return undefined;
    }
    return convTable[num1][num2];
}

function getUnitNumberHelper(unit: Unit): number {
    switch (unit) {
        case 'C':
            return 0;
        case 'Tbsp':
            return 1;
        case 'tsp':
            return 2;
        case 'fl oz':
            return 3;
        case 'g':
            return 4;
        case 'lbs':
            return 5;
        case 'mL':
            return 6;
        case 'oz':
            return 7;
        default:
            return 8;
    }
}
