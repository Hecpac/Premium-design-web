import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | Premium Home Design",
    description: "How Premium Home Design handles your information with the same care we bring to our architectural work.",
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[hsl(var(--background))]">
            <main id="main-content" className="pt-32 pb-20 px-6">
                <article className="max-w-3xl mx-auto">
                    <header className="mb-16">
                        <span className="text-label text-[hsl(var(--primary))] mb-4 block">
                            Legal
                        </span>
                        <h1 className="text-white font-[family-name:var(--font-playfair)] text-4xl md:text-6xl mb-6">
                            Privacy <span className="text-[hsl(var(--primary))] italic">Policy</span>
                        </h1>
                        <p className="text-zinc-400 text-lg font-light">
                            Last updated: January 2026
                        </p>
                    </header>

                    <div className="prose prose-invert prose-lg prose-headings:font-[family-name:var(--font-playfair)] prose-headings:font-normal prose-p:font-light prose-p:text-zinc-300 prose-li:text-zinc-300 max-w-none">
                        <section className="mb-12">
                            <h2 className="text-2xl text-white mb-4">Our Commitment</h2>
                            <p>
                                At Premium Home Design, we approach your privacy with the same precision and care we bring to our architectural work. This policy outlines how we collect, use, and protect your information when you engage with our services.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl text-white mb-4">Information We Collect</h2>
                            <p>When you inquire about our services, we may collect:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li>Contact information (name, email, phone number)</li>
                                <li>Project details you choose to share</li>
                                <li>Communication preferences</li>
                                <li>Technical data for website optimization</li>
                            </ul>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl text-white mb-4">How We Use Your Information</h2>
                            <p>Your information enables us to:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li>Respond to your consultation requests</li>
                                <li>Understand your project vision and requirements</li>
                                <li>Provide relevant portfolio examples and insights</li>
                                <li>Improve our services and user experience</li>
                            </ul>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl text-white mb-4">Data Protection</h2>
                            <p>
                                We implement industry-standard security measures to protect your personal information. Your data is never sold to third parties. We only share information with trusted partners essential to delivering our services, bound by strict confidentiality agreements.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl text-white mb-4">Your Rights</h2>
                            <p>You have the right to:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li>Request access to your personal data</li>
                                <li>Correct inaccurate information</li>
                                <li>Request deletion of your data</li>
                                <li>Opt out of marketing communications</li>
                            </ul>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl text-white mb-4">Contact Us</h2>
                            <p>
                                For privacy-related inquiries or to exercise your rights, please{" "}
                                <Link 
                                    href="/#contact" 
                                    className="text-[hsl(var(--primary))] hover:underline underline-offset-4"
                                >
                                    contact us directly
                                </Link>
                                . We respond to all requests within 48 hours.
                            </p>
                        </section>

                        <div className="thin-rule max-w-xs mx-auto my-12 opacity-30" />

                        <p className="text-sm text-zinc-500 text-center">
                            This is a demonstration privacy policy for portfolio purposes.
                            <br />
                            Premium Home Design is a fictional entity.
                        </p>
                    </div>
                </article>
            </main>

        </div>
    );
}
