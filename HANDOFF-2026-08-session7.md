# Handoff — Amendment Design System, August 2026 (session 7)

**Read this, then `HANDOFF-2026-08-session6.md`, then 5, 4, 3, 2, 1, then
`DESIGN.md`.** Nothing earlier was reversed. Session 6 closed the audit; this
session did the two enforcement items it left, and **both of them found
violations by being written down, not by being investigated.**

---

## 1 · What was done

**The 44px floor is cited.** Nine `touchTarget` blocks in `components`, each
naming `a11y.targetSize` and stating its own minimum. Citing it found **four
violations**: buttons 40px, input 40px, toggle 24px, breadcrumb ~12px. New
`a11y.targetSize.how` (the mechanism, which did not exist) and `.cited-by`. New
card `preview/touch-targets.html`.

**`profilesPrint` has a specimen.** `preview/print-profile.html` — the unowned
default beside the profile, both sheets authored at true US Letter geometry
(816×1056 at 96px/in, shown at 53%), so the card measures its own rules: 1.00in
margins, 6.50in measure, 0.40in signature clearance, folds at 3.67 / 7.33in.
**Rendering the real `.seal-emboss` on the sheet corrected the spec's own
prediction about it** — see §5.

Also: `preview/type-newcomer.html`'s viewport was 90px short — fallout from
the measure sweep that session 6's own note said to check for.

---

## 2 · The one idea worth carrying

Sessions 4–6 built up to this and this session is the clean demonstration:

> **Citing a rule is not documentation of the rule. It is the audit of it.**

Nothing was investigated to find the touch-target violations. The work was
mechanical — go to each component with a target and write down what its stated
geometry adds up to — and the arithmetic did the rest. Four of six controls came
in under the floor, every one of them by `padding + line-height`, and every one
had passed six sessions of reading.

The same shape as the 12px floor (20 violations) and the measure (eleven `ch`
declarations). **Three for three: every time a rule got a single home and a
citation, the citation found violations.** That is now the strongest empirical
claim this system has about its own process, and it argues for a specific habit —
when you write a rule, write its consumers in the same pass, because the
consumers are how you learn whether the rule was ever true.

---

## 3 · The toggle, which is how a violation survives being read

Worth its own section because it is the most transferable finding.

`toggle.size` said **`44px × 24px track`**. The 44 is the **width**. A rule about
a 44×44 square, and a spec line containing "44" — so six sessions of reading saw
the right number and never asked which axis it was on. The control is 55% of the
floor vertically.

> **A number that satisfies a rule in one axis reads as satisfying it.** When a
> rule is two-dimensional, a component's citation of it must state both.

The breadcrumb is worse in degree (27% of the floor) but not in kind — it simply
stated no target at all, which is the honest failure. The toggle stated one that
looked like compliance.

---

## 4 · The correction mechanism itself needs a rule

`a11y.targetSize.how` did not exist, and its absence is why four violations had no
obvious fix that wasn't a redesign:

- **`min-height`, not more padding.** Padding changes a plate's proportions and
  its label's optical centring. A declared minimum leaves a compliant control
  untouched and grows only what falls short. `0.75rem 1rem` would have reached 48
  and changed every button in the system to solve a problem that is not about
  padding.
- **Where the visible control must stay small, expand the target, not the box.**
  A transparent hit area at the minimum, centred. The breadcrumb's 12px caps are
  correct type; a 44px-tall toggle track stops reading as a switch and loses the
  16-in-24 thumb geometry that makes its state legible. **Appearance and target
  are two geometries and the rule governs only the second.**

Without that distinction the only available reading of "44px floor" is "make
everything bigger", which is why a floor stated bare for four sessions was
enforced in zero components.

---

## 5 · Render the component; do not draw a picture of it

The print card first *drew* the printed emboss — a grey sphere, invented — and
captioned it "the seal prints its own shadow as grey mud". `.seal-emboss` is
defined in the stylesheet the card already loads, and **a browser on a white sheet
with no paper beneath it is exactly the printer's situation**, so the claim was
testable all along.

