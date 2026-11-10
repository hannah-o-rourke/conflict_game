// GET /api/health -> checks the OpenRouter key works with a tiny model call.
const MODEL = process.env.OPENROUTER_MODEL || "anthropic/claude-sonnet-4.5";

export default async function handler(req, res) {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) return res.status(200).json({ ok: false, reason: "OPENROUTER_API_KEY not set" });
  try {
    const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 10,
        messages: [{ role: "user", content: "Reply with the single word: ready" }],
      }),
    });
    if (!r.ok) {
      const detail = await r.text().catch(() => "");
      return res.status(200).json({ ok: false, status: r.status, detail: detail.slice(0, 300) });
    }
    const data = await r.json();
    return res.status(200).json({
      ok: true,
      model: MODEL,
      sample: data?.choices?.[0]?.message?.content?.slice(0, 40) || "",
    });
  } catch (e) {
    return res.status(200).json({ ok: false, detail: String(e).slice(0, 200) });
  }
}
