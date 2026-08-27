# Tables

Bill lists, vote tallies, sponsor rosters. The default register is *roster-like*, not spreadsheet.

## Default table treatment

```tsx
<table className="w-full text-sm">
  <thead>
    <tr className="text-left">
      <th className="
        px-4 py-2 font-semibold text-xs uppercase tracking-chrome hexp-chrome
        text-black/55 border-b border-black/10
      ">Bill</th>
      {/* … */}
    </tr>
  </thead>
  <tbody>
    {rows.map(r => (
      <tr key={r.id} className="
        border-b border-black/[0.06]
        hover:bg-white/45 hover:backdrop-blur-material
        transition-[background] duration-200
      ">
        <td className="px-4 py-3 align-top">{/* … */}</td>
        {/* … */}
      </tr>
    ))}
  </tbody>
</table>
```

- **Header** — HEXP-60 chrome.
- **Cell typography** — by content: serif bold for title fields, sans normal for metadata, mono tabular-nums for vote counts and amounts.
- **Row dividers** — hairline `border-b border-black/[0.06]`. Never zebra-stripe.
- **Hover row** — `material-thin` plate appears under the row. Cursor `pointer` only if the row is clickable (most are).
- **Selected row** — `bg-primary/[0.05] ring-1 ring-inset ring-primary/30`.
- **Sortable header** — append a Phosphor `CaretUpDownIcon` / `CaretUpIcon` / `CaretDownIcon`. Active sort: full-opacity icon + `text-black/87`.

## Sticky table headers

Long bill lists need sticky headers. Use `sticky top-14 z-10 bg-white/95 backdrop-blur-material` on the `<thead>` (top offset = navbar height).

## Number columns

Right-align. `font-mono tabular-nums text-sm` so digits don't jitter when filtered/sorted.

## Bill list row pattern

When a row contains a bill, the standard layout is **number / title+meta / progress ribbon (compact) / status stamp**:

```
HB 21   Concerning local authority to enact…         ▓▓▓▓░░░░  [In Comm.]
        Bensky (D) · introduced 12 days ago
```

The compact progress ribbon is 4px tall, no labels. The status stamp uses the same component as the bill detail page, smaller (`text-xs` instead of `text-sm`).

**Row hover** — shift bg from `material-thin` to `material-regular` (don't just add a shadow; shadow-only hover is invisible in dark mode — see [`../dark-mode.md`](../dark-mode.md)):

```tsx
<tr className="
  bg-white/45 backdrop-blur-material
  hover:bg-white/85 hover:shadow-whisper
  dark:bg-black/26 dark:hover:bg-black/41
  ring-1 ring-inset ring-black/5
  transition-[background,box-shadow] duration-200
">…</tr>
```
