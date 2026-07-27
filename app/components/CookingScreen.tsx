import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';
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
                    style={styles.reactLogo}
                />
            }
        >
            <ThemedText>Cooking Screen</ThemedText>
        </ParallaxScrollView>
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
