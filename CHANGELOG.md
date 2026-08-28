# Changelog

Dated entries, newest first. No semantic version — the system is not consumed
as a package, and a version number would imply a stability contract nobody is
keeping. See `DESIGN.md` → **Governance**.

**Owner:** Jason — head of product & design, The Governance Company. Named 2026-08-02.

---

## 2026-08-28 (v2026.08.28.2) — The example that outranked its own rule, and the ground nobody named

The 08-28 pass earlier today wrote `color.action.fill-rule-which-green` and got
the rule right. It then closed the entry with an example — *"an ENACTED stamp is
`--color-success` ink … It is NOT the action green"* — that reads absolutely.
**Read alone, the example forbids in dark exactly what the rule requires there.**
Measured on the real page grounds rather than a nominal canvas: light, `success`
**4.99:1** vs `action` **2.64:1**; dark, `action` **6.72:1** vs `success`
**3.56:1**. The absolutist reading ships a 3.56:1 label. The code was never
wrong — `RubberStamp.tsx` ships `text-success dark:text-action`, which is the
rule applied — so this was purely about the next reader, who finds the example
before the rule.

The example now carries the switch. **The general lesson is that an example
placed after a rule outranks it in practice,** because the example is what a
hurried reader reads; an example that can be mistaken for the rule has to state
the rule's conditions itself.

**The queue found one instance of a class; the class had four more members.**
`fill-rule-which-green` was ratified without sweeping the sites that restate it,
and four of them still taught flat "action green for enacted" — the accent
`colors:` field, the Archive register prose, the tactile-accents inventory, and
`README.md`. Under the ratified rule those are not merely stale: **the spec was
instructing a 2.64:1 contrast failure in four places while the code did the
right thing.** All four now name the switch. This is the "grep the entry points
in the same pass" discipline failing on its first outing after being written
down, and `README.md` was again the last file to hear about it.

**Two oxblood Known Divergences deleted, not softened.** Both recorded
production stamping ENACTED in `text-red-900` and both said *Spec ahead — the
code has to migrate.* The code migrated. A resolved divergence left standing is
worse than no record, because it teaches the next reader that none of the other
divergence entries can be trusted either.

**New: `color.action.fill-rule-ink-ground`.** Claim 2 says `--color-success` is
the light-mode ink; it never said what it is legible *on*, and the answer moves
fast enough to matter. Success ink measures **5.48:1 on pure white, 4.99:1 on
the neutral-100 page ground the app actually renders, and 4.32:1 one plate step
down — a fail.** `RubberStamp` is background-transparent, so its contrast is a
property of its placement, not of the component. The number in the component's
own comment (5.48:1) is measured against a ground the page does not have and
overstates the headroom by roughly a full point.

The sharp end of this is a **10% ceiling on green tint plates carrying green
ink.** `AskSummaryCard`'s chip ships `bg-action/10` behind `text-success` and
measures **4.52:1** — clearing the bar by two hundredths. At 15% it is 4.31:1
and fails. That 10% is a framework step nobody chose: it survives on
measurement, not on intent, and it has no room to grow. Written down before
someone "rounds it up" to a nicer number.

**Version scheme, ratified.** `v2026.08.28` was already tagged and this pass
landed the same UTC day, so the date-only scheme had no way to express a second
ratification. Serial from the second pass onward — `v2026.08.28.2` — dated in
UTC because the first 08-28 pass already was, and a mixed convention makes tag
order stop matching history order.

**Left open** (in `RATIFY.md`): whether a *tint* plate is a plate for the
purposes of claim 1 — does a tinted chip read as a control? This entry settles
the contrast half only. It needs a render of the chip at several alphas beside a
real button, not an argument.

**Back to the code session as conformance, no decision needed:**
`RubberStamp.tsx` ships `tracking-[0.1em]` with a comment claiming "per spec";
chrome tracking is `--track-chrome` and the hard rules say 0.12em. It also names
`hexp-60`, a deprecated alias, where `sans-chrome` is the live token.

## 2026-08-28 — The fill rule's missing sentence, and a rule hiding in a profile (stage 2)

Stage 2 landed the colour tokens: `--color-action` exists, the CTA is flat green
with an ink label (measured 6.42:1 ink vs 2.90:1 white — the spec's own numbers
reproduced), the `!important` came off and **nothing overrode the label**,
oxblood is gone from the FAB and CTA, and the green audit fixed five fill-rule
violations across 32 green surfaces.

It also read the fill rule as contradicting itself, and shipped the permissive
branch on the evidence that 18 of 32 green surfaces survive only that reading.
**The rule does not contradict itself — it was missing a sentence**, now
`color.action.fill-rule-which-green`. Three claims were being conflated:

1. **Fill vs ink is global.** A filled green plate is a control anywhere; green
   ink is a report anywhere.
2. **Which green is ink is a contrast fact, not a taste one.** `--color-action`
   is a plate colour; as text it is 2.62:1 and **forbidden**. Green ink is
   `--color-success` on light, switching to `--color-action` under inversion.
3. **"Where a crowd is counted" scopes the Momentum *accent*** — the brand use
   of green — not the semantic success family, which keeps its conventional
   meanings (enacted, completed, verified) everywhere.

Read together, the permissive/strict split dissolves: most of the 18 surfaces
were semantic success, which was never in question. **But one consequence bites
what stage 2 shipped:** the ENACTED stamp went to action-green ink, which fails
contrast. It is legal as a green stamp and it must be `--color-success`.

**The finding underneath is the more valuable one.** Claim 2 was already in the
spec — fully specified, with the inversion switch spelled out — **inside the
email profile.** Stage 2 re-derived it from scratch by measuring both tokens
against both grounds and arrived at the identical pair. That is the strongest
possible evidence the rule is right, and that it was in the wrong section.

New corollary: **a rule that lives only inside a profile or a register is
invisible to the general case.** Profiles are where general rules go to hide,
because everyone reads them as being about email. When a rule surfaces while
writing a profile, hoist it to the section it governs and let the profile cite
it.

**Three more from the same queue, all accepted:**

- **The neutral ramp was annotated as a verbatim Tailwind alias and had stopped
  being one.** Tailwind moved its palette to oklch in v4; measured at v4.3.1 the
  framework has `oklch(96.7% 0.001 286.375)` where this file had `#f4f4f5`.
  Near-identical, not identical — so a consumer re-emitting the hex would nudge
  every `zinc-*` utility in its product off the framework's own value to fix
  nothing. `color.neutral` now **names** the ramp and cites the framework
  instead of copying it; `colors_and_type.css` keeps the hex only so the
  stylesheet stands alone with no framework under it, and says so.

- **A consumer cannot import `colors_and_type.css`, which is how `CLAUDE.md`
  described the consumer.** Three independent reasons, all measured: Turbopack
  refuses a CSS import that leaves the project root (a panic log, not a
  warning); the design checkout is gitignored in the consumer, so it is absent
  on CI and Vercel; and this file is a standalone drop-in that pulls two font
  families from the Google CDN the consumer self-hosts, and ships `role-*` and
  `material-*` as plain classes the consumer implements as framework utilities.
  **Extraction is now sanctioned, with one obligation: the consumer's CI
  regenerates the token file and fails on any diff.** A generated file is a
  second copy, and this one stamps the `spec-version` it came from — without
  the guard it drifts while carrying a stamp that has become a lie. That is
  why the guard is mandatory and not merely advisable.

- **The 12px floor versus a corner badge: the badge loses.** Two live
  violations (`text-[8px]` on a "Converts Best" hint, `text-[9px]` on a
  share-code count) were queued as needing a decision. The spec already made
  it — *"if a label no longer fits at 12px, the layout is the problem."*
  Queueing it was the error, not the rule. Shorten the copy, move it out of
  the corner, or drop it; an 8px label is not one of the options.

Also this session: `DESIGN-HARD-RULES.md` **did not exist** — it was deleted by
the repo-split prune script (my own instructions removed the folder holding it,
with a "grab this first" note above the `rm`), so `CLAUDE.md`, `/design-iterate`
and `/review-pr` all pointed at nothing for a day. Stage 2 fell back to the
repo's `CLAUDE.md` and got the rules right anyway. Rewritten and committed. The
trap is the familiar one at one more remove: **the file every enforcement path
depends on was the file nobody rendered.**

---

## 2026-08-27 — Light-clean implies dark-clean (PR 1d, and a new invariant)

The heading sweep finished: 63 conversions across 41 files, zero true headings
left on the sans stack. But the durable finding is the **verification method**,
which is better than the one this project had been using.

`stat.tsx` taught that 16px sans → 18px serif can outgrow a container, so the
sweep needed a clipping check in both schemes. Brute-forcing 160 stories × 2
schemes hit a hard 60s cap on the tooling. Instead of sampling, the question
was reframed: **how many dark-scoped rules change a type metric at all?**
Three, in the entire stylesheet — `role-stat-display` 700 → 650 (lighter,
therefore narrower, and no call site yet) and one `dark:font-medium` utility on
a free-wrapping bubble. A lighter weight cannot clip where light didn't.

So **light-clean implies dark-clean**, exhaustively over the stylesheet rather
than sampled over stories. Recorded as `typography.notes.darkMetrics-invariant`.

**What this reveals:** the single weight scale isn't merely tidier — it *buys*
an invariant. Retiring the parallel dark scale in PR 1 is what makes a
whole-stylesheet proof available instead of 320 screenshots. Any future
dark-only size, weight, tracking, or family spends it. That cost was invisible
until someone tried to verify something exhaustively and found they could.

**The generalizable move:** when exhaustive checking is too expensive, don't
sample — look for a property that makes the check unnecessary. Sampling proves
the cases you looked at; an invariant proves the ones you didn't.

Also: the implementation ran the retired-ladder grep on its own work and found
three bare weights in its own new role definitions (450 ×2, 650) — off-ladder,
specific, exactly the shape that survives a recalibration untouched. Now
tokenized, with `--serif-display/text/quote` threaded through named weights.
No bare `font-weight` number remains in `globals.css`. **The rule caught its
author before the reviewer did, which is the only real test of a rule.**

---

## 2026-08-27 — 497 came back, and the green fill rule has no home (PR 2 prep)

Two findings from the italic-subset / roles PR, one of them the most serious
divergence recorded to date.

- **`--color-action` does not exist in `globals.css`, and the shipped CTA is
  an emerald-600→700 radial gradient with `text-white!`.** The green fill
  rule — the system's central colour claim, the thing SKILL.md and
  DESIGN-HARD-RULES.md both lead with — **has no token behind it in
  production.** And the violation runs in precisely the direction
  `button-cta`'s own description warns about: a gradient under the label, and
  the label pushed to white because ink stopped being legible on a gradient.
  The ink label was never a preference; the fill's lightness was chosen
  *for* it. Recorded as a `known-divergence` on `button-cta`; PR 2 owns it
  and it is that PR's first item.
- **`role-action` deliberately NOT implemented, and the spec now says so.**
  Correct refusal: `role-*` is the type layer; a button is fill + ink +
  radius + padding + elevation + three states — a component. The Button CVA
  variant is the single home. The `.role-action` in `colors_and_type.css` is
  a specimen affordance for standalone HTML, now labelled as such.
- **The retired weight ladder came back into the spec — twice, one of them in
  a block written the same week the recalibration was ratified** (the
  breadcrumb `weightHierarchy` I added on 08-27 quoted 497). Five more sites
  found by grep: `roles.body` 362, `roles.label-caps` 497, `roles.caption`
  362, Clerk's 430/497/565. All corrected to the canonical scale.

  **Why it recurred, and the rule:** prose quoting a weight is an
  uncontrolled copy of a token, and **497 survives an edit that 600 would
  not — because 497 looks deliberate.** Nobody re-derives a number that
  specific; it reads as a measurement someone took. New
  `weightLiterals-warning` in `typography.notes`: cite the token, not the
  number, and treat every retired-ladder value
  (160/227/295/362/430/497/565/632) as a permanent search term.

Also shipped: Archivo italic subset to Latin-basic, 169,784 → 109,216 bytes
(−36%), critical path 314KB → 255KB, with `--layout-features='*'` kept so
coverage was the only variable changed. Three sans-italic call sites audited
first, all short English UI captions; non-Latin-1 glyph fallback documented at
the declaration site.

---

## 2026-08-27 — A clipped word settled a rule the prose couldn't (PR 1c)

Voyager PR 1c swept 59 of 123 sans-stack headings onto the serif display
rungs and, in doing so, produced the best kind of finding: a **measurement
that decided a reading two people could argue forever.**

