import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.text}>Your profile settings will appear here.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0b0f1a" },
  content: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { color: "#fff", fontSize: 26, fontWeight: "800", marginBottom: 8 },
  text: { color: "#b8c0ce", fontSize: 14 },
});