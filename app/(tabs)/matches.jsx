import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
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

export default function Matches() {
  const router = useRouter();

  const openChat = (item) => {
    // Şimdilik mock: item.id → conversationId
    router.push({
      pathname: "/chat/[conversationId]",
      params: { conversationId: String(item.id) },
    });
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
      <Text style={{ fontSize: 26, fontWeight: "700", marginBottom: 16 }}>
        Matches
      </Text>

      {MOCK_MATCHES.map((item) => {
        const label = getRelationshipLabel(item.relationshipType);

        return (
          <TouchableOpacity
            key={item.id}
            onPress={() => openChat(item)}
            activeOpacity={0.8}
            style={{
              backgroundColor: "#fff",
              borderRadius: 16,
              padding: 14,
              marginBottom: 20,
              elevation: 2,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 2 },
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
    </ScrollView>
  );
}
