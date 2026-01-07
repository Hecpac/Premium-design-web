import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllInsights } from "@/lib/insightsData";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Insights | Premium Home Design",
    description:
        "Expert perspectives on luxury home construction, architectural design, smart home technology, and the Dallas real estate market.",
    openGraph: {
        title: "Insights | Premium Home Design",
        description:
            "Expert perspectives on luxury home construction, design, and technology.",
        type: "website",
        url: "https://www.premiumhome.design/insights",
    },
};

export default function InsightsPage() {
    const articles = getAllInsights();

    return (
        <div className="min-h-screen bg-[hsl(var(--background))]">
            {/* Header */}
            <header className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-12 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm uppercase tracking-widest">Back to Home</span>
                </Link>

                <h1 className="text-white mb-6">
                    Editorial <span className="text-[hsl(var(--primary))] italic">Insights</span>
                </h1>
                <p className="text-lead max-w-2xl">
                    Expert perspectives on luxury home construction, architectural design,
                    smart home technology, and the Dallas real estate market.
                </p>
            </header>

            {/* Article Grid */}
            <main className="px-6 pb-32 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article) => (
                        <Link
                            key={article.slug}
                            href={`/insights/${article.slug}`}
                            className="group editorial-card p-0 overflow-hidden flex flex-col"
                        >
                            {/* Cover Image */}
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <Image
                                    src={article.coverImage}
                                    alt={article.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="p-6 md:p-8 flex flex-col flex-1">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-label text-[hsl(var(--primary))]">
                                        {article.category}
                                    </span>
                                    <span className="text-numeral text-xs">{article.readTime}</span>
                                </div>

                                <h2 className="font-[family-name:var(--font-playfair)] text-xl md:text-2xl text-zinc-200 group-hover:text-white transition-colors mb-4 leading-tight">
                                    {article.title}
                                </h2>

                                <p className="text-zinc-400 text-sm leading-relaxed flex-1">
                                    {article.excerpt}
                                </p>

                                <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/10">
                                    <span className="text-xs text-zinc-500">
                                        {new Date(article.publishedDate).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </span>
                                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all">
                                        <ArrowUpRight className="w-3 h-3 text-zinc-400 group-hover:text-black transition-colors" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>

            {/* Footer */}
            <footer className="py-20 text-center text-zinc-600 text-sm border-t border-white/5">
                <div className="thin-rule max-w-xs mx-auto mb-8 opacity-50" />
                <p>© 2026 Premium Home Design. Dallas, TX.</p>
            </footer>
        </div>
    );
}
