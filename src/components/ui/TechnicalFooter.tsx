"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin, Instagram, Linkedin, Mail } from "lucide-react";

export function TechnicalFooter() {
    return (
        <footer className="w-full bg-neutral-950 text-[#ededed] relative overflow-hidden">
            {/* Massive Top Border */}
            <div className="w-full h-1 bg-neutral-800" />

            {/* Main Grid Container */}
            <div className="max-w-[1600px] mx-auto w-full">
                <div className="grid grid-cols-1 md:grid-cols-4 min-h-[400px]">

                    {/* COL 1: IDENTITY */}
                    <div className="flex flex-col p-8 md:p-12 border-b md:border-b-0 md:border-r border-neutral-800 gap-8 justify-between">
                        <div>
                            <span className="font-mono text-xs text-neutral-600 uppercase tracking-widest mb-4 block">
                                SEC. 01 — IDENTITY
                            </span>
                            <Link href="/" className="block">
                                <h2 className="font-sans text-2xl font-bold uppercase tracking-tighter">
                                    PREMIUM HOME
                                </h2>
                            </Link>
                        </div>

                        <div className="mt-auto">
                            <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-none">
                                <p className="font-mono text-[10px] text-amber-500 leading-relaxed uppercase tracking-wide">
                                    Warning: Concept Demo.<br />
                                    Visual research prototype.<br />
                                    Not a real business entity.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* COL 2: COORDINATES */}
                    <div className="flex flex-col p-8 md:p-12 border-b md:border-b-0 md:border-r border-neutral-800 gap-8">
                        <span className="font-mono text-xs text-neutral-600 uppercase tracking-widest block">
                            SEC. 02 — HQ LOCATION
                        </span>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <MapPin className="w-5 h-5 text-neutral-500 shrink-0 mt-1" />
                                <address className="not-italic font-sans text-xl font-medium text-neutral-200">
                                    1900 Olive St,<br />
                                    Dallas, TX 75201
                                </address>
                            </div>

                            <a
                                href="https://maps.google.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 hover:text-white transition-colors duration-300 group"
                            >
                                <span className="font-mono text-xs uppercase tracking-wider">View Map</span>
                                <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </a>
                        </div>
                    </div>

                    {/* COL 3: DIRECTORY */}
                    <div className="flex flex-col p-8 md:p-12 border-b md:border-b-0 md:border-r border-neutral-800 gap-8">
                        <span className="font-mono text-xs text-neutral-600 uppercase tracking-widest block">
                            SEC. 03 — INDEX
                        </span>

                        <nav className="flex flex-col gap-4">
                            {[
                                { label: "Projects", href: "#" },
                                { label: "Our Process", href: "#" },
                                { label: "Capabilities", href: "#" },
                                { label: "Journal", href: "#" },
                                { label: "Client Portal", href: "#", locked: true },
                            ].map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={`group flex items-center justify-between text-lg font-medium transition-colors duration-300 ${item.locked ? 'text-neutral-700 cursor-not-allowed' : 'text-neutral-400 hover:text-white'}`}
                                >
                                    <span>{item.label}</span>
                                    {item.locked ? (
                                        <span className="text-[10px] font-mono border border-neutral-800 px-1 text-neutral-700">LOCKED</span>
                                    ) : (
                                        <span className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-neutral-600">
                                            →
                                        </span>
                                    )}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* COL 4: CONNECT */}
                    <div className="flex flex-col p-8 md:p-12 gap-8">
                        <span className="font-mono text-xs text-neutral-600 uppercase tracking-widest block">
                            SEC. 04 — FREQUENCY
                        </span>

                        <div className="flex flex-col gap-6">
                            <div>
                                <span className="block font-mono text-[10px] text-neutral-600 mb-2">EMAIL DIRECT</span>
                                <a href="mailto:hello@premiumhome.demo" className="font-sans text-2xl md:text-3xl font-bold text-white hover:text-neutral-300 transition-colors break-words">
                                    hello@<br />premium<br />.demo
                                </a>
                            </div>

                            <div className="flex gap-4 mt-auto">
                                <a href="#" className="p-3 bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 transition-all">
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a href="#" className="p-3 bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 transition-all">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* BIG TEXT AT BOTTOM */}
            <div className="relative w-full overflow-hidden border-t border-neutral-800 bg-[#050505] py-4">
                {/* We use -translate-y to crop it slightly if desired, or just let it sit huge */}
                <h1
                    className="text-[12vw] leading-[0.8] font-black text-center select-none pointer-events-none whitespace-nowrap"
                    style={{
                        WebkitTextStroke: "1px rgba(255, 255, 255, 0.08)",
                        color: "transparent"
                    }}
                >
                    BUILT IN TEXAS
                </h1>

                {/* Simple Copy Bottom */}
                <div className="absolute bottom-2 w-full flex justify-between px-6 text-[10px] font-mono text-neutral-700 uppercase">
                    <span>© 2026 PREMIUM HOME</span>
                    <span>OS: V2.4.0</span>
                </div>
            </div>
        </footer>
    );
}
