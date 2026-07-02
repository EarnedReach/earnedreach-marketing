import { useEffect, useRef, useState } from "react";

function HUDCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let animFrame: number;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const lineColor = "rgba(255,255,255,0.045)";
      const crossColor = "rgba(255,255,255,0.10)";

      // ── Diagonal grid lines ──
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 0.8;
      const step = 90;
      // lines going top-left → bottom-right
      for (let x = -H; x < W + H; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + H, H);
        ctx.stroke();
      }
      // lines going top-right → bottom-left
      for (let x = -H; x < W + H; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x - H, H);
        ctx.stroke();
      }

      // ── Crosshair markers at intersections ──
      ctx.strokeStyle = crossColor;
      ctx.lineWidth = 0.7;
      const size = 6;
      for (let x = -H; x < W + H; x += step) {
        for (let row = 0; row <= H; row += step) {
          // intersection of the two diagonal families
          const ix = x + row;
          const iy = row;
          if (ix < -20 || ix > W + 20) continue;
          ctx.beginPath();
          ctx.moveTo(ix - size, iy);
          ctx.lineTo(ix + size, iy);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(ix, iy - size);
          ctx.lineTo(ix, iy + size);
          ctx.stroke();
        }
      }

      // ── Wireframe globe (bottom right) ──
      const gx = W * 0.82;
      const gy = H * 0.78;
      const gr = Math.min(W, H) * 0.22;
      const globeColor = "rgba(255,255,255,0.055)";
      ctx.strokeStyle = globeColor;
      ctx.lineWidth = 0.8;

      // Latitude lines
      const latLines = 7;
      for (let i = 0; i <= latLines; i++) {
        const angle = (Math.PI / latLines) * i;
        const ry = Math.sin(angle) * gr;
        const rx = Math.cos(angle) * gr;
        if (Math.abs(ry) < 1) continue;
        ctx.beginPath();
        ctx.ellipse(gx, gy - rx, ry, ry * 0.35, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Longitude lines
      const lonLines = 8;
      for (let i = 0; i < lonLines; i++) {
        const angle = (Math.PI / lonLines) * i;
        ctx.save();
        ctx.translate(gx, gy);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.ellipse(0, 0, gr * 0.35, gr, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // Outer circle
      ctx.beginPath();
      ctx.arc(gx, gy, gr, 0, Math.PI * 2);
      ctx.stroke();

      // ── Slow rotating scan line ──
      const scanAngle = (t * 0.003) % (Math.PI * 2);
      const cx = W * 0.5;
      const cy = H * 0.5;
      const scanLen = Math.max(W, H);
      const grad = ctx.createLinearGradient(
        cx, cy,
        cx + Math.cos(scanAngle) * scanLen,
        cy + Math.sin(scanAngle) * scanLen
      );
      grad.addColorStop(0, "rgba(100,160,255,0.10)");
      grad.addColorStop(1, "rgba(100,160,255,0)");
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(scanAngle) * scanLen, cy + Math.sin(scanAngle) * scanLen);
      ctx.stroke();

      t++;
      animFrame = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

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
      <HUDCanvas />

      {/* Content — above canvas */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* ER Logo */}
        <img
          src="/er-logo.png"
          alt="EarnedReach"
          style={{
            width: "64px",
            height: "64px",
            objectFit: "contain",
            marginBottom: "48px",
            opacity: 0.95,
          }}
        />

        {/* Status line */}
        <p
          style={{
            fontSize: "10px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
            marginBottom: "24px",
            fontWeight: 500,
          }}
        >
          Something is being built{dots}
        </p>

        {/* Headline */}
        <h1
          style={{
            fontSize: "clamp(34px, 7vw, 68px)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            marginBottom: "22px",
            maxWidth: "620px",
          }}
        >
          We're not finished,{" "}
          <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.45)" }}>
            we're building.
          </em>
        </h1>

        {/* Subline */}
        <p
          style={{
            fontSize: "15px",
            color: "rgba(255,255,255,0.38)",
            lineHeight: 1.7,
            maxWidth: "400px",
            marginBottom: "44px",
          }}
        >
          A new story is taking shape. We're building something worth showing up for. More soon.
        </p>

        {/* CTA */}
        <a
          href="mailto:hello@earnedreach.org"
          style={{
            fontSize: "13px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
            textDecoration: "none",
            borderBottom: "1px solid rgba(255,255,255,0.18)",
            paddingBottom: "3px",
            transition: "color 0.2s, border-color 0.2s",
          }}
          onMouseEnter={e => {
            (e.target as HTMLAnchorElement).style.color = "#fff";
            (e.target as HTMLAnchorElement).style.borderBottomColor = "rgba(255,255,255,0.5)";
          }}
          onMouseLeave={e => {
            (e.target as HTMLAnchorElement).style.color = "rgba(255,255,255,0.5)";
            (e.target as HTMLAnchorElement).style.borderBottomColor = "rgba(255,255,255,0.18)";
          }}
        >
          Get in touch
        </a>
      </div>
    </div>
  );
}
