# Amendment — Claude Code instructions

This is your operational guide for working in the Amendment codebase. Read this first, every session. Reference the rest of `design-system/` on demand.

> **Thesis: a living document.** Two layers. *Ink* (Merriweather, Midnight Indigo, Oxblood) holds. *Aurora* (a low-chroma Blue Hour gradient in oklch) breathes beneath frosted glass. Ink beneath, living breath above.

---

## 🚨 Read this first — patterns I repeatedly get wrong

Mined from ~15 sessions of design corrections. Almost every correction reduces to **two meta-patterns**. Internalize these before doing any visual work.

### Meta-pattern 1 — "Light mode looks fine, dark mode is broken"

This correction has shown up in 8+ separate sessions. The fix is a workflow change, not a token change.

**Rule:** A UI change is NOT complete until both modes have been viewed via the screenshot/design-iterate loop. Dark mode is not a follow-up; it is half the deliverable.

Two specific traps inside this:

- **Shadow-only hover is invisible in dark mode.** The shadow tokens use `rgb(15 23 42)` (slate-900) ink. Dark-on-dark vanishes against the aurora. **Fix:** elevate the *material level* on hover (`material-thin hover:material-regular`) so bg + ring + shadow all shift, not just shadow. Plain `hover:shadow-floating` alone is a bug.
- **Dark-mode elevation gets inverted.** In dark mode, the element *closer to the viewer should be lighter* (more white overlay), not darker. Stacking opaque slates makes the foreground darkest — the opposite of what depth requires. **Fix:** use the material tiers; their dark-mode values already encode the correct elevation direction.

### Meta-pattern 2 — "Opaque boxes instead of the glass-on-aurora system"

The app is glass on aurora. Hand-rolled `bg-white dark:bg-slate-800`, named grays, and raw hex produce "paper boxes" that look foreign in the system.

**Rules:**

- **Cards and panels** → `material-thin / -regular / -thick` utilities. They bring their own ring + glass + dark-mode handling. Drop the manual border/bg.
- **Text color** → opacity tokens only: `text-black/87 dark:text-white/87` (primary), `/55` (secondary), `/38` (tertiary). **Never** `text-slate-*`, `text-gray-*`, `text-zinc-*` for body or chrome text.
- **Emphasis** comes from *material weight* (thin→regular→thick), not from a hard border or a darker slate fill.
- **No raw hex, ever.** If a value isn't in `tokens/tokens.json` or a Tailwind utility, it doesn't belong in source.

When in doubt: "does this card use the material system, or did I hand-roll `bg-white dark:bg-slate-800`?" If the latter, rewrite it.

### Other recurring corrections

In frequency order:

3. **Run the screenshot loop, read it critically.** Don't claim "done" off a glance. "Looks great" without describing the actual diff means the loop was skipped. Use the design-iterate skill.

4. **Visual-only PRs stay visual.** When the task is cosmetic, touch only `className` / markup / styling. If a visual fix *seems* to need data or logic changes, **stop and ask** — don't bundle them in. Backend, in-session logic, data-fetch changes are out of scope for design sessions.

5. **Reuse existing components — don't fork.** Before building a card / chip / header / badge, grep for it. The party chip, `OfficialBubble`, the oversight headers, the `Button` primitive — all exist. Forked visual treatments drift; the system stops being a system.

6. **No decorative ornament without meaning.** When told to remove an ornament, remove it *completely* and re-screenshot to confirm. Watermarks and seals belong on the `paper-cream` canvas, **never** on aurora chrome. A floating stamp in empty space is a bug.

7. **Pills imply interactivity.** A `rounded-full` pill containing a spelled-out word (full party name, full status label) reads as a filter button — the user expects to click it. **Spelled-out** → plain secondary text. **The pill/chip metaphor is only for compact abbreviations** like the D/R/I caucus badge.

8. **HEXP is for UPPERCASE chrome labels only.** Don't apply `hexp-chrome` / `[font-variation-settings:'HEXP'_60]` to mixed-case body text or headings. It stretches letterforms and breaks legibility. Body stays at wdth 100 (Archivo's natural default). wdth 125 + uppercase + 0.05em tracking is one cluster; don't split it.

