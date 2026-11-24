'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Calendar, ChevronLeft, ChevronRight, Clock, MapPin, Sparkles } from 'lucide-react';
import MarigoldGarland from './MarigoldGarland';

interface FunctionCard {
  id: string;
  hindiTitle: string;
  englishTitle: string;
  subtitle: string;
  date: string;
  time?: string;
  venue: string;
  location: string;
  dressCode: {
    label: string;
    swatchColor: string;
    description: string;
  };
  bgImage: string;
  calDate: string;
}

const FUNCTIONS: FunctionCard[] = [
  {
    id: 'tilak',
    hindiTitle: 'तिलक एवं शगुन',
    englishTitle: 'Tilak & Shagun Ceremony',
    subtitle: 'पारंपरिक मांगलिक रीति-रिवाजों एवं लोक गीतों के पावन सानिध्य में तिलक एवं शगुन उत्सव।',
    date: '28 नवंबर 2026',
    time: 'मांगलिक बेला',
    venue: 'निज निवास',
    location: 'ग्राम पठखौली, पोस्ट शिवली राशिद गंज, आजमगढ़',
    dressCode: {
      label: 'Traditional Festive',
      swatchColor: '#D4AF37',
      description: 'पारंपरिक कुर्ता-पायजामा / साड़ी',
    },
    bgImage: '/images/tilak_palace_bg.jpg',
    calDate: '20261128/20261129',
  },
  {
    id: 'sangeet',
    hindiTitle: 'संगीत एवं स्नेह मिलन',
    englishTitle: 'Musical Evening & Sangeet',
    subtitle: 'पारिवारिक उल्लास, गीतों की मधुर धुन और खुशियों से सजी एक अविस्मरणीय सुरमयी शाम।',
    date: '28 नवंबर 2026',
    time: 'सायं काल (Evening)',
    venue: 'रंगारंग प्रस्तुतियां एवं प्रीतिभोज',
    location: 'निज निवास प्रांगण, आजमगढ़',
    dressCode: {
      label: 'Indo-Western / Glamour',
      swatchColor: '#3A1C71',
      description: 'इंडो-वेस्टर्न / ग्लैमर्स उत्सव परिधान',
    },
    bgImage: '/images/sangeet_night_bg.jpg',
    calDate: '20261128T180000/20261128T230000',
  },
  {
    id: 'haldi',
    hindiTitle: 'हल्दी उत्सव',
    englishTitle: 'Haldi & Matrika Pujan',
    subtitle: 'पीले गेंदे के फूलों की महक और उबटन के मंगल लेप से सुशोभित वर-वधू का पावन हल्दी संस्कार।',
    date: 'मांगलिक दिवस',
    time: '11:00 AM ONWARDS',
    venue: 'मातृका पूजन, मंडप एवं हल्दी समारोह',
    location: 'निज निवास प्रांगण',
    dressCode: {
      label: 'Wear Yellow / पीताम्बरी',
      swatchColor: '#F5B000',
      description: 'पीत वस्त्र (Yellow Attire)',
    },
    bgImage: '/images/haldi_courtyard_bg.jpg',
    calDate: '20261208T110000/20261208T150000',
  },
  {
    id: 'wedding',
    hindiTitle: 'शुभ विवाह एवं बारात',
    englishTitle: 'Shubh Vivah & Royal Barat',
    subtitle: 'वैदिक मंत्रोच्चार, पाणिग्रहण संस्कार एवं अग्नि के सात फेरों के साथ दांपत्य जीवन का शुभारंभ।',
    date: '9 दिसंबर 2026',
    time: 'सायं 5:00 बजे (बारात प्रस्थान)',
    venue: 'शुभ लग्न एवं सात फेरे • विदाई प्रातः बेला',
    location: 'ग्राम नाहूपुर, पोस्ट सोडरी, जिला आजमगढ़',
    dressCode: {
      label: 'Royal Red & Gold',
      swatchColor: '#801420',
      description: 'शाही परिधान / शेरवानी व लहंगा',
    },
    bgImage: '/images/wedding_royal_mandap_clean.jpg',
    calDate: '20261209T170000/20261210T040000',
  },
];

