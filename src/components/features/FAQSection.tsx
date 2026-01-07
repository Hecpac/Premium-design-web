import Script from "next/script";

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: "¿Cuánto cuesta construir una casa de lujo en Dallas?",
        answer:
            "El costo de construir una casa de lujo personalizada en Dallas varía entre $350 y $700 por pie cuadrado, dependiendo de los acabados, tecnología smart home y complejidad arquitectónica. Nuestros proyectos típicos oscilan entre $1.5M y $8M+ para residencias de 4,000 a 12,000 sqft.",
    },
    {
        question: "¿Cuál es el proceso de construcción de Premium Home Design?",
        answer:
            "Nuestro proceso consta de 5 fases: (1) Descubrimiento y briefing, (2) Diseño arquitectónico y renders 3D, (3) Ingeniería y permisos, (4) Construcción con reportes semanales en tiempo real, (5) Entrega con garantía de 2 años. El timeline típico es de 14-18 meses.",
    },
    {
        question: "¿Pueden integrar tecnología smart home en mi nueva casa?",
        answer:
            "Sí, somos especialistas en integración de domótica de nivel enterprise. Instalamos sistemas Crestron, Control4, Lutron y Savant para control de iluminación, clima, seguridad, audio/video y automatización completa. Cada casa incluye infraestructura Cat6A y fibra óptica.",
    },
    {
        question: "¿Trabajan en Las Colinas y Highland Park?",
        answer:
            "Operamos en todo el área metropolitana de Dallas-Fort Worth, incluyendo Las Colinas, Highland Park, University Park, Preston Hollow, Southlake y Westlake. Cada zona tiene requisitos municipales específicos que dominamos.",
    },
    {
        question: "¿Qué hace diferente a Premium Home Design?",
        answer:
            "Tres diferenciadores clave: (1) Transparencia radical - acceso 24/7 a costos reales y timeline via dashboard, (2) Arquitectura de autor con materiales importados, (3) Garantía estructural de 10 años + 2 años acabados. No trabajamos con subcontratistas rotatorios; nuestros equipos son permanentes.",
    },
];

// Generate FAQPage JSON-LD
const faqJsonLd = {
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

export function FAQSection() {
    return (
        <section
            className="max-w-4xl mx-auto py-24 px-6"
            aria-labelledby="faq-heading"
        >
            {/* FAQPage JSON-LD */}
            <Script
                id="faq-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />

            <h2
                id="faq-heading"
                className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-[hsl(var(--foreground))] mb-12 text-center"
            >
                Preguntas Frecuentes
            </h2>

            <div className="space-y-8">
                {faqs.map((faq, index) => (
                    <article
                        key={index}
                        className="border-b border-white/10 pb-8 last:border-b-0"
                    >
                        <h3 className="font-[family-name:var(--font-playfair)] text-xl md:text-2xl text-[hsl(var(--foreground))] mb-3">
                            {faq.question}
                        </h3>
                        <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">
                            {faq.answer}
                        </p>
                    </article>
                ))}
            </div>
        </section>
    );
}
