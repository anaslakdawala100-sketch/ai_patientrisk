import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Wind, Activity, Thermometer } from 'lucide-react';
import { usePatients } from '../hooks/usePatients';
import { usePatientSummary } from '../hooks/usePatientSummary';
import { fetchPatientVitalsHistory } from '../services/api';
import RiskBadge from '../components/patient/RiskBadge';
import HistoryList from '../components/patient/HistoryList';
import VitalsChart from '../components/patient/VitalsChart';
import AISuggestionCard from '../components/ai/AISuggestionCard';
import { formatDate, formatDaysAdmitted } from '../utils/formatters';

export default function PatientDetails() {
  const { id } = useParams();
  const { getPatientById, loading: patientsLoading } = usePatients();
  const patient = getPatientById(id);

  const [vitalsHistory, setVitalsHistory] = useState([]);
  const [vitalsLoading, setVitalsLoading] = useState(true);

  const { reasons, loading: aiLoading, generate } = usePatientSummary(patient);

  useEffect(() => {
    if (!patient) return;
    setVitalsLoading(true);
    fetchPatientVitalsHistory(patient.id).then((data) => {
      setVitalsHistory(data);
      setVitalsLoading(false);
    });
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patient?.id]);

  if (patientsLoading) {
    return <p className="p-6 text-sm text-slate-500">Loading patient…</p>;
  }

  if (!patient) {
    return (
      <div className="p-6">
        <p className="text-sm text-slate-500 mb-3">Patient not found.</p>
        <Link to="/" className="text-indigo-600 text-sm font-medium">← Back to dashboard</Link>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 mb-4">
        <ArrowLeft className="h-4 w-4" /> Back to dashboard
      </Link>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-3">
          <div>
            <h1 className="text-xl font-bold text-slate-900">{patient.name}</h1>
            <p className="text-sm text-slate-500">
              {patient.id} • Room {patient.room} • {patient.age} yrs • {patient.gender}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Admitted {formatDate(patient.admissionDate)} ({formatDaysAdmitted(patient.admissionDate)} ago)
            </p>
          </div>
          <RiskBadge score={patient.riskScore} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
          <VitalTile icon={<Heart className="h-4 w-4 text-rose-500" />} label="Heart Rate" value={`${patient.vitals.heartRate} bpm`} />
          <VitalTile icon={<Wind className="h-4 w-4 text-sky-500" />} label="SpO2" value={`${patient.vitals.spo2}%`} />
          <VitalTile icon={<Activity className="h-4 w-4 text-indigo-500" />} label="Blood Pressure" value={patient.vitals.bp} />
          <VitalTile icon={<Thermometer className="h-4 w-4 text-amber-500" />} label="Temperature" value={patient.vitals.temp} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-3">Vitals Trend (Today)</h3>
          {vitalsLoading ? (
            <p className="text-sm text-slate-400">Loading vitals history…</p>
          ) : (
            <VitalsChart data={vitalsHistory} />
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <h3 className="text-sm font-semibold text-slate-800 mb-3">Medical History</h3>
            <HistoryList items={patient.history} />
          </div>

          <AISuggestionCard reasons={reasons} loading={aiLoading} riskLevel={patient.riskLevel} />
        </div>
      </div>
    </div>
  );
}

function VitalTile({ icon, label, value }) {
  return (
    <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-lg p-3">
      {icon}
      <div>
        <span className="text-xs text-slate-400 block">{label}</span>
        <span className="text-sm font-semibold text-slate-700">{value}</span>
      </div>
    </div>
  );
}
