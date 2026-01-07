"use client";

import { useReportWebVitals } from "next/web-vitals";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

/**
 * Metric Interface matches Next.js Web Vitals structure
 */
type Metric = {
    id: string;
    name: string;
    startTime: number;
    value: number;
    label: "web-vital" | "custom";
};

export function WebVitals() {
    const [metrics, setMetrics] = useState<Record<string, { value: number; rating: string }>>({});
    const isDev = process.env.NODE_ENV === "development";

    useReportWebVitals((metric) => {
        // 1. Send to Server Endpoint
        const body = JSON.stringify(metric);
        if (navigator.sendBeacon) {
            navigator.sendBeacon("/api/vitals", body);
        } else {
            fetch("/api/vitals", { body, method: "POST", keepalive: true }).catch(() => { });
        }

        // 2. Update Dev Overlay State
        if (isDev) {
            // Determine rating simply for the overlay
            let rating = "good";
            const v = metric.value;

            switch (metric.name) {
                case "LCP": rating = v <= 2500 ? "good" : v <= 4000 ? "needs-improvement" : "poor"; break;
                case "INP": rating = v <= 200 ? "good" : v <= 500 ? "needs-improvement" : "poor"; break;
                case "CLS": rating = v <= 0.1 ? "good" : v <= 0.25 ? "needs-improvement" : "poor"; break;
                case "FCP": rating = v <= 1800 ? "good" : v <= 3000 ? "needs-improvement" : "poor"; break;
                case "TTFB": rating = v <= 800 ? "good" : v <= 1800 ? "needs-improvement" : "poor"; break;
                default: rating = "neutral";
            }

            setMetrics((prev) => ({
                ...prev,
                [metric.name]: { value: v, rating }
            }));
        }
    });

    if (!isDev) return null;

    return <VitalsOverlay metrics={metrics} />;
}

function VitalsOverlay({ metrics }: { metrics: Record<string, { value: number; rating: string }> }) {
    if (Object.keys(metrics).length === 0) return null;

    return (
        <div className="fixed bottom-4 left-4 z-[10000] bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-3 text-xs font-mono text-white shadow-2xl pointer-events-none select-none">
            <div className="mb-2 font-bold text-zinc-400 border-b border-white/10 pb-1">LIVE VITALS</div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                {Object.entries(metrics).map(([name, { value, rating }]) => (
                    <div key={name} className="flex justify-between items-center gap-4">
                        <span className="text-zinc-500">{name}</span>
                        <span className={cn(
                            "font-bold",
                            rating === "good" ? "text-emerald-400" :
                                rating === "needs-improvement" ? "text-amber-400" :
                                    rating === "poor" ? "text-rose-500" : "text-white"
                        )}>
                            {name === "CLS" ? value.toFixed(3) : Math.round(value)}
                            {name !== "CLS" && <span className="text-[9px] font-normal opacity-50 ml-0.5">ms</span>}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
