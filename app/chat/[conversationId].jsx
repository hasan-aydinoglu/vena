import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";


const MOCK_CONVERSATIONS = {
  "1": [
    { id: "m1", sender: "other", text: "Hey, how are you? 😊" },
    { id: "m2", sender: "me", text: "I’m good! Working on Vena." },
  ],
  "2": [{ id: "m3", sender: "other", text: "Hi! Nice to meet you." }],
  "3": [{ id: "m4", sender: "other", text: "Bonjour 🇫🇷" }],
};

export default function ChatScreen() {
  const { conversationId, name, photo } = useLocalSearchParams();
  const router = useRouter();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  
  const [isTyping, setIsTyping] = useState(false);
  const [lastOutgoingId, setLastOutgoingId] = useState(null);
  const [lastOutgoingStatus, setLastOutgoingStatus] = useState(null); // "Sent" | "Delivered" | "Seen"

  const listRef = useRef(null);
  const typingTimerRef = useRef(null);
  const statusTimersRef = useRef([]);

  useEffect(() => {
    const convId = String(conversationId || "");
    const initial = MOCK_CONVERSATIONS[convId] || [];
    setMessages(initial);
  }, [conversationId]);

  useEffect(() => {
    return () => {
      // cleanup timers
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      statusTimersRef.current.forEach((t) => clearTimeout(t));
      statusTimersRef.current = [];
    };
  }, []);

  const scrollToEnd = () => {
    setTimeout(() => {
      listRef.current?.scrollToEnd({ animated: true });
    }, 50);
  };

  const simulateOtherUserReply = (yourText) => {
    
    setIsTyping(true);

    
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);

    typingTimerRef.current = setTimeout(() => {
      setIsTyping(false);

      const reply = {
        id: `o-${Date.now()}`,
        sender: "other",
        text:
          yourText.length > 18
            ? "Interesting 🙂 Tell me more!"
            : "Nice! 😊",
      };

      setMessages((prev) => [...prev, reply]);

      
      if (lastOutgoingId) setLastOutgoingStatus("Seen");

      scrollToEnd();
    }, 1200);
  };

  const setOutgoingStatusTimers = () => {
    
    statusTimersRef.current.forEach((t) => clearTimeout(t));
    statusTimersRef.current = [];

    
    statusTimersRef.current.push(
      setTimeout(() => setLastOutgoingStatus("Delivered"), 400)
    );
    
    statusTimersRef.current.push(
      setTimeout(() => setLastOutgoingStatus("Seen"), 2000)
    );
  };

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;

    const newMsg = {
      id: `me-${Date.now()}`,
      sender: "me",
      text,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    
    setLastOutgoingId(newMsg.id);
    setLastOutgoingStatus("Sent");
    setOutgoingStatusTimers();

    scrollToEnd();

    
    simulateOtherUserReply(text);
  };

  const renderItem = ({ item }) => {
    const isMe = item.sender === "me";
    const isLastOutgoing = isMe && item.id === lastOutgoingId;

    return (
      <View style={{ marginBottom: isLastOutgoing ? 2 : 6 }}>
        <View
          style={[
            styles.bubble,
            isMe ? styles.bubbleMe : styles.bubbleThem,
          ]}
        >
          <Text style={[styles.msgText, isMe ? styles.msgTextMe : styles.msgTextThem]}>
            {item.text}
          </Text>
        </View>

       
        {isLastOutgoing && lastOutgoingStatus && (
          <Text style={styles.statusText}>{lastOutgoingStatus}</Text>
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={80}
    >
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        {photo ? <Image source={{ uri: photo }} style={styles.avatar} /> : null}

        <View style={{ flex: 1 }}>
          <Text style={styles.headerName} numberOfLines={1}>
            {name || "Match"}
          </Text>

          
          {isTyping ? (
            <Text style={styles.typingText}>typing…</Text>
          ) : (
            <Text style={styles.subText}>online</Text>
          )}
        </View>
      </View>

      
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(i) => String(i.id)}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 10 }}
        onContentSizeChange={scrollToEnd}
      />

      
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Mesaj yaz..."
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage} activeOpacity={0.85}>
          <Text style={styles.sendText}>Gönder</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
    gap: 10,
  },
  backBtn: { paddingRight: 4, paddingVertical: 6 },
  backText: { fontSize: 24 },

  avatar: { width: 44, height: 44, borderRadius: 14 },
  headerName: { fontSize: 18, fontWeight: "700" },
  typingText: { fontSize: 12, color: "#4b6cff", marginTop: 2, fontWeight: "600" },
  subText: { fontSize: 12, color: "#888", marginTop: 2 },

  bubble: {
    maxWidth: "78%",
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 14,
  },
  bubbleMe: {
    alignSelf: "flex-end",
    backgroundColor: "#4b6cff",
    borderBottomRightRadius: 3,
  },
  bubbleThem: {
    alignSelf: "flex-start",
    backgroundColor: "#f1f1f1",
    borderBottomLeftRadius: 3,
  },

  msgText: { fontSize: 15 },
  msgTextMe: { color: "#fff", fontWeight: "500" },
  msgTextThem: { color: "#222", fontWeight: "500" },

  statusText: {
    alignSelf: "flex-end",
    marginTop: 3,
    marginRight: 4,
    fontSize: 11,
    color: "#888",
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 15,
  },
  sendBtn: {
    backgroundColor: "#000",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  sendText: { color: "#fff", fontWeight: "700", fontSize: 14 },
});
