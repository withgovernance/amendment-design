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

### Is a green TINT plate a "plate" for the purposes of the fill rule?
- **kind:** spec silent
- **found:** the 2026-08-28.2 ratification pass, while measuring grounds. `AskSummaryCard.tsx:113` ships a pill with `bg-action/10` behind `text-success dark:text-action`. It is not pressable. Under `fill-rule` claim 1, "a filled green plate is a control" — but the rule says nothing about alpha, and a 10% tint plainly does not read like the CTA. This chip survived the stage 2 green audit, so somebody already made this call implicitly; nothing records it.
- **evidence:** the CONTRAST half is settled and is now in `color.action.fill-rule-ink-ground` — the chip measures 4.52:1 on the neutral-100 page ground, and a green tint plate carrying green ink caps at 10%. The AFFORDANCE half has no measurement at all, which is the whole problem: "does it read as a control" has been argued from prose only.
- **proposes:** nothing yet — deciding this from a description is how the accents inventory ended up with nine sanctioned-sounding things nobody had built.
- **blocks:** nothing shipping. It blocks the next green audit from being repeatable: without a threshold, every reviewer re-derives where tint stops being fill, and the answer drifts with whoever is reviewing.
- **waiting on:** a render — the chip at 0% / 10% / 20% / 40% tint, beside a real `role-action` button, both schemes, at 390 and 1440. The alpha where the chip starts attracting a click is the rule. Cheap to produce and nobody has produced it.

---

## Recently ratified

Moved out of this file on ratification; listed here for one cycle so the code side can see what landed.

- **2026-08-28 (v2026.08.28.2)** — the ENACTED example rewritten to carry the
  which-green switch instead of reading absolutely (the absolutist reading ships
  a 3.56:1 dark label; the code was already correct). **The finding generalised:
  an example placed after a rule outranks it in practice**, because the example
  is what a hurried reader reads. The same class was then swept — four more
  sites still taught flat "action green for enacted" (accent `colors:` field,
  Archive register prose, accents inventory, `README.md`), which under the
  ratified rule is the spec instructing a 2.64:1 failure. Two resolved oxblood
  Known Divergences **deleted, not softened** — production migrated. New
  `color.action.fill-rule-ink-ground`: measure ink against the ground it lands
  on, never white (success is 4.99:1 on the page ground, 4.32:1 one plate step
  down), and **green tint plates carrying green ink cap at 10%** (4.52:1; 15%
  fails). Version scheme given a same-day serial, dated UTC.
- **2026-08-28** — the stage 2 queue, emptied. `fill-rule-which-green` (the
  fill rule was missing a sentence, not contradicting itself: fill-vs-ink is
  global; *which* green is ink is a contrast fact — `success` light, `action`
  inverted, action-as-text forbidden at 2.62:1; "where a crowd is counted"
  scopes the Momentum accent, not the semantic success family). Its corollary,
  `fill-rule-corollary`: **a rule that lives only inside a profile or a
  register is invisible to the general case** — claim 2 was already fully
  specified inside the email profile, and stage 2 re-derived it by measurement
  and landed on the identical pair. `color.neutral` re-pointed at the framework
  after Tailwind v4 moved zinc to oklch. Consumer token **extraction**
  sanctioned in place of the direct import that cannot work, with a mandatory
  CI regenerate-and-diff guard. The 12px-floor-versus-corner-badge question
  withdrawn — the spec already answered it ("if a label no longer fits at 12px,
  the layout is the problem"); queueing it was the error, not the rule.
  `DESIGN-HARD-RULES.md` restored after the repo-split prune deleted it.
- **2026-08-27** — `role-display-minor` (1.125rem, weight 700); `emphasis-serif-inline` (serif italic ≥1.125rem, roman 600 below); `widthDiscipline-measured` (chrome is wider than caption — a small label in a fixed narrow plate can't be chrome unless the plate widens); breadcrumb `weightHierarchy` (ancestors 400, current 600); `material-chrome` light resolved to 55%, dead 75% deleted; `darkMetrics-invariant` (light-clean implies dark-clean); the retired weight ladder purged from seven sites in the spec.
