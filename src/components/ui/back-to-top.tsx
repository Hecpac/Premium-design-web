"use client";

import * as React from "react";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * BackToTop - Botón flotante que aparece al hacer scroll
 * 
 * Features:
 * - Aparece después de scrollear 400px
 * - Smooth scroll al top
 * - Respeta prefers-reduced-motion
 * - Accesible con aria-label
 */

interface BackToTopProps {
    /** Distancia de scroll (px) antes de mostrar el botón */
    threshold?: number;
    className?: string;
}

export function BackToTop({ threshold = 400, className }: BackToTopProps) {
    const [isVisible, setIsVisible] = React.useState(false);
    const prefersReducedMotion = useReducedMotion();

    // Detectar scroll position
    React.useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsVisible(scrollY > threshold);
        };

        // Throttle scroll events para mejor performance
        let ticking = false;
        const throttledScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", throttledScroll, { passive: true });
        handleScroll(); // Check initial position

        return () => window.removeEventListener("scroll", throttledScroll);
    }, [threshold]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion ? "auto" : "smooth",
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <m.button
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    onClick={scrollToTop}
                    aria-label="Scroll to top"
                    className={cn(
                        // Positioning
                        "fixed bottom-8 right-8 z-50",
                        // Sizing
                        "w-12 h-12",
                        // Styling
                        "rounded-full",
                        "bg-white/10 backdrop-blur-md",
                        "border border-white/20",
                        // Hover state
                        "hover:bg-white/20 hover:border-white/40",
                        "hover:scale-105",
                        // Active state
                        "active:scale-95",
                        // Transitions
                        "transition-all duration-200",
                        // Flex centering
                        "flex items-center justify-center",
                        // Focus state
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
                        // Shadow
                        "shadow-lg shadow-black/20",
                        className
                    )}
                >
                    <ArrowUp className="w-5 h-5 text-white" />
                </m.button>
            )}
        </AnimatePresence>
    );
}
