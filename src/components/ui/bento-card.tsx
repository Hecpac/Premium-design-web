"use client";

import * as React from "react";
import { m, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface BentoCardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
}

const BentoCard = React.forwardRef<HTMLDivElement, BentoCardProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <m.div
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                whileHover={{
                    y: -4,
                    transition: { duration: 0.3, ease: "easeOut" }
                }}
                className={cn(
                    // Base glassmorphism styles
                    "relative overflow-hidden rounded-sm group focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none",
                    "bg-white/5",
                    "border border-white/10",
                    // Subtle noise texture via gradient
                    "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:via-transparent before:to-transparent before:pointer-events-none",
                    // Padding
                    "p-6",
                    className
                )}
                {...props}
            >
                {children}
            </m.div>
        );
    }
);

BentoCard.displayName = "BentoCard";

export { BentoCard };
