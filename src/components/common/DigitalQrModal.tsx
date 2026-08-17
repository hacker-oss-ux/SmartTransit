import React, { useState, useEffect } from 'react';
import { useTransit } from '../../context/TransitContext';
import {
  QrCode,
  X,
  Smartphone,
  RotateCw,
  CheckCircle2,
  Lock,
} from 'lucide-react';

interface DigitalQrModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DigitalQrModal: React.FC<DigitalQrModalProps> = ({ isOpen, onClose }) => {
  const { student, handleNfcTap } = useTransit();
  const [secondsRemaining, setSecondsRemaining] = useState(60);
  const [dynamicOtp, setDynamicOtp] = useState('849 201');
  const [scannedSuccess, setScannedSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setScannedSuccess(false);

    const interval = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          setDynamicOtp(`${Math.floor(100 + Math.random() * 900)} ${Math.floor(100 + Math.random() * 900)}`);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSimulateScan = () => {
    setScannedSuccess(true);
    setTimeout(() => {
      handleNfcTap(10, true);
      setTimeout(() => {
        onClose();
      }, 1200);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-sm w-full overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md">
              <Smartphone className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm tracking-wide font-heading">
                Digital Backup Transit Pass
              </h3>
              <p className="text-[10px] text-blue-200">Anti-Loss TOTP Dynamic QR</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col items-center text-center space-y-4">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 w-full flex items-center gap-3 text-left">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-10 h-10 rounded-xl object-cover border border-blue-500 shadow-xs"
            />
            <div className="flex-1 min-w-0 text-xs">
              <h4 className="font-bold text-slate-900 truncate">{student.name}</h4>
              <p className="text-[10px] text-blue-600 font-mono">ID: {student.studentId} • 50% Concession</p>
            </div>
          </div>

          {/* QR Container */}
          <div className="p-4 bg-white rounded-2xl border-2 border-dashed border-blue-300 shadow-md relative group">
            {scannedSuccess ? (
              <div className="w-48 h-48 flex flex-col items-center justify-center bg-emerald-50 rounded-xl text-emerald-700 animate-in zoom-in-75 duration-200">
                <CheckCircle2 className="w-12 h-12 mb-2" />
                <span className="text-xs font-bold">QR Verified on Bus POS</span>
                <span className="text-[10px] text-emerald-600">Fare ₹10 Deducted</span>
              </div>
            ) : (
              <div className="relative">
                <div className="w-48 h-48 bg-slate-900 rounded-xl p-3 flex flex-col items-center justify-center text-white relative overflow-hidden">
                  <QrCode className="w-36 h-36 text-white" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent animate-pulse pointer-events-none" />
                </div>
              </div>
            )}
          </div>

          {/* OTP Code & Refresh Timer */}
          <div className="w-full space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-slate-500 text-[11px]">
              <span className="flex items-center gap-1 font-semibold">
                <Lock className="w-3 h-3 text-emerald-600" />
                <span>Security Token: <strong className="font-mono text-slate-800">{dynamicOtp}</strong></span>
              </span>
              <span className="font-mono text-blue-600 font-bold flex items-center gap-1">
                <RotateCw className="w-3 h-3 animate-spin" />
                <span>{secondsRemaining}s</span>
              </span>
            </div>

            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-1000 linear"
                style={{ width: `${(secondsRemaining / 60) * 100}%` }}
              />
            </div>

            <div className="pt-2 text-slate-400 text-[10px]">
              Use this dynamic QR if you forgot your physical card. Tap below to simulate conductor scan.
            </div>
          </div>

          {/* Action Trigger Button */}
          {!scannedSuccess && (
            <button
              onClick={handleSimulateScan}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/25 transition flex items-center justify-center gap-2"
            >
              <QrCode className="w-4 h-4" />
              <span>Simulate Scan on Bus Terminal</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
