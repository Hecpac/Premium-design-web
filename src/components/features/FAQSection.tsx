import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

// ============================================================================
// FAQ DATA (Spanish - Luxury Construction)
// Objection-handling focus, no risky ROI claims
// ============================================================================

interface FAQItem {
    question: string;
    answer: string;
}

const FAQ_DATA: FAQItem[] = [
    {
        question: "¿Cómo es el proceso de consulta inicial?",
        answer:
            "Comenzamos con una sesión de descubrimiento de 90 minutos para analizar su visión, terreno y presupuesto preliminar. No es una simple venta; es una consultoría de factibilidad donde revisamos zonificación, topografía y expectativas de diseño antes de firmar cualquier contrato. Salimos de esta reunión con una hoja de ruta clara.",
    },
    {
        question: "¿Cuál es el tiempo promedio de construcción?",
        answer:
            "Para residencias de lujo (4,000 - 12,000 sqft), el ciclo completo oscila entre 14 y 20 meses. Esto incluye 3-5 meses de diseño arquitectónico y permisos, y 11-15 meses de construcción física. Nuestro software de gestión nos permite mitigar retrasos por clima o cadena de suministro con proyecciones precisas.",
    },
    {
        question: "¿Cómo garantizan la transparencia en el presupuesto?",
        answer:
            "Eliminamos el misterio financiero. Operamos bajo un modelo de 'Cost-Plus' o 'Fixed Fee' transparente. Usted tiene acceso 24/7 a nuestro dashboard financiero donde ve cada factura, recibo y costo de mano de obra en tiempo real. Definimos 'allowances' realistas desde el día 1 para evitar sorpresas en acabados.",
    },
    {
        question: "¿Se encargan de los permisos y regulaciones locales?",
        answer:
            "Absolutamente. Tenemos amplia experiencia navegando la burocracia de Dallas, Highland Park, University Park, Westlake y Southlake. Gestionamos todas las inspecciones, ingeniería civil, estudios de suelo y aprobaciones de HOAs estrictas para que usted no tenga que lidiar con el ayuntamiento.",
    },
    {
        question: "¿Qué tipo de materiales y artesanía utilizan?",
        answer:
            "Solo especificamos materiales de grado arquitectónico. Desde piedra caliza Lueders cortada a medida hasta carpintería de nogal sólido y sistemas de ventanas de perfil ultra-delgado. Nuestros artesanos son equipos dedicados que llevan años trabajando con nosotros, no subcontratistas rotativos de baja calidad.",
    },
    {
        question: "¿Pueden integrar tecnología Smart Home avanzada?",
        answer:
            "Es nuestro estándar. Diseñamos la infraestructura de bajo voltaje desde los planos. Integramos iluminación Lutron Ketra, control climático Savant/Crestron, seguridad biométrica y audio distribuido invisible. Su casa no solo será inteligente, será intuitiva y a prueba de futuro.",
    },
    {
        question: "¿Qué garantía y soporte ofrecen post-entrega?",
        answer:
            "Ofrecemos una garantía estructural de 10 años líder en la industria, más 2 años completos en instalaciones (el doble del estándar de 1 año). Además, incluimos un programa de 'Concierge' durante los primeros 12 meses para ajustes estacionales y mantenimiento preventivo sin costo adicional.",
    },
    {
        question: "¿Cómo manejan los cambios de diseño durante la obra?",
        answer:
            "Los cambios son naturales en proyectos custom. Utilizamos un proceso formal de 'Change Order' digital. Antes de ejecutar cualquier cambio, usted recibe un desglose exacto del impacto en costo y tiempo para su aprobación inmediata en su teléfono. Nada se hace sin su autorización explícita.",
    },
    {
        question: "¿Cuál es la frecuencia de comunicación durante el proyecto?",
        answer:
            "Comunicación obsesiva. Recibirá un reporte ejecutivo cada viernes con fotos de progreso, hitos alcanzados y plan para la siguiente semana. Además, tendrá reuniones quincenales en sitio (o por Zoom) con su Project Manager dedicado para decisiones críticas.",
    },
    {
        question: "¿Qué diferencia a Premium Home Design de otros constructores?",
        answer:
            "Unimos la disciplina de la ingeniería comercial con la estética del diseño de lujo. Donde otros ven 'caos de construcción', nosotros vemos logística de precisión. Nuestro enfoque en 'Confianza Operacional' significa que nunca tendrá que adivinar dónde está su dinero o cuándo terminará su casa.",
    },
    {
        question: "¿En qué áreas específicas de Dallas construyen?",
        answer:
            "Nos enfocamos en el corredor inmobilario prime: Preston Hollow, Park Cities (Highland Park/University Park), Lakewood, Midway Hollow, y hacia el norte en Las Colinas, Southlake y Westlake. Conocemos los micro-mercados y regulaciones de cada uno de estos distritos exclusivos.",
    },
    {
        question: "¿Qué incluye la visita agendada desde la web?",
        answer:
            "La visita 'Book a Visit' no es un tour de ventas. Es un recorrido privado por una de nuestras obras activas o recién terminadas. Verá lo que hay detrás de las paredes: la calidad del aislamiento, la limpieza del sitio, la organización del cableado y los detalles que las fotos no pueden mostrar.",
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
                    Resolvemos sus dudas
                </span>
                <h2
                    id="faq-heading"
                    className="text-white mb-4"
                >
                    Preguntas{" "}
                    <span className="text-[hsl(var(--primary))] italic">Frecuentes</span>
                </h2>
                <p className="text-zinc-400 max-w-2xl mx-auto">
                    Todo lo que necesita saber antes de comenzar su proyecto de construcción de lujo en Dallas.
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
                    ¿No encuentra su pregunta?
                </p>
                <a
                    href="#contact"
                    className="text-[hsl(var(--primary))] hover:underline underline-offset-4 text-sm uppercase tracking-widest"
                >
                    Contáctenos directamente
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