9. **Spacing: let it breathe.** Don't run controls flush to card edges. Optical centering matters. "Floaty and untethered" usually means a missing anchor (border, divider, alignment); "sloppy" usually means inconsistent margin/padding.

10. **Semantic colors mean what they mean.** A passed bill is `emerald-700`. Not `slate` (procedural), not `red-600` (dead). Status drives color, not aesthetics. Don't tint a passed-bill chip blue because the page already has too much green.

11. **No manual font sizing.** Never `text-[11px]` / `text-[15px]` / etc. Named Tailwind scale only. `text-xs` (12px) is the floor.

12. **Hover vocabulary is bg + shadow.** Never `hover:scale-*`, never `hover:brightness-*`, never `transition-transform`. *Reason: sub-pixel icon wobble + compositing-layer jank.*

---

## ✅ Pre-flight checklist before claiming "done"

Run every item. If any answer is no, the work isn't done.

1. Screenshotted **desktop AND mobile, light AND dark**? (not optional)
2. Surfaces use **material utilities + opacity tokens** — zero raw hex, named grays, or opaque `bg-white` / `bg-slate-*`?
3. **Dark-mode elevation correct** (closer = lighter) and **hover visible in dark** (material level shifts, not shadow alone)?
4. **Reused** the existing component instead of forking?
5. Every decorative element is **load-bearing**? Removed everything that isn't?
6. Stayed **strictly in visual scope** — no logic / backend / data changes snuck in?
7. **Named font scale** only — no `text-[Npx]`, nothing below `text-xs`?
8. Read the screenshot **critically** and described the real diff — not just "looks great"?

---

## Stack & conventions

- **Next.js + Tailwind CSS.** No CSS-in-JS, no styled-components.
- **Tailwind config** mirrors `design-system/tokens/tokens.json` — read tokens from there, not from prose.
- **Icons:** Phosphor Icons via `@phosphor-icons/react/ssr`. Never Lucide (sub-pixel bleed on dense glyphs).
- **Variable fonts:** Archivo (sans + HEXP), Merriweather (serif), IBM Plex Mono.
- **Dark mode:** `dark:` Tailwind variants. Tokens swap automatically via CSS custom properties — do not manually pick a "dark-mode weight."
- **File organization:**
  - `app/(data)/oversight/…` — Archive surfaces (bill pages, jurisdiction landings)
  - `app/(data)/conversation/…` — Reading Room surfaces (chat)
  - `app/(action)/…` — Writing Desk surfaces (letter composer, call scripts)
  - `app/(action)/receipt/…` — Receipt surfaces (issued certificates)
  - `components/ui/*` — primitives (Button, Input, Toggle, Card, etc.) reused across surfaces
  - `components/civic/*` — tactile accents (RubberStamp, Postmark, WaxSeal, Guilloche, ProgressRibbon, LapelPin)
  - `components/[surface]/*` — surface-specific components (e.g. `components/archive/RubberStamp.tsx`)

---

## The forbidden list

Things that will fail review. Consolidated here so you can consult one place.

### Color
- ❌ Violet, pink, magenta, fuchsia. Removed deliberately.
- ❌ Amber as brand accent. Amber = warning only.
- ❌ Named-gray text colors (`text-gray-700`, `text-zinc-600`). Use `text-black/87 · /55 · /38` and the dark inverse.
- ❌ Synthwave, neon, off-palette gradients — anywhere, including celebration.
- ❌ Green "Follow" buttons. Oxblood does action work.

### Type
- ❌ Headings in ALL CAPS. Caps belong to chrome-width chrome only.
- ❌ `hexp-chrome` / `[font-variation-settings:'HEXP'_60]` on mixed-case body or headings. wdth 125 is for UPPERCASE chrome labels with 0.05em tracking — nowhere else.
- ❌ Arbitrary off-step font sizes (`text-[9px]`, `text-[10px]`, `text-[11px]`, `text-[15px]`). `text-xs` (12px) is the floor.
- ❌ Script / handwriting fonts as system type. Users may upload a signature image; the system does not simulate one.
- ❌ Slab-serif condensed campaign-poster display type for bill titles.
- ❌ `text-slate-*` / `text-gray-*` / `text-zinc-*` for body or chrome text. Use opacity tokens (`text-black/87 dark:text-white/87` etc).
- ❌ Raw hex (`#1e293b`) in source. Use Tailwind tokens or `tokens/tokens.json` references.

