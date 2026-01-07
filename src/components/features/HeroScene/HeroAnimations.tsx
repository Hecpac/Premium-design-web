"use client";

import { m, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroAnimator({ children, className }: { children: React.ReactNode; className?: string }) {
    const ref = useRef(null);
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, 400]);
    const opacity = useTransform(scrollY, [0, 500], [1, 0]);

    // Removed local LazyMotion as it's now global
    return (
        <m.div
            ref={ref}
            style={{ y, opacity }}
            className={className}
        >
            {children}
        </m.div>
    );
}

export function HeroTitle({ children }: { children: React.ReactNode }) {
    return (
        <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </m.div>
    );
}

export function HeroSubtitle({ children }: { children: React.ReactNode }) {
    return (
        <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
            {children}
        </m.div>
    );
}

export function HeroActions() {
    return (
        <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 items-start"
        >
            {/* Shining Border Button */}
            <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--primary))] to-blue-600 rounded-full opacity-60 blur-sm group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <Button
                    size="lg"
                    className="relative px-8 text-base bg-black text-white hover:bg-black/90 border border-white/10"
                >
                    Book a Consultation
                    <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
            </div>

            <Button variant="outline" size="lg" className="px-8 text-base text-white border-white/20 hover:bg-white/10 backdrop-blur-md">
                View Projects
            </Button>
        </m.div>
    )
}

export function HeroFacts({ children }: { children: React.ReactNode }) {
    return (
        <m.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="hidden md:block" // Hidden on mobile for simplicity, or stack it
        >
            {children}
        </m.div>
    )
}
