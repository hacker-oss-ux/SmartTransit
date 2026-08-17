import React from 'react';
import { TransitProvider, useTransit } from './context/TransitContext';
import { Navbar } from './components/common/Navbar';
import { SimulationControlBar } from './components/common/SimulationControlBar';
import { ToastContainer } from './components/common/ToastContainer';
import { NfcTapModal } from './components/common/NfcTapModal';
import { PaymentModal } from './components/common/PaymentModal';
import { DigitalQrModal } from './components/common/DigitalQrModal';
import { PrivacyCenterModal } from './components/common/PrivacyCenterModal';

// Pages
import { LandingPage } from './pages/LandingPage';
import { StudentPortal } from './pages/student/StudentPortal';
import { ParentPortal } from './pages/parent/ParentPortal';
import { OperatorDashboard } from './pages/operator/OperatorDashboard';

const MainApp: React.FC = () => {
  const {
    role,
    isDigitalQrModalOpen,
    setIsDigitalQrModalOpen,
    isPrivacyModalOpen,
    setIsPrivacyModalOpen,
  } = useTransit();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-blue-600 selection:text-white">
      {/* Toast Alert System */}
      <ToastContainer />

      {/* Global Navigation Header */}
      <Navbar />

      {/* Dynamic Role Page View */}
      <main className="flex-1">
        {role === 'landing' && <LandingPage />}
        {role === 'student' && <StudentPortal />}
        {role === 'parent' && <ParentPortal />}
        {role === 'operator' && <OperatorDashboard />}
      </main>

      {/* Global Floating Simulation Bar */}
      <SimulationControlBar />

      {/* Interactive Modals */}
      <NfcTapModal />
      <PaymentModal />
      <DigitalQrModal
        isOpen={isDigitalQrModalOpen}
        onClose={() => setIsDigitalQrModalOpen(false)}
      />
      <PrivacyCenterModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
    </div>
  );
};

export function App() {
  return (
    <TransitProvider>
      <MainApp />
    </TransitProvider>
  );
}

export default App;
