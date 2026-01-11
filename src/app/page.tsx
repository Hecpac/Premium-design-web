import { BackToTop } from "@/components/ui";
import HeroSection from "@/components/HeroSection";
import SelectedWorks from "@/components/SelectedWorks";
import { InsightBrief } from "@/components/features/InsightBrief";
import { TechnicalProcessTimeline } from "@/components/features/TechnicalProcessTimeline";
import { TechnicalServiceList } from "@/components/features/TechnicalServiceList";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-[#ededed] selection:bg-white selection:text-black overflow-x-hidden">
      <main id="main-content" className="relative pt-14">
        {/* 1. HERO (keep) */}
        <HeroSection />

        {/* 2. CAPABILITIES (new) */}
        <section id="capabilities" className="relative z-10 scroll-mt-20">
          <TechnicalServiceList />
        </section>

        {/* 3. PROJECTS / PORTFOLIO (keep) */}
        <section className="relative z-10 border-t border-neutral-900">
          <SelectedWorks />
        </section>

        {/* 4. PROCESS (new) */}
        <section id="process" className="relative z-10 scroll-mt-20 bg-[#0a0a0a]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-24 md:pt-32">
            <div className="mb-16 max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-4 text-white">
                Execution Protocol
              </h2>
              <p className="font-mono text-sm text-neutral-500 uppercase tracking-widest">
                {"//"} From Feasibility to Handover
              </p>
            </div>
          </div>

          <TechnicalProcessTimeline />
        </section>

        {/* 5. JOURNAL (keep) */}
        <section id="journal" className="border-t border-neutral-900 scroll-mt-20">
          <InsightBrief />
        </section>

      </main>

      <BackToTop threshold={400} />
    </div>
  );
}
