"use client";

import Image from "next/image";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function MonumentalSection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Cinematic “pullback” (zoom out) as the user scrolls through the section
  const scale = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    prefersReducedMotion ? [1, 1, 1] : [1.22, 1.08, 1]
  );

  // Subtle vertical drift for parallax depth
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [18, -18]
  );

  // Title micro-kinetics: slightly relax letter spacing and opacity on scroll
  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 1],
    prefersReducedMotion ? [1, 1, 1] : [0.95, 1, 1]
  );

  return (
    <section
      ref={(node) => {
        sectionRef.current = node;
      }}
      className="relative w-full aspect-[28/9] md:aspect-[32/9] min-h-[320px] md:min-h-[460px] max-h-[600px] overflow-hidden my-20"
      aria-labelledby="monumental-heading"
    >
      {/* Background Image (animated wrapper) */}
      <m.div
        aria-hidden="true"
        className="absolute inset-0 will-change-transform"
        style={{ scale, y }}
      >
        <Image
          src="/dallas-aerial.png"
          alt="Panoramic aerial view of Dallas skyline at twilight featuring modern architecture and urban luxury context"
          fill
          className="object-cover object-[center_45%]"
          sizes="100vw"
          quality={92}
          loading="lazy"
        />
      </m.div>

      {/* Cinematic overlays for contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(198,168,124,0.18)_0%,transparent_55%)]" />

      {/* Typography */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <m.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
          style={{ opacity: titleOpacity }}
        >
          <span className="text-label text-white/50 block mb-4">Aerial Context</span>
          <h2
            id="monumental-heading"
            className="font-[family-name:var(--font-playfair)] text-[clamp(3rem,8.5vw,8.5rem)] leading-[0.92] font-black text-white uppercase tracking-[0.18em] sm:tracking-[0.22em] drop-shadow-[0_12px_60px_rgba(0,0,0,0.65)]"
            style={{
              textShadow:
                "0 6px 22px rgba(0,0,0,0.55), 0 20px 80px rgba(0,0,0,0.45)",
            }}
          >
            Monumental
          </h2>
          <p className="mt-6 text-zinc-200/70 max-w-xl mx-auto text-sm md:text-base font-light tracking-wide">
            A slow pullback — designed to feel like a drone shot, not a scroll effect.
          </p>
        </m.div>
      </div>
    </section>
  );
}
