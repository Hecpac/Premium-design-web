"use client";

import { useState } from "react";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

// ============================================================================
// TYPES
// ============================================================================

export type WorkCategory = "Residences" | "Estates" | "Interiors";

export interface WorkItem {
    id: string;
    title: string;
    category: WorkCategory;
    location: string;
    image: string;
    year: string;
    slug?: string;
    featured?: boolean; // First item will be large
}

interface SelectedWorksClientProps {
    items: WorkItem[];
}

// ============================================================================
// CONSTANTS
// ============================================================================

const FILTERS: Array<"All" | WorkCategory> = ["All", "Residences", "Estates", "Interiors"];

// Card animation variants
const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
    },
    exit: {
        opacity: 0,
        scale: 0.96,
        transition: { duration: 0.3 }
    }
};

// ============================================================================
// FILTER CHIP COMPONENT
// ============================================================================

function FilterChip({
    label,
    isActive,
    onClick
}: {
    label: string;
    isActive: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "px-5 py-2 rounded-full text-xs uppercase tracking-[0.15em] font-medium",
                "transition-all duration-300 border",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
                isActive
                    ? "bg-white text-black border-white shadow-lg shadow-white/10"
                    : "bg-transparent text-zinc-400 border-white/10 hover:border-white/30 hover:text-white"
            )}
            aria-pressed={isActive}
        >
            {label}
        </button>
    );
}

// ============================================================================
// WORK CARD COMPONENT (Editorial Style)
// ============================================================================

