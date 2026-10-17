# Amendment Design System — repository instructions

This repo is the **canonical Amendment design system** (`withgovernance/amendment-design`, public). It ships rules, tokens, fonts, assets, and specimens. It does **not** ship components: `resistbot/voyager` owns implementation. There is deliberately no `role-action` — a button is fill + ink + radius + padding + elevation + three states, a component, not a type role.

**Org split:** the design system is in `withgovernance`, its main consumer in `resistbot`. Anything a consumer's CI fetches from here needs access to this org; a laptop that has both checked out hides the gap.

## Precedence

1. **`DESIGN.md`** is the spec and wins over everything, including this file.
2. **`DESIGN-HARD-RULES.md`** is the short lookable checklist. Read it before any visual change.
3. **`SKILL.md`** / **`README.md`** are entry points — the most read and least rendered files here, so the first to go stale.
4. **`CHANGELOG.md`** carries the rationale. Read it before re-litigating a rule; most "obvious improvements" were already tried.

`spec-version` in `DESIGN.md`'s header names the spec; every version has a tag of the same name. A consumer's generated token file stamps the version it was built from, and that tag answers "which spec did this build against."

## The spec is deliberately ahead of production

A divergence is not automatically a spec bug, and "production ships X" is not by itself an argument for changing the spec. When recording one, name its kind:

- **Spec ahead** — production hasn't caught up. Record a Known Divergence; don't let the spec drift back to match code.
- **Production ahead** — the shipped artifact met a real constraint the spec didn't know. Update the spec.
- **Unowned default** — neither chose it; a framework did. Needs a decision, not a reconciliation. **The value that reaches a rendered surface is the value the system means.**

## How a change happens

**Conformance** (the spec is clear and code disagrees) → fix the code. No ratification.

**Ratification** (the spec is silent, or supports two readings) → a person decides (Jason). An agent will cheerfully ratify both readings.

Implementation proposes, spec ratifies, implementation conforms. Ship a change with a `## For ratification` block — proposed spec edits, divergences found, open questions — not the verify chain.

**When a spec sentence supports two opposite readings, it is a missing measurement.** Render both readings and let the container decide; a clip, an overflow or a contrast number settles it cheaper than prose.

## One writer

**`DESIGN.md` and `CHANGELOG.md` have exactly one writer: a session in this repo running `/ratify`**, one at a time, with `git status` clean before the pass. Everything else — any other session here, a session in voyager — **appends to `RATIFY.md`** and does not touch the spec. Concurrent edits to one file lose writes silently.

**Empty `RATIFY.md` at the end of each migration stage or around five entries.** Longer means code builds on undecided rules. After a pass, tell the code session the version moved so it re-reads the rules instead of citing what is in its context.

In scope for any session here: implementing `colors_and_type.css` to match the spec, building `preview/` specimens, running the checks. That is conformance; a needed rule change is a `RATIFY.md` entry. A specimen follows `SKILL.md`'s workflow and is rendered in both schemes at 390 and 1440 before it is called done.

**Review is a second pass by someone who didn't build it.** After a builder's own `/design-iterate`, spawn the read-only `design-reviewer` agent: it renders the stories or specimens itself in both schemes at 390 and 1440 and splits findings into conformance fixes (back to the builder) and `RATIFY.md` entries. A stage is done when the hard rules pass against real renders in both schemes, every visual component has a story covering its canonical states, divergences are recorded with their kind, and that review is complete.

**A mention is not a ratification.** A decision asked for by @mention still lands as its own commit with a changelog entry and a `spec-version` bump. Ask for the render before deciding — the asker frames the question.

## Entry points state the current rule

`README.md`, `SKILL.md` and `DESIGN-HARD-RULES.md` state rules as they are now, in role and token names, each pointing at its `DESIGN.md` key. **A retirement is a deletion, not a note** — no dates, no "replaced", no measurements of retired things, no restated values. Rationale lives in `CHANGELOG.md`. A dated "X was retired" in an entry point reads downstream as guidance about X.

## Hard rules (the ones most often broken)

Full list in `DESIGN-HARD-RULES.md`.

