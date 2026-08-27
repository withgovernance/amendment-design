# History — what was kept, what was cut, and why

Amendment's design language has ancestors. Naming them lets future contributors know what's being honored and what's being left behind.

This document is **not** operational. For rules Claude Code needs to apply, see [`../CLAUDE.md`](../CLAUDE.md). This file exists so contributors can reason about *why* certain decisions exist.

**When to load this file:** when you're proposing to add or restore a feature, and want to check whether it was tried before; when a design choice seems arbitrary and you want context; when explaining the system's lineage. **Don't** load it for everyday component work — the operational rules in `CLAUDE.md` and the per-topic patterns are sufficient.

---

## Open items in the current system

Documented here so they don't get rediscovered every session.

- **Jurisdiction seal form** is **pending design**. Iteration 1 (desaturated state flag) and Iteration 2 (generic capitol-dome circle) were both pulled — details below. Use the placeholder vector watermark at 5–8% opacity behind the bill title until canonical form ships. The right form needs to dissolve into the cream paper as background ink, not compete with content as artwork.
- **Receipt surface is aspirational** beyond the single letter-sent flow. Petition-signed, vote-recorded, and bill-tracked Receipt variants are specified but not yet built.
- **Writing Desk** has many accents specified but not all implemented. Specifically: envelope preview on post-send, wax-seal stamp animation on Send, call-script composer surface.
- **HEXP 80 / 100** are specified for hero stat numerals and Receipt place-of-issue captions, but in practice the codebase mostly uses HEXP 60 — 80 and 100 should be treated as rare display escalations, not as routine choices.

---

## Closest ancestor — Votizen (2011–12)

Votizen was a civic platform from the late-skeuomorphism era that figured out, in advance of most of the industry, what a letter-writing interface could feel like if it took the metaphor of a letter seriously.

What Amendment carries forward from Votizen, translated into a 2026 register:

- **Wax-seal confirmation stamp** — on post-Send confirmation and the Receipt. Issued artifacts only; it left avatars in Aug 2026. Same gesture, flatter execution.
- **Folder-tab step markers** — numbered tabs jutting above section headers for multi-step composition flows.
- **Italic-serif metadata voice** — *"started by Brad Feld"*, *"registered voter in Eldorado Springs, Colorado"*, *"endorsed an hour ago"*, *"representing you in Washington, D.C."* This is Votizen's most load-bearing inheritance.
- **Rubber-stamp accent on the letter body** — translated into the Archive's bill-status RubberStamp.
- **Parchment-canvas-for-composed-content** — `paper-cream` (Archive bill text) and `paper-parchment` (Writing Desk letter canvas).
- **Numbered tab steps** for flow.

If you see an opaque paper surface under serif prose, a faint circular stamp on produced content, or a numbered tab jutting above a section header — that's Votizen's work, modernized.

### What's deliberately not carried forward from Votizen

- **Americana star patterns** in header bands, page backgrounds, or ornamentation. The Blue Hour aurora does the atmospheric work without the nationalist connotation. *Civic is not partisan.*
- **Photorealistic lapel-pin renders** with chrome bevels, gloss, and drop-shadow dimensionality. That is iOS-6 aesthetic. The modern equivalent is a flat vector pin with a 1px hairline ring.
- **Script / handwriting fonts** as system typography. They violated the three-family discipline. Users may upload an actual signature image; the system never simulates one.
- **Slab-serif condensed campaign-poster display type** for bill titles. Newsreader 800 at display sizes carries gravity without pulling the register toward campaign poster.
- **Green "Follow" buttons** as a *secondary* accent beside a red primary. Amendment inverted this in Aug 2026: green is now the *primary* action colour and there is no red CTA at all.
- **Photographic capitol-dome decoration**. The lapel pin renders a capitol-dome glyph in flat vector when needed; we don't import or photograph one.

---

## Secondary ancestor — Designing Obama (Scott Thomas, 2009)

Scott Thomas's documentation of the Obama '08 campaign's design language is referenced for its discipline around institutional typography (Gotham), restrained palette, and the principle that civic design should feel *confident rather than combative*.

Amendment is not a campaign and does not carry a candidate's identity, but the temperature of that work — calm, deliberate, modern — is the temperature this system aims for.

What's borrowed:
- **The institutional typography gesture** — Designing Obama used Gotham as a civic-engineered sans; Amendment uses Readex Pro variable with the HEXP axis to achieve a similar engraved-label-tape register on chrome elements.
- **Palette restraint** — three brand accents, no more.
- **Calm-not-combative tone** — extends into voice (no exclamation marks in system copy, no cable-news adjectives).

