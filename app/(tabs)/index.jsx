import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { PROFILES as RAW_PROFILES } from "../../src/mock/profiles.js";

const PROFILES_RAW = Array.isArray(RAW_PROFILES) ? RAW_PROFILES : [];


const PROFILES = PROFILES_RAW.map((p, idx) => ({
  id: p?.id ?? String(idx + 1),
  ...p,
}));

export default function SwipeHome() {
  const router = useRouter();

  const [i, setI] = useState(0);

  
  const [likedProfiles, setLikedProfiles] = useState([]);

  const p = i < PROFILES.length ? PROFILES[i] : null;

  const next = () => setI((x) => x + 1);

  const onPass = () => {
    next();
  };

  const onLike = () => {
    if (!p) return;

    setLikedProfiles((prev) => {
      // aynı kişiyi 2 kere ekleme
      if (prev.some((x) => x.id === p.id)) return prev;
      return [...prev, p];
    });

    next();

    
  };

  const likedCount = useMemo(() => likedProfiles.length, [likedProfiles]);

  if (!p) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }}>
        <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 6 }}>
          No more profiles today
        </Text>
        <Text style={{ opacity: 0.6, textAlign: "center", marginBottom: 14 }}>
          Add more mock data in{" "}
          <Text style={{ fontWeight: "700" }}>src/mock/profiles.js</Text>
        </Text>

        <View style={{ flexDirection: "row", gap: 10 }}>
          <TouchableOpacity
            onPress={() => setI(0)}
            style={{ paddingVertical: 12, paddingHorizontal: 18, borderRadius: 999, backgroundColor: "black" }}
          >
            <Text style={{ color: "#fff" }}>Restart</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setI(0);
              setLikedProfiles([]);
            }}
            style={{ paddingVertical: 12, paddingHorizontal: 18, borderRadius: 999, backgroundColor: "#eee" }}
          >
            <Text>Reset Likes</Text>
          </TouchableOpacity>
        </View>
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
          <Text style={{ fontWeight: "700" }}>Likes ({likedCount})</Text>
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
          onPress={onPass}
          style={{ paddingVertical: 12, paddingHorizontal: 18, borderRadius: 999, backgroundColor: "#eee" }}
        >
          <Text>Pass</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onLike}
          style={{ paddingVertical: 12, paddingHorizontal: 18, borderRadius: 999, backgroundColor: "black" }}
        >
          <Text style={{ color: "#fff" }}>Like</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
