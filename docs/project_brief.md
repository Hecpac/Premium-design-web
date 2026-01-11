PROJECT BRIEF: Premium Home Design – Plataforma de Inteligencia Inmobiliaria (v2.0)
1. Visión Estratégica: "El Sistema Operativo del Hogar"
Ya no estamos construyendo un catálogo pasivo. El objetivo es desplegar una infraestructura agéntica de doble interfaz: una experiencia visual inmersiva para compradores humanos (HNWI) y una capa de datos estructurados para sus asistentes de IA. La plataforma debe proyectar "Lujo Técnico": la velocidad y la inteligencia son los nuevos indicadores de exclusividad.
2. Objetivos de Negocio y KPIs (Redefinidos para 2026)
• Velocidad de Percepción: INP (Interaction to Next Paint) < 200ms estricto. La interfaz debe sentirse instantánea para transmitir solidez financiera.
• Visibilidad Agéntica: Lograr que el inventario sea citado por motores de respuesta (ChatGPT/Claude/Perplexity) mediante una estrategia llms.txt perfecta.
• Conversión Asistida: Aumentar la calificación de leads mediante un Agente Concierge que pre-califica presupuesto y zonificación en tiempo real, reduciendo la fricción humana inicial.
• Mitigación de Riesgo: Cumplimiento nativo ADA Title II / WCAG 2.1 AA antes de la fecha límite de abril de 2026 para evitar litigios.
3. Stack Tecnológico (Arquitectura Next-Gen)
• Core Framework: Next.js 16 con PPR (Partial Prerendering) habilitado.
    ◦ Por qué: Servir un "Shell" estático instantáneo desde el borde (Edge) mientras se hace streaming dinámico de precios y disponibilidad.
• Interoperabilidad: Model Context Protocol (MCP).
    ◦ Por qué: Exponer la base de datos de propiedades y zonificación de forma segura para que agentes externos puedan consultarla sin alucinaciones.
• Design System & UI: Híbrido Shadcn + Material Design 3 (Expressive).
    ◦ Estilo: "Bento Grid" modular para alta densidad de información.
    ◦ Motion: Animaciones basadas en física (springs) para una sensación natural y premium.
• Visualización: WebGPU (vía Three.js/Spline) con carga diferida.
    ◦ Mejora: Renders en tiempo real de acabados, pero priorizando LCP (Largest Contentful Paint).
4. Experiencia de Usuario (UX) y Flujos
• Navegación: Implementar un menú "View All" en cada nivel de categoría para evitar la fatiga de clics en móvil (patrón anti-overcategorization).
• Búsqueda: Búsqueda semántica tolerante a abreviaturas ("3pc sofa", "4bd house") y sugerencias de alcance de categoría ("en Cocinas", "en Exteriores").
• Micro-interacciones: Indicadores de estado de carga "agénticos" (ej. "Analizando zonificación...", "Calculando costos...") en lugar de spinners genéricos para gestionar la espera en consultas complejas.
5. Estrategia de Contenido (Dual Audience)
• Para Humanos: Imágenes AVIF de alta fidelidad con soporte de Social Proof visual (fotos de instagram curadas de clientes reales) en páginas de producto.
• Para IAs (SEO 2.0): Implementación de llms.txt en la raíz del sitio.
    ◦ Contenido: Resúmenes Markdown de especificaciones técnicas, precios base, y FAQs de zonificación, optimizados para el contexto de los LLMs.
    ◦ Schema Markup: JSON-LD exhaustivo para Product, RealEstateListing y Offer para dominar los Rich Results.
6. Seguridad y Gobernanza (NIST AI RMF)
• Transparencia: Etiquetado claro de cualquier render o texto generado por IA siguiendo los estándares de Carbon for AI (Explainability).
• Protección de Datos: Los agentes no deben retener PII (Información Personal Identificable) en sus logs de entrenamiento. Implementación de "Safe-Halt" para evitar que el agente alucine promesas contractuales.
7. Entregables Inmediatos (Sprint 1)
1. Auditoría de Activos: Inventario de renders y textos para conversión a formatos optimizados (AVIF/Markdown).
2. Setup Técnico: Inicializar repo con Next.js 16 + adaptadores MCP.
3. Prototipo Visual: Diseño de "Card Bento" para la ficha de propiedad con estados de carga PPR.
4. Matriz de Riesgo: Checklist de cumplimiento ADA para el diseño de colores y navegación por teclado.

--------------------------------------------------------------------------------
Nota del Director de Diseño: Este brief elimina la deuda técnica antes de que se cree. Al adoptar Next.js 16 y MCP ahora, nos ahorramos una reescritura costosa en 18 meses y nos posicionamos como la única constructora lista para la economía agéntica de 2026.
