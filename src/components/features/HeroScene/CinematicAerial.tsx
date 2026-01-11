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
                initial={prefersReducedMotion ? {} : {
                    scale: 1.15,
                    x: "-2%",
                    y: "-2%"
                }}
                animate={prefersReducedMotion ? {} : {
                    scale: 1,
                    x: "0%",
                    y: "0%"
                }}
                transition={prefersReducedMotion ? {} : {
                    duration: 20,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
                className="relative w-full h-full will-change-transform"
            >
                <Image
                    src={IMAGES.heroAerialCinematic.src}
                    alt="Cinematic wide aerial drone shot of Dallas downtown skyline at twilight. Stunning modern architecture with vibrant city lights and a luxury atmosphere."
                    width={IMAGES.heroAerialCinematic.width}
                    height={IMAGES.heroAerialCinematic.height}
                    priority={true}
                    quality={85}
                    className="object-cover w-full h-full scale-110" // Slight scale to hide edges during pan
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
