"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * Formats a timestamp as Dallas time (America/Chicago) in 24h format.
 * Example: "21:04:09 CT"
 */
export function getDallasTimeString(date: Date = new Date()): string {
  try {
    const time = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Chicago",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(date);

    return `${time} CT`;
  } catch {
    // Extremely defensive fallback (e.g. older runtimes without full Intl TZ support).
    return date.toLocaleTimeString();
  }
}

/**
 * Live Dallas time string (updates on an interval).
 */
export function useDallasTime(intervalMs: number = 1000): string {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs]);

  return useMemo(() => getDallasTimeString(now), [now]);
}
