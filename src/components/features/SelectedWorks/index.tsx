import { SelectedWorksClient, WorkItem } from "./SelectedWorksClient";

// ============================================================================
// DEMO DATA - Typed Work Items
// Images located in /public/images/selected-works/
// ============================================================================

const WORKS_DATA: WorkItem[] = [
    {
        id: "01",
        title: "The Design Atelier",
        category: "Interiors",
        location: "Dallas HQ",
        image: "/images/selected-works/architect-office-tools.png",
        year: "2026",
        slug: "design-atelier",
        featured: true, // Will display as large card in "All" view
    },
    {
        id: "02",
        title: "Villa Las Colinas",
        category: "Estates",
        location: "Las Colinas, TX",
        image: "/images/selected-works/villa-las-colinas.png",
        year: "2024",
        slug: "villa-las-colinas",
    },
    {
        id: "03",
        title: "Skyline Penthouse",
        category: "Interiors",
        location: "Uptown Dallas",
        image: "/images/selected-works/penthouse-uptown.png",
        year: "2025",
        slug: "skyline-penthouse",
    },
    {
        id: "04",
        title: "Highland Park Estate",
        category: "Estates",
        location: "Highland Park",
        image: "/images/selected-works/estate-highland-park.png",
        year: "2024",
        slug: "highland-park-estate",
    },
    {
        id: "05",
        title: "Glass Residence",
        category: "Residences",
        location: "Preston Hollow",
        image: "/images/selected-works/residence-preston-hollow.png",
        year: "2025",
        slug: "glass-residence",
    },
    {
        id: "06",
        title: "Southlake Manor",
        category: "Estates",
        location: "Southlake, TX",
        image: "/images/selected-works/mansion-southlake.png",
        year: "2024",
        slug: "southlake-manor",
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
