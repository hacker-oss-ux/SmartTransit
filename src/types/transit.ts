export type UserRole = 'landing' | 'student' | 'parent' | 'operator';

export type JourneyStatus = 'NOT_BOARDED' | 'BOARDED' | 'TRAVELLING' | 'APPROACHING' | 'ARRIVED';

export type CardStatus = 'ACTIVE' | 'BLOCKED' | 'LOW_BALANCE';

export type BusStatus = 'ACTIVE' | 'DELAYED' | 'STOPPED' | 'MAINTENANCE';

export type ConnectionStatus = 'CONNECTED' | 'WEAK' | 'OFFLINE' | 'DISCONNECTED';

export interface Student {
  id: string;
  studentId: string;
  name: string;
  avatar: string;
  institution: string;
  course: string;
  year: string;
  semester: string;
  rollNo: string;
  guardianName: string;
  guardianPhone: string;
  guardianRelation: string;
  registeredBusId: string;
  assignedRoute: string;
  cardId: string;
  concessionStatus: string;
  concessionDiscount: number;
  validityDate: string;
  emergencyContact: string;
  bloodGroup: string;
  pickupStop: string;
  dropStop: string;
  digitalQrToken?: string;
}

export interface Parent {
  id: string;
  name: string;
  relationship: string;
  email: string;
  phone: string;
  address: string;
  studentIds: string[];
}

export interface AutoReloadSettings {
  isEnabled: boolean;
  threshold: number; // e.g. ₹50
  reloadAmount: number; // e.g. ₹500
  upiVpa: string; // "anish.kumar@okhdfcbank"
}

export interface SmartCard {
  cardId: string;
  cardNumber: string;
  maskedNumber: string;
  rfidUid: string;
  studentId: string;
  studentName: string;
  balance: number;
  status: CardStatus;
  concessionType: string;
  validity: string;
  issuedDate: string;
  isNfcEnabled: boolean;
  dailySpendLimit: number;
  dailySpent: number;
  antiPassbackMinutes: number;
  lastTapTimestamp: number | null;
}

export interface RouteStop {
  id: string;
  name: string;
  shortCode: string;
  lat: number;
  lng: number;
  scheduledTime: string;
  actualTime?: string;
  isPassed: boolean;
  isCurrent: boolean;
  isDestination?: boolean;
}

export interface BusTelemetry {
  busId: string;
  registrationNumber: string;
  model: string;
  driverName: string;
  driverPhone: string;
  driverExperience: string;
  driverRating: number;
  routeId: string;
  routeName: string;
  capacity: number;
  currentPassengers: number;
  speedKmH: number;
  currentLocation: {
    lat: number;
    lng: number;
    heading: number;
  };
  currentStopName: string;
  nextStopName: string;
  etaMinutes: number;
  status: BusStatus;
  gpsStatus: ConnectionStatus;
  nfcStatus: ConnectionStatus;
  emergencyStatus: 'NORMAL' | 'ALERT' | 'SOS_TRIGGERED';
  cctvStatus: 'ONLINE' | 'OFFLINE';
  lastTelemetrySync: string;
  delayMinutes: number;
  isOfflineMode: boolean;
  offlineQueueCount: number;
}

export interface Journey {
  journeyId: string;
  studentId: string;
  busId: string;
  date: string;
  status: JourneyStatus;
  startStop: string;
  endStop: string;
  currentStop: string;
  boardingTime: string | null;
  estimatedArrival: string;
  completedTime: string | null;
  fareCharged: number;
  concessionApplied: boolean;
  originalFare: number;
  timelineEvents: {
    id: string;
    time: string;
    title: string;
    description: string;
    isCompleted: boolean;
    icon: string;
  }[];
}

export interface Transaction {
  id: string;
  transactionId: string;
  studentId: string;
  cardId: string;
  type: 'RECHARGE' | 'BUS_FARE';
  description: string;
  amount: number;
  balanceAfter: number;
  status: 'SUCCESSFUL' | 'PENDING' | 'FAILED';
  date: string;
  timestamp: string;
  method: 'UPI' | 'GOOGLE_PAY' | 'CARD' | 'NFC_TAP' | 'QR_CODE_PASS' | 'AUTO_RELOAD';
  referenceId: string;
  busId?: string;
  stopName?: string;
  isOfflineQueued?: boolean;
}

export interface NotificationItem {
  id: string;
  targetRole: 'ALL' | 'STUDENT' | 'PARENT';
  category: 'journey' | 'payment' | 'safety' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  busId?: string;
  urgency?: 'normal' | 'high' | 'critical';
  sentViaSms?: boolean;
}
