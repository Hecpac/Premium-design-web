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
    const nav = navigator as unknown as {
      connection?: { saveData?: boolean; effectiveType?: string };
      deviceMemory?: number;
    };

    const effectiveType = nav.connection?.effectiveType;

    const nextAllowed =
      !prefersReducedMotion &&
      !(window.matchMedia && window.matchMedia("(pointer: coarse)").matches) &&
      !nav.connection?.saveData &&
      !(effectiveType && (effectiveType === "slow-2g" || effectiveType.endsWith("2g"))) &&
      !(typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4);

    // Avoid setState synchronously inside effects (react-hooks/set-state-in-effect)
    const id = window.setTimeout(() => setAllowed(nextAllowed), 0);
    return () => window.clearTimeout(id);
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
