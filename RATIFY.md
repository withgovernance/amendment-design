# Ratification queue

Findings that may need a spec change. **Append-only from the code side.** Nothing here is decided until it moves into `DESIGN.md` and `CHANGELOG.md` and `spec-version` is bumped — at which point the entry is deleted from this file.

## Why this file exists

The spec has one writer. Code work generates spec questions constantly — a rule that's silent, a value nobody chose, a sentence that supports two readings — and the failure mode is fixing them inline, where there's no changelog entry and no way to find the decision later. Every drift in `CHANGELOG.md` started as a reasonable inline edit.

So: **the code side never edits `DESIGN.md`.** It appends here. A ratification pass empties the queue.

## Rules

- **Append, don't decide.** Write the finding and the proposed change; do not apply it to `DESIGN.md`.
- **Name the kind** (below). The kind determines who acts and how.
- **Attach the evidence, not the argument.** A measurement, a render, a byte count, a computed style. *When a spec sentence supports two opposite readings, that is not ambiguous prose — it is a missing measurement.* Render both readings and let the container decide; the clip, the overflow, or the contrast number settles it far cheaper than prose.
- **Cite the token, never the number.** If a proposed edit quotes a weight, hex, or size, it will re-enter the spec as an uncontrolled copy — the retired ladder came back twice that way, once in a block written the same week its retirement was ratified.
- **One entry per finding.** A conformance fix that needed no decision doesn't belong here at all — just fix the code.

## Kinds

| Kind | Meaning | Who acts |
|---|---|---|
| **Conformance** | Spec is clear, code disagrees. | Code, immediately. Not a queue entry. |
| **Spec ahead** | Production hasn't caught up. | Record as Known Divergence. Don't let the spec drift back to match code. |
| **Production ahead** | The shipped artifact met a real constraint the spec didn't know about. | Update the spec. |
| **Unowned default** | Neither chose it; a framework did. | Needs a decision. *The value that reaches a rendered surface is the value the system means.* |
| **Two readings** | The spec supports both. | Render both, measure, then decide. |
| **Spec silent** | No rule exists. | Decide and write the rule, with its rationale. |

## Entry format

```
### <short title>
- **kind:** two readings
- **found:** stage 3, components/ui/Toggle.tsx — <what the code was doing and why it raised the question>
- **evidence:** <measurement, render, computed style, byte count>
- **proposes:** <the spec edit, in role/token names>
- **blocks:** <nothing | the surface that can't ship until this is decided>
```

## Cadence

Empty the queue at the end of each migration stage, or when it reaches about five entries — whichever comes first. Letting it run longer means later code work builds on undecided rules, which is how a divergence becomes a precedent.

The ratification pass produces **one commit in this repo**: `DESIGN.md` edits + a `CHANGELOG.md` entry + a `spec-version` bump, separate from any code PR. The code PR that then conforms references the version it built against.

Anything still open after a pass stays here with a note on what it's waiting for — usually a measurement someone has to take.

---

## Open

### Three ask-rail artboards carry copy the product cannot perform — and their provenance is the open question
- **kind:** waiting on a person; **kind depends on the answer** (copy error, or spec ahead)
- **found:** reviewing the same branch against artboards labelled `3A`/`3B`/`3C` (phone dark, phone light, desktop).
- **evidence:** the artboard threshold caption reads *"2 of 25 in Assembly District 76 before your legislators are notified."* Both halves disagree with the product. `canSeeAskCount` compares `ask.national_signature_count` against `PUBLIC_COUNT_THRESHOLD` — **ask-wide against the national count, not district-scoped** — and a sweep of the consumer for a notification path (`notify_legislator`, "legislators notified", `notifyLegislator`) returns **nothing**. The share-loop brief's own sanctioned exception to the no-goal-bars prohibition gives the test: *a goal is allowed exactly when crossing it changes the product's behaviour*. Count-goes-public does. Legislator-notification, as of this repo, does not exist to change.
  - Separately, these three IDs appear in **no** written record — not the brief, whose artboards for this work are `CHQ-1` and `B79-0`, not this repo, not the consumer. They reached the implementing session as images pasted by Jason. The Paper MCP has been `ConnectionRefused` since 2026-09-08, so the low-fi authority cannot be opened to reconcile them, and the brief already carries a banner that its own artboard citations were never re-verified.
