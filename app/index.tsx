import { useEffect } from 'react';
import { Button, Text, View } from 'react-native';
import { LoginScreen } from './components/LoginScreen';
import { isLoggedIn } from './hooks/helpers/isLoggedIn';
import { useLoginInfo } from './hooks/useLoginInfo';

export default async function Index() {
    const isUserLoggedIn: boolean | null = useLoginInfo(
        (state) => state.isLoggedIn
    );

    useEffect(() => {
        async function checkLoginStatus() {
            await isLoggedIn();
        }

        checkLoginStatus();
    }, []); // empty dependency array ensures this runs only once on mount

    return isUserLoggedIn ? (
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
                onPress={() => useLoginInfo.getState().logout()}
            />
        </View>
    ) : (
        <LoginScreen />
    );
}
