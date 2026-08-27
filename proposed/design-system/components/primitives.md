# Primitives

The reusable shared components in `components/ui/*`. Cover ~80% of UI surface area.

Before building anything here, check the [README's "before building" callout](./README.md#️-before-building-a-new-component) — most likely it already exists.

## Button

The workhorse. Five variants.

```tsx
// Default — Midnight Indigo. The most common button.
<button className="
  inline-flex items-center gap-2 px-4 py-2.5 rounded-md
  bg-gradient-to-b from-primary-light to-primary
  text-white font-semibold text-sm
  ring-1 ring-inset ring-black/5
  transition-[background,box-shadow] duration-200 ease-standard
  hover:from-primary hover:to-primary-dark hover:shadow-raised
  active:from-primary-dark active:to-primary-dark
  focus-visible:outline-2 focus-visible:outline-functional focus-visible:outline-offset-4
  disabled:opacity-50 disabled:cursor-not-allowed
">…</button>

// CTA — Oxblood. Reserved for action moments.
<button className="
  …shared layout…
  bg-[radial-gradient(at_50%_30%,theme(colors.action.light),theme(colors.action.DEFAULT))]
  text-white font-semibold
  hover:bg-[radial-gradient(at_50%_30%,#b91c1c,theme(colors.action.light))] hover:shadow-raised
">Send the letter</button>

// Secondary — material-regular plate.
// CRITICAL: hover MUST shift the bg, not just the shadow — shadow-only hover is
// invisible in dark mode (slate-900 ink on slate-900 backdrop).
<button className="
  …shared layout…
  bg-white/85 backdrop-blur-material text-black/87
  ring-1 ring-inset ring-black/10
  dark:bg-black/40 dark:text-white/87 dark:ring-white/10
  hover:bg-white/95 hover:shadow-floating hover:ring-black/15
  dark:hover:bg-black/55 dark:hover:ring-white/15
">Secondary</button>

// Ghost — material-ultrathin, rounded-lg, secondary text. Sample-question chips.
// Bg shifts ultrathin→thin on hover so it stays visible in dark mode.
<button className="
  inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg
  bg-white/10 backdrop-blur-material text-black/55 font-medium
  ring-1 ring-inset ring-black/5
  dark:bg-black/[0.02] dark:text-white/55 dark:ring-white/5
  hover:bg-white/45 hover:text-black/87
  dark:hover:bg-black/26 dark:hover:text-white/87
  text-sm
">Sample question</button>

// Icon — bare. Slate on hover, never amber.
<button className="
  inline-flex items-center justify-center w-11 h-11 rounded-lg
  text-black/87 hover:bg-black/5 hover:text-functional
  transition-colors duration-200 ease-standard
">
  <MagnifyingGlassIcon size={20} weight="regular" />
</button>
```

**Sizes.** Default is `px-4 py-2.5 text-sm`. Use `px-3 py-2 text-xs` for `size="sm"` and `px-5 py-3 text-base` for `size="lg"`.

**Never:** `hover:scale-[1.02]`, `transition-transform`, `transition-all`, `hover:brightness-110`.

---

## FAB (Floating Action Button)

Oxblood, fixed bottom-right. Appears only where the primary action is ambiguous or discovery-driven. The wax seal on the correspondence.

```tsx
<button className="
  fixed right-6 bottom-6 z-40
  w-14 h-14 rounded-lg
  bg-[radial-gradient(at_50%_30%,theme(colors.action.light),theme(colors.action.dark))]
  text-white inline-flex items-center justify-center
  shadow-floating
  transition-[background] duration-200 ease-standard
  hover:bg-[radial-gradient(at_50%_30%,#b91c1c,theme(colors.action.DEFAULT))]
  focus-visible:outline-2 focus-visible:outline-functional focus-visible:outline-offset-4
">
  <EnvelopeIcon size={24} weight="bold" />
</button>
```

Mobile: 48 × 48 (`w-12 h-12`). Desktop: 56 × 56. On mobile with tabbar, sits at `bottom-[80px]` to clear the tabbar.

---

## Input (text field, textarea)

A quiet recess on a translucent plate. The fill is intentionally faint; the inset shadow and 1px inset ring do the recess work.

```tsx
<label className="block">
  <span className="
    block mb-1.5 text-xs font-semibold tracking-chrome uppercase
    text-black/55 dark:text-white/55 hexp-chrome
  ">Your representative</span>
  <input
    type="text"
    placeholder="Senator Jane Doe"
    className="
      w-full px-3.5 py-2.5 rounded-sm text-sm text-black/87
      bg-black/5 dark:bg-white/[0.06]
      shadow-[inset_0_2px_4px_0_rgb(0_0_0/0.05)]
      ring-1 ring-inset ring-black/10 dark:ring-white/10
      placeholder:text-black/38
      focus:outline-none focus:ring-2 focus:ring-functional
      transition-[box-shadow] duration-200 ease-standard
    "
  />
</label>
```

**Textarea** uses the same field classes plus `resize-y min-h-[80px] leading-6`.

Validation states + multi-step form patterns: see [`../patterns/forms.md`](../patterns/forms.md).

---

## Toggle

44 × 24 track, 16px thumb. Translate-only motion. Press feedback comes from `active:opacity-80` on the track — **never** thumb scale (violates the no-transform rule).

```tsx
<button
  role="switch"
  aria-checked={on}
  className={`
    inline-flex items-center w-11 h-6 rounded-full p-1
    transition-[background,opacity] duration-200 ease-standard
    active:opacity-80
    ${on
      ? "bg-white/[0.18] backdrop-blur-material ring-1 ring-inset ring-black/10"
      : "bg-black/5 dark:bg-white/5"}
  `}
  onClick={() => setOn(!on)}
>
  <span className={`
    w-4 h-4 rounded-full bg-black/87 dark:bg-white/87
    transition-transform duration-200 ease-standard
    ${on ? "translate-x-5" : "translate-x-0"}
  `} />
</button>
```

---

## Card

Default — `material-regular` plate.

```tsx
<div className="
  rounded-md p-5
  bg-white/85 backdrop-blur-material
  ring-1 ring-inset ring-black/10
  shadow-raised
  dark:bg-black/40 dark:ring-white/10
">…</div>
```

Variants:
- **thin** — `bg-white/45 ring-black/5`, no shadow. Tiles, secondary containers.
- **empty** — `bg-transparent border-2 border-dashed border-black/30 text-center p-10 text-black/38`. Empty-state placeholders only.

**Forbidden:** colored left-border accents, solid paint fills, drop-shadow faux-3D, rounded corners ≥ `lg` (cards aren't modals).

---

## CardSelect (radio tile group)

Jurisdiction picker, topic picker, destination picker.

```tsx
<div className="grid gap-3 grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
  {options.map(opt => (
    <button
      role="radio"
      aria-checked={value === opt.value}
      onClick={() => onChange(opt.value)}
      className={`
        flex flex-col gap-1 p-4 rounded-md text-left
        bg-white/45 backdrop-blur-material
        ring-2 ring-inset transition-[background,box-shadow] duration-200 ease-standard
        ${value === opt.value
          ? "ring-primary bg-primary/[0.05]"
          : "ring-black/[0.08] hover:bg-white/70"}
      `}
    >
      <Icon name={opt.icon} weight={value === opt.value ? "fill" : "regular"}
            className="text-primary text-[22px] mb-1" />
      <span className="font-serif font-bold text-[15px]">{opt.label}</span>
      {opt.sub && (
        <span className="font-serif italic text-xs text-black/55">{opt.sub}</span>
      )}
    </button>
  ))}
</div>
```

The selected tile fills the Phosphor icon (user's trail = fill weight).

---

## Avatar (wax-seal monogram)

User avatars are stamped in Oxblood — a seal, not a highlight.

```tsx
<span className="
  inline-flex items-center justify-center w-9 h-9 rounded-full
  bg-[radial-gradient(circle_at_50%_35%,#991b1b,#7f1d1d_60%,#450a0a)]
  text-[#fefce8] font-bold text-xs
  shadow-[inset_0_-1px_1px_rgb(0_0_0/0.2)]
">{initials}</span>
```

Sizes: 36 (default), 56 (large profile), 28 (compact lists).

For *featured* civic entities (sponsors, jurisdiction leads), use **LapelPin** (see [civic.md](./civic.md)) — iconographic, not monogrammed.

---

## Chip (sample question / filter)

`material-ultrathin`, `rounded-lg`, secondary ink. Distinct from `button-secondary`.

```tsx
<button className="
  inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-sm font-medium
  bg-white/10 backdrop-blur-material text-black/55
  ring-1 ring-inset ring-black/5
  hover:bg-white/45 hover:text-black/87
  transition-[background,color] duration-200 ease-standard
">{children}</button>
```

> **Pills imply interactivity.** `rounded-full` containing a spelled-out word reads as a filter button. For full party names or full status labels, use plain secondary text. The pill metaphor is reserved for compact abbreviations (D/R/I, status dots).

---

## EmptyState

Never blank. Phosphor illustration icon at `weight="light"` 48px, centered inside a dashed `card-empty`, with a sans-serif label naming the missing thing.

```tsx
<div className="
  rounded-md border-2 border-dashed border-black/30 dark:border-white/30
  p-10 text-center text-black/38 dark:text-white/38
">
  <FilesIcon weight="light" size={48} className="mx-auto" />
  <div className="mt-3 font-serif font-bold text-[15px] text-black/55">
    No bills tracked yet
  </div>
  <div className="mt-1 font-serif italic text-xs text-black/38">
    Tracked bills appear here as soon as you start a watchlist.
  </div>
</div>
```

---

## Separator

```tsx
<hr className="h-px my-1 border-0 bg-black/10 dark:bg-white/10" />
```

---

## Link

Underlined by default. Decoration color is tertiary; hover lifts to primary.

```tsx
<a className="
  underline decoration-black/38 underline-offset-4
  hover:decoration-black/87
  transition-[color,text-decoration-color] duration-200 ease-standard
">…</a>
```

Focus-visible offset is 8px.

---

## ProgressBar (page-load)

2px slate, top of viewport. **Never** amber, never the primary, never gradient.

```tsx
<div className="fixed top-0 inset-x-0 z-[60] h-0.5 bg-functional/70" />
```
