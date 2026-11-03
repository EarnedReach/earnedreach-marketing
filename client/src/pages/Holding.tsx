// Shown on every route while the site is closed; restore by reverting the commit that added it.
export default function Holding() {
  return (
    <main style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 24px", textAlign: "center", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -60%)", width: "700px", height: "700px", borderRadius: "50%", background: "radial-gradient(ellipse at center, rgba(59,100,255,0.22) 0%, rgba(30,60,200,0.10) 40%, transparent 70%)", pointerEvents: "none" }} />
      <img src="/er-logo.png" alt="EarnedReach" style={{ position: "relative", width: "72px", height: "72px", objectFit: "contain", marginBottom: "32px" }} />
      <h1 style={{ position: "relative", fontSize: "clamp(40px, 7vw, 72px)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.04em", marginBottom: "28px", color: "#fff", textShadow: "0 0 80px rgba(107,159,255,0.35)" }}>
        Reach, earned.<br />
        <span style={{ color: "#9ACBF5" }}>Never bought.</span>
      </h1>
      <p style={{ position: "relative", fontSize: "clamp(16px, 2vw, 19px)", lineHeight: 1.7, color: "rgba(255,255,255,0.6)", maxWidth: "520px", marginBottom: "36px" }}>
        We're building something worth watching. Back soon.
      </p>
      <a href="mailto:hello@earnedreach.org" style={{ position: "relative", display: "inline-flex", padding: "14px 30px", borderRadius: "999px", background: "linear-gradient(135deg, #3b6fff 0%, #2250e0 100%)", color: "#fff", fontSize: "15px", fontWeight: 600, textDecoration: "none" }}>
        Email us
      </a>
      <p style={{ position: "relative", fontSize: "13px", color: "rgba(255,255,255,0.4)", marginTop: "16px" }}>
        hello@earnedreach.org
      </p>
    </main>
  );
}
