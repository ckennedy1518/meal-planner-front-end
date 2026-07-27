import { Button, Text, View } from 'react-native';
import { CookingScreen } from './components/CookingScreen';
import { FooterSelector } from './components/FooterSelector';
import { LandingScreen } from './components/LandingScreen';
import { LoginScreen } from './components/LoginScreen';
import { PantryScreen } from './components/PantryScreen';
import { PlanningScreen } from './components/PlanningScreen';
import { useMealPlannerStore } from './state/useMealPlannerStore';
import { Mode } from './utilities/types';

export default function Index() {
    const isUserLoggedIn: boolean | null = useMealPlannerStore(
        (state) => state.isLoggedIn
    );
    const mode: Mode = useMealPlannerStore((state) => state.mode);

    if (!isUserLoggedIn) {
        return <LoginScreen />;
    }

    return (
        <>
            {/* TODO: icon/avatar */}
            {mode === null && <LandingScreen />}
            {mode === 'cook' && <CookingScreen />}
            {mode === 'pantry' && <PantryScreen />}
            {mode === 'plan' && <PlanningScreen />}
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text>Edit app/index.tsx to edit this screen.</Text>
                <Button
                    title="Logout"
                    onPress={() => useMealPlannerStore.getState().logout()}
                />
            </View>
            <FooterSelector />
        </>
    );
}
