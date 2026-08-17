import React from 'react';
import { useTransit } from '../../context/TransitContext';
import { LiveMap } from '../../components/common/LiveMap';
import {
  Radio,
  SmartphoneNfc,
  ShieldAlert,
  Users,
  Play,
  Pause,
  FastForward,
  WifiOff,
  PackageCheck,
} from 'lucide-react';

export const OperatorDashboard: React.FC = () => {
  const {
    bus,
    isSimulating,
    setIsSimulating,
    advanceBusStop,
    toggleOfflineMode,
    triggerEmergencySos,
    handleNfcTap,
    student,
  } = useTransit();

  const occupancyPercent = Math.round((bus.currentPassengers / bus.capacity) * 100);

  return (
    <div className="min-h-screen bg-slate-900 text-white pb-28">
      {/* Subheader Operator Bar */}
      <div className="bg-slate-950 border-b border-slate-800 sticky top-16 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-black text-xs">
                OP
              </div>
              <div>
                <h2 className="text-sm font-extrabold font-heading tracking-wide">
                  SmartTransit Operator Telemetry Console
                </h2>
                <p className="text-[10px] text-slate-400 font-mono">
                  Vehicle Unit ID: BUS-ST102-SYS4
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {bus.isOfflineMode ? (
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-900/60 text-amber-300 border border-amber-700/60 flex items-center gap-1.5">
                  <WifiOff className="w-3.5 h-3.5" />
                  <span>Offline Mode ({bus.offlineQueueCount} queued)</span>
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-900/60 text-emerald-300 border border-emerald-700/60 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Bus Status: {bus.status}</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* Top 4 Diagnostic Gauge Tiles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          {/* 1. GPS Status */}
          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                GPS System
              </span>
              <Radio className={`w-4 h-4 ${bus.gpsStatus === 'CONNECTED' ? 'text-emerald-400' : 'text-rose-400'}`} />
            </div>
            <div className="text-base font-extrabold flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${bus.gpsStatus === 'CONNECTED' ? 'bg-emerald-400' : 'bg-rose-400'}`} />
              <span className="font-mono">{bus.gpsStatus}</span>
            </div>
            <p className="text-[10px] text-slate-400">Accuracy: &plusmn;3.2m • 14 Satellites</p>
          </div>

          {/* 2. NFC POS Reader & Throughput */}
          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                NFC POS Reader
              </span>
              <SmartphoneNfc className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-base font-extrabold flex items-center gap-1.5 text-blue-300">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span className="font-mono">&lt; 250ms Response</span>
            </div>
            <p className="text-[10px] text-slate-400">Anti-Passback: 15 min lock</p>
          </div>

          {/* 3. Passenger Capacity */}
          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                Passenger Occupancy
              </span>
              <Users className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-base font-extrabold font-mono text-emerald-300">
              {bus.currentPassengers} / {bus.capacity} Seats ({occupancyPercent}%)
            </div>
            <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${occupancyPercent}%` }}
              />
            </div>
          </div>

          {/* 4. Offline Sync Queue Diagnostic */}
          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                Offline SQLite Queue
              </span>
              <PackageCheck className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-base font-extrabold font-mono text-amber-300">
              {bus.offlineQueueCount} Batches Queued
            </div>
            <p className="text-[10px] text-slate-400">Auto-Flush on 5G Reconnect</p>
          </div>
        </div>

        {/* Live Map & Operational Console */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Main Map */}
          <div className="lg:col-span-8 space-y-4">
            <div className="rounded-3xl overflow-hidden border border-slate-700 shadow-xl">
              <LiveMap heightClass="h-96 sm:h-[460px]" />
            </div>

            {/* Manual Operator Actions Dock */}
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Operator Telemetry & Resilience Simulation
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold">
                <button
                  onClick={() => setIsSimulating(!isSimulating)}
                  className={`p-3 rounded-xl border flex items-center justify-center gap-1.5 transition ${
                    isSimulating
                      ? 'bg-amber-600/30 text-amber-300 border-amber-500/50'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500/40'
                  }`}
                >
                  {isSimulating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isSimulating ? 'Pause Route' : 'Auto Drive'}</span>
                </button>

                <button
                  onClick={advanceBusStop}
                  className="p-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white border border-slate-600 flex items-center justify-center gap-1.5 transition"
                >
                  <FastForward className="w-4 h-4 text-blue-400" />
                  <span>Next Stop</span>
                </button>

                <button
                  onClick={toggleOfflineMode}
                  className={`p-3 rounded-xl border flex items-center justify-center gap-1.5 transition ${
                    bus.isOfflineMode
                      ? 'bg-amber-600 text-white border-amber-400'
                      : 'bg-slate-700 hover:bg-slate-600 text-slate-300 border-slate-600'
                  }`}
                >
                  <WifiOff className="w-4 h-4" />
                  <span>{bus.isOfflineMode ? 'Restore Online' : 'Simulate Dead Zone'}</span>
                </button>

                <button
                  onClick={triggerEmergencySos}
                  className="p-3 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-700/50 flex items-center justify-center gap-1.5 transition"
                >
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  <span>Test SOS</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Driver & Bus Spec Sheet */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/80 space-y-4 text-xs">
              <h3 className="font-extrabold text-sm text-white uppercase tracking-wider pb-2 border-b border-slate-700">
                Bus ST-102 Specifications
              </h3>

              <div className="space-y-2.5">
                <div className="flex justify-between py-1 border-b border-slate-700/50">
                  <span className="text-slate-400">Registration</span>
                  <span className="font-bold text-white font-mono">{bus.registrationNumber}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-700/50">
                  <span className="text-slate-400">Model</span>
                  <span className="font-bold text-white">{bus.model}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-700/50">
                  <span className="text-slate-400">Driver</span>
                  <span className="font-bold text-white">{bus.driverName} ({bus.driverRating} ★)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-700/50">
                  <span className="text-slate-400">Driver Phone</span>
                  <span className="font-bold text-blue-400 font-mono">{bus.driverPhone}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-700/50">
                  <span className="text-slate-400">Route</span>
                  <span className="font-bold text-white">{bus.routeName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-700/50">
                  <span className="text-slate-400">Current Waypoint</span>
                  <span className="font-bold text-emerald-400">{bus.currentStopName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-700/50">
                  <span className="text-slate-400">Offline SQLite DB</span>
                  <span className="font-bold text-emerald-400 font-mono">Synced</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-700/50">
                  <span className="text-slate-400">Telemetry Sync</span>
                  <span className="font-bold text-white font-mono">{bus.lastTelemetrySync}</span>
                </div>
              </div>
            </div>

            {/* Quick Passenger Tap Simulator on Operator Deck */}
            <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/80 space-y-4 text-xs">
              <h3 className="font-extrabold text-sm text-white uppercase tracking-wider pb-2 border-b border-slate-700">
                Quick Passenger Tap Test
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Simulate passenger #{student.name} ({student.studentId}) tapping card at terminal.
              </p>
              <button
                onClick={() => handleNfcTap(10)}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
              >
                <SmartphoneNfc className="w-4 h-4" />
                <span>Simulate NFC Tap (Deduct ₹10)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
