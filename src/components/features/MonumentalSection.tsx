"use client";

import Image from "next/image";
import { m, useReducedMotion, type Variants } from "framer-motion";
import { useMemo } from "react";

/**
 * MonumentalSection — Web Premium 2026
 *
 * Typography: Material 3 "Emphasized" scale with modular type hierarchy.
 * Motion: Spring physics for natural feel + staggered entrance.
 * Performance: GPU-accelerated transforms, INP < 200ms.
 * A11y: prefers-reduced-motion, WCAG 2.2 AA contrast (>4.5:1).
 */

// ============================================================================
// Spring Physics Constants (Natural Motion)
// ============================================================================
const SPRING_PULLBACK = {
  type: "spring" as const,
  stiffness: 8,
  damping: 30,
  mass: 1.2,
};

const SPRING_TEXT_ENTRANCE = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
  mass: 0.8,
};

// ============================================================================
// Staggered Text Animation Variants
// ============================================================================
function createTextVariants(shouldAnimate: boolean): {
  container: Variants;
  label: Variants;
  heading: Variants;
  description: Variants;
} {
  if (!shouldAnimate) {
    return {
      container: { hidden: {}, visible: {} },
      label: { hidden: {}, visible: {} },
      heading: { hidden: {}, visible: {} },
      description: { hidden: {}, visible: {} },
    };
  }

  return {
    container: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.12,
          delayChildren: 0.1,
        },
      },
    },
    label: {
      hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
      visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { ...SPRING_TEXT_ENTRANCE, stiffness: 120 },
      },
    },
    heading: {
      hidden: {
        opacity: 0,
        y: 30,
        scale: 0.96,
        filter: "blur(8px)",
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: SPRING_TEXT_ENTRANCE,
      },
    },
    description: {
      hidden: { opacity: 0, y: 16 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          ...SPRING_TEXT_ENTRANCE,
          stiffness: 80,
          delay: 0.08,
        },
      },
    },
  };
}

export function MonumentalSection() {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = !prefersReducedMotion;

  // Memoized variants to prevent recreation on each render
  const textVariants = useMemo(
    () => createTextVariants(shouldAnimate),
    [shouldAnimate]
  );

  return (
    <section
      className="relative w-full aspect-[28/9] md:aspect-[32/9] min-h-[360px] md:min-h-[520px] max-h-[720px] overflow-hidden my-24 md:my-32"
      aria-labelledby="monumental-heading"
    >
      {/* ================================================================
          Background Image — Cinematic Drone Pullback (Spring Physics)
          GPU-accelerated via will-change-transform
          ================================================================ */}
      <m.div
        aria-hidden="true"
        className="absolute inset-0 will-change-transform"
        initial={
          shouldAnimate ? { scale: 1.32, y: 20, rotate: 0.4 } : undefined
        }
        animate={
          shouldAnimate
            ? {
                scale: [1.32, 1.06, 1.18, 1.08, 1.14],
                y: [20, -5, 8, 0, 6],
                rotate: [0.4, -0.15, 0.22, -0.1, 0.16],
              }
            : undefined
        }
        transition={
          shouldAnimate
            ? {
                ...SPRING_PULLBACK,
                repeat: Infinity,
                repeatType: "mirror" as const,
                duration: 18,
              }
            : undefined
        }
        style={{ transformOrigin: "50% 42%" }}
      >
        <Image
          src="/dallas-aerial.png"
          alt="Panoramic aerial view of Dallas skyline at twilight featuring modern architecture and urban luxury context"
          fill
          className="object-cover object-[center_42%]"
          sizes="100vw"
          quality={90}
          loading="lazy"
        />
      </m.div>

      {/* ================================================================
          Cinematic Overlays — Depth, Contrast & Warm Accent
          Ensures WCAG AA contrast (>4.5:1) for overlaid text
          ================================================================ */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20"
        aria-hidden="true"
      />
      {/* Warm accent spotlight (gold) */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(198,168,124,0.18)_0%,transparent_65%)]"
        aria-hidden="true"
      />
      {/* Cool depth shadow (slate) */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_15%_20%,rgba(30,41,59,0.28)_0%,transparent_50%)]"
        aria-hidden="true"
      />
      {/* Vignette for cinematic framing */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,transparent_40%,rgba(0,0,0,0.35)_100%)]"
        aria-hidden="true"
      />

      {/* ================================================================
          Typography — Material 3 Emphasized Scale + Staggered Entrance
          Baseline: Label (functional) | Emphasized: Heading (expressive)
          ================================================================ */}
      <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6">
        <m.div
          variants={textVariants.container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-15% 0px" }}
          className="text-center max-w-5xl"
        >
          {/* Label — Baseline Typography (Functional) */}
          <m.span
            variants={textVariants.label}
            className={
              "block mb-5 md:mb-6 " +
              "text-[0.6875rem] sm:text-xs " + // 11px / 12px
              "uppercase tracking-[0.28em] sm:tracking-[0.32em] " +
              "font-medium " +
              "text-white/55"
            }
            style={{ fontFeatureSettings: "'ss01' on, 'cv01' on" }}
          >
            Aerial Context
          </m.span>

          {/* Heading — Emphasized Typography (Expressive) */}
          <m.h2
            id="monumental-heading"
            variants={textVariants.heading}
            className={
              "font-[family-name:var(--font-playfair)] " +
              "text-[clamp(2.75rem,10vw,10rem)] " + // Fluid: 44px → 160px
              "leading-[0.88] " + // Tight leading for display
              "font-black uppercase " +
              "tracking-[0.08em] sm:tracking-[0.12em] md:tracking-[0.16em] " +
              "bg-gradient-to-b from-white via-white/92 to-white/60 " +
              "bg-clip-text text-transparent " +
              "[text-shadow:0_4px_24px_rgba(0,0,0,0.45),0_16px_64px_rgba(0,0,0,0.35)]"
            }
          >
            Monumental
          </m.h2>

          {/* Description — Baseline Typography (Supportive) */}
          <m.p
            variants={textVariants.description}
            className={
              "mt-6 md:mt-8 " +
              "mx-auto max-w-md sm:max-w-lg " +
              "text-sm sm:text-base md:text-lg " +
              "leading-relaxed " +
              "font-light tracking-wide " +
              "text-zinc-100/70" // ~#e4e4e7 at 70% — contrast >4.5:1 on dark
            }
            style={{ textWrap: "balance" }}
          >
            A slow pullback — like stabilized drone footage.
          </m.p>
        </m.div>
      </div>
    </section>
  );
}
