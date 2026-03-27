import { useRouter } from "expo-router";
import React from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

function FeatureRow({ text }) {
  return (
    <View style={styles.featureRow}>
      <Text style={styles.featureIcon}>✓</Text>
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

function PlanCard({
  title,
  price,
  subtitle,
  features,
  highlighted = false,
  buttonText,
}) {
  return (
    <View style={[styles.planCard, highlighted && styles.planCardHighlighted]}>
      {highlighted ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>MOST POPULAR</Text>
        </View>
      ) : null}

      <Text style={[styles.planTitle, highlighted && styles.planTitleHighlighted]}>
        {title}
      </Text>

      <Text style={[styles.planPrice, highlighted && styles.planPriceHighlighted]}>
        {price}
      </Text>

      <Text
        style={[
          styles.planSubtitle,
          highlighted && styles.planSubtitleHighlighted,
        ]}
      >
        {subtitle}
      </Text>

      <View style={styles.featuresBox}>
        {features.map((item, index) => (
          <FeatureRow key={index} text={item} />
        ))}
      </View>

      <TouchableOpacity
        style={[
          styles.planButton,
          highlighted && styles.planButtonHighlighted,
        ]}
      >
        <Text
          style={[
            styles.planButtonText,
            highlighted && styles.planButtonTextHighlighted,
          ]}
        >
          {buttonText}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default function SubscriptionScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Vena Premium</Text>

          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>Upgrade Your Dating Experience</Text>
          <Text style={styles.heroSubtitle}>
            Get more visibility, unlock premium tools, and match smarter with
            advanced features.
          </Text>
        </View>

        <PlanCard
          title="Free"
          price="£0"
          subtitle="Basic access for everyday use"
          features={[
            "Limited daily swipes",
            "Basic profile visibility",
            "Standard matching system",
            "Limited boost access",
          ]}
          buttonText="Current Plan"
        />

        <PlanCard
          title="Premium"
          price="£9.99 / month"
          subtitle="Best for active users who want more matches"
          features={[
            "Unlimited swipes",
            "See who liked you",
            "1 free boost every week",
            "Priority profile visibility",
            "Advanced matching insights",
            "Incognito browsing mode",
          ]}
          highlighted
          buttonText="Upgrade Now"
        />

        <PlanCard
          title="Premium Plus"
          price="£19.99 / month"
          subtitle="Maximum visibility and top-tier experience"
          features={[
            "Everything in Premium",
            "Daily boost access",
            "Profile spotlight priority",
            "Read receipt controls",
            "Advanced filters",
            "Exclusive profile badge",
          ]}
          buttonText="Go Premium Plus"
        />
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
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
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
  headerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "800",
  },
  headerSpacer: {
    width: 42,
  },
  heroCard: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 24,
    padding: 22,
    marginBottom: 18,
  },
  heroTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 10,
  },
  heroSubtitle: {
    color: "#c6cfdd",
    fontSize: 14,
    lineHeight: 22,
  },
  planCard: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 24,
    padding: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  planCardHighlighted: {
    backgroundColor: "rgba(255,122,89,0.14)",
    borderColor: "rgba(255,122,89,0.5)",
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#ff7a59",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 12,
  },
  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.6,
  },
  planTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 8,
  },
  planTitleHighlighted: {
    color: "#fff",
  },
  planPrice: {
    color: "#ff7a59",
    fontSize: 28,
    fontWeight: "900",
    marginBottom: 6,
  },
  planPriceHighlighted: {
    color: "#fff",
  },
  planSubtitle: {
    color: "#c6cfdd",
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 16,
  },
  planSubtitleHighlighted: {
    color: "#f6ddd7",
  },
  featuresBox: {
    marginBottom: 18,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  featureIcon: {
    color: "#ff7a59",
    fontSize: 16,
    fontWeight: "800",
    marginRight: 10,
  },
  featureText: {
    color: "#fff",
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  planButton: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
  },
  planButtonHighlighted: {
    backgroundColor: "#ff7a59",
  },
  planButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "800",
  },
  planButtonTextHighlighted: {
    color: "#fff",
  },
});