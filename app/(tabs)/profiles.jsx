import { Text, View } from "react-native";
import { useUser } from "../../src/store/user";

export default function Profile() {
  const { user } = useUser();
  return (
    <View style={{ flex:1, alignItems:"center", justifyContent:"center", padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "700" }}>My Profile</Text>
      <Text style={{ marginTop: 8, opacity: 0.8 }}>{user?.email}</Text>
    </View>
  );
}
