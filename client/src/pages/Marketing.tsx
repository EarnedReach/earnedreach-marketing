import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  CheckCircle2,
  Menu,
  X,
} from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect, useRef } from "react";

/**
 * EarnedReach Marketing Homepage — Nitid Edition
 * Design: Exact Nitid Media Stylistic Benchmark
 * Focus: Deep Cinematic Blue, Glassmorphism, Fluid Motion
 */

// ─── Intersection Observer Hook for Scroll Animations ───────────────────────
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

// ─── Hero Section: Deep Cinematic Impact ────────────────────────────────────
function HeroSection() {
  return (
    <div className="relative w-full min-h-screen bg-[#040611] overflow-hidden flex items-center justify-center">
      {/* Nitid-style Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main Cinematic Glow */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-40"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(30, 44, 80, 0.8) 0%, rgba(4, 6, 17, 1) 70%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Top-right subtle blue light */}
        <div 
          className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] opacity-30"
          style={{
            background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.4) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
        {/* Animated accent light */}
        <div 
          className="absolute top-[10%] left-[5%] w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle at center, rgba(166, 188, 245, 0.3) 0%, transparent 70%)',
            filter: 'blur(60px)',
            animation: 'pulse 15s ease-in-out infinite'
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="mb-10 reveal-on-scroll active">
          <Badge className="bg-[#1C2A56] text-[#B3CBEF] border border-[#3b82f633] hover:bg-[#1C2A56]/80 px-5 py-2 rounded-full font-light tracking-wider uppercase text-[10px]">
            Masters of Storytelling
          </Badge>
        </div>
        
        <h1 className="text-6xl sm:text-8xl lg:text-9xl font-light text-white leading-[0.9] mb-10 tracking-tighter">
          Where attention<br />
          <span className="text-[#9ACBF5] nitid-glow">meets intention.</span>
        </h1>
        
        <p className="text-xl sm:text-2xl text-[#94A3B8] font-light mb-14 leading-relaxed max-w-3xl mx-auto">
          Every brand has a story. Every founder has a vision.<br className="hidden sm:block" />
          We bring both to life and put them in front of the right audience.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center reveal-on-scroll active" style={{ transitionDelay: '0.2s' }}>
          <Link href="#discovery">
            <button className="px-10 py-5 bg-[#F6FAFF] text-[#040611] font-semibold rounded-full hover:bg-white transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105">
              Get Started
            </button>
          </Link>
          <Link href="#the-work">
            <button className="px-10 py-5 bg-transparent text-white font-medium rounded-full border border-white/20 hover:bg-white/5 transition-all duration-500 backdrop-blur-md">
              View Projects
            </button>
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}

// ─── Navigation: Ultra-Clean Glassmorphism ──────────────────────────────────
function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled 
          ? 'py-4 bg-[#040611]/80 backdrop-blur-2xl border-b border-white/5' 
          : 'py-8 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="flex items-center justify-between">
          <Link href="/">
            <div className="text-white font-medium text-2xl cursor-pointer tracking-tighter flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-black rounded-sm rotate-45" />
              </div>
              EarnedReach
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            {['About Us', 'Services', 'Projects'].map((item) => (
              <Link key={item} href={`#${item.toLowerCase().replace(' ', '-')}`}>
                <span className="text-gray-400 hover:text-white transition-colors duration-300 text-sm cursor-pointer font-medium tracking-tight">
                  {item}
                </span>
              </Link>
            ))}
            <Link href="#discovery">
              <button className="px-7 py-2.5 bg-white/10 text-white font-medium rounded-full border border-white/10 hover:bg-white hover:text-black transition-all duration-500 text-sm">
                Get Started ↗
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
    </nav>
  );
}

