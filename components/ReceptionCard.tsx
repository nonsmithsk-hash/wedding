'use client';

import React from 'react';
import { Sparkles, Utensils } from 'lucide-react';

export default function ReceptionCard() {
  return (
    <section className="relative w-full py-12 px-4 flex flex-col items-center justify-center select-none overflow-hidden">
      {/* Center Velvet Glow Card */}
      <div className="relative w-full max-w-[360px] sm:max-w-[420px] rounded-3xl p-7 sm:p-9 border-2 border-[#D4AF37]/70 shadow-[0_25px_60px_rgba(0,0,0,0.85)] bg-gradient-to-b from-[#4A0A16] via-[#2D040C] to-[#170105] text-center flex flex-col items-center space-y-4 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400">
        {/* Top Gold Ornament */}
        <div className="flex items-center gap-2 text-[#D4AF37] animate-blur-in">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <p className="font-montserrat text-xs tracking-[0.3em] uppercase font-bold text-[#F8E7B4]">
            YOU ARE INVITED TO THE
          </p>
          <Sparkles className="w-4 h-4 text-amber-400" />
        </div>

        <h3 className="font-hindi-royal text-3xl sm:text-4xl text-[#FFF0C2] font-bold drop-shadow animate-blur-in">
          मांगलिक परिणय एवं प्रीतिभोज
        </h3>
        <p className="font-playfair text-xs sm:text-sm text-[#E5C77A] tracking-wider uppercase font-semibold animate-blur-in-delayed">
          GRAND WEDDING FEAST &amp; RECEPTION
        </p>

        <div className="w-20 h-[1.5px] bg-[#D4AF37]/60 my-1" />

        <p className="font-hindi text-xs sm:text-sm text-[#F5E6CA] leading-relaxed max-w-xs animate-blur-in-delayed">
          मांगलिक वैवाहिक वेला में प्रीतिभोज में पधारकर नव-दंपति को अपने शुभाशीर्वाद से अनुगृहीत करें।
        </p>

        {/* Date & Location Pill */}
        <div className="w-full p-4 rounded-2xl bg-black/50 border border-[#D4AF37]/40 shadow-inner flex flex-col items-center gap-1 animate-blur-in-delayed-2">
          <div className="flex items-center gap-2 text-[#FFE599]">
            <Utensils className="w-4 h-4 text-amber-400" />
            <span className="font-hindi text-base sm:text-lg font-bold">
              9 दिसंबर 2026 • सायं काल
            </span>
          </div>
          <p className="font-hindi text-xs text-[#E5D0A5]">
            स्थान: ग्राम नाहूपुर, पोस्ट सोडरी, जिला आजमगढ़
          </p>
        </div>

        <div className="text-amber-400/70 tracking-widest text-xs pt-1">
          ✦ ✦ ✦
        </div>
      </div>
    </section>
  );
}
