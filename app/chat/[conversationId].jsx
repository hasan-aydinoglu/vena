import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function ChatScreen() {
  const { conversationId } = useLocalSearchParams();

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
      }}
    >
      <Text style={{ fontSize: 22, fontWeight: "700" }}>Chat Screen</Text>
      <Text style={{ marginTop: 8 }}>conversationId: {String(conversationId)}</Text>
    </View>
  );
}
