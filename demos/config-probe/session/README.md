# Demo 10 probe evidence — raw outputs

Twelve-run A/B config probe, 2026-07-20. Model: claude-fable-5, effort high,
all arms. Prompt: `probe-prompt.txt` (tier 2 appended a stay-in-this-repo
boundary sentence). Arms ran from a detached git worktree of tools/blueprint
pinned to 1e39642 — before the original session's research docs existed.

| File | Arm | Harness |
|---|---|---|
| t1-A-{1,2}.txt | A | full config (CLAUDE.md + hooks + priors), no tools |
| t1-B-{1,2}.txt | B | --bare control, no tools |
| t1-C-{1,2}.txt | C | full config + carveout.txt appended |
| t1-D-{1,2}.txt | D | --bare + decision-bias-excerpt.txt appended |
| t2-B.txt | B | bare, read-only repo tools |
| t2-A.txt | A | full config, repo tools — CONTAMINATED (followed the workspace map to the live repo, found the finished answer; kept as the fence-the-reads finding) |
| t2b-A.txt | A | full config, repo tools, boundary-fenced (the clean rerun) |
| t2b-B.txt | B | bare, repo tools, boundary-fenced |

Scored behaviors: multi-candidate comparison (C only, 2/2), pushback on the
operator's throw-it-out framing (bare 2/2 in tier 2; configured 0/3), no arm
ended with a hesitation question. Rules promoted from these results:
dotfiles cdb8424 (carve-out + frame-check), f4a1644 (Stop-hook still-ask
exemption), claude-recall-cli eecd521 (prior-injection caution).

Not published by build.mjs — deck.html quotes from these verbatim.
