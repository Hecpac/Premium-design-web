import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { contactSchema, type ContactFormData } from "@/lib/validations/contact-schema";

// ============================================================================
// TYPES
// ============================================================================

interface SuccessResponse {
    message: string;
    submissionId: string;
}

interface ErrorResponse {
    error: string;
    details?: z.ZodIssue[];
}

// ============================================================================
// RATE LIMITING (Simple in-memory - use Redis in production)
// ============================================================================

const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT = 5; // requests
const RATE_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const record = rateLimitMap.get(ip);

    if (!record || now - record.lastReset > RATE_WINDOW) {
        rateLimitMap.set(ip, { count: 1, lastReset: now });
        return true;
    }

    if (record.count >= RATE_LIMIT) {
        return false;
    }

    record.count++;
    return true;
}

// ============================================================================
// POST HANDLER
// ============================================================================

export async function POST(request: NextRequest): Promise<NextResponse<SuccessResponse | ErrorResponse>> {
    try {
        // 1. Rate limiting
        const ip = request.headers.get("x-forwarded-for") || 
                   request.headers.get("x-real-ip") || 
                   "unknown";
        
        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                { error: "Too many requests. Please try again later." },
                { status: 429 }
            );
        }

        // 2. Parse request body
        let body: unknown;
        try {
            body = await request.json();
        } catch {
            return NextResponse.json(
                { error: "Invalid JSON in request body" },
                { status: 400 }
            );
        }

        // 3. Validate with Zod
        const validationResult = contactSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                {
                    error: "Validation failed",
                    details: validationResult.error.issues,
                },
                { status: 400 }
            );
        }

        const data: ContactFormData = validationResult.data;

        // 4. Generate submission ID for tracking
        const submissionId = `sub_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

        // 5. Log the submission (replace with actual email service)
        console.log("=".repeat(50));
        console.log("📧 NEW CONTACT FORM SUBMISSION");
        console.log("=".repeat(50));
        console.log(`ID: ${submissionId}`);
        console.log(`Name: ${data.name}`);
        console.log(`Email: ${data.email}`);
        console.log(`Phone: ${data.phone || "Not provided"}`);
        console.log(`Interest: ${data.interest}`);
        console.log(`Message: ${data.message}`);
        console.log(`Privacy Accepted: ${data.privacyAccepted}`);
        console.log(`Timestamp: ${new Date().toISOString()}`);
        console.log(`IP: ${ip}`);
        console.log("=".repeat(50));

        // =========================================================================
        // TODO: Implement email sending
        // =========================================================================
        // 
        // Option 1: Resend (https://resend.com)
        // ```
        // import { Resend } from 'resend';
        // const resend = new Resend(process.env.RESEND_API_KEY);
        // 
        // await resend.emails.send({
        //     from: 'Premium Home <noreply@premiumhome.com>',
        //     to: 'info@premiumhome.com',
        //     subject: `New ${data.interest} inquiry from ${data.name}`,
        //     html: `
        //         <h2>New Contact Form Submission</h2>
        //         <p><strong>Name:</strong> ${data.name}</p>
        //         <p><strong>Email:</strong> ${data.email}</p>
        //         <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
        //         <p><strong>Interest:</strong> ${data.interest}</p>
        //         <p><strong>Message:</strong></p>
        //         <p>${data.message}</p>
        //     `
        // });
        // ```
        //
        // Option 2: SendGrid, Postmark, AWS SES, etc.
        //
        // Option 3: Store in database (Supabase, PostgreSQL, etc.)
        // =========================================================================

        // 6. Simulate network delay (remove in production)
        await new Promise((resolve) => setTimeout(resolve, 500));

        // 7. Return success response
        return NextResponse.json(
            {
                message: "Message sent successfully",
                submissionId,
            },
            { status: 200 }
        );

    } catch (error) {
        // Log error for debugging (use proper error tracking in production)
        console.error("Contact form error:", error);

        return NextResponse.json(
            { error: "An unexpected error occurred. Please try again later." },
            { status: 500 }
        );
    }
}

// ============================================================================
// OPTIONS HANDLER (for CORS preflight if needed)
// ============================================================================

export async function OPTIONS(): Promise<NextResponse> {
    return new NextResponse(null, {
        status: 204,
        headers: {
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        },
    });
}
