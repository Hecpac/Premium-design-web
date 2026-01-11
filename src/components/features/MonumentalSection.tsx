"use client";

import Image from "next/image";
import { m, useReducedMotion } from "framer-motion";

export function MonumentalSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="relative w-full aspect-[28/9] md:aspect-[32/9] min-h-[320px] md:min-h-[480px] max-h-[640px] overflow-hidden my-20"
      aria-labelledby="monumental-heading"
    >
      {/* Background Image (cinematic pullback loop) */}
      <m.div
        aria-hidden="true"
        className="absolute inset-0 will-change-transform"
        initial={prefersReducedMotion ? {} : { scale: 1.34, y: 18, rotate: 0.35 }}
        animate={
          prefersReducedMotion
            ? {}
            : {
                // Always-visible zoom-out (pullback) so it can't be missed.
                scale: [1.34, 1.05, 1.22],
                y: [18, 0, 10],
                rotate: [0.35, 0, 0.18],
              }
        }
        transition={
          prefersReducedMotion
            ? {}
            : {
                duration: 14,
                ease: [0.22, 1, 0.36, 1],
                repeat: Infinity,
                repeatType: "mirror",
                times: [0, 0.7, 1],
              }
        }
        style={{ transformOrigin: "50% 45%" }}
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/15" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(198,168,124,0.20)_0%,transparent_58%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,rgba(30,41,59,0.25)_0%,transparent_55%)]" />

      {/* Typography */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <m.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-18% 0px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <span className="text-label text-white/50 block mb-4">Aerial Context</span>
          <h2
            id="monumental-heading"
            className={
              "font-[family-name:var(--font-playfair)] " +
              "text-[clamp(3.2rem,8.8vw,9.2rem)] leading-[0.9] font-black uppercase " +
              "tracking-[0.14em] sm:tracking-[0.18em] " +
              "bg-gradient-to-b from-white via-white/90 to-white/65 bg-clip-text text-transparent"
            }
            style={{
              textShadow:
                "0 8px 26px rgba(0,0,0,0.55), 0 28px 110px rgba(0,0,0,0.45)",
            }}
          >
            Monumental
          </h2>
          <p className="mt-6 text-zinc-200/70 max-w-xl mx-auto text-sm md:text-base font-light tracking-wide">
            A slow pullback — like stabilized drone footage.
          </p>
        </m.div>
      </div>
    </section>
  );
}
