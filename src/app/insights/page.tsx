import { Navbar } from "@/components/ui";
import { getAllInsights } from "@/lib/insights";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata = {
    title: "Editorial Insights | Premium Home Design",
    description: "Market analysis, architectural trends, and technology insights for luxury custom home builds in Dallas.",
};

export default function InsightsPage() {
    const insights = getAllInsights();

    return (
        <div className="min-h-screen bg-[hsl(var(--background))]">
            <Navbar brandName="Premium Home" />

            <main id="main-content" className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <header className="mb-20">
                        <h1 className="text-white font-[family-name:var(--font-playfair)] text-5xl md:text-7xl mb-6">
                            Editorial <span className="text-[hsl(var(--primary))] italic">Insights</span>
                        </h1>
                        <p className="text-zinc-400 max-w-2xl text-lg font-light leading-relaxed">
                            Deep dives into the economics, design, and technology of modern luxury construction.
                            Written for the discerning investor.
                        </p>
                    </header>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                        {insights.map((insight) => (
                            <article key={insight.slug} className="group flex flex-col h-full">
                                <Link href={`/insights/${insight.slug}`} className="block overflow-hidden mb-6 relative aspect-[4/3]">
                                    <Image
                                        src={insight.coverImage}
                                        alt={insight.title}
                                        fill
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                                </Link>

                                <div className="flex flex-col flex-grow">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-label text-[hsl(var(--primary))] text-xs tracking-widest uppercase">
                                            {insight.category}
                                        </span>
                                        <span className="text-zinc-500 text-xs font-mono">
                                            {insight.readTime}
                                        </span>
                                    </div>

                                    <h2 className="mb-4">
                                        <Link
                                            href={`/insights/${insight.slug}`}
                                            className="text-2xl text-white font-[family-name:var(--font-playfair)] group-hover:text-[hsl(var(--primary))] transition-colors leading-tight"
                                        >
                                            {insight.title}
                                        </Link>
                                    </h2>

                                    <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-3">
                                        {insight.excerpt}
                                    </p>

                                    <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between">
                                        <span className="text-zinc-500 text-xs">
                                            {insight.publishedDate}
                                        </span>
                                        <Link
                                            href={`/insights/${insight.slug}`}
                                            className="text-white text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all"
                                        >
                                            Read Article
                                            <ArrowUpRight className="w-3 h-3 text-[hsl(var(--primary))]" />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </main>

            <footer className="py-20 text-center text-zinc-600 text-sm border-t border-white/5 mt-20">
                <div className="thin-rule max-w-xs mx-auto mb-8 opacity-50" />
                <p>© 2026 Premium Home Design. Dallas, TX.</p>
                <p className="mt-2 text-[11px] text-zinc-700 tracking-widest uppercase">
                    Concept demo — not a real business.
                </p>
            </footer>
        </div>
    );
}
