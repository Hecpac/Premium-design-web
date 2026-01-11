"use client";

import { useEffect, useRef, useState } from "react";

/**
 * StatsCounterClient - Demo polish
 *
 * Goal: keep the hero stats always correct on first paint (no "0" / no interim values)
 * while still adding a subtle premium reveal on capable devices.
 */
export function StatsCounterClient({
    value,
    prefix = "",
    suffix = "",
}: {
    value: number;
    prefix?: string;
    suffix?: string;
}) {
    const ref = useRef<HTMLSpanElement>(null);

    const finalString = `${prefix}${value}${suffix}`;
    const minWidth = `${finalString.length}ch`;

    const [isRevealed, setIsRevealed] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const shouldReduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (shouldReduceMotion) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting) {
                    setIsRevealed(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return (
        <span
            ref={ref}
            className={
                "tabular-nums font-feature-settings-tnum inline-block text-left transition-all duration-700" +
                (isRevealed
                    ? " drop-shadow-[0_10px_40px_rgba(198,168,124,0.20)]"
                    : " opacity-90")
            }
            style={{ minWidth }}
            aria-label={finalString}
        >
            {finalString}
        </span>
    );
}
