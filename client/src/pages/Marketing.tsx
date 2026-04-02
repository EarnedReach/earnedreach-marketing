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
  ArrowUpRight,
  CheckCircle2, 
  Zap,
  Target,
  TrendingUp,
  TrendingDown,
  Users,
  BarChart3,
  Shield,
  Clock,
  Sparkles,
  Quote,
  Star,
  Eye,
  MousePointer,
  DollarSign,
  Activity,
  ChevronRight,
  Circle,
} from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

/**
 * EarnedReach Marketing Homepage
 * Design Philosophy: Dark, sophisticated, data-driven — Swiss Modernism
 * Navy blue background with electric blue/cyan accents
 * Portal showcase uses native-coded dashboard UIs (no screenshots)
 */

// ─── Native Dashboard: ROI Tracking ─────────────────────────────────────────
function ROIDashboard() {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const values = [8, 12, 15, 18, 22, 28, 35, 42, 52, 63, 74, 84];
  const maxVal = 100;

  return (
    <div className="bg-[#0f1929] rounded-xl border border-slate-700/60 overflow-hidden shadow-2xl shadow-blue-900/30 font-sans">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/60 border-b border-slate-700/50">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-green-500/70" />
        <div className="flex-1 mx-4">
          <div className="bg-slate-700/50 rounded text-xs text-slate-400 px-3 py-1 text-center max-w-[200px] mx-auto">
            portal.earnedreach.org
          </div>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* KPI Row */}
        <div className="grid grid-cols-4 gap-3">
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
              <p className="text-slate-400 text-[10px] uppercase tracking-wider mb-1">{kpi.label}</p>
              <p className={`text-lg font-bold ${kpi.highlight ? "text-blue-300" : "text-white"}`}>{kpi.value}</p>
              <p className={`text-[10px] mt-0.5 ${kpi.subColor}`}>{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-5 gap-3">
          {/* Revenue over time */}
          <div className="col-span-3 bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
            <p className="text-white text-xs font-semibold mb-3">Revenue Over Time</p>
            <div className="relative h-28">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[9px] text-slate-500 pr-2">
                {["£100k","£75k","£50k","£25k","£10k"].map(l => <span key={l}>{l}</span>)}
              </div>
              {/* Chart area */}
              <div className="ml-8 h-full relative">
                <svg viewBox="0 0 300 80" className="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>
                  {/* Area fill */}
                  <path
                    d={`M0,${80 - (values[0]/maxVal)*80} ${values.map((v,i) => `L${(i/(values.length-1))*300},${80-(v/maxVal)*80}`).join(' ')} L300,80 L0,80 Z`}
                    fill="url(#areaGrad)"
                  />
                  {/* Line */}
                  <polyline
                    points={values.map((v,i) => `${(i/(values.length-1))*300},${80-(v/maxVal)*80}`).join(' ')}
                    fill="none"
                    stroke="#3b9eff"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  {/* End dot */}
                  <circle cx="300" cy={80-(values[11]/maxVal)*80} r="3" fill="#3b9eff" />
                </svg>
                {/* End label */}
                <div className="absolute right-0 top-0 text-[10px] text-blue-300 font-semibold">£84,200</div>
              </div>
            </div>
            {/* X axis */}
            <div className="ml-8 flex justify-between mt-1">
              {months.map(m => <span key={m} className="text-[8px] text-slate-500">{m}</span>)}
            </div>
          </div>

          {/* Pipeline stages */}
          <div className="col-span-2 bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
            <p className="text-white text-xs font-semibold mb-3">Pipeline Stages</p>
            <div className="space-y-2">
              {[
                { stage: "New Leads", count: 89, color: "bg-blue-500" },
                { stage: "Contacted", count: 64, color: "bg-blue-400" },
                { stage: "Proposal", count: 31, color: "bg-cyan-500" },
                { stage: "Negotiation", count: 21, color: "bg-cyan-400" },
                { stage: "Closed Won", count: 12, color: "bg-emerald-500" },
                { stage: "Closed Lost", count: 7, color: "bg-red-500" },
              ].map((row) => (
                <div key={row.stage} className="flex items-center gap-2">
                  <span className="text-[9px] text-slate-400 w-16 shrink-0">{row.stage}</span>
                  <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className={`h-full ${row.color} rounded-full`} style={{ width: `${(row.count/89)*100}%` }} />
                  </div>
                  <span className="text-[9px] text-slate-300 w-5 text-right">{row.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
          <p className="text-white text-xs font-semibold mb-3">Recent Activity</p>
          <div className="space-y-2">
            {[
              { name: "James Wilson", company: "TechFrow Ltd", status: "Closed Won", statusColor: "text-emerald-400", value: "£4,800", time: "2 hours ago" },
              { name: "Sarah Ahmed", company: "GrowthOp", status: "Negotiation", statusColor: "text-yellow-400", value: "£14,200", time: "Yesterday" },
              { name: "Michael Roberts", company: "SmallBiz Inc.", status: "Proposal Sent", statusColor: "text-blue-400", value: "£7,400", time: "16 hours ago" },
            ].map((row) => (
              <div key={row.name} className="flex items-center gap-3 text-[10px]">
                <span className="text-slate-300 w-24 shrink-0">{row.name}</span>
                <span className="text-slate-500 w-20 shrink-0">{row.company}</span>
                <span className={`w-24 shrink-0 font-medium ${row.statusColor}`}>{row.status}</span>
                <span className="text-slate-300 font-semibold flex-1">{row.value}</span>
                <span className="text-slate-500">{row.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Native Dashboard: Client Performance ───────────────────────────────────
function ClientDashboard() {
  return (
    <div className="bg-[#0f1929] rounded-xl border border-slate-700/60 overflow-hidden shadow-2xl shadow-blue-900/30 font-sans">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/60 border-b border-slate-700/50">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-green-500/70" />
        <div className="flex-1 mx-4">
          <div className="bg-slate-700/50 rounded text-xs text-slate-400 px-3 py-1 text-center max-w-[200px] mx-auto">
            portal.earnedreach.org
          </div>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Industry benchmarks card */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-white text-xs font-semibold">Industry Benchmarks</p>
              <p className="text-slate-500 text-[10px]">Comparing to Technology industry averages</p>
            </div>
            <div className="bg-blue-600/20 border border-blue-500/30 text-blue-300 text-[10px] px-2 py-1 rounded">Select Category</div>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded p-2 mb-3">
            <p className="text-blue-300 text-[10px]">Performing above Technology industry average in 2 out of 3 key metrics. Strong performance across platforms.</p>
          </div>
          <div className="space-y-3">
            {[
              { label: "YouTube — Follower Growth Rate", yours: 11.5, industry: 3.0, delta: "+8.5%", positive: true },
              { label: "YouTube — Engagement Rate", yours: 4.4, industry: 1.0, delta: "+3.4%", positive: true },
              { label: "YouTube — Avg Views Per Post", yours: 163091, industry: 23500, delta: "+248%", positive: true },
            ].map((m) => (
              <div key={m.label}>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-300 text-[10px]">{m.label}</span>
                  <span className={`text-[10px] font-semibold ${m.positive ? "text-emerald-400" : "text-red-400"}`}>{m.delta}</span>
                </div>
                <div className="relative h-2 bg-slate-700 rounded-full overflow-hidden">
                  {/* Industry average marker */}
                  <div className="absolute h-full bg-slate-500/40 rounded-full" style={{ width: `${(m.industry / (m.yours + m.industry * 0.3)) * 100}%` }} />
                  {/* Your performance */}
                  <div className="absolute h-full bg-blue-500 rounded-full" style={{ width: `${Math.min((m.yours / (m.yours + m.industry * 0.3)) * 100, 100)}%` }} />
                </div>
                <div className="flex justify-between mt-0.5">
                  <span className="text-[9px] text-slate-400">Your performance</span>
                  <span className="text-[9px] text-slate-500">Industry avg: {m.industry}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { icon: Eye, label: "Total Views", value: "50,000", sub: "Across all platforms", color: "text-blue-400" },
            { icon: Users, label: "Followers", value: "10,000", sub: "Latest snapshot", color: "text-cyan-400", highlight: true },
            { icon: Activity, label: "Engagement Rate", value: "5.20%", sub: "Across all content", color: "text-purple-400" },
            { icon: MousePointer, label: "Website Clicks", value: "1,240", sub: "From social media", color: "text-emerald-400" },
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

        {/* Top performing content */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
          <p className="text-white text-xs font-semibold mb-3">Top Performing Content</p>
          <div className="space-y-2">
            {[
              { title: "How I scaled to £100K without paid ads", views: "24.3K", engagement: "8.2%", platform: "YouTube" },
              { title: "The 3 content mistakes killing your brand", views: "18.7K", engagement: "6.9%", platform: "LinkedIn" },
              { title: "My exact content system (full breakdown)", views: "12.1K", engagement: "5.4%", platform: "YouTube" },
            ].map((post, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-blue-600/20 border border-blue-500/20 flex items-center justify-center shrink-0">
                  <span className="text-blue-400 text-[10px] font-bold">{i+1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-300 text-[10px] truncate">{post.title}</p>
                  <p className="text-slate-500 text-[9px]">{post.platform}</p>
                </div>
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
    <div className="bg-[#0f1929] rounded-xl border border-slate-700/60 overflow-hidden shadow-2xl shadow-blue-900/30 font-sans">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/60 border-b border-slate-700/50">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-green-500/70" />
        <div className="flex-1 mx-4">
          <div className="bg-slate-700/50 rounded text-xs text-slate-400 px-3 py-1 text-center max-w-[200px] mx-auto">
            portal.earnedreach.org
          </div>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Client header */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="text-white text-sm font-semibold">Client Dashboard</p>
                <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[9px] px-2 py-0.5 rounded-full">Acceleration Phase</span>
              </div>
              <p className="text-slate-500 text-[10px]">Technology · Started 1 December 2025</p>
            </div>
            <div className="bg-slate-700/50 text-slate-400 text-[9px] px-2 py-1 rounded">Connected Accounts ✓</div>
          </div>

          {/* Progress bar */}
          <div className="bg-slate-700/50 border border-slate-600/30 rounded-lg p-3">
            <div className="flex justify-between items-center mb-2">
              <p className="text-white text-[10px] font-semibold">90-Day Growth Journey</p>
              <span className="text-blue-300 text-[10px] font-semibold">{progress}% Complete</span>
            </div>
            <p className="text-slate-500 text-[9px] mb-2">Day 69 of 90</p>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Phase cards */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { phase: "Foundation", days: "Days 1–30", sub: "Setup & Strategy", done: true },
            { phase: "Acceleration", days: "Days 31–60", sub: "Growth & Optimisation", active: true },
            { phase: "Scale", days: "Days 61–90", sub: "Maximise Impact", upcoming: true },
          ].map((p) => (
            <div
              key={p.phase}
              className={`rounded-lg p-3 border text-center ${
                p.active
                  ? "bg-blue-600/15 border-blue-500/40"
                  : p.done
                  ? "bg-emerald-500/10 border-emerald-500/20"
                  : "bg-slate-800/40 border-slate-700/40"
              }`}
            >
              <p className={`text-xs font-semibold mb-1 ${p.active ? "text-blue-300" : p.done ? "text-emerald-300" : "text-slate-400"}`}>{p.phase}</p>
              <p className="text-[9px] text-slate-400">{p.days}</p>
              <p className="text-[9px] text-slate-500 mt-0.5">{p.sub}</p>
              {p.done && <p className="text-emerald-400 text-[9px] mt-1">✓ Complete</p>}
              {p.active && <p className="text-blue-400 text-[9px] mt-1">● Active</p>}
            </div>
          ))}
        </div>

        {/* Tab nav */}
        <div className="flex gap-2 border-b border-slate-700/50 pb-2">
          {["Overview", "Social Media", "Traffic & Attribution", "Business Impact"].map((tab, i) => (
            <span
              key={tab}
              className={`text-[10px] px-2 py-1 rounded cursor-default ${i === 0 ? "bg-blue-600/20 text-blue-300 border border-blue-500/30" : "text-slate-500"}`}
            >
              {tab}
            </span>
          ))}
        </div>

        {/* Milestone grid */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { week: "Week 1", milestone: "First video delivered", icon: "▶", done: true },
            { week: "Week 4", milestone: "Traffic attribution live", icon: "↗", done: true },
            { week: "Week 8", milestone: "Revenue tracking active", icon: "£", done: true },
            { week: "Week 12", milestone: "Proven ROI system", icon: "✓", done: false, current: true },
          ].map((m) => (
            <div
              key={m.week}
              className={`flex items-center gap-3 rounded-lg p-3 border ${
                m.current
                  ? "bg-blue-600/10 border-blue-500/30"
                  : m.done
                  ? "bg-slate-800/40 border-slate-700/40"
                  : "bg-slate-800/20 border-slate-700/20"
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0 ${
                m.current ? "bg-blue-600/30 text-blue-300" : m.done ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-700/50 text-slate-500"
              }`}>
                {m.icon}
              </div>
              <div>
                <p className={`text-[10px] font-semibold ${m.current ? "text-blue-300" : m.done ? "text-white" : "text-slate-500"}`}>{m.week}</p>
                <p className="text-[9px] text-slate-400">{m.milestone}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Portal Showcase Section ─────────────────────────────────────────────────
const DASHBOARD_TABS = [
  {
    id: "roi",
    label: "ROI Tracking",
    badge: "Revenue",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    title: "Track Every Pound Back to Content",
    description: "See total revenue, deals closed, pipeline value, and close rate in real-time. Know exactly which content is driving business outcomes.",
    component: <ROIDashboard />,
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
    badge: "Growth",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    title: "Your 90-Day Growth Journey, Visualised",
    description: "Foundation → Acceleration → Scale. Track your phase progress, weekly milestones, and see exactly where you are in the arc at any time.",
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
        <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-8 items-start">
          {/* Left: Description */}
          <div className="md:col-span-2 space-y-6 md:pt-4">
            <Badge className={`${active.badgeColor} border`}>{active.badge}</Badge>
            <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">{active.title}</h3>
            <p className="text-slate-400 leading-relaxed">{active.description}</p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
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
              Get access on your discovery call
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right: Native Dashboard UI */}
          <div className="md:col-span-3 relative">
            <div className="absolute -inset-4 bg-blue-500/8 rounded-2xl blur-2xl pointer-events-none" />
            <div className="relative">
              {active.component}
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

// ─── Main Marketing Page ─────────────────────────────────────────────────────
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
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-3xl" />
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/3 rounded-full blur-3xl" />
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
                  <h3 className="text-xl font-semibold text-white mb-2">Long-Term Thinking</h3>
                  <p className="text-slate-400">We're not chasing quick wins. We're building a brand asset that compounds in value over months and years.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>
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
                  q: "What's the minimum commitment?",
                  a: "We prefer a 90-day arc because that's where the compounding effect kicks in. Month-to-month is available but at a higher rate. Most clients extend well beyond 90 days once they see the results."
                },
                {
                  id: "item-5",
                  q: "What platforms do you work across?",
                  a: "YouTube, LinkedIn, Instagram, TikTok, and X. We build a cross-platform strategy based on where your audience is and where the highest-value leads come from for your specific business."
                },
                {
                  id: "item-6",
                  q: "How is EarnedReach different from a content agency?",
                  a: "Agencies deliver content. We deliver growth. The difference is attribution — we track every piece of content back to revenue, and we're incentivised by that outcome through rev share. No agency does this."
                }
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
              Book a discovery call. We'll review your current content, identify the gaps, and show you exactly what a 90-day arc looks like for your brand.
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
              <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663299156531/KEuerFVQvsrsJzda.png" alt="EarnedReach" className="w-8 h-8" />
              <span className="text-slate-400 text-sm">© 2026 EarnedReach. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <Link href="/philosophy" className="hover:text-white transition-colors">Philosophy</Link>
              <Link href="/journey" className="hover:text-white transition-colors">Client Journey</Link>
              <Link href="/apply" className="hover:text-white transition-colors">Apply</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
