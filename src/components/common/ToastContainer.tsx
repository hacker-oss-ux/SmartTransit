import React from 'react';
import { useTransit } from '../../context/TransitContext';
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { activeToast, dismissToast } = useTransit();

  if (!activeToast) return null;

  const icons = {
    info: <Info className="w-5 h-5 text-blue-600 shrink-0" />,
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
    danger: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />,
  };

  const borders = {
    info: 'border-blue-500/30 bg-blue-50/95 text-blue-950',
    success: 'border-emerald-500/30 bg-emerald-50/95 text-emerald-950',
    warning: 'border-amber-500/30 bg-amber-50/95 text-amber-950',
    danger: 'border-rose-500/30 bg-rose-50/95 text-rose-950',
  };

  return (
    <div className="fixed top-5 right-5 z-50 max-w-md w-[calc(100%-2.5rem)] animate-in slide-in-from-top-4 fade-in duration-200">
      <div className={`p-4 rounded-xl border shadow-xl backdrop-blur-md flex items-start gap-3 ${borders[activeToast.type]}`}>
        {icons[activeToast.type]}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold leading-tight">{activeToast.title}</h4>
          <p className="text-xs mt-0.5 opacity-90 leading-relaxed break-words">{activeToast.message}</p>
        </div>
        <button
          onClick={dismissToast}
          className="p-1 hover:bg-black/5 rounded-lg transition-colors text-slate-500 hover:text-slate-800"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
