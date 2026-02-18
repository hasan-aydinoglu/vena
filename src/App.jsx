import React, { useMemo, useState } from "react";
import { calculateCompatibility } from "./engine/matchingEngine";
import { mockUsers } from "./mockUsers";

export default function App() {
  const [attachment, setAttachment] = useState("");
  const [intentLevel, setIntentLevel] = useState("");
  const [emotionalRegulation, setEmotionalRegulation] = useState(5);
  const [started, setStarted] = useState(false);

  const currentUser = useMemo(
    () => ({ attachment, intentLevel, emotionalRegulation }),
    [attachment, intentLevel, emotionalRegulation]
  );

  const sortedUsers = useMemo(() => {
    if (!started) return [];
    return mockUsers
      .map((u) => ({ ...u, compatibility: calculateCompatibility(currentUser, u) }))
      .sort((a, b) => b.compatibility - a.compatibility);
  }, [started, currentUser]);

  if (!started) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <h2 style={styles.h2}>Relationship Intelligence Setup</h2>

          <label style={styles.label}>Attachment Style</label>
          <div style={styles.row}>
            <Btn active={attachment === "secure"} onClick={() => setAttachment("secure")}>Secure</Btn>
            <Btn active={attachment === "anxious"} onClick={() => setAttachment("anxious")}>Anxious</Btn>
            <Btn active={attachment === "avoidant"} onClick={() => setAttachment("avoidant")}>Avoidant</Btn>
          </div>

          <label style={styles.label}>Intent Level</label>
          <div style={styles.row}>
            <Btn active={intentLevel === "marriage"} onClick={() => setIntentLevel("marriage")}>Marriage</Btn>
            <Btn active={intentLevel === "long-term"} onClick={() => setIntentLevel("long-term")}>Long-term</Btn>
            <Btn active={intentLevel === "exploring"} onClick={() => setIntentLevel("exploring")}>Exploring</Btn>
          </div>

          <label style={styles.label}>Emotional Regulation (1–10)</label>
          <input
            type="range"
            min="1"
            max="10"
            value={emotionalRegulation}
            onChange={(e) => setEmotionalRegulation(Number(e.target.value))}
            style={{ width: "100%" }}
          />
          <div style={{ color: "#bbb", marginTop: 6 }}>Selected: {emotionalRegulation}</div>

          <button
            style={{ ...styles.primaryBtn, opacity: attachment && intentLevel ? 1 : 0.5 }}
            disabled={!attachment || !intentLevel}
            onClick={() => setStarted(true)}
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={{ ...styles.card, width: 520 }}>
        <h2 style={styles.h2}>AI Compatibility Matches</h2>
        <div style={{ color: "#bbb", marginBottom: 12 }}>
          Profile: {attachment} • {intentLevel} • ER {emotionalRegulation}/10
        </div>

        {sortedUsers.map((u) => (
          <div key={u.id} style={styles.userCard}>
            <div style={{ fontWeight: 700 }}>{u.name}</div>
            <div style={{ color: "#7c6cff" }}>{u.compatibility}% Compatible</div>
          </div>
        ))}

        <button style={styles.secondaryBtn} onClick={() => setStarted(false)}>
          Back to Setup
        </button>
      </div>
    </div>
  );
}

function Btn({ active, children, ...props }) {
  return (
    <button
      {...props}
      style={{
        ...styles.pill,
        borderColor: active ? "#7c6cff" : "#333",
        color: active ? "#fff" : "#ddd",
      }}
    >
      {children}
    </button>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0f0f12",
    display: "grid",
    placeItems: "center",
    padding: 16,
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
  },
  card: {
    width: 520,
    background: "#16161c",
    border: "1px solid #2a2a33",
    borderRadius: 16,
    padding: 18,
    boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
  },
  h2: { color: "#fff", margin: "0 0 14px" },
  label: { color: "#aaa", display: "block", marginTop: 14, marginBottom: 8 },
  row: { display: "flex", gap: 10, flexWrap: "wrap" },
  pill: {
    background: "#111116",
    border: "1px solid #333",
    padding: "10px 12px",
    borderRadius: 999,
    cursor: "pointer",
  },
  primaryBtn: {
    marginTop: 18,
    width: "100%",
    background: "#7c6cff",
    color: "white",
    border: "none",
    padding: "12px 14px",
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 700,
  },
  secondaryBtn: {
    marginTop: 14,
    width: "100%",
    background: "transparent",
    color: "#ddd",
    border: "1px solid #333",
    padding: "12px 14px",
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 600,
  },
  userCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#111116",
    border: "1px solid #2a2a33",
    borderRadius: 14,
    padding: 14,
    marginTop: 12,
  },
};
