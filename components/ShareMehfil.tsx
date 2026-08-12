"use client";

import { Song } from "@/types/song";
import { SITE_URL } from "@/data/songs";
import { Share2 } from "lucide-react";

interface ShareMehfilProps {
  currentSong: Song | null;
}

// Story card template data — ready for future image generation
export interface ShareCardData {
  title: string; // "शाम-ए-ग़ज़ल"
  songTitle: string;
  singer: string;
  tagline: string; // "Currently listening 🌙"
  siteUrl: string;
}

export function buildShareCardData(song: Song | null): ShareCardData {
  return {
    title: "शाम-ए-ग़ज़ल",
    songTitle: song?.title ?? "Ghazal",
    singer: song?.singer ?? "",
    tagline: "Currently listening 🌙",
    siteUrl: SITE_URL,
  };
}

export default function ShareMehfil({ currentSong }: ShareMehfilProps) {
  const handleShare = async () => {
    const songTitle = currentSong?.title ?? "Ghazals";
    const singer = currentSong?.singer ?? "";
    const shareText = `🎵 Listening to ${songTitle}${singer ? ` — ${singer}` : ""}\non Shaam-e-Ghazal 🌙\n\n${SITE_URL}`;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "शाम-ए-ग़ज़ल",
          text: shareText,
          url: SITE_URL,
        });
      } catch (err) {
        // User cancelled or share failed — fall back silently
        if ((err as Error).name !== "AbortError") {
          fallbackCopy(shareText);
        }
      }
    } else {
      fallbackCopy(shareText);
    }
  };

  const fallbackCopy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // Brief visual feedback could be added here via state
        alert("Copied to clipboard!\n\n" + text);
      })
      .catch(() => {
        // Final fallback
        window.prompt("Copy this link:", SITE_URL);
      });
  };

  return (
    <button
      onClick={handleShare}
      aria-label="Share this Mehfil"
      title="Share this Mehfil"
      className="flex items-center gap-1.5 text-white/65 hover:text-white/95 text-xs tracking-wide transition-colors duration-200 group"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <Share2
        size={11}
        className="group-hover:scale-110 transition-transform duration-200"
      />
      <span className="hidden sm:inline">Share</span>
    </button>
  );
}
