import { SCENARIOS, METHODS } from "../game/scenarios.js";

// GET /api/reveal?scenario=eldoria -> the keyed methods, unlock conditions,
// design solution and debrief questions. Used by the end-of-round reveal
// screen and the facilitator view. GET /api/reveal?scenario=all for everything.

export default function handler(req, res) {
  const id = String(req.query.scenario || "");
  const pack = (scn) => ({
    id: scn.id,
    title: scn.title,
    keyedMethods: scn.keyed.map((k) => {
      const m = METHODS.find((x) => x.id === k);
      return { id: m.id, emoji: m.emoji, name: m.name };
    }),
    unlocks: scn.unlocks.map((u) => ({ id: u.id, label: u.label, detail: u.signal })),
    solution: scn.solution,
    debrief: scn.debrief,
  });

  if (id === "all") {
    return res.status(200).json({ scenarios: Object.values(SCENARIOS).map(pack) });
  }
  const scn = SCENARIOS[id];
  if (!scn) return res.status(400).json({ error: "Unknown scenario" });
  return res.status(200).json(pack(scn));
}
