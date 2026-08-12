"use client";

import {
  SkipBack,
  Play,
  Pause,
  SkipForward,
} from "lucide-react";

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
    <div
      className="
        flex
        shrink-0
        items-center
        gap-2
        px-2
        sm:gap-3
        sm:px-3
        md:px-4
      "
    >
      {/* Previous */}
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous song"
        id="btn-prev"
        className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-full
          p-2
          text-white/75
          transition-all
          duration-200
          hover:scale-110
          hover:bg-white/10
          hover:text-white
          active:scale-95
          sm:h-10
          sm:w-10
        "
      >
        <SkipBack
          size={17}
          strokeWidth={2.2}
          fill="currentColor"
        />
      </button>

      {/* Play / Pause */}
      <button
        type="button"
        onClick={isPlaying ? onPause : onPlay}
        aria-label={isPlaying ? "Pause" : "Play"}
        id="btn-play-pause"
        className="
          relative
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-white
          text-[#1a0803]
          shadow-md
          transition-all
          duration-200
          hover:scale-105
          hover:bg-white/90
          active:scale-95
          sm:h-12
          sm:w-12
        "
      >
        {isPlaying ? (
          <Pause
            size={18}
            strokeWidth={3}
            fill="currentColor"
          />
        ) : (
          <Play
            size={18}
            strokeWidth={3}
            fill="currentColor"
            className="ml-0.5"
          />
        )}
      </button>

      {/* Next */}
      <button
        type="button"
        onClick={onNext}
        aria-label="Next song"
        id="btn-next"
        className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-full
          p-2
          text-white/75
          transition-all
          duration-200
          hover:scale-110
          hover:bg-white/10
          hover:text-white
          active:scale-95
          sm:h-10
          sm:w-10
        "
      >
        <SkipForward
          size={17}
          strokeWidth={2.2}
          fill="currentColor"
        />
      </button>
    </div>
  );
}