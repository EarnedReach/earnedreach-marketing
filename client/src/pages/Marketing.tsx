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
import { useState, useEffect } from "react";

/**
 * EarnedReach Marketing Homepage — Premium Edition
 * Design: Nitid-Inspired Cinematic Aesthetic
 * Focus: Glassmorphism, Sophisticated Motion, Premium Typography
 * Positioning: High-end creative studio for founders & coaches
 */

// ─── Hero Section: Cinematic Opening with Gradient Orbs ─────────────────────
function HeroSection() {
  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Animated Gradient Orbs (Nitid-style) */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top-left orb */}
        <div 
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.4) 0%, transparent 70%)',
            filter: 'blur(60px)',
            animation: 'float 20s ease-in-out infinite'
          }}
        />
        {/* Bottom-right orb */}
        <div 
          className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
            filter: 'blur(60px)',
            animation: 'float 25s ease-in-out infinite reverse'
          }}
        />
        {/* Center orb */}
        <div 
          className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-80 h-80 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.2) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="mb-8 inline-block">
          <Badge className="bg-white/10 text-white border border-white/20 hover:bg-white/20 px-4 py-2 rounded-full font-light">
            Storytelling for Founders
          </Badge>
        </div>
        
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-light text-white leading-tight mb-8 tracking-tight">
          Your message,<br />
          <span className="font-extralight text-gray-300">amplified</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-gray-400 font-light mb-12 leading-relaxed max-w-2xl mx-auto">
          Most founders have a powerful story. Few know how to tell it. We specialize in finding your narrative and putting it in front of the people who need to hear it.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="#discovery">
            <button className="px-8 py-4 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl">
              Book a Discovery Call
            </button>
          </Link>
          <Link href="#the-work">
            <button className="px-8 py-4 bg-white/10 text-white font-medium rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm">
              See Our Work
            </button>
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-30px) translateX(20px); }
        }
      `}</style>
    </div>
  );
}

// ─── Navigation: Glassmorphism Header ───────────────────────────────────────
function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/80 backdrop-blur-md border-b border-white/10' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <div className="text-white font-light text-xl cursor-pointer tracking-tight">
              EarnedReach
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-12">
            <Link href="#how-it-works">
              <span className="text-gray-300 hover:text-white transition text-sm cursor-pointer font-light">
                How It Works
              </span>
            </Link>
            <Link href="#the-work">
              <span className="text-gray-300 hover:text-white transition text-sm cursor-pointer font-light">
                The Work
              </span>
            </Link>
            <Link href="/philosophy">
              <span className="text-gray-300 hover:text-white transition text-sm cursor-pointer font-light">
                Philosophy
              </span>
            </Link>
            <Link href="#discovery">
              <button className="px-6 py-2 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-all duration-300 text-sm">
                Book Call
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-3 border-t border-white/10 pt-4">
            <Link href="#how-it-works">
              <div className="text-gray-300 hover:text-white transition text-sm py-2 cursor-pointer font-light">
                How It Works
              </div>
            </Link>
            <Link href="#the-work">
              <div className="text-gray-300 hover:text-white transition text-sm py-2 cursor-pointer font-light">
                The Work
              </div>
            </Link>
            <Link href="/philosophy">
              <div className="text-gray-300 hover:text-white transition text-sm py-2 cursor-pointer font-light">
                Philosophy
              </div>
            </Link>
            <Link href="#discovery">
              <button className="w-full px-6 py-2 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-all duration-300 text-sm mt-4">
                Book Discovery Call
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

// ─── Social Proof: Trusted By (Marquee) ─────────────────────────────────────
function SocialProof() {
  const clients = [
    "Alex Hormozi",
    "Steven Bartlett",
    "Iman Gadzhi",
    "Sam Ovens",
    "Founder A",
    "Founder B",
  ];

  return (
    <div className="w-full bg-black py-16 border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-400 text-sm font-light mb-8 uppercase tracking-widest">
          Trusted by leading founders
        </p>
        
        <div className="relative overflow-hidden">
          <div className="flex gap-8 animate-marquee">
            {[...clients, ...clients].map((client, idx) => (
              <div key={idx} className="flex-shrink-0 px-4">
                <p className="text-gray-300 font-light text-lg whitespace-nowrap">
                  {client}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 16px)); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}

// ─── Who We Help Section ────────────────────────────────────────────────────
function WhoWeHelp() {
  const painPoints = [
    {
      title: "You have a message.",
      description: "But your audience doesn't know it exists. You're buried in the noise."
    },
    {
      title: "You're spending time on content.",
      description: "That doesn't move the needle. You need strategy, not just posting."
    },
    {
      title: "You know your offer is premium.",
      description: "But your content doesn't reflect that. It feels generic and forgettable."
    },
  ];

  return (
    <section id="who-we-help" className="w-full bg-black py-24 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
            We work with founders<br />
            <span className="font-extralight text-gray-400">who know their worth</span>
          </h2>
          <p className="text-lg text-gray-400 font-light max-w-2xl mx-auto">
            If you're building something meaningful and your content doesn't reflect that, we can help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {painPoints.map((point, idx) => (
            <div 
              key={idx}
              className="p-8 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:border-white/20"
            >
              <h3 className="text-xl font-light text-white mb-4">{point.title}</h3>
              <p className="text-gray-400 font-light leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── The Work Section: Proof Wall ──────────────────────────────────────────
function TheWork() {
  const projects = [
    {
      title: "Founder's Narrative Reframe",
      category: "Personal Branding",
      description: "Repositioned a coach's entire positioning through cinematic storytelling."
    },
    {
      title: "Product Launch Campaign",
      category: "Launch Strategy",
      description: "Created a 3-part content series that generated 50K+ views in 2 weeks."
    },
    {
      title: "Authority Building Series",
      category: "Content Strategy",
      description: "Built a founder's thought leadership through strategic, high-impact reels."
    },
  ];

  return (
    <section id="the-work" className="w-full bg-black py-24 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
            The Work
          </h2>
          <p className="text-lg text-gray-400 font-light">
            Here's what happens when storytelling meets strategy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div 
              key={idx}
              className="group relative overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-8 hover:border-white/20 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <Badge className="bg-white/10 text-white border border-white/20 text-xs font-light mb-4">
                  {project.category}
                </Badge>
                <h3 className="text-xl font-light text-white mb-3">{project.title}</h3>
                <p className="text-gray-400 font-light leading-relaxed mb-6">{project.description}</p>
                
                <Link href="#discovery">
                  <button className="text-white font-light text-sm flex items-center gap-2 hover:gap-3 transition-all duration-300">
                    See Project <ArrowRight size={16} />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How We Work Section ───────────────────────────────────────────────────
function HowWeWork() {
  const steps = [
    {
      number: "01",
      title: "Discovery",
      description: "We understand your message, your audience, and what makes you different."
    },
    {
      number: "02",
      title: "Strategy",
      description: "We build a content strategy that positions you as the authority in your space."
    },
    {
      number: "03",
      title: "Creation",
      description: "We create cinematic, high-converting content that resonates with your ideal clients."
    },
  ];

  return (
    <section id="how-it-works" className="w-full bg-black py-24 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
            How We Work
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              <div className="mb-8">
                <div className="text-6xl font-light text-white/20 mb-4">{step.number}</div>
                <h3 className="text-2xl font-light text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 font-light leading-relaxed">{step.description}</p>
              </div>
              
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 -right-6 w-12 h-0.5 bg-gradient-to-r from-white/20 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Section ───────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section id="discovery" className="w-full bg-black py-24 border-b border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-8 leading-tight">
          Ready to elevate<br />
          <span className="font-extralight text-gray-400">your message?</span>
        </h2>
        
        <p className="text-lg text-gray-400 font-light mb-12 max-w-2xl mx-auto">
          Let's talk about your story. Book a 30-minute discovery call and we'll show you exactly how we can help.
        </p>

        <button className="px-10 py-5 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-all duration-300 text-lg shadow-lg hover:shadow-xl">
          Book Your Discovery Call
        </button>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="w-full bg-black border-t border-white/10 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-white font-light text-lg mb-4">EarnedReach</h3>
            <p className="text-gray-400 font-light text-sm">
              Premium storytelling for founders who know their worth.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-light mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#the-work" className="text-gray-400 hover:text-white font-light text-sm transition">Our Work</a></li>
              <li><a href="#how-it-works" className="text-gray-400 hover:text-white font-light text-sm transition">How It Works</a></li>
              <li><a href="/philosophy" className="text-gray-400 hover:text-white font-light text-sm transition">Philosophy</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-light mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white font-light text-sm transition">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white font-light text-sm transition">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white font-light text-sm transition">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-light mb-4">Connect</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white font-light text-sm transition">Instagram</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white font-light text-sm transition">Twitter</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white font-light text-sm transition">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-gray-400 font-light text-sm">
            © 2026 EarnedReach. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Export ───────────────────────────────────────────────────────────
export default function Marketing() {
  return (
    <div className="w-full bg-black text-white">
      <Navigation />
      <HeroSection />
      <SocialProof />
      <WhoWeHelp />
      <TheWork />
      <HowWeWork />
      <CTASection />
      <Footer />
    </div>
  );
}
