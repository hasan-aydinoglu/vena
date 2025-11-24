import { create } from "zustand";

export const useUser = create((set) => ({
  user: null, 
  loginDemo: (email = "demo@vena.app") =>
    set({ user: { uid: "demo", email, name: "Demo User" } }),
  logout: () => set({ user: null }),
}));
