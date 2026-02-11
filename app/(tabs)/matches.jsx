import { useRouter } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getRelationshipLabel } from "../../src/constants/relationship";
import { getMatches, markAsRead, subscribe } from "../../src/mock/chatStore";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "long_term", label: "Serious" },
  { id: "short_term_fun", label: "Fun" },
  { id: "life_partner", label: "Life partner" },
];


function timeAgo(ts) {
  if (!ts) return "";
  const now = Date.now();
  const diffMs = now - ts;
  const diffSec = Math.floor(diffMs / 1000);

  if (diffSec < 10) return "now";
  if (diffSec < 60) return `${diffSec}s`;

  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m`;

  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h`;

  const diffDay = Math.floor(diffHr / 24);
  return `${diffDay}d`;
}


function UnreadBadge({ count }) {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    if (!count || count <= 0) return;

    const pulse = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 1.15,
            duration: 550,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 550,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 1,
            duration: 550,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0.6,
            duration: 550,
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    pulse.start();
    return () => pulse.stop();
  }, [count, opacity, scale]);

  if (!count || count <= 0) return null;

  return (
    <View style={{ position: "absolute", right: -6, top: -6 }}>
     
      <Animated.View
        style={{
          position: "absolute",
          width: 28,
          height: 28,
          borderRadius: 14,
          backgroundColor: "#ff2e63",
          transform: [{ scale }],
          opacity,
        }}
      />
      
      <View
        style={{
          minWidth: 22,
          height: 22,
          borderRadius: 11,
          backgroundColor: "#ff2e63",
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 6,
          borderWidth: 2,
          borderColor: "#fff",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 12, fontWeight: "800" }}>
          {count}
        </Text>
      </View>
    </View>
  );
}

export default function Matches() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("all");
  const [tick, setTick] = useState(0); 

  useEffect(() => {
    const unsub = subscribe(() => setTick((t) => t + 1));
    return unsub;
  }, []);

  const allMatches = useMemo(() => getMatches(), [tick]);

  const filteredMatches =
    activeFilter === "all"
      ? allMatches
      : allMatches.filter((m) => m.relationshipType === activeFilter);

  const openChat = (item) => {
    const conversationId = String(item.id);

    
    markAsRead(conversationId);

    router.push({
      pathname: "/chat/[conversationId]",
      params: {
        conversationId,
        name: item.name,
        photo: item.photo,
      },
    });
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
      <Text style={{ fontSize: 26, fontWeight: "700", marginBottom: 12 }}>
        Matches
      </Text>

      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 16 }}
      >
        <View style={{ flexDirection: "row", gap: 8 }}>
          {FILTERS.map((f) => {
            const isActive = f.id === activeFilter;
            return (
              <TouchableOpacity
                key={f.id}
                onPress={() => setActiveFilter(f.id)}
                style={{
                  paddingHorizontal: 14,
                  paddingVertical: 6,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: isActive ? "#ff2e63" : "#ddd",
                  backgroundColor: isActive ? "#ff2e63" : "#fff",
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "600",
                    color: isActive ? "#fff" : "#444",
                  }}
                >
                  {f.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      
      {filteredMatches.map((item) => {
        const label = getRelationshipLabel(item.relationshipType);
        const when = timeAgo(item.lastMessageAt);

        return (
          <TouchableOpacity
            key={item.id}
            onPress={() => openChat(item)}
            activeOpacity={0.85}
            style={{
              backgroundColor: "#fff",
              borderRadius: 16,
              padding: 14,
              marginBottom: 16,
              elevation: 2,
              shadowColor: "#000",
              shadowOpacity: 0.08,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 2 },
              borderWidth: 1,
              borderColor: "#f1f1f1",
            }}
          >
            <View style={{ flexDirection: "row", gap: 14 }}>
              
              <View style={{ position: "relative" }}>
                <Image
                  source={{ uri: item.photo }}
                  style={{ width: 80, height: 80, borderRadius: 16 }}
                />
                <UnreadBadge count={item.unread} />
              </View>

              <View style={{ flex: 1 }}>
                
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "700", flex: 1 }}
                    numberOfLines={1}
                  >
                    {item.name}, {item.age}
                  </Text>
                  <Text style={{ fontSize: 12, color: "#999" }}>{when}</Text>
                </View>

                <Text style={{ color: "#666", marginTop: 2 }} numberOfLines={1}>
                  {item.location}
                </Text>

                
                <Text
                  style={{
                    marginTop: 6,
                    color: item.unread > 0 ? "#111" : "#444",
                    fontWeight: item.unread > 0 ? "700" : "500",
                  }}
                  numberOfLines={1}
                >
                  {item.lastMessage || "Say hi 👋"}
                </Text>

                {label && (
                  <View
                    style={{
                      marginTop: 8,
                      alignSelf: "flex-start",
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      borderRadius: 12,
                      backgroundColor: "#ffe8f0",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: "600",
                        color: "#ff2e63",
                      }}
                    >
                      Looking for {label}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        );
      })}

      {filteredMatches.length === 0 && (
        <Text style={{ color: "#777", marginTop: 20 }}>
          Bu filtre için henüz eşleşme yok.
        </Text>
      )}
    </ScrollView>
  );
}
