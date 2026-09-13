// Deterministic, explainable risk scoring so the "prediction" can be
// reasoned about instead of being a black box. A real system would
// replace/augment this with a trained model served from a backend.

export function computeRiskScore(patient) {
  const { vitals, age = 0, history = [] } = patient;
  let score = 0;

  if (vitals.heartRate > 100) score += 15;
  if (vitals.heartRate > 120) score += 10;

  if (vitals.spo2 < 95) score += 15;
  if (vitals.spo2 < 90) score += 15;

  const systolic = parseInt(String(vitals.bp).split('/')[0], 10) || 0;
  if (systolic > 140) score += 10;
  if (systolic > 160) score += 10;

  const temp = parseFloat(vitals.temp);
  if (!Number.isNaN(temp) && temp >= 38) score += 10;

  if (age >= 65) score += 10;
  if (age >= 80) score += 5;

  score += Math.min(history.length * 5, 20);

  return Math.max(0, Math.min(100, Math.round(score)));
}

export function getRiskLevel(score) {
  if (score >= 70) return 'High';
  if (score >= 40) return 'Medium';
  return 'Low';
}
