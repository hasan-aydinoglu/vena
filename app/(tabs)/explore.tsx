import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  PanResponder,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { getRelationshipLabel } from "../../src/constants/relationship";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;
const SWIPE_OUT_DURATION = 200;

type Profile = {
  id: number;
  name: string;
  age: number;
  location: string;
  photo: string;
  relationshipType?: string;
};

const PROFILES: Profile[] = [
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

export default function ExploreScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [message, setMessage] = useState("");
  const position = useRef(new Animated.ValueXY()).current;

  const currentProfile = PROFILES[currentIndex];

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: position.x, dy: position.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          forceSwipe("right");
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          forceSwipe("left");
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
    outputRange: ["-12deg", "0deg", "12deg"],
  });

  const cardStyle = {
    ...styles.card,
    transform: [...position.getTranslateTransform(), { rotate }],
  };

  function forceSwipe(direction: "right" | "left") {
    Animated.timing(position, {
      toValue: {
        x: direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH,
        y: 0,
      },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
    }).start(() => onSwipeComplete());
  }

  function onSwipeComplete() {
    position.setValue({ x: 0, y: 0 });
    setMessage("");
    if (currentIndex < PROFILES.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  }

  function resetPosition() {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  }

  const handleSendMessage = () => {
    if (!currentProfile || !message.trim()) return;
    
    console.log(`Message to ${currentProfile.name}: ${message}`);
    setMessage("");
  };

  if (!currentProfile) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No more profiles</Text>
      </View>
    );
  }

  const relationshipLabel = getRelationshipLabel(
    currentProfile.relationshipType
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Explore</Text>

       
        <View style={styles.cardContainer}>
          <Animated.View style={cardStyle} {...panResponder.panHandlers}>
            <Image
              source={{ uri: currentProfile.photo }}
              style={styles.photo}
            />

            <View style={styles.infoContainer}>
              <Text style={styles.name}>
                {currentProfile.name}, {currentProfile.age}
              </Text>
              <Text style={styles.location}>{currentProfile.location}</Text>

              {relationshipLabel && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    Looking for {relationshipLabel}
                  </Text>
                </View>
              )}
            </View>
          </Animated.View>
        </View>

        
        <View style={styles.messageContainer}>
          <Text style={styles.messageLabel}>
            Message {currentProfile.name}
          </Text>

          <View style={styles.messageBox}>
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Say something nice..."
              multiline
              style={styles.messageInput}
            />
          </View>

          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={[styles.actionButton, styles.dislikeButton]}
              onPress={() => forceSwipe("left")}
            >
              <Text style={styles.dislikeText}>✕</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.sendButton, !message.trim() && { opacity: 0.6 }]}
              onPress={handleSendMessage}
              disabled={!message.trim()}
            >
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.likeButton]}
              onPress={() => forceSwipe("right")}
            >
              <Text style={styles.likeText}>♥</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 16,
  },
  cardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: SCREEN_WIDTH * 0.9,
    borderRadius: 24,
    backgroundColor: "#fff",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    overflow: "hidden",
  },
  photo: {
    width: "100%",
    height: 340,
  },
  infoContainer: {
    padding: 14,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
  },
  location: {
    marginTop: 4,
    color: "#666",
  },
  badge: {
    marginTop: 10,
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
    backgroundColor: "#ffe8f0",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#ff2e63",
  },
  messageContainer: {
    paddingBottom: 20,
  },
  messageLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  messageBox: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#fafafa",
    minHeight: 70,
  },
  messageInput: {
    fontSize: 14,
    textAlignVertical: "top",
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
  },
  actionButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  dislikeButton: {
    borderWidth: 2,
    borderColor: "#ff4b6a",
  },
  likeButton: {
    borderWidth: 2,
    borderColor: "#00c48c",
  },
  dislikeText: {
    fontSize: 22,
    color: "#ff4b6a",
    fontWeight: "700",
  },
  likeText: {
    fontSize: 22,
    color: "#00c48c",
    fontWeight: "700",
  },
  sendButton: {
    flex: 1,
    marginHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 999,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#777",
  },
});
