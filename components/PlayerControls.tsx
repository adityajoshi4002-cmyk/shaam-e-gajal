"use client";

import { SkipBack, Play, Pause, SkipForward } from "lucide-react";

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function PlayerControls({
  isPlaying,
  onPlay,
  onPause,
  onPrev,
  onNext,
}: PlayerControlsProps) {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
      {/* Previous */}
      <button
        onClick={onPrev}
        aria-label="Previous song"
        id="btn-prev"
        className="text-white/80 hover:text-white transition-all duration-200 hover:scale-110 active:scale-95 p-1"
      >
        <SkipBack size={16} strokeWidth={2.2} fill="currentColor" />
      </button>

      {/* Play / Pause — White Circle CTA */}
      <button
        onClick={isPlaying ? onPause : onPlay}
        aria-label={isPlaying ? "Pause" : "Play"}
        id="btn-play-pause"
        className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-white/90 text-[#1a0803] shadow-md transition-all duration-200 hover:scale-105 active:scale-95 shrink-0"
      >
        {isPlaying ? (
          <Pause size={18} strokeWidth={3} fill="currentColor" />
        ) : (
          <Play size={18} strokeWidth={3} fill="currentColor" className="ml-0.5" />
        )}
      </button>

      {/* Next */}
      <button
        onClick={onNext}
        aria-label="Next song"
        id="btn-next"
        className="text-white/80 hover:text-white transition-all duration-200 hover:scale-110 active:scale-95 p-1"
      >
        <SkipForward size={16} strokeWidth={2.2} fill="currentColor" />
      </button>
    </div>
  );
}
