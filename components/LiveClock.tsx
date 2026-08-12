"use client";

import { useState, useEffect } from "react";

function formatTime(date: Date): string {
  let hours = date.getHours();
  const minutes = date.getMinutes();

  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12;

  const mm = minutes < 10 ? `0${minutes}` : `${minutes}`;

  return `${hours}:${mm} ${ampm}`;
}

export default function LiveClock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      setTime(formatTime(new Date()));
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
        pl-1
        sm:pl-2
        lg:pl-3
      "
    >
      <span
        className="
          whitespace-nowrap
          text-xs
          font-light
          leading-none
          tracking-wide
          tabular-nums
          text-white/70
        "
        style={{
          fontFamily: "var(--font-inter)",
        }}
      >
        {time}
      </span>
    </div>
  );
}