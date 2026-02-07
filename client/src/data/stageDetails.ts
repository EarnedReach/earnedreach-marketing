export interface StageDetail {
  id: string;
  overview: string;
  checklist: string[];
  scripts: {
    title: string;
    content: string;
  }[];
  resources: {
    title: string;
    url: string;
    description: string;
  }[];
  tips: string[];
}

export const stageDetails: Record<string, StageDetail> = {
  // Discovery & Sales
  typeform: {
    id: "typeform",
    overview: "The Typeform submission is the first touchpoint where prospects share their business goals, content needs, and current challenges. This data becomes the foundation for the entire discovery process.",
    checklist: [
      "Prospect completes Typeform with business details",
      "System sends automatic confirmation email",
      "Founder receives notification with responses",
      "Initial qualification check (budget, timeline, fit)",
      "Schedule pre-call strategy session"
    ],
    scripts: [
      {
        title: "Typeform Confirmation Email",
        content: "Hi [Name],\n\nThank you for completing our strategy questionnaire! We've received your submission and are excited to learn more about [Company Name].\n\nOur team is reviewing your responses and will reach out within 24 hours to schedule a discovery call.\n\nIn the meantime, feel free to check out our client success stories at [link].\n\nBest,\nEarnedReach Team"
      }
    ],
    resources: [
      {
        title: "Typeform Template",
        url: "#",
        description: "The actual Typeform questionnaire used for lead qualification"
      },
      {
        title: "CRM Entry Template",
        url: "#",
        description: "How to log new leads in your CRM system"
      }
    ],
    tips: [
      "Review Typeform responses within 2 hours to show responsiveness",
      "Look for red flags: unrealistic budgets, unclear goals, misaligned expectations",
      "Note specific pain points mentioned—these become talking points in the discovery call"
    ]
  },
  precall: {
    id: "precall",
    overview: "Pre-call preparation is where you transform raw Typeform data into a strategic framework. This 30-minute internal session ensures the discovery call is focused, valuable, and positions you as a strategic partner.",
    checklist: [
      "Review all Typeform responses thoroughly",
      "Research the prospect's brand and current content",
      "Identify 3 key pain points from their responses",
      "Draft initial strategy framework (content pillars, themes)",
      "Prepare 5 discovery questions to ask",
      "Review pricing and package options",
      "Prepare objection handling responses"
    ],
    scripts: [
      {
        title: "Pre-Call Research Checklist",
        content: "1. LinkedIn profile review\n2. Current social media presence audit\n3. Website content review\n4. Competitor analysis (2-3 similar brands)\n5. Note any recent news or announcements\n6. Identify content gaps and opportunities"
      }
    ],
    resources: [
      {
        title: "Strategy Framework Template",
        url: "#",
        description: "Template for drafting initial content strategy"
      },
      {
        title: "Discovery Questions Bank",
        url: "#",
        description: "Library of strategic questions organized by topic"
      }
    ],
    tips: [
      "Spend 20 minutes on research, 10 minutes on strategy draft",
      "Focus on their specific industry and audience",
      "Prepare 2-3 quick wins you can mention to build credibility"
    ]
  },
  call: {
    id: "call",
    overview: "The discovery call is a 45-60 minute strategic conversation that qualifies the lead, demonstrates your expertise, and presents the 90-day growth arc. Follow the 5-step framework to maintain structure while staying conversational.",
    checklist: [
      "Introduction & rapport building (5 min)",
      "Clarify Typeform responses and ask discovery questions (15 min)",
      "Summarize pain points and opportunities (10 min)",
      "Present 90-day growth arc and pricing (15 min)",
      "Handle objections and answer questions (10 min)",
      "Close or schedule follow-up (5 min)"
    ],
    scripts: [
      {
        title: "Opening Script",
        content: "Thanks for taking the time today, [Name]. I've reviewed your Typeform responses and I'm excited about what we could build together.\n\nBefore we dive in, I want to make sure this is valuable for you. My goal is to understand your content challenges, share how we've helped similar brands, and see if there's a fit.\n\nSound good? Great—let's start with..."
      },
      {
        title: "Pricing Presentation",
        content: "Here's how we structure partnerships:\n\n90-Day Growth Arc: £1,500/month + 5-10% revenue share\n- Includes strategy, content direction, professional editing, traffic ownership, and optimization\n- We're aligned on your success through the revenue share\n\nMonth-to-month option: £2,000/month (we prefer the 90-day commitment for better results)\n\nAfter 90 days, we can move to optimization mode (£1,000-£1,200) or scale mode (£1,500+) depending on your goals."
      },
      {
        title: "Objection: \"That's expensive\"",
        content: "I understand. Let me break down what you're getting:\n\n- Full strategy and content direction (typically £2-3K/month with an agency)\n- Professional video editing (£500-800/month if outsourced)\n- Performance tracking and optimization (£1K+/month for a growth manager)\n- Plus, we're taking revenue share risk with you—we only win when you win.\n\nYou're essentially getting a full content team for less than one hire, with zero management overhead."
      },
      {
        title: "Objection: \"I need to think about it\"",
        content: "Absolutely, this is an important decision. Can I ask—what specifically do you need to think through? Is it budget, timing, or something about the approach?\n\n[Listen, then address specific concern]\n\nHere's what I suggest: I'll send you a one-page summary of our conversation and the plan we discussed. Take 48 hours to review, and let's schedule a 15-minute follow-up to answer any remaining questions. Does that work?"
      }
    ],
    resources: [
      {
        title: "Full Discovery Call Script",
        url: "#",
        description: "Complete script with all 5 sections and transitions"
      },
      {
        title: "Objection Handling Guide",
        url: "#",
        description: "Responses to 15 common objections"
      },
      {
        title: "Pricing Calculator",
        url: "#",
        description: "Tool to calculate custom pricing based on scope"
      }
    ],
    tips: [
      "Listen more than you talk—aim for 60/40 prospect/you",
      "Take notes on specific phrases they use (mirror their language in proposals)",
      "If they're not qualified, be honest early—saves everyone time",
      "Always end with a clear next step, never \"I'll follow up soon\""
    ]
  },
  postcall: {
    id: "postcall",
    overview: "The post-call summary is your opportunity to reinforce value, address any lingering concerns, and make it easy for the prospect to say yes. Send this within 2 hours of the call while the conversation is fresh.",
    checklist: [
      "Send one-page plan summary within 2 hours",
      "Include personalized strategy highlights from the call",
      "Attach pricing breakdown and next steps",
      "Set follow-up reminder for 48 hours",
      "Update CRM with call notes and status",
      "Prepare onboarding materials if close is likely"
    ],
    scripts: [
      {
        title: "Post-Call Email",
        content: "Hi [Name],\n\nGreat conversation today! I'm excited about the potential to help [Company Name] achieve [specific goal mentioned].\n\nAs promised, here's a one-page summary of what we discussed:\n\n**Your Current Challenge:**\n[Pain point 1, pain point 2]\n\n**Our 90-Day Growth Arc:**\nMonth 1: [Foundation focus]\nMonth 2: [Acceleration focus]\nMonth 3: [Scale focus]\n\n**Investment:**\n£1,500/month + 5-10% revenue share (90-day commitment)\n\n**Next Steps:**\n1. Review this summary\n2. [Any specific action item from call]\n3. Let's connect [specific date/time] to finalize\n\nQuestions before then? Just reply to this email.\n\nLooking forward to partnering with you!\n\n[Your Name]"
      }
    ],
    resources: [
      {
        title: "One-Page Plan Template",
        url: "#",
        description: "Editable template for post-call summaries"
      },
      {
        title: "Proposal Template",
        url: "#",
        description: "Formal proposal document if needed"
      }
    ],
    tips: [
      "Personalize every summary—no generic templates",
      "Reference specific moments from the call to show you were listening",
      "Make the next step crystal clear (date, time, action)",
      "If they go dark after 48 hours, send one follow-up then move on"
    ]
  },

  // Client Onboarding (Days 1-7)
  day1: {
    id: "day1",
    overview: "Day 1 sets the tone for the entire partnership. The goal is to make the client feel welcomed, organized, and excited about the journey ahead.",
    checklist: [
      "Send personalized welcome email",
      "Share link to onboarding hub (Notion page)",
      "Send detailed onboarding questionnaire",
      "Schedule 60-minute kickoff call for Day 2",
      "Add client to internal project tracker"
    ],
    scripts: [
      {
        title: "Welcome Email",
        content: "Welcome to EarnedReach, [Name]! 🎉\n\nWe're thrilled to partner with you on [Company Name]'s growth journey.\n\nHere's what happens next:\n\n**Today:**\n- Complete the onboarding questionnaire (link below)\n- Review your dedicated onboarding hub\n\n**Tomorrow:**\n- 60-minute kickoff call to align on strategy\n\n**This Week:**\n- System setup (Trello, Slack, shared folders)\n- First content delivery\n\n[Link to Onboarding Hub]\n[Link to Questionnaire]\n\nQuestions? Reply to this email anytime.\n\nLet's build something great together!\n\n[Your Name]"
      }
    ],
    resources: [
      {
        title: "Onboarding Hub Template",
        url: "#",
        description: "Notion template with all onboarding information"
      },
      {
        title: "Onboarding Questionnaire",
        url: "#",
        description: "Detailed form for brand assets and preferences"
      }
    ],
    tips: [
      "Send welcome email within 1 hour of contract signing",
      "Make the onboarding hub visually appealing—first impressions matter",
      "Keep the questionnaire focused (15-20 questions max)"
    ]
  },
  day2: {
    id: "day2",
    overview: "The kickoff call is where strategy becomes tangible. You'll review the questionnaire, align on the 90-day arc, and explain the workflow so everyone knows what to expect.",
    checklist: [
      "Conduct 60-minute kickoff call",
      "Review onboarding questionnaire responses",
      "Present detailed content strategy for Month 1",
      "Explain content production workflow",
      "Walk through communication channels (Trello, Slack)",
      "Answer all questions and confirm next steps"
    ],
    scripts: [
      {
        title: "Kickoff Call Agenda",
        content: "1. Welcome & Introductions (5 min)\n2. Review Questionnaire Responses (15 min)\n3. Present Month 1 Content Strategy (20 min)\n4. Explain Workflow & Tools (15 min)\n5. Q&A & Next Steps (5 min)"
      }
    ],
    resources: [
      {
        title: "Kickoff Call Presentation",
        url: "#",
        description: "Slide deck template for kickoff calls"
      }
    ],
    tips: [
      "Record the call (with permission) for internal reference",
      "Share screen to walk through tools visually",
      "End with clear action items for both sides"
    ]
  },
  day3: {
    id: "day3",
    overview: "System setup day. Grant access to all tools and shared spaces so the client can see their content pipeline in action.",
    checklist: [
      "Create dedicated Trello board for client",
      "Share content calendar (Google Sheets)",
      "Set up shared Google Drive folders (raw footage, final videos)",
      "Send access confirmation email with all links",
      "Test all access permissions"
    ],
    scripts: [],
    resources: [
      {
        title: "Trello Board Template",
        url: "#",
        description: "Pre-built Trello board structure"
      },
      {
        title: "Content Calendar Template",
        url: "#",
        description: "Google Sheets template for content planning"
      }
    ],
    tips: [
      "Use consistent naming conventions across all tools",
      "Create a \"How to Use\" guide for each tool",
      "Double-check permissions before sending access email"
    ]
  },
  day4: {
    id: "day4",
    overview: "Content ignition! The client submits their first raw footage and the editing team begins work. This is where the partnership becomes real.",
    checklist: [
      "Client uploads first batch of raw footage",
      "Editor receives footage and begins editing",
      "Create dedicated Slack channel for real-time communication",
      "Send progress update to client",
      "Confirm expected delivery date for first draft"
    ],
    scripts: [
      {
        title: "Footage Received Confirmation",
        content: "Got your footage, [Name]! 🎬\n\nOur editing team is diving in now. You'll see the first draft on Day 5.\n\nIn the meantime, we've created a dedicated Slack channel for quick questions and updates: [link]\n\nExcited to bring this to life!"
      }
    ],
    resources: [],
    tips: [
      "Acknowledge footage receipt immediately",
      "Set realistic expectations for turnaround time",
      "Use Slack for quick updates, email for formal deliveries"
    ]
  },
  day5: {
    id: "day5",
    overview: "First draft delivery. This is a critical moment—the client sees the quality of your work for the first time. Include clear feedback guidance to keep revisions efficient.",
    checklist: [
      "Deliver first edited video draft",
      "Provide feedback guidance document",
      "Explain revision process (1-2 revisions max)",
      "Set deadline for feedback (24 hours)",
      "Confirm next steps"
    ],
    scripts: [
      {
        title: "Draft Delivery Email",
        content: "Your first video is ready! 🎥\n\n[Link to draft]\n\nPlease review and share your feedback by [date]. Here's how to give effective feedback:\n\n✅ DO: \"Change hook to: [specific text]\"\n✅ DO: \"Make the transition at 0:15 faster\"\n❌ DON'T: \"Make it more engaging\" (too vague)\n\nWe include 1-2 rounds of revisions to keep things efficient. Final version coming on Day 6!\n\nThoughts?"
      }
    ],
    resources: [
      {
        title: "Feedback Guide",
        url: "#",
        description: "How to give clear, actionable feedback"
      }
    ],
    tips: [
      "Deliver drafts early in the day so clients have time to review",
      "Preempt vague feedback by providing examples",
      "Be firm on revision limits to avoid scope creep"
    ]
  },
  day6: {
    id: "day6",
    overview: "Final delivery day. Incorporate feedback and deliver the polished final version. Confirm the client is satisfied and ready for regular cadence.",
    checklist: [
      "Incorporate client feedback",
      "Deliver final approved video",
      "Confirm client satisfaction",
      "Discuss regular content cadence going forward",
      "Celebrate the first win!"
    ],
    scripts: [
      {
        title: "Final Delivery Email",
        content: "Final version is ready! 🚀\n\n[Link to final video]\n\nThis one's ready to publish. Let us know when it goes live so we can track performance.\n\nNow that we've completed the first piece, here's the cadence for the rest of the month:\n[Outline schedule]\n\nExcited to keep the momentum going!"
      }
    ],
    resources: [],
    tips: [
      "Ask for explicit approval before marking as final",
      "Remind client to share publish date for tracking",
      "Use this win to reinforce confidence in the partnership"
    ]
  },
  day7: {
    id: "day7",
    overview: "Weekly cadence established. Send the first weekly check-in to set the rhythm for ongoing communication and performance tracking.",
    checklist: [
      "Send first weekly check-in email",
      "Include performance update if video is live",
      "Outline content plan for upcoming week",
      "Address any outstanding questions",
      "Confirm next touchpoint"
    ],
    scripts: [
      {
        title: "Weekly Check-In Email",
        content: "Week 1 complete! 📊\n\n**This Week:**\n- ✅ First video delivered and live\n- ✅ Systems set up and running\n\n**Performance (if live):**\n- Views: [number]\n- Engagement rate: [percentage]\n- Link clicks: [number]\n\n**Next Week:**\n- Video 2: [topic]\n- Video 3: [topic]\n\n**Questions or feedback?**\nReply here or ping us in Slack.\n\nLet's keep building!"
      }
    ],
    resources: [],
    tips: [
      "Send weekly check-ins on the same day/time each week",
      "Keep updates concise but data-driven",
      "Always include a forward-looking section"
    ]
  },

  // Content Engine
  production: {
    id: "production",
    overview: "The content production workflow is a repeating cycle: raw footage → editing → draft → final delivery. Consistency and efficiency are key to scaling.",
    checklist: [
      "Client submits raw footage via shared folder",
      "Editor receives notification and begins work",
      "Draft delivered within 48-72 hours",
      "Client provides feedback within 24 hours",
      "Final version delivered after 1-2 revisions",
      "Video published and tracked"
    ],
    scripts: [],
    resources: [
      {
        title: "Editor SOP",
        url: "#",
        description: "Standard operating procedure for video editors"
      },
      {
        title: "Content Production Tracker",
        url: "#",
        description: "Spreadsheet to track all videos in production"
      }
    ],
    tips: [
      "Batch similar content to improve editor efficiency",
      "Use templates for recurring video formats",
      "Track turnaround times to identify bottlenecks"
    ]
  },
  tracking: {
    id: "tracking",
    overview: "Performance tracking turns content into data. Weekly snapshots and monthly reports show what's working and inform strategic adjustments.",
    checklist: [
      "Capture weekly performance snapshots (views, engagement, clicks)",
      "Log data in performance tracking spreadsheet",
      "Identify top-performing content and patterns",
      "Compile monthly performance report",
      "Present findings and recommendations to client"
    ],
    scripts: [],
    resources: [
      {
        title: "Performance Tracking Spreadsheet",
        url: "#",
        description: "Template for logging weekly metrics"
      },
      {
        title: "Monthly Report Template",
        url: "#",
        description: "Professional report format for clients"
      }
    ],
    tips: [
      "Track metrics consistently (same day/time each week)",
      "Look for patterns, not just individual video performance",
      "Use data to tell a story, not just report numbers"
    ]
  },
  optimization: {
    id: "optimization",
    overview: "The optimization loop is where data becomes action. Use performance insights to refine content strategy, improve messaging, and maximize impact.",
    checklist: [
      "Review performance data from tracking",
      "Identify underperforming content themes",
      "Test new hooks, formats, or topics",
      "Adjust content calendar based on insights",
      "Communicate changes to client with rationale"
    ],
    scripts: [],
    resources: [
      {
        title: "Optimization Framework",
        url: "#",
        description: "Step-by-step guide for data-driven optimization"
      }
    ],
    tips: [
      "Make one change at a time to isolate impact",
      "Test for at least 2-3 weeks before drawing conclusions",
      "Always explain the 'why' behind changes to clients"
    ]
  },

  // 90-Day Growth Arc
  month1: {
    id: "month1",
    overview: "Month 1 is about foundation and momentum. Establish the content engine, deliver consistent quality, and achieve early wins to build confidence.",
    checklist: [
      "Complete onboarding (Days 1-7)",
      "Deliver 8-12 pieces of content",
      "Establish weekly check-in cadence",
      "Track initial performance metrics",
      "Identify quick wins and celebrate them"
    ],
    scripts: [],
    resources: [],
    tips: [
      "Focus on consistency over perfection in Month 1",
      "Celebrate small wins to build client confidence",
      "Use this month to learn the client's voice and preferences"
    ]
  },
  month2: {
    id: "month2",
    overview: "Month 2 is about acceleration and optimization. Ramp up production, refine strategy based on Month 1 data, and push for measurable growth.",
    checklist: [
      "Increase content output (12-16 pieces)",
      "Implement optimizations based on Month 1 data",
      "Test new content formats or themes",
      "Track growth metrics (followers, engagement, traffic)",
      "Conduct mid-arc strategy review with client"
    ],
    scripts: [],
    resources: [],
    tips: [
      "This is where momentum builds—stay aggressive",
      "Use A/B testing to validate optimization hypotheses",
      "Prepare for Month 3 by identifying scale opportunities"
    ]
  },
  month3: {
    id: "month3",
    overview: "Month 3 is about scale and impact. Maximize reach, engagement, and revenue attribution. Prepare for post-90-day decision: optimization mode or scale mode.",
    checklist: [
      "Deliver 16-20 pieces of high-performing content",
      "Focus on revenue-driving content (CTAs, lead magnets)",
      "Compile 90-day performance report",
      "Conduct final strategy review with client",
      "Present options for next phase (optimization or scale)"
    ],
    scripts: [
      {
        title: "90-Day Review Presentation",
        content: "**90-Day Results:**\n- Content delivered: [number]\n- Audience growth: [percentage]\n- Engagement rate: [percentage]\n- Revenue attributed: [amount]\n\n**What's Next?**\nOption 1: Optimization Mode (£1,000-£1,200/month)\n- Maintain current output with refined strategy\n\nOption 2: Scale Mode (£1,500+/month)\n- Increase output and expand to new platforms\n\nWhich makes sense for your goals?"
      }
    ],
    resources: [],
    tips: [
      "Make the 90-day report visually impressive—this is your proof of value",
      "Frame the next phase decision around their goals, not your preference",
      "If results are strong, this is when you discuss long-term retainer"
    ]
  }
};
