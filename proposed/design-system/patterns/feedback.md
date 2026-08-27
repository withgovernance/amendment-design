# Feedback — toasts, tooltips, popovers, skeletons

Three flavors of feedback: ephemeral confirmations (toasts), persistent hints (tooltips/popovers), and waiting states (skeletons).

## Toasts

Toasts are reserved for **confirmation of an action the user just took** or **time-bounded system events** (deploy starting, your session is about to expire). They are *not* for marketing, tips, or non-actionable info.

### Anatomy

Floating bottom-right (above FAB if present, with `bottom-[88px]`), `material-thick`, `rounded-md`, padding-4, `shadow-floating`. Max-width 380px. Auto-dismiss after 5 seconds; persist if it contains an action.

```tsx
<div role="status" aria-live="polite" className="
  fixed bottom-6 right-6 z-50 max-w-[380px]
  bg-white/95 backdrop-blur-material rounded-md p-4
  ring-1 ring-inset ring-black/15 shadow-floating
  flex gap-3 items-start
">
  <CheckCircleIcon weight="fill" size={20} className="text-success mt-0.5 shrink-0" />
  <div className="flex-1 min-w-0">
    <div className="font-serif font-bold text-sm text-black/87">Letter sent</div>
    <div className="font-serif italic text-xs text-black/55 mt-0.5">
      Delivered to Rep. Bensky · letter no. 14,508
    </div>
  </div>
  <button className="text-black/38 hover:text-black/87"><XIcon size={14} /></button>
</div>
```

### Variants

| Variant | Icon | Tone |
|---|---|---|
| Success | `CheckCircleIcon` fill, `text-success` | "Letter sent" / "Bill tracked" |
| Info    | `InfoIcon` regular, `text-primary` | "Your session was restored" |
| Warning | `WarningIcon` fill, `text-warning` | "Heads up — recipient is out of session" |
| Error   | `XCircleIcon` fill, `text-danger` | "Delivery failed. Retry?" |

**Never** an "achievement" toast for opening a page or scrolling a list. The Receipt is the achievement surface.

### Stacking

Newer toasts push older toasts up with `mb-3`. Max 3 visible; older ones collapse silently.

### Reduced motion

Toast slide-in is replaced with opacity-only fade when `prefers-reduced-motion: reduce` is set.

---

## Tooltips

Pure text, no interactivity, short. `material-thick` plate, `rounded-md`, `px-2.5 py-1.5`, `text-xs font-medium`, `text-black/87`, max-width 240px. Arrow optional (omit on busy surfaces).

Trigger delay: 400ms on hover, instant on keyboard focus.

```tsx
<Tooltip content="Tracked bills appear in your Activity">
  <button>…</button>
</Tooltip>
```

**Never** style a tooltip with a colored background to indicate semantic state — if the underlying element has a state, the tooltip just describes it.

---

## Popovers

Interactive flyouts (sponsor card preview, jurisdiction summary, filter editor). `material-thick`, `rounded-lg`, padding-4, `shadow-floating`. Width by content but capped at 320px.

Open via click (never hover for popovers — hover is reserved for tooltips and link previews). Dismiss on outside click or `Esc`.

Trapped focus inside while open. First focusable element gets focus on open. Return focus to trigger on close.

---

## Skeletons

Skeletons replace content during initial load. They use **opacity pulse**, never shimmer (shimmer reads as marketing chrome; we're a research product).

```tsx
<div className="rounded-md bg-black/[0.06] animate-pulse h-4 w-32" />
```

### Skeleton shapes

Match the final content's geometry:
- Text line → `h-4 rounded-sm` of varying widths
- Heading → `h-7 rounded-sm w-2/3`
- Avatar → `w-9 h-9 rounded-full`
- Card → full card with skeleton children

### When to skeleton vs spinner

- **Skeleton** — initial page load, list refresh. Anything the user will see filled with content shortly.
- **Spinner** — in-progress action with no preview ("Sending…", "Generating…"). Use Phosphor `CircleNotchIcon` with `animate-spin`, color `text-functional`.

### Streaming reveal

In the Reading Room, AI tokens stream character-by-character. The typing indicator (three dots) appears during the first 300ms before tokens start arriving. Once tokens arrive, the indicator stays at the end of the latest token until streaming finishes.

```tsx
<span className="inline-flex gap-1 ml-1">
  <span className="w-1 h-1 rounded-full bg-black/38 animate-pulse [animation-delay:0ms]" />
  <span className="w-1 h-1 rounded-full bg-black/38 animate-pulse [animation-delay:150ms]" />
  <span className="w-1 h-1 rounded-full bg-black/38 animate-pulse [animation-delay:300ms]" />
</span>
```

Stops pulsing under `prefers-reduced-motion`.
