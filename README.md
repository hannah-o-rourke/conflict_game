# Conflicts & Politics — The Negotiation Table

A workshop game for the Newspeak House *Conflicts & Politics* session. Groups play a negotiator in one of three scenarios; an AI plays the other side of the table, with its own pressures, history and hidden breakthrough conditions. Players make moves by picking one of the ten conflict-resolution approaches from the session and applying it in character.

## Scenarios

- **The Enchanted Forest** (resource conflict) — you play Lord Aric, facing Eleniel
- **The Generator** (factional conflict) — you play Solara, facing Raven
- **Quest for the Crown** (succession conflict) — you play Sir Gareth, facing Mira

Each scenario is secretly keyed to specific approaches and has 2–3 hidden breakthrough conditions, revealed at the end of the round. `/#facilitator` shows all conditions and keys (don't project it).

## Running it

Deployed on Vercel. The front end is static (`index.html`); the AI characters run through two serverless functions:

- `POST /api/chat` — one negotiation turn (character reply, hidden-condition checks, openness delta)
- `GET /api/reveal?scenario=eldoria|generator|mythlandia|all` — keys, conditions, debrief questions
- `GET /api/health` — checks the model call works end to end

## Configuration (Vercel environment variables)

- `OPENROUTER_API_KEY` — required. The key never ships to the browser.
- `OPENROUTER_MODEL` — optional, defaults to `anthropic/claude-sonnet-4.5`.

## Housekeeping

- Rotate the OpenRouter key after each workshop and keep a spend cap on it: `/api/chat` is a public endpoint while the site is up.
- Scenario content, character prompts and hidden conditions all live in `game/scenarios.js`.

Scenarios and the ten approaches are by Hannah O'Rourke (Campaign Lab / Newspeak House).
