# Amendment — Living Document Design System

> The rule of law is a living document — rooted in history and institutions, but designed to evolve.

The design system for **Amendment**, a legislative-intelligence product. Every screen has two layers and no third: an **ink layer** that holds — Newsreader headings, Midnight Indigo, Momentum green — and an **aurora layer**, a Blue Hour gradient breathing beneath frosted glass.

**This file is a map.** [`DESIGN.md`](./DESIGN.md) is the spec and wins; [`DESIGN-HARD-RULES.md`](./DESIGN-HARD-RULES.md) is the checklist; [`CHANGELOG.md`](./CHANGELOG.md) holds the rationale. Keys in parentheses are DESIGN.md keys — read the key, not just the summary.

## The product

| Room | For | Register | Lead family |
|---|---|---|---|
| **Reading Room** | Conversations, AI research | Live | sans; serif for AI prose |
| **Archive** | Bill pages, statutes | Reading | serif |
| **Writing Desk** | Letters, call scripts | Writing | serif |
| **Receipt** | Certificates issued after an action | Issued | serif |
| **Commons** | Asks, co-signs, endorsements, candidate answers | Live | sans; serif for the ask |

The Commons stays on the aurora and never becomes an artifact. The Receipt is issued once and kept.

**Pick the register, not the room.** Rooms are how the team talks; registers carry the tokens (`registers`).

| Register | Canvas | Material | Column | Motion |
|---|---|---|---|---|
| **Live** | none (aurora) | `material-thin` | `--container-tight` | accrual only |
| **Reading** | `paper-cream` | `material-regular` | `.measure` | none |
| **Writing** | `paper-parchment` | `material-regular` | `.measure`, portrait | minimal |
| **Issued** | `paper-cream` | `paper-cream` | 34rem portrait | bloom once |

- A component that declares its own material outranks the register: a card is `material-regular` everywhere (`components.card.material-outranks-the-register`).
- **Green appears where a crowd is counted.** Conversation views are green-free (`registers.live.palette-rule`).
- **Glass for chrome, cards, modals. Paper for statutory text, letters, long analysis** (`canvases`). In the Archive only the verbatim bill text sits on paper.
- **Every issued artifact states its ledger number as text**, in every medium. The number is the proof (`registers.issued.proof-rule`).

**The Receipt is two artifacts** (`surfaces.receipt`).

- **Kept:** portrait HTML on `paper-cream`, single column, bloom at issuance. The emboss sits inline with the signature rule.
- **Shared:** a raster in three ratios — tall, square, wide — each authored at its own size and rendered at 2×, never scaled from another. The landscape proportion lives only in the wide export.
- Every ratio carries caption, title, ledger number, emboss and guilloche; only the wide may drop the attribution. Paper is full-bleed; no glass, aurora or motion; the emboss is never under 44px.

### Profiles

A profile is a register plus a substitution table: same tokens, poorer machinery (`profiles`).

- **Email** (`profiles.email`). A viewport, not a canvas: paper appears only under a paper artifact, so one message can hold two registers. Permanently reduced-transparency, with a flat aurora stand-in kept out of the token file. Reading and Issued have email forms; Live and Writing do not. No web fonts: Georgia, system sans and mono, Verdana chrome at 12px or more. Every colour solid. Both schemes: the indigo plate, green ink and links switch rather than darken. **The frame inverts; the artifact does not.** Issued mail is a notice linking to the artifact.
- **Print** (`profilesPrint`). Paper fills do not print; ink is re-based, not flattened; the emboss is suppressed and the ledger number carries the proof. The measure comes from the margin. The dotted signature rule is canonical. Nothing consequential on a fold; continuation headers after the first sheet. Requires the user’s postal address. See the `@media print` block and [`preview/print-profile.html`](./preview/print-profile.html).
- **Clerk** (`profilesClerk`). Account and sign-in forms, mapped through `--clerk-*`. Warning maps to `--color-warning`. Our own form layer is `input-text`, `input-textarea`, `input-label`.

