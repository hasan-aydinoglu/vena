import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const BOOST_DURATION_MS = 30 * 60 * 1000;

const CURRENT_USER = {
  attachment: "secure",
  intentLevel: "long-term",
  emotionalRegulation: 8,
};

const PROFILES = [
  {
    id: "1",
    name: "Sophie",
    age: 26,
    city: "London",
    distance: "4 km away",
    bio: "Looking for a meaningful connection, deep talks, and a calm, honest relationship.",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
    psychProfile: {
      attachment: "secure",
      intentLevel: "long-term",
      emotionalRegulation: 7,
    },
  },
  {
    id: "2",
    name: "Emma",
    age: 24,
    city: "Manchester",
    distance: "7 km away",
    bio: "I enjoy spontaneous plans, coffee dates, and emotionally mature conversations.",
    photo:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=900&q=80",
    psychProfile: {
      attachment: "anxious",
      intentLevel: "marriage",
      emotionalRegulation: 7,
    },
  },
  {
    id: "3",
    name: "Olivia",
    age: 27,
    city: "Birmingham",
    distance: "10 km away",
    bio: "Creative, warm, and serious about finding something real.",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
    psychProfile: {
      attachment: "avoidant",
      intentLevel: "exploring",
      emotionalRegulation: 6,
    },
  },
];

function getAttachmentScore(a, b) {
  if (!a || !b) return 40;

  const table = {
    secure: {
      secure: 95,
      anxious: 82,
      avoidant: 72,
    },
    anxious: {
      secure: 82,
      anxious: 68,
      avoidant: 45,
    },
    avoidant: {
      secure: 72,
      anxious: 45,
      avoidant: 60,
    },
  };

  return table[a][b];
}

function getIntentScore(a, b) {
  if (!a || !b) return 40;
  if (a === b) return 100;

  const pair = [a, b].sort().join("-");

  if (pair === "long-term-marriage") return 82;
  if (pair === "exploring-long-term") return 60;
  if (pair === "exploring-marriage") return 35;

  return 50;
}

function getEmotionalScore(a, b) {
  const diff = Math.abs(a - b);
  if (diff === 0) return 100;
  if (diff === 1) return 92;
  if (diff === 2) return 84;
  if (diff === 3) return 74;
  if (diff === 4) return 64;
  return 50;
}

function calculateCompatibility(profileA, profileB) {
  const attachmentScore = getAttachmentScore(
    profileA?.attachment,
    profileB?.attachment
  );
  const intentScore = getIntentScore(
    profileA?.intentLevel,
    profileB?.intentLevel
  );
  const emotionalScore = getEmotionalScore(
    profileA?.emotionalRegulation ?? 5,
    profileB?.emotionalRegulation ?? 5
  );

  const totalScore = Math.round(
    attachmentScore * 0.35 + intentScore * 0.4 + emotionalScore * 0.25
  );

  const reasons = [];

  if (intentScore >= 80) reasons.push("Similar relationship goals");
  if (attachmentScore >= 80) reasons.push("Strong emotional compatibility");
  if (emotionalScore >= 85) reasons.push("Balanced communication potential");

  if (reasons.length === 0) {
    reasons.push("Interesting potential");
    reasons.push("Different but complementary energy");
  }

  return {
    attachmentScore,
    intentScore,
    emotionalScore,
    totalScore,
    reasons,
  };
}

