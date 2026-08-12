"use client";

import { useState, useEffect, useRef } from "react";

// Simulates a live listener count in a realistic range
const MIN_LISTENERS = 18;
const MAX_LISTENERS = 47;

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function ListenerCount() {
  const [count, setCount] = useState<number | null>(null);
  const lastCount = useRef<number>(randomBetween(MIN_LISTENERS, MAX_LISTENERS));

  useEffect(() => {
    setCount(lastCount.current);

    // Subtly drift the count every 8–18 seconds
    const scheduleNext = () => {
      const delay = 8000 + Math.random() * 10000; // 8–18s
      return setTimeout(() => {
        // Move by ±1 or ±2, clamped to range
        const delta = Math.random() < 0.6 ? 1 : 2;
        const direction = Math.random() < 0.5 ? 1 : -1;
        const next = Math.min(
          MAX_LISTENERS,
          Math.max(MIN_LISTENERS, lastCount.current + delta * direction)
        );
        lastCount.current = next;
        setCount(next);
        timer = scheduleNext();
      }, delay);
    };

    let timer = scheduleNext();
    return () => clearTimeout(timer);
  }, []);

  if (count === null) return null;

  return (
    <span
      className="flex items-center gap-1.5 text-white/75 text-xs tracking-wide"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
      </span>
      {count} online
    </span>
  );
}
