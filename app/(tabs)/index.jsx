import React from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import BoostCard from "../../components/BoostCard";
import { useBoost } from "../../src/hooks/useBoost";

export default function HomeScreen() {
  const { isBoostActive, remainingTime, startBoost } = useBoost();

  const handleBoost = () => {
    startBoost();
    Alert.alert("Boost activated", "Your profile will be shown more for 30 minutes.");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Discover</Text>

        <BoostCard
          isBoostActive={isBoostActive}
          remainingTime={remainingTime}
          onPress={handleBoost}
        />

        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>User cards area</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f1115",
  },
  content: {
    padding: 16,
  },
  heading: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 18,
  },
  placeholder: {
    height: 420,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.05)",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: {
    color: "#aaa",
    fontSize: 16,
  },
});