function useBoost() {
  const [boostEndsAt, setBoostEndsAt] = useState(null);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const isBoostActive = useMemo(() => {
    if (!boostEndsAt) return false;
    return boostEndsAt > now;
  }, [boostEndsAt, now]);

  const remainingMs = useMemo(() => {
    if (!boostEndsAt) return 0;
    return Math.max(boostEndsAt - now, 0);
  }, [boostEndsAt, now]);

  const remainingTime = useMemo(() => {
    const totalSeconds = Math.floor(remainingMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }, [remainingMs]);

  const startBoost = () => {
    setBoostEndsAt(Date.now() + BOOST_DURATION_MS);
  };

  return {
    isBoostActive,
    remainingTime,
    startBoost,
  };
}

function BoostCard({ isBoostActive, remainingTime, onPress }) {
  return (
    <View style={styles.boostCard}>
      <View style={styles.boostLeft}>
        <Text style={styles.boostEmoji}>🔥</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.boostTitle}>
            {isBoostActive ? "Boost is Active" : "Boost Your Profile"}
          </Text>
          <Text style={styles.boostSubtitle}>
            {isBoostActive
              ? `You are being shown to more people • ${remainingTime} left`
              : "Get more visibility for 30 minutes"}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.boostButton, isBoostActive && styles.boostButtonDisabled]}
        onPress={onPress}
        disabled={isBoostActive}
      >
        <Text style={styles.boostButtonText}>
          {isBoostActive ? "Active" : "Boost"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function FilterChip({ label, active, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.chip, active && styles.chipActive]}
      onPress={onPress}
    >
      <Text style={[styles.chipText, active && styles.chipTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  const { isBoostActive, remainingTime, startBoost } = useBoost();
  const [activeFilter, setActiveFilter] = useState("For You");
  const [profiles, setProfiles] = useState(PROFILES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedProfiles, setLikedProfiles] = useState([]);
  const [passedProfiles, setPassedProfiles] = useState([]);

  const currentProfile = profiles[currentIndex];

  const compatibility = useMemo(() => {
    if (!currentProfile) return null;
    return calculateCompatibility(CURRENT_USER, currentProfile.psychProfile);
  }, [currentProfile]);

  const handleBoost = () => {
    startBoost();
    Alert.alert(
      "Boost activated",
      "Your profile will be shown more for 30 minutes."
    );
  };

  const goNextProfile = () => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      Alert.alert("No more profiles", "You reached the end of the list.");
    }
  };

  const handleLike = () => {
    if (!currentProfile) return;
    setLikedProfiles((prev) => [...prev, currentProfile.id]);
    Alert.alert("Liked", `You liked ${currentProfile.name}`);
    goNextProfile();
  };

  const handleSkip = () => {
    if (!currentProfile) return;
    setPassedProfiles((prev) => [...prev, currentProfile.id]);
    goNextProfile();
  };

  const handleMessage = () => {
    if (!currentProfile) return;
    Alert.alert(
      "Message",
      `Open chat with ${currentProfile.name} here.`
    );
  };

  const filteredProfiles = useMemo(() => {
    if (activeFilter === "Nearby") {
      return PROFILES.filter((item) => item.distance.includes("km"));
    }

    if (activeFilter === "New") {
      return [...PROFILES].reverse();
    }

    return PROFILES;
  }, [activeFilter]);

  useEffect(() => {
    setProfiles(filteredProfiles);
    setCurrentIndex(0);
  }, [filteredProfiles]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Vena</Text>
            <Text style={styles.heading}>Find your meaningful match</Text>
          </View>

          <View style={styles.statsBadge}>
            <Text style={styles.statsText}>♥ {likedProfiles.length}</Text>
          </View>
        </View>

        <BoostCard
          isBoostActive={isBoostActive}
          remainingTime={remainingTime}
          onPress={handleBoost}
        />

        <View style={styles.filtersRow}>
          <FilterChip
            label="For You"
            active={activeFilter === "For You"}
            onPress={() => setActiveFilter("For You")}
          />
          <FilterChip
            label="Nearby"
            active={activeFilter === "Nearby"}
            onPress={() => setActiveFilter("Nearby")}
          />
          <FilterChip
            label="New"
            active={activeFilter === "New"}
            onPress={() => setActiveFilter("New")}
          />
        </View>

        {currentProfile ? (
          <>
            <View style={styles.profileCard}>
              <Image
                source={{ uri: currentProfile.photo }}
                style={styles.profileImage}
              />

              <View style={styles.cardOverlay} />

              <View style={styles.cardTopRow}>
                <View style={styles.onlineBadge}>
                  <Text style={styles.onlineText}>● Online</Text>
                </View>

                <View style={styles.compatibilityBadge}>
                  <Text style={styles.compatibilityText}>
                    {compatibility?.totalScore ?? 0}% Match
                  </Text>
                </View>
              </View>

              <View style={styles.cardBottom}>
                <Text style={styles.profileName}>
                  {currentProfile.name}, {currentProfile.age}
                </Text>

                <Text style={styles.profileMeta}>
                  {currentProfile.city} • {currentProfile.distance}
                </Text>

                <Text style={styles.profileBio}>{currentProfile.bio}</Text>

                <View style={styles.tagsRow}>
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>
                      {currentProfile.psychProfile.intentLevel}
                    </Text>
                  </View>
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>
                      {currentProfile.psychProfile.attachment}
                    </Text>
                  </View>
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>Psych Match</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.actionsRow}>
              <TouchableOpacity
                style={[styles.actionButton, styles.secondaryAction]}
                onPress={handleSkip}
              >
                <Text style={styles.actionText}>Skip</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.primaryAction]}
                onPress={handleLike}
              >
                <Text style={styles.actionText}>Like</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.secondaryAction]}
                onPress={handleMessage}
              >
                <Text style={styles.actionText}>Message</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Why this profile?</Text>

              <View style={styles.infoCard}>
                <Text style={styles.infoLine}>
                  • Attachment match: {compatibility?.attachmentScore ?? 0}%
                </Text>
                <Text style={styles.infoLine}>
                  • Relationship intent: {compatibility?.intentScore ?? 0}%
                </Text>
                <Text style={styles.infoLine}>
                  • Emotional balance: {compatibility?.emotionalScore ?? 0}%
                </Text>

                <View style={{ marginTop: 10 }}>
                  {compatibility?.reasons?.map((reason, index) => (
                    <Text key={index} style={styles.infoLine}>
                      • {reason}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
          </>
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No profile found</Text>
            <Text style={styles.emptyText}>
              Try another filter or add more users.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0f1a",
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 32,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  greeting: {
    color: "#ff7a59",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 4,
  },
  heading: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "800",
    maxWidth: 260,
    lineHeight: 34,
  },
  statsBadge: {
    minWidth: 50,
    height: 46,
    borderRadius: 23,
    backgroundColor: "rgba(255,255,255,0.08)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  statsText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },
  boostCard: {
    backgroundColor: "rgba(255,255,255,0.07)",
    borderRadius: 22,
    padding: 16,
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  boostLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  },
  boostEmoji: {
    fontSize: 26,
    marginRight: 12,
  },
  boostTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 4,
  },
  boostSubtitle: {
    color: "#c8d0df",
    fontSize: 13,
    lineHeight: 18,
    maxWidth: 210,
  },
  boostButton: {
    backgroundColor: "#ff7a59",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  boostButtonDisabled: {
    opacity: 0.7,
  },
  boostButtonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 13,
  },
  filtersRow: {
    flexDirection: "row",
    marginBottom: 18,
  },
  chip: {
    backgroundColor: "rgba(255,255,255,0.07)",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    marginRight: 10,
  },
  chipActive: {
    backgroundColor: "#ff7a59",
  },
  chipText: {
    color: "#cfd6e4",
    fontSize: 13,
    fontWeight: "700",
    textTransform: "capitalize",
  },
  chipTextActive: {
    color: "#fff",
  },
  profileCard: {
    height: 520,
    borderRadius: 30,
    overflow: "hidden",
    justifyContent: "space-between",
    marginBottom: 18,
    backgroundColor: "#111827",
  },
  profileImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.26)",
  },
  cardTopRow: {
    zIndex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  onlineBadge: {
    backgroundColor: "rgba(0,0,0,0.28)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  onlineText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  compatibilityBadge: {
    backgroundColor: "rgba(255,122,89,0.95)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  compatibilityText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "800",
  },
  cardBottom: {
    zIndex: 2,
    paddingHorizontal: 18,
    paddingBottom: 20,
  },
  profileName: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 4,
  },
  profileMeta: {
    color: "#e4e7ee",
    fontSize: 14,
    marginBottom: 10,
  },
  profileBio: {
    color: "#f4f6fb",
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 14,
    maxWidth: "92%",
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    backgroundColor: "rgba(255,255,255,0.16)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "capitalize",
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 22,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryAction: {
    backgroundColor: "rgba(255,255,255,0.07)",
    marginRight: 8,
  },
  primaryAction: {
    backgroundColor: "#ff7a59",
    marginHorizontal: 8,
  },
  actionText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "800",
  },
  section: {
    marginTop: 4,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 20,
    padding: 16,
  },
  infoLine: {
    color: "#d7ddea",
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 6,
  },
  emptyCard: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
  },
  emptyTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 8,
  },
  emptyText: {
    color: "#c8d0df",
    fontSize: 14,
  },
});