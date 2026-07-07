import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: "OpenAI API key not configured. Add OPENAI_API_KEY to Vercel environment variables." });
  }

  const {
    clientName,
    industry,
    targetAudience,
    currentFollowers,
    mainGoal,
    tone,
    competitors,
    upcomingEvents,
    contentConstraints,
    usp,
    monthlyBudget,
  } = req.body;

  if (!clientName || !industry) {
    return res.status(400).json({ error: "clientName and industry are required" });
  }

  const prompt = `You are a senior content strategist at a premium creative agency. Generate a detailed, specific, and actionable content strategy brief for the following client. Avoid generic advice — every recommendation must be tailored to this specific client's context.

CLIENT INTAKE:
- Client name: ${clientName}
- Industry / niche: ${industry}
- Target audience: ${targetAudience || "Not specified"}
- Current social following: ${currentFollowers || "Not specified"}
- Primary goal: ${mainGoal || "Not specified"}
- Desired tone / style: ${tone || "Not specified"}
- Competitors or brands they admire: ${competitors || "Not specified"}
- Upcoming events or launches: ${upcomingEvents || "None"}
- Content constraints (camera-shy, limited budget, etc.): ${contentConstraints || "None"}
- Unique selling point: ${usp || "Not specified"}
- Monthly content budget: ${monthlyBudget || "Not specified"}

Generate a full content strategy brief with the following sections:
1. Brand Overview & Opportunity (2-3 sentences specific to this client)
2. Target Audience Profile (specific demographics, psychographics, pain points)
3. Content Pillars (3-4 pillars with name, description, % of output, and 3 specific content ideas each)
4. Content Volume & Cadence (specific formats, frequency, purpose — as a table)
5. Tone & Style Guide (voice, visual style, copy approach)
6. Platform Strategy (which platforms to prioritise and why, given this client)
7. First 30 Days Action Plan (specific first pieces to create, in priority order)
8. Success Metrics (specific KPIs for 30/60/90 days)

Format the output in clean Markdown. Be specific, opinionated, and direct. Do not use filler phrases or generic marketing language.`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a senior content strategist at a premium creative agency. You write specific, actionable strategies — never generic. You write in clean Markdown.",
          },
          { role: "user", content: prompt },
        ],
        max_tokens: 2000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const err = await response.json() as { error?: { message?: string } };
      return res.status(response.status).json({ error: err?.error?.message || "OpenAI request failed" });
    }

    const data = await response.json() as { choices: { message: { content: string } }[] };
    const strategy = data.choices?.[0]?.message?.content || "";
    return res.status(200).json({ strategy });
  } catch (err) {
    console.error("Strategy generation error:", err);
    return res.status(500).json({ error: "Failed to generate strategy. Please try again." });
  }
}
