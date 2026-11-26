import React from 'react';
import Image from 'next/image';
import { Calendar, Clock, Heart, MapPin, Music, Sparkles, Users } from 'lucide-react';
import MarigoldGarland from '@/components/MarigoldGarland';

export function generateStaticParams() {
  return [
    { scene: 'book_cover' },
    { scene: 'couple' },
    { scene: 'royal_scroll' },
    { scene: 'tilak' },
    { scene: 'sangeet' },
    { scene: 'haldi' },
    { scene: 'wedding' },
    { scene: 'family' },
    { scene: 'credits' },
    { scene: 'door_closed' },
    { scene: 'white_transition' },
    { scene: 'rsvp' },
  ];
}

export default function SlideScenePage({
  params,
}: {
  params: { scene: string };
}) {
  const scene = params.scene || 'book_cover';

  return (
    <div className="w-[1080px] h-[1920px] relative overflow-hidden bg-[#100407] text-[#2b1d14] flex flex-col justify-between selection:bg-transparent">
      {/* ========================================================
          SCENE 1: 3D ROYAL BOOK COVER (TRENDING MAROON & GOLD)
          ======================================================== */}
      {(scene === 'book_cover' || scene === 'door_closed') && (
        <div className="absolute inset-0 flex flex-col items-center justify-between py-24 px-16 text-center bg-gradient-to-b from-[#30050B] via-[#480913] to-[#200307]">
          {/* Ambient Lighting & Bokeh Glow */}
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-rose-600/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />

          {/* Top Hanging Marigold Garland */}
          <div className="relative z-20 w-full max-w-4xl scale-125 mb-4">
            <MarigoldGarland />
          </div>

          {/* Top Header Pill */}
          <div className="relative z-20 mt-4 px-10 py-3 rounded-full bg-black/60 border border-amber-400/60 shadow-xl">
            <span className="font-hindi text-2xl font-bold text-[#F8E7B4] tracking-widest">
              ॥ श्री गणेशाय नमः ॥
            </span>
          </div>

          {/* The Royal Hardcover Book Stage */}
          <div className="relative z-10 w-[720px] h-[1050px] rounded-3xl border-4 border-[#D4AF37]/90 shadow-[0_30px_90px_rgba(0,0,0,0.95)] flex flex-col items-center justify-between p-16 my-auto bg-gradient-to-br from-[#7A1422] via-[#540813] to-[#3B020B]">
            {/* Spine Shadow on Left */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black/80 via-black/40 to-transparent border-r border-[#D4AF37]/40 rounded-l-2xl" />

            {/* Embossed Ornate Golden Filigree Frame */}
            <div className="absolute inset-8 rounded-2xl border-2 border-[#D4AF37]/80 pointer-events-none">
              <div className="absolute inset-3 rounded-xl border border-dashed border-[#F3E5AB]/70" />
              <div className="absolute top-2 left-2 text-[#F3E5AB] text-2xl">✤</div>
              <div className="absolute top-2 right-2 text-[#F3E5AB] text-2xl">✤</div>
              <div className="absolute bottom-2 left-2 text-[#F3E5AB] text-2xl">✤</div>
              <div className="absolute bottom-2 right-2 text-[#F3E5AB] text-2xl">✤</div>
            </div>

            {/* Top Invocation on Book */}
            <div className="relative z-10 flex flex-col items-center mt-2">
              <span className="font-montserrat text-lg text-[#F8E7B4] tracking-[0.35em] uppercase font-bold drop-shadow">
                AUSPICIOUS WEDDING INVITATION
              </span>
            </div>

            {/* Center Ganesha Medallion */}
            <div className="relative z-10 flex flex-col items-center my-auto">
              <div className="w-56 h-56 rounded-full bg-gradient-to-b from-[#8C1625] to-[#45050E] border-4 border-[#F3E5AB] shadow-[0_0_50px_rgba(212,175,55,0.6)] flex items-center justify-center relative">
                <div className="absolute inset-3 rounded-full border-2 border-dashed border-[#D4AF37]/80" />
                <div className="w-32 h-32 text-[#F8E7B4] drop-shadow-xl">
                  <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
                    <path d="M50 15 C45 15, 38 20, 38 28 C38 34, 42 38, 45 40 C38 41, 30 46, 30 55 C30 65, 40 70, 48 70 C48 75, 45 80, 40 85 C42 86, 48 85, 52 80 C54 77, 55 72, 55 70 C62 70, 72 65, 72 55 C72 46, 64 41, 57 40 C60 38, 64 34, 64 28 C64 20, 57 15, 50 15 Z M50 22 C53 22, 57 24, 57 28 C57 32, 53 34, 50 34 C47 34, 43 32, 43 28 C43 24, 47 22, 50 22 Z M47 46 C48 46, 52 46, 53 46 C60 47, 65 50, 65 56 C65 62, 58 64, 50 64 C42 64, 35 62, 35 56 C35 50, 40 47, 47 46 Z" />
                  </svg>
                </div>
              </div>

              {/* Shubh Vivaah Title */}
              <h2 className="font-hindi-royal text-7xl text-[#F8E7B4] font-bold tracking-wider mt-8 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                ॥ शुभ विवाह ॥
              </h2>
              <p className="font-playfair text-2xl tracking-[0.3em] uppercase text-[#D4AF37] font-semibold mt-2">
                SHUBH VIVAAH
              </p>

              {/* Couple Monogram Badge */}
              <div className="mt-8 px-12 py-3 rounded-full bg-black/50 border-2 border-[#D4AF37]/70 shadow-2xl">
                <span className="font-hindi text-4xl text-[#FFE599] font-black tracking-wide">
                  राकेश &nbsp;♥&nbsp; पूजा
                </span>
              </div>
            </div>

            {/* Bottom Book Subtitle */}
            <div className="relative z-10 flex flex-col items-center mb-2">
              <span className="text-[#D4AF37] text-lg tracking-[0.25em] uppercase font-montserrat font-bold">
                WEDNESDAY, 9 DECEMBER 2026 • AZAMGARH
              </span>
            </div>
          </div>

          {/* Bottom Royal Ribbon */}
          <div className="relative z-20 mb-4 flex items-center gap-3 text-amber-300">
            <span className="text-xl">✦</span>
            <span className="font-hindi text-xl font-bold tracking-widest text-[#F8E7B4]">
              मांगलिक परिणय उत्सव
            </span>
            <span className="text-xl">✦</span>
          </div>
        </div>
      )}

      {/* ========================================================
          SCENE 1B: WHITE TRANSITION
          ======================================================== */}
      {scene === 'white_transition' && (
        <div className="absolute inset-0 bg-gradient-radial from-white via-[#FFFDF5] to-[#FFF9E6] flex items-center justify-center">
          <div className="w-[900px] h-[900px] rounded-full bg-amber-100/70 blur-3xl" />
        </div>
      )}

      {/* ========================================================
          SCENE 2: COUPLE NAMES REVEAL (PALACE ARCH HERO)
          ======================================================== */}
      {scene === 'couple' && (
        <div className="absolute inset-0 flex flex-col items-center justify-between py-20 px-14 text-center">
          {/* Palace Terrace Background */}
          <Image
            src="/images/heavenly_palace_terrace_hd.jpg"
            alt="Heavenly Terrace"
            fill
            className="object-cover object-center scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/85 pointer-events-none" />

          {/* Top Marigold Garland */}
          <div className="relative z-20 w-full max-w-4xl scale-110 mb-2">
            <MarigoldGarland />
          </div>

          {/* Center Royal Palace Arch Card */}
          <div className="relative z-10 w-full max-w-[840px] my-auto rounded-t-[320px] rounded-b-3xl border-4 border-[#D4AF37]/90 shadow-[0_30px_90px_rgba(0,0,0,0.95)] p-14 flex flex-col items-center bg-gradient-to-b from-[#FFFDF8] via-[#FAF3E0] to-[#F5E8C4]">
            {/* Inner Dashed Arch Border */}
            <div className="absolute inset-4 rounded-t-[300px] rounded-b-2xl border-2 border-dashed border-[#C5A059]/70 pointer-events-none" />

            {/* Top Invocation */}
            <div className="flex flex-col items-center pt-4">
              <div className="w-24 h-24 text-[#8B1A24] mb-2 drop-shadow-md">
                <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
                  <path d="M50 15 C45 15, 38 20, 38 28 C38 34, 42 38, 45 40 C38 41, 30 46, 30 55 C30 65, 40 70, 48 70 C48 75, 45 80, 40 85 C42 86, 48 85, 52 80 C54 77, 55 72, 55 70 C62 70, 72 65, 72 55 C72 46, 64 41, 57 40 C60 38, 64 34, 64 28 C64 20, 57 15, 50 15 Z M50 22 C53 22, 57 24, 57 28 C57 32, 53 34, 50 34 C47 34, 43 32, 43 28 C43 24, 47 22, 50 22 Z M47 46 C48 46, 52 46, 53 46 C60 47, 65 50, 65 56 C65 62, 58 64, 50 64 C42 64, 35 62, 35 56 C35 50, 40 47, 47 46 Z" />
                </svg>
              </div>
              <p className="font-hindi-royal text-3xl text-[#8C5E1E] font-bold tracking-[0.25em]">
                ॥ श्री गणेशाय नमः ॥
              </p>
              <p className="font-montserrat text-sm text-[#7A5B38] uppercase tracking-[0.25em] font-bold mt-1">
                TOGETHER WITH THEIR FAMILIES
              </p>
              <p className="font-hindi text-lg text-[#801420] mt-1 max-w-xl font-medium">
                परम पिता परमात्मा की असीम अनुकम्पा एवं पूज्य पूर्वजों के शुभाशीर्वाद से मांगलिक परिणय उत्सव
              </p>
            </div>

            {/* Monogram RP */}
            <div className="w-24 h-24 rounded-full border-2 border-[#D4AF37] flex items-center justify-center my-6 bg-gradient-to-br from-[#FAF3DE] to-[#F0E0B8] shadow-md">
              <span className="font-playfair text-4xl font-bold text-[#801420]">RP</span>
            </div>

            {/* Groom Details */}
            <div className="flex flex-col items-center w-full">
              <span className="px-5 py-1 rounded-full bg-amber-100 text-[#8B1A24] text-lg font-hindi font-bold border border-amber-300 mb-1">
                वर पक्ष
              </span>
              <h1 className="font-hindi-royal text-6xl text-[#801420] font-bold tracking-wide drop-shadow">
                राकेश यादव
              </h1>
              <p className="font-hindi text-2xl text-[#3E2510] font-bold mt-1">
                सुपुत्र: <span className="text-[#801420]">श्रीमती नीलम देवी</span> एवं <span className="text-[#801420]">श्री रामचन्द्र यादव</span>
              </p>
              <p className="font-hindi text-lg text-[#6B4B27] mt-0.5">
                ग्राम - पठखौली, पोस्ट - शिवली राशिद गंज, जिला - आजमगढ़
              </p>
            </div>

            {/* संग Connector */}
            <div className="flex items-center gap-6 my-4 w-full justify-center">
              <span className="w-32 h-[2px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
              <span className="font-playfair text-4xl text-[#8C5E1E] font-bold italic">
                &amp;
              </span>
              <span className="w-32 h-[2px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
            </div>

            {/* Bride Details */}
            <div className="flex flex-col items-center w-full">
              <span className="px-5 py-1 rounded-full bg-amber-100 text-[#8B1A24] text-lg font-hindi font-bold border border-amber-300 mb-1">
                वधू पक्ष
              </span>
              <h2 className="font-hindi-royal text-6xl text-[#801420] font-bold tracking-wide drop-shadow">
                पूजा यादव
              </h2>
              <p className="font-hindi text-2xl text-[#3E2510] font-bold mt-1">
                सुपुत्री: <span className="text-[#801420]">श्रीमती खुशी देवी</span> एवं <span className="text-[#801420]">श्री कर्मजीत यादव</span>
              </p>
              <p className="font-hindi text-lg text-[#6B4B27] mt-0.5">
                ग्राम - नाहूपुर, पोस्ट - सोडरी, जिला - आजमगढ़
              </p>
            </div>

            <div className="w-32 h-[2px] bg-[#C5A059]/60 my-6" />

            <p className="font-playfair text-xl italic text-[#7A5B38]">
              request the pleasure of your company at the celebration of their wedding
            </p>
            <p className="font-hindi text-lg text-[#801420] font-bold mt-1">
              मांगलिक परिणय उत्सव में आपकी गरिमामयी उपस्थिति सादर प्रार्थनीय है।
            </p>
          </div>

          <div className="h-6" />
        </div>
      )}

      {/* ========================================================
          SCENE 3: ROYAL SCROLL (AUSPICIOUS WEDDING DATE)
          ======================================================== */}
      {scene === 'royal_scroll' && (
        <div className="absolute inset-0 flex flex-col items-center justify-between py-24 px-16 text-center bg-gradient-to-b from-[#2B050D] via-[#420814] to-[#1C0206]">
          {/* Top Marigold Garland */}
          <div className="relative z-20 w-full max-w-4xl scale-110">
            <MarigoldGarland />
          </div>

          {/* Section Header */}
          <div className="relative z-10 flex flex-col items-center mt-2">
            <p className="font-montserrat text-lg tracking-[0.3em] uppercase text-[#C5A059] font-bold">
              SAVE THE DATE
            </p>
            <h2 className="font-hindi-royal text-5xl text-[#F8E7B4] font-bold drop-shadow mt-1">
              पावन लग्न तिथि • Royal Scroll
            </h2>
          </div>

          {/* Unrolled Royal Scroll Body */}
          <div className="relative z-10 w-[780px] my-auto flex flex-col items-center">
            {/* Top Gold Rod */}
            <div className="w-full h-14 rounded-full bg-gradient-to-r from-[#AA771C] via-[#FFF3B3] to-[#AA771C] border-2 border-[#8C6228] shadow-2xl flex items-center justify-center">
              <span className="font-hindi text-lg text-[#3E2510] font-black tracking-widest uppercase">
                ॥ शुभ विवाह लग्न पत्रिका ॥
              </span>
            </div>

            {/* Parchment Paper */}
            <div className="w-[92%] p-14 rounded-b-2xl border-x-4 border-b-4 border-[#C5A059] bg-gradient-to-b from-[#FFFDF8] via-[#FAF2DC] to-[#F5E8C4] shadow-[0_25px_70px_rgba(0,0,0,0.85)] flex flex-col items-center text-center">
              <div className="w-20 h-20 text-[#8B1A24] mb-2">
                <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full drop-shadow">
                  <path d="M50 10 C35 10 25 22 25 35 C25 50 35 60 50 72 C65 60 75 50 75 35 C75 22 65 10 50 10 Z M50 20 C60 20 66 27 66 36 C66 45 59 52 50 61 C41 52 34 45 34 36 C34 27 40 20 50 20 Z" />
                  <circle cx="50" cy="35" r="7" fill="#D4AF37" />
                </svg>
              </div>

              <p className="font-hindi text-xl text-[#8C5E1E] font-bold tracking-widest uppercase">
                ॥ शुभ विवाह मुहूर्त ॥
              </p>

              {/* Big 9 Dec 2026 */}
              <div className="my-3 flex flex-col items-center">
                <span className="font-playfair text-9xl font-black text-[#801420] tracking-tight drop-shadow">
                  9
                </span>
                <span className="font-hindi-royal text-5xl font-bold text-[#9E2A2B] -mt-3">
                  दिसंबर 2026
                </span>
                <span className="font-montserrat text-lg text-[#6E4E2C] uppercase tracking-widest font-bold mt-1">
                  WEDNESDAY, 9 DECEMBER 2026
                </span>
              </div>

              <div className="w-40 h-[2px] bg-[#C5A059] my-4" />

              {/* Barat details */}
              <div className="space-y-3 font-hindi">
                <p className="font-bold text-[#801420] text-3xl">
                  शुभ बारात प्रस्थान: सायं 5:00 बजे
                </p>
                <p className="text-xl text-[#523A25] font-semibold">
                  (निज निवास पठखौली, शिवली राशिद गंज से)
                </p>
                <div className="py-2">
                  <span className="px-6 py-2 rounded-full bg-amber-100 text-[#8B1A24] font-bold text-xl border border-amber-300 shadow-sm">
                    शुभ लग्न एवं सात फेरे • विदाई प्रातः बेला
                  </span>
                </div>
                <p className="text-xl text-[#6E4E2C] font-bold pt-1">
                  विवाह स्थल: ग्राम नाहूपुर, पोस्ट सोडरी, जिला आजमगढ़
                </p>
              </div>
            </div>

            {/* Bottom Gold Rod */}
            <div className="w-full h-14 -mt-1 rounded-full bg-gradient-to-r from-[#AA771C] via-[#FFF3B3] to-[#AA771C] border-2 border-[#8C6228] shadow-2xl flex items-center justify-center">
              <span className="font-montserrat text-sm text-[#3E2510] font-black tracking-widest uppercase">
                WEDNESDAY, 9 DECEMBER 2026
              </span>
            </div>
          </div>

          <div className="h-6" />
        </div>
      )}

      {/* ========================================================
          SCENE 4: TILAK & SHAGUN (28 NOV 2026)
          ======================================================== */}
      {scene === 'tilak' && (
        <div className="absolute inset-0 flex flex-col items-center justify-between py-24 px-16 text-center">
          <Image
            src="/images/tilak_palace_bg.jpg"
            alt="Tilak Palace"
            fill
            className="object-cover object-center scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/45 to-black/85 pointer-events-none" />

          {/* Top Marigold Garland */}
          <div className="relative z-20 w-full max-w-4xl scale-110">
            <MarigoldGarland />
          </div>

          <div className="relative z-10 flex flex-col items-center bg-[#FFFDF7]/95 backdrop-blur-md p-14 rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.9)] border-2 border-[#D4AF37]/80 w-full max-w-[820px] my-auto">
            {/* Top Swatch */}
            <div className="flex items-center gap-2 px-6 py-1.5 rounded-full bg-black/80 text-white text-sm font-montserrat font-bold uppercase mb-4 border border-white/20">
              <span className="w-3.5 h-3.5 rounded-full bg-[#D4AF37]" />
              <span>TRADITIONAL FESTIVE • पारंपरिक परिधान</span>
            </div>

            <p className="font-montserrat text-sm tracking-[0.3em] uppercase text-[#8C6228] font-bold">
              ॥ मांगलिक कार्यक्रम ॥
            </p>
            <h2 className="font-hindi-royal text-6xl text-[#7E1A29] font-bold mt-2 drop-shadow">
              तिलक एवं शगुन
            </h2>
            <p className="font-playfair text-xl text-[#B38728] uppercase tracking-wider font-semibold mt-1">
              TILAK &amp; SHAGUN CEREMONY
            </p>

            <div className="w-32 h-[2px] bg-[#D4AF37]/50 my-6" />

            <p className="font-hindi text-2xl text-[#4A382A] leading-relaxed max-w-xl font-medium">
              पारंपरिक मांगलिक रीति-रिवाजों एवं लोक गीतों के पावन सानिध्य में तिलक एवं शगुन उत्सव।
            </p>

            <div className="mt-8 p-8 rounded-2xl bg-amber-50/90 border-2 border-amber-200/90 w-full shadow-inner flex flex-col items-center gap-2">
              <div className="flex items-center gap-3 text-[#821927]">
                <Calendar className="w-8 h-8 text-amber-600" />
                <span className="font-hindi text-4xl font-black">
                  28 नवंबर 2026
                </span>
              </div>
              <p className="font-hindi text-2xl text-[#5A4030] font-bold mt-2">
                स्थान: निज निवास — ग्राम पठखौली, पोस्ट शिवली राशिद गंज, आजमगढ़
              </p>
            </div>

            <div className="text-amber-800/60 tracking-widest text-xl mt-6">
              ✦ ✦ ✦
            </div>
          </div>

          <div className="h-6" />
        </div>
      )}

      {/* ========================================================
          SCENE 5: SANGEET & MUSICAL EVENING (28 NOV 2026 • EVENING)
          ======================================================== */}
      {scene === 'sangeet' && (
        <div className="absolute inset-0 flex flex-col items-center justify-between py-24 px-16 text-center text-white">
          <Image
            src="/images/sangeet_night_bg.jpg"
            alt="Sangeet Night"
            fill
            className="object-cover object-center scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/55 to-black/90 pointer-events-none" />

          {/* Top Marigold Garland */}
          <div className="relative z-20 w-full max-w-4xl scale-110">
            <MarigoldGarland />
          </div>

          <div className="relative z-10 flex flex-col items-center bg-black/85 backdrop-blur-md p-14 rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.95)] border-2 border-[#D4AF37]/70 w-full max-w-[820px] my-auto">
            {/* Swatch */}
            <div className="flex items-center gap-2 px-6 py-1.5 rounded-full bg-white/10 text-white text-sm font-montserrat font-bold uppercase mb-4 border border-white/20">
              <span className="w-3.5 h-3.5 rounded-full bg-[#3A1C71]" />
              <span>INDO-WESTERN / GLAMOUR • सुरमयी शाम</span>
            </div>

            <div className="flex items-center gap-3 text-[#D4AF37] mb-1">
              <Music size={32} />
              <p className="font-montserrat text-sm tracking-[0.3em] uppercase font-bold text-[#F3E5AB]">
                MUSICAL EVENING
              </p>
              <Music size={32} />
            </div>

            <h2 className="font-hindi-royal text-6xl text-[#F8E7B4] font-bold tracking-wide mt-2 drop-shadow-xl">
              संगीत एवं स्नेह मिलन
            </h2>
            <p className="font-playfair text-xl text-[#E5C77A] tracking-wider uppercase font-semibold mt-1">
              SANGEET &amp; CELEBRATION
            </p>

            <div className="w-32 h-[2px] bg-amber-400/40 my-6" />

            <p className="font-hindi text-2xl text-[#E0D5C1] leading-relaxed max-w-xl">
              पारिवारिक उल्लास, गीतों की मधुर धुन और खुशियों से सजी एक अविस्मरणीय सुरमयी शाम।
            </p>

            <div className="mt-8 p-8 rounded-2xl bg-white/10 border-2 border-amber-400/30 w-full shadow-inner flex flex-col items-center gap-2">
              <div className="flex items-center gap-3 text-[#FFE082]">
                <Calendar className="w-8 h-8 text-[#D4AF37]" />
                <span className="font-hindi text-4xl font-black">
                  28 नवंबर 2026
                </span>
              </div>
              <p className="font-hindi text-2xl text-[#F3E5AB] font-bold mt-1">
                सायं काल (Evening) • रंगारंग प्रस्तुतियां एवं प्रीतिभोज
              </p>
              <p className="font-hindi text-xl text-[#C5A059] mt-0.5">
                स्थान: निज निवास प्रांगण, आजमगढ़
              </p>
            </div>

            <div className="text-amber-400/70 tracking-widest text-xl mt-6">
              ✦ ✦ ✦
            </div>
          </div>

          <div className="h-6" />
        </div>
      )}

      {/* ========================================================
          SCENE 6: HALDI CEREMONY (11:00 AM ONWARDS)
          ======================================================== */}
      {scene === 'haldi' && (
        <div className="absolute inset-0 flex flex-col items-center justify-between py-24 px-16 text-center">
          <Image
            src="/images/haldi_courtyard_bg.jpg"
            alt="Haldi Courtyard"
            fill
            className="object-cover object-center scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/45 to-black/85 pointer-events-none" />

          {/* Top Marigold Garland */}
          <div className="relative z-20 w-full max-w-4xl scale-110">
            <MarigoldGarland />
          </div>

          <div className="relative z-10 flex flex-col items-center bg-[#FFFEF5]/95 backdrop-blur-md p-14 rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.9)] border-2 border-amber-400/80 w-full max-w-[820px] my-auto">
            {/* Swatch */}
            <div className="flex items-center gap-2 px-6 py-1.5 rounded-full bg-black/80 text-white text-sm font-montserrat font-bold uppercase mb-4 border border-white/20">
              <span className="w-3.5 h-3.5 rounded-full bg-[#F5B000]" />
              <span>WEAR YELLOW / पीताम्बरी • पीत वस्त्र</span>
            </div>

            <p className="font-montserrat text-sm tracking-[0.3em] uppercase text-[#C06A17] font-bold">
              ॥ हल्दी एवं मंडपाच्छादन ॥
            </p>
            <h2 className="font-hindi-royal text-6xl text-[#C06A17] font-bold mt-2 drop-shadow">
              हल्दी उत्सव
            </h2>
            <p className="font-playfair text-xl text-[#B38728] uppercase tracking-wider font-semibold mt-1">
              HALDI &amp; MATRIKA PUJAN
            </p>

            <div className="w-32 h-[2px] bg-amber-400/50 my-6" />

            <p className="font-hindi text-2xl text-[#5C4228] leading-relaxed max-w-xl font-medium">
              पीले गेंदे के फूलों की महक और उबटन के मंगल लेप से सुशोभित वर-वधू का पावन हल्दी संस्कार।
            </p>

            <div className="mt-8 p-8 rounded-2xl bg-amber-100/90 border-2 border-amber-300/80 w-full shadow-inner flex flex-col items-center gap-2">
              <div className="flex items-center gap-3 text-[#C06A17]">
                <Clock className="w-8 h-8 text-amber-700" />
                <span className="font-montserrat text-3xl font-black tracking-widest uppercase">
                  11:00 AM ONWARDS
                </span>
              </div>
              <p className="font-hindi text-2xl text-[#5C4228] font-bold mt-1">
                मातृका पूजन, मंडप एवं हल्दी समारोह
              </p>
              <p className="font-hindi text-xl text-[#7D5B38] mt-0.5">
                स्थान: निज निवास प्रांगण, आजमगढ़
              </p>
            </div>

            <div className="text-amber-800/60 tracking-widest text-xl mt-6">
              ✦ ✦ ✦
            </div>
          </div>

          <div className="h-6" />
        </div>
      )}

      {/* ========================================================
          SCENE 7: SHUBH VIVAAH (WITH CLEAN ROYAL MANDAP BG - NO UNWANTED TEXT)
          ======================================================== */}
      {scene === 'wedding' && (
        <div className="absolute inset-0 flex flex-col items-center justify-between py-24 px-16 text-center">
          {/* Pristine Royal Mandap Background */}
          <Image
            src="/images/wedding_royal_mandap_clean.jpg"
            alt="Royal Wedding Mandap"
            fill
            className="object-cover object-center scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/45 to-black/90 pointer-events-none" />

          {/* Top Marigold Garland */}
          <div className="relative z-20 w-full max-w-4xl scale-110">
            <MarigoldGarland />
          </div>

          <div className="relative z-10 flex flex-col items-center bg-[#FFFDF7]/95 backdrop-blur-md p-14 rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.95)] border-2 border-[#D4AF37]/90 w-full max-w-[820px] my-auto">
            {/* Swatch */}
            <div className="flex items-center gap-2 px-6 py-1.5 rounded-full bg-black/80 text-white text-sm font-montserrat font-bold uppercase mb-4 border border-white/20">
              <span className="w-3.5 h-3.5 rounded-full bg-[#801420]" />
              <span>ROYAL RED &amp; GOLD • शाही परिधान</span>
            </div>

            <p className="font-montserrat text-sm tracking-[0.3em] uppercase text-[#801420] font-bold">
              ॥ पाणिग्रहण संस्कार ॥
            </p>
            <h2 className="font-hindi-royal text-6xl text-[#801420] font-bold mt-2 drop-shadow">
              शुभ विवाह एवं बारात
            </h2>
            <p className="font-playfair text-xl text-[#B38728] uppercase tracking-wider font-semibold mt-1">
              SHUBH VIVAH &amp; ROYAL BARAT
            </p>

            <div className="w-32 h-[2px] bg-[#D4AF37]/50 my-6" />

            <div className="flex flex-col items-center gap-6 w-full">
              <div className="p-6 rounded-2xl bg-rose-50/90 border-2 border-rose-200/90 w-full shadow-inner">
                <p className="font-hindi text-3xl text-[#801420] font-black">
                  शुभ बारात प्रस्थान: 9 दिसंबर 2026
                </p>
                <p className="font-hindi text-2xl text-[#4A382A] font-bold mt-2">
                  सायं 5:00 बजे (निज निवास पठखौली, शिवली राशिद गंज से)
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-rose-50/90 border-2 border-rose-200/90 w-full shadow-inner">
                <p className="font-hindi text-3xl text-[#801420] font-black">
                  शुभ विवाह एवं सात फेरे
                </p>
                <p className="font-hindi text-xl text-[#4A382A] font-bold mt-1">
                  शुभ लग्न एवं सात फेरे • विदाई प्रातः बेला
                </p>
                <p className="font-hindi text-lg text-[#6E4E2C] mt-1 font-semibold">
                  विवाह स्थल: ग्राम नाहूपुर, पोस्ट सोडरी, जिला आजमगढ़
                </p>
              </div>
            </div>

            <div className="text-amber-800/60 tracking-widest text-xl mt-6">
              ✦ ✦ ✦
            </div>
          </div>

          <div className="h-6" />
        </div>
      )}

      {/* ========================================================
          SCENE 8: BAL AAGRAH & FAMILY BLESSINGS
          ======================================================== */}
      {(scene === 'family' || scene === 'rsvp') && (
        <div className="absolute inset-0 flex flex-col items-center justify-between py-24 px-16 text-center bg-gradient-to-b from-[#2B050D] via-[#3B0712] to-[#1C0206]">
          {/* Top Marigold Garland */}
          <div className="relative z-20 w-full max-w-4xl scale-110">
            <MarigoldGarland />
          </div>

          <div className="relative z-10 flex flex-col items-center w-full max-w-[820px] my-auto gap-8">
            {/* बाल आग्रह कार्ड */}
            <div className="w-full p-10 rounded-3xl bg-gradient-to-br from-[#FFFDF8] via-[#FAF3DE] to-[#F5E6CA] border-2 border-[#D4AF37] shadow-[0_25px_60px_rgba(0,0,0,0.85)] flex flex-col items-center">
              <div className="flex items-center gap-2 text-[#801420] mb-2">
                <Sparkles size={28} className="text-amber-600 animate-spin" />
                <span className="font-hindi-royal text-3xl font-bold tracking-wide">
                  ॥ बाल आग्रह ॥
                </span>
                <Sparkles size={28} className="text-amber-600 animate-spin" />
              </div>
              <p className="font-hindi text-2xl text-[#801420] font-bold italic leading-relaxed max-w-xl whitespace-pre-line my-3">
                “हल्दी है, मेहंदी है, और खुशियों की बहार है,
                मेरे मामू की शादी में आपका इंतजार है।”
              </p>
              <div className="mt-3 px-8 py-2 rounded-full bg-amber-100 border border-amber-300">
                <p className="font-hindi text-2xl text-[#3E2510] font-bold">
                  स्नेही बच्चे: <span className="text-[#801420] font-black">शिव्या, पिहू, दिवेश</span>
                </p>
              </div>
            </div>

            {/* पूज्य चाचा जी एवं दर्शनाभिलाषी */}
            <div className="w-full p-8 rounded-3xl bg-black/75 backdrop-blur-md border border-[#D4AF37]/50 shadow-2xl flex flex-col items-center gap-4 text-white">
              <div className="text-center">
                <p className="font-hindi text-xl font-bold text-[#D4AF37]">
                  ॥ स्वागताकांक्षी / पूज्य चाचा जी ॥
                </p>
                <p className="font-hindi text-3xl font-bold text-[#F8E7B4] mt-1">
                  सुबेदार, श्रीचंद्र, श्रीराम
                </p>
              </div>

              <div className="w-40 h-[1.5px] bg-[#D4AF37]/40" />

              <div className="text-center">
                <p className="font-hindi text-xl font-bold text-[#D4AF37]">
                  ॥ दर्शनाभिलाषी / भ्रातृवृन्द ॥
                </p>
                <p className="font-hindi text-2xl text-[#E5D0A5] font-semibold leading-relaxed mt-1 max-w-xl">
                  चन्द्रभान, उदयभान, संदीप, <span className="text-[#FFE599] font-bold">सदेश</span>, नितेश, रवि, नितिन, अंशु, अमन, आकाश, आदित्य, अर्पित
                </p>
              </div>

              <div className="w-40 h-[1.5px] bg-[#D4AF37]/40" />

              <div className="text-center">
                <p className="font-hindi text-xl font-bold text-[#D4AF37]">
                  ॥ विनीत ॥
                </p>
                <p className="font-hindi text-3xl font-bold text-[#F8E7B4] mt-1">
                  समस्त यादव परिवार
                </p>
                <p className="font-hindi text-lg text-[#C5A059] mt-0.5">
                  ग्राम - पठखौली, पोस्ट - शिवली राशिद गंज, जिला - आजमगढ़
                </p>
              </div>
            </div>
          </div>

          <div className="h-6" />
        </div>
      )}

      {/* ========================================================
          SCENE 9: CLOSING BLESSING & DESIGNER CREDITS
          ======================================================== */}
      {scene === 'credits' && (
        <div className="absolute inset-0 flex flex-col items-center justify-between py-24 px-16 text-center bg-gradient-to-b from-[#200307] via-[#3B0712] to-[#120104] text-white">
          {/* Top Marigold Garland */}
          <div className="relative z-20 w-full max-w-4xl scale-110">
            <MarigoldGarland />
          </div>

          <div className="relative z-10 flex flex-col items-center my-auto w-full max-w-[800px] gap-8">
            {/* Ganesha */}
            <div className="w-24 h-24 text-[#D4AF37] drop-shadow-lg">
              <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
                <path d="M50 15 C45 15, 38 20, 38 28 C38 34, 42 38, 45 40 C38 41, 30 46, 30 55 C30 65, 40 70, 48 70 C48 75, 45 80, 40 85 C42 86, 48 85, 52 80 C54 77, 55 72, 55 70 C62 70, 72 65, 72 55 C72 46, 64 41, 57 40 C60 38, 64 34, 64 28 C64 20, 57 15, 50 15 Z M50 22 C53 22, 57 24, 57 28 C57 32, 53 34, 50 34 C47 34, 43 32, 43 28 C43 24, 47 22, 50 22 Z M47 46 C48 46, 52 46, 53 46 C60 47, 65 50, 65 56 C65 62, 58 64, 50 64 C42 64, 35 62, 35 56 C35 50, 40 47, 47 46 Z" />
              </svg>
            </div>

            <h2 className="font-hindi-royal text-6xl text-[#F8E7B4] font-bold drop-shadow">
              ॥ मांगलिक परिणय उत्सव ॥
            </h2>
            <p className="font-hindi text-4xl text-[#FFE599] font-black">
              राकेश यादव &nbsp;♥&nbsp; पूजा यादव
            </p>
            <p className="font-hindi text-2xl text-[#C5A059] max-w-lg font-medium leading-relaxed">
              आपकी गरिमामयी उपस्थिति एवं पावन शुभाशीर्वाद हमारे लिए परम सौभाग्य होगी।
            </p>

            <div className="w-48 h-[2px] bg-[#D4AF37]/50 my-2" />

            {/* DESIGNED & CRAFTED BY SADESH */}
            <div className="px-10 py-5 rounded-full bg-gradient-to-r from-amber-500/20 via-amber-400/30 to-amber-500/20 border-2 border-[#D4AF37] shadow-[0_0_35px_rgba(212,175,55,0.4)] flex items-center justify-center gap-4">
              <Sparkles className="w-6 h-6 text-[#E5C158]" />
              <div className="flex flex-col items-center">
                <span className="font-hindi text-2xl font-bold text-[#F8E7B4] tracking-wide">
                  अभिकल्पना एवं सृजन: <span className="text-[#FFE599] font-black">सदेश</span>
                </span>
                <span className="font-playfair text-lg text-[#E5C158] font-semibold tracking-wider uppercase mt-0.5">
                  Designed &amp; Crafted by: <span className="text-white font-bold">Sadesh</span>
                </span>
              </div>
              <Sparkles className="w-6 h-6 text-[#E5C158]" />
            </div>

            <p className="font-montserrat text-sm uppercase tracking-widest text-[#A67C52]">
              Azamgarh, Uttar Pradesh
            </p>
          </div>

          <div className="h-6" />
        </div>
      )}
    </div>
  );
}
