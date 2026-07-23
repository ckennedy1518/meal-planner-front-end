import { Image } from 'expo-image';
import { useIsLoggedIn } from '../hooks/useIsLoggedIn';
import '../styles/landingScreen.scss';
import { CookingOption } from './CookingOption';
import ParallaxScrollView from './ParallaxScrollView';

export async function LandingScreen(): Promise<React.JSX.Element> {
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
            <CookingOption />
        </ParallaxScrollView>
    );
}
