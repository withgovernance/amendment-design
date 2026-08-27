# Amendment — Living Document

> The rule of law is a living document — rooted in history and institutions, but designed to evolve.

This is the design system for Amendment, a legislative-intelligence product. The thesis is encoded literally: an *ink* layer that holds, and an *aurora* layer that breathes beneath it.

For operational rules (forbidden list, conventions, file organization), read [`../CLAUDE.md`](../CLAUDE.md) first. This document is the *why* behind the rules.

---

## Two layers

Every screen has two stacked layers, no more.

**The Ink Layer** is permanent: Merriweather headings, Readex Pro chrome, Midnight Indigo for the user's trail, Oxblood for moments of intent. It is the wax seal, the signature, the statute number, the chamber vote. The ink does not move, does not brighten, does not dance.

**The Aurora Layer** is alive: a three-stop Blue Hour gradient — indigo, slate, and a warm parchment lowlight — painted in oklch behind every surface. It breathes. Glass cards sit on top and let some of it through.

Every design decision flows from these two layers. They are non-negotiable.

---

## Color as a civic register

Three brand accents, each with one job:

- **Midnight Indigo** is the *primary*. Default buttons, active nav, selected borders, ink on the tab bar. If the user made something happen, the trail is Midnight Indigo. Reads as *ink on archival paper*.
- **Oxblood** is *action*. CTA, FAB, avatar stamp. Used sparingly. Kept deep enough (red-900) that semantic error red-600 can read as a distinct state.
- **Slate Blue** is *functional*. Focus rings, page-load progress, icon hover. Never carries brand meaning — only confirms attention.

Semantic states (emerald, amber, red-600) keep their conventional meanings and never decorate the brand.

Text color is opacity on black or white at three rungs (Apple HIG: 87% / 55% / 38%). This works *only* because the aurora is monochromatic and low-chroma. Broaden the aurora and the invariant breaks.

---

## Typography as institutional gesture

Three families, three jobs:

- **Merriweather** — every heading. A serif on the ink layer is a deliberate civic gesture: *document, not app*.
- **Readex Pro** — variable sans, weight 160–700, HEXP axis 0–100. Body sits at HEXP 2. Chrome (labels, navbar, breadcrumbs, status stamps, table heads) sits at **HEXP 60** with uppercase + 0.05em tracking. HEXP 60 reads like engraved label tape on a filing cabinet drawer.
- **IBM Plex Mono** — machine identifiers in body prose (`§ 791.02(1)`, line numbers, copy-pasteable strings, `<code>`). Not for referent names that take their type from the host context — bill numbers in a serif heading remain serif.

HEXP 60 is load-bearing. HEXP 80 is a rare display escalation (hero stat numerals only). HEXP 100 is ceremonial, ≤ 1 per page (Receipt place-of-issue caption, wax-seal monogram). Going beyond HEXP 60 changes the *gesture's intent*, not just its size — escalate only when the type is the visual event itself.

Headings are never ALL CAPS. The serif provides gravity; caps belong to HEXP-60 chrome alone.

---

## Surfaces — four rooms of the same building

The product has four modes of use. Each deserves its own register but *not* its own system. Same palette, same families, same materials — what changes is which material is default, which family leads the content, and how much motion is permitted.

The first three are *ongoing surfaces* the user returns to. The fourth is *issued once* and kept.

### The Reading Room — Conversations *[built]*

Dialogue in session. A transcript unfolding in real time. The one surface where motion is generous — tokens stream, citations appear, a typing indicator pulses — because the content is genuinely alive rather than authored.

- **Lead family** — sans for turn-taking mechanics, serif for AI prose where the model is *writing* something rather than answering tersely.
- **Default material** — `material-thin`. Messages float; the transcript is not meant to feel like a static document.
- **Rhythm** — loose vertical, single centered column at ≤48rem.
- **Palette emphasis** — user's contributions on a faintly Midnight Indigo-tinted plate; AI responses neutral on glass; inline citations in Oxblood (small, numeric, superscripted).
- **Tactile accents** — none. A conversation is a live exchange, not an artifact.
- **Blockquotes** in AI prose — italic Merriweather body, full ink weight, indented behind a 4px Oxblood/60 left bar. No plate, no fill, no rounded corners. A blockquote is a citation in long form, not a callout box.

### The Archive — Bill Pages *[partial]*