Designing Obama is **not** borrowed for:
- Specific colors (the Obama-blue palette is partisan-coded and explicitly off-limits).
- Specific layouts.
- Any branding gestures.

---

## What was tried and pulled

These iterations existed and were removed. Documenting them so contributors don't re-propose them.

### Violet, pink, magenta, fuchsia accents

Tried as a brand-warming gesture. Pulled because they read as **consumer-SaaS** and conflict with the civic register. Now: Midnight Indigo + Momentum green, two accents, plus Slate Blue as functional and the oxblood seal on issued artifacts.

### Amber as a brand accent

Considered for "highlight" / "important" semantics. Pulled because amber's job in this system is **warning**, nothing else. Conflating brand and warning would soften the warning signal.

### Scroll-driven navbar fade-in

The navbar used to be transparent at the top of the page and fade to `material-chrome` past the first 48px of scroll. Removed because:
- It broke on app routes whose content scrolls inside an inner container rather than the document root — the navbar never advanced past `blur(0)`, leaving chrome looking unblurred over content.
- Static chrome everywhere is the correct register: *a living document does not bounce, and the chrome does not wait to arrive*.

### Hover transforms (`scale()`, `filter: brightness()`)

Removed after observing:
- `filter: brightness()` promotes elements to a new compositing layer, causing sub-pixel icon wobble.
- `scale()` on cards causes layout jitter on constrained screens.

Hover vocabulary is now strictly: background brightens one step, shadow bumps one tier.

### Jurisdiction-seal watermark (two attempts)

Iteration 1: pass the `JurisdictionFlag` SVG through `saturate-0`. Pulled — flags are graphic-rectangular even when desaturated, and the result read as a *chromatic decal* rather than archival ink.

Iteration 2: a generic capitol-dome circular seal. Pulled — read as *decorative ornament* rather than civic mark.

Status: **design pending.** The placeholder `jurisdiction-seal-placeholder.svg` is shipping until the canonical form is decided. Constraint: must dissolve into cream paper as background ink, not compete with content as artwork.

### "Status on date" caption beneath the progress ribbon

E.g. *"INTRODUCED on 4/16/26"*. Removed — the active ribbon segment + the RubberStamp already encode the status; captioning it again is redundancy. The *date* is real new information; render as italic-serif metadata adjacent to the ribbon, or as humanized recency ("Introduced 12 days ago") with the exact date in `title`.

### Progress-ribbon tick marks above labels

A version added 2px tick marks above each milestone label. Removed — segments + labels alone are sufficient; the ticks were a third graphic claim on the same row and read as redundancy.

### Paper canvas on the Summary view of bill pages

Bill detail pages had `paper-cream` under the Summary & Analysis section. Removed — Summary is AI-authored prose *about* the bill, not the bill itself. Putting paper under it falsely claimed "this is the document" when the user is reading the model's prose. Paper is reserved for the `view=text` verbatim rendering only.

### Bill detail header on a card plate

The header (title + progress ribbon + temporal caption) used to sit on a `material-regular` card. Removed — the browser viewport already frames the page; the header is metadata about the bill, not an artifact, and doesn't need its own card chrome. Document accents (stamp, watermark) belong on the bill text paper below, not on the header.

### Toggle thumb scale on press

`active:scale-95` on the toggle thumb. Removed — `scale()` on the press state contradicted the no-transform-transitions rule and caused compositing-layer jank. Press feedback now comes from `active:opacity-80` on the track.

### Phosphor v1 bare names (e.g. `MagnifyingGlass`)

Deprecated by the library; Amendment moved to `MagnifyingGlassIcon` etc. (Phosphor v2.1+).

### Lucide

Tried first. Pulled because Lucide's stroked-path rendering causes visible sub-pixel overlap and `currentColor` darken-on-intersect on dense glyphs (X, search, settings). Phosphor draws each icon as a single merged outline path, eliminating the bleed.

---

## The thesis, restated

Both ancestors converge on the same insight: **civic information is too often rendered in interfaces that look either bureaucratic (spreadsheet gray, system-font dense) or combative (cable-news reds and outlines).** Votizen aimed for a third thing. So did Designing Obama. So does Amendment.

The third thing is: **calm, legible, and confidently modern** — the visual equivalent of someone who knows the answer and has time to explain it.

Neither ancestor is being imitated. Both are being cited.
