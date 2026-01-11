import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  // Keep the same dimensions as OG for maximum compatibility
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 18% 10%, rgba(198,168,124,0.22) 0%, transparent 55%), radial-gradient(circle at 90% 75%, rgba(30,41,59,0.35) 0%, transparent 60%), linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0))",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              color: "rgba(244,242,238,0.85)",
              fontSize: 28,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            Premium Home Design
          </div>
          <div
            style={{
              color: "#F4F2EE",
              fontSize: 92,
              lineHeight: 1.03,
              letterSpacing: -2,
              fontWeight: 700,
            }}
          >
            Luxury Meets
            <br />
            <span style={{ color: "#C6A87C", fontStyle: "italic" }}>Meaning.</span>
          </div>
          <div
            style={{
              color: "rgba(244,242,238,0.68)",
              fontSize: 30,
              maxWidth: 950,
            }}
          >
            Precision engineering. Premium materials. Radical transparency.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 14,
              color: "rgba(244,242,238,0.55)",
              fontSize: 22,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            Dallas
            <span style={{ opacity: 0.35 }}>•</span>
            Las Colinas
            <span style={{ opacity: 0.35 }}>•</span>
            Concept Demo
          </div>

          <div
            style={{
              color: "rgba(244,242,238,0.40)",
              fontSize: 18,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            premium-home-web.vercel.app
          </div>
        </div>
      </div>
    ),
    size
  );
}
