import React from 'react';
import { Activity, Bell, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { initials } from '../../utils/formatters';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-slate-900 border-b border-slate-800 text-white px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <Activity className="h-6 w-6 text-indigo-400" />
        <span className="font-bold text-lg tracking-wide text-slate-100">PulseAI HealthTech</span>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-400 hover:text-white transition">
          <Bell className="h-5 w-5" />
        </button>
        {user && (
          <div className="flex items-center gap-3 border-l border-slate-800 pl-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold">
                {initials(user.name)}
              </div>
              <div className="leading-tight">
                <span className="text-sm font-medium text-slate-300 block">{user.name}</span>
                <span className="text-[10px] text-slate-500 uppercase tracking-wide">{user.role}</span>
              </div>
            </div>
            <button onClick={logout} className="p-2 text-slate-400 hover:text-white transition" title="Log out">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
