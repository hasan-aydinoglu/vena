import PropTypes from "prop-types";
import React, { createContext, useContext, useState } from "react";

const PsychProfileContext = createContext({
  psychProfile: null,
  setPsychProfile: () => {}, // default noop (lint/type için)
});

export function PsychProfileProvider({ children }) {
  const [psychProfile, setPsychProfile] = useState(null);

  return (
    <PsychProfileContext.Provider value={{ psychProfile, setPsychProfile }}>
      {children}
    </PsychProfileContext.Provider>
  );
}

PsychProfileProvider.propTypes = {
  children: PropTypes.node,
};

export function usePsychProfile() {
  return useContext(PsychProfileContext);
}
