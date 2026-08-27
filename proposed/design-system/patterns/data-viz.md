# Data visualization

A legislative product lives on charts: vote counts, sponsor breakdowns, bill-flow funnels, jurisdiction coverage maps, time-series of legislative activity.

## The palette extension for charts

The brand palette is too narrow for categorical charts. **Extend with discipline.** Allowed chart colors, in order:

1. `slate-700` — primary series (most-emphasized category, often the user's selection)
2. `slate-400` — secondary series
3. `emerald-700` — "for/yes/passed" semantic
4. `red-600` — "against/no/failed" semantic
5. `amber-700` — "abstain/present/procedural"
6. `slate-500` — tertiary or neutral

For categorical breakdowns beyond four, use **slate opacity** (`slate-700/100`, `/80`, `/60`, `/40`, `/20`) — never reach for distinct hues. Population weight on the state map is encoded as slate opacity for exactly this reason.

## Caucus colors (the one exception)

D / R caucus identity gets dedicated muted colors that read as brand-adjacent, not partisan:
- D — `slate-blue-800` (`#1e3a8a`) — chosen for navy-civic register; deliberately not bright blue
- R — `#991b1b` — muted red, deliberately not bright. Standalone data value: it was picked to coordinate with an oxblood action colour, and since Aug 2026 the action colour is green, so this must **not** be re-derived from the palette.
- I / other — `slate-600`

These appear only on caucus badges and sponsor cards. They do **not** propagate to chart colors for other categorical needs.

## Chart chrome

- **Axis labels** — HEXP-60 uppercase, 10px, tracking 0.06em, `text-black/55`
- **Tick marks** — `text-black/38`, 1px stroke
- **Gridlines** — `text-black/[0.06]`, 1px, dashed only on the most important axis, solid elsewhere
- **Tooltip** — material-thick, rounded-md, padding-3, `text-xs`. Mono for numbers, serif italic for labels
- **Legend** — HEXP-60 12px uppercase, with a 12 × 4px color swatch (not a circle, not a square — keeps the read of stamp segments)
- **No 3D, no shadows on bars, no gradient fills.** Solid blocks at the spec opacity.

## Sparklines

Tiny inline bill-flow visualizations (sponsor activity, vote count over readings). 64 × 18 default. Single-color: `text-primary stroke-current fill-none`. **No shadow.** No animation on hover.

## The state map

Hex grid, jurisdiction = one hex cell, sized to population weight (opacity-encoded). Active jurisdictions fill `bg-primary/[opacity]`; out-of-session ones drop to `bg-zinc-100 ring-1 ring-inset ring-black/10`.

**Forbidden:** Mercator world maps, choropleth ranges with rainbow palettes (`scale-viridis` etc.), 3D extrusions.

## Recharts / D3 wiring

The codebase uses Recharts. Color tokens for chart series live in `lib/charts/series.ts` and re-export from `tokens.json`. Custom Recharts components in `components/charts/*`. Never inline colors in JSX; always pull from the series token.
