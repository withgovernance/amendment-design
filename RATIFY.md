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

### Wordmark size and tracking: chrome or ceremonial
- **kind:** two readings (left open by v2026.10.17.9)
- **found:** PR 934 review. `HomeLink` and `Footer` set the wordmark in `role-label-caps` at the role's size; `Sidebar/index.tsx` and `Navbar/StaticTitle.tsx` add a literal size override "to match the sidebar lockup", so one name ships at two sizes.
- **evidence:** voyager stories `navbar--logged-in` (HomeLink beside StaticTitle at 1440), `sidebar--bare`, `footer--signed-out`, both schemes.
- **proposes:** a wordmark entry naming its role. Render (A) `role-label-caps` size and `--track-chrome` in primary ink everywhere, (B) the sidebar's larger size as a named token, (C) `role-ceremonial`'s tracking at chrome size; navbar, sidebar and footer at 390 and 1440, both schemes.
- **blocks:** removing the literal size in voyager's sidebar and StaticTitle

### Table row height: a floor or a fixed height
- **kind:** two readings
- **found:** PR 934 review. `components/positions/PositionsTable.tsx` declares a row height on `<tr>`, which a table row treats as a minimum; wrapped titles and the "In response to" line grow it.
- **evidence:** at 1440, `RecentPositionsSection` rows measure about 73, 93 and 72px; `OrgPositionsList` about 97, 136 and 72px. The row action no longer changes a row's height, which is what `components.table` targeted.
- **proposes:** say whether "one declared row height" is a floor content may exceed, or fixed with the title clamped. Render (A) the floor, (B) fixed with the title clamped to two lines and the response line to one; 1440 and the `sm` boundary, both schemes.
- **blocks:** nothing

### A jurisdiction code that trails, and initials monograms
- **kind:** two readings
- **found:** PR 934 review. `SampleQuestions.tsx` sets a jurisdiction chip after a question in chrome caps, secondary ink — a third chrome site. `role-designation` is defined as leading a row or card, but `typography.chrome-sites-are-closed` makes a jurisdiction code a designation. `UserAvatar.tsx` and the claim page's "YC" monogram raise the same question for initials.
- **evidence:** `role-designation` is larger than the chip's declared box, so the box must grow. Not yet rendered: no story shows `SampleQuestions`.
- **proposes:** render (A) `role-designation` in the chip with its box re-declared under the caps-box rule, (B) `role-caption`, (C) current chrome caps; measure the chip's fit at 390, both schemes. Then state whether a monogram is a designation.
- **blocks:** nothing

### Does the palette rule bind the claim (sales) page
- **kind:** two readings
- **found:** PR 934 review. `ClaimSections.tsx` uses green eyebrows, green step numerals, a green-bordered "Claimed" box and a monogram on a non-pressable `bg-success` circle. The hard rules exempt marketing from the motion budget only.
- **evidence:** voyager story `claimsections--statewide`, 390 and 1440, both schemes. Green text clears contrast in both schemes; the question is accent scope, not legibility.
- **proposes:** state whether marketing and sales surfaces sit outside `registers.live.palette-rule`. Render the claim page with neutral eyebrows and numerals against the current version.
- **blocks:** the claim-page green fixes

## Needs a person — cannot close from inside the toolchain

Not a ratification queue. These do not resolve by deciding; they resolve by
someone doing something an agent should not do unprompted. Listed separately so
they stop reading as actionable to the next session that opens this file.

*(the Chromatic review item closed 2026-08-28 — the account is retired and no baselines were ever accepted; see the Open queue)*

---

## Recently ratified

Moved out of this file on ratification; listed here for one cycle so the code side can see what landed.

- **2026-10-17 (v2026.10.17.10)** — unread is `--text-primary`: the dot, and the count in a hairline chip
  with no fill (`color.action.unread-is-ink`).

- **2026-10-17 (v2026.10.17.9)** — the wordmark set as type takes primary ink; it is a designation,
  not a third chrome site.

- **2026-10-17 (v2026.10.17.8)** — `--track-chrome` is 0.08em: section dividers, status stamps and
  designations read as words.

- **2026-10-17 (v2026.10.17.7)** — a single-line caps box (the status stamp) sets its line-height
  1px taller than its height and gives the trailing track back from its end padding.

- **2026-10-17 (v2026.10.17.6)** — one product table (`components.table`): no header band,
  sentence-case heads over a hairline, one row height, rows stack on a phone.

- **2026-10-17 (v2026.10.17.5)** — the report line's lead and its count are `--sans-semibold`; the
  rest of the line stays at `role-metadata-sans`'s weight.

- **2026-10-17 (v2026.10.17.4)** — green ink is `--ink-success`, one token: `--color-success` on light,
  a step lighter than the action fill in dark; card glass is a sufficient ground for it.
  `--line-box-metadata-sans` gives the eyebrow its declared height.

- **2026-10-17 (v2026.10.17.3)** — a button's label owns its type: 1rem, `--sans-body`, semibold,
  line-height 1 (`components.button-default.label`); never inherited.

- **2026-10-17 (v2026.10.17.2)** — a card's eyebrow row declares its height (its status text's line
  box) whether or not the status is present, so titles align across a row.

- **2026-10-17 (v2026.10.17.1)** — `role-stat-card`, stat-display's card step, replaces the
  hand-set card count (voyager's `Stat` size md and `AskCosignsTile`).

- **2026-10-17 (v2026.10.17)** — a draft is not a warning: DRAFT takes the same neutral ink as
  CLOSED (`color.semantic.a-draft-is-not-a-warning`).

- **2026-10-16 (v2026.10.16.6)** — a calendar tile's month is `role-calendar-month`: caps at the
  caption size, body width, nearly untracked. `DeadlineTile` moves off `role-label-caps`.

- **2026-10-16 (v2026.10.16.5)** — a recruit card's next goal is a clause on the "Your link" line,
  never its own line; spec ahead, production adds it later.

- **2026-10-16 (v2026.10.16.3–.4)** — a recruit card's part below the foot hairline is a full-bleed
  `--wash-yours` band; a ribbon marker never wraps, and the narrow switch is 38rem.

- **2026-10-16 (v2026.10.16.2)** — a field's error stays `role-caption`; `role-metadata-sans` has
  a `typography.roles` entry and declares line-height 1.4.

- **2026-10-16 (v2026.10.16)** — form labels are the new `role-field-label`; a field's hint and
  consent sentence are `role-metadata-sans`; the ribbon's active segment is the strongest fill
  (tokens swapped), its markers `role-metadata-sans`, and its narrow switch is 25rem; a row action
  is quiet and absent where it can't apply; a bottom-anchored `material-chrome` bar casts no
  shadow; in a row of cards the foot docks and every card carries a report line.

- **2026-10-12 (v2026.10.12.3)** — the ribbon's 20rem switch is a deliberate margin. Field
  states are spec: **invalid** is a 2px ring plus a `role-caption` message in the danger pair,
  **hint** is `role-metadata`, a **textarea** is at least 6rem tall, and the **consent** row is
  one target of at least 44px with a `role-metadata` sentence.

- **2026-10-12 (v2026.10.12.2)** — **form labels are `role-caption`**, sentence case, above the
  field: voyager's `input-label` utility recomposes on it. The ribbon's dark ladder mirrors the
  light one, so dark `--ribbon-completed` takes `--text-nav-active`'s value, and ribbon segments
  are not held to 3:1. The ribbon's narrow caption is the active step in `role-caption` over its
  date in `role-metadata`, stacked. `card-placeholder` takes the card-empty pair.
