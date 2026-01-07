import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getInsightBySlug, getAllInsightSlugs } from "@/lib/insightsData";
import { ArrowLeft } from "lucide-react";

interface PageProps {
    params: Promise<{ slug: string }>;
}

/**
 * Generate static params for all articles
 */
export async function generateStaticParams() {
    const slugs = getAllInsightSlugs();
    return slugs.map((slug) => ({ slug }));
}

/**
 * Generate dynamic metadata for each article
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const article = getInsightBySlug(slug);

    if (!article) {
        return {
            title: "Article Not Found | Premium Home Design",
        };
    }

    return {
        title: article.title,
        description: article.excerpt,
        openGraph: {
            title: article.title,
            description: article.excerpt,
            type: "article",
            publishedTime: article.publishedDate,
            authors: [article.author],
            images: [
                {
                    url: article.coverImage,
                    width: 1200,
                    height: 630,
                    alt: article.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: article.title,
            description: article.excerpt,
            images: [article.coverImage],
        },
    };
}

export default async function InsightArticlePage({ params }: PageProps) {
    const { slug } = await params;
    const article = getInsightBySlug(slug);

    if (!article) {
        notFound();
    }

    return (
        <article className="min-h-screen bg-[hsl(var(--background))]">
            {/* Hero Section */}
            <header className="relative">
                {/* Cover Image */}
                <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
                    <Image
                        src={article.coverImage}
                        alt={article.title}
                        fill
                        priority
                        className="object-cover"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--background))] via-black/40 to-transparent" />
                </div>

                {/* Article Header */}
                <div className="absolute bottom-0 left-0 right-0 px-6 pb-12">
                    <div className="max-w-4xl mx-auto">
                        <Link
                            href="/insights"
                            className="inline-flex items-center gap-2 text-zinc-300 hover:text-white transition-colors mb-8 group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-sm uppercase tracking-widest">Back to Insights</span>
                        </Link>

                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-label text-[hsl(var(--primary))] border border-[hsl(var(--primary))/0.3] px-3 py-1 rounded-sm">
                                {article.category}
                            </span>
                            <span className="text-numeral text-sm text-zinc-400">
                                {article.readTime}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl text-white leading-tight mb-6">
                            {article.title}
                        </h1>

                        <div className="flex items-center gap-6 text-zinc-400 text-sm">
                            <span>{article.author}</span>
                            <span className="w-1 h-1 rounded-full bg-zinc-600" />
                            <time dateTime={article.publishedDate}>
                                {new Date(article.publishedDate).toLocaleDateString("en-US", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </time>
                        </div>
                    </div>
                </div>
            </header>

            {/* Article Content */}
            <main className="px-6 py-16 md:py-24">
                <div className="max-w-3xl mx-auto prose prose-invert prose-lg prose-zinc prose-headings:font-[family-name:var(--font-playfair)] prose-headings:text-white prose-p:text-zinc-300 prose-p:leading-relaxed prose-strong:text-white prose-blockquote:border-l-[hsl(var(--primary))] prose-blockquote:text-zinc-300 prose-blockquote:italic prose-li:text-zinc-300">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: article.content
                                .replace(/^##\s(.+)$/gm, '<h2>$1</h2>')
                                .replace(/^###\s(.+)$/gm, '<h3>$1</h3>')
                                .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                                .replace(/^>\s"(.+)"$/gm, '<blockquote><p>"$1"</p></blockquote>')
                                .replace(/^- (.+)$/gm, '<li>$1</li>')
                                .replace(/(<li>.+<\/li>\n?)+/g, '<ul>$&</ul>')
                                .replace(/\n\n/g, '</p><p>')
                                .replace(/^(.+)$/gm, (match) => {
                                    if (match.startsWith('<')) return match;
                                    return `<p>${match}</p>`;
                                })
                                .replace(/<p><\/p>/g, '')
                                .replace(/<p>\s*<\/p>/g, '')
                        }}
                    />
                </div>
            </main>

            {/* Footer CTA */}
            <footer className="px-6 pb-24">
                <div className="max-w-3xl mx-auto border-t border-white/10 pt-12">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div>
                            <p className="text-zinc-400 text-sm mb-2">Ready to build your vision?</p>
                            <p className="text-white text-lg">Let&apos;s discuss your project.</p>
                        </div>
                        <Link
                            href="/#contact"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[hsl(var(--primary))] text-black font-medium rounded-sm hover:bg-[hsl(var(--primary))/0.9] transition-colors"
                        >
                            Start a Conversation
                        </Link>
                    </div>
                </div>

                <div className="max-w-3xl mx-auto mt-16 pt-8 border-t border-white/5 text-center">
                    <Link
                        href="/insights"
                        className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm">Back to all insights</span>
                    </Link>
                </div>
            </footer>
        </article>
    );
}
