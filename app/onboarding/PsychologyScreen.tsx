import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PsychologyScreen() {
  const router = useRouter();

  const [attachment, setAttachment] = useState<string | null>(null);
  const [intentLevel, setIntentLevel] = useState<string | null>(null);
  const [emotionalRegulation, setEmotionalRegulation] = useState<number>(5);

  const handleContinue = () => {
    const profileData = {
      attachment,
      intentLevel,
      emotionalRegulation,
    };

    console.log("User Psychological Profile:", profileData);

    router.replace("/(tabs)");

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relationship Intelligence Setup</Text>

      <Text style={styles.section}>Attachment Style</Text>
      <View style={styles.row}>
        <Option label="Secure" onPress={() => setAttachment("secure")} />
        <Option label="Anxious" onPress={() => setAttachment("anxious")} />
        <Option label="Avoidant" onPress={() => setAttachment("avoidant")} />
      </View>

      <Text style={styles.section}>Intent Level</Text>
      <View style={styles.row}>
        <Option label="Marriage" onPress={() => setIntentLevel("marriage")} />
        <Option label="Long-term" onPress={() => setIntentLevel("long-term")} />
        <Option label="Exploring" onPress={() => setIntentLevel("exploring")} />
      </View>

      <Text style={styles.section}>Emotional Regulation (1-10)</Text>
      <View style={styles.row}>
        {[...Array(10)].map((_, i) => (
          <TouchableOpacity
            key={i}
            style={styles.scoreButton}
            onPress={() => setEmotionalRegulation(i + 1)}
          >
            <Text style={styles.scoreText}>{i + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
        <Text style={{ color: "white" }}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

function Option({ label, onPress }: any) {
  return (
    <TouchableOpacity style={styles.option} onPress={onPress}>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#111" },
  title: { color: "white", fontSize: 22, marginBottom: 20 },
  section: { color: "#aaa", marginTop: 15 },
  row: { flexDirection: "row", flexWrap: "wrap", marginTop: 10 },
  option: {
    backgroundColor: "#222",
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  scoreButton: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 8,
    margin: 4,
  },
  scoreText: { color: "white" },
  continueBtn: {
    marginTop: 30,
    backgroundColor: "#6C5CE7",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
});
