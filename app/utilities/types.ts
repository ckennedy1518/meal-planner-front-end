export type Unit = 'Tbsp' | 'tsp' | 'C' | 'oz' | 'fl oz' | 'lbs' | 'mL' | 'g';
export type Mode = 'cook' | 'pantry' | 'plan' | 'settings' | null;
export type Recipe = {
    name: string;
    ingredients: Ingredient[];
    instructions: string[];
    datePlanned: Date | null;
    lastMade: Date | null;
};
export type Ingredient = {
    name: string;
    quantity: number;
    unit: Unit;
    secondaryQuantity: number | undefined; // e.g. 1 lb 10 oz
    secondaryUnit: Unit | undefined;
};
