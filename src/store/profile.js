import { create } from "zustand";

const defaultProfile = {
  name: "User",
  age: 25,
  location: "",
  bio: "",
  interests: [],
  photo: null,
  // 🔹 bunu ekle
  relationshipType: "", // "long_term", "short_term_fun" vs.
};

export const useProfile = create((set) => ({
  profile: defaultProfile,
  updateProfile: (data) =>
    set((state) => ({
      profile: { ...state.profile, ...data },
    })),
}));
