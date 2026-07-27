import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { Button, Image, StyleSheet } from 'react-native';
import { useIsLoggedIn } from '../hooks/useIsLoggedIn';
import { useMealPlannerStore } from '../state/useMealPlannerStore';
import ParallaxScrollView from './ParallaxScrollView';
import { ThemedText } from './ThemedText';

library.add(faUser);

export function UserSettingsScreen(): React.JSX.Element {
    const { isChecking, isLoggedIn } = useIsLoggedIn();

    useEffect(() => {
        if (!isChecking && !isLoggedIn) {
            useMealPlannerStore.getState().logout();
        }
    }, [isChecking, isLoggedIn]);

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
            <ThemedText>User Settings Screen</ThemedText>
            <Button
                title="Logout"
                onPress={() => useMealPlannerStore.getState().logout()}
            />
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    avatarContainer: {
        position: 'absolute',
        top: 20,
        right: 24,
        height: 64,
        backgroundColor: '#ffffff',
        borderRadius: 32,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 10
    },
    avatarButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    menu: {
        position: 'absolute',
        top: 20,
        right: 84
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute'
    }
});
