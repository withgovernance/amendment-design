# Mobile & responsive

Tailwind breakpoints: `sm:640 / md:768 / lg:1024 / xl:1280 / 2xl:1536`.

## Layout rules per breakpoint

- **`< sm` (mobile)** — Tabbar visible at bottom. Navbar middle nav collapses to hamburger. Page padding `px-4`. Cards full-width with `rounded-md`. Multi-column grids collapse to single column.
- **`sm` to `md`** — Tabbar hides. Navbar middle nav shows. Page padding `px-6`. Two-column card grids appear where useful.
- **`md+`** — Sidebar (where present) becomes visible. Two-pane layouts (bill detail with sponsor sidebar) appear.
- **`lg+`** — Three-column where useful (e.g. Reading Room with conversations list + chat + sources panel).

## Touch targets

Already the hard floor: **44 × 44px**. On mobile, give Phosphor icons in nav items 24px (not 20px). Increase button vertical padding one step on `< sm`.

## Mobile tabbar

Bottom-fixed, `material-chrome`. Four items max. Each item: 24px Phosphor icon (fill for active, regular otherwise) + HEXP-60 10px label.

```tsx
<nav className="
  fixed bottom-0 inset-x-0 z-40 sm:hidden h-[64px]
  bg-white/75 dark:bg-zinc-900/90 backdrop-blur-material-chrome
  ring-1 ring-inset ring-black/10
  flex items-stretch
">
  {tabs.map(t => (
    <button key={t.key} className={`
      flex-1 flex flex-col items-center justify-center gap-0.5
      ${active === t.key ? "text-primary dark:text-functional-light" : "text-black/55 dark:text-white/55"}
    `}>
      <Icon name={t.icon} weight={active === t.key ? "fill" : "regular"} size={24} />
      <span className="text-[10px] font-semibold uppercase tracking-wider hexp-chrome">
        {t.label}
      </span>
    </button>
  ))}
</nav>
```

The page adds `pb-[80px]` on `< sm` to clear the tabbar.

## Letter/Receipt on mobile

Paper canvases shrink padding to `p-6` on mobile (from `p-16`). The letter remains 100% width up to its natural `max-w` cap; never side margins on mobile.

## Read-back on mobile

Bill text uses `prose-sm` (Tailwind Typography) on mobile, `prose-base` on `md+`. Line numbers remain in a 1.5rem gutter (smaller than the desktop 2rem) — still IBM Plex Mono 11px.

## Don't

- Don't hide chrome on scroll to "save space" — the navbar is always chrome.
- Don't compose with hamburger-only nav. Tabbar is the primary mobile nav; hamburger opens a secondary drawer for less-used destinations.
- Don't put the FAB anywhere except bottom-right. On mobile with a tabbar, FAB sits *above* the tabbar, with `bottom-[80px]`.
