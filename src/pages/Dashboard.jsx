import React, { useState, useMemo } from 'react';
import { usePatients } from '../hooks/usePatients';
import PatientCard from '../components/patient/PatientCard';
import TopHeader from '../components/layout/TopHeader';
import SummaryModal from '../components/ai/SummaryModal';

export default function Dashboard() {
  const { patients, loading, error } = usePatients();
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('All');
  const [summaryPatient, setSummaryPatient] = useState(null);

  const filtered = useMemo(() => {
    return patients.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRisk = riskFilter === 'All' || p.riskLevel === riskFilter;
      return matchesSearch && matchesRisk;
    });
  }, [patients, searchTerm, riskFilter]);

  const stats = useMemo(
    () => ({
      total: patients.length,
      high: patients.filter((p) => p.riskLevel === 'High').length,
      medium: patients.filter((p) => p.riskLevel === 'Medium').length,
      low: patients.filter((p) => p.riskLevel === 'Low').length,
    }),
    [patients]
  );

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Patient Risk Monitoring</h1>
        <p className="text-slate-500 text-sm">Real-time triage and AI-powered predictive analytics</p>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <StatCard label="Total Patients" value={stats.total} />
        <StatCard label="High Risk" value={stats.high} tone="rose" />
        <StatCard label="Medium Risk" value={stats.medium} tone="amber" />
        <StatCard label="Low Risk" value={stats.low} tone="emerald" />
      </div>

      <TopHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        riskFilter={riskFilter}
        onRiskFilterChange={setRiskFilter}
      />

      {loading && <p className="text-sm text-slate-500 mt-6">Loading patients…</p>}
      {error && <p className="text-sm text-red-600 mt-6">{error}</p>}

      {!loading && !error && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
          {filtered.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              onGenerateSummary={() => setSummaryPatient(patient)}
            />
          ))}
          {filtered.length === 0 && (
            <p className="text-sm text-slate-400 col-span-full text-center py-10">
              No patients match your search/filter.
            </p>
          )}
        </div>
      )}

      {summaryPatient && (
        <SummaryModal patient={summaryPatient} onClose={() => setSummaryPatient(null)} />
      )}
    </div>
  );
}

function StatCard({ label, value, tone = 'slate' }) {
  const toneMap = {
    slate: 'text-slate-900',
    rose: 'text-rose-600',
    amber: 'text-amber-600',
    emerald: 'text-emerald-600',
  };
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
      <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${toneMap[tone]}`}>{value}</p>
    </div>
  );
}
