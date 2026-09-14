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

### Three ask-rail artboards carry copy the product cannot perform — and their provenance is the open question
- **kind:** waiting on a person; **kind depends on the answer** (copy error, or spec ahead)
- **found:** reviewing the same branch against artboards labelled `3A`/`3B`/`3C` (phone dark, phone light, desktop).
- **evidence:** the artboard threshold caption reads *"2 of 25 in Assembly District 76 before your legislators are notified."* Both halves disagree with the product. `canSeeAskCount` compares `ask.national_signature_count` against `PUBLIC_COUNT_THRESHOLD` — **ask-wide against the national count, not district-scoped** — and a sweep of the consumer for a notification path (`notify_legislator`, "legislators notified", `notifyLegislator`) returns **nothing**. The share-loop brief's own sanctioned exception to the no-goal-bars prohibition gives the test: *a goal is allowed exactly when crossing it changes the product's behaviour*. Count-goes-public does. Legislator-notification, as of this repo, does not exist to change.
  - Separately, these three IDs appear in **no** written record — not the brief, whose artboards for this work are `CHQ-1` and `B79-0`, not this repo, not the consumer. They reached the implementing session as images pasted by Jason. The Paper MCP has been `ConnectionRefused` since 2026-09-08, so the low-fi authority cannot be opened to reconcile them, and the brief already carries a banner that its own artboard citations were never re-verified.
- **proposes:** nothing yet — **the answer decides the kind, and it is not the design side's to guess.** If notification-at-25 is a real product intention, these artboards are **spec ahead** and the gap is a Known Divergence to record, not copy to delete. If the line was written to sound civic, it is a **fabricated goal** under the prohibition and the artboards need correcting at source before anyone specs from them again. Either way the shipped caption stays as it is: a caption may not promise a notification the product does not send.
- **status:** with Jason. The question is narrow — *is legislator notification at the public-count threshold a thing we intend to build, or not?*
- **checked 2026-09-14:** Paper is reachable again. No page of `Amendment UX/Wireframes` (UI Wireframes, Bot Scripts, iOS) has an artboard named 3A/3B/3C or text containing "of 25" or "District 76". The only "notified" copy is on the iOS page's "Ask detail · no responses" — *"Both NY-14 candidates have been notified…"* — so a notification concept exists in the low-fi, at a different trigger. PR #782 closed unmerged 2026-09-09, so the caption never shipped. Nothing to decide on the design side until the product answer lands.
- **blocks:** nothing shipping. It blocks trusting `3A`/`3B`/`3C` as a source, which is the more expensive thing to get wrong.

### `card-empty` and `card-placeholder` do not say what type their message takes
- **kind:** unowned default
- **found:** `design-reviewer` on `preview/cards.html`, after v2026.09.14.8 split the two components.
- **evidence:** the specimen sets one `role-caption` line. Voyager's `card-empty` utility sets no size, and its call sites carry a `role-ui-heading` title plus a `text-sm` message (`app/(data)/dispatches/page.tsx:526–529`). The spec names padding, ink and alignment and says nothing about the message's role, or whether a title is allowed.
- **proposes:** render both shapes — one caption line; a `role-ui-heading` title over a `role-body` message — inside the 32px panel at 390, both schemes, and let the container decide.
- **blocks:** nothing. Voyager's migration of the dashed sites (handoff 2026-09-14) can land either way.

### May a specimen print a value it resolved at render time?
- **kind:** unowned default
- **found:** `design-reviewer`, comparing `preview/color-ink-opacity.html` (now prints no values, only token names) with `preview/measure.html` (prints computed widths and counts).
- **evidence:** "cite the token, never the number" governs typed prose. A value a specimen computes from the live stylesheet cannot go stale the way a typed one does — but it can be computed by a retracted method: `measure.html` still divides a width by an average glyph and labels the result "measured", printing 69 / 47 / 97 where the first set line counts 64 / 41 / 91. That half is conformance and is owed regardless.
- **proposes:** decide whether render-time values are allowed in specimens, and if so, that they must be measured the way the spec measures (a set line, a painted pixel), never derived.
- **blocks:** nothing.

### `_card.css` builds its own chrome labels — is specimen furniture exempt from the role layer?
- **kind:** two readings
- **found:** `design-reviewer`, across the specimens reviewed on 2026-09-14.
- **evidence:** `_card.css` declares itself "not system guidance", yet `.voice-eyebrow`, `.lbl` and `.pane-label` are hand-built uppercase labels at 0.06–0.08em tracking and tertiary ink, where `role-label-caps` is `--track-chrome` and secondary ink. Hard rule 10 bans a hand-assembled register; the file's own disclaimer implies its furniture is outside the rule.
- **proposes:** render the specimen frame both ways — furniture on `role-label-caps`, and as shipped — and decide whether a specimen's frame is held to the rules it demonstrates. A frame that breaks them teaches the break.
- **blocks:** nothing.

## Needs a person — cannot close from inside the toolchain

Not a ratification queue. These do not resolve by deciding; they resolve by
someone doing something an agent should not do unprompted. Listed separately so
they stop reading as actionable to the next session that opens this file.

*(the Chromatic review item closed 2026-08-28 — the account is retired and no baselines were ever accepted; see the Open queue)*

---

## Recently ratified

Moved out of this file on ratification; listed here for one cycle so the code side can see what landed.

- **2026-09-14 (v2026.09.14 – .11)** — **the first pass after the `designer` agent was retired.**
  Dark `--text-secondary` → 60%: the withdrawn 4.28:1 was right, the 5.96 was the token band
  (**voyager's `secondary-text` utility is a literal, so neither scheme's 60% reaches a pixel
  yet**). The `ch` ban covers prose. `button-cta.ring` is `color.action-active` (3.49:1 light),
  and `button-fab` and toast actions take it too. `role-label-caps` takes the caption leading:
  a chrome label may wrap. `card-empty` splits into `card-empty` (material; content that did
  not arrive) and `card-placeholder` (dashed; a slot awaiting input). `a-count-row-is-reach`:
  ask count rows follow the ask's level and state. `materials.dark-glass-takes-the-canvas-hue`
  for every dark tier. The rail cut-out is recorded, not ruled. Plus conformance: nine oxblood
  passages in the spec's prose, `in oklab` on the aurora token, and stale entry points.

- **2026-09-03 (v2026.09.03.4)** — **the forms batch, five entries.** `components.selection-is-ink`
  (selection is ink plus a non-colour channel; **no material tier reaches 1.15:1** against its own
  track in either scheme, and under inversion a raised plate paints *darker* than its trough);
  `components.segmented-control` created, with sentence-case labels — at chrome caps the word EMAIL
  rendered twice in one column meaning two different things, and **that render is the argument**;
  `radii.full-is-for-unlabelled`; `components.input-label` corrected to compose the role rather than
  restate it, made mandatory on identity fields, with the placeholder rule; `button-cta` gains
  **the action colour governs form submits**. Two more recorded rather than decided, both already
  right and only unwritten: `components.card.material-outranks-the-register` and `a11y.focusRing`.
