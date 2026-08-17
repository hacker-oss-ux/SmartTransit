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
  ChevronUp,
  ChevronDown,
  Sparkles,
  QrCode,
  WifiOff,
  ShieldCheck,
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

  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-6xl px-4 pointer-events-none">
      <div className="bg-slate-900/95 text-white backdrop-blur-xl border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto transition-all duration-300">
        {/* Header Bar with Live Telemetry Ticker & Toggle */}
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
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-700/50 hover:bg-slate-700 transition"
            >
              <span>{isExpanded ? 'Hide Dock' : 'Show Dock'}</span>
              {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Action Controls Grid */}
        {isExpanded && (
          <div className="p-3 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-xs">
            {/* 1. Tap Smart Card */}
            <button
              onClick={() => setIsNfcModalOpen(true)}
              className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition shadow-lg shadow-blue-600/30 active:scale-98 group"
            >
              <SmartphoneNfc className="w-4 h-4 text-blue-200 group-hover:scale-110 transition" />
              <span>Tap NFC Card</span>
            </button>

            {/* 2. Digital QR Backup */}
            <button
              onClick={() => setIsDigitalQrModalOpen(true)}
              className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl bg-indigo-950/70 hover:bg-indigo-900 text-indigo-300 border border-indigo-700/50 font-semibold transition active:scale-98"
            >
              <QrCode className="w-4 h-4 text-indigo-400" />
              <span>Backup QR Pass</span>
            </button>

            {/* 3. Auto-Play / Pause Bus */}
            <button
              onClick={() => setIsSimulating(!isSimulating)}
              className={`flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl font-semibold transition active:scale-98 border ${
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

            {/* 4. Advance Next Stop */}
            <button
              onClick={advanceBusStop}
              className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold transition active:scale-98"
            >
              <FastForward className="w-4 h-4 text-blue-400" />
              <span>Next Stop</span>
            </button>

            {/* 5. Parent Recharge Modal */}
            <button
              onClick={() => setIsPaymentModalOpen(true)}
              className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-700/50 font-semibold transition active:scale-98"
            >
              <CreditCard className="w-4 h-4 text-emerald-400" />
              <span>Recharge Card</span>
            </button>

            {/* 6. Offline Mode Simulator */}
            <button
              onClick={toggleOfflineMode}
              className={`flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl font-semibold transition active:scale-98 border ${
                bus.isOfflineMode
                  ? 'bg-amber-600 text-white border-amber-400 shadow-lg shadow-amber-600/30'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
              }`}
            >
              <WifiOff className="w-4 h-4" />
              <span>{bus.isOfflineMode ? `Offline (${bus.offlineQueueCount})` : 'Simulate Offline'}</span>
            </button>

            {/* 7. Simulate Delay */}
            <button
              onClick={() => simulateBusDelay(10)}
              className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl bg-amber-950/60 hover:bg-amber-900/70 text-amber-300 border border-amber-700/50 font-semibold transition active:scale-98"
            >
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Simulate Delay</span>
            </button>

            {/* 8. Reset Simulation */}
            <button
              onClick={resetSimulation}
              className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/40 font-semibold transition active:scale-98 col-span-2 sm:col-span-1"
            >
              <RotateCcw className="w-4 h-4 text-rose-400" />
              <span>Reset State</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
