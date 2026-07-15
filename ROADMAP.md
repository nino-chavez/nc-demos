# ways of working — demo roadmap

Shipped: **01 Twelve Messages** (delegation split), **02 The Browser Is a Shell
Command** (tool token-economics). Candidates below were selected by a two-track
research pass: a workspace survey (apps/wip/tools) and a session-corpus mining
run over 2,747 transcripts via claude-recall-cli — the series' own method,
applied to choosing its next subjects.

Selection bar, in order: teaches a transferable agent-working method →
anchored to real sessions/artifacts with honest failure material → sanitizable
for permanent public hosting.

## Queue

### 03 · Taught Once, Enforced Forever
**Thesis:** stop re-correcting the agent; change its environment. Three
escalating mechanisms: helpers that make the cheap path the default (`q`,
`preview`, `waitfor` — born from 122 mined `pkill` invocations chasing stray
dev servers), PreToolUse/Stop hooks that deny the bad path (worktree-guard,
born from two sessions switching branches under each other; read-guard, born
from a 60-day audit showing half of file reads were re-reads; anti-hesitation,
born from 553 mined ask-then-told-"go" exchanges), and CI ratchets that make
conventions project law (design-system linter, doc-coverage baseline).
**Evidence:** every guard's docstring cites its origin audit; each is
anchorable to the single session that wrote it.
**Sanitization:** clean — scripts and hook docstrings, no client data.

### 04 · Your Sessions Are a Corpus
**Thesis:** agent-session history is data — mine it for reusable prompts, your
own correction patterns, and survival rates of what the agent built. The
session-mining tool itself was rebuilt as eleven separate throwaway scripts
before being codified once with an "extend, don't re-fork" rule; the mined
survival ledger (313 ephemeral artifacts gone, 12 survived) is the argument for
codifying. Meta-proof: this roadmap was produced by that tooling.
**Evidence:** miner run artifacts, the Poe voice stack (1,400+ signals), 838
auto-graded sessions.
**Sanitization:** needs a scrub pass — mined recipes carry client names and
private paths.

### 05 · The Product That Files Its Own Tickets
**Thesis:** an autonomous feedback loop — in-product capture → LLM triage on a
cron → GitHub Issues → agent-authored PRs — where the autonomy boundary lives
in deterministic code, not in the model's judgment, and merging stays human.
**Evidence:** the ADR, the named services, the GitHub Action, live in
production.
**Sanitization:** medium — real feedback rows carry user text and emails;
mechanics are clean.

### 06 · The Registry of Landmines
**Thesis:** convert tribal knowledge grep can't surface (columns written but
never read, flags the runtime can't distinguish) into a cited registry with
mechanically-derived COMPLIANT/NON-COMPLIANT status that also runs in CI — so
session N+1 spends three targeted reads where session N spent an
investigation. The token economics of agent memory.
**Evidence:** the registry, the derive catalog, the CI test, self-documenting
enforcement model.
**Sanitization:** low — internal schema facts, no PII.

### 07 · The Agent Said It Checked
**Thesis:** an artifact's claim of verification is not verification. Re-derive
from the canonical source: grep the file, run the command, smoke-test the
runtime. Failure anchor: a privilege revocation that passed its ACL diff and
still broke production twice, because nobody verified every invocation path.
**Evidence:** the standing audit-discipline rule, the memory trail of the
double prod break, cross-session answer-comparison sessions.
**Sanitization:** clean.

### 08 · Gates Between Agentic Stages
**Thesis:** deterministic core, agentic shell — stage AI-assisted delivery
(research → strategy docs → prototype → validation → handoff) with mechanical
gates verifying each artifact before it advances. Represents the whole
spec-driven cluster; Blueprint is the public face (npm, MIT, self-applied at
its own portal). A commerce-platform case study exists but its artifacts stay
private — the method appears here without them.
**Sanitization:** low for Blueprint itself.

## Backlog / segments (not standalone decks)

- **Handoff-and-fresh-session dispatch** — deliberate context-budget reset;
  connective tissue for 04 or 06.
- **render-kit** — "hand-rolled the same render script three times → build the
  harness"; a segment inside 04's codify theme.
- **CI-minutes diagnosis** — the mechanical-80%/judgment-20% split as an
  autonomy-boundary story; possible segment in 05.
- **Voice-mode pipelines** (forge-signal) — one prompt shouldn't write every
  content mode; pairs with a future writing-focused demo.
- **Multi-variant render-and-compare** — real but thin; segment in a future
  creative-workflow demo.

## Ruled out (for this series)

- Fleet observability, repo-health auditing — solo-operator ops methods, not
  agent-working methods.
- AEO/machine-readable site surfaces — optimizes for agents as *consumers*;
  different series.
- Product feature tours (rally-hq, photography, letspepper as products) — the
  series teaches method, not products.