The primary source. Bill titles, sponsor lists, chamber histories, vote tallies, statutory text. A *document with authority*, meant to be read carefully. The surface that deliberately echoes the physical legislative record.

- **Lead family** — serif throughout. The only surface where IBM Plex Mono has prominent visual presence (bill numbers in mono inside the bill text; section markers `§` at full serif weight).
- **Default material** — `material-regular`. The paper is more opaque here; the aurora bleeds through faintly.
- **Rhythm** — dense and hierarchical. Title → jurisdiction → sponsors → status → summary → text → history → votes. Body holds to 65ch; metadata grids expand wider.
- **Palette emphasis** — semantic status drives color. Oxblood **ENACTED** stamp, amber **VETOED** stamp, slate procedural stamps. Primary visual accent is the status stamp, not a button.
- **Tactile accents** — this is where skeuomorphism earns its keep. Rubber-stamp status, postmark with introduction date, jurisdiction-seal watermark (5–8% opacity), ruled-line bill text with IBM Plex Mono line numbers in a 2rem gutter, `§` section markers at full serif weight, redline amendments (strike-through = deletion, underline = insertion), progress ribbon, lapel-pin sponsor avatars, italic-serif metadata for provenance.

**Paper canvas reserved for verbatim text.** Only the `view=text` rendering of bill content uses `paper-cream` parchment. The Summary & Analysis view is AI-authored content *about* the bill and sits on a `material-regular` glass card. Putting paper under analysis falsely claims "this is the document" when the user is reading the model's prose.

**Header summary sits flat — no plate.** The browser viewport already frames the page; the title + progress ribbon + temporal caption are metadata about the bill, not an artifact, and don't need their own card chrome.

**Temporal caption beneath the ribbon.** Don't repeat the active ribbon segment + RubberStamp ("INTRODUCED on 4/16/26"). Surface forward signal when available — `Next: hearing on May 28` — or humanized recency — `Introduced 12 days ago` — with the exact date in the `title` attribute.

### The Writing Desk — Take Action *[aspirational]*

The user *produces* something: a letter to their representative, a call script, a letter to the editor. *Authoring correspondence that will be delivered.* The surface should feel like sitting down with good paper and a pen.

