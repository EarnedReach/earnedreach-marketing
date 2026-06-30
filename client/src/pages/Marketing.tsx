import { useEffect, useState } from "react";

export default function Marketing() {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(d => d.length >= 3 ? "." : d + ".");
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'DM Sans', sans-serif",
        color: "#fff",
        textAlign: "center",
        padding: "40px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle radial glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          background: "radial-gradient(ellipse, rgba(80,120,255,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* ER Logo */}
      <img
        src="/er-logo.png"
        alt="EarnedReach"
        style={{
          width: "72px",
          height: "72px",
          objectFit: "contain",
          marginBottom: "48px",
          opacity: 0.95,
        }}
      />

      {/* Status line */}
      <p
        style={{
          fontSize: "11px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.35)",
          marginBottom: "28px",
          fontWeight: 500,
        }}
      >
        Something is being built{dots}
      </p>

      {/* Headline */}
      <h1
        style={{
          fontSize: "clamp(36px, 8vw, 72px)",
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: "-0.03em",
          marginBottom: "24px",
          maxWidth: "640px",
        }}
      >
        We're not finished,{" "}
        <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.55)" }}>
          we're building.
        </em>
      </h1>

      {/* Subline */}
      <p
        style={{
          fontSize: "16px",
          color: "rgba(255,255,255,0.45)",
          lineHeight: 1.7,
          maxWidth: "420px",
          marginBottom: "48px",
        }}
      >
        A new story is taking shape. We're building something worth showing up for. More soon.
      </p>

      {/* CTA */}
      <a
        href="mailto:hello@earnedreach.org"
        style={{
          fontSize: "14px",
          color: "rgba(255,255,255,0.6)",
          textDecoration: "none",
          borderBottom: "1px solid rgba(255,255,255,0.2)",
          paddingBottom: "2px",
          letterSpacing: "0.02em",
          transition: "color 0.2s, border-color 0.2s",
        }}
        onMouseEnter={e => {
          (e.target as HTMLAnchorElement).style.color = "#fff";
          (e.target as HTMLAnchorElement).style.borderBottomColor = "rgba(255,255,255,0.6)";
        }}
        onMouseLeave={e => {
          (e.target as HTMLAnchorElement).style.color = "rgba(255,255,255,0.6)";
          (e.target as HTMLAnchorElement).style.borderBottomColor = "rgba(255,255,255,0.2)";
        }}
      >
        Get in touch
      </a>
    </div>
  );
}
