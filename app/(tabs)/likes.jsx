import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useLikes } from "../../src/state/LikesContext";

export default function Likes() {
  const { likedProfiles, unlikeProfile, clearLikes } = useLikes();

  if (likedProfiles.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }}>
        <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 6 }}>No likes yet</Text>
        <Text style={{ opacity: 0.6, textAlign: "center" }}>
          Go back to Home and tap Like on profiles you like.
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 16 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: "800" }}>Likes</Text>

        <TouchableOpacity onPress={clearLikes} style={{ paddingVertical: 8, paddingHorizontal: 12, borderRadius: 10, backgroundColor: "#eee" }}>
          <Text style={{ fontWeight: "700" }}>Clear</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ gap: 12, paddingBottom: 24 }}>
        {likedProfiles.map((p) => (
          <View
            key={p.id}
            style={{
              flexDirection: "row",
              gap: 12,
              borderWidth: 1,
              borderColor: "#eee",
              borderRadius: 14,
              padding: 12,
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: p.photo }}
              style={{ width: 64, height: 64, borderRadius: 12, backgroundColor: "#f2f2f2" }}
            />

            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: "800" }}>
                {p.name}, {p.age}
              </Text>
              <Text style={{ opacity: 0.7, marginTop: 2 }} numberOfLines={2}>
                {p.bio}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => unlikeProfile(p.id)}
              style={{ paddingVertical: 10, paddingHorizontal: 12, borderRadius: 12, backgroundColor: "black" }}
            >
              <Text style={{ color: "#fff", fontWeight: "700" }}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}