import React from 'react';

// Dependency-free SVG line chart so the project doesn't need a charting
// library just to plot three small vitals series.
const METRICS = [
  { key: 'heartRate', label: 'Heart Rate', color: '#f43f5e', unit: 'bpm' },
  { key: 'spo2', label: 'SpO2', color: '#0ea5e9', unit: '%' },
  { key: 'systolic', label: 'Systolic BP', color: '#6366f1', unit: 'mmHg' },
];

export default function VitalsChart({ data = [] }) {
  if (!data.length) {
    return <p className="text-sm text-slate-400">No vitals history available.</p>;
  }

  const width = 560;
  const height = 140;
  const padding = 20;

  return (
    <div className="space-y-4">
      {METRICS.map((metric) => {
        const values = data.map((d) => d[metric.key]);
        const min = Math.min(...values);
        const max = Math.max(...values);
        const range = max - min || 1;

        const points = values.map((v, i) => {
          const x = padding + (i / (values.length - 1 || 1)) * (width - padding * 2);
          const y = height - padding - ((v - min) / range) * (height - padding * 2);
          return `${x},${y}`;
        });

        return (
          <div key={metric.key} className="bg-white rounded-lg border border-slate-100 p-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-semibold text-slate-600">{metric.label}</span>
              <span className="text-xs text-slate-400">
                latest: {values[values.length - 1]} {metric.unit}
              </span>
            </div>
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-20" preserveAspectRatio="none">
              <polyline fill="none" stroke={metric.color} strokeWidth="2" points={points.join(' ')} />
              {values.map((v, i) => {
                const [x, y] = points[i].split(',');
                return <circle key={i} cx={x} cy={y} r="2.5" fill={metric.color} />;
              })}
            </svg>
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              {data.map((d, i) => (
                <span key={i}>{d.time}</span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
