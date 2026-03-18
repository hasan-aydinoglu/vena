import { Stack } from "expo-router";
import React from "react";

import { ProfileProvider } from "../src/context/ProfileContext";
import { LikesProvider } from "../src/state/LikesContext";
import { PsychProfileProvider } from "../src/state/PsychProfileContext";

export default function RootLayout() {
  return (
    <PsychProfileProvider>
      <LikesProvider>
        <ProfileProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </ProfileProvider>
      </LikesProvider>
    </PsychProfileProvider>
  );
}