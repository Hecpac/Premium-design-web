import { Navbar, BentoCard, BackToTop } from "@/components/ui";
import { HeroScene } from "@/components/features/HeroScene";
import { FAQSection } from "@/components/features/FAQSection";
import { TrustSignalSection } from "@/components/features/TrustSignalSection";
import { ContactCapture } from "@/components/features/ContactCapture";
import { InsightBrief } from "@/components/features/InsightBrief";
import Image from "next/image";
import { IMAGES } from "@/lib/image-data";

import { SelectedWorks } from "@/components/features/SelectedWorks";

export default function Home() {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))] selection:bg-[hsl(var(--primary))/0.3]">
      <Navbar brandName="Premium Home" />

      <main id="main-content" className="px-0 relative">
        {/* 1. HERO - Definition */}
        <header aria-labelledby="hero-title">
          <HeroScene />
        </header>

        {/* 2. PROOF (Trust Signals) */}
        <TrustSignalSection />

        <div className="max-w-[1400px] mx-auto px-6">

          {/* 3. METHOD (Bento Grid) - Inline for simplicity or component */}
          <section
            id="process"
            className="section-spacing"
            aria-labelledby="process-heading"
          >
            <div className="mb-20 grid md:grid-cols-12 gap-6 items-end">
              <div className="md:col-span-8">
                <span className="text-label mb-4 block">Our Philosophy</span>
                <h2 id="process-heading" className="text-white">
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

            {/* Bento Grid - Agentrules #1: WebP images with blur placeholders */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[400px] md:auto-rows-[500px]">
              {/* Card 01 - Engineering */}
              <BentoCard className="md:col-span-8 relative group">
                <Image
                  src={IMAGES.bentoConcrete.src}
                  alt="Raw concrete texture showing premium construction materials and craftsmanship details in luxury home building"
                  fill
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-60"
                  sizes="(max-width: 768px) 100vw, 66vw"
                  placeholder="blur"
                  blurDataURL={IMAGES.bentoConcrete.blurDataURL}
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
                      Raw concrete reinforced with brushed bronze. The unshakeable foundation.
                    </p>
                  </div>
                </div>
              </BentoCard>

              {/* Stacked Right Column */}
              <div className="md:col-span-4 flex flex-col gap-6 h-full">
                {/* Card 02 - Planning */}
                <BentoCard className="flex-1 relative min-h-[240px] group">
                  <Image
                    src={IMAGES.bentoBlueprints.src}
                    alt="Detailed architectural blueprints and construction planning documents for custom luxury home design"
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105 opacity-60 group-hover:opacity-40"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    placeholder="blur"
                    blurDataURL={IMAGES.bentoBlueprints.blurDataURL}
                  />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                    <span className="text-label text-[hsl(var(--primary))] mb-2">02 — Planning</span>
                    <h3 className="text-2xl text-white mb-2">Architectural Void</h3>
                  </div>
                </BentoCard>

                {/* Card 03 - Systems */}
                <BentoCard className="flex-1 relative min-h-[240px] group">
                  <div className="absolute inset-0 bg-neutral-900 z-0" />
                  <Image
                    src={IMAGES.bentoThermostat.src}
                    alt="Smart home thermostat and automation interface showcasing integrated technology systems in modern luxury homes"
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105 opacity-80 mix-blend-overlay"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    placeholder="blur"
                    blurDataURL={IMAGES.bentoThermostat.blurDataURL}
                  />
                  <div className="absolute inset-0 p-6 flex flex-col z-10">
                    <div className="flex justify-between items-start mb-auto">
                      <span className="text-label text-white/50">03 — Systems</span>
                    </div>
                    <div className="text-right">
                      <h3 className="text-2xl text-white mb-1">Invisible Tech</h3>
                    </div>
                  </div>
                </BentoCard>
              </div>
            </div>
          </section>

        </div>

        {/* 4. EVIDENCE (Gallery) */}
        <SelectedWorks />

        {/* PARALLAX BREAK - Panoramic Monumental Section */}
        <section
          className="relative w-full aspect-[28/9] md:aspect-[32/9] min-h-[320px] md:min-h-[420px] max-h-[560px] overflow-hidden my-20"
          aria-labelledby="monumental-heading"
        >
          <Image
            src="/dallas-aerial.png"
            alt="Panoramic aerial view of Dallas skyline at twilight featuring modern architecture and urban luxury context"
            fill
            className="object-cover object-[center_45%]"
            sizes="100vw"
            quality={90}
            loading="lazy"
          />
          {/* Premium gradient overlay for maximum text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h2
              id="monumental-heading"
              className="font-[family-name:var(--font-playfair)] text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-[0.22em] sm:tracking-[0.28em] lg:tracking-[0.4em] uppercase text-center drop-shadow-[0_4px_32px_rgba(0,0,0,0.8)]"
              style={{ textShadow: '0 4px 24px rgba(0,0,0,0.6), 0 8px 48px rgba(0,0,0,0.4)' }}
            >
              Monumental
            </h2>
          </div>
        </section>

        {/* 5. AUTHORITY (Insights) */}
        <InsightBrief />

        {/* 6. AEO (FAQ) */}
        <FAQSection />

        {/* 7. ACTION (Contact) */}
        <ContactCapture />

        <footer className="py-20 text-center text-zinc-600 text-sm">
          <div className="thin-rule max-w-xs mx-auto mb-8 opacity-50" />
          <p>© 2026 Premium Home Design. Dallas, TX.</p>
          <p className="mt-2 text-[11px] text-zinc-700 tracking-widest uppercase">
            Concept demo — not a real business.
          </p>
        </footer>
      </main>

      {/* Back to Top Button */}
      <BackToTop threshold={400} />
    </div>
  );
}
