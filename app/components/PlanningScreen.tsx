import { Image } from 'expo-image';
import { useIsLoggedIn } from '../hooks/useIsLoggedIn';
import ParallaxScrollView from './ParallaxScrollView';
import { ThemedText } from './ThemedText';

export async function PlanningScreen(): Promise<React.JSX.Element> {
    await useIsLoggedIn();

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
            <ThemedText>Planning Screen</ThemedText>
        </ParallaxScrollView>
    );
}
