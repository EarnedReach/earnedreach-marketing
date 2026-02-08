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
  Sparkles
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
            <a href="/" className="flex items-center">
              <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663299156531/KEuerFVQvsrsJzda.png" alt="EarnedReach" className="w-10 h-10 hover:opacity-80 transition-opacity" />
            </a>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="text-slate-300 hover:text-white transition-colors">
                How It Works
              </a>
              <a href="#offer" className="text-slate-300 hover:text-white transition-colors">
                Our Offer
              </a>
              <Link href="/philosophy" className="text-slate-300 hover:text-white transition-colors">
                Philosophy
              </Link>
            </div>

            {/* CTA */}
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => window.open('https://form.typeform.com/to/qjB4ZpE9', '_blank')}
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
              10 videos a week. Zero revenue to show for it.
            </p>

            {/* Portal Value Prop */}
            <p className="text-lg md:text-xl text-blue-400 mb-10 leading-relaxed font-medium">
              Track exactly which content drives revenue—from views to closed deals—with real-time analytics built in.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 w-full sm:w-auto"
                onClick={() => window.open('https://form.typeform.com/to/qjB4ZpE9', '_blank')}
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

      {/* The Solution - 90 Day Arc (No Pricing) */}
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

          <div className="max-w-4xl mx-auto mb-12">
            <Card className="p-8 md:p-12 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-500/30">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-10 h-10 text-blue-400" />
                <h3 className="text-2xl md:text-3xl font-semibold text-white">
                  What's Included
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Personalized content strategy playbook delivered in 24 hours',
                  'Full content execution - editing included',
                  'Dedicated analytics portal with real-time ROI tracking',
                  'Weekly performance reports delivered to your inbox',
                  '90-day growth arc framework (Foundation → Acceleration → Scale)',
                  'Revenue-aligned partnership (rev share model)',
                  'Professional cameraman (when needed)',
                  'Direct Slack/communication access',
                  '48-72h turnaround on content'
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="text-center">
            <Button 
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6"
              onClick={() => window.open('https://form.typeform.com/to/qjB4ZpE9', '_blank')}
            >
              Book Discovery Call
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 md:py-24 bg-slate-900/50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              How It Works
            </h2>
            <p className="text-xl text-slate-400">
              A proven system from discovery to scale.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid gap-6">
            <Card className="p-6 md:p-8 bg-slate-800/50 border-slate-700 hover:border-blue-500/30 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-400 font-bold text-lg">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Discovery Call</h3>
                  <p className="text-slate-400">
                    We review your content, identify gaps, and map out a custom 90-day growth strategy tailored to your brand.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 md:p-8 bg-slate-800/50 border-slate-700 hover:border-emerald-500/30 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-emerald-400 font-bold text-lg">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">7-Day Onboarding</h3>
                  <p className="text-slate-400">
                    Kickoff call, workflow setup, and your first professionally edited video delivered within the first week.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 md:p-8 bg-slate-800/50 border-slate-700 hover:border-purple-500/30 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-400 font-bold text-lg">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">90-Day Execution</h3>
                  <p className="text-slate-400">
                    Continuous content production, performance tracking, and data-driven optimization to maximize reach and revenue.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link href="/journey?view=client">
              <Button 
                size="lg"
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white text-lg px-8 py-6"
              >
                Explore the Full Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Portal Features Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30">
              Your Command Center
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Real-Time ROI Tracking Built In
            </h2>
            <p className="text-xl text-slate-400">
              Most agencies leave you guessing. We don't.
            </p>
            <p className="text-lg text-slate-400 mt-4">
              Every client gets a proprietary analytics portal that connects content performance directly to revenue.
            </p>
            <p className="text-lg text-slate-400 mt-4">
              No platform-hopping. No spreadsheets. Just proof.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 mb-12">
            <Card className="p-6 bg-slate-800/50 border-slate-700">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Automated Performance Metrics
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Your YouTube, LinkedIn, and Instagram data syncs daily. See followers, engagement, reach, and views in one dashboard without logging into multiple platforms.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-slate-800/50 border-slate-700">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Traffic Attribution
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Know exactly which videos, posts, and pieces drive visitors to your website. Our Google Analytics integration shows the direct path from content to site traffic.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-slate-800/50 border-slate-700">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Content-to-Conversion Tracking
                  </h3>
                  <p className="text-slate-400 text-sm">
                    See the line from a LinkedIn post to a discovery call booking. UTM parameters connect every piece of content to real business actions.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-slate-800/50 border-slate-700">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Revenue Correlation
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Log discovery calls and client conversions, then correlate them with the content that generated them. Confidently say "My content generated $X in revenue this quarter."
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-slate-800/50 border-slate-700">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    90-Day Growth Arc Visibility
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Track your progress through Foundation (Days 1-30), Acceleration (Days 31-60), and Scale (Days 61-90) phases with phase-specific insights.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-slate-800/50 border-slate-700">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Weekly Performance Reports
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Automated insights delivered to your inbox every week. Stay informed without logging in.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <Card className="p-8 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-500/30">
              <h3 className="text-2xl font-bold text-white mb-4">
                Why This Matters
              </h3>
              <p className="text-lg text-slate-300 leading-relaxed">
                This isn't just a dashboard - it's <span className="text-blue-400 font-semibold">proof</span>. Proof that your content investment is working. Proof that justifies your time and budget. Proof that helps you optimize what's driving results and cut what isn't.
              </p>
              <p className="text-xl text-blue-400 font-semibold mt-6">
                You'll never wonder "Is this working?" again. You'll know.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-950/30 to-slate-900">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-1.5">
              Founder-Led
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
              Built by a Videographer Who Saw the Pattern
            </h2>
            <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
              <p>
                I started as a videographer and editor, working directly with 5 and 6-figure entrepreneurs. 
                I loved the craft—capturing their vision, editing their stories, helping them look professional.
              </p>
              <p>
                But I kept seeing the same bottleneck: <span className="text-white font-semibold">brilliant founders drowning in content ideation, 
                with zero time to focus on what actually grew their business</span>.
              </p>
              <p>
                They'd hire editors, but that only solved half the problem. They still needed strategy. 
                They still needed someone to own the traffic. They still needed a system that converted views into revenue.
              </p>
              <p className="text-xl text-blue-400 font-semibold">
                So I built EarnedReach—not as an agency, but as the full-stack growth partner I wish they'd had from day one.
              </p>
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
              <h3 className="text-xl font-semibold text-white mb-3">
                Founder-Led Strategy
              </h3>
              <p className="text-slate-400">
                Not a team of juniors. You work directly with the founder who understands high-value positioning.
              </p>
            </Card>

            <Card className="p-8 bg-slate-800/50 border-slate-700 text-center hover:border-emerald-500/30 transition-all">
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

            <Card className="p-8 bg-slate-800/50 border-slate-700 text-center hover:border-cyan-500/30 transition-all">
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

      {/* What Makes Us Different */}
      <section className="py-16 md:py-24 bg-slate-900/50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              What Makes Us Different
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 bg-slate-800/50 border-slate-700">
              <div className="flex items-start gap-4">
                <Shield className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Systems Over Heroics
                  </h3>
                  <p className="text-slate-400">
                    We build repeatable, scalable systems—not one-off viral hits. Compounding growth beats temporary spikes.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-slate-800/50 border-slate-700">
              <div className="flex items-start gap-4">
                <BarChart3 className="w-8 h-8 text-emerald-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Data-Driven Decisions
                  </h3>
                  <p className="text-slate-400">
                    Every strategy adjustment is backed by performance data. We optimize for measurable outcomes, not guesswork.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-slate-800/50 border-slate-700">
              <div className="flex items-start gap-4">
                <Clock className="w-8 h-8 text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Founder Time is Sacred
                  </h3>
                  <p className="text-slate-400">
                    You focus on building your business. We handle strategy, execution, and optimization—no micromanagement needed.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-slate-800/50 border-slate-700">
              <div className="flex items-start gap-4">
                <Sparkles className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Outcomes Over Output
                  </h3>
                  <p className="text-slate-400">
                    We don't sell videos. We sell clarity, leverage, and measurable progress toward revenue goals.
                  </p>
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
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
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
            <a href="/" className="flex items-center">
              <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663299156531/KEuerFVQvsrsJzda.png" alt="EarnedReach" className="w-8 h-8 hover:opacity-80 transition-opacity" />
            </a>
            <div className="flex items-center gap-8">
              <Link href="/journey" className="text-slate-400 hover:text-white transition-colors">
                Client Journey
              </Link>
              <Link href="/philosophy" className="text-slate-400 hover:text-white transition-colors">
                Philosophy
              </Link>
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
