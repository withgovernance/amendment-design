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

### `progress-ribbon.below-sm` says the markers fit at 390; the specimen says they collide
- **kind:** spec ahead
- **found:** `design-reviewer` on `preview/progress-ribbon.html`, 2026-10-11, after v2026.10.11.3.
- **evidence:** at 390 no marker wraps. "Engrossed" sets 61px over a 58px segment and pushes Enrolled and Enacted 3px off their segments; "Introduced" fills its slot with 1px of ink gap to its neighbour. The entry's "two of them on two lines" came from a render with wrapping allowed; the specimen's flex items keep `min-width: auto`, so they cannot wrap.
- **proposes:** render the row with `min-width: 0` and wrapping, and with a wider gap, at 390 in both schemes, and let the container decide. If neither holds, the no-narrow-form ruling is reopened.
- **blocks:** voyager deleting its `sm:hidden` branch — hold until this is measured.

### Scheme panes under a dark page
- **kind:** unowned default
- **found:** `design-reviewer`, 2026-10-11.
- **evidence:** `segmented`, `forms`, `form-fields` and `cards` show a "Light" and a "Dark" pane side by side. Under page-level `data-theme="dark"` the Light pane inherits dark ink: white "Email" on its light plate measures 1.30:1. The stylesheet has no element-level light scope apart from `[data-paper]`.
- **proposes:** either add an element-level light scope (a `.light` mirror of `.dark`) so a pane holds its scheme, or declare pane specimens rendered in the light page only. One sentence under Governance → Specimens.
- **blocks:** nothing.

### May one label carry two roles?
- **kind:** spec silent
- **found:** `design-reviewer`, 2026-10-11.
- **evidence:** pane labels such as `role-label-caps` "Canvas hue" followed by `role-caption` "same opacity" (`preview/forms.html`, `preview/form-fields.html`). Legible and on one line, but `chrome-sites-are-closed` says nothing about a caps divider carrying a sentence-case qualifier.
- **proposes:** allow it as the divider plus a caption, or move the qualifier into the pane's caption.
- **blocks:** nothing.

### The printed name under a signature line has no role
- **kind:** spec silent
- **found:** `design-reviewer` on `preview/type-citizen.html`, 2026-10-11.
- **evidence:** `registers.issued.signature` makes the printed name mandatory and names no role. The specimen set it in hand-built chrome caps, which `chrome-sites-are-closed` leaves no home for; it now uses `role-metadata` as a placeholder.
- **proposes:** name the role in `signature` — `role-metadata` (the letter's serif voice) or `role-designation` (a referent name, caps) — and render both on paper at 390.
- **blocks:** nothing.

### Progress-ribbon fills have no tokens
- **kind:** spec ahead
- **found:** `design-reviewer`, 2026-10-11.
- **evidence:** `components.progress-ribbon` names its fills in Tailwind slate steps; `colors_and_type.css` carries no token for them, so the specimen paints literal hex and rgb, and so does every consumer.
- **proposes:** name ribbon fill tokens (completed, active, track, light and dark) in the spec, and implement them in the stylesheet.
- **blocks:** nothing.

## Needs a person — cannot close from inside the toolchain

Not a ratification queue. These do not resolve by deciding; they resolve by
someone doing something an agent should not do unprompted. Listed separately so
they stop reading as actionable to the next session that opens this file.

*(the Chromatic review item closed 2026-08-28 — the account is retired and no baselines were ever accepted; see the Open queue)*

---

## Recently ratified

Moved out of this file on ratification; listed here for one cycle so the code side can see what landed.

- **2026-10-11 (v2026.10.11.3)** — **a card is a surface**: each ask card keeps its Co-sign
  plate, the hero's form submit keeps its own, and a repeated act takes `button-secondary`. Ask
  titles inside cards are `role-ui-heading`. Every material tier takes one ring,
  `--border-subtle`, and a material's edge is not held to 3:1. Empty cards are a
  `role-ui-heading` title over a `role-body` message. **The progress ribbon has no narrow form —
  voyager deletes its `sm:hidden` branch** — and takes its light fills on paper in both schemes;
  its date is `role-metadata`, roman. Specimen frames are held to the role layer and to
  `measure.body`.

- **2026-10-11 (v2026.10.11.2)** — legislator notification at the public-count threshold is
  planned, so the 3A/3B/3C artboards are spec ahead
  (`surfaces.commons.known-divergence-legislator-notification`). No shipped caption names the
  notification until it ships.

- **2026-10-11 (v2026.10.11)** — `--text-nav-active` carries the active nav ink, and the sidebar
  takes it too. `tabbar.labelFit` measures `role-body`. The progress-ribbon's active segment no
  longer pulses: **voyager drops `animate-pulse`**. Statute line numbers count source lines. A
  specimen may print a render-time value only if it is measured, never derived.
  `material-chrome`'s line moves to the edge facing content, its consumers are the tab bar and
  `AskSignDock`, and its spec fields now carry the stylesheet's values. **Chrome caps have two
  sites, closed: the section divider and the status stamp** — breadcrumbs, progress-ribbon
  milestones, column heads, count chips and the `Sources:` prefix go to sentence case, which
  voyager sweeps.
