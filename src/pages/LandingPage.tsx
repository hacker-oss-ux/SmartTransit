import React from 'react';
import { useTransit } from '../context/TransitContext';
import { SmartCardGraphic } from '../components/common/SmartCardGraphic';
import { LiveMap } from '../components/common/LiveMap';
import {
  ShieldCheck,
  CreditCard,
  SmartphoneNfc,
  ArrowRight,
  Sparkles,
  Lock,
  ChevronRight,
  Zap,
  WifiOff,
  QrCode,
  CheckCircle2,
  Cpu,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const {
    setRole,
    card,
    student,
    bus,
    journey,
    setIsNfcModalOpen,
    setIsPaymentModalOpen,
    setIsDigitalQrModalOpen,
    setIsPrivacyModalOpen,
  } = useTransit();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden bg-gradient-to-b from-blue-50/70 via-slate-50 to-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-blue-400/10 via-indigo-400/10 to-teal-400/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Copy & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs font-bold shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Zero-Disadvantage Architecture • Resilient Mobility Ecosystem</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 font-heading leading-tight">
                One Card. One Journey.{' '}
                <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Complete Peace of Mind.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl font-normal leading-relaxed">
                SmartTransit connects students, parents, and school transportation through smart concession cards, offline-resilient bus POS terminals, digital payments, and real-time journey alerts.
              </p>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs max-w-lg inline-flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">
                  ✓
                </div>
                <p className="text-xs font-semibold text-slate-700">
                  <span className="text-blue-700 font-bold">Smarter Journeys. Safer Students.</span>
                </p>
              </div>

              {/* Hero Action CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={() => setRole('parent')}
                  className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 transition transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Explore Parent Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setRole('student')}
                  className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold text-sm shadow-xs transition"
                >
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  <span>Student Portal</span>
                </button>

                <button
                  onClick={() => scrollToSection('zero-disadvantage')}
                  className="flex items-center gap-1.5 px-4 py-3.5 text-xs font-semibold text-slate-600 hover:text-blue-600 transition"
                >
                  <span>Resilience Architecture</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Offline-Ready Cryptography</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <SmartphoneNfc className="w-4 h-4 text-blue-600" />
                  <span>Sub-250ms Dual Gate</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-600" />
                  <span>Zero-MDR UPI AutoPay</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md w-full bg-white rounded-3xl p-5 shadow-2xl border border-slate-200/90 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                        Live Bus ST-102
                      </h4>
                      <p className="text-[10px] text-slate-500">Pala → St. Thomas College</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                    ETA: {bus.etaMinutes} mins
                  </span>
                </div>

                <div className="rounded-2xl overflow-hidden border border-slate-200">
                  <LiveMap heightClass="h-44" showControls={false} />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Student Status</span>
                    <span className="text-xs font-extrabold text-emerald-700 flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {student.name}
                    </span>
                    <span className="text-[10px] text-slate-500">{journey.status}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Card Balance</span>
                    <span className="text-xs font-extrabold text-slate-900 font-mono block mt-0.5">
                      ₹{card.balance}
                    </span>
                    <span className="text-[10px] text-blue-600 font-semibold">{card.concessionType}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => setIsNfcModalOpen(true)}
                    className="flex-1 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold transition flex items-center justify-center gap-1.5"
                  >
                    <SmartphoneNfc className="w-3.5 h-3.5" />
                    <span>Simulate Tap</span>
                  </button>

                  <button
                    onClick={() => setIsDigitalQrModalOpen(true)}
                    className="flex-1 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold transition flex items-center justify-center gap-1.5"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>Backup QR</span>
                  </button>

                  <button
                    onClick={() => setIsPaymentModalOpen(true)}
                    className="flex-1 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold transition flex items-center justify-center gap-1.5"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Top Up</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ZERO-DISADVANTAGE ARCHITECTURE SHOWCASE */}
      <section id="zero-disadvantage" className="py-20 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:20px_20px] opacity-25" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 font-mono">
              Engineered Beyond Traditional Flaws
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
              The Zero-Disadvantage Architecture
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              How SmartTransit systematically solves common hardware costs, dead-zone dropouts, lost cards, queue congestion, payment gateway fees, and data privacy trade-offs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Pillar 1: Offline-First Cryptography */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 hover:border-emerald-500/50 transition">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <WifiOff className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block font-mono">
                  Challenge: Cellular Dead Zones
                </span>
                <h3 className="text-lg font-bold text-white mt-1">Offline-First Cryptography</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Mifare DESFire EV3 chips store encrypted balances on-card. Bus POS terminals process fares 100% offline and auto-sync queued batches when re-entering 5G coverage.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-800 text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Zero service disruption in rural corridors</span>
              </div>
            </div>

            {/* Pillar 2: Dynamic Backup QR */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 hover:border-blue-500/50 transition">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <QrCode className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block font-mono">
                  Challenge: Lost or Forgotten Cards
                </span>
                <h3 className="text-lg font-bold text-white mt-1">Dynamic TOTP QR Pass</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Students who leave their physical cards at home generate a 60-second rotating encrypted QR code on their phone, verified instantly by the bus scanner.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-800 text-[11px] text-blue-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Zero stranded students at bus stops</span>
              </div>
            </div>

            {/* Pillar 3: Anti-Passback & Photo Match */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 hover:border-amber-500/50 transition">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block font-mono">
                  Challenge: Concession Card Sharing
                </span>
                <h3 className="text-lg font-bold text-white mt-1">Anti-Passback & Photo Match</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  15-minute duplicate tap time-locks prevent paying for unauthorized peers, while the driver screen flashes the student photo for 1.5s visual verification.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-800 text-[11px] text-amber-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Zero subsidy leakage or fare fraud</span>
              </div>
            </div>

            {/* Pillar 4: Zero-MDR UPI AutoPay */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 hover:border-teal-500/50 transition">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest block font-mono">
                  Challenge: Micro-Payment Gateway Fees
                </span>
                <h3 className="text-lg font-bold text-white mt-1">Zero-MDR UPI AutoPay</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Parents enable automated UPI wallet reloads (e.g. ₹500 when balance &lt; ₹50) or semester passes, eliminating costly card processing fee penalties.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-800 text-[11px] text-teal-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Zero fee wastage on small top-ups</span>
              </div>
            </div>

            {/* Pillar 5: Sub-250ms Dual Readers */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 hover:border-indigo-500/50 transition">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block font-mono">
                  Challenge: Morning Rush Queues
                </span>
                <h3 className="text-lg font-bold text-white mt-1">Sub-250ms High Throughput</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Optimized NFC radio handshakes achieve &lt; 0.25s tap response, allowing 50 passengers to board smoothly in under 30 seconds with dual door readers.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-800 text-[11px] text-indigo-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Zero boarding bottlenecks or delays</span>
              </div>
            </div>

            {/* Pillar 6: Privacy-by-Design DPDP */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 hover:border-rose-500/50 transition">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest block font-mono">
                  Challenge: Student Surveillance Fears
                </span>
                <h3 className="text-lg font-bold text-white mt-1">Privacy-First Architecture</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  We track the Bus GPS, not personal student smartphones. All logs feature 90-day automated anonymization complying with the DPDP Act and GDPR.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-800 text-[11px] text-rose-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>100% legal compliance & student privacy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 font-mono">
              The Connected Transit Flow
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
              How SmartTransit Works
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              A single unified ecosystem connecting parent recharges, contactless bus boarding, live bus telemetry, and instant arrival alerts.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 hover:shadow-xl transition-all duration-200 relative group">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white font-black text-base flex items-center justify-center mb-4 shadow-md shadow-blue-500/20 group-hover:scale-105 transition">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1.5">Connect</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Student and parent accounts are linked to the student's physical NFC SmartTransit card.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] font-semibold text-blue-600 flex items-center gap-1">
                <span>Verified ID & Route Assigned</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 hover:shadow-xl transition-all duration-200 relative group">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-black text-base flex items-center justify-center mb-4 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1.5">Tap</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Student taps card or backup QR upon boarding. 50% concession fare is deducted in &lt; 250ms.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] font-semibold text-indigo-600 flex items-center gap-1">
                <span>Contactless POS Verification</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 hover:shadow-xl transition-all duration-200 relative group">
              <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white font-black text-base flex items-center justify-center mb-4 shadow-md shadow-teal-500/20 group-hover:scale-105 transition">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1.5">Track</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                The smart bus device records boarding and transmits live vehicle GPS, speed, and ETA to parents.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] font-semibold text-teal-600 flex items-center gap-1">
                <span>High-Precision Bus Telemetry</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 hover:shadow-xl transition-all duration-200 relative group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white font-black text-base flex items-center justify-center mb-4 shadow-md shadow-emerald-500/20 group-hover:scale-105 transition">
                04
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1.5">Stay Informed</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Parents receive instant boarding, approaching stop, and safe destination arrival alerts via Push + SMS.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                <span>Complete Peace of Mind</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE 3D CONCESSION CARD SHOWCASE */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 flex flex-col items-center">
              <SmartCardGraphic size="lg" />
              <div className="flex items-center gap-4 mt-6 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  NFC Mifare DESFire EV3
                </span>
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-blue-400" />
                  AES-128 Hardware Encryption
                </span>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-extrabold uppercase tracking-widest text-blue-400 font-mono">
                One Physical Card • All Benefits
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
                The Smart Concession Pass & Payment Card
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Replaces flimsy paper concession passes and loose change with a tamper-proof RFID student identity card that stores balance, verifies college credentials, and enables instant contactless transit.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                  <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 shrink-0">
                    <SmartphoneNfc className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Automated 50% Concession Fares</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Instantly applies the student discount without conductor calculations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Direct Parent UPI AutoPay</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Parents top-up via zero-MDR UPI or enable automated low-balance refills.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                  <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 shrink-0">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Digital TOTP Backup QR</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Emergency phone QR code pass ensures no student is ever stranded.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PORTAL QUICK LAUNCHPAD */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-tr from-slate-900 via-blue-950 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-widest text-blue-400 font-mono">
                Experience the Portals
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading">
                Ready to explore the SmartTransit platform?
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Switch instantly between the Student Dashboard, Parent Tracking Experience, or Bus Operator Telemetry Console.
              </p>

              <div className="grid sm:grid-cols-3 gap-3 pt-4">
                <button
                  onClick={() => setRole('parent')}
                  className="p-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex flex-col justify-between gap-3 shadow-lg shadow-blue-600/30 transition text-left"
                >
                  <ShieldCheck className="w-5 h-5 text-blue-200" />
                  <div>
                    <div className="text-sm">Parent Portal</div>
                    <div className="text-[10px] text-blue-200 font-normal mt-0.5">Live Bus Tracking & AutoPay</div>
                  </div>
                </button>

                <button
                  onClick={() => setRole('student')}
                  className="p-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex flex-col justify-between gap-3 border border-slate-700 transition text-left"
                >
                  <CreditCard className="w-5 h-5 text-emerald-400" />
                  <div>
                    <div className="text-sm">Student Portal</div>
                    <div className="text-[10px] text-slate-300 font-normal mt-0.5">Card & QR Backup Pass</div>
                  </div>
                </button>

                <button
                  onClick={() => setRole('operator')}
                  className="p-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex flex-col justify-between gap-3 border border-slate-700 transition text-left"
                >
                  <Cpu className="w-5 h-5 text-amber-400" />
                  <div>
                    <div className="text-sm">Bus Console</div>
                    <div className="text-[10px] text-slate-300 font-normal mt-0.5">Offline Queue & Diagnostics</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="bg-slate-950 text-slate-400 text-xs py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800/80 pb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                ST
              </div>
              <div>
                <span className="font-extrabold text-white text-base tracking-wide font-heading">
                  SmartTransit
                </span>
                <p className="text-[11px] text-slate-400">
                  An Integrated Student Mobility, Payment & Safety Platform
                </p>
              </div>
            </div>

            <div className="text-slate-400 text-center sm:text-right font-medium">
              <p>One Card. One Journey. Complete Peace of Mind.</p>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
            <p>© 2026 SmartTransit Mobility Technologies. Prototype Demonstration.</p>
            <div className="flex items-center gap-4">
              <button onClick={() => setIsPrivacyModalOpen(true)} className="hover:text-white underline">
                DPDP Privacy Compliance
              </button>
              <span>•</span>
              <span>AES-128 Hardware Security</span>
              <span>•</span>
              <span>Sub-250ms POS Throughput</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
