# Ratification queue

Findings that may need a spec change. **Append-only from the code side.** Nothing here is decided until it moves into `DESIGN.md` and `CHANGELOG.md` and `spec-version` is bumped — at which point the entry is deleted from this file.

## Why this file exists

The spec has one writer. Code work generates spec questions constantly — a rule that's silent, a value nobody chose, a sentence that supports two readings — and the failure mode is fixing them inline, where there's no changelog entry and no way to find the decision later. Every drift in `CHANGELOG.md` started as a reasonable inline edit.

So: **the code side never edits `DESIGN.md`.** It appends here. A ratification pass empties the queue.

## Rules

- **Append, don't decide.** Write the finding and the proposed change; do not apply it to `DESIGN.md`.
- **Name the kind** (below). The kind determines who acts and how.
- **Attach the evidence, not the argument.** A measurement, a render, a byte count, a computed style. *When a spec sentence supports two opposite readings, that is not ambiguous prose — it is a missing measurement.* Render both readings and let the container decide; the clip, the overflow, or the contrast number settles it far cheaper than prose.
- **Cite the token, never the number.** If a proposed edit quotes a weight, hex, or size, it will re-enter the spec as an uncontrolled copy — the retired ladder came back twice that way, once in a block written the same week its retirement was ratified.
- **One entry per finding.** A conformance fix that needed no decision doesn't belong here at all — just fix the code.

## Kinds

| Kind | Meaning | Who acts |
|---|---|---|
| **Conformance** | Spec is clear, code disagrees. | Code, immediately. Not a queue entry. |
| **Spec ahead** | Production hasn't caught up. | Record as Known Divergence. Don't let the spec drift back to match code. |
| **Production ahead** | The shipped artifact met a real constraint the spec didn't know about. | Update the spec. |
| **Unowned default** | Neither chose it; a framework did. | Needs a decision. *The value that reaches a rendered surface is the value the system means.* |
| **Two readings** | The spec supports both. | Render both, measure, then decide. |
| **Spec silent** | No rule exists. | Decide and write the rule, with its rationale. |

## Entry format

```
### <short title>
- **kind:** two readings
- **found:** stage 3, components/ui/Toggle.tsx — <what the code was doing and why it raised the question>
- **evidence:** <measurement, render, computed style, byte count>
- **proposes:** <the spec edit, in role/token names>
- **blocks:** <nothing | the surface that can't ship until this is decided>
```

## Cadence

Empty the queue at the end of each migration stage, or when it reaches about five entries — whichever comes first. Letting it run longer means later code work builds on undecided rules, which is how a divergence becomes a precedent.

The ratification pass produces **one commit in this repo**: `DESIGN.md` edits + a `CHANGELOG.md` entry + a `spec-version` bump, separate from any code PR. The code PR that then conforms references the version it built against.

Anything still open after a pass stays here with a note on what it's waiting for — usually a measurement someone has to take.

---

## Open

### The consumer's `.claude/skills/` copy of the stylesheet must become a symlink
- **kind:** conformance, in the consumer's repo — recorded here because the fix is not mine to make
- **found:** the 2026-08-28.9 pass, grepping for HEXP in a path nobody was watching. `.claude/skills/amendment-design/colors_and_type.css` is a REGULAR FILE, not the symlink `design/` uses, and carries its own `SKILL.md` differing from the canonical one.
- **evidence:** eight ratifications stale in a single day — `--color-danger` at the red-600 value that fails AA on the opaque ground, no `--canvas-live`, `--hexp-*` aliases present after their deletion. It is the file an agent LOADS AS ITS SKILL in that repo, so the staleness is actively taught rather than merely sitting there.
- **proposes:** symlink both files to the canonical repo, exactly as `design/` already is. A copy that must be remembered will be forgotten.
- **blocks:** nothing shipping, and everything downstream of it — any session working in the consumer repo is reading an eight-version-old system and will produce work that looks like it is ignoring the design system while faithfully obeying a copy of it.

