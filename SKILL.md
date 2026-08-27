---
name: amendment-design
description: Use this skill to generate well-branded interfaces and assets for Amendment, a legislative-intelligence product, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and the hard rules that fail review.
user-invocable: true
---

# Amendment — Living Document

Amendment's design system encodes a thesis: the rule of law is a living document.

- **Ink layer** (permanent): Newsreader serif headings (`opsz` axis — display 60/800, text 16/450, never one stop for both), Archivo variable sans (`wdth` 62–125: body **104**, chrome **125** + 0.12em uppercase; true italic), IBM Plex Mono for machine identifiers. Midnight Indigo (slate-700/800/900) is the user's trail; **Momentum green `oklch(.66 .148 160)` is action AND the crowd, one colour, ink label**.
- **Aurora layer** (alive): a low-chroma Blue Hour radial gradient in oklch behind every surface. Glass sits on it. Limits: chroma ≤ 0.22, ≤ 5 lobes, **never bare text inside the band**.
- **There is no red in this system except semantic danger.** Oxblood is retired. Merriweather is retired. The seal is a colourless blind emboss, not wax.

## Workflow (do these, in order)

1. **Link [`colors_and_type.css`](./colors_and_type.css)** in `<head>`. Everything you need is a token or role class there: `.role-display-hero`, `.role-body`, `.role-lede`, `.role-quote`, `.material-regular`, `.shadow-raised`, `.paper-cream`, `.seal-emboss`, `--color-action`, `--font-serif`, `--aurora`. The `amendment-app` container paints the aurora. **Do not restate values by hand — a literal is how every drift in this system's history started.**
2. **Pick the REGISTER, not the room.** Five rooms are narrative; four registers carry the tokens:

   | Register | Rooms | Canvas | Material | Column | Motion |
   |---|---|---|---|---|---|
   | **Live** | Reading Room · Commons | none (aurora) | `material-thin` | 48rem | accrual only, under real collective action |
   | **Reading** | Archive | `paper-cream` | `material-regular` | `measure.body` 28rem | none |
   | **Writing** | Writing Desk | `paper-parchment` | `material-regular` | 28rem portrait | minimal |
   | **Issued** | Receipt | `paper-cream` | paper | 34rem portrait | one-shot bloom at issuance, then static |

   Glass is for chrome, cards, modals. Paper is for prolonged reading or writing. Streaming (text arriving, a skeleton resolving) is not motion and is permitted anywhere.
3. **Copy assets from [`assets/`](./assets/)** — never regenerate logos, the wordmark, or seals from text descriptions.
4. **Tactile accents:** exactly three are sanctioned — **rubber-stamp status, guilloche** (must be drawn procedurally at its rendered width, never scaled), **progress ribbon**. The other nine (postmark, jurisdiction seal, ruled page, line numbers, the seal-as-shipped, signature line, folder-tab step, lapel-pin, envelope) are *proposed* and not sanctioned to build from description. Paper grain is retired.
5. **`ui_kits/web/` is an ARCHIVE** — spec-derived, superseded on four values. Do not pull components from it. Specimens live in [`preview/`](./preview/); production truth lives in `resistbot/voyager` via [`github.md`](./github.md)'s screen map.
6. For anything this file doesn't settle, [`DESIGN.md`](./DESIGN.md) is the source of truth and wins over this file and the README. [`README.md`](./README.md) is the readable summary.

## The hard rules (will fail review if violated)

- **Green:** a filled green plate is a control (*press me*); green ink is a report (*this happened*). Green appears **where a crowd is counted** or on the primary act — a dialogue counts no crowd, so conversation views stay green-free. Meters/ribbons exempt (quantity, not affordance).
- **No red except semantic danger** (red-600, "dead" status). No violet/pink/magenta *accents* — button, badge, chip, stamp, type. No amber except warning.
- Headings **never** ALL CAPS. ALL CAPS belongs to chrome (`--sans-chrome` wdth 125 + `--track-chrome`) alone.
- **12px type floor**, no chrome exception. A specimen may go below only as a stated scale model.
- **Touch targets ≥ 44px, CTA (Send/Co-sign) 48px — by `min-height` or an expanded transparent hit area, never padding.** Appearance and target are two geometries.
- No `scale()`, no `filter: brightness()`, no transitions on `transform`. Hover = one background step + one shadow tier; hover never moves anything.
- **`ch` is banned from length tokens.** State intent as a counted line, value in rem (`measure.body` = min(28rem, 100% − 2rem) = 69 chars serif).
- Serif **italic is quoted human voice only**, ≥ 1.125rem. Metadata is serif roman. `<em>` in sans copy uses Archivo's real italic.
- **Script face renders only the user's own affirmed name, second person, on their own artifact.** Never other people's names, never decoration. No name → serif "A constituent".
- The **emboss needs paper beneath it** and never renders below 44px. It cannot print or survive email — **the ledger number is the proof**, always present as text.
- Motion on exactly two surfaces: Receipt **BLOOM** (once, at issuance) and Commons **ACCRUAL** (real aggregate state). They never swap or leak. Chrome is still.
- Glass collapses to solid zinc under `prefers-reduced-transparency` (email lives permanently in this mode — no webfonts there: Georgia / Segoe stack / Verdana chrome ≥ 12px). Honor `prefers-reduced-motion` and `-contrast`.
- Icons are **Phosphor** (never Lucide). No 🇺🇸, eagles, or partisan iconography. No stock photography, no photographic paper textures, no drop-shadow faux-3D.
- No "🎉 You did it!" register, ever. The Receipt is issued, not cheered.

## If invoked without guidance

Ask: which register · throwaway or production · light/dark/both · what's the content. Then output HTML artifacts with `colors_and_type.css` linked, or production-grade JSX (Phosphor via `@phosphor-icons/react/ssr`).
