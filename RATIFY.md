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

*(empty)*

## Needs a person — cannot close from inside the toolchain

Not a ratification queue. These do not resolve by deciding; they resolve by
someone doing something an agent should not do unprompted. Listed separately so
they stop reading as actionable to the next session that opens this file.

*(the Chromatic review item closed 2026-08-28 — the account is retired and no baselines were ever accepted; see the Open queue)*

---

## Recently ratified

Moved out of this file on ratification; listed here for one cycle so the code side can see what landed.

- **2026-10-12 (v2026.10.12.2)** — **form labels are `role-caption`**, sentence case, above the
  field: voyager's `input-label` utility recomposes on it. The ribbon's dark ladder mirrors the
  light one, so dark `--ribbon-completed` takes `--text-nav-active`'s value, and ribbon segments
  are not held to 3:1. The ribbon's narrow caption is the active step in `role-caption` over its
  date in `role-metadata`, stacked. `card-placeholder` takes the card-empty pair.

- **2026-10-12 (v2026.10.12)** — **the progress ribbon's narrow form returns, switched on its own
  width**: below 20rem of ribbon, one caption for the active step replaces the five markers.
  **Voyager swaps `sm:hidden` for that container query**, not deletes it. The bill page header
  sets the ribbon on the aurora; the light-fills-on-paper rule now applies only where a ribbon
  sits on paper. The fills are tokens, `--ribbon-completed`, `--ribbon-active` and
  `--ribbon-track`, and **voyager paints them in place of slate steps**. The printed name under
  a signature rule is `role-metadata`. A caps divider may carry a `role-caption` qualifier.
  Specimens that show both schemes in panes render in the light page only.

- **2026-10-11 (v2026.10.11.3)** — **a card is a surface**: each ask card keeps its Co-sign
  plate, the hero's form submit keeps its own, and a repeated act takes `button-secondary`. Ask
  titles inside cards are `role-ui-heading`. Every material tier takes one ring,
  `--border-subtle`, and a material's edge is not held to 3:1. Empty cards are a
  `role-ui-heading` title over a `role-body` message. The progress ribbon's date is
  `role-metadata`, roman. Specimen frames are held to the role layer and to
  `measure.body`.
