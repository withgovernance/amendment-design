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
- **kind:** conformance, in the consumer's repo — **and it is agent configuration, so it waits on a person, not on either agent**
- **found:** the 2026-08-28.9 pass, grepping for HEXP in a path nobody was watching. `.claude/skills/amendment-design/colors_and_type.css` is a REGULAR FILE, not the symlink `design/` uses, with its own `SKILL.md` differing from canonical.
- **evidence:** carries `--color-danger: #dc2626` — the red-600 that measures 4.39:1 and moved to red-700 on 2026-08-28 — plus no `--canvas-live` and six HEXP mentions. It is the file an agent LOADS AS ITS SKILL in that repo, so the staleness is taught rather than stored. A sweep for a fourth copy found none.
- **proposes:** symlink both files to the canonical repo, as `design/` already is. A copy that must be remembered will be forgotten.
- **status:** with Jason, with the two `ln -s` commands and the diff. The implementation session declined to make the change on a peer's say-so — correctly, and on the same boundary that had it decline Chromatic and the branch landing. **Neither agent should action this.**

## Needs a person — cannot close from inside the toolchain

Not a ratification queue. These do not resolve by deciding; they resolve by
someone doing something an agent should not do unprompted. Listed separately so
they stop reading as actionable to the next session that opens this file.

### Nobody is known to have reviewed the Chromatic diffs
- **why it is here:** it is a human looking at pictures, and no agent can do it or attest to it.
- **the situation:** the implementation session reported the migration's visual diffs "reviewed clean" and has since corrected that — it inferred review from the build being run and the URL being shared. **The accurate statement is that the baseline was taken on `main` and the branch built against it, so review is possible; whether anyone performed it is unknown.** The designer session never had access and never reviewed them either.
- **why it matters now:** the branch is unlanded. This is the one moment when walking the diffs is cheap and reverting is free. After landing, a visual regression is found by a user.
- **what to do:** open the Chromatic build for `design-pass-type`, step through the diffs, approve or reject. The migration touched colour, radius, type registers, targets and motion across the product, so the expected diff count is large — that is not a reason to accept in bulk.
- **who:** Jason, or anyone with access to the Chromatic project.

### CLOSED 2026-08-28 — real-client dark-mode email rendering
Jason authorised it directly and supplied the address; the implementation session
sent all three templates through the app's own `react:` render path — the same one
`inngest/services/email.ts` uses, so it exercised production's output — and he
checked them in-client. The CTA's ink label, the step badges switching under
inversion, and **the issuance block including the double rule** all held. The
double rule was the specific thing this file predicted Gmail Android would take
first; the prediction was wrong in the good direction. Result written into
`profiles.email.real-client-tested` rather than deleted, so the next person to
touch the issuance block knows it has been tested rather than assuming it is
fragile.

---

## Recently ratified

Moved out of this file on ratification; listed here for one cycle so the code side can see what landed.

- **2026-08-28 (v2026.08.28.17)** — `axis-must-be-declared-and-measured`. The old
  self-hosting rule's stated reason ("survives a blocked CDN") was **false** and is
  deleted — Newsreader and Plex Mono come from Google in the line above, so chrome
  surviving alone was never a chosen posture. Verified live: Google **does** serve
  Archivo's full `wdth` axis when asked. **But omit it and Google pins
  `font-stretch` to 100% silently** — the register collapses with no error. So the
  argument is about *where the axis lives*: self-hosted it is a property of the
  **file** and cannot be forgotten; on a CDN it is a property of the **URL** and is
  omitted by default. `retired-axis-fails-silently` from the other side. Whichever
  host: declare the axis and **verify by measurement** (a chrome string at wdth 125
  vs 62 must differ — ~230px vs ~116px), in CI, not in a comment. **The hosting
  choice is not ratified** — it turns on a privacy question that is not typographic.
