import React, { useState, useEffect } from 'react';
import { useTransit } from '../../context/TransitContext';
import {
  SmartphoneNfc,
  X,
  ShieldCheck,
  Zap,
  ArrowRight,
  Wifi,
  CreditCard,
  Lock,
  UserCheck,
} from 'lucide-react';

export const NfcTapModal: React.FC = () => {
  const {
    isNfcModalOpen,
    setIsNfcModalOpen,
    card,
    student,
    bus,
    journey,
    handleNfcTap,
  } = useTransit();

  const [step, setStep] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (isNfcModalOpen) {
      setStep(0);
      setIsProcessing(false);
    }
  }, [isNfcModalOpen]);

  if (!isNfcModalOpen) return null;

  const triggerTapSimulation = () => {
    setIsProcessing(true);
    setStep(1); // 1. NFC Detected

    setTimeout(() => {
      setStep(2); // 2. Student Verified + Conductor Photo Check
    }, 500);

    setTimeout(() => {
      setStep(3); // 3. Concession Applied & Anti-Passback Verified
    }, 1000);

    setTimeout(() => {
      setStep(4); // 4. Complete
      handleNfcTap(10, true); // Bypass demo cooldown on explicit click
      setIsProcessing(false);
    }, 1500);
  };

  const isCurrentlyTravelling = journey.status === 'TRAVELLING' || journey.status === 'BOARDED';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 p-5 text-white flex items-center justify-between relative overflow-hidden">
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/25">
              <SmartphoneNfc className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base tracking-wide font-heading">
                  Smart NFC Bus POS Terminal
                </h3>
                {bus.isOfflineMode ? (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-400 text-amber-950">
                    Offline Crypto Mode
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-400 text-emerald-950">
                    Online 5G Sync
                  </span>
                )}
              </div>
              <p className="text-xs text-blue-100">
                Bus {bus.busId} • BharatBenz #{bus.registrationNumber}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsNfcModalOpen(false)}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {/* Reader Target with Photo Check */}
          <div className="flex flex-col items-center justify-center py-4 bg-slate-50 rounded-2xl border border-dashed border-slate-300 relative overflow-hidden">
            {/* NFC Waves Animation */}
            {isProcessing && (
              <>
                <div className="nfc-wave w-24 h-24" />
                <div className="nfc-wave w-36 h-36" style={{ animationDelay: '0.5s' }} />
                <div className="nfc-wave w-48 h-48" style={{ animationDelay: '1.0s' }} />
              </>
            )}

            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Conductor Visual Photo Verification Box */}
              {step >= 2 ? (
                <div className="flex items-center gap-3 bg-white p-2.5 rounded-2xl border-2 border-emerald-500 shadow-lg animate-in zoom-in-75">
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-14 h-14 rounded-xl object-cover border border-slate-200 shadow-xs"
                  />
                  <div className="text-left">
                    <div className="flex items-center gap-1">
                      <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-[10px] font-bold text-emerald-700 uppercase">Identity Match</span>
                    </div>
                    <h4 className="text-sm font-extrabold text-slate-900">{student.name}</h4>
                    <p className="text-[10px] text-blue-600 font-mono">ID: {student.studentId} • {student.rollNo}</p>
                  </div>
                </div>
              ) : (
                <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl ${
                  isProcessing
                    ? 'bg-blue-600 text-white animate-bounce'
                    : 'bg-white border-4 border-blue-600 text-blue-600'
                }`}>
                  <Wifi className="w-8 h-8 rotate-90" />
                </div>
              )}

              <div className="mt-3">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {isProcessing ? 'High-Throughput (<250ms) Reader Handshake...' : step === 4 ? 'Verification Complete' : 'Hold Card / Phone to Reader'}
                </p>
                <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                  {step === 0 && 'Ready for Card or Digital QR Tap'}
                  {step === 1 && 'NFC Chip Detected (Mifare DESFire EV3)...'}
                  {step === 2 && `Conductor Photo Verified: ${student.name}`}
                  {step === 3 && 'Anti-Passback Checked & 50% Concession Applied'}
                  {step === 4 && (isCurrentlyTravelling ? 'Exit Tap Recorded • Parent Notified' : 'Boarded Bus ST-102 • ₹10 Concession Deducted')}
                </h4>
              </div>
            </div>
          </div>

          {/* Connected Verification Pipeline with Anti-Disadvantage Badges */}
          <div className="space-y-2 bg-slate-100/70 p-3.5 rounded-2xl border border-slate-200 text-xs">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              <span>Security & Reliability Pipeline</span>
              <span className="text-[10px] text-emerald-700 font-mono">Anti-Passback Armed</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className={`p-2 rounded-xl flex items-center gap-2 border transition ${
                step >= 1 ? 'bg-white border-blue-400 text-blue-900 shadow-2xs font-semibold' : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}>
                <Zap className="w-4 h-4 text-blue-600 shrink-0" />
                <div>
                  <div className="font-bold">1. Sub-250ms NFC</div>
                  <div className="text-[10px] text-slate-500">Mifare DESFire EV3</div>
                </div>
              </div>

              <div className={`p-2 rounded-xl flex items-center gap-2 border transition ${
                step >= 2 ? 'bg-white border-blue-400 text-blue-900 shadow-2xs font-semibold' : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}>
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <div>
                  <div className="font-bold">2. Photo Anti-Fraud</div>
                  <div className="text-[10px] text-slate-500">Conductor Cross-Check</div>
                </div>
              </div>

              <div className={`p-2 rounded-xl flex items-center gap-2 border transition ${
                step >= 3 ? 'bg-white border-blue-400 text-blue-900 shadow-2xs font-semibold' : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}>
                <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <div className="font-bold">3. Anti-Passback</div>
                  <div className="text-[10px] text-slate-500">Duplicate Tap Lock</div>
                </div>
              </div>

              <div className={`p-2 rounded-xl flex items-center gap-2 border transition ${
                step >= 4 ? 'bg-white border-emerald-400 text-emerald-900 shadow-2xs font-semibold' : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}>
                <CreditCard className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <div className="font-bold">4. {bus.isOfflineMode ? 'Offline Queue' : 'Cloud Sync'}</div>
                  <div className="text-[10px] text-slate-500">Bal: ₹{card.balance - (step === 4 ? 0 : 10)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Trigger Buttons */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <button
              type="button"
              onClick={() => setIsNfcModalOpen(false)}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-xs transition"
            >
              Cancel
            </button>

            {step < 4 ? (
              <button
                type="button"
                disabled={isProcessing}
                onClick={triggerTapSimulation}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition active:scale-98 disabled:opacity-50"
              >
                <SmartphoneNfc className="w-4 h-4" />
                <span>{isProcessing ? 'Verifying Card on Bus Terminal...' : 'Simulate Physical Card Tap'}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsNfcModalOpen(false)}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/25 transition"
              >
                <span>Done • View Updated State</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
