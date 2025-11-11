import { Link, router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useUser } from "../../src/store/user";

export default function Register() {
  const { loginDemo } = useUser();
  const [email, setEmail] = useState("");

  const onRegister = () => {
    loginDemo(email || "new@vena.app");
    router.replace("/(tabs)");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 24, backgroundColor: "#fff" }}>
      <Text style={{ fontSize: 20, fontWeight: "700", textAlign: "center", marginBottom: 16 }}>Create VENA Account</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ borderWidth: 1, borderColor: "#ddd", borderRadius: 10, padding: 14, marginBottom: 12 }}
      />

      <TouchableOpacity onPress={onRegister} style={{ backgroundColor: "black", padding: 16, borderRadius: 10 }}>
        <Text style={{ color: "white", textAlign: "center", fontWeight: "600" }}>Continue</Text>
      </TouchableOpacity>

      <Link href="/(auth)/login" style={{ textAlign: "center", marginTop: 16 }}>Back to Login</Link>
    </View>
  );
}