- **proposes:** nothing yet — **the answer decides the kind, and it is not the design side's to guess.** If notification-at-25 is a real product intention, these artboards are **spec ahead** and the gap is a Known Divergence to record, not copy to delete. If the line was written to sound civic, it is a **fabricated goal** under the prohibition and the artboards need correcting at source before anyone specs from them again. Either way the shipped caption stays as it is: a caption may not promise a notification the product does not send.
- **status:** with Jason. The question is narrow — *is legislator notification at the public-count threshold a thing we intend to build, or not?*
- **checked 2026-09-14:** Paper is reachable again. No page of `Amendment UX/Wireframes` (UI Wireframes, Bot Scripts, iOS) has an artboard named 3A/3B/3C or text containing "of 25" or "District 76". The only "notified" copy is on the iOS page's "Ask detail · no responses" — *"Both NY-14 candidates have been notified…"* — so a notification concept exists in the low-fi, at a different trigger. PR #782 closed unmerged 2026-09-09, so the caption never shipped. Nothing to decide on the design side until the product answer lands.
- **blocks:** nothing shipping. It blocks trusting `3A`/`3B`/`3C` as a source, which is the more expensive thing to get wrong.

### `card-empty` and `card-placeholder` do not say what type their message takes
- **kind:** unowned default
- **found:** `design-reviewer` on `preview/cards.html`, after v2026.09.14.8 split the two components.
- **evidence:** the specimen sets one `role-caption` line. Voyager's `card-empty` utility sets no size, and its call sites carry a `role-ui-heading` title plus a `text-sm` message (`app/(data)/dispatches/page.tsx:526–529`). The spec names padding, ink and alignment and says nothing about the message's role, or whether a title is allowed.
- **proposes:** render both shapes — one caption line; a `role-ui-heading` title over a `role-body` message — inside the 32px panel at 390, both schemes, and let the container decide.
- **blocks:** nothing. Voyager's migration of the dashed sites (handoff 2026-09-14) can land either way.

### `_card.css` builds its own chrome labels — is specimen furniture exempt from the role layer?
- **kind:** two readings
- **found:** `design-reviewer`, across the specimens reviewed on 2026-09-14.
- **evidence:** `_card.css` declares itself "not system guidance", yet `.voice-eyebrow`, `.lbl` and `.pane-label` are hand-built uppercase labels at 0.06–0.08em tracking and tertiary ink, where `role-label-caps` is `--track-chrome` and secondary ink. Hard rule 10 bans a hand-assembled register; the file's own disclaimer implies its furniture is outside the rule.
- **proposes:** render the specimen frame both ways — furniture on `role-label-caps`, and as shipped — and decide whether a specimen's frame is held to the rules it demonstrates. A frame that breaks them teaches the break.
- **blocks:** nothing.

### `progress-ribbon` below `sm`: one caption, or the forbidden status caption?
- **kind:** production ahead, or two readings
- **found:** making `preview/progress-ribbon.html` fit 390. Five `markers` labels cannot sit under five segments at that width, so the specimen now copies voyager's `sm:hidden` branch in `bill-status-progress-bar.tsx`: one centred caption naming the active step.
- **evidence:** the 390 render of the specimen. `components.progress-ribbon.markers` puts a label under every segment and has no narrow form; `failure-honesty` sanctions a single caption only for failure; `status-redundancy` forbids captioning the ribbon with the status the RubberStamp already spells out.
- **proposes:** render both readings at 390 on the bill detail header with the RubberStamp present, then decide. (A) the caption is the active segment's own label, so write it into `markers` as the narrow form. (B) it is the status caption `status-redundancy` forbids, and it drops the other four positions, so narrow shows first-and-last labels or no label row.
- **blocks:** nothing; the specimen shows production's form until this is decided.

### Material backdrops carry no saturation boost
- **kind:** spec silent
- **found:** voyager session, 2026-10-08, measuring Apple's web materials (music.apple.com, maps.apple.com) against ours.
- **evidence:** every Apple Music material composes `saturate()` (1.8–2.2) before `blur()`: nav and player `saturate(2.2) blur(16px)`, small controls `saturate(1.9) blur(60px)`. Maps uses none. Our `materials` tiers are `blur()` alone. The cost this would offset is already on record: an opaque-ish plate removes a fixed share of the chroma beneath it (v2026.09.14.11), and canvas-hue dark glass lowers pane-to-ground separation on every tier (`materials.dark-glass-takes-the-canvas-hue`). The measurement came from headless Chromium with a Safari UA, not real Safari.
- **comparison render:** https://claude.ai/artifact/8zhJi4x824Zo5BZ9rthBs4 shows current against proposed in both schemes over the live aurora, with each change on its own toggle. It ran in Chromium, so use it for comparison only; it is not the ratification render.
- **proposes:** render `material-regular` and `material-thin` with and without `saturate()` over the band the product paints, at the warm stop and the cool lobe, in both schemes. Re-measure `color.ink-needs-an-opaque-ground`'s case and secondary ink on `material-regular`, because a saturated backdrop moves both. If adopted, it goes into `materials.*.backdropFilter` as one value for every tier.
- **blocks:** nothing.

