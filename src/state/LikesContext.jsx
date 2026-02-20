import React, { createContext, useContext, useMemo, useState } from "react";

const LikesContext = createContext(null);

export function LikesProvider({ children }) {
  const [likedProfiles, setLikedProfiles] = useState([]); // [{id, name, ...}]

  const likeProfile = (profile) => {
    if (!profile) return;
    setLikedProfiles((prev) => {
      if (prev.some((p) => p.id === profile.id)) return prev;
      return [...prev, profile];
    });
  };

  const unlikeProfile = (id) => {
    setLikedProfiles((prev) => prev.filter((p) => p.id !== id));
  };

  const clearLikes = () => setLikedProfiles([]);

  const value = useMemo(
    () => ({ likedProfiles, likeProfile, unlikeProfile, clearLikes }),
    [likedProfiles]
  );

  return <LikesContext.Provider value={value}>{children}</LikesContext.Provider>;
}

export function useLikes() {
  const ctx = useContext(LikesContext);
  if (!ctx) throw new Error("LikesProvider missing. Wrap app with <LikesProvider>.");
  return ctx;
}