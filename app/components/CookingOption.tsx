import { View } from 'react-native';
import { useMealPlannerStore } from '../state/useMealPlannerStore';
import '../styles/landingScreen.scss';
import { Recipe } from '../utilities/types';
import { ThemedText } from './ThemedText';

export function CookingOption(): React.JSX.Element {
    const plannedRecipes = useMealPlannerStore((state) => state.plannedRecipes);
    const today = new Date();
    const todaysRecipe: Recipe | undefined = plannedRecipes.find((recipe) => {
        if (recipe.datePlanned) {
            return recipe.datePlanned.toDateString() === today.toDateString();
        }
        return false;
    });

    if (!todaysRecipe) {
        return (
            <View>
                <ThemedText>
                    No recipe planned for today. Plan one now!
                </ThemedText>
            </View>
        );
    }

    return (
        <View>
            <ThemedText>
                Today's Recipe: {todaysRecipe.name}. Start cooking?
            </ThemedText>
        </View>
    );
}
