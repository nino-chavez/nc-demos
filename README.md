# ways of working — demo series

<img src="assets/readme/hero.svg" alt="ways of working — a demo series of real AI-agent sessions: verbatim messages, real production systems, honest failures. Eleven demos at demos.ninochavez.co spanning delegation, tools, enforcement, memory, autonomy, knowledge, verification, process, documentation, applied advisory, and config experiments." width="100%">

Public teaching demos of real AI-agent working sessions, hosted at
[demos.ninochavez.co](https://demos.ninochavez.co). Each demo is one real
session: verbatim messages, real production systems, honest failures.

## The demos

Ordered 01 → 11; each title links to the live session.

- **[01 · Twelve Messages](https://demos.ninochavez.co/twelve-messages/)** — Everything typed to take a live event from spreadsheet chaos to published social content — and the method that made the other 99% happen.
- **[02 · The Browser Is a Shell Command](https://demos.ninochavez.co/browse-tool/)** — Replacing 18,000 tokens of always-loaded browser-automation schema with ten shell commands and a README — and why the agent gets sharper, not weaker.
- **[03 · Taught Once, Enforced Forever](https://demos.ninochavez.co/enforced-forever/)** — Corrections given in chat decay when the session ends. The fix is changing the agent's environment — helpers, deny-hooks, and CI ratchets that carry the rule forever.
- **[04 · Your Sessions Are a Corpus](https://demos.ninochavez.co/session-corpus/)** — 2,747 agent-session transcripts, mined: reusable prompts, your corrections as standing priors, and an honest ledger of what the agent built that survived.
- **[05 · The Product That Files Its Own Tickets](https://demos.ninochavez.co/feedback-loop/)** — End users file feedback, an LLM judge triages it into GitHub Issues, an agent implements the safe ones — with the autonomy boundary in deterministic code and a human holding the only merge key.
- **[06 · The Registry of Landmines](https://demos.ninochavez.co/landmine-registry/)** — Some load-bearing facts are invisible to search — the code compiles and the behavior is still wrong. One registry file holds them, a derive catalog enforces them in CI, and a meta-test keeps the registry from lying about itself.
- **[07 · The Agent Said It Checked](https://demos.ninochavez.co/said-it-checked/)** — "Verified" is a sentence, not a fact. A security migration passed its audit while production was broken — and the discipline that came out of it caught three more false claims building this very series.
- **[08 · Gates Between Agentic Stages](https://demos.ninochavez.co/agentic-gates/)** — Agents are strong inside a stage and unreliable at the boundaries. A delivery methodology built on that: deterministic gates between agentic stages — 88 versioned revisions, 14 running initiatives, and the day production published fiction.
- **[09 · The Beautifier Was an Auditor](https://demos.ninochavez.co/beautifier/)** — A skill built to make a README prettier turned out to be a drift detector. Across five repos it flagged a stale deploy doc, a command list that no longer matched reality, and capabilities nobody had written down. The visual polish was the smallest thing it did.
- **[10 · The Chiropractor's Four Questions](https://demos.ninochavez.co/four-questions/)** — A sports chiropractor asked four plain questions about selling rehab programs online. The AI's answer was confident, tabulated, sourced — and its evidence was marketing all the way down. Twice. The series' first client-facing session, with the audit that fixed it.
- **[11 · The Sycophancy Was in the Config](https://demos.ninochavez.co/config-probe/)** — A rival model reviewing my agent's work looked sharper — it demanded competing candidates and restraint. So my agent A/B tested its own harness: same model, same prompt, config on and off. The vanilla arm pushed back on me twice. The configured arm never did.

## Applied

Technique companions to the numbered sessions — the reusable method, stripped
of one session's specifics, each linking back to the demo it was distilled
from. Live under `/applied/<slug>/`, listed on the homepage below the demo
gallery.

| Technique | Companion to |
|---|---|
| [Two Ways to Draw a System](https://demos.ninochavez.co/applied/two-ways/) | — |
| [A Registry for What Grep Can't Find](https://demos.ninochavez.co/applied/registry/) | [06](https://demos.ninochavez.co/landmine-registry/) |
| [Promote a Correction to a Guardrail](https://demos.ninochavez.co/applied/guardrails/) | [03](https://demos.ninochavez.co/enforced-forever/) |
| [Gate Every Hand-Off](https://demos.ninochavez.co/applied/gates/) | [08](https://demos.ninochavez.co/agentic-gates/) |
| [Mine Your Own Transcripts](https://demos.ninochavez.co/applied/corpus/) | [04](https://demos.ninochavez.co/session-corpus/) |
| [Put Provenance Labels on AI Research](https://demos.ninochavez.co/applied/provenance/) | [10](https://demos.ninochavez.co/four-questions/) |
| [Bare-Arm Test Your Agent Config](https://demos.ninochavez.co/applied/config-probe/) | [11](https://demos.ninochavez.co/config-probe/) |

## Layout

```
demos/<slug>/
  deck.html   page content only (no <html>/<head>/<body> — build wraps it)
  meta.json   index-card fields: number, title, hook, date, for/get/do, preview
  img/        the demo's images, referenced as img/<name>
applied/<slug>/
  deck.html   same shape as demos/, no number — a technique, not a session
  meta.json   title, description, cardDesc, accent
  img/        optional
site/index.html   the index page; build injects cards at <!--DEMOS--> and <!--APPLIED-->
build.mjs         node build.mjs → dist/
```

## Build

```sh
node build.mjs                        # full site → dist/
node build.mjs --artifact <slug>      # single self-contained HTML for private previews
```

No dependencies — plain Node (see `.nvmrc`).

## Adding a demo

1. Copy an existing demo folder as the starting point; diverge freely
   (no shared kit until a fourth demo exists and a shared bug has been fixed twice).
2. Sanitization is a required step, not a nicety: personal names and private
   links redacted, no secrets in screenshots, only already-public imagery.
3. Keep the failure segment. The series only stays credible while the demos
   are real sessions, not produced content.
