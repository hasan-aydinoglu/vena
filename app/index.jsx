import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

const KEY = "vena_privacy_accepted_v1";

export default function Index() {
  const [ready, setReady] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const v = await AsyncStorage.getItem(KEY);
        setAccepted(v === "1");
      } finally {
        setReady(true);
      }
    })();
  }, []);

  if (!ready) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  // ✅ Kabul yoksa önce consent
  if (!accepted) return <Redirect href="/consent" />;

  // ✅ Kabul varsa login
  return <Redirect href="/(auth)/login" />;
}