## Index

- [`DESIGN.md`](./DESIGN.md) — the spec.
- [`DESIGN-HARD-RULES.md`](./DESIGN-HARD-RULES.md) — the checklist.
- [`SKILL.md`](./SKILL.md) — agent skill manifest.
- [`CLAUDE.md`](./CLAUDE.md) — repo instructions: precedence, how a change lands, CI.
- [`CHANGELOG.md`](./CHANGELOG.md) — rationale. Read it before re-arguing a rule.
- [`RATIFY.md`](./RATIFY.md) — the queue for proposed spec changes.
- [`colors_and_type.css`](./colors_and_type.css) — tokens and classes. [`styles.css`](./styles.css) imports it.
- [`fonts/`](./fonts/) — Archivo (self-hosted, `wdth` and `wght` axes, roman and italic) and Amerika Signature. Newsreader and IBM Plex Mono load from Google Fonts.
- [`assets/`](./assets/) — mark and wordmark in ink and cutout pairs, guilloche band, social icons.
- [`preview/`](./preview/) — specimens over [`preview/_card.css`](./preview/_card.css); each carries an `@dsCard` marker.
- [`tools/`](./tools/) — checks, documented in [`tools/README.md`](./tools/README.md):
  - `build-tokens.mjs` — regenerates the consumer’s token file; `--check` fails on drift.
  - `lint-rules.mjs` — adherence pass over a consumer’s source.
  - `check-retired.mjs` — greps this repo for banned values.
- [`Business Card/`](./Business%20Card/) — the business card.

Not guidance: [`proposed/`](./proposed/) (an unratified draft), `github.md` (a dated sync log), and the `HANDOFF-*`, `AUDIT-*` and `RECONCILIATION-*` records.

---

## Content fundamentals

- **Voice.** Calm, deliberate, modern. Never bureaucratic, never combative. Civic is not partisan.
- **Person.** Second person for the user (“you tracked this bill”), third-person institutional for the legislature. Never “we”.
- **Casing.** Sentence case for headings, navigation and UI text; title case only in proper nouns. Uppercase lives only in `role-label-caps`, `role-designation` and `role-ceremonial` (`typography.uppercase-has-two-homes`).
- **Reading Room** — precise, no apologetic hedging. Citations are numeric superscripts in primary ink.
- **Archive** — clerical; status stated, dates exact. Provenance in `role-metadata`: “started by Brad Feld”.
- **Writing Desk** — composed. Letterhead address blocks; “Dear Senators & Representatives,” — never “Hey!”.
- **Receipt** — formal civic: “Issued to”, “SIGNER NO. 2,301”, ledger numbers in mono.
- **The newcomer’s lede** (`surfaces.archive.newcomer-lede`). One sentence in `role-lede`, beneath the bill title and above provenance: second person, present tense, what the bill does to the reader. Then three facts — who it affects, where it stands, who represents you — then one action. Jargon is swapped for plain words or glossed in the same sentence; a tooltip is not a gloss. Under 25 words, no exclamation. Plain is not peppy.
- **The founder’s letter.** First person, signed, emoji as content, a P.S. allowed. The welcome email only.
- **Emoji** are content: user-assigned, on conversation cards. Never in navigation, status, buttons or system messages. No 🇺🇸 in the system’s voice.
- **These rules bind the system’s voice, not the user’s** (`typography.rules-bind-the-system-not-the-user`).
- **Unicode** only with a civic referent: `§` at full serif weight, `¶`, `·` in chrome labels.
- **Forbidden:** “Crushing it!”, “🎉 You did it!”. The Receipt is issued, not cheered; celebration is typographic, not copy.

---

## Visual foundations

### Colour