Rendered, it is not grey mud. **It is a pale grey ring**, and
`profilesPrint.emboss` now says so. Two things follow.

**The correction strengthened the rule.** The failure is not that the emboss
prints badly — it is that it prints as a *picture of relief*, and so carries no
authority at all. A faint ring is worse than a smudge, because a smudge at least
looks like an accident. Session 5 found the same pattern with `ch`: the
corrected finding was better than the original claim.

**The illustration was wrong about the hue too** — `#6e6e6e`, neutral, where
`--seal-shadow` is `rgb(96 62 28 / 30%)`, warm brown. An invented picture gets
things wrong in ways nobody thinks to check, because there is nothing to check it
against.

> **A specimen in a design system must render the component, not depict it.** If
> the real render is too subtle to make the point, that is the finding, and the
> caption follows the render rather than the reverse.

**Removing the depiction took three passes, and the reason is trap #16.** The
first delete no-matched (the target string omitted a trailing `margin-top:14px`),
so the invented `.mud` rule sat in the specimen while the summary said it was
gone — an authored, plausible-looking rule someone could reattach, which is the
same "reads as authoritative, shown to nobody" hazard session 5 flagged for the
non-card files. Grepping for the deleted name then found a *second* stale claim
the pass had missed: the rules list still said "grey mud" in prose.

This is the third form of the same error in three sessions —
`scrollHeight` for a card's own bottom edge, average glyph width for `ch`, a
drawing for a component. **Trap #3 keeps arriving in new clothes.**

---

## 6 · The measurement trap that fired twice in one session

Session 5's trap #11 says run a measuring tool twice and diff the runs. Not
enough:

The non-card count in `preview/` was read as **seven** on 2026-08-11, corrected to
**eleven**, read as **seven** again today, and settled at **eleven** with *all
measured*. Both wrong readings were the same mistake, and diffing two runs would
not have caught it — **both runs were mid-load.** The harness renders its table
progressively and its counters climb as iframes resolve.

> **A tool that reports progress can be read at a moment when it is telling the
> truth about nothing.** Wait for its own completion signal, then read.

The harness has one (`done / all measured`). It was ignored three times, twice by
me. **This is now trap #14.**

---

## 7 · What is still open

### 1 · Nothing is open in `preview/` — closed 2026-08-12
The eleven non-cards are resolved: **ten deleted, one promoted.** See §6. Every
one of the 47 files in `preview/` now carries an `@dsCard` marker, so the folder
and the tab are the same set for the first time, and "open the folder and read
something authoritative that nobody maintains" is no longer possible.

### 2 · Nothing else in the spec is open
The audit is closed, both enforcement items are done, and every rule that has
components now names them. **The next real work is whatever production sends
back** — which makes the owed-fixes list below the live edge of the system rather
than a backlog.

### Owed to production — four added this session
Guilloche redraw · the Receipt's 9.6px caption · oxblood ENACTED · the tab bar's
three · skeleton token migration · Clerk's yellow warning · `--changelog-content-cap`
(85 characters) · **the 40px button height · the 40px input height · the toggle's
24px target · the breadcrumb's ~12px target.** All spec-ahead. All the user's.

### Blocked
- **`resistbot/deepspace`** — still pending org approval. First move when access
  lands is unchanged: read the summary prompt against
  `surfaces.archive.newcomer-lede`.
- **Real-client dark-mode testing** on the three emails (carried from session 3).

---

## 8 · Traps

Sessions 1–6's thirteen hold. One addition:

**14 · Read a progressive tool only after its completion signal, and only after
the edit you are checking. `[new]`**
Trap #11 said run it twice and diff. Insufficient in both directions: two
mid-load runs agree with each other and disagree with the truth (the non-card
count, misread twice and "corrected" once the wrong way), and a *finished* run
from before your last edit still reads as authoritative (a legend that grew two
lines clipped the print card by 50px under a clean run). **If a tool reports
progress it is telling you that you are early; if it is not re-run, it is telling
you about a document you no longer have.**

