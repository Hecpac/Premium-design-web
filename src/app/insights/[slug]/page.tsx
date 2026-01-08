import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { Navbar, Button } from "@/components/ui";
import { getInsightBySlug, getAllInsightSlugs } from "@/lib/insights";
import type { Metadata } from "next";

interface PageProps {
    params: { slug: string };
}

// 1. Generate Static Params for SSG/ISR
export async function generateStaticParams() {
    const slugs = getAllInsightSlugs();
    return slugs.map((slug) => ({ slug }));
}

// 2. Dynamic Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const article = getInsightBySlug(params.slug);
    if (!article) return {};

    return {
        title: `${article.title} | Premium Home Design Insights`,
        description: article.excerpt,
        openGraph: {
            title: article.title,
            description: article.excerpt,
            images: [article.coverImage],
            type: "article",
        },
    };
}

export default function InsightPage({ params }: PageProps) {
    const article = getInsightBySlug(params.slug);

    if (!article) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-[hsl(var(--background))] selection:bg-[hsl(var(--primary))/0.3]">
            <Navbar brandName="Premium Home" />

            <article className="pt-32 pb-20">
                {/* Header Section */}
                <header className="max-w-4xl mx-auto px-6 mb-16 text-center">
                    <div className="flex items-center justify-center gap-4 text-sm text-zinc-400 mb-6 font-mono">
                        <span className="flex items-center gap-2">
                            <Tag className="w-3 h-3 text-[hsl(var(--primary))]" />
                            {article.category}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-zinc-700" />
                        <span className="flex items-center gap-2">
                            <Clock className="w-3 h-3" />
                            {article.readTime}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-zinc-700" />
                        <span className="flex items-center gap-2">
                            <Calendar className="w-3 h-3" />
                            {article.publishedDate}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl text-white font-[family-name:var(--font-playfair)] leading-tight mb-8">
                        {article.title}
                    </h1>

                    <p className="text-xl text-zinc-300 font-light leading-relaxed max-w-2xl mx-auto">
                        {article.excerpt}
                    </p>
                </header>

                {/* Cover Image */}
                <div className="w-full h-[50vh] md:h-[70vh] relative mb-16 md:mb-24">
                    <Image
                        src={article.coverImage}
                        alt={article.title}
                        fill
                        priority
                        className="object-cover"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--background))] via-transparent to-transparent h-32 bottom-0" />
                </div>

                {/* Content Body */}
                <div className="max-w-3xl mx-auto px-6">
                    <div
                        className="prose prose-invert prose-lg md:prose-xl prose-headings:font-[family-name:var(--font-playfair)] prose-headings:font-normal prose-p:font-light prose-p:text-zinc-300 prose-blockquote:border-l-[hsl(var(--primary))] prose-blockquote:text-white prose-blockquote:font-[family-name:var(--font-playfair)] prose-blockquote:not-italic prose-strong:text-white prose-a:text-[hsl(var(--primary))] prose-li:text-zinc-300"
                        dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, "<br/>") }}
                    />
                </div>

                {/* Navigation & CTA */}
                <div className="max-w-3xl mx-auto px-6 mt-20 pt-10 border-t border-white/10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <Link
                            href="/insights"
                            className="text-zinc-400 hover:text-white flex items-center gap-2 group transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Insights
                        </Link>

                        <Button className="bg-[hsl(var(--primary))] text-black hover:bg-white transition-colors">
                            Book a Consultation
                        </Button>
                    </div>
                </div>
            </article>

            <footer className="py-20 text-center text-zinc-600 text-sm border-t border-white/5">
                <p>© 2026 Premium Home Design. Dallas, TX.</p>
            </footer>
        </div>
    );
}