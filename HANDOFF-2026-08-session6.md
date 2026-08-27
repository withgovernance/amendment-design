# Handoff — Amendment Design System, August 2026 (session 6)

**Read this, then `HANDOFF-2026-08-session5.md`, then session 4, 3, 2, 1, then
`DESIGN.md`.** Nothing earlier was reversed. This session answered the two
questions session 5 left open, and **the audit is now closed** — ten of ten
items, one partial by design.

---

## 1 · What was done

**`ch` is retired from the token layer.** Session 5's first move was *measure the
shipped columns before touching the token.* Measured (two runs, identical): the
prose column renders **97 characters**. New `spacing.measure` — `body: min(28rem,
100% - 2rem)` (69 characters), `lede: min(24rem, 100% - 2rem)` (47), `print:
6.5in` — stated mobile-first, which also closes the last item of audit §3.7.
Swept through `colors_and_type.css`, `ui_kits/web/app.css`, `tokens.json`, eleven
declarations across seven specimen cards, and `preview/_card.css`'s own `.sub`.
New card `preview/measure.html`.

**`profilesPrint` is canonical.** The mailed letter, the last item of audit §3.8.
A profile with one addition no profile has needed before — a `requires:` list —
because paper has content requirements the screen has no equivalent for.
`proposed/…/patterns/print.md` promoted and superseded; the `@page` and `@media
print` rules it can own now ship in `colors_and_type.css`.

**Two user answers did the work.** *"65ch was supposed to set a readable line
length for copy"* turned a measurement into a bug — without it, 97 characters
could have been recorded as what the surfaces have always been. *"Yes, the
product has the postal address"* is what let the return block be printed rather
than ruled for a pen.

---

## 2 · The one idea worth carrying

Session 5's rule was *a rule with no diff cannot be enforced by reading.* This
session found the sharper case:

> **A value that computes differently per consumer cannot be enforced by reading
> at all.** `container.normal: 65ch` is a custom property, so `ch` is not
> resolved where it is defined — it is resolved at every use site, in that
> element's font. The same token was 636px on the page shell and 601px on a serif
> element. Four sessions read that line and saw a number.

The corollary, and the reason this took five sessions to surface: **a unit can
carry an intent it silently fails to express.** `65ch` was written to mean "a
readable line". It renders 97 characters. The lede's `52ch` was written to mean
"shorter than the body column" and rendered 36px narrower — one character to the
eye — because a larger face has a wider zero and bought back nearly all the width
it was meant to give up. **Both rules were right and both were unenforceable in
the unit they were written in.**

So the general form, which now sits in `spacing.measure.rule`: **state the
intent as a count, the value as a length, and the derivation in the comment.**
The count is what someone argues with; the rem is what the browser obeys.

---

## 3 · Where a measure goes

Worth stating separately, because it is the part that generalises past `ch`:

> **A measure caps the element that holds the text. A container is a shell.**
> `.page--prose` was carrying the measure and inheriting a font it never
> rendered. A page may be as wide as it likes; the paragraph is capped.

`container.*` and `measure.*` are now separate groups for exactly this reason.
The shell value (`min(31rem, 100%)`) is the measure plus `.page`'s own gutters,
and it is derived, not chosen.

---

## 4 · Two measurement notes

- **The mechanical sweep changed heights, and heights are markers.** Narrower
  prose is taller prose: four cards clipped their declared viewport after the
  measure landed, none of them touched by hand. **Run `scratch/card-audit.html`
  after any change that alters text width, not just after writing a card.** Trap
  #8's mechanical answer only fires if you fire it.
- **The harness has a hardcoded file list.** `preview/measure.html` measured as
  "not in the tab" until it was added to `FILES` — a new card is invisible to the
  tool that exists to check cards. Session 5's trap #11 (*a measuring tool is a
  specimen too*) with a different edge: the tool was not wrong, it was
  incomplete, and the failure mode is silence.

---

## 5 · What is still open

The audit is closed. What remains is enforcement and housekeeping.

### 1 · Cite the 44px floor in the components that have targets
Carried unchanged from session 5, and now the largest open item. Buttons, toggle,
FAB, inputs and breadcrumb all state their geometry with no reference to
`a11y.targetSize`. **Arriving at 44 by way of padding and icon size is how the
tab bar shipped 40.** The 12px floor found 20 violations by the same route; the
measure sweep just found eleven more of the same shape.

### 2 · A specimen for `profilesPrint`
The profile is canonical and cited by no card. `explorations/The Printed
Letter.html` has the sheets at true Letter geometry, so the material exists —
this is a card, not a design job. **Session 4's rule applies to it verbatim.**

### 3 · Eleven files in `preview/` are not cards
Unchanged from session 5 §5. **Session 6 recorded a discrepancy here — seven
rather than eleven — and it was not real: the harness counts as it loads, and
that number was read mid-run.** It settles at eleven, matching session 5. Trap
#11 landing on the person who wrote trap #11. Corrected 2026-08-11. Half an hour
with the harness output open.

### Owed to production — one added
Guilloche redraw · the Receipt's 9.6px caption · oxblood ENACTED · the tab bar's
three · skeleton token migration · Clerk's yellow warning · **voyager's
`--changelog-content-cap: 65ch`, which renders 85 characters in the sans.**
All spec-ahead, all the user's.

### Blocked
- **`resistbot/deepspace`** — still pending org approval. First move when access
  lands is unchanged: read the summary prompt against
  `surfaces.archive.newcomer-lede`.
- **Real-client dark-mode testing** on the three emails (carried from session 3).

### Not touched, deliberately
**`explorations/`** still contains `ch` values in its own chrome. They are dated
arguments, not the system — leaving them is correct, and rewriting them would
make the record disagree with itself.

---

## 6 · Traps

Sessions 1–5's twelve hold. One addition:

**13 · A unit can express the opposite of its intent. `[new]`**
Not a typo and not a drift: `65ch` for "a readable line" and `52ch` for "shorter
than the body column" were both written correctly and both rendered the wrong
thing, because the unit resolves against something other than the text. **When a
rule states an intent, check that the unit it is written in can express that
intent** — and where it cannot, write the intent as a count in the comment and
the value as a length the browser can obey.

---

## 7 · How to work here

Unchanged. Two things this session confirms.

**Ask the plain question about intent, not about the value.** *"Was 65ch meant to
set a readable line?"* is what turned a measurement into a bug. Without it, 97
characters is defensible as what the product has always shipped, and the token
would have been re-labelled instead of fixed.

**A correction is worth more than the finding it corrects.** Session 5's `ch`
number was right about the ambiguity and wrong about the size of it — 38% within
a face, 50% between two. The bigger of the two only appeared because the probe was
pointed at the shipped columns rather than at the token.

### Files added this session

`explorations/What 65ch Measures.html` · `scratch/ch-probe.html` ·
`preview/measure.html`

### Files substantially changed

`DESIGN.md` (new `spacing.measure`; `container` re-described; new top-level
`profilesPrint`; eight `65ch` references re-stated) · `colors_and_type.css`
(`.role-lede`, `.measure` / `.measure-lede`, `@page` + `@media print`) ·
`ui_kits/web/app.css` · `proposed/design-system/tokens/tokens.json` ·
`proposed/design-system/patterns/print.md` (superseded) · eight files in
`preview/` plus `preview/_card.css` · `scratch/card-audit.html` (file list) ·
`README.md` · `AUDIT-2026-08.md` (§3.7 and §3.8 closed) · `CHANGELOG.md`