### `tracking-is-half-the-register` is outstanding at 43 sites
- **kind:** conformance, in the consumer's repo
- **found:** verifying the stage 8 close-out, which reported the sweep complete.
- **evidence:** 36 non-story sites still compose `sans-chrome` + `uppercase` + a literal Tailwind tracking step (0.025 / 0.05 / 0.1em) where `--track-chrome` is 0.12em; 7 more carry no tracking at all. Ten were fixed.
- **proposes:** a lint rule rather than another sweep — `sans-chrome` + `uppercase` without `role-label-caps` is greppable in a way "did someone rebuild a register here" is not.
- **blocks:** nothing, but it is the largest remaining known divergence and it will regrow without the rule.

## Needs a person — cannot close from inside the toolchain

Not a ratification queue. These do not resolve by deciding; they resolve by
someone doing something an agent should not do unprompted. Listed separately so
they stop reading as actionable to the next session that opens this file.

### Real-client dark-mode email rendering has never been tested
- **why it is here:** it means sending mail to live Gmail / Outlook / Apple Mail inboxes. That is outward-facing and no agent should do it unprompted. The stage 7 session correctly declined.
- **what is already verified, so nobody re-does it:** dark mode is confirmed end to end in the rendered templates — `zinc-900` sheet, both `color-scheme` metas present, links at ~7:1 inverted, no webfonts, no glass, no oklch, no custom properties, no motion, no gap. The templates are correct. What is untested is what CLIENTS DO TO THEM.
- **the specific thing to look for**, from `profiles.email.dark-mode`'s own open note: **Gmail on Android darkens the sheet itself, and the double rule is the first thing to go.** The issuance block is where to look — ledger number, double rule `#b6ac97`, signature line.
- **protocol:** send one issuance email and one CTA email to a Gmail address opened on Android, an Outlook.com address opened in the Windows app, and an iCloud address opened in Apple Mail, each with the device in dark mode. Screenshot the issuance block. The pass condition is that the double rule is still visible and the ledger number is still legible as text.
- **who:** Jason, or anyone with those three inboxes. Report back as a queue entry only if something fails.

---

## Recently ratified

Moved out of this file on ratification; listed here for one cycle so the code side can see what landed.

- **2026-08-28 (v2026.08.28.9)** — `retired-axis-fails-silently`: HexStateMap
  was setting `'HEXP' 100` **in live code** on a face with no such axis; CSS
  ignores an unknown variation axis, so the line ran, warned nothing, did
  nothing, and read as deliberate. **The permanent grep set is a correctness
  tool, not documentation hygiene** — and that is why it must cover comments and
  code alike, and why a retired name should be deleted rather than left
  resolving. `the-skill-directory-is-a-third-home`: the consumer carries a third,
  non-symlinked copy of the stylesheet in `.claude/skills/`, eight ratifications
  stale in one day, and it is what an agent loads as its skill — trap 1 in a new
  directory and worse, because the staleness is taught rather than stored. Both
  consumer-side fixes are queued above.
- **2026-08-28 (v2026.08.28.8)** — `hexp-*` aliases **deleted** from the token
  layer and the spec; a reference now fails loudly rather than resolving,
  because a working fallback is what lets a retired name survive a grep.
  Mapping kept inline for anyone reading old code. **The grep-set item is NOT
  cleared:** `HEXP` survives in seven comments across six consumer files, three
  of which teach something additionally wrong (a tracking value flagged as wrong
  at v2026.08.28.2 and still called "per spec"; a 10px label under a floor with
  no chrome exception). **The grep set must be enforced over comments, not just
  code** — the stage 8 lint rule already scans comments, so `HEXP` and the
  retired weight ladder just need to be in it verbatim.
