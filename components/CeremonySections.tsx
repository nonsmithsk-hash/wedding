'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  ExternalLink,
  Users,
  Compass,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import RosePetals from './RosePetals';
import YellowFlowerPetals from './YellowFlowerPetals';
import { weddingData } from '@/data/weddingData';

export default function CeremonySections() {
  const { ceremonies, family, couple, venueMapUrl } = weddingData;
  const [visibleCards, setVisibleCards] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.15 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 160,
      spread: 120,
      origin: { y: 0.65 },
      colors: ['#D4AF37', '#8B0000', '#F8E7B4', '#E6A15C', '#C5A059'],
    });
  };

  const createGoogleCalendarUrl = (
    title: string,
    details: string,
    location: string,
    dates?: string
  ) => {
    const encodedTitle = encodeURIComponent(title);
    const encodedDetails = encodeURIComponent(details);
    const encodedLocation = encodeURIComponent(location);
    const dateParam = dates ? `&dates=${dates}` : '';
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodedTitle}&details=${encodedDetails}&location=${encodedLocation}${dateParam}`;
  };

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* ========================================================
          CEREMONY SECTIONS (Tilak, Sangeet, Haldi, Shubh Vivaah)
          ======================================================== */}
      {ceremonies.map((event, index) => {
        const isWedding = event.id === 'wedding';
        const isSangeet = event.id === 'sangeet';
        const isHaldi = event.id === 'haldi';
        const isVisible = visibleCards[event.id];

        const gcalDates =
          event.id === 'tilak'
            ? '20261128/20261129'
            : event.id === 'sangeet'
            ? '20261127T180000/20261127T230000'
            : event.id === 'wedding'
            ? '20261209T170000/20261210T040000'
            : undefined;

        const gcalUrl = createGoogleCalendarUrl(
          `${event.title} • ${couple.headline}`,
          `${event.subtitle || event.title} at ${event.venue}, ${event.location}`,
          event.location,
          gcalDates
        );

        // Dynamic royal frosted glass styling per event atmosphere
        const glassStyle: React.CSSProperties = isSangeet
          ? {
              background:
                'linear-gradient(135deg, rgba(18, 12, 8, 0.85) 0%, rgba(28, 18, 12, 0.74) 100%)',
              backdropFilter: 'blur(22px) saturate(180%)',
              WebkitBackdropFilter: 'blur(22px) saturate(180%)',
              boxShadow:
                '0 30px 70px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 215, 0, 0.35), inset 0 0 0 1px rgba(212, 175, 55, 0.45)',
              borderColor: 'rgba(212, 175, 55, 0.6)',
            }
          : isHaldi
          ? {
              background:
                'linear-gradient(135deg, rgba(255, 254, 245, 0.84) 0%, rgba(255, 250, 230, 0.72) 100%)',
              backdropFilter: 'blur(20px) saturate(170%)',
              WebkitBackdropFilter: 'blur(20px) saturate(170%)',
              boxShadow:
                '0 30px 70px rgba(0, 0, 0, 0.40), inset 0 1px 0 rgba(255, 255, 255, 0.85), inset 0 0 0 1px rgba(245, 158, 11, 0.4)',
              borderColor: 'rgba(245, 158, 11, 0.65)',
            }
          : isWedding
          ? {
              background:
                'linear-gradient(135deg, rgba(255, 252, 248, 0.85) 0%, rgba(255, 246, 242, 0.74) 100%)',
              backdropFilter: 'blur(20px) saturate(170%)',
              WebkitBackdropFilter: 'blur(20px) saturate(170%)',
              boxShadow:
                '0 30px 70px rgba(0, 0, 0, 0.40), inset 0 1px 0 rgba(255, 255, 255, 0.85), inset 0 0 0 1px rgba(190, 24, 93, 0.35)',
              borderColor: 'rgba(159, 18, 57, 0.55)',
            }
          : {
              background:
                'linear-gradient(135deg, rgba(255, 253, 248, 0.84) 0%, rgba(255, 247, 235, 0.72) 100%)',
              backdropFilter: 'blur(20px) saturate(170%)',
              WebkitBackdropFilter: 'blur(20px) saturate(170%)',
              boxShadow:
                '0 30px 70px rgba(0, 0, 0, 0.40), inset 0 1px 0 rgba(255, 255, 255, 0.85), inset 0 0 0 1px rgba(212, 175, 55, 0.45)',
              borderColor: 'rgba(212, 175, 55, 0.65)',
            };

        return (
          <section
            key={event.id}
            id={event.id}
            className="group relative w-full min-h-screen flex items-center justify-center py-20 px-4 sm:px-8 overflow-hidden bg-[#120c09]"
          >
            {/* Fullscreen Pristine HD Background Image (0 text, 0 people, razor-sharp) */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <Image
                src={event.bgImage}
                alt={event.title}
                fill
                unoptimized
                className="object-cover object-center scale-100 transition-transform duration-1000 ease-out group-hover:scale-105"
                priority={index < 2}
              />
              {/* Subtle ambient lighting vignette tailored to each ceremony atmosphere */}
              <div
                className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
                  isSangeet
                    ? 'bg-gradient-to-t from-black/85 via-black/45 to-black/60'
                    : isHaldi
                    ? 'bg-gradient-to-t from-amber-950/45 via-stone-950/20 to-amber-950/35'
                    : isWedding
                    ? 'bg-gradient-to-t from-rose-950/50 via-stone-950/25 to-rose-950/35'
                    : 'bg-gradient-to-t from-stone-950/55 via-stone-950/25 to-stone-950/40'
                }`}
              />
            </div>

            {/* Falling Rose Petals Canvas for Wedding Scene */}
            {isWedding && <RosePetals />}

            {/* Falling Yellow Flower Marigold Petals Canvas for Haldi Utsav Scene */}
            {isHaldi && <YellowFlowerPetals />}

            {/* Content Card with Scroll Entrance & 3D Interactive Hover Elevation */}
            <div className="relative z-10 max-w-xl w-full flex flex-col items-center text-center py-6">
              <div
                style={glassStyle}
                className={`flex flex-col items-center p-6 sm:p-10 rounded-3xl border transition-all duration-700 ease-out hover:-translate-y-2.5 hover:shadow-[0_35px_80px_rgba(212,175,55,0.45)] w-full cursor-default ${
                  isVisible
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-10 scale-95'
                } ${isSangeet ? 'text-white' : 'text-[#1F140D]'}`}
              >
                {/* Event Category Badge */}
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`font-hindi text-xs sm:text-sm tracking-[0.25em] font-extrabold uppercase ${
                      isSangeet
                        ? 'text-[#F8E7B4]'
                        : isHaldi
                        ? 'text-[#B85D00]'
                        : 'text-[#7A1C2B]'
                    }`}
                  >
                    {event.badgeText}
                  </span>
                </div>

                {/* Ceremony Title */}
                <h2
                  className={`font-hindi-royal text-3xl sm:text-5xl font-bold tracking-wide drop-shadow-sm transition-transform duration-300 hover:scale-[1.02] ${
                    isSangeet
                      ? 'text-[#FFDF73]'
                      : isWedding
                      ? 'text-[#821927]'
                      : isHaldi
                      ? 'text-[#B85D00]'
                      : 'text-[#7E1A29]'
                  }`}
                >
                  {event.title}
                </h2>

                {/* Subtitle / Description - High Contrast Deep Color */}
                {event.subtitle && (
                  <p
                    className={`font-hindi text-sm sm:text-base font-extrabold mt-2.5 max-w-md leading-relaxed ${
                      isSangeet ? 'text-[#FFF2D6]' : 'text-[#180D06]'
                    }`}
                  >
                    {event.subtitle}
                  </p>
                )}

                <div
                  className={`w-24 h-[1.5px] my-4 ${
                    isSangeet
                      ? 'bg-amber-400/60'
                      : isWedding
                      ? 'bg-rose-900/50'
                      : 'bg-[#C5A059]'
                  }`}
                />

                {/* Date & Time Timing Banner - Translucent Pill with Hover Elevation */}
                {(event.date || event.time) && (
                  <div
                    style={{
                      background: isSangeet
                        ? 'rgba(0, 0, 0, 0.55)'
                        : 'rgba(255, 255, 255, 0.75)',
                      backdropFilter: 'blur(10px)',
                      border: isSangeet
                        ? '1.5px solid rgba(245, 158, 11, 0.55)'
                        : isHaldi
                        ? '1.5px solid rgba(217, 119, 6, 0.6)'
                        : '1.5px solid rgba(197, 160, 89, 0.65)',
                    }}
                    className={`inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-6 py-2.5 rounded-full shadow-sm transition-all duration-300 hover:scale-105 text-sm sm:text-base font-hindi font-black ${
                      isSangeet
                        ? 'text-[#FFD700]'
                        : isHaldi
                        ? 'text-[#9E4A00]'
                        : 'text-[#751221]'
                    }`}
                  >
                    {event.date && (
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar
                          size={18}
                          className={
                            isSangeet
                              ? 'text-amber-400'
                              : isHaldi
                              ? 'text-[#9E4A00]'
                              : 'text-[#751221]'
                          }
                        />
                        <span>{event.date}</span>
                      </span>
                    )}
                    {event.date && event.time && (
                      <span className="opacity-40">•</span>
                    )}
                    {event.time && (
                      <span className="inline-flex items-center gap-1.5">
                        <Clock
                          size={18}
                          className={
                            isSangeet
                              ? 'text-amber-400'
                              : isHaldi
                              ? 'text-[#9E4A00]'
                              : 'text-[#751221]'
                          }
                        />
                        <span>{event.time}</span>
                      </span>
                    )}
                  </div>
                )}

                {/* Detailed Schedule Items if present (Wedding) */}
                {event.scheduleItems && event.scheduleItems.length > 0 && (
                  <div className="w-full my-4 flex flex-col gap-2.5">
                    {event.scheduleItems.map((item, dIdx) => (
                      <div
                        key={dIdx}
                        style={{
                          background: 'rgba(255, 255, 255, 0.75)',
                          backdropFilter: 'blur(10px)',
                          border: '1.5px solid rgba(190, 24, 93, 0.55)',
                        }}
                        className="p-3.5 rounded-2xl flex flex-col items-center gap-1 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:border-rose-400 hover:shadow-md"
                      >
                        <span className="font-hindi-royal text-base font-black text-[#751221]">
                          {item.label}
                        </span>
                        <span className="font-hindi text-xs sm:text-sm font-extrabold text-[#180D06]">
                          {item.timeVenue}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Venue Details - Translucent Frosted Glass Box */}
                <div
                  style={{
                    background: isSangeet
                      ? 'rgba(0, 0, 0, 0.50)'
                      : 'rgba(255, 255, 255, 0.75)',
                    backdropFilter: 'blur(10px)',
                    border: isSangeet
                      ? '1.5px solid rgba(245, 158, 11, 0.5)'
                      : isHaldi
                      ? '1.5px solid rgba(217, 119, 6, 0.6)'
                      : '1.5px solid rgba(197, 160, 89, 0.65)',
                  }}
                  className="mt-4 p-4 rounded-2xl w-full transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
                >
                  <p
                    className={`font-hindi-royal text-base sm:text-lg font-black tracking-wider ${
                      isSangeet
                        ? 'text-[#FFD700]'
                        : isHaldi
                        ? 'text-[#9E4A00]'
                        : 'text-[#751221]'
                    }`}
                  >
                    {event.venue}
                  </p>
                  <p
                    className={`font-hindi text-xs sm:text-sm font-extrabold tracking-wide mt-1 ${
                      isSangeet ? 'text-[#FFF2D6]' : 'text-[#180D06]'
                    }`}
                  >
                    {event.location}
                  </p>
                </div>

                {/* Interactive Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                  <a
                    href={gcalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 text-stone-950 shadow-md hover:brightness-110 hover:scale-105 active:scale-95 transition-all duration-300"
                  >
                    <Calendar size={15} />
                    <span>कैलेंडर में जोड़ें</span>
                  </a>

                  <a
                    href={venueMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: 'rgba(20, 14, 10, 0.85)',
                      backdropFilter: 'blur(8px)',
                      border: '1.5px solid rgba(212, 175, 55, 0.7)',
                    }}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide hover:bg-black text-[#F8E7B4] shadow-md hover:border-amber-300 hover:scale-105 active:scale-95 transition-all duration-300"
                  >
                    <MapPin size={15} className="text-amber-400" />
                    <span>स्थान का नक्शा देखें</span>
                    <ExternalLink size={13} className="opacity-80" />
                  </a>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ========================================================
          SCENE 7: FAMILY & REGARDS (स्वागताकांक्षी एवं दर्शनार्थी)
          Heritage Royal Frosted Glass (Translucent & High-Contrast)
          ======================================================== */}
      <section
        id="family-rsvp"
        className="group relative w-full min-h-screen flex items-center justify-center py-20 px-4 sm:px-8 overflow-hidden bg-[#100b08]"
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/family_pavilion_clean_hd.jpg"
            alt="Heritage Lotus Pavilion"
            fill
            unoptimized
            className="object-cover object-center scale-100 transition-transform duration-1000 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-stone-950/40 to-stone-950/55 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-xl w-full flex flex-col items-center text-center py-6">
          <div
            style={{
              background:
                'linear-gradient(135deg, rgba(255, 253, 248, 0.85) 0%, rgba(255, 247, 236, 0.74) 100%)',
              backdropFilter: 'blur(20px) saturate(170%)',
              WebkitBackdropFilter: 'blur(20px) saturate(170%)',
              boxShadow:
                '0 30px 70px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.85), inset 0 0 0 1px rgba(212, 175, 55, 0.5)',
              borderColor: 'rgba(212, 175, 55, 0.65)',
            }}
            className={`flex flex-col items-center p-6 sm:p-10 rounded-3xl border transition-all duration-700 ease-out hover:-translate-y-2.5 hover:shadow-[0_35px_80px_rgba(212,175,55,0.45)] w-full gap-5 text-[#1F140D] cursor-default ${
              visibleCards['family-rsvp']
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-10 scale-95'
            }`}
          >
            {/* Header Invocation */}
            <div>
              <p className="font-hindi text-xs sm:text-sm tracking-[0.25em] text-[#8C5E1E] uppercase font-bold">
                ॥ स्वागताकांक्षी एवं दर्शनार्थी ॥
              </p>
              <h2 className="font-hindi-royal text-2xl sm:text-3xl text-[#7A1C2B] font-bold mt-1.5 tracking-wide">
                समस्त यादव परिवार
              </h2>
            </div>

            <div className="w-20 h-[1.5px] bg-[#997E24]/60" />

            {/* Bal Aagrah Card - Translucent Frosted Card */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.75)',
                backdropFilter: 'blur(10px)',
                border: '1.5px solid rgba(212, 175, 55, 0.65)',
              }}
              className="w-full p-4 sm:p-5 rounded-2xl shadow-sm flex flex-col items-center transition-all duration-300 hover:scale-[1.02] hover:border-amber-400 hover:shadow-md"
            >
              <span className="font-hindi-royal text-base font-black text-[#9E4A00] mb-1 tracking-wider">
                ॥ बाल आग्रह ॥
              </span>
              <p className="font-hindi text-base sm:text-lg font-black text-[#751221] italic whitespace-pre-line leading-relaxed">
                &ldquo;{family.balAagrah.quote}&rdquo;
              </p>
              <p className="font-hindi text-xs sm:text-sm text-[#180D06] font-extrabold mt-2">
                स्नेही बच्चे:{' '}
                <span className="font-black text-[#9E4A00] text-sm sm:text-base">
                  {family.balAagrah.children}
                </span>
              </p>
            </div>

            {/* Chacha Ji Card */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.75)',
                backdropFilter: 'blur(10px)',
                border: '1.5px solid rgba(212, 175, 55, 0.55)',
              }}
              className="w-full p-4 rounded-2xl shadow-sm flex flex-col items-center transition-all duration-300 hover:scale-[1.02] hover:border-amber-300 hover:shadow-md"
            >
              <span className="font-hindi-royal text-xs sm:text-sm font-black text-[#8C5E1E] uppercase tracking-wider">
                पूज्य चाचा जी
              </span>
              <p className="font-hindi text-base sm:text-lg font-black text-[#180D06] mt-1">
                {family.chachaJi}
              </p>
            </div>

            {/* Brothers (भ्रातृवृन्द) Card */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.75)',
                backdropFilter: 'blur(10px)',
                border: '1.5px solid rgba(212, 175, 55, 0.55)',
              }}
              className="w-full p-4 sm:p-5 rounded-2xl shadow-sm flex flex-col items-center transition-all duration-300 hover:scale-[1.02] hover:border-amber-300 hover:shadow-md"
            >
              <div className="flex items-center gap-1.5 text-[#8C5E1E] mb-1">
                <Users size={16} />
                <span className="font-hindi-royal text-xs sm:text-sm font-black uppercase tracking-wider">
                  भ्रातृवृन्द
                </span>
              </div>
              <p className="font-hindi text-sm sm:text-base font-extrabold text-[#180D06] leading-relaxed max-w-lg">
                {family.brothers}
              </p>
            </div>

            {/* Vineet Card */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.75)',
                backdropFilter: 'blur(10px)',
                border: '1.5px solid rgba(212, 175, 55, 0.65)',
              }}
              className="w-full p-4 rounded-2xl shadow-sm flex flex-col items-center transition-all duration-300 hover:scale-[1.02] hover:border-amber-400 hover:shadow-md"
            >
              <span className="font-hindi-royal text-xs sm:text-sm font-black text-[#751221]">
                विनीत
              </span>
              <p className="font-hindi text-base sm:text-lg font-black text-[#180D06] mt-0.5">
                {family.vineet.family}
              </p>
              <p className="font-hindi text-xs sm:text-sm font-extrabold text-[#180D06] mt-0.5">
                {family.vineet.address}
              </p>
            </div>

            {/* Venue Navigation Button (Exact User Link) */}
            <div className="w-full pt-1 flex flex-col items-center">
              <a
                href={venueMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'rgba(20, 14, 10, 0.88)',
                  backdropFilter: 'blur(8px)',
                  border: '1.5px solid rgba(212, 175, 55, 0.7)',
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-full hover:bg-black text-[#F8E7B4] shadow-lg hover:border-amber-300 hover:scale-105 active:scale-95 transition-all duration-300 text-xs sm:text-sm font-hindi font-bold"
              >
                <Compass size={18} className="text-amber-400 animate-pulse" />
                <span>विवाह स्थल का रास्ता देखें (Google Maps)</span>
                <ExternalLink size={14} className="opacity-80" />
              </a>
            </div>

            {/* Celebration Blessings Button (Confetti) - Zero Emojis */}
            <button
              onClick={triggerConfetti}
              className="mt-1 flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#997E24] via-[#D4AF37] to-[#997E24] text-stone-950 text-sm sm:text-base font-hindi font-bold shadow-[0_4px_25px_rgba(212,175,55,0.45)] hover:shadow-[0_6px_30px_rgba(212,175,55,0.75)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <Sparkles size={18} className="text-amber-900" />
              <span>शुभाशीर्वाद भेजें (Send Blessings)</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          ELEGANT ROYAL FOOTER WITH PROFESSIONAL DESIGNER SIGNATURE
          ======================================================== */}
      <footer className="relative z-10 w-full pt-10 pb-16 px-4 text-center text-[#C5A059] font-hindi border-t border-[#C5A059]/30 bg-gradient-to-b from-[#140e0b] via-[#0d0907] to-black">
        <p className="font-hindi-royal font-bold text-amber-200 text-lg sm:text-xl tracking-wide">
          {couple.headline}
        </p>
        <p className="text-xs sm:text-sm text-amber-100 mt-1 font-semibold">
          मांगलिक परिणय उत्सव • आजमगढ़
        </p>
        <p className="text-[11px] sm:text-xs text-[#C5A059] mt-2 tracking-widest font-semibold">
          ॥ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ॥
        </p>

        {/* ========================================================
            PROFESSIONAL SIGNATURE: CRAFTED BY SADESH
            ======================================================== */}
        <div className="mt-12 pt-8 border-t border-amber-400/20 flex flex-col items-center justify-center">
          <div className="inline-flex items-center gap-2.5 px-7 py-2.5 rounded-full border border-amber-400/50 bg-stone-950/90 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-amber-400 hover:shadow-[0_4px_25px_rgba(212,175,55,0.35)]">
            <span className="font-serif text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#C5A059]">
              Crafted by
            </span>
            <span className="font-serif text-xs sm:text-sm font-bold tracking-[0.3em] text-[#F8E7B4] pl-0.5">
              Sadesh
            </span>
          </div>

          <p className="text-[10px] sm:text-[11px] font-hindi text-[#D4AF37] font-semibold mt-2 tracking-widest">
            सदेश द्वारा अभिकल्पित एवं निर्मित
          </p>
        </div>
      </footer>
    </div>
  );
}
