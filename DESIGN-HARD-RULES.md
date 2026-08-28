# Amendment — Hard Rules (the lookable checklist)

Source of truth: `DESIGN.md`. This file is the short list every visual change is checked against — by `/design-iterate` (step 4½, against screenshots), by `/review-pr` (against the diff), and by you. If a rule here contradicts DESIGN.md, DESIGN.md wins; fix this file.

## Look at the screenshot and ask

1. **Bare text inside the aurora band?** Text sits on glass or paper, never directly on the gradient. → violation
2. **Green anywhere a crowd isn't counted?** A filled green plate is a control (*press me*); green ink is a report (*this happened*). Green appears only where a crowd is counted or on the primary act (Send / Co-sign / FAB). Conversation views are green-free. Meters/ribbons exempt (quantity, not affordance).
3. **Any red that isn't semantic danger?** No oxblood, no red CTAs, no red ENACTED. Red = red-600 danger/"dead" only. No violet/pink/magenta accents; no amber except warning.
4. **Anything moving on hover?** Hover = one background step + one shadow tier. No `scale()`, no `brightness()`, no transform transitions. Chrome is still. Motion exists on exactly two surfaces: Receipt bloom (once, at issuance) and Commons accrual (real aggregate state). Streaming text/skeletons are not motion.
5. **ALL CAPS in a heading?** Uppercase belongs to chrome only: 12px, wdth 125, 0.12em tracking. Headings are serif (Newsreader), mixed case, never tracked out.
6. **Type below 12px?** Hard floor, no chrome exception.
7. **Touch target under 44px?** Interactive = ≥44px; primary CTA = 48px — by min-height or expanded hit area, never by inflating padding/appearance. Appearance and target are two geometries.
8. **Serif italic doing decoration?** Italic serif = quoted human voice only, ≥1.125rem. Metadata is roman. Sans emphasis uses Archivo's real italic.
9. **Script face on anything but the user's own affirmed name, on their own artifact?** Never other names, never decoration. No name → serif "A constituent".
10. **Emboss without paper under it, or below 44px?** The seal emboss needs a paper canvas. It can't print or survive email — the ledger number (always present as text) is the proof.
11. **Both color schemes captured?** Light and dark are both first-class; glass collapses to solid zinc under `prefers-reduced-transparency` (email lives there permanently — no webfonts, Georgia/Segoe/Verdana, chrome ≥12px).
12. **Wrong icons or imagery?** Phosphor only (never Lucide). No 🇺🇸/eagles/partisan marks, no stock photos, no photographic textures, no faux-3D. No 🎉 register — the Receipt is issued, not cheered.
13. **A `ch` unit, or a hand-typed value a token already owns?** Widths in rem (`measure.body` = min(28rem, 100% − 2rem)); colors/shadows/materials from the token layer. A literal is how every drift in this system's history started.

## The four registers (pick the register, not the room)

| Register | Rooms | Canvas | Material | Column | Motion |
|---|---|---|---|---|---|
| Live | Reading Room · Commons | none (aurora) | material-thin | 48rem | accrual only |
| Reading | Archive | paper-cream | material-regular | 28rem | none |
| Writing | Writing Desk | paper-parchment | material-regular | 28rem portrait | minimal |
| Issued | Receipt | paper-cream | paper | 34rem portrait | bloom once, then static |

Aurora limits: chroma ≤ 0.22, ≤ 5 lobes, never bare text in the band. No full-bleed photography, no repeating patterns.
