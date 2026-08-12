"use client";

import { useCallback, useState } from "react";
import Background from "@/components/Background";
import TopBar from "@/components/TopBar";
import GhazalPlayer from "@/components/GhazalPlayer";
import { Song } from "@/types/song";

export default function Home() {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  const handleSongChange = useCallback((song: Song) => {
    setCurrentSong(song);
  }, []);

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-black select-none">
      {/* =====================================================
          BACKGROUND
      ====================================================== */}
      <div className="absolute inset-0 z-0">
        <Background song={currentSong} />
      </div>

      {/* =====================================================
          TOP UTILITY BAR
      ====================================================== */}
      <div
        className="
          absolute
          inset-x-0
          top-0
          z-30
          px-4
          pt-[max(14px,env(safe-area-inset-top))]
          sm:px-6
          lg:px-8
        "
      >
        <TopBar currentSong={currentSong} />
      </div>

      {/* =====================================================
          CENTER TITLE
      ====================================================== */}
      <section
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-[40%]
          z-10
          flex
          -translate-y-1/2
          justify-center
          px-5
          sm:px-8
        "
      >
        <div className="w-full max-w-5xl text-center">
          <h1
            className="
              text-white
              leading-[0.95]
              drop-shadow-2xl
            "
            style={{
              fontFamily: "'Noto Serif Devanagari', serif",
              fontSize: "clamp(3rem, 8vw, 6.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              textShadow: `
                0 3px 25px rgba(0,0,0,0.65),
                0 0 70px rgba(0,0,0,0.35)
              `,
            }}
          >
            शाम-ए-ग़ज़ल
          </h1>

          <p
            className="
              mt-3
              text-[10px]
              font-medium
              uppercase
              tracking-[0.35em]
              text-white/60
              sm:mt-4
              sm:text-xs
              sm:tracking-[0.4em]
            "
            style={{
              fontFamily: "var(--font-inter)",
            }}
          >
            A quiet mehfil
          </p>
        </div>
      </section>

      {/* =====================================================
          FLOATING PLAYER
      ====================================================== */}
      <section
        className="
          absolute
          inset-x-0
          bottom-[30%]
          z-30
          flex
          translate-y-1/2
          justify-center
          px-4
          sm:px-6
        "
      >
        <div className="w-full max-w-[760px]">
          <GhazalPlayer onSongChange={handleSongChange} />
        </div>
      </section>

      {/* =====================================================
          SOFT VIGNETTE
      ====================================================== */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-20
          bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.12)_100%)]
        "
      />

      {/* =====================================================
          BOTTOM READABILITY GRADIENT
      ====================================================== */}
      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-20
          h-40
          bg-gradient-to-t
          from-black/30
          via-black/5
          to-transparent
        "
      />

      {/* =====================================================
          CREDIT
      ====================================================== */}
      <div
        className="
          absolute
          bottom-3
          left-0
          right-0
          z-40
          flex
          justify-center
          px-4
          pb-[env(safe-area-inset-bottom)]
          sm:bottom-4
        "
      >
        <p
          className="
            text-center
            text-[10px]
            tracking-[0.08em]
            text-white/45
            sm:text-xs
          "
          style={{
            fontFamily: "var(--font-inter)",
          }}
        >
          - Made by{" "}
          <a
            href="https://adidev-six.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="
              text-white/70
              underline-offset-4
              transition-colors
              duration-200
              hover:text-white
              hover:underline
            "
          >
            AJ -
          </a>
        </p>
      </div>
    </main>
  );
}