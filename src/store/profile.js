import { create } from "zustand";

const defaultProfile = {
  name: "User",
  age: 25,
  location: "",
  bio: "",
  interests: [],
  photo: null,
  lookingFor: "Long-term relationship",  // ⭐ YENİ ALAN
 
  relationshipType: "", 
};

export const useProfile = create((set) => ({
  profile: defaultProfile,
  updateProfile: (data) =>
    set((state) => ({
      profile: { ...state.profile, ...data },
    })),
}));
