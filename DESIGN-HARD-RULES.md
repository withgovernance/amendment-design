# Amendment — Hard Rules (the lookable checklist)

Source of truth: `DESIGN.md`. This file is the short list every visual change is checked against — by `/design-iterate` against screenshots, by `/review-pr` against the diff, by the `design-reviewer` agent against story renders. If a rule here contradicts `DESIGN.md`, `DESIGN.md` wins; fix this file in the same pass.

> **A story proves what it rendered, not what it claims to render.** Assert a mocked-module state before anything downstream of it, or the story can pass vacuously in the wrong state (`a-story-proves-what-it-rendered`).
>
> **Measure colour by painting, never by parsing.** `getComputedStyle` serialises `oklch()`/`lab()` verbatim. Only `fillRect()` + `getImageData()`, or a screenshot sample, resolves a colour (`a11y.contrast.measure-by-painting-not-by-parsing`).
>
> **A material is only verified in the running app.** Storybook, the `preview/` specimens and the app are three different CSS pipelines, and only the app is the product. Read the computed style in the app for anything that depends on a compiled property.
>
> **A clean lint run covers the class layer only.** A surface that draws imperatively — d3 `.attr("font-size", …)`, canvas, a third-party API taking a literal — is invisible to every check. Look at those by hand (`enforcement-has-a-blind-spot`).

## Look at the render and ask

1. **Text on the aurora?** Neutral ink may sit on the band: the band is bounded so `--text-secondary` clears 4.5:1 at every point, both schemes (`a11y.contrast.band-is-bounded`). **Blend by removing the plate, never by lowering ink** — `--text-tertiary` over a gradient is an unmeasured contrast failure. **Coloured ink needs an opaque ground**; glass passes the gradient through and blur averages bright lobes in (`color.ink-needs-an-opaque-ground`). → violation
   - **Check a material against `colors_and_type.css`, not the app's own utility.** A specimen names which value it renders.
   - **A contrast number without a position is not a measurement.** The canvas is a gradient; quote where you sampled or don't quote the number (`color.ink-ground-is-a-placement`).
2. **Is the green obeying the fill rule?** Three separate questions (`color.action.fill-rule`):
   - **A filled green plate is a control** (*press me*). One per surface, on that surface's primary act — and a card is a surface, so each ask card carries its own Co-sign plate; an act the page has already plated takes `button-secondary` when it repeats (`color.action.fill-rule-one-per-surface`). A green plate that isn't pressable is a violation.
   - **Green ink is a report** (*this happened*): `--ink-success`, which carries the light/dark switch. The action green **as text is forbidden** (`fill-rule-which-green`, `green-ink-is-one-token`).
   - **Green ink is only as legal as the ground under it.** Measure against the ground the element lands on, not white. A **green tint plate carrying green ink caps at 10%** (`color.action.fill-rule-ink-ground`).
   - **The Momentum accent is scoped to where a crowd is counted** — co-signs, endorsements, tallies, threshold meters. Conversation views are green-free. This scopes the brand accent, not semantic success (enacted, completed, verified) (`registers.live.palette-rule`).
3. **Any red that isn't semantic danger?** No red CTAs, no red ENACTED. `--color-danger` for danger and "dead" only. No violet, pink or magenta accents; no amber except warning.
4. **Anything moving on hover?** Hover = one background step + one shadow tier. No `scale()`, no `brightness()`, no transform transitions. Chrome is still. Motion exists on exactly two product surfaces — Receipt bloom (once, at issuance) and Commons accrual (real aggregate state) — and never swaps or leaks. Streaming text and resolving skeletons are not motion. **An idle loop or a decorative ping is a violation wherever it is** (`motion.rules`).
   - **Outside the budget, not exceptions to it:** a control drawing a state the user just committed (a toggle thumb, a disclosure caret) is feedback; the aurora is a layer, not a surface, and breathes; marketing is outside the register table, and its motion must be pausable, viewport-gated, motion-safe, and never on a surface carrying record state.
   - **Before applying a general rule as absolute, grep the component entries for its exception**, and hoist it into the general rule.
