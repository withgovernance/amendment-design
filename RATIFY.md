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

## Needs a person — cannot close from inside the toolchain

Not a ratification queue. These do not resolve by deciding; they resolve by
someone doing something an agent should not do unprompted. Listed separately so
they stop reading as actionable to the next session that opens this file.

*(the Chromatic review item closed 2026-08-28 — the account is retired and no baselines were ever accepted; see the Open queue)*

---

## Recently ratified

Moved out of this file on ratification; listed here for one cycle so the code side can see what landed.

- **2026-10-17 (v2026.10.17.13)** — delivery map hexes and the threshold meter climb the ribbon
  ladder and turn `--color-momentum-soft` only when delivered or at threshold
  (`color.action.progress-is-slate-done-is-green`).

- **2026-10-17 (v2026.10.17.12)** — the wordmark set as type is `role-label-caps`' size and
  `--track-chrome` at every site; drop the sidebar and StaticTitle size override.

- **2026-10-17 (v2026.10.17.11)** — marketing and sales surfaces sit outside the register table,
  palette included; the fill rule still binds them (`registers.marketing-is-outside-the-table`).

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
