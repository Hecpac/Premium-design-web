"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const Hero3D = dynamic(
  () => import("@/components/features/Hero3D").then((m) => m.Hero3D),
  { ssr: false, loading: () => null }
);

type IdleCallbackHandle = number;

type IdleCallback = (deadline: { didTimeout: boolean; timeRemaining: () => number }) => void;

type WindowWithIdleCallback = Window & {
  requestIdleCallback?: (cb: IdleCallback, opts?: { timeout: number }) => IdleCallbackHandle;
  cancelIdleCallback?: (handle: IdleCallbackHandle) => void;
};

export function Hero3DGate() {
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const enabledRef = useRef(false);

  useEffect(() => {
    // Compute eligibility on the client only (avoids SSR/window issues).
    if (prefersReducedMotion) {
      setAllowed(false);
      return;
    }

    // Disable on coarse pointers (most touch devices)
    if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) {
      setAllowed(false);
      return;
    }

    // Respect Save-Data / slow connections when available
    const nav = navigator as unknown as {
      connection?: { saveData?: boolean; effectiveType?: string };
      deviceMemory?: number;
    };

    if (nav.connection?.saveData) {
      setAllowed(false);
      return;
    }

    const effectiveType = nav.connection?.effectiveType;
    if (effectiveType && (effectiveType === "slow-2g" || effectiveType.endsWith("2g"))) {
      setAllowed(false);
      return;
    }

    // Conservative memory guard (undefined on many browsers)
    if (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4) {
      setAllowed(false);
      return;
    }

    setAllowed(true);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!allowed) return;

    const win = window as WindowWithIdleCallback;

    const enable = () => {
      if (enabledRef.current) return;
      enabledRef.current = true;
      setEnabled(true);
    };

    // 1) First scroll: load 3D when the user starts interacting
    const onFirstScroll = () => enable();
    window.addEventListener("scroll", onFirstScroll, { passive: true, once: true });

    // 2) Browser idle: load 3D when the main thread is free (even if user doesn't scroll)
    let idleHandle: IdleCallbackHandle | null = null;
    if (typeof win.requestIdleCallback === "function") {
      idleHandle = win.requestIdleCallback(() => enable(), { timeout: 2000 });
    }

    // 3) Fallback: ensure it eventually mounts on capable devices
    const timeoutId = window.setTimeout(() => enable(), 2500);

    return () => {
      window.removeEventListener("scroll", onFirstScroll);
      window.clearTimeout(timeoutId);
      if (idleHandle !== null && typeof win.cancelIdleCallback === "function") {
        win.cancelIdleCallback(idleHandle);
      }
    };
  }, [allowed]);

  if (!enabled) return null;
  return <Hero3D />;
}
