import { Image } from 'expo-image';
import { useIsLoggedIn } from '../hooks/useIsLoggedIn';
import { useMealPlannerStore } from '../state/useMealPlannerStore';
import '../styles/landingScreen.scss';
import { CookingOption } from './CookingOption';
import ParallaxScrollView from './ParallaxScrollView';
import { ThemedText } from './ThemedText';

export function LandingScreen(): React.JSX.Element {
    const { isChecking, isLoggedIn } = useIsLoggedIn();

    if (!isChecking && !isLoggedIn) {
        useMealPlannerStore.getState().logout();
    }

    if (isChecking) {
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
                <ThemedText>Checking login status...</ThemedText>
            </ParallaxScrollView>
        );
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
            <CookingOption />
        </ParallaxScrollView>
    );
}
