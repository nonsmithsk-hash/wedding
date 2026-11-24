'use client';

import React, { useState } from 'react';
import { Check, Copy, ExternalLink, MapPin, Navigation } from 'lucide-react';
import MarigoldGarland from './MarigoldGarland';

export default function HowToReach() {
  const [copiedGroom, setCopiedGroom] = useState(false);
  const [copiedBride, setCopiedBride] = useState(false);

  const groomAddress = 'ग्राम - पठखौली, पोस्ट - शिवली राशिद गंज, जिला - आजमगढ़, उत्तर प्रदेश';
  const brideAddress = 'ग्राम - नाहूपुर, पोस्ट - सोडरी, जिला - आजमगढ़, उत्तर प्रदेश';

  const copyToClipboard = (text: string, isGroom: boolean) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        if (isGroom) {
          setCopiedGroom(true);
          setTimeout(() => setCopiedGroom(false), 2500);
        } else {
          setCopiedBride(true);
          setTimeout(() => setCopiedBride(false), 2500);
        }
      });
    }
  };

  const mapsUrl = 'https://maps.app.goo.gl/1GaAcjDZuPvmhGYeA?g_st=aw';

  return (
    <section className="relative w-full py-16 px-4 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#120608] via-[#1A0B0F] to-[#0A0305]">
      {/* Top Marigold Garland */}
      <MarigoldGarland className="-mt-8 mb-6" />

      {/* Header */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-lg mb-8">
        <p className="font-serif text-xs tracking-[0.3em] uppercase font-bold text-[#C5A059]">
          LOCATION & DIRECTIONS
        </p>
        <h2 className="font-hindi-royal text-3xl sm:text-4xl text-[#F8E7B4] font-bold drop-shadow">
          How to Reach • निवास एवं विवाह स्थल
        </h2>
        <p className="font-hindi text-xs sm:text-sm text-[#D4AF37]/90 mt-1">
          मानचित्र में स्थान देखें और आसानी से पहुंचें
        </p>
      </div>

      {/* Map & Venue Cards Container */}
      <div className="relative z-10 w-full max-w-[360px] sm:max-w-[420px] rounded-3xl overflow-hidden border-2 border-[#D4AF37]/60 shadow-[0_20px_50px_rgba(0,0,0,0.85)] bg-black/80 backdrop-blur-md">
        {/* Stylized Google Maps Preview Card */}
        <div className="relative w-full h-[200px] overflow-hidden bg-stone-900 flex items-center justify-center">
          {/* Subtle stylized topographic map pattern */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'radial-gradient(#D4AF37 1px, transparent 1px), radial-gradient(#801420 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              backgroundPosition: '0 0, 12px 12px',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60" />

          {/* Glowing Animated Map Pin */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="relative flex items-center justify-center">
              <span className="absolute w-12 h-12 rounded-full bg-amber-400/30 animate-ping" />
              <div className="w-12 h-12 rounded-full bg-gradient-to-b from-amber-400 to-amber-700 border-2 border-white flex items-center justify-center text-black shadow-lg">
                <MapPin className="w-6 h-6 text-black fill-black" />
              </div>
            </div>
            <span className="mt-2 px-3 py-1 rounded-full bg-black/80 border border-amber-400/50 text-[#F8E7B4] font-hindi text-xs font-bold shadow-md">
              आजमगढ़ (Azamgarh, UP)
            </span>
          </div>

          {/* Quick Get Directions Button on Map */}
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-serif text-[11px] font-bold tracking-wider uppercase shadow-md transition-all duration-200"
          >
            <span>Open in Maps</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Address Blocks */}
        <div className="p-5 sm:p-6 space-y-4">
          {/* 1. वर पक्ष निवास Address Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#20080D] to-[#140508] border border-[#D4AF37]/40 shadow-inner space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-hindi text-sm font-bold text-[#FFE599] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                वर पक्ष निवास (पठखौली)
              </span>
              <button
                onClick={() => copyToClipboard(groomAddress, true)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 hover:bg-[#D4AF37] text-white hover:text-black text-xs font-serif font-semibold border border-white/20 transition-all duration-200"
                title="Copy address"
              >
                {copiedGroom ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <p className="font-hindi text-xs text-[#E2D2B0] leading-relaxed">
              {groomAddress}
            </p>
          </div>

          {/* 2. वधू पक्ष / मुख्य विवाह स्थल Address Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#20080D] to-[#140508] border border-[#D4AF37]/40 shadow-inner space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-hindi text-sm font-bold text-[#FFE599] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                वधू पक्ष / विवाह स्थल (सोडरी)
              </span>
              <button
                onClick={() => copyToClipboard(brideAddress, false)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 hover:bg-[#D4AF37] text-white hover:text-black text-xs font-serif font-semibold border border-white/20 transition-all duration-200"
                title="Copy address"
              >
                {copiedBride ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <p className="font-hindi text-xs text-[#E2D2B0] leading-relaxed">
              {brideAddress}
            </p>
          </div>

          {/* Main Action Buttons */}
          <div className="pt-2 flex flex-col gap-2.5">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-gradient-to-r from-[#997428] via-[#E2B744] to-[#997428] text-[#1E0902] font-serif text-xs sm:text-sm font-bold tracking-wider uppercase shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-300"
            >
              <Navigation className="w-4 h-4" />
              <span>GET DIRECTIONS ON GOOGLE MAPS</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
