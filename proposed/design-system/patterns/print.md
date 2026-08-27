# Print & downloadable PDF

> **PROMOTED AND SUPERSEDED, 2026-08-04.** The mailed letter is now specified
> in `DESIGN.md` → `profilesPrint`, and the CSS it can own ships in
> `colors_and_type.css` (`@page` + `@media print`). Decided in
> `explorations/The Printed Letter.html`.
>
> **Two lines of the stylesheet below were wrong and are kept only as a
> record of what not to do:**
>
> - `* { color: #000 !important }` — flattens the 87/55/38 ink scale. That
>   scale is how ink sits on a page, not a screen affordance. Print re-bases
>   it: primary 100%, secondary 45%, tertiary does not print.
> - `.paper-cream, .paper-parchment { background: white }` — filed as
>   "restore solid surfaces". The canvas token was always standing in for the
>   sheet; on paper it does not restore anything, it becomes the sheet. A
>   cream fill is an ink wash across a whole page, it bands on consumer
>   printers, and the stock already has a colour.
>
> The emboss was not mentioned at all, and it is the one thing that cannot
> print: a printer can only print a picture of a deformation, and it renders
> as grey mud on the artifact whose authority it was carrying.

## The stylesheet as proposed (historical)

```css
@media print {
  body::before { display: none; }
  [class*="material-"] { backdrop-filter: none; background: white; ring: none; }
  .paper-cream, .paper-parchment { background: white; box-shadow: none; }   /* WRONG — see above */
  nav, .fab, .toaster, .tabbar { display: none !important; }
  .grid { display: block; }
  * { color: #000 !important; }                                            /* WRONG — see above */
  .receipt, .bill-paper, .letter-paper { break-inside: avoid; }            /* unobeyable past one sheet */
}
```

## PDF-specific (jsPDF / Puppeteer) — still current

When generating a PDF server-side:
- Use the same fonts (Readex Pro, Newsreader, IBM Plex Mono) — embed as Type 1 via Puppeteer's font-injection.
- Render the receipt at 1056 × 1632 (US Letter at 132 DPI) for crisp guilloche.
- **Draw guilloche procedurally at the rendered width.** "Strokes scale automatically" is the defect, not the feature — see `tactileAccents.guilloche`.
- Letter copies render with full paper grain at print resolution.
