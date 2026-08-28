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

### The consumer's `.claude/skills/` copy of the stylesheet must become a symlink
- **kind:** conformance, in the consumer's repo — **and it is agent configuration, so it waits on a person, not on either agent**
- **found:** the 2026-08-28.9 pass, grepping for HEXP in a path nobody was watching. `.claude/skills/amendment-design/colors_and_type.css` is a REGULAR FILE, not the symlink `design/` uses, with its own `SKILL.md` differing from canonical.
- **evidence:** carries `--color-danger: #dc2626` — the red-600 that measures 4.39:1 and moved to red-700 on 2026-08-28 — plus no `--canvas-live` and six HEXP mentions. It is the file an agent LOADS AS ITS SKILL in that repo, so the staleness is taught rather than stored. A sweep for a fourth copy found none.
- **proposes:** symlink both files to the canonical repo, as `design/` already is. A copy that must be remembered will be forgotten.
- **status:** with Jason, with the two `ln -s` commands and the diff. The implementation session declined to make the change on a peer's say-so — correctly, and on the same boundary that had it decline Chromatic and the branch landing. **Neither agent should action this.**

### `lede` carries two character counts, and both exceed the line's physical ceiling
- **kind:** unowned default
- **found:** the audit `measure.body`'s ratification asked for.
- **evidence:** `role-lede` at `--measure-lede` (24rem), first visual line counted: **42** statutory, **43** newcomer, **35** general, **40** lipsum, **45** short. The spec gives this one role two different numbers — **47** at the token (`avg glyph 8.17px`) and **52ch** in both the surface profile and the prose section. Neither is reachable: the **physical ceiling**, the most characters that can sit on that line before any wrap is possible, measures **~44**. The same ceiling for `role-body-serif` at 28rem is **64**, against its stated 69.
- **proposes:** the same treatment 28rem just received, plus the generalisation that makes it findable: **a count derived by dividing a width by an average glyph can land somewhere no prose can reach**, because the division has no term for the word boundary that actually ends the line. It is not an imprecise measurement — it is not a measurement. Both spec counts failed the same way, and the ceiling is the cheap check: if the claimed count exceeds the unbreakable-string maximum, no sample will ever produce it.
- **blocks:** nothing.

### Retraction — the `opsz 18` mechanism ratified at v2026.08.28.20 is false
- **kind:** conformance, against the spec's own new sentence
- **found:** testing my own claim while sizing a lint rule for it.
- **evidence:** one string at 15px — shipped state (`wdth 104` inherited, no opsz stop) **394.04px**; pinned `opsz 15` **394.04px**, identical; pinned `opsz 18` **366.84px**; `font-optical-sizing: none` **366.84px**. The statutory body was rendering at **opsz 15**, correctly optically sized, not at a display drawing. Separately at 48px, a `wdth`-only fvs and `normal` are byte-identical (660.76) while `optical-sizing: none` is 622.4 — **a `wdth`-only `font-variation-settings` does not disable `font-optical-sizing: auto`.** Only an `opsz` in fvs, or `optical-sizing: none`, does.
- **proposes:** delete the third direction added to `axis-must-be-declared-and-measured`. It was asserted from a computed fvs string showing a sans axis, without measuring whether that axis had the claimed effect — the failure the rule itself names, committed while writing the rule. What survives is only that a role beats an unstated inheritance. The `globals.css` comment explaining why there is deliberately no blanket serif fvs default — so `auto` stays live as the fallback — is correct and load-bearing: a sweep of **89** bare `font-serif` sites found the design cleared all 89.
- **blocks:** the sentence is in the spec now, so this one is worth doing before the next pass reads it as settled.

### Correction to the `lede` entry above — the "physical ceiling" was not one
- **kind:** conformance, against my own queue entry two above
- **found:** designer-21 measured it before ratifying, and it did not hold.
- **evidence:** I computed the "ceiling" by growing one word list until it exceeded the width, which yields the ceiling **of that glyph mix**, not the maximum the line can hold. Measured across mixes: at 384px, statutory 44 / general **47** / narrow prose 63 / narrowest glyphs 70; at 448px, statutory 62 / general 63 / narrow prose 87 / narrowest glyphs 98. **47 is reachable on ordinary prose, and 69 is reachable at 448px.**
- **proposes:** nothing new — the annotation fix already ratified is correct and both widths stay. Recorded because the difference decides the fix and my framing pointed at the wrong one: **a number at the top of a realistic band is an annotation problem; an unreachable number would have been a width problem.** As written, my entry argued for changing 24rem and 28rem, which would have been wrong.
- **also:** the two bad `lede` numbers both used `ch`, which this system bans — the ban's wording scopes it to *tokens*, so prose slipped past. That gap exists for every unit banned that way, and it is the greppable part.
- **blocks:** nothing.

