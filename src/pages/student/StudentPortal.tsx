import React, { useState } from 'react';
import { useTransit } from '../../context/TransitContext';
import { SmartCardGraphic } from '../../components/common/SmartCardGraphic';
import { LiveMap } from '../../components/common/LiveMap';
import {
  Home,
  User,
  Navigation,
  CreditCard,
  Bell,
  Bus,
  Sparkles,
  ArrowRight,
  Lock,
  Unlock,
  Phone,
  School,
  ChevronRight,
  TrendingDown,
  TrendingUp,
  QrCode,
} from 'lucide-react';

export const StudentPortal: React.FC = () => {
  const {
    student,
    card,
    bus,
    journey,
    transactions,
    notifications,
    setIsNfcModalOpen,
    setIsDigitalQrModalOpen,
    toggleCardFreeze,
    setRole,
  } = useTransit();

  const [activeTab, setActiveTab] = useState<'home' | 'profile' | 'journey' | 'card' | 'notifications'>('home');
  const [notificationFilter, setNotificationFilter] = useState<'all' | 'journey' | 'payment' | 'safety'>('all');

  const studentTransactions = transactions.filter(t => t.studentId === student.id);
  const studentNotifications = notifications.filter(
    n => (n.targetRole === 'STUDENT' || n.targetRole === 'ALL') &&
         (notificationFilter === 'all' || n.category === notificationFilter)
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-28">
      {/* Subheader Navigation Bar for Student Portal */}
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
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  activeTab === 'profile'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <User className="w-4 h-4" />
                <span>My Profile</span>
              </button>

              <button
                onClick={() => setActiveTab('journey')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  activeTab === 'journey'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Navigation className="w-4 h-4" />
                <span>My Journey</span>
              </button>

              <button
                onClick={() => setActiveTab('card')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  activeTab === 'card'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>My Smart Card</span>
              </button>

              <button
                onClick={() => setActiveTab('notifications')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  activeTab === 'notifications'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Bell className="w-4 h-4" />
                <span>Notifications</span>
              </button>
            </div>

            {/* Quick QR button + parent link */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsDigitalQrModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold transition"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Digital QR Pass</span>
              </button>

              <button
                onClick={() => setRole('parent')}
                className="hidden sm:flex items-center gap-1.5 text-xs text-blue-600 font-semibold hover:underline"
              >
                <span>Parent View</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* ========================================================================= */}
        {/* TAB 1: STUDENT HOME */}
        {/* ========================================================================= */}
        {activeTab === 'home' && (
          <div className="space-y-6">
            {/* Header Greeting */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-6 sm:p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10 space-y-1">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-500/30 text-blue-200 text-[11px] font-bold border border-blue-400/30">
                  <Sparkles className="w-3 h-3 text-blue-300" />
                  <span>Student Mobility Console</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                  Welcome back, Ajay 👋
                </h1>
                <p className="text-xs sm:text-sm text-slate-300">
                  Here's your journey and smart concession status at a glance.
                </p>
              </div>

              <div className="relative z-10 flex items-center gap-2.5">
                <button
                  onClick={() => setIsNfcModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg transition flex items-center gap-1.5"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Tap Bus Card</span>
                </button>
                <button
                  onClick={() => setIsDigitalQrModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg transition flex items-center gap-1.5"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Backup QR</span>
                </button>
              </div>
            </div>

            {/* Dashboard 3-Column Summary Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* 1. Student Summary Card */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Student Identity
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Verified
                    </span>
                  </div>

                  <div className="flex items-center gap-3.5 mt-4">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-blue-500 shadow-md"
                    />
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900">{student.name}</h3>
                      <p className="text-xs text-blue-600 font-mono font-bold">ID: {student.studentId}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{student.course}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Institution</span>
                      <span className="font-semibold text-slate-800 truncate max-w-[170px]">{student.institution}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Card Status</span>
                      <span className="font-bold text-emerald-600">Active • {card.maskedNumber}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('profile')}
                  className="mt-5 w-full py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold transition flex items-center justify-center gap-1.5"
                >
                  <span>View Full Profile</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </button>
              </div>

              {/* 2. Current Journey Card */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Current Journey
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      journey.status === 'TRAVELLING' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-800'
                    }`}>
                      {journey.status}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">Assigned Bus</span>
                      <span className="text-sm font-extrabold text-blue-700 font-mono">ST-102</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">Route</span>
                      <span className="text-xs font-bold text-slate-800">Pala → St. Thomas College</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">Current Stop</span>
                      <span className="text-xs font-bold text-slate-800">{bus.currentStopName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">Estimated Arrival</span>
                      <span className="text-xs font-extrabold text-emerald-700">{bus.etaMinutes} minutes remaining</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('journey')}
                  className="mt-5 w-full py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition flex items-center justify-center gap-1.5"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>View Live Journey</span>
                </button>
              </div>

              {/* 3. Card Balance Card */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Card Balance
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {card.status}
                    </span>
                  </div>

                  <div className="mt-4">
                    <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Available Balance</span>
                    <div className="text-3xl font-black text-slate-900 font-mono mt-0.5">
                      ₹{card.balance}
                    </div>
                    <p className="text-xs font-semibold text-blue-600 mt-1">
                      {card.concessionType} (50% Off)
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex justify-between">
                    <span>Valid Through: {card.validity}</span>
                    <span>Anti-Passback: Active</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('card')}
                  className="mt-5 w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center justify-center gap-1.5"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>View Digital Card</span>
                </button>
              </div>
            </div>

            {/* Today's Journey Timeline & Mini Map */}
            <div className="grid lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6 p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="font-extrabold text-base text-slate-900">Today's Journey Timeline</h3>
                  <span className="text-xs text-slate-500 font-medium">17 Aug 2026</span>
                </div>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {journey.timelineEvents.map(event => (
                    <div key={event.id} className="relative group">
                      <div className={`absolute -left-6 top-1 w-4 h-4 rounded-full border-2 border-white shadow-xs transition ${
                        event.isCompleted ? 'bg-emerald-600 ring-4 ring-emerald-100' : 'bg-slate-300'
                      }`} />
                      <div className="flex items-baseline justify-between gap-2">
                        <h4 className="text-xs font-bold text-slate-900">{event.title}</h4>
                        <span className="text-[10px] font-mono text-slate-400 shrink-0">{event.time}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 leading-snug">{event.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6 p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                    <h3 className="font-extrabold text-base text-slate-900">Live Bus Route ST-102</h3>
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                      {bus.speedKmH} km/h • On Route
                    </span>
                  </div>
                  <LiveMap heightClass="h-64 sm:h-72" />
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Driver: Rahul M. ({bus.driverRating} ★)</span>
                  <span className="font-bold text-blue-600">Pala → St. Thomas College</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: STUDENT PROFILE */}
        {/* ========================================================================= */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-6">
              <img
                src={student.avatar}
                alt={student.name}
                className="w-24 h-24 rounded-3xl object-cover border-4 border-blue-600 shadow-lg"
              />
              <div className="space-y-1 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h2 className="text-2xl font-extrabold text-slate-900 font-heading">{student.name}</h2>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                    Student ID: {student.studentId}
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-600">{student.course} • {student.year}</p>
                <p className="text-xs text-slate-500">{student.institution}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <School className="w-5 h-5 text-blue-600" />
                  <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">
                    Academic & Enrollment
                  </h3>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-400">Roll Number</span>
                    <span className="font-bold text-slate-800 font-mono">{student.rollNo}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-400">Current Semester</span>
                    <span className="font-bold text-slate-800">{student.semester}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-400">Institution</span>
                    <span className="font-bold text-slate-800">{student.institution}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-400">Blood Group</span>
                    <span className="font-bold text-rose-600 font-mono">{student.bloodGroup}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Phone className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">
                    Guardian & Safety Contacts
                  </h3>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-400">Parent / Guardian</span>
                    <span className="font-bold text-slate-800">{student.guardianName} ({student.guardianRelation})</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-400">Primary Phone</span>
                    <span className="font-bold text-slate-800 font-mono">{student.guardianPhone}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-400">Emergency Hot-Line</span>
                    <span className="font-bold text-slate-800 font-mono">{student.emergencyContact}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-400">Pickup Stop</span>
                    <span className="font-bold text-slate-800">{student.pickupStop}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Bus className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">
                    Assigned Transit Route
                  </h3>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-400">Registered Bus</span>
                    <span className="font-bold text-blue-700 font-mono">Bus {student.registeredBusId}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-400">Route Allotment</span>
                    <span className="font-bold text-slate-800">{student.assignedRoute}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-400">Driver</span>
                    <span className="font-bold text-slate-800">{bus.driverName} ({bus.driverPhone})</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <CreditCard className="w-5 h-5 text-teal-600" />
                  <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">
                    Concession Card Credentials
                  </h3>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-400">Card Number</span>
                    <span className="font-bold text-slate-800 font-mono">{card.cardNumber}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-400">Concession Discount</span>
                    <span className="font-bold text-emerald-700 font-mono">{student.concessionDiscount}% State Concession</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-400">Card Validity</span>
                    <span className="font-bold text-slate-800 font-mono">{student.validityDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: MY JOURNEY */}
        {/* ========================================================================= */}
        {activeTab === 'journey' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 font-heading">
                  Active Bus Journey Timeline
                </h2>
                <p className="text-xs text-slate-500">
                  Bus ST-102 • Pala Central → St. Thomas College Campus Gate
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsNfcModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition"
                >
                  Tap NFC Card
                </button>
                <button
                  onClick={() => setIsDigitalQrModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition"
                >
                  Backup QR Pass
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7">
                <LiveMap heightClass="h-96 sm:h-[460px]" />
              </div>

              <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">
                    Journey Details
                  </h3>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                    {journey.status}
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Date</span>
                    <span className="font-bold text-slate-800">{journey.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Boarding Time</span>
                    <span className="font-bold text-slate-800 font-mono">{journey.boardingTime || '08:08 AM'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Boarding Stop</span>
                    <span className="font-bold text-slate-800">{journey.startStop}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Fare Charged</span>
                    <span className="font-bold text-emerald-700 font-mono">₹{journey.fareCharged} (50% Concession)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Vehicle Speed</span>
                    <span className="font-bold text-blue-700 font-mono">{bus.speedKmH} km/h</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Checkpoints</h4>
                  <div className="space-y-3 pl-4 border-l-2 border-blue-500/30 text-xs">
                    {journey.timelineEvents.map(e => (
                      <div key={e.id} className="relative">
                        <span className="font-bold text-slate-900 block">{e.title}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{e.time}</span>
                        <p className="text-[11px] text-slate-500 mt-0.5">{e.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: MY SMART CARD */}
        {/* ========================================================================= */}
        {activeTab === 'card' && (
          <div className="space-y-6">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 flex flex-col items-center space-y-6">
                <SmartCardGraphic size="lg" />

                <div className="w-full max-w-md p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">Card Remote Lock</span>
                    <button
                      onClick={toggleCardFreeze}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition text-xs ${
                        card.status === 'BLOCKED'
                          ? 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                          : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      }`}
                    >
                      {card.status === 'BLOCKED' ? (
                        <>
                          <Lock className="w-3.5 h-3.5" />
                          <span>Card Blocked (Tap to Unlock)</span>
                        </>
                      ) : (
                        <>
                          <Unlock className="w-3.5 h-3.5" />
                          <span>Card Active (Tap to Lock)</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex justify-between text-slate-500">
                    <span>Anti-Passback Protection</span>
                    <span className="font-bold text-emerald-700">15 min cooldown active</span>
                  </div>

                  <div className="flex justify-between text-slate-500">
                    <span>Backup QR Pass</span>
                    <button
                      onClick={() => setIsDigitalQrModalOpen(true)}
                      className="text-indigo-600 font-bold hover:underline"
                    >
                      Open TOTP QR →
                    </button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6">
                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900">Card Specification</h3>
                      <p className="text-xs text-slate-500">Official Student Concession & Mobility Pass</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 font-mono">
                      ₹{card.balance}
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-400 font-bold block">Card Number</span>
                      <span className="text-sm font-bold text-slate-900 font-mono">{card.cardNumber}</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-400 font-bold block">RFID UID</span>
                      <span className="text-sm font-bold text-slate-900 font-mono">{card.rfidUid}</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-400 font-bold block">Concession Type</span>
                      <span className="text-sm font-bold text-emerald-700">{card.concessionType}</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-400 font-bold block">Validity</span>
                      <span className="text-sm font-bold text-slate-900 font-mono">{card.validity}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h3 className="font-extrabold text-base text-slate-900">Recent Transactions</h3>
                    <span className="text-xs font-bold text-slate-500 font-mono">{studentTransactions.length} entries</span>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {studentTransactions.map(tx => (
                      <div key={tx.id} className="py-3.5 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                            tx.type === 'RECHARGE' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {tx.type === 'RECHARGE' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-slate-900">{tx.description}</h4>
                            <p className="text-[10px] text-slate-400 font-mono">{tx.date} • {tx.timestamp} • Ref: {tx.transactionId}</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className={`text-sm font-bold font-mono ${
                            tx.type === 'RECHARGE' ? 'text-emerald-700' : 'text-slate-900'
                          }`}>
                            {tx.type === 'RECHARGE' ? `+₹${tx.amount}` : `-₹${tx.amount}`}
                          </span>
                          <span className="block text-[10px] text-slate-400 font-mono">Bal: ₹{tx.balanceAfter}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: NOTIFICATIONS */}
        {/* ========================================================================= */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 font-heading">
                  Student Notifications & Alerts
                </h2>
                <p className="text-xs text-slate-500">
                  Stay updated on bus timings, concession deductions, and campus arrivals.
                </p>
              </div>

              <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
                {(['all', 'journey', 'payment', 'safety'] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setNotificationFilter(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition ${
                      notificationFilter === cat
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
              {studentNotifications.map(notif => (
                <div
                  key={notif.id}
                  className={`p-5 rounded-2xl bg-white border shadow-xs transition flex items-start gap-4 ${
                    !notif.read ? 'border-blue-300 bg-blue-50/30' : 'border-slate-200'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl shrink-0 ${
                    notif.category === 'journey'
                      ? 'bg-blue-100 text-blue-700'
                      : notif.category === 'payment'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    <Bell className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-bold text-slate-900">{notif.title}</h4>
                      <span className="text-xs text-slate-400 font-mono shrink-0">{notif.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{notif.message}</p>
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
