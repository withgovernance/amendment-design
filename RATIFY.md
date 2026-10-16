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

### Threshold meter fill: flat emerald or a ramp toward it
- **kind:** two readings
- **found:** wireframer, Paper "Amendment UX/Wireframes" › Delivery, board 1 (ask sign card, Stage 1 district goal) — the meter that counts a district toward 25 co-signers. The Commons accents name a "district threshold meter — an accruing bar that warms toward emerald as a district nears critical mass" but no token or component entry.
- **evidence:** board 1 state B, and the same meter on boards 2–4, render the fill as `--color-momentum-soft` on a `--ribbon-track` track. The other reading, a fill that starts at `--ribbon-completed` and moves toward emerald as the count nears the threshold, has not been rendered.
- **proposes:** a `threshold-meter` component entry naming track and fill tokens and saying whether the fill is flat or ramps. Also say whether a meter fill counts as a green "plate" under `color.action.fill-rule` (it reports, it is not pressable).
- **blocks:** the Stage 1 delivery module on /asks/[askId] and the receipt dialog line

### Fill colour for a filled map region
- **kind:** spec silent
- **found:** wireframer, Delivery board 2 — the "Where this was delivered" card fills delivered congressional districts in a map built from `lib/maps/region-shapes`. No rule covers a filled data region.
- **evidence:** board 2 uses `--ribbon-completed` for delivered, `--color-zinc-200` for the rest, and a dashed `--text-primary` outline for the viewer's district. Green was avoided because a large green area reads as a control under the fill rule. Dark scheme not yet rendered.
- **proposes:** a rule for map region fills (done / not yet / you), by token, in both schemes, and whether the Momentum accent may fill a region where a crowd is counted.
- **blocks:** the delivery map on /asks/[askId]

### Fill colour for delivery map hexes (replaces “Fill colour for a filled map region”)
- **kind:** spec silent
- **found:** wireframer, Delivery board 2 — the delivery map moved from real district shapes to a hex tilegram: `HexStateMap`'s one-hex-per-state grid, then one hex per district inside a state. The earlier entry's shape question no longer applies; the fill question does. `HexStateMap` already fills in-session states with the emerald pair, so green hexes have a shipped precedent, but a delivery hex reports a count, not live status.
- **evidence:** board 2 renders delivered as `--ribbon-completed`, not yet as `--color-zinc-200`, and the viewer's district or state as a dashed `--text-primary` ring outside the hex. Dark scheme not yet rendered.
- **proposes:** one rule for status fills on hex tilegrams (done / not yet / you), by token, in both schemes, and whether a delivery map may reuse `HexStateMap`'s emerald. Drop the earlier region-fill entry when this one is decided.
- **blocks:** the delivery map on /asks/[askId]

### Sequential ramp for a hex choropleth
- **kind:** spec silent
- **found:** wireframer, Delivery board 2 — the delivery map carries no text inside hexes; shade encodes an ordered value instead. District: no co-signers yet, under 25, 25+ waiting for a packet, delivered. State: 0, 1, 2–4, 5+ districts delivered. The spec has no slate ramp, only `--ribbon-completed` and `--ribbon-track`.
- **evidence:** board 2 renders four steps: `--color-zinc-200`, then `--ribbon-completed` flattened over white at 35%, 65% and 100%. In light scheme each step is distinguishable from its neighbour at 14px swatch size; dark scheme not yet rendered, and dark `--ribbon-completed` is slate-300, so the ramp would invert.
- **proposes:** a named four-step map ramp (tokens per step, both schemes), stating that ramp steps are not held to text contrast but must separate from each neighbour, and that a ramp is not a green "plate". Decide together with "Fill colour for delivery map hexes".
- **blocks:** the delivery map on /asks/[askId]

### Sibling cards in a row: does the act dock to the card’s foot?
- **kind:** spec silent
- **found:** voyager, home “Popular nationally” (`HomeSections.tsx` grid of `AskSummaryCard`) — cards stretch to the row’s height, but the count and the Co-sign plate follow the content. So a title one line shorter lifts that card’s count and plate above its siblings’.
- **evidence:** Jason’s screenshot at 1440, three columns: the middle card’s count and plate sit one title-line higher than the other two cards’.
- **proposes:** a card rule under `components.card`: when cards share a row, the card is a column and its **foot** (the report that counts the crowd plus the act, here `AskMomentum` and the Co-sign plate) docks to the bottom, so counts and plates line up across the row. The content above takes the slack. A single-column feed (390) does not change. For counts to line up, every card in the row gives its count one line of report beneath it: a recruit card shows its link line (“Your link · 12 co-signed · 48 opened”) and a discover card shows its momentum line (“38 this week”). Rendered in Paper as “Amendment · Ask cards — organizing states”.
- **blocks:** nothing; voyager can dock now as conformance once this is ratified.

