# Handoff — Amendment Design System, August 2026 (session 5)

**Read this, then `HANDOFF-2026-08-session4.md`, then session 3, session 2,
session 1, then `DESIGN.md`.** Nothing in the earlier memos was reversed. This
session did three things — the card layer, the 44px floor's provenance, and the
printed letter — and all three behaved the way session 4 said this system's work
now behaves: **the interesting part was never the change, it was what the change
made visible.**

---

## 1 · What was done

**`preview/_card.css` exists.** The frame every specimen is shown in — canvas,
the fixed aurora, `.card`, and the four roles a card captions with (`.lbl`,
`.voice-eyebrow`, `.caption`, `.note`) plus `h1`/`.sub` and a link colour. All
54 files in `preview/` now load it. 211 duplicated rules deleted, 55 trimmed to
the declarations that actually differ.

**`scratch/card-audit.html` exists.** It loads every card in an iframe at its own
declared width, measures the card's bottom edge, and reports clipping, dead
frame, and sub-12px type in one table. **Run it before writing a viewport
marker.** All 43 in-tab cards now read 0 clipped / 0 slack / 0 under the floor.

**`a11y.targetSize` names its source.** The 44px floor was inherited, not
derived, and session 4 found it cited by no component and violated by the shipped
tab bar. An unsourced number is a number the next person argues with. Now
recorded, verified current 2026-08-02: **Apple HIG** 44×44pt (where ours comes
from, unchanged since the original iPhone HIG); **WCAG 2.5.5 AAA** independently
at 44 CSS px — two authorities, two unit systems, one number, which is the
argument; the **pt-vs-px** note (they coincide on a mobile viewport, which is why
the tab bar measured at 390pt and specified in px is not a unit error);
**Android's 48dp**, making 44 the floor of the three rather than a target, so
dense/consequential/thumb-reached controls go to 48; and **WCAG 2.2's 2.5.8 at
24px (AA)** recorded explicitly as *not an update* — it is the newer criterion
and the smaller number, so it is the one that will be cited to shrink a control.

**`explorations/The Printed Letter.html` — argued, five questions open,
awaiting a decision.** The last of audit §3.8. Classified an **unowned default**:
`DESIGN.md` has no print block, nothing in the product prints a letter, and
`proposed/…/patterns/print.md` holds an unpromoted stylesheet under which the
browser picks the margins and the breaks. See §5.

Landed in `README.md`, `DESIGN.md` (`a11y.targetSize` only) and
`CHANGELOG.md`. No token changed and the audit table is untouched — §3.8 does
not close until the letter is decided.

---

## 2 · The one idea worth carrying

Session 4's rule was *a rule stated once and cited by no component is not
enforced.* This session adds the mechanism underneath it:

> **A rule with no diff cannot be enforced by reading.** When every card
> retypes its own chrome, a card that departs from the system looks exactly like
> a card that agrees with it. Give the agreement a single home and departure
> becomes one visible line.

That is not a metaphor. Within a minute of the shared sheet existing,
`surface-system.html` showed `.lbl { font-size: 9px }` — the chrome label class,
redefined below its own floor, in a file that had passed four sessions of
reading. Twenty such declarations across seven cards. All twenty could comply
and now do, which incidentally answers for this layer the question audit §3.4
asked and never checked: **no chrome exception was needed.**

**And the corollary, which is where traps #8 and #9 go to die:** a rule you have
to remember to apply is not enforced either. Trap #8 was already written down as
"measure before declaring a viewport", and session 4 broke it three times *after*
writing it. It is a 60-line harness. It found 8 clipped cards and 29 with dead
frame in one run.

---

## 3 · The one real exception, and why it is stated in the card

The Receipt's export card renders 6.5–8.5px type. That is not a violation:
each sheet is a **miniature of a raster authored at 1080px**, shown at ~14% so
three ratios can be compared side by side.

> **A specimen may render below the floor only as a scale model of an artifact
> authored at another size — and it must say so, in the file.** Miniature is not
> chrome.

Session 4 found the same distinction from the other end: guilloche's real defect
is an 800×44 SVG scaled to a phone, and audit §3.7's 5px ledger number arrived
by exactly that route. **Scaling is the system's recurring bug, and the fix is
always to say which size a thing was authored at.**

---

## 4 · Three measurement mistakes worth not repeating

