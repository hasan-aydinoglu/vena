import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useUser } from "../../src/store/user";

export default function Settings() {
  const { logout } = useUser();
  const onLogout = () => { logout(); router.replace("/(auth)/login"); };

  return (
    <View style={{ flex:1, alignItems:"center", justifyContent:"center", gap: 12 }}>
      <Text>Settings</Text>
      <TouchableOpacity onPress={onLogout} style={{ backgroundColor: "black", padding: 12, borderRadius: 8 }}>
        <Text style={{ color: "white" }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
