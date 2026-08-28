---
name: amendment-design
description: Use this skill to generate well-branded interfaces and assets for Amendment, a legislative-intelligence product, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and the hard rules that fail review.
user-invocable: true
---

# Amendment — Living Document

Amendment's design system encodes a thesis: the rule of law is a living document.

- **Ink layer** (permanent): Newsreader serif headings (`opsz` axis — display 60/800, text 16/450, never one stop for both), Archivo variable sans (`wdth` 62–125: body **104**, chrome **125** + 0.12em uppercase; true italic), IBM Plex Mono for machine identifiers. Midnight Indigo (slate-700/800/900) is the user's trail; **Momentum green `oklch(.66 .148 160)` is action AND the crowd, one colour, ink label**.
- **Aurora layer** (alive): a low-chroma Blue Hour radial gradient in oklch behind every surface. **Desktop chrome takes no material and sits directly on it** (2026-08-28); cards are the glass. Limits, load-bearing: chroma ≤ 0.22, ≤ 5 lobes, and **the band is bounded so `--text-secondary` clears 4.5:1 at every point, both schemes** — text on the band is safe by construction, not by placement. **Blend by removing the plate, never by lowering ink.** **Coloured ink is the exception** and still needs an OPAQUE ground: measured, every material lands 2.6–3.0:1 in the band and thicker is worse, because translucency passes the gradient through and `blur(50px)` averages neighbouring bright lobes *in* (`--canvas` 6.10:1 vs glass 2.87:1).
- **There is no red in this system except semantic danger.** Oxblood is retired. Merriweather is retired. Readex and its `HEXP` axis are retired — **the `--hexp-*` aliases were deleted 2026-08-28 and a reference now fails loudly**, deliberately: a retired axis that still resolves is invisible, and CSS ignores an unknown variation axis rather than erroring, so it renders as nothing while reading as a decision. The seal is a colourless blind emboss, not wax.

## Workflow (do these, in order)

1. **Link [`colors_and_type.css`](./colors_and_type.css)** in `<head>`. Everything you need is a token or role class there: `.role-display-hero`, `.role-body`, `.role-lede`, `.role-quote`, `.material-regular`, `.shadow-raised`, `.paper-cream`, `.seal-emboss`, `--color-action`, `--font-serif`, `--aurora`. The `amendment-app` container paints the aurora. **Do not restate values by hand — a literal is how every drift in this system's history started.**
2. **Pick the REGISTER, not the room.** Five rooms are narrative; four registers carry the tokens:

   | Register | Rooms | Canvas | Material | Column | Motion |
   |---|---|---|---|---|---|
   | **Live** | Reading Room · Commons | `--canvas-live` + aurora | `material-thin` | 48rem | accrual only, under real collective action |
   | **Reading** | Archive | `paper-cream` | `material-regular` | `measure.body` 28rem | none |
   | **Writing** | Writing Desk | `paper-parchment` | `material-regular` | 28rem portrait | minimal |
   | **Issued** | Receipt | `paper-cream` | paper | 34rem portrait | one-shot bloom at issuance, then static |

   Glass is for chrome, cards, modals. Paper is for prolonged reading or writing. Streaming (text arriving, a skeleton resolving) is not motion and is permitted anywhere.
3. **Copy assets from [`assets/`](./assets/)** — never regenerate logos, the wordmark, or seals from text descriptions.
4. **Tactile accents:** exactly three are sanctioned — **rubber-stamp status, guilloche** (must be drawn procedurally at its rendered width, never scaled), **progress ribbon**. The other nine (postmark, jurisdiction seal, ruled page, line numbers, the seal-as-shipped, signature line, folder-tab step, lapel-pin, envelope) are *proposed* and not sanctioned to build from description. Paper grain is retired.
5. **Two canvases, and they are not interchangeable:** `--canvas` is the OPAQUE ground that coloured ink is measured against (warm zinc); `--canvas-live` is the Blue Hour base under the aurora (cool slate). **Never measure ink against `--canvas-live`** — the aurora moves it, so contrast there is a function of *position*, not of the token. A contrast number without a position is not a measurement.
6. **Specimens live in [`preview/`](./preview/)**; production truth lives in `resistbot/voyager` via [`github.md`](./github.md)'s screen map. (The `ui_kits/web/` archive this step used to warn about did not survive the 2026-08-27 repo split — the warning outlived the directory, which is the same staleness this file is prone to.)
7. For anything this file doesn't settle, [`DESIGN.md`](./DESIGN.md) is the source of truth and wins over this file and the README. **Check its `spec-version` header before citing it** — this file is the one most likely to be stale, because it is the most read and the least rendered. [`README.md`](./README.md) is the readable summary.

