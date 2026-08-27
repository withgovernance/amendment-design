# Fonts

This system uses four families:

- **Archivo** (variable, weight 100–900, `wdth` 62–125, true italic) — **self-hosted**, roman + italic. Upstream: https://fonts.google.com/specimen/Archivo
- **Newsreader** (variable, weight 200–800, `opsz` 6–72, italic) — Google Fonts: https://fonts.google.com/specimen/Newsreader
- **IBM Plex Mono** (weights 400/500/600 + italic 400) — Google Fonts: https://fonts.google.com/specimen/IBM+Plex+Mono
- **Amerika Signature** — signatures only. Ships locally (`AmerikaSignature.otf`); there is no web-font fallback that resembles it.

Archivo replaced **Readex Pro** on 2026-08-13. Readex was excellent as chrome and
wrong as a body face, and it had **no italic**, which is why every italic in the
system had to be serif. `fonts/ReadexPro.ttf` and its `@font-face` block are gone.

## What is self-hosted, and what is not

**Archivo is self-hosted** (uploaded 2026-08-13):

```
fonts/Archivo-VariableFont_wdth_wght.ttf          # roman
fonts/Archivo-Italic-VariableFont_wdth_wght.ttf   # italic
```

Both are wired in `colors_and_type.css` as one `'Archivo'` family across two
`@font-face` rules (`font-weight: 100 900; font-stretch: 62% 125%`), and Archivo
has been **removed from the Google Fonts `@import`**. The chrome register now
survives a blocked or offline CDN, which is what the local cut was for.

VERIFIED on upload — the axes survived, which is the thing that actually matters:

| Check | Result |
|---|---|
| `document.fonts` | `Archivo/normal/100 900/62% 125%` + `Archivo/italic/100 900/62% 125%` |
| `wdth` alive | `ARCHIVE COMMONS WRITING DESK` at 12px: **251.7px @ wdth 100 → 315.7px @ wdth 125** |
| italic real | drawn italic, distinct metrics from the roman — not a synthesized oblique |

A cut whose `wdth` axis has been stripped loads cleanly, passes every check that
only looks for the file, and silently collapses chrome to normal width. The width
spread above is the test worth re-running after any font swap. Self-hosting also
cut Archivo from six CDN slices to two faces.

**Newsreader and IBM Plex Mono still come from Google Fonts.** Neither has a
local cut and neither carries a width axis to lose, so CDN delivery is fine. If
you want them local too, download the variable woff2 files and follow the same
`@font-face` shape:

```
fonts/Newsreader.woff2         # variable, wght 200..800, opsz 6..72, + italic
fonts/IBMPlexMono-Regular.woff2
fonts/IBMPlexMono-Italic.woff2
fonts/IBMPlexMono-Medium.woff2
fonts/IBMPlexMono-Semibold.woff2
```
