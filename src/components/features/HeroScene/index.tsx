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
 * HeroScene Component — Web Premium 2026 Refactor
 * 
 * Design: Brutalist "ARCHFORM" inspired layout.
 * Typography: Massive scale, uppercase, bottom-anchored.
 * Motion: Spring physics, staggered reveal, non-blocking.
 * A11y: WCAG 2.2 AA compliant contrast.
 */
export function HeroScene() {
    return (
        <div className="relative min-h-[100dvh] flex flex-col justify-end w-full overflow-hidden bg-black text-white">
            
            {/* BACKGROUND LAYER (Fixed/Parallax) */}
            <HeroAnimator className="absolute inset-0 z-0 select-none pointer-events-none w-full h-full">
                <div className="relative w-full h-full">
                    <CinematicAerial />
                    <FloorPlanOverlay opacity={0.08} />
                    <Hero3DGate />
                    {/* Extra gradient for text legibility at bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
                </div>
            </HeroAnimator>

            {/* CONTENT LAYER (Bottom Anchored) */}
            <div className="relative z-10 w-full max-w-[90rem] mx-auto px-6 pb-12 md:pb-20">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    
                    {/* TYPOGRAPHY (Left) */}
                    <div className="flex-1 max-w-5xl">
                        <HeroTitle className="mb-6 md:mb-8">
                            <h1 
                                id="hero-title"
                                className="font-[family-name:var(--font-inter)] font-bold text-[clamp(3.5rem,9vw,9.5rem)] leading-[0.85] tracking-[-0.04em] uppercase text-white"
                            >
                                <div className="overflow-hidden">
                                    <TitleWord>Luxury</TitleWord>
                                    <TitleWord className="text-white/50">Meets</TitleWord>
                                </div>
                                <div className="overflow-hidden mt-2 md:mt-4">
                                    <TitleWord className="text-[hsl(var(--primary))]">Meaning.</TitleWord>
                                </div>
                            </h1>
                        </HeroTitle>

                        <HeroSubtitle className="max-w-xl">
                            <p className="text-zinc-300 text-lg md:text-xl font-light tracking-wide leading-relaxed text-balance">
                                Premium architectural design in Dallas and Las Colinas. 
                                <span className="hidden sm:inline"> Radical transparency and advanced construction technology.</span>
                            </p>
                        </HeroSubtitle>

                        <HeroActions className="mt-8 md:mt-10" />
                    </div>

                    {/* STATS (Right / Bottom) */}
                    <HeroFacts>
                         <div className="backdrop-blur-md bg-white/5 border border-white/10 p-6 md:p-8 rounded-sm min-w-[280px]">
                            <div className="space-y-6">
                                <div>
                                    <div className="flex items-baseline gap-1">
                                        <StatsCounterClient value={12} />
                                        <span className="text-sm uppercase tracking-wider text-white/50">Months</span>
                                    </div>
                                    <p className="text-xs text-white/40 uppercase tracking-widest mt-1">Avg. Build Time</p>
                                </div>
                                <div className="w-full h-px bg-white/10" />
                                <div>
                                    <div className="flex items-baseline gap-1">
                                        <StatsCounterClient value={25} prefix="$" suffix="M+" />
                                    </div>
                                    <p className="text-xs text-white/40 uppercase tracking-widest mt-1">Portfolio Value</p>
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
