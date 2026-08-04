import { GroceryList } from '../utilities/types';
import { IngredientDisplay } from './IngredientDisplay';
import { ThemedText } from './ThemedText';

interface IGroceryModalView {
    groceryLists: GroceryList[];
    setIsGroceryModalViewOpen: (isOpen: boolean) => void;
}

export function GroceryModalView(props: IGroceryModalView): React.JSX.Element {
    const { groceryLists } = props;

    return (
        <ThemedText>
            {groceryLists.map((list, index) => (
                <>
                    <ThemedText key={'date_themed_text' + index}>
                        Date: {list.date.toLocaleDateString()}
                    </ThemedText>
                    {list.ingredients.map((ingredient, idx) => (
                        <IngredientDisplay
                            key={'ingredient_' + index + '_' + idx}
                            ingredient={ingredient}
                        />
                    ))}
                </>
            ))}
        </ThemedText>
    );
}
