# Handoff — Amendment Design System, August 2026 (session 8)

**Read this, then session 7, then 6…1, then `DESIGN.md`.** Nothing earlier was
reversed. This session was a requested critical pass — flaws, contradictions,
prune candidates — plus the specific brief: *make Claude Code stop ignoring the
system.*

---

## 1 · The finding

**Claude Code was not ignoring the system. It was obeying the entry points, and
the entry points taught retired rules.**

`SKILL.md` — the file an agent loads first, by design — still said, on
2026-08-25: Merriweather headings (retired 08-01), *"Oxblood (red-800/900/950)
for action"* (retired 08-01), *"wax-seal on send"* (the seal is a blind emboss
AND demoted to proposed/unbuilt), *"Emerald is a brand accent only on the
Commons"* (superseded by the condition rule + fill rule), a three-stop aurora
as a hard limit (superseded by the measured `a11y.contrast` rewrite), and
*"Pull components from `ui_kits/web/` — they are spec-faithful"* (the kit was
archived as superseded on 08-15). The README's opening paragraph and its
"Two layers" section named Oxblood twice more; its consuming instructions
(step 5) also pointed at the archived kit.

An agent following those instructions produces exactly the output that reads
as "ignoring the design system": serif headings in the wrong face, a red CTA,
wax seals, ported archive components. **Twenty-four days of decisions never
reached the two files that get read first.**

Why it survived seven sessions of the most self-critical process imaginable:
nothing renders SKILL.md. The system already proved unshown files go wrong
(the eleven non-cards, session 7 §10) — SKILL.md is the most-read and
least-rendered file in the project, which is the same hazard at higher stakes.

> **An entry point is a specimen too. When a decision lands in DESIGN.md, grep
> SKILL.md and the README's first 200 lines for the value it retires, in the
> same pass.**

## 2 · What was done

- **`SKILL.md` rewritten whole.** Current facts; the four-register table with
  tokens (agents were being sent room-first); the hard rules in enforceable
  form (fill rule, 44/48 by `min-height`, `ch` ban, signature licence,
  streaming-is-not-motion, emboss-needs-paper, ledger-number-is-the-proof);
  explicit precedence (*DESIGN.md wins over this file and the README*);
  `ui_kits/web/` labelled an archive with a do-not-port instruction; the
  don't-restate-values-by-hand warning, since literals are how every drift
  here started.
- **`README.md`** — seven stale claims fixed: two Oxblood ink-layer
  descriptions, Oxblood citation superscript (→ Midnight Indigo), "No fourth
  lobe" (→ the measured limits: chroma ≤ 0.22, ≤ 5 lobes, no bare text in the
  band), "voyager is private" (readable since 08-02), the 43-specimens /
  eleven-orphans count (resolved 08-12), and step 5's pull-from-the-kit
  instruction (→ archive; build from role classes + `preview/`).
- **`DESIGN.md`** — `button-cta.hover` "red-700 → red-800 gradient" fixed to
  `color.action-hover`, flat (the leftover 08-13 deferred to "a colour pass";
  this was the colour pass). Heritage: "Merriweather 800" → Newsreader
  `--serif-display`; "Oxblood does that job" on secondary CTAs → one action
  colour + fill rule.
- **`github.md`** — the Archivo "needs a decision" note (recorded 08-15, two
  days *after* the 08-13 decision) resolved as written: Archivo is the target,
  Readex-in-production is a Known Divergence, spec ahead.
- **Pruned:** `01-scraps`…`05-scraps`, five extensionless JPEGs at the root,
  referenced by nothing.

## 3 · Prune candidates left for the user

- **`Amendment - Touch Targets.html`** (root) — a share-export duplicate of
  `preview/touch-targets.html`, styled in `-apple-system`. Delete or move to
  `scratch/` unless it has an audience.
- **`ui_kits/web/`** — kept deliberately as a dated archive (its card says
  so). If it keeps luring agents despite the new SKILL.md language, deletion
  is the stronger fence; the git history keeps the record.
- **Seven handoff files + `AUDIT-2026-08.md` + `RECONCILIATION-2026-08.md`** —
  keep. They are the system's institutional memory and are already chained in
  reading order. Do not consolidate; the traps list is load-bearing.

## 4 · Contradictions checked and NOT bugs

- Chrome (`--sans-chrome` 125) wider than display (120) — deliberate,
  documented: width separates clerical from editorial, display escalates by
  size/weight.
- The seal being both "canonical brand mark" (README Iconography) and
  "proposed accent" — consistent: the *mark* is canonical brand, the
  *emboss-on-surfaces accent* is gated on implementation.
- Body `wdth` 104 vs. axis default — deliberate, guarded by comments in three
  files. Leave it.

## 5 · Still open (unchanged unless noted)

- **Chrome's two light values** (75% keyframe vs 55% utility) — unowned
  default in production; needs Jason's decision, not a reconciliation.
- **Sans body copy has no counted measure** — `measure.body`'s 69 was counted
  in Newsreader.
- **`resistbot/deepspace`** access; real-client dark-mode email testing.
- **Owed to production** (all spec-ahead, all Jason's): guilloche redraw ·
  Receipt's 9.6px caption · oxblood ENACTED · tab bar's three · skeleton
  token migration · Clerk's yellow warning · `--changelog-content-cap` ·
  40px button/input heights · toggle 24px target · breadcrumb ~12px target ·
  **and now the biggest one: production still ships Readex Pro and
  Merriweather while the spec is on Archivo and Newsreader.**

## 6 · Traps

Sessions 1–7's sixteen hold. One addition:

**17 · The entry point is the stalest file in the project, precisely because
it is the most read and the least rendered. `[new]`**
Every mechanism this system built — the card harness, the citation passes, the
grep sweeps — checks files that render. SKILL.md renders nowhere, so 24 days
of decisions (Oxblood, Merriweather, the seal, the kit's archival, the aurora
rewrite) never propagated to it, and every consuming agent inherited August 1st.
The check is one grep of the retired value across `SKILL.md` + `README.md`,
run in the same pass as the decision that retires it.
