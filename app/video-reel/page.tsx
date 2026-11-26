'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Calendar, Clock, Music, Sparkles } from 'lucide-react';
import MarigoldGarland from '@/components/MarigoldGarland';

declare global {
  interface Window {
    __seekTo?: (t: number) => void;
    __ready?: boolean;
  }
}

// Smooth math helpers for deterministic motion graphics
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - clamp01(t), 3);
const easeInOutCubic = (t: number) => {
  const x = clamp01(t);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};
const easeOutBack = (t: number) => {
  const x = clamp01(t);
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};
const prog = (t: number, start: number, dur: number) => clamp01((t - start) / dur);

// Staggered soft blur-in + float-up style for text & inner elements
function blurFloatStyle(t: number, start: number, dur = 0.65, yDist = 28): React.CSSProperties {
  const p = easeOutCubic(prog(t, start, dur));
  return {
    opacity: p,
    transform: `translate3d(0, ${(1 - p) * yDist}px, 0) scale(${0.96 + 0.04 * p})`,
    filter: `blur(${(1 - p) * 8}px)`,
  };
}

// Slide from left or right with blur-in
function slideSideStyle(t: number, start: number, fromX: number, dur = 0.7): React.CSSProperties {
  const p = easeOutCubic(prog(t, start, dur));
  return {
    opacity: p,
    transform: `translate3d(${(1 - p) * fromX}px, 0, 0)`,
    filter: `blur(${(1 - p) * 6}px)`,
  };
}

// Deterministic particle overlay (golden embers + rose petals)
function ParticleCanvas({ time }: { time: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = 1080;
    const H = 1920;
    ctx.clearRect(0, 0, W, H);

    // 1. Golden rising sparkles (45 deterministic particles)
    for (let i = 0; i < 45; i++) {
      const seed1 = Math.sin(i * 12.9898) * 43758.5453;
      const r1 = seed1 - Math.floor(seed1);
      const seed2 = Math.sin(i * 78.233 + 1.5) * 43758.5453;
      const r2 = seed2 - Math.floor(seed2);
      const seed3 = Math.sin(i * 45.164 + 3.1) * 43758.5453;
      const r3 = seed3 - Math.floor(seed3);

      const speed = 55 + r1 * 85;
      const xBase = r2 * W;
      const x = xBase + Math.sin(time * (1.2 + r3) + i) * 35;
      const y = ((H - ((time * speed + r3 * H) % (H + 100))) + H + 100) % (H + 100) - 50;
      const radius = 2 + r1 * 4.5;
      const twinkle = 0.35 + 0.65 * Math.abs(Math.sin(time * 2.5 + i * 1.7));

      const grad = ctx.createRadialGradient(x, y, 0, x, y, radius * 3);
      grad.addColorStop(0, `rgba(255, 243, 180, ${0.9 * twinkle})`);
      grad.addColorStop(0.4, `rgba(212, 175, 55, ${0.5 * twinkle})`);
      grad.addColorStop(1, 'rgba(212, 175, 55, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, radius * 3, 0, Math.PI * 2);
      ctx.fill();
    }

    // 2. Drifting rose & marigold petals (22 deterministic petals)
    for (let i = 0; i < 22; i++) {
      const s1 = Math.sin(i * 91.17 + 5.2) * 19283.41;
      const r1 = s1 - Math.floor(s1);
      const s2 = Math.sin(i * 33.71 + 9.4) * 28471.13;
      const r2 = s2 - Math.floor(s2);

      const fallSpeed = 90 + r1 * 80;
      const x = ((r2 * W + Math.sin(time * 1.5 + i * 2.1) * 65 + time * 18 * (r1 - 0.3)) % (W + 80) + W + 80) % (W + 80) - 40;
      const y = ((time * fallSpeed + r1 * H) % (H + 120)) - 60;
      const rot = time * (1.2 + r2 * 1.5) + i;
      const scale = 0.7 + r1 * 0.7;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.scale(scale, scale);
      ctx.beginPath();
      ctx.moveTo(0, -10);
      ctx.bezierCurveTo(10, -10, 14, 4, 0, 14);
      ctx.bezierCurveTo(-14, 4, -10, -10, 0, -10);
      ctx.fillStyle = i % 3 === 0 ? 'rgba(245, 176, 0, 0.55)' : 'rgba(190, 30, 55, 0.55)';
      ctx.fill();
      ctx.restore();
    }
  }, [time]);

  return (
    <canvas
      ref={canvasRef}
      width={1080}
      height={1920}
      className="absolute inset-0 pointer-events-none z-40"
    />
  );
}

const GaneshaIcon = ({ className = 'w-24 h-24' }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="currentColor" className={className}>
    <path d="M50 15 C45 15, 38 20, 38 28 C38 34, 42 38, 45 40 C38 41, 30 46, 30 55 C30 65, 40 70, 48 70 C48 75, 45 80, 40 85 C42 86, 48 85, 52 80 C54 77, 55 72, 55 70 C62 70, 72 65, 72 55 C72 46, 64 41, 57 40 C60 38, 64 34, 64 28 C64 20, 57 15, 50 15 Z M50 22 C53 22, 57 24, 57 28 C57 32, 53 34, 50 34 C47 34, 43 32, 43 28 C43 24, 47 22, 50 22 Z M47 46 C48 46, 52 46, 53 46 C60 47, 65 50, 65 56 C65 62, 58 64, 50 64 C42 64, 35 62, 35 56 C35 50, 40 47, 47 46 Z" />
  </svg>
);

