"use client";

import { songs } from "@/data/songs";
import { Song } from "@/types/song";
import { useCallback, useEffect, useRef, useState } from "react";
import PlayerControls from "./PlayerControls";

// ─── Time formatting ─────────────────────────────────────────────────────────

function fmtTime(sec: number): string {
  if (!isFinite(sec)) return "0:00";

  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);

  return `${m}:${s.toString().padStart(2, "0")}`;
}

// ─── Props ───────────────────────────────────────────────────────────────────

interface GhazalPlayerProps {
  onSongChange: (song: Song) => void;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function GhazalPlayer({
  onSongChange,
}: GhazalPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const handleNextRef = useRef<() => void>(() => {});
  const progressRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playerVisible, setPlayerVisible] = useState(false);

  const currentSong = songs[currentIndex];

  // ─── Player entrance ─────────────────────────────────────────────────────

  useEffect(() => {
    const timer = setTimeout(() => {
      setPlayerVisible(true);
    }, 250);

    return () => clearTimeout(timer);
  }, []);

  // ─── Notify parent ────────────────────────────────────────────────────────

  useEffect(() => {
    onSongChange(currentSong);
  }, [currentSong, onSongChange]);

  // ─── Audio setup ──────────────────────────────────────────────────────────

  useEffect(() => {
    const audio = new Audio();

    audio.preload = "metadata";
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleDurationChange = () => {
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      handleNextRef.current();
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("durationchange", handleDurationChange);
    audio.addEventListener("loadedmetadata", handleDurationChange);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.pause();

      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("durationchange", handleDurationChange);
      audio.removeEventListener(
        "loadedmetadata",
        handleDurationChange
      );
      audio.removeEventListener("ended", handleEnded);

      audioRef.current = null;
    };
  }, []);

  // ─── Load current song ────────────────────────────────────────────────────

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const wasPlaying = isPlaying;

    audio.pause();
    audio.src = currentSong.audioUrl;
    audio.load();

    setCurrentTime(0);
    setDuration(0);

