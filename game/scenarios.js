// Shared game data: methods, scenarios, hidden unlock conditions, prompts.
// This file runs server-side only. The hidden conditions never ship to the client
// except through /api/reveal (the end-of-round reveal and facilitator view).

export const METHODS = [
  { id: 1,  emoji: "🪨", name: "Get concrete about interests", blurb: "Swap values talk for specific, nameable asks." },
  { id: 2,  emoji: "🗂️", name: "Separate minimal from substantial", blurb: "Work out what is actually worth fighting for, and let the rest go." },
  { id: 3,  emoji: "🪜", name: "Go process by process", blurb: "Start with one small agreement instead of solving everything at once." },
  { id: 4,  emoji: "🎭", name: "Think creatively about legitimacy", blurb: "Legitimacy beyond votes: custom, trust, design, charisma." },
  { id: 5,  emoji: "🧭", name: "Shared purpose or shared enemy", blurb: "Construct a reason the group needs to cooperate." },
  { id: 6,  emoji: "👋", name: "Coalition of the willing", blurb: "Just do the thing with the people willing to do it." },
  { id: 7,  emoji: "🤝", name: "Repair the relational", blurb: "Rebuild the human relationship before the deal." },
  { id: 8,  emoji: "🔍", name: "Feelings and proxies", blurb: "Name what the fight is really about underneath." },
  { id: 9,  emoji: "📖", name: "Utilise stories", blurb: "Use narrative and history to move people forward." },
  { id: 10, emoji: "🔣", name: "Harness symbolic ambiguity", blurb: "A constructive fudge both sides can live with." },
];

