// Mock API layer. Swap these implementations for real `fetch` calls to a
// backend once one exists — the rest of the app only depends on this
// module's function signatures, not on how the data is sourced.

import { mockPatients } from '../data/mockPatients';
import { mockVitals } from '../data/mockVitals';
import { computeRiskScore, getRiskLevel } from '../utils/riskCalculators';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchPatients() {
  await wait(500);
  return mockPatients.map((p) => {
    const riskScore = computeRiskScore(p);
    return { ...p, riskScore, riskLevel: getRiskLevel(riskScore) };
  });
}

export async function fetchPatientVitalsHistory(patientId) {
  await wait(300);
  return mockVitals[patientId] || [];
}
