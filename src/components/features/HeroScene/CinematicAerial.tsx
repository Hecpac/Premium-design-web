"use client";

import Image from "next/image";
import { m, useReducedMotion } from "framer-motion";
import { IMAGES } from "@/lib/image-data";

/**
 * CinematicAerial Component
 * 
 * Performance Engineering:
 * 1. ZERO CLS: Fixed aspect ratio and explicit dimensions.
 * 2. LCP Optimization: High-priority loading with blur placeholders.
 * 3. Drone Motion: Uses high-performance GPU-accelerated transforms (scale/translate) 
 *    to simulate a slow drone flyover (Ken Burns effect).
 * 4. Accessibility: Respects prefers-reduced-motion by disabling animations.
 */
export function CinematicAerial() {
    const prefersReducedMotion = useReducedMotion();

    return (
        <div className="relative w-full h-full overflow-hidden">
            <m.div
                // Drone-like camera drift: make it unmistakable.
                // (Still transform-only + reduced-motion safe.)
                initial={prefersReducedMotion ? {} : {
                    scale: 1.28,
                    x: "-5%",
                    y: "-4%",
                    rotate: 0.45,
                }}
                animate={prefersReducedMotion ? {} : {
                    // Keyframes feel more like stabilized drone footage than a simple pan.
                    scale: [1.28, 1.2, 1.24, 1.16, 1.22],
                    x: ["-5%", "2%", "-3%", "1%", "-1%"],
                    y: ["-4%", "1%", "-2%", "3%", "0%"],
                    rotate: [0.45, -0.28, 0.22, -0.18, 0.12],
                }}
                transition={prefersReducedMotion ? {} : {
                    duration: 22,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "mirror",
                }}
                style={{ transformOrigin: "50% 50%" }}
                className="relative w-full h-full will-change-transform"
            >
                <Image
                    src={IMAGES.heroAerialCinematic.src}
                    alt="Cinematic wide aerial drone shot of Dallas downtown skyline at twilight. Stunning modern architecture with vibrant city lights and a luxury atmosphere."
                    width={IMAGES.heroAerialCinematic.width}
                    height={IMAGES.heroAerialCinematic.height}
                    priority={true}
                    quality={85}
                    className="object-cover w-full h-full scale-110 saturate-[1.3] contrast-[1.15] [-webkit-image-rendering:optimize-contrast]"
                    sizes="100vw"
                    placeholder="blur"
                    blurDataURL={IMAGES.heroAerialCinematic.blurDataURL}
                />
            </m.div>

            {/* Cinematic Gradients for depth and legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>
    );
}