### Two decisions gate shipping recession — both are Jason's
- **kind:** decided in part; the remainder needs a person
- **(a) THE MOBILE TAB BAR — CLOSED 2026-08-28.** It keeps `material-chrome`, as glass rather than a slab; see `v2026.08.28.32`. What remains from it is a measurement, not a decision: the fill level at which the bar's labels clear 4.5:1 over arbitrary content beneath. Superseded text follows for one cycle — Does it recede with the navbar, or keep `material-chrome`? It is the one chrome that overlaps SCROLLING CONTENT rather than a canvas, which is the strongest case for keeping a plate — and it has a second, independent reason: bottom edge, thumb-reached, and a target zone without a boundary is worse than one with. **If it recedes, `material-chrome` retires entirely.** Until this lands, the material has one consumer and an open question over it, and nothing new should be built on it.
- **(b) `--text-secondary` DARKENS IN LIGHT, 55% → 60%.** Not a preference — the measurement below makes it the precondition for the band invariant, and it touches every secondary-ink surface in the product, so it is a visible change that wants a person's eye before it lands.
- **the measurement, run 2026-08-28 as commissioned:** worst point of each band, 1440 frame, both schemes. **Spec token band: 4.53 light / 5.96 dark — passes. Shipped five-lobe curtain: 4.02 / 1.95 — fails, and cannot be tuned into compliance** (at ×0.3 alpha it is still 4.48 in light, approaching the bar asymptotically). **And the binding constraint is not the aurora at all:** on the light canvas with NO aurora, 55% black is 4.65:1 against a 4.50 bar, so the entire band budget in light is 0.15 of contrast. At 60% the worst point is 5.40:1.
- **what this settles without a decision:** the aurora divergence closes in favour of the **three-lobe token band**; the five-lobe curtain retires. That is forced by the measurement rather than chosen.
- **blocks:** shipping recession. Stage 9b can land the ground; the band and the ink ramp have to follow it before the invariant is true.

### `role-label-caps` sets `line-height: 1`, and nothing says whether a chrome label may wrap
- **kind:** spec silent
- **found:** stage 9a, converting the footer's copyright line — then again, immediately, at a site converted in an earlier stage that I had not touched.
- **evidence:** measured in `Footer` at 390, both `role-label-caps`:
  - the copyright line wraps to **3 lines at `line-height: 12px`** — the lines touch, no leading at all. I caused this one by dropping the site's `leading-4` as part of taking the role, and restored it.
  - **"Law & Legislation"**, a section header from an earlier stage, wraps to **2 lines at `line-height: 12px`** and has the same collision. Nobody introduced it in this pass; it has been shipping.
  - Across the codebase: **79 usages in 43 files**, of which exactly **one** overrides leading — the one I just restored. So this is not a known pattern being managed; it is a property of the role that surfaces only when a label wraps, and it looks fine at every width where it doesn't.
- **proposes:** decide which of two things is true, because they lead to different code. Either **a chrome label never wraps** — consistent with the existing rule that *"if a label no longer fits at 12px, the layout is the problem"* — in which case both footer sites are layout bugs and the role is correct as drawn. Or **a chrome label may wrap**, in which case `line-height: 1` is a single-line assumption baked into a role used in 79 places, and the role should carry a leading that survives a second line. I have not applied either: the second footer site is left as found, because picking the leading value here is exactly the thing that isn't ratified.
- **note on the rule this tests:** the single-line assumption is invisible at every width where the label fits, which is most of them — the same shape as the padded-measure and the average-glyph findings. A default that is correct in the common case and silently wrong in the uncommon one is not caught by looking at the common case.
- **blocks:** nothing. Stage 9a shipped with the one regression I introduced repaired and the pre-existing one queued rather than guessed at.

### Chromatic retired — Storybook local is the visual instrument
- **kind:** decided by Jason 2026-08-28
- **decision:** the account is not renewed. **Storybook runs locally and is the surface for visual iteration.** The standing "nobody has walked the diffs" item closes with it: there are no diffs, and there will not be. Build 3761 took no snapshots, so nothing was ever canonised — there is no baseline to lose.
- **what this costs, named rather than assumed:** there is now **no automated visual regression detection**. Nothing will tell you a token change moved pixels on a surface nobody opened. The `.18` chrome change and the `.23` recession would each have lit up every route; neither would be caught automatically today.
- **what actually catches things now**, and it is a real set rather than a gap: the person iterating in Storybook; the designer's independent review pass on story renders at both widths and both schemes; `design:lint`; and the a11y assertions in stories, which have already caught two real failures this migration (the error toast at 4.41:1 and a sub-floor label). **These are human-paced and story-scoped.** That is adequate at this size and should be described that way rather than as equivalent to a diff on every route.
- **available at zero new dependency cost if a regression ever bites:** `@vitest/browser` 4.1.9 already ships `toMatchScreenshot`, and the browser-mode runner is already how the 556 tests execute. **The precondition if it is ever turned on: baselines must be generated in the same environment that checks them** — macOS-generated baselines will not match Linux CI, and that mismatch is the usual reason self-hosted visual regression gets abandoned. Note also that self-hosting Archivo helps determinism here and moving it to a CDN would hurt it, which is a live interaction with the still-open font question.
- **stories are cheap and are now the instrument (Jason, 2026-08-28):** create and manage them liberally to make sure everything looks right. That turns this from a loss into a method — **trap 3 says nothing unrendered stays true, and liberal story coverage is the direct answer to it.** It also reaches the tier-2 blind spot: `HexStateMap` styles imperatively and `design:lint` cannot read it, but a story with a rendered-output assertion can.
- **what makes a story count**, because 563 stories nobody opens is not coverage either: it renders (a story that renders nothing is worse than none — one was deleted this migration for exactly that), it carries the a11y assertion, and it covers a **canonical state** rather than duplicating one. That is the definition of done already written down: every visual component has a story covering its canonical states, checked at both widths and both schemes.
- **owed by voyager, cleanup:** `.github/workflows/chromatic.yml`, the `chromatic` script in `package.json`, the `@chromatic-com/storybook` addon and the two references in `deploy-links.yml`. A workflow that cannot run is the same class of thing as a lint rule that reports files clean without reading them.

