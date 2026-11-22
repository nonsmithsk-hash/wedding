'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { Sparkles } from 'lucide-react';

interface DoorOpeningProps {
  onDoorOpened: () => void;
}

export default function DoorOpening({ onDoorOpened }: DoorOpeningProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftDoorRef = useRef<HTMLDivElement | null>(null);
  const rightDoorRef = useRef<HTMLDivElement | null>(null);
  const lightRayRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDoors = () => {
    if (isOpen) return;
    setIsOpen(true);

    const tl = gsap.timeline({
      onComplete: () => {
        onDoorOpened();
      },
    });

    // Hide the button & title
    tl.to([buttonRef.current, titleRef.current], {
      opacity: 0,
      scale: 0.85,
      duration: 0.4,
      ease: 'power2.in',
    });

    // Light ray burst
    tl.to(
      lightRayRef.current,
      {
        opacity: 1,
        scale: 1.6,
        duration: 1.2,
        ease: 'power2.out',
      },
      '-=0.2'
    );

    // 3D Swing open left and right doors
    tl.to(
      leftDoorRef.current,
      {
        rotateY: -115,
        duration: 1.8,
        ease: 'power3.inOut',
      },
      '-=1.0'
    );

    tl.to(
      rightDoorRef.current,
      {
        rotateY: 115,
        duration: 1.8,
        ease: 'power3.inOut',
      },
      '<'
    );

    // Fade out door container to reveal invitation
    tl.to(
      containerRef.current,
      {
        opacity: 0,
        scale: 1.05,
        duration: 1.0,
        ease: 'power2.inOut',
        pointerEvents: 'none',
      },
      '-=0.4'
    );
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-40 flex items-center justify-center bg-[#0d0907] overflow-hidden"
    >
      {/* Background Court behind the doors */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full max-w-[480px] h-[92vh] max-h-[850px] overflow-hidden rounded-2xl shadow-2xl">
          <Image
            src="/images/bg_main_arch.jpg"
            alt="Courtyard"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Sun Ray Light Burst */}
      <div
        ref={lightRayRef}
        className="absolute inset-0 pointer-events-none opacity-0 flex items-center justify-center z-10"
      >
        <div className="w-[600px] h-[600px] rounded-full bg-gradient-radial from-amber-100 via-amber-300/60 to-transparent blur-2xl" />
      </div>

      {/* Main Arch Frame Container */}
      <div className="relative w-full max-w-[480px] h-[92vh] max-h-[850px] rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.9)] z-20">
        {/* Stone Arch & Courtyard Surround */}
        <div className="absolute inset-0">
          <Image
            src="/images/door_closed.jpg"
            alt="Royal Entrance Arch"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Top Header Badge */}
        <div
          ref={titleRef}
          className="absolute top-8 inset-x-0 flex flex-col items-center justify-center z-30 px-4 text-center pointer-events-none"
        >
          <div className="bg-black/60 backdrop-blur-md px-5 py-2 rounded-full border border-amber-400/40 shadow-xl">
            <p className="font-hindi-royal text-sm text-[#F8E7B4] tracking-wider">
              ॥ श्री गणेशाय नमः ॥
            </p>
            <p className="font-serif text-[11px] tracking-[0.25em] text-[#D4AF37] uppercase font-bold mt-0.5">
              राकेश संग पूजा
            </p>
          </div>
        </div>

        {/* 3D Doors Layer (Centered inside the stone frame) */}
        <div className="absolute top-[19.6%] left-[21.2%] w-[57.6%] h-[51.4%] perspective-1000 transform-style-3d z-30">
          {/* Left Door Leaf */}
          <div
            ref={leftDoorRef}
            className="absolute top-0 left-0 w-1/2 h-full origin-left transform-style-3d shadow-[-10px_0_20px_rgba(0,0,0,0.6)]"
          >
            <Image
              src="/images/door_left.png"
              alt="Left Door"
              fill
              className="object-fill"
              priority
            />
          </div>

          {/* Right Door Leaf */}
          <div
            ref={rightDoorRef}
            className="absolute top-0 right-0 w-1/2 h-full origin-right transform-style-3d shadow-[10px_0_20px_rgba(0,0,0,0.6)]"
          >
            <Image
              src="/images/door_right.png"
              alt="Right Door"
              fill
              className="object-fill"
              priority
            />
          </div>
        </div>

        {/* Enter Invitation Button & Prompt */}
        <div className="absolute bottom-10 inset-x-0 flex flex-col items-center justify-center z-40 px-6">
          <button
            ref={buttonRef}
            onClick={handleOpenDoors}
            className="group relative flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#997E24] via-[#D4AF37] to-[#997E24] p-[1px] shadow-[0_0_35px_rgba(212,175,55,0.4)] hover:shadow-[0_0_45px_rgba(212,175,55,0.7)] transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#18110e]/90 group-hover:bg-[#18110e]/75 transition-colors">
              <Sparkles className="w-4 h-4 text-[#F8E7B4] animate-pulse" />
              <span className="font-hindi text-sm tracking-wider text-[#F8E7B4] font-bold">
                निमंत्रण पत्र खोलें (Tap to Open)
              </span>
            </div>
          </button>
          <p className="mt-3 text-xs tracking-widest text-[#F8E7B4]/80 font-hindi">
            (शहनाई वादन के साथ)
          </p>
        </div>
      </div>
    </div>
  );
}
