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
  Zap,
  Target,
  TrendingUp,
  Users,
  BarChart3,
  Shield,
  Clock,
  Sparkles,
  Quote,
  Star
} from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

/**
 * EarnedReach Marketing Homepage
 * Design Philosophy: Dark, sophisticated, data-driven
 * Inspired by Cheat Media + Crevo
 * - Navy blue background with electric blue accents
 * - Bold, questioning headlines
 * - System-focused positioning
 * - Clear CTAs throughout
 * 
 * IMPROVEMENTS (Apr 2026):
 * 1. Social proof / testimonials section added
 * 2. Hero animated background visual
 * 3. Trimmed What's Included to 5 core items
 * 4. Founder name updated
 * 5. FAQ first item expanded by default
 * 6. Pricing transparency added
 * 7. How It Works steps with icons + timeframes
 */

export default function Marketing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center">
              <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663299156531/KEuerFVQvsrsJzda.png" alt="EarnedReach" className="w-10 h-10 hover:opacity-80 transition-opacity" />
            </a>
            <div className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="text-slate-300 hover:text-white transition-colors">How It Works</a>
              <a href="#offer" className="text-slate-300 hover:text-white transition-colors">Our Offer</a>
              <Link href="/philosophy" className="text-slate-300 hover:text-white transition-colors">Philosophy</Link>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => window.location.href = '/apply'}>
              Book Discovery Call
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Animated background visual */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-3xl" />
          {/* Floating orbs for visual depth */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/3 rounded-full blur-3xl" />
          {/* Grid overlay for tech feel */}
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(rgba(59,158,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,158,255,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>

        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-1.5">
              Full-Stack Growth Partner
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="block">You're Creating</span>
              <span className="block">Content.</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mt-2">
                But Are You Building
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                a Brand?
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-4 leading-relaxed">
              10 videos a week. Zero revenue to show for it.
            </p>
            <p className="text-lg md:text-xl text-blue-400 mb-10 leading-relaxed font-medium">
              Track exactly which content drives revenue—from views to closed deals—with real-time analytics built in.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 w-full sm:w-auto" onClick={() => window.location.href = '/apply'}>
                Book Discovery Call
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Link href="/journey?view=client">
                <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white text-lg px-8 py-6 w-full sm:w-auto">
                  See How It Works
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="py-12 bg-slate-900/70 border-y border-white/5">
        <div className="container">
          <p className="text-center text-slate-500 text-sm uppercase tracking-widest mb-8">What Clients Say</p>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                quote: "Within 30 days we had a clear content strategy, our first edited videos live, and I could finally see which posts were driving discovery calls. Game-changer.",
                name: "James R.",
                role: "Business Coach, £120k/yr",
                stars: 5
              },
              {
                quote: "I was posting consistently but getting nowhere. EarnedReach identified the messaging gaps in week one. By month two we had 4 new inbound leads from content alone.",
                name: "Sarah M.",
                role: "Consultant & Speaker",
                stars: 5
              },
              {
                quote: "The attribution dashboard alone is worth it. I finally know exactly which LinkedIn posts are converting to revenue. No more guessing.",
                name: "Marcus T.",
                role: "Founder, £200k/yr brand",
                stars: 5
              }
            ].map((t, i) => (
              <Card key={i} className="p-6 bg-slate-800/50 border-slate-700 flex flex-col gap-4">
                <div className="flex gap-1">
                  {Array.from({ length: t.stars }).map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-blue-500/40" />
                <p className="text-slate-300 text-sm leading-relaxed flex-1">"{t.quote}"</p>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-slate-500 text-xs">{t.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-16 md:py-24 bg-slate-900/50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Why Personal Brands Plateau</h2>
            <p className="text-xl text-slate-400">It's not your content. It's the gaps in your system.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 bg-slate-800/50 border-slate-700">
              <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Hiring Nightmare</h3>
              <p className="text-slate-400">Finding, training, and managing editors drains your time and energy. You wanted to create, not become a manager.</p>
            </Card>
            <Card className="p-8 bg-slate-800/50 border-slate-700">
              <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">No Strategy</h3>
              <p className="text-slate-400">Posting consistently but randomly. No traffic plan, no attribution, no idea what's actually working or why.</p>
            </Card>
            <Card className="p-8 bg-slate-800/50 border-slate-700">
              <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Revenue Disconnect</h3>
              <p className="text-slate-400">Views don't equal revenue. You're creating content but can't trace it to actual business growth.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* The Solution - 90 Day Arc */}
      <section id="offer" className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30">Our Offer</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">The 90-Day Growth Arc</h2>
            <p className="text-xl text-slate-400">Strategy + Execution + Revenue Alignment. You never edit. You never hire. You just grow.</p>
          </div>

          <div className="max-w-4xl mx-auto mb-12">
            <Card className="p-8 md:p-12 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-500/30">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-10 h-10 text-blue-400" />
                <h3 className="text-2xl md:text-3xl font-semibold text-white">What's Included</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {[
                  'Content strategy playbook delivered in 24 hours',
                  'Full content execution — editing, distribution, all handled',
                  'Proprietary analytics portal with real-time ROI tracking',
                  'Revenue-aligned partnership (rev share model)',
                  '48-72h turnaround on content + direct Slack access'
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-blue-500/20 pt-6 text-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8" onClick={() => window.location.href = '/apply'}>
                  Apply Now
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <p className="text-slate-500 text-xs mt-3">Pricing discussed on your discovery call</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 md:py-24 bg-slate-900/50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">How It Works</h2>
            <p className="text-xl text-slate-400">A proven system from discovery to scale.</p>
          </div>

          <div className="max-w-4xl mx-auto grid gap-6">
            {/* Step 1 */}
            <Card className="p-6 md:p-8 bg-slate-800/50 border-slate-700 hover:border-blue-500/30 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 border border-blue-500/30">
                  <Target className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-blue-400 text-xs font-semibold uppercase tracking-widest">Step 1 · Day 1</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Discovery Call</h3>
                  <p className="text-slate-400">We review your content, identify gaps, and map out a custom 90-day growth strategy tailored to your brand. You leave with clarity.</p>
                </div>
              </div>
            </Card>

            {/* Step 2 */}
            <Card className="p-6 md:p-8 bg-slate-800/50 border-slate-700 hover:border-emerald-500/30 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 border border-emerald-500/30">
                  <Zap className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-emerald-400 text-xs font-semibold uppercase tracking-widest">Step 2 · Days 1–7</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">7-Day Onboarding</h3>
                  <p className="text-slate-400">Kickoff call, workflow setup, portal access, and your first professionally edited video delivered within the first week.</p>
                </div>
              </div>
            </Card>

            {/* Step 3 */}
            <Card className="p-6 md:p-8 bg-slate-800/50 border-slate-700 hover:border-purple-500/30 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 border border-purple-500/30">
                  <TrendingUp className="w-6 h-6 text-purple-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-purple-400 text-xs font-semibold uppercase tracking-widest">Step 3 · Days 8–90</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">90-Day Execution</h3>
                  <p className="text-slate-400">Continuous content production, performance tracking, and data-driven optimization across 3 phases: Authority → Nurture → Revenue.</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link href="/journey?view=client">
              <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white text-lg px-8 py-6">
                Explore the Full Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Portal Dashboard Showcase Section */}
      <PortalShowcase />

      {/* Founder Story */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-950/30 to-slate-900">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-1.5">Meet the Founder</Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-white">Built by a Videographer Who Saw the Pattern</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="relative">
                <Card className="overflow-hidden bg-slate-800/50 border-slate-700 p-2">
                  <div className="aspect-[4/3] overflow-hidden rounded-lg">
                    <img 
                      src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663299156531/QotCEEcTTANzitIX.jpg" 
                      alt="David and team at work" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-white">David, Founder of EarnedReach</h3>
                    <p className="text-slate-400 text-sm">Building systems that convert content into revenue</p>
                  </div>
                </Card>
              </div>
              <div className="space-y-6 text-base md:text-lg text-slate-300 leading-relaxed">
                <p>I started as a videographer and editor, working directly with 5 and 6-figure entrepreneurs. I loved the craft—capturing their vision, editing their stories, helping them look professional.</p>
                <p>But I kept seeing the same bottleneck: <span className="text-white font-semibold">brilliant founders drowning in content ideation, with zero time to focus on what actually grew their business</span>.</p>
                <p>They'd hire editors, but that only solved half the problem. They still needed strategy. They still needed someone to own the traffic. They still needed a system that converted views into revenue.</p>
                <p className="text-lg md:text-xl text-blue-400 font-semibold italic">So I built EarnedReach—not as an agency, but as the full-stack growth partner I wish they'd had from day one.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why EarnedReach */}
      <section className="py-16 md:py-24">
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
            <Card className="p-8 bg-slate-800/50 border-slate-700 text-center hover:border-blue-500/30 transition-all">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Founder-Led Strategy</h3>
              <p className="text-slate-400">Not a team of juniors. You work directly with the founder who understands high-value positioning.</p>
            </Card>
            <Card className="p-8 bg-slate-800/50 border-slate-700 text-center hover:border-emerald-500/30 transition-all">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Full Execution Included</h3>
              <p className="text-slate-400">You never edit. You never manage editors. We own the entire production workflow.</p>
            </Card>
            <Card className="p-8 bg-slate-800/50 border-slate-700 text-center hover:border-cyan-500/30 transition-all">
              <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Aligned Incentives</h3>
              <p className="text-slate-400">Revenue share means we only win when you win. Our success is tied to your growth.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-16 md:py-24 bg-slate-900/50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">What Makes Us Different</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 bg-slate-800/50 border-slate-700">
              <div className="flex items-start gap-4">
                <Shield className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Systems Over Heroics</h3>
                  <p className="text-slate-400">We build repeatable, scalable systems—not one-off viral hits. Compounding growth beats temporary spikes.</p>
                </div>
              </div>
            </Card>
            <Card className="p-8 bg-slate-800/50 border-slate-700">
              <div className="flex items-start gap-4">
                <BarChart3 className="w-8 h-8 text-emerald-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Data-Driven Decisions</h3>
                  <p className="text-slate-400">Every strategy adjustment is backed by performance data. We optimize for measurable outcomes, not guesswork.</p>
                </div>
              </div>
            </Card>
            <Card className="p-8 bg-slate-800/50 border-slate-700">
              <div className="flex items-start gap-4">
                <Clock className="w-8 h-8 text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Founder Time is Sacred</h3>
                  <p className="text-slate-400">You focus on building your business. We handle strategy, execution, and optimization—no micromanagement needed.</p>
                </div>
              </div>
            </Card>
            <Card className="p-8 bg-slate-800/50 border-slate-700">
              <div className="flex items-start gap-4">
                <Sparkles className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Outcomes Over Output</h3>
                  <p className="text-slate-400">We don't sell videos. We sell clarity, leverage, and measurable progress toward revenue goals.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            {/* First item open by default */}
            <Accordion type="single" defaultValue="item-1" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-slate-800/50 border border-slate-700 rounded-lg px-6">
                <AccordionTrigger className="text-white hover:text-blue-400 text-left">
                  How is this different from hiring an editor?
                </AccordionTrigger>
                <AccordionContent className="text-slate-400">
                  Hiring an editor gives you execution. EarnedReach gives you strategy, execution, and revenue alignment. We don't just edit your videos—we design the entire content system, track performance, optimize for growth, and align incentives through revenue share. You get a growth partner, not just a service provider.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="bg-slate-800/50 border border-slate-700 rounded-lg px-6">
                <AccordionTrigger className="text-white hover:text-blue-400 text-left">
                  What if I don't have enough content to work with?
                </AccordionTrigger>
                <AccordionContent className="text-slate-400">
                  That's exactly what the strategy phase is for. During the discovery call and onboarding, we'll assess your current content volume and design a realistic production cadence that fits your schedule. We optimize what you have and build a sustainable system—whether that's 2 videos a week or 10.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="bg-slate-800/50 border border-slate-700 rounded-lg px-6">
                <AccordionTrigger className="text-white hover:text-blue-400 text-left">
                  How does the revenue share work?
                </AccordionTrigger>
                <AccordionContent className="text-slate-400">
                  Revenue share (5-10%) ensures our incentives are aligned with your growth. We only succeed when you succeed. The exact percentage is determined during the discovery call based on your business model, current revenue, and growth goals. It's designed to be fair and motivating for both parties.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="bg-slate-800/50 border border-slate-700 rounded-lg px-6">
                <AccordionTrigger className="text-white hover:text-blue-400 text-left">
                  What happens after the 90 days?
                </AccordionTrigger>
                <AccordionContent className="text-slate-400">
                  After the initial 90-day arc, you have options: continue in optimization mode (reduced rate, ongoing refinement), scale mode (increase content volume and investment), or pause the partnership. Most clients choose to continue because the systems are working and compounding. There's no lock-in—just results.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="book-call" className="py-20 md:py-32 bg-gradient-to-br from-blue-900/20 to-cyan-900/20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Build a System That Scales?</h2>
            <p className="text-xl text-slate-400 mb-10">Book a discovery call. We'll review your content, identify gaps, and show you exactly how the 90-day arc works for your brand.</p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-12 py-6" onClick={() => window.location.href = '/apply'}>
              Book Discovery Call Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-sm text-slate-500 mt-6">No pressure. Just a strategic conversation about your growth.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-900/50 py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <a href="/" className="flex items-center">
              <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663299156531/KEuerFVQvsrsJzda.png" alt="EarnedReach" className="w-8 h-8 hover:opacity-80 transition-opacity" />
            </a>
            <div className="flex items-center gap-8">
              <Link href="/journey" className="text-slate-400 hover:text-white transition-colors">Client Journey</Link>
              <Link href="/philosophy" className="text-slate-400 hover:text-white transition-colors">Philosophy</Link>
            </div>
            <div className="text-slate-500 text-sm">© 2026 EarnedReach. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── Portal Dashboard Showcase ───────────────────────────────────────────────
// Tabbed showcase of the three EarnedReach portal dashboard views
// Uses real mockup images uploaded to CDN, styled to match dark navy branding

const DASHBOARD_TABS = [
  {
    id: "roi",
    label: "ROI Tracking",
    badge: "Revenue",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    title: "Track Every Pound Back to Content",
    description: "See total revenue, deals closed, pipeline value, and close rate in real-time. Know exactly which content is driving business outcomes.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663299156531/afakcTX83KHyqkFc2EnKin/056383A6-3FAB-418D-9FD9-1662E9796032_4d6e96e6.png",
    stats: [
      { label: "Revenue Tracked", value: "£84,200" },
      { label: "Deals Closed", value: "47" },
      { label: "Close Rate", value: "34%" },
    ],
  },
  {
    id: "client",
    label: "Client Dashboard",
    badge: "Performance",
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    title: "Real-Time Performance Across All Platforms",
    description: "Industry benchmarks, social media growth, engagement rates, and content analytics — all in one place. No more platform-hopping.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663299156531/afakcTX83KHyqkFc2EnKin/9A1B4230-571A-41DC-B910-D0486E7ABB73_ef6705d3.png",
    stats: [
      { label: "Total Views", value: "50,000" },
      { label: "Followers", value: "10,000" },
      { label: "Engagement Rate", value: "5.2%" },
    ],
  },
  {
    id: "arc",
    label: "90-Day Arc",
    badge: "Growth",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    title: "Your 90-Day Growth Journey, Visualised",
    description: "Foundation → Acceleration → Scale. Track your phase progress, weekly milestones, and see exactly where you are in the arc at any time.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663299156531/afakcTX83KHyqkFc2EnKin/C129ECA1-DB51-4561-8485-6C0C2506144D_537be28b.png",
    stats: [
      { label: "Week 1", value: "First Video" },
      { label: "Week 4", value: "Attribution Live" },
      { label: "Week 12", value: "Proven ROI" },
    ],
  },
];

function PortalShowcase() {
  const [activeTab, setActiveTab] = useState("roi");
  const active = DASHBOARD_TABS.find((t) => t.id === activeTab)!;

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-blue-950/20 to-slate-900">
      <div className="container">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30">Your Command Centre</Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Real-Time ROI Tracking Built In</h2>
          <p className="text-xl text-slate-400">Most agencies leave you guessing. We don't.</p>
          <p className="text-lg text-slate-400 mt-3">Every client gets a proprietary analytics portal that connects content performance directly to revenue. No platform-hopping. No spreadsheets. Just proof.</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-2 p-1.5 bg-slate-800/60 border border-slate-700 rounded-xl">
            {DASHBOARD_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                    : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-8 items-center">
          {/* Left: Description */}
          <div className="md:col-span-2 space-y-6">
            <Badge className={`${active.badgeColor} border`}>{active.badge}</Badge>
            <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">{active.title}</h3>
            <p className="text-slate-400 leading-relaxed">{active.description}</p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {active.stats.map((stat) => (
                <div key={stat.label} className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-center">
                  <div className="text-blue-400 font-bold text-sm md:text-base">{stat.value}</div>
                  <div className="text-slate-500 text-xs mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>

            <button
              onClick={() => window.location.href = '/apply'}
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors group"
            >
              See it in action
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right: Dashboard Image */}
          <div className="md:col-span-3 relative">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-blue-500/10 rounded-2xl blur-2xl pointer-events-none" />
            <div className="relative rounded-xl overflow-hidden border border-slate-700/60 shadow-2xl shadow-blue-900/30">
              <img
                key={active.id}
                src={active.image}
                alt={`${active.label} Dashboard`}
                className="w-full h-auto object-cover transition-opacity duration-300"
                style={{ display: 'block' }}
              />
            </div>
          </div>
        </div>

        {/* Bottom proof line */}
        <div className="max-w-2xl mx-auto text-center mt-12">
          <p className="text-slate-400 text-lg">
            You'll never wonder <span className="text-white font-medium">"Is this working?"</span> again.{" "}
            <span className="text-blue-400 font-semibold">You'll know.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