All three produced confident wrong numbers before being caught, and the third
was caught by the verifier after I had already published the results.

- **`scrollHeight` cannot fall below the iframe viewport.** It sees clipping and
  is blind to slack, so a card declaring 900×600 around 124px of content
  measures "600 — fits". The first harness run reported 6 clipped and **0**
  slack. Measuring the card's own bottom edge instead found 29. This is trap #3's
  shape (measure the artifact, not a proxy for it) in geometry rather than
  colour.
- **A measurement taken before webfonts load is a measurement of a different
  document.** The harness waited on `fr.onload` and measured; Readex Pro and
  Newsreader were still resolving, so the first card in the sequence was sized
  with fallback metrics and came in ~10px short — inside the 2px band the tool
  exists to detect. `await fr.contentDocument.fonts.ready` fixed it, and the
  real test is that **two consecutive runs now return identical numbers.** An
  unrepeatable measurement is trap #3 again: I published “0 clipped, 0 slack”
  from a single run and the verifier's run of the same file disagreed.
- **A count taken from a folder listing is not a count of cards.** I sized 11
  files against a default 900×600 before noticing they have **no `@dsCard`
  marker** and are in no tab. `check_design_system` says 44; the folder holds 54.
  Ask the compiler, not `ls`.

---

## 5 · What is still open

### 1 · The printed letter — decision pending, everything else is written
`explorations/The Printed Letter.html` argues it and ends in five numbered asks
with recommendations. Both sheets are authored at true US Letter geometry
(816×1056 at 96px/in) so every length is in inches, not eyeballed. The thesis:
**paper is not a degraded screen, it is the register's home** — `paper-cream`,
the emboss, the guilloche, the ledger number and a Scotch roman are all
imitations of it, so print is the one transport where the ink layer is literally
true and the aurora cannot exist, which costs nothing because the aurora never
carried meaning.

Three of the eight candidate rules are the ones to read first:

- **`* { color: #000 }` deletes the 87/55/38 ink scale.** Re-base to 100 / 45 /
  none — the scale is how ink sits on a page, not a screen affordance.
- **The emboss cannot print.** It is a deformation of a sheet; a printer can only
  print a picture of one, and it comes out as grey mud on the very artifact whose
  authority it was carrying. The ledger number carries the proof — that is
  `registers.issued.proof-rule` load-bearing in a third transport.
- **65ch does not transfer, and it is ambiguous before it is wrong** (below).

**One ask is a product gap, not a design question:** does the product hold the
user's postal address? Without it the sheet is not mailable and no styling fixes
that. The rest of the letter is designed either way; that answer only decides
whether the return block is printed or ruled for a pen.

### 2 · `ch` is ambiguous system-wide — new, and bigger than print
Measured in the exploration at 11.5pt Newsreader: the zero glyph is **8.84px**,
the average rendered character **6.43px** — **a zero is 38% wider.** `ch` is
the advance width of the zero, so `max-width: 65ch` is **5.98in / 89 rendered
characters**, while "a 65-character line" is **4.35in**. Two readings of one
rule, **1.63in apart on an 8.5in sheet.**

**This is not a print problem.** `65ch` is the column token on the bill page,
the letter composer, the reading register and `container.normal` — every one of
them inherits the ambiguity, and every one is set in a serif whose zero is wide.
Nobody has ever checked what those columns actually measure. **First move: run
the same probe against the shipped columns before touching the token.** It may be
that 89 characters is simply what those surfaces have always been, in which case
the token is wrong about its own intent and the surfaces are fine.

### 3 · Mobile-first column tokens — the last of §3.7
Every column token is written desktop-first. An hour, starting from the tab-bar
entry (the only component with real measured mobile geometry). **Do it after item
2** — resolving `ch` first means writing each token once.

### 4 · Cite the 44px floor in the components that have targets
The provenance exists now; the citation does not. Buttons, toggle, FAB, inputs
and breadcrumb all state their geometry without reference to `a11y.targetSize`.
Session 4's rule applies unchanged: a rule cited by no component is not enforced,
and **arriving at 44 by way of padding and icon size is how the tab bar shipped
40.** Same shape as the 12px floor, and that one found 20 violations.

