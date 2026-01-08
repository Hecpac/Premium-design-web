import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

// ============================================================================
// FAQ DATA (English - Luxury Construction)
// Objection-handling focus, no risky ROI claims, demo-safe
// ============================================================================

interface FAQItem {
    question: string;
    answer: string;
}

const FAQ_DATA: FAQItem[] = [
    {
        question: "What does the initial consultation process look like?",
        answer:
            "We begin with a 90-minute discovery session to understand your vision, evaluate your site, and discuss preliminary budget parameters. This isn't a sales pitch—it's a feasibility consultation where we review zoning, topography, and design expectations before any commitment.",
    },
    {
        question: "What is the typical timeline for a luxury custom build?",
        answer:
            "For residences between 4,000 and 12,000 square feet, expect 14 to 20 months from design to completion. This includes 3-5 months of architectural design and permitting, followed by 11-15 months of construction. Our project management systems provide real-time timeline projections.",
    },
    {
        question: "How do you ensure budget transparency?",
        answer:
            "We eliminate financial uncertainty through either Cost-Plus or Fixed Fee models with complete transparency. You receive 24/7 access to our financial dashboard showing every invoice, receipt, and labor cost in real time. Realistic allowances are defined from day one.",
    },
    {
        question: "Do you handle all permits and local regulations?",
        answer:
            "Completely. We have deep experience navigating municipal requirements across Dallas, Highland Park, University Park, Westlake, and Southlake. We manage all inspections, civil engineering, soil studies, and HOA approvals so you never deal with city hall.",
    },
    {
        question: "What caliber of materials and craftsmanship do you specify?",
        answer:
            "We exclusively specify architectural-grade materials—from custom-cut Lueders limestone to solid walnut millwork and ultra-slim profile window systems. Our craftsmen are dedicated teams who've worked with us for years, not rotating subcontractors.",
    },
    {
        question: "Can you integrate advanced smart home technology?",
        answer:
            "It's our standard. We design low-voltage infrastructure into the plans from the start. Lutron Ketra lighting, Savant or Crestron climate control, biometric security, and invisible distributed audio are seamlessly integrated. Your home will be intuitive and future-proof.",
    },
    {
        question: "What warranty and post-delivery support do you provide?",
        answer:
            "We offer an industry-leading 10-year structural warranty plus 2 full years on systems and finishes—double the standard 1-year coverage. A dedicated concierge program handles seasonal adjustments and preventive maintenance during your first 12 months at no additional cost.",
    },
    {
        question: "How are design changes handled during construction?",
        answer:
            "Changes are natural in custom projects. We use a formal digital Change Order process. Before executing any modification, you receive an exact breakdown of cost and timeline impact for immediate approval on your phone. Nothing proceeds without your explicit authorization.",
    },
    {
        question: "How often will I receive project updates?",
        answer:
            "Communication is obsessive by design. You'll receive an executive progress report every Friday with photos, completed milestones, and the upcoming week's plan. Biweekly on-site meetings with your dedicated Project Manager address critical decisions.",
    },
    {
        question: "What sets Premium Home Design apart from other builders?",
        answer:
            "We combine commercial-grade engineering discipline with luxury design aesthetics. Where others see construction chaos, we see precision logistics. Our Operational Confidence approach means you'll never guess where your money is going or when your home will be finished.",
    },
    {
        question: "Which Dallas areas do you serve?",
        answer:
            "We focus on the prime real estate corridor: Preston Hollow, Park Cities (Highland Park and University Park), Lakewood, Midway Hollow, and north into Las Colinas, Southlake, and Westlake. We know the micro-markets and regulations of each exclusive district.",
    },
    {
        question: "What does a scheduled site visit include?",
        answer:
            "Our 'Book a Visit' isn't a sales tour—it's a private walkthrough of an active or recently completed project. You'll see what's behind the walls: insulation quality, site organization, cable management, and the details photos simply cannot convey.",
    },
];

// ============================================================================
// JSON-LD GENERATOR (Type-safe)
// ============================================================================

interface FAQPageSchema {
    "@context": "https://schema.org";
    "@type": "FAQPage";
    mainEntity: Array<{
        "@type": "Question";
        name: string;
        acceptedAnswer: {
            "@type": "Answer";
            text: string;
        };
    }>;
}

function generateFAQSchema(faqs: FAQItem[]): FAQPageSchema {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };
}

// ============================================================================
// FAQ SECTION COMPONENT (Server Component with Client Accordion)
// ============================================================================

export function FAQSection() {
    const faqSchema = generateFAQSchema(FAQ_DATA);

    return (
        <section
            className="max-w-4xl mx-auto py-24 md:py-32 px-6 relative"
            id="faq"
            aria-labelledby="faq-heading"
        >
            {/* 
                FAQPage JSON-LD - Injected safely via script tag
                Using dangerouslySetInnerHTML is safe here because:
                1. Content is generated server-side from static data
                2. No user input is included
                3. JSON.stringify escapes any special characters
            */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqSchema),
                }}
            />

            {/* Section Header */}
            <div className="text-center mb-16">
                <span className="text-label text-[hsl(var(--primary))] mb-4 block">
                    Common Questions
                </span>
                <h2
                    id="faq-heading"
                    className="text-white mb-4"
                >
                    Frequently{" "}
                    <span className="text-[hsl(var(--primary))] italic">Asked</span>
                </h2>
                <p className="text-zinc-400 max-w-2xl mx-auto">
                    Everything you need to know before starting your luxury custom build in Dallas.
                </p>
            </div>

            {/* Accordion - Client component isolated here */}
            <Accordion type="single" collapsible className="w-full">
                {FAQ_DATA.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>

            {/* Bottom CTA */}
            <div className="mt-16 text-center">
                <div className="thin-rule max-w-xs mx-auto mb-8 opacity-30" />
                <p className="text-zinc-500 text-sm mb-4">
                    Don't see your question?
                </p>
                <a
                    href="#contact"
                    className="text-[hsl(var(--primary))] hover:underline underline-offset-4 text-sm uppercase tracking-widest"
                >
                    Contact Us Directly
                </a>
            </div>
        </section>
    );
}

// ============================================================================
// EXPORTS
// ============================================================================

export { FAQ_DATA };
export type { FAQItem };