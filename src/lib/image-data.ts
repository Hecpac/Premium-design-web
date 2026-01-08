/**
 * Centralized Image Metadata
 *
 * Generated from scripts/optimize-images.js
 * Contains blurDataURL placeholders for all optimized WebP images.
 *
 * Usage in next/image:
 *   import { IMAGES } from "@/lib/image-data";
 *
 *   <Image
 *     src={IMAGES.heroTwilight.src}
 *     width={IMAGES.heroTwilight.width}
 *     height={IMAGES.heroTwilight.height}
 *     placeholder="blur"
 *     blurDataURL={IMAGES.heroTwilight.blurDataURL}
 *     ...
 *   />
 *
 * Agentrules v2.0.0 Regla #1 Compliance:
 *   - All images converted to WebP
 *   - Max 1920px width (originals were 1024px so unchanged)
 *   - blurDataURL generated for placeholder="blur"
 */

export interface ImageData {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
}

// ============================================================================
// HERO / MAIN IMAGES
// ============================================================================

export const IMAGES = {
  // Hero section background - CRITICAL LCP ELEMENT
  heroTwilight: {
    src: "/images/hero-twilight.webp",
    width: 1024,
    height: 1024,
    blurDataURL:
      "data:image/webp;base64,UklGRkYAAABXRUJQVlA4IDoAAADwAQCdASoKAAoABUB8JbACdAEQ/SQCcAAA/nalGyAuF8bMS0F2w5Ju/9oFNLRlP9WtyMBVpYOuwAAA",
  },

  // Parallax break section
  parallaxMansion: {
    src: "/images/parallax-mansion.webp",
    width: 1024,
    height: 1024,
    blurDataURL:
      "data:image/webp;base64,UklGRjgAAABXRUJQVlA4ICwAAADQAQCdASoKAAoABUB8JZwAAxeVxP4cAAD+7DqoNcGQZNEHWsVuLlWV/SpAAA==",
  },

  // Bento grid images
  bentoConcrete: {
    src: "/images/bento-concrete.webp",
    width: 1024,
    height: 1024,
    blurDataURL:
      "data:image/webp;base64,UklGRjYAAABXRUJQVlA4ICoAAACwAQCdASoKAAoABUB8JZQAAucgFgAAAP7PfXIx7UqetnfuhL4W34EAAAA=",
  },
  bentoBlueprints: {
    src: "/images/bento-blueprints.webp",
    width: 1024,
    height: 1024,
    blurDataURL:
      "data:image/webp;base64,UklGRj4AAABXRUJQVlA4IDIAAABwAQCdASoKAAoABUB8JZwAAk4sQAD+7qwjBeooA/342n+LCxA+SrzRGc4VVzCRmOAAAA==",
  },
  bentoThermostat: {
    src: "/images/bento-thermostat.webp",
    width: 1024,
    height: 1024,
    blurDataURL:
      "data:image/webp;base64,UklGRj4AAABXRUJQVlA4IDIAAAAQAgCdASoKAAoABUB8JYwC7ADc+DHQ+XBwAP7s2W2hlgfXuBduPfQdl6xK0gKZAFkAAA==",
  },
} as const satisfies Record<string, ImageData>;

// ============================================================================
// INSIGHTS IMAGES
// ============================================================================

export const INSIGHT_IMAGES = {
  costOfLuxury: {
    src: "/images/insights/cost-of-luxury.webp",
    width: 1024,
    height: 1024,
    blurDataURL:
      "data:image/webp;base64,UklGRkQAAABXRUJQVlA4IDgAAACQAQCdASoKAAoABUB8JQBOgBsYN1AA/sBqjR/g4i3uJv2PByCsMcDJSebrTODHp2ajt4hxTtjAAA==",
  },
  smartHome: {
    src: "/images/insights/smart-home.webp",
    width: 1024,
    height: 1024,
    blurDataURL:
      "data:image/webp;base64,UklGRkYAAABXRUJQVlA4IDoAAADQAQCdASoKAAoABUB8JYwCdADdoFKxoAD+5SLtNOSpUXzDHanCfEjIUkQdhiOTdYyUjYWgfOXHIAAA",
  },
  concreteLight: {
    src: "/images/insights/concrete-light.webp",
    width: 1024,
    height: 1024,
    blurDataURL:
      "data:image/webp;base64,UklGRkYAAABXRUJQVlA4IDoAAACQAQCdASoKAAoABUB8JZwAAlRApCAA/tJkJhrC4n9BQ5VCEAKdUiEkdpQydNSICgRps7PrxbCl4AAA",
  },
} as const satisfies Record<string, ImageData>;

// ============================================================================
// SELECTED WORKS / PORTFOLIO IMAGES
// ============================================================================

