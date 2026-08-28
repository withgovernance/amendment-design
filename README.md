# Amendment — Living Document Design System

> The rule of law is a living document — rooted in history and institutions, but designed to evolve.

This is the design system for **Amendment**, a legislative-intelligence product whose thesis is encoded directly in the visual language: an **ink layer** (Newsreader headings, Midnight Indigo ink, Momentum green action) that holds, and an **aurora layer** (a low-chroma Blue Hour gradient) that breathes beneath frosted glass. *Ink beneath, living breath above — and now, the crowd.*

The product's center of gravity has moved from **understanding to acting** — from the solitary reader to the constituent who wants to be heard, and from one letter to a district that gathers behind a single demand. The system still reads the law beautifully, but it now also carries the momentum of a movement. *The people are the document's authors.*

This system is sourced verbatim from the canonical [`DESIGN.md`](./DESIGN.md) (≈3,250 lines) included in this project. The implementation reference repo, [`resistbot/voyager`](https://github.com/resistbot/voyager), is **readable** — see [`github.md`](./github.md) for the sync record and screen map. The recreations in `ui_kits/` predate that access, are spec-derived, and are kept as an archive; do not port from them.

## The Product

Amendment is a legislative-intelligence platform. The user comes for one of five things, and the system has a dedicated *room* for each:

| Surface | Purpose | Lead family | Default material | Canvas |
|---|---|---|---|---|
| **Reading Room** | Conversations, chatbot research, AI dialogue | sans / serif | `material-thin` | none (aurora) |
| **Archive** | Bill pages, statutes, primary-source documents | serif | `material-regular` | `paper-cream` |
| **Writing Desk** | Composing letters to representatives, call scripts | serif | `material-regular` | `paper-parchment` |
| **Receipt** | Post-action certificates — diploma issued by a phone | serif | `paper-cream` | `paper-cream` |
| **Commons** | Asks, co-signs, candidate responses, endorsements | sans / serif | `material-thin` | none (aurora) |

Reading Room, Archive, and Writing Desk are ongoing surfaces the user returns to. The Receipt is issued once and kept. The **Commons** is the public square — where one person's demand becomes a district's, and where candidates answer on the record. It is live and collective; it stays on the aurora and never becomes an artifact.

### Five rooms, four registers

*Resolved 2026-08-02, audit §3.5.* The rooms above are how the team talks about
the product. They were never five distinct **token sets** — and the register
list is what you read to pick defaults. A register earns its place if it differs
in tokens, not adjectives.

| Register | Rooms | Canvas | Material | Column | Motion |
|---|---|---|---|---|---|
| **Live** | Reading Room · Commons | none (aurora) | `material-thin` | 48rem | accrual permitted |
| **Reading** | Archive | `paper-cream` | `material-regular` | 28rem (69 chars) | none |
| **Writing** | Writing Desk | `paper-parchment` | `material-regular` | 28rem portrait | minimal |
| **Issued** | Receipt | `paper-cream` | `paper-cream` | 34rem portrait | bloom, once |

The audit proposed three. One of its two merges held: Reading Room and Commons
already shared four of five tokens, and the fifth — motion posture — was a
contradiction rather than a distinction (**streaming is not motion**; see below).
Writing Desk and Receipt stayed separate: every token differs, and after §3.7
the Receipt carries a portrait screen artifact *and* a three-ratio raster export
family. A register describing both is not one register.

Two consequences worth knowing. **Palette scoping moved from surface to
condition:** "Momentum green is Commons-only" no longer resolves, so the rule is
now *green appears where a crowd is counted* — a dialogue counts no crowd, so
conversation views stay green-free. And **streaming is not motion:** text
arriving token by token, a typing indicator, a skeleton resolving are content
*arriving*, permitted anywhere, and they do not spend the two-surface motion
budget. The test is whether the animated thing is already on screen and already
correct.

### Email — a profile, not a fifth register

*Resolved 2026-08-02, audit §3.8.* An **email is a viewport, not a canvas** —
the same role the browser window plays on the web. Objects are placed into it,
so paper is not email's background; paper appears only where a paper *artifact*
appears, and one message can hold two registers (a live ask on a card above an
issued receipt on paper).

That reframe made the rest fall out of rules the system already had: **email is
the system's reduced-transparency mode, permanently.** Glass drops its blur and
becomes solid zinc, layout does not shift — already specified in
`colors_and_type.css` for `prefers-reduced-transparency`. The only thing
invented for email is a flat stand-in for the aurora, `#e7edf4`, derived by
compositing its three lobes over the canvas. **None of the email hexes belong in
the token file** — a hex in the token file is a hex someone will use on the
aurora.

A **profile** is an existing register plus a fixed substitution table. If a
transport needs new *tokens* it is a register; if it needs the same tokens
rendered by poorer machinery, it is a profile. *Reading* and *Issued* have email
forms; *Live* and *Writing* do not — a stream cannot stream into an inbox, and
you do not compose in one.

**The email type stack.** No web fonts: a webfont reaches a minority of clients
while blocking render in the rest. Georgia and Verdana are real answers, not
compromises.

| Family | In email | Why |
|---|---|---|
| Newsreader | `Georgia, 'Times New Roman', serif` | A screen serif that needs no font file and keeps Newsreader's ink weight. |
| Archivo (body) | `'Segoe UI', -apple-system, …` | Production's stack, kept. Archivo has no email-safe analogue and needs none. |
| Archivo chrome (`wdth` 125) | `Verdana, Geneva` + uppercase + `.12–.24em`, **never below 12px** | The chrome register is *wide*, and Verdana is the widest email-safe sans. With no axis to expand the face, shrinking it is the one move that has nothing left to give. |
| IBM Plex Mono | `ui-monospace, Menlo, Consolas, 'Courier New'` | Ledger numbers survive intact — the least-damaged register. |

**Both modes are required**, and three marks cannot survive inversion, so they
switch rather than darken: the indigo plate, green ink (`--color-success` is a
light-mode-on-light value), and **every link** — a class on a paragraph does not
reach its anchors, so an inline link inside inverted body copy vanishes
silently. **The frame inverts; the artifact does not.**

**An email that is only an artifact is still not the artifact.** A sheet in an
inbox cannot be re-issued, cannot be exported to the three share ratios, and
dies with the mailbox. Issued mail is the *notice* of issuance, typeset like the
thing it reports, and always links to the artifact itself.

**The Receipt is two artifacts** (2026-08-02, audit §3.7). The one the user *keeps* is portrait HTML, single column at 34rem, bloom at issuance — issued at the phone, because that is what the phrase has to mean. The one the user *shares* is a rasterised image in three ratios — tall 1080×1920, square 1080×1080, wide 1200×675 — each authored at its own pixel size and rendered at 2×, never scaled from another. The 56rem landscape proportion survives only in the wide export. Paper is full-bleed in exports; no glass, no aurora, no motion. The emboss never goes below 44px and sits inline with the signature rule.

## Index

Root files
- [`DESIGN.md`](./DESIGN.md) — canonical spec, treat as the source of truth
- [`README.md`](./README.md) — this file
- [`SKILL.md`](./SKILL.md) — cross-compatible Agent Skill manifest
- [`colors_and_type.css`](./colors_and_type.css) — all color, type, spacing, radii, shadow, and material tokens as CSS custom properties + semantic role classes

Folders
- [`fonts/`](./fonts/) — **Archivo, self-hosted** (variable roman + italic, `wdth` and `wght` intact) and Amerika Signature (signatures only). Newsreader and IBM Plex Mono come from Google Fonts.
- [`assets/`](./assets/) — logos, jurisdiction marks, civic illustrations
- [`preview/`](./preview/) — Design System tab cards over [`preview/_card.css`](./preview/_card.css), the shared card chrome. Since 2026-08-12 every file in the folder carries an `@dsCard` marker: the folder and the tab are the same set.
- [`scratch/card-audit.html`](./scratch/card-audit.html) — loads every card at its declared width, measures it, and lints the 12px floor. **Run it before writing a viewport marker.**
- [`ui_kits/web/`](./ui_kits/web/) — recreations of the surfaces as interactive HTML + JSX components

---

## Content Fundamentals

**Voice.** Calm, deliberate, modern. The visual equivalent of someone who knows the answer and has time to explain it. Never bureaucratic, never combative. Civic is not partisan.

**Person.** Second-person where the user is the actor ("you tracked this bill", "your representative"). Third-person institutional where the subject is the legislature ("the bill was engrossed", "the chamber voted"). Avoid first-person plural; the system is not a we.

**Casing.** Sentence case for headings and labels. ALL CAPS reserved for the chrome register (navbar items, breadcrumbs, status stamps, column heads) — never for body, never for headings. Title case only in proper nouns (chamber names, bill titles as printed).

**Tone signatures, by surface.**
- **Reading Room** — conversational but precise. The AI does not hedge with apologies. Citations are footnoted in Midnight Indigo superscript (a citation is a trail into a source, and it is clickable), not "I'm not sure, but…". Examples: *"HB 21 is currently in committee. The committee meets on Thursday."* / *"This bill amends § 791.02(1) — see source."*
- **Archive** — clerical. Status is stated, dates are exact. Italic serif for provenance: *"started by Brad Feld"*, *"introduced 12 days ago"*, *"representing you in Washington, D.C."*
- **Writing Desk** — composed. Address blocks are formatted as letterhead. Opening salutation is italic serif: *"Dear Senators & Representatives,"* — not "Hey!" or "To whom it may concern."
- **Receipt** — formal civic. *"Issued to / on behalf of"*. *"SIGNER NO. 2,301"*. *"LETTER NO. 14,508"*. Numbers in IBM Plex Mono. The certificate language is intentional. **The number is the proof, not the ornament** — every issued artifact states its ledger number as text, on screen as well as in exports, because the emboss and the signature are pictures of authority and neither survives email, plain text, a screen reader or a forward.

**The newcomer's lede** (added 2026-08, audit §3.1) — plainly helpful, in the Archive's own type. Every bill page opens with one sentence, second person, present tense, saying what the bill would do to the reader; then three facts; then one action. Jargon is never left alone — it is replaced, or what it means follows in the same sentence. A tooltip is not a gloss. Examples: *"If you rent and you get an eviction notice, this bill gives you 30 days to respond instead of 10."* / *"It passed the House. The Senate votes next."* Plain is not peppy — the forbidden register below still applies. See `DESIGN.md` → **The Newcomer's Lede** for the jargon table and the thirty-second path.

**The founder's letter** (named 2026-08, audit §3.8) — the one voice that is a
*person*, not the system. First person singular, signed by name, emoji permitted
as content, a P.S. allowed. Fenced hard: **the welcome email only.** Once, on
arrival. Never transactional, never system messaging, never a receipt. It exists
because it shipped and works; the Content Fundamentals above were written for
the system speaking, and it never occurred to us that someone might speak
through it.

**Emoji.** Reserved as **content, not chrome**. Emoji are allowed on conversation cards where the user has assigned one to a thread. They never appear in navigation, status, buttons, or system messaging. No 🇺🇸, ever — civic is not nationalist.

**Unicode as iconography.** Used precisely where it carries a civic referent: `§` (section marker, full serif weight on Archive), `¶`, `·` (mid-dot separators in chrome labels). Never as decoration.

**The forbidden register.** Never "Crushing it!" / "🎉 You did it!" / "Amazing work!". The Receipt earns its weight by being *issued*, not by cheering. Celebration is a typographic event, not a copy event.

**Examples lifted from the spec.**
> Started by Brad Feld
> Registered voter in Eldorado Springs, Colorado
> Endorsed an hour ago
> Representing you in Washington, D.C.
> 52 Legislatures · 464,269 Bills Tracked
> SIGNER NO. 2,301 · LETTER NO. 14,508

---

## Visual Foundations

### Two layers, always

Every screen is composed of an **ink layer** (permanent: serif headings, Midnight Indigo primary, Momentum green action) and an **aurora layer** (alive: a three-stop Blue Hour gradient painted in oklch). Glass cards sit on the aurora and let some of it through. There is no third layer.

### Color

**Two** brand accents, not three (changed 2026-08 — see `CHANGELOG.md`); semantic states reserved for convention.

- **Midnight Indigo** (`slate-700/800/900`) — primary. Default button, active nav, selected card border, ink on the tab bar. Reads *ink on archival paper*. This is the user's trail.
- **Momentum green** (`oklch(.66 .148 160)`) — **action and the crowd, one colour.** CTA, FAB, co-sign, counts, thresholds, answered positions. Sampled from the shipped `--aurora-curtain`, not authored from nothing. Its label is **ink, not white** — at this lightness white measures 2.90:1 and ink 6.42:1. Same value in both modes.
- **The seal** — **no colour at all.** A blind emboss, pressed into the paper: highlight up-left, warm shadow down-right. Issued artifacts only (post-send confirmation, Receipt, envelope postage corner), and it needs paper beneath it — an emboss has nothing to press into on glass. **Oxblood is retired from the system entirely** as of 2026-08. There is no red here now except semantic danger.
- **Slate Blue** (`slate-400/500/600`) — functional. Focus ring, page-load progress, icon-button hover. Never carries brand meaning; only confirms attention.
- **Momentum is no longer a separate token.** `--color-momentum` now aliases `--color-action`. Because action and success share a hue, **fill carries the difference**: a filled green plate means *do this*; an unfilled green mark means *this happened*. That rule still needs writing properly.
- **Semantic** — `emerald-700` (success), `amber-700` (warning), `red-600` (danger). Conventional only.

**Text** is opacity on black/white at three rungs (87% / 55% / 38%, Apple HIG). This works *only* because the aurora is monochromatic and low-chroma; a more chromatic backdrop would break the invariant.

### Typography

Three families, three jobs:
- **Newsreader** — every heading. A serif on the ink layer is a deliberate civic gesture: *document, not app*.
- **Archivo** — variable sans, weight 100–900, `wdth` axis 62–125, **and a true italic at every weight**. Replaced Readex Pro 2026-08-13: Readex was excellent chrome and wrong as a body face — wide, soft, evenly weighted, so word silhouettes flatten at paragraph length — and it had no italic at all, which is why every italic in the system had to be serif. Registers are the four `--sans-*` width presets: body `wdth` **104** (see below), institutional chrome (navbar, breadcrumbs, labels, status stamps, column heads) `wdth` **125** with `--track-chrome` `.12em` uppercase letterspacing, display `wdth` 120 (hero stat numerals), ceremonial `wdth` 125 + `--track-ceremonial` `.20em` — Receipt place-of-issue caption, wax-seal monogram, once per page. `--hexp-*` survive as deprecated aliases only.

  The weight scale was recalibrated to canonical 100…900 on 2026-08-13 — the old interpolated ladder ran up to a full two steps under its own names in Archivo (`preview/type-weight-ladder.html` has the measured ledger). `--sans-semibold` 497 → 600 is where the visible change lands.

  Two costs, stated. **Chrome is ~4% narrower**: Readex at HEXP 60 measured 334px for `ARCHIVE COMMONS WRITING DESK` at 12px; Archivo at `wdth` 125 — its ceiling — measures 322px. Recovered in tracking, not size. And because chrome now sits at the ceiling, **width can no longer separate four registers**; ceremonial is distinguished by tracking and size. Correct hierarchy anyway, but a spec change rather than a token swap.

  **Body is `wdth` 104, not the axis default** (applied 2026-08-14) — do not tidy it to 100. Widening a face *lowers* its character count: in a 28rem column at 16px, Readex at `HEXP` 2 — the face the measure was calibrated on — set 56 characters, while Archivo sets 63 at `wdth` 100, **60 at 104**, 59 at 106, 57 at 110. At the default, body copy narrowed by seven characters a line when the family changed and nobody chose that. 104 is also where Archivo's *O* is a circle (ink ratio 1.014; true 1.000 at ≈102); parity with Readex needs ≈110, where lowercase stops reading as a text register. Still open: `measure.body`'s 69 characters were counted in **Newsreader**, so **sans body copy has no counted measure yet**.
- **IBM Plex Mono** — machine identifiers in body prose (`§ 791.02(1)`, `42 U.S.C. § 1983`), line numbers, copy-pasteable strings, `<code>`. Not for referent names — bill numbers in chrome are chrome-width sans, not mono.

Headings are **never** ALL CAPS. The serif provides gravity; ALL CAPS belongs to the chrome register alone.

### Backgrounds

The **Blue Hour aurora** is the default backdrop on every page. Three radial-gradient lobes painted in oklch at low chroma:

- Indigo lobe at 15% 8%
- Slate lobe at 85% 20%
- Warm parchment lowlight at 50% 90%

Hard limits, measured 2026-08 (`a11y.contrast`): chroma ≤ 0.22, at most five lobes, and **never bare text inside the band** — placement, not monochrome, is what protects the ink scale. No full-bleed photography. No repeating patterns. The aurora *breathes* (very slow, ≥120s) but never animates aggressively. Where opaque paper is needed, the room provides a `paper-cream` (Archive) or `paper-parchment` (Writing Desk) canvas — opaque, not glass. *Glass is for chrome, cards, modals, navigation. Paper is for prolonged reading or writing.*

### Spacing, radii

Spacing is a 4px unit. Inset scale `sm 8 / md 16 / lg 24 / xl 32`. Containers are **shells** — tight `48rem` for conversation columns, normal `min(31rem, 100%)` for a prose page, wide `80rem` for chrome.

**A measure is not a container.** The measure caps the element that *holds the text*, and it is stated mobile-first in rem derived from a counted line: `measure.body` = `min(28rem, 100% - 2rem)` = **69 characters** of body serif at 16px; `measure.lede` = `min(24rem, 100% - 2rem)` = 47 characters at 20px. Target 69, ceiling 75.

**`ch` is banned from length tokens** (2026-08-04). `ch` is the advance width of the zero glyph *of the element carrying the rule* — so `max-width: 65ch` on a page shell that inherits the body **sans**, wrapping **serif** prose, measured 636px and **97 characters**. Nobody chose 97. Two ambiguities stack: zero vs average glyph within a face (42% in Newsreader) and measuring face vs rendered face between two (50%). Self-consistency fixes only the second — 65ch set on the serif itself is still 92 characters. See `explorations/What 65ch Measures.html`.

Radii are a short, meaningful scale:
- `0.25rem` (4px) — inputs, status pills, chrome fragments
- `0.5rem` (8px) — buttons, cards, most content surfaces
- `0.75rem` (12px) — modals, FAB, floating overlays
- `9999px` (full) — pills, toggles, avatars

No 2xl, no 3xl. *If a surface is bigger than a modal, it's a page, and pages don't have corners.*

### Borders

- **Hairline** — `rgb(0 0 0 / 5%)` light, `rgb(255 255 255 / 20%)` dark. Default ring on translucent cards.
- **Subtle** — `rgb(0 0 0 / 10%)`. Stronger ring on cards that need separation.
- **Dashed-empty** — `2px dashed rgb(0 0 0 / 30%)`. Only on empty-state placeholders.

### Elevation (shadow only — never transform)

Five tiers. Shadow ink is sourced from **slate-900** (one color across the system) because the aurora is blue-toned and neutral-grey shadows read as harsh artificial drop-shadow.

- **flat** — `box-shadow: none`, hairline ring only. Default-button rest, stat plates.
- **whisper** — two-layer micro-shadow. Material-thin, ghost-button hover.
- **raised** — two-layer 4/6 + 2/4 shadow. Material-regular, cards, default-button hover.
- **floating** — two-layer 20/25 + 8/10 shadow. Modals, FAB, dropdowns.
- **chrome** — wider-spread two-layer shadow. Persistent navbar only.

### Materials (glass)

Five tiers, all 50px backdrop-blur (25px for chrome):

- `material-ultrathin` — toggles, hover states, form input backings
- `material-thin` — cards, ghost buttons, secondary containers
- `material-regular` — primary content cards, forms, search bars
- `material-thick` — modals, dropdowns, floating overlays
- `material-chrome` — persistent window chrome (navbar, mobile tab bar)

When the OS sets `prefers-reduced-transparency`, all glass collapses to solid zinc surfaces with backdrop-filter removed. Layout does not shift.

### Hover, press, focus

- **Hover** — background brightens by one step; shadow bumps one tier. **No** `scale()`, **no** `filter: brightness()` — they cause sub-pixel icon wobble and compositing jank.
- **Press** — `active:opacity-80` on the track for toggles; deeper background gradient for buttons. **No** thumb-scale on toggles (violates the no-transform rule).
- **Focus** — always slate (`slate-500` light / `slate-400` dark), always visible, 2px width with 4px offset (8px on links, 2px inset on inputs). Focus is *the system listening*, not the system celebrating. Suppressed for mouse-only via `:focus:not(:focus-visible)`.

### Motion

The system is still. Durations: `instant 100ms / fast 150ms / base 200ms / slow 300ms / marquee 240s / hero-fade 1s`. Easings: `standard cubic-bezier(0.4,0,0.2,1)` and `emphasized cubic-bezier(0.2,0,0,1)`.

Rules:
- Transition only `background, box-shadow, color, opacity, ring`. **Never** transition `transform`.
- Respect `prefers-reduced-motion` — clamp to 0.01ms.
- **Chrome is still** — the navbar is always chrome and **does not** animate on scroll. Hover states never move, on any surface.

Motion is permitted on exactly **two** surfaces, different in kind:

- **Receipt — the one-shot BLOOM at issuance.** Aurora deepens ~15% chroma, wax seal scales in 0.8→1.0 with a 100ms shadow lag, guilloche border draws left-to-right, ledger number counts up. After ~400ms, static.
- **Commons — ongoing ACCRUAL under real collective action.** Counts climb, co-signs land, the district threshold meter warms toward emerald as critical mass nears — then holds at the new level (it does not pulse). Motion must reflect REAL aggregate state a person changed; never decorative, never an idle loop.

Both obey *"no motion without meaning."* They are distinct mechanics: the Receipt is *issued*; the Commons *accrues*. The bloom mechanics never leak onto the Commons (or anywhere else), and the accrual mechanics never stand in for issuance.

### Transparency & blur

Used continuously — every glass tier carries 50px blur (25px for chrome). The aurora is the constant. Glass tiers vary by purpose, not by aesthetic. Solid paper canvases are introduced *only* where prolonged reading or writing demands it.

### Tactile accents

**Owner:** Jason — head of product & design, The Governance Company. One owner for the whole inventory.

**Three are canonical** — rubber-stamp status, guilloche, progress ribbon. Build with these freely. Each names the file it ships in.

**Nine are proposed** — postmark, jurisdiction seal, ruled page, line numbers, the seal, the signature line, folder-tab step, lapel-pin, envelope preview. Fully described in `DESIGN.md` → `tactileAccents.proposed`, and **not** sanctioned to ship from that description. Each clears four gates first: a named owner, a shipped implementation, a specimen in `preview/`, and a stated communicative purpose. Each names the gate it is stuck at.

**One is retired** — paper grain, the only entry that could not state a communicative purpose.

**A status is a claim, and a claim carries its evidence.** Canonical entries carry `implementation:`; proposed entries carry `blocked-on:`. This exists because the gates were written on 2026-08-01 and first run against the codebase on 2026-08-02, and **six of thirteen statuses were wrong in both directions** — three canonical accents had never been built, two proposed accents were shipped and load-bearing. Status had been tracking how much had been written about an accent, not what existed. Working file: `explorations/Running the Gates.html`.

Two things to know before you reach for one:

- **The seal, the ruled page and the signature line were canonical until 2026-08-02 and are not built.** The seal ships as a 40%-opacity watermark, not the specified blind emboss. The ruled page exists only as a comment in production CSS. The signature line — the dotted rule at the close of a composed letter — is absent.
- **Guilloche must be drawn procedurally at its rendered width.** The shipped implementation scales one 800px drawing, so the specified 0.6px engraving lands at 0.29px on a phone and greys into a smear. Same bug that put the ledger number at 5px.

### Loading

**A loading state promises the shape of what is coming, never how much of it.** The shape of a row is fixed by the component and known before any fetch; the count is a load-time fact the front end does not have. Design as if it never will.

So: **under-reserve, and the settle is always downward.** One skeleton row — the shortest plausible item — in a container sized by its content, no minimum height. One row is the floor of what can arrive, so the card can only grow. Growth pushes the page down, which is what pages do. A shrink pulls content up under a reader's eyes and a moving thumb, and that is the failure people notice.

A spinner does not avoid the height claim, it makes an uninformative one — the shipped fallbacks reserve a fixed 192px box guessed without a count, then usually settle by shrinking. Keep the spinner for in-place indeterminate waits where there is no shape to promise: a button mid-submit, a control resolving. Never a route-level content fallback.

Neither treatment fixes zero results. That is `card-empty`'s job.

### Forms

Two systems furnish them. Ours is three utilities — `input-text`, `input-textarea`, `input-label`. Everything a user types into during sign-in, account or profile is **Clerk**, mapped through nineteen `--clerk-*` variables. Clerk invents no tokens, so it is a **profile**, not a register — the second user of that mechanism after email. See `DESIGN.md` → `profilesClerk` for the mapping and its three divergences; one of them, yellow-500 for warning, contradicts the standing rule that amber is warning.

### Signatures

**A signature is a name the constituent affirmed** — by co-signing, endorsing, pledging, or sending. The act of signing is what makes it one; it is not a handwriting sample and the system does not claim it is. So rendering an affirmed name in `--font-signature` is correct, and the Receipt does exactly that.

The line is **second person only**: the script face renders *your* name, on *your* receipt, for an action *you* took. Nowhere else.

That rules out more than it sounds like. A co-signer roll, a signer list, an endorsement feed — other people's names, set in the normal register. Someone else's signature rendered for your eyes is a facsimile of a mark they did not draw and cannot correct, on an artifact that may be screenshotted and shared. Also never a name the user did not affirm: a bill sponsor, a legislator receiving a letter, a placeholder, decoration. **The audience is the constraint, not the typeface.** Where no name exists, print a serif fallback ("A constituent"), not script.

Script remains banned as system typography everywhere else. `DESIGN.md` → `signature` is the entire licence.

### Print — the mailed letter

*Decided 2026-08-04, audit §3.8.* **Paper is not a degraded screen — it is this register's home.** `paper-cream`, the emboss, the guilloche, the ledger number and a Scotch roman are all imitations of paper, so print is the one transport where the ink layer is literally true and the aurora cannot exist. That costs nothing: the aurora never carried meaning.

A **profile**, not a fifth register — same tokens, poorer machinery — with one thing no profile has needed before, a `requires:` list, because paper has content requirements the screen has no equivalent for.

- **The sheet is the paper canvas.** Cream does not print: a cream fill is an ink wash across a whole page, it bands on consumer printers, and the stock already has a colour.
- **Ink is re-based, not flattened** — 100% / 45% / none. `* { color: #000 }` deletes the 87/55/38 scale, and that scale is how ink sits on a page, not a screen affordance. Tertiary promotes to secondary or does not print.
- **The emboss cannot print.** It is a deformation of a sheet; a printer can only print a picture of one, and it comes out as grey mud on the very artifact whose authority it was carrying. The **ledger number carries the proof** instead.
- **The measure is 6.5in**, set by the 1in margin. Paper takes its measure from the margin, not from a character count.
- **The dotted signature rule is canonical here**, not proposed: on screen it anticipates an act, on paper the act happens. 0.4in of clear space above the printed name, and the printed name is mandatory — a hand-signed name is not always legible.
- **Folds and breaks carry rules.** Tri-fold at 3⅔in and 7⅓in with nothing consequential on a fold line; a continuation header on every sheet after the first.
- **Requires the user's postal address** — confirmed present, so the return block is *printed*, not ruled for a pen.

`DESIGN.md` → `profilesPrint`. The CSS it can own ships in `colors_and_type.css`. Specimen: `preview/print-profile.html`, drawn at true US Letter geometry (816 × 1056 at 96px/in) so every length in it is a real inch.

### Imagery

Vector and procedural. **No** stock photography. **No** photographic paper textures (grain is procedural monochromatic noise ≤2%). **No** rasterized banknote engraving (guilloche is procedural SVG sine waves). Illustration is **flat vector with 1px hairline ring** — the lapel-pin register, never iOS-6 chrome/bevel/gloss.

Imagery color: **monochromatic, slate-700 ink, low chroma**. The Blue Hour palette extends into illustration; warm or saturated imagery breaks the room.

### Cards

- Default — `material-thin` or `material-regular`, `rounded-md` (8px), 16px padding, hairline ring, `raised` shadow on regular variants.
- **No** colored left-border accents. **No** rounded-corner-with-gradient-only ornamentation.
- Status is communicated by a **dot, badge, or rubber stamp** — never by tinting the entire card.
- Avatars are **Midnight Indigo**, not a wax seal. An avatar is the user's trail.
- Rubber stamps: **green ink** for enacted/signed — `--color-success` on light, `--color-action` under inversion, never action green as light-mode ink — slate for procedural, amber for vetoed, red-600 only for dead. Oxblood left the stamp palette in 2026-08.

**The fill rule.** Action and success share a hue, so fill carries the difference: **a green plate is a control; green ink is a report.** Fill means *press me*. A numeral, chip, stamp, rule, or check — anything green that is not a filled plate — states a fact that is already true. Meters and ribbons are exempt: they encode quantity, not affordance. The rejected alternative (filled = done, outline = available) ghosts the primary action and makes every state on the page look pressable.

**Which green is ink is a contrast fact, not a taste one.** `--color-action` is a plate colour; as text it measures 2.62:1 and is forbidden. Green ink is `--color-success` on light, switching to `--color-action` under inversion. And it is only as legal as the ground under it — success ink is 4.99:1 on the neutral-100 page ground but 4.32:1 one plate step down, so measure against the ground a thing actually lands on. A green tint plate carrying green ink caps at 10%.

---

## Iconography

### Library — Phosphor Icons

Icons are **Phosphor Icons** ([`@phosphor-icons/react`](https://phosphoricons.com/)). The system deliberately avoids Lucide because Lucide's stroked-path rendering causes visible sub-pixel overlap and `currentColor` darken-on-intersect on dense glyphs (X, search, settings). Phosphor draws each icon as a single merged outline path, eliminating the bleed.

Phosphor names use the `Icon` suffix (Phosphor v2.1+): `MagnifyingGlassIcon`, `EnvelopeIcon`, `CaretDownIcon`, `GearIcon`. Bare names (e.g. `MagnifyingGlass`) are deprecated.

In this static design system we load Phosphor's web font from [unpkg](https://unpkg.com/@phosphor-icons/web) via CSS (`<i class="ph ph-magnifying-glass">`). For React production, use `@phosphor-icons/react/ssr`. **This is the canonical icon set — substitution flagged.**

### Weight register

- `weight="regular"` — default outline. Nav, inactive state, most chrome. Reads as ink.
- `weight="fill"` — active states (selected tab, current sidebar item, selected `CardSelect`). Carries the "user's trail" signal — fill = the user is here.
- `weight="light"` — illustration weight. Reserved for the 48px stroke-1 hero glyph in `EmptyState`.
- `weight="bold"` — tiny inline icons at 12–14px (button leading-icon glyphs at `size={16}`).

### When icons earn their place

Icons are **signal, not decoration**. They belong in the UI only when they:
1. Replace text (icon-only close, search, chevron, hamburger)
2. Disambiguate text (thumbs-up/down for For/Against, D/R caucus badges, status dots)
3. Signal state (checkmark, warning triangle, spinner, live ping)
4. Aid wayfinding at a glance (sidebar nav — a small, stable set)
5. Are content, not chrome (emoji on conversation cards, brand mark, jurisdiction seal)

They become noise when they sit next to a text label that already names the thing ("Conversations" doesn't need a chat bubble), or repeat on every item in a homogeneous list, or decorate a button that already has a descriptive verb.

### Unicode + emoji

- **`§`** — section marker. Always serif, full weight. Inline with Archive body text.
- **`¶`** — paragraph marker. Used in line-numbered statute views.
- **`·`** — mid-dot separator in chrome labels.
- **Emoji** — only as user-assigned content on conversation cards. Never in nav, buttons, status, or system messaging.

### Logo / brand marks

Amendment uses a custom wordmark + a monogram seal. **The seal carries no ink**: it is a blind emboss (`.seal-emboss`) — highlight up-left, warm shadow down-right, the mark a deformation of the sheet rather than pigment on it. The "flat circular Oxblood" description here was stale; oxblood was retired from the system entirely in 2026-08. Issued artifacts only, and it needs paper under it — see `assets/` and `preview/color-seal.html`. Jurisdiction seals exist as **public-domain vector watermarks**, drawn monochromatic slate at 5–8% opacity behind the bill-page title block. Their visual form is **pending** in the canonical spec; the placeholders shipped here are flagged accordingly.

---

## Working with this system

If you're an agent creating a mockup, slide, prototype, or screen:
1. Read [`DESIGN.md`](./DESIGN.md) first. Then this README.
2. Drop [`colors_and_type.css`](./colors_and_type.css) into your `<head>`. Use the role classes (`.role-display-hero`, `.material-regular`, `.shadow-raised`).
3. Copy assets from [`assets/`](./assets/) — do not regenerate logos or seals from text descriptions.
4. Pick the **register**, not the room: Live (chat, asks, co-signs — on the aurora), Reading (bills, statutes — on paper), Writing (letters, call scripts — on parchment), or Issued (certificates). Four registers, five rooms; the rooms are narrative and the registers carry the tokens. Each has different defaults for canvas, material, lead family, and motion posture.
5. Treat [`ui_kits/web/`](./ui_kits/web/) as an **archive** — spec-derived, built before repo access, superseded on four values (oxblood FAB, black dark-overlays, near-black paper, seal + signature line as canonical). Do not port from it. Build from the role classes and the `preview/` cards; `github.md` maps screens to real production source.

Caveats to keep in mind:
- **The `resistbot/voyager` repo is readable** as of 2026-08-02 — see `github.md` for the sync record and screen map. Earlier material in this system is spec-derived and has not all been reconciled against source; the UI kit in particular was built before access and is faithful to the spec, not to the implementation. Check the code before rewriting a rule.
- **Archivo is self-hosted and its axes are verified** (2026-08-13): `wdth` measurably alive at 251.7px → 315.7px across 100 → 125, and the italic is drawn rather than synthesized. The standing hazard is a *replacement* cut: a subsetted or redistributed file whose `wdth` axis has been stripped loads cleanly and silently collapses chrome to normal width. Re-run the width check in `fonts/README.md` after any font swap. If a font file doesn't expose the axis, the chrome register will still work via uppercase + letterspacing, but the *gesture* will be slightly less crisp.
- **Jurisdiction seal form is unspecified** in the canonical spec ("design TBD"). Two forms were tried and pulled; production comments its absence deliberately. It is the one accent in the inventory blocked on PURPOSE rather than IMPLEMENTATION.
- **One open question has no owner** — who writes the plain sentence for 464,269 bills. See `DESIGN.md` → `openQuestions`. It is not a design decision and should not be closed by one.
