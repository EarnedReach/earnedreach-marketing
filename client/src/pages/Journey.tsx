import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  Circle, 
  FileText, 
  Users, 
  Zap, 
  TrendingUp,
  Calendar,
  Video,
  BarChart3,
  Target,
  Eye,
  EyeOff
} from "lucide-react";
import { StageModal } from "@/components/StageModal";
import { stageDetails } from "@/data/stageDetails";
import { clientSafeDetails } from "@/data/clientSafeContent";

/**
 * Design Philosophy: Swiss Modernism meets Digital Clarity
 * - Grid-based precision with 8px system
 * - Typographic hierarchy (DM Sans + Inter)
 * - Functional color (Blue for trust, Amber for milestones)
 * - Horizontal timeline flow showing forward momentum
 * - Interactive modals for detailed operational content
 * - Client View toggle for safe sharing
 */

interface StageCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  status?: "complete" | "active" | "upcoming";
}

interface Section {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  stages: StageCard[];
}

export default function Home() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [selectedStage, setSelectedStage] = useState<StageCard | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClientView, setIsClientView] = useState(false);
  const [isClientUrlParam, setIsClientUrlParam] = useState(false);

  // Check URL parameter on mount to auto-enable Client View
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get('view');
    if (viewParam === 'client') {
      setIsClientView(true);
      setIsClientUrlParam(true); // Track that user came via client URL
    }
  }, []);

  const handleStageClick = (stage: StageCard) => {
    setSelectedStage(stage);
    setIsModalOpen(true);
  };

  const toggleView = () => {
    setIsClientView(!isClientView);
  };

  const sections: Section[] = [
    {
      id: "discovery",
      title: "Discovery & Sales",
      subtitle: "From first contact to partnership",
      color: "bg-blue-500",
      stages: [
        {
          id: "typeform",
          title: "Entry Point",
          description: "Client completes Typeform submission with business goals and content needs",
          icon: <FileText className="w-5 h-5" />,
          status: "complete"
        },
        {
          id: "precall",
          title: "Pre-Call Prep",
          description: "Review Typeform answers and draft initial strategy framework",
          icon: <Users className="w-5 h-5" />,
          status: "complete"
        },
        {
          id: "call",
          title: "Discovery Call",
          description: "5-step process: Introduction → Pain Summary → Pitch → Objections → Close",
          icon: <Zap className="w-5 h-5" />,
          status: "active"
        },
        {
          id: "postcall",
          title: "Post-Call",
          description: "Send one-page plan summary reinforcing value and next steps",
          icon: <CheckCircle2 className="w-5 h-5" />,
          status: "upcoming"
        }
      ]
    },
    {
      id: "onboarding",
      title: "Client Onboarding",
      subtitle: "The first 7 days",
      color: "bg-emerald-500",
      stages: [
        {
          id: "day1",
          title: "Day 1: Welcome",
          description: "Welcome email, onboarding questionnaire, kickoff call scheduling",
          icon: <Circle className="w-5 h-5" />
        },
        {
          id: "day2",
          title: "Day 2: Kickoff",
          description: "60-min kickoff call, strategy alignment, workflow explanation",
          icon: <Circle className="w-5 h-5" />
        },
        {
          id: "day3",
          title: "Day 3: Setup",
          description: "Trello board, content calendar, shared cloud storage access",
          icon: <Circle className="w-5 h-5" />
        },
        {
          id: "day4",
          title: "Day 4: Ignition",
          description: "First raw footage submission, editing begins, Slack channel setup",
          icon: <Video className="w-5 h-5" />
        },
        {
          id: "day5",
          title: "Day 5: Feedback",
          description: "First draft delivery with clear feedback guidance",
          icon: <Circle className="w-5 h-5" />
        },
        {
          id: "day6",
          title: "Day 6: Delivery",
          description: "Final video approval and quality confirmation",
          icon: <CheckCircle2 className="w-5 h-5" />
        },
        {
          id: "day7",
          title: "Day 7: Cadence",
          description: "First weekly check-in and upcoming week's content plan",
          icon: <Calendar className="w-5 h-5" />
        }
      ]
    },
    {
      id: "engine",
      title: "Content Engine",
      subtitle: "Ongoing production & optimization",
      color: "bg-purple-500",
      stages: [
        {
          id: "production",
          title: "Content Production",
          description: "Raw footage → Editing → Draft → Final delivery with 48-72h turnaround",
          icon: <Video className="w-5 h-5" />
        },
        {
          id: "tracking",
          title: "Performance Tracking",
          description: "Weekly snapshots and monthly reports on key metrics",
          icon: <BarChart3 className="w-5 h-5" />
        },
        {
          id: "optimization",
          title: "Optimization Loop",
          description: "Data-driven strategy adjustments to maximize impact",
          icon: <TrendingUp className="w-5 h-5" />
        }
      ]
    },
    {
      id: "arc",
      title: "90-Day Growth Arc",
      subtitle: "Strategic milestones",
      color: "bg-amber-500",
      stages: [
        {
          id: "month1",
          title: "Month 1: Foundation",
          description: "Establish content engine and achieve initial wins",
          icon: <Target className="w-5 h-5" />
        },
        {
          id: "month2",
          title: "Month 2: Acceleration",
          description: "Ramp up production and refine strategy based on data",
          icon: <TrendingUp className="w-5 h-5" />
        },
        {
          id: "month3",
          title: "Month 3: Scale",
          description: "Maximize reach, engagement, and revenue attribution",
          icon: <CheckCircle2 className="w-5 h-5" />
        }
      ]
    }
  ];

  // Merge client-safe content with full details based on view mode
  const getStageDetail = (stageId: string) => {
    if (isClientView && clientSafeDetails[stageId]) {
      return {
        ...stageDetails[stageId],
        ...clientSafeDetails[stageId]
      };
    }
    return stageDetails[stageId];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4 md:py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <a href="/" className="flex-shrink-0">
                <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663299156531/afakcTX83KHyqkFc2EnKin/earnedreach-logo_3d80f824.png" alt="EarnedReach" className="w-12 h-12 md:w-14 md:h-14 hover:opacity-80 transition-opacity" />
              </a>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Client Journey</h1>
                <p className="text-sm md:text-base text-slate-600 mt-1">
                  From discovery to 90-day growth arc · Click any stage for details
                </p>
              </div>
            </div>
            
            {/* View Toggle - Only show if not accessed via client URL */}
            {!isClientUrlParam && (
              <Button
                onClick={toggleView}
                variant={isClientView ? "default" : "outline"}
                className="flex items-center gap-2"
              >
                {isClientView ? (
                  <>
                    <Eye className="w-4 h-4" />
                    Client View
                  </>
                ) : (
                  <>
                    <EyeOff className="w-4 h-4" />
                    Internal View
                  </>
                )}
              </Button>
            )}
          </div>
          
          {/* View Mode Indicator - Only show for internal users who toggled to Client View */}
          {isClientView && !isClientUrlParam && (
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Client View Active:</strong> Internal scripts, pricing, and sales tactics are hidden. Safe to share with clients.
              </p>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6 md:py-12">
        {/* Strategic 4-Pillar Framework */}
        <section className="mb-12 md:mb-16">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <Badge className="mb-4 bg-blue-500 text-white">
              Strategic Growth Journey
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
              Messaging &gt; Virality
            </h2>
            <p className="text-lg md:text-xl text-slate-600">
              Nurturing through content, not chasing virality.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid gap-6 md:gap-8">
            {/* Pillar One: The Messaging Audit */}
            <Card className="p-6 md:p-8 bg-white border-2 border-blue-200 hover:border-blue-400 transition-all hover:shadow-lg">
              <div className="flex items-start gap-4 md:gap-6">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 md:w-7 md:h-7 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">The Messaging Audit</h3>
                  <p className="text-base md:text-lg text-blue-600 font-semibold mb-3">The Foundation</p>
                  <p className="text-slate-700 mb-3">
                    It's not about the size of the following; it's about the resonance of the message. We identify the core pillars that speak directly to your ICP.
                  </p>
                  <div className="flex items-start gap-2 text-emerald-600">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span className="font-medium">Content strategy playbook delivered in 24 hours that prioritizes authority over vanity.</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Pillar Two: The 1-to-3 Nurture Engine */}
            <Card className="p-6 md:p-8 bg-white border-2 border-emerald-200 hover:border-emerald-400 transition-all hover:shadow-lg">
              <div className="flex items-start gap-4 md:gap-6">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 md:w-7 md:h-7 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">The 1-to-3 Nurture Engine</h3>
                  <p className="text-base md:text-lg text-emerald-600 font-semibold mb-3">The Execution</p>
                  <p className="text-slate-700 mb-3">
                    Efficiency and leverage. We take 1 high-value long-form video and repurpose it into 3 strategic short-form assets.
                  </p>
                  <div className="flex items-start gap-2 text-emerald-600">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span className="font-medium">Consistent presence without the burnout, specifically designed to nurture viewers through the funnel.</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Pillar Three: The Attribution Dashboard */}
            <Card className="p-6 md:p-8 bg-white border-2 border-purple-200 hover:border-purple-400 transition-all hover:shadow-lg">
              <div className="flex items-start gap-4 md:gap-6">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 md:w-7 md:h-7 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">The Attribution Dashboard</h3>
                  <p className="text-base md:text-lg text-purple-600 font-semibold mb-3">The Proof</p>
                  <p className="text-slate-700 mb-3">
                    Data-driven clarity. Integration of our proprietary analytics portal.
                  </p>
                  <div className="flex items-start gap-2 text-emerald-600">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span className="font-medium">Real-time tracking that shows exactly which content pieces are converting views into strategy calls. No more guessing; just proof of ROI.</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Pillar Four: The 90-Day Growth Arc */}
            <Card className="p-6 md:p-8 bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-300">
              <div className="flex items-start gap-4 md:gap-6">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-cyan-100 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 md:w-7 md:h-7 text-cyan-600" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">The 90-Day Growth Arc</h3>
                  <p className="text-base md:text-lg text-cyan-600 font-semibold mb-4">The Scale</p>
                  <p className="text-slate-700 mb-6">
                    Predictable, compounding results. A structured 3-phase journey:
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded bg-cyan-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-cyan-600 font-bold text-sm">1-30</span>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">Authority</p>
                        <p className="text-slate-600">Locking in messaging and building the engine.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded bg-cyan-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-cyan-600 font-bold text-sm">31-60</span>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">Nurture</p>
                        <p className="text-slate-600">Accelerating reach and tracking intent.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded bg-cyan-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-cyan-600 font-bold text-sm">61-90</span>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">Revenue</p>
                        <p className="text-slate-600">Optimizing for maximum strategy calls and closed deals.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Detailed Journey Timeline */}
        <div className="border-t-2 border-slate-200 pt-12 md:pt-16">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-4">
              Detailed Journey Timeline
            </h2>
            <p className="text-lg text-slate-600">
              Click any stage below to see operational details and next steps.
            </p>
          </div>

        <div className="space-y-10 md:space-y-16">
          {sections.map((section, sectionIndex) => (
            <section
              key={section.id}
              className="relative"
              onMouseEnter={() => setActiveSection(section.id)}
              onMouseLeave={() => setActiveSection(null)}
            >
              {/* Section Header */}
              <div className="mb-6 md:mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-1 h-6 md:h-8 ${section.color} rounded-full`} />
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900">{section.title}</h2>
                </div>
                <p className="text-sm md:text-base text-slate-600 ml-7">{section.subtitle}</p>
              </div>

              {/* Timeline Container */}
              <div className="relative">
                {/* Connection Line - Hidden on mobile, shown on desktop */}
                <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-slate-200 -z-10" />

                {/* Stage Cards - Stack on mobile, grid on desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-flow-col lg:auto-cols-fr gap-6">
                  {section.stages.map((stage, index) => (
                    <Card
                      key={stage.id}
                      onClick={() => handleStageClick(stage)}
                      className={`
                        relative p-6 bg-white border-2 transition-all duration-300
                        hover:shadow-lg hover:-translate-y-1 cursor-pointer
                        ${activeSection === section.id ? 'border-slate-300' : 'border-slate-200'}
                        ${stage.status === 'active' ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
                      `}
                      style={{
                        animationDelay: `${index * 100}ms`
                      }}
                    >
                      {/* Status Indicator */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        {stage.status === 'complete' && (
                          <Badge className="bg-emerald-500 text-white">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Complete
                          </Badge>
                        )}
                        {stage.status === 'active' && (
                          <Badge className="bg-blue-500 text-white animate-pulse">
                            Active
                          </Badge>
                        )}
                        {stage.status === 'upcoming' && (
                          <Badge variant="outline" className="bg-white">
                            Upcoming
                          </Badge>
                        )}
                      </div>

                      {/* Icon */}
                      <div className={`
                        w-12 h-12 rounded-lg ${section.color} bg-opacity-10 
                        flex items-center justify-center mb-4
                        ${section.color.replace('bg-', 'text-')}
                      `}>
                        {stage.icon}
                      </div>

                      {/* Content */}
                      <h3 className="font-semibold text-slate-900 mb-2 text-base md:text-sm">
                        {stage.title}
                      </h3>
                      <p className="text-sm md:text-xs text-slate-600 leading-relaxed mb-3">
                        {stage.description}
                      </p>

                      {/* Click hint */}
                      <div className="text-sm md:text-xs text-blue-600 font-medium">
                        Click for details →
                      </div>

                      {/* Connection Dot - Hidden on mobile */}
                      <div className={`
                        hidden lg:block absolute -bottom-3 left-1/2 -translate-x-1/2 
                        w-6 h-6 rounded-full ${section.color} 
                        border-4 border-white shadow-sm
                      `} />
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>

        </div>

        {/* Footer Info */}
        <div className="mt-10 md:mt-16 p-6 md:p-8 bg-white rounded-lg border-2 border-slate-200 shadow-sm">
          <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-4">About This Journey</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm md:text-sm">
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">Discovery & Sales</h4>
              <p className="text-slate-600">Structured process from Typeform to signed partnership with clear value communication</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">7-Day Onboarding</h4>
              <p className="text-slate-600">Systematic first week ensuring smooth integration and first content delivery</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">90-Day Growth Arc</h4>
              <p className="text-slate-600">Strategic progression from foundation to scale with data-driven optimization</p>
            </div>
          </div>
        </div>
      </main>

      {/* Stage Modal */}
      <StageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        stage={selectedStage}
        detail={selectedStage ? getStageDetail(selectedStage.id) : null}
      />
    </div>
  );
}
