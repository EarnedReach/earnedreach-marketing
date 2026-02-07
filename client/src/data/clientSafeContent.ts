import { StageDetail } from "./stageDetails";

/**
 * Client-safe versions of stage details
 * Removes: pricing details, internal scripts, sales tactics, objection handling
 * Keeps: timeline, deliverables, what to expect, general process
 */

export const clientSafeDetails: Record<string, Partial<StageDetail>> = {
  typeform: {
    overview: "Your journey begins with a detailed questionnaire where you share your business goals, content needs, and current challenges. This helps us understand your vision and prepare a tailored strategy.",
    checklist: [
      "Complete the strategy questionnaire",
      "Receive confirmation email",
      "Our team reviews your responses",
      "Discovery call scheduled within 24 hours"
    ],
    scripts: [],
    resources: [],
    tips: [
      "Be specific about your goals—the more detail, the better we can help",
      "Share examples of content you admire",
      "Think about your target audience and what resonates with them"
    ]
  },
  precall: {
    overview: "Before our discovery call, our team reviews your questionnaire responses and researches your brand to ensure our conversation is strategic and valuable.",
    checklist: [
      "Team reviews your questionnaire",
      "Research your brand and current content",
      "Prepare initial strategy ideas",
      "Discovery call scheduled"
    ],
    scripts: [],
    resources: [],
    tips: []
  },
  call: {
    overview: "The discovery call is a strategic 45-60 minute conversation where we discuss your goals, explore opportunities, and present how we can help you achieve measurable growth.",
    checklist: [
      "Introduction and goal alignment",
      "Discuss your content challenges",
      "Explore growth opportunities",
      "Present our 90-day growth arc approach",
      "Answer your questions",
      "Outline next steps"
    ],
    scripts: [],
    resources: [],
    tips: [
      "Come prepared with questions about our process",
      "Share specific challenges you're facing",
      "Think about your growth goals for the next 90 days"
    ]
  },
  postcall: {
    overview: "After our call, you'll receive a personalized one-page plan summary outlining the strategy we discussed and clear next steps for moving forward.",
    checklist: [
      "Receive one-page plan summary",
      "Review the proposed strategy",
      "Consider the investment and timeline",
      "Schedule follow-up if needed",
      "Confirm partnership and begin onboarding"
    ],
    scripts: [],
    resources: [],
    tips: []
  },
  day1: {
    overview: "Welcome to EarnedReach! Day 1 is about getting you set up for success. You'll receive your welcome package, complete a detailed onboarding questionnaire, and schedule your kickoff call.",
    checklist: [
      "Receive welcome email and onboarding hub access",
      "Complete onboarding questionnaire",
      "Review your dedicated onboarding hub",
      "Kickoff call scheduled for Day 2"
    ],
    scripts: [],
    resources: [],
    tips: [
      "Complete the onboarding questionnaire thoroughly—it shapes your entire strategy",
      "Explore your onboarding hub to see what's coming",
      "Prepare any brand assets (logos, colors, fonts) for easy sharing"
    ]
  },
  day2: {
    overview: "Your 60-minute kickoff call is where strategy becomes tangible. We'll review your questionnaire, align on your content strategy for Month 1, and walk through the workflow so you know exactly what to expect.",
    checklist: [
      "60-minute kickoff call",
      "Review your onboarding questionnaire",
      "Receive your Month 1 content strategy",
      "Learn the content production workflow",
      "Understand communication channels (Trello, Slack)",
      "Get answers to all your questions"
    ],
    scripts: [],
    resources: [],
    tips: []
  },
  day3: {
    overview: "System setup day! You'll gain access to your dedicated Trello board, content calendar, and shared cloud storage. Everything is organized and ready for seamless collaboration.",
    checklist: [
      "Access your dedicated Trello board",
      "View your content calendar",
      "Connect to shared cloud storage",
      "Receive access confirmation with all links"
    ],
    scripts: [],
    resources: [],
    tips: []
  },
  day4: {
    overview: "Content ignition! You'll submit your first batch of raw footage, our editing team begins work, and your dedicated Slack channel is set up for real-time communication.",
    checklist: [
      "Upload your first raw footage",
      "Editing team receives and begins work",
      "Join your dedicated Slack channel",
      "Receive progress update",
      "Confirm expected delivery date for first draft"
    ],
    scripts: [],
    resources: [],
    tips: [
      "Film more footage than you think you need—gives us options",
      "Natural, authentic content performs best",
      "Check your Slack channel for quick updates"
    ]
  },
  day5: {
    overview: "First draft delivery! You'll see your first edited video and provide feedback. We include clear guidance on how to give effective feedback to keep revisions efficient.",
    checklist: [
      "Receive your first edited video draft",
      "Review the feedback guidance document",
      "Provide specific, actionable feedback",
      "Understand the revision process (1-2 revisions)",
      "Confirm next steps"
    ],
    scripts: [],
    resources: [],
    tips: [
      "Be specific with feedback: 'Change hook to: [exact text]' works better than 'make it more engaging'",
      "Focus on substance over small details",
      "We include 1-2 revisions to keep things efficient"
    ]
  },
  day6: {
    overview: "Final delivery day! Your polished, final video is ready to publish. We confirm your satisfaction and discuss the regular content cadence going forward.",
    checklist: [
      "Receive final approved video",
      "Confirm satisfaction with quality",
      "Discuss regular content cadence",
      "Plan for upcoming content"
    ],
    scripts: [],
    resources: [],
    tips: []
  },
  day7: {
    overview: "Weekly cadence established! You'll receive your first weekly check-in with performance updates (if your video is live) and the content plan for the upcoming week.",
    checklist: [
      "Receive first weekly check-in email",
      "Review performance update (if video is live)",
      "See content plan for upcoming week",
      "Confirm next touchpoint"
    ],
    scripts: [],
    resources: [],
    tips: []
  },
  production: {
    overview: "Our content production workflow is a repeating cycle: you submit raw footage, our team edits, you review the draft, and we deliver the final version within 48-72 hours. Consistent, efficient, and high-quality.",
    checklist: [
      "Submit raw footage via shared folder",
      "Editing team begins work",
      "Draft delivered within 48-72 hours",
      "Provide feedback within 24 hours",
      "Final version delivered after revisions",
      "Video published and tracked"
    ],
    scripts: [],
    resources: [],
    tips: [
      "Batch your filming sessions to stay ahead",
      "Consistent submission schedule = consistent output",
      "We track performance to inform future content"
    ]
  },
  tracking: {
    overview: "We track your content performance weekly and compile monthly reports showing what's working. This data informs our strategy adjustments and demonstrates the value we're delivering.",
    checklist: [
      "Weekly performance snapshots captured",
      "Data logged in tracking system",
      "Top-performing content identified",
      "Monthly performance report compiled",
      "Findings and recommendations presented"
    ],
    scripts: [],
    resources: [],
    tips: []
  },
  optimization: {
    overview: "The optimization loop is where data becomes action. We use performance insights to refine your content strategy, test new approaches, and maximize your impact.",
    checklist: [
      "Review performance data",
      "Identify what's working and what's not",
      "Test new hooks, formats, or topics",
      "Adjust content calendar based on insights",
      "Communicate changes with clear rationale"
    ],
    scripts: [],
    resources: [],
    tips: []
  },
  month1: {
    overview: "Month 1 is about building momentum. We establish the content engine, deliver consistent quality, and achieve early wins to build confidence and demonstrate value.",
    checklist: [
      "Complete onboarding (Days 1-7)",
      "Deliver 8-12 pieces of content",
      "Establish weekly check-in rhythm",
      "Track initial performance metrics",
      "Celebrate early wins"
    ],
    scripts: [],
    resources: [],
    tips: []
  },
  month2: {
    overview: "Month 2 is about acceleration. We ramp up production, refine strategy based on Month 1 data, and push for measurable growth in your audience and engagement.",
    checklist: [
      "Increase content output (12-16 pieces)",
      "Implement optimizations based on data",
      "Test new content formats or themes",
      "Track growth metrics (followers, engagement, traffic)",
      "Mid-arc strategy review"
    ],
    scripts: [],
    resources: [],
    tips: []
  },
  month3: {
    overview: "Month 3 is about scale and impact. We maximize your reach, engagement, and revenue attribution. At the end, we review your 90-day results and discuss next steps.",
    checklist: [
      "Deliver 16-20 pieces of high-performing content",
      "Focus on revenue-driving content",
      "Compile 90-day performance report",
      "Final strategy review",
      "Discuss options for next phase"
    ],
    scripts: [],
    resources: [],
    tips: []
  }
};