function WorkCard({
    item,
    isFeatured,
    index
}: {
    item: WorkItem;
    isFeatured: boolean;
    index: number;
}) {
    const prefersReducedMotion = useReducedMotion();
    const href = item.slug ? `/projects/${item.slug}` : "#";

    return (
        <m.article
            layout
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ delay: index * 0.08 }}
            className={cn(
                "relative group",
                isFeatured ? "md:col-span-2 md:row-span-2" : "md:col-span-1"
            )}
        >
            <Link href={href} className="block">
                {/* Image Container with Editorial Aspect Ratios */}
                <div
                    className={cn(
                        "relative w-full overflow-hidden rounded-sm bg-zinc-900",
                        isFeatured
                            ? "aspect-[16/10] md:aspect-[16/9]"
                            : "aspect-[4/3]"
                    )}
                >
                    <Image
                        src={item.image}
                        alt={`${item.title} - ${item.category} in ${item.location}`}
                        fill
                        loading="lazy"
                        className={cn(
                            "object-cover transition-transform duration-700 ease-out",
                            !prefersReducedMotion && "group-hover:scale-[1.03]"
                        )}
                        sizes={isFeatured
                            ? "(max-width: 768px) 100vw, 66vw"
                            : "(max-width: 768px) 100vw, 33vw"
                        }
                    />

                    {/* Overlay Gradient - Intensifies on hover */}
                    <div
                        className={cn(
                            "absolute inset-0 transition-all duration-500",
                            "bg-gradient-to-t from-black/70 via-black/20 to-transparent",
                            "group-hover:from-black/80 group-hover:via-black/30"
                        )}
                    />

                    {/* Floating Arrow Icon */}
                    <div
                        className={cn(
                            "absolute top-4 right-4 md:top-6 md:right-6",
                            "w-10 h-10 rounded-full",
                            "bg-white/10 backdrop-blur-md border border-white/20",
                            "flex items-center justify-center",
                            "opacity-0 translate-y-2",
                            "group-hover:opacity-100 group-hover:translate-y-0",
                            "transition-all duration-300"
                        )}
                    >
                        <ArrowUpRight className="text-white w-4 h-4" />
                    </div>

                    {/* Bottom Content Overlay (Only for featured) */}
                    {isFeatured && (
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                            <div
                                className={cn(
                                    "transition-transform duration-300",
                                    !prefersReducedMotion && "group-hover:-translate-y-1.5"
                                )}
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-label text-[hsl(var(--primary))]">
                                        {item.category}
                                    </span>
                                    <span className="w-1 h-1 rounded-full bg-zinc-500" />
                                    <span className="text-label text-zinc-400">
                                        {item.location}
                                    </span>
                                    <span className="w-1 h-1 rounded-full bg-zinc-500" />
                                    <span className="text-numeral text-xs text-zinc-500">
                                        {item.year}
                                    </span>
                                </div>
                                <h3 className="font-[family-name:var(--font-playfair)] text-3xl md:text-5xl text-white mb-4">
                                    {item.title}
                                </h3>
                                <span className="inline-flex items-center gap-2 text-sm text-white/80 group-hover:text-white transition-colors">
                                    View Case Study
                                    <ArrowUpRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Info Block (For non-featured cards) */}
                {!isFeatured && (
                    <div className="mt-5 px-1">
                        <div
                            className={cn(
                                "transition-transform duration-300",
                                !prefersReducedMotion && "group-hover:-translate-y-1.5"
                            )}
                        >
                            {/* Meta line */}
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <span className="text-xs font-mono text-[hsl(var(--primary))] uppercase tracking-widest">
                                    {item.category}
                                </span>
                                <span className="text-zinc-600">·</span>
                                <span className="text-xs text-zinc-500">
                                    {item.location}
                                </span>
                                <span className="text-zinc-600">·</span>
                                <span className="text-numeral text-xs text-zinc-600">
                                    {item.year}
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className="font-[family-name:var(--font-playfair)] text-xl md:text-2xl text-white group-hover:text-zinc-200 transition-colors mb-3">
                                {item.title}
                            </h3>

                            {/* CTA */}
                            <span className="inline-flex items-center gap-1.5 text-xs text-zinc-400 group-hover:text-white transition-colors uppercase tracking-widest">
                                View Case Study
                                <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </span>
                        </div>
                    </div>
                )}
            </Link>
        </m.article>
    );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function SelectedWorksClient({ items }: SelectedWorksClientProps) {
    const [activeFilter, setActiveFilter] = useState<"All" | WorkCategory>("All");

    // Filter logic - in-memory filtering
    const filteredItems = activeFilter === "All"
        ? items
        : items.filter(item => item.category === activeFilter);

    // Determine featured item (first item with featured flag, or first item in "All" view)
    const getFeaturedIndex = () => {
        if (activeFilter !== "All") return -1; // No featured in filtered view
        const featuredIdx = filteredItems.findIndex(item => item.featured);
        return featuredIdx >= 0 ? featuredIdx : 0;
    };

    const featuredIndex = getFeaturedIndex();

    return (
        <section
            className="py-24 md:py-32 w-full relative"
            id="projects"
            aria-label="Selected Works Portfolio"
        >
            <div className="max-w-[1400px] mx-auto px-6">
                {/* Header & Filters */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
                    <div>
                        <span className="text-label text-[hsl(var(--primary))] mb-4 block">
                            Portfolio
                        </span>
                        <h2 className="text-white mb-8">
                            Selected{" "}
                            <span className="text-[hsl(var(--primary))] italic">Works</span>
                        </h2>

                        {/* Filter Chips */}
                        <div className="flex flex-wrap gap-3" role="group" aria-label="Filter projects by category">
                            {FILTERS.map((filter) => (
                                <FilterChip
                                    key={filter}
                                    label={filter}
                                    isActive={activeFilter === filter}
                                    onClick={() => setActiveFilter(filter)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Year Range Badge */}
                    <div className="text-right hidden lg:block">
                        <span className="text-numeral block text-zinc-600 mb-1">
                            (2024 — 2026)
                        </span>
                        <span className="text-label block text-[hsl(var(--primary))]">
                            FEATURED PORTFOLIO
                        </span>
                    </div>
                </div>

                {/* Editorial Grid Layout */}
                <m.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((item, index) => (
                            <WorkCard
                                key={item.id}
                                item={item}
                                isFeatured={index === featuredIndex}
                                index={index}
                            />
                        ))}
                    </AnimatePresence>
                </m.div>

                {/* Empty State */}
                {filteredItems.length === 0 && (
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-24 text-center"
                    >
                        <p className="text-zinc-500 text-lg">
                            No projects found in {activeFilter}.
                        </p>
                        <button
                            onClick={() => setActiveFilter("All")}
                            className="mt-4 text-[hsl(var(--primary))] hover:underline"
                        >
                            View all projects
                        </button>
                    </m.div>
                )}

                {/* View All CTA */}
                {filteredItems.length > 0 && (
                    <div className="mt-16 text-center">
                        <div className="thin-rule max-w-md mx-auto mb-8 opacity-30" />
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group"
                        >
                            <span className="text-sm uppercase tracking-widest">
                                View Complete Portfolio
                            </span>
                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
