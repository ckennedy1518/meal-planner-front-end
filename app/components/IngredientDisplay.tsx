import { GroceryListIngredient, Ingredient } from '../utilities/types';
import { ThemedText } from './ThemedText';

interface IIngredientDisplay {
    ingredient: Ingredient | GroceryListIngredient;
}

export function IngredientDisplay(
    props: IIngredientDisplay
): React.JSX.Element {
    const ingredient: Ingredient | GroceryListIngredient = props.ingredient;

    let formattedString = `Ingredient info - Name: ${ingredient.name}; Quantity: ${ingredient.quantity}; Unit: ${ingredient.unit}; isStaple: ${ingredient.isStaple}`;
    if (ingredient.hasOwnProperty('quantity_purchased')) {
        formattedString += `; Quantity Purchased: ${(ingredient as GroceryListIngredient).quantity_purchased}`;
    }
    return <ThemedText>{formattedString}</ThemedText>;
}
