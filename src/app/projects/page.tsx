import { getAllProjects, type Project, type ProjectCategory } from "@/lib/projects";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Calendar } from "lucide-react";

export const metadata = {
    title: "Projects | Premium Home Design Portfolio",
    description:
        "Explore our portfolio of luxury custom homes, estates, and interior design projects across Dallas-Fort Worth.",
    openGraph: {
        title: "Projects | Premium Home Design",
        description:
            "Explore our portfolio of luxury custom homes, estates, and interior design projects across Dallas-Fort Worth.",
        type: "website",
    },
};

// Category filter labels
const CATEGORY_LABELS: Record<string, ProjectCategory | "all"> = {
    all: "all",
    residences: "Residence",
    estates: "Estate",
    interiors: "Interiors",
    renovations: "Renovation",
};

interface PageProps {
    searchParams: Promise<{ type?: string }>;
}

export default async function ProjectsPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const filterType = params?.type?.toLowerCase() || "all";
    const allProjects = getAllProjects();

    // Filter projects if type specified
    const filteredProjects =
        filterType === "all" || !CATEGORY_LABELS[filterType]
            ? allProjects
            : allProjects.filter(
                (p) => p.category === CATEGORY_LABELS[filterType]
            );

    return (
        <div className="min-h-screen bg-[hsl(var(--background))]">
            <main id="main-content" className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <header className="mb-16">
                        <span className="text-label text-[hsl(var(--primary))] mb-4 block text-xs tracking-widest uppercase">
                            Portfolio
                        </span>
                        <h1 className="text-white font-[family-name:var(--font-playfair)] text-5xl md:text-7xl mb-6">
                            Our{" "}
                            <span className="text-[hsl(var(--primary))] italic">
                                Projects
                            </span>
                        </h1>
                        <p className="text-zinc-400 max-w-2xl text-lg font-light leading-relaxed">
                            A curated selection of luxury residences, estates,
                            and interior transformations across the Dallas-Fort
                            Worth metroplex.
                        </p>
                    </header>

                    {/* Filter Navigation */}
                    <nav
                        className="flex flex-wrap gap-3 mb-16"
                        aria-label="Filter projects by category"
                    >
                        {Object.entries(CATEGORY_LABELS).map(([key, value]) => {
                            const isActive =
                                filterType === key ||
                                (filterType === "all" && key === "all");
                            const label =
                                key.charAt(0).toUpperCase() + key.slice(1);

                            return (
                                <Link
                                    key={key}
                                    href={
                                        key === "all"
                                            ? "/projects"
                                            : `/projects?type=${key}`
                                    }
                                    className={`px-5 py-2 rounded-full text-xs uppercase tracking-[0.15em] font-medium transition-all duration-300 border ${isActive
                                            ? "bg-white text-black border-white shadow-lg shadow-white/10"
                                            : "bg-transparent text-zinc-400 border-white/10 hover:border-white/30 hover:text-white"
                                        }`}
                                    aria-current={isActive ? "page" : undefined}
                                >
                                    {label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Projects Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project, index) => (
                            <ProjectCard key={project.slug} project={project} index={index} />
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredProjects.length === 0 && (
                        <div className="py-24 text-center">
                            <p className="text-zinc-500 text-lg mb-4">
                                No projects found in this category.
                            </p>
                            <Link
                                href="/projects"
                                className="text-[hsl(var(--primary))] hover:underline"
                            >
                                View all projects
                            </Link>
                        </div>
                    )}
                </div>
            </main>

        </div>
    );
}

// ============================================================================
// PROJECT CARD COMPONENT
// ============================================================================

function ProjectCard({ project, index }: { project: Project; index: number }) {
    // Lazy loading inteligente: primeras 3 imágenes eager (above fold)
    const isAboveFold = index < 3;
    
    return (
        <article className="group flex flex-col h-full">
            <Link
                href={`/projects/${project.slug}`}
                className="block overflow-hidden mb-6 relative"
            >
                {/* Aspect ratio wrapper for zero CLS */}
                <div className="relative aspect-[16/10] bg-zinc-900 rounded-sm overflow-hidden">
                    <Image
                        src={project.coverImage}
                        alt={`${project.title} - ${project.category} in ${project.location}`}
                        fill
                        loading={isAboveFold ? "eager" : "lazy"}
                        priority={isAboveFold}
                        quality={80}
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

                    {/* Hover Arrow */}
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        <ArrowUpRight className="text-white w-4 h-4" />
                    </div>
                </div>
            </Link>

            <div className="flex flex-col flex-grow">
                {/* Meta */}
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="text-xs font-mono text-[hsl(var(--primary))] uppercase tracking-widest">
                        {project.category}
                    </span>
                    <span className="text-zinc-600">·</span>
                    <span className="text-xs text-zinc-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {project.location}
                    </span>
                    <span className="text-zinc-600">·</span>
                    <span className="text-xs text-zinc-600 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {project.year}
                    </span>
                </div>

                {/* Title */}
                <h2 className="mb-3">
                    <Link
                        href={`/projects/${project.slug}`}
                        className="font-[family-name:var(--font-playfair)] text-xl md:text-2xl text-white group-hover:text-[hsl(var(--primary))] transition-colors leading-tight"
                    >
                        {project.title}
                    </Link>
                </h2>

                {/* Excerpt */}
                <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2 mb-4">
                    {project.summary}
                </p>

                {/* CTA */}
                <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="flex gap-4">
                        {project.stats.slice(0, 2).map((stat) => (
                            <div key={stat.label} className="text-left">
                                <span className="text-white text-sm font-semibold block">
                                    {stat.value}
                                </span>
                                <span className="text-zinc-600 text-xs">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                    <Link
                        href={`/projects/${project.slug}`}
                        className="text-white text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all"
                    >
                        View
                        <ArrowUpRight className="w-3 h-3 text-[hsl(var(--primary))]" />
                    </Link>
                </div>
            </div>
        </article>
    );
}
