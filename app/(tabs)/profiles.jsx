import * as ImagePicker from "expo-image-picker";
import { useMemo, useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useProfile } from "../../src/store/profile.js";

// Kullanıcıya gösterilecek seçenekler
const LOOKING_FOR_OPTIONS = [
  "Long-term relationship",
  "Short-term fun",
  "Open to see",
  "Friends only",
  "Coffee & vibes",
];

export default function ProfileScreen() {
  const { profile, updateProfile } = useProfile();
  const [open, setOpen] = useState(false);

  // local drafts for editing
  const [name, setName] = useState(profile.name);
  const [age, setAge] = useState(String(profile.age));
  const [location, setLocation] = useState(profile.location);
  const [bio, setBio] = useState(profile.bio);
  const [interests, setInterests] = useState(profile.interests.join(", "));
  const [photo, setPhoto] = useState(profile.photo);
  const [lookingFor, setLookingFor] = useState(
    profile.lookingFor || "Long-term relationship"
  );

  const initials = useMemo(() => {
    const n = (name || "User").trim().split(" ");
    const a = (n[0]?.[0] || "").toUpperCase();
    const b = (n[1]?.[0] || "").toUpperCase();
    return (a + b || "U").slice(0, 2);
  }, [name]);

  const openEditor = () => {
    // sync current profile -> drafts
    setName(profile.name);
    setAge(String(profile.age));
    setLocation(profile.location);
    setBio(profile.bio);
    setInterests(profile.interests.join(", "));
    setPhoto(profile.photo);
    setLookingFor(profile.lookingFor || "Long-term relationship");
    setOpen(true);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") return;
    const res = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.9,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1],
    });
    if (!res.canceled && res.assets?.[0]?.uri) {
      setPhoto(res.assets[0].uri);
    }
  };

  const onCancel = () => setOpen(false);

  const onSave = () => {
    const parsedAge = Number(age) || profile.age;
    const parsedInterests = interests
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    updateProfile({
      name,
      age: parsedAge,
      location,
      bio,
      interests: parsedInterests,
      photo,
      lookingFor, // ⭐ YENİ FIELD KAYIT
    });
    setOpen(false);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
    >
      {/* HEADER — tap to edit */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "700" }}>My Profile</Text>
        <TouchableOpacity
          onPress={openEditor}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 14,
            borderRadius: 10,
            backgroundColor: "black",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "600" }}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Avatar + Name (PRESSABLE AREA like Hinge) */}
      <Pressable
        onPress={openEditor}
        style={{ alignItems: "center", marginBottom: 18 }}
      >
        <View style={{ position: "relative" }}>
          {profile.photo ? (
            <Image
              source={{ uri: profile.photo }}
              style={{
                width: 120,
                height: 120,
                borderRadius: 60,
                borderWidth: 3,
                borderColor: "#ec4899", // pembe halka
              }}
            />
          ) : (
            <View
              style={{
                width: 120,
                height: 120,
                borderRadius: 60,
                backgroundColor: "#111",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{ color: "#fff", fontSize: 36, fontWeight: "700" }}
              >
                {initials}
              </Text>
            </View>
          )}
          {/* small pencil badge */}
          <View
            style={{
              position: "absolute",
              right: -2,
              bottom: -2,
              width: 28,
              height: 28,
              borderRadius: 14,
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "#ddd",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 14 }}>✏️</Text>
          </View>
        </View>

        <Text style={{ fontSize: 22, fontWeight: "700", marginTop: 12 }}>
          {profile.name}
        </Text>
      </Pressable>

      {/* Basic info (read-only) */}
      <View style={{ gap: 8, marginBottom: 20 }}>
        <Row label="Age" value={String(profile.age)} />
        <Row label="Location" value={profile.location} />
      </View>

      {/* ⭐ LOOKING FOR — PROFİLDE GÖRÜNEN BADGE */}
      <View style={{ marginBottom: 18 }}>
        <Text style={{ fontWeight: "700", marginBottom: 8 }}>Looking for</Text>
        <View
          style={{
            alignSelf: "flex-start",
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 999,
            backgroundColor: "#fce7f3",
          }}
        >
          <Text style={{ color: "#be185d", fontWeight: "600" }}>
            {profile.lookingFor || "Not specified"}
          </Text>
        </View>
      </View>

      {/* Bio */}
      <View style={{ marginBottom: 18 }}>
        <Text style={{ fontWeight: "700", marginBottom: 8 }}>About me</Text>
        <Text style={{ lineHeight: 20, opacity: 0.9 }}>{profile.bio}</Text>
      </View>

      {/* Interests */}
      <Text style={{ fontWeight: "700", marginBottom: 8 }}>Interests</Text>
      <View
        style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 40 }}
      >
        {profile.interests.map((tag) => (
          <View
            key={tag}
            style={{
              paddingVertical: 6,
              paddingHorizontal: 12,
              backgroundColor: "#f1f1f1",
              borderRadius: 999,
            }}
          >
            <Text>{tag}</Text>
          </View>
        ))}
      </View>

      {/* EDIT MODAL */}
      <Modal
        visible={open}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={onCancel}
      >
        <ScrollView
          style={{ flex: 1, backgroundColor: "#fff" }}
          contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        >
          <Text
            style={{ fontSize: 22, fontWeight: "700", marginBottom: 16 }}
          >
            Edit Profile
          </Text>

          {/* Photo */}
          <Text style={{ fontWeight: "600", marginBottom: 8 }}>Photo</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              marginBottom: 14,
            }}
          >
            {photo ? (
              <Image
                source={{ uri: photo }}
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: "#eee",
                }}
              />
            ) : (
              <View
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: 16,
                  backgroundColor: "#f3f3f3",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text>no photo</Text>
              </View>
            )}
            <View style={{ flexDirection: "row", gap: 8 }}>
              <TouchableOpacity
                onPress={pickImage}
                style={{
                  backgroundColor: "black",
                  paddingVertical: 10,
                  paddingHorizontal: 14,
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "600" }}>
                  Add photo
                </Text>
              </TouchableOpacity>
              {photo ? (
                <TouchableOpacity
                  onPress={() => setPhoto("")}
                  style={{
                    backgroundColor: "#eee",
                    paddingVertical: 10,
                    paddingHorizontal: 14,
                    borderRadius: 10,
                  }}
                >
                  <Text>Remove</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>

          {/* Name */}
          <Label>Name</Label>
          <Input value={name} onChangeText={setName} placeholder="Your name" />

          {/* Age */}
          <Label>Age</Label>
          <Input
            value={age}
            onChangeText={setAge}
            keyboardType="number-pad"
            placeholder="Age"
          />

          {/* Location */}
          <Label>Location</Label>
          <Input
            value={location}
            onChangeText={setLocation}
            placeholder="City, Country"
          />

          {/* ⭐ LOOKING FOR — EDIT ALANI */}
          <Label>Looking for</Label>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 8,
              marginBottom: 4,
            }}
          >
            {LOOKING_FOR_OPTIONS.map((option) => {
              const active = lookingFor === option;
              return (
                <TouchableOpacity
                  key={option}
                  onPress={() => setLookingFor(option)}
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 14,
                    borderRadius: 999,
                    borderWidth: 1,
                    borderColor: active ? "#ec4899" : "#e5e7eb",
                    backgroundColor: active ? "#fce7f3" : "#fff",
                  }}
                >
                  <Text
                    style={{
                      color: active ? "#be185d" : "#111827",
                      fontWeight: active ? "700" : "500",
                    }}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Bio */}
          <Label>About me</Label>
          <Input
            value={bio}
            onChangeText={setBio}
            placeholder="Tell something about yourself"
            multiline
            style={{ minHeight: 90, textAlignVertical: "top" }}
          />

          {/* Interests (comma-separated) */}
          <Label>Interests (comma separated)</Label>
          <Input
            value={interests}
            onChangeText={setInterests}
            placeholder="Movies, Running, Photography"
          />

          {/* Actions */}
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              justifyContent: "flex-end",
              marginTop: 20,
            }}
          >
            <TouchableOpacity
              onPress={onCancel}
              style={{
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 10,
                backgroundColor: "#eee",
              }}
            >
              <Text style={{ fontWeight: "600" }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onSave}
              style={{
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 10,
                backgroundColor: "black",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "600" }}>Save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>
    </ScrollView>
  );
}

/* small ui helpers */
function Row({ label, value }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#f2f2f2",
      }}
    >
      <Text style={{ opacity: 0.7 }}>{label}</Text>
      <Text style={{ fontWeight: "600" }}>{value}</Text>
    </View>
  );
}

function Label({ children }) {
  return (
    <Text style={{ fontWeight: "600", marginTop: 10, marginBottom: 6 }}>
      {children}
    </Text>
  );
}

function Input(props) {
  return (
    <TextInput
      {...props}
      style={[
        {
          borderWidth: 1,
          borderColor: "#ddd",
          borderRadius: 10,
          padding: 12,
          backgroundColor: "#fff",
        },
        props.style,
      ]}
    />
  );
}
