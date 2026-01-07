import Image from "next/image";
import {
    HeroAnimator,
    HeroTitle,
    HeroSubtitle,
    HeroActions,
    HeroFacts,
    Counter,
    TitleWord,
    HeroScrollCue
} from "./HeroAnimations";
import { FloorPlanOverlay } from "@/components/features/FloorPlanOverlay";

export function HeroScene() {
    return (
        <div className="relative min-h-[95vh] flex flex-col justify-center overflow-hidden w-full">
            {/* 
        CRITICAL LCP ELEMENT: Background Image
        - Priority: Preloads immediately.
      */}
            <HeroAnimator className="absolute inset-0 z-0 select-none pointer-events-none w-full h-full">
                <div className="relative w-full h-full">
                    <Image
                        src="/images/hero-twilight.png"
                        alt="Luxury Villa Twilight - Architectural Design in Dallas"
                        fill
                        priority
                        quality={90}
                        className="object-cover"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />
                    {/* Architectural Layer */}
                    <FloorPlanOverlay opacity={0.06} />
                </div>
            </HeroAnimator>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center mt-20">
                {/* Content Left (Col 8) */}
                <div className="md:col-span-8 text-left">
                    <HeroTitle>
                        <h1 className="text-balance text-white mb-8 font-[family-name:var(--font-playfair)] text-7xl md:text-9xl tracking-[-0.05em] leading-[1.1] drop-shadow-2xl">
                            <TitleWord>Luxury</TitleWord> <TitleWord>Living,</TitleWord>
                            <br />
                            <span className="text-[hsl(var(--primary))] italic">
                                <TitleWord>Redefined.</TitleWord>
                            </span>
                        </h1>
                    </HeroTitle>

                    <HeroSubtitle>
                        <p className="max-w-xl text-zinc-200 text-lg md:text-xl font-light mb-12 tracking-wide leading-relaxed drop-shadow-md">
                            Diseño arquitectónico premium en Dallas y Las Colinas.
                            <br className="hidden md:block" />
                            Transparencia radical y tecnología de construcción avanzada.
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
                                    <Counter value={18} duration={2.5} />
                                    <span className="stat-label">Months Avg. Build Time</span>
                                </div>
                                <div className="thin-rule border-white/20" />
                                <div className="stat-block">
                                    <Counter value={50} prefix="$" suffix="M+" duration={3} />
                                    <span className="stat-label">Value Delivered</span>
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
