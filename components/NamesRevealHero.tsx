'use client';

import React from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import MarigoldGarland from './MarigoldGarland';

interface NamesRevealHeroProps {
  onScrollDown?: () => void;
}

export default function NamesRevealHero({ onScrollDown }: NamesRevealHeroProps) {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-between py-12 px-4 overflow-hidden bg-gradient-to-b from-[#1C060B] via-[#24080F] to-[#140508] text-[#29170E] selection:bg-amber-200 selection:text-amber-900">
      {/* Background Soft Palace Terrace with Warm Vignette */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/heavenly_palace_terrace_hd.jpg"
          alt="Heavenly Palace Terrace"
          fill
          className="object-cover object-center scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/45 to-[#120608]" />
      </div>

      {/* Top Hanging Festive Marigold Garland Banner */}
      <div className="relative z-20 w-full max-w-2xl">
        <MarigoldGarland />
      </div>

      {/* CENTER ROYAL PALACE ARCH INVITATION CARD */}
      <div className="relative z-10 w-full max-w-[360px] sm:max-w-[440px] my-auto rounded-t-[140px] sm:rounded-t-[170px] rounded-b-3xl border-2 border-[#D4AF37]/80 shadow-[0_25px_60px_rgba(0,0,0,0.85)] p-6 sm:p-8 flex flex-col items-center text-center bg-gradient-to-b from-[#FFFDF8] via-[#FAF3E3] to-[#F5E8C7]">
        {/* Arch Gold Outline Inset */}
        <div className="absolute inset-2 sm:inset-3 rounded-t-[130px] sm:rounded-t-[160px] rounded-b-2xl border border-dashed border-[#C5A059]/70 pointer-events-none" />

        {/* Top Spiritual Invocation with Golden Ganesha */}
        <div className="relative z-10 flex flex-col items-center pt-2">
          <div className="w-16 h-16 sm:w-20 sm:h-20 text-[#8B1A24] mb-1 animate-blur-in">
            <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full drop-shadow-sm">
              <path d="M50 15 C45 15, 38 20, 38 28 C38 34, 42 38, 45 40 C38 41, 30 46, 30 55 C30 65, 40 70, 48 70 C48 75, 45 80, 40 85 C42 86, 48 85, 52 80 C54 77, 55 72, 55 70 C62 70, 72 65, 72 55 C72 46, 64 41, 57 40 C60 38, 64 34, 64 28 C64 20, 57 15, 50 15 Z M50 22 C53 22, 57 24, 57 28 C57 32, 53 34, 50 34 C47 34, 43 32, 43 28 C43 24, 47 22, 50 22 Z M47 46 C48 46, 52 46, 53 46 C60 47, 65 50, 65 56 C65 62, 58 64, 50 64 C42 64, 35 62, 35 56 C35 50, 40 47, 47 46 Z" />
            </svg>
          </div>

          <p className="font-hindi text-sm sm:text-base text-[#8C5E1E] font-bold tracking-[0.25em] animate-blur-in">
            ॥ श्री गणेशाय नमः ॥
          </p>

          <p className="font-montserrat text-[11px] sm:text-xs text-[#7A5B38] uppercase tracking-[0.2em] font-semibold mt-1 animate-blur-in-delayed">
            TOGETHER WITH THEIR FAMILIES
          </p>
          <p className="font-hindi text-xs text-[#801420] mt-0.5 max-w-xs font-medium animate-blur-in-delayed">
            परम पिता परमात्मा की असीम अनुकम्पा एवं पूज्य पूर्वजों के शुभाशीर्वाद से मांगलिक परिणय उत्सव
          </p>
        </div>

        {/* Monogram Seal */}
        <div className="relative my-4 flex items-center justify-center animate-blur-in-delayed">
          <div className="w-14 h-14 rounded-full border border-[#D4AF37] flex items-center justify-center bg-gradient-to-br from-[#FAF3DE] to-[#F0E0B8] shadow-inner">
            <span className="font-playfair text-xl font-bold text-[#801420] tracking-tight">
              RP
            </span>
          </div>
        </div>

        {/* GROOM DETAILS (वर पक्ष: राकेश यादव) */}
        <div className="w-full flex flex-col items-center animate-blur-in">
          <span className="inline-block px-3 py-0.5 rounded-full bg-amber-100/90 text-[#8B1A24] text-xs font-hindi font-bold border border-amber-300/80 mb-1">
            वर पक्ष
          </span>
          <h1 className="font-hindi-royal text-3xl sm:text-4xl font-bold text-[#801420] tracking-wide drop-shadow-sm">
            राकेश यादव
          </h1>
          <p className="font-hindi text-xs sm:text-sm text-[#3E2510] font-bold mt-1">
            सुपुत्र: <span className="text-[#801420]">श्रीमती नीलम देवी</span> एवं <span className="text-[#801420]">श्री रामचन्द्र यादव</span>
          </p>
          <p className="font-hindi text-[11px] sm:text-xs text-[#6B4B27] mt-0.5">
            ग्राम - पठखौली, पोस्ट - शिवली राशिद गंज, जिला - आजमगढ़
          </p>
        </div>

        {/* SANG / & CONNECTOR */}
        <div className="flex items-center gap-4 my-3 w-full justify-center">
          <span className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
          <span className="font-playfair text-xl sm:text-2xl text-[#8C5E1E] font-bold italic animate-blur-in">
            &amp;
          </span>
          <span className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
        </div>

        {/* BRIDE DETAILS (वधू पक्ष: पूजा यादव) */}
        <div className="w-full flex flex-col items-center animate-blur-in-delayed">
          <span className="inline-block px-3 py-0.5 rounded-full bg-amber-100/90 text-[#8B1A24] text-xs font-hindi font-bold border border-amber-300/80 mb-1">
            वधू पक्ष
          </span>
          <h2 className="font-hindi-royal text-3xl sm:text-4xl font-bold text-[#801420] tracking-wide drop-shadow-sm">
            पूजा यादव
          </h2>
          <p className="font-hindi text-xs sm:text-sm text-[#3E2510] font-bold mt-1">
            सुपुत्री: <span className="text-[#801420]">श्रीमती खुशी देवी</span> एवं <span className="text-[#801420]">श्री कर्मजीत यादव</span>
          </p>
          <p className="font-hindi text-[11px] sm:text-xs text-[#6B4B27] mt-0.5">
            ग्राम - नाहूपुर, पोस्ट - सोडरी, जिला - आजमगढ़
          </p>
        </div>

        <div className="w-20 h-[1.5px] bg-[#C5A059]/60 my-4" />

        {/* Pleasure of your company */}
        <p className="font-playfair text-xs italic text-[#7A5B38] leading-relaxed max-w-xs animate-blur-in-delayed-2">
          request the pleasure of your company<br />
          at the celebration of their wedding
        </p>

        <p className="font-hindi text-xs text-[#801420] font-semibold mt-1 animate-blur-in-delayed-2">
          मांगलिक परिणय उत्सव में आपकी गरिमामयी उपस्थिति सादर प्रार्थनीय है।
        </p>
      </div>

      {/* BOTTOM SCROLL INDICATOR */}
      <div
        onClick={onScrollDown}
        className="relative z-10 mt-6 flex flex-col items-center cursor-pointer text-[#F8E7B4] hover:text-[#FFE082] transition-colors"
      >
        <span className="font-serif text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold">
          SCROLL
        </span>
        <ChevronDown className="w-5 h-5 text-[#D4AF37] animate-bounce mt-1" />
      </div>
    </section>
  );
}