### The full-bleed dependency is backwards — the inset route is the one with no edge
- **kind:** two readings, settled by rendering both
- **found:** stage 9b, running the check the recession ruling asked for before calling it done.
- **evidence:** the receded `<aside>` computes to `background: rgba(0,0,0,0)`, `backdrop-filter: none`, `box-shadow: none` — it owns nothing, so its edge is whatever its neighbour supplies. Rendered both neighbours at 1440 dark, sampling the composited page either side of the rail's right edge:
  - **full-bleed neighbour** — `material-regular` resolves to `rgba(0,0,0,0.41)` + `blur(50px)`, running the full height flush to the rail. **A continuous, high-contrast boundary down the whole viewport.**
  - **inset/centred column** — scanning 700px right of the edge at mid-height finds **no plate at all**: `rgba(0,0,0,0)` on both sides. The card sits ~440px away and occupies only the top band, so **below the last card the rail has no edge whatsoever** and the nav labels float on open aurora.
- **so:** the ruling states *"the rail's edge is implied by the content column's inset — any full-bleed route removes that edge and there is no hairline to fall back on."* Measured, **it is the other way round.** A full-bleed neighbour is the case that *supplies* an edge; the inset column is the case that has none, and it has none over most of the viewport's height rather than in a corner. The premise named the wrong route, so the check it prescribed would have passed the failing case and flagged the safe one.
- **proposes:** nothing yet — this changes *where* a hairline would be needed, not whether. Queued rather than fixed because adding a rail edge is precisely the material decision recession just removed, and I am not re-introducing one on my own reading. The renders are the two `Sidebar` stories (`WithContentColumn`, `FullBleedNeighbour`), both schemes, added for this.
- **note:** the app's real routes resemble the inset case — cards with gaps, bare aurora between and below them — so this is the shipping state, not an edge case.
- **blocks:** nothing landed. Worth settling before 9b is called done.

### The cut-out is real, and it is worse in light than in dark
- **kind:** spec silent — the check `.28` asked for, answered
- **found:** stage 9b, rendering `Sidebar/FullBleedNeighbour` in both schemes against the cut-out question rather than the edge question.
- **evidence:** measured, `material-regular` in light is `rgba(255,255,255,0.85)` + `blur(50px)`. Compositing a representative aurora lobe under it against leaving it bare:
  - **rail** (no plate, raw aurora): `rgb(150,228,183)`, **34.2% saturation**
  - **panel** (same pixel under the plate): `rgb(239,251,244)`, **4.8% saturation**
  - the plate removes **86% of the aurora's saturation**; the receded rail keeps all of it.
  So on a full-bleed route the rail carries **~7× the chroma of everything beside it.** Read in the render, it does not look like a surface the nav sits on — it reads as a coloured strip cut into the panel, with the glass as the object and the rail as the hole.
- **and the direction matters:** this is **worse in light than in dark**, which is the reverse of where recession's risks have been looked for. In dark both sides are low-luminance and the gap is mostly tonal; in light the glass washes to near-white while the rail keeps a saturated lobe, so the rail becomes the single most chromatic region on the screen. **A change made to help chrome recede makes it the most prominent thing on a full-bleed light route.**
- **proposes:** nothing — same reason as the edge entry. Every fix here (a plate, a hairline, damping the aurora under the rail) is the material decision recession removed, and this is the second consecutive case where the intuitive fix would undo the ruling. Worth noting the interaction: **the aurora divergence and this are the same lever.** The three-lobe token band the shipping gate already requires is lower-chroma, which would shrink this by construction — so this may not need a decision of its own once that lands.
- **blocks:** nothing landed. It is the open question on 9b, not the edge one.

## Needs a person — cannot close from inside the toolchain

Not a ratification queue. These do not resolve by deciding; they resolve by
someone doing something an agent should not do unprompted. Listed separately so
they stop reading as actionable to the next session that opens this file.

*(the Chromatic review item closed 2026-08-28 — the account is retired and no baselines were ever accepted; see the Open queue)*

---

## Recently ratified

Moved out of this file on ratification; listed here for one cycle so the code side can see what landed.