- **2026-08-28 (v2026.08.28.16)** — `measure-before-you-shrink`, the missing half
  of the stat-caption ruling. That one answered "the label does not fit"; this one
  answers the common case, where **nothing was tight and the type was shrunk by
  habit**. Measured: "HOUSE OF REPRESENTATIVES" sets 251px at 12px with
  `--track-chrome` in a 358px column at 390 — fits with 100px to spare, was
  shipping at 11px. Three outcomes now named, and "the layout is the problem" is
  the rare one, not the default. Came out of the statutory composition pass, where
  the column was already correct at 69 characters and the real defect was a TOC
  gutter giving 49px to a single digit.
- **2026-08-28 (v2026.08.28.15)** — `a-guard-may-degrade-but-never-silently`,
  **revising a position both sides had already agreed on.** "A guard that skips on
  a missing credential is not a guard" is right about *silence* and wrong about
  *degradation*: a job red for reasons unrelated to the PR that trips it is a job
  someone deletes, so permanent red is a guard with a countdown on it. Two tiers —
  a credential-free stamp-versus-pin check that always runs, and the real
  regenerate-and-diff whose **absence posts a warning naming the check that did not
  run**. Generalised: *a check that cannot run must say so where its result would
  have appeared.* Fourth and sharpest member of the silent-failure family — the
  check itself reporting a result it did not earn. Also corrected: my "DESIGN.md
  differs by two lines" was measured at `.12` and quoted at `.14`, where it was 49.
- **2026-08-28 (v2026.08.28.14)** — real-client email testing **closed**, the only
  item that could not close from inside the toolchain. Sent through production's
  own render path and checked in-client; the CTA ink label, the inverting step
  badges, and **the issuance block including the double rule** all held — the
  double rule being the specific thing the profile predicted Gmail Android would
  take first. Recorded as a result, not deleted.
- **2026-08-28 (v2026.08.28.13)** — `enforcement-has-a-blind-spot`: every check
  here reads the class layer, so d3 / canvas / third-party-literal styling is
  invisible to all of it — **and that is where the previous two silent-failure
  rules were hiding.** `HexStateMap` verified carrying an explicit 8px clamp
  against the 12px floor and 18–35px tiles against the 44px target floor, past a
  clean lint run. **A clean lint run is a statement about the class layer, not
  about the product.** Filed as a ticket request; also recorded that the branch
  was built against `.10` and nothing since changed a rule or a token, so it
  needs no re-conformance.
- **2026-08-28 (v2026.08.28.12)** — three specimens (`ink-and-ground`,
  `uppercase-two-homes`, `tint-is-not-a-plate`) closing trap 3 for the day's
  rules, and `_card.css` corrected: it painted `--canvas` and drew the aurora
  over it, so all 52 cards had been demonstrating rules on a ground that
  contradicts one of them. A `.pane.dark` convention added — the frame had no
  dark mode at all.
- **2026-08-28 (v2026.08.28.11)** — the **entry points**, swept. `SKILL.md` was
  wrong or incomplete on eleven counts after ten same-day ratifications never
  touched it, including `red-600` as the danger value and no mention of the
  which-green switch at all. `_adherence.oxlintrc.json` sanctioned twelve
  `--hexp-*` entries three versions after their deletion. No new rules — the
  sweep those ten passes owed.
- **2026-08-28 (v2026.08.28.10)** — `composed-register-fails-silently`,
  contributed by the implementation session and the more useful half of the
  silent-failure pair: `sans-chrome` + `uppercase` + `tracking-wide` compiles,
  renders, and looks approximately right, and only a computed style says
  otherwise. A retired axis does nothing; a hand-assembled register does
  something close enough to look deliberate, which is **harder** to find.
  **So this is what the role layer is for, stated plainly for the first time: a
  role is the only form in which a register is CHECKABLE.** Nothing can assert
  about an assembly with no name. That is why the rule greps the assembly rather
  than measuring the value — and it caught the `input-label` UTILITY, where one
  line put every labelled field five times under and no call site was wrong. A
  sweep looks where things are used; a rule looks where they are defined.
  Tracking divergence 44 of 46 closed, verified by running the grep.
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
