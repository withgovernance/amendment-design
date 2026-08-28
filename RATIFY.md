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

*(nothing queued for ratification)*

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