### Motion
- ❌ `scale()` or `filter: brightness()` on hover. *Reason: sub-pixel icon wobble + compositing-layer jank.*
- ❌ `transition-all` on interactive elements. Enumerate `background, box-shadow, color, opacity, ring` explicitly.
- ❌ Transitions on `transform`. Same reason.
- ❌ Bounce / overshoot / spring physics on the Receipt celebration. The receipt is *issued*, not delivered by a confetti cannon.
- ❌ Sound effects.
- ❌ Borrowing the Receipt's celebration mechanics (aurora bloom, seal drop, ledger count-up) on any non-Receipt surface.

### Iconography
- ❌ Lucide. Use Phosphor.
- ❌ American flag accents, eagles, partisan symbology. Civic is not partisan.
- ❌ Bare Phosphor names — use the `Icon` suffix (Phosphor v2.1+): `MagnifyingGlassIcon`, not `MagnifyingGlass`.
- ❌ Decorative icons next to text labels that already name the thing ("Conversations" doesn't need a chat bubble).

### Surface & material
- ❌ Solid paint fills on cards. If a surface needs to be opaque, use a paper canvas (`paper-cream`, `paper-parchment`).
- ❌ Hand-rolled `bg-white dark:bg-slate-800` (or any opaque slate/zinc surface) instead of `material-thin/-regular/-thick`. The materials bring their own glass + ring + dark-mode handling.
- ❌ Cards with a left-border colored accent. Status goes on a dot/badge/stamp, not on the card body.
- ❌ Drop-shadow faux-3D, gradient bevels, inner glows, emboss-to-fake-depth. iOS-6 skeuomorphism is a museum piece.
- ❌ Photographic paper textures. Grain is procedural monochromatic noise ≤2%.
- ❌ Photographic banknote engraving for guilloche. Procedural SVG sine waves only.
- ❌ Shadows authored outside the four tiers (`whisper / raised / floating / chrome`). Statistical marks (map tiles, status pills, sparklines) get no shadow at all.
- ❌ Shadows tinted by content category. Shadow ink is sourced from slate-900 — one color across the system.
- ❌ `hover:shadow-floating` (or any shadow-only hover) without a material-level shift. **Dark mode breaks** — use `material-thin hover:material-regular` so bg+ring+shadow all change.
- ❌ Dark-mode elevation that gets darker as elements come forward. Closer = lighter (more white overlay), always.
- ❌ Broadening the aurora's hue range. Three Blue Hour stops only. A fourth lobe breaks the contrast invariant.
- ❌ `rounded-full` pills containing spelled-out words. Pills imply interactivity — spelled-out text in a pill reads as a filter button. Use the abbr-badge pattern only.

### Architectural
- ❌ Guilloche line-work outside the Receipt surface.
- ❌ Paper canvas outside Archive bill text or Writing Desk composition.
- ❌ Tactile accents without a communicative purpose. Ornament without meaning is forbidden.
- ❌ Floating stamps / watermarks / seals on aurora chrome. They belong on `paper-cream`, behind a title block, not floating in empty space.
- ❌ Forking an existing component (party chip, `OfficialBubble`, oversight header, button) instead of reusing it. Single source of truth per component.
- ❌ Bundling backend / data / logic changes into a visual PR. Visual sessions touch className / markup / styling only.
- ❌ Decorative timelines, horizontal rules, or floating ornaments that don't carry meaning. Default to restraint; remove when in doubt.

---

## Required behaviors

### Accessibility (hard line, no exceptions)
- `prefers-reduced-transparency: reduce` → glass collapses to solid zinc-50/100 (light) or zinc-800/900 (dark). Backdrop-filter removed. Layout unchanged.
- `prefers-contrast: more` → secondary text opacity rises from 55% → 75%. Materials solidify.
- `prefers-reduced-motion: reduce` → animations/transitions clamp to 0.01ms.
- Focus is **always slate**, 2px, with 4px offset (8px for inline links, 2px inset for inputs). Suppress only on mouse-only via `:focus:not(:focus-visible)`.
- Interactive targets ≥ 44 × 44 px.

### Text-color discipline
Text color is **opacity on black or white**, three rungs (Apple HIG):

```tsx
className="text-black/87 dark:text-white/87"    // primary
className="text-black/55 dark:text-white/55"    // secondary
className="text-black/38 dark:text-white/38"    // tertiary
```

This works *only* because the Blue Hour aurora is monochromatic and low-chroma. Do not broaden the aurora; do not use named grays for text.

### Hover state
One step background brighten + one tier shadow bump. That's the entire vocabulary. No transform, no brightness filter.

**Dark-mode critical:** shadow-only hover is invisible in dark mode (slate-900 ink on slate-900 background). Hover that needs to be visible in both modes must shift the *material level*, not just the shadow:

```tsx
// ✅ Visible in both modes
className="material-thin hover:material-regular hover:shadow-raised"

// ❌ Invisible in dark mode
className="material-thin hover:shadow-floating"
```

### Press state
`active:opacity-80` on the track. Never thumb-scale.

---

## The HEXP register (Archivo)

Three escalations. **wdth 125 is load-bearing.** 80 and 100 are rare and reserved.

| Register | When | Where |
|---|---|---|
| **wdth 100** | Default body | Everywhere text is read in flow |
| **wdth 125** | Institutional chrome (uppercase + 0.05em tracking) | Navbar, breadcrumbs, form labels, table heads, status stamps, count chips, jurisdiction badges, "Sources:" prefixes, progress-ribbon labels |
| **wdth 120** | Display register, rare | Hero stat numerals only |
| **wdth 125 ceremonial** | Ceremonial, ≤ 1 per page | Receipt place-of-issue caption, wax-seal monogram |

If you find yourself reaching for wdth 120 outside a hero stat callout, stop — it's wdth 125 you want.

Tailwind utility:
```tsx
<span className="font-sans uppercase tracking-wider text-xs font-semibold [font-variation-settings:'HEXP'_60]">…</span>
```

---

## The four surfaces

Every screen belongs to one of four rooms. They share palette, type, materials — they differ in lead family, default material, motion posture, and tactile accents.

| Surface | Status | Lead | Default material | Canvas | Motion |
|---|---|---|---|---|---|
| **Reading Room** | built | sans / serif (AI prose) | `material-thin` | none (aurora) | generous (streaming) |
| **Archive** | partial | serif | `material-regular` | `paper-cream` for verbatim text | static |
| **Writing Desk** | aspirational | serif | `material-regular` | `paper-parchment` | minimal |
| **Receipt** | aspirational | serif | `paper-cream` | `paper-cream` | arrival (once, ≤400ms) |

Full surface model, mental model per room, and per-room tactile accent inventory: [`design-system/DESIGN.md`](./design-system/DESIGN.md). Mark new work clearly when extending an aspirational surface.

---

## The icon test (when does an icon earn its pixels?)

Icons are **signal, not decoration**. An icon earns its place only when it:

1. **Replaces text** (icon-only close, search, chevron toggle, hamburger)
2. **Disambiguates text** (thumbs-up/down for For/Against, D/R caucus badges, status dots)
3. **Signals state** (checkmark, warning triangle, spinner, live ping)
4. **Aids wayfinding at a glance** (primary sidebar nav — a small, stable set)
5. **Is content, not chrome** (emoji on conversation cards, brand mark, jurisdiction seal)

It becomes noise when it sits next to a text label that already names the thing, repeats on every item in a homogeneous list, or decorates a button that has a descriptive verb (`Save` doesn't need an icon; `Track` may).

### Phosphor weight register
- `weight="regular"` — default outline, ink
- `weight="fill"` — active states (selected tab, current sidebar item, selected `CardSelect`)
- `weight="light"` — `EmptyState` 48px hero glyph only
- `weight="bold"` — tiny inline icons at 12–14px (button leading-icon at `size={16}`)

---

## The mono test (IBM Plex Mono)

Mono is for **machine identifiers in body prose**:
- ✅ Statutory citations inline (`§ 791.02(1)`, `42 U.S.C. § 1983`)
- ✅ Line numbers in a left gutter
- ✅ Copy-pasteable strings (Clerk user IDs, env-var names)
- ✅ `<code>` spans inside markdown
- ✅ *Conventional exceptions:* animating numeric counters, count-badge chips next to headings (`font-mono tabular-nums`)

Mono is **not** for referent names that take their type from the host context:
- ❌ Bill numbers in a serif heading → serif
- ❌ Jurisdiction abbreviations in a chrome badge → chrome-width
- ❌ Anything that's a *signpost* you're *navigating by* → chrome-width, not mono

The test: *literal verbatim string a user reads or copies* = mono. *Signpost label* = chrome-width.

---

## Tactile accents (the skeuomorphic vocabulary)

Civic artifacts only, communicative purpose. Vector-constructed with slight imperfection, never photographic. Textures ≤ 4% noise. Floating stamps on aurora chrome are forbidden — they belong on `paper-cream`.

Inventory: RubberStamp · Postmark · WaxSeal · Guilloche (Receipt only) · ProgressRibbon · LapelPin · JurisdictionWatermark · RuledPage · LineNumbers · SignatureLine · FolderTabSteps · EnvelopePreview · PaperGrain.

Full geometry, colors, and per-accent rules: [`design-system/components/civic.md`](./design-system/components/civic.md).

---

## On-demand reference

- **Tokens** (colors, type, spacing, radii, shadows, motion): `design-system/tokens/tokens.json`
- **Tailwind wiring**: `design-system/tokens/tailwind.config.example.js`
- **Global CSS** (aurora, focus, materials, reduced-* media queries): `design-system/tokens/globals.example.css`
- **Thesis + surfaces** (the why): `design-system/DESIGN.md`
- **Dark mode** (#1 correction — read every session): `design-system/dark-mode.md`
- **Pre-merge checklist**: `design-system/CHECKLIST.md`
- **Component recipes** by layer:
  - Atomic — `design-system/components/primitives.md` · `chrome.md` · `civic.md`
  - Surface composition — `design-system/components/reading-room.md` · `archive.md` · `writing-desk.md` · `receipt.md`
- **End-to-end composition walkthroughs**: `design-system/examples/` (home, conversation, bill-page, letter-flow)
- **Topic patterns** (load only what you need): `design-system/patterns/`
  - `tables.md` · `data-viz.md` · `forms.md` · `prose.md` (AI markdown) · `mobile.md`
  - `feedback.md` (toasts/tooltips/skeletons) · `search.md` · `keyboard.md` · `imagery.md` · `print.md`
- **Heritage + open items** (Votizen, Designing Obama, what was cut, current TBDs): `design-system/HISTORY.md`

---

## When you're unsure

The escalation order:
1. **Token files first.** Color/spacing/type decisions → `tokens/tokens.json`. Don't paraphrase from prose.
2. **The thesis.** If you're picking between two plausible directions, ask: *does this hold ink beneath aurora above? Does it read as ink on archival paper, or consumer SaaS?*
3. **The four surfaces.** Which room is this? Pull defaults from the row above; full composition recipe in `components/[room].md`.
4. **Component recipes.** Atomic component? → `components/primitives.md` / `chrome.md` / `civic.md`. Assembling a screen? → `examples/[screen].md`.
5. **Topic patterns.** Data viz → `patterns/data-viz.md`. Tables → `patterns/tables.md`. Forms → `patterns/forms.md`. AI markdown → `patterns/prose.md`. Toasts/tooltips → `patterns/feedback.md`. Etc.
6. **Dark-mode rules** for any visible-state work → `dark-mode.md`.
7. **Before merging**: walk through `CHECKLIST.md`.
8. **History only when proposing to restore a feature that was removed.** "Why don't we have a green Follow button?" → `HISTORY.md`.

---

## Caveats currently in the system

Full list (with the iterations that were tried and pulled): `design-system/HISTORY.md`.

- **Jurisdiction seal form pending.** Placeholder vector watermark at 5–8% opacity until canonical form ships.
- **Receipt surface aspirational** beyond the single letter-sent flow.
- **Writing Desk** has many accents specified but not all implemented.