## The hard rules (will fail review if violated)

- **Green, and this is three rules that get conflated — see `color.action` before arguing with any of them:**
  1. **Fill vs ink is global.** A filled green plate is a control (*press me*); green ink is a report (*this happened*). A green plate that cannot be pressed is a violation.
  2. **WHICH green is ink is a contrast fact.** `--color-action` is a PLATE colour; as text it is 2.62:1 and **forbidden**. Green ink is `--color-success` on light, switching to `--color-action` under inversion. This is one instance of `color.ink-switch-is-palette-wide` — every family behaves this way, and **no token in the palette clears 4.5:1 in both schemes**.
  3. **"Where a crowd is counted" scopes the Momentum *accent***, not the semantic success family, which keeps its conventional meanings (enacted, completed, verified) everywhere. A dialogue counts no crowd, so conversation views stay green-free. Meters/ribbons exempt (quantity, not affordance).
  **A tint is not a plate** at any alpha — status is ink on neutral material, a coloured plate belongs to a control, and green tint carrying green ink caps at 10%.
- **No red except semantic danger** (`--color-danger`, red-700 — moved from red-600 on 2026-08-28, which measured 4.39:1 as ink on the opaque ground; "dead" status). No violet/pink/magenta *accents* — button, badge, chip, stamp, type. No amber except warning.
- Headings **never** ALL CAPS. Uppercase has **two** homes and no others: `role-label-caps` (chrome, 12px, `--track-chrome`) and `role-ceremonial` (display size, `--track-ceremonial`, once per page). **Designation or sentence?** A bill identifier is a designation and is ceremonial; "Browse bills by state" is a sentence and is a heading — serif, mixed case.
- **Take the role; never rebuild a register.** Chrome and ceremonial share `wdth` 125 and are separated by *tracking and size*, so a width preset plus `uppercase` plus a tracking literal is a different register that compiles, renders, and looks approximately right. `tracking-wide` is 0.025em where `--track-chrome` is 0.12em. **A role is the only form in which a register is checkable.**
- **12px type floor**, no chrome exception. A specimen may go below only as a stated scale model.
- **Touch targets ≥ 44px, CTA (Send/Co-sign) 48px — by `min-height` or an expanded transparent hit area, never padding.** Appearance and target are two geometries. **Except a link inside a sentence**, which takes no minimum: both WCAG target-size criteria carve out inline targets, and at `role-body`'s 24px line box a 44px target overhangs 10px into the lines above and below and catches their taps. A link with its own line box does take the floor.
- No `scale()`, no `filter: brightness()`, no transitions on `transform` — **except a control drawing a state the user just committed** (a toggle thumb crossing its track, a caret turning). That is feedback, not motion. Hover = one background step + one shadow tier; hover never moves anything.
- **`ch` is banned from length tokens.** State intent as a counted line, value in rem (`measure.body` = min(28rem, 100% − 2rem) = 69 chars serif).
- Serif **italic is quoted human voice only**, ≥ 1.125rem. Metadata is serif roman. `<em>` in sans copy uses Archivo's real italic.
- **Script face renders only the user's own affirmed name, second person, on their own artifact.** Never other people's names, never decoration. No name → serif "A constituent".
- The **emboss needs paper beneath it** and never renders below 44px. It cannot print or survive email — **the ledger number is the proof**, always present as text.
- Motion on exactly two **product surfaces**: Receipt **BLOOM** (once, at issuance) and Commons **ACCRUAL** (real aggregate state). They never swap or leak. Chrome is still. **Three things are outside the budget, not exceptions to it:** committed-state feedback (above); the **aurora, which is a layer, not a surface** — it breathes, per the thesis; and **marketing, which is outside the register table** — its motion must be pausable, viewport-gated, motion-safe, and never on a surface carrying record state.
- Glass collapses to solid zinc under `prefers-reduced-transparency` (email lives permanently in this mode — no webfonts there: Georgia / Segoe stack / Verdana chrome ≥ 12px). Honor `prefers-reduced-motion` and `-contrast`.
- Icons are **Phosphor** (never Lucide). No 🇺🇸, eagles, or partisan iconography. No stock photography, no photographic paper textures, no drop-shadow faux-3D.
- No "🎉 You did it!" register, ever. The Receipt is issued, not cheered.

## If invoked without guidance

Ask: which register · throwaway or production · light/dark/both · what's the content. Then output HTML artifacts with `colors_and_type.css` linked, or production-grade JSX (Phosphor via `@phosphor-icons/react/ssr`).
