import { z } from "zod";

/**
 * Contact Form Schema - Validación completa con Zod
 * Agentrules v2.0.0 Regla #8: Formularios con validación robusta
 */

// Regex para teléfono internacional (E.164 format) o formato US
const PHONE_REGEX = /^(\+?1)?[-.\s]?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/;

// Tipos de interés disponibles
export const INTEREST_OPTIONS = [
    { value: "new-build", label: "New Build" },
    { value: "renovation", label: "Renovation" },
    { value: "investment", label: "Investment" },
    { value: "consultation", label: "General Consultation" },
] as const;

export const BUDGET_OPTIONS = [
    { value: "under-500k", label: "< $500k" },
    { value: "500k-1m", label: "$500k - $1M" },
    { value: "1m-5m", label: "$1M - $5M" },
    { value: "above-5m", label: "$5M+" },
] as const;

export const TIMELINE_OPTIONS = [
    { value: "immediate", label: "< 6 Months" },
    { value: "medium", label: "6 - 12 Months" },
    { value: "long", label: "12+ Months" },
] as const;

export type InterestType = (typeof INTEREST_OPTIONS)[number]["value"];
export type BudgetType = (typeof BUDGET_OPTIONS)[number]["value"];
export type TimelineType = (typeof TIMELINE_OPTIONS)[number]["value"];

/**
 * Schema de validación para el formulario de contacto
 */
export const contactSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be less than 50 characters")
        .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Name contains invalid characters"),

    email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email address")
        .max(100, "Email is too long"),

    phone: z
        .string()
        .regex(PHONE_REGEX, "Please enter a valid phone number (e.g., 214-555-1234)")
        .optional()
        .or(z.literal("")),

    interest: z.enum(["new-build", "renovation", "investment", "consultation"], {
        message: "Please select an option",
    }),

    budget: z.enum(["under-500k", "500k-1m", "1m-5m", "above-5m"], {
        message: "Please select a budget range",
    }),

    timeline: z.enum(["immediate", "medium", "long"], {
        message: "Please select a timeline",
    }),

    message: z
        .string()
        .min(10, "Message must be at least 10 characters")
        .max(1000, "Message must be less than 1000 characters"),

    privacyAccepted: z
        .boolean()
        .refine((val) => val === true, {
            message: "You must accept the privacy policy to continue",
        }),
});

/**
 * Tipo inferido del schema para TypeScript
 */
export type ContactFormData = z.infer<typeof contactSchema>;

/**
 * Schema para validación parcial (draft saving)
 */
export const contactDraftSchema = contactSchema.partial();

export type ContactDraftData = z.infer<typeof contactDraftSchema>;

/**
 * Valores por defecto para el formulario
 */
export const contactFormDefaults: ContactFormData = {
    name: "",
    email: "",
    phone: "",
    interest: "new-build",
    budget: "under-500k",
    timeline: "medium",
    message: "",
    privacyAccepted: false,
};
