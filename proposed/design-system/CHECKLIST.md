# Pre-merge checklist

Run every item before claiming any visual work is "done." Maps 1:1 to the recurring corrections in `../CLAUDE.md`.

## Verification (the #1 source of corrections)

- [ ] Screenshotted **desktop AND mobile** via the design-iterate loop
- [ ] Screenshotted **light AND dark mode** (not optional — see [`dark-mode.md`](./dark-mode.md))
- [ ] Read the screenshots critically — described the actual diff, didn't just say "looks great"
- [ ] **Dark-mode elevation correct** (closer to viewer = lighter overlay, not darker)
- [ ] **Hover visible in dark mode** (material level shifts, not shadow alone)

## Token discipline

- [ ] Surfaces use **material utilities** (`material-thin/-regular/-thick/-chrome`) — no opaque `bg-white` / `bg-slate-*`
- [ ] Text color is **opacity on black/white** (`text-black/87 dark:text-white/87` etc.) — no `text-slate-*` / `text-gray-*` / `text-zinc-*` for body or chrome
- [ ] No **raw hex** (`#1e293b`) in source — Tailwind utilities or `tokens/tokens.json` only
- [ ] **Named font scale** only — no `text-[Npx]`, nothing below `text-xs` (12px)
- [ ] **HEXP utility classes** (`hexp-chrome`, etc.) applied only to UPPERCASE chrome — never on mixed-case body or headings

## Composition discipline

- [ ] **Reused** an existing component (`PartyChip`, `OfficialBubble`, `Button`, etc.) instead of forking
- [ ] **Stayed in visual scope** — no logic / backend / data changes snuck in
- [ ] Decorative elements removed unless **load-bearing** (stamps/watermarks on `paper-cream` only, never on aurora chrome)

## Behavior discipline

- [ ] Hover state: background brightens **one step** + shadow bumps **one tier** (no `scale`, no `brightness`, no `transition-transform`)
- [ ] Focus visible at 2px slate with 4px offset (8px for inline links, 2px inset for inputs)
- [ ] Interactive target ≥ 44 × 44px
- [ ] If using glass: provides a solid fallback under `prefers-reduced-transparency`
- [ ] If animated: clamps under `prefers-reduced-motion`

## Component-shape discipline

- [ ] Phosphor icons with `Icon` suffix and correct weight (regular default, fill for active, light for hero empty-state, bold for tiny inline)
- [ ] No left-border accent color, no solid card paint, no drop-shadow faux-3D
- [ ] `rounded-full` pills contain abbreviations only (no spelled-out words — those read as filter buttons)
- [ ] Semantic colors used **for their semantic meaning only** (passed bill = emerald, never blue/red)

---

If any item fails, the work isn't done. If a token fails (you can't pick the right value), open [`tokens/tokens.json`](./tokens/tokens.json) first. If the system fails (you reached for a hex), the *system* needs editing, not the component.
