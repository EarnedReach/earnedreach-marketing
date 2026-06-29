import { Badge } from "@/components/ui/badge";
import { ArrowRight, Menu, X, Play } from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect, useRef } from "react";

/**
 * EarnedReach Marketing Homepage — Ultra Premium Edition
 * Design: High-End Cinematic Creative Studio
 * Focus: Massive Typography, Visual Depth, Sophisticated Motion
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

// ─── Hero Section: Massive Impact ───────────────────────────────────────────
function HeroSection() {
  return (
    <div className="relative w-full min-h-screen bg-[#020308] overflow-hidden flex items-center justify-center">
      {/* Cinematic Lighting Layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] opacity-40"
          style={{
            background: 'radial-gradient(circle at center, rgba(30, 44, 80, 0.6) 0%, transparent 70%)',
            filter: 'blur(120px)',
          }}
        />
        <div 
          className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[60%] opacity-20"
          style={{
            background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
        {/* Floating Light Leak */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] opacity-10"
          style={{
            background: 'conic-gradient(from 180deg at 50% 50%, #3b82f6 0deg, transparent 360deg)',
            filter: 'blur(150px)',
            animation: 'spin 30s linear infinite'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-[1400px] mx-auto">
        <div className="mb-12 reveal-on-scroll active">
          <span className="text-[#3b82f6] text-xs font-bold tracking-[0.4em] uppercase">
            Creative Production Studio
          </span>
        </div>
        
        <h1 className="text-[12vw] md:text-[10vw] font-extralight text-white leading-[0.85] tracking-[-0.06em] mb-12">
          REWRITE THE<br />
          <span className="italic font-light nitid-glow">NARRATIVE.</span>
        </h1>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 mt-20">
          <p className="text-xl md:text-2xl text-[#94A3B8] font-light text-left max-w-xl leading-relaxed">
            We partner with founders to build high-status brands through cinematic storytelling and strategic content systems.
          </p>
          
          <div className="flex gap-8 items-center reveal-on-scroll active" style={{ transitionDelay: '0.4s' }}>
            <Link href="#discovery">
              <button className="group relative px-12 py-6 bg-white text-black font-bold rounded-full overflow-hidden transition-all duration-500 hover:scale-105">
                <span className="relative z-10">WORK WITH US</span>
                <div className="absolute inset-0 bg-[#3b82f6] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </Link>
            <Link href="#projects">
              <button className="flex items-center gap-4 text-white font-medium group">
                <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/10 transition-all">
                  <Play size={20} fill="white" />
                </div>
                <span className="tracking-widest text-xs font-bold">SHOWREEL</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// ─── Navigation: Minimal Luxury ─────────────────────────────────────────────
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-1000 ${scrolled ? 'py-6 bg-black/80 backdrop-blur-xl' : 'py-12'}`}>
      <div className="max-w-[1800px] mx-auto px-12 flex justify-between items-center">
        <Link href="/">
          <div className="text-white font-bold text-2xl tracking-tighter cursor-pointer">
            ER<span className="text-[#3b82f6]">.</span>
          </div>
        </Link>
        
        <div className="hidden md:flex gap-16">
          {['STUDIO', 'SERVICES', 'WORK'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-bold tracking-[0.3em] text-white/50 hover:text-white transition-colors">
              {item}
            </a>
          ))}
        </div>

        <button className="text-white group flex items-center gap-4">
          <span className="text-[10px] font-bold tracking-[0.3em] hidden sm:block">MENU</span>
          <div className="w-10 h-10 flex flex-col justify-center gap-1.5 items-end">
            <div className="w-8 h-[1px] bg-white" />
            <div className="w-5 h-[1px] bg-white group-hover:w-8 transition-all" />
          </div>
        </button>
      </div>
    </nav>
  );
}

// ─── Services: Luxury Grid ──────────────────────────────────────────────────
function Services() {
  const items = [
    { num: '01', title: 'STRATEGY', desc: 'Defining the narrative that positions you as the undisputed authority.' },
    { num: '02', title: 'PRODUCTION', desc: 'Cinematic visual content that commands attention and builds trust.' },
    { num: '03', title: 'SYSTEMS', desc: 'Strategic distribution frameworks to maximize reach and conversion.' }
  ];

  return (
    <section id="services" className="w-full bg-[#020308] py-40 px-12">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row gap-20 items-end mb-40 reveal-on-scroll" ref={useReveal()}>
          <h2 className="text-[8vw] font-extralight leading-none tracking-tighter text-white">
            OUR<br />EXPERTISE
          </h2>
          <p className="text-[#94A3B8] text-xl font-light max-w-md pb-4">
            We don't do generic. We build digital empires for founders who refuse to be ignored.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {items.map((item, idx) => (
            <div key={idx} className="group p-16 border border-white/5 hover:bg-white/5 transition-all duration-700 reveal-on-scroll" ref={useReveal()} style={{ transitionDelay: `${idx * 0.2}s` }}>
              <div className="text-[#3b82f6] font-bold tracking-widest mb-12 text-xs">{item.num}</div>
              <h3 className="text-4xl font-light text-white mb-8 tracking-tight group-hover:translate-x-4 transition-transform duration-700">{item.title}</h3>
              <p className="text-[#94A3B8] font-light leading-relaxed text-lg">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── The Work: Immersive Showcase ──────────────────────────────────────────
function TheWork() {
  return (
    <section id="work" className="w-full bg-[#020308] py-40 px-12 border-t border-white/5">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div className="reveal-on-scroll" ref={useReveal()}>
            <div className="aspect-[4/5] bg-[#080A1A] relative overflow-hidden group border-glow">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
              <div className="absolute bottom-16 left-16 z-20">
                <span className="text-[#3b82f6] text-xs font-bold tracking-[0.3em] mb-4 block">BRAND FILM</span>
                <h3 className="text-5xl font-light text-white tracking-tighter">THE VISIONARY</h3>
              </div>
              <div className="absolute inset-0 bg-white/5 group-hover:scale-110 transition-transform duration-1000" />
            </div>
          </div>
          <div className="mt-40 reveal-on-scroll" ref={useReveal()} style={{ transitionDelay: '0.2s' }}>
            <div className="aspect-[4/5] bg-[#080A1A] relative overflow-hidden group border-glow">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
              <div className="absolute bottom-16 left-16 z-20">
                <span className="text-[#3b82f6] text-xs font-bold tracking-[0.3em] mb-4 block">STRATEGY</span>
                <h3 className="text-5xl font-light text-white tracking-tighter">SCALING AUTHORITY</h3>
              </div>
              <div className="absolute inset-0 bg-white/5 group-hover:scale-110 transition-transform duration-1000" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA: Final Call ────────────────────────────────────────────────────────
function CTA() {
  return (
    <section id="discovery" className="w-full bg-[#020308] py-60 px-12">
      <div className="max-w-[1400px] mx-auto text-center reveal-on-scroll" ref={useReveal()}>
        <h2 className="text-[10vw] font-extralight text-white leading-none tracking-tighter mb-20">
          START YOUR<br />
          <span className="italic font-light nitid-glow">LEGACY.</span>
        </h2>
        <Link href="#discovery">
          <button className="px-20 py-8 bg-white text-black font-bold rounded-full text-xl hover:scale-110 transition-all duration-700 shadow-[0_0_60px_rgba(59,130,246,0.4)]">
            BOOK A CALL
          </button>
        </Link>
      </div>
    </section>
  );
}

// ─── Main Export ───────────────────────────────────────────────────────────
export default function Marketing() {
  return (
    <div className="w-full bg-[#020308] text-[#F6FAFF] selection:bg-[#3b82f6] selection:text-white">
      <Navigation />
      <HeroSection />
      <Services />
      <TheWork />
      <CTA />
      <footer className="w-full bg-[#020308] py-40 px-12 border-t border-white/5">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-start gap-20">
          <div className="max-w-md">
            <div className="text-white font-bold text-4xl tracking-tighter mb-8">ER<span className="text-[#3b82f6]">.</span></div>
            <p className="text-[#94A3B8] text-xl font-light leading-relaxed">
              We build high-status brands for founders who refuse to be ignored. Cinematic storytelling, strategic systems, undisputed authority.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-20">
            <div>
              <h4 className="text-xs font-bold tracking-[0.3em] text-white mb-8">STUDIO</h4>
              <ul className="space-y-4 text-sm text-[#94A3B8] font-light">
                <li><a href="#" className="hover:text-white transition">SERVICES</a></li>
                <li><a href="#" className="hover:text-white transition">WORK</a></li>
                <li><a href="#" className="hover:text-white transition">PROCESS</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold tracking-[0.3em] text-white mb-8">SOCIAL</h4>
              <ul className="space-y-4 text-sm text-[#94A3B8] font-light">
                <li><a href="#" className="hover:text-white transition">INSTAGRAM</a></li>
                <li><a href="#" className="hover:text-white transition">YOUTUBE</a></li>
                <li><a href="#" className="hover:text-white transition">LINKEDIN</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-[1600px] mx-auto mt-40 pt-12 border-t border-white/5 text-[#94A3B8] text-[10px] font-bold tracking-[0.3em] flex justify-between">
          <span>© 2026 EARNEDREACH STUDIO</span>
          <span>ALL RIGHTS RESERVED</span>
        </div>
      </footer>
    </div>
  );
}
