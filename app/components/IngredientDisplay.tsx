import { useCallback } from 'react';
import { Pressable, Text, TextInput } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useMealPlannerStore } from '../state/useMealPlannerStore';
import {
    GroceryListIngredient,
    Ingredient,
    Unit,
    unitValues
} from '../utilities/types';
import { ThemedText } from './ThemedText';

interface IIngredientDisplay {
    ingredient: Ingredient | GroceryListIngredient;
    isInEditMode?: boolean;
}

export function IngredientDisplay(
    props: IIngredientDisplay
): React.JSX.Element {
    const ingredient: Ingredient | GroceryListIngredient = props.ingredient;
    const isInEditMode: boolean = props.isInEditMode ?? false;
    const unitOptions = unitValues.map((unit) => ({
        label: unit,
        value: unit
    }));

    const onChangeText = (text: string) => {
        ingredient.quantity = parseFloat(text.replace(/[^0-9.]/g, '')) || 0;
        useMealPlannerStore.getState().addEditingIngredient(ingredient);
    };

    const onChangeUnit = (unit: string) => {
        ingredient.unit = unit as Unit;
        useMealPlannerStore.getState().addEditingIngredient(ingredient);
    };

    const onRemoveIngredient = useCallback(() => {
        useMealPlannerStore.getState().addRemovingIngredient(ingredient);
    }, []);

    return (
        <>
            {isInEditMode ? (
                <>
                    <TextInput
                        style={{}}
                        keyboardType="numeric"
                        onChangeText={onChangeText}
                        value={ingredient.quantity.toString()}
                    />
                    <Dropdown
                        data={unitOptions}
                        labelField="label"
                        valueField="value"
                        value={ingredient.unit}
                        onChange={onChangeUnit}
                    />
                </>
            ) : (
                <>
                    <ThemedText>{ingredient.quantity}</ThemedText>
                    <ThemedText>{ingredient.unit}</ThemedText>
                </>
            )}
            <ThemedText>{ingredient.name}</ThemedText>
            {isInEditMode && (
                <Pressable onPress={onRemoveIngredient}>
                    <Text>Remove</Text>
                </Pressable>
            )}
        </>
    );
}
