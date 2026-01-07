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
    const [activeProject, setActiveProject] = useState<Project | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const lastMouseEvent = useRef<number>(0);

    // 1. Motion Values for high-freq updates (Zero React Re-renders)
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // 2. Spring Physics for "Magnetic" feel (INP compliant)
    const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        // 3. Accessibility & Device Guard
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

        // 4. RAF Throttle (Optional but guaranteed 60fps cap)
        // Helps main thread breathe if events fire profusely (e.g. high-pollrate mouse)
        const now = performance.now();
        if (now - lastMouseEvent.current < 8) return; // ~120fps cap
        lastMouseEvent.current = now;

        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            // Center the 400x300 image relative to cursor
            x.set(e.clientX - rect.left - 200);
            y.set(e.clientY - rect.top - 150);
        }
    };

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative w-full py-20 overflow-hidden"
            aria-label="Selected Projects"
        >
            <div className="max-w-7xl mx-auto px-6">
                <header className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-end gap-6">
                    <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl text-white">
                        Selected Works
                    </h2>
                    <div className="hidden md:block text-label text-right">
                        (2024 — 2026) <br />
                        FEATURED PORTFOLIO
                    </div>
                </header>

                <div className="flex flex-col">
                    {projects.map((project) => (
                        <m.article
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group relative border-t border-white/10 py-8 md:py-16 cursor-none focus-within:bg-white/5 transition-colors duration-500"
                            onMouseEnter={() => !isDisabled && setActiveProject(project)}
                            onMouseLeave={() => setActiveProject(null)}
                            onFocus={() => setActiveProject(project)}
                            tabIndex={0}
                        >
                            {/* Mobile: Image Visual Stack */}
                            <div className="md:hidden w-full aspect-[4/3] relative mb-6 rounded-sm overflow-hidden bg-white/5">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 0px"
                                />
                            </div>

                            {/* Content Row */}
                            <div className="flex flex-col md:flex-row items-baseline justify-between gap-4 relative z-10 pointer-events-none">
                                <span className="text-label text-[hsl(var(--primary))] font-mono">
                                    {project.id}
                                </span>

                                <h3 className="flex-1 font-[family-name:var(--font-playfair)] text-3xl md:text-5xl text-white group-hover:text-[hsl(var(--primary))] transition-colors duration-300">
                                    {project.title}
                                </h3>

                                <div className="flex items-center gap-4">
                                    <span className="text-zinc-500 font-light text-sm md:text-base uppercase tracking-wider group-hover:text-white transition-colors">
                                        {project.category}
                                    </span>
                                    <ArrowUpRight className="hidden md:block text-[hsl(var(--primary))] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 w-6 h-6" />
                                </div>
                            </div>
                        </m.article>
                    ))}
                    <div className="border-t border-white/10" />
                </div>
            </div>

            {/* Desktop: Magnetic Floating Preview */}
            {!isDisabled && (
                <AnimatePresence>
                    {activeProject && (
                        <m.div
                            layoutId="gallery-preview" // Shared layout ID for smooth Morph transitions between items? No, simple fade is safer here.
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.15 } }}
                            style={{ x: springX, y: springY }}
                            transition={{ type: "spring", stiffness: 150, damping: 20 }} // Spring for enter/exit? No, just opacity.
                            className="pointer-events-none fixed top-0 left-0 z-50 w-[400px] h-[300px] hidden md:block rounded-lg overflow-hidden shadow-2xl border border-white/20 bg-black"
                        >
                            <Image
                                src={activeProject.image}
                                alt=""
                                fill
                                className="object-cover"
                                sizes="400px"
                                priority
                            />
                            {/* Overlay for integration */}
                            <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
                        </m.div>
                    )}
                </AnimatePresence>
            )}
        </section>
    );
}
