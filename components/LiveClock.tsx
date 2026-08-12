"use client";

import { useState, useEffect } from "react";

function formatTime(date: Date): { time: string; period: string } {
  let hours = date.getHours();
  const minutes = date.getMinutes();

  const period = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12;

  const mm = minutes < 10 ? `0${minutes}` : `${minutes}`;

  return { time: `${hours}:${mm}`, period };
}

export default function LiveClock() {
  const [time, setTime] = useState<{ time: string; period: string } | null>(null);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      setTime(formatTime(new Date()));
      setBlink((b) => !b);
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!time) return null;

  return (
    <div
      className="
        flex
        h-9
        items-center
        justify-start
        gap-2
        pl-1
        sm:pl-2
        lg:pl-3
      "
    >
      {/* live indicator */}
      <span className="relative flex h-1.5 w-1.5">
        {/* <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" /> */}
        {/* <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" /> */}
      </span>

      <div
        className="flex items-baseline gap-1"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        <span
          className="
            whitespace-nowrap
            text-xs
            font-light
            leading-none
            tabular-nums
            text-white/80
          "
        >
          {time.time.split(":")[0]}
          <span className={blink ? "opacity-100" : "opacity-30"}>:</span>
          {time.time.split(":")[1]}
        </span>
        <span
          className="
            whitespace-nowrap
            text-[10px]
            font-medium
            uppercase
            leading-none
            tracking-widest
            text-white/40
          "
        >
          {time.period}
        </span>
      </div>
    </div>
  );
}