5. **Nav labels in caps?** They take `role-body`, sentence case. A nav label is a destination name, not a field label; "the navbar is chrome" describes the surface, not its content.
6. **A serif heading inside a card?** Serif belongs to the canvas; inside a container the heading takes `role-ui-heading` (sans). *Carve-out:* a container whose content is the document — a bill page, statutory text, the Receipt, a quoted excerpt — keeps a serif heading. A list or a control is apparatus; the record is the record.
   - **Placement has one test** (`a-heading-belongs-to-whoever-it-works-for`): *could a second card join under this title?* Yes → it is the page's outline: above the card, serif, `role-display-section` top-level or `role-display-minor` sub-entry. No → it is the card's own: inside, `role-ui-heading`. Content that names itself (a composer, a search field) takes no title. **Never both**, and never mix the two placements in one column.
   - **Conversation:** the container boundary is the voice boundary — user bubble sans, canvas reply serif, no headings.
7. **A count in a pill?** A count is **ink, not a plate** — metadata beside the heading it counts, in its surface's voice: `role-metadata` beside a serif heading, `role-metadata-sans` beside `role-ui-heading`. A heading and its count are one lockup, one family. **Adjacent only:** a labelled status at the opposite end of a section header is a rail, not a lockup, and takes `role-label-caps`. The test is the text — a bare numeral, or a labelled statement ("12 published") (`count-beside-is-not-count-opposite`).
   - **Apparatus ink is sans**, entry titles and timestamps included.
   - **A geography row under a count appears only where the viewer's signature can move it** (`a-count-row-is-reach`).
8. **Uppercase chrome centred in a padded box, or wrapping?** Uppercase has no descenders, so `role-label-caps` ink sits above the centre of its line box and `items-center` leaves the letters high. Tune padding to the ink. The role's leading survives a second line; a chip, tile or stamp that needs a single-line box declares its own height (`line-height-1-has-two-consequences`).
9. **A container's stated height only reached by arithmetic?** If changing a child changes the parent's stated dimension, the parent never declared it. Declare it on the container.
10. **ALL CAPS in a heading?** Uppercase has **four** homes and no others (`typography.uppercase-has-two-homes`): `role-label-caps` (chrome, secondary ink: the section divider and the status stamp, and no other site — `typography.chrome-sites-are-closed`), `role-designation` (primary ink: a designation repeated at text size — a bill slug or jurisdiction code leading a row or card), `role-ceremonial` (display size, once per page), and `role-calendar-month` (the month over a calendar tile’s day numeral). Headings are serif, mixed case, never tracked out. A heading tag carrying a tracked uppercase label is one of the first three roles and stays sans.
    - **Designation or sentence?** A bill identifier, a place of issue or a seal monogram is a designation. A sentence someone wrote ("Browse bills by state") is a heading.
    - **A register change is a width change — measure the container.** `role-label-caps` is wider than almost anything it replaces. A fixed width, slot, plate or `truncate` near a role change is a measurement, not a look (`a-register-change-is-a-width-change`).
    - **Take the role, don't rebuild it.** Chrome and ceremonial share a width preset and are separated by tracking and size; a width preset without its tracking is a different register.
11. **Type below 12px?** Hard floor, no chrome exception. **If a label no longer fits at 12px, the layout is the problem** (`measure-before-you-shrink`).
12. **Touch target under 44px?** Interactive ≥44px; primary CTA 48px — by `min-height` or an expanded transparent hit area, never by inflating padding. Appearance and target are two geometries (`a11y.targetSize`).
    - **Except a link inside a sentence**, which takes no minimum. A link with its own line box is not inline and takes the floor.
