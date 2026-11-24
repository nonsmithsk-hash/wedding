'use client';

import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Heart, Sparkles, Users } from 'lucide-react';

interface StorySlide {
  id: string;
  tag: string;
  hindiTitle: string;
  englishTitle: string;
  quote?: string;
  names: string;
  subtitle?: string;
  iconType: 'sparkles' | 'heart' | 'users';
}

const SLIDES: StorySlide[] = [
  {
    id: 'bal-aagrah',
    tag: 'स्नेहिल आमंत्रण',
    hindiTitle: '॥ बाल आग्रह ॥',
    englishTitle: 'Blessings From The Little Ones',
    quote: '“हल्दी है, मेहंदी है, और खुशियों की बहार है,\nमेरे मामू की शादी में आपका इंतजार है।”\n\nमेरे मामू की शादी में धूमधाम से आना!',
    names: 'शिव्या, पिहू, दिवेश',
    subtitle: 'स्नेही नन्हें बच्चे',
    iconType: 'sparkles',
  },
  {
    id: 'chacha-ji',
    tag: 'मार्गदर्शक एवं संरक्षक',
    hindiTitle: '॥ स्वागताकांक्षी / पूज्य चाचा जी ॥',
    englishTitle: 'Elder Family Guardians',
    names: 'सुबेदार, श्रीचंद्र, श्रीराम',
    subtitle: 'आपकी उपस्थिति हमारे लिए परम सौभाग्य होगी',
    iconType: 'users',
  },
  {
    id: 'bhratri',
    tag: 'युवा वर्ग एवं भ्रातृवृन्द',
    hindiTitle: '॥ दर्शनाभिलाषी / भ्रातृवृन्द ॥',
    englishTitle: 'Brothers, Cousins & Friends',
    names: 'चन्द्रभान, उदयभान, संदीप, सदेश, नितेश, रवि, नितिन, अंशु, अमन, आकाश, आदित्य, अर्पित',
    subtitle: 'आनंद व उल्लास के साथ आपके स्वागत को आतुर',
    iconType: 'heart',
  },
  {
    id: 'vineet',
    tag: 'आयोजक परिवार',
    hindiTitle: '॥ विनीत ॥',
    englishTitle: 'Cordially Invited By',
    names: 'समस्त यादव परिवार',
    subtitle: 'ग्राम - पठखौली, पोस्ट - शिवली राशिद गंज, जिला - आजमगढ़',
    iconType: 'users',
  },
];

