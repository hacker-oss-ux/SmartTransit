import React, { useState } from 'react';
import { useTransit } from '../../context/TransitContext';
import {
  Play,
  Pause,
  FastForward,
  CreditCard,
  AlertTriangle,
  RotateCcw,
  SmartphoneNfc,
  ChevronDown,
  Sparkles,
  QrCode,
  WifiOff,
  ShieldCheck,
  Bus,
} from 'lucide-react';

export const SimulationControlBar: React.FC = () => {
  const {
    isSimulating,
    setIsSimulating,
    advanceBusStop,
    setIsNfcModalOpen,
    setIsPaymentModalOpen,
    setIsDigitalQrModalOpen,
    setIsPrivacyModalOpen,
    simulateBusDelay,
    toggleOfflineMode,
    resetSimulation,
    bus,
    card,
  } = useTransit();

  const [isDockOpen, setIsDockOpen] = useState(true);

  // ---------------------------------------------------------------
  // COLLAPSED STATE — floating circular button, zero layout impact
  // ---------------------------------------------------------------
  if (!isDockOpen) {
    return (
      <button
        onClick={() => setIsDockOpen(true)}
        aria-label="Open Mobility Simulator"
        title="Open Simulator"
        className="
          fixed bottom-6 right-6 z-50
          w-14 h-14 rounded-full
          bg-slate-900 border border-slate-700/80
          shadow-2xl shadow-black/40
          flex items-center justify-center
          hover:scale-110 active:scale-95
          transition-all duration-200 ease-out
          group
        "
        style={{ animation: 'fadeScaleIn 0.2s ease-out' }}
      >
        {/* Brand mark */}
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/30 group-hover:shadow-blue-500/50 transition">
          <Bus className="w-5 h-5 text-white" />
        </div>

        {/* Live pulse dot */}
        <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-900 animate-pulse" />

        <style>{`
          @keyframes fadeScaleIn {
            from { opacity: 0; transform: scale(0.6); }
            to   { opacity: 1; transform: scale(1);   }
          }
        `}</style>
      </button>
    );
  }

  // ---------------------------------------------------------------
  // EXPANDED STATE — full simulator dock
  // ---------------------------------------------------------------
  return (
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-6xl px-4 pointer-events-none"
      style={{ animation: 'slideUpFadeIn 0.22s ease-out' }}
    >
      <style>{`
        @keyframes slideUpFadeIn {
          from { opacity: 0; transform: translate(-50%, 16px); }
          to   { opacity: 1; transform: translate(-50%, 0);    }
        }
      `}</style>

      <div className="bg-slate-900/95 text-white backdrop-blur-xl border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto">

        {/* ── Header bar ── */}
        <div className="px-4 py-2.5 bg-slate-800/80 flex items-center justify-between border-b border-slate-700/60 text-xs">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-bold tracking-wide uppercase text-blue-400 text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              Zero-Disadvantage Mobility Simulator
            </span>
            <div className="h-3 w-px bg-slate-700 hidden sm:block" />
            <div className="hidden sm:flex items-center gap-2 text-slate-300 text-[11px]">
              <span className="flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full ${bus.gpsStatus === 'CONNECTED' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                Bus {bus.busId} ({bus.currentStopName})
              </span>
              <span className="text-slate-500">•</span>
              <span>ETA: {bus.etaMinutes}m</span>
              <span className="text-slate-500">•</span>
              <span className="text-emerald-400 font-mono">Card: ₹{card.balance}</span>
              {bus.isOfflineMode && (
                <>
                  <span className="text-slate-500">•</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold flex items-center gap-1">
                    <WifiOff className="w-3 h-3" />
                    Offline ({bus.offlineQueueCount} queued)
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPrivacyModalOpen(true)}
              className="hidden sm:flex items-center gap-1 text-[11px] text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 border border-slate-700 transition"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>DPDP Privacy Center</span>
            </button>

            <button
              onClick={() => setIsDockOpen(false)}
              aria-label="Hide Mobility Simulator"
              className="flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-700/50 hover:bg-slate-700 transition"
            >
              <span>Hide Dock</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ── Controls grid ── */}
        <div className="p-3 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-xs">

          {/* 1. Tap Smart Card */}
          <button
            onClick={() => setIsNfcModalOpen(true)}
            className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition shadow-lg shadow-blue-600/30 active:scale-95 group"
          >
            <SmartphoneNfc className="w-4 h-4 text-blue-200 group-hover:scale-110 transition" />
            <span>Tap NFC Card</span>
          </button>

          {/* 2. Digital QR Backup */}
          <button
            onClick={() => setIsDigitalQrModalOpen(true)}
            className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl bg-indigo-950/70 hover:bg-indigo-900 text-indigo-300 border border-indigo-700/50 font-semibold transition active:scale-95"
          >
            <QrCode className="w-4 h-4 text-indigo-400" />
            <span>Backup QR Pass</span>
          </button>

          {/* 3. Auto-Drive / Pause */}
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className={`flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl font-semibold transition active:scale-95 border ${
              isSimulating
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                : 'bg-emerald-600/90 hover:bg-emerald-500 text-white border-emerald-500/40'
            }`}
          >
            {isSimulating ? (
              <>
                <Pause className="w-4 h-4 text-amber-300" />
                <span>Pause Bus</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 text-emerald-200" />
                <span>Auto-Drive Bus</span>
              </>
            )}
          </button>

          {/* 4. Next Stop */}
          <button
            onClick={advanceBusStop}
            className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold transition active:scale-95"
          >
            <FastForward className="w-4 h-4 text-blue-400" />
            <span>Next Stop</span>
          </button>

          {/* 5. Recharge Card */}
          <button
            onClick={() => setIsPaymentModalOpen(true)}
            className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-700/50 font-semibold transition active:scale-95"
          >
            <CreditCard className="w-4 h-4 text-emerald-400" />
            <span>Recharge Card</span>
          </button>

          {/* 6. Offline Mode */}
          <button
            onClick={toggleOfflineMode}
            className={`flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl font-semibold transition active:scale-95 border ${
              bus.isOfflineMode
                ? 'bg-amber-600 text-white border-amber-400 shadow-lg shadow-amber-600/30'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
            }`}
          >
            <WifiOff className="w-4 h-4" />
            <span>{bus.isOfflineMode ? `Offline (${bus.offlineQueueCount})` : 'Simulate Offline'}</span>
          </button>

          {/* 7. Simulate Delay */}
          <button
            onClick={() => simulateBusDelay(10)}
            className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl bg-amber-950/60 hover:bg-amber-900/70 text-amber-300 border border-amber-700/50 font-semibold transition active:scale-95"
          >
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Simulate Delay</span>
          </button>

          {/* 8. Reset State */}
          <button
            onClick={resetSimulation}
            className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/40 font-semibold transition active:scale-95 col-span-2 sm:col-span-1"
          >
            <RotateCcw className="w-4 h-4 text-rose-400" />
            <span>Reset State</span>
          </button>

        </div>
      </div>
    </div>
  );
};
