import { Image } from 'expo-image';
import { useState } from 'react';
import { Button, TextInput } from 'react-native';
import { useLoginInfo } from '../hooks/useLoginInfo';
import '../styles/login.scss';
import ParallaxScrollView from "./ParallaxScrollView";
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

export function LoginScreen() {
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <ParallaxScrollView
              headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
              headerImage={
                <Image
                  source={require('@/assets/images/partial-react-logo.png')}
                  className="reactLogo"
                />
              }>
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
              onTouchEnd={() => login(userName, password)}
            />
            <Button
              title="Login"
              onPress={() => login(userName, password)}
            />
        </ParallaxScrollView>
    );
}

function login(userName: string, password: string) {
    // todo: call service to validate user and password

    // set login info in zustand store
    if (userName && password) {
        const token = "dummy-token"; // replace with actual token from service
        useLoginInfo.getState().login(userName, token);
    }
}