13. **Serif italic doing decoration?** Italic serif is quoted human voice only, ≥1.125rem (`role-quote`). Below that it's roman 600 (`emphasis-serif-inline`). Metadata is roman. Sans emphasis uses Archivo's real italic.
14. **Script face on anything but the user's own affirmed name, on their own artifact?** Never other names, never decoration. No name → serif "A constituent".
15. **Emboss without paper under it, or below 44px?** The emboss needs a paper canvas. It can't print or survive email — the ledger number, always present as text, is the proof.
16. **Both colour schemes checked?** Light and dark are both first-class. Under `prefers-reduced-transparency` glass collapses to opaque surfaces — zinc in light, the canvas's own family in dark; email lives there permanently (no webfonts — Georgia / Segoe stack / Verdana chrome ≥12px). Honour `prefers-reduced-motion` and `prefers-contrast`.
17. **A cutout mark on a light ground?** Cutouts are for **dark grounds only** — `assets/` carries an ink variant of every mark for light. A mark is a graphical object: **3:1 non-text floor**, which a text-contrast sweep won't check (`a-cutout-mark-is-for-dark-grounds-only`).
18. **Wrong icons or imagery?** These bind the system's own voice, not user-authored content (`color.rules-bind-the-system-not-the-user`). Phosphor only, never Lucide. No flags, eagles or partisan marks **as decoration** — a jurisdiction's own flag or chamber seal at badge scale, identifying that jurisdiction's records, is a sanctioned identity mark. No stock photography, no photographic textures, no faux-3D, no emoji in the system's voice. No 🎉 register — the Receipt is *issued*, not cheered.
19. **A `ch` unit, or a hand-typed value a token already owns?** Widths in rem from the measure and container tokens; `ch` is banned from tokens and from prose (`spacing.measure.rule`). Colours, shadows, materials, weights from tokens. **Cite the token, never the number.**
20. **A green plate without its edge?** Every `color.action` plate carries a 1px `color.action-active` ring — the fill alone is under 3:1 on a light card (`components.button-cta.ring`).
21. **An empty state?** Content that did not arrive is `card-empty` (material); a slot someone can fill is `card-placeholder` (dashed). An empty card is a `role-ui-heading` title over a `role-body` message in secondary ink (`components.card-empty.typography`).
22. **Cards in a row with titles, counts or buttons at different heights?** The foot docks: count, one report line, act, at the bottom of every card in the row, under a hairline. On a card you’re recruiting for, the part under the hairline is a full-bleed `--wash-yours` band. The top aligns too: the eyebrow row is as tall as its status text whether or not the card has one (`components.card.foot-docks-in-a-row`, `your-band`, `eyebrow-declares-its-height`).
23. **A button on every row?** An action repeated down a list is quiet — icon and word, no plate — and a row it can’t apply to shows nothing, never a disabled control (`components.row-action`).

## The four registers (pick the register, not the room)

| Register | Rooms | Canvas | Material | Column | Motion |
|---|---|---|---|---|---|
| Live | Reading Room · Commons | `--canvas-live` + aurora | `material-thin` | `container.tight` | accrual only |
| Reading | Archive | `paper-cream` | `material-regular` | `measure.body` | none |
| Writing | Writing Desk | `paper-parchment` | `material-regular` | `measure.body`, portrait | minimal |
| Issued | Receipt | `paper-cream` | paper | 34rem portrait | bloom once, then static |

Aurora limits: chroma ≤ 0.22, ≤ 5 lobes, and the band is bounded so `--text-secondary` clears 4.5:1 at every point. No full-bleed photography, no repeating patterns.

## Where findings go

- **Spec clear, code disagrees** → conformance. Fix it. No queue entry.
- **Spec silent, two readings, or a framework's default nobody chose** → append to `RATIFY.md` with the kind named and **the evidence attached, not the argument**. Render both readings and let the container decide.
- **A rule that exists only inside a profile or a register is invisible to the general case.** Finding one in an unexpected section is itself a finding worth queueing.
