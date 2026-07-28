import { Ingredient } from '../utilities/types';
import { ThemedText } from './ThemedText';

interface IIngredientDisplay {
    ingredient: Ingredient;
}

export function IngredientDisplay(
    props: IIngredientDisplay
): React.JSX.Element {
    const ingredient: Ingredient = props.ingredient;

    const formattedString = `Ingredient info - Name: ${ingredient.name}; Quantity: ${ingredient.quantity}; Unit: ${ingredient.unit}`;
    return <ThemedText>{formattedString}</ThemedText>;
}
