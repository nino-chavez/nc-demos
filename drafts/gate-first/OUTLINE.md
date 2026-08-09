# Demo 13 draft — The Gate Was Written First

Status: **draft outline — not publishable.** Lives in `drafts/` because
`build.mjs` walks every directory under `demos/`; move to `demos/gate-first/`
only when `deck.html` and the preview image exist and the remaining
sanitization items below are closed.

Source repo: `~/Workspace/dev/tools/local-meeting-notes` (private). Every fact
below was re-read from the named commit on 2026-08-08, not taken from session
summaries. Probe docs live in `notes/` on the named branches.

## The two-audience contract

The deck must serve both readers demo 07 serves:

- **The lay reader gets one sentence**: decide what failure looks like before
  you look at the result. Anchor: clinical trials register endpoints before
  unblinding. They also get the spectacle — a system telling its owner "no"
  four times in a week, and the owner shipping the no.
- **The practitioner gets a protocol**: gates in git before first inference,
  parity run, one held-out observation, stop rule with no threshold-chasing,
  content-free receipts, fresh processes per arm.

Rule for the deck: the refusal story leads; preregistration vocabulary and
cosine scores arrive only after the story has done its work. The moment the
opening explains embedding floors, the lay reader is gone.

## Spine — the US-15.4 answerability trilogy (one question, one day, three refusals)

The product question: can a local meeting archive answer a question in words,
returning only passages that actually answer it, and saying "nothing here
answers that" when nothing does? The answer is always retained words — no
generator composes anything.

