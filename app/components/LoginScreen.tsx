import { Image } from 'expo-image';
import { useState } from 'react';
import { Button, TextInput } from 'react-native';
import { useLoginInfo } from '../hooks/useLoginInfo';
import '../styles/login.scss';
import ParallaxScrollView from './ParallaxScrollView';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

export function LoginScreen(): React.JSX.Element {
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [hasLoginFailed, setHasLoginFailed] = useState(false);

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
            <ThemedView className="">
                <ThemedText type="title">Welcome!</ThemedText>
            </ThemedView>
            <TextInput
                placeholder="Username"
                value={userName}
                onChangeText={setUsername}
            />
            <TextInput
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                onTouchEnd={async () =>
                    await login(userName, password, setHasLoginFailed)
                }
            />
            <Button
                title="Login"
                onPress={async () =>
                    await login(userName, password, setHasLoginFailed)
                }
            />
            {hasLoginFailed && (
                <ThemedView className="">
                    <ThemedText type="title">
                        Login failed. Please try again.
                    </ThemedText>
                </ThemedView>
            )}
        </ParallaxScrollView>
    );
}

async function login(
    userName: string,
    password: string,
    setHasLoginFailed: (hasLoginFailed: boolean) => void
): Promise<void> {
    const supabaseClient = useLoginInfo.getState().client;
    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: userName,
        password: password
    });

    if (error !== null || data.session?.access_token === null) {
        setHasLoginFailed(true);
        console.log('Login error message: ', error?.message);
        return;
    }

    setHasLoginFailed(false);
    useLoginInfo.getState().login(userName, data.session.access_token);
}
