# Assets

Brand marks and civic-illustration assets.

| File | What it is | Where to use |
|---|---|---|
| `mark.svg` | **Primary mark** — the voting-button badge (parchment ring, indigo field, arch of stars over chamber columns) | app icon, avatars, favicon, lockups on light surfaces |
| `mark-cutout.svg` | Knockout version of the mark — white stroke + glyph, transparent field | dark surfaces, photography, the Midnight Indigo face of print pieces |
| `wordmark.svg` | **Primary wordmark** — "AMENDMENT", Archivo `wdth` 125, 430, uppercase, tracked 0.05em, slate-900 ink. **No terminal mark.** | navbar leading, chrome, anywhere the mark sits beside controls |
| `wordmark-cutout.svg` | Knockout wordmark — white, for dark chrome and photography | dark navbar, Midnight Indigo surfaces, print knockouts |
| `wordmark-caret.svg` | **Display lockup** — the wordmark closed by a proofreader's insertion caret. Use where there is room and no competing affordances. | marketing lockups, launch marks, the Receipt's issuing device, animated wordmarks |
| `wordmark-caret-cutout.svg` | Knockout of the caret lockup | the same, on dark |
| `three-stars.svg` | Three-star rule — the arch's stars extracted as a standalone divider | section dividers, card footers, between eyebrow and title |
| `signature.svg` | Handwritten signature | letters, Writing Desk sign-off, About pages |
| `team-signatures.svg` | Multi-signature block | co-signed letters, team statements |
| `aurora-still.svg` | Static rendering of the Blue Hour aurora — for paper exports / brand sheets | brand sheets, social cards |
| `guilloche-band.svg` | Procedural guilloche line-work band (top/bottom of Receipts) | Receipt surface, print edges |
| `icons/` | Social platform glyphs — `bluesky`, `linkedin`, `threads`, `twitter` | footers, contact blocks, business cards |

> **Mark construction:** the badge reads as a polling-place "I Voted" button. Arch of stars above, **chamber columns** below, set in Midnight Indigo on a parchment ring. The vertical bars are columns — a legislative chamber’s colonnade, not a flag. They were briefly described as "flag bars," which put the mark in direct conflict with the system’s ban on nationalist iconography; the geometry never changed, only the wrong name for it. Never recolor the field to Oxblood — Oxblood is reserved for the wordmark's terminal period and action states.

> **The terminal mark.** The wordmark carried an Oxblood full stop until August 2026. It was dropped on two grounds. A full stop means *this sentence is finished*, and the thesis is that the rule of law is a living document that the people keep writing — the punctuation contradicted the product. And with Oxblood retired to the wax seal, a red period in persistent chrome would have been the last place red survived as decoration rather than as a mark on an issued artifact, which the seal rule forbids.
>
> The **caret** lockup is the sanctioned alternative where there is space. `‸` is the proofreader's insertion mark — *something goes here* — a real editorial and legislative artifact and the literal gesture of amending a text. It is drawn as an **open two-stroke angle with a wide apex — roughly 95°**, 30.5 × 14 units against the wordmark's 56px em. The width is load-bearing. At the ~65° of a first attempt the caret is the same angle as the **A** in AMENDMENT with its crossbar removed, and the eye reads a tenth letter; *steepening* it makes that worse, because letters are tall and narrow. Past about 90° nothing in Archivo's uppercase is that squat, so the mark stops competing with the letterforms. The stroke is **3.2 units against the type's 4.2 stem** — a mark applied *to* the setting rather than a glyph *in* it. Never a filled triangle. Do **not** use it in persistent chrome: beside dropdowns, sort headers, and collapse toggles it reads as an affordance before it reads as punctuation. Chrome gets the clean mark.

> **Iconography:** Phosphor Icons is the canonical library. Use the web font (`<i class="ph ph-magnifying-glass">`) for static artifacts, `@phosphor-icons/react/ssr` for production. See README.md → Iconography.
