export type Attachment = "secure" | "anxious" | "avoidant";
export type IntentLevel = "marriage" | "long-term" | "exploring";

export type PsychProfile = {
  attachment: Attachment;
  intentLevel: IntentLevel;
  emotionalRegulation: number; // 1-10
};

export function calculateCompatibility(a: PsychProfile, b: PsychProfile) {
  let score = 0;
  if (a.attachment === b.attachment) score += 30;
  if (a.intentLevel === b.intentLevel) score += 40;

  const diff = Math.abs(a.emotionalRegulation - b.emotionalRegulation);
  score += Math.max(0, 30 - diff * 3);

  return Math.min(100, Math.max(0, Math.round(score)));
}