### 5 · Eleven files in `preview/` are not cards
`brand-aurora-still` · `color-aurora` · `color-functional` · `color-primary` ·
`color-text-opacity` · `material-tiers` · `paper-canvases` · `type-hexp-axis` ·
`type-mono` · `type-sans-body` · `type-serif-display`. No `@dsCard` marker, in
no tab. Most look superseded by a merged card (`color-aurora-merged`,
`surface-system`, `type-families`) but that is a guess. **Left in place and
flagged by the harness, not deleted** — a folder of files that read as
authoritative and are shown to nobody is a hazard, but deciding which are dead is
a reading job. Half an hour with the harness output open.

### Owned, and no longer a question
**Syncing production to the system is the user's** (confirmed 2026-08-02). All
six code fixes owed — guilloche redraw, the Receipt's 9.6px caption, oxblood
ENACTED, the tab bar's three, skeleton token migration, Clerk's yellow warning —
sit with him. Stop asking who owns each.

### Blocked
- **`resistbot/deepspace`** — still 404s; pending org approval. First move when
  access lands is unchanged: read the summary prompt against
  `surfaces.archive.newcomer-lede`.
- **Real-client dark-mode testing** on the three emails (carried from session 3).

### Not touched, deliberately
**`ui_kits/web/`** has its own `app.css` and was out of scope. Whether it should
share anything with `_card.css` is a real question and the answer is probably no
— a kit demonstrates the system, a card documents it.

---

## 6 · Traps

Sessions 1–4's nine hold. Read them. Trap #9 (*rules the specimen itself
breaks*) now has a partial mechanical answer — the harness lints the floor — but
only for the floor. Every other rule a card states about itself is still checked
by nobody but you.

One addition:

**10 · Mechanical migration needs a subset test, not a match test. `[new]`**
The migration deleted a card's rule only where **every declaration equalled** the
shared value, and otherwise kept the differing declarations. A cruder pass —
delete the rule if the selector is managed — would have silently eaten
`surface-system`'s `min-height: 300px` and `email-profile`'s padding, and the
damage would have looked like a rendering bug in 54 files at once. Whitespace,
quote style and `0.05em` vs `.05em` all had to be normalised for the comparison
to mean anything. **When a script edits every file in a layer, it must be able
to say what it kept and why.**

**11 · A measuring tool is a specimen too. `[new]`**
The harness is the thing every other number this session came from, and it was
the one artifact I did not check twice. Trap #9 says the file that states a rule
is the file most likely to break it; the same holds for the file that *measures*
one. **Run a measurement tool twice and diff the runs before believing either.**
Anything that varies is measuring something you did not intend to.

**12 · Measure the unit you NAME, not a proxy for it. `[new]`**
The printed letter's first pass computed "65ch" from average character width,
printed 4.35in, and concluded the measure "reads as a poster". Both the number
and the conclusion were wrong: `ch` is the zero glyph, 65ch is 5.98in, and the
verifier caught it. This is trap #3 (rasterise, don't estimate) landing in
geometry rather than colour — the third time this session that a measurement of a
*proxy* for the thing produced a confident wrong number. **The correction was
also better than the original claim:** the finding is not that the token is too
narrow, it is that the token has two defensible readings 1.63in apart, and
setting the measure in inches removes the ambiguity instead of resolving it.

---

## 7 · How to work here

Unchanged. One thing this session confirms: **when a recommendation survives four
handoffs, stop recommending it.** It was two hours' work and it produced a
finding (20 floor violations) and a tool that will keep producing findings. The
reason it kept slipping is that it reads as tidiness in a list next to real
design questions, which is a bad reason and cost four sessions of missed token
propagation.

One more, from the 44px work: **an inherited number needs a provenance, not a
justification.** The floor survived four sessions bare and was enforced in zero
components; the tab bar's 40px targets were never a disagreement with the rule,
they were the absence of one. Writing down *where 44 comes from* — and, as
importantly, that WCAG 2.2's 24px is not an update to it — is what makes the
number arguable-with in the right direction.

### Files added this session

`preview/_card.css` · `scratch/card-audit.html` ·
`explorations/The Printed Letter.html`

### Files substantially changed

All 54 files in `preview/` (chrome moved to the shared sheet; 20 sub-12px
declarations raised; 36 viewport markers corrected to measured content) ·
`DESIGN.md` (`a11y.targetSize` provenance + the prose section's 44px
paragraph) · `README.md` · `CHANGELOG.md`