export default function WeddingFestivitiesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipState, setFlipState] = useState<'idle' | 'out-next' | 'in-next' | 'out-prev' | 'in-prev'>('idle');
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const isTransitioning = useRef(false);

  const flipToCard = (targetIndex: number, direction: 'next' | 'prev') => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;

    // 1. Flip out current card
    setFlipState(direction === 'next' ? 'out-next' : 'out-prev');

    setTimeout(() => {
      // 2. Change content at 90deg hidden point and flip in new card
      setCurrentIndex(targetIndex);
      setFlipState(direction === 'next' ? 'in-next' : 'in-prev');

      setTimeout(() => {
        setFlipState('idle');
        isTransitioning.current = false;
      }, 300);
    }, 240);
  };

  const prevCard = () => {
    const nextIdx = currentIndex === 0 ? FUNCTIONS.length - 1 : currentIndex - 1;
    flipToCard(nextIdx, 'prev');
  };

  const nextCard = () => {
    const nextIdx = currentIndex === FUNCTIONS.length - 1 ? 0 : currentIndex + 1;
    flipToCard(nextIdx, 'next');
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
      // Swiped Left -> Flip to Next Card
      nextCard();
    } else if (distance < -40) {
      // Swiped Right -> Flip to Prev Card
      prevCard();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const current = FUNCTIONS[currentIndex];

  const calUrl =
    'https://calendar.google.com/calendar/render?action=TEMPLATE' +
    '&text=' +
    encodeURIComponent(`${current.hindiTitle} • राकेश संग पूजा`) +
    '&details=' +
    encodeURIComponent(`${current.subtitle} at ${current.venue}, ${current.location}`) +
    '&location=' +
    encodeURIComponent(current.location) +
    `&dates=${current.calDate}`;

  // Determine animation class based on 3D flipState
  let flipClass = '';
  if (flipState === 'out-next') flipClass = 'card-flipping-out-next';
  else if (flipState === 'in-next') flipClass = 'card-flipping-in-next';
  else if (flipState === 'out-prev') flipClass = 'card-flipping-out-prev';
  else if (flipState === 'in-prev') flipClass = 'card-flipping-in-prev';

  return (
    <section className="relative w-full pt-16 pb-20 px-4 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#14080B] via-[#1A0B0F] to-[#120608]">
      {/* Top Festive Marigold Garland */}
      <MarigoldGarland className="-mt-8 mb-6" />

      {/* Section Header with Soft Blur-In Text */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-lg mb-4">
        <div className="flex items-center gap-2 text-[#D4AF37] mb-1 animate-blur-in">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <p className="font-montserrat text-xs tracking-[0.3em] uppercase font-bold text-[#F8E7B4]">
            JOIN US FOR
          </p>
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
        </div>
        <h2 className="font-hindi-royal text-3xl sm:text-4xl text-[#F8E7B4] font-bold drop-shadow animate-blur-in">
          Wedding Festivities • मांगलिक कार्यक्रम
        </h2>
        <p className="font-hindi text-xs sm:text-sm text-[#D4AF37]/90 mt-1 animate-blur-in-delayed">
          तिलक, संगीत, हल्दी एवं शुभ विवाह के पावन प्रसंग
        </p>
      </div>

      {/* PROMINENT SWIPE & FLIP GUIDANCE PILL */}
      <div className="relative z-10 flex items-center gap-2 px-5 py-1.5 rounded-full bg-gradient-to-r from-black/80 via-amber-950/70 to-black/80 border border-amber-400/50 shadow-lg text-[#F8E7B4] text-xs font-hindi mb-5 select-none animate-pulse">
        <span className="text-sm">👈</span>
        <span className="font-bold tracking-wide">
          कार्ड को स्वाइप / फ्लिप करें (Swipe to 3D Flip Card)
        </span>
        <span className="text-sm">👉</span>
      </div>

      {/* 3D PERSPECTIVE STAGE */}
      <div className="relative z-10 w-full max-w-[360px] sm:max-w-[420px] card-flip-stage">
        {/* CAROUSEL CARD WITH 3D FLIP ANIMATION & HOVER */}
        <div
          key={`festivity-${currentIndex}`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`group relative w-full rounded-3xl overflow-hidden border-2 border-[#D4AF37]/60 shadow-[0_20px_50px_rgba(0,0,0,0.85)] bg-black/75 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(212,175,55,0.4)] hover:border-amber-300 ${flipClass}`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Floating Side Quick Navigation Arrows on Card */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevCard();
            }}
            className="absolute left-2.5 top-[110px] sm:top-[125px] z-30 p-2.5 rounded-full bg-black/60 hover:bg-amber-400 text-[#F8E7B4] hover:text-black border border-white/30 backdrop-blur-md shadow-xl transition-all duration-300 hover:scale-115 active:scale-95"
            aria-label="Previous function"
            title="Previous ceremony"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextCard();
            }}
            className="absolute right-2.5 top-[110px] sm:top-[125px] z-30 p-2.5 rounded-full bg-black/60 hover:bg-amber-400 text-[#F8E7B4] hover:text-black border border-white/30 backdrop-blur-md shadow-xl transition-all duration-300 hover:scale-115 active:scale-95"
            aria-label="Next function"
            title="Next ceremony"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Card Background Image with Parallax & Hover Glow */}
          <div className="relative w-full h-[220px] sm:h-[250px] overflow-hidden">
            <Image
              src={current.bgImage}
              alt={current.hindiTitle}
              fill
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />

            {/* Top Pill Counter (e.g. 1 / 4) */}
            <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#D4AF37]/50 text-xs font-montserrat font-bold text-[#F8E7B4]">
              {currentIndex + 1} / {FUNCTIONS.length}
            </div>

            {/* Dress Code Swatch Badge on Image Top Left */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 shadow-md">
              <span
                className="w-3 h-3 rounded-full border border-white/80 shadow-sm"
                style={{ backgroundColor: current.dressCode.swatchColor }}
              />
              <span className="font-montserrat text-[11px] font-bold tracking-wide text-white uppercase">
                {current.dressCode.label}
              </span>
            </div>

            {/* Title on Image Bottom with Soft Blur-In */}
            <div className="absolute bottom-3 inset-x-4 z-20 flex flex-col items-center text-center">
              <h3 className="font-hindi-royal text-2xl sm:text-3xl font-bold text-[#FFF5D1] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] animate-blur-in">
                {current.hindiTitle}
              </h3>
              <p className="font-playfair text-xs text-[#E5C77A] tracking-wider uppercase font-semibold animate-blur-in-delayed">
                {current.englishTitle}
              </p>
            </div>
          </div>

          {/* Card Body Content with Soft Blur-In Text */}
          <div className="p-5 sm:p-6 flex flex-col items-center text-center space-y-4">
            <p className="font-hindi text-xs sm:text-sm text-[#E2D2B0] leading-relaxed animate-blur-in">
              {current.subtitle}
            </p>

            {/* Date & Time Highlights Box with Soft Blur-In */}
            <div className="w-full p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-[#361017]/60 to-amber-950/40 border border-[#D4AF37]/40 shadow-inner flex flex-col items-center gap-1.5 transition-colors group-hover:border-amber-400 animate-blur-in-delayed">
              <div className="flex items-center gap-2 text-[#FFE082]">
                <Calendar className="w-4 h-4 text-[#D4AF37]" />
                <span className="font-hindi text-lg sm:text-xl font-bold">
                  {current.date}
                </span>
              </div>

              {current.time && (
                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-[#F3E5AB]">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-hindi font-medium">{current.time}</span>
                </div>
              )}
            </div>

            {/* Venue & Location */}
            <div className="w-full text-center space-y-1 animate-blur-in-delayed-2">
              <div className="flex items-center justify-center gap-1.5 text-[#D4AF37]">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <span className="font-hindi font-bold text-sm sm:text-base text-[#F8E7B4]">
                  स्थान: {current.venue}
                </span>
              </div>
              <p className="font-hindi text-xs text-[#C5A059]">{current.location}</p>
            </div>

            {/* Dress Code Detail */}
            <div className="w-full pt-1 pb-1 flex items-center justify-center gap-2 border-t border-[#D4AF37]/20">
              <span className="font-montserrat text-xs uppercase text-[#A67C52] tracking-wider font-semibold">
                Dress Code:
              </span>
              <span
                className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-hindi font-bold text-stone-900 shadow-sm"
                style={{ backgroundColor: current.dressCode.swatchColor }}
              >
                <span className="text-white drop-shadow-sm">{current.dressCode.description}</span>
              </span>
            </div>

            {/* Add to Calendar Link */}
            <a
              href={calUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-gradient-to-r from-[#997428] via-[#E2B744] to-[#997428] text-[#1E0902] font-montserrat text-xs font-bold tracking-wider uppercase shadow hover:scale-[1.02] hover:brightness-110 active:scale-95 transition-all duration-300"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>+ Add this event to calendar</span>
            </a>
          </div>

          {/* Carousel Bottom Navigation & Indicator Dots */}
          <div className="px-5 py-3.5 bg-black/85 border-t border-[#D4AF37]/30 flex items-center justify-between">
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevCard();
              }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#D4AF37] text-[#F8E7B4] hover:text-black border border-white/20 transition-all duration-200"
              aria-label="Previous function"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="font-hindi text-xs font-bold">पिछला</span>
            </button>

            {/* Dot Indicators */}
            <div className="flex items-center gap-2">
              {FUNCTIONS.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (i !== currentIndex) {
                      flipToCard(i, i > currentIndex ? 'next' : 'prev');
                    }
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    i === currentIndex
                      ? 'w-7 h-2.5 bg-gradient-to-r from-amber-400 to-amber-600 shadow-sm'
                      : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextCard();
              }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#D4AF37] text-[#F8E7B4] hover:text-black border border-white/20 transition-all duration-200"
              aria-label="Next function"
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
