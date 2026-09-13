import React from 'react';

export default function RiskBadge({ score }) {
  const getStyle = (val) => {
    if (val >= 75) return "bg-red-100 text-red-700 border-red-300";
    if (val >= 40) return "bg-amber-100 text-amber-700 border-amber-300";
    return "bg-emerald-100 text-emerald-700 border-emerald-300";
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getStyle(score)}`}>
      Risk Score: {score}%
    </span>
  );
}