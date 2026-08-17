import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type {
  UserRole,
  Student,
  Parent,
  SmartCard,
  BusTelemetry,
  RouteStop,
  Journey,
  Transaction,
  NotificationItem,
  AutoReloadSettings,
} from '../types/transit';
import {
  initialStudent,
  initialParent,
  initialCard,
  initialBusTelemetry,
  initialAutoReload,
  routeStops as initialRouteStops,
  routeCoordinates,
  initialJourney,
  initialTransactions,
  initialNotifications,
} from '../data/mockData';
import { soundEffects } from '../utils/audio';

interface TransitContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  student: Student;
  parent: Parent;
  card: SmartCard;
  bus: BusTelemetry;
  stops: RouteStop[];
  journey: Journey;
  transactions: Transaction[];
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  autoReload: AutoReloadSettings;
  
  // Modals & UI States
  isNfcModalOpen: boolean;
  setIsNfcModalOpen: (open: boolean) => void;
  isPaymentModalOpen: boolean;
  setIsPaymentModalOpen: (open: boolean) => void;
  isDigitalQrModalOpen: boolean;
  setIsDigitalQrModalOpen: (open: boolean) => void;
  isPrivacyModalOpen: boolean;
  setIsPrivacyModalOpen: (open: boolean) => void;
  activeToast: { title: string; message: string; type: 'info' | 'success' | 'warning' | 'danger' } | null;
  dismissToast: () => void;

  // Simulation Actions
  isSimulating: boolean;
  setIsSimulating: (simulating: boolean) => void;
  simulationStep: number;
  handleNfcTap: (customFare?: number, bypassAntiPassback?: boolean) => void;
  handleRecharge: (amount: number, method: 'UPI' | 'GOOGLE_PAY' | 'CARD' | 'AUTO_RELOAD') => Promise<{ success: boolean; transactionId: string }>;
  advanceBusStop: () => void;
  simulateBusDelay: (minutes?: number) => void;
  toggleGpsSignal: () => void;
  toggleCardFreeze: () => void;
  toggleOfflineMode: () => void;
  toggleAutoReload: (enabled: boolean, threshold?: number, amount?: number) => void;
  triggerEmergencySos: () => void;
  resetSimulation: () => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
}

const TransitContext = createContext<TransitContextType | undefined>(undefined);