- **2026-08-28 (v2026.08.28.7)** — the stage 8 queue, emptied.
  `uppercase-has-two-homes`: uppercase is legal in `role-label-caps` (chrome)
  and `role-ceremonial` (display, once per page) and nowhere else — hard rule
  5's exception was a **whole role**, the fourth instance of that pattern and
  the first surfaced by the grep procedure. The test is **designation or
  sentence**: a bill identifier is ceremonial, "Browse bills by state" is a
  heading. `tracking-is-half-the-register` **escalated from the breadcrumb** —
  the 08-27 ruling that width-without-tracking is a different register was fixed
  at one site and never swept; five more use `tracking-wide` (0.025em) where
  0.12/0.20em belongs, including the ceremonial site, which is therefore missing
  the property that defines it. All five **hand-assembled a register instead of
  taking the role class** — a width preset is not a register. Plus: the
  copy-pasted "do not sweep to serif" comment is an instruction not to fix,
  correct at one site and false at four.
- **2026-08-28 (v2026.08.28.6)** — `canvas-two-names`, scheduled rather than
  carried a fourth pass. `--canvas` is the **opaque ground** (value unchanged,
  nothing consuming it moves); `--canvas-live` is the **Blue Hour base** under
  the aurora — the literal `#080c17` that lived in the consumer's body and was
  named nowhere. `.amendment-app` now paints the Live canvas, which it always
  should have. `ink-needs-an-opaque-ground` cites a token instead of prose.
  `profiles.email.substitutions.brand` names `#033271` + `#60a5fa` — email has
  no hover, so a link is decided by colour alone; it stays in the profile so the
  product does not acquire a blue by way of email. The CTA is correctly NOT one
  of its roles. Real-client dark-mode email testing moved out of the queue into
  **Needs a person**. Correction: the stage 5 revert was three controls, not
  four — the other two were hover.
- **2026-08-28 (v2026.08.28.5)** — the stage 5 queue, emptied. **Three things
  were never on the motion budget**, so the honest count is still two, not four.
  `committed-state-is-not-motion`: a control drawing a state the user just
  committed is feedback, not motion — stage 5 read "never transition transform"
  as unconditional and made four controls snap, including the toggle, **whose
  own entry specifies the slide**. Revert those four. The aurora is a **layer,
  not a surface** — it breathes, per the document's own thesis, stated twice in
  prose and never encoded in `motion.rules`. **Marketing is outside the register
  table**, with its motion bounded (pausable, viewport-gated, motion-safe, never
  on record state) — the marquee and shimmer already satisfy every bound, so the
  rule ratifies what shipped. The profile-hiding corollary **escalated from a
  lesson to a procedure** on its third instance: grep component entries for
  exceptions before declaring a general rule absolute.
- **2026-08-28 (v2026.08.28.4)** — the stage 4 queue, emptied. **`danger` moved
  to red-700**: 4.39:1 as ink on the light opaque ground, under AA, and the only
  semantic base not at the -700 step — the odd one out and the only failure were
  the same fact. Reported as unfixable ("no darker option"); there was one.
  `functional` at 4.33:1 explicitly NOT moving — graphical objects take 3:1 and
  its role forbids text. New `opaque-ground-is-not-uniformly-safer`: yesterday's
  rule was written from dark evidence and makes light-mode ink HARDER, so
  re-measure both schemes when a surface moves onto the opaque ground.
  **`colors_and_type.css` was behind `DESIGN.md`** on material-chrome light
  (75% vs 55%, retired 08-27 and deleted everywhere but the stylesheet) — caught
  by the new regenerate-and-diff guard on its first run, after two ratification
  passes read both files and missed it. `a11y.targetSize` gains its **inline
  exception**, which was in WCAG 2.5.5/2.5.8 all along; at `role-body`'s 24px
  line box a 44px inline target overhangs 10px into the lines above and below.
