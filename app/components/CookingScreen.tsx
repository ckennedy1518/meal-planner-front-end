import { Image } from 'expo-image';
import { useIsLoggedIn } from '../hooks/useIsLoggedIn';
import { useMealPlannerStore } from '../state/useMealPlannerStore';
import ParallaxScrollView from './ParallaxScrollView';
import { ThemedText } from './ThemedText';

export function CookingScreen(): React.JSX.Element {
    const { isChecking, isLoggedIn } = useIsLoggedIn();

    if (!isChecking && !isLoggedIn) {
        useMealPlannerStore.getState().logout();
    }

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
                <Image
                    source={require('@/assets/images/partial-react-logo.png')}
                    className="reactLogo"
                />
            }
        >
            {isChecking ? (
                <ThemedText>Checking login status...</ThemedText>
            ) : (
                <ThemedText>Cooking Screen</ThemedText>
            )}
        </ParallaxScrollView>
    );
}
