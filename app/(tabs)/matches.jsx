import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
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

export default function Matches() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("all");
  const [tick, setTick] = useState(0); // store değişince re-render için

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

    // chat'e girince unread sıfırla
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

      {/* Filtreler */}
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

      {/* Match kartları */}
      {filteredMatches.map((item) => {
        const label = getRelationshipLabel(item.relationshipType);

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

                {/* Unread badge */}
                {item.unread > 0 && (
                  <View
                    style={{
                      position: "absolute",
                      right: -6,
                      top: -6,
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
                      {item.unread}
                    </Text>
                  </View>
                )}
              </View>

              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10 }}>
                  <Text style={{ fontSize: 18, fontWeight: "700", flex: 1 }} numberOfLines={1}>
                    {item.name}, {item.age}
                  </Text>

                  {/* mini time (çok basit) */}
                  <Text style={{ fontSize: 12, color: "#999" }}>
                    {item.lastMessageAt ? "now" : ""}
                  </Text>
                </View>

                <Text style={{ color: "#666", marginTop: 2 }} numberOfLines={1}>
                  {item.location}
                </Text>

                {/* Last message */}
                <Text style={{ marginTop: 6, color: "#444" }} numberOfLines={1}>
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
