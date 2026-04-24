# Joy Luck Journey

A narrative choice game inspired by *The Joy Luck Club*. Each playable arc follows one daughter through five worlds of family pressure, memory, identity, and difficult decisions.

## Local Development

Prerequisites:

- Node.js 20+

Run locally:

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local`.
3. Set `GEMINI_API_KEY` if you plan to use Gemini-powered features later.
4. Start the dev server with `npm run dev`.
5. Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` starts the Vite dev server on port `3000`.
- `npm run lint` runs TypeScript type-checking.
- `npm run build` creates a production build in `dist`.
- `npm run clean` removes the `dist` folder.

## Project Structure

- `src/gameData.ts` contains characters, worlds, and story events.
- `src/gameLogic.ts` centralizes progression, stat updates, gated choices, and ending summaries.
- `src/components/` contains the character select screen, in-game UI, and outcome screens.

## Current Focus

- Expand and refine the remaining character arcs.
- Continue improving visual polish and responsiveness.
- Add more reactive story logic tied to stats and memory unlocks.
