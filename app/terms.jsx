import React from "react";
import { ScrollView, Text, View } from "react-native";

export default function Terms() {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 60 }}>
      <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
        <Text style={{ fontSize: 22, fontWeight: "800" }}>Terms of Use</Text>
        <Text style={{ marginTop: 6, opacity: 0.6 }}>Summary version (MVP)</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 24 }}>
        <Text style={{ lineHeight: 20, opacity: 0.85 }}>
          • You must be at least 18 years old to use Vena.{"\n"}
          • You are responsible for the content you share.{"\n"}
          • Harassment, abuse, or harmful behavior is not allowed.{"\n"}
          • Vena is provided “as is” during MVP phase.{"\n"}
          • We may update features and policies as the product evolves.{"\n\n"}
          Note: This is an MVP terms summary. A full legal version can be linked here later.
        </Text>
      </ScrollView>
    </View>
  );
}