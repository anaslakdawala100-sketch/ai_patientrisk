import React from 'react';
import { FileText } from 'lucide-react';

export default function HistoryList({ items = [] }) {
  if (!items.length) {
    return <p className="text-sm text-slate-400">No significant history on record.</p>;
  }

  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
          <FileText className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