### Light material ladder: steep on purpose, or never chosen?
- **kind:** spec silent
- **found:** same comparison.
- **evidence:** Apple spaces its five light tiers evenly. Ours jumps from `material-ultrathin` to `material-thin` to `material-regular`, so our `material-regular` sits about where Apple's ultrathick does, and `material-thick` sits above anything Apple ships. Apple's light fill is an off-white (`--glassMaterialBackground`), and ours is pure white. Our light strokes on `material-regular` and `material-thick` are heavier than Apple's single 5% stroke. Neither `DESIGN.md` nor `CHANGELOG.md` gives a reason for the step sizes, though `material-regular`'s near-opacity is likely what holds secondary ink on cards over the aurora.
- **comparison render:** https://claude.ai/artifact/8zhJi4x824Zo5BZ9rthBs4 shows current against proposed in both schemes over the live aurora, with each change on its own toggle. It ran in Chromium, so use it for comparison only; it is not the ratification render.
- **proposes:** nothing until the reason is known. If the steps were chosen for text contrast on cards, write that reason into `materials` and close this entry. If they were never chosen, render an evenly spaced ladder with secondary ink measured on each tier at the band's worst position, and decide from that render.
- **blocks:** nothing.

### Material rings: one stroke for every tier, or graduated per tier?
- **kind:** spec silent (the stroke); the fill is already decided
- **found:** voyager session, 2026-10-08, comparing Apple's web materials with ours, then a second capture of Apple's controls and cards, checked by independent verifiers.
- **evidence:**
  - **Apple uses one stroke for all its glass, whatever the thickness.** Mini-player, chrome-player, cloud-buttons and classical-button all paint the same 0.5px inset stroke: black at 5% light and white at 20% dark when the page sets a theme, rising to 10% / 25% under the system scheme. Apple's sidebar sets those values but paints no stroke from them.
  - **Ours is graduated per tier.** `materials.*.ring-light` and `ring-dark` step up with thickness, the dark rings stay well under Apple's, and none of them references `borders.hairline`, whose own values already match Apple's explicit-theme stroke.
  - **Apple's content artwork takes a separate 0.5px inset hairline,** not a glass ring.
  - **The fill is not reopened.** Apple's dark fill is a lifted neutral grey, the reading `materials.dark-glass-takes-the-canvas-hue` rendered and rejected for greying the blue. The report that ours is "black" came from voyager's stale generated tokens.
  - Measured in headless Chromium with a Safari UA.
- **comparison render:** https://claude.ai/artifact/8zhJi4x824Zo5BZ9rthBs4 shows current against proposed in both schemes over the live aurora, with each change on its own toggle. It ran in Chromium, so use it for comparison only; it is not the ratification render.
- **proposes:** render every tier with its ring as shipped, then with one ring for all tiers on `borders.hairline`, on canvas-hue glass at both band positions in both schemes. Check whether the heavier dark ring does the job of the dark inset bevel, and whether a 5% light ring still separates `material-regular` cards from the aurora. If one ring wins, `materials.*.ring-*` collapses into a reference to `borders.hairline`.
- **blocks:** nothing. Voyager's regeneration is a conformance fix that is owed whatever is decided here.

