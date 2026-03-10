import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  isBoostActive: boolean;
  remainingTime: string;
  onPress: () => void;
};

export default function BoostCard({
  isBoostActive,
  remainingTime,
  onPress,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.icon}>🔥</Text>

      <View style={styles.content}>
        <Text style={styles.title}>
          {isBoostActive ? "Boost is Active" : "Boost Your Profile"}
        </Text>

        <Text style={styles.subtitle}>
          {isBoostActive
            ? `You are being shown to more people • ${remainingTime} left`
            : "Be seen by more people for 30 minutes"}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.button, isBoostActive && styles.buttonActive]}
        onPress={onPress}
        disabled={isBoostActive}
      >
        <Text style={styles.buttonText}>
          {isBoostActive ? "Active" : "Boost"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  icon: {
    fontSize: 26,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 4,
  },
  subtitle: {
    color: "#cfcfcf",
    fontSize: 13,
    lineHeight: 18,
  },
  button: {
    backgroundColor: "#ff6b3d",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
  },
  buttonActive: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 13,
  },
});