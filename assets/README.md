# Assets

Brand marks and civic-illustration assets.

**The logo is the voting button beside the wordmark, button first** (`DESIGN.md` → `the-logo-is-the-button-and-the-wordmark`): the wordmark set in `role-label-caps`, `--text-primary`, a sixth of the button’s diameter away (`--space-1` beside a 24px button). Where space is tight the button stands alone; the wordmark never does. On dark grounds use the cutouts.

| File | What it is | Where to use |
|---|---|---|
| `mark.svg` | **Primary mark** — the voting-button badge (parchment ring, indigo field, arch of stars over chamber columns) | the logo’s leading half; alone where space is tight: app icon, favicon, avatars, OG cards |
| `mark-cutout.svg` | Knockout version of the mark — white stroke + glyph, transparent field | dark surfaces, photography, the Midnight Indigo face of print pieces |
| `wordmark.svg` | **Wordmark** — "AMENDMENT", Archivo `wdth` 125, uppercase, tracked 0.05em. Its weight is open (`DESIGN.md` → `wordmark-metrics`). | only beside the button, as the logo’s second half; never alone |
| `wordmark-cutout.svg` | Knockout wordmark — white | beside `mark-cutout.svg` on dark grounds; never alone |
| `wordmark-caret.svg` | **Concept, never shipped** — the wordmark closed by a proofreader’s insertion caret | not for use |
| `wordmark-caret-cutout.svg` | Knockout of the caret concept | not for use |
| `three-stars.svg` | Three-star rule — the arch's stars extracted as a standalone divider | section dividers, card footers, between eyebrow and title |
| `signature.svg` | Handwritten signature | letters, Writing Desk sign-off, About pages |
| `team-signatures.svg` | Multi-signature block | co-signed letters, team statements |
| `aurora-still.svg` | Static rendering of the Blue Hour aurora — for paper exports / brand sheets | brand sheets, social cards |
| `guilloche-band.svg` | Procedural guilloche line-work band (top/bottom of Receipts) | Receipt surface, print edges |
| `icons/` | Social platform glyphs — `bluesky`, `linkedin`, `threads`, `twitter` | footers, contact blocks, business cards |

> **Mark construction:** the badge reads as a polling-place "I Voted" button. Arch of stars above, **chamber columns** below, set in Midnight Indigo on a parchment ring. The vertical bars are columns — a legislative chamber’s colonnade, not a flag. They were briefly described as "flag bars," which put the mark in direct conflict with the system’s ban on nationalist iconography; the geometry never changed, only the wrong name for it.

> **The caret concept** has never shipped and is outside the shipped set; its construction is kept here for the record. `‸` is the proofreader's insertion mark — *something goes here* — a real editorial and legislative artifact and the literal gesture of amending a text. It is drawn as an **open two-stroke angle with a wide apex — roughly 95°**, 30.5 × 14 units against the wordmark's 56px em. The width is load-bearing. At the ~65° of a first attempt the caret is the same angle as the **A** in AMENDMENT with its crossbar removed, and the eye reads a tenth letter; *steepening* it makes that worse, because letters are tall and narrow. Past about 90° nothing in Archivo's uppercase is that squat, so the mark stops competing with the letterforms. The stroke is **3.2 units against the type's 4.2 stem** — a mark applied *to* the setting rather than a glyph *in* it. Never a filled triangle.

> **Iconography:** Phosphor Icons is the canonical library. Use the web font (`<i class="ph ph-magnifying-glass">`) for static artifacts, `@phosphor-icons/react/ssr` for production. See README.md → Iconography.
