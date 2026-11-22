'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Sparkles, Music } from 'lucide-react';
import RosePetals from './RosePetals';
import confetti from 'canvas-confetti';

gsap.registerPlugin(ScrollTrigger);

export default function EventCards() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>('.event-section-fullscreen');

      sections.forEach((section) => {
        const bgLayer = section.querySelector('.section-bg-image');
        const textElements = section.querySelectorAll('.section-reveal-text');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
          },
        });

        if (bgLayer) {
          tl.fromTo(
            bgLayer,
            { scale: 1.05, opacity: 0.9 },
            { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out' },
            0
          );
        }

        if (textElements.length) {
          tl.fromTo(
            textElements,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' },
            0.1
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#8B0000', '#F8E7B4', '#E6A15C', '#2F4F2F'],
    });
  };

  return (
    <div ref={containerRef} className="relative z-10 w-full flex flex-col items-center bg-[#150f0b]">
      
      {/* ========================================================
          CEREMONIAL SECTION 1: मांगलिक कार्यक्रम - तिलक एवं शगुन
          Natural warm palace atmosphere, zero harsh black gradients
          ======================================================== */}
      <section className="event-section-fullscreen relative w-full min-h-screen flex items-center justify-center py-20 px-4 sm:px-8 overflow-hidden">
        {/* Fullscreen Background - Natural Folk Musicians */}
        <div className="section-bg-image absolute inset-0 z-0">
          <Image
            src="/images/bg_maayra.jpg"
            alt="Rajasthani Folk Musicians"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Natural gentle warm ambient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-stone-950/30 pointer-events-none" />
        </div>

        {/* Content Card */}
        <div className="relative z-10 max-w-xl w-full flex flex-col items-center text-center text-[#2b1d14] py-8">
          <div className="section-reveal-text flex flex-col items-center bg-[#fffdf9]/94 backdrop-blur-md p-6 sm:p-10 rounded-3xl shadow-[0_20px_50px_rgba(20,10,5,0.25)] border border-amber-300/40 w-full">
            <p className="font-serif text-xs tracking-[0.25em] text-[#8C6228] uppercase font-bold">
              ॥ मांगलिक कार्यक्रम ॥
            </p>
            <h2 className="font-hindi-royal text-4xl sm:text-5xl text-[#7E1A29] font-bold mt-1.5 drop-shadow-sm">
              तिलक एवं शगुन
            </h2>

            <div className="w-16 h-[1.5px] bg-[#C5A059]/40 my-4" />

            <p className="font-hindi text-sm sm:text-base text-[#4A382A] leading-relaxed max-w-md">
              पारंपरिक मांगलिक रीति-रिवाजों एवं लोक गीतों के पावन सानिध्य में तिलक एवं शगुन उत्सव।
            </p>

            <div className="mt-6 p-4 rounded-2xl bg-amber-50/90 border border-amber-200/80 w-full max-w-md shadow-inner">
              <p className="font-hindi text-sm sm:text-base text-[#821927] font-bold">
                शुभ वेला: सायं काल
              </p>
              <p className="font-hindi text-xs sm:text-sm text-[#5A4030] mt-1">
                स्थान: निज निवास — ग्राम पठखौली, पोस्ट शिवली राशिद गंज, आजमगढ़
              </p>
            </div>

            <div className="text-amber-800/60 tracking-widest text-xs mt-4">
              ✦ ✦ ✦
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          CEREMONIAL SECTION 2: संगीत एवं स्नेह मिलन (Starry Piano Evening)
          Natural celestial twilight atmosphere, zero black bars
          ======================================================== */}
      <section className="event-section-fullscreen relative w-full min-h-screen flex items-center justify-center py-20 px-4 sm:px-8 overflow-hidden">
        <div className="section-bg-image absolute inset-0 z-0">
          <Image
            src="/images/bg_sangeet.jpg"
            alt="Sangeet Piano Night"
            fill
            className="object-cover object-center"
          />
          {/* Subtle twilight gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-slate-950/30 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-xl w-full flex flex-col items-center text-center text-white py-8">
          <div className="section-reveal-text flex flex-col items-center bg-[#1a120d]/85 backdrop-blur-md p-6 sm:p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-amber-400/35 w-full">
            <div className="flex items-center gap-2 text-[#D4AF37] mb-1">
              <Music size={18} />
              <p className="font-serif text-xs tracking-[0.25em] uppercase font-bold text-[#F3E5AB]">
                Musical Evening
              </p>
            </div>

            <h2 className="font-hindi-royal text-4xl sm:text-5xl text-[#F8E7B4] font-bold tracking-wide mt-1 drop-shadow-lg">
              संगीत एवं स्नेह मिलन
            </h2>

            <div className="w-16 h-[1.5px] bg-amber-400/40 my-4" />

            <p className="font-hindi text-sm sm:text-base text-[#E0D5C1] leading-relaxed max-w-md">
              पारिवारिक उल्लास, गीतों की मधुर धुन और खुशियों से सजी एक अविस्मरणीय शाम।
            </p>

            <div className="mt-6 p-4 rounded-2xl bg-white/10 border border-amber-400/25 w-full max-w-md shadow-inner">
              <p className="font-serif text-sm sm:text-base text-[#D4AF37] tracking-widest uppercase font-bold">
                6:00 PM ONWARDS
              </p>
              <p className="font-hindi text-xs sm:text-sm text-[#C5A059] mt-1">
                रंगारंग प्रस्तुतियां एवं प्रीतिभोज
              </p>
            </div>

            <div className="text-amber-400/70 tracking-widest text-xs mt-4">
              ✦ ✦ ✦
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          CEREMONIAL SECTION 3: हल्दी उत्सव एवं मातृका पूजन
          Bright, festive sunny turmeric & marigold palace lawn
          ======================================================== */}
      <section className="event-section-fullscreen relative w-full min-h-screen flex items-center justify-center py-20 px-4 sm:px-8 overflow-hidden">
        <div className="section-bg-image absolute inset-0 z-0">
          <Image
            src="/images/bg_haldi.jpg"
            alt="Haldi Ceremony"
            fill
            className="object-cover object-center"
          />
          {/* Subtle warm golden ambient */}
          <div className="absolute inset-0 bg-gradient-to-t from-amber-950/30 via-transparent to-amber-950/20 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-xl w-full flex flex-col items-center text-center text-[#2b1d14] py-8">
          <div className="section-reveal-text flex flex-col items-center bg-[#fffef7]/94 backdrop-blur-md p-6 sm:p-10 rounded-3xl shadow-[0_20px_50px_rgba(30,15,5,0.2)] border border-amber-300/60 w-full">
            <p className="font-serif text-xs tracking-[0.2em] text-[#C06A17] uppercase font-bold">
              ॥ हल्दी एवं मंडपाच्छादन ॥
            </p>
            <h2 className="font-hindi-royal text-4xl sm:text-5xl text-[#C06A17] font-bold mt-1.5 drop-shadow-sm">
              हल्दी उत्सव
            </h2>

            <div className="w-16 h-[1.5px] bg-amber-400/50 my-4" />

            <p className="font-hindi text-sm sm:text-base text-[#5C4228] leading-relaxed max-w-md">
              पीले गेंदे के फूलों की महक और उबटन के मंगल लेप से सुशोभित वर-वधू का पावन हल्दी संस्कार।
            </p>

            <div className="mt-6 p-4 rounded-2xl bg-amber-100/80 border border-amber-300/70 w-full max-w-md shadow-inner">
              <p className="font-serif text-sm sm:text-base text-[#C06A17] tracking-widest uppercase font-bold">
                11:00 AM ONWARDS
              </p>
              <p className="font-hindi text-xs sm:text-sm text-[#5C4228] mt-1">
                मातृका पूजन, मंडप एवं हल्दी समारोह
              </p>
            </div>

            <div className="text-amber-800/60 tracking-widest text-xs mt-4">
              ✦ ✦ ✦
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          CEREMONIAL SECTION 4: शुभ विवाह एवं पाणिग्रहण (Royal Rose Arch)
          Natural rose mandap atmosphere with animated falling rose petals
          ======================================================== */}
      <section className="event-section-fullscreen relative w-full min-h-screen flex items-center justify-center py-20 px-4 sm:px-8 overflow-hidden">
        <div className="section-bg-image absolute inset-0 z-0">
          <Image
            src="/images/bg_wedding_rose_arch.jpg"
            alt="Royal Wedding Rose Arch"
            fill
            className="object-cover object-center"
          />
          {/* Subtle rose ambient */}
          <div className="absolute inset-0 bg-gradient-to-t from-rose-950/35 via-transparent to-rose-950/25 pointer-events-none" />
        </div>

        {/* Live Falling Rose Petals Canvas */}
        <RosePetals />

        <div className="relative z-10 max-w-xl w-full flex flex-col items-center text-center text-[#2b1d14] py-8">
          <div className="section-reveal-text flex flex-col items-center bg-[#fffaf5]/94 backdrop-blur-md p-6 sm:p-10 rounded-3xl shadow-[0_20px_50px_rgba(40,10,15,0.22)] border border-rose-900/30 w-full">
            <p className="font-serif text-xs tracking-[0.25em] text-[#871828] uppercase font-bold">
              ॥ शुभ परिणय संस्कार ॥
            </p>
            <h2 className="font-hindi-royal text-4xl sm:text-5xl text-[#871828] font-bold mt-1 drop-shadow-sm">
              शुभ विवाह
            </h2>

            <div className="w-16 h-[1.5px] bg-rose-900/30 my-4" />

            <div className="flex flex-col items-center gap-3 w-full max-w-md">
              <div className="p-3 sm:p-4 rounded-2xl bg-rose-50/90 border border-rose-200/70 w-full shadow-inner">
                <p className="font-hindi text-sm sm:text-base text-[#871828] font-bold">
                  शुभ बारात प्रस्थान
                </p>
                <p className="font-hindi text-xs sm:text-sm text-[#4A382A] mt-0.5">
                  सायं 5:00 बजे (निज निवास पठखौली, शिवली राशिद गंज से)
                </p>
              </div>

              <div className="p-3 sm:p-4 rounded-2xl bg-rose-50/90 border border-rose-200/70 w-full shadow-inner">
                <p className="font-hindi text-sm sm:text-base text-[#871828] font-bold">
                  द्वारपूजा, जयमाल एवं पाणिग्रहण संस्कार
                </p>
                <p className="font-hindi text-xs sm:text-sm text-[#4A382A] mt-0.5">
                  शुभ लग्न एवं रात्रि बेला (ग्राम नाहूपुर, सोडरी)
                </p>
              </div>
            </div>

            <div className="text-rose-900/60 tracking-widest text-xs mt-4">
              ✦ ✦ ✦
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          CEREMONIAL SECTION 5: पारिवारिक स्नेह, बाल आग्रह एवं विनीत
          Heritage Pavilion with golden blessings, natural seamless blend
          ======================================================== */}
      <section className="event-section-fullscreen relative w-full min-h-screen flex items-center justify-center py-20 px-4 sm:px-8 overflow-hidden">
        <div className="section-bg-image absolute inset-0 z-0">
          <Image
            src="/images/bg_rsvp.jpg"
            alt="RSVP Heritage Palace Pavilion"
            fill
            className="object-cover object-center"
          />
          {/* Subtle warm sandstone ambient */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-stone-950/20 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-xl w-full flex flex-col items-center text-center text-[#2b1d14] py-8">
          <div className="section-reveal-text flex flex-col items-center bg-[#fffdf9]/94 backdrop-blur-md p-6 sm:p-10 rounded-3xl shadow-[0_20px_50px_rgba(20,10,5,0.22)] border border-amber-900/25 w-full gap-4">
            
            {/* Top Heading */}
            <div>
              <p className="font-hindi-royal text-sm sm:text-base text-[#7A1C2B] font-bold">
                ॥ दर्शनार्थी एवं स्वागताकांक्षी ॥
              </p>
              <p className="font-hindi text-xs sm:text-sm text-[#6B4B27] mt-0.5">
                आपकी गरिमामयी उपस्थिति हमारे लिए परम सौभाग्य होगी
              </p>
            </div>

            {/* 🧸 बाल आग्रह (Heartwarming Kids Section) */}
            <div className="w-full p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-100 via-rose-50 to-amber-100 border border-amber-300 shadow-sm">
              <div className="flex items-center justify-center gap-2 text-[#871828] mb-1">
                <Sparkles size={14} className="text-amber-600 animate-spin" />
                <span className="font-hindi-royal text-xs sm:text-sm font-bold tracking-wider">
                  बाल आग्रह
                </span>
                <Sparkles size={14} className="text-amber-600 animate-spin" />
              </div>
              <p className="font-hindi text-sm sm:text-base text-[#871828] font-bold leading-tight">
                &ldquo;मेरे मामू की शादी में धूमधाम से आना।&rdquo;
              </p>
              <p className="font-hindi text-xs sm:text-sm text-[#4A382A] mt-1">
                स्नेही बच्चे: <span className="font-bold text-[#821927]">शिव्या, पिहू, दिवेश</span>
              </p>
            </div>

            {/* पूज्य चाचा जी */}
            <div className="w-full text-center">
              <p className="font-hindi text-xs sm:text-sm font-bold text-[#8C6228]">
                ॥ स्वागताकांक्षी / पूज्य चाचा जी ॥
              </p>
              <p className="font-hindi text-sm sm:text-base text-[#2F4F2F] font-bold mt-0.5">
                सुबेदार, श्रीचंद्र, श्रीराम
              </p>
            </div>

            <div className="w-16 h-[1px] bg-[#997E24]/20" />

            {/* स्नेही भाई (भ्रातृवृन्द) */}
            <div className="w-full text-center">
              <p className="font-hindi text-xs sm:text-sm font-bold text-[#8C6228]">
                ॥ दर्शनाभिलाषी / भ्रातृवृन्द ॥
              </p>
              <p className="font-hindi text-xs sm:text-sm text-[#332211] font-semibold leading-relaxed mt-0.5 max-w-md mx-auto">
                चन्द्रभान, उदयभान, संदीप, <span className="text-[#871828] font-bold">सदेश</span>, नितेश, रवि, नितिन, अंशु, अमन, आकाश, आदित्य, अर्पित
              </p>
            </div>

            <div className="w-16 h-[1px] bg-[#997E24]/20" />

            {/* विनीत */}
            <div className="w-full text-center">
              <p className="font-hindi text-xs sm:text-sm font-bold text-[#8C6228]">
                ॥ विनीत ॥
              </p>
              <p className="font-hindi text-sm sm:text-base text-[#871828] font-bold mt-0.5">
                समस्त यादव परिवार
              </p>
              <p className="font-hindi text-xs text-[#695443]">
                ग्राम - पठखौली, पोस्ट - शिवली राशिद गंज, जिला - आजमगढ़
              </p>
            </div>

            {/* Interactive Celebration Button */}
            <button
              onClick={handleConfetti}
              className="mt-2 flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#997E24] via-[#D4AF37] to-[#997E24] text-white text-xs sm:text-sm font-hindi font-bold shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              <Heart size={14} fill="currentColor" /> शुभाशीर्वाद भेजें
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