- **Midnight Indigo** (`--color-primary*`) is the user’s trail: default button, active nav, selected state, avatar. It is a plate colour; under inversion a primary mark resolves to neutral (`color.primary.plate-not-mark`).
- **Momentum green** (`--color-action*`; `--color-momentum` aliases it) is every action and the crowd, one colour. Its label is ink, `--color-action-label`; flat, never a gradient; the same in both schemes (`color.action.label-rule`). Every action plate takes a 1px `--color-action-active` ring (`components.button-cta.ring`).
- **The fill rule.** A green plate is a control; green ink is a report. Meters and ribbons are exempt (`color.action.fill-rule`). A tint is never a plate; status is ink on neutral material (`color.action.tint-is-not-a-plate`).
- **Semantic inks are pairs:** the base token on light, its `-soft` counterpart inverted (`color.ink-switch-is-palette-wide`). Green ink is `--color-success` on light, `--color-action` inverted; action green as text is forbidden (`color.action.fill-rule-which-green`). A green tint under green ink caps at 10%.
- **Coloured ink needs an opaque ground** (`--canvas`), not glass (`color.ink-needs-an-opaque-ground`). A contrast figure names its position (`color.ink-ground-is-a-placement`).
- **The seal** is a blind emboss, `.seal-emboss`: no colour, issued artifacts only, on paper (`color.seal`).
- **Slate Blue** (`--color-functional*`): focus, progress, icon-button hover. Never brand meaning.
- **Semantic** `--color-success`, `--color-warning`, `--color-danger`: conventional only. No red but danger, no amber but warning, no violet, pink or magenta.
- **Text** is `--text-primary`, `--text-secondary`, `--text-tertiary` — opacity on black or white, Apple’s three rungs. Tertiary is decorative only (`a11y.contrast.tertiary-rung`).
- **Canvases:** `--canvas` is the opaque ground, `--canvas-live` the Blue Hour base. Not interchangeable (`color.canvas-two-names`).

### Typography

- **Newsreader** (`--font-serif`) — headings on the canvas and the record. Always at an optical stop: `--serif-display`, `--serif-text`, `--serif-quote`.
- **Archivo** (`--font-sans`) — width and weight axes, a drawn italic. Registers are the presets `--sans-body`, `--sans-chrome`, `--sans-display`, `--sans-ceremonial`; `--sans-body` sits off the axis default on purpose. Chrome and ceremonial share a width and differ by tracking (`--track-chrome`, `--track-ceremonial`) and size (`typography.widthPresets`). Declare `wdth` wherever Archivo loads and verify it by measurement (`typography.axis-must-be-declared-and-measured`).
- **One weight scale**, `--sans-thin` … `--sans-black`. Cite the token, never the number. No dark-only type metric (`typography.notes.darkMetrics-invariant`).
- **IBM Plex Mono** (`--font-mono`) — strings a person reads or copies: `§ 791.02(1)`, line numbers, `<code>`, live tallies. A bill number is a referent, not mono.
- **Amerika Signature** (`--font-signature`) — signatures only.

**Take the role; never rebuild it** (`typography.composed-register-fails-silently`).

| Role | Use |
|---|---|
| `role-display-hero` · `-section` · `-minor` | Serif canvas headings, by outline depth |
| `role-ui-heading` | Sans heading inside a container |
| `role-body` · `role-body-serif` · `role-body-lead` · `role-lede` | Body text; the newcomer’s lede |
| `role-label-caps` | Chrome label: the section divider and the status stamp only (`typography.chrome-sites-are-closed`) |
| `role-designation` | Bill slug or code leading a row or card |
| `role-ceremonial` | Display designation, once per page |
| `role-metadata` · `role-metadata-sans` | Who, when, how — serif on canvas, sans in containers |
| `role-caption` · `role-quote` · `role-code` | Captions; quoted voice; mono |
| `role-stat-display` · `role-signature` | Hero numerals; the user’s affirmed name |

The CTA lives in the Button component’s `cta` variant; `role-action` is for specimens (`components.button-cta.implementation-home`).