- **2026-08-28 (v2026.08.28.3)** — the stage 2.5 and stage 3 queues, emptied.
  **Glass blends, it does not cover** is the through-line. Ratified:
  `ink-switch-is-palette-wide` (the light/inverted switch governs the whole
  palette, not green — no token clears 4.5:1 in both schemes);
  `ink-ground-is-a-placement` (the aurora is a gradient, so one token swings
  2.15→6.32:1 by position — **a contrast number without a position is not a
  measurement**, and no table is recorded for that reason);
  `ink-needs-an-opaque-ground`, which **retires the hard rule** that
  `material-chrome` re-establishes a ground — measured, glass is 2.87:1 where
  opaque is 6.10:1, and thicker materials are *worse* because `blur(50px)`
  averages neighbouring bright lobes in; `tint-is-not-a-plate` (settled from
  the supplied ladder — alpha is not the channel carrying affordance, so
  status is ink on neutral material and there is no tint token in any family);
  `primary.plate-not-mark` (a limitation, not a gap — the primary/slate
  distinction is light-mode-only). **Two entries dissolved on re-measurement:**
  `danger` passes inverted at 4.71:1 on the opaque canvas — a placement bug was
  about to buy a palette change; and `material-chrome` already specifies a dark
  wash — the navbar comparison rendered the consumer's reimplementation
  labelled as the spec. Both are conformance. New:
  `materials-are-a-second-copy`. Canvas naming and the materials guard left
  open above.
- **2026-08-28 (v2026.08.28.2)** — the ENACTED example rewritten to carry the
  which-green switch instead of reading absolutely (the absolutist reading ships
  a 3.56:1 dark label; the code was already correct). **The finding generalised:
  an example placed after a rule outranks it in practice**, because the example
  is what a hurried reader reads. The same class was then swept — four more
  sites still taught flat "action green for enacted" (accent `colors:` field,
  Archive register prose, accents inventory, `README.md`), which under the
  ratified rule is the spec instructing a 2.64:1 failure. Two resolved oxblood
  Known Divergences **deleted, not softened** — production migrated. New
  `color.action.fill-rule-ink-ground`: measure ink against the ground it lands
  on, never white (success is 4.99:1 on the page ground, 4.32:1 one plate step
  down), and **green tint plates carrying green ink cap at 10%** (4.52:1; 15%
  fails). Version scheme given a same-day serial, dated UTC.
- **2026-08-28** — the stage 2 queue, emptied. `fill-rule-which-green` (the
  fill rule was missing a sentence, not contradicting itself: fill-vs-ink is
  global; *which* green is ink is a contrast fact — `success` light, `action`
  inverted, action-as-text forbidden at 2.62:1; "where a crowd is counted"
  scopes the Momentum accent, not the semantic success family). Its corollary,
  `fill-rule-corollary`: **a rule that lives only inside a profile or a
  register is invisible to the general case** — claim 2 was already fully
  specified inside the email profile, and stage 2 re-derived it by measurement
  and landed on the identical pair. `color.neutral` re-pointed at the framework
  after Tailwind v4 moved zinc to oklch. Consumer token **extraction**
  sanctioned in place of the direct import that cannot work, with a mandatory
  CI regenerate-and-diff guard. The 12px-floor-versus-corner-badge question
  withdrawn — the spec already answered it ("if a label no longer fits at 12px,
  the layout is the problem"); queueing it was the error, not the rule.
  `DESIGN-HARD-RULES.md` restored after the repo-split prune deleted it.
- **2026-08-27** — `role-display-minor` (1.125rem, weight 700); `emphasis-serif-inline` (serif italic ≥1.125rem, roman 600 below); `widthDiscipline-measured` (chrome is wider than caption — a small label in a fixed narrow plate can't be chrome unless the plate widens); breadcrumb `weightHierarchy` (ancestors 400, current 600); `material-chrome` light resolved to 55%, dead 75% deleted; `darkMetrics-invariant` (light-clean implies dark-clean); the retired weight ladder purged from seven sites in the spec.
