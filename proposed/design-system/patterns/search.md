# Search

Search is core to a research product. Three search surfaces:

## Global search (`⌘K` palette)

`material-thick` modal centered, `rounded-lg`, max-width `lg` (32rem). Composed of:
1. Input field at top — Phosphor `MagnifyingGlassIcon` leading, placeholder *"Search bills, jurisdictions, conversations…"*
2. Results below grouped by type — Bills, Jurisdictions, Past conversations, Help
3. Keyboard hints in footer — `↑↓ navigate · ↵ open · esc close`

Each result row: type icon + serif title + italic-serif metadata + keyboard shortcut hint on the right.

## Inline filter search

Above tables (bill list, vote list). Input field with `MagnifyingGlassIcon` leading, `XIcon` trailing to clear. Use `material-regular` plate.

Filter chips appear below the input as the user adds filters: status, jurisdiction, sponsor, date. Each chip is removable with an inline `XIcon`. Use the standard `Chip` component.

## Autocomplete

When the user is typing in a field that expects a known entity (representative name, jurisdiction, bill number), show a `material-thick` dropdown below the input. Max 6 results. Selected result fills the field; pressing `↑↓` navigates; `↵` confirms.

Result row layout: icon + serif name + italic-serif disambiguator. Highlighted match characters use `bg-functional/20` (slate highlight, never amber).
