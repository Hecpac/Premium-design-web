export function FloorPlanOverlay({
    className = "",
    opacity = 0.08,
}: {
    className?: string; // Allow positioning overrides
    opacity?: number;
}) {
    // SVG Pattern: Architectural "Blueprints" look
    // Seamless 100x100 tile with grid lines and "wall" accents
    const svgPattern = `
    <svg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <pattern id='grid' x='0' y='0' width='100' height='100' patternUnits='userSpaceOnUse'>
          <!-- Base Grid -->
          <path d='M 100 0 L 0 0 0 100' fill='none' stroke='white' stroke-width='0.5' opacity='0.3'/>
          <!-- Structural Walls (Thicker) -->
          <path d='M 20 20 H 50 V 50' fill='none' stroke='white' stroke-width='1'/>
          <rect x='60' y='60' width='20' height='20' fill='none' stroke='white' stroke-width='0.8'/>
        </pattern>
      </defs>
      <rect width='100%' height='100%' fill='url(#grid)'/>
    </svg>
  `
        .replace(/\s+/g, " ")
        .trim();

    const dataUri = `url("data:image/svg+xml,${encodeURIComponent(svgPattern)}")`;

    return (
        <div
            className={`absolute inset-0 z-0 pointer-events-none select-none ${className}`}
            aria-hidden="true"
            style={{
                backgroundImage: dataUri,
                backgroundSize: "400px 400px", // Scale up the 100px pattern for elegance
                opacity: opacity,
                mixBlendMode: "overlay",
            }}
        />
    );
}
