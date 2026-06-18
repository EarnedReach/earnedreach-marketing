import { Button } from "@/components/ui/button";
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
import { useState } from "react";

/**
 * EarnedReach Marketing Homepage — Revamp v2
 * Design: Apple-Style Minimalism — Pure black/white, cinematic, elegant
 * Focus: Storytelling-led, Creative Excellence First
 * Positioning: Premium creative studio for high-ticket coaches & consultants
 */

// ─── Hero Section: Cinematic Opening ────────────────────────────────────────
function HeroSection() {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Cinematic Background Video Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-60" />
      
      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light text-white leading-tight mb-6">
          Every coach has a message worth spreading.
        </h1>
        <p className="text-xl sm:text-2xl text-gray-300 font-light mb-8 leading-relaxed">
          Most just haven't found the story yet. We find it, shape it, and put it in front of the people who need to hear it.
        </p>
        <Link href="#discovery">
          <Button className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg font-medium rounded-none">
            Book a Discovery Call
          </Button>
        </Link>
      </div>
    </div>
  );
}

// ─── Navigation ────────────────────────────────────────────────────────────
function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <div className="text-white font-light text-lg cursor-pointer">EarnedReach</div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#how-it-works">
              <span className="text-gray-300 hover:text-white transition text-sm cursor-pointer">How It Works</span>
            </Link>
            <Link href="#the-work">
              <span className="text-gray-300 hover:text-white transition text-sm cursor-pointer">The Work</span>
            </Link>
            <Link href="/philosophy">
              <span className="text-gray-300 hover:text-white transition text-sm cursor-pointer">Philosophy</span>
            </Link>
            <Link href="#discovery">
              <Button className="bg-white text-black hover:bg-gray-100 px-6 py-2 text-sm font-medium rounded-none">
                Book Discovery Call
              </Button>
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
              <div className="text-gray-300 hover:text-white transition text-sm py-2 cursor-pointer">How It Works</div>
            </Link>
            <Link href="#the-work">
              <div className="text-gray-300 hover:text-white transition text-sm py-2 cursor-pointer">The Work</div>
            </Link>
            <Link href="/philosophy">
              <div className="text-gray-300 hover:text-white transition text-sm py-2 cursor-pointer">Philosophy</div>
            </Link>
            <Link href="#discovery">
              <Button className="w-full bg-white text-black hover:bg-gray-100 px-6 py-2 text-sm font-medium rounded-none">
                Book Discovery Call
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

