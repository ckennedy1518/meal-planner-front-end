export type Mode = 'cook' | 'plan' | null;
export type Recipe = {
    name: string;
    ingredients: string[];
    instructions: string[];
    datePlanned: Date | null;
    lastMade: Date | null;
};
