# Civic — tactile accents

The skeuomorphic vocabulary that makes Amendment specifically *Amendment*. Lives in `components/civic/*`.

> **The rule.** A tactile accent must reference a real civic artifact (rubber stamp, wax seal, signature line, postmark, ruled statute page, jurisdiction seal, envelope) **and** serve a communicative purpose (status, authority, confirmation, identity). **Ornament without meaning is forbidden.**

Accents are drawn in a 2026 register — vector-constructed with slight imperfection, never photographic. Textures stay below 4% noise. Ink-break on stamps is subtle (≤ 15% alpha variation).

---

## RubberStamp

Bill status on Archive surfaces. 2px stroke, 2–4° rotation (deterministic per status), HEXP-60 uppercase typography, 0.12em tracking.

```tsx
const STATUS_COLOR = {
  enacted:  "text-action",      // oxblood
  signed:   "text-action",
  procedural: "text-primary-light", // slate-700
  vetoed:   "text-warning",     // amber-700
  dead:     "text-danger",      // red-600
};
const STATUS_ROTATION = { enacted: -2.5, procedural: 3, vetoed: -2, dead: 1.5 };

<span style={{ transform: `rotate(${STATUS_ROTATION[status]}deg)` }}
  className={`
    inline-block px-3.5 py-1 rounded-sm
    text-sm font-bold uppercase tracking-[0.12em] hexp-chrome
    ring-2 ring-inset ring-current opacity-90
    ${STATUS_COLOR[status]}
  `}>
  {label}
</span>
```

One stamp per bill. Sits adjacent to the title row on the bill text paper canvas. **Never** floats on aurora chrome.

---

## Postmark

Introduction-date stamp near the top of a bill page. Circular or date-roller rectangle. Slight rotation (2–6°). IBM Plex Mono uppercase. Moderate ink-break (postmarks are imperfect by nature). One per bill.

---

## WaxSeal

Flat circular Oxblood with monogram embossed in parchment. Minimal ink-break — a seal is clean.

```tsx
<svg viewBox="0 0 120 120" width={96} height={96}>
  <defs>
    <radialGradient id="seal" cx="50%" cy="40%" r="55%">
      <stop offset="0%"   stopColor="#991b1b" />
      <stop offset="60%"  stopColor="#7f1d1d" />
      <stop offset="100%" stopColor="#450a0a" />
    </radialGradient>
  </defs>
  <circle cx="60" cy="60" r="54" fill="url(#seal)" />
  <circle cx="60" cy="60" r="48" fill="none" stroke="#fefce8" strokeOpacity="0.22" />
  <text x="60" y="78" textAnchor="middle" fontFamily="Merriweather" fontWeight="800"
        fontSize="58" fill="#fefce8" opacity="0.94">{monogram}</text>
</svg>
```

Applied to user avatars (always). On Writing Desk, also stamps the post-Send confirmation. On Receipt, lands at lower-right corner.

---

## Guilloche

Engraved-line-work border. **Receipt surface only.** Procedural SVG sine waves — never raster import.

Density: 20–40 lines per band, stroke 0.5–0.75px, slate-700 at 20–30% opacity, bands 24–40px tall.

```tsx
function Guilloche({ width = 800, height = 28, lines = 24 }) {
  const paths = useMemo(() => {
    const out = [];
    for (let i = 0; i < lines; i++) {
      const phase = i * 0.18;
      const amp   = (4 + (i % 5)) * (height / 32);
      const freq  = 0.025 + (i % 5) * 0.001;
      const yMid  = height/2 + (i - lines/2) * (height / lines * 0.7);
      let d = "";
      for (let x = 0; x <= width; x += 2) {
        const y = yMid + amp * Math.sin(x * freq + phase);
        d += (x === 0 ? `M${x} ${y.toFixed(2)}` : ` L${x} ${y.toFixed(2)}`);
      }
      out.push(d);
    }
    return out;
  }, [width, height, lines]);
  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="block w-full">
      {paths.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="#334155" strokeWidth="0.5" strokeOpacity="0.22" />
      ))}
    </svg>
  );
}
```

Top band drawn normally, bottom band with `style={{ transform: "scaleY(-1)" }}`. Density tuned to mid-band: too dense reads as Federal Reserve cosplay; too sparse reads as decorative trim.