### Is a material's edge a boundary held to 3:1?
- **kind:** unowned default
- **found:** ring audit, 2026-10-09, from a live 390 dark render of a candidate page with `AskSignDock` showing. The side of the line and the dock's consumer status were ratified 2026-10-11 (`materials.material-chrome.edge`, `.consumers`); this half stays open.
- **evidence:** dock fill (16,16,24) against the card scrolling beneath it (16,16,21) is **1.002:1**, so in dark the edge has nothing to carry it but its line. No ring in the system clears the 3:1 non-text floor, and neither does Apple's: ring alpha over the dock's own ground, flat and before blur, is white 5% 1.12, 8% 1.21, 10% 1.29, 12% 1.38, 20% 1.83, 35% 3.2; black in light 5% 1.12, 10% 1.25, 20% 1.6, 35% 2.42. `DESIGN.md` puts "rules" under the 3:1 floor, next to marks and icons.
- **proposes:** render the dock and the tab bar at 390 in both schemes with the top edge at `border.subtle`, `borders.hairline` and a 3:1 value, over a canvas-hue card, and decide. If the edge is a boundary, every ring is redrawn; if it is exempt, write that down and say what separates an overlapping bar from content instead. Closes with "Material rings" above.
- **blocks:** nothing structurally.
### How many green plates a page carries when it lists asks
- **kind:** two readings
- **found:** homepage hi-fi (`Homepage · Desktop.png`, 2026-10-07, approved for ratification). One page carries eight `button-cta` plates: "Find your district" in the hero, a Co-sign on each of six ask cards, and "Find your district" again in the close.
- **evidence:** `DESIGN-HARD-RULES.md` item 2 says a plate is the control "one per surface, on the primary act", but `color.action.fill-rule` in `DESIGN.md` has no count, and nothing in `DESIGN.md` says "one per surface" apart from the FAB entry ("that screen's one green plate") and the lede's thirty-second path ("One green plate"). Production already shows a plate on each card: `AskSummaryCard.stories.tsx` renders `Button variant="cta"` Co-sign as "control", per card. Two readings: (a) the surface is the card, so each ask's Co-sign is that card's one plate; (b) the surface is the page, so one plate per screen and every other Co-sign becomes `button-secondary`. A second question comes with it: "Find your district" is navigation, not the crowd act the Commons palette-emphasis gives the plate to.
- **proposes:** nothing until it's rendered. Render the hero and the six-card grid at 1440 and 390 in both schemes under (a) and (b), and decide by whether the hero's plate still reads as the page's first action next to six others. Whichever reading wins, `DESIGN-HARD-RULES.md` item 2 and `color.action.fill-rule` have to say the same thing.
- **blocks:** the homepage build. Voyager has to know which buttons are plates.

### Ask title inside a card: serif (Commons) or `role-ui-heading` (container rule)
- **kind:** two readings
- **found:** the same hi-fi sets the six ask-card titles and the hero card's ask rows in sans semibold. Production's `AskSummaryCard.tsx:215` sets the ask title `font-serif font-medium`.
- **evidence:** the Commons surface says "Serif still carries the *ask itself*: a demand a constituent authored deserves the same weight a bill title gets." Hard rule 6 / `a-heading-belongs-to-whoever-it-works-for` says that inside a container the heading is `role-ui-heading`, unless the container's content *is* the document. The placement test ("could a second card join under this title?") answers no, which makes the title the card's own and sans. The two rules disagree on an ask card, and the hi-fi follows one while production follows the other.
- **proposes:** decide whether an ask is "the document" under rule 6's carve-out. If it is, add asks to the carve-out by name, and the hi-fi's titles conform to serif. If it isn't, narrow the Commons sentence to the ask *detail* page.
- **blocks:** the homepage ask cards and the hero "top asks" card, and through them any consistency with `/asks`.

## Needs a person — cannot close from inside the toolchain

Not a ratification queue. These do not resolve by deciding; they resolve by
someone doing something an agent should not do unprompted. Listed separately so
they stop reading as actionable to the next session that opens this file.

*(the Chromatic review item closed 2026-08-28 — the account is retired and no baselines were ever accepted; see the Open queue)*

---

## Recently ratified

Moved out of this file on ratification; listed here for one cycle so the code side can see what landed.

- **2026-10-11 (v2026.10.11)** — `--text-nav-active` carries the active nav ink, and the sidebar
  takes it too. `tabbar.labelFit` measures `role-body`. The progress-ribbon's active segment no
  longer pulses: **voyager drops `animate-pulse`**. Statute line numbers count source lines. A
  specimen may print a render-time value only if it is measured, never derived.
  `material-chrome`'s line moves to the edge facing content, its consumers are the tab bar and
  `AskSignDock`, and its spec fields now carry the stylesheet's values. **Chrome caps have two
  sites, closed: the section divider and the status stamp** — breadcrumbs, progress-ribbon
  milestones, column heads, count chips and the `Sources:` prefix go to sentence case, which
  voyager sweeps.


- **2026-09-14 (v2026.09.14 – .11)** — **the first pass after the `designer` agent was retired.**
  Dark `--text-secondary` → 60%: the withdrawn 4.28:1 was right, the 5.96 was the token band
  (**voyager's `secondary-text` utility is a literal, so neither scheme's 60% reaches a pixel
  yet**). The `ch` ban covers prose. `button-cta.ring` is `color.action-active` (3.49:1 light),
  and `button-fab` and toast actions take it too. `role-label-caps` takes the caption leading:
  a chrome label may wrap. `card-empty` splits into `card-empty` (material; content that did
  not arrive) and `card-placeholder` (dashed; a slot awaiting input). `a-count-row-is-reach`:
  ask count rows follow the ask's level and state. `materials.dark-glass-takes-the-canvas-hue`
  for every dark tier. The rail cut-out is recorded, not ruled. Plus conformance: nine oxblood
  passages in the spec's prose, `in oklab` on the aurora token, and stale entry points.
