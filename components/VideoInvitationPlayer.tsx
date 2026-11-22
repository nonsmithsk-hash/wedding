'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Download, Film, Sparkles } from 'lucide-react';

export default function VideoInvitationPlayer() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [showControls, setShowControls] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      videoRef.current.requestFullscreen().catch(() => {});
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 88;
    setProgress((curr / dur) * 100);

    const mins = Math.floor(curr / 60);
    const secs = Math.floor(curr % 60);
    setCurrentTime(`${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const dur = videoRef.current.duration || 88;
    videoRef.current.currentTime = pos * dur;
  };

  return (
    <div className="relative w-full max-w-sm sm:max-w-md mx-auto my-12 px-4 flex flex-col items-center z-20">
      {/* Header Badge */}
      <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-amber-950/80 via-black/90 to-amber-950/80 border border-amber-400/50 shadow-xl mb-4 backdrop-blur-md">
        <Film className="w-4 h-4 text-[#D4AF37]" />
        <span className="font-hindi text-sm tracking-wider font-bold text-[#F8E7B4]">
          डिजिटल वीडियो निमंत्रण (1:28 HD)
        </span>
        <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
      </div>

      {/* Luxury Golden Phone Frame for 9:16 Portrait Video */}
      <div
        className="relative w-full aspect-[9/16] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.25)] border-2 border-amber-400/60 bg-black group"
        onMouseEnter={() => setShowControls(true)}
      >
        <video
          ref={videoRef}
          src="/video/rakesh_pooja_wedding.mp4"
          playsInline
          loop
          className="w-full h-full object-cover cursor-pointer"
          onClick={togglePlay}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        />

        {/* Big Center Play Button Overlay (when paused) */}
        {!isPlaying && (
          <div
            onClick={togglePlay}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer transition-opacity z-20"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8C6228] p-[2px] shadow-[0_0_30px_rgba(212,175,55,0.8)] hover:scale-105 transition-transform flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#1c120c] flex items-center justify-center pl-1">
                <Play className="w-9 h-9 text-[#F8E7B4] fill-[#F8E7B4]" />
              </div>
            </div>
            <p className="mt-4 font-hindi text-base text-[#F8E7B4] font-bold tracking-wide drop-shadow-md">
              वीडियो निमंत्रण चलाएं
            </p>
            <p className="text-xs text-amber-300/80 font-sans tracking-widest mt-0.5">
              CLICK TO PLAY (1:28 WITH SHEHNAI)
            </p>
          </div>
        )}

        {/* Bottom Control Bar */}
        <div
          className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 flex flex-col gap-2.5 z-30 transition-opacity duration-300 ${
            showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Progress Timeline */}
          <div
            onClick={handleSeek}
            className="relative w-full h-1.5 bg-white/20 rounded-full cursor-pointer overflow-hidden hover:h-2 transition-all"
          >
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-500 to-[#F8E7B4] rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-white text-xs">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="p-1 text-[#F8E7B4] hover:text-white transition-colors"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
              </button>

              <button
                onClick={toggleMute}
                className="p-1 text-[#F8E7B4] hover:text-white transition-colors"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>

              <span className="font-mono text-[11px] text-[#C5A059]">
                {currentTime} / 01:28
              </span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="/video/rakesh_pooja_wedding.mp4"
                download="Rakesh_Pooja_Wedding_Invitation.mp4"
                className="p-1 text-[#F8E7B4] hover:text-white transition-colors flex items-center gap-1"
                title="Download MP4 Video"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline text-[10px] uppercase font-bold tracking-wider">Save</span>
              </a>

              <button
                onClick={toggleFullscreen}
                className="p-1 text-[#F8E7B4] hover:text-white transition-colors"
                aria-label="Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Direct Download Button Below Phone Frame */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <a
          href="/video/rakesh_pooja_wedding.mp4"
          download="Rakesh_Pooja_Wedding_Invitation.mp4"
          className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 text-stone-950 font-hindi font-bold text-sm shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:brightness-110 active:scale-95 transition-all"
        >
          <Download className="w-4 h-4" />
          <span>वीडियो डाउनलोड करें (Download MP4)</span>
        </a>
      </div>
    </div>
  );
}
