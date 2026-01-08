"use client";

import { m, useScroll, useTransform, useSpring, useInView, useMotionValue, useReducedMotion, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

// --- PARALLAX WRAPPER (Cinematic Subtle: Max 15px) ---
export function HeroAnimator({ children, className }: { children: React.ReactNode; className?: string }) {
    const ref = useRef(null);
    const { scrollY } = useScroll();
    const prefersReducedMotion = useReducedMotion();

    // Cinematic parallax: subtle 15px max shift for premium feel
    const y = useTransform(scrollY, [0, 600], [0, prefersReducedMotion ? 0 : 15]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    // Smooth spring for buttery animation
    const springConfig = { stiffness: 120, damping: 25, mass: 0.5 };
    const ySpring = useSpring(y, springConfig);

    return (
        <m.div
            ref={ref}
            style={{ y: prefersReducedMotion ? 0 : ySpring, opacity }}
            className={className}
        >
            {children}
        </m.div>
    );
}

// --- STAGGERED TITLE (Cinematic Word-by-Word Reveal) ---
export function HeroTitle({ children }: { children: React.ReactNode }) {
    const prefersReducedMotion = useReducedMotion();

    return (
        <m.div
            initial={prefersReducedMotion ? "visible" : "hidden"}
            animate="visible"
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: 0.12, // Slightly slower for cinematic feel
                        delayChildren: 0.3
                    }
                }
            }}
        >
            {children}
        </m.div>
    );
}

/**
 * TitleWord - Performance-optimized word reveal
 * Only uses opacity + translateY (no blur/filter for GPU efficiency)
 */
export function TitleWord({ children, className }: { children: React.ReactNode, className?: string }) {
    const prefersReducedMotion = useReducedMotion();

    return (
        <m.span
            className={className}
            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.7,
                        ease: [0.22, 1, 0.36, 1] // easeOutExpo for premium deceleration
                    }
                }
            }}
            style={{
                display: "inline-block",
                marginRight: "0.25em",
                willChange: prefersReducedMotion ? "auto" : "opacity, transform"
            }}
        >
            {children}
        </m.span>
    )
}

// --- FADE UP SUBTITLE (Cinematic Reveal) ---
export function HeroSubtitle({ children }: { children: React.ReactNode }) {
    const prefersReducedMotion = useReducedMotion();

    return (
        <m.div
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.9,
                delay: prefersReducedMotion ? 0 : 0.9,
                ease: [0.22, 1, 0.36, 1]
            }}
        >
            {children}
        </m.div>
    );
}

// --- BUTTONS (Premium Micro-Interactions) ---
/**
 * HeroCTA - Individual button with hover lift + glow
 * Uses CSS transforms for 60fps performance
 * Uses native anchors for proper link semantics
 */