---

## ProgressRibbon

8px segmented bar with HEXP-60 milestone labels beneath. Active segment uses `animate-pulse` (`bg-functional/70`). Completed segments are slate-700 (light) / slate-500 (dark). On enacted bills, the entire bar is emerald-600. On failed bills, only the segment where the bill died is red-600.

Archive bill detail only. On paper-cream canvas.

**Don't** caption with redundant `{status} on {date}` — the stamp + active segment + label encode status already. The date is real new information; render as italic-serif metadata adjacent to the ribbon.

Variants:
- **ribbon** — 8px segmented bar + labels. Bill detail page.
- **compact** — mini-bar (h-2) without milestone labels. Bill list rows.

---

## LapelPin

Circular vector illustration avatar for featured civic entities (sponsors, jurisdiction landings, hero). 48–80px, 1px hairline ring.

- **No** photographic rendering (no chrome, no bevel, no gloss).
- **No** flag, eagle, or partisan iconography.
- **No** campaign-poster typography inside the pin.

For legislator-headshot rendering when a real photo is available, see [`../patterns/imagery.md`](../patterns/imagery.md).

---

## JurisdictionWatermark

Behind the title block of an Archive bill page, on the paper-cream canvas. 5–8% opacity. Vector reconstruction of the public-domain seal, monochromatic slate.

> **Form pending.** Earlier iterations (desaturated state flag; generic capitol dome) were pulled — see `../HISTORY.md`. Use the placeholder vector until the canonical form ships.

---

## RuledPage

4% black horizontal lines at every text baseline behind serif body text. Bill text canvas and Writing Desk letter canvas only.

```css
background-image: repeating-linear-gradient(
  to bottom, transparent 0, transparent calc(1.625em - 1px),
  rgb(0 0 0 / 4%) calc(1.625em - 1px), rgb(0 0 0 / 4%) 1.625em
);
```

---

## LineNumbers

IBM Plex Mono 11px, tertiary text, right-aligned in a 2rem left gutter. Bill text only. Numbers reset per section.

```tsx
<div className="grid grid-cols-[2rem_1fr] gap-4">
  <div className="text-right font-mono text-[11px] text-black/38 leading-[1.625]">
    {lines.map((_, i) => <div key={i}>{i + 1}</div>)}
  </div>
  <div className="ruled font-serif">…</div>
</div>
```

---

## SignatureLine

Dotted 1px rule + HEXP-60 uppercase 10px label below, centered. Writing Desk only, end of composed letter.

Users may upload a signature PNG (≤ 60px height, transparency required) that renders above the dotted rule. **The system does not simulate handwriting.**

---

## FolderTabSteps

Numbered step markers that jut out of a section header like a manila-folder tab. Writing Desk composition flows.

Geometry: rounded-corner polygon jutting 24–32px above the section header baseline, attached to the top-left of its section. Subtle shadow underneath the jut.

Color:
- **Active** — Oxblood fill, white number
- **Complete** — slate-800 fill, white number
- **Upcoming** — paper-cream fill, tertiary-text number

Rotation: **0** — steps are filed, not stamped.

---

## EnvelopePreview

3:4 rectangular card with subtle fold shadow along horizontal center, small Oxblood postage corner in the upper right with the bill number. Writing Desk post-send state.

---

## PaperGrain

Procedural monochromatic noise at ≤ 2% opacity. Fine scale. **Writing Desk letter canvas only** — bill pages are printed clean.

```css
background-image: url("data:image/svg+xml;utf8,<svg …><filter id='n'>
  <feTurbulence baseFrequency='0.85' numOctaves='2'/>
  <feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0'/>
</filter><rect width='200' height='200' filter='url(#n)' opacity='0.04'/></svg>");
mix-blend-mode: multiply;
opacity: 0.6;
```

---

## Forbidden across all civic accents

- Drop-shadow faux-3D (iOS-6 skeuomorphism is a museum piece)
- Gradient bevels, inner glows, emboss effects to fake depth
- American flag accents, eagle icons, nationalist iconography — civic is not partisan
- Photographic paper textures (grain is procedural monochromatic)
- Floating stamps / watermarks / seals on aurora chrome — they belong on paper-cream
- Any accent without a communicative purpose — ornament is forbidden
