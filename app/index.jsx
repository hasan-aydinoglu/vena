import { Redirect } from "expo-router";
import React from "react";

export default function Index() {
  // Uygulama açılınca HER ZAMAN login ekranı
  return <Redirect href="/(auth)/login" />;
}