- **Serif belongs to the canvas.** Inside a container the heading is `role-ui-heading`, unless the container holds the record (`typography.notes.serif-belongs-to-the-canvas`).
- **Could a second card join under this title?** Yes: above the card, serif. No: inside, sans. Never both (`typography.notes.a-heading-belongs-to-whoever-it-works-for`).
- **A count is ink, not a pill,** in its heading’s voice (`components.count-is-ink-not-a-plate`). **Nav labels take `role-body`** (`components.nav-labels-are-not-chrome`).
- **Italic.** Serif italic is quoted human voice at 1.125rem and up (`role-quote`). Smaller serif emphasis is roman semibold (`typography.roles.emphasis-serif-inline`). Sans emphasis uses Archivo’s italic. Metadata is roman.
- **12px floor, no chrome exception.** Measure the string at 12px in its container before touching the layout (`typography.measure-before-you-shrink`).

### Backgrounds

- `--aurora` over `--canvas-live`, painted by `.amendment-app`. It breathes slowly, never aggressively.
- **Limits:** lobe chroma ≤ 0.22, at most five lobes, and `--text-secondary` clears 4.5:1 at every point of the band in both schemes (`a11y.contrast.band-is-bounded`). **Blend by removing the plate, never by lowering ink.**
- No full-bleed photography, no repeating patterns.
- **Paper** (`.paper-cream`, `.paper-parchment`) is opaque. In the dark room it stays light under a lamp and keeps light-mode ink; mark it `data-paper`.
- Dark mode is class-based — `.dark` or `[data-theme="dark"]` — never the OS preference.

### Spacing, measure, radii, borders

- A 4px unit: `--space-*`. Containers are shells: `--container-tight`, `--container-normal`, `--container-wide`.
- **A measure is not a container.** `.measure` and `.measure-lede` cap the element holding the text, in rem from a counted line; a count is a band (`spacing.measure`). Sans body copy has no counted measure yet.
- **No length in `ch`,** in tokens or prose (`spacing.measure.rule`). A measure and horizontal padding never share a box.
- `--radius-sm` inputs and pills; `--radius-md` buttons and cards; `--radius-lg` modals, FAB, overlays; `--radius-full` unlabelled surfaces only (`radii.full-is-for-unlabelled`). Bigger than a modal is a page, and pages don’t have corners.
- `--border-hairline` rings translucent cards; `--border-subtle` separates more; `--border-dashed-empty` belongs to `card-placeholder`.

### Elevation and materials

- **Five shadow tiers**, shadow only, never transform, slate-900 ink (`elevation`): `.shadow-flat` (rest), `-whisper` (thin glass, ghost hover), `-raised` (cards), `-floating` (modals, FAB, dropdowns), `-chrome` (with `material-chrome`). No other shadows.
- **Five blurred glass tiers:** `.material-ultrathin` (toggles, input backings), `-thin` (Live default), `-regular` (cards, forms), `-thick` (modals, dropdowns), `-chrome` (mobile tab bar). Dark tiers take the canvas’s hue (`materials.dark-glass-takes-the-canvas-hue`).
- **Desktop chrome takes no material:** navbar and rail ink sits on the aurora (`components.navbar`). Chrome keeps a material where content scrolls beneath it (`components.recession-requires-nothing-scrolls-beneath`).
- Under `prefers-reduced-transparency` glass turns opaque and layout does not shift.

### Interaction

- **Hover:** one background step, one shadow tier. No `scale()`, no `brightness()`, no `transition-all`.
- **Press:** a toggle’s track dims (`active:opacity-80`); a default button steps its gradient darker; an action plate steps to `--color-action-active`, never more fill.
- **Focus:** always slate and visible — `--focus-color`, `--focus-width`, `--focus-offset` — suppressed only for mouse focus. Controls in a recess or track ring inset (`a11y.focusRing`).
- **Targets** at least 44px, 48px for the CTA — by `min-height` or an expanded hit area, never padding. Links inside a sentence are exempt (`a11y.targetSize`).

### Motion

