# Amendment Design System — repository instructions

This repo is the **canonical Amendment design system**, living at `withgovernance/amendment-design`. It ships rules, tokens, fonts, assets, and specimens. It does **not** ship components: `resistbot/voyager` owns implementation, and `role-action` was deliberately refused for that reason (a button is fill + ink + radius + padding + elevation + three states — a component, not a type role).

**Note the org split:** the design system is in `withgovernance`, its main consumer is in `resistbot`. Local development sees both; CI does not by default. A consumer's build needs a credential with read access to this org, or installs will fail only in CI while working perfectly on a laptop.

## Precedence — memorize this

1. **`DESIGN.md`** is the spec and wins over everything, including this file.
2. **`DESIGN-HARD-RULES.md`** is the short lookable checklist. Read it before any visual change.
3. **`SKILL.md`** / **`README.md`** are entry points — convenient, and historically the *stalest files here* (see Traps).
4. **`CHANGELOG.md`** carries the rationale. Read it before re-litigating a rule; most "obvious improvements" were already tried and recorded.

Consumers pin a tag. `v2026.08.27` was the split. The pin is the answer to "which spec did this build against."

## The spec is deliberately ahead of production

A divergence is not automatically a spec bug, and "production ships X" is not by itself an argument for changing the spec. When recording one, say which kind it is:

