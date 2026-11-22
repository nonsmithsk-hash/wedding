import React from 'react';
import Image from 'next/image';
import { Sparkles, Music } from 'lucide-react';

export default function SlidesPage({
  searchParams,
}: {
  searchParams: { scene?: string };
}) {
  const scene = searchParams?.scene || 'couple';

  return (
    <div className="w-[1080px] h-[1920px] relative overflow-hidden bg-[#0d0907] text-[#2b1d14] flex flex-col justify-between selection:bg-transparent">
      
      {/* ========================================================
          SCENE 1A: DOOR CLOSED
          ======================================================== */}
      {scene === 'door_closed' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/images/royal_palace_doors_wide.jpg"
            alt="Palace Door"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
          
          {/* Top Badge */}
          <div className="absolute top-28 inset-x-0 flex flex-col items-center">
            <div className="bg-black/70 backdrop-blur-md px-10 py-4 rounded-full border border-amber-400/50 shadow-2xl">
              <p className="font-hindi-royal text-2xl text-[#F8E7B4] tracking-wider text-center">
                ॥ श्री गणेशाय नमः ॥
              </p>
              <p className="font-hindi text-lg tracking-widest text-[#D4AF37] uppercase font-bold mt-1 text-center">
                राकेश संग पूजा
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          SCENE 1B: WHITE HEAVENLY TRANSITION
          ======================================================== */}
      {scene === 'white_transition' && (
        <div className="absolute inset-0 bg-gradient-radial from-white via-[#FFFDF5] to-[#FFF9E6] flex items-center justify-center">
          <div className="w-[800px] h-[800px] rounded-full bg-amber-100/60 blur-3xl" />
        </div>
      )}

      {/* ========================================================
          SCENE 2: COUPLE REVEAL (Heavenly Palace Terrace)
          ======================================================== */}
      {scene === 'couple' && (
        <div className="absolute inset-0 flex flex-col items-center justify-between py-24 px-16 text-center">
          <Image
            src="/images/heavenly_palace_terrace_wide.jpg"
            alt="Heavenly Terrace"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

          {/* Top Ganesh & Shloka */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-24 h-24 text-amber-700/80 mb-2 drop-shadow-lg">
              <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
                <path d="M50 15 C45 15, 38 20, 38 28 C38 34, 42 38, 45 40 C38 41, 30 46, 30 55 C30 65, 40 70, 48 70 C48 75, 45 80, 40 85 C42 86, 48 85, 52 80 C54 77, 55 72, 55 70 C62 70, 72 65, 72 55 C72 46, 64 41, 57 40 C60 38, 64 34, 64 28 C64 20, 57 15, 50 15 Z M50 22 C53 22, 57 24, 57 28 C57 32, 53 34, 50 34 C47 34, 43 32, 43 28 C43 24, 47 22, 50 22 Z M47 46 C48 46, 52 46, 53 46 C60 47, 65 50, 65 56 C65 62, 58 64, 50 64 C42 64, 35 62, 35 56 C35 50, 40 47, 47 46 Z" />
              </svg>
            </div>
            <p className="font-hindi-royal text-3xl text-[#8C6228] font-bold tracking-widest drop-shadow">
              ॥ श्री गणेशाय नमः ॥
            </p>
            <p className="mt-2 text-xl tracking-wide text-[#5C3B1A] max-w-2xl font-hindi font-medium">
              परम पिता परमात्मा की असीम अनुकम्पा एवं पूज्य पूर्वजों के शुभाशीर्वाद से मांगलिक परिणय उत्सव
            </p>
          </div>

          {/* Couple Announcement */}
          <div className="relative z-10 flex flex-col items-center my-auto w-full">
            <div className="relative w-44 h-44 flex items-center justify-center my-4">
              <div className="absolute inset-0 rounded-full border-2 border-amber-400/60 shadow-[0_0_30px_rgba(212,175,55,0.5)]" />
              <div className="absolute inset-2 rounded-full border-2 border-dashed border-[#C5A059]/60" />
              <span className="font-serif text-6xl text-[#B38728] font-bold tracking-tight drop-shadow-lg">
                RP
              </span>
            </div>

            {/* Groom Details */}
            <div className="flex flex-col items-center mt-3">
              <h1 className="font-hindi-royal text-6xl text-[#821927] font-bold tracking-wide drop-shadow-md">
                <span className="text-4xl text-[#8C5E1E] font-semibold mr-3">वर पक्ष:</span>
                <span>राकेश यादव</span>
              </h1>
              <p className="mt-2 text-2xl text-[#3E2C1E] font-hindi font-bold">
                सुपुत्र: <span className="text-[#821927]">श्रीमती नीलम देवी</span> एवं <span className="text-[#821927]">श्री रामचन्द्र यादव</span>
              </p>
              <p className="text-xl text-[#6B4B27] font-hindi font-medium mt-1">
                ग्राम - पठखौली, पोस्ट - शिवली राशिद गंज, जिला - आजमगढ़
              </p>
            </div>

            {/* संग Connector */}
            <div className="flex items-center gap-6 my-6">
              <span className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
              <span className="font-hindi-royal text-2xl text-[#8C6228] font-bold">
                संग
              </span>
              <span className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
            </div>

            {/* Bride Details */}
            <div className="flex flex-col items-center">
              <h2 className="font-hindi-royal text-6xl text-[#821927] font-bold tracking-wide drop-shadow-md">
                <span className="text-4xl text-[#8C5E1E] font-semibold mr-3">वधू पक्ष:</span>
                <span>पूजा यादव</span>
              </h2>
              <p className="mt-2 text-2xl text-[#3E2C1E] font-hindi font-bold">
                सुपुत्री: <span className="text-[#821927]">श्रीमती खुशी देवी</span> एवं <span className="text-[#821927]">श्री कर्मजीत यादव</span>
              </p>
              <p className="text-xl text-[#6B4B27] font-hindi font-medium mt-1">
                ग्राम - नाहूपुर, पोस्ट - सोडरी, जिला - आजमगढ़
              </p>
            </div>

            <div className="text-amber-800/70 tracking-widest text-2xl mt-6">
              ✦ ✦ ✦
            </div>
          </div>

          <div className="h-16" />
        </div>
      )}

      {/* ========================================================
          SCENE 3: TILAK & SHAGUN (Folk Musicians)
          ======================================================== */}
      {scene === 'tilak' && (
        <div className="absolute inset-0 flex flex-col items-center justify-between py-24 px-16 text-center">
          <Image
            src="/images/bg_maayra.jpg"
            alt="Folk Musicians"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/50 pointer-events-none" />

          <div className="h-10" />

          <div className="relative z-10 flex flex-col items-center bg-[#fdfbf7]/92 backdrop-blur-md p-14 rounded-3xl shadow-2xl border border-amber-400/30 w-full max-w-3xl my-auto">
            <p className="font-serif text-xl tracking-[0.25em] text-[#8C6228] uppercase font-bold">
              ॥ मांगलिक कार्यक्रम ॥
            </p>
            <h2 className="font-hindi-royal text-6xl text-[#7E1A29] font-bold mt-3 drop-shadow">
              तिलक एवं शगुन
            </h2>

            <div className="w-24 h-[2px] bg-[#997E24]/30 my-6" />

            <p className="font-hindi text-2xl text-[#4A382A] leading-relaxed max-w-xl">
              पारंपरिक मांगलिक रीति-रिवाजों एवं लोक गीतों के पावन सानिध्य में तिलक एवं शगुन उत्सव।
            </p>

            <div className="mt-8 p-6 rounded-2xl bg-amber-50/90 border border-amber-200/80 w-full shadow-inner">
              <p className="font-hindi text-2xl text-[#821927] font-bold">
                शुभ तिथि: 27 नवंबर 2026
              </p>
              <p className="font-hindi text-xl text-[#5A4030] mt-1.5">
                स्थान: निज निवास — ग्राम पठखौली, पोस्ट शिवली राशिद गंज, आजमगढ़
              </p>
            </div>

            <div className="text-amber-800/60 tracking-widest text-lg mt-6">
              ✦ ✦ ✦
            </div>
          </div>

          <div className="h-28" />
        </div>
      )}

      {/* ========================================================
          SCENE 4: SANGEET (Starry Piano Night)
          ======================================================== */}
      {scene === 'sangeet' && (
        <div className="absolute inset-0 flex flex-col items-center justify-between py-24 px-16 text-center text-white">
          <Image
            src="/images/bg_sangeet.jpg"
            alt="Sangeet Night"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none" />

          <div className="h-16" />

          <div className="relative z-10 flex flex-col items-center bg-black/80 backdrop-blur-md p-14 rounded-3xl shadow-2xl border border-amber-400/35 w-full max-w-3xl my-auto">
            <div className="flex items-center gap-3 text-[#D4AF37] mb-2">
              <Music size={28} />
              <p className="font-serif text-lg tracking-[0.25em] uppercase font-bold text-[#F3E5AB]">
                Musical Evening
              </p>
            </div>

            <h2 className="font-hindi-royal text-6xl text-[#F8E7B4] font-bold tracking-wide mt-2 drop-shadow-xl">
              संगीत एवं स्नेह मिलन
            </h2>

            <div className="w-24 h-[2px] bg-amber-400/30 my-6" />

            <p className="font-hindi text-2xl text-[#E0D5C1] leading-relaxed max-w-xl">
              पारिवारिक उल्लास, गीतों की मधुर धुन और खुशियों से सजी एक अविस्मरणीय शाम।
            </p>

            <div className="mt-8 p-6 rounded-2xl bg-white/10 border border-amber-400/25 w-full shadow-inner">
              <p className="font-hindi text-2xl text-[#D4AF37] tracking-wider font-bold">
                27 नवंबर 2026 • सायं काल (Evening)
              </p>
              <p className="font-hindi text-xl text-[#C5A059] mt-1.5">
                रंगारंग प्रस्तुतियां एवं प्रीतिभोज
              </p>
            </div>

            <div className="text-amber-400/70 tracking-widest text-lg mt-6">
              ✦ ✦ ✦
            </div>
          </div>

          <div className="h-28" />
        </div>
      )}

      {/* ========================================================
          SCENE 5: HALDI & CARNIVAL
          ======================================================== */}
      {scene === 'haldi' && (
        <div className="absolute inset-0 flex flex-col items-center justify-between py-24 px-16 text-center">
          <Image
            src="/images/bg_haldi.jpg"
            alt="Haldi Ceremony"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/50 pointer-events-none" />

          <div className="h-10" />

          <div className="relative z-10 flex flex-col items-center bg-[#fffef5]/92 backdrop-blur-md p-14 rounded-3xl shadow-2xl border border-amber-300/70 w-full max-w-3xl my-auto">
            <p className="font-serif text-xl tracking-[0.2em] text-[#C06A17] uppercase font-bold">
              ॥ हल्दी एवं मंडपाच्छादन ॥
            </p>
            <h2 className="font-hindi-royal text-6xl text-[#C06A17] font-bold mt-3 drop-shadow">
              हल्दी उत्सव
            </h2>

            <div className="w-24 h-[2px] bg-amber-400/40 my-6" />

            <p className="font-hindi text-2xl text-[#5C4228] leading-relaxed max-w-xl">
              पीले गेंदे के फूलों की महक और उबटन के मंगल लेप से सुशोभित वर-वधू का पावन हल्दी संस्कार।
            </p>

            <div className="mt-8 p-6 rounded-2xl bg-amber-100/80 border border-amber-300/70 w-full shadow-inner">
              <p className="font-serif text-2xl text-[#C06A17] tracking-widest uppercase font-bold">
                11:00 AM ONWARDS
              </p>
              <p className="font-hindi text-xl text-[#5C4228] mt-1.5">
                मातृका पूजन, मंडप एवं हल्दी समारोह
              </p>
            </div>

            <div className="text-amber-800/60 tracking-widest text-lg mt-6">
              ✦ ✦ ✦
            </div>
          </div>

          <div className="h-28" />
        </div>
      )}

      {/* ========================================================
          SCENE 6: SHUBH VIVAAH (Royal Rose Arch)
          ======================================================== */}
      {scene === 'wedding' && (
        <div className="absolute inset-0 flex flex-col items-center justify-between py-24 px-16 text-center">
          <Image
            src="/images/bg_wedding_rose_arch.jpg"
            alt="Royal Wedding Rose Arch"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/50 pointer-events-none" />

          <div className="h-8" />

          <div className="relative z-10 flex flex-col items-center bg-[#fffaf5]/94 backdrop-blur-md p-14 rounded-3xl shadow-2xl border border-rose-900/30 w-full max-w-3xl my-auto">
            <p className="font-serif text-xl tracking-[0.25em] text-[#871828] uppercase font-bold">
              ॥ शुभ परिणय संस्कार ॥
            </p>
            <h2 className="font-hindi-royal text-6xl text-[#871828] font-bold mt-2 drop-shadow">
              शुभ विवाह
            </h2>

            <div className="w-24 h-[2px] bg-rose-900/30 my-6" />

            <div className="flex flex-col items-center gap-5 w-full">
              <div className="p-5 rounded-2xl bg-rose-50/90 border border-rose-200/80 w-full shadow-inner">
                <p className="font-hindi text-2xl text-[#871828] font-bold">
                  शुभ बारात प्रस्थान: 9 दिसंबर 2026
                </p>
                <p className="font-hindi text-xl text-[#4A382A] mt-1">
                  सायं 5:00 बजे (निज निवास पठखौली, शिवली राशिद गंज से)
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-rose-50/90 border border-rose-200/80 w-full shadow-inner">
                <p className="font-hindi text-2xl text-[#871828] font-bold">
                  द्वारपूजा, जयमाल एवं पाणिग्रहण संस्कार
                </p>
                <p className="font-hindi text-xl text-[#4A382A] mt-1">
                  9 दिसंबर 2026, शुभ लग्न एवं रात्रि बेला (ग्राम नाहूपुर, सोडरी)
                </p>
              </div>
            </div>

            <div className="text-rose-900/60 tracking-widest text-lg mt-6">
              ✦ ✦ ✦
            </div>
          </div>

          <div className="h-32" />
        </div>
      )}

      {/* ========================================================
          SCENE 7: BAL AAGRAH, FAMILY & RSVP
          ======================================================== */}
      {scene === 'rsvp' && (
        <div className="absolute inset-0 flex flex-col items-center justify-between py-20 px-14 text-center">
          <Image
            src="/images/bg_rsvp.jpg"
            alt="RSVP Heritage Pavilion"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/50 pointer-events-none" />

          {/* Top Heading */}
          <div className="relative z-10 flex flex-col items-center">
            <p className="font-hindi-royal text-2xl text-[#7A1C2B] font-bold">
              ॥ दर्शनार्थी एवं स्वागताकांक्षी ॥
            </p>
            <p className="font-hindi text-lg text-[#6B4B27] mt-1">
              आपकी गरिमामयी उपस्थिति हमारे लिए परम सौभाग्य होगी
            </p>
          </div>

          {/* Family Box */}
          <div className="relative z-10 flex flex-col items-center bg-[#fdfbf7]/94 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-amber-900/20 w-full max-w-3xl my-auto gap-6">
            
            {/* 🧸 बाल आग्रह */}
            <div className="w-full p-6 rounded-2xl bg-gradient-to-r from-amber-100 via-rose-50 to-amber-100 border border-amber-300 shadow-sm">
              <div className="flex items-center justify-center gap-2 text-[#871828] mb-1">
                <Sparkles size={20} className="text-amber-600 animate-spin" />
                <span className="font-hindi-royal text-lg font-bold tracking-wider">
                  बाल आग्रह
                </span>
                <Sparkles size={20} className="text-amber-600 animate-spin" />
              </div>
              <p className="font-hindi text-2xl text-[#871828] font-bold leading-tight mt-1">
                &ldquo;मेरे मामू की शादी में धूमधाम से आना।&rdquo;
              </p>
              <p className="font-hindi text-lg text-[#4A382A] mt-2">
                स्नेही बच्चे: <span className="font-bold text-[#821927]">शिव्या, पिहू, दिवेश</span>
              </p>
            </div>

            {/* पूज्य चाचा जी */}
            <div className="w-full text-center">
              <p className="font-hindi text-lg font-bold text-[#8C6228]">
                ॥ स्वागताकांक्षी / पूज्य चाचा जी ॥
              </p>
              <p className="font-hindi text-2xl text-[#2F4F2F] font-bold mt-1">
                सुबेदार, श्रीचंद्र, श्रीराम
              </p>
            </div>

            <div className="w-24 h-[1px] bg-[#997E24]/30" />

            {/* स्नेही भाई (भ्रातृवृन्द) */}
            <div className="w-full text-center">
              <p className="font-hindi text-lg font-bold text-[#8C6228]">
                ॥ दर्शनाभिलाषी / भ्रातृवृन्द ॥
              </p>
              <p className="font-hindi text-xl text-[#332211] font-semibold leading-relaxed mt-1 max-w-2xl mx-auto">
                चन्द्रभान, उदयभान, संदीप, <span className="text-[#871828] font-bold">सदेश</span>, नितेश, रवि, नितिन, अंशु, अमन, आकाश, आदित्य, अर्पित
              </p>
            </div>

            <div className="w-24 h-[1px] bg-[#997E24]/30" />

            {/* विनीत */}
            <div className="w-full text-center">
              <p className="font-hindi text-lg font-bold text-[#8C6228]">
                ॥ विनीत ॥
              </p>
              <p className="font-hindi text-2xl text-[#871828] font-bold mt-1">
                समस्त यादव परिवार
              </p>
              <p className="font-hindi text-base text-[#695443] mt-0.5">
                ग्राम - पठखौली, पोस्ट - शिवली राशिद गंज, जिला - आजमगढ़
              </p>
            </div>
          </div>

          <div className="h-6" />
        </div>
      )}

    </div>
  );
}

