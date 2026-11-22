'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Sparkles } from 'lucide-react';
import { useLenis } from './LenisProvider';

gsap.registerPlugin(ScrollTrigger);

interface DoorScrollHeroProps {
  onAudioStart?: () => void;
}

export default function DoorScrollHero({ onAudioStart }: DoorScrollHeroProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const doorVideoLayerRef = useRef<HTMLDivElement | null>(null);
  const whiteFlashRef = useRef<HTMLDivElement | null>(null);
  const peacockSectionRef = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const buttonContainerRef = useRef<HTMLDivElement | null>(null);
  const peacockPromptRef = useRef<HTMLDivElement | null>(null);
  const audioTriggered = useRef(false);
  const lenis = useLenis();

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }

    const ctx = gsap.context(() => {
      // Pinned scroll timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=240%',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Audio trigger on first scroll
            if (self.progress > 0.02 && !audioTriggered.current) {
              audioTriggered.current = true;
              onAudioStart?.();
            }

            // Scrub realistic AI door opening video (progress 0.0 to 0.50 maps to video 0.0 to 3.0s)
            if (video && video.duration) {
              const videoProgress = Math.min(1, self.progress / 0.50);
              const targetTime = videoProgress * video.duration;
              if (Math.abs(video.currentTime - targetTime) > 0.04) {
                video.currentTime = targetTime;
              }
            }
          },
        },
      });

      // 1. Initial: fade out button and top badge as doors begin to open
      tl.to(buttonContainerRef.current, {
        opacity: 0,
        y: -30,
        scale: 0.9,
        duration: 0.12,
        ease: 'power2.out',
      }, 0);

      tl.to(badgeRef.current, {
        opacity: 0,
        y: -35,
        scale: 0.95,
        duration: 0.2,
        ease: 'power2.in',
      }, 0.04);

      // 2. White Flash blooms exponentially as the doors open and divine light overwhelms lens
      tl.to(whiteFlashRef.current, {
        opacity: 1,
        duration: 0.18,
        ease: 'power2.in',
      }, 0.36);

      // 3. Hide the door video layer at the peak of the white flash
      tl.set(doorVideoLayerRef.current, {
        opacity: 0,
        pointerEvents: 'none',
      }, 0.52);

      // 4. White flash dissipates, directly revealing the Peacock Terrace Section!
      tl.to(whiteFlashRef.current, {
        opacity: 0,
        duration: 0.32,
        ease: 'power2.out',
      }, 0.52);

      // 5. Peacock Section settles in with subtle scale stabilization
      tl.fromTo(peacockSectionRef.current, {
        scale: 1.06,
      }, {
        scale: 1,
        duration: 0.35,
        ease: 'power2.out',
      }, 0.52);

      // 6. Reveal bottom scroll prompt for subsequent ceremonies
      tl.to(peacockPromptRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.2,
        ease: 'power2.out',
      }, 0.78);

    }, containerRef);

    return () => ctx.revert();
  }, [onAudioStart]);

  // Click the button to open the doors and land directly on the Peacock Terrace page
  const handleOpenDoor = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!audioTriggered.current) {
      audioTriggered.current = true;
      onAudioStart?.();
    }

    if (containerRef.current) {
      const pinDistance = window.innerHeight * 2.4;
      // Scroll to 62% of the pinned sequence where the Peacock Terrace is fully displayed
      const targetScroll = containerRef.current.offsetTop + pinDistance * 0.62;

      if (lenis) {
        lenis.scrollTo(targetScroll, { duration: 1.8, immediate: false });
      } else {
        window.scrollTo({
          top: targetScroll,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden z-30 flex items-center justify-center bg-[#140e0a] select-none"
    >
      {/* ========================================================
          LAYER 1: THE PEACOCK SECTION (Directly revealed on terrace!)
          Scalloped palace arches, lotus pond, royal blue peacock,
          and couple announcement details.
          ======================================================== */}
      <div
        ref={peacockSectionRef}
        className="absolute inset-0 w-full h-full flex items-center justify-center z-10 overflow-hidden"
      >
        {/* Fullscreen Peacock Terrace Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/heavenly_palace_terrace_wide.jpg"
            alt="Heavenly Palace Terrace with Royal Peacock"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Subtle warm ambient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-stone-950/30 pointer-events-none" />
        </div>

        {/* Peacock Section Content - Couple Details */}
        <div className="relative z-10 max-w-2xl w-full flex flex-col items-center text-center text-[#2b1d14] px-4 py-8">
          {/* Top Ganesh Invocation */}
          <div className="flex flex-col items-center">
            <div className="w-12 sm:w-14 h-12 sm:h-14 text-amber-700/80 mb-1 drop-shadow-md">
              <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
                <path d="M50 15 C45 15, 38 20, 38 28 C38 34, 42 38, 45 40 C38 41, 30 46, 30 55 C30 65, 40 70, 48 70 C48 75, 45 80, 40 85 C42 86, 48 85, 52 80 C54 77, 55 72, 55 70 C62 70, 72 65, 72 55 C72 46, 64 41, 57 40 C60 38, 64 34, 64 28 C64 20, 57 15, 50 15 Z M50 22 C53 22, 57 24, 57 28 C57 32, 53 34, 50 34 C47 34, 43 32, 43 28 C43 24, 47 22, 50 22 Z M47 46 C48 46, 52 46, 53 46 C60 47, 65 50, 65 56 C65 62, 58 64, 50 64 C42 64, 35 62, 35 56 C35 50, 40 47, 47 46 Z" />
              </svg>
            </div>
            <p className="font-hindi-royal text-base sm:text-lg text-[#8C6228] font-bold tracking-widest drop-shadow-sm">
              ॥ श्री गणेशाय नमः ॥
            </p>
            <p className="mt-1 text-xs sm:text-sm tracking-wide text-[#5C3B1A] max-w-md font-hindi font-medium">
              परम पिता परमात्मा की असीम अनुकम्पा एवं पूज्य पूर्वजों के शुभाशीर्वाद से मांगलिक परिणय उत्सव
            </p>
          </div>

          {/* Couple Announcement with Gold Monogram */}
          <div className="flex flex-col items-center mt-5 w-full">
            {/* Circular Gold Wreath Monogram */}
            <div className="relative w-24 sm:w-28 h-24 sm:h-28 flex items-center justify-center my-2">
              <div className="absolute inset-0 rounded-full border border-amber-400/60 scale-95 shadow-[0_0_25px_rgba(212,175,55,0.45)]" />
              <div className="absolute inset-1 rounded-full border-2 border-dashed border-[#C5A059]/50 animate-[spin_60s_linear_infinite]" />
              <span className="font-serif text-3xl sm:text-4xl text-[#B38728] font-bold tracking-tight drop-shadow-md">
                RP
              </span>
            </div>

            {/* Groom Details */}
            <div className="flex flex-col items-center mt-1">
              <h1 className="font-hindi-royal text-2xl sm:text-4xl md:text-5xl text-[#821927] font-bold tracking-wide drop-shadow-md">
                <span className="text-xl sm:text-3xl text-[#8C5E1E] font-semibold mr-2">वर पक्ष:</span>
                <span>राकेश यादव</span>
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-[#3E2C1E] font-hindi font-bold">
                सुपुत्र: <span className="text-[#821927]">श्रीमती नीलम देवी</span> एवं <span className="text-[#821927]">श्री रामचन्द्र यादव</span>
              </p>
              <p className="text-[11px] sm:text-xs text-[#6B4B27] font-hindi font-medium mt-0.5">
                ग्राम - पठखौली, पोस्ट - शिवली राशिद गंज, जिला - आजमगढ़
              </p>
            </div>

            {/* संग Connector */}
            <div className="flex items-center gap-4 my-2.5">
              <span className="w-12 sm:w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
              <span className="font-hindi-royal text-sm sm:text-base text-[#8C6228] font-bold">
                संग
              </span>
              <span className="w-12 sm:w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
            </div>

            {/* Bride Details */}
            <div className="flex flex-col items-center">
              <h2 className="font-hindi-royal text-2xl sm:text-4xl md:text-5xl text-[#821927] font-bold tracking-wide drop-shadow-md">
                <span className="text-xl sm:text-3xl text-[#8C5E1E] font-semibold mr-2">वधू पक्ष:</span>
                <span>पूजा यादव</span>
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-[#3E2C1E] font-hindi font-bold">
                सुपुत्री: <span className="text-[#821927]">श्रीमती खुशी देवी</span> एवं <span className="text-[#821927]">श्री कर्मजीत यादव</span>
              </p>
              <p className="text-[11px] sm:text-xs text-[#6B4B27] font-hindi font-medium mt-0.5">
                ग्राम - नाहूपुर, पोस्ट - सोडरी, जिला - आजमगढ़
              </p>
            </div>

            <div className="text-amber-800/70 tracking-widest text-sm mt-3">
              ✦ ✦ ✦
            </div>
          </div>
        </div>

        {/* Scroll down for ceremonies prompt */}
        <div
          ref={peacockPromptRef}
          className="absolute bottom-6 inset-x-0 flex flex-col items-center justify-center z-20 pointer-events-none opacity-0 translate-y-3"
        >
          <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-black/50 backdrop-blur-md border border-amber-400/40 text-[#F8E7B4] shadow-xl">
            <span className="font-hindi text-xs sm:text-sm tracking-wide font-medium">
              मांगलिक कार्यक्रम देखने के लिए नीचे स्क्रॉल करें
            </span>
            <ChevronDown className="w-4 h-4 text-amber-400 animate-bounce" />
          </div>
        </div>
      </div>

      {/* ========================================================
          LAYER 2: PURE WHITE DIVINE FLASH SCREEN
          Engulfs the entire screen as doors swing wide open
          ======================================================== */}
      <div
        ref={whiteFlashRef}
        className="fixed inset-0 pointer-events-none z-40 opacity-0 bg-white"
        style={{
          background: 'radial-gradient(circle at center, #ffffff 0%, #fffef7 60%, #fff8e7 100%)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-radial from-amber-100/90 via-white to-transparent" />
      </div>

      {/* ========================================================
          LAYER 3: REALISTIC AI-GENERATED PALACE DOOR OPENING VIDEO
          Full-bleed video that smoothly scrubs with scroll or button
          ======================================================== */}
      <div
        ref={doorVideoLayerRef}
        onClick={handleOpenDoor}
        className="absolute inset-0 w-full h-full z-30 cursor-pointer overflow-hidden bg-[#140e0a]"
      >
        <video
          ref={videoRef}
          src="/video/door_opening_realistic.mp4"
          playsInline
          muted
          preload="auto"
          className="w-full h-full object-cover object-center"
        />

        {/* Warm subtle ambient vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/35 pointer-events-none" />

        {/* Top Ganesh & Couple Header Badge on Closed Door */}
        <div
          ref={badgeRef}
          className="absolute top-8 sm:top-10 inset-x-0 flex flex-col items-center justify-center z-20 pointer-events-none px-4"
        >
          <div className="bg-black/80 backdrop-blur-md px-7 py-3 rounded-full border border-amber-400/50 shadow-2xl">
            <p className="font-hindi-royal text-sm sm:text-base text-[#F8E7B4] tracking-wider text-center">
              ॥ श्री गणेशाय नमः ॥
            </p>
            <p className="font-hindi text-xs sm:text-sm tracking-widest text-[#D4AF37] uppercase font-bold mt-0.5 text-center">
              राकेश संग पूजा
            </p>
          </div>
        </div>

        {/* Prominent Royal Interactive Button To Open Door to Peacock Page */}
        <div
          ref={buttonContainerRef}
          className="absolute bottom-10 sm:bottom-14 inset-x-0 flex flex-col items-center justify-center z-30 px-4"
        >
          <button
            onClick={handleOpenDoor}
            className="group relative flex flex-col items-center gap-1.5 px-8 sm:px-12 py-3.5 sm:py-4.5 rounded-full bg-gradient-to-r from-[#997428] via-[#E2B744] to-[#997428] border-2 border-[#FFF0C2] shadow-[0_0_35px_rgba(212,175,55,0.75),0_0_70px_rgba(212,175,55,0.45)] hover:shadow-[0_0_55px_rgba(212,175,55,0.95)] hover:scale-105 active:scale-95 transition-all duration-300 pointer-events-auto cursor-pointer"
          >
            {/* Outer pulsating golden aura */}
            <span className="absolute -inset-1 rounded-full bg-amber-400/35 blur-md group-hover:bg-amber-400/60 animate-pulse pointer-events-none" />

            {/* Button Main Text */}
            <div className="relative z-10 flex items-center gap-2.5 sm:gap-3 text-[#2a1708]">
              <Sparkles className="w-5 h-5 text-amber-950 animate-spin" />
              <span className="font-hindi text-base sm:text-xl font-bold tracking-wider drop-shadow-sm">
                द्वार खोलें • निमंत्रण पत्र देखें
              </span>
              <Sparkles className="w-5 h-5 text-amber-950 animate-spin" />
            </div>

            {/* Subtitle / Hint */}
            <span className="relative z-10 text-[11px] sm:text-xs font-hindi text-amber-950/85 font-semibold tracking-wide">
              (Tap to Open Invitation • शहनाई के साथ)
            </span>
          </button>

          {/* Secondary Scroll Down Indicator */}
          <div className="flex items-center gap-1.5 text-[#F8E7B4]/85 text-xs font-hindi mt-3.5 drop-shadow">
            <span>या नीचे स्क्रॉल करें</span>
            <ChevronDown className="w-4 h-4 text-amber-400 animate-bounce" />
          </div>
        </div>

      </div>
    </div>
  );
}
