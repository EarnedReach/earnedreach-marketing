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
  Star,
  Eye,
  MousePointer,
  Activity,
  Menu,
  X,
} from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

/**
 * EarnedReach Marketing Homepage
 * Design: Swiss Modernism — dark navy, electric blue/cyan
 * Revisions (Apr 2026):
 * - Mobile hamburger nav
 * - Mobile-optimised dashboard panels (simplified cards on small screens)
 * - Merged "Not an Agency" + "What Makes Us Different" into one section
 * - Copy trimmed ~30%
 */

// ─── Native Dashboard: ROI Tracking ─────────────────────────────────────────
function ROIDashboard() {
  const months = ["J","F","M","A","M","J","J","A","S","O","N","D"];
  const values = [8, 12, 15, 18, 22, 28, 35, 42, 52, 63, 74, 84];
  const maxVal = 100;

  return (
    <div className="bg-[#0f1929] rounded-xl border border-slate-700/60 overflow-hidden shadow-2xl shadow-blue-900/30">
      {/* Window chrome — hidden on mobile */}
      <div className="hidden sm:flex items-center gap-2 px-4 py-3 bg-slate-800/60 border-b border-slate-700/50">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-green-500/70" />
        <div className="flex-1 mx-4">
          <div className="bg-slate-700/50 rounded text-xs text-slate-400 px-3 py-1 text-center max-w-[200px] mx-auto">
            portal.earnedreach.org
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* KPI Row — 2 cols on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { label: "Total Revenue", value: "£84,200", sub: "↑ 23% this month", subColor: "text-emerald-400", highlight: true },
            { label: "Deals Closed", value: "47", sub: "94 this quarter", subColor: "text-slate-400" },
            { label: "Pipeline Value", value: "£241K", sub: "New leads", subColor: "text-slate-400" },
            { label: "Close Rate", value: "34%", sub: "Above target", subColor: "text-emerald-400" },
          ].map((kpi) => (
            <div
              key={kpi.label}
              className={`rounded-lg p-3 border ${kpi.highlight ? "bg-blue-600/15 border-blue-500/40" : "bg-slate-800/60 border-slate-700/50"}`}
            >
              <p className="text-slate-400 text-[9px] uppercase tracking-wider mb-1">{kpi.label}</p>
              <p className={`text-base font-bold ${kpi.highlight ? "text-blue-300" : "text-white"}`}>{kpi.value}</p>
              <p className={`text-[9px] mt-0.5 ${kpi.subColor}`}>{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Chart — full width, simplified on mobile */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
          <p className="text-white text-xs font-semibold mb-3">Revenue Over Time</p>
          <div className="relative h-24">
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[8px] text-slate-500 pr-2">
              {["£100k","£75k","£50k","£25k","£10k"].map(l => <span key={l}>{l}</span>)}
            </div>
            <div className="ml-7 h-full relative">
              <svg viewBox="0 0 300 80" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="areaGrad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02" />
                  </linearGradient>
                </defs>
                <path
                  d={`M0,${80-(values[0]/maxVal)*80} ${values.map((v,i) => `L${(i/(values.length-1))*300},${80-(v/maxVal)*80}`).join(' ')} L300,80 L0,80 Z`}
                  fill="url(#areaGrad2)"
                />
                <polyline
                  points={values.map((v,i) => `${(i/(values.length-1))*300},${80-(v/maxVal)*80}`).join(' ')}
                  fill="none" stroke="#3b9eff" strokeWidth="2" strokeLinejoin="round"
                />
                <circle cx="300" cy={80-(values[11]/maxVal)*80} r="3" fill="#3b9eff" />
              </svg>
              <div className="absolute right-0 top-0 text-[9px] text-blue-300 font-semibold">£84,200</div>
            </div>
          </div>
          <div className="ml-7 flex justify-between mt-1">
            {months.map(m => <span key={m} className="text-[8px] text-slate-500">{m}</span>)}
          </div>
        </div>

        {/* Pipeline + Activity — stacked on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          <div className="sm:col-span-2 bg-slate-800/50 border border-slate-700/50 rounded-lg p-3">
            <p className="text-white text-xs font-semibold mb-2">Pipeline Stages</p>
            <div className="space-y-1.5">
              {[
                { stage: "New Leads", count: 89, color: "bg-blue-500" },
                { stage: "Contacted", count: 64, color: "bg-blue-400" },
                { stage: "Proposal", count: 31, color: "bg-cyan-500" },
                { stage: "Closed Won", count: 12, color: "bg-emerald-500" },
              ].map((row) => (
                <div key={row.stage} className="flex items-center gap-2">
                  <span className="text-[9px] text-slate-400 w-16 shrink-0">{row.stage}</span>
                  <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div className={`h-full ${row.color} rounded-full`} style={{ width: `${(row.count/89)*100}%` }} />
                  </div>
                  <span className="text-[9px] text-slate-300 w-5 text-right">{row.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="sm:col-span-3 bg-slate-800/50 border border-slate-700/50 rounded-lg p-3">
            <p className="text-white text-xs font-semibold mb-2">Recent Activity</p>
            <div className="space-y-2">
              {[
                { name: "James Wilson", status: "Closed Won", statusColor: "text-emerald-400", value: "£4,800" },
                { name: "Sarah Ahmed", status: "Negotiation", statusColor: "text-yellow-400", value: "£14,200" },
                { name: "Michael Roberts", status: "Proposal Sent", statusColor: "text-blue-400", value: "£7,400" },
              ].map((row) => (
                <div key={row.name} className="flex items-center gap-2 text-[10px]">
                  <span className="text-slate-300 flex-1 truncate">{row.name}</span>
                  <span className={`font-medium shrink-0 ${row.statusColor}`}>{row.status}</span>
                  <span className="text-slate-300 font-semibold shrink-0">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Native Dashboard: Client Performance ───────────────────────────────────
function ClientDashboard() {
  return (
    <div className="bg-[#0f1929] rounded-xl border border-slate-700/60 overflow-hidden shadow-2xl shadow-blue-900/30">
      <div className="hidden sm:flex items-center gap-2 px-4 py-3 bg-slate-800/60 border-b border-slate-700/50">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-green-500/70" />
        <div className="flex-1 mx-4">
          <div className="bg-slate-700/50 rounded text-xs text-slate-400 px-3 py-1 text-center max-w-[200px] mx-auto">
            portal.earnedreach.org
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* KPI row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { icon: Eye, label: "Total Views", value: "50,000", sub: "All platforms", color: "text-blue-400" },
            { icon: Users, label: "Followers", value: "10,000", sub: "Latest snapshot", color: "text-cyan-400", highlight: true },
            { icon: Activity, label: "Engagement", value: "5.20%", sub: "All content", color: "text-purple-400" },
            { icon: MousePointer, label: "Web Clicks", value: "1,240", sub: "From social", color: "text-emerald-400" },
          ].map((kpi) => (
            <div key={kpi.label} className={`rounded-lg p-3 border ${kpi.highlight ? "bg-cyan-600/10 border-cyan-500/30" : "bg-slate-800/60 border-slate-700/50"}`}>
              <div className="flex items-center justify-between mb-1">
                <p className="text-slate-400 text-[9px] uppercase tracking-wider">{kpi.label}</p>
                <kpi.icon className={`w-3 h-3 ${kpi.color}`} />
              </div>
              <p className="text-base font-bold text-white">{kpi.value}</p>
              <p className={`text-[9px] mt-0.5 ${kpi.highlight ? "text-cyan-400" : "text-slate-500"}`}>{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Benchmarks */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-white text-xs font-semibold">Industry Benchmarks</p>
              <p className="text-slate-500 text-[9px]">vs. Technology industry averages</p>
            </div>
            <div className="bg-blue-600/20 border border-blue-500/30 text-blue-300 text-[9px] px-2 py-0.5 rounded">Technology</div>
          </div>
          <div className="space-y-3">
            {[
              { label: "YouTube Follower Growth", yours: 11.5, industry: 3.0, delta: "+8.5%" },
              { label: "Engagement Rate", yours: 4.4, industry: 1.0, delta: "+3.4%" },
              { label: "Avg Views Per Post", yours: 163091, industry: 23500, delta: "+248%" },
            ].map((m) => (
              <div key={m.label}>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-300 text-[10px]">{m.label}</span>
                  <span className="text-[10px] font-semibold text-emerald-400">{m.delta}</span>
                </div>
                <div className="relative h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div className="absolute h-full bg-slate-500/40 rounded-full" style={{ width: `${(m.industry / (m.yours + m.industry * 0.3)) * 100}%` }} />
                  <div className="absolute h-full bg-blue-500 rounded-full" style={{ width: `${Math.min((m.yours / (m.yours + m.industry * 0.3)) * 100, 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top content */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-3">
          <p className="text-white text-xs font-semibold mb-2">Top Performing Content</p>
          <div className="space-y-2">
            {[
              { title: "How I scaled to £100K without paid ads", views: "24.3K", engagement: "8.2%" },
              { title: "The 3 content mistakes killing your brand", views: "18.7K", engagement: "6.9%" },
            ].map((post, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded bg-blue-600/20 border border-blue-500/20 flex items-center justify-center shrink-0">
                  <span className="text-blue-400 text-[10px] font-bold">{i+1}</span>
                </div>
                <p className="text-slate-300 text-[10px] flex-1 truncate">{post.title}</p>
                <div className="text-right shrink-0">
                  <p className="text-slate-300 text-[10px] font-semibold">{post.views}</p>
                  <p className="text-emerald-400 text-[9px]">{post.engagement}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Native Dashboard: 90-Day Growth Arc ────────────────────────────────────
function ArcDashboard() {
  const progress = 77;

  return (
    <div className="bg-[#0f1929] rounded-xl border border-slate-700/60 overflow-hidden shadow-2xl shadow-blue-900/30">
      <div className="hidden sm:flex items-center gap-2 px-4 py-3 bg-slate-800/60 border-b border-slate-700/50">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-green-500/70" />
        <div className="flex-1 mx-4">
          <div className="bg-slate-700/50 rounded text-xs text-slate-400 px-3 py-1 text-center max-w-[200px] mx-auto">
            portal.earnedreach.org
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Progress card */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="text-white text-sm font-semibold">Client Dashboard</p>
                <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[9px] px-2 py-0.5 rounded-full">Acceleration Phase</span>
              </div>
              <p className="text-slate-500 text-[10px]">Technology · Started 1 December 2025</p>
            </div>
          </div>
          <div className="bg-slate-700/50 border border-slate-600/30 rounded-lg p-3">
            <div className="flex justify-between items-center mb-1">
              <p className="text-white text-[10px] font-semibold">90-Day Growth Journey</p>
              <span className="text-blue-300 text-[10px] font-semibold">{progress}% Complete</span>
            </div>
            <p className="text-slate-500 text-[9px] mb-2">Day 69 of 90</p>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        {/* Phase cards */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { phase: "Foundation", days: "Days 1–30", done: true },
            { phase: "Acceleration", days: "Days 31–60", active: true },
            { phase: "Scale", days: "Days 61–90", upcoming: true },
          ].map((p) => (
            <div
              key={p.phase}
              className={`rounded-lg p-3 border text-center ${
                p.active ? "bg-blue-600/15 border-blue-500/40"
                : p.done ? "bg-emerald-500/10 border-emerald-500/20"
                : "bg-slate-800/40 border-slate-700/40"
              }`}
            >
              <p className={`text-xs font-semibold mb-1 ${p.active ? "text-blue-300" : p.done ? "text-emerald-300" : "text-slate-400"}`}>{p.phase}</p>
              <p className="text-[9px] text-slate-400">{p.days}</p>
              {p.done && <p className="text-emerald-400 text-[9px] mt-1">✓ Done</p>}
              {p.active && <p className="text-blue-400 text-[9px] mt-1">● Active</p>}
            </div>
          ))}
        </div>

        {/* Milestone grid */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { week: "Week 1", milestone: "First video delivered", icon: "▶", done: true },
            { week: "Week 4", milestone: "Traffic attribution live", icon: "↗", done: true },
            { week: "Week 8", milestone: "Revenue tracking active", icon: "£", done: true },
            { week: "Week 12", milestone: "Proven ROI system", icon: "✓", current: true },
          ].map((m) => (
            <div
              key={m.week}
              className={`flex items-center gap-2 rounded-lg p-2.5 border ${
                m.current ? "bg-blue-600/10 border-blue-500/30"
                : m.done ? "bg-slate-800/40 border-slate-700/40"
                : "bg-slate-800/20 border-slate-700/20"
              }`}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs shrink-0 ${
                m.current ? "bg-blue-600/30 text-blue-300" : m.done ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-700/50 text-slate-500"
              }`}>
                {m.icon}
              </div>
              <div>
                <p className={`text-[10px] font-semibold ${m.current ? "text-blue-300" : m.done ? "text-white" : "text-slate-500"}`}>{m.week}</p>
                <p className="text-[9px] text-slate-400 leading-tight">{m.milestone}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Portal Showcase ─────────────────────────────────────────────────────────
const DASHBOARD_TABS = [
  {
    id: "roi",
    label: "ROI Tracking",
    badge: "Revenue",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    title: "Track Every Pound Back to Content",
    description: "See revenue, deals closed, pipeline value, and close rate in real-time. Know exactly which content is driving business outcomes.",
    component: <ROIDashboard />,
    stats: [
      { label: "Revenue", value: "£84,200" },
      { label: "Deals Closed", value: "47" },
      { label: "Close Rate", value: "34%" },
    ],
  },
  {
    id: "client",
    label: "Performance",
    badge: "Analytics",
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    title: "Real-Time Performance Across All Platforms",
    description: "Industry benchmarks, growth trends, and content analytics — all in one place. No more platform-hopping.",
    component: <ClientDashboard />,
    stats: [
      { label: "Total Views", value: "50,000" },
      { label: "Followers", value: "10,000" },
      { label: "Engagement", value: "5.2%" },
    ],
  },
  {
    id: "arc",
    label: "90-Day Arc",
    badge: "Progress",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    title: "Your 90-Day Growth Journey, Visualised",
    description: "Foundation → Acceleration → Scale. Track your phase progress and weekly milestones in real time.",
    component: <ArcDashboard />,
    stats: [
      { label: "Week 1", value: "First Video" },
      { label: "Week 4", value: "Attribution" },
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
        <div className="max-w-3xl mx-auto text-center mb-10">
          <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30">Your Command Centre</Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Real-Time ROI Tracking Built In</h2>
          <p className="text-lg text-slate-400">Every client gets a proprietary analytics portal connecting content directly to revenue. No spreadsheets. Just proof.</p>
        </div>

        {/* Tab switcher — horizontally scrollable on mobile */}
        <div className="flex justify-center mb-8 overflow-x-auto pb-1">
          <div className="flex gap-2 p-1.5 bg-slate-800/60 border border-slate-700 rounded-xl shrink-0">
            {DASHBOARD_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
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

        {/* Content — stacked on mobile, side-by-side on md+ */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-8 items-start">
          {/* Description — shown above dashboard on mobile */}
          <div className="md:col-span-2 space-y-5 md:pt-4">
            <Badge className={`${active.badgeColor} border`}>{active.badge}</Badge>
            <h3 className="text-2xl font-bold text-white leading-tight">{active.title}</h3>
            <p className="text-slate-400 leading-relaxed">{active.description}</p>
            <div className="grid grid-cols-3 gap-2">
              {active.stats.map((stat) => (
                <div key={stat.label} className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-center">
                  <div className="text-blue-400 font-bold text-sm">{stat.value}</div>
                  <div className="text-slate-500 text-xs mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
            <button
              onClick={() => window.location.href = '/apply'}
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors group"
            >
              Get access on your discovery call
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Dashboard UI */}
          <div className="md:col-span-3 relative">
            <div className="absolute -inset-4 bg-blue-500/8 rounded-2xl blur-2xl pointer-events-none" />
            <div className="relative">{active.component}</div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto text-center mt-10">
          <p className="text-slate-400 text-lg">
            You'll never wonder <span className="text-white font-medium">"Is this working?"</span> again.{" "}
            <span className="text-blue-400 font-semibold">You'll know.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Main Marketing Page ─────────────────────────────────────────────────────
export default function Marketing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663299156531/afakcTX83KHyqkFc2EnKin/earnedreach-logo_3d80f824.png"
                alt="EarnedReach"
                className="w-11 h-11"
              />
              <span className="text-white font-bold text-xl tracking-tight">EarnedReach</span>
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="text-slate-300 hover:text-white transition-colors">How It Works</a>
              <a href="#offer" className="text-slate-300 hover:text-white transition-colors">Our Offer</a>
              <Link href="/philosophy" className="text-slate-300 hover:text-white transition-colors">Philosophy</Link>
            </div>

            <div className="flex items-center gap-3">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white hidden md:flex"
                onClick={() => window.location.href = '/apply'}
              >
                Book Discovery Call
              </Button>
              {/* Mobile hamburger */}
              <button
                className="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-slate-900/95 backdrop-blur-sm">
            <div className="container py-4 flex flex-col gap-4">
              <a
                href="#how-it-works"
                className="text-slate-300 hover:text-white transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </a>
              <a
                href="#offer"
                className="text-slate-300 hover:text-white transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Our Offer
              </a>
              <Link
                href="/philosophy"
                className="text-slate-300 hover:text-white transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Philosophy
              </Link>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white w-full mt-2"
                onClick={() => { setMobileMenuOpen(false); window.location.href = '/apply'; }}
              >
                Book Discovery Call
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-3xl" />
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
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
            <p className="text-xl md:text-2xl text-slate-300 mb-4">
              10 videos a week. Zero revenue to show for it.
            </p>
            <p className="text-lg text-blue-400 mb-10 font-medium">
              Track exactly which content drives revenue — from views to closed deals.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 w-full sm:w-auto" onClick={() => window.location.href = '/apply'}>
                Book Discovery Call
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-slate-900/70 border-y border-white/5">
        <div className="container">
          <p className="text-center text-slate-500 text-sm uppercase tracking-widest mb-8">What Clients Say</p>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                quote: "Within 30 days we had a clear content strategy, first edited videos live, and I could see which posts were driving discovery calls.",
                name: "James R.",
                role: "Business Coach, £120k/yr",
              },
              {
                quote: "EarnedReach identified the messaging gaps in week one. By month two we had 4 new inbound leads from content alone.",
                name: "Sarah M.",
                role: "Consultant & Speaker",
              },
              {
                quote: "The attribution dashboard alone is worth it. I finally know exactly which LinkedIn posts are converting to revenue.",
                name: "Marcus T.",
                role: "Founder, £200k/yr brand",
              }
            ].map((t, i) => (
              <Card key={i} className="p-6 bg-slate-800/50 border-slate-700 flex flex-col gap-3">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <Quote className="w-5 h-5 text-blue-500/40" />
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

      {/* The Problem */}
      <section className="py-16 md:py-24 bg-slate-900/50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Why Personal Brands Plateau</h2>
            <p className="text-xl text-slate-400">It's not your content. It's the gaps in your system.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Users, color: "text-red-400", bg: "bg-red-500/20", title: "Hiring Nightmare", body: "Finding and managing editors drains your time. You wanted to create, not become a manager." },
              { icon: Target, color: "text-red-400", bg: "bg-red-500/20", title: "No Strategy", body: "Posting consistently but randomly. No traffic plan, no attribution, no idea what's working." },
              { icon: TrendingUp, color: "text-red-400", bg: "bg-red-500/20", title: "Revenue Disconnect", body: "Views don't equal revenue. You can't trace content to actual business growth." },
            ].map((card) => (
              <Card key={card.title} className="p-8 bg-slate-800/50 border-slate-700">
                <div className={`w-12 h-12 rounded-lg ${card.bg} flex items-center justify-center mb-4`}>
                  <card.icon className={`w-6 h-6 ${card.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{card.title}</h3>
                <p className="text-slate-400">{card.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* The Offer */}
      <section id="offer" className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30">Our Offer</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">The 90-Day Growth Arc</h2>
            <p className="text-xl text-slate-400">Strategy + Execution + Revenue Alignment. You never edit. You never hire. You just grow.</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 md:p-12 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-500/30">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-8 h-8 text-blue-400" />
                <h3 className="text-2xl font-semibold text-white">What's Included</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {[
                  'Content strategy playbook delivered in 24 hours',
                  'Full content execution — editing, distribution, all handled',
                  'Proprietary analytics portal with real-time ROI tracking',
                  'Revenue-aligned partnership (rev share model)',
                  '48-72h turnaround on content + direct Slack access',
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
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-slate-400">A proven system from discovery to scale.</p>
          </div>
          <div className="max-w-4xl mx-auto grid gap-5">
            {[
              { icon: Target, color: "text-blue-400", bg: "bg-blue-500/20", border: "border-blue-500/30", step: "Step 1 · Day 1", stepColor: "text-blue-400", title: "Discovery Call", body: "We review your content, identify gaps, and map out a custom 90-day strategy. You leave with clarity.", hoverBorder: "hover:border-blue-500/30" },
              { icon: Zap, color: "text-emerald-400", bg: "bg-emerald-500/20", border: "border-emerald-500/30", step: "Step 2 · Days 1–7", stepColor: "text-emerald-400", title: "7-Day Onboarding", body: "Kickoff call, workflow setup, portal access, and your first edited video delivered within the first week.", hoverBorder: "hover:border-emerald-500/30" },
              { icon: TrendingUp, color: "text-purple-400", bg: "bg-purple-500/20", border: "border-purple-500/30", step: "Step 3 · Days 8–90", stepColor: "text-purple-400", title: "90-Day Execution", body: "Continuous content production, performance tracking, and data-driven optimisation across 3 phases: Authority → Nurture → Revenue.", hoverBorder: "hover:border-purple-500/30" },
            ].map((s) => (
              <Card key={s.title} className={`p-6 md:p-8 bg-slate-800/50 border-slate-700 ${s.hoverBorder} transition-all`}>
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full ${s.bg} flex items-center justify-center flex-shrink-0 border ${s.border}`}>
                    <s.icon className={`w-6 h-6 ${s.color}`} />
                  </div>
                  <div>
                    <span className={`${s.stepColor} text-xs font-semibold uppercase tracking-widest`}>{s.step}</span>
                    <h3 className="text-xl font-semibold text-white mt-1 mb-2">{s.title}</h3>
                    <p className="text-slate-400">{s.body}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/apply">
              <Button size="lg" className="bg-[#3b9eff] hover:bg-[#2a8eef] text-white px-8 py-6">
                Apply to Work With Us
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Portal Showcase */}
      <PortalShowcase />

      {/* Founder */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-950/30 to-slate-900">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-1.5">Meet the Founder</Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-white">Built by a Videographer Who Saw the Pattern</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <Card className="overflow-hidden bg-slate-800/50 border-slate-700 p-2">
                <div className="aspect-[4/3] overflow-hidden rounded-lg">
                  <img
                    src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663299156531/QotCEEcTTANzitIX.jpg"
                    alt="David, Founder of EarnedReach"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white">David, Founder of EarnedReach</h3>
                  <p className="text-slate-400 text-sm">Building systems that convert content into revenue</p>
                </div>
              </Card>
              <div className="space-y-5 text-base md:text-lg text-slate-300 leading-relaxed">
                <p>I started as a videographer working directly with 5 and 6-figure entrepreneurs. I loved the craft — but I kept seeing the same bottleneck: <span className="text-white font-semibold">brilliant founders drowning in content, with zero time to focus on what actually grew their business.</span></p>
                <p>They'd hire editors, but that only solved half the problem. They still needed strategy, traffic ownership, and a system that converted views into revenue.</p>
                <p className="text-lg text-blue-400 font-semibold italic">So I built EarnedReach — not as an agency, but as the full-stack growth partner I wish they'd had from day one.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why EarnedReach — merged single section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              We're Not an Agency.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                We're Your Growth Partner.
              </span>
            </h2>
            <p className="text-xl text-slate-400">Here's what that actually means.</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Target, color: "text-blue-400", bg: "bg-blue-500/20", title: "Founder-Led Strategy", body: "You work directly with David — not a team of juniors. High-value positioning, handled personally." },
              { icon: Zap, color: "text-emerald-400", bg: "bg-emerald-500/20", title: "Full Execution Included", body: "You never edit. You never manage editors. We own the entire production workflow." },
              { icon: TrendingUp, color: "text-cyan-400", bg: "bg-cyan-500/20", title: "Aligned Incentives", body: "Revenue share means we only win when you win. Our success is tied directly to your growth." },
              { icon: Shield, color: "text-blue-400", bg: "bg-blue-500/20", title: "Systems Over Heroics", body: "We build repeatable, scalable systems — not one-off viral hits. Compounding growth beats temporary spikes." },
              { icon: BarChart3, color: "text-emerald-400", bg: "bg-emerald-500/20", title: "Data-Driven Decisions", body: "Every strategy adjustment is backed by performance data. We optimise for measurable outcomes." },
              { icon: Clock, color: "text-purple-400", bg: "bg-purple-500/20", title: "Founder Time is Sacred", body: "You focus on building your business. We handle strategy, execution, and optimisation." },
            ].map((card) => (
              <Card key={card.title} className="p-6 bg-slate-800/50 border-slate-700 hover:border-blue-500/20 transition-all">
                <div className={`w-12 h-12 rounded-full ${card.bg} flex items-center justify-center mb-4`}>
                  <card.icon className={`w-6 h-6 ${card.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{card.title}</h3>
                <p className="text-slate-400 text-sm">{card.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-slate-900/50">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-10 text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible defaultValue="item-1">
              {[
                {
                  id: "item-1",
                  q: "What exactly is included in the 90-Day Growth Arc?",
                  a: "Everything. Content strategy playbook, full editing and production, platform distribution, the proprietary analytics portal, weekly performance reviews, and direct Slack access to David. You focus on recording — we handle everything else."
                },
                {
                  id: "item-2",
                  q: "Do I need to already be creating content?",
                  a: "You need to be willing to record. We handle the rest — strategy, editing, distribution, and tracking. If you're already creating, we'll immediately improve quality and add the attribution layer you're missing."
                },
                {
                  id: "item-3",
                  q: "How does the revenue share work?",
                  a: "We take a small percentage of revenue directly attributable to content we've produced and tracked. This aligns our incentives completely — we only win when you win. Details are discussed on the discovery call."
                },
                {
                  id: "item-4",
                  q: "How is EarnedReach different from a content agency?",
                  a: "Agencies deliver content. We deliver growth. The difference is attribution — we track every piece of content back to revenue, and we're incentivised by that outcome through rev share. No agency does this."
                },
              ].map((item) => (
                <AccordionItem key={item.id} value={item.id} className="border-slate-700">
                  <AccordionTrigger className="text-white hover:text-blue-400 text-left">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-slate-400 leading-relaxed">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-900/30 to-cyan-900/20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Turn Content Into Revenue?
            </h2>
            <p className="text-xl text-slate-400 mb-10">
              Book a discovery call. We'll review your content, identify the gaps, and show you exactly what a 90-day arc looks like for your brand.
            </p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-10 py-6" onClick={() => window.location.href = '/apply'}>
              Book Your Discovery Call
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-slate-500 text-sm mt-4">No obligation. 30 minutes. You'll leave with clarity regardless.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 bg-slate-900">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663299156531/afakcTX83KHyqkFc2EnKin/earnedreach-logo_3d80f824.png" alt="EarnedReach" className="w-10 h-10" />
              <span className="text-white font-semibold">EarnedReach</span>
              <span className="text-slate-400 text-sm">© 2026 All rights reserved.</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <Link href="/philosophy" className="hover:text-white transition-colors">Philosophy</Link>
<Link href="/apply" className="hover:text-white transition-colors">Apply</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
