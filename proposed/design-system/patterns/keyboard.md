# Keyboard shortcuts

A research product needs them. Inventory:

| Shortcut | Action | Where |
|---|---|---|
| `⌘K` / `Ctrl+K` | Open global search | Anywhere |
| `⌘/` | Toggle keyboard shortcuts help | Anywhere |
| `⌘↵` | Submit composer (chat or letter) | Reading Room, Writing Desk |
| `Esc` | Close modal / popover / palette | When one is open |
| `↑↓` | Navigate result list | Search, autocomplete |
| `↵` | Open selected result | Search, autocomplete |
| `gh` | Go home | Anywhere |
| `gb` | Go to Bills list | Anywhere |
| `ga` | Go to Activity | Anywhere |
| `gc` | Go to Conversations | Anywhere |
| `t` | Track current bill (Archive) | Bill detail |
| `w` | Write your rep about current bill | Bill detail |
| `[` `]` | Previous / next bill in list | Bill detail |

## Surfacing shortcuts in the UI

- Tooltips on buttons include the shortcut: *"Track this bill (`t`)"*.
- The keyboard-shortcuts modal (`⌘/`) lists all of them, grouped by surface.
- Visible kbd hints use `<kbd>` styled as a small `material-thin` chip with mono text.

```tsx
<kbd className="
  inline-block px-1.5 py-0.5 rounded-sm
  bg-white/45 backdrop-blur-material ring-1 ring-inset ring-black/10
  font-mono text-[11px] text-black/87
">⌘K</kbd>
```