- **Spec ahead** — production hasn't caught up. Record as a Known Divergence; do NOT let the spec drift back to match code.
- **Production ahead** — the shipped artifact met a real constraint the spec didn't know about (the Receipt's three export ratios; a word that clipped). Update the spec.
- **Unowned default** — neither chose it; a framework did (`material-chrome`'s 75%, the email brand navy). Needs a decision, not a reconciliation. **The value that reaches a rendered surface is the value the system means.**

## How a change happens

**Conformance** (the spec is clear and code disagrees) → fix the code, no ratification needed.

**Ratification** (the spec is silent, or supports two readings) → a person decides. Every ratification to date was this kind: is a minor heading quieter or smaller; is a stat caption chrome or caption; does a blockquote keep its italic. An agent will cheerfully ratify both readings.

The mechanism that works: implementation proposes, spec ratifies, implementation conforms. Ship the change with a `## For ratification` block — proposed spec edits, divergences found, open questions. Not the verify chain, not conversion tables. Then the ratified spec edit and the code that conforms to it should land **in the same commit** wherever possible.

**When a spec sentence supports two opposite readings, that is not ambiguous prose — it is a missing measurement.** Render both readings and let the container decide. This is how the stat-caption question was settled: "Endorsements" at chrome width is 150px of unbreakable word in a 144px plate. The clip was the argument.

## One writer

**`DESIGN.md` and `CHANGELOG.md` have exactly one writer: the `designer` agent.** Everything else — a session in this repo, a session in voyager — **appends to `RATIFY.md`** and does not touch the spec. Concurrent edits to one file lose writes silently; there is no merge conflict when two open sessions both hold the same file.

Work that IS in scope for a session in this repo: implementing `colors_and_type.css` to match the spec, building `preview/` specimens, running the greps and checks. All of that is **conformance** — the spec decided, this makes it real. If it needs a rule changed, that is a `RATIFY.md` entry like any other.

**A mention is not a ratification.** If another agent @mentions for a decision, the decision still lands as its own commit with a changelog entry and a `spec-version` bump. And ask for the render before deciding — the asker frames the question and usually gets the answer they were leaning toward.

## Hard rules (the enforceable set)

Full list in `DESIGN-HARD-RULES.md`. The ones most often broken:

- **Green fill rule** — a filled green plate is a control (*press me*); green ink is a report (*this happened*). Green appears where a crowd is counted or on the primary act. Conversation views are green-free. Meters/ribbons exempt.
- **The CTA carries an INK label, not white.** The fill's lightness was chosen *for* the ink. Flat, never a gradient.
- **No red except semantic danger** (red-600). No violet/pink/magenta accents. No amber except warning. Oxblood is retired.
- **12px type floor**, no chrome exception. Headings never ALL CAPS — uppercase is chrome only (12px, `wdth` 125, 0.12em).
- **Targets ≥44px, CTA 48px** — by `min-height` or an expanded hit area, never padding. Appearance and target are two geometries.
- **No transform transitions, no `scale()`, no `brightness()`.** Hover = one background step + one shadow tier. Motion lives on exactly two surfaces: Receipt bloom, Commons accrual. Streaming is not motion.
- **Never bare text inside the aurora band.** Placement protects contrast, not hue.
- **Serif italic is quoted human voice ≥1.125rem.** Below that, roman 600 (`emphasis-serif-inline`). A caveat is roman; a voice is italic.
- **`ch` is banned from length tokens.** Intent as a counted line, value in rem.
- Icons are **Phosphor**, never Lucide.

## Cite the token, never the number

Prose that quotes a weight, hex, or size is an uncontrolled copy of a token. It ages silently and **survives edits the token name would not — because a specific number looks deliberate.** Nobody re-derives `497`; it reads as a measurement someone took. It re-entered this spec twice, once in a block written the same week the recalibration was ratified.

The retired weight ladder — `160 227 295 362 430 497 565 632` — is a permanent grep set. So are `Merriweather`, `Readex`, `HEXP`, `Oxblood`, `#7f1d1d`.

## Dark mode has no independent type metrics

Established 2026-08-27, and it is a property worth protecting: after the parallel dark weight scale was retired, exactly three dark-scoped rules in the stylesheet touch a type metric, and all three are lighter-or-equal. **Therefore light-clean implies dark-clean for clipping and overflow** — provable over the whole stylesheet rather than sampled over stories. Do not reintroduce a dark-only size, weight, tracking, or family without knowing you are giving this up.

## CI (the mechanical half of ratification)

1. **Retired-value grep** — the ladder and the retired families/colours, outside `history/` and marked deprecation aliases.
2. **Role parity** — every `role-*` in `colors_and_type.css` has a `DESIGN.md` entry or an explicit exemption, and vice versa.
3. **Literal-vs-token lint** — prose quoting a value where a token name exists.
4. **Entry-point freshness** — `SKILL.md` and `README.md` greppable for every value retired in recent changelog entries.
5. **Specimen coverage** — every role and sanctioned accent appears in at least one specimen.
6. **Consumer extraction is current** — any consumer that generates a token file regenerates it in CI and fails on a diff. See Consumers. A stamped `spec-version` on a stale copy is worse than no stamp.

Three of these six caught real problems on their first manual run.

## Traps

1. **The entry point is the stalest file here, precisely because it is the most read and least rendered.** `SKILL.md` taught Merriweather, oxblood, wax seals, and "pull from `ui_kits/`" for 24 days after each was retired — so every consuming agent inherited August 1st and looked like it was ignoring the design system. It wasn't; it was obeying. **When a decision lands in `DESIGN.md`, grep the entry points for the value it retires in the same pass. An entry point is a specimen too.**
2. **A rule the spec names but no stylesheet implements is a literal waiting to happen.** `role-*` was referenced from the beginning and existed nowhere in CSS, so every call site improvised. The role layer *is* the enforcement surface.
3. **Nothing that isn't rendered stays true.** Unshown specimens went wrong; unrendered prose went wrong. If a rule has no specimen, assume it is violated somewhere.
4. **A brief or a doc that restates values is a copy of the system.** Briefs name roles. wireframer's handoff shipped `Oxblood #7f1d1d` with hover and pressed values three weeks after retirement, specific enough to be believed.
5. **Read production before rewriting a rule** — but don't mistake it for authority. It is the live truth about what is being built, which is evidence, not permission.

## Consumers

- **`resistbot/voyager`** — the product. Pins a tag and **extracts** the token layer: `pnpm design:tokens` writes `app/design-tokens.css` from `colors_and_type.css`, stamped with the `spec-version` it was generated from, and `globals.css` imports that. Consumer notes in `consumers/voyager/`.

  **This used to read "imports `colors_and_type.css` rather than restating values." That is not executable, and stage 2 proved it three ways** (`RATIFY.md`, 2026-08-28): Turbopack refuses a CSS import that leaves the project root — a panic, not a warning; the checkout is gitignored in the consumer, so it is absent on CI and on Vercel and any build input there fails every deploy; and this file is a standalone drop-in that pulls two font families from the Google CDN the consumer self-hosts and ships `role-*` and `material-*` as plain classes the consumer implements as framework utilities, so importing it whole double-loads three families and gives every type role a second definition at higher specificity.

  **Extraction is therefore sanctioned, and it comes with one obligation: the consumer's CI regenerates and fails on any diff.** A generated file is a second copy; without the guard it drifts, and it drifts while stamping a `spec-version` that is by then a lie. The stamp is the reason the guard is mandatory rather than nice.
- **wireframer** (low-fi, Paper) — upstream. Produces high-fidelity briefs that must name roles from this repo, never values.

Stack: wireframer (low-fi) → high-fidelity design → voyager (code). Handoff is forward; only structural discoveries return upstream.

## Not here on purpose

`ui_kits/` was archived and did not move: spec-derived, superseded on four values, and it lured an agent into porting from it. Its record is in git history and `history/`.