- **Green fill rule** — a filled green plate is a control (*press me*); green ink is a report (*this happened*). Green appears where a crowd is counted or on the primary act. Conversation views are green-free. Meters and ribbons are exempt.
- **The CTA carries an INK label, not white**, on a flat fill ringed in `color.action-active`.
- **No red except semantic danger** (`--color-danger`). No violet/pink/magenta accents. No amber except warning.
- **12px type floor**, no chrome exception. Headings never ALL CAPS — uppercase has four homes: `role-label-caps`, `role-designation`, `role-ceremonial`, `role-calendar-month`.
- **Targets ≥44px, CTA 48px** — by `min-height` or an expanded hit area, never padding.
- **No transform transitions, no `scale()`, no `brightness()`** on hover. Motion lives on exactly two surfaces: Receipt bloom, Commons accrual. Streaming is not motion.
- **Text may sit on the aurora; coloured ink may not.** The band is bounded so `--text-secondary` clears 4.5:1 everywhere; coloured ink needs an opaque ground.
- **Serif italic is quoted human voice ≥1.125rem.** Below that, roman 600 (`emphasis-serif-inline`).
- **`ch` is banned from length tokens and from spec prose.** Intent as a counted line, value in rem.
- Icons are **Phosphor**, never Lucide.

## Cite the token, never the number

Prose that quotes a weight, hex, or size is an uncontrolled copy of a token. It ages silently and survives edits a token name would not, because a specific number looks deliberate.

<!-- retired-ok: the permanent grep set -->
The retired weight ladder — `160 227 295 362 430 497 565 632` — is a permanent grep set. So are `Merriweather`, `Readex`, `HEXP`, `Oxblood`, `#7f1d1d`. `node tools/check-retired.mjs` enforces it.

## Dark mode has no independent type metrics

Every dark-scoped rule in the stylesheet that touches a type metric is lighter-or-equal, so **light-clean implies dark-clean for clipping and overflow** — provable over the whole stylesheet rather than sampled over stories. Don't introduce a dark-only size, weight, tracking or family without knowing you are giving this up.

## Checks (the mechanical half of ratification)

1. **Retired-value grep** — `node tools/check-retired.mjs`. Exits 1 on a hit. An exemption comment (see `tools/README.md`) marks a line in this file, the stylesheet or a specimen that names a retired value on purpose; entry points carry none.
2. **Role parity** — every `role-*` in `colors_and_type.css` has a `DESIGN.md` entry or an explicit exemption, and vice versa. *No runner yet.*
3. **Literal-vs-token lint** — prose quoting a value where a token name exists. *No runner yet.*
4. **Specimen coverage** — every role and sanctioned accent appears in at least one specimen. *No runner yet.*
5. **Consumer extraction is current** — `node tools/build-tokens.mjs --target <consumer> --check` exits 1 on drift. The consumer's CI must run it and fail on a diff; **voyager's CI does not yet** — spec ahead. A stamped `spec-version` on a stale copy is worse than no stamp.

## Traps

1. **The entry point is the stalest file**, because it is the most read and least rendered. When a decision lands in `DESIGN.md`, delete what it retires from the entry points in the same pass. An entry point is a specimen too.
2. **A rule the spec names but no stylesheet implements is a literal waiting to happen.** The role layer is the enforcement surface.
3. **Nothing that isn't rendered stays true.** If a rule has no specimen, assume it is violated somewhere.
4. **A brief or doc that restates values is a copy of the system.** Briefs name roles.
5. **Read production before rewriting a rule** — as evidence, not authority.
6. **A ruling recorded is not a ruling applied.** When the spec says a value "should be corrected", check that the file carrying the value was changed.

## Consumers

- **`resistbot/voyager`** — the product. It reads this repo through a machine-local, gitignored `design/` symlink and commits a generated `app/design-tokens.css`, written by `node tools/build-tokens.mjs --target ~/git/voyager` and stamped with the `spec-version` it was built from. Extraction, not import: `colors_and_type.css` is a standalone drop-in that loads its own fonts and ships `role-*`/`material-*` as plain classes, which the consumer implements as framework utilities. Roles are not in the generated file; a role change is a hand edit in the consumer.
- **wireframer** (low-fi, Paper) — upstream. Its briefs (`~/agents/wireframer/`) name roles from this repo, never values. If a brief specifies a hex, weight or size, distrust it and read the role from the system.

Stack: wireframer (low-fi) → high-fidelity design → voyager (code). Handoff is forward; only structural discoveries return upstream.

## Not here on purpose

There is no `ui_kits/`: it was spec-derived and superseded, and it lured an agent into porting from it. Its record is in git history.
