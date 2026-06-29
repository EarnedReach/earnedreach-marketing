import { Badge } from "@/components/ui/badge";
import { ArrowRight, Menu, X, Play, Circle } from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect, useRef } from "react";

/**
 * EarnedReach Marketing Homepage — Director's Cut
 * Design: Camera HUD + Cinematic Studio
 * Focus: Technical UI, Timecodes, 3-Stage Proof Wall
 */

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);
  return ref;
}

// ─── Hero Section: Director's Monitor ───────────────────────────────────────
function HeroSection() {
  return (
    <div className="relative w-full min-h-screen bg-[#040611] overflow-hidden flex flex-col">
      {/* HUD Overlays */}
      <div className="absolute inset-0 z-20 pointer-events-none p-12 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="flex gap-4">
            <div className="hud-badge flex items-center gap-2">
              <Circle size={8} fill="#ef4444" className="text-red-500 animate-pulse" />
              REC
            </div>
            <div className="hud-badge">4K 24FPS</div>
          </div>
          <div className="timecode text-xs">00:00:01:19</div>
        </div>
        <div className="flex justify-between items-end">
          <div className="hud-text">SONY A7III · 24.00 FPS<br />2.39:1 ISO 800</div>
          <div className="hud-text text-right">BATTERY 84%<br />SD CARD 128GB</div>
        </div>
      </div>

      {/* Cinematic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-30"
          style={{
            background: 'radial-gradient(circle at center, rgba(30, 44, 80, 0.8) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex-grow flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto">
        <div className="mb-8 reveal-on-scroll active">
          <span className="text-[#3b82f6] text-[10px] font-bold tracking-[0.4em] uppercase">
            A MEDIA STUDIO FOR AMBITIOUS BRANDS
          </span>
        </div>
        
        <h1 className="text-6xl sm:text-8xl lg:text-9xl font-light text-white leading-[0.85] tracking-tighter mb-10">
          We shoot <span className="italic">proof.</span><br />
          <span className="text-[#9ACBF5] nitid-glow">Not promises.</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-[#94A3B8] font-light mb-12 max-w-2xl mx-auto leading-relaxed">
          Every founder has a story worth telling properly. We shoot it, systemise it, and get it seen.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link href="#discovery">
            <button className="px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              START A PROJECT ▸
            </button>
          </Link>
          <Link href="#proof">
            <button className="px-10 py-4 bg-white/5 text-white font-medium rounded-full border border-white/10 hover:bg-white/10 transition-all duration-500 backdrop-blur-md">
              WATCH THE REEL ▸
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Navigation ─────────────────────────────────────────────────────────────
function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-10 px-12">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl tracking-tighter">EARNEDREACH</div>
        <div className="hidden md:flex gap-10">
          {['REEL', 'PILLARS', 'MODE', 'PROOF', 'SYSTEM', 'TEAM'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-bold tracking-widest text-white/40 hover:text-white transition-colors">
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ─── Pillars Section ────────────────────────────────────────────────────────
function Pillars() {
  const pillars = [
    { title: "Brand Film Production", subtitle: "APERTURE", desc: "The light we let in. Cinematic, documentary-style films built to make someone stop scrolling and start paying attention." },
    { title: "Content Systems", subtitle: "SHUTTER", desc: "The rhythm we control. One shoot day, mapped into weeks of content sequenced to how people actually decide to buy." },
    { title: "Strategy", subtitle: "ISO", desc: "The sensitivity we tune. Positioning and proof built around what your brand specifically needs to grow next." }
  ];

  return (
    <section id="pillars" className="w-full bg-[#040611] py-32 px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 reveal-on-scroll" ref={useReveal()}>
          <span className="text-[#3b82f6] text-[10px] font-bold tracking-[0.4em] mb-4 block">THE EXPOSURE TRIANGLE</span>
          <h2 className="text-5xl sm:text-7xl font-light text-white tracking-tighter">
            Three variables.<br />
            <span className="text-[#94A3B8] italic">One correct exposure.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {pillars.map((p, idx) => (
            <div key={idx} className="reveal-on-scroll" ref={useReveal()} style={{ transitionDelay: `${idx * 0.2}s` }}>
              <div className="hud-badge mb-6">{p.subtitle}</div>
              <h3 className="text-2xl font-medium text-white mb-4 tracking-tight">{p.title}</h3>
              <p className="text-[#94A3B8] font-light leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Proof Wall Section ─────────────────────────────────────────────────────
function ProofWall() {
  const items = [
    { label: "FIRST LOOK", time: "00:00:12:00", title: "\"12 seconds. No script.\"", desc: "The cold-open cut from the runner documentary — built to earn the next watch, not explain itself." },
    { label: "CLOSER LOOK", time: "00:00:47:00", title: "The training montage", desc: "Mid-funnel cut showing process and craft — for people who liked the first look and want to know more." },
    { label: "THE DECISION", time: "00:01:30:00", title: "The hero film", desc: "The full 60–90 second centrepiece — the version we point people to when they're ready to say yes." }
  ];

  return (
    <section id="proof" className="w-full bg-[#040611] py-32 px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 reveal-on-scroll" ref={useReveal()}>
          <span className="text-[#3b82f6] text-[10px] font-bold tracking-[0.4em] mb-4 block">THE PROOF WALL</span>
          <h2 className="text-5xl sm:text-7xl font-light text-white tracking-tighter">
            Built to be <span className="italic text-[#94A3B8]">watched twice.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <div key={idx} className="glass-panel p-10 reveal-on-scroll" ref={useReveal()} style={{ transitionDelay: `${idx * 0.2}s` }}>
              <div className="flex justify-between items-center mb-8">
                <div className="hud-badge !text-white !bg-[#3b82f6] border-none">{item.label}</div>
                <div className="timecode text-[10px] opacity-40">{item.time}</div>
              </div>
              <h3 className="text-xl font-medium text-white mb-4 tracking-tight">{item.title}</h3>
              <p className="text-[#94A3B8] font-light text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── System Section ─────────────────────────────────────────────────────────
function System() {
  return (
    <section id="system" className="w-full bg-[#040611] py-32 px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="reveal-on-scroll" ref={useReveal()}>
          <span className="text-[#3b82f6] text-[10px] font-bold tracking-[0.4em] mb-4 block">BEHIND THE FILM</span>
          <h2 className="text-5xl font-light text-white tracking-tighter mb-8">
            Every story is backed<br />by a <span className="italic text-[#94A3B8]">system.</span>
          </h2>
          <p className="text-[#94A3B8] text-lg font-light leading-relaxed">
            Command Centre is the dashboard running quietly behind every project — tracking what's actually working across Instagram, YouTube, and TikTok, so the next film is built on evidence, not guesswork.
          </p>
        </div>
        <div className="glass-panel p-10 reveal-on-scroll" ref={useReveal()} style={{ transitionDelay: '0.2s' }}>
          <div className="space-y-6">
            {[
              { l: "STATUS", v: "TRACKING — LIVE" },
              { l: "SOURCES", v: "IG / YT / TIKTOK" },
              { l: "FUNNEL STAGE", v: "FIRST LOOK → DECISION" },
              { l: "ROLE", v: "SUPPORTING PROOF" }
            ].map((row, i) => (
              <div key={i} className="flex justify-between items-center border-b border-white/5 pb-4">
                <span className="hud-text">{row.l}</span>
                <span className="text-[10px] font-bold tracking-widest text-white">{row.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Team Section ───────────────────────────────────────────────────────────
function Team() {
  return (
    <section id="team" className="w-full bg-[#040611] py-32 px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 reveal-on-scroll" ref={useReveal()}>
          <span className="text-[#3b82f6] text-[10px] font-bold tracking-[0.4em] mb-4 block">WHO'S BEHIND THE LENS</span>
          <h2 className="text-5xl sm:text-7xl font-light text-white tracking-tighter">
            You work with <span className="text-[#3b82f6]">us.</span><br />
            <span className="text-[#94A3B8] italic">Not a hand-off.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="reveal-on-scroll" ref={useReveal()}>
            <span className="hud-text block mb-4">FOUNDER · DIRECTOR OF PHOTOGRAPHY</span>
            <h3 className="text-4xl font-light text-white mb-6 tracking-tight">David</h3>
            <p className="text-[#94A3B8] font-light leading-relaxed">
              Shoots every film on a Sony A7III with a documentary eye — the camera stays close, the story stays honest, the cuts stay tight.
            </p>
          </div>
          <div className="reveal-on-scroll" ref={useReveal()} style={{ transitionDelay: '0.2s' }}>
            <span className="hud-text block mb-4">CO-FOUNDER</span>
            <h3 className="text-4xl font-light text-white mb-6 tracking-tight">Manus</h3>
            <p className="text-[#94A3B8] font-light leading-relaxed">
              Builds the systems and strategy that turn a single great film into a body of proof a brand can keep pointing to.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ─────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="w-full bg-[#040611] py-32 px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto text-center">
        <span className="text-[#3b82f6] text-[10px] font-bold tracking-[0.4em] mb-8 block uppercase">ROLL CREDITS</span>
        <h2 className="text-5xl sm:text-7xl font-light text-white tracking-tighter mb-12">
          Let's shoot something<br />
          <span className="italic text-[#94A3B8]">worth proving.</span>
        </h2>
        <Link href="#discovery">
          <button className="px-12 py-5 bg-white text-black font-bold rounded-full hover:scale-105 transition-all duration-500 mb-20">
            START A PROJECT ▸
          </button>
        </Link>
        <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-white font-bold tracking-tighter">EARNEDREACH</div>
          <div className="flex gap-10">
            {['Instagram ↗', 'YouTube ↗'].map(s => (
              <a key={s} href="#" className="text-[10px] font-bold tracking-widest text-white/40 hover:text-white transition-colors">{s}</a>
            ))}
          </div>
          <div className="hud-text">© 2026 A MEDIA STUDIO FOR AMBITIOUS BRANDS</div>
        </div>
      </div>
    </footer>
  );
}

export default function Marketing() {
  return (
    <div className="w-full bg-[#040611] text-[#F6FAFF] selection:bg-[#3b82f6] selection:text-white">
      <Navigation />
      <HeroSection />
      <Pillars />
      <ProofWall />
      <System />
      <Team />
      <Footer />
    </div>
  );
}
