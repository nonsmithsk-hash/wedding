'use client';

import React, { useState, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import AudioPlayer from '@/components/AudioPlayer';
import PeacockTerraceHero from '@/components/PeacockTerraceHero';
import CeremonySections from '@/components/CeremonySections';
import { weddingData } from '@/data/weddingData';

export default function WeddingInvitationPage() {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const { couple, invocation } = weddingData;

  const handleOpenDoor = () => {
    if (isOpening || hasEntered) return;
    setIsOpening(true);
    setIsPlayingAudio(true);

    // Play the door opening animation video forward
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }

    // Smoothly transition from the white bloom into Peacock Terrace (Scene 2)
    setTimeout(() => {
      setHasEntered(true);
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }, 2800);
  };

  return (
    <main className="relative min-h-screen bg-[#100b08] text-[#2b1d14] overflow-x-hidden selection:bg-amber-200 selection:text-amber-900">
      {/* Persistent Floating Shehnai Audio Player */}
      <AudioPlayer
        isPlaying={isPlayingAudio}
        onTogglePlay={() => setIsPlayingAudio(!isPlayingAudio)}
      />

      {/* ========================================================
          FULLSCREEN REALISTIC PALACE DOOR ENTRANCE (Scene 1)
          ======================================================== */}
      {!hasEntered && (
        <div
          onClick={handleOpenDoor}
          className={`fixed inset-0 w-full h-full z-40 cursor-pointer overflow-hidden bg-[#100b08] select-none transition-opacity duration-1000 ${
            isOpening ? 'pointer-events-none' : 'pointer-events-auto'
          }`}
        >
          {/* Palace Door Opening Video */}
          <video
            ref={videoRef}
            src="/video/door_opening_realistic.mp4"
            poster="/images/royal_palace_doors_hd.jpg"
            playsInline
            muted
            preload="auto"
            className="w-full h-full object-cover object-center"
          />

          {/* Ambient Warm Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40 pointer-events-none" />

          {/* Top Spiritual Invocation Badge */}
          <div
            className={`absolute top-8 sm:top-12 inset-x-0 flex flex-col items-center justify-center z-20 pointer-events-none px-4 transition-all duration-700 ${
              isOpening ? 'opacity-0 -translate-y-8' : 'opacity-100 translate-y-0'
            }`}
          >
            <div className="bg-black/75 backdrop-blur-md px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border border-amber-400/50 shadow-2xl flex flex-col items-center">
              <p className="font-hindi text-xs sm:text-sm text-[#F8E7B4] tracking-[0.25em] text-center font-bold">
                {invocation.shloka}
              </p>
              <p className="font-hindi text-xs sm:text-sm text-amber-300 tracking-wider text-center font-bold mt-0.5">
                {couple.headline}
              </p>
            </div>
          </div>

          {/* Center Call to Action: Royal Door Opening Button */}
          <div
            className={`absolute bottom-10 sm:bottom-14 inset-x-0 flex flex-col items-center justify-center z-30 px-4 transition-all duration-700 ${
              isOpening ? 'opacity-0 scale-90 translate-y-4' : 'opacity-100 scale-100 translate-y-0'
            }`}
          >
            <button
              id="open-door-btn"
              onClick={handleOpenDoor}
              className="group relative flex flex-col items-center justify-center gap-1 px-8 sm:px-12 py-3 sm:py-4 rounded-full bg-gradient-to-r from-[#997428] via-[#E2B744] to-[#997428] border-2 border-[#FFF0C2] shadow-[0_0_35px_rgba(212,175,55,0.7),0_0_70px_rgba(212,175,55,0.4)] hover:shadow-[0_0_55px_rgba(212,175,55,0.95)] hover:scale-105 active:scale-95 transition-all duration-300 pointer-events-auto cursor-pointer"
            >
              {/* Outer Pulsating Golden Aura */}
              <span className="absolute -inset-1 rounded-full bg-amber-400/40 blur-md group-hover:bg-amber-400/60 animate-pulse pointer-events-none" />

              {/* Button Main Text */}
              <div className="relative z-10 flex items-center gap-2.5 sm:gap-3 text-[#2a1708]">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-950 animate-spin" />
                <span className="font-serif text-sm sm:text-base font-bold tracking-wider drop-shadow-sm uppercase">
                  Open Royal Invitation • द्वार खोलें
                </span>
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-950 animate-spin" />
              </div>

              {/* Subtitle / Hint */}
              <span className="relative z-10 text-[10px] sm:text-xs font-serif text-amber-950/85 font-semibold tracking-wide">
                (Tap to Open with Music • शहनाई वादन के साथ)
              </span>
            </button>
          </div>

          {/* Divine White Light Bloom on Door Open */}
          <div
            className={`fixed inset-0 pointer-events-none z-50 bg-white transition-opacity duration-1000 ease-in-out ${
              isOpening ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background:
                'radial-gradient(circle at center, #ffffff 0%, #fffef7 60%, #fff8e7 100%)',
            }}
          />
        </div>
      )}

      {/* ========================================================
          FULL CEREMONIES STORY (Scenes 2 - 7)
          Seamless single-page scroll with persistent music
          ======================================================== */}
      <div className="w-full flex flex-col items-center">
        {/* Scene 2: Peacock Terrace Hero (Couple Announcement) */}
        <PeacockTerraceHero />

        {/* Scenes 3 - 7: Tilak, Sangeet, Haldi, Wedding, Family & Regards */}
        <CeremonySections />
      </div>
    </main>
  );
}
