import { Skeleton } from "@/components/ui/skeleton";

/**
 * ProjectCardSkeleton - Skeleton loader para cards del portfolio
 * Agentrules v2.0.0 Regla #1: Performance optimization con lazy loading
 * 
 * Uso: Mostrar mientras cargan las imágenes lazy (index >= 3)
 */
export function ProjectCardSkeleton() {
    return (
        <article className="group flex flex-col h-full animate-in fade-in duration-300">
            {/* Image Skeleton */}
            <div className="mb-6 relative">
                <div className="relative aspect-[16/10] bg-zinc-900 rounded-sm overflow-hidden">
                    <Skeleton className="absolute inset-0 w-full h-full" />
                </div>
            </div>

            <div className="flex flex-col flex-grow">
                {/* Meta Skeleton */}
                <div className="flex items-center gap-2 mb-3">
                    <Skeleton className="h-4 w-20" />
                    <span className="text-zinc-800">·</span>
                    <Skeleton className="h-4 w-24" />
                    <span className="text-zinc-800">·</span>
                    <Skeleton className="h-4 w-12" />
                </div>

                {/* Title Skeleton */}
                <Skeleton className="h-7 w-3/4 mb-3" />

                {/* Excerpt Skeleton */}
                <div className="space-y-2 mb-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                </div>

                {/* Footer Skeleton */}
                <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="flex gap-4">
                        <div>
                            <Skeleton className="h-5 w-12 mb-1" />
                            <Skeleton className="h-3 w-16" />
                        </div>
                        <div>
                            <Skeleton className="h-5 w-10 mb-1" />
                            <Skeleton className="h-3 w-14" />
                        </div>
                    </div>
                    <Skeleton className="h-4 w-16" />
                </div>
            </div>
        </article>
    );
}

/**
 * WorkCardSkeleton - Skeleton para cards de SelectedWorks (homepage)
 * Versión compacta para el grid editorial
 */
export function WorkCardSkeleton({ isFeatured = false }: { isFeatured?: boolean }) {
    return (
        <article
            className={`relative group ${isFeatured ? "md:col-span-2 md:row-span-2" : "md:col-span-1"}`}
        >
            {/* Image Container Skeleton */}
            <div
                className={`relative w-full overflow-hidden rounded-sm bg-zinc-900 ${
                    isFeatured
                        ? "h-full min-h-full aspect-[16/10] md:aspect-auto"
                        : "aspect-[16/9]"
                }`}
            >
                <Skeleton className="absolute inset-0 w-full h-full" />
            </div>

            {/* Info Block Skeleton (non-featured) */}
            {!isFeatured && (
                <div className="mt-5 px-1">
                    {/* Meta line */}
                    <div className="flex items-center gap-2 mb-2">
                        <Skeleton className="h-3 w-16" />
                        <span className="text-zinc-800">·</span>
                        <Skeleton className="h-3 w-20" />
                        <span className="text-zinc-800">·</span>
                        <Skeleton className="h-3 w-10" />
                    </div>

                    {/* Title */}
                    <Skeleton className="h-6 w-3/4 mb-3" />

                    {/* CTA */}
                    <Skeleton className="h-4 w-28" />
                </div>
            )}
        </article>
    );
}

/**
 * ProjectGridSkeleton - Grid completo de skeletons
 * Para usar como fallback de Suspense
 */
export function ProjectGridSkeleton({ count = 6 }: { count?: number }) {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: count }).map((_, i) => (
                <ProjectCardSkeleton key={i} />
            ))}
        </div>
    );
}

/**
 * SelectedWorksGridSkeleton - Grid completo para homepage
 */
export function SelectedWorksGridSkeleton({ count = 8 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {Array.from({ length: count }).map((_, i) => (
                <WorkCardSkeleton key={i} isFeatured={i === 0} />
            ))}
        </div>
    );
}
