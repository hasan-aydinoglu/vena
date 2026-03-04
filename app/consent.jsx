import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const KEY = "vena_privacy_accepted_v1";

export default function Consent() {
  const [checked, setChecked] = useState(false);

  const canContinue = useMemo(() => checked, [checked]);

  const onAccept = async () => {
    await AsyncStorage.setItem(KEY, "1");
    router.replace("/(auth)/login");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ padding: 20, paddingTop: 60 }}>
        <Text style={{ fontSize: 22, fontWeight: "800" }}>Before you continue</Text>
        <Text style={{ marginTop: 6, opacity: 0.7 }}>
          Please review and accept our Privacy & Terms to use Vena.
        </Text>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20, paddingBottom: 24 }}>
        <Text style={{ fontSize: 16, fontWeight: "800", marginBottom: 10 }}>Privacy Summary</Text>

        <Text style={{ lineHeight: 20, opacity: 0.85 }}>
          • We store your account and app preferences to provide the service.{"\n"}
          • Your psychological onboarding answers are used to calculate compatibility scores.{"\n"}
          • We do not sell your personal data.{"\n"}
          • You can request data deletion from Settings (coming soon).{"\n"}
          • By continuing, you agree to our Terms of Use and Privacy Policy.
        </Text>

        <View style={{ height: 16 }} />

        <TouchableOpacity
          onPress={() => setChecked((v) => !v)}
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 12,
            padding: 14,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "700" }}>I agree to the Privacy Policy and Terms</Text>
          <Text style={{ fontSize: 18 }}>{checked ? "✅" : "⬜️"}</Text>
        </TouchableOpacity>

        <View style={{ height: 16 }} />

        
        <Text style={{ fontSize: 12, opacity: 0.6 }}>
          Tip: Later you can update consent and view policies from Settings.
        </Text>
      </ScrollView>

      <View style={{ padding: 20 }}>
        <TouchableOpacity
          onPress={onAccept}
          disabled={!canContinue}
          style={{
            backgroundColor: "black",
            padding: 16,
            borderRadius: 12,
            opacity: canContinue ? 1 : 0.4,
          }}
        >
          <Text style={{ color: "white", textAlign: "center", fontWeight: "700" }}>
            Accept & Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}