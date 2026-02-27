import { Stack } from "expo-router";
import React from "react";

import { LikesProvider } from "../src/state/LikesContext";
import { PsychProfileProvider } from "../src/state/PsychProfileContext";

export default function RootLayout() {
  return (
    <PsychProfileProvider>
      <LikesProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </LikesProvider>
    </PsychProfileProvider>
  );
}