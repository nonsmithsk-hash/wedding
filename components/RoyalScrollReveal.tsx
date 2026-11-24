'use client';

import React, { useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';

export default function RoyalScrollReveal() {
  const [isUnrolled, setIsUnrolled] = useState(false);

  const toggleScroll = () => {
    setIsUnrolled((prev) => !prev);
  };

  return (
    <section className="relative w-full py-16 px-4 flex flex-col items-center justify-center select-none overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="relative z-10 flex flex-col items-center text-center mb-6">
        <p className="font-montserrat text-xs sm:text-sm tracking-[0.3em] uppercase text-[#C5A059] font-bold animate-blur-in">
          SAVE THE DATE
        </p>
        <h2 className="font-hindi-royal text-2xl sm:text-3xl text-[#F8E7B4] font-bold mt-1 drop-shadow animate-blur-in">
          Pull to Reveal • पावन लग्न तिथि
        </h2>
        <p className="font-hindi text-xs sm:text-sm text-[#D4AF37]/90 mt-1 animate-blur-in-delayed">
          {isUnrolled ? 'शाही फ़रमान खुल चुका है' : 'नीचे फुंदना (Tassel) खींचें या टैप करें'}
        </p>
      </div>

      {/* THE ROYAL SCROLL CONTAINER */}
      <div className="relative z-10 w-full max-w-[360px] sm:max-w-[420px] flex flex-col items-center">
        {/* Top Roller Cylinder (Gold Carved Rod) */}
        <div
          onClick={toggleScroll}
          className="relative z-30 w-full h-10 sm:h-12 flex items-center justify-between px-2 cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
        >
          {/* Left Decorative Gold Knob / Endcap */}
          <div className="w-6 h-8 sm:w-8 sm:h-10 rounded-l-full bg-gradient-to-r from-[#D4AF37] via-[#FFF3B3] to-[#AA771C] border border-[#8C6228] shadow-lg flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-950" />
          </div>

          {/* Center Main Golden Rod with Embossed Ridges */}
          <div className="flex-1 h-6 sm:h-7 mx-1 rounded-sm bg-gradient-to-b from-[#FFF2B2] via-[#D4AF37] to-[#8C6228] border-y border-[#AA771C] shadow-md flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1 bg-white/60" />
            <div className="absolute inset-x-0 bottom-0 h-1.5 bg-black/40" />
            <span className="font-hindi text-[10px] sm:text-xs text-[#3E2510] font-bold tracking-widest uppercase">
              ॥ श्री हरि ॐ ॥
            </span>
          </div>

          {/* Right Decorative Gold Knob / Endcap */}
          <div className="w-6 h-8 sm:w-8 sm:h-10 rounded-r-full bg-gradient-to-l from-[#D4AF37] via-[#FFF3B3] to-[#AA771C] border border-[#8C6228] shadow-lg flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-950" />
          </div>
        </div>

        {/* PARCHMENT BODY (Unrolls downwards) */}
        <div
          className={`relative z-20 w-[92%] transition-all duration-700 ease-in-out overflow-hidden shadow-2xl ${
            isUnrolled ? 'max-h-[580px] opacity-100' : 'max-h-0 opacity-0'
          }`}
          style={{
            background: 'linear-gradient(to bottom, #FFFDF8 0%, #FAF2DC 50%, #F5E8C4 100%)',
            borderLeft: '4px solid #C5A059',
            borderRight: '4px solid #C5A059',
          }}
        >
          {/* Parchment Paper Inner Content */}
          <div className="p-6 sm:p-8 flex flex-col items-center text-center text-[#2A180E] relative">
            {/* Parchment Subtle Texture Lines & Filigree Border */}
            <div className="absolute inset-3 rounded border border-dashed border-[#C5A059]/60 pointer-events-none" />

            {/* Top Floral Wreath Ornament */}
            <div className="w-16 h-16 text-[#8B1A24] mb-1">
              <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full drop-shadow-sm">
                <path d="M50 10 C35 10 25 22 25 35 C25 50 35 60 50 72 C65 60 75 50 75 35 C75 22 65 10 50 10 Z M50 20 C60 20 66 27 66 36 C66 45 59 52 50 61 C41 52 34 45 34 36 C34 27 40 20 50 20 Z" />
                <circle cx="50" cy="35" r="7" fill="#D4AF37" />
              </svg>
            </div>

            <p className="font-hindi text-xs sm:text-sm text-[#8C5E1E] font-bold tracking-widest uppercase animate-blur-in">
              ॥ शुभ विवाह मुहूर्त ॥
            </p>

            {/* Large Auspicious Date */}
            <div className="my-2 flex flex-col items-center animate-blur-in">
              <span className="font-playfair text-6xl sm:text-7xl font-bold text-[#801420] tracking-tight drop-shadow-sm">
                9
              </span>
              <span className="font-hindi-royal text-2xl sm:text-3xl font-bold text-[#9E2A2B] -mt-1">
                दिसंबर 2026
              </span>
              <span className="font-montserrat text-xs sm:text-sm text-[#6E4E2C] uppercase tracking-widest font-semibold mt-0.5">
                WEDNESDAY, 9 DECEMBER 2026
              </span>
            </div>

            <div className="w-24 h-[1.5px] bg-[#C5A059] my-3" />

            {/* Ceremony Auspicious Schedule */}
            <div className="space-y-1.5 text-xs sm:text-sm font-hindi animate-blur-in-delayed">
              <p className="font-bold text-[#801420] text-sm sm:text-base">
                शुभ बारात प्रस्थान: सायं 5:00 बजे
              </p>
              <p className="text-[#523A25]">
                (निज निवास पठखौली, शिवली राशिद गंज से)
              </p>
              <div className="py-1">
                <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-[#8B1A24] font-bold text-xs border border-amber-300">
                  शुभ लग्न एवं सात फेरे • विदाई प्रातः बेला
                </span>
              </div>
              <p className="text-[#6E4E2C] font-medium pt-1">
                विवाह स्थल: ग्राम नाहूपुर, पोस्ट सोडरी, जिला आजमगढ़
              </p>
            </div>

            <div className="mt-4 pt-2 border-t border-[#C5A059]/40 w-full animate-blur-in-delayed-2">
              <p className="font-playfair text-xs italic text-[#8C5E1E]">
                &ldquo;See you on Wednesday, 9 December 2026&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Roller Cylinder (Gold Carved Rod) */}
        <div
          onClick={toggleScroll}
          className="relative z-30 w-full h-10 sm:h-12 flex items-center justify-between px-2 cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
        >
          {/* Left Decorative Gold Knob */}
          <div className="w-6 h-8 sm:w-8 sm:h-10 rounded-l-full bg-gradient-to-r from-[#D4AF37] via-[#FFF3B3] to-[#AA771C] border border-[#8C6228] shadow-lg flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-950" />
          </div>

          {/* Center Main Golden Rod */}
          <div className="flex-1 h-6 sm:h-7 mx-1 rounded-sm bg-gradient-to-b from-[#FFF2B2] via-[#D4AF37] to-[#8C6228] border-y border-[#AA771C] shadow-md flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1 bg-white/60" />
            <div className="absolute inset-x-0 bottom-0 h-1.5 bg-black/40" />
            <span className="font-serif text-[10px] sm:text-xs text-[#3E2510] font-bold tracking-widest uppercase">
              {isUnrolled ? 'TAP TO ROLL UP' : 'TAP OR PULL TO UNROLL'}
            </span>
          </div>

          {/* Right Decorative Gold Knob */}
          <div className="w-6 h-8 sm:w-8 sm:h-10 rounded-r-full bg-gradient-to-l from-[#D4AF37] via-[#FFF3B3] to-[#AA771C] border border-[#8C6228] shadow-lg flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-950" />
          </div>
        </div>

        {/* SILK TASSEL CORD (फुंदना / Tassel for Pull to Reveal) */}
        <div
          onClick={toggleScroll}
          className="relative z-40 -mt-1 flex flex-col items-center cursor-pointer group"
          title="Click or pull to unroll scroll"
        >
          {/* Golden Silk Cord */}
          <div className="w-1 h-8 bg-gradient-to-b from-[#D4AF37] via-[#FFD700] to-[#B38728] shadow-md transition-all duration-300 group-hover:h-10" />

          {/* Tassel Golden Cap / Bead */}
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#FFE57F] via-[#D4AF37] to-[#8C6228] border border-[#FFF] shadow-md flex items-center justify-center -mt-1">
            <Sparkles className="w-2.5 h-2.5 text-amber-950 animate-spin" />
          </div>

          {/* Silk Fringe (Maroon & Gold Threads) */}
          <div className="w-7 h-9 rounded-b-xl bg-gradient-to-b from-[#8C1625] via-[#AA1E30] to-[#540812] shadow-lg flex items-center justify-center -mt-1 border-t-2 border-[#D4AF37] transition-transform duration-300 group-hover:scale-110">
            <ChevronDown
              className={`w-4 h-4 text-[#F8E7B4] transition-transform duration-500 ${
                isUnrolled ? 'rotate-180' : 'animate-bounce'
              }`}
            />
          </div>

          <span className="font-hindi text-[11px] sm:text-xs text-[#F8E7B4] font-bold mt-1.5 bg-black/60 px-3 py-0.5 rounded-full border border-amber-400/40 shadow">
            {isUnrolled ? 'बंद करने के लिए दबाएं ∧' : 'खोलने के लिए दबाएं ∨'}
          </span>
        </div>
      </div>
    </section>
  );
}
