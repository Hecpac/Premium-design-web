"use client";

import Link from "next/link";
import React, { useCallback, useMemo, useState } from "react";
import { AnimatePresence, m } from "framer-motion";

import { cn } from "@/lib/utils";
import { useDallasTime } from "@/lib/hooks/use-dallas-time";
import { EASE_OUT_EXPO, useShouldAnimate } from "@/lib/hooks/use-animation-config";

type NavLink = {
  label: string;
  href: string;
};

const NAV_LINKS: NavLink[] = [
  { label: "PROJECTS", href: "#projects" },
  { label: "PROCESS", href: "#process" },
  { label: "CAPABILITIES", href: "#capabilities" },
  { label: "JOURNAL", href: "#journal" },
];

function BracketLink({
  label,
  href,
  onClick,
  className,
}: {
  label: string;
  href: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  className?: string;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "group inline-flex items-center gap-0 font-mono text-xs uppercase tracking-[0.35em]",
        "text-neutral-400 hover:text-white transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-0",
        className
      )}
    >
      {/* Keep brackets in layout to avoid hover jitter */}
      <span className="inline-block w-4 text-center text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity">
        [
      </span>
      <span className="border-b-2 border-transparent pb-1 group-hover:border-white/80 transition-colors">
        {label}
      </span>
      <span className="inline-block w-4 text-center text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity">
        ]
      </span>
    </a>
  );
}

export function TechnicalNavbar() {
  const shouldAnimate = useShouldAnimate();
  const dallasTime = useDallasTime(1000);
  const [menuOpen, setMenuOpen] = useState(false);

  const links = useMemo(() => NAV_LINKS, []);

  const handleAnchorClick = useCallback(
    (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!href.startsWith("#")) return;

      const id = href.slice(1);
      const el = document.getElementById(id);
      if (!el) return;

      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });

      // Keep URL in sync without triggering a hard navigation.
      try {
        history.replaceState(null, "", href);
      } catch {
        // no-op
      }

      setMenuOpen(false);
    },
    []
  );

  return (
    <m.header
      initial={shouldAnimate ? { y: "-100%" } : false}
      animate={{ y: 0 }}
      transition={shouldAnimate ? { duration: 0.45, ease: EASE_OUT_EXPO } : { duration: 0 }}
      className={cn(
        "sticky top-0 z-50 w-full",
        "border-b border-neutral-800",
        "bg-black/90 backdrop-blur-md"
      )}
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="flex h-14 items-center justify-between gap-4">
          {/* LEFT: Brand */}
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="text-sm md:text-base font-bold uppercase tracking-widest text-white">
              PREMIUM HOME
            </span>
            <span className={cn(
              "inline-flex items-center",
              "border border-neutral-800 px-2 py-1",
              "font-mono text-[10px] uppercase tracking-[0.25em]",
              "text-neutral-400"
            )}>
              [BETA]
            </span>
          </Link>

          {/* CENTER: Links (desktop) */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Primary">
            {links.map((l) => (
              <BracketLink
                key={l.label}
                label={l.label}
                href={l.href}
                onClick={handleAnchorClick(l.href)}
              />
            ))}
          </nav>

          {/* RIGHT: Status + CTA + Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Status strip (sm+) */}
            <div
              className={cn(
                "hidden sm:flex items-center gap-3",
                "border border-neutral-800 px-3 py-2"
              )}
            >
              <span className="h-2 w-2 bg-emerald-400" aria-hidden="true" />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-200">
                OPERATIONAL
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-600">
                {"//"}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-300">
                DALLAS {dallasTime}
              </span>
            </div>

            {/* CTA (desktop) */}
            <a
              href="#contact"
              onClick={handleAnchorClick("#contact")}
              className={cn(
                "hidden md:inline-flex items-center justify-center",
                "border border-white bg-white px-4 py-2",
                "font-mono text-xs uppercase tracking-[0.25em]",
                "text-black hover:bg-black hover:text-white transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              )}
            >
              INQUIRE
            </a>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className={cn(
                "md:hidden inline-flex items-center gap-2",
                "border border-neutral-800 px-3 py-2",
                "font-mono text-xs uppercase tracking-[0.25em]",
                "text-neutral-200 hover:bg-neutral-900 transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              )}
              aria-expanded={menuOpen}
              aria-controls="technical-navbar-menu"
            >
              <span className="text-neutral-500">[</span>
              <span className="text-neutral-200">{menuOpen ? "-" : "+"}</span>
              <span className="text-neutral-500">]</span>
              <span>MENU</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel (overlay, transform-only animation) */}
      <AnimatePresence>
        {menuOpen && (
          <m.div
            id="technical-navbar-menu"
            initial={shouldAnimate ? { opacity: 0, y: -10 } : { opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldAnimate ? { opacity: 0, y: -10 } : { opacity: 0 }}
            transition={shouldAnimate ? { duration: 0.22, ease: EASE_OUT_EXPO } : { duration: 0 }}
            className={cn(
              "md:hidden",
              "absolute left-0 right-0 top-full",
              "border-b border-neutral-800",
              "bg-black/95 backdrop-blur-md"
            )}
          >
            <div className="mx-auto max-w-6xl px-6">
              <div className="py-4">
                <nav aria-label="Mobile" className="flex flex-col">
                  {links.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      onClick={handleAnchorClick(l.href)}
                      className={cn(
                        "border-t border-neutral-800 py-4",
                        "font-mono text-xs uppercase tracking-[0.25em]",
                        "text-neutral-300 hover:text-white transition-colors",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                      )}
                    >
                      {l.label}
                    </a>
                  ))}
                </nav>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 border border-neutral-800 px-3 py-2">
                    <span className="h-2 w-2 bg-emerald-400" aria-hidden="true" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-200">
                      OPERATIONAL
                    </span>
                  </div>

                  <a
                    href="#contact"
                    onClick={handleAnchorClick("#contact")}
                    className={cn(
                      "inline-flex items-center justify-center",
                      "border border-white bg-white px-4 py-2",
                      "font-mono text-xs uppercase tracking-[0.25em]",
                      "text-black hover:bg-black hover:text-white transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                    )}
                  >
                    INQUIRE
                  </a>
                </div>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </m.header>
  );
}
