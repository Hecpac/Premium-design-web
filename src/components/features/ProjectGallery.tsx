"use client";

import { useState, useRef, useEffect } from "react";
import { m, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Project {
    id: string;
    title: string;
    category: string;
    image: string;
    year: string;
}

const projects: Project[] = [
    {
        id: "01",
        title: "The Midnight Villa",
        category: "Residential",
        image: "/images/hero-twilight.png",
        year: "2025"
    },
    {
        id: "02",
        title: "Brutalist Cliff",
        category: "Architecture",
        image: "/images/parallax-mansion.png",
        year: "2024"
    },
    {
        id: "03",
        title: "Carbon & Gold",
        category: "Interior",
        image: "/images/bento-concrete.png",
        year: "2025"
    },
    {
        id: "04",
        title: "Azure Smart Home",
        category: "Technology",
        image: "/images/bento-thermostat.png",
        year: "2024"
    }
];

export function ProjectGallery() {
    // Interaction State (Low Frequency updates)
    const [activeProject, setActiveProject] = useState<Project | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Performance: Motion Values (High Frequency, No Re-render)
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Physics: Smooth spring animation
    const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    // Accessibility & Device State
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        // Detect Touch or Reduced Motion to disable expensive effects
        const checkCapabilities = () => {
            const isTouch = window.matchMedia("(pointer: coarse)").matches;
            const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            setIsDisabled(isTouch || isReduced);
        };

        checkCapabilities();
        window.addEventListener("resize", checkCapabilities);
        return () => window.removeEventListener("resize", checkCapabilities);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isDisabled) return;

        // Direct MotionValue update - Bypasses React Render Cycle
        // No need for explicit rAF as Framer Motion handles scheduling internally for motion values
        // but we ensure clean coordinate calculation.
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            x.set(e.clientX - rect.left - 200); // Center offset X (Image width / 2)
            y.set(e.clientY - rect.top - 150);  // Center offset Y (Image height / 2)
        }
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative w-full py-20 overflow-hidden"
            role="region"
            aria-label="Project Gallery"
        >
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl text-[hsl(var(--foreground))] mb-16 text-center md:text-left">
                    Selected Works
                </h2>

                <div className="flex flex-col" role="list">
                    {projects.map((project) => (
                        <m.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group relative border-t border-white/10 py-12 md:py-16 transition-colors hover:bg-white/5 cursor-none outline-none focus-within:bg-white/5"
                            onMouseEnter={() => !isDisabled && setActiveProject(project)}
                            onMouseLeave={() => setActiveProject(null)}
                            onFocus={() => setActiveProject(project)} // A11y: Show on focus
                            onBlur={() => setActiveProject(null)}
                            tabIndex={0} // Keyboard focusable
                            role="listitem"
                        >
                            <div className="flex flex-col md:flex-row items-baseline justify-between gap-4 z-10 relative pointer-events-none group-hover:pointer-events-auto">
                                <span className="text-[hsl(var(--primary))] font-mono text-sm tracking-widest">
                                    {project.id}
                                </span>

                                <h3 className="flex-1 font-[family-name:var(--font-playfair)] text-3xl md:text-5xl text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] group-focus:text-[hsl(var(--primary))] transition-colors duration-300">
                                    {project.title}
                                </h3>

                                <span className="text-zinc-500 font-light text-sm md:text-base uppercase tracking-wider group-hover:text-white transition-colors">
                                    {project.category} — {project.year}
                                </span>

                                <ArrowUpRight className="text-[hsl(var(--primary))] opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity transform group-hover:translate-x-1 group-hover:-translate-y-1 w-6 h-6" />
                            </div>
                        </m.div>
                    ))}

                    <div className="border-t border-white/10" />
                </div>
            </div>

            {/* Floating Image Portal - Only renders if not disabled */}
            {!isDisabled && (
                <AnimatePresence>
                    {activeProject && (
                        <m.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            style={{ x: springX, y: springY }} // GPU accelerated transform
                            transition={{ duration: 0.2 }} // Only for opacity/scale
                            className="pointer-events-none absolute top-0 left-0 z-50 w-[400px] h-[300px] hidden md:block rounded-lg overflow-hidden shadow-2xl border border-white/20 WillChangeTransform"
                        >
                            <Image
                                src={activeProject.image}
                                alt="" // Decorative
                                fill
                                className="object-cover"
                                sizes="400px"
                                priority // Preload as it appears on interaction
                            />
                            <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
                        </m.div>
                    )}
                </AnimatePresence>
            )}
        </div>
    );
}
