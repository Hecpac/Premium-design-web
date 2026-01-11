"use client";

import React from "react";
import Image from "next/image";
import { IMAGES } from "@/lib/image-data";

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
    isLast?: boolean;
}

function ProcessStep({ step, isLast }: ProcessStepProps) {
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
                    <div className="relative aspect-[16/9] w-full bg-[#0a0a0a] border border-neutral-800 overflow-hidden group/image">

                        {/* Image */}
                        <Image
                            src={step.imageSrc}
                            alt={step.imageAlt}
                            fill
                            className="object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />

                        {/* Tech Overlays / Reticle (Decorative) */}
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[#ededed]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

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

export function TechnicalProcessTimeline({ steps = DEFAULT_STEPS }: TechnicalProcessTimelineProps) {
    return (
        <section className="w-full bg-[#0a0a0a] text-[#ededed]">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full">
                {/* Optional Header if needed, but component focuses on the timeline list */}

                <div className="flex flex-col w-full">
                    {steps.map((step, index) => (
                        <ProcessStep
                            key={step.id}
                            step={step}
                            isLast={index === steps.length - 1}
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
