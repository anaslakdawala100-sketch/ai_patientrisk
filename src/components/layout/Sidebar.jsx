import React from 'react';
import { LayoutDashboard, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <aside className="hidden md:flex flex-col w-56 bg-slate-900 border-r border-slate-800 min-h-[calc(100vh-64px)] p-4">
      <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium bg-indigo-600 text-white mb-4">
        <LayoutDashboard className="h-4 w-4" />
        Dashboard
      </div>

      <div className="mt-auto flex items-center gap-2 px-4 py-3 rounded-lg bg-slate-800/60 text-slate-300 text-xs">
        <ShieldCheck className="h-4 w-4 text-indigo-400" />
        <span className="capitalize">{user?.role || 'guest'} access</span>
      </div>
    </aside>
  );
}
