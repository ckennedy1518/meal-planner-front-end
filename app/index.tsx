import { Button, Text, View } from "react-native";
import { LoginScreen } from "./components/LoginScreen";
import { useLoginInfo } from "./hooks/useLoginInfo";

export default function Index() {
  const isLoggedIn: boolean | null = useLoginInfo((state) => state.isLoggedIn);

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
