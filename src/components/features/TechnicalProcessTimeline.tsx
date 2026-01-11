"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";

import { IMAGES } from "@/lib/image-data";
import { cn } from "@/lib/utils";

// ============================================================================
// TYPES
// ============================================================================

export interface ProcessStepData {
    id: string; // "01", "02"
    title: string;
    description: string;
    imageSrc: string; // string path
    imageAlt: string;
}

// ============================================================================
// SUB-COMPONENT: PROCESS STEP
// ============================================================================

interface ProcessStepProps {
    step: ProcessStepData;
    isMobile: boolean;
}

function ProcessStep({ step, isMobile }: ProcessStepProps) {
    const viewportRef = useRef<HTMLDivElement | null>(null);

    // Trigger when ~50% of the image is visible. Margin biases the hit-zone toward the center of the viewport.
    const isInView = useInView(viewportRef, {
        amount: 0.5,
        margin: "-25% 0px -25% 0px",
        once: false,
    });

    const isActive = isMobile && isInView;

    return (
        <div className="group relative w-full">
            {/* Horizontal Divider (Tech Line) */}
            <div className="w-full h-px bg-neutral-800" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-16 lg:py-24 items-center">

                {/* LEFT COLUMN: Text Content */}
                <div className="lg:col-span-5 flex flex-col justify-center">
                    {/* Index Number */}
                    <span className="block font-mono text-6xl md:text-8xl text-neutral-800 mb-6 lg:mb-8 font-light tracking-tighter select-none transition-colors duration-500 group-hover:text-neutral-600">
                        {step.id}
                    </span>

                    {/* Title */}
                    <h3 className="font-sans text-2xl md:text-3xl font-bold uppercase tracking-widest text-[#ededed] mb-4">
                        {step.title}
                    </h3>

                    {/* Description */}
                    <p className="font-sans text-lg text-neutral-400 font-light leading-relaxed max-w-md text-balance">
                        {step.description}
                    </p>
                </div>

                {/* RIGHT COLUMN: Technical Viewport Image */}
                <div className="lg:col-span-7 relative">
                    {/* Viewport Container */}
                    <div
                        ref={viewportRef}
                        className={cn(
                            "relative aspect-[16/9] w-full bg-[#0a0a0a] border border-neutral-800 overflow-hidden group/image",
                            // Subtle "lit" frame on mobile when the step is in view.
                            isActive && "border-white/20"
                        )}
                    >

                        {/* Image */}
                        <Image
                            src={step.imageSrc}
                            alt={step.imageAlt}
                            fill
                            className={cn(
                                "object-cover grayscale transition-all duration-700 ease-out will-change-transform",
                                // Desktop hover stays intact
                                "group-hover:grayscale-0 group-hover:scale-105",
                                // Mobile: activate on scroll (no hover)
                                isActive && "grayscale-0 brightness-110 scale-105"
                            )}
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />

                        {/* Tech Overlays / Reticle (Decorative) */}
                        <div
                            className={cn(
                                "absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[#ededed]/20 to-transparent",
                                "opacity-0 transition-opacity duration-700",
                                "group-hover:opacity-100",
                                isActive && "opacity-100"
                            )}
                        />

                        {/* Optional: a faint scan wash when active on mobile */}
                        <div
                            aria-hidden="true"
                            className={cn(
                                "absolute inset-0 pointer-events-none",
                                "bg-gradient-to-b from-white/0 via-white/5 to-transparent",
                                "opacity-0 transition-opacity duration-500",
                                isActive && "opacity-100"
                            )}
                        />

                        {/* Top-Left Corner Marker */}
                        <div className="absolute top-4 left-4 w-4 h-4 border-l border-t border-[#ededed]/30" />
                        {/* Bottom-Right Corner Marker */}
                        <div className="absolute bottom-4 right-4 w-4 h-4 border-r border-b border-[#ededed]/30" />

                        {/* Technical Label */}
                        <div className="absolute top-4 right-4 font-mono text-[10px] text-[#ededed]/40 uppercase tracking-widest">
                            IMG_REF_{step.id}_RAW
                        </div>
                    </div>
                </div>

            </div>

            {/* Closing Divider for the last item if needed, but usually we just want dividers between.
           The prompt said "Each step should be separated by a full-width horizontal divider".
           Common pattern is top-divider for all.
       */}
        </div>
    );
}

// ============================================================================
// MAIN COMPONENT: TECHNICAL PROCESS TIMELINE
// ============================================================================

interface TechnicalProcessTimelineProps {
    steps?: ProcessStepData[];
}

function useIsMobile(): boolean {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // "Mobile" here means "no reliable hover" (touch / coarse pointer), which is
        // exactly when we need scroll-triggered activation.
        const mq = window.matchMedia("(hover: none), (pointer: coarse), (max-width: 767px)");

        const update = () => setIsMobile(mq.matches);
        update();

        // Safari < 14 fallback
        if (typeof mq.addEventListener === "function") {
            mq.addEventListener("change", update);
            return () => mq.removeEventListener("change", update);
        }

        mq.addListener(update);
        return () => mq.removeListener(update);
    }, []);

    return isMobile;
}

export function TechnicalProcessTimeline({ steps = DEFAULT_STEPS }: TechnicalProcessTimelineProps) {
    const isMobile = useIsMobile();

    return (
        <section className="w-full bg-[#0a0a0a] text-[#ededed]">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full">
                {/* Optional Header if needed, but component focuses on the timeline list */}

                <div className="flex flex-col w-full">
                    {steps.map((step) => (
                        <ProcessStep
                            key={step.id}
                            step={step}
                            isMobile={isMobile}
                        />
                    ))}
                    {/* Final Divider at the bottom */}
                    <div className="w-full h-px bg-neutral-800" />
                </div>

            </div>
        </section>
    );
}

// ============================================================================
// MOCK DATA
// ============================================================================

// Using images from shared lib, falling back to specific ones or reusing available ones.
// I'll reuse the 'bento' and 'selected works' images as placeholders which fit the "construction/arch" theme.

const DEFAULT_STEPS: ProcessStepData[] = [
    {
        id: "01",
        title: "FEASIBILITY & PERMITS",
        description: "Zoning analysis, soil testing, and regulatory navigation. We de-risk the project before drawing a single line.",
        imageSrc: IMAGES.bentoBlueprints.src, // Fits "Permits/Planning"
        imageAlt: "Detailed site plans and zoning analysis documents",
    },
    {
        id: "02",
        title: "ENGINEERING & BIM",
        description: "Full structural modeling and MEP integration. We build the house digitally first to eliminate conflicts.",
        imageSrc: IMAGES.bentoConcrete.src, // Fits "Engineering/Structure"
        imageAlt: "3D BIM structural model and engineering schematics",
    },
    {
        id: "03",
        title: "PRECISION CONSTRUCTION",
        description: "Execution by master trades under strict supervision. Daily logs and real-time budget tracking.",
        imageSrc: "/images/selected-works/residence-preston-hollow.webp", // Fits "Construction"
        imageAlt: "Construction site with steel framework and concrete foundation"
    },
    {
        id: "04",
        title: "COMMISSIONING",
        description: "Systems testing, calibration, and white-glove handover. Your asset is delivered fully operational.",
        imageSrc: IMAGES.bentoThermostat.src, // Fits "Systems/Commissioning"
        imageAlt: "Smart home system control panel and final inspection"
    }
];
