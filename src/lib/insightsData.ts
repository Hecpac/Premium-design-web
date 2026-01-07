/**
 * Insights Data Layer
 * Centralized article data for /insights routes
 */

export interface InsightArticle {
    slug: string;
    title: string;
    category: string;
    readTime: string;
    excerpt: string;
    content: string;
    coverImage: string;
    author: string;
    publishedDate: string;
}

export const insightsData: InsightArticle[] = [
    {
        slug: "cost-of-luxury-2026",
        title: "The True Cost of Luxury Custom Builds in 2026",
        category: "Market Analysis",
        readTime: "4 min read",
        excerpt:
            "An honest breakdown of what drives pricing in the high-end custom home market—from materials and labor to the hidden value of architectural vision.",
        content: `
## The Numbers Behind the Dream

Building a luxury custom home in 2026 isn't just about square footage anymore. The market has evolved, and so have the expectations of discerning clients who understand that true luxury lives in the details.

### Material Costs: The Foundation of Excellence

Premium materials have seen a 15-20% increase over the past two years. Italian porcelain, German hardware, and sustainably-sourced hardwoods now command premium prices—but deliver unmatched longevity and aesthetic value.

**Key cost drivers in 2026:**
- Architectural concrete: $180-$320 per square foot installed
- Smart glass systems: $800-$1,200 per panel
- Custom millwork: $400-$600 per linear foot
- Integrated home automation: $50,000-$150,000 base systems

### Labor: The Artisan Premium

Skilled craftsmen are the scarcest resource in luxury construction. Master masons, custom metalworkers, and precision installers command rates 40-60% higher than standard contractors—and they're worth every dollar.

### The Hidden Value Proposition

What you're really paying for isn't materials or labor alone. It's the synthesis—an architectural vision that transforms raw elements into spaces that elevate daily life. That's where Premium Home Design delivers irreplaceable value.

> "The difference between a house and a home is the quality of thought that shapes every corner."

### Investment Perspective

A well-designed luxury home in Dallas appreciates differently than tract housing. Custom builds in premium locations have historically outperformed the market by 2-3% annually, making them not just homes but legacy assets.
    `,
        coverImage: "/images/insights/cost-of-luxury.png",
        author: "Premium Home Design Team",
        publishedDate: "2026-01-05",
    },
    {
        slug: "smart-home-integration",
        title: "Smart Home Integration: Beyond the Gimmicks",
        category: "Technology",
        readTime: "6 min read",
        excerpt:
            "Forget voice-activated blinds and talking refrigerators. Real smart home technology is invisible, intuitive, and genuinely improves how you live.",
        content: `
## The Problem with "Smart" Homes

Most smart home installations are technology for technology's sake—gadgets that impress visitors but frustrate residents. True intelligent home design takes a fundamentally different approach.

### The Invisible Interface Principle

The best technology disappears. You shouldn't need an app to adjust your lights or a voice command to set the temperature. Intelligent homes anticipate needs through:

- **Presence detection** that adjusts climate zones automatically
- **Circadian lighting** that shifts color temperature throughout the day
- **Predictive climate control** that learns your patterns
- **Unified security** that arms itself when you leave

### Systems That Actually Matter

After designing dozens of high-end smart homes, we've identified the integrations that deliver real daily value:

**Tier 1: Essential**
- Whole-home lighting control with scene management
- HVAC zoning with smart scheduling
- Integrated security with remote monitoring
- Motorized shading with solar tracking

**Tier 2: Enhanced Living**
- Multi-room audio with independent zones
- Automated irrigation with weather integration
- EV charging management
- Water leak detection and automatic shutoff

**Tier 3: Luxury Differentiators**
- Home theater with cinema-grade calibration
- Wine cellar climate monitoring
- Art lighting with UV protection scheduling
- Biometric access throughout

### The Integration Architecture

What separates amateur installations from professional systems is the backbone. We specify enterprise-grade networking, dedicated VLANs for IoT devices, and redundant systems that function even when the internet fails.

### Future-Proofing

Technology evolves rapidly. Smart home infrastructure must be designed for upgrade paths—conduit for future cabling, power at strategic locations, and open protocols that won't lock you into obsolete ecosystems.
    `,
        coverImage: "/images/insights/smart-home.png",
        author: "Premium Home Design Team",
        publishedDate: "2026-01-02",
    },
    {
        slug: "concrete-and-light",
        title: "Concrete & Light: The New Brutalist Aesthetic",
        category: "Design",
        readTime: "3 min read",
        excerpt:
            "Raw concrete isn't cold or institutional—when properly detailed, it becomes the warmest, most honest material in modern luxury architecture.",
        content: `
## Brutalism Reimagined

The brutalist movement of the mid-20th century was about truth in materials. Today's interpretation carries that honesty forward while embracing warmth, texture, and the interplay with natural light.

### The Honesty of Exposed Concrete

Architectural concrete reveals its process. The formwork patterns, the aggregate texture, the subtle color variations—these aren't flaws to be hidden but features to be celebrated.

**Modern concrete techniques we employ:**
- Board-formed concrete with custom wood grain patterns
- Pigmented mixes for warm, natural tones
- Polished concrete floors with radiant heating
- Acid-etched surfaces for tactile variation

### Light as Material

In brutalist design, light isn't just illumination—it's a building material. We design apertures, clerestories, and skylights to create specific light conditions:

- **Morning eastern light** in breakfast spaces
- **Diffused northern light** in art galleries and studios
- **Dramatic western light** captured at golden hour
- **Controlled southern exposure** for year-round comfort

### Warmth Through Contrast

Pure concrete can feel austere. We balance its mass with:

- **Natural wood** accents—walnut, white oak, or teak
- **Bronze hardware** that develops patina over time
- **Linen and wool textiles** in neutral tones
- **Living plants** that soften edges and add life

### The Emotional Impact

There's something profoundly grounding about concrete architecture. Its permanence, its weight, its silence—these qualities create spaces that feel like refuges from the chaos of modern life.

> "We don't build houses. We sculpt volumes from light and mass."

### Dallas Context

The Texas sun is brutalist architecture's greatest ally. Long shadows, intense light, dramatic sunsets—our climate rewards bold forms and honest materials in ways that temperate regions cannot.
    `,
        coverImage: "/images/insights/concrete-light.png",
        author: "Premium Home Design Team",
        publishedDate: "2025-12-28",
    },
];

/**
 * Get all insights for listing page
 */
export function getAllInsights(): InsightArticle[] {
    return insightsData;
}

/**
 * Get single insight by slug
 */
export function getInsightBySlug(slug: string): InsightArticle | undefined {
    return insightsData.find((article) => article.slug === slug);
}

/**
 * Get all slugs for static generation
 */
export function getAllInsightSlugs(): string[] {
    return insightsData.map((article) => article.slug);
}
