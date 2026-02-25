export function calculateCompatibility(a, b) {
  if (!a || !b) return null;

  let score = 0;

  if (a.attachment === b.attachment) score += 30;
  if (a.intentLevel === b.intentLevel) score += 40;

  const diff = Math.abs((a.emotionalRegulation ?? 5) - (b.emotionalRegulation ?? 5));
  score += Math.max(0, 30 - diff * 3);

  return Math.min(100, Math.max(0, Math.round(score)));
}