export default function VideoReelPage() {
  const [t, setT] = useState(0);

  useEffect(() => {
    window.__seekTo = (newT: number) => {
      setT(newT);
    };
    window.__ready = true;
    return () => {
      delete window.__seekTo;
      delete window.__ready;
    };
  }, []);

  // Scene timelines (47.0s total)
  // S1: 0.0 -> 5.8 (Book Cover + 3D Open)
  // S2: 5.0 -> 11.8 (Couple Arch)
  // S3: 11.2 -> 17.2 (Royal Scroll Unroll)
  // S4: 16.6 -> 22.4 (Tilak 3D Flip)
  // S5: 21.8 -> 27.6 (Sangeet 3D Flip)
  // S6: 27.0 -> 32.4 (Haldi Rise)
  // S7: 31.8 -> 38.2 (Shubh Vivah Mandap)
  // S8: 37.6 -> 43.0 (Bal Aagrah & Family)
  // S9: 42.4 -> 47.0 (Credits & Fade Out)

  const garlandSway = Math.sin(t * 1.4) * 1.6;
  const globalFadeOut = t > 45.6 ? 1 - clamp01((t - 45.6) / 1.4) : 1;

  // Helper for scene visibility & cross-fade envelope
  const sceneAlpha = (start: number, fadeIn: number, fadeOutStart: number, fadeOutDur: number) => {
    if (t < start || t > fadeOutStart + fadeOutDur) return 0;
    const aIn = fadeIn > 0 ? easeInOutCubic(prog(t, start, fadeIn)) : 1;
    const aOut = fadeOutDur > 0 ? 1 - easeInOutCubic(prog(t, fadeOutStart, fadeOutDur)) : 1;
    return Math.min(aIn, aOut);
  };

  return (
    <div
      className="w-[1080px] h-[1920px] relative overflow-hidden bg-[#0E0204] text-[#2b1d14] select-none"
      style={{ opacity: globalFadeOut }}
    >
      {/* ================================================================
          SCENE 1: 3D ROYAL BOOK COVER & OPENING (0.0s - 5.8s)
         ================================================================ */}
      {t < 5.9 && (() => {
        const lt = t;
        const enterP = easeOutBack(prog(lt, 0.15, 1.1));
        const openP = easeInOutCubic(prog(lt, 3.9, 1.5));
        const lightBurst = easeInOutCubic(prog(lt, 4.3, 1.2));
        const shimmerX = -120 + prog(lt, 1.8, 1.8) * 340;
        const fadeOut = lt > 5.1 ? 1 - prog(lt, 5.1, 0.7) : 1;

        return (
          <div
            className="absolute inset-0 flex flex-col items-center justify-between py-24 px-16 text-center bg-gradient-to-b from-[#2A040A] via-[#480913] to-[#1A0205]"
            style={{ opacity: fadeOut, zIndex: 10 }}
          >
            {/* Ambient Bokeh */}
            <div
              className="absolute top-1/4 left-1/4 w-[650px] h-[650px] rounded-full bg-rose-600/20 blur-3xl"
              style={{ transform: `scale(${1 + Math.sin(t) * 0.08})` }}
            />
            <div
              className="absolute bottom-1/4 right-1/4 w-[650px] h-[650px] rounded-full bg-amber-500/20 blur-3xl"
              style={{ transform: `scale(${1 + Math.cos(t) * 0.08})` }}
            />

            {/* Swaying Marigold Garland */}
            <div
              className="relative z-20 w-full max-w-4xl scale-125 mb-2 origin-top"
              style={{ transform: `scale(1.25) rotate(${garlandSway}deg)` }}
            >
              <MarigoldGarland />
            </div>

            {/* Top Pill */}
            <div
              className="relative z-20 px-10 py-3 rounded-full bg-black/60 border border-amber-400/60 shadow-xl"
              style={blurFloatStyle(lt, 0.3, 0.6)}
            >
              <span className="font-hindi text-2xl font-bold text-[#F8E7B4] tracking-widest">
                ॥ श्री गणेशाय नमः ॥
              </span>
            </div>

            {/* 3D Book Stage */}
            <div
              className="relative z-10 w-[720px] h-[1050px] my-auto"
              style={{ perspective: '2000px' }}
            >
              {/* Inside Golden Glowing Page (revealed when cover opens) */}
              <div
                className="absolute inset-0 rounded-3xl border-4 border-[#F3E5AB] bg-gradient-to-br from-[#FFFDF5] via-[#FAF0D1] to-[#F2DFAA] shadow-[0_0_80px_rgba(255,215,100,0.6)] flex flex-col items-center justify-center p-12"
                style={{ opacity: openP > 0.05 ? 1 : 0 }}
              >
                <GaneshaIcon className="w-32 h-32 text-[#801420] mb-4" />
                <p className="font-hindi-royal text-5xl text-[#801420] font-bold">
                  सादर आमंत्रण
                </p>
                <p className="font-playfair text-2xl text-[#8C5E1E] tracking-[0.25em] uppercase mt-2">
                  CORDIALLY INVITES YOU
                </p>
              </div>

              {/* 3D Front Cover swinging open from left spine */}
              <div
                className="absolute inset-0 rounded-3xl border-4 border-[#D4AF37]/90 shadow-[0_30px_90px_rgba(0,0,0,0.95)] flex flex-col items-center justify-between p-16 bg-gradient-to-br from-[#7A1422] via-[#540813] to-[#3B020B] overflow-hidden"
                style={{
                  transformOrigin: 'left center',
                  transform: `scale(${0.86 + 0.14 * enterP}) rotateY(${(1 - enterP) * -28 - openP * 115}deg) translateY(${Math.sin(lt * 1.8) * 6}px)`,
                  opacity: clamp01(enterP * 1.4),
                  backfaceVisibility: 'hidden',
                }}
              >
                {/* Sweeping Golden Shimmer */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(115deg, transparent ${shimmerX - 25}%, rgba(255,235,160,0.22) ${shimmerX}%, transparent ${shimmerX + 25}%)`,
                  }}
                />
                {/* Spine Shadow */}
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black/80 via-black/40 to-transparent border-r border-[#D4AF37]/40 rounded-l-2xl" />
                {/* Embossed Frame */}
                <div className="absolute inset-8 rounded-2xl border-2 border-[#D4AF37]/80 pointer-events-none">
                  <div className="absolute inset-3 rounded-xl border border-dashed border-[#F3E5AB]/70" />
                  <div className="absolute top-2 left-2 text-[#F3E5AB] text-2xl">✤</div>
                  <div className="absolute top-2 right-2 text-[#F3E5AB] text-2xl">✤</div>
                  <div className="absolute bottom-2 left-2 text-[#F3E5AB] text-2xl">✤</div>
                  <div className="absolute bottom-2 right-2 text-[#F3E5AB] text-2xl">✤</div>
                </div>

                <div className="relative z-10 mt-2" style={blurFloatStyle(lt, 0.7, 0.6)}>
                  <span className="font-montserrat text-lg text-[#F8E7B4] tracking-[0.35em] uppercase font-bold">
                    AUSPICIOUS WEDDING INVITATION
                  </span>
                </div>

                <div className="relative z-10 flex flex-col items-center my-auto">
                  <div
                    className="w-56 h-56 rounded-full bg-gradient-to-b from-[#8C1625] to-[#45050E] border-4 border-[#F3E5AB] shadow-[0_0_50px_rgba(212,175,55,0.6)] flex items-center justify-center relative"
                    style={blurFloatStyle(lt, 0.9, 0.7)}
                  >
                    <div className="absolute inset-3 rounded-full border-2 border-dashed border-[#D4AF37]/80" />
                    <GaneshaIcon className="w-32 h-32 text-[#F8E7B4]" />
                  </div>

                  <h2
                    className="font-hindi-royal text-7xl text-[#F8E7B4] font-bold tracking-wider mt-8 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]"
                    style={blurFloatStyle(lt, 1.3, 0.7)}
                  >
                    ॥ शुभ विवाह ॥
                  </h2>
                  <p
                    className="font-playfair text-2xl tracking-[0.3em] uppercase text-[#D4AF37] font-semibold mt-2"
                    style={blurFloatStyle(lt, 1.6, 0.6)}
                  >
                    SHUBH VIVAAH
                  </p>

                  <div
                    className="mt-8 px-12 py-3 rounded-full bg-black/50 border-2 border-[#D4AF37]/70 shadow-2xl"
                    style={blurFloatStyle(lt, 2.0, 0.65)}
                  >
                    <span className="font-hindi text-4xl text-[#FFE599] font-black tracking-wide">
                      राकेश &nbsp;♥&nbsp; पूजा
                    </span>
                  </div>
                </div>

                <div className="relative z-10 mb-2" style={blurFloatStyle(lt, 2.3, 0.6)}>
                  <span className="text-[#D4AF37] text-lg tracking-[0.25em] uppercase font-montserrat font-bold">
                    WEDNESDAY, 9 DECEMBER 2026 • AZAMGARH
                  </span>
                </div>
              </div>
            </div>

            <div
              className="relative z-20 mb-4 flex items-center gap-3 text-amber-300"
              style={blurFloatStyle(lt, 1.1, 0.6)}
            >
              <span className="text-xl">✦</span>
              <span className="font-hindi text-xl font-bold tracking-widest text-[#F8E7B4]">
                मांगलिक परिणय उत्सव
              </span>
              <span className="text-xl">✦</span>
            </div>

            {/* Golden Light Bloom on Book Open */}
            {lightBurst > 0 && (
              <div
                className="absolute inset-0 pointer-events-none z-50"
                style={{
                  background: 'radial-gradient(circle, rgba(255,248,220,0.95) 0%, rgba(255,215,120,0.5) 45%, transparent 80%)',
                  opacity: Math.sin(lightBurst * Math.PI) * 0.9,
                  transform: `scale(${0.6 + lightBurst * 1.4})`,
                }}
              />
            )}
          </div>
        );
      })()}

      {/* ================================================================
          SCENE 2: COUPLE NAMES REVEAL - PALACE ARCH (5.0s - 11.8s)
         ================================================================ */}
      {t >= 5.0 && t <= 12.0 && (() => {
        const lt = t - 5.0;
        const alpha = sceneAlpha(5.0, 0.8, 11.1, 0.8);
        const kbScale = 1.04 + (lt / 7.0) * 0.1;
        const archEnter = easeOutCubic(prog(lt, 0.2, 0.9));

        return (
          <div
            className="absolute inset-0 flex flex-col items-center justify-between py-20 px-14 text-center"
            style={{ opacity: alpha, zIndex: 12 }}
          >
            <img
              src="/images/heavenly_palace_terrace_hd.jpg"
              alt="Palace Terrace"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ transform: `scale(${kbScale}) translateY(${-(lt * 4)}px)` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/45 to-black/85" />

            <div
              className="relative z-20 w-full max-w-4xl origin-top"
              style={{ transform: `scale(1.1) rotate(${garlandSway}deg)` }}
            >
              <MarigoldGarland />
            </div>

            {/* Palace Arch Card */}
            <div
              className="relative z-10 w-full max-w-[840px] my-auto rounded-t-[320px] rounded-b-3xl border-4 border-[#D4AF37]/90 shadow-[0_30px_90px_rgba(0,0,0,0.95)] p-14 flex flex-col items-center bg-gradient-to-b from-[#FFFDF8] via-[#FAF3E0] to-[#F5E8C4]"
              style={{
                perspective: '1400px',
                transform: `translate3d(0, ${(1 - archEnter) * 90 + Math.sin(lt * 1.6) * 4}px, 0) rotateX(${(1 - archEnter) * 12}deg) scale(${0.92 + 0.08 * archEnter})`,
              }}
            >
              <div className="absolute inset-4 rounded-t-[300px] rounded-b-2xl border-2 border-dashed border-[#C5A059]/70 pointer-events-none" />

              <div className="flex flex-col items-center pt-4" style={blurFloatStyle(lt, 0.5, 0.6)}>
                <GaneshaIcon className="w-20 h-20 text-[#8B1A24] mb-2" />
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

              {/* RP Monogram */}
              <div
                className="w-24 h-24 rounded-full border-2 border-[#D4AF37] flex items-center justify-center my-5 bg-gradient-to-br from-[#FAF3DE] to-[#F0E0B8] shadow-md"
                style={{
                  opacity: easeOutBack(prog(lt, 0.9, 0.6)),
                  transform: `scale(${0.5 + 0.5 * easeOutBack(prog(lt, 0.9, 0.6))})`,
                }}
              >
                <span className="font-playfair text-4xl font-bold text-[#801420]">RP</span>
              </div>

              {/* Groom */}
              <div className="flex flex-col items-center w-full" style={slideSideStyle(lt, 1.3, -60, 0.7)}>
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

              {/* Divider */}
              <div
                className="flex items-center gap-6 my-4 w-full justify-center"
                style={blurFloatStyle(lt, 1.9, 0.5)}
              >
                <span className="w-32 h-[2px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
                <span className="font-playfair text-4xl text-[#8C5E1E] font-bold italic">&amp;</span>
                <span className="w-32 h-[2px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
              </div>

              {/* Bride */}
              <div className="flex flex-col items-center w-full" style={slideSideStyle(lt, 2.2, 60, 0.7)}>
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

              <div className="w-32 h-[2px] bg-[#C5A059]/60 my-5" />

              <div style={blurFloatStyle(lt, 2.8, 0.6)}>
                <p className="font-playfair text-xl italic text-[#7A5B38]">
                  request the pleasure of your company at the celebration of their wedding
                </p>
                <p className="font-hindi text-lg text-[#801420] font-bold mt-1">
                  मांगलिक परिणय उत्सव में आपकी गरिमामयी उपस्थिति सादर प्रार्थनीय है।
                </p>
              </div>
            </div>

            <div className="h-6" />
          </div>
        );
      })()}

      {/* ================================================================
          SCENE 3: ROYAL SCROLL UNROLLING (11.2s - 17.2s)
         ================================================================ */}
      {t >= 11.2 && t <= 17.4 && (() => {
        const lt = t - 11.2;
        const alpha = sceneAlpha(11.2, 0.7, 16.5, 0.7);
        const unrollP = easeOutCubic(prog(lt, 0.35, 1.25));

        return (
          <div
            className="absolute inset-0 flex flex-col items-center justify-between py-24 px-16 text-center bg-gradient-to-b from-[#2B050D] via-[#420814] to-[#1C0206]"
            style={{ opacity: alpha, zIndex: 14 }}
          >
            {/* Rotating Mandala Aura */}
            <div
              className="absolute top-1/2 left-1/2 w-[950px] h-[950px] rounded-full border border-[#D4AF37]/20 pointer-events-none"
              style={{ transform: `translate(-50%, -50%) rotate(${lt * 8}deg)` }}
            >
              <div className="absolute inset-12 rounded-full border border-dashed border-[#D4AF37]/25" />
            </div>

            <div
              className="relative z-20 w-full max-w-4xl origin-top"
              style={{ transform: `scale(1.1) rotate(${garlandSway}deg)` }}
            >
              <MarigoldGarland />
            </div>

            <div className="relative z-10 flex flex-col items-center mt-2" style={blurFloatStyle(lt, 0.2, 0.6)}>
              <p className="font-montserrat text-lg tracking-[0.3em] uppercase text-[#C5A059] font-bold">
                SAVE THE DATE
              </p>
              <h2 className="font-hindi-royal text-5xl text-[#F8E7B4] font-bold drop-shadow mt-1">
                पावन लग्न तिथि • Royal Scroll
              </h2>
            </div>

            {/* Unrolling Royal Scroll */}
            <div className="relative z-10 w-[780px] my-auto flex flex-col items-center">
              <div className="w-full h-14 rounded-full bg-gradient-to-r from-[#AA771C] via-[#FFF3B3] to-[#AA771C] border-2 border-[#8C6228] shadow-2xl flex items-center justify-center z-20">
                <span className="font-hindi text-lg text-[#3E2510] font-black tracking-widest uppercase">
                  ॥ शुभ विवाह लग्न पत्रिका ॥
                </span>
              </div>

              <div
                className="w-[92%] overflow-hidden border-x-4 border-b-4 border-[#C5A059] bg-gradient-to-b from-[#FFFDF8] via-[#FAF2DC] to-[#F5E8C4] shadow-[0_25px_70px_rgba(0,0,0,0.85)] flex flex-col items-center text-center"
                style={{
                  maxHeight: `${unrollP * 920}px`,
                  paddingTop: `${unrollP * 48}px`,
                  paddingBottom: `${unrollP * 48}px`,
                  paddingLeft: '48px',
                  paddingRight: '48px',
                  borderRadius: '0 0 16px 16px',
                }}
              >
                <div style={blurFloatStyle(lt, 1.0, 0.6)}>
                  <p className="font-hindi text-xl text-[#8C5E1E] font-bold tracking-widest uppercase">
                    ॥ शुभ विवाह मुहूर्त ॥
                  </p>
                </div>

                <div className="my-4 flex flex-col items-center" style={blurFloatStyle(lt, 1.3, 0.7)}>
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

                <div className="space-y-3 font-hindi" style={blurFloatStyle(lt, 1.8, 0.7)}>
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

              <div className="w-full h-14 -mt-1 rounded-full bg-gradient-to-r from-[#AA771C] via-[#FFF3B3] to-[#AA771C] border-2 border-[#8C6228] shadow-2xl flex items-center justify-center z-20">
                <span className="font-montserrat text-sm text-[#3E2510] font-black tracking-widest uppercase">
                  WEDNESDAY, 9 DECEMBER 2026
                </span>
              </div>
            </div>

            <div className="h-6" />
          </div>
        );
      })()}

      {/* ================================================================
          SCENE 4: TILAK & SHAGUN - 3D CARD FLIP (16.6s - 22.4s)
         ================================================================ */}
      {t >= 16.6 && t <= 22.6 && (() => {
        const lt = t - 16.6;
        const alpha = sceneAlpha(16.6, 0.65, 21.7, 0.7);
        const flipIn = easeOutCubic(prog(lt, 0.1, 0.95));
        const flipOut = easeInOutCubic(prog(lt, 5.0, 0.7));
        const kbScale = 1.03 + (lt / 6.0) * 0.1;

        return (
          <div
            className="absolute inset-0 flex flex-col items-center justify-between py-24 px-16 text-center"
            style={{ opacity: alpha, zIndex: 16, perspective: '1600px' }}
          >
            <img
              src="/images/tilak_palace_bg.jpg"
              alt="Tilak Palace"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ transform: `scale(${kbScale})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/45 to-black/85" />

            <div
              className="relative z-20 w-full max-w-4xl origin-top"
              style={{ transform: `scale(1.1) rotate(${garlandSway}deg)` }}
            >
              <MarigoldGarland />
            </div>

            <div
              className="relative z-10 flex flex-col items-center bg-[#FFFDF7]/95 backdrop-blur-md p-14 rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.9)] border-2 border-[#D4AF37]/80 w-full max-w-[820px] my-auto"
              style={{
                transform: `rotateY(${(1 - flipIn) * -75 + flipOut * 75}deg) scale(${0.88 + 0.12 * flipIn}) translateY(${Math.sin(lt * 2) * 5}px)`,
              }}
            >
              <div
                className="flex items-center gap-2 px-6 py-1.5 rounded-full bg-black/80 text-white text-sm font-montserrat font-bold uppercase mb-4 border border-white/20"
                style={blurFloatStyle(lt, 0.5, 0.5)}
              >
                <span className="w-3.5 h-3.5 rounded-full bg-[#D4AF37]" />
                <span>TRADITIONAL FESTIVE • पारंपरिक परिधान</span>
              </div>

              <div style={blurFloatStyle(lt, 0.8, 0.6)}>
                <p className="font-montserrat text-sm tracking-[0.3em] uppercase text-[#8C6228] font-bold">
                  ॥ मांगलिक कार्यक्रम ॥
                </p>
                <h2 className="font-hindi-royal text-6xl text-[#7E1A29] font-bold mt-2 drop-shadow">
                  तिलक एवं शगुन
                </h2>
                <p className="font-playfair text-xl text-[#B38728] uppercase tracking-wider font-semibold mt-1">
                  TILAK &amp; SHAGUN CEREMONY
                </p>
              </div>

              <div className="w-32 h-[2px] bg-[#D4AF37]/50 my-6" />

              <p
                className="font-hindi text-2xl text-[#4A382A] leading-relaxed max-w-xl font-medium"
                style={blurFloatStyle(lt, 1.2, 0.6)}
              >
                पारंपरिक मांगलिक रीति-रिवाजों एवं लोक गीतों के पावन सानिध्य में तिलक एवं शगुन उत्सव।
              </p>

              <div
                className="mt-8 p-8 rounded-2xl bg-amber-50/90 border-2 border-amber-200/90 w-full shadow-inner flex flex-col items-center gap-2"
                style={blurFloatStyle(lt, 1.6, 0.7)}
              >
                <div className="flex items-center gap-3 text-[#821927]">
                  <Calendar className="w-8 h-8 text-amber-600" />
                  <span className="font-hindi text-4xl font-black">28 नवंबर 2026</span>
                </div>
                <p className="font-hindi text-2xl text-[#5A4030] font-bold mt-2">
                  स्थान: निज निवास — ग्राम पठखौली, पोस्ट शिवली राशिद गंज, आजमगढ़
                </p>
              </div>

              <div className="text-amber-800/60 tracking-widest text-xl mt-6">✦ ✦ ✦</div>
            </div>

            <div className="h-6" />
          </div>
        );
      })()}

      {/* ================================================================
          SCENE 5: SANGEET & MUSICAL EVENING (21.8s - 27.6s)
         ================================================================ */}
      {t >= 21.8 && t <= 27.8 && (() => {
        const lt = t - 21.8;
        const alpha = sceneAlpha(21.8, 0.65, 26.9, 0.7);
        const flipIn = easeOutCubic(prog(lt, 0.1, 0.95));
        const kbScale = 1.03 + (lt / 6.0) * 0.1;

        return (
          <div
            className="absolute inset-0 flex flex-col items-center justify-between py-24 px-16 text-center text-white"
            style={{ opacity: alpha, zIndex: 18, perspective: '1600px' }}
          >
            <img
              src="/images/sangeet_night_bg.jpg"
              alt="Sangeet Night"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ transform: `scale(${kbScale})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/55 to-black/90" />

            <div
              className="relative z-20 w-full max-w-4xl origin-top"
              style={{ transform: `scale(1.1) rotate(${garlandSway}deg)` }}
            >
              <MarigoldGarland />
            </div>

            <div
              className="relative z-10 flex flex-col items-center bg-black/85 backdrop-blur-md p-14 rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.95)] border-2 border-[#D4AF37]/70 w-full max-w-[820px] my-auto"
              style={{
                transform: `rotateY(${(1 - flipIn) * -75}deg) scale(${0.88 + 0.12 * flipIn}) translateY(${Math.sin(lt * 2.1) * 5}px)`,
              }}
            >
              <div
                className="flex items-center gap-2 px-6 py-1.5 rounded-full bg-white/10 text-white text-sm font-montserrat font-bold uppercase mb-4 border border-white/20"
                style={blurFloatStyle(lt, 0.5, 0.5)}
              >
                <span className="w-3.5 h-3.5 rounded-full bg-[#3A1C71]" />
                <span>INDO-WESTERN / GLAMOUR • सुरमयी शाम</span>
              </div>

              <div className="flex items-center gap-3 text-[#D4AF37] mb-1" style={blurFloatStyle(lt, 0.7, 0.5)}>
                <Music size={32} />
                <p className="font-montserrat text-sm tracking-[0.3em] uppercase font-bold text-[#F3E5AB]">
                  MUSICAL EVENING
                </p>
                <Music size={32} />
              </div>

              <div style={blurFloatStyle(lt, 0.9, 0.6)}>
                <h2 className="font-hindi-royal text-6xl text-[#F8E7B4] font-bold tracking-wide mt-2 drop-shadow-xl">
                  संगीत एवं स्नेह मिलन
                </h2>
                <p className="font-playfair text-xl text-[#E5C77A] tracking-wider uppercase font-semibold mt-1">
                  SANGEET &amp; CELEBRATION
                </p>
              </div>

              <div className="w-32 h-[2px] bg-amber-400/40 my-6" />

              <p
                className="font-hindi text-2xl text-[#E0D5C1] leading-relaxed max-w-xl"
                style={blurFloatStyle(lt, 1.3, 0.6)}
              >
                पारिवारिक उल्लास, गीतों की मधुर धुन और खुशियों से सजी एक अविस्मरणीय सुरमयी शाम।
              </p>

              <div
                className="mt-8 p-8 rounded-2xl bg-white/10 border-2 border-amber-400/30 w-full shadow-inner flex flex-col items-center gap-2"
                style={blurFloatStyle(lt, 1.7, 0.7)}
              >
                <div className="flex items-center gap-3 text-[#FFE082]">
                  <Calendar className="w-8 h-8 text-[#D4AF37]" />
                  <span className="font-hindi text-4xl font-black">28 नवंबर 2026</span>
                </div>
                <p className="font-hindi text-2xl text-[#F3E5AB] font-bold mt-1">
                  सायं काल (Evening) • रंगारंग प्रस्तुतियां एवं प्रीतिभोज
                </p>
                <p className="font-hindi text-xl text-[#C5A059] mt-0.5">
                  स्थान: निज निवास प्रांगण, आजमगढ़
                </p>
              </div>

              <div className="text-amber-400/70 tracking-widest text-xl mt-6">✦ ✦ ✦</div>
            </div>

            <div className="h-6" />
          </div>
        );
      })()}

      {/* ================================================================
          SCENE 6: HALDI UTSAV (27.0s - 32.4s)
         ================================================================ */}
      {t >= 27.0 && t <= 32.6 && (() => {
        const lt = t - 27.0;
        const alpha = sceneAlpha(27.0, 0.65, 31.7, 0.7);
        const riseP = easeOutBack(prog(lt, 0.1, 0.9));
        const kbScale = 1.03 + (lt / 5.5) * 0.1;

        return (
          <div
            className="absolute inset-0 flex flex-col items-center justify-between py-24 px-16 text-center"
            style={{ opacity: alpha, zIndex: 20, perspective: '1400px' }}
          >
            <img
              src="/images/haldi_courtyard_bg.jpg"
              alt="Haldi Courtyard"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ transform: `scale(${kbScale})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/85" />

            <div
              className="relative z-20 w-full max-w-4xl origin-top"
              style={{ transform: `scale(1.1) rotate(${garlandSway}deg)` }}
            >
              <MarigoldGarland />
            </div>

            <div
              className="relative z-10 flex flex-col items-center bg-[#FFFEF5]/95 backdrop-blur-md p-14 rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.9)] border-2 border-amber-400/80 w-full max-w-[820px] my-auto"
              style={{
                transform: `translate3d(0, ${(1 - riseP) * 110 + Math.sin(lt * 2) * 5}px, 0) rotateZ(${(1 - riseP) * -2.5}deg) scale(${0.92 + 0.08 * riseP})`,
              }}
            >
              <div
                className="flex items-center gap-2 px-6 py-1.5 rounded-full bg-black/80 text-white text-sm font-montserrat font-bold uppercase mb-4 border border-white/20"
                style={blurFloatStyle(lt, 0.45, 0.5)}
              >
                <span className="w-3.5 h-3.5 rounded-full bg-[#F5B000]" />
                <span>WEAR YELLOW / पीताम्बरी • पीत वस्त्र</span>
              </div>

              <div style={blurFloatStyle(lt, 0.75, 0.6)}>
                <p className="font-montserrat text-sm tracking-[0.3em] uppercase text-[#C06A17] font-bold">
                  ॥ हल्दी एवं मंडपाच्छादन ॥
                </p>
                <h2 className="font-hindi-royal text-6xl text-[#C06A17] font-bold mt-2 drop-shadow">
                  हल्दी उत्सव
                </h2>
                <p className="font-playfair text-xl text-[#B38728] uppercase tracking-wider font-semibold mt-1">
                  HALDI &amp; MATRIKA PUJAN
                </p>
              </div>

              <div className="w-32 h-[2px] bg-amber-400/50 my-6" />

              <p
                className="font-hindi text-2xl text-[#5C4228] leading-relaxed max-w-xl font-medium"
                style={blurFloatStyle(lt, 1.1, 0.6)}
              >
                पीले गेंदे के फूलों की महक और उबटन के मंगल लेप से सुशोभित वर-वधू का पावन हल्दी संस्कार।
              </p>

              <div
                className="mt-8 p-8 rounded-2xl bg-amber-100/90 border-2 border-amber-300/80 w-full shadow-inner flex flex-col items-center gap-2"
                style={blurFloatStyle(lt, 1.5, 0.7)}
              >
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

              <div className="text-amber-800/60 tracking-widest text-xl mt-6">✦ ✦ ✦</div>
            </div>

            <div className="h-6" />
          </div>
        );
      })()}

      {/* ================================================================
          SCENE 7: SHUBH VIVAH & ROYAL BARAT (31.8s - 38.2s)
         ================================================================ */}
      {t >= 31.8 && t <= 38.4 && (() => {
        const lt = t - 31.8;
        const alpha = sceneAlpha(31.8, 0.7, 37.5, 0.7);
        const enterP = easeOutCubic(prog(lt, 0.15, 0.85));
        const kbScale = 1.03 + (lt / 6.5) * 0.1;

        return (
          <div
            className="absolute inset-0 flex flex-col items-center justify-between py-24 px-16 text-center"
            style={{ opacity: alpha, zIndex: 22 }}
          >
            <img
              src="/images/wedding_royal_mandap_clean.jpg"
              alt="Royal Wedding Mandap"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ transform: `scale(${kbScale})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/45 to-black/90" />

            <div
              className="relative z-20 w-full max-w-4xl origin-top"
              style={{ transform: `scale(1.1) rotate(${garlandSway}deg)` }}
            >
              <MarigoldGarland />
            </div>

            <div
              className="relative z-10 flex flex-col items-center bg-[#FFFDF7]/95 backdrop-blur-md p-14 rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.95)] border-2 border-[#D4AF37]/90 w-full max-w-[820px] my-auto"
              style={{
                transform: `scale(${0.86 + 0.14 * enterP}) translateY(${Math.sin(lt * 1.8) * 5}px)`,
              }}
            >
              <div
                className="flex items-center gap-2 px-6 py-1.5 rounded-full bg-black/80 text-white text-sm font-montserrat font-bold uppercase mb-4 border border-white/20"
                style={blurFloatStyle(lt, 0.45, 0.5)}
              >
                <span className="w-3.5 h-3.5 rounded-full bg-[#801420]" />
                <span>ROYAL RED &amp; GOLD • शाही परिधान</span>
              </div>

              <div style={blurFloatStyle(lt, 0.7, 0.6)}>
                <p className="font-montserrat text-sm tracking-[0.3em] uppercase text-[#801420] font-bold">
                  ॥ पाणिग्रहण संस्कार ॥
                </p>
                <h2 className="font-hindi-royal text-6xl text-[#801420] font-bold mt-2 drop-shadow">
                  शुभ विवाह एवं बारात
                </h2>
                <p className="font-playfair text-xl text-[#B38728] uppercase tracking-wider font-semibold mt-1">
                  SHUBH VIVAH &amp; ROYAL BARAT
                </p>
              </div>

              <div className="w-32 h-[2px] bg-[#D4AF37]/50 my-6" />

              <div className="flex flex-col items-center gap-6 w-full">
                <div
                  className="p-6 rounded-2xl bg-rose-50/90 border-2 border-rose-200/90 w-full shadow-inner"
                  style={slideSideStyle(lt, 1.1, -80, 0.7)}
                >
                  <p className="font-hindi text-3xl text-[#801420] font-black">
                    शुभ बारात प्रस्थान: 9 दिसंबर 2026
                  </p>
                  <p className="font-hindi text-2xl text-[#4A382A] font-bold mt-2">
                    सायं 5:00 बजे (निज निवास पठखौली, शिवली राशिद गंज से)
                  </p>
                </div>

                <div
                  className="p-6 rounded-2xl bg-rose-50/90 border-2 border-rose-200/90 w-full shadow-inner"
                  style={slideSideStyle(lt, 1.6, 80, 0.7)}
                >
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

              <div className="text-amber-800/60 tracking-widest text-xl mt-6">✦ ✦ ✦</div>
            </div>

            <div className="h-6" />
          </div>
        );
      })()}

      {/* ================================================================
          SCENE 8: BAL AAGRAH & FAMILY BLESSINGS (37.6s - 43.0s)
         ================================================================ */}
      {t >= 37.6 && t <= 43.2 && (() => {
        const lt = t - 37.6;
        const alpha = sceneAlpha(37.6, 0.65, 42.3, 0.7);

        return (
          <div
            className="absolute inset-0 flex flex-col items-center justify-between py-24 px-16 text-center bg-gradient-to-b from-[#2B050D] via-[#3B0712] to-[#1C0206]"
            style={{ opacity: alpha, zIndex: 24 }}
          >
            <div
              className="relative z-20 w-full max-w-4xl origin-top"
              style={{ transform: `scale(1.1) rotate(${garlandSway}deg)` }}
            >
              <MarigoldGarland />
            </div>

            <div className="relative z-10 flex flex-col items-center w-full max-w-[820px] my-auto gap-8">
              {/* Bal Aagrah Card */}
              <div
                className="w-full p-10 rounded-3xl bg-gradient-to-br from-[#FFFDF8] via-[#FAF3DE] to-[#F5E6CA] border-2 border-[#D4AF37] shadow-[0_25px_60px_rgba(0,0,0,0.85)] flex flex-col items-center"
                style={slideSideStyle(lt, 0.3, -70, 0.75)}
              >
                <div className="flex items-center gap-2 text-[#801420] mb-2">
                  <Sparkles size={28} className="text-amber-600" style={{ transform: `rotate(${lt * 60}deg)` }} />
                  <span className="font-hindi-royal text-3xl font-bold tracking-wide">
                    ॥ बाल आग्रह ॥
                  </span>
                  <Sparkles size={28} className="text-amber-600" style={{ transform: `rotate(${-lt * 60}deg)` }} />
                </div>
                <p className="font-hindi text-2xl text-[#801420] font-bold italic leading-relaxed max-w-xl whitespace-pre-line my-3">
                  “हल्दी है, मेहंदी है, और खुशियों की बहार है,{'\n'}मेरे मामू की शादी में आपका इंतजार है।”
                </p>
                <div className="mt-3 px-8 py-2 rounded-full bg-amber-100 border border-amber-300">
                  <p className="font-hindi text-2xl text-[#3E2510] font-bold">
                    स्नेही बच्चे: <span className="text-[#801420] font-black">शिव्या, पिहू, दिवेश</span>
                  </p>
                </div>
              </div>

              {/* Family Card */}
              <div
                className="w-full p-8 rounded-3xl bg-black/75 backdrop-blur-md border border-[#D4AF37]/50 shadow-2xl flex flex-col items-center gap-4 text-white"
                style={slideSideStyle(lt, 0.9, 70, 0.75)}
              >
                <div className="text-center" style={blurFloatStyle(lt, 1.3, 0.5)}>
                  <p className="font-hindi text-xl font-bold text-[#D4AF37]">
                    ॥ स्वागताकांक्षी / पूज्य चाचा जी ॥
                  </p>
                  <p className="font-hindi text-3xl font-bold text-[#F8E7B4] mt-1">
                    सुबेदार, श्रीचंद्र, श्रीराम
                  </p>
                </div>

                <div className="w-40 h-[1.5px] bg-[#D4AF37]/40" />

                <div className="text-center" style={blurFloatStyle(lt, 1.7, 0.5)}>
                  <p className="font-hindi text-xl font-bold text-[#D4AF37]">
                    ॥ दर्शनाभिलाषी / भ्रातृवृन्द ॥
                  </p>
                  <p className="font-hindi text-2xl text-[#E5D0A5] font-semibold leading-relaxed mt-1 max-w-xl">
                    चन्द्रभान, उदयभान, संदीप, <span className="text-[#FFE599] font-bold">सदेश</span>, नितेश, रवि, नितिन, अंशु, अमन, आकाश, आदित्य, अर्पित
                  </p>
                </div>

                <div className="w-40 h-[1.5px] bg-[#D4AF37]/40" />

                <div className="text-center" style={blurFloatStyle(lt, 2.1, 0.5)}>
                  <p className="font-hindi text-xl font-bold text-[#D4AF37]">॥ विनीत ॥</p>
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
        );
      })()}

      {/* ================================================================
          SCENE 9: CLOSING BLESSING & DESIGNER CREDITS (42.4s - 47.0s)
         ================================================================ */}
      {t >= 42.4 && (() => {
        const lt = t - 42.4;
        const alpha = easeInOutCubic(prog(lt, 0, 0.7));

        return (
          <div
            className="absolute inset-0 flex flex-col items-center justify-between py-24 px-16 text-center bg-gradient-to-b from-[#200307] via-[#3B0712] to-[#120104] text-white"
            style={{ opacity: alpha, zIndex: 26 }}
          >
            <div
              className="relative z-20 w-full max-w-4xl origin-top"
              style={{ transform: `scale(1.1) rotate(${garlandSway}deg)` }}
            >
              <MarigoldGarland />
            </div>

            <div className="relative z-10 flex flex-col items-center my-auto w-full max-w-[800px] gap-8">
              <div style={blurFloatStyle(lt, 0.3, 0.6)}>
                <GaneshaIcon className="w-24 h-24 text-[#D4AF37] drop-shadow-lg mx-auto" />
              </div>

              <h2
                className="font-hindi-royal text-6xl text-[#F8E7B4] font-bold drop-shadow"
                style={blurFloatStyle(lt, 0.6, 0.6)}
              >
                ॥ मांगलिक परिणय उत्सव ॥
              </h2>

              <p
                className="font-hindi text-4xl text-[#FFE599] font-black"
                style={blurFloatStyle(lt, 0.9, 0.6)}
              >
                राकेश यादव &nbsp;♥&nbsp; पूजा यादव
              </p>

              <p
                className="font-hindi text-2xl text-[#C5A059] max-w-lg font-medium leading-relaxed"
                style={blurFloatStyle(lt, 1.2, 0.6)}
              >
                आपकी गरिमामयी उपस्थिति एवं पावन शुभाशीर्वाद हमारे लिए परम सौभाग्य होगी।
              </p>

              <div className="w-48 h-[2px] bg-[#D4AF37]/50 my-2" />

              {/* DESIGNED & CRAFTED BY SADESH */}
              <div
                className="px-10 py-5 rounded-full bg-gradient-to-r from-amber-500/20 via-amber-400/30 to-amber-500/20 border-2 border-[#D4AF37] shadow-[0_0_35px_rgba(212,175,55,0.4)] flex items-center justify-center gap-4"
                style={blurFloatStyle(lt, 1.5, 0.7)}
              >
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

              <p
                className="font-montserrat text-sm uppercase tracking-widest text-[#A67C52]"
                style={blurFloatStyle(lt, 1.9, 0.5)}
              >
                Azamgarh, Uttar Pradesh
              </p>
            </div>

            <div className="h-6" />
          </div>
        );
      })()}

      {/* Deterministic Sparkles & Petals Layer */}
      <ParticleCanvas time={t} />
    </div>
  );
}
