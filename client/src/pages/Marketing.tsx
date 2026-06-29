import { Circle } from "lucide-react";
import { useState, useEffect, useRef } from "react";

/**
 * EarnedReach Marketing Homepage — Final Cut
 * Design: Cinematic Studio / Premium Dark
 * Fixed: Nav overlap, rounded buttons, HUD collision, broken links
 */

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) entry.target.classList.add("active");
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);
  return ref;
}

function useTimecode() {
  const [tc, setTc] = useState("00:00:00:00");
  useEffect(() => {
    let frame = 0;
    const id = setInterval(() => {
      frame++;
      const f = frame % 24;
      const s = Math.floor(frame / 24) % 60;
      const m = Math.floor(frame / 1440) % 60;
      const h = Math.floor(frame / 86400);
      setTc(
        `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}:${String(f).padStart(2, "0")}`
      );
    }, 42);
    return () => clearInterval(id);
  }, []);
  return tc;
}

// ─── Navigation ──────────────────────────────────────────────────────────────
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["REEL", "PILLARS", "MODE", "PROOF", "SYSTEM", "TEAM"];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(4,6,17,0.92)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="text-white font-bold text-base tracking-[0.15em] uppercase shrink-0">
          EarnedReach
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[10px] font-bold tracking-[0.3em] text-white/40 hover:text-white transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#discovery"
          className="hidden md:block text-[10px] font-bold tracking-[0.2em] text-black bg-white px-5 py-2.5 hover:bg-[#9ACBF5] transition-colors duration-300"
        >
          START A PROJECT
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white/60 hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <div className="space-y-1.5">
            <span className={`block w-6 h-px bg-current transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-px bg-current transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-px bg-current transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#040611] border-t border-white/5 px-8 py-6 space-y-4">
          {links.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="block text-[11px] font-bold tracking-[0.3em] text-white/50 hover:text-white py-2"
            >
              {item}
            </a>
          ))}
          <a
            href="#discovery"
            onClick={() => setOpen(false)}
            className="block text-[11px] font-bold tracking-[0.2em] text-black bg-white px-5 py-3 text-center mt-4"
          >
            START A PROJECT
          </a>
        </div>
      )}
    </nav>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  const tc = useTimecode();

  return (
    <section className="relative w-full min-h-screen bg-[#040611] overflow-hidden flex flex-col">
      {/* Cinematic gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(20,35,80,0.7) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-1/3"
          style={{
            background:
              "linear-gradient(to top, #040611 0%, transparent 100%)",
          }}
        />
      </div>

      {/* HUD — bottom bar only, no top collision with nav */}
      <div className="absolute bottom-8 left-8 right-8 z-20 pointer-events-none flex justify-between items-end">
        <div className="hud-text">
          SONY A7III · 24.00 FPS
          <br />
          2.39:1 · ISO 800
        </div>
        <div className="flex items-center gap-3">
          <div className="hud-badge flex items-center gap-1.5">
            <Circle size={6} fill="#ef4444" className="text-red-500 animate-pulse" />
            REC
          </div>
          <div className="hud-badge">4K 24FPS</div>
          <div className="timecode text-xs">{tc}</div>
        </div>
        <div className="hud-text text-right">
          BATTERY 84%
          <br />
          SD CARD 128GB
        </div>
      </div>

      {/* Hero content — centred, clear of nav */}
      <div className="relative z-10 flex-grow flex flex-col items-center justify-center text-center px-6 pt-24 pb-32">
        <div className="mb-8">
          <span className="text-[#3b82f6] text-[10px] font-bold tracking-[0.4em] uppercase">
            A MEDIA STUDIO FOR AMBITIOUS BRANDS
          </span>
        </div>

        <h1 className="text-5xl sm:text-7xl lg:text-[7rem] font-light text-white leading-[0.88] tracking-[-0.04em] mb-10 max-w-5xl">
          We shoot <em className="not-italic italic text-white">proof.</em>
          <br />
          <span className="text-[#9ACBF5]" style={{ textShadow: "0 0 60px rgba(59,130,246,0.4)" }}>
            Not promises.
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-white/50 font-light mb-14 max-w-xl mx-auto leading-relaxed">
          Every founder has a story worth telling properly. We shoot it,
          systemise it, and get it seen.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#discovery"
            className="px-10 py-4 bg-white text-black text-sm font-bold tracking-[0.15em] hover:bg-[#9ACBF5] transition-colors duration-300"
          >
            START A PROJECT
          </a>
          <a
            href="#proof"
            className="px-10 py-4 border border-white/15 text-white text-sm font-medium tracking-[0.1em] hover:border-white/40 hover:bg-white/5 transition-all duration-300"
          >
            WATCH THE REEL
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Pillars Section ──────────────────────────────────────────────────────────
function Pillars() {
  const ref = useReveal();
  const pillars = [
    {
      sub: "APERTURE",
      title: "Brand Film Production",
      desc: "The light we let in. Cinematic, documentary-style films built to make someone stop scrolling and start paying attention.",
    },
    {
      sub: "SHUTTER",
      title: "Content Systems",
      desc: "The rhythm we control. One shoot day, mapped into weeks of content sequenced to how people actually decide to buy.",
    },
    {
      sub: "ISO",
      title: "Strategy",
      desc: "The sensitivity we tune. Positioning and proof built around what your brand specifically needs to grow next.",
    },
  ];

  return (
    <section id="pillars" className="w-full bg-[#040611] py-32 px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 reveal-on-scroll" ref={ref}>
          <span className="text-[#3b82f6] text-[10px] font-bold tracking-[0.4em] mb-6 block">
            THE EXPOSURE TRIANGLE
          </span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light text-white tracking-[-0.04em]">
            Three variables.
            <br />
            <span className="text-white/40 italic">One correct exposure.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {pillars.map((p, idx) => {
            const r = useReveal();
            return (
              <div
                key={idx}
                className="bg-[#040611] p-10 reveal-on-scroll"
                ref={r}
                style={{ transitionDelay: `${idx * 0.15}s` }}
              >
                <div className="hud-badge mb-8 inline-block">{p.sub}</div>
                <h3 className="text-xl font-medium text-white mb-4 tracking-tight">
                  {p.title}
                </h3>
                <p className="text-white/40 font-light leading-relaxed text-sm">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Proof Wall ───────────────────────────────────────────────────────────────
function ProofWall() {
  const ref = useReveal();
  const items = [
    {
      label: "FIRST LOOK",
      time: "00:00:12:00",
      title: '"12 seconds. No script."',
      desc: "The cold-open cut from the runner documentary — built to earn the next watch, not explain itself.",
    },
    {
      label: "CLOSER LOOK",
      time: "00:00:47:00",
      title: "The training montage",
      desc: "Mid-funnel cut showing process and craft — for people who liked the first look and want to know more.",
    },
    {
      label: "THE DECISION",
      time: "00:01:30:00",
      title: "The hero film",
      desc: "The full 60–90 second centrepiece — the version we point people to when they're ready to say yes.",
    },
  ];

  return (
    <section id="proof" className="w-full bg-[#040611] py-32 px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 reveal-on-scroll" ref={ref}>
          <span className="text-[#3b82f6] text-[10px] font-bold tracking-[0.4em] mb-6 block">
            THE PROOF WALL
          </span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light text-white tracking-[-0.04em]">
            Built to be{" "}
            <span className="italic text-white/40">watched twice.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {items.map((item, idx) => {
            const r = useReveal();
            return (
              <div
                key={idx}
                className="bg-[#040611] p-10 reveal-on-scroll group hover:bg-[#080A1A] transition-colors duration-500"
                ref={r}
                style={{ transitionDelay: `${idx * 0.15}s` }}
              >
                <div className="flex justify-between items-center mb-10">
                  <span
                    className="text-[9px] font-bold tracking-[0.3em] px-2 py-1 border"
                    style={{
                      color: "#3b82f6",
                      borderColor: "rgba(59,130,246,0.3)",
                    }}
                  >
                    {item.label}
                  </span>
                  <span className="timecode text-[10px] opacity-30">
                    {item.time}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-white mb-4 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-white/40 font-light text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── System Section ───────────────────────────────────────────────────────────
function System() {
  const r1 = useReveal();
  const r2 = useReveal();

  return (
    <section id="system" className="w-full bg-[#040611] py-32 px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="reveal-on-scroll" ref={r1}>
          <span className="text-[#3b82f6] text-[10px] font-bold tracking-[0.4em] mb-6 block">
            BEHIND THE FILM
          </span>
          <h2 className="text-4xl sm:text-5xl font-light text-white tracking-[-0.04em] mb-8">
            Every story is backed
            <br />
            by a <span className="italic text-white/40">system.</span>
          </h2>
          <p className="text-white/40 text-lg font-light leading-relaxed">
            Command Centre is the dashboard running quietly behind every
            project — tracking what's actually working across Instagram,
            YouTube, and TikTok, so the next film is built on evidence, not
            guesswork.
          </p>
        </div>

        <div
          className="border border-white/5 p-10 reveal-on-scroll"
          ref={r2}
          style={{ transitionDelay: "0.2s" }}
        >
          <div className="space-y-0">
            {[
              { l: "STATUS", v: "TRACKING — LIVE" },
              { l: "SOURCES", v: "IG / YT / TIKTOK" },
              { l: "FUNNEL STAGE", v: "FIRST LOOK → DECISION" },
              { l: "ROLE", v: "SUPPORTING PROOF" },
            ].map((row, i) => (
              <div
                key={i}
                className="flex justify-between items-center py-5 border-b border-white/5 last:border-0"
              >
                <span className="hud-text">{row.l}</span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-white">
                  {row.v}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Team Section ─────────────────────────────────────────────────────────────
function Team() {
  const ref = useReveal();
  const members = [
    {
      role: "FOUNDER · DIRECTOR OF PHOTOGRAPHY",
      name: "David",
      bio: "Shoots every film on a Sony A7III with a documentary eye — the camera stays close, the story stays honest, the cuts stay tight.",
    },
    {
      role: "CO-FOUNDER · STRATEGY",
      name: "Manus",
      bio: "Builds the systems and strategy that turn a single great film into a body of proof a brand can keep pointing to.",
    },
  ];

  return (
    <section id="team" className="w-full bg-[#040611] py-32 px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 reveal-on-scroll" ref={ref}>
          <span className="text-[#3b82f6] text-[10px] font-bold tracking-[0.4em] mb-6 block">
            WHO'S BEHIND THE LENS
          </span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light text-white tracking-[-0.04em]">
            You work with{" "}
            <span className="text-[#3b82f6]">us.</span>
            <br />
            <span className="text-white/40 italic">Not a hand-off.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
          {members.map((m, idx) => {
            const r = useReveal();
            return (
              <div
                key={idx}
                className="bg-[#040611] p-10 reveal-on-scroll"
                ref={r}
                style={{ transitionDelay: `${idx * 0.15}s` }}
              >
                <span className="hud-text block mb-6">{m.role}</span>
                <h3 className="text-4xl font-light text-white mb-6 tracking-tight">
                  {m.name}
                </h3>
                <p className="text-white/40 font-light leading-relaxed">
                  {m.bio}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Discovery / CTA Section ──────────────────────────────────────────────────
function Discovery() {
  const ref = useReveal();

  return (
    <section
      id="discovery"
      className="w-full bg-[#040611] py-40 px-8 border-t border-white/5"
    >
      <div className="max-w-4xl mx-auto text-center reveal-on-scroll" ref={ref}>
        <span className="text-[#3b82f6] text-[10px] font-bold tracking-[0.4em] mb-8 block uppercase">
          ROLL CREDITS
        </span>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light text-white tracking-[-0.04em] mb-8">
          Let's shoot something
          <br />
          <span className="italic text-white/40">worth proving.</span>
        </h2>
        <p className="text-white/40 text-lg font-light mb-14 max-w-lg mx-auto">
          One conversation. No pitch decks. Just an honest look at what your
          brand actually needs next.
        </p>
        <a
          href="mailto:hello@earnedreach.org"
          className="inline-block px-14 py-5 bg-white text-black text-sm font-bold tracking-[0.2em] hover:bg-[#9ACBF5] transition-colors duration-300"
        >
          START A PROJECT
        </a>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="w-full bg-[#040611] py-12 px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-white font-bold text-sm tracking-[0.15em] uppercase">
          EarnedReach
        </div>
        <div className="flex gap-8">
          <a
            href="https://instagram.com/earnedreach"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-bold tracking-[0.3em] text-white/30 hover:text-white transition-colors"
          >
            INSTAGRAM ↗
          </a>
          <a
            href="https://youtube.com/@earnedreach"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-bold tracking-[0.3em] text-white/30 hover:text-white transition-colors"
          >
            YOUTUBE ↗
          </a>
        </div>
        <div className="hud-text">© 2026 A MEDIA STUDIO FOR AMBITIOUS BRANDS</div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Marketing() {
  return (
    <div className="w-full bg-[#040611] text-white selection:bg-[#3b82f6] selection:text-white">
      <Navigation />
      <HeroSection />
      <Pillars />
      <ProofWall />
      <System />
      <Team />
      <Discovery />
      <Footer />
    </div>
  );
}