// ─── Who We Help: Pain Points ──────────────────────────────────────────────
function WhoWeHelpSection() {
  const painPoints = [
    {
      title: "Creating content, but not building a brand",
      description: "Volume without positioning. 10 videos a week, but they don't add up to a coherent narrative. Your message gets lost in the noise."
    },
    {
      title: "No system",
      description: "Posting randomly. No strategy thread tying it together. You're creating, not strategizing. That's exhausting."
    },
    {
      title: "Invisible expertise",
      description: "The gap between how good you are and how you're perceived online. Your true value isn't visible to the people who need to hear it."
    }
  ];

  return (
    <section className="bg-white py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-5xl font-light text-black mb-16 text-center">
          The Gap
        </h2>
        <div className="grid gap-12 sm:gap-16">
          {painPoints.map((point, idx) => (
            <div key={idx} className="border-l-2 border-black pl-6 sm:pl-8">
              <h3 className="text-xl sm:text-2xl font-light text-black mb-3">{point.title}</h3>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── The Work: Proof Wall ──────────────────────────────────────────────────
function TheWorkSection() {
  const works = [
    {
      title: "Brand Film: SushiSwap",
      description: "Cinematic storytelling for a DeFi protocol. Positioning innovation as accessible.",
      category: "Brand Film"
    },
    {
      title: "Content Series: Founder Positioning",
      description: "Short-form content that builds authority and trust. 30 pieces over 90 days.",
      category: "Content Series"
    },
    {
      title: "Narrative Architecture",
      description: "Mapping a coach's entire messaging framework. From positioning to distribution.",
      category: "Strategy"
    }
  ];

  return (
    <section id="the-work" className="bg-black py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-5xl font-light text-white mb-16 text-center">
          The Work
        </h2>
        <div className="grid gap-8 sm:gap-12 md:grid-cols-3">
          {works.map((work, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="bg-gray-900 aspect-video rounded-lg mb-4 flex items-center justify-center border border-gray-800 group-hover:border-white transition">
                <div className="text-center">
                  <div className="text-gray-500 text-sm mb-2">[Video Placeholder]</div>
                  <div className="text-gray-400 text-xs">{work.category}</div>
                </div>
              </div>
              <h3 className="text-lg font-light text-white mb-2">{work.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{work.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Founder Story ────────────────────────────────────────────────────────
function FounderStorySection() {
  return (
    <section className="bg-white py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-5xl font-light text-black mb-12 text-center">
          Built by Creators Who Understand the Problem
        </h2>
        <div className="prose prose-lg max-w-none text-gray-700">
          <p className="text-base sm:text-lg leading-relaxed mb-6">
            I started as a videographer working directly with 5 and 6-figure entrepreneurs. I loved the craft — but I kept seeing the same bottleneck: brilliant founders drowning in content, with zero time to focus on what actually grew their business.
          </p>
          <p className="text-base sm:text-lg leading-relaxed mb-6">
            They'd hire editors, but that only solved half the problem. They still needed strategy, ownership of their narrative, and a system that told them what was working.
          </p>
          <p className="text-base sm:text-lg leading-relaxed">
            So I built EarnedReach — not as an agency, but as the creative partner I wish they'd had from day one. A studio that thinks like a strategist, not just a production vendor.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── How We Work ────────────────────────────────────────────────────────
function HowWeWorkSection() {
  const steps = [
    {
      number: "01",
      title: "Discovery Call",
      description: "We review your content, identify gaps, and map out a custom strategy. You leave with clarity."
    },
    {
      number: "02",
      title: "Strategy + System Built",
      description: "Positioning, messaging framework, content calendar, and your first pieces delivered."
    },
    {
      number: "03",
      title: "Ongoing Production & Direction",
      description: "Continuous content creation, performance tracking, and strategic optimization."
    }
  ];

  return (
    <section id="how-it-works" className="bg-black py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-5xl font-light text-white mb-16 text-center">
          How It Works
        </h2>
        <div className="space-y-12 sm:space-y-16">
          {steps.map((step, idx) => (
            <div key={idx} className="flex gap-6 sm:gap-8">
              <div className="text-4xl sm:text-5xl font-light text-gray-700 flex-shrink-0">{step.number}</div>
              <div>
                <h3 className="text-xl sm:text-2xl font-light text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 text-base leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── The System: Command Centre ────────────────────────────────────────────
function TheSystemSection() {
  return (
    <section className="bg-white py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-5xl font-light text-black mb-8 text-center">
          The System
        </h2>
        <p className="text-lg text-gray-600 text-center mb-12 leading-relaxed">
          Most creative partners hand you content and disappear. We built our own tracking system so you always know what's actually working — views, engagement, and how it ties back to your business.
        </p>
        <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center border border-gray-300">
          <div className="text-center">
            <div className="text-gray-500 text-sm mb-2">[Command Centre Dashboard — Demo/Mockup]</div>
            <div className="text-gray-400 text-xs">Illustrative Example</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Offers ────────────────────────────────────────────────────────────────
function OffersSection() {
  const offers = [
    {
      title: "Storytelling & Production",
      description: "Brand films, short-form content, long-form pieces. We craft visuals that resonate.",
      solves: "Solves: Invisible Expertise"
    },
    {
      title: "Systems & Strategy",
      description: "Content system, positioning, messaging framework. We architect your narrative.",
      solves: "Solves: No System"
    },
    {
      title: "Creative Direction Retainer",
      description: "Ongoing partnership. Remote-friendly. We're your creative partner, not a vendor.",
      solves: "Solves: Building a Brand"
    }
  ];

  return (
    <section className="bg-black py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-5xl font-light text-white mb-16 text-center">
          What We Offer
        </h2>
        <div className="grid gap-8 sm:gap-12 md:grid-cols-3">
          {offers.map((offer, idx) => (
            <div key={idx} className="bg-gray-900 border border-gray-800 p-8 rounded-lg">
              <h3 className="text-xl font-light text-white mb-4">{offer.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">{offer.description}</p>
              <p className="text-xs text-gray-500 italic">{offer.solves}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ────────────────────────────────────────────────────────────────────
function FAQSection() {
  const faqs = [
    {
      question: "What if I'm not already creating content?",
      answer: "We start from scratch. We help you identify your core message, positioning, and then build a content system around it. You don't need to be a content creator to work with us."
    },
    {
      question: "How does pricing work?",
      answer: "Pricing is discussed on your discovery call and depends on scope, duration, and the complexity of your narrative. We offer flexible engagement models."
    },
    {
      question: "How is EarnedReach different from a content agency?",
      answer: "We're a creative studio with strategic rigor. We don't just produce content — we architect your narrative, position your expertise, and measure impact. We're partners, not vendors."
    },
    {
      question: "What's the timeline?",
      answer: "Discovery to first content: 1-2 weeks. Full strategy + first pieces: 3-4 weeks. Ongoing production: flexible, typically 3-6 month engagements."
    }
  ];

  return (
    <section className="bg-white py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-5xl font-light text-black mb-16 text-center">
          Questions
        </h2>
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`faq-${idx}`} className="border border-gray-300 px-6 py-4 rounded-lg">
              <AccordionTrigger className="text-left font-light text-lg text-black hover:text-gray-700">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 text-base leading-relaxed pt-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

// ─── CTA Section ────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section id="discovery" className="bg-black py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-5xl font-light text-white mb-6">
          Ready to tell your story?
        </h2>
        <p className="text-lg text-gray-400 mb-8 leading-relaxed">
          No obligation. 30 minutes. You'll leave with clarity regardless.
        </p>
        <Link href="https://calendly.com/earnedreach/discovery">
          <Button className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg font-medium rounded-none">
            Book a Discovery Call
          </Button>
        </Link>
      </div>
    </section>
  );
}

// ─── Main Marketing Component ────────────────────────────────────────────────
export default function Marketing() {
  return (
    <div className="w-full bg-black">
      <Navigation />
      <main className="pt-16">
        <HeroSection />
        <WhoWeHelpSection />
        <TheWorkSection />
        <FounderStorySection />
        <HowWeWorkSection />
        <TheSystemSection />
        <OffersSection />
        <FAQSection />
        <CTASection />
        
        {/* Footer */}
        <footer className="bg-black border-t border-white/10 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between text-gray-500 text-sm">
            <div>EarnedReach © 2026 All rights reserved.</div>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <Link href="/philosophy">
                <span className="hover:text-white transition cursor-pointer">Philosophy</span>
              </Link>
              <Link href="/apply">
                <span className="hover:text-white transition cursor-pointer">Apply</span>
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
