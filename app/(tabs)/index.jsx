import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

// ✅ Uzantıyla birlikte import et
import { PROFILES as RAW_PROFILES } from "../../src/mock/profiles.js";

// ✅ Güvenli fallback: import bozuksa bile crash olmasın
const PROFILES = Array.isArray(RAW_PROFILES) ? RAW_PROFILES : [];

export default function Swipe() {
  const [i, setI] = useState(0);

  // i diziden büyük/eşitse p = null olsun (böylece "bitti" ekranı görünür)
  const p = i < PROFILES.length ? PROFILES[i] : null;

  const next = () => setI((x) => x + 1); // sınırı p üzerinden kontrol ediyoruz

  if (!p) {
    // ✅ Profil yoksa / bittiğinde
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }}>
        <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 6 }}>
          No more profiles today
        </Text>
        <Text style={{ opacity: 0.6, textAlign: "center" }}>
          Add more mock data in{" "}
          <Text style={{ fontWeight: "700" }}>src/mock/profiles.js</Text>
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 16, gap: 16 }}>
      <View
        style={{
          width: 320,
          height: 480,
          borderRadius: 18,
          overflow: "hidden",
          backgroundColor: "#fff",
          borderWidth: 1,
          borderColor: "#eee",
        }}
      >
        <Image source={{ uri: p.photo }} style={{ width: "100%", height: "75%" }} />
        <View style={{ padding: 14 }}>
          <Text style={{ fontSize: 22, fontWeight: "700" }}>
            {p.name}, {p.age}
          </Text>
          <Text style={{ marginTop: 6, opacity: 0.8 }}>{p.bio}</Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", gap: 12 }}>
        <TouchableOpacity
          onPress={next}
          style={{ paddingVertical: 12, paddingHorizontal: 18, borderRadius: 999, backgroundColor: "#eee" }}
        >
          <Text>Pass</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={next}
          style={{ paddingVertical: 12, paddingHorizontal: 18, borderRadius: 999, backgroundColor: "black" }}
        >
          <Text style={{ color: "#fff" }}>Like</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