// ─── Trusted By: Prestigious Marquee ────────────────────────────────────────
function SocialProof() {
  const clients = ["ALEX HORMOZI", "STEVEN BARTLETT", "IMAN GADZHI", "SAM OVENS", "CHRIS DO", "GARY VEE"];
  return (
    <div className="w-full bg-[#040611] py-20 border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-[#94A3B8] text-[10px] font-medium mb-12 uppercase tracking-[0.3em]">
          TRUSTED BY ELITE FOUNDERS
        </p>
        <div className="relative overflow-hidden flex mask-marquee">
          <div className="flex gap-20 animate-marquee whitespace-nowrap">
            {[...clients, ...clients].map((client, idx) => (
              <span key={idx} className="text-white/40 font-light text-2xl sm:text-4xl tracking-tighter hover:text-white transition-colors duration-500 cursor-default">
                {client}
              </span>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marquee 40s linear infinite; }
        .mask-marquee {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
      `}</style>
    </div>
  );
}

// ─── Services: Premium Grid ─────────────────────────────────────────────────
function Services() {
  const services = [
    {
      title: "Systems & Strategy",
      description: "Every business runs on systems, so why doesn't your content? We build foundations that scale with your vision.",
      icon: "⚙️"
    },
    {
      title: "Branding Identity",
      description: "A consistent look and tone turns attention into authority and positions you as a leader in your niche.",
      icon: "💎"
    },
    {
      title: "Creative Production",
      description: "Cinematic, high-end content crafted by a network of elite editors, designers, and filmmakers.",
      icon: "🎬"
    }
  ];

  return (
    <section id="services" className="w-full bg-[#040611] py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 reveal-on-scroll" ref={useReveal()}>
          <h2 className="text-4xl sm:text-6xl font-light text-white mb-8 tracking-tight">
            The standard of<br />
            <span className="text-[#9ACBF5]">modern storytelling.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s, idx) => (
            <div 
              key={idx}
              className="glass-panel p-12 rounded-[2rem] reveal-on-scroll"
              style={{ transitionDelay: `${idx * 0.2}s` }}
              ref={useReveal()}
            >
              <div className="text-4xl mb-8">{s.icon}</div>
              <h3 className="text-2xl font-medium text-white mb-6 tracking-tight">{s.title}</h3>
              <p className="text-[#94A3B8] font-light leading-relaxed text-lg">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── The Work: Cinematic Showcase ──────────────────────────────────────────
function TheWork() {
  return (
    <section id="projects" className="w-full bg-[#040611] py-32 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 reveal-on-scroll" ref={useReveal()}>
          <h2 className="text-4xl sm:text-6xl font-light text-white tracking-tight">
            Selected<br />Projects
          </h2>
          <p className="text-[#94A3B8] font-light text-xl max-w-md mt-6 md:mt-0">
            We don't just make videos. We create digital landmarks for brands that matter.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {[1, 2].map((i) => (
            <div key={i} className="group relative aspect-video rounded-[2.5rem] overflow-hidden bg-[#1C2A56] reveal-on-scroll" ref={useReveal()}>
              <div className="absolute inset-0 bg-gradient-to-t from-[#040611] via-transparent to-transparent z-10 opacity-60" />
              <div className="absolute bottom-12 left-12 z-20">
                <Badge className="bg-white/10 text-white border border-white/20 mb-4">Cinematic Series</Badge>
                <h3 className="text-3xl font-medium text-white tracking-tight">SushiSwap Narrative</h3>
                <p className="text-white/60 font-light mt-2">AI Powered Teaser</p>
              </div>
              <div className="absolute inset-0 bg-white/5 group-hover:bg-white/0 transition-colors duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA: Ready to Elevate ──────────────────────────────────────────────────
function CTA() {
  return (
    <section id="discovery" className="w-full bg-[#040611] py-40 px-6">
      <div className="max-w-4xl mx-auto text-center reveal-on-scroll" ref={useReveal()}>
        <h2 className="text-5xl sm:text-8xl font-light text-white mb-12 tracking-tighter">
          Ready to elevate<br />
          <span className="text-[#9ACBF5]">your vision?</span>
        </h2>
        <Link href="#discovery">
          <button className="px-14 py-6 bg-[#F6FAFF] text-[#040611] font-bold rounded-full hover:bg-white transition-all duration-500 shadow-[0_0_50px_rgba(59,130,246,0.3)] hover:scale-105 text-xl">
            Get Started
          </button>
        </Link>
      </div>
    </section>
  );
}

// ─── Main Export ───────────────────────────────────────────────────────────
export default function Marketing() {
  return (
    <div className="w-full bg-[#040611] text-[#F6FAFF] selection:bg-[#3b82f6] selection:text-white">
      <Navigation />
      <HeroSection />
      <SocialProof />
      <Services />
      <TheWork />
      <CTA />
      <footer className="w-full bg-[#040611] py-20 px-6 border-t border-white/5 text-center">
        <div className="max-w-7xl mx-auto">
          <div className="text-white font-medium text-2xl tracking-tighter mb-8">EarnedReach</div>
          <p className="text-[#94A3B8] font-light text-sm max-w-sm mx-auto mb-12">
            Elevating brands through compelling visual content and strategic storytelling.
          </p>
          <div className="flex justify-center gap-8 mb-12">
            {['Instagram', 'YouTube', 'Twitter', 'LinkedIn'].map(s => (
              <a key={s} href="#" className="text-gray-500 hover:text-white transition-colors duration-300 text-sm font-medium">{s}</a>
            ))}
          </div>
          <div className="text-gray-600 text-xs font-light">
            © 2026 EarnedReach. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
