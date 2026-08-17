import React, { useState } from 'react';
import { useTransit } from '../../context/TransitContext';
import { Wifi, QrCode, RotateCw } from 'lucide-react';

interface SmartCardGraphicProps {
  interactive?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showFlipButton?: boolean;
}

export const SmartCardGraphic: React.FC<SmartCardGraphicProps> = ({
  interactive = true,
  size = 'md',
  showFlipButton = true,
}) => {
  const { card, student } = useTransit();
  const [isFlipped, setIsFlipped] = useState(false);

  const sizeClasses = {
    sm: 'w-72 h-44 text-[10px]',
    md: 'w-full max-w-sm h-56 text-xs',
    lg: 'w-full max-w-md h-64 text-sm',
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`perspective-1000 ${sizeClasses[size]}`}>
        <div
          onClick={() => interactive && setIsFlipped(!isFlipped)}
          className={`relative w-full h-full duration-500 transform-style-3d cursor-pointer transition-transform shadow-2xl rounded-2xl ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* FRONT OF CARD */}
          <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-tr from-slate-950 via-blue-950 to-indigo-900 p-5 text-white backface-hidden border border-white/20 shadow-2xl overflow-hidden flex flex-col justify-between select-none">
            {/* Holographic Shimmer Overlay */}
            <div className="absolute inset-0 hologram-shimmer pointer-events-none opacity-40" />

            {/* Background Transit Circuit Pattern */}
            <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-blue-500/10 rounded-full blur-xl pointer-events-none" />
            <div className="absolute -left-8 -top-8 w-44 h-44 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />

            {/* Top Bar: Brand & Concession Badge */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center font-black text-sm text-white shadow-md">
                  ST
                </div>
                <div>
                  <span className="font-extrabold tracking-wider text-sm font-heading">SMARTTRANSIT</span>
                  <span className="block text-[8px] tracking-widest text-blue-300 font-mono">MOBILITY CARD</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase">
                  {card.concessionType}
                </span>
                <Wifi className="w-4 h-4 text-blue-300 rotate-90" />
              </div>
            </div>

            {/* Middle Section: Metallic Chip + Student Snapshot */}
            <div className="relative z-10 flex items-center justify-between mt-1">
              <div className="flex items-center gap-3">
                {/* Metallic Gold EMV Chip */}
                <div className="w-11 h-8 rounded-md bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 p-1 border border-amber-600/40 shadow-inner flex flex-col justify-around">
                  <div className="h-0.5 w-full bg-amber-700/30 rounded" />
                  <div className="h-0.5 w-full bg-amber-700/30 rounded" />
                  <div className="h-0.5 w-full bg-amber-700/30 rounded" />
                </div>

                <div className="flex items-center gap-2">
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-10 h-10 rounded-xl object-cover border-2 border-white/40 shadow-md"
                  />
                  <div>
                    <h3 className="font-bold text-sm text-white tracking-wide">{student.name}</h3>
                    <p className="text-[10px] text-blue-200 font-mono">ID: {student.studentId}</p>
                    <p className="text-[9px] text-slate-300 truncate max-w-[140px]">{student.course}</p>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="text-right">
                <span className="text-[9px] uppercase tracking-wider text-slate-400 block">Balance</span>
                <span className="text-lg font-black text-emerald-400 font-mono">₹{card.balance}</span>
              </div>
            </div>

            {/* Bottom Bar: Masked Number, Validity & Status */}
            <div className="relative z-10 flex items-end justify-between pt-2 border-t border-white/10">
              <div>
                <div className="font-mono text-xs tracking-widest text-slate-200 font-semibold">
                  {card.cardNumber}
                </div>
                <div className="text-[9px] text-slate-400 mt-0.5">
                  ST. THOMAS COLLEGE OF ENGG • ROUTE R-102
                </div>
              </div>

              <div className="text-right">
                <span className="text-[8px] text-slate-400 block uppercase">Valid Thru</span>
                <span className="font-mono text-xs font-bold text-white">{card.validity}</span>
              </div>
            </div>
          </div>

          {/* BACK OF CARD (Flipped) */}
          <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rotate-y-180 backface-hidden border border-white/20 shadow-2xl p-4 flex flex-col justify-between select-none">
            {/* Magnetic Stripe */}
            <div className="w-[calc(100%+2rem)] -mx-4 h-9 bg-slate-950 border-y border-white/10 mt-1" />

            {/* Signature & Security Panel */}
            <div className="grid grid-cols-3 gap-2 items-center my-1">
              <div className="col-span-2 bg-slate-100/90 text-slate-800 p-2 rounded text-[10px] font-mono flex items-center justify-between">
                <span className="italic font-bold">Ajay Girish</span>
                <span className="text-[8px] bg-slate-200 px-1 py-0.5 rounded font-bold">284</span>
              </div>
              <div className="flex flex-col items-center justify-center p-1 bg-white/5 rounded border border-white/10">
                <QrCode className="w-8 h-8 text-white/80" />
                <span className="text-[7px] text-slate-400 mt-0.5">RFID: {card.rfidUid.slice(0, 8)}</span>
              </div>
            </div>

            {/* Card Terms & Safety Info */}
            <div className="text-[8px] text-slate-400 space-y-1 leading-tight border-t border-white/10 pt-2">
              <p>• Official concession mobility pass for verified student transit only.</p>
              <p>• Concession 50% discount automatically applied at bus NFC POS terminals.</p>
              <div className="flex justify-between items-center text-blue-300 font-semibold pt-0.5">
                <span>Helpline: 1800-425-TRANSIT</span>
                <span>RFID UID: {card.rfidUid}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Helper trigger to flip card */}
      {showFlipButton && (
        <button
          type="button"
          onClick={() => setIsFlipped(!isFlipped)}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 transition font-medium"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>Click card to {isFlipped ? 'view front' : 'flip to back'}</span>
        </button>
      )}
    </div>
  );
};