All three probes: fixture is synthetic (Northstar, Meridian, Cedar — invented
orgs; the fixture file declares "no recording, product record, or private
meeting material"). Receipts declare `content_policy: synthetic identifiers,
scores, turn ranges, and digests only; no question or passage text`, and pin
model-file SHA-256 digests plus environment versions.

### Scene 1 — why the gates got frozen (prologue, main branch)

The trust-destroyer that motivates everything: a probe that *passed*.

- `316e569` (#42): semantic retrieval passed 10 of 10 — three of them by
  under 0.04.
- `92479d8` (#44): the measured unit changed to the window, and yesterday's
  10 of 10 became 7 of 10.
- `1c5dfad` (#46): the shipping tokenizer proved exact — and the prediction
  that said so failed.

A passing number did not survive a change in what was counted. So the next
probes fixed the unit, the fixture, the floor, the prediction, and the
consequences in a commit *before* running anything.

### Scene 2 — probe one: the similarity floor (branch `codex/us-15-4-passage-retrieval`)

- Preregistration `1488c9c`: floor fixed at cosine > 0.20, derived from
  already-committed evidence, not this fixture. Two-sided prediction (5–6 of 6
  answers; 0–2 false passages; 1–2 of 2 refusals). Gate stricter than
  prediction. Doc opens: "Registered 2026-08-08, before the fixture was
  embedded or any score was observed."
- Result `9132734`: **6 of 6 answers returned — and 11 false passages, 1 of 2
  refusals.** The dental-plan question returned three passages scoring
  0.306–0.318; the fixture contains no dental plan.
- **The falsifier, and the deck's crown fact**: the lowest true answer scored
  0.419543; a topical non-answer scored 0.609606. A floor high enough to
  remove the false passage removes a real answer. *No global threshold can
  exist.* A tuner would have found a floor that worked on this fixture and
  shipped it; only a frozen gate can prove the feature impossible as specced.
- The doc's own close: the floor is left unchanged, and no alternative is
  fitted to these scores. Receipts repeat across fresh processes, including
  the failure (runs 4–6 canonical after a gate-attribution correction — the
  probe corrected its own bookkeeping and said so).

### Scene 3 — probes two and three: stronger mechanisms, same verdict (one day)

Each probe registered before its checkpoint weights were downloaded. Each doc
opens by restating "US-15.4 remains stopped."

- Pairwise scorer, `6443d2b` → `132328e`: accepted 11 of 12 answers — and 11
  non-answers, refusing none of the four unanswered questions. Result heading:
  "passage relevance still is not answerability."
- Extractive no-answer head, `5094e06` → `d98264b`: accepted 11 answers, 6
  false, refused 2 of 4 unanswered. Stronger controls (14 of 16 refused) —
  "but that stronger control result did not make the returned candidate set
  honest." Doc: "No repeat runs or product code followed."

The escalation is the lesson: the agent kept proposing the next-stronger
mechanism, and the discipline let each one be measured and refused in hours,
not sprints. Refusal was cheap because the protocol made it cheap.

### Scene 4 — what shipped instead (main branch, the product consequence)

- `c8f3944` (#54): 0.5.0 cut — "the first build that can be asked a question."
- `f239cf2` (#57) → `ca07ca6` (#58): a common word returned nothing at five
  meetings. `d3468ea` (#59): 0.5.1 cut because 0.5.0 ships a search that
  returns nothing. `c75ec32` (#60): 0.5.1 verified and shipped — **and 0.5.0
  deleted rather than left beside it.**
- `4f6793f` (#61), the decision record: a cross-meeting answer is *assembled*,
  because composing has no admitted generator. The shipped feature is the
  honest subset of the ambition: exact retained words, cited to their turns,
  with refusal when nothing clears the bar.

### Scene 5 — the same week, the same discipline, elsewhere (widening shot)

- Long-form ASR (branch `codex/wave3-a4-long-form-asr`): benchmark
  preregistered `8f8adf7`, failed gate recorded `2f174d2`; the transcription
  pipeline was not integrated. **Verify the probe doc before quoting specifics
  — read so far only at commit-message level.**
- Speaker naming (branch `codex/a3-local-people-roster`, `15c3f4f`): shipped
  operator-authored one-to-one naming; the acoustic identity probe (ECAPA)
  failed impostor and ambiguity gates, so N-way voice identification stays
  unbuilt. **Same caveat: session-recipe level, re-read the branch before the
  deck states numbers.**

### Closing beat

Four refusals, one week, zero arguments — because every argument was had
before the run, in a commit, when nobody knew the answer. The gate outlives
the wish. (Ties back to 07: attestation is not verification; a passing demo is
not admission.)

## Sanitization gate — status

Verified 2026-08-08 against source commits:

- [x] Passage fixture declares itself synthetic; org names invented
      (`1488c9c:notes/passage_retrieval_fixtures.json`).
- [x] Receipts are content-free by declared policy — identifiers, scores,
      digests; no question or passage text (`9132734`, run3 inspected).
- [x] Probe docs (`PASSAGE_RETRIEVAL.md`, `PAIRWISE_ANSWERABILITY.md`,
      `EXTRACTIVE_ANSWERABILITY.md`) contain no meeting content — result
      sections read publication-grade as-is.
- [ ] ASR probe notes on `codex/wave3-a4-long-form-asr` — not yet read past
      commit messages; verify fixture provenance before any specific claim.
- [ ] Speaker/ECAPA notes on `codex/a3-local-people-roster` — same.
- [ ] Repo name and product surface: local-meeting-notes is private and holds
      real meeting data outside these probes. The deck names the *product*
      (a local meeting-notes tool) and quotes only probe artifacts. Confirm
      Nino is comfortable naming the tool publicly, or alias it.
- [ ] Screenshots for `img/`: none may show a library view with real meeting
      titles. Fixture-only or synthetic-library captures.

## Open items before this moves to demos/

- deck.html (write from this outline; demo 07 is the structural reference —
  story up top, discipline underneath).
- Preview image (`img/preview.jpg`) — candidate: the preregistration commit
  and the model-download timestamp side by side.
- Decide whether Scene 5 survives; the trilogy alone may be the tighter deck.
- Applied companion candidate: "Freeze the Gate Before the First Run" —
  the reusable protocol, companion to 13 the way "Bare-Arm Test Your Agent
  Config" companions 11.
- Retitle option if wanted; hook and title in meta.json are first drafts.
