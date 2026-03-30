import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CONVERSATIONS = [
  {
    id: "1",
    name: "Emily",
    message: "I’d love to hear more about your project.",
    time: "10:24",
    online: true,
    photo: "https://i.pravatar.cc/150?img=32",
  },
  {
    id: "2",
    name: "Sophie",
    message: "That sounds really interesting 😊",
    time: "09:10",
    online: false,
    photo: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: "3",
    name: "Lina",
    message: "Are you free later today?",
    time: "Yesterday",
    online: true,
    photo: "https://i.pravatar.cc/150?img=45",
  },
  {
    id: "4",
    name: "Olivia",
    message: "Good night 🌙",
    time: "Yesterday",
    online: false,
    photo: "https://i.pravatar.cc/150?img=49",
  },
];

export default function ChatListScreen() {
  const router = useRouter();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() =>
        router.push({
          pathname: "/chat/[conversationId]",
          params: { conversationId: item.id, name: item.name },
        })
      }
    >
      <View style={styles.avatarWrap}>
        <Image source={{ uri: item.photo }} style={styles.avatar} />
        {item.online ? <View style={styles.onlineDot} /> : null}
      </View>

      <View style={styles.chatMiddle}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.chatMessage} numberOfLines={1}>
          {item.message}
        </Text>
      </View>

      <Text style={styles.chatTime}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <Text style={styles.subtitle}>Your recent conversations</Text>
      </View>

      <FlatList
        data={CONVERSATIONS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0f1a",
  },
  header: {
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 12,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "800",
  },
  subtitle: {
    color: "#94a3b8",
    fontSize: 14,
    marginTop: 6,
  },
  listContent: {
    paddingHorizontal: 14,
    paddingBottom: 100,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 20,
    padding: 14,
    marginBottom: 12,
  },
  avatarWrap: {
    position: "relative",
    marginRight: 14,
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
  },
  onlineDot: {
    position: "absolute",
    right: 2,
    bottom: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#22c55e",
    borderWidth: 2,
    borderColor: "#0b0f1a",
  },
  chatMiddle: {
    flex: 1,
    marginRight: 8,
  },
  chatName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 4,
  },
  chatMessage: {
    color: "#cbd5e1",
    fontSize: 14,
  },
  chatTime: {
    color: "#94a3b8",
    fontSize: 12,
    fontWeight: "600",
  },
});