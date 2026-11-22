'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, X, Maximize2, Film } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc?: string;
}

export default function VideoModal({
  isOpen,
  onClose,
  videoSrc = '/video/rakesh_pooja_wedding.mp4',
}: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else if (!isOpen && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 1;
    setProgress((curr / dur) * 100);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * (videoRef.current.duration || 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all shadow-xl"
        aria-label="Close Video"
      >
        <X size={22} />
      </button>

      <div className="relative w-full max-w-sm sm:max-w-md aspect-[9/16] rounded-3xl overflow-hidden border-2 border-amber-400/50 shadow-[0_0_50px_rgba(212,175,55,0.4)] bg-black flex flex-col justify-between">
        <video
          ref={videoRef}
          src={videoSrc}
          playsInline
          loop
          className="w-full h-full object-cover cursor-pointer"
          onClick={togglePlay}
          onTimeUpdate={handleTimeUpdate}
        />

        {/* Center Play Button Overlay when paused */}
        {!isPlaying && (
          <div
            onClick={togglePlay}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer"
          >
            <div className="w-16 h-16 rounded-full bg-amber-500/90 text-stone-950 flex items-center justify-center pl-1 shadow-lg hover:scale-105 transition-all">
              <Play size={28} fill="currentColor" />
            </div>
            <p className="mt-3 text-sm font-hindi text-white font-bold drop-shadow">
              वीडियो चलाएं
            </p>
          </div>
        )}

        {/* Controls Overlay */}
        <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black via-black/70 to-transparent flex flex-col gap-2">
          {/* Progress Bar */}
          <div
            onClick={handleSeek}
            className="w-full h-1.5 bg-white/25 rounded-full cursor-pointer relative overflow-hidden"
          >
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-200"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-white text-xs pt-1">
            <div className="flex items-center gap-2">
              <button onClick={togglePlay} className="p-1 hover:text-amber-300">
                {isPlaying ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
              </button>
              <button onClick={toggleMute} className="p-1 hover:text-amber-300">
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </div>
            <span className="text-[11px] font-hindi text-amber-200">
              डिजिटल वीडियो निमंत्रण
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
