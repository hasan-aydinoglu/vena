import { create } from "zustand";

export const useUser = create((set) => ({
  user: null, // { uid, email, name }
  loginDemo: (email = "demo@vena.app") =>
    set({ user: { uid: "demo", email, name: "Demo User" } }),
  logout: () => set({ user: null }),
}));