- **Lead family** — serif for produced content. A letter should look like a letter — Merriweather 400 body, 700 addressee, Readex Pro sans for the UI chrome around the canvas.
- **Default material** — `material-regular` for the surrounding UI; the composition canvas itself is `paper-parchment` (opaque, slightly warmer than Archive's reading paper).
- **Rhythm** — single centered prose column at 65ch, generous margins, no sidebars crowding the canvas. The letter is the hero.
- **Palette emphasis** — Oxblood is ceremonial. It appears only on the **Send / Seal / Publish** button at the bottom of the composition and on the post-send confirmation stamp. Slate ink everywhere else.
- **Tactile accents** — paper grain at ≤ 2% noise, faint horizontal ruling at line-height (4% black), folder-tab step markers, signature line with dotted rule and printed-name label, wax-seal stamp on Send (fades in, no bounce, no rotate), envelope preview with postage corner on sent state, italic serif salutation (*"Dear Senators & Representatives,"*).

### The Receipt — Post-action Surface *[aspirational]*

The surface the user receives *after* a civic action completes. A diploma issued by a phone. A banknote of participation.

Receipts are issued *once* and kept. Landscape, not portrait — the certificate proportion. They sit on opaque parchment so the artifact reads as paper, not a glass interface. They borrow every tactile accent the system has — wax seal, postmark, signature line, ledger numbering, ruled-page provenance — and introduce one exclusive accent of their own: the **guilloche** line-work border, the unmistakable visual signature of an issued document since engraved banknotes.

The Receipt is the one place in the system where motion is permitted to bloom. The aurora intensifies briefly at issuance; the wax seal lands last with a small drop shadow; the guilloche border draws on left-to-right; the ledger number counts up to its final value. After ~400ms, the receipt is static — a piece of paper the user can keep, share, screenshot, or download.

The palette stays disciplined even here. No synthwave gradient, no magenta, no off-system color. The Receipt earns its glow by *meaning* — the user just did something worth marking — not by sparkle.

---

## Where surfaces meet

Some screens sit at a boundary. The **Conversation Starter** on the home page is a Reading Room artifact embedded in a marketing surface — textarea carries the loose rhythm but sits on a marketing-hero material. Inline **AI analysis on a bill page** is a Reading Room snippet embedded in Archive — it visibly adopts Archive's serif body while keeping Reading Room's citation treatment.

The rule: when a surface quotes another surface, it borrows the quoted surface's family but keeps its own material.

---

## Tactile accents — the discipline

A tactile accent must reference a real civic artifact (rubber stamp, wax seal, signature line, postmark, ruled statute page, jurisdiction seal, envelope) **and** serve a communicative purpose (status, authority, confirmation, identity). Ornament without meaning is forbidden.

Accents are drawn in a 2026 register: vector-constructed with slight imperfection, never photographic. Textures stay below 4% noise. Ink-break on stamps is subtle (≤ 15% alpha variation). Paper grain is monochromatic and barely perceptible.

The approved inventory and per-accent geometry lives in [`components/civic.md`](./components/civic.md).

---

## Elevation without motion

Elevation is strictly a function of shadow depth and ring opacity. The system's cardinal rule: hover states never transform. No `scale()`, no `filter: brightness()`, no lift animation. A button on hover brightens its background by one step and bumps its shadow one tier — that is the entire vocabulary.

This was chosen after observing that `filter: brightness()` promotes elements to a new compositing layer and causes sub-pixel icon wobble, and `scale()` on cards causes layout jitter on constrained screens.

The system is still. The navbar is always chrome (`material-chrome`) and does not animate on scroll.

---

## Shape

Radii collapse to a short, meaningful scale:

- `0.25rem` (4px) — inputs, status pills, chrome fragments
- `0.5rem` (8px) — buttons, cards, most content surfaces
- `0.75rem` (12px) — modals, FABs, floating overlays
- `9999px` (full) — pills, toggles, avatars

No 2xl. No 3xl. If a surface is bigger than a modal, it's a page, and pages don't have corners.

---

## Accessibility is a hard line

Three OS-level preferences are honored at the CSS layer:

- **Reduce Transparency** → glass collapses to solid zinc-50 / zinc-100 (light) or zinc-800 / zinc-900 (dark). Layout unchanged.
- **Increase Contrast** → secondary text opacity rises from 55% to 75%; materials solidify.
- **Reduce Motion** → all animations and transitions clamp to 0.01ms.

Focus is always slate, always visible, 2px width with 4px offset (8px on inline links, 2px inset on inputs). Focus is *the system listening*, not the system celebrating. Suppressed only on mouse-only focus.

Interactive targets are never smaller than 44 × 44px.

The Blue Hour aurora is monochromatic and low-chroma by design, which is what lets opacity-based text (87% / 55% / 38%) hit WCAG AA across all backdrop positions. A more chromatic aurora would break this invariant.

---

## The north star

Civic information is too often rendered in interfaces that look either bureaucratic (spreadsheet gray, system-font dense) or combative (cable-news reds and outlines). Amendment is neither. This system aims for a third thing: **calm, legible, and confidently modern** — the visual equivalent of someone who knows the answer and has time to explain it.

The design metaphor is a living document: ink, paper, wax seal, and the light moving across a reading room in the Blue Hour. Institutions beneath, evolution above. A more perfect union, rendered.

---

## What's elsewhere in this folder

- [`../CLAUDE.md`](../CLAUDE.md) — operational rules, forbidden list, conventions. **Read first.**
- [`tokens/tokens.json`](./tokens/tokens.json) — machine-readable design tokens (Style Dictionary format).
- [`tokens/tailwind.config.example.js`](./tokens/tailwind.config.example.js) — Tailwind wiring for the tokens.
- [`tokens/globals.example.css`](./tokens/globals.example.css) — aurora, focus, materials, reduced-* overrides, dark-mode swap.
- [`dark-mode.md`](./dark-mode.md) — the #1 correction across sessions; mandatory reading for any visible-state work.
- [`CHECKLIST.md`](./CHECKLIST.md) — pre-merge gate.
- [`components/`](./components/) — atomic recipes (`primitives.md` · `chrome.md` · `civic.md`) + surface compositions (`reading-room.md` · `archive.md` · `writing-desk.md` · `receipt.md`).
- [`examples/`](./examples/) — end-to-end composition walkthroughs (home, conversation, bill page, letter flow).
- [`patterns/`](./patterns/) — topic-specific guidance (tables, data viz, forms, AI prose, mobile, feedback, search, keyboard, imagery, print).
- [`HISTORY.md`](./HISTORY.md) — heritage (Votizen, Designing Obama), what was deliberately removed, current open items.
