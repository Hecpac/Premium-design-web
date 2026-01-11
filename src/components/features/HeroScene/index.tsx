import {
    HeroAnimator,
    HeroTitle,
    HeroSubtitle,
    HeroActions,
    HeroFacts,
    TitleWord,
    HeroScrollCue
} from "./HeroAnimations";
import { StatsCounterClient } from "@/components/features/StatsCounterClient";
import { FloorPlanOverlay } from "@/components/features/FloorPlanOverlay";
import { Hero3DGate } from "./Hero3DGate";
import { CinematicAerial } from "./CinematicAerial";

/**
 * HeroScene Component
 *
 * Agentrules v2.0.0 Regla #1 Compliance:
 * - WebP format for hero image (83% size reduction)
 * - priority={true} for LCP optimization
 * - Explicit width/height to prevent CLS
 * - sizes="100vw" for full-viewport hero
 * - placeholder="blur" with blurDataURL for perceived performance
 * - quality={85} as per Agentrules specification
 * - Descriptive alt text (15+ words) for accessibility and SEO
 */
export function HeroScene() {
    return (
        <div className="relative min-h-[95vh] flex flex-col justify-center overflow-hidden w-full">
            {/*
             * CRITICAL LCP ELEMENT: Background Image
             * - priority={true}: Preloads immediately, bypasses lazy loading
             * - WebP format: 133KB vs 786KB PNG (83% savings)
             * - blurDataURL: Shows low-res placeholder while loading
             */}
            <HeroAnimator className="absolute inset-0 z-0 select-none pointer-events-none w-full h-full">
                <div className="relative w-full h-full">
                    <CinematicAerial />
                    {/* Architectural Layer */}
                    <FloorPlanOverlay opacity={0.06} />
                    {/* Cinematic 3D Layer (deferred + capability-gated) */}
                    <Hero3DGate />
                </div>
            </HeroAnimator>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center mt-20">
                {/* Content Left (Col 8) */}
                <div className="md:col-span-8 text-left">
                    <HeroTitle>
                        <h1
                            id="hero-title"
                            className="text-balance text-white mb-8 font-[family-name:var(--font-playfair)] text-7xl md:text-9xl tracking-[-0.05em] leading-[1.1] drop-shadow-2xl"
                        >
                            <TitleWord>Luxury</TitleWord> <TitleWord>Meets</TitleWord>
                            <br />
                            <span className="text-[hsl(var(--primary))] italic">
                                <TitleWord>Meaning.</TitleWord>
                            </span>
                        </h1>
                    </HeroTitle>

                    <HeroSubtitle>
                        <p className="max-w-xl text-zinc-200 text-lg md:text-xl font-light mb-12 tracking-wide leading-relaxed drop-shadow-md">
                            Premium architectural design in Dallas and Las Colinas.
                            <br className="hidden md:block" />
                            Radical transparency and advanced construction technology.
                        </p>
                    </HeroSubtitle>

                    <HeroActions />
                </div>

                {/* Facts Card Right (Col 4) */}
                <div className="md:col-span-4 flex justify-end">
                    <HeroFacts>
                        <div className="editorial-card min-w-[300px]">
                            <div className="space-y-8">
                                <div className="stat-block">
                                    <StatsCounterClient value={12} />
                                    <span className="stat-label">Months Avg. Build Time</span>
                                </div>
                                <div className="thin-rule border-white/20" />
                                <div className="stat-block">
                                    <StatsCounterClient value={25} prefix="$" suffix="M+" />
                                    <span className="stat-label">Portfolio Value</span>
                                </div>
                            </div>
                        </div>
                    </HeroFacts>
                </div>
            </div>

            <HeroScrollCue />
        </div>
    );
}
