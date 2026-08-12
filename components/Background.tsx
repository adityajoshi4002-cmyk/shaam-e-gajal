"use client";

import { useState, useEffect, useRef } from "react";
import { Song } from "@/types/song";

interface BackgroundProps {
  song: Song | null;
}

export default function Background({ song }: BackgroundProps) {
  const [currentBg, setCurrentBg] = useState<string>(
    "/images/shaam-e-gajal.png"
  );
  const [nextBg, setNextBg] = useState<string | null>(null);
  const [isFading, setIsFading] = useState(false);
  const prevSongId = useRef<string | null>(null);

  useEffect(() => {
    if (!song) return;
    if (song.id === prevSongId.current) return;

    const newBg = song.backgroundImage;
    if (newBg === currentBg) {
      prevSongId.current = song.id;
      return;
    }

    // Start crossfade
    setNextBg(newBg);
    setIsFading(true);

    const timeout = setTimeout(() => {
      setCurrentBg(newBg);
      setNextBg(null);
      setIsFading(false);
      prevSongId.current = song.id;
    }, 1200);

    return () => clearTimeout(timeout);
  }, [song, currentBg]);

  return (
    <div className="fixed inset-0 -z-10">
      {/* Current background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-[1200ms]"
        style={{
          backgroundImage: `url(${currentBg})`,
          opacity: isFading ? 0 : 1,
        }}
      />

      {/* Next background fading in */}
      {nextBg && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-[1200ms]"
          style={{
            backgroundImage: `url(${nextBg})`,
            opacity: isFading ? 1 : 0,
          }}
        />
      )}

      {/* Gradient overlay — keeps UI readable without smothering the art */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,5,3,0.55) 0%, rgba(10,5,3,0.2) 40%, rgba(10,5,3,0.3) 65%, rgba(10,5,3,0.72) 100%)",
        }}
      />

      {/* Subtle vintage vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(5,2,1,0.45) 100%)",
        }}
      />
    </div>
  );
}