- **`widthDiscipline-measured` added.** I called `stat.tsx`'s uppercase label
  "chrome-register drift," meaning *drifted off chrome*. The implementation
  took the opposite reading, moved it TO `role-label-caps`, and it clipped —
  "Endorsements" at wdth 125 + 0.12em is 150px of unbreakable word in a 144px
  plate. **The clip is the argument.** Chrome is wider than caption, so a
  small label in a fixed narrow plate cannot be chrome unless the plate is
  widened, and widening is layout, not type. Stat captions are `role-caption`.
  New general rule: when it's ambiguous whether a small label drifted off
  chrome or into chrome, set it at chrome width and see if its container holds
  it. **Chrome is for labels whose container was designed for chrome's width.**
- **Breadcrumb `weightHierarchy` stated.** Applying `role-label-caps` to the
  `<ol>` flattened every crumb to 497 and killed the current-page signal.
  Ancestors step back to 400; current keeps 497. A trail with equal weights is
  a list of links, not a trail. Tracking also corrected 0.05em → 0.12em —
  chrome's width without chrome's tracking is a different register, since the
  tracking is what recovers Archivo's narrower ceiling.
- **Chrome's two light values RESOLVED** — the last open unowned default from
  session 8. 75% sat on an `--animate-navbar` default with no call site; 55%
  is what every rendered navbar takes via `material-scroll`. Deleted the 75%
  rather than reconciling: **the value that reaches a surface is the value the
  system means.** Dark stays 90%.

Also: `display-minor` shipped at 1.25rem before ratification and was corrected
to 1.125rem — the ratification round worked exactly as intended.

**Rule this adds:** a spec sentence that supports two opposite readings is not
ambiguous prose, it is a missing measurement. Render both readings and let the
container decide.

---

## 2026-08-27 — The role layer got built, and told us three things

Voyager PR 1b (type-only pass on the Bot message surface + BillSummary)
implemented `role-*` in CSS for the first time. The spec had referenced the
role layer since the beginning and **it existed nowhere in code** — so every
call site was literals, which is the mechanism behind every drift this
project has recorded. Three findings came back up the pipe, all ratified:

- **`role-display-minor` ratified** (serif, 1.125rem, weight 700, lh 1.3).
  The scale had two display rungs; markdown emits h3/h4, so components were
  improvising a third from `text-lg`/`font-medium`. Weight steps DOWN from
  800 rather than up in size — a minor heading is a quieter instance of the
  same voice, not a smaller shout.
- **Inline serif emphasis is ROMAN below 1.125rem** (new
  `emphasis-serif-inline` role + a comment block at `typography.roles`).
  "Serif italic is quoted human voice" was true and incomplete: it holds
  above 1.125rem, where Newsreader's calligraphic italic is legible. At
  1rem inside body prose it is the metadata finding again — same face, same
  size, same illegibility. *A caveat is roman; a voice is italic.* Without
  this stated, the correct move looked like a rule violation at review.
  The blockquote **keeps** its italic: the defect was never the italic, it
  was rendering at 14px sans, below the floor where the italic is legible.
- **The `roles:` block is not the role layer's inventory** — flagged OPEN.
  The spec lists nine rungs; the stylesheet implements sixteen (lede, quote,
  metadata, stat-display, ceremonial, signature, action). The gap was
  invisible until someone building the layer had to ask which roles they
  were allowed to use.

**What the implementation also caught in production:** a `leading-7` (28px
absolute) on `<p>` over an inherited `text-sm` — line-height 2.0 arrived as a
*stack of two overrides*, not as anybody's decision; and `BillSummary`'s h3s
at `text-[11px]`, under the floor. Both are the padding-plus-inherited
arithmetic that produced the tab bar's 40px: **no single line was wrong.**

**Rule this adds:** a role the spec names but no stylesheet implements is a
literal waiting to happen. The role layer is the enforcement surface — if a
rung is missing from it, the call sites invent one.

---

## 2026-08-25 — The entry points taught retired rules (session 8 critical pass)

A holistic pass looking for flaws, contradictions and prune candidates — run
because agents consuming this system (Claude Code) were observed ignoring it.
The finding: **they were not ignoring it; they were obeying the wrong files.**
`SKILL.md` and the README's opening claims — the two things an agent reads
first — still taught rules the spec retired in the first week of August. An
agent that trusts the entry point recreates Merriweather headings, an Oxblood
CTA, a wax seal, and components ported from an archived kit, and every one of
those looks like "ignoring the design system."

**Stale claims fixed, all mechanical, all found by grep:**

- `SKILL.md` (rewritten whole): Merriweather in the ink layer (retired
  2026-08-01) · Oxblood "for action" (retired) · "wax-seal on send" (the seal
  is a colourless blind emboss, and it is *proposed*, not built) · "Emerald is
  a brand accent on the Commons only" (superseded by *green appears where a
  crowd is counted* + the fill rule) · "three-stop aurora" stated as a hard
  limit (the measured rule is chroma ≤ 0.22, ≤ 5 lobes, no bare text in the
  band) · "Pull components from `ui_kits/web/` — spec-faithful" (the kit was
  archived as superseded on 2026-08-15) · guilloche "draws left-to-right" (the
  draw-on exists nowhere; portrait fades) · proposed accents listed as freely
  buildable. The new file also states the hard rules in their enforceable
  2026-08-25 form (fill rule, 44/48 targets by `min-height`, `ch` ban,
  signature licence, streaming-is-not-motion) and declares precedence:
  DESIGN.md wins over SKILL.md and README.
- `README.md`: two ink-layer descriptions naming Oxblood · "citations in
  Oxblood superscript" (they moved to Midnight Indigo 2026-08-01) · "No fourth
  lobe. No hue broadening." (contradicted the rewritten `a11y.contrast`) ·
  "voyager is private — install the GitHub App" (readable since 2026-08-02) ·
  "43 specimens, eleven files with no marker" (resolved 2026-08-12) · step 5
  still told consumers to pull from `ui_kits/web/`.
- `DESIGN.md`: `components.button-cta.hover` read "shift to red-700 → red-800
  gradient" — the oxblood leftover flagged 2026-08-13 and left for a colour
  pass; now `color.action-hover`, flat, with the pressed-state constraint
  restated. And two heritage lines: "Merriweather 800 carries gravity"
  (→ Newsreader `--serif-display`) and "Oxblood does that job here" on
  secondary CTAs (→ one action colour + the fill rule).
- `github.md`: "Needs a decision: is Archivo the target?" — recorded as
  undecided in the 08-15 sync **two days after the 08-13 changelog decided
  it**. Resolved as written: Archivo is the target; Readex in production is a
  Known Divergence, spec ahead.

**Pruned:** `01-scraps`…`05-scraps` — five extensionless JPEG binaries at the
project root, referenced by nothing.

**Flagged, not deleted:** `Amendment - Touch Targets.html` at the root — a
one-off share export duplicating `preview/touch-targets.html`, styled in
`-apple-system` rather than the system's own faces. Delete or move to
`scratch/` if it has no audience.

**The rule this session adds:** *an entry point is a specimen too.* The system
already knew unshown files go wrong (the eleven non-cards) and that literals
drift (the card sweeps). SKILL.md is the most-read and least-rendered file in
the project — nothing renders it, so nothing contradicted it, for 24 days.
When a decision lands in DESIGN.md, grep the entry points for the value it
retires, in the same pass.

---

## 2026-08-14 — Sans body width: `wdth` 104

Applying the type audit's one unapplied decision (handoff of the same date, from
a consuming project that had already run it in its `_ds/` copy). `--sans-body`
moves from the axis default 100 to **104**.

**Why.** Widening a face *lowers* its character count. Measured in a 28rem column
at 16px: Readex at `HEXP` 2 — the face the measure was calibrated on — set **56**
characters; Archivo sets **63** at `wdth` 100, **60** at 104, 59 at 106, 57 at 110.
At the axis default, body copy is seven characters a line tighter than before the
family changed, which nobody chose. 104 is also where Archivo's *O* is a circle
(pixel ink ratio 1.014 at 104, 1.028 at 106, true 1.000 at ≈102). Full parity with
Readex needs ≈110, where lowercase stops reading as a text register — so 104 is the
deliberate compromise between parity and rest state, not a rounding. **`ch` remains
banned:** these are counted characters of the rendered face.

**What changed.** `colors_and_type.css` `--sans-body` (and therefore `--hexp-2/10/40`,
`.role-body`, `.role-body-lead`, `.amendment-app`), `DESIGN.md`
`typography.widthPresets`, `README.md`, and the `Type — Three families` card, which
named body width literally.

**Recorded as still open.** The 69-character `measure.body` was counted in
Newsreader; grading sans copy against a serif count is the category error `ch` was
banned for. **Sans body copy still has no counted measure** — noted in
`DESIGN.md` → `spacing.measure`.

**Card sweep, same day.** Two classes of stale literal in `preview/`:
`font-variation-settings: 'wdth' 1000` in five cards — out of Archivo's 62–125
range, so it clamped to 125 and looked right by accident; a bad find-replace
during the Archivo swap. Repaired to `var(--sans-ceremonial)` (Receipt kicker,
attestation caption) and `var(--sans-body)` (the brand/seal sub-labels, which are
lowercase and untracked and so were never chrome). And **86 hardcoded weights
across 35 files** — the pre-recalibration ladder (160/227/295/362/430/497/565/632)
written as numbers — now name `--sans-thin`…`--sans-extrabold`. This is visible:
those cards were rendering one to two steps light, chrome labels most of all.
`type-weight-ladder.html` keeps its literals on purpose; it is the ledger of the
old scale.

A review pass then caught a third class and one card that lied about itself.
`Type — The institution speaks` — the card whose job is to document the sans
registers — was rendering body at `'wdth' 100` and captioning it "wdth 100,
weight 362"; it now uses `var(--sans-body)` and says 104 / 400. And **29
`letter-spacing: 0.05em` chrome literals** across the cards were the PRE-Archivo
`--track-chrome` value, left behind by the 2026-08-13 move to 0.12em — the very
tracking that recovers Archivo's ~4% narrower chrome ceiling, so the cards were
under-tracking the register they exist to demonstrate. Now `var(--track-chrome)`.
In the same pass **42 `'wdth' 125` literals** became `var(--sans-chrome)`, since a
literal is exactly how all of this drifted.

**Not adopted from the handoff.** It proposed `--track-ceremonial` 0.18em; this
system shipped 0.20em on 2026-08-13 and keeps it — ceremonial is now separated
from chrome by tracking alone, and 0.18 against chrome's 0.12 is too small a gap
to read. Its other open items were already closed upstream: Archivo is
self-hosted with both variable cuts, `fonts/ReadexPro.ttf` is deleted, and the
wax-seal monogram now owns its own proportions rather than inheriting the
ceremonial preset.

---

## 2026-08-13 — Primary sans: Readex Pro → Archivo

Evidence: `Sans Candidates — Specimen.dc.html` (five faces, live-measured ledger).

**Why.** Readex was excellent as chrome and wrong as a body face: wide, soft,
evenly weighted, so word silhouettes flatten at paragraph length. It also had
**no italic**, which is the real reason every italic in the system had to be
serif. Archivo keeps the one-face-two-registers idea (`wdth` 125 for chrome),
adds a true italic at every weight, and recedes under Newsreader instead of
competing with it.

**What changed.** `colors_and_type.css` — Google Fonts now loads Archivo
(`ital,wdth,wght`); Readex's GF entry and the local `Readex Pro Local`
`@font-face` are gone, and `fonts/ReadexPro.ttf` is deleted. New width presets
`--sans-body` 100 · `--sans-chrome` 125 · `--sans-display` 120 ·
`--sans-ceremonial` 125, plus `--track-chrome` (0.12em, up from 0.05em) and
`--track-ceremonial` (0.20em). `--hexp-*` are kept as **deprecated aliases** onto
the new presets so shipped component code and the adherence lint keep resolving
mid-migration. `DESIGN.md` (`typography.fontFamilies.sans`, `sansAxis`,
`widthDiscipline`, `widthPresets`, the label-caps role, the email profile's
substitution table, the prose chapter), `README.md`, `SKILL.md`, `fonts/README.md`,
`assets/README.md` and the four wordmark SVGs follow. Every card, kit stylesheet
and exploration that named the axis literally (`'HEXP' 60`) now names `'wdth' 125`.

