import { Button, Text, View } from "react-native";
import { LoginScreen } from "./components/LoginScreen";
import { useIsLoggedIn } from "./hooks/useIsLoggedIn";
import { useLoginInfo } from "./hooks/useLoginInfo";

export default function Index() {

  const isLoggedIn: boolean = useIsLoggedIn();

  return isLoggedIn ? (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
