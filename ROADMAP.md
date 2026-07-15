# ways of working — demo roadmap

Shipped: **01 Twelve Messages** (delegation split), **02 The Browser Is a Shell
Command** (tool token-economics), **03 Taught Once, Enforced Forever**
(corrections → helpers/hooks/ratchets), **04 Your Sessions Are a Corpus**
(transcript mining → audits/priors/grades). Candidates below were selected by a two-track
research pass: a workspace survey (apps/wip/tools) and a session-corpus mining
run over 2,747 transcripts via claude-recall-cli — the series' own method,
applied to choosing its next subjects.

Selection bar, in order: teaches a transferable agent-working method →
anchored to real sessions/artifacts with honest failure material → sanitizable
for permanent public hosting.

## Queue

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
