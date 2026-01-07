"use client";

import * as React from "react";
import { m } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export interface NavbarProps {
    className?: string;
    brandName?: string;
}

const navLinks = [
    { href: "#projects", label: "Projects" },
    { href: "#process", label: "Process" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
];

function Navbar({ className, brandName = "Premium Home" }: NavbarProps) {
    return (
        <m.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={cn(
                // Sticky positioning
                "fixed top-0 left-0 right-0 z-50",
                // Frosty glassmorphism effect
                "bg-black/60 backdrop-blur-md supports-[backdrop-filter]:bg-white/5",
                "border-b border-white/10",
                // Layout
                "px-6 py-4",
                className
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Brand */}
                <Link
                    href="/"
                    className="font-[family-name:var(--font-playfair)] text-xl text-[hsl(var(--foreground))] tracking-tight"
                >
                    {brandName}
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "text-sm font-medium",
                                "text-[hsl(var(--muted-foreground))]",
                                "hover:text-[hsl(var(--foreground))]",
                                "transition-colors duration-200",
                                "tracking-tight"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* CTA Button */}
                <Button variant="outline" size="sm">
                    Book a Visit
                </Button>
            </div>
        </m.nav>
    );
}

export { Navbar };
