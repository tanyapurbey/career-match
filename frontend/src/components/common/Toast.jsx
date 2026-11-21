import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast() {
  const { toasts, removeToast } = useApp();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        let bg = 'bg-slate-900 text-white';
        let Icon = Info;
        if (toast.type === 'success') {
          bg = 'bg-emerald-600 text-white';
          Icon = CheckCircle2;
        } else if (toast.type === 'error') {
          bg = 'bg-rose-600 text-white';
          Icon = AlertCircle;
        } else if (toast.type === 'info') {
          bg = 'bg-slate-900 text-white';
          Icon = Info;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-xl shadow-lg border border-white/10 ${bg} transition-all duration-300 animate-slide-up`}
          >
            <div className="flex items-center gap-2.5 text-sm font-medium">
              <Icon className="w-4 h-4 shrink-0" />
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors ml-2"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
