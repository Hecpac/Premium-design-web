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
                // Drone-like camera drift: clearly perceptible but still premium.
                // Transforms only (GPU-friendly) + respects reduced motion.
                initial={prefersReducedMotion ? {} : {
                    scale: 1.24,
                    x: "-4%",
                    y: "-3%",
                    rotate: 0.35,
                }}
                animate={prefersReducedMotion ? {} : {
                    // Multi-axis drift with gentle easing to feel like stabilized drone footage
                    scale: [1.24, 1.16, 1.2, 1.12],
                    x: ["-4%", "2%", "-2%", "1%"],
                    y: ["-3%", "1%", "-2%", "2%"],
                    rotate: [0.35, -0.22, 0.28, -0.14],
                }}
                transition={prefersReducedMotion ? {} : {
                    duration: 30,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "mirror",
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
