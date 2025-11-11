import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { PROFILES } from "../../src/mock/profiles.js";

export default function Swipe() {
  const [i, setI] = useState(0);
  const p = PROFILES[i];

  const next = () => setI((x) => Math.min(x + 1, PROFILES.length));

  if (!p) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }}>
        <Text style={{ opacity: 0.6, marginBottom: 6 }}>Bugünlük bu kadar 😊</Text>
        <Text style={{ opacity: 0.6 }}>Yakında daha çok profil.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 16, gap: 16 }}>
      <View style={{ width: 320, height: 480, borderRadius: 18, overflow: "hidden", backgroundColor: "#fff", borderWidth: 1, borderColor: "#eee" }}>
        <Image source={{ uri: p.photo }} style={{ width: "100%", height: "75%" }} />
        <View style={{ padding: 14 }}>
          <Text style={{ fontSize: 22, fontWeight: "700" }}>{p.name}, {p.age}</Text>
          <Text style={{ marginTop: 6, opacity: 0.8 }}>{p.bio}</Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", gap: 12 }}>
        <TouchableOpacity onPress={next} style={{ paddingVertical: 12, paddingHorizontal: 18, borderRadius: 999, backgroundColor: "#eee" }}>
          <Text>Pass</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={next} style={{ paddingVertical: 12, paddingHorizontal: 18, borderRadius: 999, backgroundColor: "black" }}>
          <Text style={{ color: "#fff" }}>Like</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
