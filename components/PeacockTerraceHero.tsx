'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { weddingData } from '@/data/weddingData';

export default function PeacockTerraceHero() {
  const { couple, invocation } = weddingData;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const scrollToCeremonies = () => {
    const el = document.getElementById('tilak');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#140e0a] select-none py-16 px-4 sm:px-8">
      {/* ========================================================
          FULLSCREEN PEACOCK TERRACE BACKGROUND (HD Resolution)
          Palace Scalloped Arches, Lotus Pond & Royal Blue Peacock
          ======================================================== */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/heavenly_palace_terrace_hd.jpg"
          alt="Royal Palace Terrace with Peacock"
          fill
          unoptimized
          className="object-cover object-center scale-100 transition-transform duration-1000 ease-out hover:scale-105"
          priority
        />
        {/* Subtle warm ambient vignette allowing the artwork to shine */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-stone-950/45 pointer-events-none" />
      </div>

      {/* ========================================================
          PEACOCK SECTION CONTENT
          Ultra-Luxurious Royal Frosted Glass (Translucent & High-Contrast)
          ======================================================== */}
      <div className="relative z-10 max-w-2xl w-full flex flex-col items-center text-center py-8 my-auto">
        <div
          style={{
            background:
              'linear-gradient(135deg, rgba(255, 253, 248, 0.82) 0%, rgba(255, 247, 235, 0.70) 100%)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            boxShadow:
              '0 30px 70px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.75), inset 0 0 0 1px rgba(212, 175, 55, 0.45)',
          }}
          className={`flex flex-col items-center p-6 sm:p-10 rounded-3xl border border-[#D4AF37]/70 transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-[0_35px_80px_rgba(212,175,55,0.4)] w-full cursor-default ${
            isVisible
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-8 scale-95'
          }`}
        >
          {/* Top Ganesh Invocation */}
          <div className="flex flex-col items-center">
            {/* Traditional Ganesh SVG Icon */}
            <div className="w-12 sm:w-16 h-12 sm:h-16 text-[#821927] mb-1 drop-shadow-md">
              <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
                <path d="M50 15 C45 15, 38 20, 38 28 C38 34, 42 38, 45 40 C38 41, 30 46, 30 55 C30 65, 40 70, 48 70 C48 75, 45 80, 40 85 C42 86, 48 85, 52 80 C54 77, 55 72, 55 70 C62 70, 72 65, 72 55 C72 46, 64 41, 57 40 C60 38, 64 34, 64 28 C64 20, 57 15, 50 15 Z M50 22 C53 22, 57 24, 57 28 C57 32, 53 34, 50 34 C47 34, 43 32, 43 28 C43 24, 47 22, 50 22 Z M47 46 C48 46, 52 46, 53 46 C60 47, 65 50, 65 56 C65 62, 58 64, 50 64 C42 64, 35 62, 35 56 C35 50, 40 47, 47 46 Z" />
              </svg>
            </div>

            <p className="font-hindi-royal text-xl sm:text-2xl text-[#8C5E1E] font-bold tracking-widest drop-shadow-sm">
              {invocation.shloka}
            </p>
            <p className="mt-1.5 text-xs sm:text-sm tracking-wide text-[#1F140D] max-w-xl font-hindi font-bold px-4 leading-relaxed">
              {invocation.blessing}
            </p>
          </div>

          {/* Couple Announcement with Gold Monogram RP */}
          <div className="flex flex-col items-center mt-4 w-full">
            {/* Circular Gold Wreath Monogram */}
            <div className="relative w-20 sm:w-24 h-20 sm:h-24 flex items-center justify-center my-1.5 transition-transform duration-300 hover:scale-105">
              <div className="absolute inset-0 rounded-full border-2 border-amber-400/80 shadow-[0_0_25px_rgba(212,175,55,0.45)]" />
              <div className="absolute inset-1.5 rounded-full border-2 border-dashed border-[#C5A059] animate-[spin_60s_linear_infinite]" />
              <span
                className="text-2xl sm:text-3xl text-[#9E731B] font-bold tracking-tight drop-shadow-md"
                style={{ fontFamily: 'var(--font-cinzel), serif' }}
              >
                {couple.monogram}
              </span>
            </div>

            {/* Groom Details */}
            <div className="flex flex-col items-center mt-1 w-full">
              <h1 className="font-hindi-royal text-2xl sm:text-4xl md:text-5xl text-[#7E1A29] font-bold tracking-wide drop-shadow-sm transition-transform duration-300 hover:scale-[1.01]">
                <span className="text-xl sm:text-3xl text-[#8C5E1E] font-semibold mr-2 sm:mr-3">
                  वर पक्ष:
                </span>
                <span>{couple.groom.name} यादव</span>
              </h1>
              <p className="mt-1.5 text-sm sm:text-base text-[#1F140D] font-hindi font-bold">
                सुपुत्र: <span className="text-[#821927] font-black">{couple.groom.parents}</span>
              </p>
              <div className="mt-1.5">
                <span
                  style={{
                    background: 'rgba(255, 255, 255, 0.65)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(212, 175, 55, 0.55)',
                  }}
                  className="text-xs sm:text-sm text-[#1F140D] font-hindi font-extrabold px-3.5 sm:px-5 py-1.5 rounded-2xl sm:rounded-full inline-block shadow-sm max-w-full leading-relaxed text-center"
                >
                  {couple.groom.residence}
                </span>
              </div>
            </div>

            {/* संग Connector */}
            <div className="flex items-center gap-4 my-3">
              <span className="w-12 sm:w-20 h-[1.5px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
              <span className="font-hindi-royal text-base sm:text-lg text-[#8C6228] font-extrabold">
                संग
              </span>
              <span className="w-12 sm:w-20 h-[1.5px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
            </div>

            {/* Bride Details */}
            <div className="flex flex-col items-center w-full">
              <h2 className="font-hindi-royal text-2xl sm:text-4xl md:text-5xl text-[#7E1A29] font-bold tracking-wide drop-shadow-sm transition-transform duration-300 hover:scale-[1.01]">
                <span className="text-xl sm:text-3xl text-[#8C5E1E] font-semibold mr-2 sm:mr-3">
                  वधू पक्ष:
                </span>
                <span>{couple.bride.name} यादव</span>
              </h2>
              <p className="mt-1.5 text-sm sm:text-base text-[#1F140D] font-hindi font-bold">
                सुपुत्री: <span className="text-[#821927] font-black">{couple.bride.parents}</span>
              </p>
              <div className="mt-1.5">
                <span
                  style={{
                    background: 'rgba(255, 255, 255, 0.65)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(212, 175, 55, 0.55)',
                  }}
                  className="text-xs sm:text-sm text-[#1F140D] font-hindi font-extrabold px-3.5 sm:px-5 py-1.5 rounded-2xl sm:rounded-full inline-block shadow-sm max-w-full leading-relaxed text-center"
                >
                  {couple.bride.residence}
                </span>
              </div>
            </div>

            <div className="text-amber-800 font-bold tracking-widest text-base mt-4">
              ✦ ✦ ✦
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Prompt for Ceremonies */}
      <div
        onClick={scrollToCeremonies}
        className="absolute bottom-5 inset-x-0 flex flex-col items-center justify-center z-20 cursor-pointer group"
      >
        <div
          style={{
            background: 'rgba(10, 7, 5, 0.70)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(212, 175, 55, 0.45)',
          }}
          className="flex items-center gap-2 px-5 py-2 rounded-full text-[#F8E7B4] shadow-xl transition-all duration-300 hover:scale-105 hover:border-amber-400"
        >
          <span className="font-hindi text-xs sm:text-sm tracking-wide font-bold">
            मांगलिक कार्यक्रम देखने के लिए नीचे स्क्रॉल करें
          </span>
          <ChevronDown className="w-4 h-4 text-amber-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
