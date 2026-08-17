import React, { useState } from 'react';
import {
  ShieldCheck,
  X,
  Lock,
  EyeOff,
  Clock,
  Download,
  CheckCircle2,
} from 'lucide-react';

interface PrivacyCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyCenterModal: React.FC<PrivacyCenterModalProps> = ({ isOpen, onClose }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exported, setExported] = useState(false);

  if (!isOpen) return null;

  const handleExportData = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExported(true);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-base tracking-wide font-heading">
                Privacy & Data Protection Center
              </h3>
              <p className="text-xs text-blue-200">DPDP Act & GDPR Privacy Architecture</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs">
          <p className="text-slate-600 leading-relaxed">
            SmartTransit is engineered with a **Privacy-by-Design** architecture to safeguard student privacy and comply with global data governance regulations.
          </p>

          <div className="space-y-2.5">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <EyeOff className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-900">Zero Invasive Student Phone Tracking</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  SmartTransit tracks only the **Bus GPS unit**, never students' personal smartphones. Journey events are recorded strictly upon physical card tap.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <Lock className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-900">AES-256 & TLS 1.3 Encryption</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  All NFC UID signatures, parent financial transactions, and telemetry packets are encrypted end-to-end.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-900">Automated 90-Day Anonymization</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  Historical transit coordinates are automatically purged from active databases after 90 days in accordance with student safety compliance laws.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-800 block">Personal Data Portability</span>
              <span className="text-[10px] text-slate-400">Download complete transit logs (JSON)</span>
            </div>

            <button
              onClick={handleExportData}
              disabled={isExporting}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold transition flex items-center gap-1.5"
            >
              {exported ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Exported</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>{isExporting ? 'Generating...' : 'Export Data'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