**Two costs, stated.** The chrome register is **~4% narrower**: Readex at HEXP 60
measured 334px for `ARCHIVE COMMONS WRITING DESK` at 12px; Archivo at `wdth` 125
— its ceiling — measures 322px. HEXP was the more powerful axis; recovered in
tracking, not size. And **width can no longer separate four registers**, because
chrome now sits at the ceiling; ceremonial is distinguished by tracking and size.
Correct hierarchy anyway, but a spec change, not a token swap.

**Follow-up audit, same day.** Reviewing the type section caught four things the
migration itself introduced or exposed. (1) The width presets are **not a
monotonic ladder** — chrome (125) is wider than display (120) — which the
type-families card was describing as "body → chrome → display → ceremonial."
Width separates the *clerical* register from the *editorial* one; display
escalates by size and weight, ceremonial by tracking. Now stated in the token
comment and in `DESIGN.md`. (2) An **italic policy** was written down: serif
italic stays the italic of record for quoted voice, but Readex's absence of any
italic meant `<em>` inside sans copy was getting a browser-*synthesized*
oblique — the "every italic is serif" rule was partly describing that
constraint. Archivo's drawn italic needs no new role, just `<em>`. (3)
`.role-body-lead` carried a raw `font-weight: 200`, off the scale and below
`--sans-thin`; it now uses `--sans-extralight`, which matters more in Archivo
because the ladder reads lighter. (4) `Type — Roles` claimed "every typography
role in one ladder" while omitting lede, body-serif, caption, code,
stat-display and ceremonial; all six are now in the card.

**Archivo self-hosted (same day, after upload).** The pre-wire from item 2 below
is now live: both variable cuts were uploaded as
`fonts/Archivo-VariableFont_wdth_wght.ttf` and
`fonts/Archivo-Italic-VariableFont_wdth_wght.ttf`, wired as one `'Archivo'`
family across two `@font-face` rules (`font-weight: 100 900`,
`font-stretch: 62% 125%`), and **Archivo is removed from the Google Fonts
`@import`** — Newsreader and IBM Plex Mono stay on the CDN, since neither has a
local cut and neither has a width axis to lose. The chrome register no longer
depends on a reachable CDN, which is the whole reason the local cut mattered.

VERIFIED rather than assumed, because the failure mode here is silent: a cut with
its `wdth` axis stripped loads cleanly and collapses chrome to normal width
without erroring. `document.fonts` reports
`Archivo/normal/100 900/62% 125%` and `Archivo/italic/100 900/62% 125%`;
`ARCHIVE COMMONS WRITING DESK` at 12px measures **251.7px at `wdth` 100 and
315.7px at 125**, so the axis is doing real work; and the italic has metrics
distinct from the roman, i.e. drawn, not synthesized. That width spread is the
check to re-run after any future font swap — it is recorded in
`fonts/README.md`. Self-hosting also cut Archivo from six CDN slices to two
faces.

**The three open items, closed (same day).** Evidence: `scratch/weight-measure.html`,
a canvas ink-coverage harness, and `preview/type-weight-ladder.html`, the ledger card.

1. **Weight scale recalibrated to canonical 100…900.** The old ladder
   (160/227/295/362/430/497/565/632/700) interpolated Readex's range to
   compensate for Readex reading optically heavy; Archivo needs no compensation,
   and its named instances are the designer's own drawn stops. Measured by ink
   coverage of a fixed pangram at 16px, the drift grew monotonically up the
   ladder: the bottom three rungs were within 8% of their names, "semibold" 497
   had the ink of Archivo's **Medium** (297,388 vs 298,483 at 500), "bold" 565 was
   **lighter than its SemiBold**, "black" 700 was **exactly its Bold**, and
   800/900 were unreachable. The cost is concentrated in one token:
   `--sans-semibold` 497 → 600 (+13% ink) carries the CTA label, the chrome
   label, the ceremonial register and the seal, so all four get visibly heavier.
   Propagated to `DESIGN.md`, `README.md`, `proposed/…/tokens.json` and
   `tailwind.config.example.js`.

2. **Local Archivo cut pre-wired, files not shipped.** The binary cannot be
   fetched from here, so the next-best thing was done: `'Archivo Local'` is
   declared first in `--font-sans` with roman and italic `@font-face` blocks
   (`font-stretch: 62% 125%`). When the files are absent the `@font-face` fails
   and the stack falls through to the Google Fonts `'Archivo'`, so the wiring is
   safe to leave in place and activates with **no CSS change** the moment
   `fonts/Archivo.woff2` and `fonts/Archivo-Italic.woff2` are dropped in.
   `fonts/README.md` names the two files and the trap: some redistributions strip
   variable axes, and a cut without `wdth` silently defeats the point.

3. **The seal monogram redrawn — and the diagnosis was wrong.** The open item
   blamed the ceremonial preset's width. Measurement found the real fault was
   **size**: at 26px the A spanned 24.9px inside a 63.8px inner rule — 39%, a
   monogram rattling around in its own seal — and Readex's HEXP 100 had been
   hiding it. A die is drawn to fill a circle, so the glyph is a function of the
   die, not of the body copy's widest text preset. `.seal-emboss` now sets an
   explicit `"wdth" 125` rather than inheriting `--sans-ceremonial`, sized to
   ~54% of the inner rule at every size (36 / 24 / 44px). Letter-spacing dropped
   to zero: on a single glyph, tracking is pure trailing space, so the 0.06em it
   carried was shoving the letter left of centre.