- **2026-08-28 (v2026.08.28.32)** — **the tab bar keeps `material-chrome`, and it is
  glass.** Decided by Jason: a mobile menu on the iOS model sits above content by
  definition. The material survives with **exactly one consumer, deliberately** — stated
  so a cleanup pass doesn't read it as an orphan. Verified: the `h-18` spacer only makes
  the last item reachable and does not stop content passing behind the bar mid-scroll,
  and a bottom bar that scrolls away is not a tab bar. **Blur and transparency are the
  point, not a compromise** — but the 90% desktop figure does not transfer, because that
  was immunity over a canvas and this is legibility over arbitrary content. **Binding
  constraint: the bar's own labels clear 4.5:1 against the worst content beneath — blur
  spreads a colour, the fill is what floors it.** Needs a measurement. Also corrected: the
  recession ruling's "the tab bar takes whatever the navbar takes, always" was a false
  absolute; the shared identity is the type register, not the material.
- **2026-08-28 (v2026.08.28.31)** — **the header stops being sticky**, decided by
  Jason. Satisfies `.30` by the cheaper of its two means — don't overlay the scroll,
  rather than contain it — **one class on one component, no structural change.**
  Verified what it carried: bill search on default routes, the conversation title on
  one. Named cost: **the rail is `md:flex` and the header is not, so mobile has nothing
  to inherit it** — wordmark, search and auth scroll away together and only the bottom
  tab bar persists, putting a signed-out user's sign-in affordance above the fold only.
  **Conformance:** remove `sticky top-0 z-10` from `Navbar/index.tsx`.
