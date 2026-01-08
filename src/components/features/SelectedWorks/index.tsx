import { SelectedWorksClient, WorkItem } from "./SelectedWorksClient";

// ============================================================================
// DEMO DATA - Typed Work Items
// Images located in /public/images/selected-works/
// Agentrules v2.0.0 Regla #1: All images converted to WebP format
// ============================================================================

const WORKS_DATA: WorkItem[] = [
    {
        id: "01",
        title: "Villa Las Colinas",
        category: "Estates",
        location: "Las Colinas, TX",
        image: "/images/selected-works/villa-las-colinas.webp",
        year: "2024",
        slug: "villa-las-colinas",
        featured: true, // Will display as large card in "All" view
    },
    {
        id: "02",
        title: "Skyline Penthouse",
        category: "Interiors",
        location: "Uptown Dallas",
        image: "/images/selected-works/penthouse-uptown.webp",
        year: "2025",
        slug: "skyline-penthouse",
    },
    {
        id: "03",
        title: "Highland Park Estate",
        category: "Estates",
        location: "Highland Park",
        image: "/images/selected-works/estate-highland-park.webp",
        year: "2024",
        slug: "highland-park-estate",
    },
    {
        id: "04",
        title: "Glass Residence",
        category: "Residences",
        location: "Preston Hollow",
        image: "/images/selected-works/residence-preston-hollow.webp",
        year: "2025",
        slug: "glass-residence",
    },
    {
        id: "05",
        title: "Southlake Manor",
        category: "Estates",
        location: "Southlake, TX",
        image: "/images/selected-works/mansion-southlake.webp",
        year: "2024",
        slug: "southlake-manor",
    },
    {
        id: "06",
        title: "Lakeside Pavilion",
        category: "Residences",
        location: "Grapevine, TX",
        image: "/images/selected-works/casa-dallas.webp",
        year: "2026",
        slug: "lakeside-pavilion",
    },
    {
        id: "07",
        title: "The Design Atelier",
        category: "Interiors",
        location: "Dallas HQ",
        image: "/images/selected-works/architect-office-tools.webp",
        year: "2026",
        slug: "design-atelier",
    },
];

// ============================================================================
// SERVER COMPONENT - Passes data to client
// ============================================================================

export function SelectedWorks() {
    return <SelectedWorksClient items={WORKS_DATA} />;
}

// Re-export types for external usage
export type { WorkItem, WorkCategory } from "./SelectedWorksClient";
