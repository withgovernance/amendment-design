# Proposed: refactor of DESIGN.md for Claude Code use

This is a proposed restructuring of your existing `DESIGN.md` (the 1,500-line monolith) into a tiered set of files optimized for Claude Code consumption.

Drop into voyager root. `CLAUDE.md` becomes the auto-loaded entry; the rest is reference loaded on demand.

```
CLAUDE.md                          ← operational entry (auto-loaded)
design-system/
  DESIGN.md                        ← thesis, compressed
  dark-mode.md                     ← #1 correction — promoted to root for prominence
  CHECKLIST.md                     ← pre-merge gate, extracted from components README
  HISTORY.md                       ← Votizen heritage + removed-from-system + open items
  tokens/
    tokens.json                    ← machine-readable design tokens
    tailwind.config.example.js     ← Tailwind wiring
    globals.example.css            ← aurora, focus, materials, reduced-* overrides
  components/
    README.md                      ← slim index
    primitives.md                  ← Button, Input, Toggle, Card, etc. (atomic)
    chrome.md                      ← Navbar, Tabbar, Breadcrumb, Modal (atomic)
    civic.md                       ← tactile accents (atomic)
    reading-room.md                ← Reading Room surface composition
    archive.md                     ← Archive surface composition
    writing-desk.md                ← Writing Desk surface composition (aspirational)
    receipt.md                     ← Receipt surface composition (aspirational)
  examples/
    README.md                      ← index
    home.md                        ← entry page with conversation starter
    conversation.md                ← streamed AI reply with citations
    bill-page.md                   ← Archive bill detail — the most layered composition
    letter-flow.md                 ← Writing Desk → Receipt act
  patterns/
    README.md                      ← index
    tables.md · data-viz.md · forms.md · prose.md · mobile.md
    feedback.md · search.md · keyboard.md · imagery.md · print.md
```

## Key changes from the current DESIGN.md

1. **Single source of truth per concern.** Tokens live in `tokens/tokens.json` (Style Dictionary format) — no more YAML/prose duplication. Rules live in markdown. Heritage prose lives in `HISTORY.md`.

2. **Tailwind-class recipes.** Every component spec gives copy-pasteable Tailwind classes rather than CSS variable references. Matches the actual codebase.

3. **Forbidden list consolidated.** Single section in `CLAUDE.md` instead of don'ts scattered across 6+ sections.

4. **Dark-mode burden removed from contributors.** Auto-calibrated weights, materials, paper canvases, and aurora swap at the CSS layer via `.dark` selector. Contributors stop tracking two parallel scales.

5. **HEXP demoted appropriately.** wdth 125 stays load-bearing; 80 and 100 marked as rare escalations (matches actual usage per your answer).

6. **Surfaces tagged with status.** `[built]` vs `[partial]` vs `[aspirational]` — so Claude Code doesn't pattern-match against unbuilt surfaces.

7. **Implementation paths stripped.** No more `components/oversight/[j]/bill/[b]/RubberStamp.tsx` references that will rot. The component recipe sits in `components.md` instead.

8. **11 missing topics filled in** as discrete files under `patterns/` (plus dark-mode promoted to root):
   - Data visualization (caucus colors, chart chrome, sparklines, state map, Recharts wiring)
   - Tables (bill lists, vote tallies, sticky headers, sortable headers, number columns)
   - Mobile & responsive (breakpoints, tabbar, touch targets)
   - Markdown rules for AI prose (per-element treatment, citations, forbidden elements)
   - Notifications & toasts
   - Tooltips & popovers
   - Skeletons & loading (pulse not shimmer; streaming reveal)
   - Search (`⌘K` palette, inline filter, autocomplete)
   - Keyboard shortcuts (full inventory + surfacing pattern)
   - Headshots & photography (legislator headshot treatment)
   - Dark mode (specific guidance)
   - Print & PDF
   - Forms & validation

9. **Heritage section moved.** Votizen + Designing Obama details now live in `HISTORY.md` so the operational docs don't carry decorative prose.

## Line budget