**Three bugs surfaced by doing the above, all fixed.**
`.role-display-stat` — the selector on the dark-mode optical bloom correction,
in all three of its branches — **does not exist**; the role is
`.role-stat-display`, so the system's one dark-mode weight correction had never
fired since it was written. Its literal moves 520 → 650 to stay ~8% under the
recalibrated `--sans-bold`. `README.md` still described the seal as "a flat
circular Oxblood with the monogram embossed in white/parchment", eighteen months
after oxblood was retired and the seal became a blind emboss.
`proposed/design-system/dark-mode.md` said the same thing ("the seal is meant to
be Oxblood regardless of mode").

**Still open, noted not fixed:** `DESIGN.md` `components.button-cta.hover` reads
"shift to red-700 → red-800 gradient" — an oxblood leftover that contradicts
`--color-action-hover` and the no-gradient-under-an-ink-label rule two lines
above it. Outside the type section, so left for a colour pass.

**Original open items.** Readex is retired *entirely*, including the HEXP-100 ceremonial
caption — its one defensible niche was expansion beyond `wdth` 125 on the Receipt,
where the ceremony is already carried by paper, guilloche, emboss and the mono
ledger number, and a second family for one caption is not worth the export and
print fragility. The **weight scale is not recalibrated**: `--sans-*` was tuned
for Readex's 160–700 and reads slightly lighter in Archivo's 100–900. **No local
Archivo cut ships** — a blocked Google Fonts request now collapses chrome to
normal width (legible, not institutional). The **wax-seal monogram renders
narrower than the spec image**, since it inherits the ceremonial preset; the
specimen art should be redrawn rather than assumed to match.

---

## 2026-08-12 — The eleven non-cards: ten deleted, one promoted

`preview/` held eleven files with no `@dsCard` marker — in no tab, shown to
nobody, and readable by anyone who opened the folder. Flagged in session 5,
carried through 6 and 7. Resolved by reading all eleven against their
replacements first.

**They were not cards that lost a marker.** Every one was 745b–3.3kb with no
`<h1>` and no `.sub` — the shape of a fragment authored *before* the card format
existed. That changed the question from "which are dead" to "does anything here
survive its replacement".

**Nine were redundant, not wrong.** Every hex and oklch was checked against
`colors_and_type.css` — `#1e293b`, `#64748b`, `paper-cream`, `paper-parchment`,
the three aurora hues, the 87/55/38 scale — all current.

**One was actively wrong.** `type-serif-display` labelled the display face
**Merriweather 800** while rendering in **Newsreader**. It had survived six
sessions of reading because nothing renders it.

**One was kept and promoted.** `brand-aurora-still` was the only specimen of
`assets/aurora-still.svg`, the flat fallback for email and raster export, and no
card covered it. It now has a marker (`Brand — Aurora, flat`), a title, and the
rule it was missing: **it is not the print fallback** — print has no aurora at
all, per `profilesPrint`.

Deleted: `type-serif-display` · `color-aurora` · `color-primary` ·
`color-functional` · `color-text-opacity` · `material-tiers` · `paper-canvases` ·
`type-hexp-axis` · `type-sans-body` · `type-mono`, plus the working comparison
sheet `_orphans.html`.

Its first marker was written from a guess (`700x360`) and the harness measured
540 — **clipped by 180px, a third of the card**, on the one file this cleanup
added. Trap #8, caught mechanically inside a minute, and unreachable by reading.
Corrected to `700x540`.

**All 47 files in `preview/` now carry a marker.** The folder and the tab are the
same set for the first time.

> **A folder and its tab should be the same set.** A file the tab does not show
> has no reader and no maintainer, and the failure mode is not clutter — it is a
> confident wrong claim with nothing to contradict it.

---

## 2026-08-12 — `profilesPrint` gets its specimen

The profile went canonical on 2026-08-04 and was cited by no card for eight days,
which is the exact failure session 4 named. `preview/print-profile.html` now
shows it: the unowned default beside the profile, at true US Letter geometry.

- **Both sheets are authored at 816 × 1056px — real US Letter at 96px/in** — and
  shown at 53%. So the card *measures* its own rules instead of asserting them:
  1.00in margins, a **6.50in measure**, **0.40in** of clear space above the
  printed name, folds at 3.67 and 7.33in. Authoring at true geometry is the
  point, because scaling is this system's recurring bug.
- **A stated miniature exception.** Type inside a sheet is 11.5pt on paper and
  renders ~8px on screen. That is licensed — *a specimen may render below the
  floor only as a scale model of an artifact authored at another size, and it
  must say so in the file* — so the card says so, in a comment and in the visible
  legend. Everything the card says *about* the sheets is authored at card size
  and holds the floor.
- **The defects are shown, not described.** Flat black beside the re-based
  100/45/none scale; **the real `.seal-emboss` rendered on a white sheet** beside
  the ledger number that replaces it; 8px of signature clearance beside 0.4in; the
  missing postal block beside a mailable one.

### Rendering the emboss corrected the spec's own prediction

The card first *drew* the printed seal as a grey sphere, which was the same
mistake as `65ch` and `scrollHeight`: **a proxy for the thing producing a
confident claim about the thing.** `.seal-emboss` exists in the stylesheet this
card already loads, and a browser on a white sheet with no paper beneath it **is**
the printer's situation — so the component was rendered instead.

It does not come out as grey mud. **It comes out a pale grey ring**, and
`profilesPrint.emboss` has been corrected to say so. The correction strengthens
the rule: the failure is not that the emboss prints badly, it is that it prints as
a *picture of relief* and so carries no authority at all. **A faint ring is worse
than a smudge, because a smudge at least looks like an accident.**

Also worth keeping: the drawn version used `#6e6e6e`, a neutral grey. The real
`--seal-shadow` is `rgb(96 62 28 / 30%)` — warm brown. The illustration was wrong
about the hue as well as the outcome.

**Deleting it took three passes.** The first delete **silently no-matched** — the
target string omitted a trailing `margin-top:14px` — so the invented rule stayed
in the file while the work was reported as done. A find-and-replace returns the
document unchanged on no-match, and unchanged is indistinguishable from succeeded.
Scripted edits here now assert their own match and throw on equality. Grepping for
the deleted name afterwards found a **second** stale claim the pass had missed:
the rules list still said "grey mud" in prose, which is now corrected to the
rendered result.

Final state, harness re-run to `done`: **0 clipped / 0 slack / 0 floor breaks
across 57 files**, marker `1000x1857`.

### The count that was wrong twice in the same way

Session 6 recorded seven non-card files in `preview/` against session 5's
eleven, and on 2026-08-11 that was corrected back to eleven. Today's run read
**seven** again — and then settled at **eleven** with "all measured". Both wrong
readings were the same mistake: **the harness counts as it loads, so any number
read before it reports `done` is a number about a partial run.** Eleven stands.

Session 5's trap #11 says to run a measuring tool twice and diff the runs. The
sharper form, earned twice now: **a tool that reports progress can be read at a
moment when it is telling the truth about nothing.** Wait for `done`.

**The mirror image landed in the same turn.** Rewriting the emboss legend added
two wrapped lines and clipped the card by 50px, while a *finished* harness run
from before the edit sat on screen still reporting 0 clipped. **A stale clean run
is more dangerous than a mid-load one**, because nothing about it looks
provisional. Marker corrected to `1000x1798`; re-run to `done`, 0 clipped / 0
slack / 0 floor breaks across 57 files.

---

## 2026-08-11 — The 44px floor is cited, and citing it found four more violations

`a11y.targetSize` got its provenance on 2026-08-02 and was still cited by exactly
one component. Its own enforcement clause says a component that does not declare
its target is not enforced, so the citation was the whole remaining job. **Citing
it is what found the violations** — the same sequence as the 12px floor, which
found 20 the moment it had a single home.

### Measured, at the values the spec itself states

| control | as specified | arrives at |
| --- | --- | --- |
| `button-default` / `-secondary` / `-ghost` | `0.5rem 1rem` + 16px × 1.5 | **40px** |
| `input` | `8px` + 16px × 1.5 | **40px** |
| `toggle` | `44 × 24` track | **24px** |
| `breadcrumb` | 12px caps, line-height 1 | **~12px** |
| `button-fab` | `size: 48px` | 48px ✓ |
| `button-icon` | `size: 44px` | 44px ✓ |

**The two that comply are the two that state a size.** Everything else arrives at
its height by `padding + line-height` — which is not a decision anybody made, and
is precisely how the tab bar shipped 40. Four controls, none of them by intent,
and every one of them had passed six sessions of reading.

**The toggle is the instructive one.** Its spec said `44px × 24px track`, and the
44 is the **width**. A rule about a square, a spec line containing the right
number for the wrong axis: that is how a violation survives being read. The
control is 55% of the floor vertically.

**The breadcrumb is the worst** — 27% of the floor, on the only control that
walks back up a bill's hierarchy.

### What changed

- **Nine `touchTarget` blocks** in `components`, each naming `a11y.targetSize`
  and stating its own minimum: the buttons at 44, **`button-cta` at 48** (Send and
  Co-sign are the consequential thumb-reached case `targetSize.not-the-floor`
  names), `button-fab` and `button-icon` recording *why* they already complied,
  `input` at 44, `toggle` and `breadcrumb` by expansion, and `card-select`
  recording compliance that genuinely does follow from its content.
- **New `a11y.targetSize.how`** — the mechanism, which did not exist and is the
  reason this is fixable without redesigning four controls:
  > **`min-height`, not more padding.** Padding changes a plate's proportions and
  > its label's optical centring; a declared minimum leaves a compliant control
  > untouched and grows only what falls short. Where the visible control must
  > stay smaller than the floor, **expand the target, not the box** — a
  > transparent hit area at the minimum, centred. Appearance and target are two
  > geometries and this rule governs only the second.
- **New `a11y.targetSize.cited-by`**, so the next session can see at a glance
  that the rule has consumers. Before today: cited by one, violated by five.
- **New card `preview/touch-targets.html`** — draws the 44px floor as a hatched
  band each control either fills or does not, and **measures itself**: 40 / 44,
  40 / 44, 24, 12. Both fixes shown next to both defects.

**Rejected: fixing the buttons with padding.** `0.75rem 1rem` reaches 48 and
changes every button's proportions and the optical centring of every label, to
solve a problem that is not about padding.

**Rejected: growing the toggle track to 44px tall.** It stops reading as a switch,
and the 16-in-24 thumb geometry is what makes its state legible.

### Also

- `preview/type-newcomer.html`'s viewport was 90px short — fallout from the
  measure sweep on 2026-08-04 (the lede narrowed from 26.5rem to 24rem, and
  narrower prose is taller prose). Session 6's own note said to rerun the harness
  after anything that changes text width; this is the card it missed.
- Session 6's handoff recorded seven non-card files in `preview/` against session
  5's eleven. **The seven was read mid-run** — the harness counts as it loads.
  Eleven is right; corrected in place.

**Owed to production** (spec-ahead, added to the standing list): the 40px button
and input heights, the toggle's 24px target, the breadcrumb's ~12px target.

---

## 2026-08-04 — `ch` is retired from the token layer, and print becomes a profile

### The measure: 65ch was rendering 97 characters

Session 5 left the `ch` ambiguity open with an explicit first move — measure the
shipped columns before touching the token, because 89 characters might simply be
what those surfaces had always been. Measured (`explorations/What 65ch
Measures.html`, two runs identical): **the prose column is 97 characters**, and
the reason is worse than the number.

> **`ch` is not a unit of measure. It is a unit of the element it is written
> on.** `.page--prose` carries `max-width: 65ch` and inherits the body **sans**;
> the prose inside it is the **serif**. So the column is 65 Readex Pro zeros
> (9.79px each) filled with Newsreader characters (6.53px each) = 636px = 97
> characters. **Nobody chose 97.**

Two ambiguities stack, and only one is the one session 5 found:

- **Within a face** — the zero glyph is 42% wider than Newsreader's average
  rendered character. Session 5's finding.
- **Between two faces** — the measuring face is not the rendered face, and the
  sans zero is **50%** wider than the serif's average glyph. New, and larger.

**Self-consistency is not the fix.** `.bill-lede` was the one honest case —
`52ch` written on the very element it sets — and it still rendered 74
characters. `65ch` set on the serif itself is 92.

**A `ch` value in a custom property has no single value at all.**
`container.normal` is consumed by elements in different fonts, so it computed
636px on the page shell and 601px on a serif element. A length that computes
differently per consumer is not a token, and it cannot be audited by reading —
which is why four sessions of reading missed it.

### What changed

- **New `spacing.measure`** — `body: min(28rem, 100% - 2rem)` (69 characters of
  `role-body-serif` at 16px), `lede: min(24rem, 100% - 2rem)` (47 characters at
  20px), `print: 6.5in`. Target 69, ceiling 75. **Stated mobile-first**, so the
  `min()` removes the need for a breakpoint — this also closes the last item of
  audit §3.7, which is why it was sequenced after this one.
- **`ch` is banned from length tokens**, with the reason recorded in
  `spacing.measure.rule` so the ban is arguable-with rather than inherited.
- **A container is not a measure.** `container.*` are shells; `measure.*` cap the
  element that *holds the text*. `container.normal` is now `min(31rem, 100%)` —
  the measure plus `.page`'s own 24px gutters.
- **`.measure` / `.measure-lede` utilities** in `colors_and_type.css`;
  `.role-lede` and `.bill-lede` re-based to `measure.lede`; `.page--prose` to the
  shell value.
- **The lede's stated intent is restored.** `colors_and_type.css` had said the
  lede measure is "deliberately shorter than the 65ch prose column" — measured,
  it was 600px against 636px, **one character of visible difference**, because a
  larger face has a wider zero and bought back nearly all the width it was meant
  to give up.
- **The specimen layer swept** — eleven `ch` declarations across seven cards plus
  `preview/_card.css`'s own `.sub`, each converted to a counted line in rem at
  that rule's own face and size. Four viewport markers re-measured afterwards
  (narrower prose is taller prose) and `preview/measure.html` added, which states
  the rule and **measures itself rather than asserting**: 97 / 69 / 47.

**Rejected: moving `ch` onto the text element and keeping the unit.** It fixes
the font mismatch and leaves the unit mismatch — still 92 characters. **Also
rejected: keeping 97 and re-labelling the intent.** The user confirmed the token
was meant to set a readable line length for copy, so 97 is not a preference the
system had; it is arithmetic nobody read.

### Print — the mailed letter is a profile with a `requires:` list

`profilesPrint`, canonical. The last item of audit §3.8, and with it **all ten
audit items are resolved** (item 6 partial by design).

**Paper is not a degraded screen — it is this register's home.** `paper-cream`,
the emboss, the guilloche, the ledger number and a Scotch roman are all
imitations of paper, so print is the one transport where the ink layer is
literally true and the aurora cannot exist. That costs nothing: the aurora never
carried meaning.

- **Ink is re-based, not flattened** — 100 / 45 / none. `* { color: #000 }`
  deletes the 87/55/38 scale, and that scale is how ink sits on a page, not a
  screen affordance.
- **The sheet is the paper canvas.** Cream does not print: a cream fill is an ink
  wash across a whole page, it bands on consumer printers, and the stock already
  has a colour. The canvas token was always standing in for this.
- **The emboss cannot print.** A printer can only print a picture of a
  deformation, and it renders as grey mud on the very artifact whose authority it
  was carrying. **The ledger number carries the proof instead** —
  `registers.issued.proof-rule` load-bearing in a third transport.
- **The dotted signature rule is canonical here, not proposed.** On screen it
  anticipates an act; on paper the act happens. 0.4in of clear space above the
  printed name, and the printed name is mandatory.
- **The ledger number prints** as one line in the closing, and this is the one
  place a user may suppress it — on a mailed letter it also discloses that the
  letter came through a platform.
- **`requires:` is new to the profile mechanism.** Paper has content
  requirements the screen has no equivalent for. The user confirmed the product
  holds the constituent's postal address (used to place them in the correct
  districts, shown to nobody else), so **the return block is printed, not ruled
  for a pen** — printing a user's own address on the letter that user mails
  discloses nothing new.

`proposed/design-system/patterns/print.md` is **promoted and superseded**, with
its two wrong lines kept as a record: the flat-black rule and "restore solid
surfaces". Its `break-inside: avoid` was also unobeyable past one sheet — the
letter now specifies a continuation header instead.

**Owed to production** (spec-ahead, added to the standing list): voyager's
`--changelog-content-cap: 65ch`, which renders 85 characters in the sans.

---

## 2026-08-02 — The 44px floor gets its provenance, and print gets an exploration

### `a11y.targetSize` now names its source

The rule has said "interactive targets are at least 44×44 px" since the
beginning, and session 4 found it cited by no component and violated by the
shipped tab bar. Session 5 found the reason it was so easy to ignore: **the
number had no source attached.** An inherited number is a number the next person
argues with.

Recorded, and verified current on 2026-08-02:

- **Apple HIG** — "maintain a minimum tappable area of 44pt × 44pt for all
  controls", unchanged since the original iPhone HIG. This is where our number
  comes from.
- **WCAG 2.5.5 Target Size (Enhanced), AAA** — independently 44×44 CSS px. Two
  authorities, two unit systems, one number; that agreement is the argument.
- **Units** — Apple's 44 is points, ours is CSS pixels. On a mobile viewport they
  coincide, which is why the tab bar measured at 390pt and specified in px is not
  a unit error. Off one, the CSS pixel governs.
- **Android/Material asks 48dp**, so **44 is the floor of the three, not a
  target.** Dense, consequential or thumb-reached controls go to 48.
- **WCAG 2.2's 2.5.8 (AA) says 24×24.** Newer criterion, smaller number — so it
  is the one that will be cited to justify shrinking a control. Recorded so it is
  recognised in an argument, not mistaken for an update.

**Rejected: leaving the number bare.** It survived four sessions bare and was
enforced in exactly zero components; the tab bar's 40px targets were not a
disagreement with the rule, they were the absence of one.

### `explorations/The Printed Letter.html`

The last of audit §3.8, argued and open. Classified as an **unowned default**:
`DESIGN.md` has no print block at all, nothing in the product prints a letter,
and `proposed/…/patterns/print.md` holds an unpromoted stylesheet under which
the browser's print engine picks the margins and the breaks.

The thesis, for the record before the decision: **paper is not a degraded
screen, it is the register's home.** Every other transport imitates it —
`paper-cream`, the emboss, the guilloche, the ledger number, a Scotch roman
chosen as the face of the printed record. Print is the one transport where the
ink layer is literally true and the aurora cannot exist, which costs nothing
because the aurora never carried meaning. Both sheets are authored at true US
Letter geometry (816×1056 at 96px/in) so every length is in inches, not eyeballed.

Eight candidate rules, of which three are the interesting ones:
`* { color: #000 }` deletes the 87/55/38 ink scale and should re-base to
100/45/none; **the 65ch measure does not transfer to paper**, and the way it fails is
better than the way I first wrote it. `ch` is the advance width of the ZERO
GLYPH, and Newsreader's zero is ~37% wider than its average lowercase
character, so `max-width: 65ch` (5.98in at 11.5pt) and "a 65-character line"
(4.35in) are two different lengths — 1.6in apart on an 8.5in sheet. **The token
is ambiguous before it is wrong.** My first pass computed the ch figure from
average character width, printed 4.35in, and called the result "a poster"; the
verifier caught it, which is trap #4 (rasterise before writing a number) landing
in geometry. Setting the measure in inches by the margin removes the ambiguity
rather than resolving it; and **the emboss cannot print**, so the ledger number carries the proof,
which is `registers.issued.proof-rule` load-bearing in its third transport.

