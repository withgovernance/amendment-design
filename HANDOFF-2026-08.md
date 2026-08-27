# Handoff — Amendment Design System, August 2026

> **Superseded in part.** See **`HANDOFF-2026-08-session2.md`** first — it covers
> the three items closed on 2026-08-02 (§3.1 the newcomer's lede, §3.7 the
> Receipt's geometry, §3.5 four registers), a fourth trap, and what to do next.
> Everything below about the thesis, the action colour, the serif, the seal and
> the aurora is still accurate; the "still open" section is not.

**Read this first, then `DESIGN.md`.** This memo covers what changed in the
August session, why, what is still open, and the three traps that will cost you
a turn each if you do not know about them.

---

## 1 · What this project is

`AmendmentDesignSystem` is the design system for **Amendment**, a civic product
whose thesis is *the rule of law is a living document*. Users research bills,
put demands to candidates, and write to representatives.

The system has **two layers**, and this is the organising idea behind
everything:

- **The ink layer** is permanent — Newsreader serif, Readex Pro sans, IBM Plex
  Mono, Midnight Indigo. Documents, statutes, receipts.
- **The aurora layer** is alive — a Blue Hour gradient wash plus a chromatic
  "curtain" band at the top of marketing pages.

*Document, not app* is the test almost every decision gets held to.

### Where things live

| Path | What it is |
|---|---|
| `DESIGN.md` | The spec. ~2000 lines, YAML-ish + prose. Canonical. |
| `colors_and_type.css` | The token layer. What actually ships. |
| `README.md` | Short orientation. |
| `CHANGELOG.md` | Every decision with its reasoning. **Read the top three entries.** |
| `AUDIT-2026-08.md` | The audit that drove this session. Status table at the top is current. |
| `RECONCILIATION-2026-08.md` | Findings from diffing the spec against production source. |
| `preview/*.html` | 37 specimen cards, one per `@dsCard`. The Design System tab. |
| `ui_kits/web/` | A working React kit — `app.css`, `components.jsx`, `civic.jsx`, `screens.jsx`. |
| `explorations/` | Decision artifacts from this session. Each one argues a case. |
| `uploads/globals.css`, `uploads/DESIGN-*.md` | **Production source.** Read-only truth. |
| `proposed/` | Not yet canonical. Has its own promotion path. |

---

## 2 · What changed in August, and why

Five audit items closed. The reasoning matters more than the values — if you
only remember the values you will re-litigate the reasoning.

### The action colour is Momentum green `oklch(.66 .148 160)`

Oxblood (`red-900`) was the CTA and failed four ways: it shared a hue with
semantic danger so Send looked like Delete, sat at L .35 against an L .22 dark
canvas, muddied against Midnight Indigo, and was stock Tailwind in the system's
most meaning-bearing slot.

The replacement is **sampled from the shipped `--aurora-curtain`**, not authored
— the ownable colour did not need inventing, only recognising.

**Two consequences that trip people up:**

1. **The label is INK, not white.** At L .66 white measures 2.90:1 and ink
   6.42:1. Below about L .55 that reverses, and between L .55–.60 *neither*
   clears 4.5:1 — a saturated green sits almost exactly between white and black
   there. Do not move this token's lightness without re-measuring both labels.
2. **Pressed states have ~6 points of lightness to work with** before the ink
   label fails. Beyond that, pressed must come from ring or inset, never more
   fill.

### Action and success are one hue — and the fill rule

`--color-momentum` now aliases `--color-action`. Co-signing *is* joining; a
constituent signing and the counter moving are one event seen twice.

Because they share a hue, **fill carries the difference:**

> **A green plate is a control; green ink is a report.** Fill means *press me*.
> A numeral, chip, stamp, rule, or check — anything green that is not a filled
> plate — states a fact that is already true. Meters and ribbons are exempt:
> they encode quantity, not affordance.

The rejected alternative (filled = done, outline = available) reads fine on a
checkbox and fails here: it ghosts the primary action and makes every state on
the page look pressable.

### There is no red left except semantic danger

Oxblood survived the CTA change as the wax seal, then lost that too. A
registrar's seal, a notary's seal, a corporate seal — **none of them are
printed. They are pressed.** The seal is now a **blind emboss**: highlight
up-left, warm shadow down-right, no ink. Two rules: it requires paper (an emboss
has nothing to press into on glass), and it reads *better* in the dark room,
because lamplit paper is warmer so the shadow deepens.

### The serif is Newsreader, with three optical stops

Merriweather reads *blog*. One correction to the audit: Merriweather **is**
variable on weight — what it lacks is an **optical-size axis**, so one drawing
served both a 38px bill title and 15px statute. That, not the clot, was the
deciding argument.

| token | stop | use |
|---|---|---|
| `--serif-display` | opsz 60 / wght 800 | headings, bill titles, Receipt |
| `--serif-text` | opsz 16 / wght 450 | body, statute, analysis |
| `--serif-quote` | opsz 24 / wght 400 | quoted voice, 18px+ |

**Always set a stop.** The axis defaults high and a Scotch roman at the display
end has hairlines far too fine for body copy. Setting one value for both ends
was my original mistake and it is easy to repeat.

**Serif italic is reserved for quoted human voice at 1.125rem and up.**
Newsreader's italic is a true calligraphic italic — lovely at 20px, genuinely
hard at 14. Metadata is serif roman at 420. This is not a fault in the face; the
old rule was asking small italic to do too much and it would have recurred with
any real serif.

### The aurora constraint was false — and the truth is about placement

The spec said the aurora was monochromatic and that opacity-based text depended
on it. Production ships a five-lobe curtain, hues 150–290, chroma to 0.21,
violet included, above the fold. I measured it rather than arguing: both stacks
modelled from the real declarations, oklch → sRGB, alpha ramped to each
transparent stop, composited in order, 26 × 14 grid, worst case.

|  | inside the band | below the band | needs |
|---|---|---|---|
| 87% ink · light | 10.23 | 14.19 | 4.50 |
| 87% ink · dark | **3.53** | 12.80 | 4.50 |
| 55% ink · light | **4.10** | 4.58 | 4.50 |
| 55% ink · dark | **2.32** | 5.89 | 4.50 |

**Monochrome was never the mechanism. Placement is.** Inside the band nothing is
safe. What protects the product today is the composition — the hero headline and
buttons clear the band. So the rule is now **no bare text inside the curtain
band**, with a `material-chrome` exception for chrome that must overlap it.

The violet ban narrowed to what it always meant: no violet **accents**. Ambient
light in a gradient is not an accent.

### Also

- **Dark-mode paper is lit, not swapped.** Both prior accounts were wrong — the
  spec said paper renders identically in both modes; the stylesheet darkened it
  to near-black. Production keeps it light and warms it to lamp temperature
  under two viewport-anchored light pools. Use `[data-paper]` on a paper canvas
  to keep its ink dark.
- **The wordmark lost its oxblood period**, gained an optional **proofreader's
  caret** at a 95° apex. Wide, not steep — steepening makes a mark *more*
  letter-shaped, because letters are tall and narrow.
- **The signature face is permitted for signatures only** — co-signs,
  endorsements, pledges, sent letters. Script is still banned as system
  typography. `--font-signature`, `.role-signature`,
  `--signature-optical-scale`.

---

## 3 · What is still open

From `AUDIT-2026-08.md`, status table at the top is current.

### §3.1 — A register for the newcomer `[RESOLVED 2026-08-01 — the lede]`

**Closed.** It landed as a copy-and-hierarchy rule in the Archive's own type —
`.role-lede`, one sentence / three facts / one action, a jargon-replacement
rule, and the thirty-second path. The audit's own prescription (a sans
`body-plain` role on glass) was built and rejected: plainness assigned to the
typeface left no range for hierarchy. One sub-item stays open and needs an owner
rather than a designer: **who writes the plain sentence** for 464,269 bills.
Original framing below.

