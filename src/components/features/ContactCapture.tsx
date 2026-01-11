"use client";

import Link from "next/link";
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
    BUDGET_OPTIONS,
    TIMELINE_OPTIONS,
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
// RADIO GROUP COMPONENT (Reusable)
// ============================================================================

interface RadioGroupProps {
    label: string;
    name: keyof ContactFormData;
    options: readonly { value: string; label: string }[];
    register: ReturnType<typeof useForm<ContactFormData>>["register"];
    error?: string;
}

function RadioGroup({ label, name, options, register, error }: RadioGroupProps) {
    return (
        <fieldset className="space-y-4">
            <legend className="text-label text-zinc-500 mb-2">{label}</legend>
            <div className="flex flex-wrap gap-3">
                {options.map((option) => {
                    const inputId = `contact-${name}-${option.value}`;
                    return (
                        <div key={option.value}>
                            <input
                                {...register(name)}
                                id={inputId}
                                type="radio"
                                value={option.value}
                                className="peer sr-only"
                            />
                            <label
                                htmlFor={inputId}
                                className="px-5 py-2.5 rounded-sm border text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer text-zinc-500 border-white/10 hover:border-white/40 peer-checked:bg-[hsl(var(--primary))] peer-checked:text-black peer-checked:border-[hsl(var(--primary))] peer-focus-visible:ring-2 peer-focus-visible:ring-white/50"
                            >
                                {option.label}
                            </label>
                        </div>
                    );
                })}
            </div>
            {error && (
                <p role="alert" className="text-red-400 text-xs tracking-widest uppercase">
                    {error}
                </p>
            )}
        </fieldset>
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
            <h3
                id="contact-success-heading"
                className="text-3xl font-[family-name:var(--font-playfair)] text-white mb-4"
            >
                Request Received.
            </h3>
            <p className="text-zinc-400 mb-8">
                A concierge will reply within 24 hours.
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
    const [step, setStep] = useState(0);
    const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
    const [serverError, setServerError] = useState<string | null>(null);
    const prefersReducedMotion = useReducedMotion();

    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: contactFormDefaults,
        mode: "onBlur",
    });

    const nextStep = async () => {
        const fieldsByStep: (keyof ContactFormData)[][] = [
            ["interest", "budget"],
            ["name", "email", "phone"],
            ["timeline", "message", "privacyAccepted"],
        ];

        const isValid = await trigger(fieldsByStep[step]);
        if (isValid) setStep((s) => s + 1);
    };

    const prevStep = () => setStep((s) => s - 1);

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
        setStep(0);
        setSubmitStatus("idle");
        setServerError(null);
        reset();
    };

    // Success state
    if (submitStatus === "success") {
        return (
            <section id="contact" className="w-full max-w-2xl mx-auto px-6 py-24 text-center">
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
                <span className="text-label block mb-4">Private Discovery</span>
                <h2 id="contact-heading" className="text-white mb-6">
                    {step === 0 && "Your Vision."}
                    {step === 1 && "Identity."}
                    {step === 2 && "Timeline & Scope."}
                </h2>
                <div className="flex justify-center gap-2 mb-8">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className={cn(
                                "h-1 w-12 transition-all duration-500",
                                i <= step ? "bg-[hsl(var(--primary))]" : "bg-white/10"
                            )}
                        />
                    ))}
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-12" noValidate>
                <AnimatePresence mode="wait">
                    {step === 0 && (
                        <m.div
                            key="step0"
                            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
                            className="space-y-10"
                        >
                            <RadioGroup
                                label="I am interested in: *"
                                name="interest"
                                options={INTEREST_OPTIONS}
                                register={register}
                                error={errors.interest?.message}
                            />
                            <RadioGroup
                                label="Expected Investment Range: *"
                                name="budget"
                                options={BUDGET_OPTIONS}
                                register={register}
                                error={errors.budget?.message}
                            />
                            <div className="pt-6">
                                <Button type="button" onClick={nextStep} className="w-full py-6 text-lg rounded-sm bg-[hsl(var(--primary))] text-black hover:bg-[hsl(var(--primary))]/90">
                                    Continue
                                </Button>
                            </div>
                        </m.div>
                    )}

                    {step === 1 && (
                        <m.div
                            key="step1"
                            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
                            className="space-y-10"
                        >
                            <FieldInput
                                id="contact-name"
                                label="Full Name"
                                placeholder="Your Name *"
                                error={errors.name?.message}
                                register={register}
                                fieldName="name"
                            />
                            <FieldInput
                                id="contact-email"
                                label="Email Address"
                                type="email"
                                placeholder="Email Address *"
                                error={errors.email?.message}
                                register={register}
                                fieldName="email"
                            />
                            <FieldInput
                                id="contact-phone"
                                label="Phone Number"
                                type="tel"
                                placeholder="Phone Number (optional)"
                                error={errors.phone?.message}
                                register={register}
                                fieldName="phone"
                            />
                            <div className="pt-6 flex gap-4">
                                <Button type="button" variant="outline" onClick={prevStep} className="flex-1 py-6 text-lg rounded-sm border-white/20 text-white hover:bg-white/5">
                                    Back
                                </Button>
                                <Button type="button" onClick={nextStep} className="flex-[2] py-6 text-lg rounded-sm bg-[hsl(var(--primary))] text-black hover:bg-[hsl(var(--primary))]/90">
                                    Continue
                                </Button>
                            </div>
                        </m.div>
                    )}

                    {step === 2 && (
                        <m.div
                            key="step2"
                            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
                            className="space-y-10"
                        >
                            <RadioGroup
                                label="Anticipated Timeline: *"
                                name="timeline"
                                options={TIMELINE_OPTIONS}
                                register={register}
                                error={errors.timeline?.message}
                            />
                            <div className="relative group">
                                <label htmlFor="contact-message" className="sr-only">
                                    Your Message
                                </label>
                                <textarea
                                    id="contact-message"
                                    placeholder="Tell us about your project... *"
                                    rows={4}
                                    {...register("message")}
                                    className={cn(
                                        "w-full bg-transparent border-b py-4 text-lg text-white resize-none",
                                        "placeholder:text-zinc-700 outline-none transition-colors duration-200",
                                        "focus:border-[hsl(var(--primary))]",
                                        errors.message ? "border-red-500/50" : "border-white/20"
                                    )}
                                />
                                {errors.message && (
                                    <p className="text-red-400 text-xs mt-2 tracking-widest uppercase">
                                        {errors.message.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <input
                                        id="contact-privacy"
                                        type="checkbox"
                                        {...register("privacyAccepted")}
                                        className="mt-1 w-5 h-5 rounded border-2 bg-transparent checked:bg-[hsl(var(--primary))] cursor-pointer"
                                    />
                                    <label htmlFor={"contact-privacy"} className={"text-sm text-zinc-400 cursor-pointer"}>
                                        I accept the{" "}
                                        <Link
                                            href="/privacy"
                                            className="text-[hsl(var(--primary))] hover:underline underline-offset-4"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            privacy policy
                                        </Link>
                                        {" "}and consent to being contacted. *
                                    </label>
                                </div>
                                {errors.privacyAccepted && (
                                    <p className="text-red-400 text-xs tracking-widest uppercase">
                                        {errors.privacyAccepted.message}
                                    </p>
                                )}
                            </div>

                            {submitStatus === "error" && serverError && (
                                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-sm">
                                    <p className="text-red-400 text-sm flex items-center gap-2">
                                        <AlertCircle className="w-4 h-4" />
                                        {serverError}
                                    </p>
                                </div>
                            )}

                            <div className="pt-6 flex gap-4">
                                <Button type="button" variant="outline" onClick={prevStep} className="flex-1 py-6 text-lg rounded-sm border-white/20 text-white hover:bg-white/5">
                                    Back
                                </Button>
                                <Button type="submit" disabled={isSubmitting || submitStatus === "submitting"} className="flex-[2] py-6 text-lg rounded-sm bg-[hsl(var(--primary))] text-black hover:bg-[hsl(var(--primary))]/90">
                                    {isSubmitting || submitStatus === "submitting" ? (
                                        <span className="flex items-center gap-2 justify-center">
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Sending...
                                        </span>
                                    ) : (
                                        "Request Private Consultation"
                                    )}
                                </Button>
                            </div>
                        </m.div>
                    )}
                </AnimatePresence>
            </form>
        </section>
    );
}