Five questions asked, including one that is a product gap rather than a design
question: **does the product hold the user's postal address?** Without it the
sheet is not mailable and no styling fixes that.

### Ownership

**Syncing production to the system is the user's.** All six code fixes owed
(guilloche redraw, the Receipt's 9.6px caption, oxblood ENACTED, the tab bar's
three, skeleton token migration, Clerk's yellow warning) sit with him; the
handoffs should stop asking who owns each.

---

## 2026-08-02 — The specimen layer gets a stylesheet and a measuring tape

Recommended in sessions 1, 2, 3 and 4; done now, and it turned out not to be a
tidiness job. Three of the standing traps share one mechanism: **54 files whose
chrome was retyped by hand, one file at a time.**

### `preview/_card.css`

Holds the frame only — canvas, the fixed aurora, `.card`, and the four text
roles a card captions with (`.lbl`, `.voice-eyebrow`, `.caption`, `.note`),
plus `h1`/`.sub` and a link colour. Migration was mechanical: a rule was
deleted from a card only where every declaration matched the shared value, and
trimmed to its differences otherwise. 211 rules deleted, 55 trimmed to the one
or two declarations that actually differ. Cards keep their own `<style>` for
what they are demonstrating.

**It holds no specimen styling, and that boundary is the rule.** If a card's
subject were styled from here, the card would stop being evidence and start
quoting the same file the reader is trying to check. Chrome only; `.caption` is
not a shipping role class, `.role-*` in `colors_and_type.css` are.

**Rejected: leaving the cards alone and grepping harder after each token
change.** That is what the last three sessions did, and it failed the same way
each time — the misses were never in the card you were editing.

### What the shared sheet immediately made visible

An override is now a diff, so a card that departs from the system says so in one
line instead of hiding in forty. **Twenty declarations below the 12px chrome
floor across seven cards** — including `.lbl { font-size: 9px }` in
`surface-system.html`, i.e. the chrome label class, redefined under its own
floor. All twenty are now at or above 12px, which also settles audit §3.4's open
question for this layer: every violator could comply, and none needed an
exception.

**One real exception, now declared where it lives.** The Receipt's export card
renders 6.5–8.5px type inside `.sheet`. That type is not chrome: each sheet is a
miniature of a raster authored at 1080px, shown at ~14% so the three ratios can
be compared. So: **a specimen may render below the floor only as a scale model
of an artifact authored at another size, and it must say so.** Miniature is not
chrome. Trap #8's clipping and audit §3.7's 5px ledger number are both this
distinction going unstated.

### `scratch/card-audit.html` — trap #8 stops being a resolution

Trap #8 was "measure a specimen before declaring its viewport", and trap #9 is
that saying so does not work: I declared three viewports shorter than their
content in one session *after* writing the rule down. So it is a tool now. It
loads every card in an iframe at its declared width, reads the card's own bottom
edge, and reports clipping, slack and floor violations in one table.

First run: **8 cards clipped** (postmark by 92px, brand-lockup by 42px) and **29
with more than 24px of dead frame**. All 43 in-tab cards now fit their declared
height with 14px of breathing room; the harness reports 0 clipped, 0 slack, 0
under the floor.

Three things the measurement had to be taught, all of which had been quietly
producing wrong numbers:

- **`scrollHeight` cannot fall below the iframe viewport.** It detects clipping
  and is blind to slack, so a card declaring 900×600 around 124px of content
  measures "600, fits". The card's own bottom edge reports both.
- **Wait for the card's own webfonts, not its load event.** Measuring on
  `onload` reads fallback metrics, which came in ~10px short — inside the 2px
  band the tool exists to detect — and landed on whichever card sorts first,
  every run. `await fr.contentDocument.fonts.ready`. Two consecutive runs now
  return identical numbers on all 54 files; before the fix they did not, and the
  first published pass reported one card 10px shorter than it is.
- **Eleven files in `preview/` have no `@dsCard` marker at all** and are in no
  tab: `brand-aurora-still`, `color-aurora`, `color-functional`,
  `color-primary`, `color-text-opacity`, `material-tiers`, `paper-canvases`,
  `type-hexp-axis`, `type-mono`, `type-sans-body`, `type-serif-display`. Most
  look superseded by a merged card, but a folder of files that read as
  authoritative and are shown to nobody is its own hazard. **Left in place,
  flagged by the harness, not deleted** — deciding which are dead is a reading
  job, not a scripted one.

---

## 2026-08-02 — Tables, forms, loading (audit §3.8, closed)

Three surfaces left on the missing list. None needed what the audit assumed,
and each got a different kind of answer.

### Tables — closed as OUT OF SCOPE, not resolved

There is no table element anywhere in `app/` or `components/`, and no table
primitive. Bills — the most tabular data the product owns — render as cards.
The audit inherited "tables" from a generic list of eleven pattern gaps and
never asked whether this product has any. **Designing one now would be
inventing a transport in order to furnish it**, which is the inverse of the
rule the email work produced.

New `outOfScope` block in `DESIGN.md`, holding this and Spanish. The reason
it exists: in a list of missing things, a gap and a decision look identical.
Anything closed this way records what is already decided in case it ever
lands — for tables, that metadata grids may exceed the 65ch measure and the
ribbon's `compact` variant exists for dense rows.

### Loading — the rule the system never wrote, and a correction I owed

First pass filed the spinner as a violation of `motion.rules` — a rotating
glyph is an element already on screen and already correct, which the
streaming carve-out calls motion. **That was wrong, and the user's objection
is the reason this entry is worth reading.** The spinner was a considered
answer to a real constraint: a five-row skeleton is a lie when one row
arrives, and the front end does not know the count until load time. Production
ahead of a spec that had never addressed unknown cardinality.

The premise still has a hole. **A spinner does not avoid the height claim; it
makes an uninformative one.** The shipped fallbacks reserve `min-h-48` — a
fixed 192px box guessed without a count, exactly like the skeleton's guess,
but carrying no information about what is coming. And it over-reserves, so it
usually settles by shrinking.

What resolves it is that the two claims are not equally knowable. **The lie is
never in the shape. It is in the count.** So render the shape once and stop
claiming quantity:

> A loading state promises the shape of what is coming, never how much of it.
> **Under-reserve, so the settle is always downward.**

One skeleton row, the shortest plausible item, container sized to content, no
`min-h`. One row is the floor of what can arrive, so the card can only grow —
and growth pushes the page down, which is what a page does as it loads.
A shrink pulls content up under a reader's eyes and a thumb already in
motion, which is the failure people actually notice. The rule needs no count,
which was the constraint: **resolving cardinality earlier is an architectural
question, and the design has to be correct without it.**

The spinner keeps one job — in-place indeterminate waits where there is no
shape to promise, like a button mid-submit. Zero results are not a loading
problem at all; that is `card-empty`.

Riders: one skeleton block role to replace `bg-black/5|8|10` at four ad-hoc
heights across six files, one spinner ink value instead of the 20% light /
55% dark split, and three components named `*Skeleton` that contain no
skeleton.

### Forms — Clerk is a profile

Our form layer is three utilities wrapped by three components so thin they
are almost nothing (`input.tsx` is 499 bytes). Every account, sign-in and
profile form is Clerk's, styled through nineteen `--clerk-*` variables.

Session 3's test, second application: *if a transport needs new tokens it is
a register; if it needs the same tokens rendered by poorer machinery, it is a
profile.* Clerk invents nothing — so it is a profile, now written down as
`profilesClerk` so the mapping is a design artifact rather than nineteen
lines in a stylesheet nobody reviews.

Three of the nineteen drift. All three are the unowned kind: a value was
needed, a plausible one was typed, the spec never saw it.

- **warning: yellow-500** where the system says amber-700. Contradicts a
  standing rule — amber is warning, and yellow is not in the palette at all.
  Fixed in spec; the code migrates.
- **success: emerald-500** where the ink value is emerald-700. Adopted as a
  deliberate profile value — Clerk renders success as small solid indicators
  rather than as text, where the soft stop is right.
- **danger: rose-500** where the system's only remaining red is red-600.
  Adopted as a deliberate profile value, for inline validation on Clerk's
  lighter input grounds.

The rest map correctly, including three font weights taken from the Readex
scale deliberately — the tell that this mapping had care in it and simply had
no spec to check against.

### Rejected

**Persisting a last-known count to size the skeleton.** It was in the first
recommendation and it is out: it makes the design depend on a fact the front
end may never have, and it buys a better guess at the cost of a rule that
stops being true when the data layer changes. Under-reserving is correct
without any count at all.

---

## 2026-08-02 — The tab bar, measured (audit §3.7)

The audit asked whether a 12px chrome floor survives five tab labels on a
phone and resolved it on paper by raising the floor. Rendered at 390pt with
the labels production actually ships: **the tension does not exist.** The
widest short label ("Races") measures 53.8px in a 74.8px slot — 72%, about a
quarter spare. Ten pixels was never a constraint anyone met; it is a default
nobody revisited.

The undocumented thing that makes it fit is `shortLabel` — Home, Asks, Races,
Bills, Chat — a field production wrote for exactly this component. **That is
the real design decision in the tab bar and the spec did not know about it.**
Now required, including for org-mode rows, which currently fall back to full
labels not written for a 75px slot.

### What was actually broken, neither of it in the audit

- **No safe-area inset.** `fixed inset-x-0 bottom-0` with `py-2` and no
  `env(safe-area-inset-bottom)` anywhere. On any device with a home indicator
  the labels overlap the system gesture area by about 6px — the bottom of our
  tap target belongs to the OS.
- **Tap targets are whatever the content measures.** A bare link around a
  40px icon span and a label. At 12px: Home 48.0, Asks 43.6, Races 53.8,
  Bills 50.8, Chat 43.3 — so raising the floor lifts three of five clear and
  leaves the two shortest words fractionally under.

That second one produced the more useful rule. `a11y.targetSize` has said
"interactive targets are at least 44×44 px" since the beginning and has been
applied **nowhere**; the only other mention of the number in the document is
inside the emboss's minimum size, where it appears as "a useful coincidence."
A rule stated once at the top and cited by no component is not enforced. So:
**a component with a touch target declares its own minimum**, measured, in
its own spec entry. Arriving at 44 by accident through type size, icon size
and padding is how the tab bar got to 40.

### Adopted from production

- **Composing surfaces surrender the chrome.** The bar hides on
  `/conversation/` and `/action/`. Not a routing detail — it is the phone's
  version of *if the user reads or writes for more than thirty seconds they
  need paper beneath the text*. On 390pt they also need the chrome gone.
- **A curated five, composed from one list.** Seven destinations in the
  sidebar, five in the tab bar, Actions and Tracked demoted to the account
  menu — and both navs built from `Sidebar/nav-items.ts` so they cannot
  drift.

### Known Divergence

Production ships 10px labels and no safe-area inset. Spec ahead on both; the
code migrates. Audit §3.4 had already raised the floor with no chrome
exception, so this is a migration nobody scheduled rather than a decision
anyone made.

### A correction to my own working file

The exploration argued that `a11y` had no 44px rule and that it lived only in
the emboss entry. It has had one all along. The defect is weaker and more
interesting than "the rule is missing": **the rule exists, is correct, and is
cited by nothing.** Landed as written here, not as argued there.

---

## 2026-08-02 — Running the gates (audit §3.3)

The promotion gates were written on 2026-08-01 and never run. This entry is
what happened when they were run against `resistbot/voyager@e3d5242e`.

### The finding

**Six of thirteen statuses were wrong, in both directions.** Three accents
labelled `canonical` had no implementation at all; two labelled `proposed`
were shipped, specimened and load-bearing. One failed PURPOSE outright. And
**zero of thirteen had an owner** — so OWNER, the only gate that costs nothing
to clear, was blocking every promotion in the system. A gate nobody has ever
walked through is not a process; it is a moratorium with paperwork.

The audit also says the inventory holds twelve accents and then lists
thirteen. It was never counted. That is the whole finding in miniature: **the
statuses were remembered, not checked.**

Underneath it, the thing worth carrying forward: an accent's status had been
tracking *how much had been written about it* rather than what existed.
Guilloche is nominated for promotion three times in `DESIGN.md` on the
strength of how interesting it is. The progress ribbon — four call sites, two
variants, a story and a specimen — was never nominated once. That is the exact
failure the gates were invented to stop, and the spec fell into it about the
very accent it nominated.

### What landed

- **An owner.** Jason — head of product & design, The Governance Company. One owner for the whole inventory, and the same name
  fills the governance role this file had left blank since §3.10 was marked
  resolved. Thirteen owners is how you get zero.
- **Promoted: guilloche and the progress ribbon.** Both had cleared
  IMPLEMENTATION, SPECIMEN and PURPOSE before the gates existed. Guilloche is
  the first accent ever walked through `promotion.gates`.
- **Demoted: the seal, the ruled page, the signature line.** None is built.
  The promotion rule's own demotion clause covers it; it had simply never been
  applied to accents that were never built in the first place. Canonical now
  holds three accents that are all real, instead of four where half were
  aspiration.
- **Retired: paper grain.** The one entry that cannot state a communicative
  purpose. Grain states atmosphere, and the system forbids ornament without
  meaning. Cut rather than carried.
- **A new required key on every entry.** *A status is a claim, and a claim
  carries its evidence.* `canonical` entries carry `implementation:`;
  `proposed` entries carry `blocked-on:`. A missing evidence key is a bug —
  and, unlike a status typed from memory, it is greppable. Three of the four
  canonical entries had no `implementation:` key; the one that did was the one
  that was true.

### Two spec bugs fixed

- `tactileAccents.dont` forbade "emboss effects to fake depth" — written
  before the seal became a blind emboss, and never narrowed. **As written it
  forbade the canonical accent.** Audit item #4 (internal contradictions) was
  marked resolved while this one was being created by the resolution of item
  #2. Now narrowed to fake depth on an element that is not paper.
- The rubber stamp's oxblood ENACTED is recorded as a **Known Divergence**.
  Production ships the colour the palette retired in August. Spec ahead; the
  code migrates. Do not un-retire oxblood to match the code.

### The rule that changed for a reason nobody had written down

Guilloche's spec said *procedural only — never raster import*, justified as
legal risk and laziness. Production imports an 800×44 SVG and scales it, which
breaks the rule for neither of those reasons — and the rule as stated missed
the defect it should have caught. **A band authored once and scaled takes its
stroke weight with it.** The specified 0.6px engraving renders at 0.29px on a
390pt phone, under a device pixel, and the band greys into a smear.

This is audit §3.7 recurring: the ledger number reached 5px by exactly this
route. It was caught once, on one artifact, and never generalised. The rule
was right and its stated reason was wrong — "procedural" does not protect us
from a lawsuit, it protects the stroke weight, because a procedural band is
redrawn at the width it is rendered at. **The redraw is owed**; promotion was
granted on the artifact existing, not on it being correct.

### What a signature is — closed the same day, in production's favour

Running the gates surfaced what looked like a flat contradiction: the
signature-line rule said signatures are authored and never simulated, while
the Receipt renders the user's typed account name in Amerika Signature. Two
rules written the same month about the same act. Put to the user, and the
answer went production's way:

> **A signature is a name the constituent affirmed** — by co-signing an ask,
> endorsing a candidate, pledging, sending. The act of signing is what makes
> it a signature. It is not a handwriting sample, and the system was never
> claiming it was one.

So the shipped Receipt has been right all along and the rule was aimed at a
different worry — a decorative script face standing in for a person's mark.
That worry is real, so the rule was **narrowed rather than deleted** — and on
a follow-up correction from the user, narrowed further than the first pass
had it. The licence is **second person only**: the script face renders your
name, on your receipt, for an action you took. Nowhere else.

That excludes more than the first wording did. A co-signer roll, a signer
list, an endorsement feed are other people's names and set in the normal
register — someone else's signature rendered for your eyes is a facsimile of
a mark they did not draw and cannot correct, on an artifact built to be
screenshotted. **The audience is the constraint, not the typeface.** Also
excluded, as before: any name the user did not affirm. Now a top-level
`signature` block; script stays banned as system typography everywhere else.

A useful side effect: the signature LINE stops being a contradiction and
becomes a separate artifact worth building. The Receipt records an act
already taken; the dotted rule at the close of a composed letter anticipates
one. Different jobs, different surfaces.

### Opened, not closed

`openQuestions` is new and holds one thing: **who writes the plain sentence**
for 464,269 bills (carried from §3.1). **Owned as of this session — Tyler,
who owns the summarization pipeline — but not answered.** Lightweight
summaries are already generated in `resistbot/deepspace`; the prompt that
governs them has never been read against this spec. Access was requested and
had not landed by end of session.

The reason this matters more than it sounds: if that prompt does not encode
the lede's rules, then **the voice the newcomer reads was written by whoever
typed the prompt**, not by the system — the same shape as the email brand
navy, and the urgent kind of divergence. The next session's first move is to
read it.

### Spanish, closed as out of scope

Confirmed 2026-08-02: there is no Spanish anywhere in the product. Audit §3.8
listed it as a missing surface; it is not a gap, and a future session should
not design for it speculatively. The warning is kept in the audit rather than
the spec, with one correction to the original framing — the audit costed it
as a layout problem (HEXP-60 chrome, 65ch measures, fixed-width badges) and
the expensive part is **voice**. The newcomer's lede is *one sentence, three
facts, one action* in English idiom; that is a claim about how English
carries plain meaning and may not survive translation.

### Rejected

**Relaxing the guilloche rule to match production.** The shipped SVG is
hand-authored and vector, so it violates neither stated reason for the rule,
and the tidy move was to narrow the rule to permit it. That would have
codified the sub-pixel stroke bug as policy. The rule keeps its teeth and
gains the real reason instead.

**Promoting guilloche alone.** `promotion.priority` had nominated exactly one
accent and it would have been easy to honour that and stop. The progress
ribbon was doing more work in production and had never been mentioned — which
is the more useful half of the finding.

### Carried caveat

Also spotted, not fixed here: the shipped Receipt sets its place-of-issue
caption at `text-[0.6rem]` — **9.6px**, under the 12px floor, on a line
`registers.issued` lists as mandatory at every export ratio. The ledger number
beside it is 12px and clears. Session 3's proof rule is obeyed in production;
the caption under it is not.

---

## 2026-08-02 — Email is a viewport (audit §3.8)

The first item closed with the production repo readable. `resistbot/voyager`
became accessible mid-session, and what it showed reframed the work twice.

### What production had already decided, and what nobody had

Email ships today as `react-email` + Tailwind through Resend, in exactly two
notification types (`welcome`, `cosign.confirmation`). The letter reaching a
legislator — the product's core artifact — has no email at all.

Three kinds of difference, and the third is the one that mattered:

- **Spec ahead** — Merriweather still in `app/layout.tsx`. Known Divergence;
  audit §9 is closed in the spec only.
- **Production ahead** — the hosted asset pipeline, the dark-mode mechanism, the
  hand-authored `text/plain` part, and a signed founder's voice in the welcome
  email that breaks three Content Fundamentals rules and is obviously right.
- **Unowned default** — `brand: "#033271"`, a navy on every button and link in
  the highest-volume surface, plus `bg-white` and the absent serif. Nobody chose
  these; `react-email` did, sensibly, in the absence of a rule. **The system's
  missing surfaces are not blank — they are furnished by whatever library got
  there first.**

### The rejected model, and the one that replaced it

**Rejected: email is the ink layer alone on paper.** Argued at length in
`explorations/The Letter in the Inbox v1.html` and `v2.html`, and wrong. It
treated the email body as a physical sheet, which left the receipt nowhere to
sit and made every message one cream page.

**Landed: an email is a VIEWPORT, not a canvas** — the same role the browser
window plays on the web. Objects are placed into it, so paper appears only where
a paper artifact appears. One message can hold two registers: a live ask on a
card above an issued receipt on paper, which is exactly what the co-sign email
now does.

The reframe paid for itself immediately: **email is the system's
reduced-transparency mode, permanently.** That collapse was already specified in
`colors_and_type.css` — glass drops its blur, becomes solid zinc, layout does
not shift. Nothing was invented for email except `#e7edf4`, a flat stand-in for
the aurora derived by compositing its three lobes over the canvas. It is
deliberately **not** a token: a hex in the token file is a hex someone will use
on the aurora.

### Also landed

- **The type stack**, approved. No web fonts — a webfont reaches a minority of
  clients while blocking render in the rest. Georgia for headings (production
  ships no serif at all), Verdana for chrome because the register is *wide*, and
  a **12px floor**: with no HEXP axis to expand the face, shrinking it is the
  one move that has nothing left to give.
- **Both colour modes required**, with three marks that cannot survive inversion
  and switch rather than darken: the indigo plate (1.02:1 on zinc-800), green
  ink (`--color-success` is a light-mode-on-light value, 2.72:1), and every
  link — a class on a paragraph does not reach its anchors, so an inline link in
  inverted body copy vanishes silently. **The frame inverts; the artifact does
  not:** paper is lit, not swapped.
- **`registers.issued.proof-rule`** — the one change here that edits something
  already shipped. Every issued artifact must state its ledger number as text,
  on screen too. The emboss and the signature are pictures of authority; neither
  survives email, plain text, a screen reader or a forward. The number survives
  all four, so **the number is the proof and the emboss is its illustration**.
- **The founder's letter, named and fenced** to the welcome email only.
- **The navy is retired** from email; the one call to act on each message is a
  green plate with an ink label, per the fill rule.
- **A boundary worth keeping:** an email that is only an artifact is still not
  the artifact. Issued mail is the *notice* of issuance and links to the real
  thing.

### Files

`explorations/Email Iteration 1.html` (four emails, light/dark toggle) ·
`Email - Cosign On System.html` · `Email - Welcome On System.html` ·
`Email - Letter Delivered On System.html` · `Email - Cosign Production Baseline.html` ·
`The Letter in the Inbox v1.html` / `v2.html` (the rejected model, kept) ·
`preview/email-profile.html` · `github.md` (sync record)

### Still open

Tables, forms, loading states and Spanish — each one a transport with a default.
Real-client dark-mode testing. And §3.1's unowned sub-item, which email made
sharper rather than closer: production answers "who writes the plain sentence"
for asks — the user writes their own title, and the subject line is that title
verbatim. It does not extend to 464,269 bills.

---

## 2026-08-02 — Five rooms, four registers (audit §3.5)

The audit asked for three. It is four, and the reason the count moved is worth
more than the count.

### The test

A register earns its place if it differs in **tokens, not adjectives** — the
same test the newcomer's lede was held to in §3.1. Both of the audit's proposed
merges were rendered side by side against real content
(`explorations/Five Rooms or Three.html`). One passed.

### Merged: Reading Room + Commons -> **Live**

Four of five tokens were already identical — material, canvas, lead family,
column. The fifth, motion posture, was the interesting one: the Reading Room
was specced `generous` while `motion.rules` has always sanctioned motion on
**exactly two** surfaces, Receipt and Commons. That was a contradiction, not a
distinction, and it predates this audit.

Resolving it produced a rule the system was missing:

> **Streaming is not motion.** Text arriving token by token, a typing
> indicator, a skeleton resolving into content — that is content *arriving*,
> not the interface moving. It is permitted anywhere and spends nothing from the
> two-surface budget. The test: is the animated element already on screen and
> already correct? Then it is motion and needs a sanctioned surface. Is it
> putting content on screen for the first time? Then it is arrival.

The Reading Room's posture is now `static`, which it always effectively was.

### Not merged: Writing Desk + Receipt

The audit called these "the same room at two moments — compose, then issue."
Good prose; wrong about the tokens. Every one differs — canvas
(`paper-parchment` vs `paper-cream`), geometry, motion, and state
(editable/unsent vs frozen/keepable). And after §3.7 the Receipt carries a
portrait HTML artifact **and** a three-ratio raster export family. A register
that has to describe both is not one register; it is two wearing one name,
which is how five became five in the first place.

**The Receipt is what the Writing Desk produces.** A product is a different
kind of thing from a workspace.

### What landed

- A `registers:` block in `DESIGN.md` **above** `surfaces:` — Live · Reading ·
  Writing · Issued — each with material, canvas, families, column, motion and a
  palette rule. Every surface now carries a `register:` key. Where a surface's
  tokens and its register disagree, **the register wins** and the disagreement
  is a bug.
- **The five room names stay**, as narrative, in the thesis and the prose. They
  are good writing and useful for talking to the team. What was cut is the
  claim that they are five token sets.
- `motion.rules` gains the streaming carve-out; the motion prose restates it.
- README: a five-rooms-four-registers table, and the consuming instructions now
  say *pick the register, not the room*.

### The one real cost

**Palette scoping moved from surface to condition.** "Momentum green is
Commons-only" was a lookup; it no longer resolves once the two rooms share a
register. The rule is now *green appears where a crowd is counted* — a judgement
call rather than a lookup, and the same class of weakness that sharing a hue
between `momentum` and `success` introduced. Mitigation: a dialogue counts no
crowd, so conversation views stay green-free, and green in Live is a report
rather than an affordance per the fill rule.

### Also fixed in passing

The README's surface table had been split in half by the §3.7 paragraph landing
mid-table, leaving the Commons row orphaned outside it. Repaired.

Touched: `DESIGN.md` · `README.md` · `AUDIT-2026-08.md` · `HANDOFF-2026-08.md`

---

## 2026-08-02 — The Receipt is two artifacts (audit §3.7)

The spec said the Receipt was landscape, max-width 56rem, and called it *a
diploma issued by a phone*. Rendered honestly at 390pt
(`explorations/The Receipt on a Phone.html`, column A) the certificate scales to
40%: the guilloche and the emboss survive, because they are tonal and
procedural, and **the type does not** — the ledger number lands near 5px,
five rungs below the 12px floor the system had just finished enforcing.

### The decision

**Two artifacts, not one shape.**

- **Kept — portrait HTML.** Live, selectable, `paper-cream`, single column at
  34rem, bloom at issuance. The caption stacks, the title sets around 27px,
  and the emboss moves inline with the signature rule — where a notary
  presses, over the signature rather than beside it. The 56rem landscape
  column is retired from the screen entirely.
- **Shared — rasterised image, three ratios.** tall 1080×1920 · square
  1080×1080 · wide 1200×675. Each authored at its own pixel size and rendered
  at 2×, **never produced by scaling another** — that is precisely how the
  ledger number reached 5px. Every ratio carries caption, title, ledger
  number, emboss and guilloche; only wide may drop the attribution line.
  Paper is full-bleed; no glass, no aurora, no motion, because a raster has no
  bloom.

**This is source-derived, not invented.** Production already gives people
images in three aspect ratios because platforms crop differently. The spec had
one shape and no export register at all; the shipped behaviour was better than
the documented rule, which is the second time that has happened
(see `RECONCILIATION-2026-08.md`).

### Two riders

- **The guilloche fades on portrait** instead of drawing left-to-right. A
  320pt rule drawing across the screen reads as a loading bar — the one thing
  an issued artifact must never look like. Landscape export has no motion at
  all, so the draw-on now exists nowhere; it is kept in the spec only as the
  mechanic's description for wide HTML surfaces.
- **The emboss has a stated minimum for the first time: 44px at 1×.** Below
  that the highlight and shadow stop resolving as one pressed form. It matches
  the minimum touch target, which is a useful coincidence rather than a reason.

### Consequence for §3.5

Choosing the export family means the Receipt keeps two geometries **by
design**. A register that has to describe both a portrait screen artifact and
a landscape raster family is not one register, so the audit's three-way
collapse is off the table: **four registers — Live · Reading · Writing ·
Issued — is the honest structure.** Awaiting confirmation before that lands.

### Also fixed in passing

The Receipt prose still described *a fully-saturated Oxblood seal* three months
after oxblood was retired and the seal became a blind emboss. Corrected.

Touched: `DESIGN.md` · `README.md` · `preview/receipt-export-ratios.html` ·
`AUDIT-2026-08.md` · `HANDOFF-2026-08.md`

---

## 2026-08-01 — The newcomer's lede (audit §3.1)

The last critical item, and the one the audit ranked first by consequence: the
system had a voice for institutions and a voice for the crowd, and none for the
person who has never read a bill.

### It is a copy-and-hierarchy rule, not a new type register

Three treatments of the same bill were built on a phone
(`explorations/The Newcomer.html`): the Archive default; plain words in the
Archive's dress; and the audit's own proposal — a sans `body-plain` role, 19px,
48ch, on glass instead of paper.

**The audit's proposal was rejected.** Its recommendation was "explicitly *not*
serif", and setting it against real content is what disproved it: at one family
and one weight, the lede, the three facts and the action all landed at the same
value, and nothing told the eye where to start. Plainness had been assigned to
the *typeface*, which then had no range left to build hierarchy with. The serif
scale — 30px title, 20px lede, 14px facts, one filled plate — already does that
work.

**The newcomer is not failed by the serif. They are failed by the words and by
the order.** Fixing the constraint rather than the symptom means the register
costs no new family, no new canvas, and no fourth voice in a system that is
trying to collapse five surfaces to three.

### What landed

- `.role-lede` — Newsreader at `--serif-text`, 1.25rem / 1.55, measure 52ch. One
  scale step in the existing serif, not a new register. Sits directly beneath
  the bill title, **above** provenance.
- **DESIGN.md → The Newcomer's Lede** — the structure (one sentence · three
  facts · one action), the jargon rule with a replacement table, and the
  **thirty-second path** as a first-class flow. `surfaces.archive` gains a
  required `newcomer-lede` key.
