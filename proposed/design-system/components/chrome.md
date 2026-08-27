# Chrome

The persistent UI scaffolding: navbar, mobile tabbar, breadcrumb, modal. Lives in `components/chrome/*` (or `components/ui/*` depending on codebase organization).

## Navbar

Sticky top, always `material-chrome`, height 56px, three-column flex inside `max-w-wide`. **Does not animate on scroll** — the navbar is always chrome, never fades in.

```tsx
<header className="
  sticky top-0 z-50 h-14 px-6
  bg-white/75 backdrop-blur-material-chrome
  shadow-chrome
  flex items-center
">
  <div className="max-w-wide mx-auto w-full grid grid-cols-[1fr_auto_1fr] items-center gap-4">
    <div className="flex items-center gap-3.5">
      <Wordmark />
    </div>
    <nav className="flex items-center gap-1">
      <NavLink active={pathname === "/conversation"}>
        <ChatsCircleIcon weight="fill" /> Conversations
      </NavLink>
      {/* … */}
    </nav>
    <div className="flex items-center gap-2 justify-end">
      <IconButton><MagnifyingGlassIcon /></IconButton>
      <IconButton><BellIcon /></IconButton>
      <Avatar initials="JH" />
    </div>
  </div>
</header>
```

NavLink labels are HEXP-60: `uppercase tracking-chrome hexp-chrome text-xs font-semibold text-black/55 hover:bg-black/5 hover:text-black/87`. Active state: `text-black/87 bg-primary/[0.06]`, Phosphor icon switches to `weight="fill"`.

---

## Tabbar (mobile bottom navigation)

`material-chrome`, fixed bottom inset-x, visibility `< sm` breakpoint only. Active color is `text-primary` (light) / `text-functional-light` (dark) — Midnight Indigo trail. Label typography is HEXP-60 10px uppercase tracking-wider.

```tsx
<nav className="
  fixed bottom-0 inset-x-0 z-40 sm:hidden h-[64px]
  bg-white/75 dark:bg-zinc-900/90 backdrop-blur-material-chrome
  ring-1 ring-inset ring-black/10 dark:ring-white/10
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

Four items max. Page adds `pb-[80px]` on `< sm` to clear the tabbar. See also [`../patterns/mobile.md`](../patterns/mobile.md).

---

## Breadcrumb

```tsx
<nav aria-label="Breadcrumb" className="
  inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-chrome hexp-chrome
  text-black/55
">
  <a href="/oversight" className="hover:text-black/87">Oversight</a>
  <CaretRightIcon className="text-black/38 text-[10px]" />
  <span>Colorado</span>
  <CaretRightIcon className="text-black/38 text-[10px]" />
  <span className="text-black/87 font-bold">HB 21</span>
</nav>
```

Separator is Phosphor `CaretRightIcon` at 12px, tertiary text. Active (last item) gets `text-black/87 font-bold`.

---

## Modal

Glass tier `material-thick`, rounded-lg, padding 1, floating shadow. Backdrop is `bg-zinc-200/40 dark:bg-black/40 backdrop-blur-xl`.

```tsx
<div className="fixed inset-0 z-50 bg-zinc-200/40 backdrop-blur-xl">
  <div role="dialog" className="
    fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
    max-w-lg w-full rounded-lg
    bg-white/95 backdrop-blur-material shadow-floating
    ring-1 ring-inset ring-black/15
    p-6
  ">…</div>
</div>
```

Trapped focus inside while open. First focusable element gets focus on open. Return focus to trigger on close. Dismiss on outside click or `Esc`.

For interactive flyouts that aren't full dialogs (sponsor previews, filter editors), use a popover — see [`../patterns/feedback.md`](../patterns/feedback.md).