export default function OurStoryCarousel() {
  const [index, setIndex] = useState(0);
  const [flipState, setFlipState] = useState<'idle' | 'out-next' | 'in-next' | 'out-prev' | 'in-prev'>('idle');
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const isTransitioning = useRef(false);

  const flipToSlide = (targetIndex: number, direction: 'next' | 'prev') => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;

    setFlipState(direction === 'next' ? 'out-next' : 'out-prev');

    setTimeout(() => {
      setIndex(targetIndex);
      setFlipState(direction === 'next' ? 'in-next' : 'in-prev');

      setTimeout(() => {
        setFlipState('idle');
        isTransitioning.current = false;
      }, 300);
    }, 240);
  };

  const prev = () => {
    const nextIdx = index === 0 ? SLIDES.length - 1 : index - 1;
    flipToSlide(nextIdx, 'prev');
  };

  const next = () => {
    const nextIdx = index === SLIDES.length - 1 ? 0 : index + 1;
    flipToSlide(nextIdx, 'next');
  };

  // Touch Swipe Handlers with 3D Flip
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 40) {
      // Swiped Left -> Flip to Next Slide
      next();
    } else if (distance < -40) {
      // Swiped Right -> Flip to Prev Slide
      prev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const slide = SLIDES[index];

  let flipClass = '';
  if (flipState === 'out-next') flipClass = 'card-flipping-out-next';
  else if (flipState === 'in-next') flipClass = 'card-flipping-in-next';
  else if (flipState === 'out-prev') flipClass = 'card-flipping-out-prev';
  else if (flipState === 'in-prev') flipClass = 'card-flipping-in-prev';

  return (
    <section className="relative w-full py-16 px-4 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#120608] via-[#1F0A11] to-[#120608]">
      {/* Background Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />

      {/* Section Header with Soft Blur-In */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-lg mb-4">
        <p className="font-montserrat text-xs tracking-[0.3em] uppercase font-bold text-[#C5A059] animate-blur-in">
          FAMILY &amp; BLESSINGS
        </p>
        <h2 className="font-hindi-royal text-3xl sm:text-4xl text-[#F8E7B4] font-bold drop-shadow animate-blur-in">
          Our Story &amp; Family • स्नेहिल आशीर्वाद
        </h2>
        <p className="font-hindi text-xs sm:text-sm text-[#D4AF37]/90 mt-1 animate-blur-in-delayed">
          परिवार के शुभाशीर्वाद एवं बाल मनुहार
        </p>
      </div>

      {/* SWIPE & FLIP GUIDANCE PILL */}
      <div className="relative z-10 flex items-center gap-2 px-5 py-1.5 rounded-full bg-gradient-to-r from-black/80 via-amber-950/70 to-black/80 border border-amber-400/50 shadow-lg text-[#F8E7B4] text-xs font-hindi mb-5 select-none animate-pulse">
        <span className="text-sm">👈</span>
        <span className="font-bold tracking-wide">
          परिवार आशीर्वाद हेतु स्वाइप / फ्लिप करें (Swipe to 3D Flip)
        </span>
        <span className="text-sm">👉</span>
      </div>

      {/* 3D PERSPECTIVE STAGE */}
      <div className="relative z-10 w-full max-w-[360px] sm:max-w-[420px] card-flip-stage">
        {/* SWIPEABLE CARD WITH 3D FLIP ANIMATION & HOVER */}
        <div
          key={`story-${index}`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`group relative w-full rounded-3xl overflow-hidden border-2 border-[#D4AF37]/60 shadow-[0_20px_50px_rgba(0,0,0,0.7)] bg-[#FFFDF7] text-[#29170E] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(212,175,55,0.35)] hover:border-amber-300 ${flipClass}`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Floating Side Quick Navigation Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-white/95 hover:bg-[#801420] text-[#801420] hover:text-white border border-[#D4AF37] shadow-lg transition-all duration-300 hover:scale-115 active:scale-95"
            aria-label="Previous story slide"
            title="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-white/95 hover:bg-[#801420] text-[#801420] hover:text-white border border-[#D4AF37] shadow-lg transition-all duration-300 hover:scale-115 active:scale-95"
            aria-label="Next story slide"
            title="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Top Rosette Ribbon Banner */}
          <div className="p-4 bg-gradient-to-r from-[#7A1422] via-[#9E2032] to-[#7A1422] text-center border-b border-[#D4AF37]/40 flex items-center justify-between px-6">
            <span className="font-hindi text-xs font-bold text-[#F8E7B4] animate-blur-in">
              {slide.tag}
            </span>
            <span className="font-montserrat text-xs font-bold text-[#F8E7B4] bg-black/40 px-2.5 py-0.5 rounded-full border border-white/20">
              {index + 1} / {SLIDES.length}
            </span>
          </div>

          {/* Card Content Body with Soft Blur-In Text */}
          <div className="p-6 sm:p-8 flex flex-col items-center text-center space-y-4">
            {/* Circular Emblem */}
            <div className="w-14 h-14 rounded-full bg-amber-100 border border-[#D4AF37] flex items-center justify-center text-[#801420] shadow-sm animate-blur-in">
              {slide.iconType === 'sparkles' && <Sparkles className="w-7 h-7 text-amber-600 animate-spin" />}
              {slide.iconType === 'heart' && <Heart className="w-7 h-7 text-rose-600 fill-rose-600" />}
              {slide.iconType === 'users' && <Users className="w-7 h-7 text-amber-700" />}
            </div>

            <h3 className="font-hindi-royal text-2xl sm:text-3xl font-bold text-[#801420] animate-blur-in">
              {slide.hindiTitle}
            </h3>

            {slide.quote && (
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 shadow-inner w-full animate-blur-in-delayed">
                <p className="font-hindi text-sm sm:text-base text-[#801420] font-bold italic leading-relaxed whitespace-pre-line">
                  {slide.quote}
                </p>
              </div>
            )}

            {/* Highlighted Names with Soft Blur-In */}
            <div className="w-full animate-blur-in-delayed-2">
              <p className="font-hindi text-lg sm:text-xl font-bold text-[#2A180E] leading-relaxed">
                {slide.names}
              </p>
              {slide.subtitle && (
                <p className="font-hindi text-xs sm:text-sm text-[#7D5B38] mt-1.5 font-medium">
                  {slide.subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Bottom Carousel Controls */}
          <div className="px-5 py-3.5 bg-[#FAF3DE] border-t border-[#D4AF37]/30 flex items-center justify-between">
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white hover:bg-[#801420] text-[#801420] hover:text-white border border-[#D4AF37]/40 shadow-sm transition-all duration-200"
              aria-label="Previous story slide"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="font-hindi text-xs font-bold">पिछला</span>
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (i !== index) {
                      flipToSlide(i, i > index ? 'next' : 'prev');
                    }
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    i === index
                      ? 'w-6 h-2 bg-[#801420]'
                      : 'w-2 h-2 bg-stone-300 hover:bg-stone-500'
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white hover:bg-[#801420] text-[#801420] hover:text-white border border-[#D4AF37]/40 shadow-sm transition-all duration-200"
              aria-label="Next story slide"
            >
              <span className="font-hindi text-xs font-bold">अगला</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
