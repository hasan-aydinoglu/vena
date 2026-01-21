import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getRelationshipLabel } from "../../src/constants/relationship";

const MOCK_MATCHES = [
  {
    id: 1,
    name: "Sarah",
    age: 24,
    location: "London, UK",
    photo: "https://randomuser.me/api/portraits/women/40.jpg",
    relationshipType: "long_term",
  },
  {
    id: 2,
    name: "Emma",
    age: 28,
    location: "Manchester, UK",
    photo: "https://randomuser.me/api/portraits/women/12.jpg",
    relationshipType: "short_term_fun",
  },
  {
    id: 3,
    name: "Anna",
    age: 22,
    location: "Paris, France",
    photo: "https://randomuser.me/api/portraits/women/55.jpg",
    relationshipType: "life_partner",
  },
];

const FILTERS = [
  { id: "all", label: "All" },
  { id: "long_term", label: "Serious" },
  { id: "short_term_fun", label: "Fun" },
  { id: "life_partner", label: "Life partner" },
];

export default function Matches() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("all");

  const openChat = (item) => {
    router.push({
      pathname: "/chat/[conversationId]",
      params: { conversationId: String(item.id) }, // şimdilik id = conversationId
    });
  };

  const filteredMatches =
    activeFilter === "all"
      ? MOCK_MATCHES
      : MOCK_MATCHES.filter((m) => m.relationshipType === activeFilter);

  return (
    <ScrollView style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
      {/* Başlık */}
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
              marginBottom: 20,
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
              <Image
                source={{ uri: item.photo }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 16,
                }}
              />

              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, fontWeight: "700" }}>
                  {item.name}, {item.age}
                </Text>
                <Text style={{ color: "#666", marginTop: 2 }}>
                  {item.location}
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