| File | Lines | Purpose |
|---|---|---|
| CLAUDE.md | ~270 | Operational, auto-loaded |
| DESIGN.md | ~250 | Thesis + surfaces |
| dark-mode.md | ~80 | #1 correction, promoted to root |
| tokens/tokens.json | ~250 | Machine-readable |
| tokens/tailwind.config.example.js | ~100 | Tailwind wiring |
| tokens/globals.example.css | ~180 | Aurora, focus, materials, a11y |
| components/README.md | ~60 | Grep-first + checklist + index |
| components/primitives.md | ~280 | Button, Input, Toggle, Card, etc. |
| components/chrome.md | ~110 | Navbar, Tabbar, Breadcrumb, Modal |
| components/civic.md | ~280 | Tactile accents |
| patterns/*.md × 10 | ~80–150 each | Topic-specific, independently loadable |
| HISTORY.md | ~150 | Heritage + removed-from-system + open items |

Total: ~2,600 lines, but **only ~270 lines auto-load**. The rest is on-demand reference, and each topic file is small enough that a focused task pulls 80–300 lines, not 1,500.

## v4 update — surface compositions + examples + checklist split

**Top-level changes from v3:**

- **Surface composition recipes added** under `components/`: `reading-room.md`, `archive.md`, `writing-desk.md`, `receipt.md`. Each shows how the atoms assemble for that room, with the per-surface defaults, anatomy diagram, key components, and `Don't` list.
- **End-to-end composition walkthroughs added** under `examples/`: `home.md`, `conversation.md`, `bill-page.md`, `letter-flow.md`. Each is a full annotated TSX file showing real assembly, with a *what this demonstrates* section and a *don't* list.
- **Checklist extracted** from `components/README.md` into `CHECKLIST.md` at design-system root. The components README is now a slim index pointing to atoms + surfaces + examples. Load CHECKLIST when reviewing work, not when building.
- **CLAUDE.md escalation order extended** to 8 steps, now references surface composition files, examples, and CHECKLIST in the right places.

## v3 update — split + dedup

**Top-level changes from v2:**

- **`components.md` (620 lines) split into 3 files** mirroring codebase directories: `components/primitives.md`, `components/chrome.md`, `components/civic.md`. A focused task on tactile accents now pulls 280 lines, not 620.
- **`CLAUDE.md` de-duplicated against `DESIGN.md`.** Dropped the "Cardinal rules in one paragraph" (redundant with forbidden list), trimmed tactile accents table to a one-line summary pointing to `civic.md`, trimmed caveats to a pointer to `HISTORY.md`. Now ~270 lines auto-load, down from 330.
- **New `tokens/globals.example.css`** — the system layer (aurora `::before`, focus reset, material utilities, `prefers-reduced-*` overrides, print stylesheet). Drops into `app/globals.css`.
- **New `components/README.md`** — grep-first callout + checklist + surface chrome quick reference. Indexes the three component files.

## v2 update — review notes folded in

I read your `DESIGN_REVIEW_NOTES.md`. The two meta-patterns (*"light mode looks fine, dark mode is broken"* + *"opaque boxes instead of glass-on-aurora"*) now lead `CLAUDE.md` as the very first section after the thesis. The other recurring corrections (run-the-loop, visual-only PRs, reuse-don't-fork, ornament-without-meaning, pills-imply-interactivity, HEXP-uppercase-only, semantic-color-discipline, named-scale-only) are explicit forbidden-list entries.

Specific additions:

- **`CLAUDE.md` § "Read this first"** — top section with the two meta-patterns and 10 ranked recurring corrections. Auto-loaded every session.
- **`CLAUDE.md` § Pre-flight checklist** — 8-item mandatory check before claiming done. Maps 1:1 to the corrections.
- **`CLAUDE.md` § Hover state** — explicit example showing the shadow-only-vs-material-level-shift dark-mode failure mode.
- **`components.md` § "Before building a new component"** — grep-first callout naming `PartyChip`, `OfficialBubble`, oversight headers, `Button`, the tactile-accent set.
- **`patterns/` directory** — each topic is its own file (~80–150 lines). Pulling a single topic doesn't load 700 lines of unrelated guidance.
- **`components/` directory** — three files (primitives, chrome, civic) mirror codebase organization. Each ~110–280 lines.
- **`dark-mode.md` at design-system root** — the #1 correction now has its own prominent file rather than being a section inside `patterns.md`.
- **`tokens/globals.example.css`** — the system layer in one file (aurora `::before`, focus, materials, reduced-* media queries, print). Lets contributors copy-paste rather than re-derive.
- **`components/primitives.md` Button recipes** — Secondary + Ghost variants updated to shift bg on hover (not just shadow), so they stay visible in dark mode.
- **`components/README.md` checklist** — 15 items, mandates dark-mode screenshot, opacity tokens, no spelled-out pills, HEXP-uppercase-only.
- **`patterns/tables.md` bill list rows** — row hover example explicitly shifts material level (no shadow-only hover).

## Open gaps remaining

1. **Caucus color values.** I used `#1e3a8a` for D and `#991b1b` for R in the chart palette. Confirm these match your codebase or override.

2. **Keyboard shortcuts.** I drafted an inventory based on the surfaces. Confirm which are real vs aspirational.

3. **Markdown rules for AI prose.** I defined treatment per element; let me know if your model authors anything I didn't cover (e.g. mermaid diagrams, math, KaTeX, footnote syntax).

4. **Jurisdiction seal form.** Still pending. The placeholder I shipped works; canonical form needs design.

5. **Surfaces marked `[aspirational]` (Writing Desk, Receipt).** Confirm whether they ship in the next milestone or stay aspirational. If they're shipping, `components.md` and `DESIGN.md` need a status flip.

## How to adopt

1. Move the contents of `proposed/` into your voyager repo root.
2. Replace your existing `DESIGN.md` with `proposed/design-system/DESIGN.md`.
3. Add `proposed/CLAUDE.md` as voyager's root `CLAUDE.md`.
4. Wire `tokens/tokens.json` into your Tailwind config (use `tokens/tailwind.config.example.js` as reference).
5. Migrate any "must-correct" patterns from your existing Claude memory into the forbidden list in `CLAUDE.md`.

## Notes on tone

I kept the **thesis** intact (ink/aurora two layers, civic register, four rooms, north star) and rewrote for terseness everywhere else. The poetic passages that were doing actual work stayed; the ones that were repeating themselves got cut.

The voice should still feel like the original — calm, deliberate, opinionated — just compressed.