**15 · A specimen renders the component; it never depicts one. `[new]`**
The print card drew the printed emboss rather than rendering `.seal-emboss` from
the stylesheet it already loads, and the drawing was wrong about both the outcome
(a pale ring, not grey mud) and the hue (neutral grey, not warm brown). **An
invented picture is wrong in ways nobody thinks to check**, because there is
nothing to check it against. If the honest render does not make the point, the
render is the finding.

**16 · A silent no-match is a lie you then repeat. `[new]`**
`replaceText` and every find-and-replace like it return the document unchanged
when the target does not match, and unchanged is indistinguishable from
succeeded. The `.mud` deletion no-matched on a trailing declaration and was
reported as done in the same breath. **Every scripted edit must assert its own
match** — compare before and after, throw on equality — and **after deleting a
thing, grep for its name**, which is what found the second stale "grey mud" claim
in the prose. Same family as #14: believing a result about a document you no
longer have.

---

## 9 · How to work here

Unchanged. One thing this session adds, and it is the counterpart to session 5's
*when a recommendation survives four handoffs, stop recommending it*:

**Do the mechanical enforcement pass before looking for design problems.** Three
times now the citation pass has been the thing that found the defects — 20 floor
violations, eleven `ch` declarations, four touch targets — and each time it read
as tidiness next to the real design questions in the list. It is not tidiness. It
is the only audit that has ever worked here, and it costs an hour.

## 10 · The eleven non-cards, resolved

**Ten deleted.** `type-serif-display` · `color-aurora` · `color-primary` ·
`color-functional` · `color-text-opacity` · `material-tiers` · `paper-canvases` ·
`type-hexp-axis` · `type-sans-body` · `type-mono`, plus the working sheet
`_orphans.html` that was built to compare them.

Reading them first changed the question. **They were not cards that lost a
marker** — every one was 745b–3.3kb with no `<h1>` and no `.sub`, the shape of a
fragment authored *before* the card format existed. So the question was never
"which are dead" but "does anything here survive its replacement".

**Nine were redundant, not wrong.** Every hex and oklch value was checked against
`colors_and_type.css` — `#1e293b`, `#64748b`, both papers, the three aurora
hues, the 87/55/38 scale — all current. That is why this was a delete and not a
fix, and it is worth knowing that four sessions of *not* deciding cost nothing
except the hazard itself.

**One was actively wrong**, and it is the argument for the whole item:
`type-serif-display` labelled the display face **Merriweather 800** while
rendering in **Newsreader**. A file that looks authoritative, is shown to nobody,
disagrees with the system, and had survived six sessions of reading because
nothing renders it.

**And promoting it broke trap #8 immediately.** I wrote the new card's viewport
marker as `700x360` from a guess; the harness measured 540 and reported it
clipped by 180px — a third of the card gone, on the one file added in a cleanup
whose whole point was that unshown files go wrong. **The rule is the same one
session 5 wrote and session 4 broke three times: measure, then write the
marker.** It is worth noticing that the mechanical check caught it within a
minute and reading would not have caught it at all.

**One was kept and promoted.** `brand-aurora-still` is the only specimen of
`assets/aurora-still.svg` — the flat fallback for email and raster export — and
no card covered it. It now has a marker, a title, and the rule it was missing:
**it is not the print fallback**, because print has no aurora at all.

> **A folder and its tab should be the same set.** Anything in the folder that
> the tab does not show is a file with no reader and no maintainer, and the
> failure mode is not clutter — it is a confident wrong claim with nothing to
> contradict it.

### Files added this session

`preview/touch-targets.html` · `preview/print-profile.html`

### Files substantially changed

`DESIGN.md` (nine `touchTarget` blocks; `a11y.targetSize.how` and `.cited-by`;
`profilesPrint.emboss` corrected from prediction to render) ·
`preview/type-newcomer.html` (viewport) · `scratch/card-audit.html` (file list) ·
`README.md` · `CHANGELOG.md` · `HANDOFF-2026-08-session6.md` (the non-card count,
corrected and then re-confirmed) · `preview/brand-aurora-still.html` (promoted to
a card) · `scratch/card-audit.html` (ten files dropped from the list)

### Files deleted this session

The ten superseded fragments above, plus `preview/_orphans.html`.