export const SELECTED_WORKS_IMAGES = {
  portfolioCollage: {
    src: "/images/selected-works/portfolio-collage.webp",
    width: 1024,
    height: 1024,
    blurDataURL:
      "data:image/webp;base64,UklGRj4AAABXRUJQVlA4IDIAAACQAQCdASoKAAoABUB8JZQAAl1UKoAA/nWNguKxvtzbHy2SU4Yytf8Drnq527k0gBEgAA==",
  },
  villaLasColinas: {
    src: "/images/selected-works/villa-las-colinas.webp",
    width: 1024,
    height: 1024,
    blurDataURL:
      "data:image/webp;base64,UklGRkYAAABXRUJQVlA4IDoAAAAQAgCdASoKAAoABUB8JYgCdAEXfnYVDELAAP7csRX/QoEPpRk7fSBpVjvTMIszvTggJQH0Yfr6AAAA",
  },
  penthouseUptown: {
    src: "/images/selected-works/penthouse-uptown.webp",
    width: 1024,
    height: 1024,
    blurDataURL:
      "data:image/webp;base64,UklGRjwAAABXRUJQVlA4IDAAAABQAQCdASoKAAoABUB8JZwABDOAAP7vhGSG8qdS5MHTZyOvRGqnPTRDkzpSr3z4AAA=",
  },
  estateHighlandPark: {
    src: "/images/selected-works/estate-highland-park.webp",
    width: 1024,
    height: 1024,
    blurDataURL:
      "data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAAAQAgCdASoKAAoABUB8JYgCdAD0kHXh9BQAAP5zIP6F/HOYnI4uuu9yVc4aMBZ1c3W510wL8VmWh8GSZW2eGHgQAAA=",
  },
  residencePrestonHollow: {
    src: "/images/selected-works/residence-preston-hollow.webp",
    width: 1024,
    height: 1024,
    blurDataURL:
      "data:image/webp;base64,UklGRjgAAABXRUJQVlA4ICwAAADwAQCdASoKAAoABUB8JYwCw7ELX9HFpAAA/uVwrZaV04CG/qaDdaOkPXSAAA==",
  },
  mansionSouthlake: {
    src: "/images/selected-works/mansion-southlake.webp",
    width: 1024,
    height: 1024,
    blurDataURL:
      "data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAADQAQCdASoKAAoABUB8JYgCdAEOeUgwAAD+PJFzW7S3JwHyplBWghA1JorkcVtg+j7xNJIdE7rrjnaAAAA=",
  },
  newProject: {
    src: "/images/selected-works/new-project.webp",
    width: 1024,
    height: 550,
    blurDataURL:
      "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACwAQCdASoKAAUABUB8JaQAAu18O2vAAP7vWfCM2pMGnxGgwAAAAA==",
  },
  architectOfficeTools: {
    src: "/images/selected-works/architect-office-tools.webp",
    width: 1024,
    height: 1024,
    blurDataURL:
      "data:image/webp;base64,UklGRlQAAABXRUJQVlA4IEgAAADwAQCdASoKAAoABUB8JYgCdH8AE0gZbgAA/qnJsdkxBdHQQ/cWY/UahVSOOsbCTGn0cXjO9bDb0IEvekBHH7yEhSbX2/YAAAA=",
  },
  casaDallas: {
    src: "/images/selected-works/casa-dallas.webp",
    width: 1024,
    height: 1024,
    blurDataURL:
      "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAAAwAgCdASoKAAoABUB8JZgCdGuAAoZLsoxFCAD+5bQoihcMF+AwXk1QJ3VwkBgNGqammn0DyOBPe6ChfCoQNjhGjPAAAA==",
  },
} as const satisfies Record<string, ImageData>;

// ============================================================================
// HELPER: Get image by public path (for dynamic lookups)
// ============================================================================

const ALL_IMAGES: Record<string, ImageData> = {
  ...Object.fromEntries(
    Object.entries(IMAGES).map(([_, v]) => [v.src, v])
  ),
  ...Object.fromEntries(
    Object.entries(INSIGHT_IMAGES).map(([_, v]) => [v.src, v])
  ),
  ...Object.fromEntries(
    Object.entries(SELECTED_WORKS_IMAGES).map(([_, v]) => [v.src, v])
  ),
};

/**
 * Get image data by public path (e.g., "/images/hero-twilight.webp")
 * Returns undefined if not found (useful for graceful fallback)
 */
export function getImageData(publicPath: string): ImageData | undefined {
  return ALL_IMAGES[publicPath];
}

/**
 * Convert a .png path to .webp path
 * Useful during migration
 */
export function toWebpPath(pngPath: string): string {
  return pngPath.replace(/\.png$/i, ".webp");
}
