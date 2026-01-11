"use client";

import { m, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

// ============================================================================
// MOTION CONSTANTS (Spring Physics)
// ============================================================================
const SPRING_TRANSITION = {
    type: "spring" as const,
    stiffness: 100,
    damping: 20,
    mass: 1
};

const STAGGER_DELAY = 0.05;

// ============================================================================
// PARALLAX WRAPPER
// ============================================================================
export function HeroAnimator({ children, className }: { children: React.ReactNode; className?: string }) {
    const ref = useRef(null);
    const { scrollY } = useScroll();
    const prefersReducedMotion = useReducedMotion();

    // Cinematic parallax: subtle movement
    const y = useTransform(scrollY, [0, 800], [0, prefersReducedMotion ? 0 : 150]);
    const opacity = useTransform(scrollY, [0, 600], [1, 0]);

    // Smooth spring for buttery interaction, distinct from linear scroll
    const ySpring = useSpring(y, { stiffness: 60, damping: 20 });

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

// ============================================================================
// STAGGERED TITLE (Character/Word Reveal)
// ============================================================================
export function HeroTitle({ children, className }: { children: React.ReactNode; className?: string }) {
    const prefersReducedMotion = useReducedMotion();

    return (
        <m.div
            className={className}
            initial="hidden"
            animate="visible"
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: prefersReducedMotion ? 0 : 0.08,
                        delayChildren: 0.2
                    }
                }
            }}
        >
            {children}
        </m.div>
    );
}

export function TitleWord({ children, className }: { children: React.ReactNode, className?: string }) {
    // If children is a string, split it for character animations? 
    // For now, keeping word-level for cleaner DOM, but with spring physics.
    
    return (
        <m.span
            className={`inline-block mr-[0.2em] whitespace-nowrap ${className}`}
            variants={{
                hidden: { y: "100%", opacity: 0, rotateZ: 5 },
                visible: { 
                    y: 0, 
                    opacity: 1, 
                    rotateZ: 0,
                    transition: SPRING_TRANSITION 
                }
            }}
        >
            {children}
        </m.span>
    );
}

// ============================================================================
// SUBTITLE & ACTIONS
// ============================================================================
export function HeroSubtitle({ children, className }: { children: React.ReactNode; className?: string }) {
    const prefersReducedMotion = useReducedMotion();

    return (
        <m.div
            className={className}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay: prefersReducedMotion ? 0 : 0.8,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
            }}
        >
            {children}
        </m.div>
    );
}

export function HeroActions({ className }: { className?: string }) {
    const prefersReducedMotion = useReducedMotion();

    return (
        <m.div
            className={`flex flex-col sm:flex-row gap-4 items-start ${className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay: prefersReducedMotion ? 0 : 1.0,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
            }}
        >
             <HeroCTA variant="primary" href="#contact">
                Book a Visit
            </HeroCTA>
            <HeroCTA variant="secondary" href="#projects">
                View Portfolio
            </HeroCTA>
        </m.div>
    );
}

// ============================================================================
// CTA BUTTONS
// ============================================================================
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
    const isPrimary = variant === "primary";

    return (
        <m.a
            href={href}
            className={`
                relative group inline-flex items-center justify-center px-8 h-12 rounded-full font-medium text-sm tracking-wide transition-all
                ${isPrimary 
                    ? "bg-white text-black border border-transparent hover:scale-105" 
                    : "bg-transparent text-white border border-white/20 hover:bg-white/10 hover:border-white/40"}
            `}
            whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
            transition={SPRING_TRANSITION}
        >
            {children}
            {isPrimary && <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />}
        </m.a>
    );
}

// ============================================================================
// SCROLL CUE
// ============================================================================
export function HeroScrollCue() {
    const prefersReducedMotion = useReducedMotion();
    
    return (
        <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-8 right-8 z-20 flex items-center gap-3 text-white/60 hidden md:flex"
        >
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Scroll Down</span>
            <m.div
                animate={prefersReducedMotion ? {} : { y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                <ChevronDown className="w-4 h-4" />
            </m.div>
        </m.div>
    )
}

// ============================================================================
// STATS / FACTS
// ============================================================================
export function HeroFacts({ children }: { children: React.ReactNode }) {
    // Keeping it simple for now, can be expanded
    return <div className="hidden md:block absolute top-24 right-8 z-20">{children}</div>;
}
