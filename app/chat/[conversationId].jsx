// app/chat/[conversationId].jsx
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Şimdilik sahte mesajlar (mock)
const MOCK_CONVERSATIONS = {
  "1": [
    { id: "m1", sender: "other", text: "Hey, how are you? 😊" },
    { id: "m2", sender: "me", text: "I’m good, just working on Vena." },
    { id: "m3", sender: "other", text: "That sounds cool, tell me more!" },
  ],
  "2": [
    { id: "m4", sender: "other", text: "Hi! Do you live in Manchester?" },
    { id: "m5", sender: "me", text: "Not yet, but I’m planning to move." },
  ],
  "3": [
    { id: "m6", sender: "other", text: "Bonjour from Paris! 🇫🇷" },
    { id: "m7", sender: "me", text: "Hey! Paris is on my travel list." },
  ],
};

export default function ChatScreen() {
  const { conversationId } = useLocalSearchParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const listRef = useRef(null);

  // İlk yüklemede mock mesajları getir
  useEffect(() => {
    const convId = String(conversationId || "");
    const initial = MOCK_CONVERSATIONS[convId] || [];
    setMessages(initial);
  }, [conversationId]);

  // Yeni mesaj gönder
  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      sender: "me",
      text: input.trim(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Az sonra scrollToEnd için küçük timeout
    setTimeout(() => {
      if (listRef.current) {
        listRef.current.scrollToEnd({ animated: true });
      }
    }, 100);
  };

  const renderItem = ({ item }) => {
    const isMe = item.sender === "me";

    return (
      <View
        style={[
          styles.msgContainer,
          isMe ? styles.msgContainerMe : styles.msgContainerThem,
        ]}
      >
        <View style={[styles.msgBubble, isMe ? styles.msgBubbleMe : styles.msgBubbleThem]}>
          <Text style={[styles.msgText, isMe ? styles.msgTextMe : styles.msgTextThem]}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={80}
    >
      <View style={styles.container}>
        {/* Başlık */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Chat</Text>
          <Text style={styles.headerSubtitle}>
            Conversation ID: {String(conversationId)}
          </Text>
        </View>

        {/* Mesajlar */}
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          onContentSizeChange={() => {
            if (listRef.current) {
              listRef.current.scrollToEnd({ animated: true });
            }
          }}
        />

        {/* Input alanı */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Mesaj yaz..."
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
            <Text style={styles.sendText}>Gönder</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 6,
  },
  header: {
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#eee",
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  listContent: {
    paddingVertical: 8,
  },
  msgContainer: {
    flexDirection: "row",
    marginBottom: 6,
  },
  msgContainerMe: {
    justifyContent: "flex-end",
  },
  msgContainerThem: {
    justifyContent: "flex-start",
  },
  msgBubble: {
    maxWidth: "75%",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 14,
  },
  msgBubbleMe: {
    backgroundColor: "#4b6cff",
    borderBottomRightRadius: 2,
  },
  msgBubbleThem: {
    backgroundColor: "#f1f1f1",
    borderBottomLeftRadius: 2,
  },
  msgText: {
    fontSize: 15,
  },
  msgTextMe: {
    color: "#fff",
  },
  msgTextThem: {
    color: "#222",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 6,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#eee",
  },
  input: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 15,
  },
  sendBtn: {
    marginLeft: 8,
    backgroundColor: "#000",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  sendText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
