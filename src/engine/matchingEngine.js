export function calculateCompatibility(userA, userB) {
    let score = 0;
  
    if (userA.attachment === userB.attachment) score += 30;
    if (userA.intentLevel === userB.intentLevel) score += 40;
  
    const diff = Math.abs(userA.emotionalRegulation - userB.emotionalRegulation);
    score += Math.max(0, 30 - diff * 3);
  
    return Math.min(score, 100);
  }
  