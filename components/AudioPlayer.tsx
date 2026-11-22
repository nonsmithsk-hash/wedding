'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Play, Pause } from 'lucide-react';

interface AudioPlayerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  audioSrc?: string;
}

export default function AudioPlayer({
  isPlaying,
  onTogglePlay,
  audioSrc = '/audio/wedding_theme.mp3',
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set gentle, low ambient volume (20%) so it does not overpower or startle the user
    audio.volume = 0.20;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Autoplay waiting for direct user gesture:', err.message);
        });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      const newMuted = !isMuted;
      audioRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        preload="auto"
        onCanPlay={() => setAudioLoaded(true)}
      />

      {/* Floating Audio Controller */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-2 select-none">
        <button
          onClick={onTogglePlay}
          className="group relative flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/75 hover:bg-black/90 backdrop-blur-md border border-[#D4AF37]/50 shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:border-[#D4AF37] transition-all duration-300"
          title={isPlaying ? 'Pause Music' : 'Play Music'}
          aria-label="Toggle Background Music"
        >
          {/* Animated sound wave bars */}
          <div className="flex items-end gap-[3px] h-3.5 w-3.5 sm:h-4 sm:w-4">
            <span
              className={`w-[2px] sm:w-[2.5px] bg-gradient-to-t from-amber-600 to-[#F8E7B4] rounded-full transition-all duration-200 ${
                isPlaying && !isMuted ? 'sound-bar-1' : 'h-1'
              }`}
            />
            <span
              className={`w-[2px] sm:w-[2.5px] bg-gradient-to-t from-amber-600 to-[#F8E7B4] rounded-full transition-all duration-200 ${
                isPlaying && !isMuted ? 'sound-bar-2' : 'h-2'
              }`}
            />
            <span
              className={`w-[2px] sm:w-[2.5px] bg-gradient-to-t from-amber-600 to-[#F8E7B4] rounded-full transition-all duration-200 ${
                isPlaying && !isMuted ? 'sound-bar-3' : 'h-1.5'
              }`}
            />
            <span
              className={`w-[2px] sm:w-[2.5px] bg-gradient-to-t from-amber-600 to-[#F8E7B4] rounded-full transition-all duration-200 ${
                isPlaying && !isMuted ? 'sound-bar-4' : 'h-2.5'
              }`}
            />
          </div>

          <span className="text-[11px] sm:text-xs tracking-wider text-[#F8E7B4] font-medium hidden xs:inline-block">
            {isPlaying ? 'Shehnai • संगीत' : 'Play Music'}
          </span>

          <span className="relative flex h-2 w-2">
            {isPlaying && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            )}
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                isPlaying ? 'bg-amber-400' : 'bg-stone-500'
              }`}
            />
          </span>
        </button>

        {/* Quick Mute Toggle */}
        {isPlaying && (
          <button
            onClick={toggleMute}
            className="p-1.5 sm:p-2 rounded-full bg-black/75 hover:bg-black/90 backdrop-blur-md border border-[#D4AF37]/50 text-[#F8E7B4] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all shadow-md"
            title={isMuted ? 'Unmute' : 'Mute'}
            aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
        )}
      </div>
    </>
  );
}
