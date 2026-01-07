import { Skeleton } from "@/components/ui/skeleton";

export function ProjectGallerySkeleton() {
    return (
        <div className="w-full py-20 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                {/* Title Skeleton */}
                <div className="mb-16 flex justify-center md:justify-start">
                    <div className="h-12 w-64 bg-white/5 rounded-lg animate-pulse" />
                </div>

                {/* List Items Skeleton */}
                <div className="flex flex-col">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="py-12 md:py-16 border-t border-white/5">
                            <div className="flex flex-col md:flex-row justify-between gap-4">
                                <div className="h-6 w-8 bg-white/5 rounded animate-pulse" />
                                <div className="h-10 w-48 md:w-96 bg-white/5 rounded animate-pulse flex-1" />
                                <div className="h-6 w-32 bg-white/5 rounded animate-pulse" />
                            </div>
                        </div>
                    ))}
                    <div className="border-t border-white/5" />
                </div>
            </div>
        </div>
    );
}

// Minimal Skeleton component if not already present in UI library
function LoadingBlock({ className }: { className?: string }) {
    return <div className={`bg-neutral-800/50 animate-pulse rounded ${className}`} />
}
