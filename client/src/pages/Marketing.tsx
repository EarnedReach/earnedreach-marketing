import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  CheckCircle2, 
  Zap,
  Target,
  TrendingUp,
  Users,
  Calendar,
  BarChart3
} from "lucide-react";
import { Link } from "wouter";

/**
 * EarnedReach Marketing Homepage
 * Design Philosophy: Dark, sophisticated, data-driven
 * Inspired by Cheat Media + Crevo
 * - Navy blue background with electric blue accents
 * - Bold, questioning headlines
 * - System-focused positioning
 * - Clear CTAs throughout
 */

export default function Marketing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400" />
              <span className="text-xl font-bold text-white">EarnedReach</span>
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/journey">
                <a className="text-slate-300 hover:text-white transition-colors">
                  How It Works
                </a>
              </Link>
              <a href="#offer" className="text-slate-300 hover:text-white transition-colors">
                Our Offer
              </a>
              <a href="#philosophy" className="text-slate-300 hover:text-white transition-colors">
                Philosophy
              </a>
            </div>

            {/* CTA */}
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => window.location.href = '#book-call'}
            >
              Book Discovery Call
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background gradient effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-3xl" />
        
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-1.5">
              Full-Stack Growth Partner
            </Badge>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              You're Creating Content.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                But Are You Building a Brand?
              </span>
            </h1>

            {/* Subheadline - Pain Agitation */}
            <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
              10 videos a week. Zero revenue to show for it. Great content, no strategy, no sales—sound familiar?
            </p>

            {/* Solution Statement */}
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-3xl mx-auto">
              You don't need more content. You need a system that converts one-time viewers into repeat customers and real revenue.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 w-full sm:w-auto"
                onClick={() => window.location.href = '#book-call'}
              >
                Book Discovery Call
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Link href="/journey?view=client">
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white text-lg px-8 py-6 w-full sm:w-auto"
                >
                  See How It Works
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-16 md:py-24 bg-slate-900/50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Why Personal Brands Plateau
            </h2>
            <p className="text-xl text-slate-400">
              It's not your content. It's the gaps in your system.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 bg-slate-800/50 border-slate-700">
              <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Hiring Nightmare
              </h3>
              <p className="text-slate-400">
                Finding, training, and managing editors drains your time and energy. You wanted to create, not become a manager.
              </p>
            </Card>

            <Card className="p-8 bg-slate-800/50 border-slate-700">
              <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                No Strategy
              </h3>
              <p className="text-slate-400">
                Posting consistently but randomly. No traffic plan, no attribution, no idea what's actually working or why.
              </p>
            </Card>

            <Card className="p-8 bg-slate-800/50 border-slate-700">
              <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Revenue Disconnect
              </h3>
              <p className="text-slate-400">
                Views don't equal revenue. You're creating content but can't trace it to actual business growth.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* The Solution - 90 Day Arc */}
      <section id="offer" className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30">
              Our Offer
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              The 90-Day Growth Arc
            </h2>
            <p className="text-xl text-slate-400">
              Strategy + Execution + Revenue Alignment. You never edit. You never hire. You just grow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            <Card className="p-8 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-500/30">
              <Zap className="w-10 h-10 text-blue-400 mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-3">
                What's Included
              </h3>
              <ul className="space-y-3">
                {[
                  'Founder-led strategy & messaging',
                  'Professional video editing (fully managed)',
                  'Traffic ownership & attribution tracking',
                  'Performance optimization & iteration',
                  'Revenue share alignment (5-10%)'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-emerald-900/30 to-teal-900/30 border-emerald-500/30">
              <Calendar className="w-10 h-10 text-emerald-400 mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-3">
                Investment
              </h3>
              <div className="mb-6">
                <div className="text-4xl font-bold text-white mb-2">
                  £1,500<span className="text-xl text-slate-400">/month</span>
                </div>
                <div className="text-slate-400">
                  + 5-10% revenue share
                </div>
              </div>
              <div className="space-y-3 text-slate-300">
                <p>✓ 90-day minimum commitment (preferred)</p>
                <p>✓ Month-to-month: £2,000/mo</p>
                <p>✓ After 90 days: Optimization mode available</p>
              </div>
            </Card>
          </div>

          <div className="text-center">
            <Button 
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6"
              onClick={() => window.location.href = '#book-call'}
            >
              Book Discovery Call
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Why EarnedReach */}
      <section id="philosophy" className="py-16 md:py-24 bg-slate-900/50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              We're Not an Agency.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                We're Your Growth Partner.
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 bg-slate-800/50 border-slate-700 text-center">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Founder-Led Strategy
              </h3>
              <p className="text-slate-400">
                Not a team of juniors. You work directly with the founder who understands high-value positioning.
              </p>
            </Card>

            <Card className="p-8 bg-slate-800/50 border-slate-700 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Full Execution Included
              </h3>
              <p className="text-slate-400">
                You never edit. You never manage editors. We own the entire production workflow.
              </p>
            </Card>

            <Card className="p-8 bg-slate-800/50 border-slate-700 text-center">
              <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Aligned Incentives
              </h3>
              <p className="text-slate-400">
                Revenue share means we only win when you win. Our success is tied to your growth.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="book-call" className="py-20 md:py-32">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Build a System That Scales?
            </h2>
            <p className="text-xl text-slate-400 mb-10">
              Book a discovery call. We'll review your content, identify gaps, and show you exactly how the 90-day arc works for your brand.
            </p>
            <Button 
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-12 py-6"
              onClick={() => alert('Typeform URL placeholder - update with your actual Typeform link')}
            >
              Book Discovery Call Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-sm text-slate-500 mt-6">
              No pressure. Just a strategic conversation about your growth.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-900/50 py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400" />
              <span className="text-lg font-bold text-white">EarnedReach</span>
            </div>
            <div className="flex items-center gap-8">
              <Link href="/journey">
                <a className="text-slate-400 hover:text-white transition-colors">
                  Client Journey
                </a>
              </Link>
              <a href="#offer" className="text-slate-400 hover:text-white transition-colors">
                Pricing
              </a>
            </div>
            <div className="text-slate-500 text-sm">
              © 2026 EarnedReach. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
