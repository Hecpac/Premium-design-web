"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import {
    contactSchema,
    type ContactFormData,
    INTEREST_OPTIONS,
    contactFormDefaults,
} from "@/lib/validations/contact-schema";
import { cn } from "@/lib/utils";

// ============================================================================
// TYPES
// ============================================================================

type SubmitStatus = "idle" | "submitting" | "success" | "error";

// ============================================================================
// FIELD INPUT COMPONENT (Reusable)
// ============================================================================

interface FieldInputProps {
    id: string;
    label: string;
    type?: "text" | "email" | "tel";
    placeholder: string;
    error?: string;
    required?: boolean;
    register: ReturnType<typeof useForm<ContactFormData>>["register"];
    fieldName: keyof ContactFormData;
}

function FieldInput({
    id,
    label,
    type = "text",
    placeholder,
    error,
    required = false,
    register,
    fieldName,
}: FieldInputProps) {
    return (
        <div className="relative group">
            <label htmlFor={id} className="sr-only">
                {label}
            </label>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                required={required}
                aria-invalid={error ? "true" : "false"}
                aria-describedby={error ? `${id}-error` : undefined}
                aria-required={required}
                {...register(fieldName)}
                className={cn(
                    "w-full bg-transparent border-b py-4 text-xl md:text-2xl text-white",
                    "placeholder:text-zinc-700 outline-none transition-colors duration-200",
                    "focus:border-[hsl(var(--primary))]",
                    error ? "border-red-500/50" : "border-white/20"
                )}
            />
            <AnimatePresence mode="wait">
                {error && (
                    <m.p
                        id={`${id}-error`}
                        role="alert"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-400 text-xs mt-2 tracking-widest uppercase flex items-center gap-1"
                    >
                        <AlertCircle className="w-3 h-3" />
                        {error}
                    </m.p>
                )}
            </AnimatePresence>
        </div>
    );
}

// ============================================================================
// SUCCESS STATE COMPONENT
// ============================================================================

