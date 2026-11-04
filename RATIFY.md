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

### Does --card-pad cover the featured card
- **kind:** spec silent
- **found:** voyager, after v2026.10.17.16. The featured `AskSummaryCard` pads one step larger than the standard card at both sizes (`p-5 sm:p-6`). `components.card.padding-steps-with-the-card` names one card padding and says nothing about a featured variant.
- **evidence:** not yet rendered. Render the featured card in `--card-pad` against its current padding, 390 and 1440, both schemes.
- **proposes:** either the featured card reads `--card-pad` like every card, or a second step (`--card-pad-featured`) with its reason.
- **blocks:** nothing; the featured card keeps its padding until decided
- **update (2026-10-28, `/asks` rail):** a second unequal pad in one row. The `/asks` rail card pads 16px and the feed cards beside it 20px, and the rail sits outside any `@container/card`, so `--card-pad`'s step can't reach it. Say whether a rail card reads `--card-pad`, and whether cards sharing a row must share a pad. Evidence: voyager-6e renders, both schemes, 390/1024/1440: `/private/tmp/claude-501/-Users-jason-git-voyager/de21042d-e7e6-4509-a94f-cec8582cb783/scratchpad/railC/` and `…/review/` (design-reviewer's pass, with `measure.json`).
- **update (2026-10-28, MCP sales page):** marketing feature cards. The two “Ways in” cards and the closing pilot card padded 32px and 56px; the review held them to `--card-pad` (the `--space-5` step at 1440, `--space-4` at 390), and that is what the boards now show. Say whether the marketing register gets a larger step for a feature card, or whether `--card-pad` binds there too. Evidence: Paper “MCP Sales” (`app.paper.design/file/01M61ZPHHVGQ26KXYFQ3FAFBJZ`), four boards: light and dark, 390 and 1440.

### A green mark on the bare aurora (the "On the record" dot)
- **kind:** unowned default
- **found:** same review. The dot is `--color-momentum` as a non-text mark on the aurora: 2.49:1 in light against the 3:1 non-text floor, 5.9:1 dark. No token covers a green mark; `--ink-success` is for text. The Commons `palette-emphasis` lists candidate-answered as green, but a candidate's answer counts no crowd (`registers.live.palette-rule`).
- **evidence:** contrast sampled from the 1440 renders, both schemes.
- **proposes:** render the dot in `--ink-success`, in `--text-secondary`, and removed; settle whether candidate-answered is a green site.
- **blocks:** nothing

### The avatar roll on dark glass
- **kind:** spec silent
- **found:** same review. On a dark `material-thin` card the overlapping avatar discs merge with the card and each other; the 20% black inset ring vanishes on dark glass. `plate-not-mark` was measured against the canvas, not glass. Also: indigo means "your trail", and these are other co-signers.
- **evidence:** `preview/surface-commons.html` at 390 and 1440, dark.
- **proposes:** measure disc-edge contrast against the card, then render the roll with a `--border-subtle` ring.
- **blocks:** nothing

### The tally: Plex Mono or role-stat-card
- **kind:** two readings
- **found:** same review. Commons `skeuomorphic-accents` makes the tally IBM Plex Mono; `role-stat-card` (v2026.10.17.1) is a count that leads a card, in sans. The specimen hand-builds the mono tally with literal size and weight.
- **evidence:** not yet rendered.
- **proposes:** render the ask card's count in each, both schemes, 390 and 1440.
- **blocks:** nothing

### Which text role a sentence-case category chip takes
- **Superseded 2026-10-18:** Jason ruled pills are for filter controls only; kind and access render as text.
- **kind:** spec silent
- **found:** voyager `candidate-appearances` branch, `components/candidates/AppearanceRow.tsx`. Each appearance row carries its event kind ("Rally", "Town hall", "Canvass launch") as a chip trailing the time on a `role-ui-heading` line. The kind is a closed enum the system assigns, so it is a category, not free text. The spec's only chip text is `role-designation`, which is for repeated uppercase codes (bill slugs, jurisdiction codes); no role covers a sentence-case category label in a chip. The code uses `role-metadata-sans` in `--text-secondary` until this is decided.
- **evidence:** retaken at 390 after the lockup fix (voyager 87596393: the time and chip join the row's wrapping line; the chip is `whitespace-nowrap`). Nothing crosses `--card-pad` in any story (content edge 334, was overrun to 343 by "Canvass launch"). In the page's own column (`InPageColumn`, 8px gutter) every chip stays on the time's line; inside the stories' 24px decorator "Canvass launch" and "Meet and greet" drop under the time (`SeveralOnOneDay`, 390, both schemes). Precedent: `components.table` (ratified 2026-10-17) sets a row's non-title cells in `role-metadata-sans`. Second review (voyager ca14315f, ecabec37): in the page's real column at 390 (a 270px line) the widest time and chip unit fits with 3px to spare and overflows below about a 375px viewport, worst case. Measured unit widths: a time is 74–76px (121px with a zone), the widest chip ("Parade or festival") 120px, gap 8px.
- **proposes:** name the role for a category chip: `role-metadata-sans` (as shipped, after `components.table`), `role-caption`, or a new chip role; state its ink; say whether a chip may wrap under the time on a narrow card.
- **blocks:** nothing; the chip ships on `role-metadata-sans`

### A category chip: hairline on the card's material, or a material fill
- **Superseded 2026-10-18:** Jason ruled pills are for filter controls only; kind and access render as text.
- **kind:** two readings
- **found:** same row. `color.action.tint-is-not-a-plate` says status is "ink on neutral material" and a chip is `rounded-full`. The chip inside a `material-regular` card can read that as (a) no fill, a `--border-subtle` hairline, ink on the card's own material, or (b) its own neutral material fill (`material-thin`) under the ink. The code ships (a).
- **evidence:** computed `background-color` of every `.rounded-full` chip in the stories is `rgba(0, 0, 0, 0)`; not yet rendered against (b). Precedent for (a): `color.unread-is-ink` (ratified 2026-10-17) sets the unread count in "a --border-subtle hairline chip with no fill".
- **proposes:** render both readings in the appearance card, both schemes, and write which one a chip inside a card takes; (a) has the unread-count precedent.
- **blocks:** nothing

### A list of rows inside one card
- **kind:** spec silent
- **found:** same branch. "Upcoming appearances" moved from one card per event to one card holding day groups, each a calendar tile with that day's rows stacked beside it, groups separated by `--border-hairline` dividers, the card padded by `--card-pad`. `components.card` covers a card and cards in a row (`foot-docks-in-a-row`); nothing says how rows inside one card divide, pad, or space (between groups vs. between rows of one group).
- **evidence:** `Components/Candidates/CandidateAppearances` and `Components/Elections/BallotAppearancesView` stories, 390 and 1440, both schemes. Rows within a group are 1rem apart with no divider; groups are split by a hairline with 1rem above and below.
- **divider difference:** `components.table` divides rows with `--border-subtle` (10%); this list divides day groups with `--border-hairline` (5%), which barely shows at 1440 in light.
- **evidence (row span):** at 1440 the ballot card is about 1180px wide, so RSVP sits about 1000px from the time it belongs to.
- **proposes:** a `components.card-list` entry (or a clause on `card`): divider token (`--border-subtle` as in `components.table`, or `--border-hairline`), row spacing, whether the first and last rows sit on `--card-pad` alone.
- **blocks:** nothing

### The calendar tile's numeral, weekday and month band have no role or token
- **kind:** unowned default
- **found:** design review of voyager b67f9d67 (appearances day groups), `DeadlineTile`. The month takes `role-calendar-month`, but the day numeral is a hand-set display size and weight (`sans-display`, `text-3xl`), the weekday line is a bare `text-xs`, and the month band's fill is `bg-black/5` with no token.
- **evidence:** not yet rendered.
- **proposes:** render the numeral on `role-stat-card` against the current 30/400, with and without the weekday line, 390 and 1440, both schemes; name a token for the band fill.
- **blocks:** nothing; `DeadlineTile` is shared and keeps its classes until decided

### The access chip: a second chip, or text leading the place line
- **Superseded 2026-10-18:** Jason ruled pills are for filter controls only; kind and access render as text.
- **kind:** two readings
- **found:** same review. On an appearance row, Ticketed and Invite only render as a second chip styled exactly like the kind chip, so access reads as another category.
- **evidence:** `Components/Candidates/CandidateAppearances` TicketedFundraiser, 390 and 1440, both schemes.
- **proposes:** render both: a second chip (as shipped), or `role-metadata-sans` text leading line 2 ("Ticketed · Gainesville"); pick one.
- **blocks:** nothing

### The candidate and ballot pages have no register, so the card's material is unsettled
- **kind:** spec silent
- **found:** same review. Neither the candidate page nor Your ballot is in the register table. The stories put the appearances card on the aurora (Live → `material-thin`), but the card is `material-regular`, and its sibling on the ballot page, Where to vote, is `material-thin`.
- **evidence:** both modules' stories (which render in the page's own column since voyager dd3bd0ab), 390 and 1440, both schemes; the Where to vote cards beside them. Third review: the ballot card at 1440 is about 1184px wide (x 248–1432), so RSVP sits about 1000px from its time; render `Components/Elections/BallotAppearancesView` MichiganWithHome at 1440 (voyager 8849aa29).
- **proposes:** place both pages in the register table, and say whether a card's material follows the page's register (placement) or the card's kind.
- **blocks:** nothing

### Does the status stamp rotate inside a list row
- **kind:** spec silent
- **found:** second design review of voyager's appearance rows (ecabec37). `rubber-stamp-status` is scoped to the bill page; `components.table` names "the status stamp" for a row without saying whether it keeps its rotation. `PositionEndorsePanel` and `AppearanceRow` already use the rotated `RubberStamp` off the bill page; on an appearance row it sits in line 1's trailing slot, or under the place line below 31.5rem of card.
- **evidence:** `Components/Candidates/CandidateAppearances` CancelledVariant at 390 and 1440, both schemes, rotated (about 2°, as shipped). Not yet rendered at 0°.
- **proposes:** render the row rotated and at 0°, both schemes; say whether a stamp in a list or table row rotates.
- **blocks:** nothing

### The stamp's ink for "cancelled"
- **kind:** unowned default
- **found:** same review. `rubber-stamp-status` lists colours for enacted, procedural, vetoed and dead only; "cancelled" falls through `RubberStamp`'s free-text mapping to its neutral register (`--text-secondary` ink, a 40% black or white ring).
- **evidence:** CancelledVariant, both schemes, neutral register as shipped. Not yet rendered in procedural slate.
- **proposes:** render "Cancelled" in the neutral register and in procedural slate; add the chosen register to `rubber-stamp-status`.
- **blocks:** nothing

### Appearance card stack threshold: fixed worst-case (31.5rem) or measured per card
- **kind:** two readings
- **found:** voyager `candidate-appearances` (ecabec37). Below 31.5rem of card, every appearance row moves RSVP (or the cancelled stamp) under its place line, so rows in one card share one shape. 31.5rem is the widest line 1 any document could produce (a zoned time, "Parade or festival", the stamp: 391px) plus the tile, its gap and both card-pads. So a card whose own rows would all fit inline still stacks.
- **evidence:** third design review: 8 of the 15 stories have rows that would all fit inline at the real column's 270px line at 390, and stack anyway. Shapes per story at 390 and 1440 are in the second review's report.
- **readings:** (a) the fixed worst-case container query, as shipped: CSS only, no layout read, every card at a width shares one shape. (b) measured per card: a ResizeObserver compares each card's widest line 1 against its width and sets `data-stacked`; that costs a client layout read and a possible hydration shift when the server-rendered shape changes after mount.
- **update (10a331c8):** with RSVP icon-only (44px), a card without a cancelled row stacks only below 22.5rem (widest real line 1, 204px, plus 8px and the icon); a card holding a cancelled row keeps the stamp's 29rem. At 390 in the real column every icon row now stays inline; only cards with a cancelled row stack. The threshold is picked from data (a cancelled row present or not), not measured.
- **update (363523b8):** the row has no trailing item now (the whole row is the RSVP link), so line 1 is one shape at every width and this question is moot. The cancelled stamp cannot share line 1 at 390 (368px against a 270px line), so it leads the place line at every width and forces no wrap of its own.
- **proposes:** pick (a) or (b); if (b), say whether the shape may change after first paint.
- **blocks:** nothing; (a) ships

### An icon-only row-action
- **Superseded 2026-10-18** by "A whole-row link in a public list (card-link pattern on rows)".
- **kind:** production ahead
- **found:** voyager `candidate-appearances` (10a331c8). Jason decided the repeated "RSVP" word down the appearance list is too noisy to scan, so each row's RSVP is now the Phosphor external-link icon alone: voyager's `Button variant="row" size="icon"`, a 44×44 target, accessible name "RSVP: <listing title>, <city>". `components.row-action` says a row action is "an icon and a sentence-case word"; "When icons earn their place" allows an icon-only button when "the icon *is* the label" (close X, search magnifier), and the hard rules say nothing about icon-only row actions. An external-link glyph does not say "RSVP" on its own, so the visible label now lives only in the accessible name.
- **evidence:** `Components/Candidates/CandidateAppearances` and `Components/Elections/BallotAppearancesView` stories, all 15 at 390 and 1440, both schemes (target measured 44×44, secondary ink). With the word gone the row's line 1 keeps the icon inline at 390 in 14 of the 15 stories (the exception holds a cancelled row; see the stack-threshold entry).
- **proposes:** amend `components.row-action`: a row action may be icon-only when the list makes the act unambiguous, with the act named in its accessible name; or keep the word and record this surface as a divergence.
- **blocks:** nothing; the icon ships by Jason's decision

### A whole-row link in a public list (card-link pattern on rows)
- **kind:** production ahead
- **found:** voyager `candidate-appearances` (363523b8). Each appearance row is its own RSVP link: the time is an external link with `data-card-link` whose `after:absolute after:inset-0` overlay covers the row; the row lifts on hover (`hover:bg-black/3`, ActionSummaryCard's row step inside a card) and outlines on keyboard focus through `has-[[data-card-link]:focus-visible]`. The street address stays a separate directions link above the overlay (`relative z-10`). `components.table` and `components.row-action` ratify no whole-row link for public rows; the only precedent is the unratified card-link on PositionCard and CandidateCard, applied there to cards, not to rows inside one card.
- **evidence:** `Components/Candidates/CandidateAppearances` SeveralOnOneDay: hover at 1440 (row background `oklab(0 0 0 / 0.03)`), keyboard focus at 390 in dark (2px outline, -2px offset); a click at a row's blank right edge hits the row link and a click on the address hits the directions link, on every row. Accessible name: "<time>, <kind>, <place>: RSVP for <listing title> (opens Mobilize)".
- **proposes:** ratify the card-link pattern for cards and for rows in a public list (target, hover step, focus ring, which children sit above the overlay), or name the row's act some other way.
- **blocks:** nothing; it ships by Jason's decision

### Pills and chips are for filter controls only
- **kind:** spec silent
- **found:** Jason ruled on 2026-10-18 that a pill or chip is valid only as a filter control; an appearance row's kind and access, first built as chips, now render as text. The spec has chip rules (`color.unread-is-ink`'s hairline count chip, `role-designation` in a chip, `tint-is-not-a-plate`'s rounded-full chip) but no rule saying where a chip may appear.
- **evidence:** canonical use: the bill-status filter row on the jurisdiction bills page, `app/(data)/oversight/[jurisdiction]/bills/components/bill-status-filter-chips.tsx` (with `filter-chip.tsx`). Voyager's appearance rows after 2fe4b917 show the text treatment ("2:00 PM · Rally", "Ticketed · Gainesville").
- **proposes:** write the rule: a pill/chip is a filter control; a category, status or count in content is text (or the status stamp), never a chip; reconcile the existing chip mentions with it.
- **blocks:** nothing

### Third-party record text that arrives in caps
- **kind:** spec silent
- **found:** voyager Where to vote tab (`VotingLocationsView.tsx` `LocationCard`), signed-in Sarasota FL. Some election offices publish site names uppercased ("TWIN LAKES PARK (COMMUNITY BUILDING)") beside title-case ones. `typography.uppercase-has-two-homes` governs what the product sets by its own choice; `rules-bind-the-system-not-the-user` exempts user-authored text. A county's record is neither, and nothing says whether the UI restyles it.
- **evidence:** not yet rendered. Render the Sarasota list as shipped (verbatim) and with a title-case transform in the UI, both schemes, 390 and 1440; include a name with an acronym or ordinal (YMCA, VFW Post, AME, 1st) to show what a heuristic title-caser does to it.
- **proposes:** a record's own text renders verbatim in the UI; any case normalisation happens upstream, per source, where acronyms can be kept, never as a UI text-transform. Extends `rules-bind-the-system-not-the-user` to third-party records.
- **blocks:** nothing; names ship verbatim until decided

### A location kind the state doesn't publish: an empty group, or a line in the footnote
- **kind:** spec silent
- **found:** same tab. With zero drop boxes, the group renders its heading over "We don't have drop boxes for Florida yet." as bare secondary text, and reads as orphaned. `components.card-empty` covers content that did not arrive (the system looked and found none). A kind the state never publishes is known before the lookup, so it is a coverage fact about the page, not an empty result for this viewer. `emptyGroupMessage` already tells the two apart (state coverage vs. "for your address").
- **evidence:** not yet rendered. Render the Sarasota page three ways, both schemes, 390 and 1440: (a) the drop box group as a `card-empty` (`role-ui-heading` title, `role-body` secondary message); (b) no group, the gap as a sentence in the closing `role-metadata-sans` note; (c) no group and no mention.
- **proposes:** a coverage gap (the state publishes none) drops the group and is stated once in the closing note; a zero for this address keeps the group as a `card-empty`. Recommendation: (b) for the coverage case.
- **blocks:** nothing; the bare-text group ships until decided

### Location-kind markers once green and amber are out
- **kind:** spec silent
- **found:** same tab, `voting-location-kinds.ts`, shared by the list badges, the legend and the map pins. Early voting is a filled `--color-action` square (a green plate that cannot be pressed, against `color.action.fill-rule`; a location kind is not a counted crowd, and a pin is a category, not a quantity, so the map-fill exemption doesn't cover it). Drop box is a `--color-warning-soft` diamond (amber outside warning). Removing both is conformance; nothing says what a categorical marker palette is. Kinds are already told apart by shape plus number.
- **evidence:** not yet rendered. Render the badges, legend and pins (a) all three in `--color-primary` with inverse numerals, distinguished by shape alone; (b) one neutral fill plus a `--border-subtle` ring variant per kind; on the Mapbox day and night presets and on the cards, both schemes, 390 and 1440. Measure each pin against both basemaps for the 3:1 non-text floor.
- **evidence (voyager #938, reading a):** `--color-primary` has no dark value, so in dark the list badges and legend marks nearly vanish against the card and canvas (`found-390-dark`); the map pins read only because of their white ring. Reading (a) fails the non-text floor in dark. Also at legend size the early-voting square's radius rounds it to a circle, so the legend loses the shape channel.
- **direction (Jason, 2026-10-19):** drop the shape encoding; it confuses more than it separates. Every site is a conventional map pin: the election-day polling place a larger pin, early-vote sites and drop boxes smaller pins (I Will Vote's pattern). The viewer's address is a conventional, distinct marker, not a house tile.
- **proposes:** a location is a teardrop pin, its numeral in the head linking it to its card; size, not shape or colour, separates the election-day polling place from the rest; the card's badge is the same pin at the small size. Fill `--text-primary`, numeral and ring `--canvas` (provisional on #938, after `color.unread-is-ink`), so the pin flips with the scheme. Jason pointed to Phosphor's map-pin family (2026-10-19): sites take `MapPin` (fill); the address takes a different form from that family, rendered two ways for the ruling: `MapPinSimpleArea` and `MapPinSimple`. Colour must not be the address's only difference from the site pins. Rendered on #938 (f60b1806, voyager scratchpad `pins-a3/`, `pins-b/`): (b)'s thin stem reads as a site pin at map scale; (a)'s ellipse separates by form. Jason chose (b) `MapPinSimple` ("area pin isn't usable"; voyager 581dfb07). Its `--color-functional` fill fails the 3:1 non-text floor on the night basemap (2.49:1 land, 2.98:1 dark blocks, 1.42:1 roads); provisional fill `--text-secondary` with a `--canvas` ring (computed 5.4 / 6.1 / 3.6:1 night), pending a night render. Each pin carries a `--canvas` ring, without which overlapping pins merge into one shape. Overlap: when the polling place and an early-vote site are a block apart, the top pin covers the other's numeral at max zoom; provisional order puts the election-day pin on top; nudging is out, since it moves a pin off its place.
- **blocks:** nothing; voyager #938 implements the direction

### Does the colour rule bind a third-party basemap and its popup
- **kind:** unowned default
- **found:** design review of voyager #938 (34c15cde), `VotingLocationsMap.tsx`. Mapbox Standard draws red medical crosses and magenta/pink POI labels on the system's own map, against `color.rules` (no red except danger, no magenta). Its popup stays white with literal black ink in both schemes (lines 85, 88, 93, behind a lint ignore).
- **evidence:** reviewer renders, `--found` at 1440 both schemes, popup open; scratchpad `r/`.
- **proposes:** render the map with `showPointOfInterestLabels: false` (and a faded/monochrome theme) beside the current one, both schemes; render the popup in `material-regular` with role tokens against the night basemap. Say whether a third-party map is a system surface.
- **blocks:** nothing

### A numeral in a disc has no role
- **kind:** spec silent
- **found:** same review. The location pin's numeral is sans semibold at a 12px and a 14px literal, centred by the caps-box rule. `avatar-initials` is the nearest owned analogue.
- **evidence:** voyager scratchpad `numerals3/sheet-3x.png`.
- **proposes:** name the role (extend `avatar-initials` to a numeral in a disc, or a new one), at both pin sizes.
- **blocks:** nothing

### Does a group heading count as an empty card's title
- **kind:** two readings
- **found:** same review. An empty location group renders a `card-empty` under its serif `role-display-section` head with no `role-ui-heading` title of its own; `card-empty.typography` asks for title over message. At 1440 that card spans the full column while location cards are a third of it.
- **evidence:** `--state-without-drop-boxes` (zero-for-address variant), 390 and 1440, both schemes.
- **proposes:** render (a) the group head standing as the title, message only, one location-card width; (b) a full card-empty with its own title; pick one.
- **blocks:** nothing

### Does the navbar's Sign up plate count as the page plating that act
- **kind:** unowned default
- **found:** voyager #943, logged-out `/` matched state. After a ballot match, the lookup's "Sign up to save" plate and the navbar's logged-out "Sign up" plate show as two identical green plates on one 390 screen. `color.action.fill-rule-one-per-surface` says a second call to an act the page has already plated takes `button-secondary`. It never says whether navbar chrome plates the page's act.
- **evidence:** `scratchpad/shots/home-390-dark-matched.png` (amendment-design session accf800e). Both plates carry the ring and an ink label.
- **proposes:** render the matched state at 390 and 1440 three ways: "Sign up to save" plated, "Sign up to save" as `button-secondary`, and plated with the navbar Sign up demoted while logged out. Then write which surface owns the act.
- **blocks:** the size fix on "Sign up to save" ships at CTA height meanwhile

### A disabled-until-valid CTA at rest
- **kind:** unowned default
- **found:** voyager #943 hero. The page's one plate renders as a grey disabled slab until the user types, so at rest the only green on `/` is the navbar. `components.button-cta.governs-form-submits` says nothing about disabled-until-valid submits.
- **evidence:** `scratchpad/shots/home-1440-light-fold.png`, `home-390-light-fold.png`
- **proposes:** render the at-rest fold with the submit enabled (validating on press) and disabled, both schemes, and rule which one `governs-form-submits` means
- **blocks:** nothing

### The primary act of a list with no hero: continue the list, or write one
- **kind:** unowned default
- **found:** voyager #943 post-Nov-4 state. With the hero gone, "See all asks" becomes the page's green plate, beside a "Write your own" text link. "See all asks" continues a list; "Write your own" is the act that creates record state. `fill-rule-one-per-surface` names the primary act but not how to choose between them.
- **evidence:** `scratchpad/shots/post-1440-light-top.png`, `post-390-dark-top.png` (date pinned to 2026-11-04 in a scratch copy)
- **proposes:** render both placements (plate on "Write your own" with "See all asks" as `button-secondary`, and the reverse) at 390 and 1440, both schemes. The reviewer leans towards plating "Write your own".
- **blocks:** `/` from Nov 4 (2026-11-04)

### A page-leading h1 on the section rung
- **kind:** unowned default
- **found:** voyager #943 post-Nov-4 state. "What voters are asking 2026 candidates" leads the page as h1 in `role-display-section`, with nothing above it. `role-display-hero` exists for a page's lead, and the outline rule gives top-level headings `display-section`.
- **evidence:** `scratchpad/shots/post-390-light.png`, `post-1440-light.png`
- **proposes:** render the post-Nov-4 fold with `role-display-hero` and with `role-display-section`, at 390 and 1440, and rule whether the lead rung follows the h1 or the content
- **blocks:** `/` from Nov 4

### A count opposite a row title
- **kind:** unowned default (`justify-between`)
- **found:** voyager #943 ask rows. At 1440 each row's `role-metadata-sans` count sits about 600px from its title; at 390 it wraps beneath it. `count-beside-is-not-count-opposite` covers section headers only.
- **evidence:** `scratchpad/shots/home-1440-light.png`, `home-390-light.png`
- **proposes:** render the 1440 list with the count at the far end and inline after the title, and extend `count-beside-is-not-count-opposite` to rows
- **blocks:** nothing

### Title case and a separator in the brand title
- **kind:** unowned default (spec silent on casing and separators)
- **found:** voyager #943 sets brandTitle to "Amendment - Your Demands, On the Record". It renders in `<title>`, `og:title`, `twitter:title` and the PWA manifest `name`, with no visible lockup. README content fundamentals say sentence case for headings, navigation and UI text, but DESIGN.md has no casing key. The spec has no separator rule; README sanctions `·` in chrome labels.
- **evidence:** server HTML at 4c67998a. A code comment says the title case is deliberate, for the places it sits beside the site name.
- **proposes:** hoist a casing key into DESIGN.md (sentence case outside proper nouns) and a title separator rule. Render the tab title and an OG card at truncation width with " - ", " · " and ": ". Candidate: "Amendment: Your demands, on the record".
- **blocks:** nothing

### No role-body-lead utility in voyager
- **kind:** spec ahead
- **found:** voyager #943 hero sub. DESIGN.md defines `body-lead` for marketing lead paragraphs, but voyager has no `role-body-lead`, so the hero sub hand-types its type.
- **evidence:** computed style on the hero sub at 4c67998a
- **proposes:** record it as a Known Divergence; voyager adds the utility
- **blocks:** nothing
- **more evidence (voyager `/data`, 2026-11-03):** the `lead` helper renders 18px at both widths, where `body-lead` steps to 1.25rem at sm.

### Home record band: show the unanswered slot, or hide it
- **kind:** spec silent
- **found:** `preview/home-record-band.html`, a proposed home section that features one real race (WA-3), its top delivered ask and its candidates. No candidate has answered any ask (`POSITION_ENDORSEMENT` 0, prod 2026-10-20).
- **evidence:** `?v=a` shows a `card-placeholder` ("No answer yet") and the ribbon's active step on Answered ("Waiting on 2"). `?v=b` drops the slot and leaves the ribbon active on Delivered (Oct 19). Rendered at 390 and 1440, both schemes.
- **proposes:** rule whether an unanswered stage renders as a fillable slot on marketing surfaces (`card-placeholder` names this case: a slot someone can fill), or only as an unreached ribbon segment
- **blocks:** the home record band

### The progress ribbon on an ask's journey
- **kind:** spec silent
- **found:** the same specimen sets `progress-ribbon` on an ask (Co-signed · Delivered · Answered · Backed · In office). `components.progress-ribbon.description` names bill journeys only.
- **evidence:** five sentence-case markers, the 38rem below-width switch, the ribbon tokens unchanged. The row holds at 1440 and gives way to the caption at 390.
- **proposes:** widen `progress-ribbon.description` to any record's journey (bill or ask), or give the ask its own primitive
- **blocks:** the home record band

### A featured race's district count shown to a logged-out viewer
- **kind:** two readings
- **found:** the record band shows "28 co-signs in WA-3" to every logged-out visitor. `a-count-row-is-reach` allows a geography row only where the viewer's signature can move it, so a reader in Ohio can't.
- **evidence:** the count is the featured race's own state (the subject of the card), not a "near you" row under the ask's count
- **proposes:** state that a count naming the record's own geography is content, not reach, or move the count onto the race and off the ask
- **blocks:** the home record band

### Green ink on a glass card over the aurora
- **kind:** unowned default
- **found:** `preview/home-record.html`, hero record card: "28 neighbors in WA-3 co-signed" in `--ink-success` on `material-regular`, which sits inside the aurora band. "Text may sit on the aurora; coloured ink may not." It doesn't say whether a translucent card counts as the opaque ground.
- **evidence:** rendered at 390 and 1440 in both schemes. The card's fill is translucent, so the ink's ground varies with the band behind it.
- **proposes:** either state that `material-regular` counts as an opaque ground for coloured ink, or have the card take an opaque ground when it sits in the band
- **blocks:** the home record hero

### Columns inside a card: aligned rows, or independent stacks
- **kind:** unowned default
- **found:** the same card puts two candidates side by side at ≥34rem of container width. A missing statement is shorter than a quote, so the two "No answer yet" slots land at different heights.
- **evidence:** the 1440 render: the left slot's top sits about 110px above the right one's
- **proposes:** say whether sibling columns in one card align by row (subgrid), as cards in a row do, or stack independently
- **blocks:** the home record hero

### A timeline's segment from today to the next step
- **kind:** spec silent
- **found:** the home record timeline is solid through Today and dashed between Nov 3 and Jan 3. The segment from Today to Nov 3 is solid, though the step it leads to hasn't happened.
- **evidence:** each item draws the connector that leaves it. `.tl li.now::before` is solid; only `.future` items draw dashed. The ribbon's own rule covers fills, not connectors.
- **proposes:** state whether a connector takes the state of the step it leaves or of the step it reaches
- **blocks:** the home record timeline

### An ask card off the ask surfaces, without its Co-sign
- **kind:** spec silent
- **found:** `preview/home-record.html` lists live asks as voyager's `AskSummaryCard`, with its action slot holding a secondary "See the ask". The hero's Co-sign is already the surface's one plate. The fill rule decides the plate, but nothing says an ask card may drop its Co-sign.
- **evidence:** three cards at 1440, each with a green-ink count and a secondary link; no green plate below the hero
- **proposes:** under `components.ask-card`, name the action slot and say a surface that already holds its plate fills the slot with a secondary link to the ask
- **blocks:** the home asks section

### The ask card's momentum badge is uppercase in production
- **kind:** spec ahead
- **found:** voyager `AskMomentum` renders "MOST CO-SIGNED" / "ACTIVE THIS WEEK" in caps. A status badge isn't one of uppercase's four homes, so the specimen sets it in sentence case.
- **evidence:** `components/asks/AskSummaryCard.tsx` via `AskMomentum`, against `role-label-caps`' listed homes
- **proposes:** record it as a Known Divergence; voyager conforms to sentence case
- **blocks:** nothing

### Bars on a marketing peek: meter or chart
- **kind:** two readings
- **found:** the Organizations door shows one ask's signers by House district as bars in `--color-momentum-soft`. Meters are exempt from the fill rule; a ranked comparison of five districts is closer to a chart than to a meter of one quantity's progress.
- **evidence:** five bars scaled to the top district (WA-3 28), not to a goal
- **proposes:** define a meter as progress toward a bound, and give comparison bars a neutral fill (`--ribbon-completed`), or extend the exemption to counted-crowd bars
- **blocks:** the home doors

### Share on a page whose plates are Co-signs
- **kind:** spec silent
- **found:** the Paper "Your district · nothing close" boards make bringing a neighbor the page's move, but every ask card already carries a Co-sign plate. The fill rule allows one plate per card and doesn't say whether a closing Share outside the cards may also be green. Jason chose to keep Share neutral, so Co-sign stays the only green control.
- **evidence:** Homepage boards "Your district · nothing close" (1440 and 390, light and dark): three Co-sign plates and Share as a neutral button with a hairline ring
- **proposes:** under the green fill rule, say that once a surface's plates are per-card Co-signs, a share or recruit act is a neutral button, even when it is the page's main move
- **blocks:** the post-address district page

### The floor tick on an ask delivered below the floor
- **kind:** spec silent
- **found:** a packet carries a district's top asks, and some of those asks have fewer co-signers than the floor. Jason ruled that the label says "Delivered Oct 19 to both campaigns" for every delivered ask. The meter still draws a short fill that stops before the floor tick, so the bar says "not yet" while the label says "delivered".
- **evidence:** Homepage boards "Your district · delivered" (1440 and 390, light and dark). The bottom three WA-3 asks have green fills that end left of the tick, under a green "Delivered" status.
- **proposes:** pick one. (a) Once an ask is delivered, the meter drops the tick and fills to its share of the district's top ask. (b) A delivered ask shows no meter, only the count and status. (c) The tick stays as the floor for the next delivery.
- **blocks:** the post-address district page, and any ledger row that pairs a meter with a delivery status

### Section heading rung on a district page
- **kind:** spec silent
- **found:** "What WA-3 is asking" and the closing heading sit on the canvas between the hero H1 and the card titles. Neither `role-display-hero` nor the in-container UI heading covers a canvas section heading below a hero.
- **evidence:** Homepage "Your district" boards, Asks header and Closing, all twelve boards
- **proposes:** name the canvas section-heading role these take, or confirm the existing display rung they should cite
- **blocks:** the post-address district page
- **another site (voyager `/data`, 2026-11-03):** the section h2 renders at 24/36 (`lg:text-4xl`) against the Paper board's 28/40. Rule the rung once for both pages.

### Hero lede measure beside a side panel
- **kind:** spec silent
- **found:** at 1440 the hero lede runs about 640px beside the race panel. The spec gives the lede a counted line but not what happens when a side panel takes the column.
- **evidence:** Homepage "Your district" boards at 1440, hero lede beside the race panel or notify panel
- **proposes:** state whether the lede's measure is fixed or follows the text column when a panel sits beside the hero
- **blocks:** the post-address district page

### A repeated secondary act down a single-column list
- **kind:** spec silent
- **found:** with no covered race, every nationwide ask card carries a full-width neutral "Read the ask" plate at 390, so the same plate stacks three times. The ask cards' own titles could be the link instead.
- **evidence:** Homepage "Your district · no covered race · 390" (light and dark)
- **proposes:** say whether a per-card secondary act in a single-column list is a plate, or whether the card title is the link and the plate drops
- **blocks:** the post-address district page, state C

### Zero-padded district designation
- **kind:** spec silent
- **found:** voyager renders the district code as "WA-03", using the shared `raceDistrict()` helper that every race card uses. The Paper boards say "WA-3".
- **evidence:** resistbot/voyager#948, Pages/Home/DistrictView
- **proposes:** pick one form for `role-designation` district codes everywhere, either padded or unpadded. Voyager proposes WA-03 so every surface matches.
- **blocks:** nothing

### Display rungs at hero and section scale
- **kind:** spec silent
- **found:** the spec says the hero heading “scales up with responsive modifiers” but names no steps. Voyager scales `role-display-hero` up at sm and lg, and takes section H2s from `role-display-section` up one step at lg.
- **evidence:** resistbot/voyager#948, Pages/Home/Push and DistrictView. This overlaps “Section heading rung on a district page” above.
- **proposes:** name the breakpoint steps for the hero and section display roles in DESIGN.md and the stylesheet, so a consumer doesn’t choose them
- **blocks:** merge of #948
- **update (2026-10-28, `/asks` index):** the `/asks` h1 steps 24px→30px with a hand-set responsive class instead of taking `role-display-hero`, which is fixed-size. The same missing breakpoint steps, at a third call site. Evidence: voyager-6e renders, both schemes, 390/1024/1440: `/private/tmp/claude-501/-Users-jason-git-voyager/de21042d-e7e6-4509-a94f-cec8582cb783/scratchpad/railC/` and `…/review/` (design-reviewer's pass, with `measure.json`).
- **update (2026-10-28, MCP sales page):** a fourth call site, on the marketing register. Each section h2 is the serif display at 40px over 46px at 1440 and 28px over 34px at 390. `role-display-section` is 1.5rem, which reads as a card title under a 60px hero. Render both at both widths, light and dark. Evidence: Paper “MCP Sales” (`app.paper.design/file/01M61ZPHHVGQ26KXYFQ3FAFBJZ`), four boards: light and dark, 390 and 1440.
- **update (2026-10-29, `/pricing`):** a fifth call site. The h1 takes bare `role-display-hero` and renders at 30px at 1440, because voyager’s role is a fixed 1.875rem; the stylesheet’s role is `clamp(2rem, 4.5vw, 3.75rem)`. Other voyager call sites hand-step it (`sm:text-5xl lg:text-6xl`, `max-lg:text-4xl lg:text-7xl`). Evidence: computed style on voyager `/pricing` at 1440, branch mcp-sales-page.

### Copy for an ask at the floor but not yet sent
- **kind:** spec silent
- **found:** an ask can reach the floor between deliveries. It qualifies but isn't in a packet yet. Voyager added the status “Goes to {campaigns} on the next delivery”. No board shows this state.
- **evidence:** resistbot/voyager#948, Pages/Home/DistrictView
- **proposes:** ratify the copy and its ink. It reports a fact, not an act, so it would take green ink and no plate. Then add the state to the boards.
- **blocks:** merge of #948

### State B’s lede when an ask is near the floor
- **kind:** spec ahead
- **found:** the “nothing close” lede says each ask has “only a few co-signers”. That is false if one ask is just under the floor.
- **evidence:** resistbot/voyager#948, Pages/Home/DistrictView “Close”, and SPEC.md state B
- **proposes:** choose the lede from the leading ask’s count, or make “near the floor” its own state with its own lede
- **blocks:** nothing

### Designation for a covered race that isn’t a House seat
- **kind:** spec silent
- **found:** statehouse and statewide races have no “WA-3”-style code. Voyager falls back to `race.title`.
- **evidence:** resistbot/voyager#948
- **proposes:** define the `role-designation` text for non-House races, e.g. chamber and district number
- **blocks:** nothing

### Home tilegram replaced by a line of copy
- **kind:** spec ahead
- **found:** deepspace has no nationwide delivery map, so voyager replaced the tilegram with an invented line: “When enough neighbors in a district co-sign the same ask, it goes to every campaign in the race.”
- **evidence:** resistbot/voyager#948, Pages/Home/Push
- **proposes:** Jason either approves the line until a nationwide map exists, or holds the section
- **blocks:** merge of #948

### “A promise has a bill number” section omitted
- **kind:** spec ahead
- **found:** the board hardcodes vote and bill claims about a real candidate. Voyager can’t verify them and has no live source, so it left the section out.
- **evidence:** resistbot/voyager#948, Pages/Home/Push. The section is in the Paper “Home · the push” boards.
- **proposes:** bind the section to a live source before it ships, or cut it from the boards
- **blocks:** merge of #948

### How-one-ask card details without data
- **kind:** unowned default
- **found:** voyager dropped three things the boards show:
  - the Endorse buttons on the How-one-ask card
  - “signed today” on the top-ask eyebrow, because there is no daily count
  - the Resistbot link, because Resistbot is one org of many
- **evidence:** resistbot/voyager#948, Pages/Home/PushSections
- **proposes:** confirm each omission, or name the data source that brings it back
- **blocks:** nothing

### A zero stat on the home
- **kind:** spec silent
- **found:** the races stat reads 0 in dev. Voyager hides it rather than showing “0”.
- **evidence:** resistbot/voyager#948, Pages/Home/PushSections
- **proposes:** a rule for zero-valued public stats: hide, show, or swap in a different stat
- **blocks:** nothing

### Column width for a Live page with a side panel
- **kind:** unowned default
- **found:** the district view and the home push use Tailwind’s `max-w-6xl` (72rem). The register table gives Live `container.tight`, and no token covers 72rem.
- **evidence:** resistbot/voyager#948, DistrictView Delivered at 1440, about 68rem of content. The Paper district and home boards are wide too.
- **proposes:** render `container.tight` and a named wide container side by side at 1440, then say when a Live page leaves `container.tight`
- **blocks:** the post-address district page and the home push
- **update (2026-10-28, `/asks` rail):** the `/asks` index now has the same feed-plus-rail shell (voyager `asks-delivery-rail`, Jason's layout C: full-width header, then the feed and a 22rem rail starting together). Its width comes from `--breakpoint-lg` and below lg from `--breakpoint-md`, so breakpoints are doing a container token's job. A second call site for the same named container. Evidence: voyager-6e renders, both schemes, 390/1024/1440: `/private/tmp/claude-501/-Users-jason-git-voyager/de21042d-e7e6-4509-a94f-cec8582cb783/scratchpad/railC/` and `…/review/` (design-reviewer's pass, with `measure.json`).

### Which register the delivery ledger belongs to
- **kind:** two readings
- **found:** `/asks/delivered` renders on `--canvas-live` with the aurora. It is a dated record of packets already sent, which reads as Archive (the Reading register).
- **evidence:** resistbot/voyager#948, DeliveredPageBody Feed at 390, dark
- **proposes:** render the Feed on both canvases at 390 and 1440 and let the container decide
- **blocks:** /asks/delivered

### “Co-sign” breaking at its hyphen
- **kind:** spec silent
- **found:** the spec protects only the district code from breaking at its hyphen. The product’s verb breaks as “Co- / sign” and “co- / signs”.
- **evidence:** resistbot/voyager#948 at 390: the DeliveredMobile and CloseMobile ledes, and the UncoveredMobile address panel
- **proposes:** extend the U+2011 / nowrap rule to “co-sign” and its inflections, or accept the break
- **blocks:** nothing

### A covered race with zero co-signs
- **kind:** spec silent
- **found:** the NoAsks state reuses state B’s H1 and lede (“A few neighbors … have started”, “only a few co-signers”) above a card that says “Nobody in OH-09 has co-signed an ask yet”. The page contradicts itself.
- **evidence:** resistbot/voyager#948, DistrictView NoAsks at 1440, light
- **proposes:** give a covered race with zero asks its own H1 and lede, or define it as a B sub-state with conditional copy
- **blocks:** the post-address district page

### The user's bubble in a depicted text thread on the aurora
- **kind:** spec silent
- **found:** the home “Campaigns text you every day” thread sits directly on the aurora. Its outgoing bubble is an opaque `--color-primary` fill with near-white ink (slate-300 with dark ink in dark mode). The Reading Room spec gives the user's bubble only a faint tint, which disappears on the aurora, and coloured ink may not sit on the band.
- **evidence:** Paper “Homepage”, the four Home · the push boards (1440 and 390, light and dark), section “No way back”. Jason approved the layout 2026-10-21.
- **proposes:** a bubble *depicted* in marketing (an SMS thread shown as an illustration, not a live conversation) takes an opaque primary fill on the aurora, and incoming bubbles take `material-regular`. Alternatively, extend the conversation rule to cover it.
- **blocks:** the outgoing-bubble fill on the voyager home build
- **also:** Paper “MCP Sales” (`app.paper.design/file/01M61ZPHHVGQ26KXYFQ3FAFBJZ`) uses the same opaque outgoing bubble on material panes: the chat demo on all four boards, and both chat storyboard boards.

### Ink on a `--color-primary` plate
- **kind:** unowned default
- **found:** no token owns ink on a slate primary plate. The home thread's outgoing bubble (`components/home/HomePushSections.tsx:174`), `components/donate/AmountPicker.tsx:56` and `components/session/ReferralBanner.stories.tsx:22` each hand-pick `text-white`, and the Paper board uses white at 94%. The dark counterpart is spelled `dark:text-primary` (the `--color-primary` utility), which is easy to misread as `--text-primary`.
- **evidence:** resistbot/voyager#948 NoWayBack story, rendered by the design reviewer. Light, white on `--color-primary`: 14.6:1. Dark, `--color-primary` on the `--ribbon-active` dark value: 9.85:1.
- **proposes:** name the pair, e.g. `--ink-on-primary`: `--color-white` in light, `--color-primary` on the light plate in dark. Settle 100% against 94% white from a side-by-side render; both clear 4.5:1.
- **blocks:** nothing. The token would replace three literal sites.

### A pulse on the home tilegram's latest delivery
- **kind:** spec conflict, decided by Jason 2026-10-21 (needs recording)
- **found:** Jason asked for a soft pulse on the latest delivery's tile on the home “This is already happening” tilegram, so the block beside it points at its place on the map. The spec allows motion on two surfaces only (Receipt bloom, Commons accrual) and ratified on 2026-10-11 that motion is never an idle loop.
- **evidence:** Paper “Homepage”, Home · the push boards, section “Already happening”; voyager home build on resistbot/voyager#948.
- **proposes:** record a third sanctioned motion surface, the map locator. A halo in `--color-momentum-soft` animating opacity and box-shadow (never transform). It plays three cycles of about 2.4s when the map enters view, then holds a static `--text-primary` ring. Under reduced motion it is static. One tile only.
- **blocks:** nothing. Voyager is building it as specced.

### Two rings on one tilegram: the latest delivery and the viewer's own district
- **kind:** spec silent
- **found:** the spec gives the viewer's own tile a dashed `--text-primary` ring outside the hex. The home's latest-delivery ring is solid `--text-primary`, 1.5px, centred on the tile edge, so half its width sits over the green. They don't appear together today, but they collide once a signed-in home shows both.
- **evidence:** resistbot/voyager#948, DistrictTilegram LatestHeld at 390 (tile 4.6px) and 1440 (11px), both schemes. Ring on the aurora: 14.2:1 light, 10.3:1 dark.
- **proposes:** render inside, centred and outside rings at 390, then record a grammar such as “solid = latest, dashed = yours, both outside the tile”.
- **blocks:** nothing

### No role for a 14px race-card candidate line
- **kind:** production ahead
- **found:** `ElectionRaceCard` and the home LatestDelivery set candidate names in `text-sm leading-relaxed`. No `role-*` sits at that size in primary ink; `role-metadata-sans` is secondary.
- **evidence:** voyager `components/home/HomePushSections.tsx:328`, `app/(elections)/elections/[year]/components/ElectionRaceCard.tsx:77`
- **proposes:** render the list in `role-body` and in `role-metadata-sans` with primary ink at 390, then pick one or name a role.
- **blocks:** nothing

## Needs a person — cannot close from inside the toolchain

Not a ratification queue. These do not resolve by deciding; they resolve by
someone doing something an agent should not do unprompted. Listed separately so
they stop reading as actionable to the next session that opens this file.

*(the Chromatic review item closed 2026-08-28 — the account is retired and no baselines were ever accepted; see the Open queue)*

---

## Recently ratified

Moved out of this file on ratification; listed here for one cycle so the code side can see what landed.

- **2026-10-17 (v2026.10.17.17)** — a meter's count label is secondary ink until the threshold,
  `--ink-success` from it; the threshold opens the push, never "done". The rule is renamed
  `color.action.climbing-is-slate-threshold-is-green`.

- **2026-10-17 (v2026.10.17.16)** — `--card-pad`: `--space-4`, `--space-5` once the card is
  24rem wide; the card and its docked foot both read it.

- **2026-10-17 (v2026.10.17.15)** — a trailing jurisdiction chip is `role-designation` in a
  declared caps box; an avatar's initials are not a designation (`components.avatar.initials`).

- **2026-10-17 (v2026.10.17.14)** — a table row's declared height is a minimum, never a clamp;
  a row stacks where its columns stop fitting, not at `sm`.

- **2026-10-17 (v2026.10.17.13)** — delivery map hexes and the threshold meter climb the ribbon
  ladder and turn `--color-momentum-soft` only when delivered or at threshold
  (`color.action.climbing-is-slate-threshold-is-green`).

- **2026-10-17 (v2026.10.17.12)** — the wordmark set as type is `role-label-caps`' size and
  `--track-chrome` at every site; drop the sidebar and StaticTitle size override.

- **2026-10-17 (v2026.10.17.11)** — marketing and sales surfaces sit outside the register table,
  palette included; the fill rule still binds them (`registers.marketing-is-outside-the-table`).

- **2026-10-17 (v2026.10.17.10)** — unread is `--text-primary`: the dot, and the count in a hairline chip
  with no fill (`color.action.unread-is-ink`).

- **2026-10-17 (v2026.10.17.9)** — the wordmark set as type takes primary ink; it is a designation,
  not a third chrome site.

- **2026-10-17 (v2026.10.17.8)** — `--track-chrome` is 0.08em: section dividers, status stamps and
  designations read as words.

- **2026-10-17 (v2026.10.17.7)** — a single-line caps box (the status stamp) sets its line-height
  1px taller than its height and gives the trailing track back from its end padding.

- **2026-10-17 (v2026.10.17.6)** — one product table (`components.table`): no header band,
  sentence-case heads over a hairline, one row height, rows stack on a phone.

- **2026-10-17 (v2026.10.17.5)** — the report line's lead and its count are `--sans-semibold`; the
  rest of the line stays at `role-metadata-sans`'s weight.

- **2026-10-17 (v2026.10.17.4)** — green ink is `--ink-success`, one token: `--color-success` on light,
  a step lighter than the action fill in dark; card glass is a sufficient ground for it.
  `--line-box-metadata-sans` gives the eyebrow its declared height.

- **2026-10-17 (v2026.10.17.3)** — a button's label owns its type: 1rem, `--sans-body`, semibold,
  line-height 1 (`components.button-default.label`); never inherited.

- **2026-10-17 (v2026.10.17.2)** — a card's eyebrow row declares its height (its status text's line
  box) whether or not the status is present, so titles align across a row.

- **2026-10-17 (v2026.10.17.1)** — `role-stat-card`, stat-display's card step, replaces the
  hand-set card count (voyager's `Stat` size md and `AskCosignsTile`).

- **2026-10-17 (v2026.10.17)** — a draft is not a warning: DRAFT takes the same neutral ink as
  CLOSED (`color.semantic.a-draft-is-not-a-warning`).

- **2026-10-16 (v2026.10.16.6)** — a calendar tile's month is `role-calendar-month`: caps at the
  caption size, body width, nearly untracked. `DeadlineTile` moves off `role-label-caps`.

- **2026-10-16 (v2026.10.16.5)** — a recruit card's next goal is a clause on the "Your link" line,
  never its own line; spec ahead, production adds it later.

- **2026-10-16 (v2026.10.16.3–.4)** — a recruit card's part below the foot hairline is a full-bleed
  `--wash-yours` band; a ribbon marker never wraps, and the narrow switch is 38rem.

- **2026-10-16 (v2026.10.16.2)** — a field's error stays `role-caption`; `role-metadata-sans` has
  a `typography.roles` entry and declares line-height 1.4.

- **2026-10-16 (v2026.10.16)** — form labels are the new `role-field-label`; a field's hint and
  consent sentence are `role-metadata-sans`; the ribbon's active segment is the strongest fill
  (tokens swapped), its markers `role-metadata-sans`, and its narrow switch is 25rem; a row action
  is quiet and absent where it can't apply; a bottom-anchored `material-chrome` bar casts no
  shadow; in a row of cards the foot docks and every card carries a report line.

- **2026-10-12 (v2026.10.12.3)** — the ribbon's 20rem switch is a deliberate margin. Field
  states are spec: **invalid** is a 2px ring plus a `role-caption` message in the danger pair,
  **hint** is `role-metadata`, a **textarea** is at least 6rem tall, and the **consent** row is
  one target of at least 44px with a `role-metadata` sentence.

- **2026-10-12 (v2026.10.12.2)** — **form labels are `role-caption`**, sentence case, above the
  field: voyager's `input-label` utility recomposes on it. The ribbon's dark ladder mirrors the
  light one, so dark `--ribbon-completed` takes `--text-nav-active`'s value, and ribbon segments
  are not held to 3:1. The ribbon's narrow caption is the active step in `role-caption` over its
  date in `role-metadata`, stacked. `card-placeholder` takes the card-empty pair.

### One inset for every rule inside the sidebar rail
- **kind:** spec silent
- **found:** voyager branch `sidebar-nav-spine` (nav B, uncommitted). The group divider is inset 20px (`mx-3` expanded, `mx-2.5` collapsed). The user-menu foot's rule runs full-bleed across the 240px rail. The rail now has two rules with two insets, and nothing says which is right.
- **evidence:** `preview/nav-spine.html` B, and the branch's Sidebar stories, collapsed and expanded, both schemes, 1440. design-reviewer flagged it.
- **proposes:** one inset for every rule in the rail. Render both (inset like the divider, or full-bleed like the foot) and pick one.
- **blocks:** nothing

### The sidebar's group divider is content structure, not chrome
- **kind:** spec silent
- **found:** same branch. `components.navbar` and `chrome.recession` say desktop chrome takes “no fill, no blur, no hairline, no shadow”. The nav B divider is a `--border-subtle` hairline inside the rail. Read literally, recession strips it.
- **evidence:** same renders. The rail's edge is gone, and the divider and foot rule are the only hairlines left.
- **proposes:** `components.sidebar` states that recession's “no hairline” governs the rail's boundary with the page, not rules that group its rows. It is also in the voyager PR's For-ratification block.
- **blocks:** nothing

### No sans intro role or counted sans measure
- **kind:** spec silent
- **found:** voyager `asks-delivery-rail`, the `/asks` index lede: `--text-secondary` at `text-sm`, hand-typed, capped at `--measure-body` from lg up and uncapped between sm and lg. `body-lead` is serif marketing copy, and the measure tokens count serif lines. Nothing names a sans page intro or its line.
- **evidence:** voyager-6e renders, both schemes, 390/1024/1440: `/private/tmp/claude-501/-Users-jason-git-voyager/de21042d-e7e6-4509-a94f-cec8582cb783/scratchpad/railC/` and `…/review/` (design-reviewer's pass, with `measure.json`). Related: “No role-body-lead utility in voyager” and “Hero lede measure beside a side panel”.
- **proposes:** a sans intro role (or a ruling that a page intro under a sans h1 takes `role-body` in secondary ink), plus a measure for it at every width
- **blocks:** nothing

### The wordmark's weight at chrome size
- **kind:** unowned default
- **found:** MCP sales page nav. `assets/wordmark.svg` didn't render in Paper, so the boards set “AMENDMENT” as live Archivo at `--sans-chrome`, chrome size and `--track-chrome`, in `--text-primary`. The weight is 500 because nothing names one. `DESIGN.md`'s `wordmark-metrics` question is still open.
- **evidence:** Paper “MCP Sales” (`app.paper.design/file/01M61ZPHHVGQ26KXYFQ3FAFBJZ`), four boards: light and dark, 390 and 1440, nav.
- **proposes:** name the wordmark's weight in `wordmark-metrics` and re-measure `assets/wordmark.svg` against it, so live text and the asset agree
- **blocks:** nothing; the boards keep 500 until decided

### A code surface has no token
- **kind:** unowned default
- **found:** MCP sales page, the GraphQL card's tool list. The code block sits on `--color-primary` in light (a dark slab with white 87% mono ink) and on a canvas-tinted panel with a hairline in dark. Neither the fill nor the ink is a token, and no role covers set-off code. Plex Mono is the system's mono.
- **evidence:** Paper “MCP Sales” (`app.paper.design/file/01M61ZPHHVGQ26KXYFQ3FAFBJZ`), four boards: light and dark, 390 and 1440, “Two ways in”.
- **proposes:** a `--surface-code` fill and ink pair per scheme (or a ruling that code sits on `material-regular` in primary ink like any card content)
- **blocks:** nothing

### A serif statute citation in a sans apparatus row
- **kind:** two readings
- **found:** MCP sales page. The same record title takes two faces on one page: in the chat demo's bill card, “Lindsey O. Graham Sanctioning Russia and Iran Act of 2026” is serif bold (matching `role-display-minor`), and in the Alerts inbox row the same title is sans `role-body`. The join diagram sets “50 U.S.C. § 4811” in sans. One reading: the record keeps its serif wherever it is a title. The other: inside an apparatus row or card, titles are sans.
- **evidence:** Paper “MCP Sales” (`app.paper.design/file/01M61ZPHHVGQ26KXYFQ3FAFBJZ`), four boards: light and dark, 390 and 1440, “Why not web search” (chat bill card, join diagram) and “Know when the record moves” (inbox).
- **proposes:** render the bill card's title and the inbox row's title both ways at 390 and 1440, then say which face a record title takes inside a card or row
- **blocks:** nothing

### A marketing header at phone width
- **kind:** spec silent
- **found:** MCP sales page. At 390 the nav links are hidden and there's no menu control, so a phone visitor can't navigate. No spec entry covers a marketing header.
- **evidence:** Paper “MCP Sales” (`app.paper.design/file/01M61ZPHHVGQ26KXYFQ3FAFBJZ`), four boards: light and dark, 390 and 1440, 390 boards.
- **proposes:** render a menu control against a two-link header at 390, both schemes, and add a marketing-header entry
- **blocks:** shipping the page at phone width

### Does components.table bind a table on the bare canvas
- **kind:** spec silent
- **found:** MCP sales page, “Jobs that take three vendors”. The table sits on the canvas with no card and no inset. `components.table` puts a table on its card's material, and nothing says whether the marketing register is held to that.
- **evidence:** Paper “MCP Sales” (`app.paper.design/file/01M61ZPHHVGQ26KXYFQ3FAFBJZ`), four boards: light and dark, 390 and 1440, “Who it’s for”.
- **proposes:** render it carded and bare, both schemes, 390 and 1440
- **blocks:** nothing

### A button-secondary on a card of the same material
- **kind:** spec silent
- **found:** MCP sales page, the closing pilot card. The act is `button-secondary` (a `material-regular` plate) on a `material-regular` card, so the plate is the card's own fill and only the `--border-subtle` ring marks it. It reads as a faint outline, weaker than the email link under it.
- **evidence:** Paper “MCP Sales” (`app.paper.design/file/01M61ZPHHVGQ26KXYFQ3FAFBJZ`), four boards: light and dark, 390 and 1440, closing section.
- **proposes:** say whether a secondary plate on its own material steps to `material-thick` (or another fill), or whether the ring alone is the intended edge
- **blocks:** nothing


### A depicted product surface: draw what ships, or what the spec says
- **kind:** spec ahead
- **found:** the MCP sales page's chat demo shows the `show_bill` card. The real widget (deepspace `widgets/shared.css`) sets the bill number in mono on a tint chip, and its status as a 12% `--good-soft` tint plate at full radius. Both break the spec (`role-designation`; `color.action.tint-is-not-a-plate`). The boards now draw the card to the spec: designation in `role-designation` (“H.R. 5334”), status as a `role-label-caps` stamp in `--ink-success` with no plate, `--radius-md`, padded by `--card-pad`. That makes the page show a card the product doesn't ship. Also open: does `DESIGN.md` bind the deepspace MCP widgets at all?
- **evidence:** Paper “MCP Sales” (`app.paper.design/file/01M61ZPHHVGQ26KXYFQ3FAFBJZ`), four boards and both storyboard boards, “Why not web search”. Related: “Pills and chips are for filter controls only”.
- **proposes:** render the card faithful and to spec in the pane, both schemes, 390 and 1440. Then either (A) a depiction is a screenshot and stays faithful, with the widget's divergences recorded against deepspace, or (B) marketing draws to the spec and the widget conforms.
- **blocks:** shipping the chat demo

### Is a scripted, replayed arrival “arrival” or marketing motion
- **kind:** two readings
- **found:** the chat demo storyboard fades a bill card that carries record state into view, plays once on first view, and drops to the final frame under reduced motion. One reading: `motion.rules` “streaming is not motion” covers it, since content appears for the first time. The other: replaying a past exchange is choreography, so the marketing motion bounds apply (pausable, viewport-gated, never on a surface carrying record state), and the card is record state.
- **evidence:** Paper “MCP Sales”, “Chat demo storyboard — 1440” and “— 1440 dark”.
- **proposes:** render frames 3 and 4 with an instant swap and with the fade, then rule
- **blocks:** building the animation

### Green ink on a marketing section divider
- **kind:** two readings
- **found:** every section eyebrow on the MCP sales page except “Where the data comes from” is set in `--ink-success`, while `role-label-caps` is defined in `--text-secondary`. One reading: `registers.marketing-is-outside-the-table` licenses green ink. The other: the fill rule still binds marketing, and green ink is a report, which an eyebrow isn't.
- **evidence:** Paper “MCP Sales”, four boards, every section head.
- **proposes:** render a section head in both inks, both schemes, then rule
- **blocks:** nothing

### A sentence-case qualifier opposite a card heading
- **kind:** spec silent
- **found:** the Alerts inbox card's header sets “Inbox” on the left and “Bills you follow” opposite it in `role-metadata-sans`. Hard rule 7 makes a labelled status opposite a heading a rail in `role-label-caps`, and `chrome-sites-are-closed` allows that role only on the divider and the status stamp. The qualifier is neither a count nor a status.
- **evidence:** Paper “MCP Sales”, four boards, “Know when the record moves”.
- **proposes:** say which role a qualifier opposite a card heading takes, or fold it into the heading (“Inbox · bills you follow”)
- **blocks:** nothing
- **another site (voyager `/data`, 2026-11-03):** “Grouped by job. Lobbying tools and the five briefs are on the Data plan.” in `role-metadata-sans`, opposite the serif h3 “What the connector can do”. Hard rule 7 pairs a serif heading with `role-metadata`, but that rule is written for counts. Render both roles at both widths.

### The join diagram's connector ink
- **kind:** unowned default
- **found:** the MCP sales page's join diagram draws its arrows in `--text-secondary` ink. That was raised from `--text-tertiary`, which is estimated at about 2.7:1 on the band, below the 3:1 non-text floor. No token owns a diagram connector.
- **evidence:** Paper “MCP Sales”, four boards, “Why not web search”. The contrast is unmeasured: Paper can't be sampled, so the figure is arithmetic against a nominal band.
- **proposes:** sample both inks in a browser render, both schemes, then name a connector ink (or rule that connectors take `--text-secondary`)
- **blocks:** nothing

### Set-off code at phone width: scroll or stack
- **kind:** spec silent
- **found:** voyager `/mcp`, the GraphQL API card's tool list. As a `pre` aligned with padding, it scrolled from 326px to 419px at 390. Notes were cut mid-word with no cue, and the scroll region took no keyboard focus. It now ships as a `dl`: tool and note on separate lines below `sm`, two columns above it. Related: “A code surface has no token”.
- **evidence:** browser render of voyager `/mcp`, both schemes, 390 and 1440 (design-reviewer pass, 2026-10-28)
- **proposes:** say whether set-off code may scroll sideways inside a card, and if it may, what cue and focus it needs
- **blocks:** nothing

### A depicted chat reply in serif inside a material pane
- **kind:** two readings
- **found:** the `/mcp` chat demo sets the model's replies in `role-body-serif` inside `material-regular` panes. The conversation rule makes the container boundary the voice boundary, so a reply is serif only on the canvas. One reading: a depicted chat pane is a canvas standing in for the product. The other: it is a container, so its replies are sans.
- **evidence:** voyager `components/mcp/sales/McpSalesSections.tsx` (`ChatPane` children); Paper “MCP Sales”, both 1440 boards, “Your model’s training stops”
- **proposes:** render sans and serif replies in the pane, both schemes, then rule
- **blocks:** nothing

### Green ink on glass and aurora, measured on `/mcp`
- **kind:** missing measurement (now measured)
- **found:** contrast painted from browser renders of voyager `/mcp` at 1440, for open entries “Green ink on a marketing section divider” and “A green mark on the bare aurora”:
  - band eyebrows in `--ink-success` on `material-thin` measure 5.09 to 5.11:1 in light and 8.35 to 8.54:1 in dark. They pass, but it is coloured ink on glass;
  - the hero eyebrow in `--ink-success` on the bare aurora measures 4.30:1 in light, below 4.5:1. It ships in `--text-secondary` until a ruling;
  - the “4/4” score in `--ink-success` on the bare aurora measures 4.83:1 in light.
- **evidence:** design-reviewer renders and element-paint contrast script, 2026-10-28
- **proposes:** fold these figures into both entries before ruling
- **blocks:** nothing
- **re-measured on voyager `/data`, 2026-11-03:** the green eyebrow and “4/4” in `--ink-success` on the bare aurora measure 4.72 to 4.93:1 in light (clearing 4.5:1 by about 0.2) and 7.86 to 8.75:1 in dark, sampled in the viewport.

### The Sign up plate beside a pilot CTA at 390
- **kind:** new call site for “Does the navbar's Sign up plate count as the page plating that act”
- **found:** at 390, the navbar's green Sign up plate and the `/mcp` hero's Book a pilot plate fit on one screen, and they are two different acts. That sharpens the one-plate-per-surface reading beyond the original entry.
- **evidence:** browser render of voyager `/mcp`, 390, both schemes
- **proposes:** rule in the existing entry; add this as its second call site
- **blocks:** nothing

### A tinted foot well on a card
- **kind:** spec silent
- **found:** the `/mcp` hero answer card's foot row (“Claude alone: …” and `show_bill`) is drawn on the boards as a faint filled well, rounded at the bottom. No token owns a subtle fill inside a card. Voyager ships the hairline only.
- **evidence:** Paper “MCP Sales”, four boards, hero answer card; voyager `components/mcp/sales/McpSalesSections.tsx` (`AnswerCard` figcaption)
- **proposes:** name a fill for an inset well inside a material card, or rule that the hairline is the whole separation
- **blocks:** nothing

### The code surface in dark: slab or outline
- **kind:** call site for “A code surface has no token”
- **found:** the dark `/mcp` boards keep the tool list on an opaque dark slab with an inset hairline. Voyager drops the fill in dark and keeps only the inset `--border-subtle` ring, because no dark slab token exists.
- **evidence:** Paper “MCP Sales”, both dark boards, “Two ways in”; voyager `McpSalesSections.tsx` (`codeSurface`)
- **proposes:** rule it together with the existing entry
- **blocks:** nothing

### Ruled by Jason: a replayed chat demo is arrival, and it animates
- **kind:** owner ruling, closes “Is a scripted, replayed arrival ‘arrival’ or marketing motion”
- **found:** Jason, 2026-10-28: the `/mcp` chat demo simulates chat sessions and must animate; any rule preventing it should be removed. Voyager now plays the storyboard once, on first view, in both panes: question, tool line, streamed reply, card header with skeleton, card body, verdict. Every piece keeps its slot, so nothing above a new piece moves. The server render and reduced motion both show frame 4.
- **evidence:** voyager `components/mcp/sales/ChatReplay.tsx`; Paper “MCP Sales”, both storyboard boards
- **proposes:** in `motion.rules`, let a replayed product demo on a marketing surface play once on first view, including on a depicted card that carries record state, with the final frame under reduced motion. Strike any bound that forbids it.
- **blocks:** nothing; it shipped on Jason's ruling

### Does every paid plan card in a comparison row carry its own plate
- **kind:** unowned default
- **found:** on voyager `/pricing`, each row plates one card: Advocate (cheapest paid) among Free, Advocate and Professional, and Data in the data-access row. Professional's subscribe is secondary. `color.action.fill-rule-one-per-surface` makes each card a surface, so a plate on every paid card would also be legal. Neither reading is chosen.
- **evidence:** design-reviewer render of voyager `/pricing` (branch mcp-sales-page, uncommitted), 1440 and 390, both schemes, 2026-10-29; `components/pricing/PlanCards.tsx`
- **proposes:** render the row both ways at 1440, then rule whether a comparison row plates only its recommended plan
- **blocks:** nothing; the current one-per-row reading is conformant
- **ruled (Jason, 2026-10-29):** one plate per row, on the middle card: the recommended plan. Advocate in the plans row, Data in the data-access row. Every other card’s subscribe is secondary. Proposes: write this into `color.action.fill-rule-one-per-surface` as the comparison-row case.

### Must mid-card content align across a row
- **kind:** unowned default
- **found:** `/pricing` plan cards align their tops (`components.card.eyebrow-declares-its-height`) and feet (`components.card.foot-docks-in-a-row`), but the price floats with the description's wrap. Free's price sits 24px above its neighbours' at 1440.
- **evidence:** design-reviewer render of voyager `/pricing`, 1440, 2026-10-29
- **proposes:** render subgrid against the current layout at 1440; rule whether a row aligns its prices or only its foot
- **update (2026-10-29, rebuilt `/pricing`):** still open after the rebuild. At 1440, “$0” sits at 248px and “$200” at 272px in the plans row, because the descriptions wrap to different lengths.
- **blocks:** nothing

### Words in `role-stat-card`
- **kind:** production ahead
- **found:** `/pricing` data-access cards put “Custom” and a placeholder price in `role-stat-card`, and the plan cards put prices there too. The spec scopes the role to “a count that leads a card”.
- **evidence:** voyager `components/pricing/DataAccessPlans.tsx`, `components/pricing/PlanCards.tsx`
- **proposes:** rule whether a price or a word may lead a card in `role-stat-card`, or name a role for it
- **update (2026-10-29, `/pricing` redesign):** Jason called the page “dull” and said “all the text just blends together”. The 1.5rem price sits one step above a 1.125rem title. Six of seven comparable pricing pages make the price the largest type, at 46–64px. The redesign sets prices in `role-stat-display` (clamp 2.5–4rem) inside the card. Render it against `role-stat-card` at 390 and 1440 and rule whether a price is a hero stat, or whether it needs a card rung between the two.
- **update (2026-10-29, design-reviewer):** measured in `role-stat-display` at 1440: “Custom” is 286px wide against “$900” at 181px, so the word outweighs the figure in its row. At 1024, “Custom” fills its 275px content box with no slack. A figure next to its 14px unit reads as a normal pricing pair, so the size problem is with words, not numbers.
- **ruled (Jason, 2026-10-29):** a price takes a card rung between the two: `role-stat-display` at 64px is too big and `role-stat-card` at 24px too small. voyager ships 36px as a one-site override (`role-stat-card text-4xl/none`, `components/pricing/PlanCardParts.tsx`), with a comment pointing at this gap. **proposes:** a card-price role (or a large step of `role-stat-card`) at 2.25rem, line-height 1, fixed rather than `vw`-keyed, scoped to “a price or a word that leads a card”. Once it exists, voyager swaps the override for the role. Still open inside it: “Custom” sets in the same size as “$900” (render `v5/pricing-1440-light.png`). Rule whether a word takes the rung or steps down to `role-stat-card`.
- **blocks:** nothing

### A segmented control outside a form
- **kind:** spec silent
- **found:** voyager `/pricing` is getting a Monthly / Yearly billing-period switch above the plan rows. `components.segmented-control` scopes the control to “two or three mutually exclusive options, inline in a form”, and its track is `components.input`’s recess so it reads as part of the form. A page-level view switch has no form to belong to.
- **evidence:** design spec sent to voyager mcp-sales-page session, 2026-10-29; render pending
- **proposes:** render the switch as the segmented control and as `components.tabbar`, at 390 and 1440 in both schemes, and rule whether a page-level view switch takes the recessed track
- **blocks:** nothing; it ships as the segmented control until ruled

### Hover on a segment
- **kind:** unowned default
- **found:** in voyager’s new `components/ui/segmented-control.tsx`, hovering an unselected segment raises its label to `--text-primary`, the selected segment’s ink, with no background step. `components.segmented-control` doesn’t specify hover.
- **evidence:** design-reviewer render, Storybook `primitives-segmentedcontrol--three-options`, 1440, 2026-10-29
- **proposes:** render ink-on-hover against a background step, both schemes, and rule how hover differs from selected
- **blocks:** nothing

### The raised plate is sunken in dark
- **kind:** two readings
- **found:** `components.segmented-control.selected` calls for “the raised plate”. In dark, `preview/forms.html` paints it as `color-mix(canvas-live 41%, transparent)` on a `white 6%` track, so the selected segment is darker than the track it sits in, and `--shadow-raised` vanishes on the dark ground. It reads as a recess, not a raised plate. voyager copied the specimen faithfully. Jason, on `/pricing` in dark with Yearly selected: “what is happening here with this switch, it looks wrong”.
- **evidence:** `preview/segmented-dark-plate.html`, dark at 700px, painted: A (shipped) plate `rgb(8 12 23 / 41%)` sits darker than the `white 6%` track; B is `color-mix(canvas-live 86%, white)`, opaque `rgb(43 46 55)`; C is `white 12%`.
- **proposes:** in dark, the selected plate takes the opaque dark lift, `color-mix(in srgb, var(--canvas-live) 86%, white)`. That is the same lift `a11y.reducedTransparency` uses for dark materials, so the canvas hue holds and nothing translucent stacks on the track. Write it into `components.segmented-control.selected` and correct `preview/forms.html`. Light is unchanged.
- **ruled (Jason, 2026-10-29):** in dark, the selected segment inside a track takes no drop shadow: “it still looks farther away from the top than the bottom because of the shadow treatment”. Dark `--shadow-raised` (a dark drop shadow plus an inset top bevel) darkens the 4px gutter below the plate and lightens the one above, even though the geometry measures 4.00px top and bottom. **proposes, amended:** in dark, the plate is the opaque lift alone, with no shadow; light keeps `--shadow-raised`. That makes the selection lightness plus ink weight, which still meets `components.selection-is-ink`. voyager: `dark:data-[checked]:shadow-none`. Render: voyager scratchpad `renders/switch/zoom-{dark,light}.png`.
- **ruled (Jason, 2026-10-29), supersedes the opaque lift:** “glass is the one”. On the aurora, the opaque `color-mix(canvas-live 86%, white)` read as a grey slab (“muddy … some kind of gray on aurora”), because an opaque fill can’t take the hue behind it. The dark canvas-hue material tiers (`materials.dark-glass-takes-the-canvas-hue`) would darken the plate and bring back the recess. **proposes, final:** in dark, the selected plate is `material-ultrathin`’s light construction: `rgb(255 255 255 / 10%)`, `blur(50px)`, one `--border-subtle` ring (`materials.one-ring`), no drop shadow. Light is unchanged. Write it into `components.segmented-control.selected`, correct `preview/forms.html`, and name whether a white-wash glass is a sanctioned dark tier or a segmented-control exception. Render: `preview/segmented-dark-plate.html`, option D, 1440, on the dark aurora.
- **blocks:** nothing; voyager ships B as conformance to “raised” in the meantime

### A featured card in a comparison row
- **kind:** spec silent
- **found:** on `/pricing`, only the green plate tells you which plan is recommended. Comparable pages single out one plan by structure: a 2px dark border (Supabase), a tinted panel plus a pill (Notion, Perplexity), or a taller card offset upward (Raycast, Supabase). The offset would break `eyebrow-declares-its-height` and `foot-docks-in-a-row`. The redesign gives the featured card a 2px `--text-primary` ring plus a “Recommended” eyebrow in `--ink-success`, which marketing may use per `registers.marketing-is-outside-the-table`. Nothing names a featured-card treatment.
- **evidence:** pricing comparables read 2026-10-29 at 1440: Linear, Vercel, Raycast, Perplexity, Claude, Supabase, Notion. The voyager `/pricing` render follows.
- **proposes:** render ring + eyebrow against eyebrow only, both schemes, at 390 and 1440, and name the treatment under `components.card`. Measure the green eyebrow on the card material by painting.
- **update (2026-10-29, design-reviewer):** the 2px outline reads as selection. With “Subscribe to Advocate” keyboard-focused in dark, the near-white card outline is brighter than the slate focus ring inside it (`focus.color-dark`); both are 2px rounded rings.
- **blocks:** nothing

### A dark band under a light marketing page
- **kind:** spec silent
- **found:** the redesign proposes setting `/pricing`’s Data access section on a full-bleed `--canvas-live` band in both schemes, to separate the builder row from the people row. Comparables use a tinted panel or an atmospheric band behind one group of cards (Notion, Perplexity, Raycast). The spec has no rule for a dark section inside a light-scheme page.
- **evidence:** to be rendered as a story variant next to the current single canvas
- **proposes:** render both, light scheme, at 390 and 1440, and rule whether a marketing page may invert one section
- **blocks:** nothing; it ships only after a ruling
- **update (2026-10-29):** not renderable yet. voyager’s generated `app/design-tokens.css` declares dark values only on `:root[data-theme="dark"]`, so a section marked dark keeps the light `--text-primary` and `--material-regular-bg`. Rendering the band needs `tools/build-tokens.mjs` to emit a subtree-scoped dark selector; hand-typed values are banned. Rule the band first, and change the generator only if it passes.

### A display role inside a card sizes to the viewport
- **kind:** unowned default
- **found:** `role-stat-display` sets its size with `vw`, but `--card-pad` steps with the card’s own width. On `/pricing` at 1024, “Custom” fills its card’s 275px content box exactly.
- **evidence:** design-reviewer render of voyager `/pricing`, 1024 and 1440, 2026-10-29
- **proposes:** render the price row at 1024 and 1440 with a size keyed to the card (container units) against the current one; rule whether a display role inside a card reads the card’s width
- **update (2026-10-29):** `/pricing` no longer reaches this. Its prices moved to a fixed 36px under Jason’s ruling (see “Words in `role-stat-card`”). The question stays open for any `vw`-keyed role set inside a card.
- **blocks:** nothing

### The opaque ink ground is warm on a cool aurora
- **kind:** two readings
- **found:** `--canvas` is the opaque ground `color.ink-needs-an-opaque-ground` requires. Dark sets it to `--color-zinc-900`, “warm zinc, because it sits under the ink layer”. Surfaces painted with it float over the Blue Hour aurora: voyager’s `ink-plate` utility under toasts (`components/ui/sonner.tsx`), the share-code button and `AskSummaryCard`. There it reads as a warm brown-black slab. Jason, on the same failure in the segmented control: “gray on aurora … looks terrible”. One reading puts the warm zinc under ink, below every layer. The other gives the ground the aurora’s family, because the ground is itself a surface that sits on the aurora.
- **evidence:** `preview/dark-fills-on-aurora.html`, dark, 1440, first swatch against dark `material-regular`; 2026-10-29
- **proposes:** keep `--canvas` opaque but take it from the canvas’s own cool family in dark: an opaque Blue Hour step, such as `--canvas-live` itself or one lift above it. Contrast stays fixed and measurable, which is the token’s whole job. Render toasts and the ask summary card on both values, both schemes, at 390 and 1440, and paint every coloured ink against the new ground before ratifying. Light `zinc-100` is a separate question; render it on the light aurora too.
- **blocks:** nothing

### Reduced-transparency glass lifts toward white
- **kind:** two readings
- **found:** under `prefers-reduced-transparency`, `a11y.reducedTransparency` collapses dark glass to `color-mix(canvas-live 86%, white)` (`material-thick`/`material-chrome` at 92%). The stylesheet’s own comment says the aurora is not suppressed on this path. So every card, sheet and bar becomes the opaque grey lift Jason rejected on the segmented control (“muddy … some kind of gray on aurora”, and superseded by glass). The dark tiers themselves follow `materials.dark-glass-takes-the-canvas-hue`, which moves toward the canvas hue, not toward white. The fallback breaks the rule its own tiers keep.
- **evidence:** `colors_and_type.css` reduced-transparency block (the `.dark .material-*` color-mix lines); `preview/dark-fills-on-aurora.html`, fifth swatch; 2026-10-29
- **proposes:** in dark, the fallback is the tier’s own canvas-hue colour at full opacity, cool and stepped by tier, rather than a mix toward white. Keep the separation between tiers, which is why the lift exists. Render all five tiers under emulated `prefers-reduced-transparency` on the dark aurora, current against proposed, at 390 and 1440.
- **blocks:** nothing

### Law pages: the status stamp beyond bills
- **kind:** spec silent
- **found:** `rubber-stamp-status.when` names bill outcomes only. Law units carry seven statuses. The law specimens map In force → `--ink-success`; Repealed and Expired → `--color-danger`; Reserved, Not yet in force, Transferred and Omitted → procedural slate. Repealed reads as dead; Expired is weaker, because a sunset is the law working as written.
- **evidence:** `preview/law-section.html` (§ 501, `?unit=repealed`), both schemes, 390 and 1440, 2026-10-30
- **proposes:** extend `rubber-stamp-status` with the law statuses, and rule whether Expired is danger or procedural
- **blocks:** voyager’s law section page

### Law pages: a history strip where the bill page has its progress ribbon
- **kind:** spec silent (new component)
- **found:** a law has no stages, so the ribbon’s slot carries one tick per recorded change, drawn in the ribbon tokens. The last tick is `--ribbon-active`. The strip names its two ends: “Added Aug 16, 1954” and “Last amended Dec 20, 2019 · Pub. L. 116–94”. With dense histories the ticks merge: § 501’s 1960s to 1980s run together into bars at 390 (design-reviewer).
- **evidence:** `preview/law-section.html` (54 changes) and `?unit=s7410` (6 changes), both schemes, 390 and 1440
- **proposes:** a `components.history-strip` entry with a minimum tick gap, merging ticks into one longer mark when they collide
- **blocks:** voyager’s law section page

### Law pages have no primary act
- **kind:** spec silent
- **found:** section and container pages carry no green plate: Track is `button-secondary`, beside the official-source link. They have no summary/text toggle (the text is the landing state), so there is no newcomer lede. The `/law` index’s Look up is that surface’s one plate. The reviewer supports the plate reading. Whether a law page owes a newcomer a lede is Jason’s call.
- **evidence:** all four `preview/law-*.html` specimens
- **proposes:** rule (a) no plate on a reading page that offers no act, and (b) lede or no lede on law pages in v1
- **blocks:** nothing; voyager can build either

### Law pages: container page identity and contents
- **kind:** spec silent
- **found:** a container page’s `role-ceremonial` identifier is the unit’s own designation (“PART I”, “TITLE 26”, “PART 52”), and the full citation moves to the facts line. A five-part citation as the identifier wraps three lines at 390. Its table of contents sits on `material-regular`, not paper, because it is our apparatus, not the law’s words. Separately, the section page’s paper head repeats the h1’s citation and title, which costs three serif lines at 390 before any text (design-reviewer).
- **evidence:** `preview/law-container.html` (Part I, `?unit=title26`, `?unit=cfr52`) and `preview/law-section.html`, 390
- **proposes:** ratify designation-as-identifier and contents-on-material. Render the section page with and without the paper head and rule.
- **blocks:** nothing

### Statutory markers need a type role
- **kind:** spec silent
- **found:** “(a)” and “(A)” are different units of law, so their case is meaning. `role-designation` uppercases and cannot carry them. The specimen sets markers in the paragraph’s own `role-body-serif` at `--serif-semibold`, with an indent per level, and subsection heads in `role-display-minor`.
- **evidence:** `preview/law-section.html` paper, both schemes
- **proposes:** a marker rule under the Archive register: inherit the text role, weight one step, never transformed
- **blocks:** voyager’s section body

### Law pages: authority links and their strength
- **kind:** spec silent
- **found:** a statute page lists “Regulations that implement it”: CFR parts whose authority line cites the section, sorted by how many of their sections do. A CFR part or section mirrors it as “Statutes it implements”, with the CFR’s own “Authority:” line under the title. The count is the row’s only emphasis, in `--text-primary` at one weight step, with no bar and no fill. The module is omitted at 0 (§ 501), and the link is part-level by construction.
- **evidence:** `preview/law-section.html?unit=s7410` (42 parts), `?unit=cfr5221`, `preview/law-container.html?unit=cfr52`, both schemes, 390 and 1440
- **proposes:** ratify count-as-emphasis for ranked relationship rows (ink plus weight, no meter), and rule whether a list whose rows share one agency names it once in the sub-line
- **blocks:** voyager’s law section and CFR part pages

### Ink on lamp-lit paper in dark
- **kind:** unowned default
- **found:** against base `--paper-cream` in dark, without the lamp, `--ink-success` reaches 2.72:1 and `--text-secondary` 3.85:1 (design-reviewer). On lamp-lit paper, sampled beside the fold word counts, `--text-secondary` measures 4.34–4.40:1 near the lamp and 3.85:1 where it falls off; the long-section folds add a whole lane of secondary ink on the paper. The stamp sits top-right, where the lamp is weakest. Not yet painted at the stamp’s actual position.
- **evidence:** `preview/law-section.html?dark`, 1440 and 390; to be sampled
- **proposes:** paint the stamp ink and the paper’s secondary ink at their rendered positions, then rule the dark stamp ink
- **blocks:** nothing until measured

### Values the spec names but the stylesheet doesn’t expose
- **kind:** spec ahead
- **found:** the spec names hover and input fills by material tier (material-thick is the secondary-button hover; ultrathin is hover states and form backings), but those tiers are classes, not custom properties, so a `:hover` rule has to retype their values. `button-secondary` declares no hover of its own, while `button-ghost` says “material-thin alpha”. `measure.body` has no custom property either, so `.text` hand-types it.
- **evidence:** `preview/law-pages.css` (`.btn2:hover`, `a.row:hover`, `.field`, `.text`)
- **proposes:** emit `--material-*-bg` and `--measure-body` custom properties from `colors_and_type.css`, and name `button-secondary`’s hover
- **blocks:** nothing; the specimen annotates each copy

### Long law text: folds, In brief, and modules under 64rem
- **kind:** spec silent
- **found:** 26 U.S.C. § 501 is 12,079 words in 18 subsections; (c) alone is 5,985. The specimen folds the text on the paper at each subsection (marker, heading and length always shown; headless paragraphs fold to their first line), with Expand all on the paper and an ink rule in the gutter marking the cited unit. Three choices are rendered as pairs: open at (a) plus the cited paragraph, or all folded; statute headings only, or an “In brief” glass card of one-line summaries we write; modules under 64rem as folds, or the first module open and the rest as one card of links. At 390, In brief above the paper pushes the cited (c)(3) down by 1,578px.
- **evidence:** `preview/law-long.html` (`?v=land|shut|brief|modfold|modlink`, `&dark`), Paper “Law Pages” rows “Long §”
- **decided (Jason, Oct 30, 2026):** 1A, open at (a) and the cited unit; 2A, statute headings only, no In brief in v1; 3B, first module open and the rest as links under 64rem. `law-section.html` now renders these. The spec entry is still to be written.
- **proposes:**
  - A `components.disclosure` entry: hit area, Phosphor caret-down turned 180° when open, the lane grid (marker, title, length, caret), and that an open paragraph’s text sits in the body, never inside the control.
  - A ruling on which fold apparatus belongs on the paper (Expand all, word counts, “Opened at…”) and which belongs on the aurora above it.
  - A ruling on whether Expand all turning every caret counts as committed-state feedback.
  - A ruling on where In brief goes under 64rem.
- **blocks:** voyager’s section body for long sections

### Serif roman 600 has no class
- **kind:** spec ahead
- **found:** `emphasis-serif-inline` (roman 600) has no class or axis token. Inside `role-body-serif`, `font-weight: 600` computes but never renders, because the role’s `wght` axis wins. The specimen’s markers carry the axis by hand.
- **evidence:** `preview/law-pages.css` `.text .mk`, `.fold.para .mk`
- **proposes:** a class carrying the 600 axis value, and a `--line-box-display-minor` token alongside `--line-box-metadata-sans` (the cited-unit rule hand-computes it)
- **blocks:** nothing; the specimen annotates both

### Homepage door labels: caps eyebrow or sentence-case heading
- **kind:** unowned default
- **found:** the A2 hero puts two parallel buyer doors side by side, each under a tracked-caps label (“For organizations”, “For legal and AI teams”). The spec doesn’t say whether two parallel door labels each count as a section eyebrow (`role-label-caps`) or as a repeated phrase that `chrome-sites-are-closed` keeps short. The second label runs to five words.
- **evidence:** Paper “MCP Sales”, “Hero fork · A2” (light, dark, 390, 390 dark)
- **proposes:** render the caps labels against sentence-case `role-ui-heading` at 390 and 1440, and let the column width decide
- **rendered:** Paper “Hero fork · A2 — door labels in sentence case” (1440) and “— 390 · door labels in sentence case”, beside the caps originals. Neither clips or wraps at 390 or 1440, so width doesn’t settle it. The sentence-case labels read as headings over a body and a button, which is what a door is; caps reads as an eyebrow.
- **blocks:** the homepage hero build

### A bill number as the page H1
- **kind:** spec silent
- **found:** the bill page sets “H.R. 7008” as its H1 with hand-typed tracking. `role-designation` is set at text size. `role-ceremonial` is display size, used once per page, with ceremonial tracking. Neither entry names this use.
- **evidence:** Paper “Bill page · Support / Oppose” boards; voyager `BillDetailHeader` (`role-ceremonial` identifier)
- **proposes:** the bill page H1 is `role-ceremonial`; render it against a serif short-title heading with the designation above it
- **decided (Jason, Nov 3, 2026):** yes, the bill page H1 is `role-ceremonial`. The bill-page boards now render it. The spec entry is still to be written.
- **blocks:** nothing; voyager already ships `role-ceremonial` here

### Support / Oppose: a district position control on bill pages
- **parked (Jason, Nov 3, 2026):** scope cut. Bill pages ship no position control. Take action offers co-sign the bill’s existing ask, write your senators, or start an ask. Nothing to rule until a position control returns.
- **kind:** spec ahead
- **found:** the spec has no entry for a position control. Three questions are open:
  - Is it a `segmented-control` (holds a state) or two `button-secondary` (each commits an act)?
  - May the oppose side be counted and shown?
  - Does the district tally fall under `a-count-row-is-reach`?
  The caption “Counted and shown by congressional district, never as a national poll” is currently doing work a rule should own. The product case is a gateway to Co-sign, Write and Follow, not a poll. It is measured against the ~0.3% baseline of follows plus co-signs per bill-page session, and comes out if it doesn’t lift that.
- **evidence:** Paper “Bill page · Support / Oppose — before a pick” and “— after a pick”, all four variants each
- **proposes:**
  - The control is neutral and never green.
  - Tallies show only in the viewer’s own district, never as a national total.
  - A position is counted, not sent.
  - Render the segmented and two-button forms side by side and rule from that render.
- **blocks:** any voyager build of the control

### Row actions: different acts, one per row
- **kind:** spec silent
- **found:** `components.row-action` covers one action repeated down a list, such as Write beside each senator. The after-co-sign page and the bill page’s after-pick state stack different acts, one per row (Write, Follow, Share), each with its own leading text.
- **evidence:** Paper “A2 — ask page after co-sign” and “Bill page · Support / Oppose — after a pick”
- **proposes:** extend `row-action` to a list of different acts: same secondary ink, `role-metadata-sans` size and `--sans-medium` weight, and a fixed trailing slot
- **blocks:** nothing

### Stale italic caption under the progress ribbon
- **kind:** spec silent (internal contradiction)
- **found:** the “Temporal caption beneath the ribbon” passage in `DESIGN.md` still prescribes the “italic-serif metadata register”. That contradicts the italic policy (serif italic is quoted human voice at 1.125rem or more).
- **evidence:** `DESIGN.md`, the `progress-ribbon` temporal caption (design-reviewer)
- **proposes:** delete the italic prescription; the caption is `role-metadata-sans`
- **blocks:** nothing

### A four-client install picker
- **kind:** two readings
- **found:** the Data & MCP hero leads with install: a client picker (Claude, ChatGPT, Cursor, VS Code) that swaps the URL or config and the one-line steps below it. `components.segmented-control` caps the control at three options (“past three it is a select”) and scopes it to a form. This picker has four options and swaps content, like a view switch.
- **evidence:** Paper “MCP Sales”, “Data & MCP — 1440 / 390” and dark, hero Install block. “Data & MCP — install picker, the other three clients — 1440” has the other three states. At 390 each segment is 84.5px and “VS Code” clears its segment by about 9px a side (design-reviewer, 2026-11-03).
- **proposes:** render the four clients as a select and as `components.tabbar` at inline scale, at 390 in both schemes, and rule. A select hides three of four clients, and showing every client is the point of the comparables (Stripe, Linear and the finance data MCPs). This extends “A segmented control outside a form”.
- **blocks:** the voyager build of the `/data` hero install block
- **decided (Jason, 2026-11-03):** keep the segmented control at four options. Apple’s HIG allows about five on iPhone and five to seven wide. /ratify writes the cap exception into `components.segmented-control`; further clients go to a setup-guide link, not a fifth segment, because 390 has no room.

### A scripted chat replay on the Data & MCP page
- **kind:** spec silent
- **found:** the page's chat demo plays back the real `show_*` cards from saved results, in four beats: the question lands, the step line appears, the card arrives, the cited answer holds. It plays once on first view, and a scene button replays it. The motion rule names two surfaces, Receipt bloom and Commons accrual, and says streaming is not motion. A replay is neither of those surfaces, and arguably not streaming either.
- **evidence:** Paper “MCP Sales”, “Chat demo storyboard — real cards — 1440” and its dark variant. The source recordings are the qwen-flash and deepvest demo videos (Remotion, `deepspace-law-children/demo`).
- **proposes:** classify the replay as streaming, so it needs no third motion surface. Each beat fades in whole, with no typing, pan, zoom, scale or transform. It plays once per view, and under `prefers-reduced-motion` the page shows beat 4 at once. Render beat 1 to beat 4 against the static final frame and rule from that render.
- **blocks:** the voyager build of the `/data` chat demo

### Vote bars draw nays in red
- **kind:** spec silent (the yea colour); conformance (the red and amber)
- **found:** the `show_bill` card fills nays red and not-voting amber; neither is danger or warning. The red and amber are a conformance fix, filed as resistbot/deepspace#3304, along with the stage ribbon (green, and red on vetoed) as #3305. Still open: what fills the yea. The spec says nothing on vote bars, and green on a yea is neither a crowd counted nor the primary act.
- **evidence:** the qwen-flash demo video at the bill card; Paper “Chat demo storyboard — real cards — 1440”, House and Senate vote rows
- **proposes:** render the yea in `--ribbon-active` against green, on the neutral track with neutral nays, in both schemes, and rule
- **blocks:** the yea fill in #3304

### Segmented control labels at narrow width
- **kind:** unowned default
- **found:** the chat demo picker uses "Is it law?", "Quoted from the Code" and "Who lobbies on it" at 1440, and "The Code" and "Lobbying" at 390. The spec says nothing on narrow labels for a segmented control (`components.tabbar.shortLabel-required` covers the tab bar only), or on whether segments are equal width or sized to their content. At `role-body`, "The Code" overflows a 71px equal segment.
- **evidence:** Paper "Chat demo storyboard — real cards — 390" (design-reviewer, 2026-11-03)
- **proposes:** one parallel set at both widths, such as "Is it law?", "What it says" and "Who lobbies", content-sized at `--space-3`. Render it against equal segments with the current set at `role-body` in the 326px track, and rule.
- **blocks:** the `/data` chat demo picker

### Dark ground of a card embedded in a host
- **kind:** spec silent
- **found:** the MCP cards ship an opaque zinc dark ground (`--card`), because they render inside Claude or ChatGPT as well as on our page. Hard rule 16 collapses dark glass to the canvas's own family. Nothing says which ground a card takes when it sits in someone else's host.
- **evidence:** `deepspace-law-children/apps/mcp/src/deepspace_mcp/widgets/shared.css` `--card`; Paper "Chat demo storyboard — real cards — 1440 dark"
- **proposes:** render the shipped zinc card inside the dark demo frame next to a canvas-family opaque card, check the seam and the success-ink contrast on each, and rule. Until then the boards draw what ships.
- **blocks:** the dark `/data` chat demo

### The chat demo frame: canvas region or card
- **kind:** two readings
- **found:** the demo frame carries material, a ring and a shadow, and nests the card inside it. If the frame is a card, the reply's serif and the nesting are wrong. If it is a viewport onto a dialogue, both are fine. `registers.marketing-is-outside-the-table` covers the record inside the frame but not the frame itself.
- **evidence:** Paper "Chat demo storyboard — real cards — 1440" and dark
- **proposes:** render the frame as a canvas region with no plate, and as a card, in both schemes, and rule
- **blocks:** the `/data` chat demo frame

### Quoted statute in a reply
- **kind:** spec silent
- **found:** scene 2 quotes 26 U.S.C. § 530A(a) inside the reply as a blockquote in serif roman, secondary ink, with a left rule. `role-quote` is quoted human voice only.
- **evidence:** Paper "Chat demo storyboard — real cards — 1440", scene 2
- **proposes:** render the quote at `role-body-serif` in primary and in secondary ink, and rule
- **blocks:** nothing; the law pages may want the same answer

### Text arrows on outbound links
- **kind:** unowned default
- **found:** the shipped cards mark outbound links with a "↗" text glyph ("Read at the source ↗", "Amendment ↗"). Hard rule 18 binds icons to Phosphor and says nothing of text glyphs.
- **evidence:** `law_card.html`, `sources_card.html`
- **proposes:** Phosphor ArrowUpRight at text size in place of the glyph; render both and rule
- **blocks:** nothing

### Column, pane and verdict labels
- **kind:** unowned default
- **found:** voyager `/data` sets the side-by-side's pane labels, comparison column headers, the failed verdict and the bill card's “9 public companies lobbied on it” in `role-field-label`, secondary ink. `role-field-label` is a form field's name in primary ink. The spec names no role for a column header or a figure caption.
- **evidence:** voyager `components/mcp/sales/McpSalesSections.tsx` `columnLabel` (branch mcp-sales-page, uncommitted; design-reviewer, 2026-11-03)
- **proposes:** render the 1440 header row and pane labels three ways, both schemes: field-label in primary, field-label in secondary, and `role-metadata-sans`. Rule from the render.
- **blocks:** nothing; ships as field-label in secondary until ruled

### Inline code at caption size
- **kind:** spec silent
- **found:** the step line “Used Amendment · `show_bill`” is `role-caption` with the tool name in `font-mono`. `role-code` is 0.875rem and can’t sit inside 12px text.
- **evidence:** voyager `/data` side-by-side step line (design-reviewer, 2026-11-03)
- **proposes:** name a caption-size code variant, or rule that a caption carrying code steps up a size
- **blocks:** nothing

### The Close section's outline
- **kind:** unowned default
- **found:** on `/data`, the Close section's only heading is the pilot card's `role-ui-heading` h2. The sign-in list comes before it in the DOM, so heading navigation files the three sign-in points under the Trust section’s “Where the data comes from” h3.
- **evidence:** voyager `/data` Close section (design-reviewer, 2026-11-03)
- **proposes:** render three options in both schemes and rule: (a) a serif outline heading above the sign-in list, (b) the list moved into the pilot card, (c) as shipped
- **blocks:** nothing

### Sans semibold body as a row lead or term
- **kind:** unowned default (the sans twin of “Serif roman 600 has no class”)
- **found:** comparison-table questions, the briefs label and the sign-in terms on `/data` are `role-body` with `font-semibold`. The Paper board agrees: 16px at 600. No role owns it.
- **evidence:** voyager `/data` (design-reviewer, 2026-11-03); Paper “MCP Sales”, “Data & MCP” boards
- **proposes:** name a sans semibold body role, or sanction the literal as a term weight; rule together with “Serif roman 600 has no class”
- **blocks:** nothing

### Brand marks in the install picker
- **kind:** spec silent
- **found:** Jason asked for each client’s mark beside its label in the four-client picker, monochrome and in the label’s ink: primary on the selected segment, secondary on the others, so it inverts with the scheme like the rest of the site. The icon rule says Phosphor, and Phosphor carries only the OpenAI mark. The Claude, Cursor and VS Code marks come from Simple Icons (CC0; VS Code from 12.0.0, since later releases dropped Microsoft marks). At 1440 the mark sits left of the label (18px, 8px gap). At 390 it stacks above the label, and the segment grows from 44 to 56px tall, because a side-by-side mark does not fit an 84.5px segment.
- **evidence:** Paper “MCP Sales”: the hero picker on all four Data & MCP boards, and the three states on “install picker, the other three clients — 1440”
- **proposes:** rule that third-party brand marks are not icons, so the Phosphor rule does not cover them: monochrome, in the adjacent label’s ink, at the icon size of the control they sit in, never in brand colour. Confirm the stacked 390 segment.
- **blocks:** the voyager build of the `/data` hero install block (with the entry above)

### Comparison table tiers
- **kind:** spec silent
- **found:** the `/data` “Against the field” matrix drew its column heads, group heads and rows at nearly one weight and size: sans 16 for the heads, sans 18 semibold for the groups, sans 16 for the rows, with every rule at 10%. Jason called the tiers indistinct. No role owns a table column head or a table group head.
- **evidence:** Paper “MCP Sales”, “Against the field — header and row hierarchy — 1440 dark”; voyager `/data` before the change
- **proposes:** a table column head is `role-label-caps`, with the featured column in primary ink and a 20% rule under the header row. A table group head is `role-display-minor`, separated by space rather than a rule. Rows are `role-body` with 5% rules. A featured column carries a neutral 4% tint, never green. Render the light scheme and 390, and rule.
- **blocks:** nothing; voyager builds it now at Jason’s ask
- **divergences in the build (voyager-de, 2026-11-03):** (1) at 390 the column heads are `role-field-label`, because caps at `--sans-chrome` overflow the 57px columns; rule this together with “Column, pane and verdict labels”, since `role-field-label` is a form field’s name, not a column head. (2) The 20% and 5% rules and the 4% tint are literal alphas. No token holds them: `--border-hairline` is 5% in light and 20% in dark. Name a token for each, or sanction the literals.
