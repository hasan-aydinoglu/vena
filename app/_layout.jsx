import { Stack } from "expo-router";
import React from "react";
import { LikesProvider } from "../src/state/LikesContext";
// Eğer PsychProfileProvider kullanıyorsan import et ve aşağıya ekle

export default function RootLayout() {
  return (
    <LikesProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </LikesProvider>
  );
}