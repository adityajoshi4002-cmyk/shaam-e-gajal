"use client";

import LiveClock from "./LiveClock";
import ListenerCount from "./ListenerCount";
import ShareMehfil from "./ShareMehfil";
import { SPOTIFY_URL, YT_MUSIC_URL } from "@/data/songs";
import { Song } from "@/types/song";

interface TopBarProps {
  currentSong: Song | null;
}

export default function TopBar({ currentSong }: TopBarProps) {
  return (
    <header
      className="
        w-full
        px-6
        pt-[max(16px,env(safe-area-inset-top))]
        sm:px-10
        sm:pt-6
        lg:px-14
        xl:px-16
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1500px]
        "
      >
        <div
          className="
            grid
            w-full
            grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]
            items-center
            gap-6
            sm:gap-10
          "
        >
          {/* =====================================================
              LEFT — LIVE CLOCK
          ====================================================== */}
          <div
            className="
              flex
              min-w-0
              items-center
              justify-start
              self-center
            "
          >
            <div className="flex items-center">
              <LiveClock />
            </div>
          </div>

          {/* =====================================================
              CENTER — LISTENER COUNT
          ====================================================== */}
          <div
            className="
              flex
              shrink-0
              items-center
              justify-center
              self-center
            "
          >
            <ListenerCount />
          </div>

          {/* =====================================================
              RIGHT — SHARE + MUSIC LINKS
          ====================================================== */}
          <div
            className="
              flex
              min-w-0
              items-center
              justify-end
              self-center
              gap-3
              sm:gap-5
            "
          >
            {/* Share */}
            <div className="flex shrink-0 items-center">
              <ShareMehfil currentSong={currentSong} />
            </div>

            {/* Spotify */}
            <a
              href={SPOTIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open on Spotify"
              className="
                group
                flex
                h-8
                shrink-0
                items-center
                justify-center
                gap-1.5
                text-white/65
                transition-all
                duration-200
                hover:text-[#1DB954]
                sm:h-9
              "
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="
                  block
                  shrink-0
                  transition-transform
                  duration-200
                  group-hover:scale-110
                "
              >
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>

              <span
                className="
                  hidden
                  whitespace-nowrap
                  text-xs
                  leading-none
                  tracking-wide
                  sm:inline
                "
                style={{
                  fontFamily: "var(--font-inter)",
                }}
              >
                Spotify
              </span>

              <span
                className="
                  hidden
                  text-xs
                  leading-none
                  text-white/35
                  sm:inline
                "
              >
                ↗
              </span>
            </a>

            {/* YouTube Music */}
            <a
              href={YT_MUSIC_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open on YouTube Music"
              className="
                group
                flex
                h-8
                shrink-0
                items-center
                justify-center
                gap-1.5
                text-white/65
                transition-all
                duration-200
                hover:text-red-400
                sm:h-9
              "
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="
                  block
                  shrink-0
                  transition-transform
                  duration-200
                  group-hover:scale-110
                "
              >
                <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104 7.104 7.104 7.104 7.104 7.104 5.376 12 5.376zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L16.2 12l-6.516 3.54z" />
              </svg>

              <span
                className="
                  hidden
                  whitespace-nowrap
                  text-xs
                  leading-none
                  tracking-wide
                  sm:inline
                "
                style={{
                  fontFamily: "var(--font-inter)",
                }}
              >
                YT Music
              </span>

              <span
                className="
                  hidden
                  text-xs
                  leading-none
                  text-white/35
                  sm:inline
                "
              >
                ↗
              </span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}