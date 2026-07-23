import { Button, Text, View } from 'react-native';
import { CookingScreen } from './components/CookingScreen';
import { LandingScreen } from './components/LandingScreen';
import { LoginScreen } from './components/LoginScreen';
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
            {/* TODO: Banner??? */}
            {/* TODO: icon/avatar */}
            {mode === null && <LandingScreen />}
            {mode === 'plan' && <PlanningScreen />}
            {mode === 'cook' && <CookingScreen />}
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
        </>
    );
}
