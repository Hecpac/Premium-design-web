export function TrustSignalSection() {
    return (
        <section
            id="about"
            aria-labelledby="about-heading"
            className="w-full py-16 border-y border-white/5 bg-black/40 backdrop-blur-sm"
        >
            <h2 id="about-heading" className="sr-only">
                About Premium Home Design
            </h2>
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center">

                {/* Authority Logos (Left - Col 5) */}
                <div className="md:col-span-5">
                    <span className="text-label block mb-4 text-zinc-500">Editorial aesthetic references</span>
                    <div className="flex flex-wrap gap-8 md:gap-12 items-center opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                        <span className="font-[family-name:var(--font-playfair)] text-2xl font-bold">VOGUE</span>
                        <span className="font-[family-name:var(--font-playfair)] text-xl font-bold tracking-widest">DEZEEN</span>
                        <span className="font-[family-name:var(--font-playfair)] text-xl font-bold italic">ArchDaily</span>
                    </div>
                </div>

                {/* Testimonial (Right - Col 7) */}
                <div className="md:col-span-7 border-l border-white/10 pl-8 md:pl-12">
                    <blockquote className="text-xl md:text-2xl font-[family-name:var(--font-playfair)] text-zinc-200 leading-relaxed italic mb-6">
                        They don’t just build houses; they curate silence and space. A flawless execution of complex engineering.
                    </blockquote>
                    <cite className="not-italic flex items-center gap-3">
                        <div className="w-10 h-10 bg-zinc-800 rounded-full overflow-hidden relative">
                            {/* Placeholder Avatar */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                        </div>
                        <div>
                            <span className="block text-sm font-medium text-white">Alexander V.</span>
                            <span className="block text-label text-xs">Highland Park Resident</span>
                        </div>
                    </cite>
                </div>
            </div>
        </section>
    );
}
