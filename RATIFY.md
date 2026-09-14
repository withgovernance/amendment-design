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

### The cut-out is real, and it is worse in light than in dark
- **kind:** spec silent — the check `.28` asked for, answered
- **found:** stage 9b, rendering `Sidebar/FullBleedNeighbour` in both schemes against the cut-out question rather than the edge question.
- **evidence:** measured, `material-regular` in light is `rgba(255,255,255,0.85)` + `blur(50px)`. Compositing a representative aurora lobe under it against leaving it bare:
  - **rail** (no plate, raw aurora): `rgb(150,228,183)`, **34.2% saturation**
  - **panel** (same pixel under the plate): `rgb(239,251,244)`, **4.8% saturation**
  - the plate removes **86% of the aurora's saturation**; the receded rail keeps all of it.
  So on a full-bleed route the rail carries **~7× the chroma of everything beside it.** Read in the render, it does not look like a surface the nav sits on — it reads as a coloured strip cut into the panel, with the glass as the object and the rail as the hole.
- **and the direction matters:** this is **worse in light than in dark**, which is the reverse of where recession's risks have been looked for. In dark both sides are low-luminance and the gap is mostly tonal; in light the glass washes to near-white while the rail keeps a saturated lobe, so the rail becomes the single most chromatic region on the screen. **A change made to help chrome recede makes it the most prominent thing on a full-bleed light route.**
- **proposes:** nothing — same reason as the edge entry. Every fix here (a plate, a hairline, damping the aurora under the rail) is the material decision recession removed, and this is the second consecutive case where the intuitive fix would undo the ruling. Worth noting the interaction: **the aurora divergence and this are the same lever.** The three-lobe token band the shipping gate already requires is lower-chroma, which would shrink this by construction — so this may not need a decision of its own once that lands.
- **blocks:** nothing landed. It is the open question on 9b, not the edge one.

### Three ask-rail artboards carry copy the product cannot perform — and their provenance is the open question
- **kind:** waiting on a person; **kind depends on the answer** (copy error, or spec ahead)
- **found:** reviewing the same branch against artboards labelled `3A`/`3B`/`3C` (phone dark, phone light, desktop).
- **evidence:** the artboard threshold caption reads *"2 of 25 in Assembly District 76 before your legislators are notified."* Both halves disagree with the product. `canSeeAskCount` compares `ask.national_signature_count` against `PUBLIC_COUNT_THRESHOLD` — **ask-wide against the national count, not district-scoped** — and a sweep of the consumer for a notification path (`notify_legislator`, "legislators notified", `notifyLegislator`) returns **nothing**. The share-loop brief's own sanctioned exception to the no-goal-bars prohibition gives the test: *a goal is allowed exactly when crossing it changes the product's behaviour*. Count-goes-public does. Legislator-notification, as of this repo, does not exist to change.
  - Separately, these three IDs appear in **no** written record — not the brief, whose artboards for this work are `CHQ-1` and `B79-0`, not this repo, not the consumer. They reached the implementing session as images pasted by Jason. The Paper MCP has been `ConnectionRefused` since 2026-09-08, so the low-fi authority cannot be opened to reconcile them, and the brief already carries a banner that its own artboard citations were never re-verified.
- **proposes:** nothing yet — **the answer decides the kind, and it is not the design side's to guess.** If notification-at-25 is a real product intention, these artboards are **spec ahead** and the gap is a Known Divergence to record, not copy to delete. If the line was written to sound civic, it is a **fabricated goal** under the prohibition and the artboards need correcting at source before anyone specs from them again. Either way the shipped caption stays as it is: a caption may not promise a notification the product does not send.
- **status:** with Jason. The question is narrow — *is legislator notification at the public-count threshold a thing we intend to build, or not?*
- **blocks:** nothing shipping. It blocks trusting `3A`/`3B`/`3C` as a source, which is the more expensive thing to get wrong.

## Needs a person — cannot close from inside the toolchain

Not a ratification queue. These do not resolve by deciding; they resolve by
someone doing something an agent should not do unprompted. Listed separately so
they stop reading as actionable to the next session that opens this file.

*(the Chromatic review item closed 2026-08-28 — the account is retired and no baselines were ever accepted; see the Open queue)*

---

## Recently ratified

Moved out of this file on ratification; listed here for one cycle so the code side can see what landed.

- **2026-09-03 (v2026.09.03.4)** — **the forms batch, five entries.** `components.selection-is-ink`
  (selection is ink plus a non-colour channel; **no material tier reaches 1.15:1** against its own
  track in either scheme, and under inversion a raised plate paints *darker* than its trough);
  `components.segmented-control` created, with sentence-case labels — at chrome caps the word EMAIL
  rendered twice in one column meaning two different things, and **that render is the argument**;
  `radii.full-is-for-unlabelled`; `components.input-label` corrected to compose the role rather than
  restate it, made mandatory on identity fields, with the placeholder rule; `button-cta` gains
  **the action colour governs form submits**. Two more recorded rather than decided, both already
  right and only unwritten: `components.card.material-outranks-the-register` and `a11y.focusRing`.
