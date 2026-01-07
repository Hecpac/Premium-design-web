import dynamic from "next/dynamic";
import { Navbar, BentoCard, Button } from "@/components/ui";
import { HeroScene } from "@/components/features/HeroScene";
import { ProjectGallerySkeleton } from "@/components/features/ProjectGallerySkeleton";
import { FAQSection } from "@/components/features/FAQSection";
import Image from "next/image";

// AGGRESSIVE CODE SPLITTING
const ProjectGallery = dynamic(
  () => import("@/components/features/ProjectGallery").then((mod) => mod.ProjectGallery),
  {
    loading: () => <ProjectGallerySkeleton />,
    ssr: false,
  }
);

export default function Home() {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))] selection:bg-[hsl(var(--primary))/0.3]">
      <Navbar brandName="Premium Home" />

      <main className="px-0">
        <HeroScene />

        <div className="max-w-[1400px] mx-auto px-6">
          {/* Editorial Bento Grid */}
          <section className="section-spacing">

            {/* Section Header */}
            <div className="mb-20 grid md:grid-cols-12 gap-6 items-end">
              <div className="md:col-span-8">
                <span className="text-label mb-4 block">Our Philosophy</span>
                <h2 className="text-white">
                  The <span className="text-[hsl(var(--primary))] italic">Art</span> of <br />
                  Precision.
                </h2>
              </div>
              <div className="md:col-span-4 pb-2">
                <p className="text-lead text-sm md:text-base max-w-sm ml-auto">
                  Where raw engineering meets distinct aesthetics.
                  Every detail is a deliberate design choice.
                </p>
              </div>
            </div>

            {/* Asymmetric Grid: 8 + 4 Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[400px] md:auto-rows-[500px]">

              {/* Card 01: Structure (Large Landscape) - 8 Cols */}
              <BentoCard className="md:col-span-8 relative">
                <Image
                  src="/images/bento-concrete.png"
                  alt="Raw concrete texture details"
                  fill
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-60"
                  sizes="(max-width: 768px) 100vw, 66vw"
                />
                <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between z-10">
                  <div className="flex justify-between items-start">
                    <span className="text-label text-white/80 border border-white/20 px-2 py-1 rounded-sm">01 — Engineering</span>
                    <div className="bg-white/10 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-white mb-4">The Backbone</h3>
                    <p className="text-zinc-300 max-w-md text-lg font-light leading-relaxed">
                      Raw concrete reinforced with brushed bronze. The unshakeable foundation of modern luxury living.
                    </p>
                  </div>
                </div>
              </BentoCard>

              {/* Stacked Right Column - 4 Cols */}
              <div className="md:col-span-4 flex flex-col gap-6 h-full">

                {/* Card 02: Design (Square-ish) */}
                <BentoCard className="flex-1 relative min-h-[240px]">
                  <Image
                    src="/images/bento-blueprints.png"
                    alt="Architectural blueprints"
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105 opacity-60 group-hover:opacity-40"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                    <span className="text-label text-[hsl(var(--primary))] mb-2">02 — Planning</span>
                    <h3 className="text-2xl text-white mb-2">Architectural Void</h3>
                    <p className="text-zinc-400 text-sm">Designing the negative space.</p>
                  </div>
                </BentoCard>

                {/* Card 03: Tech (Square-ish) */}
                <BentoCard className="flex-1 relative min-h-[240px]">
                  <div className="absolute inset-0 bg-neutral-900 z-0" />
                  <Image
                    src="/images/bento-thermostat.png"
                    alt="Smart home interface"
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105 opacity-80 mix-blend-overlay"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 p-6 flex flex-col z-10">
                    <div className="flex justify-between items-start mb-auto">
                      <span className="text-label text-white/50">03 — Systems</span>
                    </div>
                    <div className="text-right">
                      <h3 className="text-2xl text-white mb-1">Invisible Tech</h3>
                      <p className="text-zinc-400 text-sm">Seamless integration.</p>
                    </div>
                  </div>
                </BentoCard>

              </div>
            </div>
          </section>
        </div>

        {/* Protocol 3: Magnetic Gallery - Code Split */}
        <ProjectGallery />

        {/* Parallax Section (Transition) */}
        <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden my-20">
          <Image
            src="/images/parallax-mansion.png"
            alt="Brutalist Mansion Facade"
            fill
            className="object-cover"
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="font-[family-name:var(--font-playfair)] text-5xl md:text-8xl text-white/90 tracking-widest uppercase text-center mix-blend-overlay">
              Monumental
            </h2>
          </div>
        </section>

        <FAQSection />

        <footer className="py-20 text-center text-zinc-600 text-sm">
          <div className="thin-rule max-w-xs mx-auto mb-8 opacity-50" />
          <p>© 2026 Premium Home Design. Dallas, TX.</p>
        </footer>
      </main>
    </div>
  );
}
