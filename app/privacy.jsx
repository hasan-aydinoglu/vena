import React from "react";
import { ScrollView, Text, View } from "react-native";

export default function Privacy() {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 60 }}>
      <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
        <Text style={{ fontSize: 22, fontWeight: "800" }}>Privacy Policy</Text>
        <Text style={{ marginTop: 6, opacity: 0.6 }}>Summary version (MVP)</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 24 }}>
        <Text style={{ lineHeight: 20, opacity: 0.85 }}>
          1) Data we collect{"\n"}
          • Account email (demo for now){"\n"}
          • App preferences{"\n"}
          • Psychological onboarding answers used for compatibility scoring{"\n\n"}
          2) How we use data{"\n"}
          • To calculate compatibility and improve matching quality{"\n"}
          • To provide core app functionality{"\n\n"}
          3) Data sharing{"\n"}
          • We do not sell personal data{"\n"}
          • No third-party advertising sharing in MVP{"\n\n"}
          4) Data retention & deletion{"\n"}
          • You can request deletion (Settings – coming soon){"\n\n"}
          5) Security{"\n"}
          • We apply reasonable security measures appropriate for an MVP{"\n\n"}
          Note: This is an MVP policy summary. A full legal policy can be linked here later.
        </Text>
      </ScrollView>
    </View>
  );
}