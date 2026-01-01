import { Link, router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity /*, Image*/, View } from "react-native";
import { useUser } from "../../src/store/user";

export default function Login() {
  const { loginDemo } = useUser();
  const [email, setEmail] = useState("");

  const onLogin = () => {
    loginDemo(email || "demo@vena.app");
    router.replace("/(tabs)/explore");

  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 24, backgroundColor: "#fff" }}>
      
      <Text style={{ fontSize: 22, fontWeight: "700", textAlign: "center", marginBottom: 12 }}>VENA</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ borderWidth: 1, borderColor: "#ddd", borderRadius: 10, padding: 14, marginBottom: 12 }}
      />

      <TouchableOpacity onPress={onLogin} style={{ backgroundColor: "black", padding: 16, borderRadius: 10 }}>
        <Text style={{ color: "white", textAlign: "center", fontWeight: "600" }}>Continue</Text>
      </TouchableOpacity>

      <Link href="/(auth)/register" style={{ textAlign: "center", marginTop: 16 }}>Create Account</Link>
    </View>
  );
}
