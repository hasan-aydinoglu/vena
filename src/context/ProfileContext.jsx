import React, { createContext, useContext, useState } from "react";

const defaultUser = {
  name: "Hasan",
  age: 27,
  city: "Istanbul",
  bio: "Founder-minded, ambitious, and looking for a real connection built on trust, communication, and emotional depth.",
  photo:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
  attachment: "secure",
  intentLevel: "long-term",
  emotionalRegulation: 8,
  interests: ["Entrepreneurship", "Travel", "Deep Talks", "Coffee", "Tech"],
  boostActive: false,
};

const ProfileContext = createContext({
  user: defaultUser,
  updateUser: () => {},
});

export function ProfileProvider({ children }) {
  const [user, setUser] = useState(defaultUser);

  const updateUser = (newData) => {
    setUser((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  return (
    <ProfileContext.Provider value={{ user, updateUser }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}