### Form labels in `role-caption` read as footnotes
- **kind:** production ahead
- **found:** voyager PR 934, `DestinationForm` / Create and `Input` / Field states at 1440. The labels follow v2026.10.12.2 to the letter.
- **evidence:** PR 934 before/after, “Form labels” and “Field states”. The label is now smaller and lighter than the placeholder in the field below it, and “Label · Required” runs together at one size and ink.
- **proposes:** labels at the `role-metadata-sans` size in primary ink at `--sans-medium`, with the “· Required” qualifier in secondary ink. Render that next to the current `role-caption` before deciding.
- **blocks:** PR 934’s form-label commit

### A field’s hint is serif inside a sans form
- **kind:** two readings
- **found:** voyager PR 934, `Input` / Field states. v2026.10.12.3 makes the hint `role-metadata`, which is serif. `typography.apparatus-ink-is-sans` makes everything inside a container sans.
- **evidence:** PR 934 “Field states”: the hint “We use it to find your legislators.” is serif between a sans label and a sans error.
- **proposes:** the hint takes `role-metadata-sans`. Check the ribbon’s date (`below-width`, `status-redundancy`) against the same rule: it is serif `role-metadata` too, and stacked under a sans marker.
- **blocks:** nothing

### The ribbon’s strongest mark is the past, not where the bill is
- **kind:** production ahead
- **found:** voyager PR 934, `BillDetailHeader` / Federal. The dark ladder from v2026.10.12.2 is applied as ratified.
- **evidence:** PR 934 “Progress ribbon”, dark: the completed segment, Prefiled, is near-white and the loudest thing in the header. The active step, Introduced, reads second. The `role-caption` markers in secondary ink are faint in both schemes.
- **proposes:** give the active step the strongest mark (fill and marker), with completed a step below it, in both schemes. Markers take `role-metadata-sans`, and the active one takes primary ink at `--sans-semibold`. Render the current ladder against this one.
- **blocks:** nothing

### A row action repeated down a table
- **kind:** spec silent
- **found:** voyager PR 934, `OrgPositionsList` / Default. One-plate-per-surface moved each row’s Close from a green plate to `button-secondary`.
- **evidence:** PR 934 “One green plate per surface”, light: a column of three white plates, one of them disabled on the Closed row, louder than the page’s own “Post a Position”.
- **proposes:** an action that repeats down a list or table is quiet (ghost, or text with an icon). A row where the action cannot apply shows nothing rather than a disabled control.
- **blocks:** nothing

### The tab bar’s upward shadow reads as a smudge on light
- **kind:** production ahead
- **found:** voyager PR 934, `TabBar` / Default at 390. `elevation.chrome` casts upward from a bottom-anchored bar.
- **evidence:** PR 934 “Tab bar”, light: a grey band above the bar’s top edge, over the content.
- **proposes:** a bottom-anchored bar’s top edge is the `material-chrome` hairline only, with no cast shadow in light. Keep the shadow in dark only if a render shows it still separates the bar there.
- **blocks:** nothing

## Needs a person — cannot close from inside the toolchain

Not a ratification queue. These do not resolve by deciding; they resolve by
someone doing something an agent should not do unprompted. Listed separately so
they stop reading as actionable to the next session that opens this file.

*(the Chromatic review item closed 2026-08-28 — the account is retired and no baselines were ever accepted; see the Open queue)*

---

## Recently ratified

Moved out of this file on ratification; listed here for one cycle so the code side can see what landed.

- **2026-10-12 (v2026.10.12.3)** — the ribbon's 20rem switch is a deliberate margin. Field
  states are spec: **invalid** is a 2px ring plus a `role-caption` message in the danger pair,
  **hint** is `role-metadata`, a **textarea** is at least 6rem tall, and the **consent** row is
  one target of at least 44px with a `role-metadata` sentence.

- **2026-10-12 (v2026.10.12.2)** — **form labels are `role-caption`**, sentence case, above the
  field: voyager's `input-label` utility recomposes on it. The ribbon's dark ladder mirrors the
  light one, so dark `--ribbon-completed` takes `--text-nav-active`'s value, and ribbon segments
  are not held to 3:1. The ribbon's narrow caption is the active step in `role-caption` over its
  date in `role-metadata`, stacked. `card-placeholder` takes the card-empty pair.