- **The jargon rule:** the term never appears alone — it is replaced, or what it
  means follows in the same sentence. *A tooltip is not a gloss; it is jargon
  with a lid on it.* The audit was explicit that a tooltip is not the answer.
- **The statute is a destination, not the landing state.** Paper begins where
  the statutory text begins. The plain voice stops at that door and never
  overwrites the record.
- Fourth tone signature in the README. Kit: `BillDetail` opens with a lede.
  Specimen: `preview/type-newcomer.html`.

### Deliberately not done

- **No new family, canvas, or measure token.** The rejected sans role also moved
  the landing state onto glass; with the lede in the Archive's own type the
  paper canvas stays where it was and one fewer rule has to be taught.
- **No tooltip, no glossary component.** Per the audit, and because a gloss the
  user has to ask for is a gloss for someone who already knows the word.

### Still open, and not a design decision

**Who writes the sentence.** 464,269 bills need one. Generated then reviewed, or
generated and labelled? A plain sentence that is wrong is worse than jargon that
is opaque, because the newcomer cannot tell. Needs a named owner.

Touched: `colors_and_type.css` · `DESIGN.md` · `README.md` ·
`ui_kits/web/{app.css,screens.jsx}` · `preview/type-newcomer.html` ·
`AUDIT-2026-08.md` · `HANDOFF-2026-08.md`

