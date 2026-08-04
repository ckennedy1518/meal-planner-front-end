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
    isStaple: boolean;
};
export type GroceryListIngredient = Ingredient & {
    quantity_purchased: number;
};
export type GroceryList = {
    date: Date;
    ingredients: GroceryListIngredient[];
};
export type GroceryListWrapper = {
    date: string;
    ingredients: GroceryListIngredient[];
};

export type GetPantryInfoResponse = {
    message: string;
    pantry_items: Ingredient[];
};
export type GetGroceryListsResponse = {
    message: string;
    grocery_lists: GroceryListWrapper[];
};