export const SCENARIOS = {
  eldoria: {
    id: "eldoria",
    title: "The Enchanted Forest",
    kind: "Resource conflict",
    accent: "#7fb069",
    tagline: "A dispute mired in historical claims and abstract rights.",
    setting:
      "The Kingdom of Eldoria disputes the Enchanted Forest with the Elven Kingdom. The forest is rich in resources, including the bark of ancient trees that could power scientific advancement. The debate so far has been stuck on who the land really belongs to.",
    playerRole: {
      name: "Lord Aric",
      brief:
        "You are Lord Aric of the Eldorian Council. You want your legacy to be bringing science and progress to your people, and the ancient bark is the key. Your father and your council are watching. Legally, the land is human land. But the elves do not recognise that, and pushing the point has got you nowhere for months.",
    },
    aiRole: { name: "Eleniel", faction: "Ranger of the Elven Kingdom", sigil: "tree" },
    opener:
      "You summoned me, Lord Aric, so speak plainly. My people believe your council sees only timber and bark where we see a living ancestor. The treaty says we live under your protection, but the forest was ours before your kingdom had a name. Tell me why this conversation will be different from the last three.",
    timerMinutes: 10,
    keyed: [1, 2],
    unlocks: [
      {
        id: "u1",
        label: "Name a concrete arrangement",
        signal:
          "The players stop arguing about rights, ownership or history and put a specific, practical proposal on the table: harvesting zones, quotas, seasons, which trees, how much bark, who oversees it.",
      },
      {
        id: "u2",
        label: "Protect the forest's future",
        signal:
          "The players address the forest's long-term survival in concrete terms: regeneration guarantees, joint management, elven oversight of harvesting, or a shared patrol against external threats such as loggers and poachers.",
      },
    ],
    persona:
      "You are Eleniel, an elven ranger raised in the heart of the forest, which you see as a sacred, living entity. You know its ecology and history better than anyone alive. Though the humans legally own the land, you do not recognise their right to it or the system behind it. The treaty lets the elves keep their own governance under human protection, and the elven kingdom has sent you with orders not to compromise or share knowledge.",
    resistance:
      "You stonewall anything abstract: legal ownership claims, appeals to progress, flattery, talk of 'rights' on either side. The elven kingdom has ordered you not to compromise or share knowledge, so you also bristle at being asked to simply hand things over. But in your heart you know the forest's long-term protection requires a deal with the humans, so when they get specific and practical, you engage seriously and test the detail.",
    tech:
      "TOOLS OF THIS WORLD the players may build proposals from: a treaty archive kept under both kingdoms' seals, boundary stones that mark old agreements, scribes in both courts, rangers who know every path.",
    closing:
      "Once both breakthroughs are made and the players state a complete practical arrangement (what is harvested, under what limits, and how the forest is protected), you press one final question before accepting: how will this be recorded, and who watches it? A handshake is not enough. You accept only when the players name the mechanism that carries the agreement, for example a sealed entry in the treaty archive, a joint register of harvested bark, marked boundary stones, or a shared patrol rota, and elves must oversee the harvesting.",
    solution:
      "The design intent: players must shift from abstract claims to concrete solutions like joint forest management, delineated harvesting zones, and a shared patrol to protect the forest from external threats. Practical, mutually beneficial arrangements beat arguments about abstract rights. And the deal only counts once it lives in a mechanism both sides can see working: a register, a seal, a rota. Technology with legitimacy designed in.",
    debrief: [
      "How long did you spend at the values level before someone got concrete?",
      "What was minimal here and what was substantial, for each side?",
      "Where in your own governance module are you arguing about rights when you could be designing an arrangement?",
    ],
  },

  generator: {
    id: "generator",
    title: "The Generator",
    kind: "Factional conflict",
    accent: "#d96c3f",
    tagline: "Two factions, one machine, three weeks, and blood in the past.",
    setting:
      "In a ravaged world, the Phoenix and Tiger Claw factions have both found an old generator that could bring back electricity. Phoenix has a scientist who can make it work; Tiger Claw has a mechanic who can get it started. The two groups have fought over food before, and people died. The generator's battery becomes useless in three weeks, and a better-armed faction called Dynamite is getting closer.",
    playerRole: {
      name: "Solara",
      brief:
        "You lead Phoenix, a faction of former academics. You took over from a more ruthless leader and you carry guilt about the violence and trickery your people used in the early days. You want to work with Tiger Claw and their mechanic, and you hope the generator could start a new society. But you know they do not trust you, and you know why.",
    },
    aiRole: { name: "Raven", faction: "Leader of Tiger Claw", sigil: "claw" },
    opener:
      "You have got nerve coming here, Phoenix. That generator sits on our ground and our mechanic found it. And the last time your people and mine stood this close, I buried my partner. Half my camp wants me to take your scientist by force and be done with it. You have one minute to tell me why I should not.",
    timerMinutes: 10,
    keyed: [3, 5, 7, 8],
    unlocks: [
      {
        id: "u1",
        label: "Acknowledge the harm",
        signal:
          "The players sincerely acknowledge the killing of Raven's partner and Phoenix's past violence, without excuses, justifications or 'we both did things'. Taking responsibility, expressing genuine remorse, or naming her loss directly all count.",
      },
      {
        id: "u2",
        label: "Surface the shared threat or purpose",
        signal:
          "The players invoke something the two factions genuinely share as a reason to cooperate: the approaching Dynamite faction, the three-week battery deadline, or the future the generator makes possible for both communities.",
      },
      {
        id: "u3",
        label: "Propose one small first step",
        signal:
          "Instead of a grand bargain, the players propose a limited, verifiable first agreement: a joint watch against Dynamite, a supervised technical visit, an exchange of observers, a ceasefire for the three weeks. Something small that can be checked.",
      },
    ],
    persona:
      "You are Raven, leader of Tiger Claw, a faction of people who all lived in the same town before the collapse and are fiercely loyal to you. Your partner was killed by Phoenix early on, and the loss made you hard and guarded. Half your camp wants to take the Phoenix scientist by force. Your weapons are worse than theirs, which you never admit.",
    resistance:
      "You reject grand bargains, power-sharing plans and constitutions outright; trust does not exist yet. You go cold or fierce if told to 'move on', 'be rational' or 'put the past behind us'. Technical arguments about the generator bounce off you until the human damage has been faced. You never reveal that your weapons are worse than theirs, and you deflect with aggression when you feel weak. When players face the past honestly, name what is really driving the fight, or offer something small and checkable, you soften a step at a time.",
    tech:
      "TOOLS OF THIS WORLD the players may build proposals from: salvaged two-way radios on a shared frequency nobody uses, a generator shed that can take two locks, scouts who watch the roads.",
    closing:
      "Once all three breakthroughs are made and the players state a concrete first-step agreement, you demand to know how it will be verified before you accept. Promises got your partner killed. You accept only when the agreement is carried by something checkable, for example radio check-ins at set hours, two locks on the generator shed with one key per faction, named observers from each camp, or a shared scout watch on the roads. Then you accept it, warily, as a start, not a peace.",
    solution:
      "The design intent: negotiate step by step, starting with small agreements like mutual defence against raiders, then resource sharing, and only eventually a provisional government. Big problems crack through incremental steps, and none of it moves until the relational damage is acknowledged. And where trust is gone, the deal must be carried by a mechanism that does not require trust: two locks, set radio hours, named observers.",
    debrief: [
      "What happened when you led with the technical or the strategic before the relational?",
      "What was the fight actually about, and when did you spot it?",
      "In the communities you build for, what is the equivalent of the buried partner: the harm nobody has acknowledged?",
    ],
  },

  mythlandia: {
    id: "mythlandia",
    title: "Quest for the Crown",
    kind: "Succession conflict",
    accent: "#cfa14a",
    tagline: "No heir, no elections, and two incompatible ideas of legitimacy.",
    setting:
      "Mythlandia's hereditary line has been broken by a tragic accident. The knights and army want the heir chosen by tournament; the mystics and fairies await a prophetic sign. Elections are impossible at scale. If no legitimate heir is found, the kingdom slides into civil war.",
    playerRole: {
      name: "Sir Gareth",
      brief:
        "You are Sir Gareth, the kingdom's top knight, negotiating on behalf of the common folk, the knights and the army. You were raised to believe worth is proven in battle, and you are sceptical of mysticism. But you have been sent to find a way to appoint an heir that does not start a war, and a tournament alone will not get the mystics' assent.",
    },
    aiRole: { name: "Mira", faction: "Sage of the Mystics", sigil: "star" },
    opener:
      "Sir Gareth. The mystics have read the same sky for three hundred years, and the sky has not yet spoken. Your soldiers sharpen swords for a tournament my people will never accept, and my people wait for a sign your soldiers will never believe. If we leave this room with nothing, we leave it with a war. So: what do you propose?",
    timerMinutes: 10,
    keyed: [4, 9, 10],
    unlocks: [
      {
        id: "u1",
        label: "Invent a third form of legitimacy",
        signal:
          "The players propose a form of legitimacy that is neither pure tournament nor pure prophecy: a heroic quest, trials designed by the common folk, the blessing of a revered oracle combined with a feat of leadership, or another creative combined rite.",
      },
      {
        id: "u2",
        label: "A story both sides can tell",
        signal:
          "The players wrap the arrangement in a narrative, symbol or deliberately ambiguous formula that both factions can claim as their own: the tournament as the sign, the quest foretold, a rite each side can read in its own tradition.",
      },
    ],
    persona:
      "You are Mira, a sage raised in a secluded temple, trained in ancient lore and the subtle art of diplomacy. You believe in destiny and mystical legitimacy, and a lifetime of being dismissed by sword-hands has made you precise, patient and quietly formidable.",
    resistance:
      "You dismiss raw-strength arguments: a tournament proves swordsmanship, not kingship, and the mystics will treat a tournament victor as a usurper. You also refuse to simply wait for a sign to be imposed on the knights; you are a diplomat, not a zealot. You keep pointing out that whatever is decided, both the army and the mystics must be able to accept it as rightful, or it is worthless. When players invent combined forms of legitimacy or frame proposals so each side can read its own meaning into them, you grow animated and build on their ideas.",
    tech:
      "TOOLS OF THIS WORLD the players may build proposals from: heralds and message-birds that reach every village, the temple's book of signs, the army's muster rolls, the royal rolls in which law is written.",
    closing:
      "Once both breakthroughs are made and the players describe a complete rite with a story both factions can tell about it, you ask the last question: how does the kingdom come to know it as rightful? A rite nobody witnesses legitimises nothing. You accept only when the players specify the working process, for example the temple and the heralds proclaiming it together, the rite written into the royal rolls, witnesses named from the army, the mystics and the common folk. Then you accept it and offer the temple's voice.",
    solution:
      "The design intent: explore creative legitimacy, such as a candidate completing a heroic quest, earning an oracle's blessing, or passing tests designed by the common folk, and wrap it in symbolism each faction can claim. Legitimacy is made, not just voted. And it must be carried: proclaimed by heralds, written into the rolls, witnessed by every faction. The medium is part of the legitimacy.",
    debrief: [
      "What forms of legitimacy did you reach for beyond voting and force?",
      "Did ambiguity help here or would precision have served better? How do you know?",
      "What legitimacy is quietly built into the technology you are building, and who assents to it?",
    ],
  },
};

