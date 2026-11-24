'use client';

import React, { useState, useRef } from 'react';
import AudioPlayer from '@/components/AudioPlayer';
import RosePetals from '@/components/RosePetals';
import BookCoverIntro from '@/components/BookCoverIntro';
import NamesRevealHero from '@/components/NamesRevealHero';
import RoyalScrollReveal from '@/components/RoyalScrollReveal';
import CountdownTimer from '@/components/CountdownTimer';
import WeddingFestivitiesCarousel from '@/components/WeddingFestivitiesCarousel';
import OurStoryCarousel from '@/components/OurStoryCarousel';
import ReceptionCard from '@/components/ReceptionCard';
import HowToReach from '@/components/HowToReach';
import { BookOpen, Sparkles } from 'lucide-react';

export default function WeddingInvitationPage() {
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const handleOpenBook = () => {
    setIsBookOpen(true);
    setIsPlayingAudio(true);
  };

  const handleScrollDown = () => {
    if (contentRef.current) {
      window.scrollTo({
        top: window.innerHeight * 0.9,
        behavior: 'smooth',
      });
    }
  };

  const handleSwitchToBookView = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsBookOpen(false);
  };

  return (
    <main className="relative min-h-screen bg-[#100609] text-[#2b1d14] overflow-x-hidden selection:bg-amber-200 selection:text-amber-900">
      {/* Soft Background Petals */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <RosePetals />
      </div>

      {/* Floating Shehnai Audio Player (Top Right) */}
      <AudioPlayer
        isPlaying={isPlayingAudio}
        onTogglePlay={() => setIsPlayingAudio(!isPlayingAudio)}
      />

      {/* PROMINENT 3D BOOK FORMAT SWITCHER (Visible when inside invitation) */}
      {isBookOpen && (
        <button
          onClick={handleSwitchToBookView}
          className="fixed top-3 left-3 sm:top-5 sm:left-5 z-40 flex items-center gap-2.5 px-3.5 sm:px-4 py-2 rounded-full bg-gradient-to-r from-[#7A1422] via-[#911627] to-[#540813] border-2 border-[#E5C158] shadow-[0_4px_25px_rgba(212,175,55,0.45)] text-[#F8E7B4] hover:shadow-[0_6px_35px_rgba(212,175,55,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 group backdrop-blur-md"
          title="Switch to 3D Book View"
        >
          <span className="text-lg sm:text-xl drop-shadow">📖</span>
          <div className="flex flex-col text-left">
            <span className="font-hindi text-xs sm:text-sm font-bold text-[#FFF5D1] leading-tight flex items-center gap-1">
              3D किताब स्वरूप <span className="font-serif text-[10px] sm:text-xs text-[#E5C158] font-normal tracking-wider">(Book View)</span>
            </span>
            <span className="text-[10px] sm:text-[11px] text-[#E2D2B0] font-hindi leading-none hidden xs:inline-block">
              किताब की तरह पढ़ने के लिए यहाँ दबाएं
            </span>
          </div>
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin shrink-0 ml-0.5" />
        </button>
      )}

      {/* SCREEN 1: 3D BOOK COVER INTRO (Closed Maroon Shubh Vivaah Book) */}
      <BookCoverIntro isOpen={isBookOpen} onOpen={handleOpenBook} />

      {/* MAIN INVITATION CONTENT (Revealed when book is opened) */}
      <div
        ref={contentRef}
        className={`w-full transition-opacity duration-1000 ${
          isBookOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* SCREEN 2: NAMES REVEAL (Arch with Marigold Garland, Ganesh & Families) */}
        <NamesRevealHero onScrollDown={handleScrollDown} />

        {/* SCREEN 3: PULL TO REVEAL (Interactive Royal Scroll with Tassel) */}
        <RoyalScrollReveal />

        {/* SCREEN 4: LIVE COUNTDOWN & ADD TO CALENDAR */}
        <div className="relative w-full py-8 bg-gradient-to-b from-[#140508] to-[#14080B] border-y border-[#D4AF37]/20">
          <CountdownTimer />
        </div>

        {/* SCREEN 5: WEDDING FESTIVITIES CAROUSEL (Tilak, Sangeet, Haldi, Shubh Vivah) */}
        <WeddingFestivitiesCarousel />

        {/* SCREEN 6: OUR STORY & FAMILY BLESSINGS (Bal Aagrah, Chacha Ji, Bhratrivrind, Yadav Family) */}
        <OurStoryCarousel />

        {/* SCREEN 7: GRAND RECEPTION & VIVAH FEAST CARD */}
        <ReceptionCard />

        {/* SCREEN 8: HOW TO REACH & GOOGLE MAPS */}
        <HowToReach />

        {/* FOOTER BLESSING & ROYAL CREDITS */}
        <footer className="w-full py-12 px-4 text-center bg-black/95 border-t border-[#D4AF37]/40 text-[#D4AF37]">
          {/* Couple Blessing */}
          <p className="font-hindi text-base sm:text-lg font-bold text-[#F8E7B4] tracking-wide drop-shadow">
            ॥ मांगलिक परिणय उत्सव • राकेश संग पूजा ॥
          </p>
          <p className="font-hindi text-xs sm:text-sm text-[#D4AF37]/90 mt-1">
            ग्राम - पठखौली (शिवली राशिद गंज) एवं ग्राम - नाहूपुर (सोडरी), जिला - आजमगढ़
          </p>
          <p className="font-serif text-[11px] sm:text-xs text-[#A67C52] mt-2 uppercase tracking-widest">
            Blessing the union with love, happiness &amp; lifetime harmony
          </p>

          {/* Book View Switcher Button in Footer */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleSwitchToBookView}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#590B16] via-[#7A1422] to-[#590B16] border border-[#D4AF37]/70 text-[#F8E7B4] text-xs font-hindi font-bold hover:scale-105 active:scale-95 transition-all shadow-md"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-300" />
              <span>पुनः 3D किताब स्वरूप में देखें (Open 3D Book View)</span>
            </button>
          </div>

          {/* DESIGNED & CRAFTED BY SADESH (ENGLISH & HINDI) */}
          <div className="mt-8 pt-6 border-t border-[#D4AF37]/25 flex flex-col items-center justify-center space-y-2">
            <div className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-5 py-2 rounded-full bg-gradient-to-r from-amber-500/10 via-amber-400/20 to-amber-500/10 border border-[#D4AF37]/60 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              <Sparkles className="w-3.5 h-3.5 text-[#E5C158] shrink-0" />
              <span className="font-hindi text-xs sm:text-sm font-bold text-[#F8E7B4] tracking-wide">
                अभिकल्पना एवं सृजन: <span className="text-[#FFE599] font-black underline decoration-[#D4AF37]/60 underline-offset-2">सदेश</span>
              </span>
              <span className="text-[#D4AF37]/50 hidden sm:inline">•</span>
              <span className="font-serif text-xs sm:text-sm font-semibold text-[#F8E7B4] tracking-wider">
                Designed &amp; Crafted by: <span className="text-[#FFE599] font-bold underline decoration-[#D4AF37]/60 underline-offset-2">Sadesh</span>
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#E5C158] shrink-0" />
            </div>
            <p className="text-[10px] text-[#A67C52] font-serif tracking-wider uppercase">
              Azamgarh, Uttar Pradesh
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
