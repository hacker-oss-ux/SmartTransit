import React, { useState } from 'react';
import { useTransit } from '../../context/TransitContext';
import confetti from 'canvas-confetti';
import {
  CreditCard,
  X,
  CheckCircle2,
  QrCode,
  Smartphone,
  ShieldCheck,
  ArrowRight,
  Loader2,
} from 'lucide-react';

export const PaymentModal: React.FC = () => {
  const {
    isPaymentModalOpen,
    setIsPaymentModalOpen,
    card,
    student,
    handleRecharge,
  } = useTransit();

  const [selectedAmount, setSelectedAmount] = useState<number>(500);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<'GOOGLE_PAY' | 'UPI' | 'CARD'>('GOOGLE_PAY');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [successData, setSuccessData] = useState<{ transactionId: string; amount: number; prevBalance: number } | null>(null);

  if (!isPaymentModalOpen) return null;

  const presets = [100, 250, 500, 1000];

  const handlePresetSelect = (amount: number) => {
    setSelectedAmount(amount);
    setIsCustom(false);
    setCustomAmount('');
  };

  const handleCustomChange = (val: string) => {
    setCustomAmount(val);
    const num = parseInt(val, 10);
    if (!isNaN(num) && num > 0) {
      setSelectedAmount(num);
    }
  };

  const triggerRecharge = async () => {
    const finalAmount = isCustom ? (parseInt(customAmount, 10) || 500) : selectedAmount;
    if (finalAmount <= 0) return;

    setIsProcessing(true);
    const prevBalance = card.balance;

    try {
      const result = await handleRecharge(finalAmount, paymentMethod);
      if (result.success) {
        setSuccessData({
          transactionId: result.transactionId,
          amount: finalAmount,
          prevBalance: prevBalance,
        });

        try {
          confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.6 },
          });
        } catch {
          // ignore
        }
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setIsPaymentModalOpen(false);
    setSuccessData(null);
    setIsProcessing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 p-5 text-white flex items-center justify-between relative overflow-hidden">
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/25">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-base tracking-wide font-heading">
                Recharge SmartTransit Card
              </h3>
              <p className="text-xs text-emerald-100">
                Instant Top-Up for {student.name} ({card.maskedNumber})
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!successData ? (
            <div className="space-y-5">
              {/* Current Card Balance Pill */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Current Balance
                  </span>
                  <span className="text-xl font-extrabold text-slate-900 font-mono">₹{card.balance}</span>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Concession: Active
                </span>
              </div>

              {/* Amount Selection Presets */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Recharge Amount
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {presets.map(amount => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handlePresetSelect(amount)}
                      className={`p-3 rounded-xl border text-center transition font-bold ${
                        !isCustom && selectedAmount === amount
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-xs text-slate-400">₹</span>
                      <span className="text-base font-mono">{amount}</span>
                    </button>
                  ))}
                </div>

                {/* Custom Amount Field */}
                <div className="mt-3">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 font-bold text-sm">
                      ₹
                    </div>
                    <input
                      type="number"
                      placeholder="Enter custom amount (e.g. 750)"
                      value={customAmount}
                      onChange={e => {
                        setIsCustom(true);
                        handleCustomChange(e.target.value);
                      }}
                      className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('GOOGLE_PAY')}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition text-xs font-semibold ${
                      paymentMethod === 'GOOGLE_PAY'
                        ? 'border-blue-600 bg-blue-50/70 text-blue-950 ring-2 ring-blue-500/20'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-blue-600" />
                    <span>Google Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('UPI')}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition text-xs font-semibold ${
                      paymentMethod === 'UPI'
                        ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <QrCode className="w-5 h-5 text-emerald-600" />
                    <span>UPI / QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('CARD')}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition text-xs font-semibold ${
                      paymentMethod === 'CARD'
                        ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 ring-2 ring-indigo-500/20'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-indigo-600" />
                    <span>Debit Card</span>
                  </button>
                </div>
              </div>

              {/* Prototype Safety Notice */}
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 text-[11px]">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Simulated payment flow. No real currency is charged.</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={triggerRecharge}
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-lg shadow-emerald-500/25 transition active:scale-98 disabled:opacity-60"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Processing Payment via Bank Gateway...</span>
                    </>
                  ) : (
                    <>
                      <span>Pay ₹{isCustom ? (customAmount || 500) : selectedAmount}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* SUCCESS CONFIRMATION STATE */
            <div className="text-center space-y-5 py-2">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner animate-in zoom-in-50 duration-300">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                  ✓ Payment Successful
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                  ₹{successData.amount} Added to SmartTransit Card
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Transaction Reference: <span className="font-mono font-bold text-slate-700">{successData.transactionId}</span>
                </p>
              </div>

              {/* Balance Summary Box */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Student Card</span>
                  <span className="font-bold text-slate-800">{student.name} ({card.maskedNumber})</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Previous Balance</span>
                  <span className="font-mono">₹{successData.prevBalance}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-bold border-t border-slate-200 pt-2 text-sm">
                  <span>New Available Balance</span>
                  <span className="font-mono text-emerald-800 text-base">₹{successData.prevBalance + successData.amount}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/25 transition"
              >
                Done • Return to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
