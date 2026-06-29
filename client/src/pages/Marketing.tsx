import { useEffect, useRef, useState } from "react";

// ─── Particle Canvas Background ────────────────────────────────────────────────
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    const particles: { x: number; y: number; r: number; vx: number; vy: number; alpha: number }[] = [];
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    for (let i = 0; i < 100; i++) {
      particles.push({ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, r: Math.random() * 1.2 + 0.2, vx: (Math.random() - 0.5) * 0.12, vy: (Math.random() - 0.5) * 0.12, alpha: Math.random() * 0.5 + 0.1 });
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147,197,253,${p.alpha})`; ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0, opacity: 0.45 }} />;
}

// ─── Live Timecode ──────────────────────────────────────────────────────────────
function Timecode() {
  const [tc, setTc] = useState("00:00:00:00");
  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      const ms = Date.now() - start;
      const frames = Math.floor((ms % 1000) / (1000 / 24));
      const s = Math.floor(ms / 1000) % 60;
      const m = Math.floor(ms / 60000) % 60;
      const h = Math.floor(ms / 3600000);
      setTc(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}:${String(frames).padStart(2, "0")}`);
    }, 1000 / 24);
    return () => clearInterval(id);
  }, []);
  return <span style={{ fontFamily: "monospace", letterSpacing: "0.05em" }}>{tc}</span>;
}

// ─── Scroll Reveal ──────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(36px)", transition: `opacity 0.9s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms, transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms` }}>
      {children}
    </div>
  );
}

// ─── Liquid Glass Button ────────────────────────────────────────────────────────
function GlassBtn({ children, href, onClick, primary = false }: { children: React.ReactNode; href?: string; onClick?: () => void; primary?: boolean }) {
  const s: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: "8px",
    padding: "13px 26px", borderRadius: "100px",
    fontSize: "14px", fontWeight: 500, letterSpacing: "0.01em",
    cursor: "pointer", textDecoration: "none",
    transition: "all 0.35s cubic-bezier(0.25,0.46,0.45,0.94)",
    backdropFilter: "blur(24px) saturate(200%)",
    WebkitBackdropFilter: "blur(24px) saturate(200%)",
    border: primary ? "1px solid rgba(255,255,255,0.28)" : "1px solid rgba(255,255,255,0.1)",
    background: primary ? "linear-gradient(135deg,rgba(255,255,255,0.22) 0%,rgba(255,255,255,0.08) 100%)" : "rgba(255,255,255,0.05)",
    color: "#ffffff",
    boxShadow: primary ? "0 8px 32px rgba(0,0,0,0.35),inset 0 1px 0 rgba(255,255,255,0.22),inset 0 -1px 0 rgba(0,0,0,0.15)" : "0 4px 16px rgba(0,0,0,0.2),inset 0 1px 0 rgba(255,255,255,0.07)",
  };
  const hover = (e: React.MouseEvent<HTMLElement>, on: boolean) => {
    const el = e.currentTarget as HTMLElement;
    if (primary) {
      el.style.background = on ? "linear-gradient(135deg,rgba(255,255,255,0.32) 0%,rgba(255,255,255,0.14) 100%)" : "linear-gradient(135deg,rgba(255,255,255,0.22) 0%,rgba(255,255,255,0.08) 100%)";
      el.style.transform = on ? "translateY(-2px) scale(1.01)" : "translateY(0) scale(1)";
      el.style.boxShadow = on ? "0 16px 48px rgba(0,0,0,0.45),inset 0 1px 0 rgba(255,255,255,0.3),inset 0 -1px 0 rgba(0,0,0,0.15)" : "0 8px 32px rgba(0,0,0,0.35),inset 0 1px 0 rgba(255,255,255,0.22),inset 0 -1px 0 rgba(0,0,0,0.15)";
    } else {
      el.style.background = on ? "rgba(255,255,255,0.09)" : "rgba(255,255,255,0.05)";
      el.style.transform = on ? "translateY(-1px)" : "translateY(0)";
    }
  };
  if (href) return <a href={href} style={s} onMouseEnter={(e) => hover(e, true)} onMouseLeave={(e) => hover(e, false)}>{children}</a>;
  return <button onClick={onClick} style={s} onMouseEnter={(e) => hover(e, true)} onMouseLeave={(e) => hover(e, false)}>{children}</button>;
}

