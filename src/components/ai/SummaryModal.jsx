import React, { useEffect } from 'react';
import { X, Sparkles, RefreshCw } from 'lucide-react';
import { usePatientSummary } from '../../hooks/usePatientSummary';
import RiskBadge from '../patient/RiskBadge';
import AISuggestionCard from './AISuggestionCard';

export default function SummaryModal({ patient, onClose }) {
  const { summary, reasons, loading, error, generate } = usePatientSummary(patient);

  useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patient?.id]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between p-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-600" />
              <h3 className="font-bold text-slate-900">AI Patient Summary</h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{patient.name} • {patient.id}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <RiskBadge score={patient.riskScore} />

          {loading && (
            <div className="flex items-center gap-2 text-sm text-slate-500 py-4">
              <RefreshCw className="h-4 w-4 animate-spin" />
              Generating summary…
            </div>
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}

          {!loading && summary && (
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 border border-slate-100 rounded-lg p-4">
              {summary.summary}
            </p>
          )}

          <AISuggestionCard reasons={reasons} loading={loading} riskLevel={patient.riskLevel} />

          <button
            onClick={generate}
            disabled={loading}
            className="w-full py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-medium transition disabled:opacity-50"
          >
            Regenerate Summary
          </button>
        </div>
      </div>
    </div>
  );
}
