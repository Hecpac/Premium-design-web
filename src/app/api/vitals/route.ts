import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();

    // In a real production app, you would send this to Analytics (GA4, Vercel Analytics, Datadog)
    // For now, we log to stdout so it appears in server logs (e.g. Vercel logs or generic container logs)

    const { id, name, value, rating, navigationType } = body;

    console.log(`[WebVitals] ${name}: ${value.toFixed(2)}ms (${rating}) - ID: ${id} - Nav: ${navigationType}`);

    return NextResponse.json({ success: true });
}
