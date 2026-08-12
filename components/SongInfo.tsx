"use client";

import { Song } from "@/types/song";
import Image from "next/image";
import { useState, useEffect } from "react";

interface SongInfoProps {
  song: Song | null;
  isTransitioning: boolean;
}

export default function SongInfo({ song, isTransitioning }: SongInfoProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (isTransitioning) {
      setVisible(false);
      const t = setTimeout(() => setVisible(true), 350);
      return () => clearTimeout(t);
    }
  }, [isTransitioning, song]);

  if (!song) return null;

  return (
    <div
      className="flex items-center gap-3 min-w-0 flex-1"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(4px)",
        transition: "opacity 350ms ease, transform 350ms ease",
      }}
    >
      {/* Circular album artwork */}
      <div className="relative flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden ring-2 ring-white/20 shadow-lg">
        <Image
          src={song.artworkUrl}
          alt={`${song.title} artwork`}
          fill
          className="object-cover"
          sizes="56px"
          priority
        />
      </div>

      {/* Title + singer */}
      <div className="min-w-0">
        <p
          className="text-white font-semibold text-sm sm:text-base leading-tight truncate"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {song.title}
        </p>
        <p
          className="text-white/60 text-xs sm:text-sm leading-tight truncate mt-0.5"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {song.singer}
        </p>
      </div>
    </div>
  );
}
