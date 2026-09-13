import { useState, useCallback } from 'react';
import { generatePatientSummary, generateRiskExplanation } from '../services/aiService';

export function usePatientSummary(patient) {
  const [summary, setSummary] = useState(null);
  const [reasons, setReasons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = useCallback(async () => {
    if (!patient) return;
    setLoading(true);
    setError(null);
    try {
      const [summaryRes, reasonsRes] = await Promise.all([
        generatePatientSummary(patient),
        generateRiskExplanation(patient),
      ]);
      setSummary(summaryRes);
      setReasons(reasonsRes);
    } catch (err) {
      setError(err.message || 'Failed to generate AI summary');
    } finally {
      setLoading(false);
    }
  }, [patient]);

  const reset = useCallback(() => {
    setSummary(null);
    setReasons([]);
    setError(null);
  }, []);

  return { summary, reasons, loading, error, generate, reset };
}
