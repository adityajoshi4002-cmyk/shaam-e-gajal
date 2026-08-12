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
    // Set immediately on mount (client-only)
    setTime(formatTime(new Date()));
    const interval = setInterval(() => {
      setTime(formatTime(new Date()));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return null;

  return (
    <span
      className="text-white/70 text-xs font-light tracking-wide tabular-nums"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      {time}
    </span>
  );
}
