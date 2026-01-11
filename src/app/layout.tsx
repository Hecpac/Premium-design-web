import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "@/components/providers";
import { WebVitals } from "@/components/web-vitals";
import { AxeDevtools } from "@/components/axe-devtools";
import { TechnicalNavbar } from "@/components/ui/TechnicalNavbar";
import { TechnicalFooter } from "@/components/ui/TechnicalFooter";
import "./globals.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

/**
 * FONT OPTIMIZATION (CLS/FOUT Prevention)
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["300", "400", "500", "600", "700"],
  adjustFontFallback: true,
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["400", "700", "900"],
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Premium Home Design | Luxury Custom Homes in Dallas",
    template: "%s | Premium Home",
  },
  description:
    "Luxury architectural design in Dallas and Las Colinas. Radical transparency, premium materials, and construction technology—crafted as a cinematic concept demo.",
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
    url: SITE_URL,
    siteName: "Premium Home Design",
    title: "Premium Home Design | Luxury Custom Homes in Dallas",
    description:
      "Luxury architectural design in Dallas—precision engineering, premium materials, and a radically transparent process.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Premium Home Design — Luxury Meets Meaning",
      },
    ],
  },

  // Twitter/X Cards
  twitter: {
    card: "summary_large_image",
    title: "Premium Home Design | Luxury Custom Homes",
    description:
      "Luxury architectural design in Dallas—precision engineering, premium materials, and a radically transparent process.",
    images: ["/twitter-image"],
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
      "@id": `${SITE_URL}/#organization`,
      name: "Premium Home Design",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon.svg`,
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
        availableLanguage: ["English"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Premium Home Design",
      publisher: {
        "@id": `${SITE_URL}/#organization`,
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
      <body className="bg-black text-[#ededed] antialiased font-sans selection:bg-white selection:text-black">
        {/* WCAG skip link (Regla #10) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-primary-foreground focus:px-6 focus:py-3 focus:rounded-md focus:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Skip to main content
        </a>
        <Providers>
          <AxeDevtools />
          <WebVitals />

          {/* GLOBAL COMMAND BAR */}
          <TechnicalNavbar />

          {/* PAGE CONTENT */}
          {children}

          {/* GLOBAL BLUEPRINT FOOTER */}
          <div id="contact" className="scroll-mt-20">
            <TechnicalFooter />
          </div>
        </Providers>
        {/* Vercel Analytics - Page views, visitors, top pages */}
        <Analytics />
        {/* Vercel Speed Insights - Core Web Vitals monitoring */}
        <SpeedInsights />
      </body>
    </html>
  );
}
