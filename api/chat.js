import { SCENARIOS, buildSystemPrompt } from "../game/scenarios.js";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = process.env.OPENROUTER_MODEL || "anthropic/claude-sonnet-4.5";

function extractJson(text) {
  if (!text) return null;
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  try {
    return JSON.parse(text.slice(start, end + 1));
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "POST only" });
  }
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) return res.status(500).json({ error: "Server is missing OPENROUTER_API_KEY" });

  const { scenario, history = [], message, method, unlocked = [], openness = 25 } = req.body || {};
  const scn = SCENARIOS[scenario];
  if (!scn) return res.status(400).json({ error: "Unknown scenario" });
  if (typeof message !== "string" || !message.trim()) return res.status(400).json({ error: "Empty message" });
  if (message.length > 900) return res.status(400).json({ error: "Message too long (900 characters max)" });

  const safeUnlocked = Array.isArray(unlocked)
    ? unlocked.filter((id) => scn.unlocks.some((u) => u.id === id))
    : [];
  const safeOpenness = Math.max(0, Math.min(100, Number(openness) || 25));

  const system = buildSystemPrompt(scn, safeUnlocked, safeOpenness, method);

  // Rebuild the conversation. Keep the last 24 turns to bound cost.
  const convo = [];
  for (const turn of history.slice(-24)) {
    if (!turn || typeof turn.content !== "string") continue;
    if (turn.role === "player") {
      convo.push({ role: "user", content: `[Approach played: ${turn.method || "none"}] ${turn.content.slice(0, 900)}` });
    } else if (turn.role === "character") {
      convo.push({ role: "assistant", content: turn.content.slice(0, 1200) });
    }
  }
  convo.push({ role: "user", content: `[Approach played: ${methodName(method)}] ${message.trim()}` });

  try {
    const r = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://conflict-game.vercel.app",
        "X-Title": "Conflicts & Politics",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 700,
        temperature: 0.8,
        messages: [{ role: "system", content: system }, ...convo],
      }),
    });

    if (!r.ok) {
      const detail = await r.text().catch(() => "");
      return res.status(502).json({ error: `Model call failed (${r.status})`, detail: detail.slice(0, 300) });
    }
    const data = await r.json();
    const raw = data?.choices?.[0]?.message?.content || "";
    const parsed = extractJson(raw);

    if (!parsed || typeof parsed.reply !== "string") {
      // Fall back to treating the whole output as the reply.
      return res.status(200).json({
        reply: raw.trim().slice(0, 1500) || "…",
        newlyUnlocked: [],
        opennessDelta: 0,
        agreement: false,
      });
    }

    const newlyUnlocked = Array.isArray(parsed.unlocked)
      ? parsed.unlocked.filter((id) => scn.unlocks.some((u) => u.id === id) && !safeUnlocked.includes(id))
      : [];
    const delta = Math.max(-10, Math.min(12, Math.round(Number(parsed.openness_delta) || 0)));
    const allDone = scn.unlocks.every((u) => safeUnlocked.includes(u.id) || newlyUnlocked.includes(u.id));
    const agreement = Boolean(parsed.agreement) && allDone;

    return res.status(200).json({
      reply: parsed.reply.trim().slice(0, 1500),
      newlyUnlocked,
      opennessDelta: delta,
      agreement,
    });
  } catch (e) {
    return res.status(502).json({ error: "Could not reach the model", detail: String(e).slice(0, 200) });
  }
}

function methodName(id) {
  const names = {
    1: "Get concrete about interests",
    2: "Separate minimal from substantial",
    3: "Go process by process",
    4: "Think creatively about legitimacy",
    5: "Shared purpose or shared enemy",
    6: "Coalition of the willing",
    7: "Repair the relational",
    8: "Feelings and proxies",
    9: "Utilise stories",
    10: "Harness symbolic ambiguity",
  };
  return names[Number(id)] || "none";
}
