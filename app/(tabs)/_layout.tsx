import { Redirect, Tabs } from "expo-router";
import { useUser } from "../../src/store/user";

export default function TabsLayout() {
  const { user } = useUser();

  // Kullanıcı yoksa burada güvenli redirect yap
  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: "Swipe" }} />
      <Tabs.Screen name="matches" options={{ title: "Matches" }} />
      <Tabs.Screen name="chat" options={{ title: "Chat" }} />
      {/* Dosya adın hangisiyse ona göre name ver */}
      {/* örn: app/(tabs)/profile.jsx ise name="profile" olmalı */}
      <Tabs.Screen name="profiles" options={{ title: "Profile" }} />
      <Tabs.Screen name="settings" options={{ title: "Settings" }} />
    </Tabs>
  );
}
