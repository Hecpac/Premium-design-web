import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function getHostLabel(): string {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "premium-home-web.vercel.app");

  try {
    return new URL(url).host;
  } catch {
    return url.replace(/^https?:\/\//, "");
  }
}

export default function OpenGraphImage() {
  const host = getHostLabel();

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
            "radial-gradient(circle at 20% 15%, rgba(198,168,124,0.20) 0%, transparent 55%), radial-gradient(circle at 85% 70%, rgba(30,41,59,0.35) 0%, transparent 60%), linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0))",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              color: "rgba(244,242,238,0.92)",
              fontSize: 28,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 999,
                background: "#C6A87C",
                boxShadow: "0 0 24px rgba(198,168,124,0.45)",
              }}
            />
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
            Luxury architectural design in Dallas and Las Colinas — a cinematic concept demo.
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
            {host}
          </div>
        </div>
      </div>
    ),
    size
  );
}