The system has a voice for institutions
(Archive: clerical, exact, serif) and a voice for the crowd (Commons: present
tense, live). It has **no voice for the person who has never read a bill** —
who is the core user.

The test the audit sets: *someone who has never heard the word "engrossed"
should be able to act correctly without learning it.*

This is a writing-and-register problem, not a token problem, which makes the
specimen matter more than usual. Do not solve it by adding a tooltip.

### Also open

- **§3.3 tactile accents** — partial. The seal and guilloche resolved; the
  inventory was never cut from twelve to four and the promotion path is
  unwritten.
- **§3.6 weight scales** — partial. Spec holds at one, production ships four,
  direction settled. This is a code migration, not a decision. Recorded as a
  **Known Divergence** in `DESIGN.md`. **Do not let the spec drift back to match
  the code** — parallel scales are how it reached four.
- **§3.7 Receipt geometry — RESOLVED 2026-08-02.** Two artifacts: portrait HTML
  is the kept one, three rasterised export ratios (tall / square / wide) are the
  shared one. Source-derived — production already ships three ratios. The rest
  of §3.7 (tab bar, mobile-first column tokens) is still open.
- **§3.5 — RESOLVED 2026-08-02 at FOUR, not three.** Live · Reading · Writing ·
  Issued, as a `registers:` block above `surfaces:`. The Reading Room + Commons
  merge held; Writing Desk + Receipt did not, because the Receipt keeps two
  geometries by design. Five room names kept as narrative. Side effect worth
  knowing: **streaming is not motion** is now an explicit carve-out in
  `motion.rules`, which resolves a contradiction that predated the audit.
