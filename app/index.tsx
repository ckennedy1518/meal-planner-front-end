import { Button, Text, View } from 'react-native';
import { LoginScreen } from './components/LoginScreen';
import { useMealPlannerStore } from './state/useMealPlannerStore';

export default function Index() {
    const isUserLoggedIn: boolean | null = useMealPlannerStore(
        (state) => state.isLoggedIn
    );

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
                onPress={() => useMealPlannerStore.getState().logout()}
            />
        </View>
    ) : (
        <LoginScreen />
    );
}
