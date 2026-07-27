import { Image, StyleSheet } from 'react-native';
import { CookingScreen } from './components/CookingScreen';
import { FooterSelector } from './components/FooterSelector';
import { LandingScreen } from './components/LandingScreen';
import { LoginScreen } from './components/LoginScreen';
import { PantryScreen } from './components/PantryScreen';
import ParallaxScrollView from './components/ParallaxScrollView';
import { PlanningScreen } from './components/PlanningScreen';
import { UserSettingsScreen } from './components/UserSettingsScreen';
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
            <ParallaxScrollView
                headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
                headerImage={
                    <Image
                        source={require('@/assets/images/partial-react-logo.png')}
                        style={styles.reactLogo}
                    />
                }
            >
                {mode === null && <LandingScreen />}
                {mode === 'cook' && <CookingScreen />}
                {mode === 'pantry' && <PantryScreen />}
                {mode === 'plan' && <PlanningScreen />}
                {mode === 'settings' && <UserSettingsScreen />}
            </ParallaxScrollView>
            <FooterSelector />
        </>
    );
}

const styles = StyleSheet.create({
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute'
    }
});
