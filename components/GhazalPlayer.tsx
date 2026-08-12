"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Song } from "@/types/song";
import { songs } from "@/data/songs";
import SongInfo from "./SongInfo";
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
  const handleNextRef = useRef<() => void>(() => { });
  const progressRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [playerVisible, setPlayerVisible] = useState(false);

  const currentSong = songs[currentIndex];

  // ─── Player entrance animation ────────────────────────────────────────────

  useEffect(() => {
    const t = setTimeout(() => {
      setPlayerVisible(true);
    }, 300);

    return () => clearTimeout(t);
  }, []);

  // ─── Notify parent of current song ────────────────────────────────────────

  useEffect(() => {
    onSongChange(currentSong);
  }, [currentSong, onSongChange]);

  // ─── Setup audio element ──────────────────────────────────────────────────

  useEffect(() => {
    const audio = new Audio();

    audio.preload = "metadata";

    audioRef.current = audio;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const onDurationChange = () => {
      setDuration(audio.duration || 0);
    };

    const onEnded = () => {
      handleNextRef.current();
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("loadedmetadata", onDurationChange);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();

      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("loadedmetadata", onDurationChange);
      audio.removeEventListener("ended", onEnded);

      audioRef.current = null;
    };
  }, []);

  // ─── Load song when currentIndex changes ──────────────────────────────────

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
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  // ─── Play ─────────────────────────────────────────────────────────────────

  const handlePlay = useCallback(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        setIsPlaying(false);
      });
  }, []);

  // ─── Pause ────────────────────────────────────────────────────────────────

  const handlePause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  // ─── Change song ──────────────────────────────────────────────────────────

  const changeSong = useCallback((newIndex: number) => {
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsTransitioning(false);
    }, 300);
  }, []);

  // ─── Next ─────────────────────────────────────────────────────────────────

  const handleNext = useCallback(() => {
    changeSong((currentIndex + 1) % songs.length);
  }, [currentIndex, changeSong]);

  // Keep the ref in sync so audio's onEnded always gets the latest version
  handleNextRef.current = handleNext;

  // ─── Previous ─────────────────────────────────────────────────────────────

  const handlePrev = useCallback(() => {
    // If more than 3 seconds in, restart current song.
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

  // ─── Derived ──────────────────────────────────────────────────────────────

  const progress =
    duration > 0
      ? Math.min(currentTime / duration, 1)
      : 0;

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div
      className="
        relative
        w-full
        flex
        justify-center
      "
      style={{
        opacity: playerVisible ? 1 : 0,
        transform: playerVisible
          ? "translateY(0)"
          : "translateY(24px)",
        transition:
          "opacity 700ms ease, transform 700ms ease",
      }}
    >
      <div
        className="
          w-full
          max-w-[780px]
          rounded-full
          px-3
          py-2.5
          sm:px-4
          sm:py-3
          flex
          items-center
          gap-3
          sm:gap-4
          shadow-2xl
        "
        style={{
          background:
            "linear-gradient(90deg, rgba(82, 38, 28, 0.92) 0%, rgba(138, 48, 32, 0.92) 45%, rgba(186, 58, 38, 0.92) 100%)",
          backdropFilter: "blur(20px) saturate(160%)",
          WebkitBackdropFilter: "blur(20px) saturate(160%)",
          border: "1.5 solid rgba(255, 255, 255, 0.15)",
          boxShadow:
            "0 12px 48px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.2)",
        }}
      >
        {/* 1. Large Circular Artwork on Left */}
        <div className="relative shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden shadow-inner ring-2 ring-white/20">
          <img
            src={currentSong.artworkUrl}
            alt={`${currentSong.title} artwork`}
            className="object-cover w-full h-full"
          />
        </div>

        {/* 2. Middle Column: Title + Progress Bar + Time */}
        <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
          {/* Song Title */}
          <p
            className="text-white font-semibold text-sm sm:text-base leading-snug truncate"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {currentSong.title}
          </p>

          {/* Progress Bar */}
          <div
            ref={progressRef}
            role="slider"
            aria-label="Seek"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress * 100)}
            tabIndex={0}
            className="
              group
              relative
              h-1
              w-full
              cursor-pointer
              touch-none
              rounded-full
            "
            style={{
              background: "rgba(255, 255, 255, 0.25)",
            }}
            onClick={handleSeek}
            onTouchStart={handleSeek}
            onKeyDown={(e) => {
              const audio = audioRef.current;
              if (!audio || !duration) return;
              if (e.key === "ArrowRight") {
                audio.currentTime = Math.min(duration, audio.currentTime + 5);
              }
              if (e.key === "ArrowLeft") {
                audio.currentTime = Math.max(0, audio.currentTime - 5);
              }
            }}
          >
            {/* Filled progress line */}
            <div
              className="
                absolute
                left-0
                top-0
                h-full
                rounded-full
                bg-white/85
                transition-[width]
                duration-100
              "
              style={{
                width: `${progress * 100}%`,
              }}
            />

            {/* Seek thumb dot */}
            <div
              className="
                absolute
                top-1/2
                h-2.5
                w-2.5
                -translate-y-1/2
                rounded-full
                bg-white
                shadow-md
                opacity-0
                transition-opacity
                duration-150
                group-hover:opacity-100
                group-focus:opacity-100
              "
              style={{
                left: `calc(${progress * 100}% - 5px)`,
              }}
            />
          </div>

          {/* Time display: 0:01 / 3:04 format */}
          <span
            className="tabular-nums text-white/70 text-[11px] sm:text-xs font-normal"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {fmtTime(currentTime)} / {duration > 0 ? fmtTime(duration) : currentSong.durationLabel ?? "—"}
          </span>
        </div>

        {/* 3. Right Column: Controls Cluster (Previous | Play/Pause | Next) */}
        <div className="shrink-0 pl-1">
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
  );
}