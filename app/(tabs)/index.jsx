import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const BOOST_DURATION_MS = 30 * 60 * 1000;

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
        <View>
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

  const handleBoost = () => {
    startBoost();
    Alert.alert("Boost activated", "Your profile will be shown more for 30 minutes.");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Vena</Text>
            <Text style={styles.heading}>Find your meaningful match</Text>
          </View>

          <TouchableOpacity style={styles.headerIcon}>
            <Text style={styles.headerIconText}>♡</Text>
          </TouchableOpacity>
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

        <ImageBackground
          source={{
            uri: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
          }}
          style={styles.profileCard}
          imageStyle={styles.profileImage}
        >
          <View style={styles.cardOverlay} />

          <View style={styles.cardTopRow}>
            <View style={styles.onlineBadge}>
              <Text style={styles.onlineText}>● Online</Text>
            </View>

            <View style={styles.compatibilityBadge}>
              <Text style={styles.compatibilityText}>87% Match</Text>
            </View>
          </View>

          <View style={styles.cardBottom}>
            <Text style={styles.profileName}>Sophie, 26</Text>
            <Text style={styles.profileMeta}>London • 4 km away</Text>
            <Text style={styles.profileBio}>
              Looking for a meaningful connection, deep talks, and a calm, honest relationship.
            </Text>

            <View style={styles.tagsRow}>
              <View style={styles.tag}>
                <Text style={styles.tagText}>Long-term</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagText}>Secure</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagText}>Psych Match</Text>
              </View>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={[styles.actionButton, styles.secondaryAction]}>
            <Text style={styles.actionText}>Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionButton, styles.primaryAction]}>
            <Text style={styles.actionText}>Like</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionButton, styles.secondaryAction]}>
            <Text style={styles.actionText}>Message</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why this profile?</Text>

          <View style={styles.infoCard}>
            <Text style={styles.infoLine}>• Similar relationship goals</Text>
            <Text style={styles.infoLine}>• Strong emotional compatibility</Text>
            <Text style={styles.infoLine}>• Good communication potential</Text>
          </View>
        </View>
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
  headerIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "rgba(255,255,255,0.08)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerIconText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
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
  },
  profileImage: {
    borderRadius: 30,
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.24)",
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
    backgroundColor: "rgba(255,122,89,0.92)",
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
});