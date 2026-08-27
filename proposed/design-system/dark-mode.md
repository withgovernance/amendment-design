# Dark mode

> **This is the #1 repeated correction across design sessions.** Verify every UI change in dark mode before claiming done. Dark mode is not a follow-up; it is half the deliverable.

Tokens auto-swap via `.dark` selector or `[data-theme="dark"]`. Contributors rarely think about it because:

1. **Text** — Tailwind `dark:text-white/87 · /55 · /38` does it.
2. **Materials** — token swap handles backgrounds and rings.
3. **Aurora** — separate dark aurora gradient (lower lightness, slightly higher chroma) is in [`tokens/tokens.json`](./tokens/tokens.json).
4. **Paper canvases** — `cream` becomes a deep warm ivory; `parchment` becomes deep warm manila.
5. **Sans weight** — auto-calibrated in the CSS layer (dark weights ~7/8 of light to compensate for optical bloom). Do not manually pick a "dark weight."

## The two dark-mode failure modes

### 1. Shadow-only hover is invisible in dark mode

Shadow tokens use `rgb(15 23 42)` (slate-900) ink. Dark-on-dark vanishes against the aurora. Hover that needs to be visible in both modes must shift the *material level*, not just the shadow:

```tsx
// ✅ Visible in both modes — bg + ring + shadow all shift
className="
  bg-white/45 backdrop-blur-material ring-1 ring-inset ring-black/5
  hover:bg-white/85 hover:ring-black/10 hover:shadow-raised
  dark:bg-black/26 dark:ring-white/8
  dark:hover:bg-black/41 dark:hover:ring-white/10
"

// ❌ Light mode looks fine, dark mode reads as not-hovered
className="bg-white/45 hover:shadow-floating"
```

If the only way you can tell something is hovered is by squinting at its shadow in light mode, the dark-mode version reads as unhovered.

### 2. Dark-mode elevation gets inverted

In dark mode the element *closer to the viewer should be lighter* (more white overlay), not darker. The natural instinct ("shadows darker, so closer = darker") inverts the depth. The correct stack:

- Page canvas — `zinc-900` (darkest)
- Card — `material-regular` → `rgb(255 255 255 / ~5%)` overlay (lighter than canvas)
- Modal — `material-thick` → more white overlay (lighter still)
- Tooltip / dropdown — `material-thick` floating, lighter still

If your foreground card looks darker than the canvas in dark mode, it's wrong. The material tiers already encode the correct direction — use them, don't hand-roll slate stacks.

## Things that still require explicit dark handling

- **Phosphor icon color** — set explicitly. `text-black/87 dark:text-white/87`.
- **Shadow ink** — slate-900 shadows work in both modes; do not invert.
- **The seal** — no gradient and no hue at all: it is a blind emboss (`.seal-emboss`), and it reads *better* on lamplit paper because warm paper deepens the shadow. Oxblood was retired from the system in 2026-08.
- **Guilloche** — `stroke="#334155"` in light, `stroke="#94a3b8"` in dark. Higher contrast on dark paper.
- **Charts** — series colors should use dark-mode variants (one step lighter) when on dark paper. Token: `chart-series-dark.*`.

## The dark-mode test (mandatory before "done")

1. Toggle the doc element's `class` to `dark` (or use the in-app theme switcher).
2. Re-screenshot via the design-iterate loop.
3. Confirm:
   - All text remains contrast-AA.
   - Hover states are visible (you can tell a hovered element from an unhovered one).
   - Foreground elements are lighter than background (correct elevation direction).
   - No surface drops to invisible or merges with the aurora.
4. Then — and only then — you can claim done.

If any of those fails, the *token*, not the component, usually needs editing. Open [`tokens/tokens.json`](./tokens/tokens.json) first.
