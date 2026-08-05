import { Modal } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GroceryList } from '../utilities/types';
import { IngredientDisplay } from './IngredientDisplay';
import { ThemedText } from './ThemedText';

interface IGroceryModalView {
    groceryLists: GroceryList[];
    setIsGroceryModalViewOpen: (isOpen: boolean) => void;
}

export function GroceryModalView(props: IGroceryModalView): React.JSX.Element {
    const { groceryLists, setIsGroceryModalViewOpen } = props;

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={true}
                    onRequestClose={() => setIsGroceryModalViewOpen(false)}
                >
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
                </Modal>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
