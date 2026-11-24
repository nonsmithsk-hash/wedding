'use client';

import React, { useState } from 'react';
import { Sparkles, BookOpen, Hand } from 'lucide-react';

interface BookCoverIntroProps {
  onOpen: () => void;
  isOpen: boolean;
}

export default function BookCoverIntro({ onOpen, isOpen }: BookCoverIntroProps) {
  const [animating, setAnimating] = useState(false);
  const [coverOpened, setCoverOpened] = useState(false);

  const handleOpen = () => {
    if (animating || isOpen) return;

    setAnimating(true);

    // Step 1: Open the front cover in 3D immediately
    setCoverOpened(true);

    // Step 2: Allow the guest to admire the 3D book opening, then transition smoothly into the invitation
    setTimeout(() => {
      onOpen();
      setTimeout(() => {
        setAnimating(false);
        setCoverOpened(false);
      }, 600);
    }, 1000);
  };

  return (
    <div
      onClick={handleOpen}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-x-hidden overflow-y-auto py-6 px-4 cursor-pointer select-none transition-all duration-1000 ease-in-out ${
        isOpen ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100 pointer-events-auto'
      }`}
      style={{
        background: 'radial-gradient(circle at center, #3A0A13 0%, #200408 55%, #100204 100%)',
      }}
    >
      {/* Soft Ambient Floating Rose & Gold Bokeh Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-rose-600/15 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-amber-500/15 blur-3xl animate-pulse" />
      </div>

      {/* Floating Gentle Petals Background Decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 16 }).map((_, i) => (
          <span
            key={`intro-petal-${i}`}
            className="absolute rounded-full bg-gradient-to-br from-rose-300/40 to-pink-500/30 blur-[0.5px]"
            style={{
              width: `${12 + (i % 4) * 6}px`,
              height: `${16 + (i % 4) * 8}px`,
              top: `${(i * 19) % 95}%`,
              left: `${(i * 23) % 92}%`,
              transform: `rotate(${i * 45}deg)`,
              opacity: 0.5 + (i % 5) * 0.1,
            }}
          />
        ))}
      </div>

      {/* Top Banner Guide for User */}
      <div className="relative z-20 mb-3 sm:mb-4 flex flex-col items-center text-center px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-amber-400/60 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
          <BookOpen className="w-4 h-4 text-amber-300 animate-pulse" />
          <span className="font-hindi text-xs sm:text-sm font-bold text-[#F8E7B4]">
            डिजिटल विवाह निमंत्रण पुस्तिका • 3D Book Experience
          </span>
        </div>
      </div>

      {/* 3D BOOK STAGE CONTAINER */}
      <div
        className="relative cursor-pointer select-none group my-auto"
        onClick={(e) => {
          e.stopPropagation();
          handleOpen();
        }}
        style={{ perspective: '1600px' }}
      >
        {/* Book Outer Shadow on Ground */}
        <div className="absolute -bottom-8 left-4 right-4 h-12 bg-black/80 blur-xl rounded-full transform scale-95 transition-transform duration-700 group-hover:scale-105" />

        {/* 3D Book Assembly */}
        <div
          className={`relative w-[280px] sm:w-[320px] md:w-[350px] h-[400px] sm:h-[460px] md:h-[500px] rounded-r-2xl rounded-l-md shadow-[0_25px_60px_rgba(0,0,0,0.9)] transition-all duration-700 ease-out ${
            coverOpened ? 'rotate-[-2deg]' : 'hover:scale-[1.03] hover:-rotate-1'
          }`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Back Cover & Inner Pages Stack (Pages Rim on right) */}
          <div
            className="absolute inset-0 rounded-r-2xl rounded-l-md bg-[#FAF4E6] border-r-8 border-y-4 border-[#E2D2B0] shadow-inner"
            style={{
              transform: 'translateZ(-14px)',
              background: 'repeating-linear-gradient(90deg, #FBF8EE 0px, #F5EED9 2px, #E8DCBE 4px)',
            }}
          />

          {/* Golden Gilded Pages Glow Layer */}
          <div
            className="absolute inset-1 rounded-r-xl rounded-l-sm bg-gradient-to-r from-[#D4AF37]/40 via-[#FFF4BD]/50 to-[#AA771C]/40"
            style={{ transform: 'translateZ(-5px)' }}
          />

          {/* Inner First Page (Revealed as cover opens) */}
          <div
            className="absolute inset-0 rounded-r-2xl rounded-l-md bg-gradient-to-b from-[#FFFDF7] via-[#FDF8EE] to-[#F5ECCB] p-6 sm:p-8 flex flex-col items-center justify-between text-center border border-[#D4AF37]/50 shadow-inner"
            style={{ transform: 'translateZ(-1px)' }}
          >
            {/* Top Ganesha */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 text-[#8B1A24] mb-1">
                <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full drop-shadow">
                  <path d="M50 15 C45 15, 38 20, 38 28 C38 34, 42 38, 45 40 C38 41, 30 46, 30 55 C30 65, 40 70, 48 70 C48 75, 45 80, 40 85 C42 86, 48 85, 52 80 C54 77, 55 72, 55 70 C62 70, 72 65, 72 55 C72 46, 64 41, 57 40 C60 38, 64 34, 64 28 C64 20, 57 15, 50 15 Z M50 22 C53 22, 57 24, 57 28 C57 32, 53 34, 50 34 C47 34, 43 32, 43 28 C43 24, 47 22, 50 22 Z M47 46 C48 46, 52 46, 53 46 C60 47, 65 50, 65 56 C65 62, 58 64, 50 64 C42 64, 35 62, 35 56 C35 50, 40 47, 47 46 Z" />
                </svg>
              </div>
              <p className="font-hindi text-xs sm:text-sm text-[#8C5E1E] font-bold">॥ श्री गणेशाय नमः ॥</p>
            </div>

            {/* Couple Announcement */}
            <div className="my-auto space-y-2">
              <h3 className="font-hindi-royal text-2xl sm:text-3xl font-bold text-[#801420]">
                मांगलिक परिणय उत्सव
              </h3>
              <div className="w-20 h-[1.5px] bg-[#D4AF37] mx-auto my-2" />
              <p className="font-hindi text-xl sm:text-2xl font-bold text-[#3E2510]">
                राकेश यादव <span className="text-[#8B1A24] text-base">संग</span> पूजा यादव
              </p>
              <p className="font-hindi text-xs sm:text-sm text-[#7A5B38] font-semibold">
                9 दिसंबर 2026 • आजमगढ़
              </p>
            </div>

            <p className="font-hindi text-xs sm:text-sm text-[#801420] font-bold animate-pulse">
              ✨ निमंत्रण पत्र खुल रहा है... ✨
            </p>
          </div>

          {/* FRONT HARDCOVER (The Swinging 3D Cover) */}
          <div
            className="absolute inset-0 rounded-r-2xl rounded-l-md origin-left border-2 border-[#D4AF37]/80 shadow-2xl flex flex-col items-center justify-between p-6 sm:p-8 cursor-pointer select-none"
            style={{
              background: 'linear-gradient(145deg, #7A1422 0%, #590B16 50%, #40060E 100%)',
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
              transformOrigin: 'left center',
              transform: coverOpened ? 'rotateY(-140deg)' : 'rotateY(0deg)',
              transition: 'transform 0.9s cubic-bezier(0.25, 1, 0.5, 1)',
              boxShadow: 'inset 0 0 45px rgba(0,0,0,0.65), 5px 15px 35px rgba(0,0,0,0.7)',
            }}
          >
            {/* Book Spine Leather Texture Left Border */}
            <div className="absolute left-0 top-0 bottom-0 w-5 bg-gradient-to-r from-black/70 via-black/30 to-transparent border-r border-[#D4AF37]/40 rounded-l-md" />

            {/* Embossed Ornate Golden Foil Outer Filigree Frame */}
            <div className="absolute inset-3 sm:inset-4 rounded-r-xl rounded-l-sm border-2 border-[#D4AF37]/80 pointer-events-none">
              <div className="absolute inset-1 sm:inset-1.5 rounded-r-lg border border-dashed border-[#F3E5AB]/70" />
              <div className="absolute top-1 left-1 text-[#F3E5AB] text-xs font-serif">✤</div>
              <div className="absolute top-1 right-1 text-[#F3E5AB] text-xs font-serif">✤</div>
              <div className="absolute bottom-1 left-1 text-[#F3E5AB] text-xs font-serif">✤</div>
              <div className="absolute bottom-1 right-1 text-[#F3E5AB] text-xs font-serif">✤</div>
            </div>

            {/* Top Invocation */}
            <div className="relative z-10 flex flex-col items-center mt-1">
              <span className="font-hindi text-xs sm:text-sm text-[#F8E7B4] tracking-[0.25em] font-bold drop-shadow">
                ॥ श्री गणेशाय नमः ॥
              </span>
            </div>

            {/* Center Golden Medallion with Ganesha */}
            <div className="relative z-10 flex flex-col items-center my-auto">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center rounded-full bg-gradient-to-b from-[#8C1625] to-[#4D0A13] border-2 border-[#F3E5AB] shadow-[0_0_25px_rgba(212,175,55,0.4)]">
                <div className="absolute inset-1.5 rounded-full border border-dashed border-[#D4AF37]/70" />

                <div className="w-16 h-16 sm:w-18 sm:h-18 text-[#F8E7B4] drop-shadow-md">
                  <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
                    <path d="M50 15 C45 15, 38 20, 38 28 C38 34, 42 38, 45 40 C38 41, 30 46, 30 55 C30 65, 40 70, 48 70 C48 75, 45 80, 40 85 C42 86, 48 85, 52 80 C54 77, 55 72, 55 70 C62 70, 72 65, 72 55 C72 46, 64 41, 57 40 C60 38, 64 34, 64 28 C64 20, 57 15, 50 15 Z M50 22 C53 22, 57 24, 57 28 C57 32, 53 34, 50 34 C47 34, 43 32, 43 28 C43 24, 47 22, 50 22 Z M47 46 C48 46, 52 46, 53 46 C60 47, 65 50, 65 56 C65 62, 58 64, 50 64 C42 64, 35 62, 35 56 C35 50, 40 47, 47 46 Z" />
                  </svg>
                </div>
              </div>

              {/* Embossed Gold Title */}
              <h2 className="font-hindi-royal text-3xl sm:text-4xl text-[#F8E7B4] font-bold tracking-wider mt-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                ॥ शुभ विवाह ॥
              </h2>
              <p className="font-serif text-xs sm:text-sm tracking-[0.3em] uppercase text-[#D4AF37] font-semibold mt-1">
                SHUBH VIVAAH
              </p>

              {/* Couple Gold Monogram Ribbon */}
              <div className="mt-3 px-5 py-1.5 rounded-full bg-black/40 border border-[#D4AF37]/50 shadow-inner">
                <span className="font-hindi text-sm sm:text-base text-[#FFE599] font-bold tracking-wide">
                  राकेश &nbsp;♥&nbsp; पूजा
                </span>
              </div>
            </div>

            {/* Click/Tap Callout Badge on Book itself */}
            <div className="relative z-10 flex flex-col items-center mb-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/50 text-[#FFE599] text-[11px] font-hindi font-bold tracking-wide animate-pulse">
                <span>👆</span> पुस्तक खोलने के लिए टैप करें
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* TAP THE BOOK TO OPEN CTA (Animated Button with Pulsing Rings) */}
      <div className="relative mt-5 sm:mt-7 flex flex-col items-center px-4 max-w-full">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleOpen();
          }}
          className="group relative flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-9 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#997428] via-[#E2B744] to-[#997428] text-[#291404] font-serif font-bold text-[11px] sm:text-sm tracking-wide sm:tracking-widest uppercase shadow-[0_0_35px_rgba(212,175,55,0.7)] hover:shadow-[0_0_55px_rgba(212,175,55,1)] hover:scale-105 active:scale-95 transition-all duration-300 max-w-[94vw]"
        >
          {/* Concentric Pulsing Golden Wave Rings */}
          <span className="absolute -inset-1 rounded-full border border-amber-400/40 animate-ping pointer-events-none" />

          {/* Center Indicator */}
          <span className="text-base shrink-0">📖</span>
          <span className="drop-shadow-sm font-hindi sm:font-serif font-black whitespace-nowrap">
            TAP BOOK TO OPEN • निमंत्रण खोलें
          </span>
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-950 animate-spin shrink-0" />
        </button>
        <p className="text-[#F8E7B4] font-hindi text-xs sm:text-sm mt-2.5 tracking-wide text-center font-bold drop-shadow flex items-center gap-1.5">
          <span>✨</span>
          <span>किताब पर कहीं भी क्लिक/टैप करें और विवाह निमंत्रण का आनंद लें</span>
          <span>✨</span>
        </p>
      </div>
    </div>
  );
}