---

## 2026-08-01 — Newsreader replaces Merriweather; the italic rule narrows

Audit §3.9, the last open item, and the only one flagged *discuss first*.

### The serif is Newsreader

Merriweather was drawn in 2011, sits in the Google Fonts top twenty, and reads
*blog* — the one register a legislative record cannot afford. Four alternatives
were set against real content (`explorations/The Serif.html`): Source Serif 4,
Newsreader, Literata, Libre Caslon Text.

**Newsreader wins on structure, not taste.** It is a Scotch roman — the face of
the nineteenth-century press and the printed record — but the deciding factor is
its **optical-size axis**. Worth correcting the audit here: Merriweather *is*
variable on weight, which the audit understated. What it has no axis for is
optical size, so one drawing had to serve both a 38px bill title and 15px
statutory text. Newsreader has `opsz` 6–72 and serves both properly.

Libre Caslon was the strongest *argument* — Caslon set the Declaration and the
first printings of the Constitution — and was rejected because it is static
400/700. No 800, no optical axis; adopting it would have made the display
register lighter than before.

### Two optical stops, not one

The first pass set `opsz` to 72 everywhere, which is the display extreme, where
a Scotch roman thins its hairlines hardest — body text came out far too fine.
Three tokens now:

| token | stop | use |
|---|---|---|
| `--serif-display` | opsz 60 / wght 800 | headings, bill titles, Receipt |
| `--serif-text` | opsz 16 / wght 450 | body, statute, analysis |
| `--serif-quote` | opsz 24 / wght 400 | quoted voice, 18px and up |

Text weight is 450 rather than 400 — a half-step that reads sturdy rather than
heavy, and it matters most on lamplit dark-room paper, where a fine stroke loses
contrast against the warm tan. **Never set one opsz value for both ends**; that
is the mistake the axis exists to prevent, and it is now written into the token,
the spec, and the kit header.

### Serif italic is reserved for quoted human voice

Newsreader's italic is a true calligraphic italic — single-storey *a*, real
entry strokes — lovely at 20px and genuinely hard at 14. That is not a fault in
the face. **The old rule was asking small italic to do too much**, and it would
have recurred with Literata or Libre Caslon just the same; Merriweather's italic
is simply flat enough to hide it.

- `.role-metadata-italic` → `.role-metadata`, serif **roman** at opsz 16 /
  wght 420 (old class kept as a deprecated alias).
- New `.role-quote`: serif italic, `--serif-quote`, **1.125rem minimum**. A
  constituent's words, a pull quote, an epigraph — never metadata.
- Kit: `.msg-meta`, `.receipt__sub`, `.bill-row__meta`, `.sponsor__meta` and
  `.salutation` all moved off small italic.

Touched: `colors_and_type.css` · `DESIGN.md` · `README.md` · `ui_kits/web/app.css` ·
`preview/{type-roles,type-citizen,type-serif-display}.html` ·
`proposed/design-system/{tokens/tokens.json,patterns/print.md,HISTORY.md}`

**This closes every open item in the August audit.**

---

## 2026-08-01 — the aurora constraint, measured and rewritten

### The old rule was false, and the real one is about placement

The standing constraints said the aurora was three lobes, low chroma,
monochromatic, no violet — and that opacity-based text depended on it.
Production has shipped a five-lobe curtain at hues 150–290, chroma to 0.21,
violet included, above the fold. Rather than argue the rule, I measured it:
both aurora stacks modelled from the real declarations, oklch converted to
sRGB, each lobe's alpha ramped to its transparent stop, composited in order,
sampled on a 26 × 14 grid. Worst case, not average.

|  | inside the band | below the band | needs |
|---|---|---|---|
| 87% ink · light | 10.23 | 14.19 | 4.50 |
| 87% ink · dark | **3.53** | 12.80 | 4.50 |
| 55% ink · light | **4.10** | 4.58 | 4.50 |
| 55% ink · dark | **2.32** | 5.89 | 4.50 |

**Monochrome was never the mechanism. Placement is.** Below the curtain the
canvas falls back to the plain Blue Hour and every rung behaves exactly as
documented. Inside the band nothing is safe — in the dark room even primary
ink measures 3.53:1.

What saves the product today is the composition, not the palette: the hero
headline and both buttons sit well clear of the band. So the rewritten rule
ratifies the design and forbids the thing nobody has done yet — setting a
caption or a control in the light.

- `a11y.contrast` rewritten with the mechanism, the measured table, the band
  geometry, and a `material-chrome` exception for the navbar and eyebrow strip.
- **The violet ban narrows** to what it always meant: no violet *accents* —
  button, badge, chip, stamp, type. Low-opacity light in an ambient gradient is
  not an accent, and the curtain's 290 lobe is permitted.
- "Do not broaden the aurora's hue range" replaced with "do not set bare text
  inside the band", which is the rule that is actually load-bearing.
- Hard limits kept so the curtain stays bounded: chroma ≤ 0.22, ≤ 5 lobes,
  and no widening or moving the band without re-measuring.

### The signature face is permitted — for signatures

Heritage banned script faces outright; production ships one with a
`signature-write` keyframe. The ban **narrows**: script is still forbidden as
system typography — headings, display, UI, absolutely. It is permitted for
rendering a person's name at the moment they put it to something: a co-sign,
an endorsement, a vote-pledge, a sent letter. That is not typography, it is an
artifact of an act. An uploaded signature image still wins where one exists.
New `--font-signature` token and `.role-signature`.

### Font-weight scales — divergence recorded, direction settled

Spec holds at one scale; production has four. New **Known Divergence** section
in `DESIGN.md`: the spec is right, the code migrates, and the spec must not
drift back to match. Author new work against the single scale.

---

## 2026-08-01 (final) — the seal becomes an emboss; the fill rule is decided

### There is no red left in this system except semantic danger

Oxblood survived the action-colour change as the wax seal. It does not survive this
one. The reason is that we kept asking a *printing* question: a registrar's seal, a
notary's seal, a corporate seal — none of them are printed. They are **pressed**. The
mark is a deformation of the paper, not pigment applied to it. And a mark that appears
once, on an artifact already earned, has no business being the heaviest object on the
page.

The seal is now a **blind emboss**: highlight up-left, warm shadow down-right, an inner
rule for the die's border, no ink. It requires paper — an emboss has nothing to press
into on glass or aurora — and it reads *better* in the dark room, because lamplit paper
is warmer so the shadow deepens.