// ─── Liquid Glass Card ──────────────────────────────────────────────────────────
function GlassCard({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: "linear-gradient(135deg,rgba(255,255,255,0.07) 0%,rgba(255,255,255,0.02) 100%)",
      backdropFilter: "blur(28px) saturate(180%)",
      WebkitBackdropFilter: "blur(28px) saturate(180%)",
      border: "1px solid rgba(255,255,255,0.09)",
      borderRadius: "20px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.35),inset 0 1px 0 rgba(255,255,255,0.09)",
      padding: "32px",
      ...style,
    }}>
      {children}
    </div>
  );
}

// ─── Main ───────────────────────────────────────────────────────────────────────
export default function Marketing() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMobileOpen(false); };

  const navLinks = [{ label: "Work", id: "work" }, { label: "Services", id: "services" }, { label: "About", id: "about" }, { label: "Process", id: "process" }];

  return (
    <div style={{ background: "#020408", color: "#fff", fontFamily: "'Inter',-apple-system,sans-serif", overflowX: "hidden", minHeight: "100vh" }}>
      <ParticleBackground />

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 40px", height: "64px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "all 0.4s ease",
        background: scrolled ? "linear-gradient(135deg,rgba(2,4,8,0.88) 0%,rgba(8,12,28,0.88) 100%)" : "transparent",
        backdropFilter: scrolled ? "blur(28px) saturate(200%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(28px) saturate(200%)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
        boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.5)" : "none",
      }}>
        <button onClick={() => scrollTo("hero")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: "17px", fontWeight: 600, letterSpacing: "-0.02em", color: "#fff" }}>
          EarnedReach
        </button>
        {/* Desktop links */}
        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          {navLinks.map((l) => (
            <button key={l.id} onClick={() => scrollTo(l.id)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.55)", fontSize: "14px", fontWeight: 400, cursor: "pointer", padding: "8px 16px", borderRadius: "100px", transition: "all 0.2s ease", letterSpacing: "0.01em" }}
              onMouseEnter={(e) => { const el = e.target as HTMLElement; el.style.color = "#fff"; el.style.background = "rgba(255,255,255,0.07)"; }}
              onMouseLeave={(e) => { const el = e.target as HTMLElement; el.style.color = "rgba(255,255,255,0.55)"; el.style.background = "none"; }}>
              {l.label}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <GlassBtn href="mailto:hello@earnedreach.org" primary>Start a Project ↗</GlassBtn>
          <button onClick={() => setMobileOpen(!mobileOpen)} style={{ display: "none", background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: "22px" }} className="mob-btn">
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ position: "fixed", top: "64px", left: 0, right: 0, zIndex: 99, background: "rgba(2,4,8,0.97)", backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)", borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "24px 40px", display: "flex", flexDirection: "column", gap: "4px" }}>
          {navLinks.map((l) => (
            <button key={l.id} onClick={() => scrollTo(l.id)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.75)", fontSize: "16px", cursor: "pointer", padding: "12px 0", textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              {l.label}
            </button>
          ))}
        </div>
      )}

      {/* ── HERO ── */}
      <section id="hero" style={{ position: "relative", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        {/* Hero image */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/hero-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center 30%", opacity: 0.3, zIndex: 1 }} />
        {/* Gradient overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(2,4,8,0.2) 0%,rgba(2,4,8,0.05) 35%,rgba(2,4,8,0.65) 75%,rgba(2,4,8,1) 100%)", zIndex: 2 }} />
        {/* Blue glow orb */}
        <div style={{ position: "absolute", top: "15%", left: "50%", transform: "translateX(-50%)", width: "700px", height: "700px", background: "radial-gradient(circle,rgba(59,130,246,0.12) 0%,transparent 70%)", zIndex: 2, pointerEvents: "none" }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 3, textAlign: "center", maxWidth: "820px", padding: "0 24px" }}>
          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 18px", borderRadius: "100px", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.22)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", marginBottom: "36px", fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "rgba(147,197,253,0.85)" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#3b82f6", display: "inline-block", animation: "blink 2s infinite" }} />
            Content Studio for Founders
          </div>

          <h1 style={{ fontSize: "clamp(52px,9vw,104px)", fontWeight: 300, letterSpacing: "-0.045em", lineHeight: 0.95, marginBottom: "28px", color: "#fff" }}>
            Your Story.<br />
            <span style={{ background: "linear-gradient(135deg,#fff 0%,rgba(147,197,253,0.9) 45%,#3b82f6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Their Decision.
            </span>
          </h1>

          <p style={{ fontSize: "clamp(16px,2vw,20px)", fontWeight: 300, lineHeight: 1.75, color: "rgba(255,255,255,0.5)", marginBottom: "52px", maxWidth: "540px", margin: "0 auto 52px" }}>
            We turn founders into the most compelling voice in their market — through storytelling and visuals that convert attention into revenue.
          </p>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" as const }}>
            <GlassBtn onClick={() => scrollTo("contact")} primary>Start a Project ↗</GlassBtn>
            <GlassBtn onClick={() => scrollTo("work")}>Watch the Reel ▶</GlassBtn>
          </div>
        </div>

        {/* HUD bar */}
        <div style={{ position: "absolute", bottom: "32px", left: 0, right: 0, zIndex: 3, display: "flex", justifyContent: "space-between", padding: "0 40px", fontSize: "10px", fontFamily: "monospace", color: "rgba(255,255,255,0.28)", letterSpacing: "0.08em" }}>
          <span>REC ● 4K 24FPS</span>
          <Timecode />
          <span>SONY A7IV · f/1.8 · ISO 800</span>
        </div>
      </section>

      {/* ── STATEMENT ── */}
      <section style={{ position: "relative", zIndex: 1, padding: "130px 40px", maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <p style={{ fontSize: "clamp(22px,3.5vw,40px)", fontWeight: 300, lineHeight: 1.55, color: "rgba(255,255,255,0.8)", letterSpacing: "-0.02em" }}>
            Most founders are creating content that{" "}
            <span style={{ color: "rgba(255,255,255,0.25)", textDecoration: "line-through" }}>gets views</span>
            {" "}but never speaks to the people who would actually pay them.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <p style={{ fontSize: "clamp(15px,1.8vw,19px)", fontWeight: 300, lineHeight: 1.75, color: "rgba(255,255,255,0.35)", marginTop: "28px" }}>
            The problem isn't your camera. It isn't your editing. It's your messaging — and the story you're telling.
          </p>
        </Reveal>
      </section>

      {/* ── WORK ── */}
      <section id="work" style={{ position: "relative", zIndex: 1, padding: "80px 40px 130px", maxWidth: "1200px", margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "rgba(147,197,253,0.55)", marginBottom: "16px" }}>The Work</p>
          <h2 style={{ fontSize: "clamp(30px,5vw,58px)", fontWeight: 300, letterSpacing: "-0.035em", lineHeight: 1.1, marginBottom: "64px" }}>Content that earns attention.</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: "20px" }}>
          {[
            { stage: "01", title: "The First Look", desc: "Top-of-feed content engineered to stop the scroll and establish authority in the first 3 seconds.", tag: "MOF · Awareness" },
            { stage: "02", title: "The Closer Look", desc: "Mid-funnel storytelling that builds trust, demonstrates expertise, and keeps your ICP coming back.", tag: "MOF · Nurture" },
            { stage: "03", title: "The Decision", desc: "Bottom-funnel content that converts warm audiences into booked calls — without a single cold DM.", tag: "BOF · Conversion" },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 140}>
              <GlassCard style={{ position: "relative", overflow: "hidden", height: "100%" }}>
                <div style={{ position: "absolute", top: "-50px", right: "-50px", width: "140px", height: "140px", background: "radial-gradient(circle,rgba(59,130,246,0.1) 0%,transparent 70%)", pointerEvents: "none" }} />
                <div style={{ fontSize: "11px", fontFamily: "monospace", color: "rgba(147,197,253,0.45)", marginBottom: "20px", letterSpacing: "0.08em" }}>{item.stage}</div>
                <h3 style={{ fontSize: "21px", fontWeight: 400, letterSpacing: "-0.02em", marginBottom: "14px" }}>{item.title}</h3>
                <p style={{ fontSize: "15px", lineHeight: 1.75, color: "rgba(255,255,255,0.45)", marginBottom: "24px" }}>{item.desc}</p>
                <span style={{ display: "inline-block", padding: "4px 12px", borderRadius: "100px", background: "rgba(59,130,246,0.09)", border: "1px solid rgba(59,130,246,0.18)", fontSize: "11px", color: "rgba(147,197,253,0.65)", letterSpacing: "0.06em" }}>{item.tag}</span>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ position: "relative", zIndex: 1, padding: "80px 40px 130px", maxWidth: "1200px", margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "rgba(147,197,253,0.55)", marginBottom: "16px" }}>Services</p>
          <h2 style={{ fontSize: "clamp(30px,5vw,58px)", fontWeight: 300, letterSpacing: "-0.035em", lineHeight: 1.1, marginBottom: "64px" }}>What we build for you.</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "2px" }}>
          {[
            { num: "01", title: "Content Strategy", desc: "A complete MOF/BOF content system built around your ICP, your offer, and your voice. No guesswork." },
            { num: "02", title: "Cinematic Production", desc: "High-end video and photo production that positions you as the authority in your market." },
            { num: "03", title: "Editing & Post", desc: "Precision editing that preserves your story while engineering it for maximum retention and conversion." },
            { num: "04", title: "Brand Identity", desc: "Visual language, colour systems, and motion guidelines that make your content unmistakably yours." },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 100}>
              <div style={{ padding: "40px 32px", borderTop: "1px solid rgba(255,255,255,0.06)", transition: "background 0.3s ease", cursor: "default" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.025)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                <div style={{ fontSize: "11px", fontFamily: "monospace", color: "rgba(255,255,255,0.22)", marginBottom: "20px" }}>{s.num}</div>
                <h3 style={{ fontSize: "20px", fontWeight: 400, letterSpacing: "-0.02em", marginBottom: "12px" }}>{s.title}</h3>
                <p style={{ fontSize: "15px", lineHeight: 1.75, color: "rgba(255,255,255,0.4)" }}>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ position: "relative", zIndex: 1, padding: "80px 40px 130px", maxWidth: "1200px", margin: "0 auto" }}>
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
          <Reveal>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", inset: "-24px", background: "radial-gradient(circle at 50% 50%,rgba(59,130,246,0.13) 0%,transparent 70%)", borderRadius: "28px", pointerEvents: "none" }} />
              <img src="/founder-portrait.jpg" alt="EarnedReach Founder" style={{ width: "100%", borderRadius: "20px", display: "block", position: "relative", zIndex: 1, border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 32px 80px rgba(0,0,0,0.65)" }} />
              {/* Glass badge */}
              <div style={{ position: "absolute", bottom: "24px", left: "24px", right: "24px", zIndex: 2, background: "linear-gradient(135deg,rgba(2,4,8,0.88) 0%,rgba(8,12,28,0.88) 100%)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "14px", padding: "16px 20px", boxShadow: "0 8px 32px rgba(0,0,0,0.45),inset 0 1px 0 rgba(255,255,255,0.07)" }}>
                <div style={{ fontSize: "13px", fontWeight: 500, marginBottom: "4px" }}>David — Founder, EarnedReach</div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>Filmmaker · Storyteller · Content Strategist</div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div>
              <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "rgba(147,197,253,0.55)", marginBottom: "24px" }}>About</p>
              <h2 style={{ fontSize: "clamp(26px,4vw,44px)", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: "24px" }}>Work directly with the founder of EarnedReach.</h2>
              <p style={{ fontSize: "16px", lineHeight: 1.85, color: "rgba(255,255,255,0.5)", marginBottom: "20px" }}>EarnedReach was built on a single belief: that the founders who win online are not the ones who post the most — they're the ones whose story is impossible to ignore.</p>
              <p style={{ fontSize: "16px", lineHeight: 1.85, color: "rgba(255,255,255,0.5)", marginBottom: "40px" }}>We combine cinematic production with strategic messaging to build content systems that speak directly to your ideal client — and convert them.</p>
              <GlassBtn onClick={() => scrollTo("contact")} primary>Start a Conversation ↗</GlassBtn>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" style={{ position: "relative", zIndex: 1, padding: "80px 40px 130px", maxWidth: "1200px", margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "rgba(147,197,253,0.55)", marginBottom: "16px" }}>Process</p>
          <h2 style={{ fontSize: "clamp(30px,5vw,58px)", fontWeight: 300, letterSpacing: "-0.035em", lineHeight: 1.1, marginBottom: "64px" }}>How we work.</h2>
        </Reveal>
        <div className="process-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px" }}>
          {[
            { step: "01", title: "Discovery", desc: "We map your ICP, your offer, and your current positioning to identify the exact story gaps costing you clients." },
            { step: "02", title: "Build", desc: "We design your full content system — strategy, scripts, production, and editing — built to convert at every funnel stage." },
            { step: "03", title: "Deploy", desc: "We launch, monitor, and iterate. Your content gets sharper every month as we learn what moves your specific audience." },
          ].map((p, i) => (
            <Reveal key={i} delay={i * 150}>
              <GlassCard style={{ textAlign: "center" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(59,130,246,0.09)", border: "1px solid rgba(59,130,246,0.18)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: "13px", fontFamily: "monospace", color: "rgba(147,197,253,0.75)" }}>{p.step}</div>
                <h3 style={{ fontSize: "20px", fontWeight: 400, letterSpacing: "-0.02em", marginBottom: "12px" }}>{p.title}</h3>
                <p style={{ fontSize: "15px", lineHeight: 1.75, color: "rgba(255,255,255,0.4)" }}>{p.desc}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="contact" style={{ position: "relative", zIndex: 1, padding: "80px 40px 160px", textAlign: "center" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "900px", height: "500px", background: "radial-gradient(ellipse,rgba(59,130,246,0.09) 0%,transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "680px", margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "rgba(147,197,253,0.55)", marginBottom: "24px" }}>Ready to elevate your vision?</p>
            <h2 style={{ fontSize: "clamp(36px,6vw,76px)", fontWeight: 300, letterSpacing: "-0.045em", lineHeight: 1.0, marginBottom: "24px" }}>
              Let's build something<br />
              <span style={{ background: "linear-gradient(135deg,#fff 0%,rgba(147,197,253,0.9) 45%,#3b82f6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>worth watching.</span>
            </h2>
            <p style={{ fontSize: "18px", fontWeight: 300, lineHeight: 1.75, color: "rgba(255,255,255,0.4)", marginBottom: "52px" }}>
              We work with a small number of founders at a time. If you're ready to make your content the reason clients choose you, let's talk.
            </p>
            <GlassBtn href="mailto:hello@earnedreach.org" primary>Get Started ↗</GlassBtn>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.06)", padding: "48px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" as const, gap: "16px" }}>
        <span style={{ fontSize: "16px", fontWeight: 600, letterSpacing: "-0.02em" }}>EarnedReach</span>
        <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.28)" }}>© 2026 EarnedReach. All rights reserved.</span>
        <div style={{ display: "flex", gap: "24px" }}>
          {[{ label: "Instagram ↗", href: "https://instagram.com/earnedreach" }, { label: "Email ↗", href: "mailto:hello@earnedreach.org" }].map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer" style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#fff")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.35)")}>
              {l.label}
            </a>
          ))}
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:#020408;}
        @keyframes blink{0%,100%{opacity:1;}50%{opacity:0.35;}}
        @media(max-width:768px){
          nav .desktop-links{display:none!important;}
          .mob-btn{display:block!important;}
          section{padding-left:20px!important;padding-right:20px!important;}
          .about-grid{grid-template-columns:1fr!important;gap:40px!important;}
          .process-grid{grid-template-columns:1fr!important;}
          nav{padding:0 20px!important;}
          footer{padding:32px 20px!important;flex-direction:column!important;align-items:flex-start!important;}
        }
      `}</style>
    </div>
  );
}
