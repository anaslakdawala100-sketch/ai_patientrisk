// AI service layer.
//
// In production this would call a real LLM endpoint (e.g. the Anthropic
// Messages API) from a backend route — never directly from the browser,
// since that would expose the API key. This mock builds a clinically
// styled summary locally so the UI/UX can be built and tested end-to-end
// without a live key. Swap `generatePatientSummary` / `generateRiskExplanation`
// for real `fetch('/api/ai/...')` calls once a backend endpoint exists.

import { getRiskLevel } from '../utils/riskCalculators';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function buildSummaryText(patient) {
  const { name, age, gender, vitals, riskScore, primaryCondition, history = [] } = patient;
  const level = getRiskLevel(riskScore);

  const concerns = [];
  if (vitals.heartRate > 100) concerns.push('elevated heart rate');
  if (vitals.spo2 < 94) concerns.push('low oxygen saturation');
  const systolic = parseInt(String(vitals.bp).split('/')[0], 10) || 0;
  if (systolic > 140) concerns.push('elevated blood pressure');
  if (parseFloat(vitals.temp) >= 38) concerns.push('fever');

  const concernText = concerns.length
    ? `Current vitals show ${concerns.join(', ')}.`
    : 'Current vitals are within a stable range.';

  const historyText = history.length
    ? `Relevant history includes ${history.join('; ').toLowerCase()}.`
    : 'No significant chronic history on record.';

  const recommendation =
    level === 'High'
      ? 'Recommend continuous monitoring, physician review within the hour, and readiness for escalation.'
      : level === 'Medium'
      ? 'Recommend routine monitoring with a follow-up check within the next shift.'
      : 'Recommend standard observation per ward protocol.';

  return `${name}, a ${age}-year-old ${gender.toLowerCase()}, is being treated for ${primaryCondition}. ${concernText} ${historyText} Predicted risk level: ${level} (${riskScore}%). ${recommendation}`;
}

export async function generatePatientSummary(patient) {
  await wait(900); // simulate network/inference latency
  return {
    summary: buildSummaryText(patient),
    generatedAt: new Date().toISOString(),
    model: 'mock-clinical-summarizer-v1',
  };
}

export async function generateRiskExplanation(patient) {
  await wait(600);
  const reasons = [];
  if (patient.vitals.heartRate > 100) reasons.push('Tachycardia detected (HR > 100 bpm)');
  if (patient.vitals.spo2 < 94) reasons.push('Reduced oxygen saturation (SpO2 < 94%)');
  const systolic = parseInt(String(patient.vitals.bp).split('/')[0], 10) || 0;
  if (systolic > 140) reasons.push('Elevated systolic blood pressure');
  if (parseFloat(patient.vitals.temp) >= 38) reasons.push('Febrile temperature');
  if (patient.age >= 65) reasons.push('Age-related risk factor (65+)');
  if (patient.history?.length) reasons.push(`${patient.history.length} chronic condition(s) on record`);
  if (!reasons.length) reasons.push('No significant risk factors detected');
  return reasons;
}
