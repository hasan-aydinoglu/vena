import { create } from "zustand";

const defaultProfile = {
  name: "User",
  age: 25,
  location: "",
  bio: "",
  interests: [],
  photo: null,
 
  relationshipType: "", 
};

export const useProfile = create((set) => ({
  profile: defaultProfile,
  updateProfile: (data) =>
    set((state) => ({
      profile: { ...state.profile, ...data },
    })),
}));
