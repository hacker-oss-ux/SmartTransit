import React, { useState } from 'react';
import { useTransit } from '../../context/TransitContext';
import { SmartCardGraphic } from '../../components/common/SmartCardGraphic';
import { LiveMap } from '../../components/common/LiveMap';
import {
  Home,
  User,
  Navigation,
  CreditCard,
  History,
  Bell,
  Bus,
  Download,
  Search,
  ChevronRight,
  Zap,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';

export const ParentPortal: React.FC = () => {
  const {
    student,
    card,
    bus,
    journey,
    stops,
    transactions,
    notifications,
    autoReload,
    toggleAutoReload,
    setIsPaymentModalOpen,
    setIsPrivacyModalOpen,
    setRole,
  } = useTransit();

  const [activeTab, setActiveTab] = useState<'home' | 'child' | 'live' | 'payments' | 'history' | 'alerts'>('home');
  const [alertFilter, setAlertFilter] = useState<'all' | 'journey' | 'payment' | 'safety' | 'system'>('all');
  const [paymentSearch, setPaymentSearch] = useState('');

  const parentNotifications = notifications.filter(
    n => (n.targetRole === 'PARENT' || n.targetRole === 'ALL') &&
         (alertFilter === 'all' || n.category === alertFilter)
  );

  const filteredTransactions = transactions.filter(t =>
    t.description.toLowerCase().includes(paymentSearch.toLowerCase()) ||
    t.transactionId.toLowerCase().includes(paymentSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-28">
      {/* Subheader Navigation Bar for Parent Portal */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 overflow-x-auto">
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setActiveTab('home')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  activeTab === 'home'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>

              <button
                onClick={() => setActiveTab('child')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  activeTab === 'child'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Child Details</span>
              </button>

              <button
                onClick={() => setActiveTab('live')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  activeTab === 'live'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Navigation className="w-4 h-4" />
                <span>Live Journey</span>
              </button>

              <button
                onClick={() => setActiveTab('payments')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  activeTab === 'payments'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Card & AutoPay</span>
              </button>

              <button
                onClick={() => setActiveTab('history')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  activeTab === 'history'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <History className="w-4 h-4" />
                <span>Journey History</span>
              </button>

              <button
                onClick={() => setActiveTab('alerts')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  activeTab === 'alerts'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Bell className="w-4 h-4" />
                <span>Safety Alerts</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPrivacyModalOpen(true)}
                className="hidden sm:flex items-center gap-1 text-xs text-slate-500 hover:text-blue-600 transition"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>DPDP Privacy</span>
              </button>

              <button
                onClick={() => setRole('student')}
                className="hidden sm:flex items-center gap-1.5 text-xs text-blue-600 font-semibold hover:underline"
              >
                <span>Student View</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* ========================================================================= */}
        {/* TAB 1: PARENT HOME */}
        {/* ========================================================================= */}
        {activeTab === 'home' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-blue-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 relative z-10">
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 font-mono">
                  Parent Peace-of-Mind Hub
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 animate-ping" />
                  <h1 className="text-2xl sm:text-3xl font-black font-heading text-white">
                    Dummy is travelling safely
                  </h1>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
                  <span>Bus: <strong className="text-white font-mono">ST-102</strong></span>
                  <span>•</span>
                  <span>Route: <strong className="text-white">Pala → College</strong></span>
                  <span>•</span>
                  <span className="text-emerald-400 font-bold">ETA: {bus.etaMinutes} minutes</span>
                </div>
              </div>

              <div className="relative z-10 flex items-center gap-3">
                <button
                  onClick={() => setActiveTab('live')}
                  className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition flex items-center gap-2"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Full Live Map</span>
                </button>

                <button
                  onClick={() => setIsPaymentModalOpen(true)}
                  className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition flex items-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Recharge Card</span>
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                    <div className="flex items-center gap-2">
                      <Bus className="w-4 h-4 text-blue-600" />
                      <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">
                        Live Bus Location
                      </h3>
                    </div>
                    <span className="text-xs font-bold text-slate-500 font-mono">
                      Speed: {bus.speedKmH} km/h
                    </span>
                  </div>
                  <LiveMap heightClass="h-72 sm:h-80" />
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Current Stop: <strong className="text-slate-800">{bus.currentStopName}</strong></span>
                  <button
                    onClick={() => setActiveTab('live')}
                    className="text-blue-600 font-bold hover:underline"
                  >
                    Open Live Tracking View →
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-6">
                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
                  <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
                    Journey Progress Checkpoints
                  </h3>

                  <div className="space-y-3.5 text-xs">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">
                        ✓
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">Boarded Bus ST-102</div>
                        <div className="text-[11px] text-slate-500">08:08 AM • Mutholy Junction (Smart Card Verified)</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">
                        ✓
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">Pala Bridge Stop</div>
                        <div className="text-[11px] text-slate-500">08:25 AM • Reached on schedule</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0 animate-pulse">
                        ●
                      </div>
                      <div>
                        <div className="font-bold text-blue-700">En Route to Cherpunkal</div>
                        <div className="text-[11px] text-slate-500">Speed 34 km/h • GPS Healthy</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 opacity-60">
                      <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-xs shrink-0">
                        ○
                      </div>
                      <div>
                        <div className="font-bold text-slate-700">St. Thomas College Campus Gate</div>
                        <div className="text-[11px] text-slate-500">ETA 08:42 AM (in ~{bus.etaMinutes} mins)</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">
                      Dummy's Card Balance
                    </span>
                    <div className="text-2xl font-black text-slate-900 font-mono mt-0.5">
                      ₹{card.balance}
                    </div>
                    <p className="text-xs text-emerald-600 font-semibold mt-0.5">
                      {autoReload.isEnabled ? `UPI AutoPay Active (>₹${autoReload.threshold})` : 'Student Concession Active'}
                    </p>
                  </div>

                  <button
                    onClick={() => setIsPaymentModalOpen(true)}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-500/20 transition flex items-center gap-1.5"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Recharge</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Latest Updates Feed with SMS Dual Delivery Badge */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">
                    Latest Real-Time Updates
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                    <Smartphone className="w-3 h-3" />
                    Push + SMS Fallback Active
                  </span>
                </div>
                <span className="text-xs font-semibold text-blue-600">Auto-Refreshed</span>
              </div>

              <div className="divide-y divide-slate-100">
                {parentNotifications.slice(0, 4).map(notif => (
                  <div key={notif.id} className="py-3.5 flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-blue-50 text-blue-700 shrink-0">
                      <Bell className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-900">{notif.title}</h4>
                        <span className="text-[10px] text-slate-400 font-mono">{notif.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">{notif.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: CHILD DETAILS */}
        {/* ========================================================================= */}
        {activeTab === 'child' && (
          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-6">
              <img
                src={student.avatar}
                alt={student.name}
                className="w-24 h-24 rounded-3xl object-cover border-4 border-blue-600 shadow-lg"
              />
              <div className="space-y-1 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h2 className="text-2xl font-extrabold text-slate-900 font-heading">{student.name}</h2>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                    Travelling Safely
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-600">{student.course} • Roll No: {student.rollNo}</p>
                <p className="text-xs text-slate-500">{student.institution}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
                  Assigned Bus & Driver Information
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-400">Bus Identifier</span>
                    <span className="font-bold text-blue-700 font-mono">Bus {bus.busId} ({bus.registrationNumber})</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-400">Driver</span>
                    <span className="font-bold text-slate-800">{bus.driverName}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-400">Driver Phone</span>
                    <span className="font-bold text-slate-800 font-mono">{bus.driverPhone}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-400">Driver Safety Record</span>
                    <span className="font-bold text-emerald-700">{bus.driverExperience} ({bus.driverRating} ★)</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
                  Route & Stop Allocation
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-400">Designated Boarding Stop</span>
                    <span className="font-bold text-slate-800">{student.pickupStop}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-400">College Destination</span>
                    <span className="font-bold text-slate-800">{student.dropStop}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-400">Smart Card Number</span>
                    <span className="font-bold text-slate-800 font-mono">{card.cardNumber}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-400">Concession Validity</span>
                    <span className="font-bold text-slate-800 font-mono">{card.validity}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: LIVE JOURNEY TRACKING */}
        {/* ========================================================================= */}
        {activeTab === 'live' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 font-heading">
                  Live Bus Tracking Console
                </h2>
                <p className="text-xs text-slate-500">
                  Real-time telemetry for Bus ST-102 • High-Precision GPS Sync
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>GPS Telemetry 100% Online</span>
                </span>
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-8 space-y-4">
                <LiveMap heightClass="h-[440px] sm:h-[540px]" />

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Route Waypoints & Estimated Times
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                    {stops.map((stop, idx) => (
                      <div
                        key={stop.id}
                        className={`p-2.5 rounded-xl border transition ${
                          stop.isPassed
                            ? 'bg-slate-50 border-slate-200 text-slate-600'
                            : stop.isCurrent
                            ? 'bg-blue-50 border-blue-300 text-blue-900 font-bold ring-2 ring-blue-500/20'
                            : 'bg-white border-slate-200 text-slate-400'
                        }`}
                      >
                        <div className="text-[10px] text-slate-400 font-mono">STOP 0{idx + 1}</div>
                        <div className="font-bold truncate mt-0.5">{stop.name}</div>
                        <div className="text-[10px] text-slate-500 font-mono mt-1">{stop.scheduledTime}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
                <div className="pb-3 border-b border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Student</span>
                  <h3 className="text-lg font-black text-slate-900">{student.name}</h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-xs font-bold text-emerald-700">Currently Travelling</span>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Assigned Bus</span>
                    <span className="font-bold text-slate-800 font-mono">Bus {bus.busId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Current Stop</span>
                    <span className="font-bold text-slate-800">{bus.currentStopName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Boarded At</span>
                    <span className="font-bold text-slate-800 font-mono">{journey.boardingTime || '08:08 AM'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Estimated Arrival</span>
                    <span className="font-extrabold text-emerald-700 font-mono">{journey.estimatedArrival} ({bus.etaMinutes}m left)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Passenger Occupancy</span>
                    <span className="font-bold text-slate-800 font-mono">{bus.currentPassengers} / {bus.capacity} seats</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Vehicle Speed</span>
                    <span className="font-bold text-blue-700 font-mono">{bus.speedKmH} km/h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Driver</span>
                    <span className="font-bold text-slate-800">{bus.driverName} ({bus.driverPhone})</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <button
                    onClick={() => setIsPaymentModalOpen(true)}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-md shadow-emerald-500/20"
                  >
                    Recharge Student Card
                  </button>
                  <button
                    onClick={() => setActiveTab('child')}
                    className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition"
                  >
                    View Guardian Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: CARD & AUTOPAY */}
        {/* ========================================================================= */}
        {activeTab === 'payments' && (
          <div className="space-y-6">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 flex flex-col items-center space-y-4">
                <SmartCardGraphic size="md" />

                {/* UPI AutoPay Configuration Box */}
                <div className="w-full p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-emerald-600" />
                      <span className="font-bold text-slate-900">UPI AutoPay / Auto-Reload</span>
                    </div>
                    <button
                      onClick={() => toggleAutoReload(!autoReload.isEnabled)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                        autoReload.isEnabled
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {autoReload.isEnabled ? 'Enabled' : 'Disabled'}
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-500 leading-snug">
                    Zero-MDR automated top-up: Adds ₹{autoReload.reloadAmount} whenever balance drops below ₹{autoReload.threshold}.
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex justify-between text-slate-500 text-[11px]">
                    <span>Linked VPA:</span>
                    <span className="font-mono font-bold text-slate-800">{autoReload.upiVpa}</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">
                    Recharge Dummy's SmartTransit Card
                  </h3>
                  <p className="text-xs text-slate-500">
                    Instant digital top-up via Google Pay, Zero-MDR UPI or Semester Pass.
                  </p>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Current Card Balance
                    </span>
                    <span className="text-2xl font-black text-slate-900 font-mono">₹{card.balance}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                    Active • {card.maskedNumber}
                  </span>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Choose Amount to Add
                  </span>
                  <div className="grid grid-cols-4 gap-3">
                    {[100, 250, 500, 1000].map(amt => (
                      <button
                        key={amt}
                        onClick={() => setIsPaymentModalOpen(true)}
                        className="p-3.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 text-slate-800 font-bold transition text-center"
                      >
                        <span className="text-xs text-slate-400">₹</span>
                        <span className="text-base font-mono">{amt}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setIsPaymentModalOpen(true)}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/25 transition flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Open Payment Gateway Simulation</span>
                </button>
              </div>
            </div>

            {/* Payment History Table */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">Payment & Fare History</h3>
                  <p className="text-xs text-slate-500">Complete ledger of recharges, AutoPay triggers and concession transit fares</p>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search transaction..."
                    value={paymentSearch}
                    onChange={e => setPaymentSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider font-bold">
                      <th className="py-3 px-2">Date & Time</th>
                      <th className="py-3 px-2">Description</th>
                      <th className="py-3 px-2">Type</th>
                      <th className="py-3 px-2">Amount</th>
                      <th className="py-3 px-2">Balance</th>
                      <th className="py-3 px-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredTransactions.map(tx => (
                      <tr key={tx.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3 px-2 font-mono text-slate-600">
                          {tx.date} • {tx.timestamp}
                        </td>
                        <td className="py-3 px-2 font-medium text-slate-900">
                          <div>{tx.description}</div>
                          <div className="text-[10px] text-slate-400 font-mono">Ref: {tx.transactionId}</div>
                        </td>
                        <td className="py-3 px-2">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            tx.type === 'RECHARGE' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {tx.type}
                          </span>
                        </td>
                        <td className="py-3 px-2 font-bold font-mono text-sm">
                          <span className={tx.type === 'RECHARGE' ? 'text-emerald-700' : 'text-slate-900'}>
                            {tx.type === 'RECHARGE' ? `+₹${tx.amount}` : `-₹${tx.amount}`}
                          </span>
                        </td>
                        <td className="py-3 px-2 font-mono text-slate-600">
                          ₹{tx.balanceAfter}
                        </td>
                        <td className="py-3 px-2">
                          <span className="text-emerald-700 font-bold">✓ {tx.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: JOURNEY HISTORY */}
        {/* ========================================================================= */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 font-heading">
                  Student Journey Logs
                </h2>
                <p className="text-xs text-slate-500">
                  Historical archive of completed bus trips and boarding stamps.
                </p>
              </div>
              <button
                onClick={() => alert('Exporting journey logs as PDF...')}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export PDF</span>
              </button>
            </div>

            <div className="space-y-3">
              {[
                { date: '17 Aug 2026', time: '08:08 AM', bus: 'ST-102', route: 'Pala → College', status: 'In Progress', fare: 10 },
                { date: '16 Aug 2026', time: '04:35 PM', bus: 'ST-102', route: 'College → Pala', status: 'Completed', fare: 10 },
                { date: '16 Aug 2026', time: '08:05 AM', bus: 'ST-102', route: 'Pala → College', status: 'Completed', fare: 10 },
                { date: '15 Aug 2026', time: '04:40 PM', bus: 'ST-102', route: 'College → Pala', status: 'Completed', fare: 10 },
                { date: '15 Aug 2026', time: '08:10 AM', bus: 'ST-102', route: 'Pala → College', status: 'Completed', fare: 10 },
              ].map((trip, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                      <Bus className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{trip.route} ({trip.bus})</h4>
                      <p className="text-[10px] text-slate-400 font-mono">{trip.date} • {trip.time}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-700 font-mono">₹{trip.fare} (50% Concession)</span>
                    <span className="block text-[10px] text-slate-500">{trip.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: SAFETY ALERTS & NOTIFICATIONS */}
        {/* ========================================================================= */}
        {activeTab === 'alerts' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 font-heading">
                  Parent Safety Alerts & Notifications
                </h2>
                <p className="text-xs text-slate-500">
                  Instant logs of child boarding, bus delay advisories, and payment receipts with SMS Dual Delivery.
                </p>
              </div>

              <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
                {(['all', 'journey', 'payment', 'safety', 'system'] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setAlertFilter(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition ${
                      alertFilter === cat
                        ? 'bg-white text-blue-700 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {parentNotifications.map(item => (
                <div
                  key={item.id}
                  className={`p-5 rounded-2xl bg-white border shadow-xs transition flex items-start gap-4 ${
                    !item.read ? 'border-blue-300 bg-blue-50/25' : 'border-slate-200'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl shrink-0 ${
                    item.category === 'journey'
                      ? 'bg-blue-100 text-blue-700'
                      : item.category === 'payment'
                      ? 'bg-emerald-100 text-emerald-700'
                      : item.category === 'safety'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    <Bell className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                        {item.sentViaSms && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                            SMS Sent
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400 font-mono shrink-0">{item.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
