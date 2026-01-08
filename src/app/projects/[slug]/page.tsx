import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, Tag, ArrowUpRight } from "lucide-react";
import { Navbar, Button } from "@/components/ui";
import {
    getProjectBySlug,
    getAllProjectSlugs,
} from "@/lib/projects";
import type { Metadata } from "next";

interface PageProps {
    params: Promise<{ slug: string }>;
}

// 1. Generate Static Params for SSG/ISR
export async function generateStaticParams() {
    const slugs = getAllProjectSlugs();
    return slugs.map((slug) => ({ slug }));
}

// 2. Dynamic Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = getProjectBySlug(slug);
    if (!project) return {};

    return {
        title: `${project.title} | Premium Home Design`,
        description: project.summary,
        openGraph: {
            title: project.title,
            description: project.summary,
            images: [project.coverImage],
            type: "article",
        },
    };
}

export default async function ProjectDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-[hsl(var(--background))] selection:bg-[hsl(var(--primary))/0.3]">
            <Navbar brandName="Premium Home" />

            <main id="main-content" className="pt-32 pb-20">
                <article>
                    {/* Hero Header */}
                    <header className="max-w-5xl mx-auto px-6 mb-12">
                        {/* Breadcrumb */}
                        <Link
                            href="/projects"
                            className="text-zinc-400 hover:text-white flex items-center gap-2 group transition-colors mb-8 w-fit"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-xs uppercase tracking-widest">
                                Back to Projects
                            </span>
                        </Link>

                        {/* Meta Line */}
                        <div className="flex items-center gap-4 text-sm text-zinc-400 mb-6 font-mono flex-wrap">
                            <span className="flex items-center gap-2 text-[hsl(var(--primary))]">
                                <Tag className="w-3 h-3" />
                                {project.category}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-zinc-700" />
                            <span className="flex items-center gap-2">
                                <MapPin className="w-3 h-3" />
                                {project.location}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-zinc-700" />
                            <span className="flex items-center gap-2">
                                <Calendar className="w-3 h-3" />
                                {project.year}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-[family-name:var(--font-playfair)] leading-tight mb-8">
                            {project.title}
                        </h1>

                        {/* Summary */}
                        <p className="text-xl text-zinc-300 font-light leading-relaxed max-w-3xl">
                            {project.summary}
                        </p>
                    </header>

                    {/* Cover Image - NOT priority, lazy loaded */}
                    <div className="w-full relative mb-16 md:mb-24">
                        <div className="aspect-[21/9] relative bg-zinc-900">
                            <Image
                                src={project.coverImage}
                                alt={project.title}
                                fill
                                loading="lazy"
                                className="object-cover"
                                sizes="100vw"
                            />
                        </div>
                    </div>

                    {/* Stats Row */}
                    <div className="max-w-5xl mx-auto px-6 mb-16">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 py-8 border-y border-white/10">
                            {project.stats.map((stat) => (
                                <div key={stat.label} className="text-center">
                                    <span className="text-3xl md:text-4xl text-white font-[family-name:var(--font-playfair)] block mb-2">
                                        {stat.value}
                                    </span>
                                    <span className="text-xs text-zinc-500 uppercase tracking-widest">
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Content Sections */}
                    <div className="max-w-3xl mx-auto px-6">
                        {project.sections.map((section, idx) => (
                            <section key={idx} className="mb-16">
                                <h2 className="text-2xl md:text-3xl text-white font-[family-name:var(--font-playfair)] mb-6">
                                    {section.heading}
                                </h2>
                                <div className="space-y-4">
                                    {section.body.map((paragraph, pIdx) => (
                                        <p
                                            key={pIdx}
                                            className="text-zinc-300 font-light leading-relaxed"
                                        >
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>

                    {/* Gallery Grid */}
                    <div className="max-w-6xl mx-auto px-6 mb-20">
                        <h2 className="text-2xl md:text-3xl text-white font-[family-name:var(--font-playfair)] mb-8 text-center">
                            Project Gallery
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {project.gallery.map((image, idx) => (
                                <div
                                    key={idx}
                                    className="relative aspect-[4/3] bg-zinc-900 rounded-sm overflow-hidden group"
                                >
                                    <Image
                                        src={image}
                                        alt={`${project.title} - Gallery image ${idx + 1}`}
                                        fill
                                        loading="lazy"
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="max-w-3xl mx-auto px-6 pt-10 border-t border-white/10">
                        <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-8 md:p-12 text-center">
                            <h3 className="text-2xl md:text-3xl text-white font-[family-name:var(--font-playfair)] mb-4">
                                Ready to Start Your Project?
                            </h3>
                            <p className="text-zinc-400 mb-8 max-w-lg mx-auto">
                                Let&apos;s discuss how we can bring your vision to
                                life with the same attention to detail and
                                craftsmanship.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link href="/#contact">
                                    <Button className="bg-[hsl(var(--primary))] text-black hover:bg-white transition-colors px-8">
                                        Book a Consultation
                                    </Button>
                                </Link>
                                <Link
                                    href="/projects"
                                    className="text-zinc-400 hover:text-white flex items-center gap-2 transition-colors"
                                >
                                    View More Projects
                                    <ArrowUpRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </article>
            </main>

            <footer className="py-20 text-center text-zinc-600 text-sm border-t border-white/5">
                <p>© 2026 Premium Home Design. Dallas, TX.</p>
            </footer>
        </div>
    );
}
