// src/mock/chatStore.js

// Matches sayfanın mock datası + sohbet meta bilgileri burada dursun
const matches = [
    {
      id: 1,
      name: "Sarah",
      age: 24,
      location: "London, UK",
      photo: "https://randomuser.me/api/portraits/women/40.jpg",
      relationshipType: "long_term",
      lastMessage: "Hey, how are you? 😊",
      lastMessageAt: Date.now() - 1000 * 60 * 12,
      unread: 2,
    },
    {
      id: 2,
      name: "Emma",
      age: 28,
      location: "Manchester, UK",
      photo: "https://randomuser.me/api/portraits/women/12.jpg",
      relationshipType: "short_term_fun",
      lastMessage: "Nice to meet you!",
      lastMessageAt: Date.now() - 1000 * 60 * 55,
      unread: 0,
    },
    {
      id: 3,
      name: "Anna",
      age: 22,
      location: "Paris, France",
      photo: "https://randomuser.me/api/portraits/women/55.jpg",
      relationshipType: "life_partner",
      lastMessage: "Bonjour 🇫🇷",
      lastMessageAt: Date.now() - 1000 * 60 * 5,
      unread: 1,
    },
  ];
  
  const conversations = {
    "1": [
      { id: "m1", sender: "other", text: "Hey, how are you? 😊" },
      { id: "m2", sender: "me", text: "I’m good! Working on Vena." },
    ],
    "2": [{ id: "m3", sender: "other", text: "Hi! Nice to meet you." }],
    "3": [{ id: "m4", sender: "other", text: "Bonjour 🇫🇷" }],
  };
  
  const listeners = new Set();
  
  function emit() {
    listeners.forEach((fn) => fn());
  }
  
  export function subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  }
  
  export function getMatches() {
    // lastMessageAt'e göre yeni -> eski sırala
    return [...matches].sort((a, b) => (b.lastMessageAt || 0) - (a.lastMessageAt || 0));
  }
  
  export function getConversation(conversationId) {
    return conversations[String(conversationId)] || [];
  }
  
  export function addMessage(conversationId, message) {
    const cid = String(conversationId);
    if (!conversations[cid]) conversations[cid] = [];
    conversations[cid].push(message);
  
    // match meta güncelle
    const m = matches.find((x) => String(x.id) === cid);
    if (m) {
      m.lastMessage = message.text;
      m.lastMessageAt = Date.now();
  
      // karşı taraftan mesaj geldiyse ve chat açık değilse unread artırmak gerekir.
      // Mock’ta basit kural: "other" mesajı gelince unread++ (chat ekranı bunu istenirse bypass edebilir)
      if (message.sender === "other") {
        m.unread = (m.unread || 0) + 1;
      }
    }
  
    emit();
  }
  
  export function markAsRead(conversationId) {
    const cid = String(conversationId);
    const m = matches.find((x) => String(x.id) === cid);
    if (m) {
      m.unread = 0;
      emit();
    }
  }
  
  export function setOtherMessageWithoutUnread(conversationId, message) {
    // Chat açıkken gelen "other" mesajını unread saymadan eklemek için
    const cid = String(conversationId);
    if (!conversations[cid]) conversations[cid] = [];
    conversations[cid].push(message);
  
    const m = matches.find((x) => String(x.id) === cid);
    if (m) {
      m.lastMessage = message.text;
      m.lastMessageAt = Date.now();
    }
  
    emit();
  }
  