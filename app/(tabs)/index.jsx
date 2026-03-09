import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";

import { calculateCompatibility } from "../../src/engine/matchingEngine.js";
import { PROFILES as RAW_PROFILES } from "../../src/mock/profiles.js";
import { useLikes } from "../../src/state/LikesContext";
import { usePsychProfile } from "../../src/state/PsychProfileContext";

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
  const { likedProfiles, likeProfile } = useLikes();
  const { psychProfile } = usePsychProfile();

  const [i, setI] = useState(0);

 
  const [boostsLeft, setBoostsLeft] = useState(3);
  const [boostActive, setBoostActive] = useState(false);
  const [boostSecondsLeft, setBoostSecondsLeft] = useState(0);

  const p = i < PROFILES.length ? PROFILES[i] : null;

  const next = () => setI((x) => x + 1);

  const onPass = () => next();

  const onLike = () => {
    if (!p) return;
    likeProfile(p);
    next();
  };

  const compatibility = useMemo(() => {
    if (!p || !psychProfile) return null;
    return calculateCompatibility(psychProfile, p.psychProfile);
  }, [p, psychProfile]);

  useEffect(() => {
    if (!boostActive || boostSecondsLeft <= 0) return;

    const timer = setInterval(() => {
      setBoostSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setBoostActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [boostActive, boostSecondsLeft]);

  const handleBoost = () => {
    if (boostActive) {
      Alert.alert("Boost Active", "Your boost is already active.");
      return;
    }

    if (boostsLeft <= 0) {
      Alert.alert("No Boosts Left", "You have used all available boosts.");
      return;
    }

    setBoostsLeft((prev) => prev - 1);
    setBoostActive(true);
    setBoostSecondsLeft(30 * 60); 
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  if (!psychProfile) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }}>
        <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 10 }}>
          Complete your relationship setup
        </Text>
        <Text style={{ opacity: 0.7, textAlign: "center", marginBottom: 16 }}>
          We need your psychological profile to calculate compatibility.
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/onboarding/PsychologyScreen")}
          style={{
            backgroundColor: "#6C5CE7",
            paddingVertical: 14,
            paddingHorizontal: 20,
            borderRadius: 12,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "700" }}>Start Setup</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!p) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }}>
        <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 6 }}>
          No more profiles today
        </Text>

        <TouchableOpacity
          onPress={() => setI(0)}
          style={{
            marginTop: 16,
            paddingVertical: 12,
            paddingHorizontal: 18,
            borderRadius: 999,
            backgroundColor: "black",
          }}
        >
          <Text style={{ color: "#fff" }}>Restart</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 16, gap: 16 }}>
      
      <View style={{ width: 320, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ opacity: 0.7 }}>
          {i + 1}/{PROFILES.length}
        </Text>

        <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
          <TouchableOpacity
            onPress={handleBoost}
            style={{
              backgroundColor: boostActive ? "#6C5CE7" : "#111",
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderRadius: 999,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "700" }}>
              {boostActive ? `Boost ${formatTime(boostSecondsLeft)}` : `Boost (${boostsLeft})`}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/(tabs)/likes")}>
            <Text style={{ fontWeight: "700" }}>Likes ({likedProfiles.length})</Text>
          </TouchableOpacity>
        </View>
      </View>

      
      <View
        style={{
          width: 320,
          height: 500,
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

        
        {boostActive && (
          <View
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              zIndex: 10,
              paddingVertical: 6,
              paddingHorizontal: 10,
              borderRadius: 999,
              backgroundColor: "#6C5CE7",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "800" }}>BOOST ACTIVE</Text>
          </View>
        )}

        <Image source={{ uri: p.photo }} style={{ width: "100%", height: "75%" }} />

        <View style={{ padding: 14 }}>
          <Text style={{ fontSize: 22, fontWeight: "700" }}>
            {p.name}, {p.age}
          </Text>
          <Text style={{ marginTop: 6, opacity: 0.8 }}>{p.bio}</Text>

          {boostActive && (
            <Text style={{ marginTop: 10, color: "#6C5CE7", fontWeight: "700" }}>
              Your profile visibility is currently boosted
            </Text>
          )}
        </View>
      </View>

      
      <View style={{ flexDirection: "row", gap: 12 }}>
        <TouchableOpacity
          onPress={onPass}
          style={{
            paddingVertical: 12,
            paddingHorizontal: 18,
            borderRadius: 999,
            backgroundColor: "#eee",
          }}
        >
          <Text>Pass</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onLike}
          style={{
            paddingVertical: 12,
            paddingHorizontal: 18,
            borderRadius: 999,
            backgroundColor: "black",
          }}
        >
          <Text style={{ color: "#fff" }}>Like</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}