"use client";

import * as React from "react";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// CONTEXT
// ============================================================================

interface AccordionContextValue {
    activeItem: string | null;
    setActiveItem: (id: string | null) => void;
    accordionId: string;
}

const AccordionContext = React.createContext<AccordionContextValue>({
    activeItem: null,
    setActiveItem: () => { },
    accordionId: "",
});

// ============================================================================
// ACCORDION ROOT
// ============================================================================

interface AccordionProps {
    children: React.ReactNode;
    className?: string;
    type?: "single" | "multiple";
    collapsible?: boolean;
    defaultValue?: string;
}

export function Accordion({
    children,
    className,
    defaultValue,
}: AccordionProps) {
    const [activeItem, setActiveItem] = React.useState<string | null>(defaultValue ?? null);
    const accordionId = React.useId();

    return (
        <AccordionContext.Provider value={{ activeItem, setActiveItem, accordionId }}>
            <div
                className={cn("space-y-0", className)}
                role="region"
            >
                {children}
            </div>
        </AccordionContext.Provider>
    );
}

// ============================================================================
// ACCORDION ITEM
// ============================================================================

interface AccordionItemProps {
    value: string;
    children: React.ReactNode;
    className?: string;
}

export function AccordionItem({
    value,
    children,
    className,
}: AccordionItemProps) {
    const { accordionId } = React.useContext(AccordionContext);
    const triggerId = `${accordionId}-trigger-${value}`;
    const contentId = `${accordionId}-content-${value}`;

    return (
        <div
            className={cn("border-b border-white/10", className)}
            data-value={value}
        >
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child as React.ReactElement<{
                        value?: string;
                        triggerId?: string;
                        contentId?: string;
                    }>, {
                        value,
                        triggerId,
                        contentId,
                    });
                }
                return child;
            })}
        </div>
    );
}

// ============================================================================
// ACCORDION TRIGGER (Accessible)
// ============================================================================

interface AccordionTriggerProps {
    children: React.ReactNode;
    className?: string;
    value?: string;
    triggerId?: string;
    contentId?: string;
}

export function AccordionTrigger({
    children,
    className,
    value,
    triggerId,
    contentId,
}: AccordionTriggerProps) {
    const { activeItem, setActiveItem } = React.useContext(AccordionContext);
    const isOpen = activeItem === value;
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    const handleClick = () => {
        setActiveItem(isOpen ? null : value!);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        // Home/End navigation within accordion
        if (e.key === "Home" || e.key === "End") {
            e.preventDefault();
            const parent = buttonRef.current?.closest('[role="region"]');
            if (!parent) return;

            const buttons = parent.querySelectorAll<HTMLButtonElement>('button[aria-expanded]');
            if (buttons.length === 0) return;

            const targetButton = e.key === "Home" ? buttons[0] : buttons[buttons.length - 1];
            targetButton?.focus();
        }

        // Arrow navigation
        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
            e.preventDefault();
            const parent = buttonRef.current?.closest('[role="region"]');
            if (!parent) return;

            const buttons = Array.from(parent.querySelectorAll<HTMLButtonElement>('button[aria-expanded]'));
            const currentIndex = buttons.indexOf(buttonRef.current!);

            let nextIndex: number;
            if (e.key === "ArrowUp") {
                nextIndex = currentIndex <= 0 ? buttons.length - 1 : currentIndex - 1;
            } else {
                nextIndex = currentIndex >= buttons.length - 1 ? 0 : currentIndex + 1;
            }

            buttons[nextIndex]?.focus();
        }
    };

    return (
        <h3 className="flex">
            <button
                ref={buttonRef}
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={contentId}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                className={cn(
                    "flex flex-1 items-center justify-between py-6 font-medium",
                    "transition-all text-left w-full group",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm",
                    "hover:text-[hsl(var(--primary))]",
                    className
                )}
            >
                <span
                    className={cn(
                        "font-[family-name:var(--font-playfair)] text-xl md:text-2xl transition-colors pr-4",
                        isOpen ? "text-[hsl(var(--primary))]" : "text-white"
                    )}
                >
                    {children}
                </span>
                <ChevronDown
                    aria-hidden="true"
                    className={cn(
                        "h-5 w-5 shrink-0 transition-transform duration-300 text-zinc-500 group-hover:text-white",
                        isOpen && "rotate-180 text-[hsl(var(--primary))]"
                    )}
                />
            </button>
        </h3>
    );
}

// ============================================================================
// ACCORDION CONTENT (Animated)
// ============================================================================

interface AccordionContentProps {
    children: React.ReactNode;
    className?: string;
    value?: string;
    triggerId?: string;
    contentId?: string;
}

export function AccordionContent({
    children,
    className,
    value,
    triggerId,
    contentId,
}: AccordionContentProps) {
    const { activeItem } = React.useContext(AccordionContext);
    const isOpen = activeItem === value;
    const prefersReducedMotion = useReducedMotion();

    return (
        <AnimatePresence initial={false}>
            {isOpen && (
                <m.div
                    id={contentId}
                    role="region"
                    aria-labelledby={triggerId}
                    initial={prefersReducedMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    transition={{
                        duration: prefersReducedMotion ? 0.15 : 0.3,
                        ease: [0.04, 0.62, 0.23, 0.98]
                    }}
                    className="overflow-hidden"
                >
                    <div
                        className={cn(
                            "pb-6 pt-0 text-zinc-400 font-light leading-relaxed max-w-3xl",
                            className
                        )}
                    >
                        {children}
                    </div>
                </m.div>
            )}
        </AnimatePresence>
    );
}
