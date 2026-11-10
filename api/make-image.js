// One-off admin endpoint: generates an illustration via OpenRouter (Gemini image
// model) and stores it in Vercel Blob. Gated by IMAGE_ADMIN_SECRET; returns 404
// without it. GET /api/make-image?id=<id>&secret=<IMAGE_ADMIN_SECRET>
import { put } from "@vercel/blob";

const STYLE =
  "Painterly graphic novel illustration, cinematic lighting, muted earthy palette, detailed, atmospheric. No text, no lettering, no watermark, no border.";

const PROMPTS = {
  "scene-eldoria": `Wide establishing shot: a human noble and an elven ranger negotiating across a stone table at the edge of a vast ancient enchanted forest, colossal trees with faintly glowing bark, morning mist, tense diplomatic atmosphere. ${STYLE}`,
  "scene-generator": `Wide establishing shot: two rival survivor leaders in a tense standoff on opposite sides of a huge rusted industrial generator in a post-apocalyptic settlement at dusk, their followers watching warily from the shadows, storm light on the horizon. ${STYLE}`,
  "scene-mythlandia": `Wide establishing shot: an empty jewelled crown resting on a table between a knight and a robed sage in a torchlit medieval great hall, rival banners hanging, motes of fairy light drifting in a shaft of window light. ${STYLE}`,
  eleniel: `Character portrait, head and shoulders, facing the viewer: an elven ranger with long hair woven with leaves, forest-green cloak, wary watchful expression, dark forest background. ${STYLE}`,
  aric: `Character portrait, head and shoulders, facing the viewer: a young ambitious human noble lord in a fine dark coat with subtle gold trim, calculating but earnest expression, castle study background. ${STYLE}`,
  raven: `Character portrait, head and shoulders, facing the viewer: a hardened post-apocalyptic survivor leader, a woman with a scar and a fur-lined patched jacket, fierce guarded eyes, camp firelight background. ${STYLE}`,
  solara: `Character portrait, head and shoulders, facing the viewer: a thoughtful post-apocalyptic faction leader, a woman in a patched scholar's coat over old university robes, weary but hopeful expression, ruined library background. ${STYLE}`,
  gareth: `Character portrait, head and shoulders, facing the viewer: a broad-shouldered knight with a short beard, worn plate armour, stern honest face, tournament ground background. ${STYLE}`,
  mira: `Character portrait, head and shoulders, facing the viewer: a sage with silver-streaked hair and midnight-blue robes marked with star sigils, serene piercing gaze, temple candlelight background. ${STYLE}`,
};

export default async function handler(req, res) {
  const secret = String(req.query.secret || "");
  if (!process.env.IMAGE_ADMIN_SECRET || secret !== process.env.IMAGE_ADMIN_SECRET) {
    return res.status(404).json({ error: "Not found" });
  }
  const id = String(req.query.id || "");
  const prompt = PROMPTS[id];
  if (!prompt) return res.status(400).json({ error: "Unknown id", ids: Object.keys(PROMPTS) });

  try {
    const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_IMAGE_MODEL || "google/gemini-2.5-flash-image",
        modalities: ["image", "text"],
        messages: [{ role: "user", content: prompt }],
      }),
    });
    if (!r.ok) {
      const detail = await r.text().catch(() => "");
      return res.status(502).json({ error: `generation failed (${r.status})`, detail: detail.slice(0, 400) });
    }
    const data = await r.json();
    const img = data?.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    if (!img || !img.startsWith("data:image")) {
      return res.status(502).json({ error: "no image in response", detail: JSON.stringify(data).slice(0, 400) });
    }
    const m = img.match(/^data:(image\/[a-z.+-]+);base64,(.+)$/s);
    if (!m) return res.status(502).json({ error: "unexpected image format" });
    const buf = Buffer.from(m[2], "base64");
    const ext = m[1].includes("png") ? "png" : m[1].includes("webp") ? "webp" : "jpg";
    const blob = await put(`conflict-game/${id}.${ext}`, buf, {
      access: "public",
      contentType: m[1],
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    return res.status(200).json({ ok: true, id, url: blob.url, bytes: buf.length });
  } catch (e) {
    return res.status(502).json({ error: String(e).slice(0, 300) });
  }
}
