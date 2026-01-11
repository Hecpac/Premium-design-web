"use client";

import { useEffect, useRef, useState } from "react";

/**
 * StatsCounterClient - Performance Engineering
 * 
 * fixes: "0" value bug by using robust vanilla IntersectionObserver + RAF
 * features:
 * - Zero CLS (min-width reservation)
 * - prefers-reduced-motion support
 * - Viewport triggering
 * - No heavy animation lib dependencies for this critical hero element
 */
export function StatsCounterClient({
    value,
    prefix = "",
    suffix = "",
    duration = 2.5 // seconds
}: {
    value: number;
    prefix?: string;
    suffix?: string;
    duration?: number;
}) {
    // Never start at 0 for premium-first perception (demo polish)
    // Start slightly below the final value, then count up subtly.
    const initialValue = Math.max(0, value - Math.max(1, Math.round(value * 0.15)));

    const [displayValue, setDisplayValue] = useState(initialValue);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);

    // Calculate strict min-width to prevent layout shift
    // We assume the final value width is the maximum width needed
    const finalString = `${prefix}${value}${suffix}`;
    // Using 'ch' units based on length is a good heuristic for monospaced/tabular nums
    const minWidth = `${finalString.length}ch`;

    useEffect(() => {
        if (hasAnimated) return;

        const element = ref.current;
        if (!element) return;

        // 1. Check Reduced Motion Preference
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        const shouldReduceMotion = mediaQuery.matches;

        if (shouldReduceMotion) {
            // Avoid setState synchronously inside effects (react-hooks/set-state-in-effect)
            const id = window.setTimeout(() => {
                setDisplayValue(value);
                setHasAnimated(true);
            }, 0);
            return () => window.clearTimeout(id);
        }

        // 2. Observer for Viewport Entry
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    startAnimation();
                    observer.disconnect();
                }
            },
            { threshold: 0.1 } // Trigger when 10% visible
        );

        observer.observe(element);

        // 3. Animation Logic (RAF)
        const startFrom = initialValue;
        let startTime: number | null = null;
        let animationFrameId: number | null = null;

        const startAnimation = () => {
            const animate = (timestamp: number) => {
                if (!startTime) startTime = timestamp;
                const progress = timestamp - startTime;
                const progressRatio = Math.min(progress / (duration * 1000), 1);

                // Ease Out Expo for premium feel
                const easeValue = progressRatio === 1 ? 1 : 1 - Math.pow(2, -10 * progressRatio);

                const currentCount = Math.round(startFrom + easeValue * (value - startFrom));
                setDisplayValue(currentCount);

                if (progressRatio < 1) {
                    animationFrameId = requestAnimationFrame(animate);
                } else {
                    setDisplayValue(value);
                    setHasAnimated(true);
                }
            };
            animationFrameId = requestAnimationFrame(animate);
        };

        return () => {
            observer.disconnect();
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [value, duration, hasAnimated, initialValue]);

    // Initial render: show 0 (or final if pre-rendered/hydrated late)
    // We use tabular-nums to ensure character width consistency
    return (
        <span
            ref={ref}
            className="tabular-nums font-feature-settings-tnum inline-block text-left"
            style={{ minWidth }}
            aria-label={finalString}
        >
            {prefix}{hasAnimated ? value : displayValue}{suffix}
        </span>
    );
}