- `--color-seal-*` deleted. Replaced by `--seal-highlight` / `--seal-shadow` /
  `--seal-bite`, which are shadow values on paper, not a brand accent.
- New `.seal-emboss` role in `colors_and_type.css` (+ `--sm` / `--lg`).
- Kit: `WaxSeal` → `Seal`, reimplemented as the emboss; `WaxSeal` kept as a deprecated
  alias. `ReceiptScreen` updated.
- New **Brand — The seal** specimen on daylight and lamplit paper.

The finished Receipt now carries exactly one coloured mark: the signature.

### The fill rule — decided

**A green plate is a control; green ink is a report.** Fill means *press me*. Anything
green that is not a filled plate — a numeral, a chip, a stamp, a rule, a check — is
reporting a fact that is already true. Meters, bars, and ribbons are exempt: they encode
quantity, not affordance.

Rejected: *filled = it happened, outline = it is available*. It reads well on a checkbox
and fails here for two reasons — it ghosts the primary action, which is the whole thing
the bright green exists to make findable, and it turns every completed state into a
filled plate, so the page ends up looking like nothing but buttons.

Where A's quietness on completed states is a problem, the answer is a one-off **bloom**
at the moment of the act, not a permanently heavier badge. The system already has that
mechanic and it already means exactly this.

Written into `DESIGN.md` (`color.momentum.fill-rule` and *Color as a Civic Register*)
and `README.md`. The folder-tab steps were already depending on it.

---

## 2026-08-01 (last) — oxblood reconciled system-wide, and the caret widened

### Oxblood now means one thing

Retiring oxblood from the action slot left it half-applied across the system. Every
remaining use is now resolved against one rule: **oxblood is the wax seal, a mark
pressed onto an ISSUED artifact, and nothing else.**

| Was oxblood | Now |
|---|---|
| `.btn--cta`, `.fab` | Action green, flat. The radial gradient went with it — a bright fill does not need one, and a gradient under an ink label muddies the contrast the label depends on. |
| `.wax-avatar` | `.avatar`, Midnight Indigo. An avatar is the user's trail, which is what the primary ink means. `.wax-avatar` kept as a deprecated alias. |
| Navbar lockup (`app.jsx` used `WaxSeal`) | `mark.svg`. A seal in persistent chrome was a straight rule violation. |
| Reading Room inline citations, blockquote left bar | Midnight Indigo. A citation is a trail into a source — and it is clickable, so oxblood cannot touch it. |
| Rubber stamp, positive status | Action green. Success and action are one hue now, so a red **ENACTED** contradicted the palette. Oxblood left the stamp palette entirely. |
| Folder-tab step: active oxblood / complete slate | Active **Midnight Indigo** (where you *are* = the trail), complete **action green** (a thing that *happened*). This is the fill rule doing real work. |
| `.sponsor__caucus--r` | Unchanged at `#991b1b`, but decoupled and commented: caucus colours are **data**, not brand. They were picked to coordinate with an oxblood action colour and must not now be re-derived from the palette. |

**Kept:** the post-send confirmation stamp, the Receipt seal, the envelope postage
corner, and the Receipt bloom's seal-drop. Each is a mark on something issued.

Touched: `DESIGN.md` · `README.md` · `ui_kits/web/{app.css,app.jsx,civic.jsx,components.jsx}` ·
`preview/{color-accents,avatar-waxseal,fab,buttons,surface-commons}.html` ·
`proposed/design-system/{tokens/tokens.json,HISTORY.md,patterns/data-viz.md,patterns/forms.md}`

### The caret went wider, not steeper

First correction made it a filled triangle; second made it steeper. Both wrong.
Steepening a mark makes it *more* letter-shaped, because letters are tall and narrow.
The caret now sits at a **95° apex** (30.5 × 14 units against the 56px em), past the
point where any Readex Pro capital could be that squat — so it stops competing with
the letterforms. Stroke stays at 3.2 against the type's 4.2 stem.

---

## 2026-08-01 (later still) — the wordmark loses its terminal period

The wordmark shipped with an Oxblood full stop that was never adopted in product —
neither production screenshot renders it. Dropped on two grounds. A full stop means
*this sentence is finished*, and the thesis is that the rule of law is a living
document the people keep writing; the punctuation contradicted the product. And with
Oxblood retired to the wax seal, a red period in persistent chrome would have been the
last place red survived as decoration rather than as a mark on an issued artifact.

**Sanctioned alternative where there is room:** the proofreader's insertion caret.
`‸` means *something goes here* — a real editorial and legislative artifact, and the
literal gesture of amending a text. Drawn as an open two-stroke angle at the wordmark's
own stem weight, never a filled triangle. **Not for persistent chrome:** beside
dropdowns, sort headers, and collapse toggles it reads as an affordance before it reads
as punctuation.

New assets: `wordmark.svg` (rebuilt, no terminal mark), `wordmark-cutout.svg`
(knockout — a real gap, dark chrome had none), `wordmark-caret.svg`,
`wordmark-caret-cutout.svg`. `assets/README.md` and the Brand — Wordmark specimen
updated. Geometry measured against the live font rather than guessed: "AMENDMENT" sets
to 487.2 units at 56 / 430 / 2.8, so the viewBox tightened from 560 to 490.

---

## 2026-08-01 (later) — §3.2 resolved: one action colour, and a source reconciliation

### The action colour is Momentum green `oklch(.66 .148 160)`

Oxblood is retired from every interactive surface — CTA, FAB, avatars. It failed four
ways: it shared a hue with `--color-danger` (Send looked like Delete), sat at L .35
against an L .22 dark canvas, muddied against Midnight Indigo, and was stock red-900
in the system's most meaning-bearing slot.

**It survives as `color.seal`** — the wax seal, and only the wax seal. Wax is red; a
control is not. The kit ships `WaxSeal` and uses it on the letter receipt, so the mark
is real even though the co-sign receipt carries none.

**Action and momentum are now one token.** Co-signing *is* joining; a constituent
signing and the counter moving are one event seen twice. `--color-momentum` aliases
`--color-action`; `--color-momentum-on-dark` is retired — a bright accent needs no
dark-mode variant.

**The label is ink, not white.** At L .66 white measures 2.90:1 and ink 6.42:1. Below
about L .55 that reverses, and between L .55–.60 *neither* clears 4.5:1 — a saturated
green sits almost exactly between white and black there. This inverts the CTA against
the ink button: navigation is dark-with-light-type, action is light-with-dark-type, so
the two cannot be confused at any size, in any room, or in grayscale (5.04:1
desaturated separation, against 2.53:1 for a deep green).

**Pressed states are newly constrained.** A bright fill has ~6 points of lightness
headroom before the ink label fails; beyond that, pressed must come from ring or inset,
never more fill. New section in `DESIGN.md`.

### Reconciled against voyager `globals.css`

First source-derived pass this project has had. Full findings in
`RECONCILIATION-2026-08.md`. Adopted here:

- **Dark-mode paper is a desk lamp.** Both prior accounts were wrong — the spec said
  paper renders identically in both modes; this stylesheet darkened it to near-black.
  Production keeps it light and warms it to lamp temperature under two viewport-anchored
  light pools. Now shipped verbatim and corrected in the spec.
- **The green is sampled from `--aurora-curtain`**, which ships five chromatic lobes the
  spec does not admit exist. That made §3.2's premise wrong in a useful way: the ownable
  colour did not need authoring, only recognising.

### Also fixed — a Phase 1 regression

`ui_kits/web/app.css` still shipped `.sig-line__label` at 10px and `.receipt__caption`
at 11px — two of the exact violations the entry below claims were raised to the 12px
floor. The spec was edited last turn; the code was not. Both are 12px now.

### Files touched

`colors_and_type.css` · `DESIGN.md` · `README.md` · `ui_kits/web/app.css` ·
`RECONCILIATION-2026-08.md` (new) · `explorations/` (2 new sheets)

### Still open — needs a human decision

1. **The fill rule.** Action and success are one hue; filled vs unfilled has to carry the
   difference. Not yet written.
2. **The aurora constraint.** `--aurora-curtain` ships five lobes at hues 150–290 and
   chroma 0.15–0.21, including violet. The standing constraints forbid all of it.
   Production has been ignoring the rule; the rule should probably narrow. Not changed
   unilaterally.
3. **The signature typeface.** `--font-amerika-signature` ships with a `signature-write`
   keyframe. Heritage explicitly rules script faces out. Production wins on quality.
4. **Weight scales.** Four in production, one in the spec. The spec is ahead; either the
   code follows or the spec concedes.
5. **§3.9 Merriweather** — still held, untouched.

---

## 2026-08-01 — Phase 1 of the August audit

Source: `AUDIT-2026-08.md` §4 Phase 1. Cheap, unblocking, no visual redesign.
Nothing in §2 ("do not touch — they are the good part") was altered.

### Contradictions resolved (§3.4)

| Was | Now |
|---|---|
| `navbar` transparent at scroll 0, chrome at ≥48px — contradicting motion.rules and the prose | Always `material-chrome`. Prose wins; the component entry now carries the reason the scroll variant was removed. |
| "three elevation tiers" in *What NOT to Do*, five tiers in the `elevation:` block | Five named tiers everywhere — `flat`, `whisper`, `raised`, `floating`, `chrome`. Whisper and chrome each have a real job. |
| 12px type floor stated, then violated at 10px (tab-bar labels, signature-line label, ribbon milestone labels) and 11px (line numbers) | All raised to 12px. The floor rule now says explicitly that there is **no chrome exception**. |
| `momentum.emerald*` identical in value to `semantic.success*` under two names | Documented as aliases, not forked. The Commons-only scoping rule is editorial and enforced in review — not by the token layer. |
| `momentum.emerald-dark: #34d399` — named "dark" but lighter than the base | Renamed `momentum.emerald-onDark` / `--color-momentum-on-dark`. It is a dark-*mode* substitute, not a darker value. |
| `assets/README.md` described the mark as "flag bars"; the spec forbids nationalist iconography | Renamed to **chamber columns**. The geometry never changed — only the wrong name for it. |
| No stated color-space rule (hex, oklch, and `rgb(… / %)` all in use) | Stated at the top of the `color:` block: oklch for anything authored; hex only where it aliases an annotated Tailwind default; opacity-on-black/white for text and borders, because those must composite over glass, paper, and aurora alike. |

### One font-weight scale (§3.6)

`typography.fontWeights.sans-light` and `.sans-dark` (nine paired values each)
collapsed to a single `sans` scale. Dark-mode optical bloom is real but only
visible at display sizes, so it is corrected once in the CSS layer on the
display roles rather than by a parallel scale every contributor must track.
`colors_and_type.css` already shipped one scale; the spec now matches it.

### Tactile accents cut twelve → four (§3.3)

**Canonical:** rubber-stamp status, wax seal, ruled page, signature line.

**Moved to `tactileAccents.proposed`:** postmark, jurisdiction seal, line
numbers, folder-tab step, lapel-pin, progress ribbon, paper grain, envelope
preview, guilloche. Their full specs are preserved verbatim — nothing was
deleted, only re-labelled as unsanctioned. Surface `skeuomorphic-accents`
lists mark them `[proposed]` inline so a reader of a single surface entry
cannot miss it.

**New:** `tactileAccents.promotion` — the four gates (named owner, shipped
implementation, specimen in `preview/`, stated communicative purpose) and the
matching demotion rule. Guilloche is flagged as first in line.

### Governance added (§3.10)

New **Governance** section in `DESIGN.md`: ownership, how a change lands
(ship → spec → changelog, in that order), promotion and demotion, quarterly
reconciliation against the codebase, and this file.

### Files touched

`DESIGN.md` · `README.md` · `assets/README.md` · `colors_and_type.css` · `CHANGELOG.md` (new)

### Not done — still open from the audit

- §3.5 collapse five surfaces to three registers *(Phase 2)*
- §3.1 newcomer register — the critical one *(Phase 3)*
- §3.2 one ownable color; needs the 4–6 oxblood swatch exploration first *(Phase 3)*
- §3.7 mobile, incl. the Receipt's unresolved portrait behavior *(Phase 3)*
- §3.8 email, Spanish, printed letter, and the `proposed/` pattern list *(Phase 4)*
- §3.9 Merriweather — held for human decision; do not act unilaterally
- Fold all of the above into the `proposed/` file restructuring rather than
  re-doing it
