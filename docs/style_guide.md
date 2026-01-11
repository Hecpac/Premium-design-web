# STYLE GUIDE: Premium Home Design System (v1.0)
**Estrategia:** Lujo Técnico & Confianza Radical
**Stack:** Tailwind CSS v4, Shadcn UI, Framer Motion
**Compliance:** WCAG 2.2 AA (ADA Title II)

---

## 1. Filosofía de Diseño: "The Glass Box"
Nuestro diseño no decora; revela. La interfaz actúa como una caja de cristal de alta precisión que expone la calidad de la construcción y la inteligencia de los datos.

*   **Neo-Swiss Trust:** Tipografía audaz, rejillas rigurosas y mucho espacio blanco para transmitir solvencia financiera y claridad [1, 2].
*   **Agentic Utility:** La IA no es mágica, es una herramienta. Se visualiza con patrones de "iluminación" (Carbon for AI) y estados de streaming visibles, no ocultos [3, 4].
*   **Performance as Luxury:** La interfaz debe responder en <200ms (INP). Las animaciones son breves y basadas en física, nunca lineales [5, 6].

---

## 2. Color System (Semantic & Accessible)
*Basado en el modelo de roles de Material 3 y contraste WCAG 2.2.*

### Paleta Neutral (Estructura)
Diseñada para soportar imágenes ricas sin competir con ellas.
- **Surface-100:** `#FFFFFF` (Fondo principal - Papel)
- **Surface-200:** `#F8F9FA` (Fondo secundario - Tarjetas Bento)
- **Surface-300:** `#E9ECEF` (Bordes sutiles, divisores)
- **Text-Primary:** `#111827` (Casi negro - Contraste máximo 15:1 para lectura)
- **Text-Secondary:** `#4B5563` (Gris frío - Para metadatos, contraste 4.5:1 min) [7, 8].

### Paleta Agéntica (La "Voz" de la IA)
Usamos la metáfora de la luz para la IA, evitando el cliché del "robot azul" [4].
- **AI-Core:** `#4F46E5` (Indigo Profundo - Acción principal del agente)
- **AI-Glow:** `rgba(79, 70, 229, 0.15)` (Halo sutil para estados activos)
- **AI-Streaming:** Gradiente lineal sutil que anima el texto mientras se genera.

### Paleta de Estado (Funcional)
- **Success:** `#059669` (Esmeralda - Confirmaciones, "Zonificación Aprobada")
- **Error:** `#DC2626` (Rojo Señal - Errores de formulario, contrastado para daltónicos) [9].

---

## 3. Tipografía: Jerarquía Expresiva
*Uso de `next/font` para cero layout shift (CLS).*

**Font Family:** `Inter` o `Geist Sans` (Variable font).
*Nota: Se descartan las Serif para UI para maximizar la legibilidad en interfaces densas de datos (tablas de costos, specs).*

| Rol | Tamaño / Peso | Tracking | Uso |
| :--- | :--- | :--- | :--- |
| **Display XL** | 64px / Bold | -2% | Héroes, Impacto Emocional |
| **Heading L** | 32px / SemiBold | -1% | Títulos de Sección, Bento Cards |
| **Heading M** | 24px / Medium | 0% | Títulos de Agente, Pasos del Funnel |
| **Body Base** | 16px / Regular | 0% | Lectura general (Larga duración) |
| **Label S** | 14px / Medium | +1% | Botones, Metadatos, Chips |
| **Micro** | 12px / Medium | +2% | Legales, Pies de foto (Min 12px para accesibilidad) |

---

## 4. UI Patterns & Componentes

### A. The Bento Grid (Layout Principal) [2, 10]
No usamos el scroll infinito tradicional. La información se organiza en módulos rectangulares autocontenidos.
*   **Gap:** `gap-4` (móvil) / `gap-6` (escritorio).
*   **Radio:** `rounded-xl` (12px) para suavizar la interfaz tecnológica [11].
*   **Comportamiento:** Las celdas se reordenan (reflow) según el viewport, pero mantienen su integridad interna.

### B. Streaming UI (Interfaz Agéntica) [12]
Como usamos Next.js 16 PPR, la UI tiene tres estados críticos que deben diseñarse:
1.  **Static Shell:** El "esqueleto" que carga instantáneamente (bordes, títulos).
2.  **Pulsing Skeleton:** No un spinner. Bloques grises que imitan la longitud del texto esperado (reduce carga cognitiva).
3.  **Streaming State:** El texto aparece progresivamente. Debe incluir un cursor parpadeante (`|`) para indicar actividad.

### C. Botones y Targets Táctiles [13, 14]
*   **Regla de Oro:** Todo elemento interactivo debe tener un área táctil mínima de **24x24px** (CSS pixels), idealmente **44x44px**.
*   **Focus States:** El foco del teclado debe ser visible y tener un contraste de 3:1. **Nunca** ocultar el `outline` del navegador sin reemplazarlo por uno de alto contraste (Regla: "Focus Not Obscured") [15].

---

## 5. Motion & Micro-interacciones
*Adiós a las curvas `ease-in-out`. Hola a la física.*

**Physics-Based Animation:**
Usamos resortes (springs) para una sensación natural y reactiva [6].
*   **Configuración Base (Framer Motion):**
    ```javascript
    transition: { type: "spring", stiffness: 300, damping: 30 }
    ```
*   **Uso:** Hovers, apertura de modales, expansión de tarjetas Bento.

**Reduced Motion (ADA):**
Todo movimiento debe respetar la preferencia del usuario.
```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}

--------------------------------------------------------------------------------
6. Iconografía e Imágenes
• Iconos: Phosphor Icons o Lucide (Trazo 1.5px o 2px). Consistentes, limpios, svg optimizados.
• Imágenes:
    ◦ Formato: AVIF obligatorio para LCP optimizado.
    ◦ Etiquetado: Toda imagen generada por IA (renders conceptuales) debe llevar un badge sutil "AI Generated" para mantener la transparencia y confianza.

--------------------------------------------------------------------------------
7. Checklist de Implementación (Dev Handoff)
• [ ] Configurar Tailwind v4: Definir colores semánticos en CSS variables.
• [ ] Instalar next/font: Configurar Inter/Geist con display: swap.
• [ ] Accesibilidad: Verificar contraste automático en componentes Shadcn.
• [ ] Dark Mode: Definir la inversión de colores (Surface-100 pasa a ser casi negro, no negro puro #000000 para evitar smearing en OLED).
• [ ] Motion: Crear un componente wrapper <MotionConfig> que detecte prefers-reduced-motion.

### Instrucciones para el Agente de Código:
Cuando generes componentes, **consulta este archivo primero**. No inventes colores hexadecimales; usa las variables semánt