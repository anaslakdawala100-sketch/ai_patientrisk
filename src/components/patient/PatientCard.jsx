import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Activity, Thermometer, Wind } from 'lucide-react';
import RiskBadge from './RiskBadge';

export default function PatientCard({ patient, onGenerateSummary }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition flex flex-col">
      <div className="p-5 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
        <div>
          <h3 className="font-bold text-slate-900 text-lg">{patient.name}</h3>
          <p className="text-xs text-slate-400">{patient.id} • Room {patient.room}</p>
        </div>
        <RiskBadge score={patient.riskScore} />
      </div>

      <div className="p-5 space-y-4 flex-1 flex flex-col">
        <div>
          <span className="text-xs uppercase font-semibold text-slate-400 tracking-wider">Primary Condition</span>
          <p className="text-sm font-medium text-slate-800">{patient.primaryCondition}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs">
          <VitalItem icon={<Heart className="h-4 w-4 text-rose-500" />} label="Heart Rate" value={`${patient.vitals.heartRate} bpm`} />
          <VitalItem icon={<Wind className="h-4 w-4 text-sky-500" />} label="SpO2" value={`${patient.vitals.spo2}%`} />
          <VitalItem icon={<Activity className="h-4 w-4 text-indigo-500" />} label="Blood Pressure" value={patient.vitals.bp} />
          <VitalItem icon={<Thermometer className="h-4 w-4 text-amber-500" />} label="Temperature" value={patient.vitals.temp} />
        </div>

        <div className="mt-auto flex flex-col sm:flex-row gap-2 pt-2">
          <Link
            to={`/patient/${patient.id}`}
            className="flex-1 text-center py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-medium transition"
          >
            View Details
          </Link>
          <button
            onClick={onGenerateSummary}
            className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition shadow-sm"
          >
            Generate AI Summary
          </button>
        </div>
      </div>
    </div>
  );
}

function VitalItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <div>
        <span className="text-slate-400 block">{label}</span>
        <span className="font-semibold text-slate-700">{value}</span>
      </div>
    </div>
  );
}