export const TransitProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem('st_role');
    return (saved as UserRole) || 'landing';
  });
  const [student] = useState<Student>(initialStudent);
  const [parent] = useState<Parent>(initialParent);
  
  const [card, setCard] = useState<SmartCard>(() => {
    const saved = localStorage.getItem('st_card');
    return saved ? JSON.parse(saved) : initialCard;
  });
  const [bus, setBus] = useState<BusTelemetry>(() => {
    const saved = localStorage.getItem('st_bus');
    return saved ? JSON.parse(saved) : initialBusTelemetry;
  });
  const [stops, setStops] = useState<RouteStop[]>(() => {
    const saved = localStorage.getItem('st_stops');
    return saved ? JSON.parse(saved) : initialRouteStops;
  });
  const [journey, setJourney] = useState<Journey>(() => {
    const saved = localStorage.getItem('st_journey');
    return saved ? JSON.parse(saved) : initialJourney;
  });
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('st_transactions');
    return saved ? JSON.parse(saved) : initialTransactions;
  });
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('st_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });
  const [autoReload, setAutoReload] = useState<AutoReloadSettings>(() => {
    const saved = localStorage.getItem('st_auto_reload');
    return saved ? JSON.parse(saved) : initialAutoReload;
  });

  // Modals & Toasts
  const [isNfcModalOpen, setIsNfcModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isDigitalQrModalOpen, setIsDigitalQrModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [activeToast, setActiveToast] = useState<{ title: string; message: string; type: 'info' | 'success' | 'warning' | 'danger' } | null>(null);

  // Simulation state
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState(() => {
    const saved = localStorage.getItem('st_simulation_step');
    return saved ? parseInt(saved, 10) : 7;
  });

  // Sync state changes back to localStorage
  useEffect(() => {
    localStorage.setItem('st_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('st_card', JSON.stringify(card));
  }, [card]);

  useEffect(() => {
    localStorage.setItem('st_bus', JSON.stringify(bus));
  }, [bus]);

  useEffect(() => {
    localStorage.setItem('st_stops', JSON.stringify(stops));
  }, [stops]);

  useEffect(() => {
    localStorage.setItem('st_journey', JSON.stringify(journey));
  }, [journey]);

  useEffect(() => {
    localStorage.setItem('st_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('st_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('st_auto_reload', JSON.stringify(autoReload));
  }, [autoReload]);

  useEffect(() => {
    localStorage.setItem('st_simulation_step', simulationStep.toString());
  }, [simulationStep]);


  const showToast = useCallback((title: string, message: string, type: 'info' | 'success' | 'warning' | 'danger' = 'info') => {
    setActiveToast({ title, message, type });
    const timer = setTimeout(() => {
      setActiveToast(null);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  const dismissToast = () => setActiveToast(null);

  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // 1. NFC Smart Card Tap Flow with Anti-Passback & Offline Cryptography
  const handleNfcTap = (customFare: number = 10, bypassAntiPassback: boolean = false) => {
    if (card.status === 'BLOCKED') {
      showToast('Card Blocked', 'This card is currently blocked. Please contact the administrator.', 'danger');
      return;
    }

    const nowTimestamp = Date.now();

    // Anti-Passback check (prevent rapid double tapping)
    if (!bypassAntiPassback && card.lastTapTimestamp && (nowTimestamp - card.lastTapTimestamp) < 15000) {
      showToast(
        'Anti-Passback Blocked',
        '⚠️ Duplicate tap rejected: Card STC-2847 was already verified 10s ago on Bus ST-102.',
        'warning'
      );
      return;
    }

    if (card.balance < customFare) {
      showToast('Insufficient Balance', `Card balance (₹${card.balance}) is lower than fare (₹${customFare}). Recharge required.`, 'warning');
      return;
    }

    soundEffects.playNfcTap();
    const newBalance = card.balance - customFare;
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const isCurrentlyTravelling = journey.status === 'TRAVELLING' || journey.status === 'BOARDED';
    const isOffline = bus.isOfflineMode;

    // Update Card Balance & Anti-Passback Timestamp
    setCard(prev => ({
      ...prev,
      balance: newBalance,
      dailySpent: prev.dailySpent + customFare,
      lastTapTimestamp: nowTimestamp,
    }));

    // Create New Transaction (Noting offline queue status if offline)
    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      transactionId: `STX-2026-00${Math.floor(100 + Math.random() * 900)}`,
      studentId: student.id,
      cardId: card.cardId,
      type: 'BUS_FARE',
      description: isCurrentlyTravelling ? 'Bus Exit Tap (Journey Completed)' : 'Smart Card Boarding (Concession Applied)',
      amount: customFare,
      balanceAfter: newBalance,
      status: 'SUCCESSFUL',
      date: 'Today',
      timestamp: timeString,
      method: 'NFC_TAP',
      referenceId: `NFC-POS-ST102-${Math.floor(1000 + Math.random() * 9000)}`,
      busId: bus.busId,
      stopName: isCurrentlyTravelling ? 'St. Thomas College Campus' : 'Mutholy Junction',
      isOfflineQueued: isOffline,
    };
    setTransactions(prev => [newTx, ...prev]);

    // If offline, increment offline sync queue count on bus terminal
    if (isOffline) {
      setBus(prev => ({
        ...prev,
        offlineQueueCount: prev.offlineQueueCount + 1,
      }));
    }

    if (!isCurrentlyTravelling) {
      // Boarding flow
      setJourney(prev => ({
        ...prev,
        status: 'TRAVELLING',
        boardingTime: timeString,
        timelineEvents: prev.timelineEvents.map(e => e.id === 't2' ? { ...e, isCompleted: true, time: timeString } : e),
      }));

      setBus(prev => ({
        ...prev,
        currentPassengers: Math.min(prev.capacity, prev.currentPassengers + 1),
      }));

      // Create Parent Notification (Sent with SMS fallback if configured)
      const parentNotif: NotificationItem = {
        id: `notif_${Date.now()}_p`,
        targetRole: 'PARENT',
        category: 'journey',
        title: 'Dummy Boarded Bus ST-102',
        message: `Dummy tapped SmartTransit card and boarded Bus ST-102 at ${timeString}. Concession fare ₹${customFare} deducted.`,
        timestamp: timeString,
        read: false,
        busId: 'ST-102',
        urgency: 'normal',
        sentViaSms: true,
      };

      const studentNotif: NotificationItem = {
        id: `notif_${Date.now()}_s`,
        targetRole: 'STUDENT',
        category: 'journey',
        title: 'Boarded Bus ST-102',
        message: `Boarding recorded. Concession fare of ₹${customFare} charged. Current balance: ₹${newBalance}.`,
        timestamp: timeString,
        read: false,
        busId: 'ST-102',
      };

      setNotifications(prev => [parentNotif, studentNotif, ...prev]);

      if (isOffline) {
        showToast(
          'Offline Cryptographic Verification',
          `Mifare DESFire card balance signed offline. ₹${customFare} deducted. Queued for cloud sync.`,
          'info'
        );
      } else {
        showToast('Smart Card Verified', `Boarded Bus ST-102. Concession fare ₹${customFare} deducted. Balance: ₹${newBalance}`, 'success');
      }
    } else {
      // Exit / Arrival Tap
      setJourney(prev => ({
        ...prev,
        status: 'ARRIVED',
        completedTime: timeString,
        timelineEvents: prev.timelineEvents.map(e => ({ ...e, isCompleted: true })),
      }));

      setBus(prev => ({
        ...prev,
        currentPassengers: Math.max(0, prev.currentPassengers - 1),
      }));

      const parentNotif: NotificationItem = {
        id: `notif_${Date.now()}_p_arr`,
        targetRole: 'PARENT',
        category: 'journey',
        title: 'Dummy Arrived at College Campus',
        message: `Dummy completed his journey safely at St. Thomas College Campus at ${timeString}.`,
        timestamp: timeString,
        read: false,
        busId: 'ST-102',
        urgency: 'normal',
        sentViaSms: true,
      };

      setNotifications(prev => [parentNotif, ...prev]);
      showToast('Journey Completed', 'Dummy reached the college safely. Parent notified via Push + SMS.', 'success');
    }

    // Check if Auto-Reload is triggered by low balance threshold
    if (autoReload.isEnabled && newBalance < autoReload.threshold) {
      setTimeout(() => {
        handleRecharge(autoReload.reloadAmount, 'AUTO_RELOAD');
        showToast(
          'UPI AutoPay Triggered',
          `Balance fell below ₹${autoReload.threshold}. Auto-recharged ₹${autoReload.reloadAmount} via UPI.`,
          'info'
        );
      }, 1500);
    }
  };

  // 2. Parent Recharge Flow (UPI / GPay / NetBanking / AutoPay)
  const handleRecharge = async (amount: number, method: 'UPI' | 'GOOGLE_PAY' | 'CARD' | 'AUTO_RELOAD'): Promise<{ success: boolean; transactionId: string }> => {
    return new Promise(resolve => {
      setTimeout(() => {
        soundEffects.playPaymentSuccess();
        const prevBal = card.balance;
        const newBalance = prevBal + amount;
        const txId = `STX-2026-00${Math.floor(100 + Math.random() * 900)}`;
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        setCard(prev => ({
          ...prev,
          balance: newBalance,
          status: 'ACTIVE',
        }));

        const newTx: Transaction = {
          id: `tx_${Date.now()}`,
          transactionId: txId,
          studentId: student.id,
          cardId: card.cardId,
          type: 'RECHARGE',
          description: method === 'AUTO_RELOAD'
            ? `UPI AutoPay Auto-Reload (${autoReload.upiVpa})`
            : `Parent Card Top-Up via ${method === 'GOOGLE_PAY' ? 'Google Pay' : method === 'UPI' ? 'UPI / QR' : 'Debit Card'}`,
          amount: amount,
          balanceAfter: newBalance,
          status: 'SUCCESSFUL',
          date: 'Today',
          timestamp: timeString,
          method: method,
          referenceId: `UPI-REF-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        };
        setTransactions(prev => [newTx, ...prev]);

        // Push Parent & Student Notifications
        const parentNotif: NotificationItem = {
          id: `notif_${Date.now()}_rec_p`,
          targetRole: 'PARENT',
          category: 'payment',
          title: `Recharge Successful: +₹${amount}`,
          message: `₹${amount} successfully added to Dummy's SmartTransit card. Updated balance: ₹${newBalance}.`,
          timestamp: timeString,
          read: false,
          sentViaSms: true,
        };

        const studentNotif: NotificationItem = {
          id: `notif_${Date.now()}_rec_s`,
          targetRole: 'STUDENT',
          category: 'payment',
          title: `Card Recharged: +₹${amount}`,
          message: `Your parent added ₹${amount} to your card. Available balance: ₹${newBalance}.`,
          timestamp: timeString,
          read: false,
        };

        setNotifications(prev => [parentNotif, studentNotif, ...prev]);
        showToast('Payment Successful', `₹${amount} added to Dummy's SmartTransit Card. New balance: ₹${newBalance}`, 'success');

        resolve({ success: true, transactionId: txId });
      }, 1000);
    });
  };

  // 3. Toggle Offline Mode Simulator & Sync Queued Taps
  const toggleOfflineMode = () => {
    setBus(prev => {
      const nextOffline = !prev.isOfflineMode;
      if (!nextOffline && prev.offlineQueueCount > 0) {
        // Flushed offline batch to cloud
        setTimeout(() => {
          showToast(
            'Cellular Reconnected • Offline Queue Synced',
            `Successfully synced ${prev.offlineQueueCount} offline ticket transactions to cloud database.`,
            'success'
          );
        }, 500);
        return {
          ...prev,
          isOfflineMode: false,
          offlineQueueCount: 0,
        };
      } else {
        showToast(
          nextOffline ? 'Cellular Dead Zone Simulated' : 'Cellular Online',
          nextOffline
            ? 'Bus entered offline zone. On-bus POS switched to Mifare DESFire on-chip cryptographic mode.'
            : 'Bus reconnected to 5G network.',
          nextOffline ? 'warning' : 'success'
        );
        return {
          ...prev,
          isOfflineMode: nextOffline,
        };
      }
    });
  };

  // 4. Toggle AutoPay / Auto-Reload
  const toggleAutoReload = (enabled: boolean, threshold: number = 50, amount: number = 500) => {
    setAutoReload(prev => ({
      ...prev,
      isEnabled: enabled,
      threshold,
      reloadAmount: amount,
    }));
    showToast(
      enabled ? 'UPI AutoPay Enabled' : 'UPI AutoPay Disabled',
      enabled
        ? `Card will auto-reload ₹${amount} when balance falls below ₹${threshold}. Zero manual friction.`
        : 'Automated card recharge paused.',
      enabled ? 'success' : 'info'
    );
  };

  // 5. Advance Bus Route Simulation
  const advanceBusStop = useCallback(() => {
    setSimulationStep(prevStep => {
      const nextStep = (prevStep + 1) % routeCoordinates.length;
      const [lat, lng] = routeCoordinates[nextStep];
      const progressFraction = nextStep / (routeCoordinates.length - 1);
      const remainingMinutes = Math.max(1, Math.round(20 * (1 - progressFraction)));

      let currentStopName = 'En Route';
      if (nextStep <= 2) currentStopName = 'Pala Central Bus Terminal';
      else if (nextStep <= 5) currentStopName = 'Mutholy Junction';
      else if (nextStep <= 8) currentStopName = 'Pala Bridge Stop';
      else if (nextStep <= 11) currentStopName = 'Cherpunkal Bypass';
      else currentStopName = 'St. Thomas College Campus Gate';

      setBus(prev => ({
        ...prev,
        currentLocation: {
          lat,
          lng,
          heading: (prev.currentLocation.heading + 15) % 360,
        },
        currentStopName,
        etaMinutes: remainingMinutes,
        speedKmH: nextStep === routeCoordinates.length - 1 ? 0 : Math.floor(28 + Math.random() * 12),
        lastTelemetrySync: 'Just now',
      }));

      if (nextStep === routeCoordinates.length - 1) {
        setJourney(j => ({
          ...j,
          status: 'ARRIVED',
          completedTime: '08:42 AM',
          timelineEvents: j.timelineEvents.map(e => ({ ...e, isCompleted: true })),
        }));
        showToast('Destination Reached', 'Bus ST-102 arrived at St. Thomas College Campus Gate.', 'success');
      } else if (nextStep >= 10) {
        setJourney(j => ({
          ...j,
          status: 'APPROACHING',
          timelineEvents: j.timelineEvents.map((e, idx) => idx <= 3 ? { ...e, isCompleted: true } : e),
        }));
      }

      setStops(prevStops =>
        prevStops.map((stop, idx) => {
          const stopThreshold = (idx / (prevStops.length - 1)) * (routeCoordinates.length - 1);
          const isPassed = nextStep > stopThreshold;
          const isCurrent = Math.abs(nextStep - stopThreshold) <= 1.5;
          return { ...stop, isPassed, isCurrent };
        })
      );

      return nextStep;
    });
  }, [showToast]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isSimulating) {
      interval = setInterval(() => {
        advanceBusStop();
      }, 3500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSimulating, advanceBusStop]);

  const simulateBusDelay = (minutes: number = 10) => {
    soundEffects.playAlertPing();
    setBus(prev => ({
      ...prev,
      status: 'DELAYED',
      delayMinutes: minutes,
      etaMinutes: prev.etaMinutes + minutes,
    }));

    const delayNotif: NotificationItem = {
      id: `notif_${Date.now()}_delay`,
      targetRole: 'ALL',
      category: 'safety',
      title: `Bus ST-102 Delayed by ~${minutes} Mins`,
      message: `Bus ST-102 is experiencing minor traffic congestion near Pala Bridge. Revised arrival at college: 08:52 AM.`,
      timestamp: '08:32 AM',
      read: false,
      busId: 'ST-102',
      urgency: 'high',
      sentViaSms: true,
    };

    setNotifications(prev => [delayNotif, ...prev]);
    showToast('Delay Alert Dispatched', `Parents & students notified via Push + SMS: Bus delayed by ~${minutes} minutes.`, 'warning');
  };

  const toggleGpsSignal = () => {
    setBus(prev => {
      const isCurrentlyConnected = prev.gpsStatus === 'CONNECTED';
      const newStatus = isCurrentlyConnected ? 'DISCONNECTED' : 'CONNECTED';
      showToast(
        isCurrentlyConnected ? 'GPS Lost' : 'GPS Signal Restored',
        isCurrentlyConnected
          ? 'Bus ST-102 GPS signal dropped. Showing last known telemetry waypoint.'
          : 'High-precision GPS telemetry re-established (5m accuracy).',
        isCurrentlyConnected ? 'warning' : 'success'
      );
      return {
        ...prev,
        gpsStatus: newStatus,
      };
    });
  };

  const toggleCardFreeze = () => {
    setCard(prev => {
      const isBlocked = prev.status === 'BLOCKED';
      const nextStatus = isBlocked ? 'ACTIVE' : 'BLOCKED';
      showToast(
        isBlocked ? 'Card Unblocked' : 'Card Blocked',
        isBlocked
          ? 'SmartTransit card reactivated. NFC tap & concession fares enabled.'
          : 'SmartTransit card has been temporarily locked by parent/admin.',
        isBlocked ? 'success' : 'danger'
      );
      return {
        ...prev,
        status: nextStatus,
      };
    });
  };

  const triggerEmergencySos = () => {
    soundEffects.playAlertPing();
    setBus(prev => ({
      ...prev,
      emergencyStatus: 'SOS_TRIGGERED',
    }));

    const sosNotif: NotificationItem = {
      id: `notif_${Date.now()}_sos`,
      targetRole: 'ALL',
      category: 'safety',
      title: '🚨 Emergency SOS Diagnostic Triggered',
      message: 'Bus ST-102 operator console triggered emergency broadcast test. Campus safety desk notified.',
      timestamp: 'Just now',
      read: false,
      busId: 'ST-102',
      urgency: 'critical',
      sentViaSms: true,
    };

    setNotifications(prev => [sosNotif, ...prev]);
    showToast('Emergency SOS Broadcasted', 'Campus security desk and parent emergency channel notified.', 'danger');
  };

  const resetSimulation = () => {
    localStorage.removeItem('st_role');
    localStorage.removeItem('st_card');
    localStorage.removeItem('st_bus');
    localStorage.removeItem('st_stops');
    localStorage.removeItem('st_journey');
    localStorage.removeItem('st_transactions');
    localStorage.removeItem('st_notifications');
    localStorage.removeItem('st_auto_reload');
    localStorage.removeItem('st_simulation_step');

    setCard(initialCard);
    setBus(initialBusTelemetry);
    setStops(initialRouteStops);
    setJourney(initialJourney);
    setTransactions(initialTransactions);
    setNotifications(initialNotifications);
    setAutoReload(initialAutoReload);
    setSimulationStep(7);
    setIsSimulating(false);
    showToast('Simulation Reset', 'All transit parameters, balances, and routes restored to initial demo state.', 'info');
  };


  return (
    <TransitContext.Provider
      value={{
        role,
        setRole,
        student,
        parent,
        card,
        bus,
        stops,
        journey,
        transactions,
        notifications,
        unreadNotificationCount,
        autoReload,
        isNfcModalOpen,
        setIsNfcModalOpen,
        isPaymentModalOpen,
        setIsPaymentModalOpen,
        isDigitalQrModalOpen,
        setIsDigitalQrModalOpen,
        isPrivacyModalOpen,
        setIsPrivacyModalOpen,
        activeToast,
        dismissToast,
        isSimulating,
        setIsSimulating,
        simulationStep,
        handleNfcTap,
        handleRecharge,
        advanceBusStop,
        simulateBusDelay,
        toggleGpsSignal,
        toggleCardFreeze,
        toggleOfflineMode,
        toggleAutoReload,
        triggerEmergencySos,
        resetSimulation,
        markNotificationAsRead,
        markAllNotificationsAsRead,
      }}
    >
      {children}
    </TransitContext.Provider>
  );
};

export const useTransit = (): TransitContextType => {
  const context = useContext(TransitContext);
  if (!context) {
    throw new Error('useTransit must be used within a TransitProvider');
  }
  return context;
};