function SuccessState({ onReset }: { onReset: () => void }) {
    const prefersReducedMotion = useReducedMotion();

    return (
        <m.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-xl mx-auto text-center p-12 border border-white/10 bg-white/5 backdrop-blur-md rounded-sm"
            role="status"
            aria-live="polite"
        >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h3 className="text-3xl font-[family-name:var(--font-playfair)] text-white mb-4">
                Message Received.
            </h3>
            <p className="text-zinc-400 mb-8">
                We will be in touch strictly within 24 hours.
            </p>
            <Button variant="outline" onClick={onReset}>
                Send another message
            </Button>
        </m.div>
    );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function ContactCapture() {
    const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
    const [serverError, setServerError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: contactFormDefaults,
        mode: "onBlur", // Validate on blur for better UX
    });

    const onSubmit = async (data: ContactFormData) => {
        setSubmitStatus("submitting");
        setServerError(null);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || "Failed to send message");
            }

            setSubmitStatus("success");
            reset();
        } catch (error) {
            console.error("Form submission error:", error);
            setSubmitStatus("error");
            setServerError(
                error instanceof Error ? error.message : "An unexpected error occurred"
            );
        }
    };

    const handleReset = () => {
        setSubmitStatus("idle");
        setServerError(null);
        reset();
    };

    // Success state
    if (submitStatus === "success") {
        return (
            <section id="contact" className="w-full max-w-2xl mx-auto px-6 py-24">
                <SuccessState onReset={handleReset} />
            </section>
        );
    }

    return (
        <section
            id="contact"
            className="w-full max-w-2xl mx-auto px-6 py-24"
            aria-labelledby="contact-heading"
        >
            {/* Header */}
            <div className="text-center mb-16">
                <span className="text-label block mb-4">Contact</span>
                <h2 id="contact-heading" className="text-white mb-6">
                    Let's Build.
                </h2>
                <p className="text-lead text-base max-w-md mx-auto">
                    Begin the conversation. No obligations, just clarity.
                </p>
            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-10"
                noValidate // We handle validation with Zod
            >
                {/* Name */}
                <FieldInput
                    id="contact-name"
                    label="Full Name"
                    placeholder="Your Name *"
                    error={errors.name?.message}
                    required
                    register={register}
                    fieldName="name"
                />

                {/* Email */}
                <FieldInput
                    id="contact-email"
                    label="Email Address"
                    type="email"
                    placeholder="Email Address *"
                    error={errors.email?.message}
                    required
                    register={register}
                    fieldName="email"
                />

                {/* Phone (Optional) */}
                <FieldInput
                    id="contact-phone"
                    label="Phone Number"
                    type="tel"
                    placeholder="Phone Number (optional)"
                    error={errors.phone?.message}
                    register={register}
                    fieldName="phone"
                />

                {/* Interest Selection */}
                <fieldset className="space-y-4" aria-required="true">
                    <legend id="contact-interest-label" className="text-label text-zinc-500">
                        I am interested in: *
                    </legend>
                    <div
                        className="flex flex-wrap gap-3"
                        role="radiogroup"
                        aria-labelledby="contact-interest-label"
                    >
                        {INTEREST_OPTIONS.map((option) => {
                            const inputId = `contact-interest-${option.value}`;
                            return (
                                <div key={option.value}>
                                    <input
                                        {...register("interest")}
                                        id={inputId}
                                        type="radio"
                                        value={option.value}
                                        required
                                        aria-required="true"
                                        aria-invalid={errors.interest ? "true" : "false"}
                                        aria-describedby={errors.interest ? "contact-interest-error" : undefined}
                                        className="peer sr-only"
                                    />
                                    <label
                                        htmlFor={inputId}
                                        className="px-5 py-2.5 rounded-full border text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer text-zinc-500 border-white/10 hover:border-white/40 peer-checked:bg-white peer-checked:text-black peer-checked:border-white peer-focus-visible:ring-2 peer-focus-visible:ring-white/50"
                                    >
                                        {option.label}
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                    {errors.interest && (
                        <p
                            id="contact-interest-error"
                            role="alert"
                            className="text-red-400 text-xs tracking-widest uppercase"
                        >
                            {errors.interest.message}
                        </p>
                    )}
                </fieldset>

                {/* Message */}
                <div className="relative group">
                    <label htmlFor="contact-message" className="sr-only">
                        Your Message
                    </label>
                    <textarea
                        id="contact-message"
                        placeholder="Tell us about your project... *"
                        rows={4}
                        required
                        aria-invalid={errors.message ? "true" : "false"}
                        aria-describedby={errors.message ? "message-error" : undefined}
                        aria-required="true"
                        {...register("message")}
                        className={cn(
                            "w-full bg-transparent border-b py-4 text-lg text-white resize-none",
                            "placeholder:text-zinc-700 outline-none transition-colors duration-200",
                            "focus:border-[hsl(var(--primary))]",
                            errors.message ? "border-red-500/50" : "border-white/20"
                        )}
                    />
                    <AnimatePresence mode="wait">
                        {errors.message && (
                            <m.p
                                id="message-error"
                                role="alert"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-red-400 text-xs mt-2 tracking-widest uppercase flex items-center gap-1"
                            >
                                <AlertCircle className="w-3 h-3" />
                                {errors.message.message}
                            </m.p>
                        )}
                    </AnimatePresence>
                </div>

                {/* Privacy Checkbox */}
                <div className="space-y-2">
                    <div className="flex items-start gap-3">
                        <input
                            id="contact-privacy"
                            type="checkbox"
                            required
                            aria-required="true"
                            aria-invalid={errors.privacyAccepted ? "true" : "false"}
                            aria-describedby={
                                errors.privacyAccepted ? "privacy-error" : undefined
                            }
                            {...register("privacyAccepted")}
                            className={cn(
                                "mt-1 w-5 h-5 rounded border-2 bg-transparent",
                                "checked:bg-[hsl(var(--primary))] checked:border-[hsl(var(--primary))]",
                                "focus:ring-2 focus:ring-[hsl(var(--primary))]/50",
                                "transition-colors cursor-pointer",
                                errors.privacyAccepted
                                    ? "border-red-500/50"
                                    : "border-white/20"
                            )}
                        />
                        <label
                            htmlFor="contact-privacy"
                            className="text-sm text-zinc-400 cursor-pointer"
                        >
                            I accept the{" "}
                            <a
                                href="/privacy"
                                className="text-[hsl(var(--primary))] hover:underline underline-offset-2"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                privacy policy
                            </a>{" "}
                            and consent to being contacted about my inquiry. *
                        </label>
                    </div>
                    <AnimatePresence mode="wait">
                        {errors.privacyAccepted && (
                            <m.p
                                id="privacy-error"
                                role="alert"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-red-400 text-xs tracking-widest uppercase flex items-center gap-1 ml-8"
                            >
                                <AlertCircle className="w-3 h-3" />
                                {errors.privacyAccepted.message}
                            </m.p>
                        )}
                    </AnimatePresence>
                </div>

                {/* Server Error */}
                <AnimatePresence mode="wait">
                    {submitStatus === "error" && serverError && (
                        <m.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="p-4 bg-red-500/10 border border-red-500/30 rounded-sm"
                            role="alert"
                        >
                            <p className="text-red-400 text-sm flex items-center gap-2">
                                <AlertCircle className="w-4 h-4" />
                                {serverError}
                            </p>
                        </m.div>
                    )}
                </AnimatePresence>

                {/* Submit Button */}
                <div className="pt-4 text-center">
                    <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting || submitStatus === "submitting"}
                        className={cn(
                            "w-full md:w-auto px-12 py-6 text-lg rounded-sm transition-all",
                            "bg-[hsl(var(--primary))] text-black",
                            "hover:bg-[hsl(var(--primary))]/90",
                            "disabled:opacity-50 disabled:cursor-not-allowed"
                        )}
                    >
                        {isSubmitting || submitStatus === "submitting" ? (
                            <span className="flex items-center gap-2">
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Sending...
                            </span>
                        ) : (
                            "Send Message"
                        )}
                    </Button>
                    <p className="mt-4 text-xs text-zinc-600">
                        Privacy protected. Zero spam. Response within 24 hours.
                    </p>
                </div>
            </form>
        </section>
    );
}
