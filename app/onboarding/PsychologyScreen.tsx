import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { usePsychProfile, type PsychProfile } from "../../src/state/PsychProfileContext";

export default function PsychologyScreen() {
  const router = useRouter();
  const { setPsychProfile } = usePsychProfile();

  const [attachment, setAttachment] = useState<"secure" | "anxious" | "avoidant" | null>(null);
  const [intentLevel, setIntentLevel] = useState<"marriage" | "long-term" | "exploring" | null>(null);
  const [emotionalRegulation, setEmotionalRegulation] = useState<number>(5);

  const canContinue = useMemo(() => !!attachment && !!intentLevel, [attachment, intentLevel]);

  const handleContinue = () => {
    if (!attachment || !intentLevel) {
      Alert.alert("Complete setup", "Please select attachment style and intent level.");
      return;
    }

    const profileData: PsychProfile = {
      attachment,
      intentLevel,
      emotionalRegulation,
    };

    setPsychProfile(profileData);
    console.log("User Psychological Profile:", profileData);

    router.replace("/(tabs)"); // Home (Swipe)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relationship Intelligence Setup</Text>

      <Text style={styles.section}>Attachment Style</Text>
      <View style={styles.row}>
        <Option label="Secure" onPress={() => setAttachment("secure")} active={attachment === "secure"} />
        <Option label="Anxious" onPress={() => setAttachment("anxious")} active={attachment === "anxious"} />
        <Option label="Avoidant" onPress={() => setAttachment("avoidant")} active={attachment === "avoidant"} />
      </View>

      <Text style={styles.section}>Intent Level</Text>
      <View style={styles.row}>
        <Option label="Marriage" onPress={() => setIntentLevel("marriage")} active={intentLevel === "marriage"} />
        <Option label="Long-term" onPress={() => setIntentLevel("long-term")} active={intentLevel === "long-term"} />
        <Option label="Exploring" onPress={() => setIntentLevel("exploring")} active={intentLevel === "exploring"} />
      </View>

      <Text style={styles.section}>Emotional Regulation (1-10)</Text>
      <View style={styles.row}>
        {[...Array(10)].map((_, i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.scoreButton,
              emotionalRegulation === i + 1 && { borderWidth: 2, borderColor: "#6C5CE7" },
            ]}
            onPress={() => setEmotionalRegulation(i + 1)}
          >
            <Text style={styles.scoreText}>{i + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.continueBtn, !canContinue && { opacity: 0.5 }]}
        onPress={handleContinue}
        disabled={!canContinue}
      >
        <Text style={{ color: "white" }}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

function Option({
  label,
  onPress,
  active,
}: {
  label: string;
  onPress: () => void;
  active?: boolean;
}) {
  return (
    <TouchableOpacity
      style={[styles.option, active && { borderColor: "#6C5CE7", borderWidth: 1 }]}
      onPress={onPress}
    >
      <Text style={{ color: "white" }}>{label}</Text>
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