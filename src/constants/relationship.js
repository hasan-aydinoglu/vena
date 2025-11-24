

export const RELATIONSHIP_OPTIONS = [
    { id: "life_partner", label: "Life partner" },
    { id: "long_term", label: "Long-term relationship" },
    { id: "short_term_fun", label: "Short-term fun" },
    { id: "casual_dating", label: "Casual dating" },
  ];
  
  export function getRelationshipLabel(type) {
    if (!type) return null;
    const opt = RELATIONSHIP_OPTIONS.find((o) => o.id === type);
    return opt ? opt.label : null;
  }
  