- Transition only background, box-shadow, color, opacity and ring, on `--duration-*` and `--ease-*`.
- **Two surfaces move** (`motion.rules`). The **Receipt blooms** once at issuance — aurora deepens, emboss presses, guilloche draws on, ledger counts up — then is static (`celebration`). The **Commons accrues** under real collective action — counts climb, the threshold meter warms toward emerald — then holds (`surfaces.commons.motion-discipline`). Neither mechanic appears elsewhere.
- **Not motion:** a control drawing a state the user just set, content arriving, the aurora breathing. Marketing motion stays pausable and off record state.
- **Chrome is still.** Nothing moves on hover. `prefers-reduced-motion` clamps everything.

### Tactile accents

Each accent references a real civic artifact **and** carries meaning; ornament is forbidden (`tactileAccents.rule`). One owner: Jason.

- **Canonical** — rubber-stamp status, guilloche, progress ribbon. Each names its implementation file.
- **Proposed** — postmark, jurisdiction seal, ruled page, line numbers, the seal, signature line, folder-tab step, lapel pin, envelope preview. Each names its blocking gate and ships only after clearing owner, implementation, specimen and purpose (`tactileAccents.promotion.gates`).
- The Receipt’s watermark is not the seal. Guilloche is procedural at its rendered width, on the Receipt only; the shipped band is scaled and owes a redraw.
- Stamps: green ink for enacted, slate for procedural, `--color-warning` for vetoed, `--color-danger` for dead.

### Loading, cards, forms

- **Loading promises shape, never count** (`loading`): one `.skeleton-row`, settling downward. `.spinner-inline` only for in-place waits. Zero results are `card-empty`’s job.
- **Cards** are `material-regular`, `--radius-md`, 16px padding (`components.card`). No coloured left borders, no tinted cards: status is a dot, badge or stamp.
- `card-empty` is content that did not arrive; `card-placeholder` awaits someone’s input (`components.card-empty.two-components-not-one`).
- Avatars are Midnight Indigo. Identity fields carry a label; a placeholder is never the name (`components.input-label`).

### Signatures and imagery

- **The script face renders your affirmed name, on your receipt, for your act** (`signature`). Never another person’s name, never an unaffirmed one. No name: serif “A constituent”. Script is banned everywhere else.
- Imagery is vector, procedural, monochromatic slate; illustration is flat with a 1px hairline ring. No stock photography, no photographic texture, no bevels.

---

## Iconography

- **Phosphor only, never Lucide.** Specimens use the web font (`<i class="ph ph-magnifying-glass">`); production uses `@phosphor-icons/react/ssr`, with `Icon`-suffixed names.
- **Weights:** `regular` by default; `fill` for active states — *the user is here*; `light` for the empty-state glyph; `bold` for 12–14px inline icons.
- **An icon earns its place** by replacing or disambiguating text, signalling state, aiding wayfinding, or being content. Beside a label naming the same thing, it is noise.
- **Marks** come from [`assets/`](./assets/); never redraw them. Ink variants for light grounds, cutouts for dark only; 3:1 non-text floor (`components.a-cutout-mark-is-for-dark-grounds-only`).
- **A jurisdiction’s own flag or chamber seal at badge scale** identifies its records and is sanctioned. Flags as decoration are not.

---

## Working with this system

1. Read [`DESIGN-HARD-RULES.md`](./DESIGN-HARD-RULES.md), then the DESIGN.md keys for your surface.
2. Link [`colors_and_type.css`](./colors_and_type.css); put `.amendment-app` on the shell. Never type a value a token owns.
3. Pick the register. Build from roles and [`preview/`](./preview/). Read production in `resistbot/voyager` as evidence, not authority.
4. Render both schemes at phone and desktop widths. Measure colour by painting, never by parsing (`a11y.measure-by-painting-not-by-parsing`).
5. Run `node tools/check-retired.mjs`.
6. Spec clear, code wrong: fix the code. Spec silent: append to [`RATIFY.md`](./RATIFY.md) with the render.

**Open** (`openQuestions`): who writes each bill’s plain sentence is owned, not answered. The jurisdiction seal’s form is undecided.