- **2026-08-28 (v2026.08.28.30)** — **receded chrome requires that nothing scrolls
  beneath it.** Found live: body text scrolling under the receded navbar and rendering
  *through* the conversation title — text on text, not a contrast failure. The
  criterion already existed in the recession ruling ("the one chrome that overlaps
  scrolling content") and **only one member of the set was named**; the conversation
  title bar is the second. Chrome that must overlap scrolling content keeps a material
  and is not receded. **The fix is structural** — an inner scroll container starting
  below the chrome, a pattern the spec already records for other app routes; the
  conversation route scrolls the document. **A hairline does not fix it** — a hairline
  is a boundary and the failure is transparency.
- **2026-08-28 (v2026.08.28.29)** — **nav labels are not chrome.** Every navigation
  label shipped in tracked uppercase; they take `role-body`, sentence case, in the
  sidebar and tab bar alike. The category error is the reusable part: **"the navbar is
  chrome" is a claim about a surface and was read as a claim about its content** — then
  it spread by analogy, because the tab bar's typography was specified and the sidebar
  copied it, there being no sidebar entry at all. Measured, it also doesn't fit:
  "CONVERSATIONS" at chrome caps is **153.1px in a 161px slot — 95%** — with `truncate`
  masking it, which is `widthDiscipline-measured` exactly. `role-body` is 63%. No fit
  risk in the change; sentence case is narrower at every label. **Conformance owed:**
  `SidebarNavItem.tsx:37` and three sites in `TabBar.tsx`.
- **2026-08-28 (v2026.08.28.28)** — three corrections from 9b, all verified.
  **The full-bleed dependency was inverted:** measured, the full-bleed neighbour
  supplies a flush `material-regular` edge at all heights and the inset column has
  **none at any** — and the inset case is the shipping state, so the prescribed check
  would have passed the failing case and flagged the safe one. The inset case needs no
  edge (open canvas, not a seam); the case to watch is a receded rail flush against
  full-height glass reading as a **cut-out**. **The active row was never a fill** —
  shipped state is already ink + weight + filled glyph, the only `bg-black/5` being a
  hover. So `.23` removed a fill that never existed and `.27` preserved a tint that
  never existed: **a correction is not self-verifying; it is a claim pointing the other
  way, wearing the credibility of having admitted a mistake.** Two items on the relayed
  conformance list were already done by stage 3.
- **2026-08-28 (v2026.08.28.27)** — the active nav row **unsettled** after being
  ratified from a recommendation that had explicitly asked to be measured. Superseded
  the same day by `.28`, which established there was no fill in the first place.
- **2026-08-28 (v2026.08.28.26)** — **Chromatic retired**, decided by Jason;
  Storybook local is the visual instrument. The standing "nobody walked the diffs"
  item closes with it — build 3761 took no snapshots, so nothing was ever canonised.
  **Named rather than assumed: there is now no automated visual regression
  detection.** What catches things is the person iterating, the designer's review
  pass, `design:lint`, and story a11y assertions — human-paced and story-scoped, which
  is adequate at this size and is not equivalent to a diff on every route.
  `toMatchScreenshot` is already in the tree if that ever changes, with the precondition
  that baselines come from the environment that checks them.
- **2026-08-28 (v2026.08.28.25)** — `measure-by-painting-not-by-parsing` sharpened:
  **the canvas is only an instrument when you paint with it.** Three of the four ways
  to ask a colour question return the string (`getComputedStyle`, a regex over it, the
  `fillStyle` echo); only `getImageData` returns a pixel — and **the two failing canvas
  paths look more rigorous than the naive regex while being identically wrong.** The
  failure propagates into an *action*: `[0.66, 0.148, 160]` read as RGB is a near-black
  blue, so a green reports as failing on light and passing on dark, and someone "fixes"
  a colour that was correct.
- **2026-08-28 (v2026.08.28.24)** — three corrections. **I attributed a conformance
  list to the session that did not write it** (it came from the handoff) and agreed
  with an observation that session never made. Nothing false reached the spec, but a
  ratification that credits a finding to a party who never made it **manufactures a
  verification that never occurred** — attribution is part of the evidence, not
  courtesy. **The item I agreed to was also wrong:** `prefers-reduced-transparency`
  does not "match nothing" under recession — it still collapses the card tiers, and
  cards stay `material-regular`; recession simply does not interact with that path.
  New `a11y.contrast.measure-by-painting-not-by-parsing`: `getComputedStyle`
  serialises `oklch()` verbatim, a naive regex yields three plausible and wrong
  numbers, **and the canvas `fillStyle` echo does not resolve it either** — only
  painting and reading pixels does. The `.23` binding constraint independently
  confirmed at 4.63 vs 4.65.
- **2026-08-28 (v2026.08.28.23)** — **chrome recedes**, decided by Jason, reversing
  `.22` which was mine. `.22` measured label legibility and was right about the cost;
  it **had no content cards in it**, so it could not see the figure/ground inversion
  that decided the question — two chrome plates form an L brighter than the cards
  they frame. Both entries landed, the six spec edits landed, the *never bare text*
  phrase is gone from all three entry points, and three specimens are marked. **The
  commissioned band measurement did not land where the task expected:** the five-lobe
  curtain cannot be tuned into compliance at any alpha in light, the three-lobe token
  band already passes, and **the binding constraint is `--text-secondary`, not the
  aurora** — 55% black is 4.65:1 on a bare light canvas against a 4.50 bar, so the
  whole band budget is 0.15. Both remaining gates are queued above.
- **2026-08-28 (v2026.08.28.22)** — **chrome does not recede.** Ruled from a
  specimen built for it (`preview/chrome-recession.html`), both widths, both
  schemes, both auroras, ground sampled beneath each label. The collision resolved
  rather than avoided: **the hard rule is broader than its own reason** — the
  neutral ramp survives the bare band (nav 4.57 light / 6.12 dark), which
  `ink-needs-an-opaque-ground` already implied. Recession fails on what the rule
  never named: the title over the brightest lobe keeps 14.03:1 with a ground and
  **6.22:1 without**, surrendering 56% of its headroom to a gradient that moves;
  and the active item's Midnight Indigo measures **1.22/1.34:1** with no plate —
  dead, exactly as `primary.plate-not-mark` predicted. Four answers: (1)
  `material-chrome` stays a material at the `.18` value; (2) **"Chrome is still"
  survives and argues against recession** — a surface with no material cannot be
  still, it shows whatever moves under it; (3) the tab bar takes whatever the
  navbar takes, always; (4) the active item keeps its plate, which makes full
  recession internally impossible. **Stage 3's conformance stands — nothing is
  reverted, 9b proceeds.**
- **2026-08-28 (v2026.08.28.21)** — **retraction.** The `opsz 18` mechanism
  ratified at `.20` is false and was tested so: a `wdth`-only
  `font-variation-settings` does **not** disable optical sizing, and the shipped
  body was at `opsz` = font-size throughout. `role-body-serif` at 16px still
  stands, on the plain ground that a role beats an unstated inheritance. **The
  replacement claim was also wrong** — "the counts exceed what the line can hold at
  any prose" measured false: 47 is reachable at 384px on ordinary prose, 69 at
  448px on narrow prose. The numbers sit at the top of the band *for statutory
  prose*, which decides the fix: **top-of-band is an annotation problem, unreachable
  would have been a width problem.** `lede` fixed on three counts at once — two
  different numbers for one role, two sites using the banned `ch`, neither measured.
- **2026-08-28 (v2026.08.28.20)** — the statutory queue, emptied.
  `a-measure-is-a-property-of-the-line`: a measure and horizontal padding may not
  share a box — the framework sizes `max-width` against the border box, so a 448px
  token with `lg:px-12` set a **352px line**, and *the failure looks like a
  decision*. `body-count-is-a-band`: `measure.body` does **not** set 69 characters;
  measured 58–64 across two sessions and three prose samples. **A character count
  is a measurement of a line of specific prose, not a property of a width** — the
  same shape as `ink-ground-is-a-placement`. Width unchanged; the annotation was
  the wrong part. Paper islands gained its code-side consequence: `dark:` is
  **inert** inside a paper canvas, so those 58 classes are dead code that reads as
  intent. **And a correction of mine:** the handoff's "the measure is already
  correct, do not touch" measured the old `72ch` column and asserted an identity
  with a token whose value I never checked.
- **2026-08-28 (v2026.08.28.19)** — **three tiers of reach**, contributed by the
  implementation session and better than the rule it sharpens. Tier 1 the class
  layer, a grep decides it. Tier 2 imperative styling — a grep cannot read it but a
  **computed-style assertion can**, so the cost is effort, not possibility. Tier 3
  **content**, which no static check reaches at any effort, because the rule is
  about what a string *means*; it can only be **moved upstream** to the generator.
  Knowing the tier is the point: tier 2 left as a note is a failure of will, tier 3
  pursued in the design layer is a waste of it.
- **2026-08-28 (v2026.08.28.18)** — **chrome did not belong to its own page.**
  `material-chrome` dark was zinc-900 at 90% — a *warm* neutral on a *cool* canvas,
  compositing to #16171b beside content at #1c2a4c. Now the canvas's own hue at the
  **same opacity**, as a `color-mix` of `--canvas-live`. Immunity unchanged and
  measured: a green CTA underneath moves it by 25, identical to the zinc, against
  222 for the retired white wash. **The sequence is the finding** — this value was
  *reaffirmed the same morning* against the question "does chrome take a green
  cast", and was blind to "does chrome belong to the canvas". A material must be
  judged against its ground *and* what passes under it, in one pass. The
  `prefers-reduced-transparency` path had it worse — opaque warm slabs on a live
  aurora, never rendered — and is now the canvas family separated by luminance.
- **2026-08-28 (v2026.08.28.17)** — `axis-must-be-declared-and-measured`. The old
  self-hosting rule's stated reason ("survives a blocked CDN") was **false** and is
  deleted — Newsreader and Plex Mono come from Google in the line above, so chrome
  surviving alone was never a chosen posture. Verified live: Google **does** serve
  Archivo's full `wdth` axis when asked. **But omit it and Google pins
  `font-stretch` to 100% silently** — the register collapses with no error. So the
  argument is about *where the axis lives*: self-hosted it is a property of the
  **file** and cannot be forgotten; on a CDN it is a property of the **URL** and is
  omitted by default. `retired-axis-fails-silently` from the other side. Whichever
  host: declare the axis and **verify by measurement** (a chrome string at wdth 125
  vs 62 must differ — ~230px vs ~116px), in CI, not in a comment. **The hosting
  choice is not ratified** — it turns on a privacy question that is not typographic.
- **2026-08-28 (v2026.08.28.16)** — `measure-before-you-shrink`, the missing half
  of the stat-caption ruling. That one answered "the label does not fit"; this one
  answers the common case, where **nothing was tight and the type was shrunk by
  habit**. Measured: "HOUSE OF REPRESENTATIVES" sets 251px at 12px with
  `--track-chrome` in a 358px column at 390 — fits with 100px to spare, was
  shipping at 11px. Three outcomes now named, and "the layout is the problem" is
  the rare one, not the default. Came out of the statutory composition pass, where
  the column was already correct at 69 characters and the real defect was a TOC
  gutter giving 49px to a single digit.
- **2026-08-28 (v2026.08.28.15)** — `a-guard-may-degrade-but-never-silently`,
  **revising a position both sides had already agreed on.** "A guard that skips on
  a missing credential is not a guard" is right about *silence* and wrong about
  *degradation*: a job red for reasons unrelated to the PR that trips it is a job
  someone deletes, so permanent red is a guard with a countdown on it. Two tiers —
  a credential-free stamp-versus-pin check that always runs, and the real
  regenerate-and-diff whose **absence posts a warning naming the check that did not
  run**. Generalised: *a check that cannot run must say so where its result would
  have appeared.* Fourth and sharpest member of the silent-failure family — the
  check itself reporting a result it did not earn. Also corrected: my "DESIGN.md
  differs by two lines" was measured at `.12` and quoted at `.14`, where it was 49.
- **2026-08-28 (v2026.08.28.14)** — real-client email testing **closed**, the only
  item that could not close from inside the toolchain. Sent through production's
  own render path and checked in-client; the CTA ink label, the inverting step
  badges, and **the issuance block including the double rule** all held — the
  double rule being the specific thing the profile predicted Gmail Android would
  take first. Recorded as a result, not deleted.
- **2026-08-28 (v2026.08.28.13)** — `enforcement-has-a-blind-spot`: every check
  here reads the class layer, so d3 / canvas / third-party-literal styling is
  invisible to all of it — **and that is where the previous two silent-failure
  rules were hiding.** `HexStateMap` verified carrying an explicit 8px clamp
  against the 12px floor and 18–35px tiles against the 44px target floor, past a
  clean lint run. **A clean lint run is a statement about the class layer, not
  about the product.** Filed as a ticket request; also recorded that the branch
  was built against `.10` and nothing since changed a rule or a token, so it
  needs no re-conformance.
- **2026-08-28 (v2026.08.28.12)** — three specimens (`ink-and-ground`,
  `uppercase-two-homes`, `tint-is-not-a-plate`) closing trap 3 for the day's
  rules, and `_card.css` corrected: it painted `--canvas` and drew the aurora
  over it, so all 52 cards had been demonstrating rules on a ground that
  contradicts one of them. A `.pane.dark` convention added — the frame had no
  dark mode at all.
- **2026-08-28 (v2026.08.28.11)** — the **entry points**, swept. `SKILL.md` was
  wrong or incomplete on eleven counts after ten same-day ratifications never
  touched it, including `red-600` as the danger value and no mention of the
  which-green switch at all. `_adherence.oxlintrc.json` sanctioned twelve
  `--hexp-*` entries three versions after their deletion. No new rules — the
  sweep those ten passes owed.
- **2026-08-28 (v2026.08.28.10)** — `composed-register-fails-silently`,
  contributed by the implementation session and the more useful half of the
  silent-failure pair: `sans-chrome` + `uppercase` + `tracking-wide` compiles,
  renders, and looks approximately right, and only a computed style says
  otherwise. A retired axis does nothing; a hand-assembled register does
  something close enough to look deliberate, which is **harder** to find.
  **So this is what the role layer is for, stated plainly for the first time: a
  role is the only form in which a register is CHECKABLE.** Nothing can assert
  about an assembly with no name. That is why the rule greps the assembly rather
  than measuring the value — and it caught the `input-label` UTILITY, where one
  line put every labelled field five times under and no call site was wrong. A
  sweep looks where things are used; a rule looks where they are defined.
  Tracking divergence 44 of 46 closed, verified by running the grep.
- **2026-08-28 (v2026.08.28.9)** — `retired-axis-fails-silently`: HexStateMap
  was setting `'HEXP' 100` **in live code** on a face with no such axis; CSS
  ignores an unknown variation axis, so the line ran, warned nothing, did
  nothing, and read as deliberate. **The permanent grep set is a correctness
  tool, not documentation hygiene** — and that is why it must cover comments and
  code alike, and why a retired name should be deleted rather than left
  resolving. `the-skill-directory-is-a-third-home`: the consumer carries a third,
  non-symlinked copy of the stylesheet in `.claude/skills/`, eight ratifications
  stale in one day, and it is what an agent loads as its skill — trap 1 in a new
  directory and worse, because the staleness is taught rather than stored. Both
  consumer-side fixes are queued above.
- **2026-08-28 (v2026.08.28.8)** — `hexp-*` aliases **deleted** from the token
  layer and the spec; a reference now fails loudly rather than resolving,
  because a working fallback is what lets a retired name survive a grep.
  Mapping kept inline for anyone reading old code. **The grep-set item is NOT
  cleared:** `HEXP` survives in seven comments across six consumer files, three
  of which teach something additionally wrong (a tracking value flagged as wrong
  at v2026.08.28.2 and still called "per spec"; a 10px label under a floor with
  no chrome exception). **The grep set must be enforced over comments, not just
  code** — the stage 8 lint rule already scans comments, so `HEXP` and the
  retired weight ladder just need to be in it verbatim.
- **2026-08-28 (v2026.08.28.7)** — the stage 8 queue, emptied.
  `uppercase-has-two-homes`: uppercase is legal in `role-label-caps` (chrome)
  and `role-ceremonial` (display, once per page) and nowhere else — hard rule
  5's exception was a **whole role**, the fourth instance of that pattern and
  the first surfaced by the grep procedure. The test is **designation or
  sentence**: a bill identifier is ceremonial, "Browse bills by state" is a
  heading. `tracking-is-half-the-register` **escalated from the breadcrumb** —
  the 08-27 ruling that width-without-tracking is a different register was fixed
  at one site and never swept; five more use `tracking-wide` (0.025em) where
  0.12/0.20em belongs, including the ceremonial site, which is therefore missing
  the property that defines it. All five **hand-assembled a register instead of
  taking the role class** — a width preset is not a register. Plus: the
  copy-pasted "do not sweep to serif" comment is an instruction not to fix,
  correct at one site and false at four.
- **2026-08-28 (v2026.08.28.6)** — `canvas-two-names`, scheduled rather than
  carried a fourth pass. `--canvas` is the **opaque ground** (value unchanged,
  nothing consuming it moves); `--canvas-live` is the **Blue Hour base** under
  the aurora — the literal `#080c17` that lived in the consumer's body and was
  named nowhere. `.amendment-app` now paints the Live canvas, which it always
  should have. `ink-needs-an-opaque-ground` cites a token instead of prose.
  `profiles.email.substitutions.brand` names `#033271` + `#60a5fa` — email has
  no hover, so a link is decided by colour alone; it stays in the profile so the
  product does not acquire a blue by way of email. The CTA is correctly NOT one
  of its roles. Real-client dark-mode email testing moved out of the queue into
  **Needs a person**. Correction: the stage 5 revert was three controls, not
  four — the other two were hover.
- **2026-08-28 (v2026.08.28.5)** — the stage 5 queue, emptied. **Three things
  were never on the motion budget**, so the honest count is still two, not four.
  `committed-state-is-not-motion`: a control drawing a state the user just
  committed is feedback, not motion — stage 5 read "never transition transform"
  as unconditional and made four controls snap, including the toggle, **whose
  own entry specifies the slide**. Revert those four. The aurora is a **layer,
  not a surface** — it breathes, per the document's own thesis, stated twice in
  prose and never encoded in `motion.rules`. **Marketing is outside the register
  table**, with its motion bounded (pausable, viewport-gated, motion-safe, never
  on record state) — the marquee and shimmer already satisfy every bound, so the
  rule ratifies what shipped. The profile-hiding corollary **escalated from a
  lesson to a procedure** on its third instance: grep component entries for
  exceptions before declaring a general rule absolute.
- **2026-08-28 (v2026.08.28.4)** — the stage 4 queue, emptied. **`danger` moved
  to red-700**: 4.39:1 as ink on the light opaque ground, under AA, and the only
  semantic base not at the -700 step — the odd one out and the only failure were
  the same fact. Reported as unfixable ("no darker option"); there was one.
  `functional` at 4.33:1 explicitly NOT moving — graphical objects take 3:1 and
  its role forbids text. New `opaque-ground-is-not-uniformly-safer`: yesterday's
  rule was written from dark evidence and makes light-mode ink HARDER, so
  re-measure both schemes when a surface moves onto the opaque ground.
  **`colors_and_type.css` was behind `DESIGN.md`** on material-chrome light
  (75% vs 55%, retired 08-27 and deleted everywhere but the stylesheet) — caught
  by the new regenerate-and-diff guard on its first run, after two ratification
  passes read both files and missed it. `a11y.targetSize` gains its **inline
  exception**, which was in WCAG 2.5.5/2.5.8 all along; at `role-body`'s 24px
  line box a 44px inline target overhangs 10px into the lines above and below.
- **2026-08-28 (v2026.08.28.3)** — the stage 2.5 and stage 3 queues, emptied.
  **Glass blends, it does not cover** is the through-line. Ratified:
  `ink-switch-is-palette-wide` (the light/inverted switch governs the whole
  palette, not green — no token clears 4.5:1 in both schemes);
  `ink-ground-is-a-placement` (the aurora is a gradient, so one token swings
  2.15→6.32:1 by position — **a contrast number without a position is not a
  measurement**, and no table is recorded for that reason);
  `ink-needs-an-opaque-ground`, which **retires the hard rule** that
  `material-chrome` re-establishes a ground — measured, glass is 2.87:1 where
  opaque is 6.10:1, and thicker materials are *worse* because `blur(50px)`
  averages neighbouring bright lobes in; `tint-is-not-a-plate` (settled from
  the supplied ladder — alpha is not the channel carrying affordance, so
  status is ink on neutral material and there is no tint token in any family);
  `primary.plate-not-mark` (a limitation, not a gap — the primary/slate
  distinction is light-mode-only). **Two entries dissolved on re-measurement:**
  `danger` passes inverted at 4.71:1 on the opaque canvas — a placement bug was
  about to buy a palette change; and `material-chrome` already specifies a dark
  wash — the navbar comparison rendered the consumer's reimplementation
  labelled as the spec. Both are conformance. New:
  `materials-are-a-second-copy`. Canvas naming and the materials guard left
  open above.
- **2026-08-28 (v2026.08.28.2)** — the ENACTED example rewritten to carry the
  which-green switch instead of reading absolutely (the absolutist reading ships
  a 3.56:1 dark label; the code was already correct). **The finding generalised:
  an example placed after a rule outranks it in practice**, because the example
  is what a hurried reader reads. The same class was then swept — four more
  sites still taught flat "action green for enacted" (accent `colors:` field,
  Archive register prose, accents inventory, `README.md`), which under the
  ratified rule is the spec instructing a 2.64:1 failure. Two resolved oxblood
  Known Divergences **deleted, not softened** — production migrated. New
  `color.action.fill-rule-ink-ground`: measure ink against the ground it lands
  on, never white (success is 4.99:1 on the page ground, 4.32:1 one plate step
  down), and **green tint plates carrying green ink cap at 10%** (4.52:1; 15%
  fails). Version scheme given a same-day serial, dated UTC.
- **2026-08-28** — the stage 2 queue, emptied. `fill-rule-which-green` (the
  fill rule was missing a sentence, not contradicting itself: fill-vs-ink is
  global; *which* green is ink is a contrast fact — `success` light, `action`
  inverted, action-as-text forbidden at 2.62:1; "where a crowd is counted"
  scopes the Momentum accent, not the semantic success family). Its corollary,
  `fill-rule-corollary`: **a rule that lives only inside a profile or a
  register is invisible to the general case** — claim 2 was already fully
  specified inside the email profile, and stage 2 re-derived it by measurement
  and landed on the identical pair. `color.neutral` re-pointed at the framework
  after Tailwind v4 moved zinc to oklch. Consumer token **extraction**
  sanctioned in place of the direct import that cannot work, with a mandatory
  CI regenerate-and-diff guard. The 12px-floor-versus-corner-badge question
  withdrawn — the spec already answered it ("if a label no longer fits at 12px,
  the layout is the problem"); queueing it was the error, not the rule.
  `DESIGN-HARD-RULES.md` restored after the repo-split prune deleted it.
- **2026-08-27** — `role-display-minor` (1.125rem, weight 700); `emphasis-serif-inline` (serif italic ≥1.125rem, roman 600 below); `widthDiscipline-measured` (chrome is wider than caption — a small label in a fixed narrow plate can't be chrome unless the plate widens); breadcrumb `weightHierarchy` (ancestors 400, current 600); `material-chrome` light resolved to 55%, dead 75% deleted; `darkMetrics-invariant` (light-clean implies dark-clean); the retired weight ladder purged from seven sites in the spec.
