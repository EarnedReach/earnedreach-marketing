import { useState } from "react";
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
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">EarnedReach Client Journey</h1>
              <p className="text-slate-600 mt-1">
                From discovery to 90-day growth arc · Click any stage for details
              </p>
            </div>
            
            {/* View Toggle */}
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
          </div>
          
          {/* View Mode Indicator */}
          {isClientView && (
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Client View Active:</strong> Internal scripts, pricing, and sales tactics are hidden. Safe to share with clients.
              </p>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-12">
        <div className="space-y-16">
          {sections.map((section, sectionIndex) => (
            <section
              key={section.id}
              className="relative"
              onMouseEnter={() => setActiveSection(section.id)}
              onMouseLeave={() => setActiveSection(null)}
            >
              {/* Section Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-1 h-8 ${section.color} rounded-full`} />
                  <h2 className="text-2xl font-bold text-slate-900">{section.title}</h2>
                </div>
                <p className="text-slate-600 ml-7">{section.subtitle}</p>
              </div>

              {/* Timeline Container */}
              <div className="relative">
                {/* Connection Line */}
                <div className="absolute top-12 left-0 right-0 h-0.5 bg-slate-200 -z-10" />

                {/* Stage Cards */}
                <div className="grid gap-6" style={{
                  gridTemplateColumns: `repeat(${section.stages.length}, minmax(0, 1fr))`
                }}>
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
                      <h3 className="font-semibold text-slate-900 mb-2 text-sm">
                        {stage.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed mb-3">
                        {stage.description}
                      </p>

                      {/* Click hint */}
                      <div className="text-xs text-blue-600 font-medium">
                        Click for details →
                      </div>

                      {/* Connection Dot */}
                      <div className={`
                        absolute -bottom-3 left-1/2 -translate-x-1/2 
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

        {/* Footer Info */}
        <div className="mt-16 p-8 bg-white rounded-lg border-2 border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-4">About This Journey</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
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