    if (wasPlaying) {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  // ─── Play ─────────────────────────────────────────────────────────────────

  const handlePlay = useCallback(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, []);

  // ─── Pause ────────────────────────────────────────────────────────────────

  const handlePause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  // ─── Change song ──────────────────────────────────────────────────────────

  const changeSong = useCallback((newIndex: number) => {
    setCurrentIndex(newIndex);
  }, []);

  // ─── Next ─────────────────────────────────────────────────────────────────

  const handleNext = useCallback(() => {
    changeSong((currentIndex + 1) % songs.length);
  }, [currentIndex, changeSong]);

  handleNextRef.current = handleNext;

  // ─── Previous ─────────────────────────────────────────────────────────────

  const handlePrev = useCallback(() => {
    if (currentTime > 3) {
      const audio = audioRef.current;

      if (audio) {
        audio.currentTime = 0;
        setCurrentTime(0);
      }
    } else {
      changeSong(
        (currentIndex - 1 + songs.length) % songs.length
      );
    }
  }, [currentIndex, currentTime, changeSong]);

  // ─── Seek ─────────────────────────────────────────────────────────────────

  const handleSeek = useCallback(
    (
      e:
        | React.MouseEvent<HTMLDivElement>
        | React.TouchEvent<HTMLDivElement>
    ) => {
      const bar = progressRef.current;
      const audio = audioRef.current;

      if (!bar || !audio || !duration) return;

      const rect = bar.getBoundingClientRect();

      const clientX =
        "touches" in e ? e.touches[0].clientX : e.clientX;

      const ratio = Math.max(
        0,
        Math.min(
          1,
          (clientX - rect.left) / rect.width
        )
      );

      audio.currentTime = ratio * duration;
      setCurrentTime(audio.currentTime);
    },
    [duration]
  );

  // ─── Keyboard seek ───────────────────────────────────────────────────────

  const handleSeekKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const audio = audioRef.current;

      if (!audio || !duration) return;

      if (e.key === "ArrowRight") {
        e.preventDefault();

        audio.currentTime = Math.min(
          duration,
          audio.currentTime + 5
        );

        setCurrentTime(audio.currentTime);
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();

        audio.currentTime = Math.max(
          0,
          audio.currentTime - 5
        );

        setCurrentTime(audio.currentTime);
      }
    },
    [duration]
  );

  const progress =
    duration > 0
      ? Math.min(currentTime / duration, 1)
      : 0;

  return (
    <>
      <div
        className="relative w-full px-4 sm:px-6"
        style={{
          opacity: playerVisible ? 1 : 0,
          transform: playerVisible
            ? "translateY(0)"
            : "translateY(20px)",
          transition:
            "opacity 600ms ease, transform 600ms ease",
        }}
      >
        {/* =====================================================
            GLASS PLAYER
        ====================================================== */}

        <div
          className="
            mx-auto
            flex
            w-full
            max-w-[780px]
            items-center
            gap-4
            rounded-full
            border
            border-white/20
            px-3
            py-3
            sm:gap-5
            sm:px-4
            sm:py-3.5
          "
          style={{
            background:
              "linear-gradient(110deg, rgba(105,55,45,0.48) 0%, rgba(155,75,55,0.42) 48%, rgba(190,88,62,0.45) 100%)",
            backdropFilter:
              "blur(28px) saturate(165%)",
            WebkitBackdropFilter:
              "blur(28px) saturate(165%)",
            boxShadow:
              "0 18px 60px rgba(0,0,0,0.38), 0 1px 0 rgba(255,255,255,0.18) inset, 0 -1px 0 rgba(255,255,255,0.05) inset",
          }}
        >
          {/* =================================================
              ARTWORK
          ================================================== */}

          <div
            className="
              relative
              h-[68px]
              w-[68px]
              shrink-0
              overflow-hidden
              rounded-full
              border
              border-white/25
              shadow-[0_8px_24px_rgba(0,0,0,0.35)]
              sm:h-[78px]
              sm:w-[78px]
            "
          >
            <img
              src={currentSong.artworkUrl}
              alt={`${currentSong.title} artwork`}
              className="h-full w-full rounded-full object-cover"
              style={{
                animation: isPlaying
                  ? "ghazal-artwork-spin 12s linear infinite"
                  : "none",
              }}
            />

            <div
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                h-1.5
                w-1.5
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-white/90
                shadow-[0_0_5px_rgba(0,0,0,0.5)]
              "
            />
          </div>

          {/* =================================================
              SONG CONTENT
          ================================================== */}

          <div
            className="
              min-w-0
              flex-1
              py-1
              sm:py-1.5
            "
          >
            {/* Song title */}

            <p
              className="
                truncate
                text-[15px]
                font-semibold
                leading-tight
                text-white
                sm:text-[17px]
              "
              style={{
                fontFamily: "var(--font-inter)",
                textShadow:
                  "0 2px 12px rgba(0,0,0,0.25)",
              }}
            >
              {currentSong.title}
            </p>

            {/* Singer */}

            <p
              className="
                mt-3
                truncate
                text-[11px]
                leading-tight
                text-white/65
                sm:text-[12px]
              "
              style={{
                fontFamily: "var(--font-inter)",
                paddingBottom:"4px"
              }}
            >
              {currentSong.singer}
            </p>

            {/* =================================================
                PROGRESS + TIME
            ================================================== */}

            <div className="mt-3 sm:mt-3.5 py-5">
              <div
                ref={progressRef}
                role="slider"
                aria-label="Seek"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(
                  progress * 100
                )}
                tabIndex={0}
                className="
                  group
                  relative
                  h-[4px]
                  w-full
                  
                  cursor-pointer
                  touch-none
                  rounded-full
                  bg-white/20
                  sm:h-[5px]
                "
                onClick={handleSeek}
                onTouchStart={handleSeek}
                onKeyDown={handleSeekKeyDown}
              >
                {/* Progress */}

                <div
                  className="
                    absolute
                    left-0
                    top-0
                    h-full
                    rounded-full
                    bg-white/70
                    shadow-[0_0_8px_rgba(255,255,255,0.15)]
                    transition-[width]
                    duration-100
                  "
                  style={{
                    width: `${progress * 100}%`,
                  }}
                />

                {/* Thumb */}

                <div
                  className="
                    absolute
                    top-1/2
                    h-2
                    w-2
                    -translate-y-1/2
                    rounded-full
                    bg-white
                    opacity-0
                    shadow-[0_0_8px_rgba(255,255,255,0.5)]
                    transition-opacity
                    duration-150
                    group-hover:opacity-100
                    group-focus:opacity-100
                  "
                  style={{
                    left: `calc(${progress * 100}% - 4px)`,
                  }}
                />
              </div>

              {/* More breathing room between progress and time */}

              <div
                className="
                  mt-2
                  flex
                  items-center
                  justify-between
                "
              >
                <span
                  className="
                    text-[9px]
                    tabular-nums
                    tracking-wide
                    text-white/55
                    sm:text-[10px]
                  "
                  style={{
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  {fmtTime(currentTime)}
                </span>

                <span
                  className="
                    text-[9px]
                    tabular-nums
                    tracking-wide
                    text-white/55
                    sm:text-[10px]
                  "
                  style={{
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  {duration > 0
                    ? fmtTime(duration)
                    : currentSong.durationLabel ?? "0:00"}
                </span>
              </div>
            </div>
          </div>

          {/* =================================================
              CONTROLS
          ================================================== */}

          <div
            className="
              flex
              shrink-0
              items-center
              justify-center
              px-1
              sm:px-2
            "
          >
            <PlayerControls
              isPlaying={isPlaying}
              onPlay={handlePlay}
              onPause={handlePause}
              onPrev={handlePrev}
              onNext={handleNext}
            />
          </div>
        </div>
      </div>

      <style >{`
        @keyframes ghazal-artwork-spin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}