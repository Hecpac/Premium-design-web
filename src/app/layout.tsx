import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Providers } from "@/components/providers";
import { WebVitals } from "@/components/web-vitals";
import "./globals.css";

/**
 * FONT OPTIMIZATION (CLS/FOUT Prevention)
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  adjustFontFallback: true,
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  style: ["normal", "italic"],
  adjustFontFallback: true,
});

/**
 * ENHANCED METADATA for GEO/AEO
 * - OpenGraph for social sharing
 * - Twitter Cards for X/Twitter
 * - Robots/Canonical handled by Next.js defaults
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://www.premiumhome.design"),
  title: {
    default: "Premium Home Design | Luxury Custom Homes in Dallas",
    template: "%s | Premium Home",
  },
  description:
    "Construimos casas de lujo personalizadas en Dallas y Las Colinas. Diseño arquitectónico premium, transparencia radical y tecnología de construcción avanzada.",
  keywords: [
    "luxury homes Dallas",
    "custom home builder",
    "architectural design",
    "smart home construction",
    "premium real estate",
    "Las Colinas homes",
  ],
  authors: [{ name: "Premium Home Design" }],
  creator: "Premium Home Design",
  publisher: "Premium Home Design",

  // OpenGraph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.premiumhome.design",
    siteName: "Premium Home Design",
    title: "Premium Home Design | Luxury Custom Homes in Dallas",
    description:
      "Arquitectura de lujo personalizada en Dallas. Transparencia radical, materiales premium y tecnología de construcción avanzada.",
    images: [
      {
        url: "/images/og-hero.jpg", // Should be 1200x630
        width: 1200,
        height: 630,
        alt: "Luxury Villa at Twilight by Premium Home Design",
      },
    ],
  },

  // Twitter/X Cards
  twitter: {
    card: "summary_large_image",
    title: "Premium Home Design | Luxury Custom Homes",
    description:
      "Arquitectura de lujo en Dallas. Diseño, construcción y smart home integration.",
    images: ["/images/og-hero.jpg"],
    creator: "@premiumhome",
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

/**
 * JSON-LD Structured Data
 * - Organization: Main business entity
 * - WebSite: For sitelinks searchbox potential
 * - LocalBusiness: For Google Maps / Local Pack
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.premiumhome.design/#organization",
      name: "Premium Home Design",
      url: "https://www.premiumhome.design",
      logo: {
        "@type": "ImageObject",
        url: "https://www.premiumhome.design/images/logo.png",
        width: 512,
        height: 512,
      },
      sameAs: [
        "https://www.instagram.com/premiumhome",
        "https://www.linkedin.com/company/premiumhome",
        "https://www.facebook.com/premiumhome",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-214-555-0100",
        contactType: "sales",
        areaServed: ["Dallas", "Las Colinas", "Highland Park", "Plano"],
        availableLanguage: ["English", "Spanish"],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.premiumhome.design/#website",
      url: "https://www.premiumhome.design",
      name: "Premium Home Design",
      publisher: {
        "@id": "https://www.premiumhome.design/#organization",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://www.premiumhome.design/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://www.premiumhome.design/#localbusiness",
      name: "Premium Home Design",
      image: "https://www.premiumhome.design/images/og-hero.jpg",
      "@type": ["HomeBuilder", "GeneralContractor"],
      address: {
        "@type": "PostalAddress",
        streetAddress: "1234 Luxury Lane",
        addressLocality: "Dallas",
        addressRegion: "TX",
        postalCode: "75201",
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 32.7767,
        longitude: -96.797,
      },
      url: "https://www.premiumhome.design",
      telephone: "+1-214-555-0100",
      priceRange: "$$$",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "47",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased font-sans">
        <Providers>
          <WebVitals />
          {children}
        </Providers>
      </body>
    </html>
  );
}
