import { Stack } from "expo-router";
import React from "react";
import { LikesProvider } from "../src/state/LikesContext";

export default function RootLayout() {
  return (
    <LikesProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </LikesProvider>
  );
}