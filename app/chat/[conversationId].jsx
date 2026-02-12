import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  addMessage,
  getConversation,
  markAsRead,
  setOtherMessageWithoutUnread,
  subscribe,
} from "../../src/mock/chatStore";

const REACTIONS = ["❤️", "😂", "🔥", "👏", "😮"];

export default function ChatScreen() {
  const { conversationId, name, photo } = useLocalSearchParams();
  const router = useRouter();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const [isTyping, setIsTyping] = useState(false);
  const [lastOutgoingId, setLastOutgoingId] = useState(null);
  const [lastOutgoingStatus, setLastOutgoingStatus] = useState(null); // Sent/Delivered/Seen

  // Reaction UI state
  const [reactionModalVisible, setReactionModalVisible] = useState(false);
  const [selectedMsgId, setSelectedMsgId] = useState(null);

  const listRef = useRef(null);
  const typingTimerRef = useRef(null);
  const statusTimersRef = useRef([]);

  const cid = useMemo(() => String(conversationId || ""), [conversationId]);

  useEffect(() => {
    if (cid) markAsRead(cid);

    const unsub = subscribe(() => {
      setMessages(getConversation(cid));
    });

    setMessages(getConversation(cid));
    return () => unsub();
  }, [cid]);

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      statusTimersRef.current.forEach((t) => clearTimeout(t));
      statusTimersRef.current = [];
    };
  }, []);

  const scrollToEnd = () => {
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 50);
  };

  const setOutgoingStatusTimers = () => {
    statusTimersRef.current.forEach((t) => clearTimeout(t));
    statusTimersRef.current = [];

    statusTimersRef.current.push(
      setTimeout(() => setLastOutgoingStatus("Delivered"), 400)
    );
    statusTimersRef.current.push(
      setTimeout(() => setLastOutgoingStatus("Seen"), 1800)
    );
  };

  const simulateOtherUserReply = (yourText) => {
    setIsTyping(true);
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);

    typingTimerRef.current = setTimeout(() => {
      setIsTyping(false);

      const reply = {
        id: `o-${Date.now()}`,
        sender: "other",
        text: yourText.length > 18 ? "Interesting 🙂 Tell me more!" : "Nice! 😊",
        reaction: null,
      };

      // chat açıkken unread artırma
      setOtherMessageWithoutUnread(cid, reply);

      if (lastOutgoingId) setLastOutgoingStatus("Seen");
      scrollToEnd();
    }, 1200);
  };

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;

    const msg = {
      id: `me-${Date.now()}`,
      sender: "me",
      text,
      reaction: null,
    };

    addMessage(cid, msg);

    setInput("");
    setLastOutgoingId(msg.id);
    setLastOutgoingStatus("Sent");
    setOutgoingStatusTimers();
    scrollToEnd();

    simulateOtherUserReply(text);
  };

  const openReactionPicker = (msgId) => {
    setSelectedMsgId(msgId);
    setReactionModalVisible(true);
  };

  const setReactionOnMessage = (emoji) => {
    if (!selectedMsgId) return;

    // local state update (mock)
    setMessages((prev) =>
      prev.map((m) =>
        m.id === selectedMsgId ? { ...m, reaction: emoji } : m
      )
    );

    // store da güncellensin ki Matches lastMessage vs. bozulmasın:
    // (Basit çözüm: conversation'ı store'dan tekrar çekince reaction kaybolabilir.
    // İstersen store'a "updateMessageReaction" fonksiyonu ekleriz.
    // Şimdilik chat ekranında kalıcı görünür.)

    setReactionModalVisible(false);
    setSelectedMsgId(null);
  };

  const clearReaction = () => {
    if (!selectedMsgId) return;
    setMessages((prev) =>
      prev.map((m) => (m.id === selectedMsgId ? { ...m, reaction: null } : m))
    );
    setReactionModalVisible(false);
    setSelectedMsgId(null);
  };

  const renderItem = ({ item }) => {
    const isMe = item.sender === "me";
    const isLastOutgoing = isMe && item.id === lastOutgoingId;

    return (
      <View style={{ marginBottom: item.reaction ? 2 : isLastOutgoing ? 2 : 6 }}>
        <TouchableOpacity
          activeOpacity={0.85}
          onLongPress={() => openReactionPicker(item.id)}
          delayLongPress={250}
        >
          <View
            style={[
              styles.bubble,
              isMe ? styles.bubbleMe : styles.bubbleThem,
            ]}
          >
            <Text
              style={[
                styles.msgText,
                isMe ? styles.msgTextMe : styles.msgTextThem,
              ]}
            >
              {item.text}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Reaction chip */}
        {item.reaction ? (
          <View
            style={[
              styles.reactionChip,
              isMe ? styles.reactionChipMe : styles.reactionChipThem,
            ]}
          >
            <Text style={{ fontSize: 14 }}>{item.reaction}</Text>
          </View>
        ) : null}

        {/* Status only under your last message */}
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
      {/* Header */}
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

      {/* Messages */}
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(i) => String(i.id)}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 10 }}
        onContentSizeChange={scrollToEnd}
      />

      {/* Input */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Mesaj yaz..."
          placeholderTextColor="#999"
        />
        <TouchableOpacity
          style={styles.sendBtn}
          onPress={sendMessage}
          activeOpacity={0.85}
        >
          <Text style={styles.sendText}>Gönder</Text>
        </TouchableOpacity>
      </View>

      {/* Reaction Modal */}
      <Modal
        transparent
        visible={reactionModalVisible}
        animationType="fade"
        onRequestClose={() => setReactionModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setReactionModalVisible(false)}
        >
          <Pressable style={styles.reactionPanel} onPress={() => {}}>
            <Text style={styles.reactionTitle}>React</Text>

            <View style={styles.reactionRow}>
              {REACTIONS.map((r) => (
                <TouchableOpacity
                  key={r}
                  style={styles.reactionBtn}
                  onPress={() => setReactionOnMessage(r)}
                >
                  <Text style={{ fontSize: 22 }}>{r}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity onPress={clearReaction} style={styles.clearBtn}>
              <Text style={styles.clearText}>Remove reaction</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
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

  reactionChip: {
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
    alignSelf: "flex-start",
  },
  reactionChipMe: {
    alignSelf: "flex-end",
    marginRight: 6,
  },
  reactionChipThem: {
    alignSelf: "flex-start",
    marginLeft: 6,
  },

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

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
    padding: 18,
  },
  reactionPanel: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
  },
  reactionTitle: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 10,
    textAlign: "center",
  },
  reactionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    paddingHorizontal: 6,
    paddingBottom: 10,
  },
  reactionBtn: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#f4f4f4",
    alignItems: "center",
    justifyContent: "center",
  },
  clearBtn: {
    marginTop: 6,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "#ffe8f0",
    alignItems: "center",
  },
  clearText: {
    color: "#ff2e63",
    fontWeight: "800",
  },
});
