import { useEffect, useRef, useState, useCallback } from "react";

// ─── Types ──────────────────────────────────────────────────────────────────────
interface Particle { x: number; y: number; r: number; vx: number; vy: number; alpha: number; }

// ─── Star Field Canvas ──────────────────────────────────────────────────────────
function StarField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    let raf: number;
    const pts: Particle[] = [];
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);
    for (let i = 0; i < 140; i++) pts.push({ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, r: Math.random() * 0.9 + 0.2, vx: (Math.random() - 0.5) * 0.08, vy: (Math.random() - 0.5) * 0.08, alpha: Math.random() * 0.55 + 0.1 });
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      pts.forEach(p => { p.x += p.vx; p.y += p.vy; if (p.x < 0) p.x = c.width; if (p.x > c.width) p.x = 0; if (p.y < 0) p.y = c.height; if (p.y > c.height) p.y = 0; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(200,220,255,${p.alpha})`; ctx.fill(); });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} />;
}

// ─── Animated Orb ───────────────────────────────────────────────────────────────
function HeroOrb() {
  return (
    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-60%)", width: "680px", height: "680px", zIndex: 1, pointerEvents: "none" }}>
      {/* Outer glow */}
      <div style={{ position: "absolute", inset: "-80px", borderRadius: "50%", background: "radial-gradient(circle,rgba(59,130,246,0.07) 0%,transparent 70%)", animation: "orbPulse 6s ease-in-out infinite" }} />
      {/* Main orb */}
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(ellipse 60% 55% at 40% 38%,rgba(99,155,255,0.28) 0%,rgba(59,100,220,0.18) 35%,rgba(20,40,120,0.12) 65%,transparent 100%)", animation: "orbFloat 8s ease-in-out infinite", boxShadow: "0 0 120px 40px rgba(59,100,246,0.12), inset 0 0 80px rgba(120,170,255,0.08)" }} />
      {/* Inner highlight */}
      <div style={{ position: "absolute", top: "18%", left: "22%", width: "35%", height: "28%", borderRadius: "50%", background: "radial-gradient(circle,rgba(180,210,255,0.18) 0%,transparent 70%)", filter: "blur(12px)" }} />
      {/* Equator ring */}
      <div style={{ position: "absolute", top: "44%", left: "5%", right: "5%", height: "12%", borderRadius: "50%", background: "radial-gradient(ellipse,rgba(59,130,246,0.22) 0%,transparent 70%)", filter: "blur(18px)", animation: "orbFloat 8s ease-in-out infinite reverse" }} />
    </div>
  );
}

// ─── Live Timecode ───────────────────────────────────────────────────────────────
function Timecode() {
  const [tc, setTc] = useState("00:00:00:00");
  useEffect(() => {
    const s = Date.now();
    const id = setInterval(() => {
      const ms = Date.now() - s;
      const f = Math.floor((ms % 1000) / (1000 / 24));
      const sec = Math.floor(ms / 1000) % 60;
      const min = Math.floor(ms / 60000) % 60;
      const hr = Math.floor(ms / 3600000);
      setTc(`${String(hr).padStart(2,"0")}:${String(min).padStart(2,"0")}:${String(sec).padStart(2,"0")}:${String(f).padStart(2,"0")}`);
    }, 1000 / 24);
    return () => clearInterval(id);
  }, []);
  return <span style={{ fontFamily: "monospace" }}>{tc}</span>;
}

// ─── Scroll Reveal ───────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(40px)", transition: `opacity 0.85s cubic-bezier(.25,.46,.45,.94) ${delay}ms, transform 0.85s cubic-bezier(.25,.46,.45,.94) ${delay}ms` }}>{children}</div>;
}

// ─── Pill Glass Nav ──────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 50); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);
  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setOpen(false); };
  const links = [{ l: "Work", id: "work" }, { l: "Services", id: "services" }, { l: "About", id: "about" }, { l: "Process", id: "process" }];
  return (
    <>
      <nav style={{ position: "fixed", top: "20px", left: "50%", transform: "translateX(-50%)", zIndex: 100, display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px 10px 20px", borderRadius: "100px", background: scrolled ? "rgba(8,10,24,0.85)" : "rgba(8,10,24,0.55)", backdropFilter: "blur(28px) saturate(180%)", WebkitBackdropFilter: "blur(28px) saturate(180%)", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)", transition: "all 0.4s ease", whiteSpace: "nowrap" as const }}>
        <button onClick={() => go("hero")} style={{ background: "none", border: "none", color: "#fff", fontWeight: 600, fontSize: "15px", letterSpacing: "-0.02em", cursor: "pointer", padding: "0 8px 0 0", marginRight: "8px" }}>EarnedReach</button>
        <div style={{ width: "1px", height: "16px", background: "rgba(255,255,255,0.12)", marginRight: "8px" }} />
        {links.map(l => (
          <button key={l.id} onClick={() => go(l.id)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.55)", fontSize: "14px", cursor: "pointer", padding: "6px 14px", borderRadius: "100px", transition: "all 0.2s", fontWeight: 400 }}
            onMouseEnter={e => { (e.target as HTMLElement).style.color = "#fff"; (e.target as HTMLElement).style.background = "rgba(255,255,255,0.08)"; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.color = "rgba(255,255,255,0.55)"; (e.target as HTMLElement).style.background = "none"; }}>
            {l.l}
          </button>
        ))}
        <a href="mailto:hello@earnedreach.org" style={{ marginLeft: "8px", padding: "8px 20px", borderRadius: "100px", background: "linear-gradient(135deg,rgba(255,255,255,0.2) 0%,rgba(255,255,255,0.08) 100%)", border: "1px solid rgba(255,255,255,0.22)", color: "#fff", fontSize: "13px", fontWeight: 500, textDecoration: "none", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", boxShadow: "0 4px 16px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.18)", transition: "all 0.25s ease" }}
          onMouseEnter={e => { const el = e.currentTarget; el.style.background = "linear-gradient(135deg,rgba(255,255,255,0.3) 0%,rgba(255,255,255,0.14) 100%)"; el.style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => { const el = e.currentTarget; el.style.background = "linear-gradient(135deg,rgba(255,255,255,0.2) 0%,rgba(255,255,255,0.08) 100%)"; el.style.transform = "translateY(0)"; }}>
          Start a Project ↗
        </a>
      </nav>
      {/* Mobile fallback */}
      <style>{`@media(max-width:640px){nav{top:12px;padding:8px 12px;gap:4px;}nav button:not(:first-child):not(:last-child){display:none;}}`}</style>
    </>
  );
}

// ─── Marquee Strip ───────────────────────────────────────────────────────────────
function Marquee() {
  const items = ["Storytelling", "Brand Films", "Content Systems", "Founder Positioning", "MOF Content", "BOF Conversion", "Cinematic Production", "Strategy", "Visual Identity", "Earned Attention"];
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "14px 0", position: "relative", zIndex: 1 }}>
      <div style={{ display: "flex", gap: "0", animation: "marquee 28s linear infinite", width: "max-content" }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "24px", padding: "0 32px", fontSize: "12px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.3)", whiteSpace: "nowrap" as const }}>
            {item}
            <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(59,130,246,0.5)", display: "inline-block" }} />
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Content Calendar UI Mockup ──────────────────────────────────────────────────
function ContentCalendarMockup() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const posts = [
    { day: 0, type: "Reel", color: "#3b82f6", label: "MOF Hook" },
    { day: 1, type: "Story", color: "#8b5cf6", label: "Behind Scenes" },
    { day: 2, type: "Reel", color: "#3b82f6", label: "BOF Proof" },
    { day: 3, type: "Post", color: "#10b981", label: "Value Drop" },
    { day: 4, type: "Reel", color: "#3b82f6", label: "Testimonial" },
    { day: 6, type: "Post", color: "#f59e0b", label: "CTA" },
  ];
  return (
    <div style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.06) 0%,rgba(255,255,255,0.02) 100%)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "24px", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", boxShadow: "0 24px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <span style={{ fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.8)" }}>Content Calendar</span>
        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.2)", padding: "3px 10px", borderRadius: "100px" }}>June 2026</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "6px", marginBottom: "12px" }}>
        {days.map(d => <div key={d} style={{ textAlign: "center", fontSize: "10px", color: "rgba(255,255,255,0.25)", fontWeight: 500, letterSpacing: "0.05em" }}>{d}</div>)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "6px" }}>
        {Array.from({ length: 7 }).map((_, i) => {
          const post = posts.find(p => p.day === i);
          return (
            <div key={i} style={{ aspectRatio: "1", borderRadius: "10px", background: post ? `${post.color}18` : "rgba(255,255,255,0.03)", border: `1px solid ${post ? post.color + "30" : "rgba(255,255,255,0.05)"}`, display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "center", gap: "3px", cursor: post ? "pointer" : "default", transition: "all 0.2s" }}>
              {post && <>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: post.color }} />
                <span style={{ fontSize: "8px", color: post.color, fontWeight: 600, textAlign: "center" as const, lineHeight: 1.2 }}>{post.type}</span>
              </>}
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: "16px", display: "flex", flexDirection: "column" as const, gap: "8px" }}>
        {posts.slice(0, 3).map((p, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", background: "rgba(255,255,255,0.03)", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: p.color, flexShrink: 0 }} />
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.65)", flex: 1 }}>{p.label}</span>
            <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)", background: `${p.color}15`, padding: "2px 8px", borderRadius: "100px" }}>{p.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Analytics Mockup ────────────────────────────────────────────────────────────
function AnalyticsMockup() {
  const bars = [40, 65, 45, 80, 60, 90, 75, 95, 70, 85, 92, 88];
  return (
    <div style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.06) 0%,rgba(255,255,255,0.02) 100%)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "24px", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", boxShadow: "0 24px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <span style={{ fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.8)" }}>Content Performance</span>
        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>Last 12 weeks</span>
      </div>
      <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
        {[{ label: "Reach", val: "48.2K", up: true }, { label: "Saves", val: "3.1K", up: true }, { label: "Booked", val: "12", up: true }].map((m, i) => (
          <div key={i} style={{ flex: 1, padding: "12px", background: "rgba(255,255,255,0.03)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ fontSize: "18px", fontWeight: 600, color: "#fff", letterSpacing: "-0.03em" }}>{m.val}</div>
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", marginTop: "2px" }}>{m.label}</div>
            <div style={{ fontSize: "10px", color: "#10b981", marginTop: "4px" }}>↑ +{12 + i * 7}%</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", height: "80px" }}>
        {bars.map((h, i) => (
          <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: "4px 4px 0 0", background: i >= bars.length - 3 ? "rgba(59,130,246,0.7)" : "rgba(255,255,255,0.1)", transition: "all 0.3s ease" }} />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
        {["Jan", "Mar", "May", "Jun"].map(m => <span key={m} style={{ fontSize: "9px", color: "rgba(255,255,255,0.2)" }}>{m}</span>)}
      </div>
    </div>
  );
}

// ─── Proof Mockup ────────────────────────────────────────────────────────────────
function ProofMockup() {
  const items = [
    { icon: "▶", title: "The First Look", views: "142K", stage: "MOF" },
    { icon: "▶", title: "The Closer Look", views: "89K", stage: "MOF" },
    { icon: "▶", title: "The Decision", views: "31K", stage: "BOF" },
  ];
  return (
    <div style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.06) 0%,rgba(255,255,255,0.02) 100%)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "24px", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", boxShadow: "0 24px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <span style={{ fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.8)" }}>Content Funnel</span>
        <span style={{ fontSize: "11px", color: "#10b981", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", padding: "3px 10px", borderRadius: "100px" }}>● Live</span>
      </div>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "14px", background: "rgba(255,255,255,0.03)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)", marginBottom: "8px" }}>
          <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", flexShrink: 0 }}>{item.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.85)", marginBottom: "3px" }}>{item.title}</div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>{item.views} views</div>
          </div>
          <span style={{ fontSize: "10px", color: "rgba(147,197,253,0.7)", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.18)", padding: "3px 10px", borderRadius: "100px" }}>{item.stage}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────────
export default function Marketing() {
  const go = useCallback((id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), []);

  return (
    <div style={{ background: "#020408", color: "#fff", fontFamily: "'Inter',-apple-system,sans-serif", overflowX: "hidden", minHeight: "100vh" }}>
      <StarField />
      <Nav />

      {/* ── HERO ── */}
      <section id="hero" style={{ position: "relative", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <HeroOrb />
        {/* Gradient fade bottom */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(to top,#020408 0%,transparent 100%)", zIndex: 2, pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 3, textAlign: "center", maxWidth: "780px", padding: "0 24px" }}>
          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 18px", borderRadius: "100px", background: "rgba(59,130,246,0.09)", border: "1px solid rgba(59,130,246,0.2)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", marginBottom: "36px", fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "rgba(147,197,253,0.8)" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#3b82f6", display: "inline-block", animation: "blink 2s infinite" }} />
            Content Studio for Founders
          </div>

          <h1 style={{ fontSize: "clamp(48px,9vw,100px)", fontWeight: 300, letterSpacing: "-0.045em", lineHeight: 0.93, marginBottom: "28px" }}>
            Your Story.<br />
            <span style={{ background: "linear-gradient(135deg,#fff 0%,rgba(147,197,253,0.95) 50%,#3b82f6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Their Decision.
            </span>
          </h1>

          <p style={{ fontSize: "clamp(16px,2vw,19px)", fontWeight: 300, lineHeight: 1.75, color: "rgba(255,255,255,0.45)", marginBottom: "52px", maxWidth: "500px", margin: "0 auto 52px" }}>
            We turn founders into the most compelling voice in their market — through storytelling and visuals that convert attention into revenue.
          </p>

          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" as const }}>
            <button onClick={() => go("contact")} style={{ padding: "13px 28px", borderRadius: "100px", background: "linear-gradient(135deg,rgba(255,255,255,0.22) 0%,rgba(255,255,255,0.08) 100%)", border: "1px solid rgba(255,255,255,0.26)", color: "#fff", fontSize: "14px", fontWeight: 500, cursor: "pointer", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", boxShadow: "0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.2)", transition: "all 0.3s ease" }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.background = "linear-gradient(135deg,rgba(255,255,255,0.32) 0%,rgba(255,255,255,0.14) 100%)"; el.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.background = "linear-gradient(135deg,rgba(255,255,255,0.22) 0%,rgba(255,255,255,0.08) 100%)"; el.style.transform = "translateY(0)"; }}>
              Start a Project ↗
            </button>
            <button onClick={() => go("work")} style={{ padding: "13px 28px", borderRadius: "100px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", fontSize: "14px", fontWeight: 400, cursor: "pointer", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", transition: "all 0.3s ease" }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.background = "rgba(255,255,255,0.08)"; el.style.borderColor = "rgba(255,255,255,0.2)"; el.style.color = "#fff"; }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.background = "rgba(255,255,255,0.04)"; el.style.borderColor = "rgba(255,255,255,0.1)"; el.style.color = "rgba(255,255,255,0.7)"; }}>
              See the Work ▶
            </button>
          </div>
        </div>

        {/* HUD bottom */}
        <div style={{ position: "absolute", bottom: "28px", left: 0, right: 0, zIndex: 3, display: "flex", justifyContent: "space-between", padding: "0 40px", fontSize: "10px", fontFamily: "monospace", color: "rgba(255,255,255,0.22)", letterSpacing: "0.08em" }}>
          <span>● REC · 4K 24FPS</span>
          <Timecode />
          <span>SONY A7IV · f/1.8</span>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <Marquee />

      {/* ── STATEMENT ── */}
      <section style={{ position: "relative", zIndex: 1, padding: "120px 40px", maxWidth: "820px", margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <p style={{ fontSize: "clamp(20px,3.2vw,38px)", fontWeight: 300, lineHeight: 1.6, color: "rgba(255,255,255,0.75)", letterSpacing: "-0.02em" }}>
            Most founders are creating content that{" "}
            <span style={{ color: "rgba(255,255,255,0.2)", textDecoration: "line-through" }}>gets views</span>
            {" "}but never speaks to the people who would actually pay them.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <p style={{ fontSize: "clamp(15px,1.8vw,18px)", fontWeight: 300, lineHeight: 1.8, color: "rgba(255,255,255,0.3)", marginTop: "24px" }}>
            The problem isn't your camera. It isn't your editing. It's your messaging — and the story you're telling.
          </p>
        </Reveal>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ position: "relative", zIndex: 1, padding: "80px 40px 130px", maxWidth: "1200px", margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "rgba(147,197,253,0.5)", marginBottom: "12px" }}>Our Services</p>
          <h2 style={{ fontSize: "clamp(28px,5vw,56px)", fontWeight: 300, letterSpacing: "-0.035em", lineHeight: 1.1, marginBottom: "72px" }}>We build content systems<br /><span style={{ color: "rgba(255,255,255,0.35)", fontStyle: "italic" }}>that make sales feel earned.</span></h2>
        </Reveal>

        <div style={{ display: "flex", flexDirection: "column" as const, gap: "80px" }}>
          {/* Service 1 */}
          <Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
              <ContentCalendarMockup />
              <div>
                <span style={{ display: "inline-block", padding: "4px 14px", borderRadius: "100px", background: "rgba(59,130,246,0.09)", border: "1px solid rgba(59,130,246,0.18)", fontSize: "11px", color: "rgba(147,197,253,0.7)", letterSpacing: "0.08em", marginBottom: "20px" }}>Content Strategy</span>
                <h3 style={{ fontSize: "clamp(22px,3vw,32px)", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: "16px" }}>A content system built around your ICP — not the algorithm.</h3>
                <p style={{ fontSize: "16px", lineHeight: 1.8, color: "rgba(255,255,255,0.4)", marginBottom: "28px" }}>We map your ideal client's decision journey and build a full MOF/BOF content calendar that speaks to them at every stage — from first scroll to booked call.</p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" as const }}>
                  {["MOF Content", "BOF Conversion", "ICP Mapping", "Calendar Build"].map(t => <span key={t} style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", padding: "4px 12px", borderRadius: "100px" }}>{t}</span>)}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Service 2 */}
          <Reveal delay={100}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
              <div style={{ order: 2 }}>
                <span style={{ display: "inline-block", padding: "4px 14px", borderRadius: "100px", background: "rgba(59,130,246,0.09)", border: "1px solid rgba(59,130,246,0.18)", fontSize: "11px", color: "rgba(147,197,253,0.7)", letterSpacing: "0.08em", marginBottom: "20px" }}>Cinematic Production</span>
                <h3 style={{ fontSize: "clamp(22px,3vw,32px)", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: "16px" }}>High-end video and photo that positions you as the authority.</h3>
                <p style={{ fontSize: "16px", lineHeight: 1.8, color: "rgba(255,255,255,0.4)", marginBottom: "28px" }}>One shoot day, mapped into weeks of content. We handle the full production — from pre-production strategy to final delivery — so you show up looking like the premium option you are.</p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" as const }}>
                  {["Brand Films", "Reels", "Photography", "Post Production"].map(t => <span key={t} style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", padding: "4px 12px", borderRadius: "100px" }}>{t}</span>)}
                </div>
              </div>
              <div style={{ order: 1 }}>
                <AnalyticsMockup />
              </div>
            </div>
          </Reveal>

          {/* Service 3 */}
          <Reveal delay={100}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
              <ProofMockup />
              <div>
                <span style={{ display: "inline-block", padding: "4px 14px", borderRadius: "100px", background: "rgba(59,130,246,0.09)", border: "1px solid rgba(59,130,246,0.18)", fontSize: "11px", color: "rgba(147,197,253,0.7)", letterSpacing: "0.08em", marginBottom: "20px" }}>Proof Architecture</span>
                <h3 style={{ fontSize: "clamp(22px,3vw,32px)", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: "16px" }}>A three-stage content funnel that converts viewers into clients.</h3>
                <p style={{ fontSize: "16px", lineHeight: 1.8, color: "rgba(255,255,255,0.4)", marginBottom: "28px" }}>We build the First Look, the Closer Look, and the Decision — three pieces of content that work together to move someone from stranger to signed client, without a single cold outreach.</p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" as const }}>
                  {["Funnel Design", "Conversion Content", "Warm Audience", "No Cold DMs"].map(t => <span key={t} style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", padding: "4px 12px", borderRadius: "100px" }}>{t}</span>)}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── WORK ── */}
      <section id="work" style={{ position: "relative", zIndex: 1, padding: "80px 40px 130px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "rgba(147,197,253,0.5)", marginBottom: "12px" }}>The Work</p>
            <h2 style={{ fontSize: "clamp(28px,5vw,56px)", fontWeight: 300, letterSpacing: "-0.035em", lineHeight: 1.1, marginBottom: "64px" }}>Built to be watched twice.</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "20px" }}>
            {[
              { stage: "01", tag: "MOF · First Look", title: '"12 seconds. No script."', desc: "The cold-open cut built to earn the next watch, not explain itself. Stops the scroll in the first frame." },
              { stage: "02", tag: "MOF · Closer Look", title: "The Training Montage", desc: "Mid-funnel storytelling that builds trust and demonstrates craft — for people who liked the first look." },
              { stage: "03", tag: "BOF · The Decision", title: "The Hero Film", desc: "The full 60–90 second centrepiece. The version we point people to when they're ready to say yes." },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 130}>
                <div style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.06) 0%,rgba(255,255,255,0.02) 100%)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "20px", padding: "32px", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", boxShadow: "0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.07)", transition: "all 0.35s ease", cursor: "default", height: "100%" }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.background = "linear-gradient(135deg,rgba(255,255,255,0.09) 0%,rgba(255,255,255,0.04) 100%)"; el.style.transform = "translateY(-4px)"; el.style.boxShadow = "0 20px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.1)"; }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.background = "linear-gradient(135deg,rgba(255,255,255,0.06) 0%,rgba(255,255,255,0.02) 100%)"; el.style.transform = "translateY(0)"; el.style.boxShadow = "0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.07)"; }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                    <span style={{ fontSize: "10px", fontFamily: "monospace", color: "rgba(255,255,255,0.2)" }}>{item.stage}</span>
                    <span style={{ fontSize: "10px", color: "rgba(147,197,253,0.65)", background: "rgba(59,130,246,0.09)", border: "1px solid rgba(59,130,246,0.18)", padding: "3px 10px", borderRadius: "100px" }}>{item.tag}</span>
                  </div>
                  <div style={{ width: "100%", aspectRatio: "16/9", background: "rgba(255,255,255,0.04)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)", marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>▶</div>
                  </div>
                  <h3 style={{ fontSize: "18px", fontWeight: 400, letterSpacing: "-0.02em", marginBottom: "10px" }}>{item.title}</h3>
                  <p style={{ fontSize: "14px", lineHeight: 1.75, color: "rgba(255,255,255,0.38)" }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ position: "relative", zIndex: 1, padding: "80px 40px 130px", borderTop: "1px solid rgba(255,255,255,0.05)", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
          <Reveal>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", inset: "-30px", background: "radial-gradient(circle,rgba(59,130,246,0.1) 0%,transparent 70%)", borderRadius: "32px", pointerEvents: "none" }} />
              <img src="/founder-portrait.jpg" alt="David — Founder, EarnedReach" style={{ width: "100%", borderRadius: "20px", display: "block", position: "relative", zIndex: 1, border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 32px 80px rgba(0,0,0,0.65)" }} />
              <div style={{ position: "absolute", bottom: "24px", left: "24px", right: "24px", zIndex: 2, background: "rgba(2,4,8,0.88)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "14px", padding: "16px 20px", boxShadow: "0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.07)" }}>
                <div style={{ fontSize: "14px", fontWeight: 500, marginBottom: "4px" }}>David — Founder, EarnedReach</div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.38)" }}>Filmmaker · Storyteller · Content Strategist</div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={180}>
            <div>
              <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "rgba(147,197,253,0.5)", marginBottom: "20px" }}>About</p>
              <h2 style={{ fontSize: "clamp(26px,4vw,42px)", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: "24px" }}>Work directly with the founder of EarnedReach.</h2>
              <p style={{ fontSize: "16px", lineHeight: 1.85, color: "rgba(255,255,255,0.45)", marginBottom: "20px" }}>EarnedReach was built on a single belief: that the founders who win online are not the ones who post the most — they're the ones whose story is impossible to ignore.</p>
              <p style={{ fontSize: "16px", lineHeight: 1.85, color: "rgba(255,255,255,0.45)", marginBottom: "40px" }}>We combine cinematic production with strategic messaging to build content systems that speak directly to your ideal client — and convert them.</p>
              <button onClick={() => go("contact")} style={{ padding: "13px 28px", borderRadius: "100px", background: "linear-gradient(135deg,rgba(255,255,255,0.18) 0%,rgba(255,255,255,0.07) 100%)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", fontSize: "14px", fontWeight: 500, cursor: "pointer", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)", transition: "all 0.3s ease" }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.background = "linear-gradient(135deg,rgba(255,255,255,0.28) 0%,rgba(255,255,255,0.12) 100%)"; el.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.background = "linear-gradient(135deg,rgba(255,255,255,0.18) 0%,rgba(255,255,255,0.07) 100%)"; el.style.transform = "translateY(0)"; }}>
                Start a Conversation ↗
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" style={{ position: "relative", zIndex: 1, padding: "80px 40px 130px", borderTop: "1px solid rgba(255,255,255,0.05)", maxWidth: "1200px", margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "rgba(147,197,253,0.5)", marginBottom: "12px" }}>Process</p>
          <h2 style={{ fontSize: "clamp(28px,5vw,56px)", fontWeight: 300, letterSpacing: "-0.035em", lineHeight: 1.1, marginBottom: "64px" }}>How we work.</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px" }}>
          {[
            { step: "01", title: "Discovery", desc: "We map your ICP, your offer, and your current positioning to identify the exact story gaps costing you clients." },
            { step: "02", title: "Build", desc: "We design your full content system — strategy, scripts, production, and editing — built to convert at every funnel stage." },
            { step: "03", title: "Deploy & Iterate", desc: "We launch, monitor, and sharpen. Your content gets more precise every month as we learn what moves your specific audience." },
          ].map((p, i) => (
            <Reveal key={i} delay={i * 140}>
              <div style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.06) 0%,rgba(255,255,255,0.02) 100%)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "20px", padding: "36px 32px", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", boxShadow: "0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.07)", textAlign: "center" as const }}>
                <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: "rgba(59,130,246,0.09)", border: "1px solid rgba(59,130,246,0.18)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: "13px", fontFamily: "monospace", color: "rgba(147,197,253,0.7)" }}>{p.step}</div>
                <h3 style={{ fontSize: "20px", fontWeight: 400, letterSpacing: "-0.02em", marginBottom: "12px" }}>{p.title}</h3>
                <p style={{ fontSize: "15px", lineHeight: 1.8, color: "rgba(255,255,255,0.38)" }}>{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="contact" style={{ position: "relative", zIndex: 1, padding: "100px 40px 160px", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "800px", height: "500px", background: "radial-gradient(ellipse,rgba(59,130,246,0.08) 0%,transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "640px", margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "rgba(147,197,253,0.5)", marginBottom: "20px" }}>Ready?</p>
            <h2 style={{ fontSize: "clamp(36px,6vw,72px)", fontWeight: 300, letterSpacing: "-0.045em", lineHeight: 1.0, marginBottom: "24px" }}>
              Let's build something<br />
              <span style={{ background: "linear-gradient(135deg,#fff 0%,rgba(147,197,253,0.9) 50%,#3b82f6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>worth watching.</span>
            </h2>
            <p style={{ fontSize: "17px", fontWeight: 300, lineHeight: 1.8, color: "rgba(255,255,255,0.38)", marginBottom: "48px" }}>We work with a small number of founders at a time. If you're ready to make your content the reason clients choose you, let's talk.</p>
            <a href="mailto:hello@earnedreach.org" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "15px 32px", borderRadius: "100px", background: "linear-gradient(135deg,rgba(255,255,255,0.22) 0%,rgba(255,255,255,0.08) 100%)", border: "1px solid rgba(255,255,255,0.26)", color: "#fff", fontSize: "15px", fontWeight: 500, textDecoration: "none", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", boxShadow: "0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)", transition: "all 0.3s ease" }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.background = "linear-gradient(135deg,rgba(255,255,255,0.32) 0%,rgba(255,255,255,0.14) 100%)"; el.style.transform = "translateY(-3px)"; el.style.boxShadow = "0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.25)"; }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.background = "linear-gradient(135deg,rgba(255,255,255,0.22) 0%,rgba(255,255,255,0.08) 100%)"; el.style.transform = "translateY(0)"; el.style.boxShadow = "0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)"; }}>
              Get Started ↗
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.05)", padding: "40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" as const, gap: "16px" }}>
        <span style={{ fontSize: "16px", fontWeight: 600, letterSpacing: "-0.02em" }}>EarnedReach</span>
        <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)" }}>© 2026 EarnedReach. All rights reserved.</span>
        <div style={{ display: "flex", gap: "20px" }}>
          {[{ l: "Instagram ↗", h: "https://instagram.com/earnedreach" }, { l: "Email ↗", h: "mailto:hello@earnedreach.org" }].map(lk => (
            <a key={lk.l} href={lk.h} target="_blank" rel="noreferrer" style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => ((e.target as HTMLElement).style.color = "#fff")}
              onMouseLeave={e => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.3)")}>
              {lk.l}
            </a>
          ))}
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:#020408;}
        @keyframes orbFloat{0%,100%{transform:translateY(0) scale(1);}50%{transform:translateY(-18px) scale(1.02);}}
        @keyframes orbPulse{0%,100%{opacity:0.7;}50%{opacity:1;}}
        @keyframes blink{0%,100%{opacity:1;}50%{opacity:0.3;}}
        @keyframes marquee{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}
        @media(max-width:768px){
          section{padding-left:20px!important;padding-right:20px!important;}
          .about-grid,.services-grid{grid-template-columns:1fr!important;gap:40px!important;}
          [style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important;gap:40px!important;}
          [style*="grid-template-columns: repeat(3,1fr)"]{grid-template-columns:1fr!important;}
          footer{padding:32px 20px!important;flex-direction:column!important;align-items:flex-start!important;}
        }
      `}</style>
    </div>
  );
}
