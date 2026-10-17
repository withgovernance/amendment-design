---
name: amendment-design
description: Use this skill whenever you build, change or review an interface or asset for Amendment, a legislative-intelligence product — production UI in resistbot/voyager, a prototype or mock, an email or print piece. It gives the workflow, the four registers, the type roles and tokens to compose from, and where the rules that fail review live.
user-invocable: true
---

# Amendment — Living Document

The thesis: the rule of law is a living document. Every screen is two layers.

- **Ink layer (permanent).** Newsreader (`--font-serif`) for headings and the record, at an optical stop (`--serif-display`, `--serif-text`, `--serif-quote`). Archivo (`--font-sans`) for body and chrome through its width presets (`--sans-body`, `--sans-chrome`, `--sans-display`, `--sans-ceremonial`). IBM Plex Mono (`--font-mono`) for literal strings a person reads or copies. Midnight Indigo (`--color-primary*`) is the user's own trail; Momentum green (`--color-action`) is every action and the crowd's assent.
- **Aurora layer (alive).** `--aurora` over `--canvas-live`, painted by `.amendment-app`.

**Precedence:** [`DESIGN.md`](./DESIGN.md) > [`DESIGN-HARD-RULES.md`](./DESIGN-HARD-RULES.md) > this file. Check DESIGN.md's `spec-version` header before citing it. The reason behind any rule is in [`CHANGELOG.md`](./CHANGELOG.md) — read it before re-arguing one.

## Workflow

1. **Read [`DESIGN-HARD-RULES.md`](./DESIGN-HARD-RULES.md)** — the checklist every visual change is judged against. Pull the `DESIGN.md` section that governs your surface (`color`, `typography`, `materials`, `registers`, `components`, `a11y`), not the whole file.
2. **Take tokens from the stylesheet.** Standalone HTML links [`colors_and_type.css`](./colors_and_type.css) and puts `.amendment-app` on the shell. In voyager, take tokens from the generated `app/design-tokens.css` and role utilities from `globals.css`; check any material against `colors_and_type.css`. Never type a value a token owns.
3. **Pick the register, not the room** (table below).
4. **Compose from roles.** `role-display-hero`, `role-display-section`, `role-display-minor`, `role-ui-heading`, `role-body`, `role-body-serif`, `role-body-lead`, `role-lede`, `role-quote`, `role-label-caps`, `role-designation`, `role-ceremonial`, `role-calendar-month`, `role-metadata`, `role-metadata-sans`, `role-field-label`, `role-caption`, `role-code`, `role-stat-display`, `role-stat-card`, `role-signature`. Surfaces: `material-ultrathin|thin|regular|thick|chrome`, `paper-cream`, `paper-parchment`, `shadow-*`, `measure`, `measure-lede`. A role is the whole type decision; never rebuild one from utilities. Copy marks from [`assets/`](./assets/); specimens live in [`preview/`](./preview/).
5. **Render both schemes at 390 and 1440** and judge the render, not the source. Dark is class-based (`.dark` or `:root[data-theme="dark"]`).
6. **State what is unresolved.** Spec clear, code disagrees → fix the code. Spec silent or two readings → render both, append to [`RATIFY.md`](./RATIFY.md) with the evidence. Only a session in this repo running `/ratify` edits `DESIGN.md`.

## The four registers

| Register | Rooms | Ground | Default material | Column | Motion |
|---|---|---|---|---|---|
| **Live** | Reading Room · Commons | `--canvas-live` + `--aurora` | `material-thin` | `container.tight` | accrual only, under real collective action |
| **Reading** | Archive | `paper-cream` | `material-regular` | `measure.body` | none |
| **Writing** | Writing Desk | `paper-parchment` | `material-regular` | `measure.body`, portrait | minimal |
| **Issued** | Receipt | `paper-cream` | paper | 34rem portrait | bloom once at issuance, then static |

A card declares `material-regular` in every register (`components.card.material-outranks-the-register`). Glass is for cards, modals and chrome that can't claim a calm ground; paper is for prolonged reading or writing. Streaming is content arriving, not motion. Marketing and sales surfaces sit outside the table — no register's motion or palette binds them; the fill rule and accent bans still do (`registers.marketing-is-outside-the-table`).

## The rules most often broken

Full list and keys in `DESIGN-HARD-RULES.md`.

- **Green:** a filled green plate is a control (one per surface, the primary act; a card is a surface — `color.action.fill-rule-one-per-surface`); green ink is a report — `--ink-success`, which carries the light/dark switch. Green appears where a crowd is counted; conversation views are green-free.
- **The CTA** is flat `--color-action` with an ink label (`--color-action-label`) and a 1px `--color-action-active` ring. Every action-colour plate takes the ring.
- **Ink** is `--text-primary` / `--text-secondary` / `--text-tertiary`, never a literal alpha; tertiary is decorative only. Coloured ink needs an opaque ground.
- **Serif belongs to the canvas;** inside a container the heading is `role-ui-heading`. Headings are never ALL CAPS — uppercase has four homes: `role-label-caps`, `role-designation`, `role-ceremonial`, `role-calendar-month`.
- **12px floor**, no exception. **Targets ≥44px, CTA 48px**, by `min-height` or a hit area, never padding.
- **Hover** is one background step plus one shadow tier; nothing moves. Motion lives on the Receipt bloom and the Commons accrual only.
- **Empty states:** `card-empty` for content that did not arrive, `card-placeholder` for a slot someone can fill.
- **`ch` is banned** from tokens and prose; widths come from `measure.*` and `container.*`.
- **Icons are Phosphor** (`@phosphor-icons/react/ssr`). No decorative flags or partisan marks, no stock photography, no 🎉 register.

## If invoked without guidance

Ask: which register · throwaway or production · what the content is. Render both schemes regardless. Output HTML with `colors_and_type.css` linked, or production JSX in voyager.
