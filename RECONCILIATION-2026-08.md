# Reconciliation: DESIGN.md vs. voyager `globals.css`

**Date:** 2026-08-01
**Source:** voyager `app/globals.css` (862 lines), provided directly. First source-derived
reconciliation this project has had — everything prior was spec-derived.
**Trigger:** `AUDIT-2026-08.md` §6: *"If repo access becomes available, stop and reconcile
before doing Phase 3."*

---

## 1. The aurora is not monochromatic `[CRITICAL — invalidates a standing constraint]`

The spec's §5 standing constraints say the aurora is **three lobes, low chroma,
monochromatic**, that no fourth lobe may be added, and that violet is forbidden outright.

Production ships **two** aurora systems:

| | Lobes | Hues | Chroma |
|---|---|---|---|
| `body` background (Blue Hour) | 3 | 250 · 270 · 60 | 0.05–0.09 |
| `--aurora-curtain` | **5** | **150 · 160 · 190 · 224 · 290** | **0.15–0.21** |

The curtain is green → teal → blue → **violet**, at four to seven times the sanctioned
chroma. Every clause of the constraint is already broken in shipped code.

**This is not only a violation — it is the answer to §3.2.** The audit asked for one
ownable colour and assumed it had to be authored from nothing. It does not: the product
already emits a distinctive chromatic signature and has no idea it does. The receipt's
chromatic guilloche is the curtain rendered as line-work, not a rogue decision.

**Consequences to work through, not decisions made:**

- The opacity-based text invariant (87/55/38 on black or white) was justified *by* the
  monochrome constraint. If the curtain is real, that justification does not hold
  wherever the curtain renders. Needs measuring on curtain-backed surfaces specifically.
- The "no violet, ever" rule needs to become narrower and true, or be dropped. Violet in
  low-opacity line-work is a long way from a violet brand accent, and the current
  absolute is being ignored.
- The action-colour work should sample the curtain rather than invent. Signal — the
  favoured candidate — is approximately curtain lobe 2 at button lightness.

## 2. Four font-weight scales in production, not two `[HIGH]`

Audit §3.6 identified `sans-light` / `sans-dark`. Production has four:

1. `:root` sans (160–700)
2. `.dark` sans (7/8 shift, all nine values)
3. `.font-serif` (100–900)
4. `.dark .font-serif` (a further 7/8 shift, all nine values)

The Phase 1 edit collapsed the **spec** to one scale. That was right, and it now sits
three scales ahead of the code. Recorded here so the gap is explicit rather than silent.

## 3. The dark-mode material model in DESIGN.md is wrong `[HIGH]`

The spec says dark glass is **black** overlays. Production uses **white** overlays, and
the light values differ too.

| Tier | Spec light | Real light | Spec dark | Real dark |
|---|---|---|---|---|
| ultrathin | 10% w | 10% w | 2% black | **2% white** |
| thin | 45% w | **30% w** | 26% black | **4% white** |
| regular | 85% w | **55% w** | 41% black | **8% white** |
| thick | 95% w | **75% w** | 60% black | **12% white** |
| chrome | 75% w | **55% w** | 90% zinc-900 | **12% white** |

Replace every material number in the spec from source. The prose claim that "dark glass is
black with much lower opacity, because dark backgrounds need less veil" describes a model
the product does not use.

## 4. Paper in dark mode is a desk lamp `[HIGH — better than both accounts]`

Neither existing account is right. `DESIGN.md` says paper renders *identically* in both
modes. `colors_and_type.css` (this project) darkens it to `oklch(.20 .010 70)`, near-black.

Production does a third thing: the sheet stays light and **warms** to
`oklch(.78 .058 68)` (cream) / `oklch(.77 .067 64)` (parchment), with two radial light
pools at `background-attachment: fixed` — so scrolling passes the page under a
stationary lamp instead of dragging a cone of light along with it. Deep warm shadows,
warm inset ring.

Adopt verbatim. Fix `colors_and_type.css`, and replace the DESIGN.md prose.

## 5. The system ships a signature typeface `[MEDIUM]`

`--font-signature: var(--font-amerika-signature)`, with a `signature-write` keyframe that
clips the name on left-to-right (with deliberate over-extended insets so script swashes
are not cropped). The Heritage section rules script faces out: *"Users may upload an
actual signature image; the system does not simulate one."* Production simulates one, and
it reads well. The rule should probably yield; either way the spec cannot keep asserting
the opposite.

## 6. Receipt motion is fully built and more specific than the spec

Five named keyframes: `receipt-arrival` (320ms, scale .96→1), `receipt-aurora` (700ms,
peak at 30% then settle to 0.6), `emblem-land` (360ms at 520ms delay, scale .85→1,
settling to **opacity 0.4**), `signature-write` (600ms at 420ms delay),
`guilloche-reveal` (250ms, delay applied inline **per band** so they stagger).

Two notes: the "emblem" landing at 0.4 opacity is the grayscale mark, not a wax seal —
consistent with the co-sign receipt carrying no seal. And the spec's claim that the
Receipt "borrows every tactile accent the system has" is not what shipped.

## 7. Confirmed as specced — no action

- Navbar is always chrome. `material-scroll` is a straight alias of `material-chrome`,
  with a source comment giving the same reason DESIGN.md does for removing the
  scroll-driven version. The Phase 1 §3.4 fix was correct.
- The paper-islands `@custom-variant` is real, and matches the spec verbatim.
- One shadow ink at slate-900 `rgb(15 23 42)`, two layers per tier, with the same
  rationale in a source comment.
- `prefers-reduced-transparency`, `prefers-contrast`, and `prefers-reduced-motion`
  fallbacks all ship as documented.
- The 12px floor: `--input-label` uses `text-sm`. No sub-12px chrome found in globals.

---

## What this changes about the plan

Audit §3.2 ("find one ownable colour") should be **rewritten before it is executed**. It
assumed the palette was stock and the aurora invisible. Half of that is true — the ink
layer is stock — but the living layer is neither invisible nor low-chroma; it is a
five-lobe chromatic curtain that nothing in the documentation admits to. The right work is
to *recognise and codify* what ships, not to author a new hue beside it.

Phase 3 items §3.1 (newcomer register) and §3.7 (mobile) still need source that this file
does not cover: component TSX and the Tailwind config. `globals.css` settles the token and
material layer only.
