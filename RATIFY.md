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

### Dark glass is neutral, and the warm stop it was said to be cancelling is not there
- **~~REFRAMED as a lamp~~ — RETRACTED 2026-09-03, killed by the artifact.** I claimed the reference card's hue 58-80 was `--paper-*-lamp` (hue 74-80) "sampled after compositing", and proposed extending the paper lamp to glass. **Measured on the shipped artifact (`Amendment - Form Specimen.html`): there is no lamp.** `background-image: none` on the dark pane, `background-attachment: scroll`, and **zero gradients anywhere inside it** — the pane is flat zinc-900. I inferred a mechanism from a hue overlap and the artifact says otherwise. The prototype contrast worry that came with it (secondary ink at 4.21:1 inside a pool) is void: there is no pool.
- **WHAT IT ACTUALLY DOES, and "warm-tinted glass" undersells it.** Dark mode currently adds **pure, hue-less white** at low alpha. The artifact keeps the same structure and nearly the same alphas and gives that added light **a colour temperature**:

  | surface | system today | the artifact |
  |---|---|---|
  | input recess | `rgb(255 255 255 / 6%)` | `oklch(0.95 0.04 80 / 0.07)` |
  | input ring | `rgb(255 255 255 / 10%)` | `oklch(0.95 0.03 80 / 0.12)` |
  | card plate | `rgb(0 0 0 / 41%)` | `oklch(0.18 0.018 62 / 0.5)` |
  | selected chip | — | `oklch(0.97 0.045 80 / 0.3)` |

  It warms the LIGHT, not the MATERIAL. That is why a crude tint of the material renders as a brown card — rendered side by side, it reads as tobacco-coloured plastic with no source — and this reads as lit.
- **IT COSTS NOTHING AND FIXES SOMETHING.** Sampled off the artifact's own dark render: `--text-secondary` measures **6.11:1** on the plate, **6.10:1** in the field recess and **5.37-5.97:1** on the segmented track, all comfortably over 4.50 and all better than the aurora band's 4.53 worst point. The selected label at `--text-primary` on its chip is 5.38:1.
- **AND IT PARTIALLY FALSIFIES `components.selection-is-ink`, which is mine to correct.** That entry says no material tier reaches 1.15:1 against its track and that "no choice of tier makes it close". True of TIERS, and false of this: **the artifact's selected chip separates from its track at 2.65:1** — more than double any neutral tier. The reason is the thing the entry did not anticipate: neutral dark tiers are BLACK OVERLAYS and subtract, while warm added light ADDS. The ratified rule still stands as written (2.65 is under the 3:1 a non-text signal owes, so ink plus weight still carries selection) but the REASONING must be corrected before someone cites it to block this.
- **THE LIGHT SCHEME IS UNTOUCHED SYSTEM**, which is what makes this adoptable: the artifact's light plate is `rgba(255,255,255,0.85)` — `material-regular` exactly — and its light recess is `rgba(0,0,0,0.05)` — `components.input` exactly. The divergence is dark-only and contained.
- **proposes:** a materials-level, dark-only change — **give dark mode's additive white a colour temperature**, as one pair of tokens the five tiers and the input recess compose against, rather than a warm variant per component. **Waiting on:** the other four tiers rendered at the artifact's values, and a non-form surface, before this is ratified. One artifact is enough to kill my lamp theory and not enough to move `materials`.
- **still open, and now sharper:** the two remaining divergences in the artifact are not part of this — its segmented track is `4px` with a `2px` chip (**2px is not on the radius scale at all**, and v2026.09.03.4 ratified track `md` / segments `sm`), and its segment labels are tracked caps, which v2026.09.03.4 ratified against. Neither is a materials question.

- **held 2026-09-03 (v2026.09.03.4):** not decided in the forms pass. The diagnosis was corrected in place — the warm lobe does not survive its own alpha, so nothing warm is being cancelled — but the remaining question generalises to all five tiers and belongs to `materials`, not to forms. **Waiting on:** the same pane:ground separation taken on a non-form surface, to confirm the 1.08 → 1.04 cost is the tier's and not this card's.
- **kind:** two readings
- **found:** 2026-09-03, building the dark form register. Reported as "grey on blue," with the diagnosis that neutral glass cancels the aurora's one warm stop. The complaint measures; the diagnosis does not.
- **evidence:** `preview/forms.html`, marked unratified in the markup as well as in prose. Composited over the warm stop at 50% 90%: **the ground itself is oklch C 0.013 at hue 285** — cooler in hue than the base canvas and lower in chroma than it. The warm lobe does not survive its own alpha, so there is nothing warm being cancelled, and warm-tinted glass would be inventing a light source rather than admitting one. What is true is the surface: `material-regular` dark over that stop composites to **C 0.008**, a neutral grey, and it is the pane a whole form sits on. The alternative reading is the one the system already took — `materials.material-chrome` moved dark off warm zinc onto **the canvas's own hue at the same opacity** on 2026-08-28, for this same category of complaint. Generalised to `material-regular` it raises chroma to **C 0.017** at the warm stop and **C 0.042** from **C 0.035** at the cool lobe, and costs about four hundredths of pane-to-ground separation (1.08 → 1.04).
- **proposes:** decide whether dark glass is neutral or takes the canvas's hue. If the 2026-08-28 ruling generalises it generalises to **all five tiers**, and it is a `materials` change with nothing to do with forms — filed from forms only because that is the surface where a whole page of glass makes it visible.
- **blocks:** nothing. The specimen ships both readings and commits to neither.

### The ask ledger's chamber rows have no term for the ask's own state
- **kind:** spec silent
- **found:** `amd-ask-rail-three-surfaces`, reviewing `AskCosignLedger` on a Wisconsin state ask. Raised as a question about the *statewide* row; the statewide row turned out to be correct and the chamber rows above it are the case with no rule.
- **evidence:** `cosignLedgerRows` takes the ask's `level` and the viewer's `address`, and `AskDetail` passes `level={ask.level}` only — the ask's **state is never in scope**, so the function structurally cannot compare it against the viewer's. An out-of-state viewer on a state ask therefore gets their own `STATE_LOWER`/`STATE_UPPER` rows, which cannot move that ask. The docstring claims "only the rows that can move this ask," which is not what the code does for this case.
  - **The failure is milder than it first reads, and the measurement is why.** Read from deepspace source by the implementing session: `AskCounterResponse` defaults every district field to `None` and only `national` to `0`; `get_counts` keys each district row on the **viewer's** state + district, so a Minnesota viewer on a Wisconsin ask looks up a counter that exists only if someone in that Minnesota district signed this Wisconsin ask. Normally nothing returns, the field stays `None`, and voyager renders the em dash. **The path never invents a `0`** — so the "nobody here yet, go recruit" misreading cannot occur. What ships is two em-dashed rows of the viewer's own unreachable geography.
- **proposes:** decide which is true, because they lead to different code. Either **the chamber rows are suppressed when the viewer's state differs from the ask's** — consistent with the docstring, and it requires threading the ask's state into `cosignLedgerRows`, which it currently has no access to. Or **em-dashed rows correctly report "your districts, no reach here"**, in which case the docstring is the thing that is wrong and should say so.
- **note on the shape:** this is the same class as the `role-label-caps` wrap entry above — a rule that is correct in the common case (viewer in the ask's state) and silently undefined in the uncommon one. Neither is visible from the common case, and the ask rail's stories all render the in-state viewer.
- **blocks:** nothing. The rows are honest as drawn; only their selection is unruled.

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
