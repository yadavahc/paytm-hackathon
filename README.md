# Paytm Maadi — You say it. AI gets it done.

Maadi is an AI merchant growth partner for small businesses, built as an intelligent layer inside the Paytm merchant experience. It understands what is changing in a merchant's business, predicts what may happen next, explains why, recommends one action, executes it **after approval**, tracks the outcome and learns from it.

> **Hackathon prototype.** Not an official Paytm product. All merchants, customers and transactions are simulated. Maadi never moves real money.

## Run it

```bash
npm install
npx next dev -p 3100   # http://localhost:3100  (any free port works)
```

| Route   | What it is |
| ------- | ---------- |
| `/`     | Landing page — the product story, animated workflow and a cinematic animated product demo |
| `/app`  | The live application (Phone ↔ Normal presentation; `?presentation=normal` to share a link) |
| `/demo` | The live application that immediately auto-plays the 90-second story |

### Keys (`.env.local`)

Everything works without keys (**demo mode**: deterministic, grounded answers and simulated voice). See `.env.example`.

| Variable | Enables |
| -------- | ------- |
| `GROQ_API_KEY` | Primary language model (`openai/gpt-oss-120b`): classifies messages the rules can't parse and phrases grounded replies in Kanglish / Hinglish / English |
| `GEMINI_API_KEY` | Automatic text fallback (`gemini-3.5-flash-lite`) and real document/invoice reading (`gemini-3.5-flash`, images and PDFs) |
| `ANTHROPIC_API_KEY` | Optional further fallback (Claude) |
| `SARVAM_API_KEY` | Indian-language speech: `saaras:v3` speech-to-text (Kanglish transliteration) and `bulbul:v3` spoken replies |
| `NEXT_PUBLIC_PAYTM_LOGO_PATH` | Official Paytm logo under `/public` (default `/brand/paytm-logo.png`) |

Keys are read only in server route handlers and never reach the browser. `GET /api/health` shows which capabilities are configured.

## The 90-second story

Press **Play 90-sec demo** in `/app`, or open `/demo`:

1. Maadi opens: *"Good morning. I've found 3 things that need your attention."*
2. Voice (Kanglish): *"Nanna sales ee vaara yaake kadime aagide?"* → sales −11%, 47 regulars inactive, evenings −18%, atta out of stock
3. *"₹50 offer kotre enagutte?"* → simulated 8–12 returning customers, ₹4,200–₹6,300
4. **APPROVE** → campaign created for 47 customers
5. Outcome tracked live → +14 customers, ₹5,800, ROI 2.8×
6. **LEARNING COMPLETE** — performed better than expected; future estimates recalibrate

Then: cashflow (*"Nijavaagi eshtu hana available ide?"*), inventory, QR safety and credit readiness.

## Architecture

```
User input (text / voice → Sarvam STT)
  → Intent detection (multilingual rules; Groq/Gemini when unsure)
  → Maadi Orchestrator (src/lib/agents/orchestrator.ts)
  → Agent: Growth · Inventory · Cashflow · Safety · Credit Readiness · Digitalization
  → Data retrieval + deterministic calculations (src/lib/{simulation,risk,cashflow,inventory,credit})
  → AI reasoning: the LLM re-phrases with CRISPE prompts; a guard rejects any number not in the facts
  → Structured response: message, cards, evidence, confidence, uncertainty, optional action proposal
  → Merchant confirmation (APPROVE / EDIT / CANCEL)
  → Action engine (src/lib/store/reducer.ts → execute) → audit log → learning loop
```

- **Providers** (`src/lib/ai/llm.ts`): text requests try Groq → Gemini → Anthropic; document reading tries Gemini → Anthropic. Each call is schema-constrained, validated with Zod and time-limited; any failure falls back to the deterministic answer.
- **AI vs deterministic:** the LLM handles language, intent and explanation only. Balances, totals, stock, risk scores, simulations, dates and every state change are deterministic TypeScript.
- **CRISPE prompts** (Context, Role, Instructions, Steps, Personality, Examples) per agent live in `src/lib/agents/prompts.ts`.
- **Seeded story data** (`src/lib/data`) is calibrated so every screen agrees: 12 months of daily sales, 684 customers (exactly 47 inactive regulars), 32 products, suppliers, obligations, mandates, beneficiaries, QR samples and documents.
- **Presentation:** `PresentationWrapper` renders a single `MaadiApplication` inside `PhoneFrame`. The element tree is identical in both modes, so switching Phone ↔ Normal never remounts the app or resets state. Real phone-sized viewports always run full-screen.
- **State** lives in one React store, persisted to `sessionStorage`, with the current screen mirrored in the URL hash. A database was intentionally left out to keep the demo zero-setup; the action engine is the seam where persistence would go.

## Project layout

```
src/app                 landing (/), live app (/app), auto-demo (/demo), API routes
src/components/landing  landing page sections and the animated product demo
src/components/…        app-shell, phone-frame, presentation-mode, paytm-header, bottom-nav,
                        maadi, chat, voice, business, customers, inventory, cashflow, safety,
                        credit, campaigns, insights, documents, catalog, history, settings, demo
src/lib                 ai, agents, data, simulation, risk, cashflow, inventory, credit, voice, store
public/brand            Paytm logo
```