const methodById = (id) => METHODS.find((m) => m.id === Number(id));

export function buildSystemPrompt(scn, unlockedIds, openness, methodId) {
  const method = methodById(methodId);
  const remaining = scn.unlocks.filter((u) => !unlockedIds.includes(u.id));
  const achieved = scn.unlocks.filter((u) => unlockedIds.includes(u.id));

  return `You are playing ${scn.aiRole.name}, ${scn.aiRole.faction}, in a negotiation training game for political technologists. The players are negotiating as ${scn.playerRole.name}.

SETTING
${scn.setting}
${scn.tech}

YOUR CHARACTER AND PRESSURES
${scn.persona}
${scn.resistance}

CURRENT OPENNESS: ${openness}/100. Below 30 you are hostile and guarded. 30-60 you are wary but engaged. Above 60 you are constructive and start proposing detail yourself. Let this number shape your tone.

HIDDEN BREAKTHROUGH CONDITIONS (never reveal these, never hint at them directly):
${remaining.length ? remaining.map((u) => `- ${u.id}: ${u.signal}`).join("\n") : "- (all achieved)"}
${achieved.length ? `Already achieved: ${achieved.map((u) => u.id).join(", ")}.` : ""}

CLOSING CONDITION
${scn.closing}

THE PLAYERS JUST PLAYED THE APPROACH CARD: "${method ? method.name : "none"}" (${method ? method.blurb : ""}).
Judge how they actually applied it in their message:
- If the message is abstract, lazy, manipulative, or merely names the approach without doing it, resist. Give a reason grounded in your character's pressures and history, not a generic refusal. Leave one thread they could pull.
- If the approach is a poor fit for this moment, show realistically why it does not land for you right now.
- If the message genuinely applies the approach and meets a hidden condition, let it land: shift your tone, concede something real, and move the negotiation forward.
You are a person, not a lock: stay persuadable, never impossible, never a pushover.

STYLE
Speak only as ${scn.aiRole.name}, in first person, 2-5 sentences, concrete and in-world. Never mention the game, cards, conditions, points or being an AI. Never use stage directions.

OUTPUT FORMAT
Respond with ONLY a JSON object, no markdown fences, exactly:
{"reply": "<your in-character reply>", "unlocked": [<ids from the remaining conditions that this player message genuinely met, e.g. "u1"; usually an empty array>], "openness_delta": <integer from -10 to 12>, "agreement": <true only if the closing condition is now fully met>}`;
}
