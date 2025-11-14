import { create } from "zustand";

export const useProfile = create((set) => ({
  profile: {
    name: "Demo User",
    age: 25,
    location: "Istanbul, Türkiye",
    bio: "Coffee, galleries, long walks. ☕️🎨",
    interests: ["Movies", "Running", "Photography"],
    photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&q=80",
  },
  updateProfile: (patch) =>
    set((state) => ({ profile: { ...state.profile, ...patch } })),
}));
