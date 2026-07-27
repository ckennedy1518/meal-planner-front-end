export type Mode = 'cook' | 'pantry' | 'plan' | null;
export type Recipe = {
    name: string;
    ingredients: string[];
    instructions: string[];
    datePlanned: Date | null;
    lastMade: Date | null;
};
