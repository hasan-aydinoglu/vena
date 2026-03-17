import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const USER = {
  name: "Hasan",
  age: 27,
  city: "Istanbul",
  bio: "Founder-minded, ambitious, and looking for a real connection built on trust, communication, and emotional depth.",
  photo:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
  attachment: "secure",
  intentLevel: "long-term",
  emotionalRegulation: 8,
  interests: ["Entrepreneurship", "Travel", "Deep Talks", "Coffee", "Tech"],
  boostActive: false,
};

function InfoPill({ label }) {
  return (
    <View style={styles.pill}>
      <Text style={styles.pillText}>{label}</Text>
    </View>
  );
}

function StatCard({ title, value, subtitle }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={styles.statValue}>{value}</Text>
      {subtitle ? <Text style={styles.statSubtitle}>{subtitle}</Text> : null}
    </View>
  );
}

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Profile</Text>

          <TouchableOpacity style={styles.settingsButton}>
            <Text style={styles.settingsText}>⚙</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.profileCard}>
          <Image source={{ uri: USER.photo }} style={styles.avatar} />

          <Text style={styles.name}>
            {USER.name}, {USER.age}
          </Text>

          <Text style={styles.location}>{USER.city}</Text>

          <Text style={styles.bio}>{USER.bio}</Text>

          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => router.push("/edit-profile")}
            >
              <Text style={styles.primaryButtonText}>Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() =>
                Alert.alert("Preview", "Profile preview screen coming soon.")
              }
            >
              <Text style={styles.secondaryButtonText}>Preview</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Psychology Summary</Text>

          <View style={styles.statsRow}>
            <StatCard
              title="Attachment"
              value={USER.attachment}
              subtitle="Emotional style"
            />
            <StatCard
              title="Intent"
              value={USER.intentLevel}
              subtitle="Relationship goal"
            />
          </View>

          <View style={styles.fullCard}>
            <Text style={styles.fullCardTitle}>Emotional Regulation</Text>
            <Text style={styles.fullCardValue}>
              {USER.emotionalRegulation}/10
            </Text>
            <Text style={styles.fullCardSubtitle}>
              Calm, balanced, and emotionally aware communication style.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Boost Status</Text>

          <View style={styles.boostCard}>
            <View>
              <Text style={styles.boostTitle}>Profile Boost</Text>
              <Text style={styles.boostSubtitle}>
                {USER.boostActive
                  ? "Your profile is currently boosted."
                  : "Activate boost to get more visibility."}
              </Text>
            </View>

            <TouchableOpacity style={styles.boostButton}>
              <Text style={styles.boostButtonText}>
                {USER.boostActive ? "Active" : "Boost"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interests</Text>

          <View style={styles.pillsWrap}>
            {USER.interests.map((item, index) => (
              <InfoPill key={index} label={item} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>

          <View style={styles.menuCard}>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Privacy Settings</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Notifications</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Subscription</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.menuItem, { borderBottomWidth: 0 }]}
            >
              <Text style={[styles.menuText, styles.logoutText]}>Log Out</Text>
              <Text style={[styles.menuArrow, styles.logoutText]}>›</Text>
            </TouchableOpacity>
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
    paddingBottom: 120,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "800",
  },
  settingsButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  settingsText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  profileCard: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 28,
    padding: 22,
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 118,
    height: 118,
    borderRadius: 59,
    marginBottom: 14,
  },
  name: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 4,
  },
  location: {
    color: "#b6c0d1",
    fontSize: 14,
    marginBottom: 12,
  },
  bio: {
    color: "#e5eaf3",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 18,
  },
  actionRow: {
    flexDirection: "row",
    width: "100%",
  },
  primaryButton: {
    flex: 1,
    backgroundColor: "#ff7a59",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    marginRight: 8,
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 14,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    marginLeft: 8,
  },
  secondaryButtonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 14,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  statCard: {
    width: "48.5%",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 20,
    padding: 16,
  },
  statTitle: {
    color: "#9eabc0",
    fontSize: 13,
    marginBottom: 10,
  },
  statValue: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    textTransform: "capitalize",
    marginBottom: 6,
  },
  statSubtitle: {
    color: "#c6cfdd",
    fontSize: 12,
    lineHeight: 18,
  },
  fullCard: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 20,
    padding: 18,
  },
  fullCardTitle: {
    color: "#9eabc0",
    fontSize: 13,
    marginBottom: 8,
  },
  fullCardValue: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 8,
  },
  fullCardSubtitle: {
    color: "#c6cfdd",
    fontSize: 13,
    lineHeight: 20,
  },
  boostCard: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  boostTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 4,
  },
  boostSubtitle: {
    color: "#c6cfdd",
    fontSize: 13,
    lineHeight: 18,
    maxWidth: 220,
  },
  boostButton: {
    backgroundColor: "#ff7a59",
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 14,
  },
  boostButtonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "800",
  },
  pillsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  pill: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  pillText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },
  menuCard: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 20,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },
  menuText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  menuArrow: {
    color: "#9ca7b8",
    fontSize: 22,
    fontWeight: "700",
  },
  logoutText: {
    color: "#ff8c73",
  },
});