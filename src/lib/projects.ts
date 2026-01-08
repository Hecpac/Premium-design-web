/**
 * Projects Data Layer
 * Single source of truth for /projects routes
 */

export type ProjectCategory = "Residence" | "Estate" | "Interiors" | "Renovation";

export interface Project {
    slug: string;
    title: string;
    location: string;
    category: ProjectCategory;
    year: string;
    coverImage: string;
    gallery: string[];
    summary: string;
    sections: Array<{ heading: string; body: string[] }>;
    stats: Array<{ label: string; value: string }>;
}

export const PROJECTS: Project[] = [
    {
        slug: "selected-works-portfolio",
        title: "Selected Works",
        location: "Dallas-Fort Worth, TX",
        category: "Estate",
        year: "2024–2026",
        coverImage: "/images/selected-works/portfolio-collage.webp",
        gallery: [
            "/images/selected-works/villa-las-colinas.webp",
            "/images/selected-works/estate-highland-park.webp",
            "/images/selected-works/mansion-southlake.webp",
            "/images/selected-works/residence-preston-hollow.webp",
        ],
        summary:
            "A curated collection of Premium Home Design's finest residential projects across Dallas-Fort Worth. From contemporary glass residences to timeless estate manors, each project represents our commitment to architectural excellence and bespoke craftsmanship.",
        sections: [
            {
                heading: "Design Philosophy",
                body: [
                    "Every project in our portfolio begins with a deep understanding of how our clients live. We don't impose style—we discover it through conversation, observation, and collaboration.",
                    "The result is architecture that feels inevitable, as if it could only exist in its specific place for its specific inhabitants.",
                ],
            },
            {
                heading: "Material Excellence",
                body: [
                    "We source materials globally but specify locally appropriate solutions. Italian porcelain for bathrooms, Texas limestone for exteriors, custom millwork from regional craftsmen.",
                    "Every material decision balances aesthetic vision with practical durability for the Texas climate.",
                ],
            },
        ],
        stats: [
            { label: "Projects Completed", value: "45+" },
            { label: "Years Experience", value: "18" },
            { label: "Design Awards", value: "12" },
            { label: "Client Satisfaction", value: "100%" },
        ],
    },
    {
        slug: "villa-las-colinas",
        title: "Villa Las Colinas",
        location: "Las Colinas, TX",
        category: "Estate",
        year: "2024",
        coverImage: "/images/selected-works/villa-las-colinas.webp",
        gallery: [
            "/images/selected-works/villa-las-colinas.webp",
            "/images/selected-works/estate-highland-park.webp",
            "/images/selected-works/mansion-southlake.webp",
        ],
        summary:
            "A Mediterranean-inspired estate that redefines luxury living in Las Colinas. Featuring 12,000 square feet of meticulously designed living space with seamless indoor-outdoor integration and resort-style amenities.",
        sections: [
            {
                heading: "The Vision",
                body: [
                    "Our clients sought a home that would transport them to the Mediterranean while remaining rooted in Texas practicality. The result is an estate that balances romantic arches and courtyards with modern systems and sustainable design.",
                    "Natural stone harvested from Texas quarries forms the structural bones, while imported Italian tile adds authentic Mediterranean character.",
                ],
            },
            {
                heading: "Outdoor Living",
                body: [
                    "The infinity pool overlooks the Las Colinas canal system, creating a resort atmosphere steps from downtown Dallas. An outdoor kitchen, climate-controlled pergola, and fire features extend living space year-round.",
                    "Native landscaping reduces water consumption by 60% compared to traditional turf lawns.",
                ],
            },
            {
                heading: "Smart Integration",
                body: [
                    "Whole-home automation manages climate, lighting, security, and entertainment from a unified interface. The system learns occupancy patterns and adjusts automatically for comfort and efficiency.",
                ],
            },
        ],
        stats: [
            { label: "Square Feet", value: "12,000" },
            { label: "Bedrooms", value: "6" },
            { label: "Build Duration", value: "18 mo" },
            { label: "Pool Length", value: "65 ft" },
        ],
    },
    {
        slug: "skyline-penthouse",
        title: "Skyline Penthouse",
        location: "Uptown Dallas",
        category: "Interiors",
        year: "2025",
        coverImage: "/images/selected-works/penthouse-uptown.webp",
        gallery: [
            "/images/selected-works/penthouse-uptown.webp",
            "/images/selected-works/architect-office-tools.webp",
            "/images/bento-thermostat.webp",
        ],
        summary:
            "A complete interior transformation of a 4,200 square foot Uptown penthouse. Floor-to-ceiling glazing frames Dallas skyline views while custom millwork and integrated technology create a sanctuary in the sky.",
        sections: [
            {
                heading: "The Challenge",
                body: [
                    "The original interior felt dated and failed to capitalize on the penthouse's primary asset: unobstructed 270-degree skyline views. Our mandate was to strip back unnecessary walls and create a flowing, gallery-like space.",
                    "Structural limitations required creative solutions. We concealed steel reinforcement within custom millwork to remove visual obstructions.",
                ],
            },
            {
                heading: "Material Palette",
                body: [
                    "Warm walnut millwork contrasts with cool concrete floors and white plaster walls. Bronze hardware and fixtures add warmth without competing with the ever-changing sky outside.",
                    "All furniture was custom-designed for the space, scaled to complement rather than compete with the views.",
                ],
            },
        ],
        stats: [
            { label: "Square Feet", value: "4,200" },
            { label: "Ceiling Height", value: "12 ft" },
            { label: "Glass Walls", value: "2,800 sf" },
            { label: "Custom Pieces", value: "24" },
        ],
    },
    {
        slug: "highland-park-estate",
        title: "Highland Park Estate",
        location: "Highland Park, TX",
        category: "Estate",
        year: "2024",
        coverImage: "/images/selected-works/estate-highland-park.webp",
        gallery: [
            "/images/selected-works/estate-highland-park.webp",
            "/images/selected-works/villa-las-colinas.webp",
            "/images/selected-works/mansion-southlake.webp",
            "/images/parallax-mansion.webp",
        ],
        summary:
            "A new construction estate in one of Dallas's most prestigious neighborhoods. Traditional Georgian architecture conceals cutting-edge sustainability systems and contemporary interior spaces.",
        sections: [
            {
                heading: "Contextual Design",
                body: [
                    "Highland Park's architectural review committee maintains strict standards. Our design respects the neighborhood's Georgian heritage while introducing subtle contemporary elements that distinguish the home.",
                    "Hand-fired brick, limestone quoins, and copper roofing age gracefully, ensuring the home belongs to its context for generations.",
                ],
            },
            {
                heading: "Hidden Technology",
                body: [
                    "Beneath the traditional exterior lies a geothermal HVAC system, 40kW solar array, and 80kWh battery storage. The home can operate off-grid for extended periods without sacrificing comfort.",
                    "Every room features invisible distributed audio, automated shading, and circadian lighting—all controlled via discreet keypads that match period millwork.",
                ],
            },
        ],
        stats: [
            { label: "Square Feet", value: "14,500" },
            { label: "Lot Acres", value: "1.2" },
            { label: "Solar Output", value: "40 kW" },
            { label: "Energy Offset", value: "95%" },
        ],
    },
    {
        slug: "glass-residence",
        title: "Glass Residence",
        location: "Preston Hollow, TX",
        category: "Residence",
        year: "2025",
        coverImage: "/images/selected-works/residence-preston-hollow.webp",
        gallery: [
            "/images/selected-works/residence-preston-hollow.webp",
            "/images/selected-works/penthouse-uptown.webp",
            "/images/bento-blueprints.webp",
        ],
        summary:
            "A minimalist glass pavilion set within a mature pecan grove. The 5,800 square foot residence celebrates transparency, blurring the boundary between interior comfort and natural landscape.",
        sections: [
            {
                heading: "Architectural Concept",
                body: [
                    "Inspired by Case Study Houses of the 1950s, this residence proves that modernism can be warm. Steel frames support floor-to-ceiling glass on three sides, while a solid masonry core anchors the composition.",
                    "The roof extends beyond the glass walls, creating deep overhangs that shade interiors from the Texas sun while framing views of the surrounding trees.",
                ],
            },
            {
                heading: "Living With Nature",
                body: [
                    "The placement of every wall and window considered the existing pecan trees. Several mature specimens rise through deck cutouts, their canopy providing natural shade and seasonal interest.",
                    "Wildlife observation was an explicit design goal. The glass walls become a living canvas as deer, birds, and foxes traverse the property.",
                ],
            },
        ],
        stats: [
            { label: "Square Feet", value: "5,800" },
            { label: "Glass Panels", value: "64" },
            { label: "Trees Preserved", value: "28" },
            { label: "Deck Area", value: "1,800 sf" },
        ],
    },
    {
        slug: "southlake-manor",
        title: "Southlake Manor",
        location: "Southlake, TX",
        category: "Estate",
        year: "2024",
        coverImage: "/images/selected-works/mansion-southlake.webp",
        gallery: [
            "/images/selected-works/mansion-southlake.webp",
            "/images/selected-works/estate-highland-park.webp",
            "/images/selected-works/villa-las-colinas.webp",
        ],
        summary:
            "A 16,000 square foot family compound designed for multi-generational living. The estate includes a main residence, guest house, pool pavilion, and a barn-style workshop—all unified by consistent architectural language.",
        sections: [
            {
                heading: "Multi-Generational Living",
                body: [
                    "Three generations of the same family occupy this compound. The main residence houses the primary owners, while attached guest quarters provide independent living for aging parents.",
                    "A detached guest house accommodates returning adult children and their families. Thoughtful site planning provides privacy while maintaining connection.",
                ],
            },
            {
                heading: "Estate Grounds",
                body: [
                    "Five acres of land include a stocked pond, walking trails, and working kitchen garden. The landscape design emphasizes native prairie restoration with strategic ornamental plantings near the residences.",
                    "An oversized motor court accommodates family gatherings while a separate service entrance keeps deliveries and maintenance discreet.",
                ],
            },
        ],
        stats: [
            { label: "Total SF", value: "16,000" },
            { label: "Lot Acres", value: "5.0" },
            { label: "Structures", value: "4" },
            { label: "Garage Bays", value: "8" },
        ],
    },
    {
        slug: "modern-sanctuary",
        title: "Modern Sanctuary",
        location: "Dallas, TX",
        category: "Residence",
        year: "2026",
        coverImage: "/images/selected-works/new-project.webp",
        gallery: [
            "/images/selected-works/new-project.webp",
            "/images/selected-works/residence-preston-hollow.webp",
            "/images/bento-concrete.webp",
        ],
        summary:
            "Currently under construction, this bold contemporary residence pushes the boundaries of residential architecture in Dallas. Raw concrete, weathered steel, and expansive glass create a home that celebrates honest materials and dramatic volumes.",
        sections: [
            {
                heading: "Design Intent",
                body: [
                    "The clients sought a home that would challenge Dallas conventions. We responded with architecture that makes no apologies—board-formed concrete walls, cor-ten steel cladding, and a floating roof that defies expectations.",
                    "Despite its modernist severity, the interior volumes are warm and welcoming, with double-height spaces bathed in natural light.",
                ],
            },
            {
                heading: "Under Construction",
                body: [
                    "Foundation and structural concrete are complete. Steel framing for the cantilevered sections is underway. Expected completion is Q3 2026.",
                    "Follow our progress as this ambitious project takes shape.",
                ],
            },
        ],
        stats: [
            { label: "Square Feet", value: "7,200" },
            { label: "Concrete Used", value: "380 yd³" },
            { label: "Cantilever", value: "22 ft" },
            { label: "Completion", value: "Q3 2026" },
        ],
    },
    {
        slug: "design-atelier",
        title: "The Design Atelier",
        location: "Dallas HQ",
        category: "Interiors",
        year: "2026",
        coverImage: "/images/selected-works/architect-office-tools.webp",
        gallery: [
            "/images/selected-works/architect-office-tools.webp",
            "/images/selected-works/portfolio-collage.webp",
            "/images/bento-blueprints.webp",
        ],
        summary:
            "Our own studio space—designed as both a working office and a showroom for the materials, finishes, and craftsmanship we specify in client projects. Clients experience selections in a curated environment that inspires confidence.",
        sections: [
            {
                heading: "Working Showroom",
                body: [
                    "Every surface in our studio is a sample. Clients touch the same limestone, walnut, and bronze that will appear in their homes. Large format material boards line the walls, organized by project palette.",
                    "The conference room doubles as a presentation space with 4K projection for renderings and virtual walkthroughs.",
                ],
            },
            {
                heading: "Design Process",
                body: [
                    "Our workflow moves from hand sketches to 3D modeling to physical prototypes. The studio includes a model shop with CNC capabilities for producing scale mockups of custom elements.",
                    "Clients are welcome throughout the design process. Coffee is always on.",
                ],
            },
        ],
        stats: [
            { label: "Studio SF", value: "3,200" },
            { label: "Team Members", value: "12" },
            { label: "Material Samples", value: "800+" },
            { label: "Active Projects", value: "8" },
        ],
    },
];

/**
 * Get all projects for listing page
 */
export function getAllProjects(): Project[] {
    return PROJECTS;
}

/**
 * Get single project by slug
 */
export function getProjectBySlug(slug: string): Project | undefined {
    return PROJECTS.find((project) => project.slug === slug);
}

/**
 * Get all slugs for static generation
 */
export function getAllProjectSlugs(): string[] {
    return PROJECTS.map((project) => project.slug);
}

/**
 * Get projects by category
 */
export function getProjectsByCategory(category: ProjectCategory): Project[] {
    return PROJECTS.filter((project) => project.category === category);
}
