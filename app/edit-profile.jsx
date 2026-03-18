import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useProfile } from "../src/context/ProfileContext";

function OptionChip({ label, active, onPress }) {
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

export default function EditProfileScreen() {
  const router = useRouter();
  const { user, updateUser } = useProfile();

  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(String(user.age));
  const [city, setCity] = useState(user.city);
  const [bio, setBio] = useState(user.bio);
  const [attachment, setAttachment] = useState(user.attachment);
  const [intentLevel, setIntentLevel] = useState(user.intentLevel);
  const [emotionalRegulation, setEmotionalRegulation] = useState(
    String(user.emotionalRegulation)
  );

  const handleSave = () => {
    const parsedAge = Number(age);
    const parsedEmotion = Number(emotionalRegulation);

    if (!name.trim() || !city.trim() || !bio.trim()) {
      Alert.alert("Missing fields", "Please fill in all required fields.");
      return;
    }

    if (!parsedAge || parsedAge < 18) {
      Alert.alert("Invalid age", "Please enter a valid age.");
      return;
    }

    if (!parsedEmotion || parsedEmotion < 1 || parsedEmotion > 10) {
      Alert.alert(
        "Invalid score",
        "Emotional regulation must be between 1 and 10."
      );
      return;
    }

    updateUser({
      name: name.trim(),
      age: parsedAge,
      city: city.trim(),
      bio: bio.trim(),
      attachment,
      intentLevel,
      emotionalRegulation: parsedEmotion,
    });

    Alert.alert("Saved", "Your profile changes have been saved.");
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Edit Profile</Text>

          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Info</Text>

          <View style={styles.inputCard}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Your name"
              placeholderTextColor="#7f8a9d"
              style={styles.input}
            />

            <Text style={styles.label}>Age</Text>
            <TextInput
              value={age}
              onChangeText={setAge}
              placeholder="Your age"
              placeholderTextColor="#7f8a9d"
              keyboardType="numeric"
              style={styles.input}
            />

            <Text style={styles.label}>City</Text>
            <TextInput
              value={city}
              onChangeText={setCity}
              placeholder="Your city"
              placeholderTextColor="#7f8a9d"
              style={styles.input}
            />

            <Text style={styles.label}>Bio</Text>
            <TextInput
              value={bio}
              onChangeText={setBio}
              placeholder="Write something about yourself"
              placeholderTextColor="#7f8a9d"
              style={[styles.input, styles.bioInput]}
              multiline
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Psychology Profile</Text>

          <View style={styles.inputCard}>
            <Text style={styles.label}>Attachment Style</Text>
            <View style={styles.chipsWrap}>
              <OptionChip
                label="secure"
                active={attachment === "secure"}
                onPress={() => setAttachment("secure")}
              />
              <OptionChip
                label="anxious"
                active={attachment === "anxious"}
                onPress={() => setAttachment("anxious")}
              />
              <OptionChip
                label="avoidant"
                active={attachment === "avoidant"}
                onPress={() => setAttachment("avoidant")}
              />
            </View>

            <Text style={styles.label}>Relationship Intent</Text>
            <View style={styles.chipsWrap}>
              <OptionChip
                label="marriage"
                active={intentLevel === "marriage"}
                onPress={() => setIntentLevel("marriage")}
              />
              <OptionChip
                label="long-term"
                active={intentLevel === "long-term"}
                onPress={() => setIntentLevel("long-term")}
              />
              <OptionChip
                label="exploring"
                active={intentLevel === "exploring"}
                onPress={() => setIntentLevel("exploring")}
              />
            </View>

            <Text style={styles.label}>Emotional Regulation (1-10)</Text>
            <TextInput
              value={emotionalRegulation}
              onChangeText={setEmotionalRegulation}
              placeholder="1-10"
              placeholderTextColor="#7f8a9d"
              keyboardType="numeric"
              style={styles.input}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
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
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 22,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  backText: {
    color: "#fff",
    fontSize: 28,
    lineHeight: 28,
    fontWeight: "700",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "800",
  },
  headerSpacer: {
    width: 42,
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
  inputCard: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 22,
    padding: 16,
  },
  label: {
    color: "#b8c2d3",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 8,
    marginTop: 8,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 14,
    color: "#fff",
    fontSize: 15,
    marginBottom: 8,
  },
  bioInput: {
    minHeight: 110,
    textAlignVertical: "top",
  },
  chipsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  chip: {
    backgroundColor: "rgba(255,255,255,0.08)",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    marginRight: 10,
    marginBottom: 10,
  },
  chipActive: {
    backgroundColor: "#ff7a59",
  },
  chipText: {
    color: "#d8deea",
    fontSize: 13,
    fontWeight: "700",
    textTransform: "capitalize",
  },
  chipTextActive: {
    color: "#fff",
  },
  saveButton: {
    backgroundColor: "#ff7a59",
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "800",
  },
});