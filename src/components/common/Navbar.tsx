import React, { useState } from 'react';
import { useTransit } from '../../context/TransitContext';
import type { UserRole } from '../../types/transit';
import {
  Bus,
  CreditCard,
  Bell,
  ShieldCheck,
  Zap,
  Menu,
  X,
  SmartphoneNfc,
  ExternalLink,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    role,
    setRole,
    unreadNotificationCount,
    notifications,
    markAllNotificationsAsRead,
    card,
    setIsNfcModalOpen,
    setIsPaymentModalOpen,
    bus,
  } = useTransit();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);

  const roleNavItems: { key: UserRole; label: string; icon: React.ReactNode; badge?: string }[] = [
    { key: 'landing', label: 'Overview', icon: <ExternalLink className="w-4 h-4" /> },
    { key: 'student', label: 'Student Portal', icon: <CreditCard className="w-4 h-4" />, badge: 'Ajay' },
    { key: 'parent', label: 'Parent Portal', icon: <ShieldCheck className="w-4 h-4" />, badge: 'Live Tracking' },
    { key: 'operator', label: 'Bus Console', icon: <Bus className="w-4 h-4" />, badge: 'ST-102' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => setRole('landing')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Bus className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 font-heading">
                  Smart<span className="text-blue-600">Transit</span>
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  LIVE
                </span>
              </div>
            </div>
          </div>

          {/* Role Navigation Switcher (Desktop) */}
          <nav className="hidden md:flex items-center p-1 bg-slate-100/90 rounded-xl border border-slate-200/80">
            {roleNavItems.map(item => {
              const isActive = role === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setRole(item.key)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 relative ${
                    isActive
                      ? 'bg-white text-blue-700 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-full font-semibold ${
                        isActive ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Action Trigger Buttons & Notification */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick NFC Tap simulation button */}
            <button
              onClick={() => setIsNfcModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200/80 text-xs font-semibold transition shadow-2xs hover:scale-102"
              title="Simulate NFC Smart Card Tap on Bus"
            >
              <SmartphoneNfc className="w-3.5 h-3.5 animate-pulse text-blue-600" />
              <span className="hidden sm:inline">Tap Card</span>
            </button>

            {/* Quick Balance Pill */}
            <button
              onClick={() => setIsPaymentModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 text-xs font-semibold transition shadow-2xs"
              title="Card Balance - Click to Recharge"
            >
              <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
              <span>₹{card.balance}</span>
              <span className="hidden sm:inline text-[10px] bg-emerald-200/70 text-emerald-900 px-1 rounded font-bold">+Top Up</span>
            </button>

            {/* Notification Center Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotifDropdownOpen(!isNotifDropdownOpen)}
                className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 relative transition"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotificationCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                    {unreadNotificationCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {isNotifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">Notifications</span>
                      <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                        {notifications.length} alerts
                      </span>
                    </div>
                    {unreadNotificationCount > 0 && (
                      <button
                        onClick={markAllNotificationsAsRead}
                        className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-slate-500 text-xs">No notifications yet</div>
                    ) : (
                      notifications.slice(0, 6).map(item => (
                        <div
                          key={item.id}
                          className={`p-3.5 hover:bg-slate-50 transition flex items-start gap-3 ${
                            !item.read ? 'bg-blue-50/40' : ''
                          }`}
                        >
                          <div className={`p-2 rounded-lg shrink-0 ${
                            item.category === 'journey'
                              ? 'bg-blue-100 text-blue-700'
                              : item.category === 'payment'
                              ? 'bg-emerald-100 text-emerald-700'
                              : item.category === 'safety'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            <Zap className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <h5 className="text-xs font-bold text-slate-900 truncate">{item.title}</h5>
                              <span className="text-[10px] text-slate-400 font-mono shrink-0">{item.timestamp}</span>
                            </div>
                            <p className="text-xs text-slate-600 mt-0.5 leading-snug line-clamp-2">{item.message}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="pt-2 px-4 border-t border-slate-100 flex justify-between items-center text-xs">
                    <span className="text-slate-400">Bus {bus.busId} • Telemetry Active</span>
                    <button
                      onClick={() => {
                        setRole('parent');
                        setIsNotifDropdownOpen(false);
                      }}
                      className="text-blue-600 font-semibold hover:underline"
                    >
                      View All Alerts →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 md:hidden rounded-xl text-slate-600 hover:bg-slate-100"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white/95 backdrop-blur-md px-4 pt-2 pb-4 space-y-2">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 pt-1">Select View</div>
          {roleNavItems.map(item => (
            <button
              key={item.key}
              onClick={() => {
                setRole(item.key);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                role === item.key
                  ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