function HeroCTA({
    children,
    variant = "primary",
    href = "#contact"
}: {
    children: React.ReactNode;
    variant?: "primary" | "secondary";
    href?: string;
}) {
    const prefersReducedMotion = useReducedMotion();

    if (variant === "primary") {
        return (
            <m.a
                href={href}
                className="relative group inline-flex items-center justify-center"
                whileHover={prefersReducedMotion ? {} : { y: -2 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
                {/* Animated glow backdrop */}
                <m.div
                    className="absolute -inset-1 bg-gradient-to-r from-[hsl(var(--primary))] via-amber-500 to-[hsl(var(--primary))] rounded-full blur-md pointer-events-none"
                    initial={{ opacity: 0.4 }}
                    whileHover={{ opacity: 0.8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                />
                <span className="relative h-12 px-8 text-base bg-black text-white hover:bg-black/90 border border-white/10 overflow-hidden shadow-2xl rounded-full inline-flex items-center justify-center font-medium">
                    <span className="relative z-10 flex items-center">
                        {children}
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    {/* Shine sweep effect */}
                    <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
                </span>
            </m.a>
        );
    }

    return (
        <m.a
            href={href}
            className="inline-flex items-center justify-center h-12 px-8 text-base text-white border border-white/20 hover:bg-white/10 hover:border-white/40 backdrop-blur-md transition-all duration-300 rounded-full font-medium"
            whileHover={prefersReducedMotion ? {} : { y: -2 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
            {children}
        </m.a>
    );
}

export function HeroActions() {
    const prefersReducedMotion = useReducedMotion();

    return (
        <m.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: prefersReducedMotion ? 0 : 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-6 items-start"
        >
            <HeroCTA variant="primary" href="#contact">
                Book a Consultation
            </HeroCTA>

            <HeroCTA variant="secondary" href="#projects">
                View Projects
            </HeroCTA>
        </m.div>
    )
}

// --- ANIMATED STATS (Performance Optimized) ---
/**
 * Counter Component - Performance Engineering Requirements:
 * 1. Zero CLS: Uses min-width based on final value character count
 * 2. prefers-reduced-motion: Respects user accessibility preferences
 * 3. Viewport-triggered: Only animates when entering viewport (useInView)
 * 4. Efficient: Uses Framer Motion's useMotionValue + animate (no heavy libs)
 */
function Counter({
    value,
    prefix = "",
    suffix = "",
    duration = 2
}: {
    value: number;
    prefix?: string;
    suffix?: string;
    duration?: number;
}) {
    const nodeRef = useRef<HTMLSpanElement>(null);
    const inView = useInView(nodeRef, { once: true, margin: "-50px" });
    const motionValue = useMotionValue(0);
    const [hasAnimated, setHasAnimated] = useState(false);

    // Respect prefers-reduced-motion
    const prefersReducedMotion = useReducedMotion();

    // Calculate min-width to prevent CLS (ch unit = width of "0" character)
    const finalText = `${prefix}${value}${suffix}`;
    const minWidth = `${finalText.length}ch`;

    useEffect(() => {
        if (!inView || hasAnimated) return;

        // If user prefers reduced motion, show final value immediately
        if (prefersReducedMotion) {
            if (nodeRef.current) {
                nodeRef.current.textContent = finalText;
            }
            setHasAnimated(true);
            return;
        }

        // Animate using Framer Motion's performant animate function
        const controls = animate(motionValue, value, {
            duration: duration,
            ease: [0.22, 1, 0.36, 1], // Custom easeOutExpo for premium feel
            onUpdate: (latest) => {
                if (nodeRef.current) {
                    nodeRef.current.textContent = `${prefix}${Math.round(latest)}${suffix}`;
                }
            },
            onComplete: () => setHasAnimated(true)
        });

        return () => controls.stop();
    }, [inView, hasAnimated, prefersReducedMotion, motionValue, value, duration, prefix, suffix, finalText]);

    // Render final value initially to prevent CLS, CSS will handle the visual
    return (
        <span
            ref={nodeRef}
            className="stat-value tabular-nums"
            style={{
                minWidth,
                display: "inline-block",
                // Start at 0 visually but reserve space for final value
            }}
            aria-label={finalText}
        >
            {prefersReducedMotion ? finalText : `${prefix}0${suffix}`}
        </span>
    );
}

export function HeroFacts({ children }: { children: React.ReactNode }) {
    const prefersReducedMotion = useReducedMotion();
    
    return (
        <m.div
            initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
                duration: prefersReducedMotion ? 0 : 0.8,
                delay: prefersReducedMotion ? 0 : 1.2,
                ease: "easeOut"
            }}
            className="hidden md:block"
        >
            {children}
        </m.div>
    )
}

// Expose Counter for usage in index
export { Counter };

// --- SCROLL CUE ---
export function HeroScrollCue() {
    const prefersReducedMotion = useReducedMotion();
    
    return (
        <m.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                delay: prefersReducedMotion ? 0 : 2,
                duration: prefersReducedMotion ? 0 : 1
            }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
        >
            <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
            <m.div
                animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
                transition={prefersReducedMotion ? {} : { duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
                <ChevronDown className="w-4 h-4" />
            </m.div>
        </m.div>
    )
}
