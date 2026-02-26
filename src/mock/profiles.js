import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { calculateCompatibility } from "../../src/engine/matchingEngine.js";
import { PROFILES as RAW_PROFILES } from "../../src/mock/profiles.js";

const PROFILES_RAW = Array.isArray(RAW_PROFILES) ? RAW_PROFILES : [];


const PROFILES = PROFILES_RAW.map((p, idx) => ({
  id: p?.id ?? String(idx + 1),
  ...p,
  
  psychProfile: p?.psychProfile ?? {
    attachment: "secure",
    intentLevel: "long-term",
    emotionalRegulation: 6,
  },
}));

export default function SwipeHome() {
  const router = useRouter();
  const [i, setI] = useState(0);

  const p = i < PROFILES.length ? PROFILES[i] : null;
  const next = () => setI((x) => x + 1);


 
  const currentUserPsych = useMemo(
    () => ({
      attachment: "secure",
      intentLevel: "marriage",
      emotionalRegulation: 8,
    }),
    []
  );

  const compatibility = useMemo(() => {
    if (!p) return null;
    return calculateCompatibility(currentUserPsych, p.psychProfile);
  }, [p, currentUserPsych]);

  if (!p) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }}>
        <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 6 }}>No more profiles today</Text>
        <TouchableOpacity
          onPress={() => setI(0)}
          style={{ paddingVertical: 12, paddingHorizontal: 18, borderRadius: 999, backgroundColor: "black" }}
        >
          <Text style={{ color: "#fff" }}>Restart</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 16, gap: 16 }}>
      <View style={{ width: 320, flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ opacity: 0.7 }}>
          {i + 1}/{PROFILES.length}
        </Text>
        <TouchableOpacity onPress={() => router.push("/(tabs)/likes")}>
          <Text style={{ fontWeight: "700" }}>Likes</Text>
        </TouchableOpacity>
      </View>

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
        
        {compatibility != null && (
          <View
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              zIndex: 10,
              paddingVertical: 6,
              paddingHorizontal: 10,
              borderRadius: 999,
              backgroundColor: "rgba(0,0,0,0.75)",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "800" }}>{compatibility}% Compatible</Text>
          </View>
        )}

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