- **§3.8 missing surfaces** (email, tables, forms, loading, Spanish) — untouched.
  **Email is the big one**: the letter that lands in a legislator's inbox is the
  product's core artifact and is generated entirely outside the system. Aurora,
  oklch, `backdrop-filter` and the HEXP axis all die in email, so it needs a
  stated fallback register rather than a template.
- **§3.7 the rest** — tab bar, mobile-first reading of the column tokens.
- **§3.3 tactile accents** — the inventory was never cut from twelve to four and
  the promotion path is unwritten. Smallest remaining item.

---

## 4 · Three traps

**1 · Specimens lag tokens, and there is no shared stylesheet.** All 37
`preview/` cards are hand-written HTML with inline styles. A token change does
not propagate — it has to be applied 37 times, and I missed some on three
consecutive rounds. **Recommended: build `preview/_card.css`** holding
`.caption`, `.meta`, and the serif stops before the next system-wide change.
Until then, after any token change, grep `preview/` for the old value *and* the
old prose, and verify with a script rather than by eye.

**2 · The spec has drifted from production before and will again.** The audit
only read `DESIGN.md`, so it missed three real divergences that only turned up
when I diffed against `uploads/globals.css`. When something looks wrong in the
spec, **check production source before rewriting the rule** — twice the shipped
artifact was better than the documented rule.

**3 · Measure contrast by rasterising, not by parsing.** `getComputedStyle`
returns `oklch()` verbatim in Chrome. An early version of the action-colour
sheet parsed those three components as R/G/B and printed ratios ~3× too high,
which nearly produced the wrong recommendation. Paint the colour into a 1×1
canvas and read the pixel back.

---

## 5 · How this session worked

Each decision got a standalone artifact in `explorations/` that argued the case
with real content on real surfaces, plus a toggle so the user could compare
rather than take my word for it. Every one ends with an explicit ask and the
line *nothing here is committed*. Then, on a decision, the change lands in the
token layer, the spec, the README, the kit, the affected specimens, and the
changelog in one pass.

Two things the user pushed on that were right both times: **show me an artifact
and ask me to decide** rather than presenting a conclusion, and **fix the
constraint, not the symptom**. When a verifier flagged the same class of problem
three rounds running, the answer was a structural change, not another tweak.

Worth keeping: the changelog records *why*, including rejected alternatives and
corrections to the audit's own reasoning. That is what made this session
possible to hand off at all.
