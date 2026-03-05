import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

const KEY = "vena_privacy_accepted_v1";

export default function Settings() {
  const onViewPrivacy = () => router.push("/privacy");
  const onViewTerms = () => router.push("/terms");

  const onWithdrawConsent = () => {
    Alert.alert(
      "Withdraw consent?",
      "If you withdraw consent, you will be asked to accept Privacy & Terms again before using the app.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Withdraw",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.removeItem(KEY);
            // App giriş akışını baştan başlat
            router.replace("/consent");
          },
        },
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 20, paddingTop: 60 }}>
      <Text style={{ fontSize: 22, fontWeight: "800" }}>Settings</Text>
      <Text style={{ marginTop: 6, opacity: 0.6 }}>Manage your preferences and privacy options.</Text>

      {/* Privacy & Terms Section */}
      <View style={{ marginTop: 24, padding: 16, borderRadius: 14, borderWidth: 1, borderColor: "#eee" }}>
        <Text style={{ fontSize: 16, fontWeight: "800", marginBottom: 10 }}>Privacy & Terms</Text>

        <TouchableOpacity
          onPress={onViewPrivacy}
          style={{
            paddingVertical: 12,
            paddingHorizontal: 12,
            borderRadius: 12,
            backgroundColor: "#f5f5f5",
            marginBottom: 10,
          }}
        >
          <Text style={{ fontWeight: "700" }}>View Privacy Policy</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onViewTerms}
          style={{
            paddingVertical: 12,
            paddingHorizontal: 12,
            borderRadius: 12,
            backgroundColor: "#f5f5f5",
            marginBottom: 10,
          }}
        >
          <Text style={{ fontWeight: "700" }}>View Terms of Use</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onWithdrawConsent}
          style={{
            paddingVertical: 12,
            paddingHorizontal: 12,
            borderRadius: 12,
            backgroundColor: "black",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "800", textAlign: "center" }}>
            Withdraw Consent
          </Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 12, opacity: 0.6, marginTop: 10 }}>
          Withdrawing consent will require you to accept policies again before using Vena.
        </Text>
      </View>
    </View>
  );
}