import { Image, ScrollView, Text, View } from "react-native";
import { getRelationshipLabel } from "../../src/constants/relationship";

const PROFILES = [
  {
    id: 11,
    name: "Julia",
    age: 27,
    location: "Berlin, Germany",
    photo: "https://randomuser.me/api/portraits/women/14.jpg",
    relationshipType: "long_term",
  },
  {
    id: 12,
    name: "Chloe",
    age: 23,
    location: "Madrid, Spain",
    photo: "https://randomuser.me/api/portraits/women/52.jpg",
    relationshipType: "short_term_fun",
  },
  {
    id: 13,
    name: "Olivia",
    age: 30,
    location: "New York, USA",
    photo: "https://randomuser.me/api/portraits/women/8.jpg",
    relationshipType: "life_partner",
  },
];

export default function Explore() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
      <Text style={{ fontSize: 26, fontWeight: "700", marginBottom: 16 }}>
        Explore
      </Text>

      {PROFILES.map((item) => {
        const label = getRelationshipLabel(item.relationshipType);

        return (
          <View
            key={item.id}
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
            }}
          >
            <Image
              source={{ uri: item.photo }}
              style={{
                width: "100%",
                height: 260,
                borderRadius: 18,
                marginBottom: 12,
              }}
            />

            <Text style={{ fontSize: 22, fontWeight: "700" }}>
              {item.name}, {item.age}
            </Text>

            <Text style={{ marginTop: 4, color: "#666" }}>
              {item.location}
            </Text>

            {label && (
              <View
                style={{
                  marginTop: 10,
                  alignSelf: "flex-start",
                  paddingHorizontal: 12,
                  paddingVertical: 5,
                  borderRadius: 16,
                  backgroundColor: "#ffe8f0",
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: "#ff2e63",
                    fontWeight: "600",
                  }}
                >
                  Looking for {label}
                </Text>
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}
