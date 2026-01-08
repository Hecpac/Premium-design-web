"use client";

import * as React from "react";
import { m, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Menu, X } from "lucide-react";

export interface NavbarProps {
    className?: string;
    brandName?: string;
}

/** Navigation links - targetId debe coincidir con el id de la sección */
const navLinks = [
    { href: "#projects", label: "Projects", targetId: "projects" },
    { href: "#process", label: "Process", targetId: "process" },
    { href: "#faq", label: "FAQ", targetId: "faq" },
    { href: "#contact", label: "Contact", targetId: "contact" },
];

/** Offset para compensar el header fijo (altura del navbar + margen) */
const SCROLL_OFFSET = 80;

function Navbar({ className, brandName = "Premium Home" }: NavbarProps) {
    const pathname = usePathname();
    const prefersReducedMotion = useReducedMotion();
    const isHomePage = pathname === "/";
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const menuId = "primary-navigation";

    React.useEffect(() => {
        if (!isMenuOpen) return;
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isMenuOpen]);

    /**
     * Smooth scroll handler para anchor links
     * Solo funciona en homepage, en otras páginas navega a homepage + hash
     */
    const handleSmoothScroll = React.useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
            // Si no estamos en homepage, dejamos que Next.js maneje la navegación
            if (!isHomePage) return;

            e.preventDefault();

            const element = document.getElementById(targetId);
            if (!element) {
                console.warn(`[Navbar] Section #${targetId} not found`);
                return;
            }

            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - SCROLL_OFFSET;

            window.scrollTo({
                top: offsetPosition,
                behavior: prefersReducedMotion ? "auto" : "smooth",
            });

            // Actualizar URL sin recargar (para compartir links)
            window.history.pushState({}, "", `#${targetId}`);
        },
        [isHomePage, prefersReducedMotion]
    );

    return (
        <m.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            aria-label="Primary"
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
                        <a
                            key={link.href}
                            href={isHomePage ? link.href : `/${link.href}`}
                            onClick={(e) => handleSmoothScroll(e, link.targetId)}
                            className={cn(
                                "text-sm font-medium",
                                "text-[hsl(var(--muted-foreground))]",
                                "hover:text-[hsl(var(--foreground))]",
                                "transition-colors duration-200",
                                "tracking-tight",
                                "cursor-pointer"
                            )}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Mobile Menu Toggle */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={isMenuOpen}
                    aria-controls={menuId}
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    type="button"
                >
                    {isMenuOpen ? (
                        <X className="h-5 w-5" aria-hidden="true" />
                    ) : (
                        <Menu className="h-5 w-5" aria-hidden="true" />
                    )}
                </Button>

                {/* CTA Button */}
                <Button
                    variant="outline"
                    size="sm"
                    aria-label="Book a visit consultation with Premium Home Design"
                >
                    Book a Visit
                </Button>
            </div>

            {/* Mobile Menu Panel */}
            <div
                id={menuId}
                className={cn(
                    "md:hidden border-t border-white/10 bg-black/80 backdrop-blur-md",
                    isMenuOpen ? "block" : "hidden"
                )}
            >
                <ul className="px-6 py-4 flex flex-col gap-4">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <a
                                href={isHomePage ? link.href : `/${link.href}`}
                                onClick={(e) => {
                                    setIsMenuOpen(false);
                                    handleSmoothScroll(e, link.targetId);
                                }}
                                className="text-sm font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors duration-200 tracking-tight"
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </m.nav>
    );
}

export { Navbar };
