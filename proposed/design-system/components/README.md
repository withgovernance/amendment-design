# Components

Two layers of recipes:

## Atomic recipes (by codebase directory)

| File | Covers | Codebase |
|---|---|---|
| [primitives.md](./primitives.md) | Button, FAB, Input, Toggle, Card, CardSelect, Avatar, Chip, EmptyState, Separator, Link, ProgressBar | `components/ui/*` |
| [chrome.md](./chrome.md) | Navbar, Tabbar, Breadcrumb, Modal | `components/chrome/*` |
| [civic.md](./civic.md) | Tactile accents — RubberStamp, Postmark, WaxSeal, Guilloche, ProgressRibbon, LapelPin, FolderTabSteps, etc. | `components/civic/*` |

## Surface compositions (how the atoms assemble per room)

| File | The room |
|---|---|
| [reading-room.md](./reading-room.md) | Reading Room — conversations, AI dialogue |
| [archive.md](./archive.md) | Archive — bill pages, statutes, lists |
| [writing-desk.md](./writing-desk.md) | Writing Desk — letter composition (aspirational) |
| [receipt.md](./receipt.md) | Receipt — certificate artifacts (aspirational) |

## Before building

**Grep first.** The atoms above cover ~95% of cases. If you can't reuse one, extend (add a `variant` prop) rather than fork. Common gotchas:

- `PartyChip` already exists for D/R/I caucus badges. Don't recreate.
- `OfficialBubble` already exists for legislator avatars. Don't recreate.
- The five `Button` variants cover the whole space. Don't introduce a sixth.

For end-to-end composition walkthroughs (how primitives + chrome + civic + patterns assemble for a real screen), see [`../examples/`](../examples/).

For the full pre-merge gate, see [`../CHECKLIST.md`](../CHECKLIST.md).
