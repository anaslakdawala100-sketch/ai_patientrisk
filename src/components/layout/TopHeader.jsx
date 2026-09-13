import React from 'react';
import { Search } from 'lucide-react';

const RISK_OPTIONS = ['All', 'High', 'Medium', 'Low'];

export default function TopHeader({ searchTerm, onSearchChange, riskFilter, onRiskFilterChange }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by patient name or ID…"
          className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <select
        value={riskFilter}
        onChange={(e) => onRiskFilterChange(e.target.value)}
        className="px-3 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {RISK_OPTIONS.map((opt) => (
          <option key={opt} value={opt}>
            {opt === 'All' ? 'All Risk Levels' : `${opt} Risk`}
          </option>
        ))}
      </select>
    </div>
  );
}
