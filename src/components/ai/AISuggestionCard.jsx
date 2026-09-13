import React from 'react';
import { Sparkles, AlertTriangle } from 'lucide-react';

export default function AISuggestionCard({ reasons = [], loading, riskLevel }) {
  return (
    <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="h-4 w-4 text-indigo-600" />
        <h4 className="text-sm font-semibold text-indigo-900">AI Risk Factors</h4>
      </div>

      {loading ? (
        <p className="text-sm text-indigo-700">Analyzing patient data…</p>
      ) : reasons.length ? (
        <ul className="space-y-1.5">
          {reasons.map((reason, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-indigo-800">
              <AlertTriangle className="h-3.5 w-3.5 mt-0.5 shrink-0 text-indigo-500" />
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-indigo-700">
          Click "Generate AI Summary" to see contributing risk factors
          {riskLevel ? ` for this ${riskLevel.toLowerCase()}-risk patient` : ''}.
        </p>
      )}
    </div>
  );
}
