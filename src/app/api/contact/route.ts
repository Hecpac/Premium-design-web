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

        // 5. Log the submission
        console.log(`[API] New Submission: ${submissionId} from ${data.email}`);

        // 6. Resend Integration
        const RESEND_API_KEY = process.env.RESEND_API_KEY;

        if (RESEND_API_KEY) {
            try {
                const { Resend } = await import("resend");
                const resend = new Resend(RESEND_API_KEY);

                // A. Notification to Team
                await resend.emails.send({
                    from: "Premium Home Design <no-reply@premiumhome.design>",
                    to: ["leads@premiumhome.design"], // Demo destination
                    subject: `[QUALIFIED LEAD] ${data.interest} - ${data.name}`,
                    html: `
                        <h2>New High-Ticket Discovery Request</h2>
                        <p><strong>Submission ID:</strong> ${submissionId}</p>
                        <p><strong>Name:</strong> ${data.name}</p>
                        <p><strong>Email:</strong> ${data.email}</p>
                        <p><strong>Phone:</strong> ${data.phone || "Not provided"}</p>
                        <p><strong>Interest:</strong> ${data.interest}</p>
                        <p><strong>Budget:</strong> ${data.budget}</p>
                        <p><strong>Timeline:</strong> ${data.timeline}</p>
                        <p><strong>Project Narrative:</strong></p>
                        <p>${data.message}</p>
                        <hr/>
                        <p><small>Timestamp: ${new Date().toISOString()}</small></p>
                    `
                });

                // B. StoryBrand Confirmation to Client (Hero)
                // Frame: The client is the Hero, We are the Guide.
                await resend.emails.send({
                    from: "Premium Home Design <concierge@premiumhome.design>",
                    to: [data.email],
                    subject: "Your Architectural Vision, Curated.",
                    html: `
                        <div style="font-family: serif; color: #1a1a1a; max-width: 600px; margin: 0 auto; line-height: 1.6;">
                            <h1 style="color: #C6A87C;">The Discovery Phase Begins.</h1>
                            <p>Hello ${data.name.split(' ')[0]},</p>
                            
                            <p>You have a vision for a space that transcends the ordinary—a sanctuary where engineering meets artistry. We are honored that you've considered <strong>Premium Home Design</strong> to guide you through this journey.</p>
                            
                            <p>Building a custom legacy is a complex challenge. Our role is to eliminate the fog of construction and provide the technical clarity you deserve.</p>
                            
                            <div style="background: #fdfaf6; padding: 20px; border-left: 4px solid #C6A87C; margin: 25px 0;">
                                <p style="margin: 0;"><strong>What's Next:</strong> Our lead architectural consultant is currently reviewing your project brief for <strong>${data.interest}</strong>. You will receive a personal invitation for a design consultation within the next 24 hours.</p>
                            </div>
                            
                            <p>Until then, feel free to explore our latest <a href="https://www.premiumhome.design/projects" style="color: #C6A87C;">Selected Works</a>.</p>
                            
                            <p>Welcome to the intersection of precision and luxury.</p>
                            
                            <p>Best regards,<br/><strong>The Premium Home Design Team</strong></p>
                        </div>
                    `
                });
            } catch (emailError) {
                console.error("Failed to send email via Resend:", emailError);
                // We don't fail the whole request because the submission was captured in logs
            }
        } else {
            console.warn("RESEND_API_KEY not found. Skipping email delivery (Logging only).");
        }

        // 7. Return success response
        return NextResponse.json(
            {
                message: "Discovery request captured and sent",
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
