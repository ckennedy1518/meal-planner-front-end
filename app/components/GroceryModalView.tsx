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
                <div key={index}>
                    <ThemedText>
                        Date: {list.date.toLocaleDateString()}
                    </ThemedText>
                    {list.ingredients.map((ingredient, idx) => (
                        <IngredientDisplay key={idx} ingredient={ingredient} />
                    ))}
                </div>
            ))}
        </ThemedText>
    );
}
