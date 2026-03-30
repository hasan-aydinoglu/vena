import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const MOCK_MESSAGES = [
  {
    id: "1",
    text: "Hey Hasan, how’s your day going?",
    sender: "other",
    time: "10:12",
  },
  {
    id: "2",
    text: "Pretty good actually. Working on Vena today.",
    sender: "me",
    time: "10:13",
  },
  {
    id: "3",
    text: "That sounds exciting 👀",
    sender: "other",
    time: "10:14",
  },
  {
    id: "4",
    text: "Yes, I’m improving the chat experience now.",
    sender: "me",
    time: "10:15",
  },
];

export default function ConversationScreen() {
  const router = useRouter();
  const { conversationId, name } = useLocalSearchParams();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const listRef = useRef(null);

  const chatTitle = useMemo(() => {
    if (typeof name === "string" && name.trim()) return name;
    return "Chat";
  }, [name]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const newMessage = {
      id: Date.now().toString(),
      text: trimmed,
      sender: "me",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInput("");

    setTimeout(() => {
      listRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const renderMessage = ({ item }) => {
    const isMine = item.sender === "me";

    return (
      <View
        style={[
          styles.messageRow,
          isMine ? styles.myMessageRow : styles.otherMessageRow,
        ]}
      >
        <View
          style={[
            styles.messageBubble,
            isMine ? styles.myMessageBubble : styles.otherMessageBubble,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              isMine ? styles.myMessageText : styles.otherMessageText,
            ]}
          >
            {item.text}
          </Text>
          <Text
            style={[
              styles.messageTime,
              isMine ? styles.myMessageTime : styles.otherMessageTime,
            ]}
          >
            {item.time}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>‹</Text>
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {chatTitle?.charAt(0)?.toUpperCase() || "C"}
              </Text>
            </View>
            <View>
              <Text style={styles.headerName}>{chatTitle}</Text>
              <Text style={styles.headerStatus}>Online now</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.moreButton}>
            <Text style={styles.moreButtonText}>⋯</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() =>
            listRef.current?.scrollToEnd({ animated: true })
          }
        />

        <View style={styles.inputBar}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor="#94a3b8"
            value={input}
            onChangeText={setInput}
            multiline
          />

          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0f1a",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
    marginTop: -2,
  },
  headerCenter: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 12,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#ff7a59",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },
  headerName: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "800",
  },
  headerStatus: {
    color: "#8fbf9f",
    fontSize: 13,
    marginTop: 2,
  },
  moreButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  moreButtonText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },
  messagesContent: {
    paddingHorizontal: 14,
    paddingVertical: 18,
    paddingBottom: 24,
  },
  messageRow: {
    marginBottom: 12,
    flexDirection: "row",
  },
  myMessageRow: {
    justifyContent: "flex-end",
  },
  otherMessageRow: {
    justifyContent: "flex-start",
  },
  messageBubble: {
    maxWidth: "78%",
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 9,
    borderRadius: 18,
  },
  myMessageBubble: {
    backgroundColor: "#ff7a59",
    borderBottomRightRadius: 6,
  },
  otherMessageBubble: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderBottomLeftRadius: 6,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 21,
    marginBottom: 6,
  },
  myMessageText: {
    color: "#fff",
  },
  otherMessageText: {
    color: "#e2e8f0",
  },
  messageTime: {
    fontSize: 11,
    alignSelf: "flex-end",
  },
  myMessageTime: {
    color: "rgba(255,255,255,0.82)",
  },
  otherMessageTime: {
    color: "#94a3b8",
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: Platform.OS === "ios" ? 18 : 14,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.06)",
    backgroundColor: "#0b0f1a",
  },
  input: {
    flex: 1,
    minHeight: 48,
    maxHeight: 120,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: "#fff",
    fontSize: 15,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#ff7a59",
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "800",
  },
});