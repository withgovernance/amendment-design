# Changelog

Dated entries, newest first. No semantic version — the system is not consumed
as a package, and a version number would imply a stability contract nobody is
keeping. See `DESIGN.md` → **Governance**.

**Owner:** Jason — head of product & design, The Governance Company. Named 2026-08-02.

---

## 2026-08-28 (v2026.08.28.35) — Design rules bind the system's voice, not the user's

**Decided by Jason**, reverting a `cleanTitle()` that stripped leading emoji from
conversation titles on save. He is right and the reasoning generalises.

**The design system governs what the product renders by its own choice. User-authored
content is not a design surface.**

**The diagnostic, which is the keeper: a rule that cannot distinguish a model's output
from a user's keystroke is being applied at the wrong layer.** A conversation title is
something a person types and edits. At the save handler, a model's `🏛` and a user's are
the same bytes — so the strip cannot be aimed, and it takes a character the user
deliberately put there. Not an imprecise instrument; **the wrong instrument.**

### My own wording invited it

`enforcement-has-a-blind-spot`'s tier 3 said such a rule *"can only be moved upstream,
to wherever the content is generated."* That is true of a **model prompt** and false of
a **save handler**, and it did not say which. **The correct upstream is the generator
that composes the text, never the path a human types through.**

So this scopes every editorial rule in the file — the no-🎉 register, the icon set, the
imagery bans, the type registers. All of them bind **the system's own voice**. They do
not bind what a constituent writes, names, or titles. *The system may choose how to set
a user's words; it may not choose the words.*

### The clue was already in the file

**The script face renders the user's own affirmed name and nothing else.** That rule has
always treated user content as something the system *presents* rather than *authors*. The
principle existed in one place and was never generalised, which is the same shape as the
tab bar's "one chrome that overlaps scrolling content" — a correct criterion stated about
a single instance and never enumerated.

---

## 2026-08-28 (v2026.08.28.34) — One gate, not two: I called a hardening a blocker

`band-is-bounded` said *"the invariant is only true once both land"* — the three-lobe
band **and** `--text-secondary` moving 55% → 60%. **That is wrong about the second one.**

**The invariant holds with the band change alone.** On the three-lobe token band the
worst point, with secondary ink **at its current 55%**, measures **4.53:1** against a
4.50 bar. It clears.

So there is **one** gate, and it isn't a decision: the five-lobe curtain cannot be tuned
into compliance at any alpha, the three-lobe token band already passes, and the swap is
**forced by measurement**.

**55% → 60% is hardening, not compliance.** It buys margin — 4.53 → 5.40 at the worst
point — and margin is genuinely worth having when the pass is by 0.03, because the next
lobe adjustment breaks it silently. But it is optional, it is a one-line token change,
and **it needs no visual review**: slightly darker secondary ink is not a composition
question, and the story a11y assertions already verify it.

### The error is worth naming because it spends someone else's attention

I conflated **compliant** with **has headroom** and presented both as blocking, then put
the bundle in front of the owner as a decision to make. It isn't one. **A gate stops a
ship; a hardening is a backlog item.** Calling the second the first is not a harmless
excess of rigour — it makes every real gate cheaper to ignore, and it invites exactly
the response it got: *you want me to litigate a 5% difference?*

The rest of this file spends its length on numbers that carry their conditions. A
number's *consequence* is one of its conditions.

---

## 2026-08-28 (v2026.08.28.33) — The tab bar's glass, measured: 35% light, 45% dark

**Set from a render, then verified against it.** `material-chrome` moves from
**55% → 35%** in light and **90% → 45%** in dark, blur unchanged at 25px. Those were
desktop-chrome numbers whose job was immunity to what scrolled beneath; here the job is
legibility, and glass is the point.

**Measured on the composited render** at 390, with a full-strength action-green CTA
passing directly behind the bar — the hardest colour case named in the brief:

| | labels over the green | bar |
|---|---|---|
| light 35% | **9.88:1** | pass |
| dark 45% | **6.64:1** | pass |

### A transmitted tint is not a painted plate

At these fills the bar visibly takes on the green of the CTA beneath it, and **this
file's first reading was that it breaks the fill rule** — a green plate that cannot be
pressed. **It does not.**

**The fill rule governs what you paint, not what glass transmits.** A glass bar over a
green CTA is no more a green plate than a window over grass is a green window. The plate
is neutral; the colour belongs to the page showing through, which is the entire point of
the iOS model this bar is built on.

Recorded because the objection is a natural one and will be raised again — it was
raised here, by me, against a render that was correct.

### What the near-miss was worth

The renders arrived and the bar looked green, and green in this system means *press me*.
Sampling it gave hue 154° light and 167° dark at 0.25 saturation — unmistakably
`--color-action`. That was worth checking and the check was right to run; **the reading
of it was wrong**, because the measurement identified the colour and not its cause. A
correct measurement pointed at the wrong conclusion, which is a different failure from
the ones this file has been collecting all day and worth naming as its own: *knowing
what a number is does not tell you what it means.*

### Residual, not measured

The green CTA is the hardest **colour** case but not the hardest case outright. A
**high-contrast image** beneath the bar — dark under light mode, bright under dark —
moves the ground further than a flat plate can. Untested. If images ever sit under this
bar, measure that before assuming these values carry.

---

## 2026-08-28 (v2026.08.28.32) — The tab bar keeps its material, and it is glass

**Decided by Jason**, closing the last material question recession left open.

**The tab bar keeps `material-chrome`.** It is a mobile menu on the iOS native model,
and such a bar **sits above content by definition** — that is what makes it a tab bar
rather than a footer.

**So the material survives with exactly one consumer, deliberately.** Stated because a
one-consumer material looks like an orphan to a later cleanup pass. It is not leftover:
it is the only surface in the system that overlaps scrolling content, and the material
is what lets it.

The measured fact behind it: the bar is `fixed inset-x-0 bottom-0` with an `h-18`
spacer, and **the spacer only guarantees the last item is reachable** — it does not stop
content passing behind the bar mid-scroll, because with a fixed bottom bar whatever sits
at the viewport's bottom edge is behind it at every scroll position. Receded, it would
reproduce the text-through-text collision found on the conversation route, at the bottom
edge instead of the top. And unlike the navbar it cannot escape by dropping sticky: **a
bottom tab bar that scrolls away is not a tab bar.**

### It is glass, not a slab

Blur and transparency are the **point** of the iOS model, not a compromise in it:
content beneath should be present and unreadable, so the bar reads as a layer above a
continuing page rather than a lid on it. **Keeping a material does not mean going
opaque.**

**And the 90% figure does not transfer.** That was set for chrome over a *canvas*, where
the risk was hue contamination from a CTA scrolling under — 90% moves by 25 in summed
RGB against 222 for a 12% wash. Over arbitrary *content* the goal is not immunity; some
show-through is intended.

**The binding constraint is the bar's own labels:** they must clear 4.5:1 against the
worst content that can pass beneath, and content is arbitrary — a green CTA, a danger
badge, an image. **Blur alone does not floor that; the fill does, because blur spreads a
colour rather than removing it.** Needs a measurement: the label ramp over the worst
realistic content, at candidate fill levels, both schemes. Do not take the number from
the desktop value or from the platform — measure this bar over this product's content.

Glass is legal here at all because the labels are the **neutral ramp**, which
`ink-needs-an-opaque-ground` explicitly exempts as luminance against its own material
rather than hue separation.

### A false absolute corrected

The recession ruling said *"the mobile tab bar takes whatever the navbar takes,
always."* That is now false. The intent was right — one navigation at two widths must
not drift for aesthetic reasons — but **a clause cannot override a physical
difference**, and there is one: the navbar stopped overlapping by dropping sticky; the
tab bar cannot. **The shared identity is carried on the axis where it belongs** — both
take `role-body` sentence case per `.29`. Same navigation, same voice, different
material because they sit on different grounds.

---

## 2026-08-28 (v2026.08.28.31) — The header stops being sticky

**Decided by Jason.** The navbar is no longer sticky, which is how this surface
satisfies `recession-requires-nothing-scrolls-beneath`. That rule has two available
means — **contain the scroll beneath the chrome, or do not overlay the scroll at all.**
The second is cheaper and was chosen: **one class on one component, no structural
change.**

**What the header was carrying, and why losing it is affordable.** Verified: the middle
slot is `SpotlightTrigger` — bill search — on default routes, and `<Title />` on the
conversation route. Search is no longer first-class and can live in the rail if wanted.
The title was already accepted as a cost of the chosen composition, carried by the tab
title and, on bill routes, the breadcrumb.

### The cost that is not obvious, named so it is a decision rather than a discovery

**The rail is `md:flex`; the header is not.** On desktop the wordmark, the destinations
and the account menu all persist in the fixed rail, so a header that scrolls away costs
nothing. **On mobile there is no rail.** The wordmark, search and the auth control
scroll away together, and the only persistent chrome is the bottom tab bar — which
carries destinations, not account. **A signed-out mobile user's sign-in affordance
becomes above-the-fold only.**

That is a normal mobile pattern and it is a real cost. It is not a reason not to do
this; it is a thing that should be chosen rather than found later.

### It scopes the structural fix rather than foreclosing it

If the conversation view later proves it needs a persistent title, **that one route**
takes an inner scroll container beginning below its chrome. Localised, instead of the
whole product paying up front for one route's requirement. The `.30` rule stands
unchanged and is satisfied either way.

---

## 2026-08-28 (v2026.08.28.30) — Receded chrome requires that nothing scrolls beneath it

A live collision on the conversation route: body text scrolling **under** the receded
navbar and rendering **through** the page title. Not a contrast failure — text on text.

**The rule was already implicit, and only one of its members was named.** The recession
ruling kept `material-chrome` for the mobile tab bar because it is *"the one chrome that
overlaps scrolling content."* **The criterion is right and general; "the one" was
wrong.** The conversation title bar is its second member, and the set was never
enumerated.

So: **receded chrome requires that nothing scrolls beneath it.** Recession puts chrome
on the aurora. If content passes under it, chrome is not on the aurora — it is on
content, which is a different ground and the one that needs a material. Chrome that
must overlap scrolling content **keeps a material and is therefore not receded** — an
exception stated per surface, not a bug patched per route.

**The fix is structural.** Give the scroll region its own container starting below the
chrome. The spec already knows the pattern: `components.navbar` records that app routes
*"scroll inside an inner container"* — which is why the old scroll-driven variant never
advanced past `blur(0)`. The conversation route scrolls the **document**, which is why
it collides.

**And a hairline does not fix it.** A hairline is a *boundary*; the failure is
*transparency*. A line between the nav and the title leaves body text passing through
the title's glyphs. Recorded because it is the remedy that sounds like a design answer
and is not one.

If a route restores material as an interim it takes a **dated Known Divergence** naming
the route and the condition for removal — not a comment. *"Temporarily"* has a record
here: the `hexp` aliases and the 75% chrome value each outlived their migration.

---

## 2026-08-28 (v2026.08.28.29) — "The navbar is chrome" is a claim about a surface, not its content

Every navigation label in the product shipped in **tracked uppercase**. Jason called
it and he is right. **Nav labels take `role-body` — sentence case, sans, no tracking —
in the sidebar and the tab bar alike.**

### How it happened, which is the reusable part

*"The navbar is chrome"* is a claim about a **surface**. It was read as a claim about
its **content**. Chrome-the-material and chrome-the-type-register are different things,
and nothing in this file said so.

Then it spread by analogy: the **tab bar's** typography was specified as
`sans-chrome 12px uppercase` — and **the sidebar copied it.** There is no sidebar entry
in this file at all. A specified value for one component became an unexamined default
for the navigation of the entire product.

### Three reasons, and the second isn't taste

**(1) A nav label is a destination name, not a field label.** "SELECT JURISDICTION"
labels a control; "Dashboard" *is* the place. The chrome register names things *about*
the interface; navigation names places *in* it.

**(2) Measured, it does not fit.** The rail's label slot is **161px**. "CONVERSATIONS"
at chrome caps sets **153.1px — 95% of its slot** — and the component carries
`truncate`. **The system was already compensating for the fit by clipping rather than
by changing register.** That is `widthDiscipline-measured` exactly: a small label in a
fixed narrow plate cannot be chrome unless the plate widens, and a rail cannot widen.
At `role-body` the same label is 100.8px — 63%.

**(3) Navigation is scanned, not read.** Caps removes the ascender/descender pattern
that makes a repeatedly-scanned list fast to recognise. This is the most-repeated text
in the product, and `sans-chrome`'s own note says the register is for institutional
labels used **sparingly**. Seven rail items plus a tab bar is not sparingly.

### It also settles the two-identity problem in the right direction

The recession ruling established that the tab bar and the navbar are one navigation at
two widths and take the same treatment. Until now they took the same *wrong* one.

**No fit risk:** sentence case is narrower than tracked caps at every label in the set,
so every measurement that passed before passes by more.

**The wordmark is unaffected** — a designation, one per page, staying in the chrome
family. The open question of whether it is chrome or ceremonial is untouched.

### The tell was in the code

`truncate` on a label that fills 95% of its container is not a defensive utility, it is
**a fit failure with a lid on it**. The register was wrong and the symptom was visible
in the class list the whole time — one more instance of a default that is correct in
the common case and silently wrong in the uncommon one, except here the uncommon case
was the longest item in a seven-item list.

---

## 2026-08-28 (v2026.08.28.28) — The dependency was inverted, and my correction was wrong the other way

Three findings from the 9b implementation, all correcting something written here, and
all verified before landing.

### The full-bleed dependency pointed at the wrong route

`.23` carried, from the handoff and unchecked by me: *the centred content column gives
the rail an implicit edge, and a full-bleed route removes it — check the bill and
elections routes.* **Measured at 1440 dark, sampling either side of the rail's right
edge at three heights:**

- **Full-bleed neighbour:** `material-regular` at `rgba(0,0,0,.41)`, flush, **at all
  three heights.** A continuous boundary down the whole viewport.
- **Inset/centred column:** `rgba(0,0,0,0)` at **every** height. The card sits ~440px
  away and occupies only the top band, so below it **the rail has no edge at all.**

**Exactly backwards.** The full-bleed route *supplies* an edge; the inset column has
none — and the inset case is the **shipping** state, since the app's routes are cards
with gaps on bare aurora. **The check as prescribed would have passed the failing case
and flagged the safe one.**

**And the inset case needs no edge.** Rendered, it reads correctly: below the nav there
is nothing on either side of the boundary, so it is not a seam, it is open canvas. The
concern was about a join that does not exist.

What is worth looking at is the other one: **a receded rail flush against a full-height
glass panel can read as a cut-out** rather than as recession — the rail becomes the
absence of the panel instead of a surface. That is the case to check on a full-bleed
route, the exact opposite of what was asked for. **Not by drawing a rail edge** — that
is the material decision recession just removed.

### The active row was never a fill, and my correction made it worse

`.23` said the active state *"loses its fill."* `.27` corrected that to *"the shipped
neutral tint stays."* **Neither had opened the file.** The shipped state is
`text-slate-800 / dark:text-slate-300` with `weight="fill"` on the glyph — **ink plus
weight plus filled glyph already.** The only `bg-black/5` in that component is a
**hover** state.

So `.23` described removing a fill that was never there and was accidentally right
about the destination; `.27` described keeping a tint that does not exist. **The
correction was wrong in the opposite direction and in the same way** — an unverified
claim answered with another unverified claim.

That is the part worth keeping. `.27` had the **form** of diligence: it owned an error,
softened an over-firm rule, and told the consumer to put something back. It did every
correct-looking thing except open the file. **A correction is not self-verifying; it is
just a claim pointing the other way**, and it arrives wearing the credibility of having
admitted a mistake.

The measurement that drove all of it does not apply here either: dark active is
`slate-300`, light ink on dark ground, nowhere near the 1.22:1 that foreclosed an
indigo mark. Nothing to render, nothing to change. What survives is the indigo finding
itself.

### Two items on the relayed list were already done

The navbar's `border-b` and `dark:bg-[#080c17]/50` do not exist — stage 3 removed them
and its own comment says so. I relayed a conformance list without checking whether its
items were still true, which is the third thing in this entry with the same shape.

### Also

Retiring Chromatic had one real consequence beyond cleanup: `MediaAttribution.stories.tsx`
guarded a tooltip assertion behind `isChromatic()`. With the runner gone that branch is
permanently false, so the guard was removed and the assertion now runs — and passes.
**A conditional that can no longer be true is a test that silently stopped testing.**

---

## 2026-08-28 (v2026.08.28.27) — The active row was ratified from a recommendation that asked to be measured

`.23` states that the active nav row *"loses its fill and carries ink, weight and the
filled glyph."* **The source of that sentence recommended it and said explicitly: this
is a sub-decision, so measure it rather than assume.** I ratified the recommendation
without the measurement — and the recommended 3c composition shows a **neutral fill**,
which contradicts it.

What *is* measured stands: **Midnight Indigo as a mark** dies on the aurora at 1.22:1
and 1.34:1 in dark. That forecloses an indigo mark, and it is why `primary` has no role
in chrome once no plate does. What that number does **not** cover: a **neutral tint is
not indigo ink.** `bg-black/5` on the aurora is a different question from
`--color-primary` as ink, and nothing has been measured about it.

**So the shipped neutral tint stays until the dark render exists**, and the spec now
says so rather than instructing a change on the strength of an unmeasured sentence.
Pending: the active row in dark, four ways — neutral tint, ink and weight, filled
glyph, and 3c's treatment.

**An over-firm ratification is more dangerous than a missing one.** A gap gets queued;
a sentence written with this system's usual confidence gets conformed to. This one
would have removed a treatment the recommended design actually uses.

---

## 2026-08-28 (v2026.08.28.26) — Chromatic retired; Storybook local is the instrument

**Decided by Jason.** The account is not renewed, Storybook runs locally, and stories
are to be created and managed **liberally** to make sure everything looks right. The
standing *"nobody has walked the diffs"* item closes with it — build 3761 took no
snapshots, so nothing was ever canonised and there is no baseline to lose.

**Named rather than assumed: there is now no automated visual regression detection.**
Nothing will report that a token change moved pixels on a surface nobody opened. The
`.18` chrome retint and the `.23` recession would each have lit up every route; neither
would be caught automatically today.

**What catches things instead is a real set rather than a gap:** the person iterating
in Storybook, the designer's independent review pass at both widths and both schemes,
`design:lint`, and the a11y assertions in stories — which have already caught two real
failures this migration. Human-paced and story-scoped. Adequate at this size, and not
equivalent to a diff on every route.

**Liberal stories turn this from a loss into a method.** Trap 3 says nothing unrendered
stays true; story coverage is the direct answer to it. It also reaches the **tier-2
blind spot** — `HexStateMap` styles imperatively and `design:lint` cannot read it, but a
story with a rendered-output assertion can. What makes a story count, since 563 stories
nobody opens is not coverage either: it renders (one was deleted this migration for
rendering nothing), it carries the a11y assertion, and it covers a **canonical state**
rather than duplicating one.

Available at zero new dependency cost if a regression ever bites: `@vitest/browser`
4.1.9 already ships `toMatchScreenshot`, and the browser runner is already how the tests
execute. **Precondition: baselines must be generated in the environment that checks
them** — macOS baselines will not match Linux CI, which is the usual reason self-hosted
visual regression gets abandoned. Self-hosting Archivo helps that determinism; moving it
to a CDN would hurt it, which is a live interaction with the open font question.

**Cleanup owed by voyager:** the chromatic workflow, the `package.json` script, the
`@chromatic-com/storybook` addon, and two references in `deploy-links.yml`. A workflow
that cannot run is the same class of thing as a lint rule reporting files clean without
reading them.

---

## 2026-08-28 (v2026.08.28.25) — The canvas is only an instrument when you paint with it

A one-paragraph sharpening of yesterday's measurement rule, contributed with a
reproduction of all three layers in one run, and it changes what the rule tells you
to do.

`measure-by-painting-not-by-parsing` implied a clean split: parsing bad, canvas good.
**That is wrong, and the wrongness is the point.** Three of the four ways to ask a
colour question return the string — `getComputedStyle`, a regex over it, and the
`fillStyle` echo — **and only the fourth returns a pixel.** The two failing canvas
paths *look more rigorous* than the naive regex while being identically wrong. So
**"I used a canvas" cannot stand in for the check**; only `fillRect()` +
`getImageData()` is the check.

**And the failure propagates into an action, not just a reading.** The number is not
wrong-looking, it is *plausible*: `[0.66, 0.148, 160]` read as RGB is a near-black
blue, so **a green would report as failing contrast on light and passing on dark** —
the exact shape of a real finding in this file, several of which are real. Someone
would then "fix" a colour that was already correct, **and the fix would be the
damage.**

Independently confirmed in that run: `fillStyle` echo returns the oklch string
verbatim; `getImageData` on the same string gives `rgb(8,173,114)` = `--color-action`;
`--canvas` gives `rgb(244,244,245)`. Three sessions' worth of numbers now agree by two
methods.

### A note on the correction that preceded it

The `prefers-reduced-transparency` item was wrong on its merits, not merely
misattributed — content cards remain `material-regular` under recession, so that
block's main job is untouched. Worth recording what the consumer-side session
observed about it: had it implemented the declaration that item asked for, **it would
have shipped a rule for a path that did not need one, and it would have looked like
diligence.** Unnecessary work that resembles care is not self-correcting, because
nothing about it looks wrong.

## 2026-08-28 (v2026.08.28.24) — Three corrections, one of them about who said what

### I attributed a conformance list to the party that did not write it

In relaying the `.23` ruling I wrote *"YOUR CONFORMANCE LIST, confirmed"* to the
implementation session and ruled on six items. **That list came from the handoff, not
from that session, which had queued the chrome question with four questions and
deliberately no proposed code changes** — because guessing there cost a revert. On
one item I went further and wrote *"you're right that it now matches nothing"* about
a `prefers-reduced-transparency` observation **that session never made.**

The spec record is clean — `.23` names no one, so nothing false got written down. The
near-miss is the finding, and the session that caught it framed it correctly: had it
implemented six items I had ratified *on its supposed analysis*, I would have thought
it verified them and it would have thought I had, **and the record would show a
consumer-side finding that never happened.** That is a lint rule reporting files clean
without reading them, one level up.

**A ratification that credits a finding to a party who never made it manufactures a
verification that never occurred.** Attribution is not courtesy in a system whose
whole discipline is that claims carry their evidence; it is part of the evidence.

### And the item I agreed to was wrong on its merits

*"With chrome receded, `prefers-reduced-transparency` matches nothing."* **It matches
plenty.** That block collapses `material-ultrathin`, `-thin`, `-regular` and `-thick`
as well as chrome — and **content cards remain `material-regular` under recession**, so
the block's main job is untouched. Only chrome's own entry goes unused, and not even
that while the tab bar may keep the material.

The correct statement is that **recession does not interact with that path at all**: a
surface with no fill is not matched by a rule that collapses fills. Nothing to
collapse, nothing to declare — the opposite of the "state it rather than leave a media
query matching nothing" the handoff asked for.

I asserted it inside a sentence agreeing with someone, which is the cheapest place in
a conversation to put an unchecked claim and the hardest place to notice one.

### `a11y.contrast.measure-by-painting-not-by-parsing`

Raised by the implementation session and verified here, with a layer it had not hit.

**`getComputedStyle` serialises `oklch()` verbatim.** A regex expecting `rgb()` pulls
`[0.66, 0.148, 160]` out of `oklch(0.66 0.148 160)` — which read as RGB is a near-black
blue. No error, no warning, three plausible numbers. Since this system **authors in
oklch by rule**, every colour token is exposed to it.

**The obvious workaround also fails**: assigning to a canvas `fillStyle` and reading it
back returns the same oklch string. The echo normalises nothing, so a measurement built
on it reads as though it resolved the colour and did not.

**What resolves it:** paint and read the pixels — `fillRect()` then `getImageData()` —
or sample a screenshot. Verified: `oklch(.66 .148 160)` paints to `rgb(8,173,114)`,
which is `--color-action`; `--canvas` paints to `rgb(244,244,245)`. Both match values
derived independently, which is what makes the method trustworthy rather than merely
different.

**Measure by painting, never by parsing.** This is the silent-failure family pointed at
the instrument, and it is the worst member: a contrast figure taken this way **would
pass every review in this file's history** — it has a ground, a position and a scheme,
and it is simply false.

### Independently confirmed

The binding constraint from `.23`: `--canvas` light resolves to `rgb(244,244,245)`,
and 55% black on it measures **4.63:1** against my 4.65 — same result by two methods,
against a 4.50 bar. **The light-mode budget for secondary ink is ~0.13–0.15 of
contrast before it breaches, on a bare canvas with no band at all.** That number is
independent of which aurora wins, and it stands.

## 2026-08-28 (v2026.08.28.23) — Chrome recedes; my ruling one version ago was wrong about the question

**Decided by Jason.** Desktop chrome takes no material: the navbar and sidebar rail
keep their ink and lose their plate. Content cards become the only glass. This
reverses `v2026.08.28.22`, which was mine.

### Why the reversal is right, stated because the ruling it overturns was mine

`.22` measured **label legibility** at both treatments and found recession costs the
section title 56% of its headroom and kills the active mark. **Those measurements
stand.** What that specimen never rendered is where the decision actually lives:
**figure and ground at the full frame, with content present.**

Two chrome plates meeting at the top-left corner form an **L brighter than the cards
it frames**, which inverts the system — the furniture becomes the object and the
content becomes the hole it left. The same L cuts the aurora into three disconnected
pieces, so nothing reads as a continuous ground. Recession also returns the primary
action: plated, the CTA is one of three bright objects along the top-left; receded,
it is the only one.

**My specimen had no cards in it.** A card that omits the thing being framed cannot
answer a question about framing — which is a sharper version of the lesson this
changelog keeps recording, because the omission was not a mismeasurement. Every
number in `.22` is still correct. The card was answering a narrower question than the
one being asked, and nothing in the numbers said so.

`recession-declined` is kept in the spec beneath its replacement. A reversed ruling
is evidence about how the question was reached, and deleting it hides the reversal.

**The cost is paid, not denied:** the active nav state loses its fill and carries
**ink, weight and the filled glyph**. With no plate anywhere in chrome, `primary` now
has no role in chrome at all — a second consequence of `plate-not-mark`.

### The gating measurement, and it did not land where the task expected

The task commissioned: *bound the lobe alphas until `--text-secondary` clears 4.5:1
over every point of the band.* Measured on a 1440 frame, sampling every point of both
bands and taking the worst:

| band | light | dark | |
|---|---|---|---|
| **spec token** (three lobes) | **4.53** | **5.96** | passes |
| **shipped curtain** (five lobes) | 4.02 | 1.95 | fails |
| shipped, alphas ×0.5 | 4.36 | 3.76 | fails |
| shipped, alphas ×0.3 | 4.48 | 4.99 | light still fails |

**Two results, and the second is not the one that was asked for.**

**(1) The five-lobe curtain cannot be tuned into compliance.** In light it fails at
every alpha and *approaches* the bar asymptotically without reaching it. The
three-lobe token band already passes. So the bound is not a new alpha — **it is the
token band**, and the aurora divergence closes in its favour, the same way the
`--canvas` divergence closed at `.6`.

**(2) The binding constraint is not the aurora. It is `--text-secondary`.** Measured
on the light canvas **with no aurora at all**, 55% black is **4.65:1** against a 4.50
bar. **The entire band budget in light is 0.15 of contrast.** The token band spends
0.12 and passes by 0.03 — which is not a bound anyone can rely on, since the next
lobe tweak breaks it silently, exactly the failure the invariant exists to prevent.

**So `--text-secondary` must darken in light, 55% → 60%**: the worst point moves
4.53 → **5.40**, the bare canvas 4.65 → 5.59. Dark needs no change. **The invariant
is only true once both land, and recession ships on the token band with a darkened
light secondary — not before.**

The spec's existing `a11y.contrast` grid, measured against the five-lobe curtain,
turns out to agree: 55% ink inside that band was already recorded at 4.10 light and
2.32 dark. The old rule was right about the curtain. **That is why the curtain is
what retires, rather than the rule being simply repealed.**

### Swept

`material-chrome` scope narrowed to the mobile tab bar, pending its own decision,
with a note not to build on it. `components.navbar` ground set to none, carrying the
**full-bleed dependency**: recession reads well partly because the centred content
column gives the rail an implicit edge, and a full-bleed route removes it with no
hairline to fall back on. `motion` keeps *"Chrome is still"* and gains that recession
is a static state, never a scroll transition — the argument in `.22` that a
material-less surface cannot be still did not survive the decision. The phrase *never
bare text* is gone from `SKILL.md`, `README.md` and `DESIGN-HARD-RULES.md`.
`preview/material-tiers-in-situ.html` and `preview/tabbar.html` are marked superseded;
`preview/chrome-recession.html` is marked **outcome reversed** and kept as the cost
side of the ledger.

## 2026-08-28 (v2026.08.28.22) — Chrome does not recede, and the reason is not the one the rule gave

The blocking queue entry: a chrome-recession ruling that existed in a conversation
and in no file, contradicting the spec in four places, and reversing a conformance
fix that had already landed. Decided from a specimen built for it —
`preview/chrome-recession.html`: navbar and sidebar at 390 and 1440, both schemes,
receding against `material-chrome`, over **both** the token's aurora and the
brighter one the consumer ships, with every label's ground sampled *beneath the
label* rather than at the panel edge.

*(The first pass of that card sampled the panel's right edge and so missed that the
section title sits on the green lobe — the same error the card exists to prevent,
caught by looking at the render. Corrected before ruling.)*

### The collision, resolved rather than routed around

The hard rule says *never bare text inside the aurora band; chrome that must
overlap carries `material-chrome`.* **Measured, that rule is broader than its own
reason.** The neutral ramp survives the bare band everywhere: nav labels **4.57**
light and **6.12** dark, wordmark 14.7, tab labels 4.64/6.21. Which is what
`ink-needs-an-opaque-ground` already said when it exempted primary/secondary text
as *"luminance against its own material, not dependent on hue separation."*

So recession does not fail on the text the rule was worded to protect. **It fails
on the two things the rule never named:**

- The section title over the brightest lobe holds **14.03:1** with a ground and
  **6.22:1** without. It still passes — and it has surrendered **56% of its
  headroom to a gradient that moves**, which means that margin is not a constant
  anyone can re-check later.
- The active nav item **dies**: Midnight Indigo as a mark measures **1.22:1** on
  the token aurora and **1.34:1** on the shipped one, in dark.

### The four answers

**(1) `material-chrome` stays a material**, at the value ratified earlier the same
day — the canvas's own hue at 90%.

**(2) "Chrome is still" survives, and it is the second argument against recession
rather than a casualty of it.** A surface with no material of its own *cannot be
still* — it shows whatever moves under it, and the aurora breathes by ratified
thesis. Recession does not merely remove a contrast ground; it removes the
condition that makes stillness expressible. Chrome that recedes into a breathing
layer is not still chrome, it is chrome that has stopped existing and left its
labels behind.

**(3) The mobile tab bar takes whatever the navbar takes, always.** They are one
navigation rendered at two widths, composed from one list. A product whose nav has
one identity on the desktop and another on the phone has two navigations. The tab
bar also has an independent reason to keep its ground: bottom edge, thumb-reached,
and a target zone with no visual boundary is worse than one with.

**(4) The active nav item keeps its plate — and this made the question
self-resolving.** `primary.plate-not-mark` already settled that primary is a plate
colour with no inverted mark counterpart, and that no token can carry "your own
trail" because the one light-enough neutral family *means the system*. So **chrome
could not fully recede even if it were otherwise right**: the active item would
have to stay a plate, leaving one solid rectangle floating on the aurora with no
chrome around it — a worse composition than either option under test.

### What recession was reaching for was already delivered

The complaint behind it was real: chrome that looks like it predates the system, a
warm neutral slab on a cool canvas. That was fixed the same day by giving chrome
**the canvas's own hue at unchanged opacity** — which bought belonging *without
spending the ground*. Recession spends the ground to buy something already in hand.

**What would reopen it:** a stated goal recession serves that the hue change does
not. This ruling answers the version in front of it. If the motivation was
something else, it comes back **with the render** — a render settled this and prose
could not.

### Consequence for landed code, stated because the queue asked

Stage 3 conformed the consumer's navbar utility **to** `material-chrome` on the
strength of `dark-is-a-dark-wash-and-that-is-load-bearing`. **That conformance
stands. Nothing is reverted.** Stage 9b proceeds on the material it already has.

### Found while building the card

The spec's `--aurora` token is **three broad low-chroma lobes**; the consumer ships
**five narrow, far more saturated ones**. Both are measured here, and the shipped
one is where the title loses its headroom. Not ruled on — recorded, because
`ink-ground-is-a-placement` says the ground that decides a question is the one that
renders, and these are two different grounds under one name.

## 2026-08-28 (v2026.08.28.21) — Retraction, and a stronger claim that was also wrong

### Retracted: the `opsz 18` mechanism

v2026.08.28.20 recorded that the statutory body carried `wdth 104`, that this
switched off optical sizing, and that Newsreader therefore fell back to its `fvar`
default of `opsz 18` — a display drawing at text size. **It is false**, the
implementation session tested it, and I reproduced the test before retracting.

At 15px, one string, same face: shipped state (`wdth 104`, no `opsz` stop) and
`fvs: normal` and pinned `opsz 15` are **byte-identical**; `opsz 18` and
`font-optical-sizing: none` are identical to each other and different from all
three. Same pattern at 48px. **A `wdth`-only `font-variation-settings` does not
disable `font-optical-sizing: auto`** — only an `opsz` inside `fvs`, or
`optical-sizing: none`, does. The `opsz 18` is real as Newsreader's `fvar` default;
it is simply what you get when sizing is *off*, which it was not.

The conclusion survives its explanation: `role-body-serif` at 16px is still right,
**because a role beats an unstated inheritance** — which was always the better
reason. The `globals.css` comment explaining why there is deliberately no blanket
serif `fvs` default, so `auto` stays live, is correct and load-bearing. A hunt for
89 bare `font-serif` sites to indict cleared all 89.

### And the replacement claim was also wrong

The same message proposed something sharper: that the spec's counts **exceed what
the line can physically hold at any prose** — a ceiling of ~44 for `lede` and 64 for
body. Measured, they do not. At 384px: statutory 44, general **47**, narrow prose
63, narrowest glyphs 70. At 448px: 62, 63, 87, 98.

**47 is reachable — I measured exactly 47 on ordinary prose.** So is 69, on prose
narrower than statute. The spec's numbers sit at the **top of the band for the prose
this product renders**, and statutory text has the longest words in English.

That distinction decides the fix, which is why it was worth checking rather than
accepting: **a number at the top of a realistic band is an annotation problem; an
unreachable number would have been a width problem.** The widths are fine. Only the
annotations were wrong.

### The pattern worth keeping

In one exchange, a false mechanism was corrected by measurement — and the correction
arrived carrying a second unmeasured claim, which I would have ratified had I not
measured it. **Retracting one claim does not inoculate the next one.**

That is not a criticism of the session that raised it; the retraction was
unprompted, precise, and cost it something to send. It is the same shape as my own
three errors today, and the lesson is symmetrical: the instinct that catches an
error is not the same faculty as the discipline that verifies its replacement.

### `lede` had three defects at once

The audit found: the spec carried **two different numbers for one role** — 47 in the
token table, `52ch` in the bill-page surface and again in the `role-lede` prose;
**both of those sites used `ch`, which this system bans** as a length unit and which
the ban's own wording had scoped to tokens, letting prose slip past; and **neither
number was measured.** All three fixed. The width stays at 24rem.

## 2026-08-28 (v2026.08.28.20) — A character count is a measurement of prose, not a property of a width

### Correction: my "the measure is already correct" was measuring the wrong thing

The statutory handoff opened with *"What is already correct — do not touch: the
measure. At 1440 the serif body sets 69 characters in 605px, which is
`measure.body` exactly."*

**605px is not 28rem.** I measured the rendered column — which was the old
`max-w-[72ch]` — and asserted an identity with a token whose value I never checked.
`measure.body` is 448px. The two numbers had nothing to do with each other, and the
69 was a coincidence of the width I happened to be looking at.

It had a cost: it put **"do not touch"** on the one thing in the file that most
needed measuring. Had the implementation session taken the instruction as written,
a wrong column would have been frozen by the handoff meant to fix the file. Third
measurement error of mine today, and the worst of them — the previous two were a
stale number and a mislabelled caption; this was a claimed identity between two
values I never compared.

### `measure.body` does not set 69 characters

Measured at 448px with `role-body-serif`, counting the first visual line, on two
different prose samples in two sessions: **58 / 62 / 63** and **62 / 63 / 64**. The
real figure is a **band of roughly 58–64**, and which end you land on depends on the
prose — statutory text has the longest words and sits lowest. About 490–500px would
earn a reliable 69; 533 overshoots to 72–78.

**The width is not changing.** 28rem is a good measure; the number attached to it
was the wrong part. The annotation is now the band.

The generalisation is the keeper, and it is the same shape as
`ink-ground-is-a-placement`: **a character count is a measurement of a line of
specific prose, not a property of a width.** Contrast needs its ground and its
position; a count needs its prose. Both were written down as constants and neither
is one. `lede`'s unmeasured "47 chars" is owed the same audit.

### `a-measure-is-a-property-of-the-line`

A measure and horizontal padding **may not share a box**. The framework sizes
`max-width` against the *border* box, so a container carrying both a measure token
and `px-*` subtracts the padding **from** the measure instead of placing it outside.
Measured: a 448px token on an element also carrying `px-6 sm:px-8 lg:px-12` produced
a **352px line** at 1440. Nothing errored.

**The failure looks like a decision** — a column that sets narrow reads as considered
rather than broken, which is why it survived a file read closely twice. It is
`composed-register-fails-silently` with a box model on it: two correct parts, wrong
only in the computed result. The gutter goes on an outer wrapper; the measure on the
box that holds the line.

### The reserved question, answered — and it was hiding a worse thing

> **RETRACTED 2026-08-28 — see v2026.08.28.21.** The `opsz 18` mechanism below is
> false and was tested so. A `wdth`-only `font-variation-settings` does **not**
> disable `font-optical-sizing: auto`; the shipped body was rendering at
> `opsz` = font-size the whole time. The 15px→16px conclusion stands; the
> explanation does not. Struck in place rather than edited, because the record
> should show the claim was made.

`role-body-serif` at 16px is right and costs nothing. But the shipped 15px was
setting 68 characters only because **the element carried `wdth 104` — the sans width
axis, inert on Newsreader** — so the serif fell back to its own `fvar` default of
`opsz 18`: **a display drawing at text size.** Body copy had been set in a display
optical size, silently, for as long as that line existed. `role-body-serif` computes
`opsz 16`.

That is `axis-must-be-declared-and-measured` from a third direction — not an axis
retired, not an axis unrequested, but **an axis applied to a face that does not have
it**. Same silence every time.

### Paper islands: the code-side consequence

The rule is written as a *rendering* guarantee and had a second effect nobody had
written down: inside a paper canvas every `dark:` utility is **inert**. Counted on
the statutory surface alone — **39 / 13 / 6** across the three files, with more under
`BillContentSection` and `ReceiptCertificate`. They render correctly, so nothing
looks wrong.

**An inert utility is dead code, and dead code that reads as intent is worse than
none.** The next person to adjust a dark ink colour there will change it, see no
difference, and have no way to know why. Correctly not swept in a pass about type
registers and one gutter; now stated in the rule, where it is greppable on the next
paper surface.

## 2026-08-28 (v2026.08.28.19) — Three tiers of reach

`enforcement-has-a-blind-spot` said a clean lint run is a statement about the class
layer. True, and it left the useful question open: **what do you do about it?** The
implementation session supplied the distinction, and it is better than the rule it
sharpens — **the blind spots differ in whether they can be closed at all.**

- **Tier 1 — the class layer.** A grep decides it. Where the lint rules live and
  where most of the system is.
- **Tier 2 — imperative styling, reachable with more effort.** d3 setting
  `.attr("font-size", n)`, canvas, anything drawn rather than classed. A grep cannot
  read it, **but a computed-style or rendered-output assertion can.** The cost is
  effort, not possibility.
- **Tier 3 — content, which no static check reaches at any effort.** The emoji on a
  conversation row are inside the title string, so the rule being broken is about
  **what a string means.** No computed style contains it, no assertion can be
  written for it, and a model wrote it. This cannot be solved in the design layer at
  any level of effort — **it can only be moved upstream**, to wherever the content is
  generated.

**Knowing the tier is the point:** a tier 2 problem discovered and left as a note is
a failure of will; a tier 3 problem pursued inside the design layer is a waste of
it. `HexStateMap` is tier 2 and has a ticket. The conversation emoji are tier 3 and
the only enforcement point is the title generator — a design rule applied to
generated content has **no enforcement point at all unless the generator carries
it.**

## 2026-08-28 (v2026.08.28.18) — Chrome did not belong to its own page

Jason looked at the dark dashboard and asked whether the chrome was obsolete
against the system. It was, and **it was obsolete against a value this file
reaffirmed the same morning.**

### What was wrong

`material-chrome` dark was `rgb(24 24 27 / 90%)` — **zinc-900, a warm neutral, at
90% over a cool Blue Hour canvas.** Composited, the rail renders **#16171b** beside
content at **#1c2a4c**. That is the seam visible in the screenshot: the navigation
reads as a different surface from the page it frames, which is exactly what "looks
like it predates the design system" means.

Verified as *the spec, not drift* — both `Sidebar` and `Navbar` correctly take
`material-chrome`. The component was obeying; the value was wrong.

### The fix, and what it deliberately does not change

Chrome is now the canvas's own hue at **the same opacity**, written as
`color-mix(in srgb, var(--canvas-live) 90%, transparent)` so it follows the Blue
Hour value rather than drifting from it.

**The opacity did not change, and that is the point.** 90% is what makes chrome
immune to what scrolls beneath it. Measured: a green CTA passing under moves the
new value by **25** in summed RGB — *identical to the zinc it replaces* — against
**222** for the white wash retired earlier the same day. **The temperature changed;
the immunity did not.**

### The sequence is the finding

This file **reaffirmed the zinc value earlier on 2026-08-28**, when the question in
front of it was whether chrome takes on a green cast from a CTA underneath. That
reaffirmation was right about the question it was asked and **blind to the one it
was not**: whether chrome belongs to the canvas at all.

Both are properties of the same value. Only one had a render behind it — the
comparison built that morning showed chrome over a CTA, and nothing showed chrome
beside the page. **A material has to be judged against its ground and against what
passes under it, in the same pass.** Checking one and calling the value settled is
how a correct measurement produces a wrong conclusion, which is the third time this
week that shape has appeared.

### And the accessibility path had it worse

Under `prefers-reduced-transparency` the materials go opaque — **but the aurora is
not suppressed.** So a viewer who asks for reduced transparency got opaque *warm*
slabs sitting on a live blue gradient, with none of the blend that softens it
everywhere else. The path with the defect in its strongest form was the one nobody
had rendered. Now the canvas's own family, separated by **luminance** rather than
hue, thicker being darker as on the translucent path: measured 1.44:1 against the
base for the card tiers and 1.19:1 for chrome — a separation, not a contrast pair,
which is what a material is.

**Left open:** whether the aurora itself should be suppressed under reduced
transparency. It is a background-image rather than a transparency, so it is not
strictly in scope — but a large low-contrast gradient behind everything is arguably
against the spirit of the request, and nobody has ever looked at that path. Not
decided here.

## 2026-08-28 (v2026.08.28.17) — The axis is a property of the file or of the URL

### The old rule's stated reason was false, and the implementation session was right to say so

`colors_and_type.css` said Archivo is self-hosted *"so the chrome register survives
a blocked or offline CDN."* That never distinguished this face from the others —
**Newsreader and IBM Plex Mono are fetched from Google in the line directly above**,
so an outage already takes the body and the mono. Chrome surviving alone is not a
posture anyone chose. Deleted.

**Verified independently against the live CDN**: Google does serve Archivo's full
width axis when asked. `css2?family=Archivo:wdth,wght@62..125,100..900` returns
`font-stretch: 62% 125%`, italic included. So self-hosting is not what makes the
axis available, and the CDN is not what strips it. That claim was wrong.

### But the default is wrong, silently, and that changes the trade

Also measured, and neither of us had stated it:

```
family=Archivo:wght@100..900   →  font-stretch: 100%
family=Archivo                 →  font-stretch: 100%, weight 400
```

**Omit the axis and Google pins it to 100%.** No error, no warning — the font loads,
renders, and the entire chrome register collapses to normal width.

So the real argument was never about uptime. **Self-hosted, the axis is a property
of the file** — it is in the bytes and cannot be forgotten. **On a CDN it is a
property of the URL** — a query parameter that a regenerated config, a copied
snippet or a hand-edited link drops without saying so. *A property of a file cannot
be omitted; a property of a request is omitted by default.*

That is the honest cost of the move rather than an argument against it, and it is
`retired-axis-fails-silently` from the other side: there the axis was present and
retired, here it is requested and absent. **Same silence, same family.**

### `typography.axis-must-be-declared-and-measured`

Whichever host wins: the axis is **declared explicitly**, and the load is **verified
by measurement, never by the page looking right** — a collapsed axis looks like a
slightly narrower design, not like a bug. Set a chrome string at `wdth` 125 and at
62 and confirm the widths differ; "HOUSE OF REPRESENTATIVES" at 12px measures
roughly 230px against 116px. Equal numbers mean the axis did not load. The
implementation session proposed this check and it is right; it belongs in CI rather
than in a comment asking the next person to remember.

### What is not decided here, and why

**The hosting choice itself.** I have corrected the rule's false rationale, which is
mine to do on evidence alone. The decision to move is a product call with a
consideration neither session raised: **Google Fonts sends every viewer's IP to
Google.** For a product whose users look up legislation — which can be a sensitive
thing to be seen doing — that is a real argument for self-hosting that has nothing
to do with type, and a German court found Google Fonts embedding unlawful under
GDPR in 2022. Set against it: automatic per-unicode-range subsetting is genuinely
better than one hand-made subset, and it removes the accepted consequence that a
sans-italic glyph outside Latin-1 falls back to the system italic.

Both are real. Neither is a typography question, so neither is mine to settle, and
the spec records the requirement rather than the choice.

## 2026-08-28 (v2026.08.28.16) — Most sub-floor type has no constraint behind it

### `measure-before-you-shrink`

The stat-caption ruling said **if a label no longer fits at 12px, the layout is the
problem.** That answers the case where a constraint is real. **It never answered
the common one** — that most sub-floor type has no constraint behind it at all. It
was shrunk by habit, because small type reads as fine print and a bill's title page
is *supposed* to look like fine print.

Measured on the held statutory surface at 390: **"HOUSE OF REPRESENTATIVES", the
longest string in the title-page apparatus, sets 251px at 12px with
`--track-chrome`, in a column 358px wide.** It fits with over 100px to spare, and
it had been shipping at 11px. Nothing was tight. Four more strings in the same
block were under the floor for the same non-reason.

So the rule now has both halves. Before lowering type below the floor — which you
may not do — and before concluding the layout must change, **measure the string at
12px in the container it actually lands in.** Three outcomes, three different jobs:
it fits, so raise it and change nothing else *(most cases)*; it does not fit and
the container can widen, so widen it; it does not fit and the container cannot
widen, so the layout is the problem *(the rare case, not the default)*.

**Why it needs saying:** the expensive reading of the floor rule is "sub-12px means
a layout redesign", which makes every violation look costly — and is why forty of
them sat unfixed behind a held surface. Most are a one-line change. The measurement
tells you which kind you have and it takes a minute.

### The composition pass this came out of

The statutory surface was held back deliberately as a composition problem rather
than a sweep, which was right — but the composition problem turned out to be
smaller and more specific than "decide what the text column is."

**The column is already correct.** At 1440 the serif body sets **69 characters** in
605px, which is `measure.body`'s stated value exactly. Someone got that right by
hand. At 390 it is 33 characters, which is simply what 390px gives you; not a
violation.

**The actual defect is a gutter sized for content it never holds.** In the table of
contents a single-digit section number occupies a **49px slot in a 302px row —
16% of the line for one character**, while the title beside it wraps to two lines.
At the floor a three-digit number needs about 24px. The reclaimed space is the
difference between one line and two for most entries.

And the section numbers in the body are already run-in (`SEC. 1.` sitting inline
with its heading), which is how a statute is actually typeset — so they can go to
the floor at no structural cost. **The composition was mostly sound; what it had
was one mis-sized slot and a page of type shrunk for no reason.**

## 2026-08-28 (v2026.08.28.15) — A guard that reports success it did not earn

### `a-guard-may-degrade-but-never-silently`

This revises a position this file and the implementation session had already
agreed on, which is why it is a ratification rather than a quiet edit. The agreed
position was *"a guard that skips on a missing credential is not a guard"*, so the
job should fail hard.

**That is right about silence and wrong about degradation.** The operational
argument decides it: **a job that is red for reasons unrelated to the PR that trips
it is a job someone deletes.** Permanent red is not a strong guard; it is a guard
with a countdown on it. The failure we were guarding against — nobody notices the
check did not run — arrives anyway, later, and takes the whole job with it.

Two tiers. **Tier 1** runs always and needs no credential: it compares the
`spec-version` stamp in the generated token file against the pinned ref, catching
*the likely mistake* — the pin moves and nobody regenerates — using only files the
consumer already has. **Tier 2** is the real regenerate-and-diff when the
credential exists, and **its absence posts a warning naming the check that did not
run.**

The rule generalises past CI: **a check that cannot run must say so in the place
its result would have appeared.** A green tick standing in for an absent check is
worse than a red one, because the red gets argued with and the green gets believed.

With the honest cost stated: a credential-free tier is weaker than the check it
stands in for, so **it must be described by what it catches, not by what it
guards.** Tier 1 does not verify the tokens match the spec; it verifies nobody
moved the pin without regenerating. Saying more than that would make the tier
itself the thing that lies.

**This is the fourth member of the silent-failure family, and the sharpest.** The
first three are things that fail without complaining — a value the browser ignores,
an assembly that renders approximately right, a surface the enforcer cannot read.
This one is *the check itself* reporting a result it did not earn.

### Correction — a stale measurement, quoted as current

I told the implementation session that `DESIGN.md` differed from `v2026.08.28.10`
by two lines, both the version header. **At `.14` it was 49 insertions.** The
number was correct when I measured it — at `.12` the diff was exactly one insertion
and one deletion — and I repeated it two versions later without re-measuring, after
`.13` and `.14` had each added a block.

That is precisely *a measured number keeps the context it was measured in*, the
rule enforced repeatedly this week, violated in a message about version deltas. The
substance held and was verified independently: `colors_and_type.css` is
byte-identical since `.10`, and the `materials` table the consumer's generator reads
is untouched. But **the claim was checkable and wrong**, and it was accepted
downstream only because it was checked.

Second time today the day's own rule was broken by its author — the first was a
specimen captioned with measurements from the other colour scheme. Both were caught
by someone re-deriving rather than reading. That is the argument for the habit,
stated better by two failures than by any rule.

### Recorded: the Chromatic review status is unknown

The implementation session reported the migration's visual diffs as "reviewed
clean" and has since corrected that: **it does not know that anyone reviewed them.**
The baseline was taken on `main` and the branch built against it — the method that
makes review *possible* — and whether a person walked the diffs is unknown. Moved
to **Needs a person**, because it is a real gap and an unlanded branch is exactly
when it is cheap to close.

## 2026-08-28 (v2026.08.28.14) — The one thing that could not close from inside the toolchain, closed

`profiles.email.open` had carried real-client testing as an open item for the life
of the profile, and one pass ago it was moved out of the ratification queue into a
**Needs a person** section on the grounds that no agent should send mail to live
inboxes unprompted. It closed the way it had to: **a person authorised it, a
person sent it, and a person looked at it in the client.**

All three templates went through the app's own `react:` render path — the same one
`inngest/services/email.ts` uses — so what was checked is **production's output,
not a parallel render.** That detail is the difference between a test and a
rehearsal.

**What held**, each with a specific failure mode behind it: the CTA's **ink** label
on the Momentum plate, one value in both schemes; the indigo step badges
**switching** under inversion rather than darkening, which is the one with teeth
since navy on the inverted sheet measures 1.43:1; and **the issuance block
including the double rule.**

That last one is why this entry is worth writing. **This file predicted the double
rule would be the first thing Gmail Android took**, and it was the stated reason to
run the test at all. It survived. The result is recorded as
`real-client-tested` rather than the note being deleted, because *"we expected this
to break and it did not"* is itself the finding — the next person to touch the
issuance block should know it has been tested in-client, rather than assume it is
fragile and design around a hazard that is not there.

A prediction that fails in the safe direction still earns its keep: it is what
caused the only end-to-end check this profile has ever had.

## 2026-08-28 (v2026.08.28.13) — A clean lint run is a statement about the class layer

### `enforcement-has-a-blind-spot`

The first two members of the silent-failure family describe **values that fail
without complaining**. This one describes **a place where nobody is looking at
all**, and it was contributed by the implementation session as the finding it most
wanted to survive.

Every enforcement mechanism this system has — the adherence config, the consumer's
`design:lint`, a grep for a role class — reads **the class layer**. Styling that
never passes through a class is invisible to all of it: d3 and other imperative
renderers set presentation with `.attr("font-size", n)`, canvas draws with no DOM
at all, and a third-party API taking a literal cannot take a token.

**The evidence is that this is exactly where the previous two rules were hiding.**
`HexStateMap` styles through d3 attributes, and it is where the dead `HEXP` axis
survived every sweep of the migration — `retired-axis-fails-silently` was *found in
the one file the enforcement layer cannot read*, which is not a coincidence.
Verified in that file today: `fontSize = Math.max(hexSize * 0.4, 8)` — an explicit
**8px** clamp against a 12px floor with no chrome exception — and hex sizes of
18–35 that never reach the 44px target floor. **Two hard-rule violations in
production, past a lint run that reports clean.**

So: **a clean lint run is a statement about the class layer, not about the
product.** Any surface that draws imperatively is outside the guarantee and needs
its own check. The blind spot should be *named and inventoried* rather than
discovered a fourth time — a rule cannot be enforced on a surface the enforcer
cannot read, and the honest response is to list those surfaces, not to trust the
green check. Added to `DESIGN-HARD-RULES.md` as a standing caution above the
checklist, because it governs how much the checklist is worth.

### Note on the branch

The migration was built against **v2026.08.28.10**. The three versions since
changed **no rule and no token** — `.11` swept the entry points to match rules
already ratified, `.12` added specimens and fixed the specimen frame's canvas, and
`.13` is this entry. `DESIGN.md` differs from `.10` by two lines, both the
`spec-version` header. **The branch requires no re-conformance.**

## 2026-08-28 (v2026.08.28.12) — Three specimens, and the card frame was painting the wrong canvas

Trap 3 says nothing unrendered stays true: a rule with no specimen is violated
somewhere. Eleven versions landed today and **`preview/` gained nothing** — the
day's rules existed only as prose, in a system whose own trap list says that is
the condition drift grows in.

Three cards now cover the rules most likely to be violated and least settleable by
reading: **`ink-and-ground`** (the palette-wide switch, glass versus opaque inside
the band, and the same ink at five heights on one gradient), **`uppercase-two-homes`**
(chrome against ceremonial, designation against sentence, and `--track-ceremonial`
against the `tracking-wide` step that five sites had borrowed), and
**`tint-is-not-a-plate`** (the alpha ladder beside a real control, both schemes).

### `_card.css` was painting the opaque canvas and then drawing the aurora on it

The shared specimen frame set the body to `--canvas` and layered the aurora over
it. After `canvas-two-names` that is precisely the conflation the two names were
introduced to end: `--canvas` is now defined as the **opaque, aurora-free** ground
that coloured ink is measured against. Every card in the directory has been
demonstrating rules on a ground that contradicts one of them. Fixed to
`--canvas-live`.

**And the frame had no dark mode at all** — 52 cards, one scheme, in a system
whose stated workflow is "both schemes, mobile 390 and desktop 1440." A specimen
that exists only in light is evidence about half the system. `_card.css` now
carries a `.panes` / `.pane.dark` convention, which works because `.dark` is a real
class selector and the material tiers are scoped as descendants.

### The correction that makes the point better than the cards do

The first render of `ink-and-ground` showed the glass-versus-opaque comparison in
**light**, captioned with the **dark** measurements it was arguing from. That is
the exact error `ink-ground-is-a-placement` was ratified to prevent — a ratio
quoted away from the scheme and position it was taken at — committed in the
specimen for that rule, by its author, hours after writing it.

It was caught by rendering the card and looking at it, which is the step the
workflow puts after "compose from roles and tokens" and which prose review would
not have caught, because **the prose was correct**. The card now renders inverted
and says why in its own caption.

## 2026-08-28 (v2026.08.28.11) — The entry points, which spent the day being right about everything except themselves

Ten ratifications landed today and **not one of them touched `SKILL.md`** — the
file whose own trap entry records that it taught Merriweather, oxblood, wax seals
and a superseded UI kit for 24 days after each was retired. It had gone stale
again, in a single day, in exactly the documented way. Nothing here is a new
decision; it is the sweep the ten passes owed and never paid.

**`SKILL.md` was wrong or incomplete on eleven counts.** It taught `red-600` as
the danger value (moved to red-700 this morning, for failing AA on the ground
this file also failed to mention). It said uppercase "belongs to chrome alone"
while `role-ceremonial` sat in the stylesheet being defined by display-size
uppercase. It stated the 44px floor and the transform prohibition as
unconditional, both of which acquired exceptions today. It said motion lives on
two surfaces without the three things that were never on the budget. It named the
aurora band's hazard while implying glass is the remedy, which measurement retired
this morning. And **it did not mention the which-green switch at all** — the most
re-litigated rule in this system's history, absent from the file most likely to be
the only one read.

Also corrected: the register table's canvas column now names `--canvas-live`; a
step warned against pulling from `ui_kits/web/`, **a directory that did not
survive the repo split** — the warning outlived the thing it warned about; and the
"check `spec-version` before citing" instruction now appears in the file that most
needs it rather than only in the file that is already current.

**`_adherence.oxlintrc.json` sanctioned twelve `--hexp-*` entries** — as valid
tokens, three versions after they were deleted. A lint rule that permits a deleted
token is worse than no rule: it is a machine-checked assertion that the wrong
thing is right.

**The designer agent's own instructions named two directories that do not exist**
— `specimens/` (it is `preview/`) and `history/` (the audits and handoffs are
loose at the repo root). Both flattened by the repo split, neither noticed for a
day of continuous work inside the repo.

**The pattern, stated once so the next pass can check it cheaply.** Every
correction above is the same shape as the findings the ten passes made about the
consumer: a value taught in a second location, a rule stated absolutely because
its exception lived elsewhere, a path that outlived its target. The passes were
looking outward the whole time. **A ratification pass should end by grepping its
own entry points for what it just retired** — the discipline already written down
as "when a decision retires a value, grep the entry points for it in the same
pass," which was followed for `DESIGN.md` and `colors_and_type.css` and not once
for `SKILL.md`.

## 2026-08-28 (v2026.08.28.10) — What the role layer is actually for

### `composed-register-fails-silently`

Contributed by the implementation session as a generalisation of
`retired-axis-fails-silently`, and it is the more useful half. **The same silence
applies one layer up, to a register.**

`sans-chrome` + `uppercase` + `tracking-wide` **compiles, renders, and looks
approximately right.** Nothing at any level says *this is five times under
chrome's tracking* — not a compiler, not a type checker, not a story snapshot,
which will happily photograph the wrong tracking and call it the baseline. Only
reading the computed style catches it, and nobody reads a computed style they
have no reason to doubt.

A retired axis and a hand-assembled register are **one failure**: a declaration
that is syntactically valid, semantically wrong, and indistinguishable from
correct at every checkpoint except the rendered pixel. The axis version does
nothing; the register version does something *close enough to look deliberate*.
**The second is harder to find, because "nothing happened" eventually gets
noticed and "slightly wrong" does not.**

### So this is what the role layer is for, and the spec has never said it plainly

**A role is not a convenience or a shorthand. It is the only form in which a
register is checkable.** A hand-assembled register has no name, so nothing can
assert about it — no lint rule, no test, no review. Give it a name and one grep
decides it.

That is why the rule that catches this is *`sans-chrome` adjacent to `uppercase`
without `role-label-caps`* rather than any measurement of tracking: **the assembly
is greppable and the value is not.**

The evidence is the argument for the rule over the sweep. The lint rule caught two
sites a call-site sweep could not have: a Navbar story, and the **`input-label`
utility, which had itself been hand-assembled** at `tracking-wide`. One line put
every labelled field in the product five times under chrome tracking, and **no call
site was wrong.** A sweep looks where things are used; only a rule looks where they
are defined.

### Closing state

The tracking divergence is 44 of 46 closed, verified by running the reported grep
rather than accepting the count: 2 remain, both in `BillSummaryContent.tsx`, both
on the held list. 67 `role-label-caps` elements now compute 0.12em at 12px where
they were at 0.05em.

Outstanding and correctly not ours: the `.claude/skills/` third copy (agent
configuration — the implementation session declined it on the same boundary as
Chromatic and the branch landing, which is the right read), and the real-client
email test.

### Note on the version scheme

This day reached `.10`, which surfaces a wart in the scheme ratified at
`v2026.08.28.2`: **these tags sort lexicographically, not numerically** — `git tag`
lists `v2026.08.28.10` before `v2026.08.28.2`. Recorded in the provenance header;
sort with `sort -V` or read this file, which is ordered.

## 2026-08-28 (v2026.08.28.9) — A retired axis in live code, and a third home nobody was watching

### `retired-axis-fails-silently` — the grep set is a correctness tool

`HexStateMap` was setting `font-variation-settings: 'HEXP' 100` **in live code**,
on a face with no such axis. CSS does not error on an unknown variation axis — it
ignores it. **The line ran, produced no warning, produced no effect, and looked
like a deliberate typographic decision to every reader for as long as it was
there.**

This changes what the permanent grep set is *for*, and that has been wrong in this
file until now. The set was justified by prose ageing badly. The real reason is
that `font-variation-settings`, like several CSS properties, **fails silently on a
name it does not know** — so a retired axis in live code is indistinguishable from
a working one at every level except the rendered glyph. Not the compiler, not the
type checker, not a rendering test that doesn't measure the axis. **A grep will.**

And it is why the set must cover comments *and* code: the same string in a comment
is a stale instruction; in a declaration it is a stale instruction **the browser is
dutifully ignoring.** The second is worse and looks identical.

Corollary, and it retroactively justifies deleting the `hexp-*` aliases rather than
keeping them resolving: **a name that fails loudly is found in one run; a name that
resolves to something reasonable is found when someone greps for it, which is to
say maybe never.**

### `the-skill-directory-is-a-third-home`

Found by grepping for HEXP in a path nobody was watching. The consumer carries a
**third copy** of this stylesheet at `.claude/skills/amendment-design/` — a regular
file, not the symlink `design/` uses — plus its own `SKILL.md` that differs from
the canonical one.

**Measured staleness: eight ratifications behind, in a single day.** It carries
`--color-danger` at the red-600 value that fails AA on the opaque ground, no
`--canvas-live`, and the `--hexp-*` aliases that had just been deleted.

This is **trap 1 repeating in a new directory**, and worse than the original
because of what that directory *is*: it is the file an agent **loads as its skill**
when working in the consumer repo. The staleness doesn't sit quietly in a docs
folder — it is actively taught to the next session, which then produces work that
looks like it is ignoring the design system while faithfully obeying a copy of it.
That is precisely the failure the trap list was written for, reproduced eight
versions deep in one day. **The fix is not a sync, it is a symlink** — `design/`
has stayed correct through every ratification this week for exactly one reason: it
cannot drift.

### Recorded, not ratified: the tracking sweep is not complete

The stage 8 report says the hand-assembled-register sweep "is swept now." It is
not. **36 non-story sites** still compose `sans-chrome` + `uppercase` + a literal
Tailwind tracking step (`tracking-wide` 0.025em, `wider` 0.05em, `widest` 0.1em)
where `--track-chrome` is 0.12em, plus 7 more carrying no tracking at all. Ten
were fixed. This is not a new rule — it is `tracking-is-half-the-register` still
outstanding at scale, and it is the right thing for the lint rule to own rather
than another sweep: a role class is greppable in a way "did someone rebuild a
register here" is not.

## 2026-08-28 (v2026.08.28.8) — The aliases are deleted; the axis is not gone

Stage 8 moved 77 `hexp-*` call sites across 37 files onto the width presets and
reported the grep-set item cleared. The **class references** are cleared. The
aliases are now deleted from `colors_and_type.css` and from this file, so a
reference to `--hexp-*` **fails loudly** instead of silently resolving — which is
the point, because a working fallback is exactly what lets a retired name survive
a grep.

**But the item is not cleared.** `HEXP` still appears in **seven comments across
six consumer files**, describing live components in terms of an axis that no
longer exists: a bill identifier as "HEXP 100 ceremonial", a stamp as "HEXP-60
… tracked-0.1em per spec", a deadline tile as "HEXP 60 clerical month, HEXP 80
display numeral", a progress bar as "HEXP-60 uppercase 10px label."

Three of those teach something additionally wrong. The stamp comment cites a
tracking value that was already the wrong one when it was flagged at
v2026.08.28.2 and calls it *"per spec"*. The progress-bar comment specifies
**10px**, under a floor with no chrome exception. So the comments are not merely
stale — **they are instructions, and they are teaching the retired system to
whoever reads the file next.**

This is the same shape as the *"do not sweep to serif"* comment ratified one
version ago, and the two together settle the general point: **a comment at a call
site is a competing copy of the system with standing**, because the next reader
trusts it precisely for being local. The `hexp` migration deleted every line the
compiler reads and left every line a person reads.

**So the rule the lint job needs:** the permanent grep set must be enforced over
**comments, not just code**. The stage 8 lint rule already catches retired values
in comments — it found two on its first run, one written an hour earlier by the
session that wrote the rule — so the mechanism exists; `HEXP` and the retired
weight ladder simply have to be in it verbatim.

That the rule's own author tripped it within the hour is the best evidence in
this changelog for why enforcement beats knowing the rule.

## 2026-08-28 (v2026.08.28.7) — Uppercase has two homes, and five sites rebuilt a register instead of taking it

Stage 8 queued one question and it was the right one to queue: **hard rule 5's
exception is a whole role, not a clause.** Fourth instance of that pattern, and
the first where applying the new grep procedure is what surfaced it.

### `uppercase-has-two-homes`

Uppercase is legal in exactly two registers: **`role-label-caps`** (chrome —
12px, `--track-chrome`) and **`role-ceremonial`** (display size,
`--track-ceremonial`, once per page). The hard rule named only the first, so it
read as forbidding the second — while `role-ceremonial` sat in the stylesheet
being *defined* by display-size uppercase.

**The test, because "display-size uppercase" is not self-evidently one or the
other: is the text a designation or a sentence?** A designation is a name
assigned to a thing and carried on the artifact — a bill identifier, a place of
issue, a seal monogram. That is ceremonial. A sentence is something a person
wrote — *"Browse bills by state"*, *"Message Dispatches"*, *"This page was
vetoed."* Those are headings, and the rule's main clause governs them: serif,
mixed case, not tracked out. **Setting a sentence in tracked uppercase does not
make it ceremonial; it makes it hard to read at the size that was supposed to
make it grand.**

So the bill detail page is right — identifier ceremonial, title in serif beneath.
The designation is *set*; the human sentence is *read*. The other four sites are
headings wearing chrome and should go serif mixed-case.

### `tracking-is-half-the-register` — escalated from the breadcrumb

The breadcrumb entry ratified **2026-08-27** that shipping chrome's width without
chrome's tracking *"is a different register"*, because the tracking is what
recovers Archivo's narrower ceiling. **That was fixed at one site and never
swept.** It is now found at five more — every one reaching for Tailwind's
`tracking-wide` (0.025em) where `--track-chrome` (0.12em) or `--track-ceremonial`
(0.20em) belongs. **Five to eight times under**, including the ceremonial site,
which is therefore missing the one property that makes it ceremonial.

The failure is specific and worth naming: each site **hand-assembled a register**
out of a width preset plus `uppercase` plus an arbitrary tracking literal,
*instead of taking the role class that already composes all three correctly.*
`role-label-caps` and `role-ceremonial` exist, are correct, and were bypassed.
**A width preset is not a register — the role is.**

This is trap 2 in its second form. The first was a role named in the spec and
implemented nowhere, so every call site improvised one. **This is a role
implemented correctly and improvised around anyway** — which is worse, because
the improvisation looks like specificity.

### The comment that told four sites not to fix themselves

All five carry the same copy-pasted comment: *"Stays sans: this is the chrome
register (uppercase, tracked), not a heading voice. The tag is for document
outline. Do not sweep to serif."* It is true at the bill identifier and false at
the other four, where it is an **instruction not to fix a violation**, propagated
by copy-paste and pre-empting exactly the correction those sites need.

Trap 4 in comment form, and the sharper version of it: a doc that restates the
system is a competing copy, but a comment that restates it *at a call site* is a
competing copy with standing — the next reader trusts it precisely because it is
local. Delete it from the four; keep it at the identifier, where it should cite
`uppercase-has-two-homes` rather than assert.

## 2026-08-28 (v2026.08.28.6) — Two canvases, one blue, and a test no agent can run

### `canvas-two-names` — the last consequence of having had two homes

Carried three passes, so it was scheduled instead of carried a fourth. One token
was doing two jobs and could only be right for one:

- **`--canvas`** is the **opaque ground** — what `ink-needs-an-opaque-ground`
  requires. No aurora, no translucency, so a coloured ink has a *fixed* contrast
  against it. Warm zinc. **Value unchanged, so nothing consuming it moves.**
- **`--canvas-live`** is the **Blue Hour base** of the Live register, beneath the
  aurora. Cool slate light; inverted, it is the value that lived as the literal
  `#080c17` in the consumer's body for the life of the product and was named
  nowhere. `.amendment-app` now paints it — it carries the aurora, so it was
  always painting the wrong one.

**The warm/cool split is why they were never interchangeable**, and it is a
decision rather than an accident of two authors: zinc is warm and sits under the
ink layer, the Blue Hour is cool and sits under a blue gradient. Substituting
either puts a warm ground under cool light or the reverse.

`ink-needs-an-opaque-ground` now cites a token instead of a description. It had
been citing prose for three passes, which is trap 2 with a countdown on it.

That this survived three passes — each one having a louder finding in front of
it — is the argument for scheduling a carried entry rather than carrying it.

### `profiles.email.substitutions.brand`

`#033271` had been running unowned **in three roles**. Named now, with its
inverted counterpart `#60a5fa`. Measured: as **ink** on the email viewport
10.49:1 light and 7.02:1 on the dark sheet; as a **plate** with a white label
12.36:1. Both clear comfortably — the value was never the problem, the ownership
was.

**Why email gets a blue the product does not have**, which is what makes this a
substitution rather than a hole in the palette: in the product a link is carried
by hover, underline, and position. **Email has no hover.** A reader decides what
is clickable from colour alone, and blue is the one convention their clients'
users already hold. Midnight Indigo as a link would be indistinguishable from
body text at reading size. It lives in the profile and not in
`colors_and_type.css` for the same reason `viewport` does — *a hex in the token
file is a hex someone will use on the aurora* — and the product should not
acquire a blue by way of the email profile.

**The CTA is not one of its roles.** Stage 7 moved that to the transported action
green, correctly: the fill rule transports, so the primary act takes the action
plate whatever the medium. Brand navy is a link colour and a badge plate, and
that is the whole list.

One note recorded rather than corrected: the 12.36:1 reported as the light figure
is the *plate-with-label* measurement, not the *ink-on-viewport* one (10.49:1).
Both fine. Recorded because `ink-ground-is-a-placement` applies inside a profile
too, and **a profile is exactly where a number loses the ground it was taken at.**

### Recorded, not resolved: real-client dark-mode email testing

The stage 7 report declines to send mail to live inboxes, and that is the right
call — it is outward-facing and nobody authorised it. **This is now the only item
in the system that cannot close from inside the toolchain**, and it should be
labelled that way rather than sitting in a queue looking actionable. The profile's
own open note is the thing to test: Gmail Android darkens the sheet and the
double rule goes first. Filed as a human-executed check with an explicit protocol
rather than a queue entry an agent will keep re-reading and re-deferring.

### Correction

I told the stage 5 session to revert **four** controls. It was three — I took the
count from the earlier report rather than deriving it, and the other two transform
removals were hover (`hover:scale-110`, `group-hover:translate-x-0.5`), which
correctly stay removed under the committed-state test. Verified in the tree: the
toggle thumb and two carets carry `transition-transform` again and no hover
transform remains.

## 2026-08-28 (v2026.08.28.5) — Three things were never on the motion budget

Stage 5 audited every animation against the arrival test and deleted five
decorative pulses, which is the rule working. Then it queued two questions
rather than acting on them, and **both were right to be queued** — one is a
conformance revert against a behaviour the spec specifies, and the other is the
prose and the rules pointing in opposite directions since they were written.

### `committed-state-is-not-motion` — and a specified behaviour was removed

**A control drawing the state the user just changed is not motion.** A toggle
thumb crossing its track, a disclosure caret turning — these draw the change the
person just made, at the moment they made it, on the control they touched. That
is what *no motion without meaning* says motion is **for**; refusing it spends
the rule against its own purpose.

The prohibition is about hover and decoration: `scale()` and `brightness()` on
hover, sub-pixel wobble, compositing jank on an element nobody touched. Stage 5
read "never transition transform" as unconditional and made four controls snap —
**including the toggle, whose own entry specifies `transition-transform
duration-200` and has since it was written.** Revert those four; the general rule
now carries the exception.

The test, stated so it does not need re-deriving: *did the user just act on this
element, and is the animation drawing the result of that act?* Then it is
feedback. Does it animate on its own, on hover, or on an element nobody touched?
Then it is motion and needs a sanctioned surface.

### The aurora is a layer, not a surface

This document's thesis says so twice — *"the aurora layer is alive… never
static"* and *"It breathes; it is the reason the page does not feel printed."*
The budget governs what **surfaces** do; the aurora is the light the surfaces sit
on. The ink layer is still, surfaces get the two sanctioned motions, and the
aurora breathes. **That three-layer statement is what the prose always said and
`motion.rules` never encoded**, which is exactly why stage 5 found a thesis and a
rule pointing opposite ways and correctly refused to resolve it by deleting one.

### Marketing is outside the register table

The two-surface budget governs the **five product rooms**. Marketing surfaces are
not rooms — they persuade rather than keep a record, so the restraint that makes
the product trustworthy is not the right rule for them. But the bounds are the
substance, not a formality: marketing motion must be **pausable on hover,
viewport-gated, motion-safe, and never on a surface carrying record state** — a
bill, a count, a receipt, a signature.

The 240s marquee at 6% opacity behind the campaigns card and the MarketingHome
shimmer already satisfy every bound. **The rule ratifies what shipped rather than
issuing a licence.** `motion.durations.marquee` stays declared; it now has a rule
explaining why it exists.

So the honest count is still **two**, correctly scoped — not four. Three things
were never on the budget: feedback, the aurora, and marketing.

### The profile-hiding corollary is now a procedure

Third instance, so it stops being a lesson. (1) `which-green` sat in the email
profile and cost a full re-derivation. (2) The ENACTED example outranked its own
rule in four more places nobody swept. (3) `motion.rules` said "never transition
transform" while `components.toggle` specified a thumb slide — and a session
applying the general rule literally removed a specified behaviour without ever
reading the component entry.

**The procedure: before declaring a general rule absolute, grep the component and
profile entries for its exceptions, and hoist any you find in the same pass.** A
general rule whose exception lives in a component is not a rule with an
exception — it reads as absolute to everyone who does not happen to open that
component, which is everyone.

## 2026-08-28 (v2026.08.28.4) — The rule that fixed dark broke light, and the guard caught its author

Four entries from stage 4. Two of them are the previous ratification's own bill
coming due, which is the useful shape here: **a rule written from one scheme's
evidence is not neutral in the other**, and **the file that enforces a decision
is not the file that records it.**

### `danger` moves to red-700

Measured **4.39:1** as ink on the light opaque ground — under AA, on the exact
ground `ink-needs-an-opaque-ground` started requiring yesterday. At red-700 it is
**5.89:1**, and the plate improves too: a white label goes 4.83:1 → 6.47:1.

The structural argument is better than the number. **Every other semantic base
is the `-700` step** — success emerald-700, warning amber-700 — and danger alone
sat at `-600`. It was the odd one out and the only one failing; those are the
same fact. Moving it restores the convention instead of making an exception.

The entry reported this as unfixable — *"there is no darker option, danger is
already the darker red."* There was: `-soft` is the **lighter** neighbour, and
the ramp continues past the base. Naming it because the rest of the entry was
exactly right, and that one clause would have converted a token change into a
permanent AA exemption.

**Not in scope: `functional` measures 4.33:1 on the same ground and is not
moving.** Its role is focus rings, progress, and hover — graphical objects at the
3:1 threshold — and its own entry forbids it from carrying meaning as text. Said
out loud so nobody "fixes" it to match.

### `opaque-ground-is-not-uniformly-safer`

The honest cost of yesterday's rule, and it deserves its own entry. **The opaque
ground is darker than glass in light and lighter than glass in dark, so requiring
it moves every token in opposite directions by scheme.** It rescues inverted ink
and it makes light-mode ink harder. Danger was the first token off that edge.
Yesterday's rule was written from dark-mode evidence; when a surface moves onto
the opaque ground, re-measure **both** schemes.

### `colors_and_type.css` was behind `DESIGN.md`, and the guard is why we know

`material-chrome` light: **75% in the stylesheet, 55% in the spec.** The 08-27
pass resolved this to 55% and deleted the dead 75% — from `DESIGN.md`, and from
the consumer. It survived in the drop-in stylesheet, so any standalone consumer
taking `colors_and_type.css` got the retired value.

**Two ratification passes read both files this week and neither caught it. The
regenerate-and-diff guard caught it on its first run** — the guard ordered one
pass ago, for exactly this failure, which then found its first instance inside
the authoring repo rather than downstream. That is the argument for the guard
stated better than any prose could: *the enforcement surface drifts from the
record, and the author is the last person who will notice.*

### `a11y.targetSize` gains its inline exception

A link inside a sentence is exempt — and this is not a concession, it is in both
authorities the 44 came from. **WCAG 2.5.5 (AAA) and 2.5.8 (AA) each carve out a
target that "is in a sentence" or is "constrained by the line-height of
non-target text."** The rule inherited the number without the exceptions, so it
read unconditional and no inline link could satisfy it.

The geometry was measured before it was looked up, which is the better story:
`role-body` is 1rem on a 1.5 line box, so **a 44px target on an inline link
overhangs 10px above and 10px below, into the neighbouring sentences' line
boxes** — it starts catching taps meant for other lines. Making the target
compliant makes the page worse, which is the signal a rule is being applied
outside its scope. Scoped narrowly: the link in a sentence only. Anything with
its own line box is a target and takes the floor.

## 2026-08-28 (v2026.08.28.3) — Glass blends, it does not cover

Six queued entries, and rendering them turned three inside out. The through-line
is one sentence: **a translucent material does not isolate what it sits over —
it averages it**, in luminance and in hue. Every finding below is that fact
arriving at a different door.

### The ink rules now compose, and none of them is about green

**`color.ink-switch-is-palette-wide`.** Stage 2.5 measured every family and
found the same shape: the base token is the ink on light and fails inverted, the
`-soft` counterpart does the reverse, and **not one token in the palette clears
4.5:1 in both schemes.** So `fill-rule-which-green` was never a green rule — it
was the palette rule, discovered in the one family that got measured first.
Green now cites it instead of owning it. This is the profile-hiding corollary
one level up: the general case was hiding inside a *colour*, not a profile.

**`color.ink-ground-is-a-placement`.** No contrast table is recorded, and that
is deliberate. The canvas carries the aurora, which is a gradient, so **the same
token measured at five vertical positions on the shipped dark page ranges from
2.15:1 to 6.32:1 — a threefold swing with no change to token, scheme, or
material.** Two sessions measured the same token on the same page and disagreed
by a factor of two; both were right for where they sampled. **A contrast number
without a position is not a measurement.**

**`color.ink-needs-an-opaque-ground` — and it retires a hard rule.** The rule
said chrome overlapping the aurora carries `material-chrome`, "which
re-establishes a ground." Measured, it does not. Dark, one position in the band,
`action` as ink: glass with blur **2.87:1**, glass with blur removed **3.45:1**,
opaque `--canvas` **6.10:1**. Ordering materials by thickness does not help —
every material lands 2.6–3.0:1, with `material-thick` and `material-chrome`
among the **worst**. Two mechanisms, the second unexpected: translucency passes
the gradient through, and `blur(50px)` samples a wide neighbourhood and averages
neighbouring bright lobes **in**, so a glass panel near a bright lobe is
*lighter* than the canvas beneath it. **Coloured ink requires an opaque ground.**
Glass stays fine for primary/secondary text, which is luminance against its own
material and does not depend on hue separation.

That rule had no specimen for its whole life, which is trap 3 collecting: it was
wrong exactly where it was most confidently cited.

### Two entries that dissolved on re-measurement

**`danger` is not broken; the ground was.** Stage 2.5 reported danger as the one
family with no ink passing inverted (4.37:1 on glass) and proposed a lighter
token. Re-measured against the real grounds, `danger-soft` is **4.71:1 on the
opaque canvas and 4.88:1 on the flat lower page — it passes.** It fails on glass
and in the aurora band, which is where *every* token fails. **A placement bug
was about to buy a palette change.** Measure the ground before changing the ink.

**`material-chrome` did not need a dark tint; it already specifies one.** Stage 3
reported that chrome is "a white wash (`bg-white/12`)" in dark, that it drifts
teal over the action green, and proposed replacing the spec's treatment. The
spec has specified `rgb(24 24 27 / 90%)` — a dark wash — since 08-27. What the
comparison rendered was **the consumer's reimplementation, labelled "MATERIAL-
CHROME (SPEC)".** Rendered against the same full-width green CTA, the real spec
value is neutral charcoal with no green cast — cleaner than the shipped navbar's
own `material-thin` + tint. **Conformance, not ratification; nothing in the
palette changes.**

The physics in that report is entirely correct — a white wash cannot absorb the
hue it blurs, which is `ink-needs-an-opaque-ground` one channel over. **Correct
physics applied to a mislabelled specimen produces a confident, well-evidenced
argument for changing the wrong thing.** A specimen that names which value it
renders is not a nicety.

### `color.materials-are-a-second-copy`

The 08-28 extraction guard covers colour and radii. **The materials are not
extracted** — the consumer hand-reimplements each as a Tailwind `@utility`, and
`material-chrome` dark has drifted to the *opposite* treatment. Its stylesheet
also carries prose documenting the drift ("material-chrome: 12% white") in the
register of a rule. Trap 4 at file scale: the materials now have two homes the
way `DESIGN.md` once did. They need the same regenerate-and-diff guard.

### `color.action.tint-is-not-a-plate`

Settled from the rendered ladder that was the open item. **"Filled plate" means
the token at full strength; a tint is not a plate at any alpha**, and the
question "at what alpha does tint become fill" has no answer because alpha is
not the channel carrying the affordance. At 40% the chip reads as a filled badge
and still not as the CTA, because the control's identity rides on four channels
tint never touches: full-strength fill, elevation, corner radius (`rounded-md`
vs `rounded-full`), and an ink label rather than coloured ink. Photometry agrees
— the ladder reaches at most 30% of the CTA's own separation in light, 17% in
dark.

So the general form, which also answers "there is no tint token in any family":
**status is ink on neutral material; a coloured plate belongs to a control.**
The 10% ceiling still binds and still binds for *contrast*, sitting well below
where affordance becomes arguable.

**Dissent recorded.** The implementation session read the dark ladder as "even
40% still reads as a label" and concluded the threshold is scheme-dependent.
Reviewing the same render without having built it, 40% dark reads as a filled
pill. It does not change the outcome, and it is exactly why the render is
reviewed by someone else.

### `color.primary.plate-not-mark`

Confirmed and closed as a **limitation, not a gap**. Midnight Indigo is dark by
definition, so inverted a primary rule/underline/ink vanishes — measured
**1.03:1 and 1.37:1**, far under the 3:1 non-text threshold. A primary *plate*
is fine in both schemes. No token can fill this: the one light-enough neutral
family is `functional`, and functional *means* the system, so borrowing it to
mark the user's own trail would say the opposite of what the mark is for.
**The primary/slate distinction is a light-mode distinction**; inverted, a
primary mark resolves to the hairline neutral and the difference is carried by
position and label. The blockquote bar already ships that and is correct.

### `color.canvas-divergence-2026-08-28` — recorded, not resolved

Two different canvases under one name. This spec's `.amendment-app` paints
`--canvas` (neutral-100/900); the shipped body paints `slate-100` and a
hardcoded `#080c17`, plus the aurora. The shipped one is what the system means.
But they are not the same *role* — `#080c17` + aurora is the **Live register's
ground**, the neutral pair is the **opaque ground** `ink-needs-an-opaque-ground`
requires. One token doing two jobs can only be right for one. Needs a named Blue
Hour token; not decided here because the naming moves with the register table.

## 2026-08-28 (v2026.08.28.2) — The example that outranked its own rule, and the ground nobody named

The 08-28 pass earlier today wrote `color.action.fill-rule-which-green` and got
the rule right. It then closed the entry with an example — *"an ENACTED stamp is
`--color-success` ink … It is NOT the action green"* — that reads absolutely.
**Read alone, the example forbids in dark exactly what the rule requires there.**
Measured on the real page grounds rather than a nominal canvas: light, `success`
**4.99:1** vs `action` **2.64:1**; dark, `action` **6.72:1** vs `success`
**3.56:1**. The absolutist reading ships a 3.56:1 label. The code was never
wrong — `RubberStamp.tsx` ships `text-success dark:text-action`, which is the
rule applied — so this was purely about the next reader, who finds the example
before the rule.

The example now carries the switch. **The general lesson is that an example
placed after a rule outranks it in practice,** because the example is what a
hurried reader reads; an example that can be mistaken for the rule has to state
the rule's conditions itself.

**The queue found one instance of a class; the class had four more members.**
`fill-rule-which-green` was ratified without sweeping the sites that restate it,
and four of them still taught flat "action green for enacted" — the accent
`colors:` field, the Archive register prose, the tactile-accents inventory, and
`README.md`. Under the ratified rule those are not merely stale: **the spec was
instructing a 2.64:1 contrast failure in four places while the code did the
right thing.** All four now name the switch. This is the "grep the entry points
in the same pass" discipline failing on its first outing after being written
down, and `README.md` was again the last file to hear about it.

**Two oxblood Known Divergences deleted, not softened.** Both recorded
production stamping ENACTED in `text-red-900` and both said *Spec ahead — the
code has to migrate.* The code migrated. A resolved divergence left standing is
worse than no record, because it teaches the next reader that none of the other
divergence entries can be trusted either.

**New: `color.action.fill-rule-ink-ground`.** Claim 2 says `--color-success` is
the light-mode ink; it never said what it is legible *on*, and the answer moves
fast enough to matter. Success ink measures **5.48:1 on pure white, 4.99:1 on
the neutral-100 page ground the app actually renders, and 4.32:1 one plate step
down — a fail.** `RubberStamp` is background-transparent, so its contrast is a
property of its placement, not of the component. The number in the component's
own comment (5.48:1) is measured against a ground the page does not have and
overstates the headroom by roughly a full point.

The sharp end of this is a **10% ceiling on green tint plates carrying green
ink.** `AskSummaryCard`'s chip ships `bg-action/10` behind `text-success` and
measures **4.52:1** — clearing the bar by two hundredths. At 15% it is 4.31:1
and fails. That 10% is a framework step nobody chose: it survives on
measurement, not on intent, and it has no room to grow. Written down before
someone "rounds it up" to a nicer number.

**Version scheme, ratified.** `v2026.08.28` was already tagged and this pass
landed the same UTC day, so the date-only scheme had no way to express a second
ratification. Serial from the second pass onward — `v2026.08.28.2` — dated in
UTC because the first 08-28 pass already was, and a mixed convention makes tag
order stop matching history order.

**Left open** (in `RATIFY.md`): whether a *tint* plate is a plate for the
purposes of claim 1 — does a tinted chip read as a control? This entry settles
the contrast half only. It needs a render of the chip at several alphas beside a
real button, not an argument.

**Back to the code session as conformance, no decision needed:**
`RubberStamp.tsx` ships `tracking-[0.1em]` with a comment claiming "per spec";
chrome tracking is `--track-chrome` and the hard rules say 0.12em. It also names
`hexp-60`, a deprecated alias, where `sans-chrome` is the live token.

## 2026-08-28 — The fill rule's missing sentence, and a rule hiding in a profile (stage 2)

Stage 2 landed the colour tokens: `--color-action` exists, the CTA is flat green
with an ink label (measured 6.42:1 ink vs 2.90:1 white — the spec's own numbers
reproduced), the `!important` came off and **nothing overrode the label**,
oxblood is gone from the FAB and CTA, and the green audit fixed five fill-rule
violations across 32 green surfaces.

It also read the fill rule as contradicting itself, and shipped the permissive
branch on the evidence that 18 of 32 green surfaces survive only that reading.
**The rule does not contradict itself — it was missing a sentence**, now
`color.action.fill-rule-which-green`. Three claims were being conflated:

1. **Fill vs ink is global.** A filled green plate is a control anywhere; green
   ink is a report anywhere.
2. **Which green is ink is a contrast fact, not a taste one.** `--color-action`
   is a plate colour; as text it is 2.62:1 and **forbidden**. Green ink is
   `--color-success` on light, switching to `--color-action` under inversion.
3. **"Where a crowd is counted" scopes the Momentum *accent*** — the brand use
   of green — not the semantic success family, which keeps its conventional
   meanings (enacted, completed, verified) everywhere.

Read together, the permissive/strict split dissolves: most of the 18 surfaces
were semantic success, which was never in question. **But one consequence bites
what stage 2 shipped:** the ENACTED stamp went to action-green ink, which fails
contrast. It is legal as a green stamp and it must be `--color-success`.

**The finding underneath is the more valuable one.** Claim 2 was already in the
spec — fully specified, with the inversion switch spelled out — **inside the
email profile.** Stage 2 re-derived it from scratch by measuring both tokens
against both grounds and arrived at the identical pair. That is the strongest
possible evidence the rule is right, and that it was in the wrong section.

New corollary: **a rule that lives only inside a profile or a register is
invisible to the general case.** Profiles are where general rules go to hide,
because everyone reads them as being about email. When a rule surfaces while
writing a profile, hoist it to the section it governs and let the profile cite
it.

**Three more from the same queue, all accepted:**

- **The neutral ramp was annotated as a verbatim Tailwind alias and had stopped
  being one.** Tailwind moved its palette to oklch in v4; measured at v4.3.1 the
  framework has `oklch(96.7% 0.001 286.375)` where this file had `#f4f4f5`.
  Near-identical, not identical — so a consumer re-emitting the hex would nudge
  every `zinc-*` utility in its product off the framework's own value to fix
  nothing. `color.neutral` now **names** the ramp and cites the framework
  instead of copying it; `colors_and_type.css` keeps the hex only so the
  stylesheet stands alone with no framework under it, and says so.

- **A consumer cannot import `colors_and_type.css`, which is how `CLAUDE.md`
  described the consumer.** Three independent reasons, all measured: Turbopack
  refuses a CSS import that leaves the project root (a panic log, not a
  warning); the design checkout is gitignored in the consumer, so it is absent
  on CI and Vercel; and this file is a standalone drop-in that pulls two font
  families from the Google CDN the consumer self-hosts, and ships `role-*` and
  `material-*` as plain classes the consumer implements as framework utilities.
  **Extraction is now sanctioned, with one obligation: the consumer's CI
  regenerates the token file and fails on any diff.** A generated file is a
  second copy, and this one stamps the `spec-version` it came from — without
  the guard it drifts while carrying a stamp that has become a lie. That is
  why the guard is mandatory and not merely advisable.

- **The 12px floor versus a corner badge: the badge loses.** Two live
  violations (`text-[8px]` on a "Converts Best" hint, `text-[9px]` on a
  share-code count) were queued as needing a decision. The spec already made
  it — *"if a label no longer fits at 12px, the layout is the problem."*
  Queueing it was the error, not the rule. Shorten the copy, move it out of
  the corner, or drop it; an 8px label is not one of the options.

Also this session: `DESIGN-HARD-RULES.md` **did not exist** — it was deleted by
the repo-split prune script (my own instructions removed the folder holding it,
with a "grab this first" note above the `rm`), so `CLAUDE.md`, `/design-iterate`
and `/review-pr` all pointed at nothing for a day. Stage 2 fell back to the
repo's `CLAUDE.md` and got the rules right anyway. Rewritten and committed. The
trap is the familiar one at one more remove: **the file every enforcement path
depends on was the file nobody rendered.**

---

## 2026-08-27 — Light-clean implies dark-clean (PR 1d, and a new invariant)

The heading sweep finished: 63 conversions across 41 files, zero true headings
left on the sans stack. But the durable finding is the **verification method**,
which is better than the one this project had been using.

`stat.tsx` taught that 16px sans → 18px serif can outgrow a container, so the
sweep needed a clipping check in both schemes. Brute-forcing 160 stories × 2
schemes hit a hard 60s cap on the tooling. Instead of sampling, the question
was reframed: **how many dark-scoped rules change a type metric at all?**
Three, in the entire stylesheet — `role-stat-display` 700 → 650 (lighter,
therefore narrower, and no call site yet) and one `dark:font-medium` utility on
a free-wrapping bubble. A lighter weight cannot clip where light didn't.

So **light-clean implies dark-clean**, exhaustively over the stylesheet rather
than sampled over stories. Recorded as `typography.notes.darkMetrics-invariant`.

**What this reveals:** the single weight scale isn't merely tidier — it *buys*
an invariant. Retiring the parallel dark scale in PR 1 is what makes a
whole-stylesheet proof available instead of 320 screenshots. Any future
dark-only size, weight, tracking, or family spends it. That cost was invisible
until someone tried to verify something exhaustively and found they could.

**The generalizable move:** when exhaustive checking is too expensive, don't
sample — look for a property that makes the check unnecessary. Sampling proves
the cases you looked at; an invariant proves the ones you didn't.

Also: the implementation ran the retired-ladder grep on its own work and found
three bare weights in its own new role definitions (450 ×2, 650) — off-ladder,
specific, exactly the shape that survives a recalibration untouched. Now
tokenized, with `--serif-display/text/quote` threaded through named weights.
No bare `font-weight` number remains in `globals.css`. **The rule caught its
author before the reviewer did, which is the only real test of a rule.**

---

## 2026-08-27 — 497 came back, and the green fill rule has no home (PR 2 prep)

Two findings from the italic-subset / roles PR, one of them the most serious
divergence recorded to date.

- **`--color-action` does not exist in `globals.css`, and the shipped CTA is
  an emerald-600→700 radial gradient with `text-white!`.** The green fill
  rule — the system's central colour claim, the thing SKILL.md and
  DESIGN-HARD-RULES.md both lead with — **has no token behind it in
  production.** And the violation runs in precisely the direction
  `button-cta`'s own description warns about: a gradient under the label, and
  the label pushed to white because ink stopped being legible on a gradient.
  The ink label was never a preference; the fill's lightness was chosen
  *for* it. Recorded as a `known-divergence` on `button-cta`; PR 2 owns it
  and it is that PR's first item.
- **`role-action` deliberately NOT implemented, and the spec now says so.**
  Correct refusal: `role-*` is the type layer; a button is fill + ink +
  radius + padding + elevation + three states — a component. The Button CVA
  variant is the single home. The `.role-action` in `colors_and_type.css` is
  a specimen affordance for standalone HTML, now labelled as such.
- **The retired weight ladder came back into the spec — twice, one of them in
  a block written the same week the recalibration was ratified** (the
  breadcrumb `weightHierarchy` I added on 08-27 quoted 497). Five more sites
  found by grep: `roles.body` 362, `roles.label-caps` 497, `roles.caption`
  362, Clerk's 430/497/565. All corrected to the canonical scale.

  **Why it recurred, and the rule:** prose quoting a weight is an
  uncontrolled copy of a token, and **497 survives an edit that 600 would
  not — because 497 looks deliberate.** Nobody re-derives a number that
  specific; it reads as a measurement someone took. New
  `weightLiterals-warning` in `typography.notes`: cite the token, not the
  number, and treat every retired-ladder value
  (160/227/295/362/430/497/565/632) as a permanent search term.

Also shipped: Archivo italic subset to Latin-basic, 169,784 → 109,216 bytes
(−36%), critical path 314KB → 255KB, with `--layout-features='*'` kept so
coverage was the only variable changed. Three sans-italic call sites audited
first, all short English UI captions; non-Latin-1 glyph fallback documented at
the declaration site.

---

## 2026-08-27 — A clipped word settled a rule the prose couldn't (PR 1c)

Voyager PR 1c swept 59 of 123 sans-stack headings onto the serif display
rungs and, in doing so, produced the best kind of finding: a **measurement
that decided a reading two people could argue forever.**

- **`widthDiscipline-measured` added.** I called `stat.tsx`'s uppercase label
  "chrome-register drift," meaning *drifted off chrome*. The implementation
  took the opposite reading, moved it TO `role-label-caps`, and it clipped —
  "Endorsements" at wdth 125 + 0.12em is 150px of unbreakable word in a 144px
  plate. **The clip is the argument.** Chrome is wider than caption, so a
  small label in a fixed narrow plate cannot be chrome unless the plate is
  widened, and widening is layout, not type. Stat captions are `role-caption`.
  New general rule: when it's ambiguous whether a small label drifted off
  chrome or into chrome, set it at chrome width and see if its container holds
  it. **Chrome is for labels whose container was designed for chrome's width.**
- **Breadcrumb `weightHierarchy` stated.** Applying `role-label-caps` to the
  `<ol>` flattened every crumb to 497 and killed the current-page signal.
  Ancestors step back to 400; current keeps 497. A trail with equal weights is
  a list of links, not a trail. Tracking also corrected 0.05em → 0.12em —
  chrome's width without chrome's tracking is a different register, since the
  tracking is what recovers Archivo's narrower ceiling.
- **Chrome's two light values RESOLVED** — the last open unowned default from
  session 8. 75% sat on an `--animate-navbar` default with no call site; 55%
  is what every rendered navbar takes via `material-scroll`. Deleted the 75%
  rather than reconciling: **the value that reaches a surface is the value the
  system means.** Dark stays 90%.

Also: `display-minor` shipped at 1.25rem before ratification and was corrected
to 1.125rem — the ratification round worked exactly as intended.

**Rule this adds:** a spec sentence that supports two opposite readings is not
ambiguous prose, it is a missing measurement. Render both readings and let the
container decide.

---

## 2026-08-27 — The role layer got built, and told us three things

Voyager PR 1b (type-only pass on the Bot message surface + BillSummary)
implemented `role-*` in CSS for the first time. The spec had referenced the
role layer since the beginning and **it existed nowhere in code** — so every
call site was literals, which is the mechanism behind every drift this
project has recorded. Three findings came back up the pipe, all ratified:

- **`role-display-minor` ratified** (serif, 1.125rem, weight 700, lh 1.3).
  The scale had two display rungs; markdown emits h3/h4, so components were
  improvising a third from `text-lg`/`font-medium`. Weight steps DOWN from
  800 rather than up in size — a minor heading is a quieter instance of the
  same voice, not a smaller shout.
- **Inline serif emphasis is ROMAN below 1.125rem** (new
  `emphasis-serif-inline` role + a comment block at `typography.roles`).
  "Serif italic is quoted human voice" was true and incomplete: it holds
  above 1.125rem, where Newsreader's calligraphic italic is legible. At
  1rem inside body prose it is the metadata finding again — same face, same
  size, same illegibility. *A caveat is roman; a voice is italic.* Without
  this stated, the correct move looked like a rule violation at review.
  The blockquote **keeps** its italic: the defect was never the italic, it
  was rendering at 14px sans, below the floor where the italic is legible.
- **The `roles:` block is not the role layer's inventory** — flagged OPEN.
  The spec lists nine rungs; the stylesheet implements sixteen (lede, quote,
  metadata, stat-display, ceremonial, signature, action). The gap was
  invisible until someone building the layer had to ask which roles they
  were allowed to use.

**What the implementation also caught in production:** a `leading-7` (28px
absolute) on `<p>` over an inherited `text-sm` — line-height 2.0 arrived as a
*stack of two overrides*, not as anybody's decision; and `BillSummary`'s h3s
at `text-[11px]`, under the floor. Both are the padding-plus-inherited
arithmetic that produced the tab bar's 40px: **no single line was wrong.**

**Rule this adds:** a role the spec names but no stylesheet implements is a
literal waiting to happen. The role layer is the enforcement surface — if a
rung is missing from it, the call sites invent one.

---

## 2026-08-25 — The entry points taught retired rules (session 8 critical pass)

A holistic pass looking for flaws, contradictions and prune candidates — run
because agents consuming this system (Claude Code) were observed ignoring it.
The finding: **they were not ignoring it; they were obeying the wrong files.**
`SKILL.md` and the README's opening claims — the two things an agent reads
first — still taught rules the spec retired in the first week of August. An
agent that trusts the entry point recreates Merriweather headings, an Oxblood
CTA, a wax seal, and components ported from an archived kit, and every one of
those looks like "ignoring the design system."

**Stale claims fixed, all mechanical, all found by grep:**

- `SKILL.md` (rewritten whole): Merriweather in the ink layer (retired
  2026-08-01) · Oxblood "for action" (retired) · "wax-seal on send" (the seal
  is a colourless blind emboss, and it is *proposed*, not built) · "Emerald is
  a brand accent on the Commons only" (superseded by *green appears where a
  crowd is counted* + the fill rule) · "three-stop aurora" stated as a hard
  limit (the measured rule is chroma ≤ 0.22, ≤ 5 lobes, no bare text in the
  band) · "Pull components from `ui_kits/web/` — spec-faithful" (the kit was
  archived as superseded on 2026-08-15) · guilloche "draws left-to-right" (the
  draw-on exists nowhere; portrait fades) · proposed accents listed as freely
  buildable. The new file also states the hard rules in their enforceable
  2026-08-25 form (fill rule, 44/48 targets by `min-height`, `ch` ban,
  signature licence, streaming-is-not-motion) and declares precedence:
  DESIGN.md wins over SKILL.md and README.
- `README.md`: two ink-layer descriptions naming Oxblood · "citations in
  Oxblood superscript" (they moved to Midnight Indigo 2026-08-01) · "No fourth
  lobe. No hue broadening." (contradicted the rewritten `a11y.contrast`) ·
  "voyager is private — install the GitHub App" (readable since 2026-08-02) ·
  "43 specimens, eleven files with no marker" (resolved 2026-08-12) · step 5
  still told consumers to pull from `ui_kits/web/`.
- `DESIGN.md`: `components.button-cta.hover` read "shift to red-700 → red-800
  gradient" — the oxblood leftover flagged 2026-08-13 and left for a colour
  pass; now `color.action-hover`, flat, with the pressed-state constraint
  restated. And two heritage lines: "Merriweather 800 carries gravity"
  (→ Newsreader `--serif-display`) and "Oxblood does that job here" on
  secondary CTAs (→ one action colour + the fill rule).
- `github.md`: "Needs a decision: is Archivo the target?" — recorded as
  undecided in the 08-15 sync **two days after the 08-13 changelog decided
  it**. Resolved as written: Archivo is the target; Readex in production is a
  Known Divergence, spec ahead.

**Pruned:** `01-scraps`…`05-scraps` — five extensionless JPEG binaries at the
project root, referenced by nothing.

**Flagged, not deleted:** `Amendment - Touch Targets.html` at the root — a
one-off share export duplicating `preview/touch-targets.html`, styled in
`-apple-system` rather than the system's own faces. Delete or move to
`scratch/` if it has no audience.

**The rule this session adds:** *an entry point is a specimen too.* The system
already knew unshown files go wrong (the eleven non-cards) and that literals
drift (the card sweeps). SKILL.md is the most-read and least-rendered file in
the project — nothing renders it, so nothing contradicted it, for 24 days.
When a decision lands in DESIGN.md, grep the entry points for the value it
retires, in the same pass.

---

## 2026-08-14 — Sans body width: `wdth` 104

Applying the type audit's one unapplied decision (handoff of the same date, from
a consuming project that had already run it in its `_ds/` copy). `--sans-body`
moves from the axis default 100 to **104**.

**Why.** Widening a face *lowers* its character count. Measured in a 28rem column
at 16px: Readex at `HEXP` 2 — the face the measure was calibrated on — set **56**
characters; Archivo sets **63** at `wdth` 100, **60** at 104, 59 at 106, 57 at 110.
At the axis default, body copy is seven characters a line tighter than before the
family changed, which nobody chose. 104 is also where Archivo's *O* is a circle
(pixel ink ratio 1.014 at 104, 1.028 at 106, true 1.000 at ≈102). Full parity with
Readex needs ≈110, where lowercase stops reading as a text register — so 104 is the
deliberate compromise between parity and rest state, not a rounding. **`ch` remains
banned:** these are counted characters of the rendered face.

**What changed.** `colors_and_type.css` `--sans-body` (and therefore `--hexp-2/10/40`,
`.role-body`, `.role-body-lead`, `.amendment-app`), `DESIGN.md`
`typography.widthPresets`, `README.md`, and the `Type — Three families` card, which
named body width literally.

**Recorded as still open.** The 69-character `measure.body` was counted in
Newsreader; grading sans copy against a serif count is the category error `ch` was
banned for. **Sans body copy still has no counted measure** — noted in
`DESIGN.md` → `spacing.measure`.

**Card sweep, same day.** Two classes of stale literal in `preview/`:
`font-variation-settings: 'wdth' 1000` in five cards — out of Archivo's 62–125
range, so it clamped to 125 and looked right by accident; a bad find-replace
during the Archivo swap. Repaired to `var(--sans-ceremonial)` (Receipt kicker,
attestation caption) and `var(--sans-body)` (the brand/seal sub-labels, which are
lowercase and untracked and so were never chrome). And **86 hardcoded weights
across 35 files** — the pre-recalibration ladder (160/227/295/362/430/497/565/632)
written as numbers — now name `--sans-thin`…`--sans-extrabold`. This is visible:
those cards were rendering one to two steps light, chrome labels most of all.
`type-weight-ladder.html` keeps its literals on purpose; it is the ledger of the
old scale.

A review pass then caught a third class and one card that lied about itself.
`Type — The institution speaks` — the card whose job is to document the sans
registers — was rendering body at `'wdth' 100` and captioning it "wdth 100,
weight 362"; it now uses `var(--sans-body)` and says 104 / 400. And **29
`letter-spacing: 0.05em` chrome literals** across the cards were the PRE-Archivo
`--track-chrome` value, left behind by the 2026-08-13 move to 0.12em — the very
tracking that recovers Archivo's ~4% narrower chrome ceiling, so the cards were
under-tracking the register they exist to demonstrate. Now `var(--track-chrome)`.
In the same pass **42 `'wdth' 125` literals** became `var(--sans-chrome)`, since a
literal is exactly how all of this drifted.

**Not adopted from the handoff.** It proposed `--track-ceremonial` 0.18em; this
system shipped 0.20em on 2026-08-13 and keeps it — ceremonial is now separated
from chrome by tracking alone, and 0.18 against chrome's 0.12 is too small a gap
to read. Its other open items were already closed upstream: Archivo is
self-hosted with both variable cuts, `fonts/ReadexPro.ttf` is deleted, and the
wax-seal monogram now owns its own proportions rather than inheriting the
ceremonial preset.

---

## 2026-08-13 — Primary sans: Readex Pro → Archivo

Evidence: `Sans Candidates — Specimen.dc.html` (five faces, live-measured ledger).

**Why.** Readex was excellent as chrome and wrong as a body face: wide, soft,
evenly weighted, so word silhouettes flatten at paragraph length. It also had
**no italic**, which is the real reason every italic in the system had to be
serif. Archivo keeps the one-face-two-registers idea (`wdth` 125 for chrome),
adds a true italic at every weight, and recedes under Newsreader instead of
competing with it.

**What changed.** `colors_and_type.css` — Google Fonts now loads Archivo
(`ital,wdth,wght`); Readex's GF entry and the local `Readex Pro Local`
`@font-face` are gone, and `fonts/ReadexPro.ttf` is deleted. New width presets
`--sans-body` 100 · `--sans-chrome` 125 · `--sans-display` 120 ·
`--sans-ceremonial` 125, plus `--track-chrome` (0.12em, up from 0.05em) and
`--track-ceremonial` (0.20em). `--hexp-*` are kept as **deprecated aliases** onto
the new presets so shipped component code and the adherence lint keep resolving
mid-migration. `DESIGN.md` (`typography.fontFamilies.sans`, `sansAxis`,
`widthDiscipline`, `widthPresets`, the label-caps role, the email profile's
substitution table, the prose chapter), `README.md`, `SKILL.md`, `fonts/README.md`,
`assets/README.md` and the four wordmark SVGs follow. Every card, kit stylesheet
and exploration that named the axis literally (`'HEXP' 60`) now names `'wdth' 125`.

**Two costs, stated.** The chrome register is **~4% narrower**: Readex at HEXP 60
measured 334px for `ARCHIVE COMMONS WRITING DESK` at 12px; Archivo at `wdth` 125
— its ceiling — measures 322px. HEXP was the more powerful axis; recovered in
tracking, not size. And **width can no longer separate four registers**, because
chrome now sits at the ceiling; ceremonial is distinguished by tracking and size.
Correct hierarchy anyway, but a spec change, not a token swap.

**Follow-up audit, same day.** Reviewing the type section caught four things the
migration itself introduced or exposed. (1) The width presets are **not a
monotonic ladder** — chrome (125) is wider than display (120) — which the
type-families card was describing as "body → chrome → display → ceremonial."
Width separates the *clerical* register from the *editorial* one; display
escalates by size and weight, ceremonial by tracking. Now stated in the token
comment and in `DESIGN.md`. (2) An **italic policy** was written down: serif
italic stays the italic of record for quoted voice, but Readex's absence of any
italic meant `<em>` inside sans copy was getting a browser-*synthesized*
oblique — the "every italic is serif" rule was partly describing that
constraint. Archivo's drawn italic needs no new role, just `<em>`. (3)
`.role-body-lead` carried a raw `font-weight: 200`, off the scale and below
`--sans-thin`; it now uses `--sans-extralight`, which matters more in Archivo
because the ladder reads lighter. (4) `Type — Roles` claimed "every typography
role in one ladder" while omitting lede, body-serif, caption, code,
stat-display and ceremonial; all six are now in the card.

**Archivo self-hosted (same day, after upload).** The pre-wire from item 2 below
is now live: both variable cuts were uploaded as
`fonts/Archivo-VariableFont_wdth_wght.ttf` and
`fonts/Archivo-Italic-VariableFont_wdth_wght.ttf`, wired as one `'Archivo'`
family across two `@font-face` rules (`font-weight: 100 900`,
`font-stretch: 62% 125%`), and **Archivo is removed from the Google Fonts
`@import`** — Newsreader and IBM Plex Mono stay on the CDN, since neither has a
local cut and neither has a width axis to lose. The chrome register no longer
depends on a reachable CDN, which is the whole reason the local cut mattered.

VERIFIED rather than assumed, because the failure mode here is silent: a cut with
its `wdth` axis stripped loads cleanly and collapses chrome to normal width
without erroring. `document.fonts` reports
`Archivo/normal/100 900/62% 125%` and `Archivo/italic/100 900/62% 125%`;
`ARCHIVE COMMONS WRITING DESK` at 12px measures **251.7px at `wdth` 100 and
315.7px at 125**, so the axis is doing real work; and the italic has metrics
distinct from the roman, i.e. drawn, not synthesized. That width spread is the
check to re-run after any future font swap — it is recorded in
`fonts/README.md`. Self-hosting also cut Archivo from six CDN slices to two
faces.

**The three open items, closed (same day).** Evidence: `scratch/weight-measure.html`,
a canvas ink-coverage harness, and `preview/type-weight-ladder.html`, the ledger card.

1. **Weight scale recalibrated to canonical 100…900.** The old ladder
   (160/227/295/362/430/497/565/632/700) interpolated Readex's range to
   compensate for Readex reading optically heavy; Archivo needs no compensation,
   and its named instances are the designer's own drawn stops. Measured by ink
   coverage of a fixed pangram at 16px, the drift grew monotonically up the
   ladder: the bottom three rungs were within 8% of their names, "semibold" 497
   had the ink of Archivo's **Medium** (297,388 vs 298,483 at 500), "bold" 565 was
   **lighter than its SemiBold**, "black" 700 was **exactly its Bold**, and
   800/900 were unreachable. The cost is concentrated in one token:
   `--sans-semibold` 497 → 600 (+13% ink) carries the CTA label, the chrome
   label, the ceremonial register and the seal, so all four get visibly heavier.
   Propagated to `DESIGN.md`, `README.md`, `proposed/…/tokens.json` and
   `tailwind.config.example.js`.

2. **Local Archivo cut pre-wired, files not shipped.** The binary cannot be
   fetched from here, so the next-best thing was done: `'Archivo Local'` is
   declared first in `--font-sans` with roman and italic `@font-face` blocks
   (`font-stretch: 62% 125%`). When the files are absent the `@font-face` fails
   and the stack falls through to the Google Fonts `'Archivo'`, so the wiring is
   safe to leave in place and activates with **no CSS change** the moment
   `fonts/Archivo.woff2` and `fonts/Archivo-Italic.woff2` are dropped in.
   `fonts/README.md` names the two files and the trap: some redistributions strip
   variable axes, and a cut without `wdth` silently defeats the point.

3. **The seal monogram redrawn — and the diagnosis was wrong.** The open item
   blamed the ceremonial preset's width. Measurement found the real fault was
   **size**: at 26px the A spanned 24.9px inside a 63.8px inner rule — 39%, a
   monogram rattling around in its own seal — and Readex's HEXP 100 had been
   hiding it. A die is drawn to fill a circle, so the glyph is a function of the
   die, not of the body copy's widest text preset. `.seal-emboss` now sets an
   explicit `"wdth" 125` rather than inheriting `--sans-ceremonial`, sized to
   ~54% of the inner rule at every size (36 / 24 / 44px). Letter-spacing dropped
   to zero: on a single glyph, tracking is pure trailing space, so the 0.06em it
   carried was shoving the letter left of centre.

**Three bugs surfaced by doing the above, all fixed.**
`.role-display-stat` — the selector on the dark-mode optical bloom correction,
in all three of its branches — **does not exist**; the role is
`.role-stat-display`, so the system's one dark-mode weight correction had never
fired since it was written. Its literal moves 520 → 650 to stay ~8% under the
recalibrated `--sans-bold`. `README.md` still described the seal as "a flat
circular Oxblood with the monogram embossed in white/parchment", eighteen months
after oxblood was retired and the seal became a blind emboss.
`proposed/design-system/dark-mode.md` said the same thing ("the seal is meant to
be Oxblood regardless of mode").

**Still open, noted not fixed:** `DESIGN.md` `components.button-cta.hover` reads
"shift to red-700 → red-800 gradient" — an oxblood leftover that contradicts
`--color-action-hover` and the no-gradient-under-an-ink-label rule two lines
above it. Outside the type section, so left for a colour pass.

**Original open items.** Readex is retired *entirely*, including the HEXP-100 ceremonial
caption — its one defensible niche was expansion beyond `wdth` 125 on the Receipt,
where the ceremony is already carried by paper, guilloche, emboss and the mono
ledger number, and a second family for one caption is not worth the export and
print fragility. The **weight scale is not recalibrated**: `--sans-*` was tuned
for Readex's 160–700 and reads slightly lighter in Archivo's 100–900. **No local
Archivo cut ships** — a blocked Google Fonts request now collapses chrome to
normal width (legible, not institutional). The **wax-seal monogram renders
narrower than the spec image**, since it inherits the ceremonial preset; the
specimen art should be redrawn rather than assumed to match.

---

## 2026-08-12 — The eleven non-cards: ten deleted, one promoted

`preview/` held eleven files with no `@dsCard` marker — in no tab, shown to
nobody, and readable by anyone who opened the folder. Flagged in session 5,
carried through 6 and 7. Resolved by reading all eleven against their
replacements first.

**They were not cards that lost a marker.** Every one was 745b–3.3kb with no
`<h1>` and no `.sub` — the shape of a fragment authored *before* the card format
existed. That changed the question from "which are dead" to "does anything here
survive its replacement".

**Nine were redundant, not wrong.** Every hex and oklch was checked against
`colors_and_type.css` — `#1e293b`, `#64748b`, `paper-cream`, `paper-parchment`,
the three aurora hues, the 87/55/38 scale — all current.

**One was actively wrong.** `type-serif-display` labelled the display face
**Merriweather 800** while rendering in **Newsreader**. It had survived six
sessions of reading because nothing renders it.

**One was kept and promoted.** `brand-aurora-still` was the only specimen of
`assets/aurora-still.svg`, the flat fallback for email and raster export, and no
card covered it. It now has a marker (`Brand — Aurora, flat`), a title, and the
rule it was missing: **it is not the print fallback** — print has no aurora at
all, per `profilesPrint`.

Deleted: `type-serif-display` · `color-aurora` · `color-primary` ·
`color-functional` · `color-text-opacity` · `material-tiers` · `paper-canvases` ·
`type-hexp-axis` · `type-sans-body` · `type-mono`, plus the working comparison
sheet `_orphans.html`.

Its first marker was written from a guess (`700x360`) and the harness measured
540 — **clipped by 180px, a third of the card**, on the one file this cleanup
added. Trap #8, caught mechanically inside a minute, and unreachable by reading.
Corrected to `700x540`.

**All 47 files in `preview/` now carry a marker.** The folder and the tab are the
same set for the first time.

> **A folder and its tab should be the same set.** A file the tab does not show
> has no reader and no maintainer, and the failure mode is not clutter — it is a
> confident wrong claim with nothing to contradict it.

---

## 2026-08-12 — `profilesPrint` gets its specimen

The profile went canonical on 2026-08-04 and was cited by no card for eight days,
which is the exact failure session 4 named. `preview/print-profile.html` now
shows it: the unowned default beside the profile, at true US Letter geometry.

- **Both sheets are authored at 816 × 1056px — real US Letter at 96px/in** — and
  shown at 53%. So the card *measures* its own rules instead of asserting them:
  1.00in margins, a **6.50in measure**, **0.40in** of clear space above the
  printed name, folds at 3.67 and 7.33in. Authoring at true geometry is the
  point, because scaling is this system's recurring bug.
- **A stated miniature exception.** Type inside a sheet is 11.5pt on paper and
  renders ~8px on screen. That is licensed — *a specimen may render below the
  floor only as a scale model of an artifact authored at another size, and it
  must say so in the file* — so the card says so, in a comment and in the visible
  legend. Everything the card says *about* the sheets is authored at card size
  and holds the floor.
- **The defects are shown, not described.** Flat black beside the re-based
  100/45/none scale; **the real `.seal-emboss` rendered on a white sheet** beside
  the ledger number that replaces it; 8px of signature clearance beside 0.4in; the
  missing postal block beside a mailable one.

### Rendering the emboss corrected the spec's own prediction

The card first *drew* the printed seal as a grey sphere, which was the same
mistake as `65ch` and `scrollHeight`: **a proxy for the thing producing a
confident claim about the thing.** `.seal-emboss` exists in the stylesheet this
card already loads, and a browser on a white sheet with no paper beneath it **is**
the printer's situation — so the component was rendered instead.

It does not come out as grey mud. **It comes out a pale grey ring**, and
`profilesPrint.emboss` has been corrected to say so. The correction strengthens
the rule: the failure is not that the emboss prints badly, it is that it prints as
a *picture of relief* and so carries no authority at all. **A faint ring is worse
than a smudge, because a smudge at least looks like an accident.**

Also worth keeping: the drawn version used `#6e6e6e`, a neutral grey. The real
`--seal-shadow` is `rgb(96 62 28 / 30%)` — warm brown. The illustration was wrong
about the hue as well as the outcome.

**Deleting it took three passes.** The first delete **silently no-matched** — the
target string omitted a trailing `margin-top:14px` — so the invented rule stayed
in the file while the work was reported as done. A find-and-replace returns the
document unchanged on no-match, and unchanged is indistinguishable from succeeded.
Scripted edits here now assert their own match and throw on equality. Grepping for
the deleted name afterwards found a **second** stale claim the pass had missed:
the rules list still said "grey mud" in prose, which is now corrected to the
rendered result.

Final state, harness re-run to `done`: **0 clipped / 0 slack / 0 floor breaks
across 57 files**, marker `1000x1857`.

### The count that was wrong twice in the same way

Session 6 recorded seven non-card files in `preview/` against session 5's
eleven, and on 2026-08-11 that was corrected back to eleven. Today's run read
**seven** again — and then settled at **eleven** with "all measured". Both wrong
readings were the same mistake: **the harness counts as it loads, so any number
read before it reports `done` is a number about a partial run.** Eleven stands.

Session 5's trap #11 says to run a measuring tool twice and diff the runs. The
sharper form, earned twice now: **a tool that reports progress can be read at a
moment when it is telling the truth about nothing.** Wait for `done`.

**The mirror image landed in the same turn.** Rewriting the emboss legend added
two wrapped lines and clipped the card by 50px, while a *finished* harness run
from before the edit sat on screen still reporting 0 clipped. **A stale clean run
is more dangerous than a mid-load one**, because nothing about it looks
provisional. Marker corrected to `1000x1798`; re-run to `done`, 0 clipped / 0
slack / 0 floor breaks across 57 files.

---

## 2026-08-11 — The 44px floor is cited, and citing it found four more violations

`a11y.targetSize` got its provenance on 2026-08-02 and was still cited by exactly
one component. Its own enforcement clause says a component that does not declare
its target is not enforced, so the citation was the whole remaining job. **Citing
it is what found the violations** — the same sequence as the 12px floor, which
found 20 the moment it had a single home.

### Measured, at the values the spec itself states

| control | as specified | arrives at |
| --- | --- | --- |
| `button-default` / `-secondary` / `-ghost` | `0.5rem 1rem` + 16px × 1.5 | **40px** |
| `input` | `8px` + 16px × 1.5 | **40px** |
| `toggle` | `44 × 24` track | **24px** |
| `breadcrumb` | 12px caps, line-height 1 | **~12px** |
| `button-fab` | `size: 48px` | 48px ✓ |
| `button-icon` | `size: 44px` | 44px ✓ |

**The two that comply are the two that state a size.** Everything else arrives at
its height by `padding + line-height` — which is not a decision anybody made, and
is precisely how the tab bar shipped 40. Four controls, none of them by intent,
and every one of them had passed six sessions of reading.

**The toggle is the instructive one.** Its spec said `44px × 24px track`, and the
44 is the **width**. A rule about a square, a spec line containing the right
number for the wrong axis: that is how a violation survives being read. The
control is 55% of the floor vertically.

**The breadcrumb is the worst** — 27% of the floor, on the only control that
walks back up a bill's hierarchy.

### What changed

- **Nine `touchTarget` blocks** in `components`, each naming `a11y.targetSize`
  and stating its own minimum: the buttons at 44, **`button-cta` at 48** (Send and
  Co-sign are the consequential thumb-reached case `targetSize.not-the-floor`
  names), `button-fab` and `button-icon` recording *why* they already complied,
  `input` at 44, `toggle` and `breadcrumb` by expansion, and `card-select`
  recording compliance that genuinely does follow from its content.
- **New `a11y.targetSize.how`** — the mechanism, which did not exist and is the
  reason this is fixable without redesigning four controls:
  > **`min-height`, not more padding.** Padding changes a plate's proportions and
  > its label's optical centring; a declared minimum leaves a compliant control
  > untouched and grows only what falls short. Where the visible control must
  > stay smaller than the floor, **expand the target, not the box** — a
  > transparent hit area at the minimum, centred. Appearance and target are two
  > geometries and this rule governs only the second.
- **New `a11y.targetSize.cited-by`**, so the next session can see at a glance
  that the rule has consumers. Before today: cited by one, violated by five.
- **New card `preview/touch-targets.html`** — draws the 44px floor as a hatched
  band each control either fills or does not, and **measures itself**: 40 / 44,
  40 / 44, 24, 12. Both fixes shown next to both defects.

**Rejected: fixing the buttons with padding.** `0.75rem 1rem` reaches 48 and
changes every button's proportions and the optical centring of every label, to
solve a problem that is not about padding.

**Rejected: growing the toggle track to 44px tall.** It stops reading as a switch,
and the 16-in-24 thumb geometry is what makes its state legible.

### Also

- `preview/type-newcomer.html`'s viewport was 90px short — fallout from the
  measure sweep on 2026-08-04 (the lede narrowed from 26.5rem to 24rem, and
  narrower prose is taller prose). Session 6's own note said to rerun the harness
  after anything that changes text width; this is the card it missed.
- Session 6's handoff recorded seven non-card files in `preview/` against session
  5's eleven. **The seven was read mid-run** — the harness counts as it loads.
  Eleven is right; corrected in place.

**Owed to production** (spec-ahead, added to the standing list): the 40px button
and input heights, the toggle's 24px target, the breadcrumb's ~12px target.

---

## 2026-08-04 — `ch` is retired from the token layer, and print becomes a profile

### The measure: 65ch was rendering 97 characters

Session 5 left the `ch` ambiguity open with an explicit first move — measure the
shipped columns before touching the token, because 89 characters might simply be
what those surfaces had always been. Measured (`explorations/What 65ch
Measures.html`, two runs identical): **the prose column is 97 characters**, and
the reason is worse than the number.

> **`ch` is not a unit of measure. It is a unit of the element it is written
> on.** `.page--prose` carries `max-width: 65ch` and inherits the body **sans**;
> the prose inside it is the **serif**. So the column is 65 Readex Pro zeros
> (9.79px each) filled with Newsreader characters (6.53px each) = 636px = 97
> characters. **Nobody chose 97.**

Two ambiguities stack, and only one is the one session 5 found:

- **Within a face** — the zero glyph is 42% wider than Newsreader's average
  rendered character. Session 5's finding.
- **Between two faces** — the measuring face is not the rendered face, and the
  sans zero is **50%** wider than the serif's average glyph. New, and larger.

**Self-consistency is not the fix.** `.bill-lede` was the one honest case —
`52ch` written on the very element it sets — and it still rendered 74
characters. `65ch` set on the serif itself is 92.

**A `ch` value in a custom property has no single value at all.**
`container.normal` is consumed by elements in different fonts, so it computed
636px on the page shell and 601px on a serif element. A length that computes
differently per consumer is not a token, and it cannot be audited by reading —
which is why four sessions of reading missed it.

### What changed

- **New `spacing.measure`** — `body: min(28rem, 100% - 2rem)` (69 characters of
  `role-body-serif` at 16px), `lede: min(24rem, 100% - 2rem)` (47 characters at
  20px), `print: 6.5in`. Target 69, ceiling 75. **Stated mobile-first**, so the
  `min()` removes the need for a breakpoint — this also closes the last item of
  audit §3.7, which is why it was sequenced after this one.
- **`ch` is banned from length tokens**, with the reason recorded in
  `spacing.measure.rule` so the ban is arguable-with rather than inherited.
- **A container is not a measure.** `container.*` are shells; `measure.*` cap the
  element that *holds the text*. `container.normal` is now `min(31rem, 100%)` —
  the measure plus `.page`'s own 24px gutters.
- **`.measure` / `.measure-lede` utilities** in `colors_and_type.css`;
  `.role-lede` and `.bill-lede` re-based to `measure.lede`; `.page--prose` to the
  shell value.
- **The lede's stated intent is restored.** `colors_and_type.css` had said the
  lede measure is "deliberately shorter than the 65ch prose column" — measured,
  it was 600px against 636px, **one character of visible difference**, because a
  larger face has a wider zero and bought back nearly all the width it was meant
  to give up.
- **The specimen layer swept** — eleven `ch` declarations across seven cards plus
  `preview/_card.css`'s own `.sub`, each converted to a counted line in rem at
  that rule's own face and size. Four viewport markers re-measured afterwards
  (narrower prose is taller prose) and `preview/measure.html` added, which states
  the rule and **measures itself rather than asserting**: 97 / 69 / 47.

**Rejected: moving `ch` onto the text element and keeping the unit.** It fixes
the font mismatch and leaves the unit mismatch — still 92 characters. **Also
rejected: keeping 97 and re-labelling the intent.** The user confirmed the token
was meant to set a readable line length for copy, so 97 is not a preference the
system had; it is arithmetic nobody read.

### Print — the mailed letter is a profile with a `requires:` list

`profilesPrint`, canonical. The last item of audit §3.8, and with it **all ten
audit items are resolved** (item 6 partial by design).

**Paper is not a degraded screen — it is this register's home.** `paper-cream`,
the emboss, the guilloche, the ledger number and a Scotch roman are all
imitations of paper, so print is the one transport where the ink layer is
literally true and the aurora cannot exist. That costs nothing: the aurora never
carried meaning.

- **Ink is re-based, not flattened** — 100 / 45 / none. `* { color: #000 }`
  deletes the 87/55/38 scale, and that scale is how ink sits on a page, not a
  screen affordance.
- **The sheet is the paper canvas.** Cream does not print: a cream fill is an ink
  wash across a whole page, it bands on consumer printers, and the stock already
  has a colour. The canvas token was always standing in for this.
- **The emboss cannot print.** A printer can only print a picture of a
  deformation, and it renders as grey mud on the very artifact whose authority it
  was carrying. **The ledger number carries the proof instead** —
  `registers.issued.proof-rule` load-bearing in a third transport.
- **The dotted signature rule is canonical here, not proposed.** On screen it
  anticipates an act; on paper the act happens. 0.4in of clear space above the
  printed name, and the printed name is mandatory.
- **The ledger number prints** as one line in the closing, and this is the one
  place a user may suppress it — on a mailed letter it also discloses that the
  letter came through a platform.
- **`requires:` is new to the profile mechanism.** Paper has content
  requirements the screen has no equivalent for. The user confirmed the product
  holds the constituent's postal address (used to place them in the correct
  districts, shown to nobody else), so **the return block is printed, not ruled
  for a pen** — printing a user's own address on the letter that user mails
  discloses nothing new.

`proposed/design-system/patterns/print.md` is **promoted and superseded**, with
its two wrong lines kept as a record: the flat-black rule and "restore solid
surfaces". Its `break-inside: avoid` was also unobeyable past one sheet — the
letter now specifies a continuation header instead.

**Owed to production** (spec-ahead, added to the standing list): voyager's
`--changelog-content-cap: 65ch`, which renders 85 characters in the sans.

---

## 2026-08-02 — The 44px floor gets its provenance, and print gets an exploration

### `a11y.targetSize` now names its source

The rule has said "interactive targets are at least 44×44 px" since the
beginning, and session 4 found it cited by no component and violated by the
shipped tab bar. Session 5 found the reason it was so easy to ignore: **the
number had no source attached.** An inherited number is a number the next person
argues with.

Recorded, and verified current on 2026-08-02:

- **Apple HIG** — "maintain a minimum tappable area of 44pt × 44pt for all
  controls", unchanged since the original iPhone HIG. This is where our number
  comes from.
- **WCAG 2.5.5 Target Size (Enhanced), AAA** — independently 44×44 CSS px. Two
  authorities, two unit systems, one number; that agreement is the argument.
- **Units** — Apple's 44 is points, ours is CSS pixels. On a mobile viewport they
  coincide, which is why the tab bar measured at 390pt and specified in px is not
  a unit error. Off one, the CSS pixel governs.
- **Android/Material asks 48dp**, so **44 is the floor of the three, not a
  target.** Dense, consequential or thumb-reached controls go to 48.
- **WCAG 2.2's 2.5.8 (AA) says 24×24.** Newer criterion, smaller number — so it
  is the one that will be cited to justify shrinking a control. Recorded so it is
  recognised in an argument, not mistaken for an update.

**Rejected: leaving the number bare.** It survived four sessions bare and was
enforced in exactly zero components; the tab bar's 40px targets were not a
disagreement with the rule, they were the absence of one.

### `explorations/The Printed Letter.html`

The last of audit §3.8, argued and open. Classified as an **unowned default**:
`DESIGN.md` has no print block at all, nothing in the product prints a letter,
and `proposed/…/patterns/print.md` holds an unpromoted stylesheet under which
the browser's print engine picks the margins and the breaks.

The thesis, for the record before the decision: **paper is not a degraded
screen, it is the register's home.** Every other transport imitates it —
`paper-cream`, the emboss, the guilloche, the ledger number, a Scotch roman
chosen as the face of the printed record. Print is the one transport where the
ink layer is literally true and the aurora cannot exist, which costs nothing
because the aurora never carried meaning. Both sheets are authored at true US
Letter geometry (816×1056 at 96px/in) so every length is in inches, not eyeballed.

Eight candidate rules, of which three are the interesting ones:
`* { color: #000 }` deletes the 87/55/38 ink scale and should re-base to
100/45/none; **the 65ch measure does not transfer to paper**, and the way it fails is
better than the way I first wrote it. `ch` is the advance width of the ZERO
GLYPH, and Newsreader's zero is ~37% wider than its average lowercase
character, so `max-width: 65ch` (5.98in at 11.5pt) and "a 65-character line"
(4.35in) are two different lengths — 1.6in apart on an 8.5in sheet. **The token
is ambiguous before it is wrong.** My first pass computed the ch figure from
average character width, printed 4.35in, and called the result "a poster"; the
verifier caught it, which is trap #4 (rasterise before writing a number) landing
in geometry. Setting the measure in inches by the margin removes the ambiguity
rather than resolving it; and **the emboss cannot print**, so the ledger number carries the proof,
which is `registers.issued.proof-rule` load-bearing in its third transport.

Five questions asked, including one that is a product gap rather than a design
question: **does the product hold the user's postal address?** Without it the
sheet is not mailable and no styling fixes that.

### Ownership

**Syncing production to the system is the user's.** All six code fixes owed
(guilloche redraw, the Receipt's 9.6px caption, oxblood ENACTED, the tab bar's
three, skeleton token migration, Clerk's yellow warning) sit with him; the
handoffs should stop asking who owns each.

---

## 2026-08-02 — The specimen layer gets a stylesheet and a measuring tape

Recommended in sessions 1, 2, 3 and 4; done now, and it turned out not to be a
tidiness job. Three of the standing traps share one mechanism: **54 files whose
chrome was retyped by hand, one file at a time.**

### `preview/_card.css`

Holds the frame only — canvas, the fixed aurora, `.card`, and the four text
roles a card captions with (`.lbl`, `.voice-eyebrow`, `.caption`, `.note`),
plus `h1`/`.sub` and a link colour. Migration was mechanical: a rule was
deleted from a card only where every declaration matched the shared value, and
trimmed to its differences otherwise. 211 rules deleted, 55 trimmed to the one
or two declarations that actually differ. Cards keep their own `<style>` for
what they are demonstrating.

**It holds no specimen styling, and that boundary is the rule.** If a card's
subject were styled from here, the card would stop being evidence and start
quoting the same file the reader is trying to check. Chrome only; `.caption` is
not a shipping role class, `.role-*` in `colors_and_type.css` are.

**Rejected: leaving the cards alone and grepping harder after each token
change.** That is what the last three sessions did, and it failed the same way
each time — the misses were never in the card you were editing.

### What the shared sheet immediately made visible

An override is now a diff, so a card that departs from the system says so in one
line instead of hiding in forty. **Twenty declarations below the 12px chrome
floor across seven cards** — including `.lbl { font-size: 9px }` in
`surface-system.html`, i.e. the chrome label class, redefined under its own
floor. All twenty are now at or above 12px, which also settles audit §3.4's open
question for this layer: every violator could comply, and none needed an
exception.

**One real exception, now declared where it lives.** The Receipt's export card
renders 6.5–8.5px type inside `.sheet`. That type is not chrome: each sheet is a
miniature of a raster authored at 1080px, shown at ~14% so the three ratios can
be compared. So: **a specimen may render below the floor only as a scale model
of an artifact authored at another size, and it must say so.** Miniature is not
chrome. Trap #8's clipping and audit §3.7's 5px ledger number are both this
distinction going unstated.

### `scratch/card-audit.html` — trap #8 stops being a resolution

Trap #8 was "measure a specimen before declaring its viewport", and trap #9 is
that saying so does not work: I declared three viewports shorter than their
content in one session *after* writing the rule down. So it is a tool now. It
loads every card in an iframe at its declared width, reads the card's own bottom
edge, and reports clipping, slack and floor violations in one table.

First run: **8 cards clipped** (postmark by 92px, brand-lockup by 42px) and **29
with more than 24px of dead frame**. All 43 in-tab cards now fit their declared
height with 14px of breathing room; the harness reports 0 clipped, 0 slack, 0
under the floor.

Three things the measurement had to be taught, all of which had been quietly
producing wrong numbers:

- **`scrollHeight` cannot fall below the iframe viewport.** It detects clipping
  and is blind to slack, so a card declaring 900×600 around 124px of content
  measures "600, fits". The card's own bottom edge reports both.
- **Wait for the card's own webfonts, not its load event.** Measuring on
  `onload` reads fallback metrics, which came in ~10px short — inside the 2px
  band the tool exists to detect — and landed on whichever card sorts first,
  every run. `await fr.contentDocument.fonts.ready`. Two consecutive runs now
  return identical numbers on all 54 files; before the fix they did not, and the
  first published pass reported one card 10px shorter than it is.
- **Eleven files in `preview/` have no `@dsCard` marker at all** and are in no
  tab: `brand-aurora-still`, `color-aurora`, `color-functional`,
  `color-primary`, `color-text-opacity`, `material-tiers`, `paper-canvases`,
  `type-hexp-axis`, `type-mono`, `type-sans-body`, `type-serif-display`. Most
  look superseded by a merged card, but a folder of files that read as
  authoritative and are shown to nobody is its own hazard. **Left in place,
  flagged by the harness, not deleted** — deciding which are dead is a reading
  job, not a scripted one.

---

## 2026-08-02 — Tables, forms, loading (audit §3.8, closed)

Three surfaces left on the missing list. None needed what the audit assumed,
and each got a different kind of answer.

### Tables — closed as OUT OF SCOPE, not resolved

There is no table element anywhere in `app/` or `components/`, and no table
primitive. Bills — the most tabular data the product owns — render as cards.
The audit inherited "tables" from a generic list of eleven pattern gaps and
never asked whether this product has any. **Designing one now would be
inventing a transport in order to furnish it**, which is the inverse of the
rule the email work produced.

New `outOfScope` block in `DESIGN.md`, holding this and Spanish. The reason
it exists: in a list of missing things, a gap and a decision look identical.
Anything closed this way records what is already decided in case it ever
lands — for tables, that metadata grids may exceed the 65ch measure and the
ribbon's `compact` variant exists for dense rows.

### Loading — the rule the system never wrote, and a correction I owed

First pass filed the spinner as a violation of `motion.rules` — a rotating
glyph is an element already on screen and already correct, which the
streaming carve-out calls motion. **That was wrong, and the user's objection
is the reason this entry is worth reading.** The spinner was a considered
answer to a real constraint: a five-row skeleton is a lie when one row
arrives, and the front end does not know the count until load time. Production
ahead of a spec that had never addressed unknown cardinality.

The premise still has a hole. **A spinner does not avoid the height claim; it
makes an uninformative one.** The shipped fallbacks reserve `min-h-48` — a
fixed 192px box guessed without a count, exactly like the skeleton's guess,
but carrying no information about what is coming. And it over-reserves, so it
usually settles by shrinking.

What resolves it is that the two claims are not equally knowable. **The lie is
never in the shape. It is in the count.** So render the shape once and stop
claiming quantity:

> A loading state promises the shape of what is coming, never how much of it.
> **Under-reserve, so the settle is always downward.**

One skeleton row, the shortest plausible item, container sized to content, no
`min-h`. One row is the floor of what can arrive, so the card can only grow —
and growth pushes the page down, which is what a page does as it loads.
A shrink pulls content up under a reader's eyes and a thumb already in
motion, which is the failure people actually notice. The rule needs no count,
which was the constraint: **resolving cardinality earlier is an architectural
question, and the design has to be correct without it.**

The spinner keeps one job — in-place indeterminate waits where there is no
shape to promise, like a button mid-submit. Zero results are not a loading
problem at all; that is `card-empty`.

Riders: one skeleton block role to replace `bg-black/5|8|10` at four ad-hoc
heights across six files, one spinner ink value instead of the 20% light /
55% dark split, and three components named `*Skeleton` that contain no
skeleton.

### Forms — Clerk is a profile

Our form layer is three utilities wrapped by three components so thin they
are almost nothing (`input.tsx` is 499 bytes). Every account, sign-in and
profile form is Clerk's, styled through nineteen `--clerk-*` variables.

Session 3's test, second application: *if a transport needs new tokens it is
a register; if it needs the same tokens rendered by poorer machinery, it is a
profile.* Clerk invents nothing — so it is a profile, now written down as
`profilesClerk` so the mapping is a design artifact rather than nineteen
lines in a stylesheet nobody reviews.

Three of the nineteen drift. All three are the unowned kind: a value was
needed, a plausible one was typed, the spec never saw it.

- **warning: yellow-500** where the system says amber-700. Contradicts a
  standing rule — amber is warning, and yellow is not in the palette at all.
  Fixed in spec; the code migrates.
- **success: emerald-500** where the ink value is emerald-700. Adopted as a
  deliberate profile value — Clerk renders success as small solid indicators
  rather than as text, where the soft stop is right.
- **danger: rose-500** where the system's only remaining red is red-600.
  Adopted as a deliberate profile value, for inline validation on Clerk's
  lighter input grounds.

The rest map correctly, including three font weights taken from the Readex
scale deliberately — the tell that this mapping had care in it and simply had
no spec to check against.

### Rejected

**Persisting a last-known count to size the skeleton.** It was in the first
recommendation and it is out: it makes the design depend on a fact the front
end may never have, and it buys a better guess at the cost of a rule that
stops being true when the data layer changes. Under-reserving is correct
without any count at all.

---

## 2026-08-02 — The tab bar, measured (audit §3.7)

The audit asked whether a 12px chrome floor survives five tab labels on a
phone and resolved it on paper by raising the floor. Rendered at 390pt with
the labels production actually ships: **the tension does not exist.** The
widest short label ("Races") measures 53.8px in a 74.8px slot — 72%, about a
quarter spare. Ten pixels was never a constraint anyone met; it is a default
nobody revisited.

The undocumented thing that makes it fit is `shortLabel` — Home, Asks, Races,
Bills, Chat — a field production wrote for exactly this component. **That is
the real design decision in the tab bar and the spec did not know about it.**
Now required, including for org-mode rows, which currently fall back to full
labels not written for a 75px slot.

### What was actually broken, neither of it in the audit

- **No safe-area inset.** `fixed inset-x-0 bottom-0` with `py-2` and no
  `env(safe-area-inset-bottom)` anywhere. On any device with a home indicator
  the labels overlap the system gesture area by about 6px — the bottom of our
  tap target belongs to the OS.
- **Tap targets are whatever the content measures.** A bare link around a
  40px icon span and a label. At 12px: Home 48.0, Asks 43.6, Races 53.8,
  Bills 50.8, Chat 43.3 — so raising the floor lifts three of five clear and
  leaves the two shortest words fractionally under.

That second one produced the more useful rule. `a11y.targetSize` has said
"interactive targets are at least 44×44 px" since the beginning and has been
applied **nowhere**; the only other mention of the number in the document is
inside the emboss's minimum size, where it appears as "a useful coincidence."
A rule stated once at the top and cited by no component is not enforced. So:
**a component with a touch target declares its own minimum**, measured, in
its own spec entry. Arriving at 44 by accident through type size, icon size
and padding is how the tab bar got to 40.

### Adopted from production

- **Composing surfaces surrender the chrome.** The bar hides on
  `/conversation/` and `/action/`. Not a routing detail — it is the phone's
  version of *if the user reads or writes for more than thirty seconds they
  need paper beneath the text*. On 390pt they also need the chrome gone.
- **A curated five, composed from one list.** Seven destinations in the
  sidebar, five in the tab bar, Actions and Tracked demoted to the account
  menu — and both navs built from `Sidebar/nav-items.ts` so they cannot
  drift.

### Known Divergence

Production ships 10px labels and no safe-area inset. Spec ahead on both; the
code migrates. Audit §3.4 had already raised the floor with no chrome
exception, so this is a migration nobody scheduled rather than a decision
anyone made.

### A correction to my own working file

The exploration argued that `a11y` had no 44px rule and that it lived only in
the emboss entry. It has had one all along. The defect is weaker and more
interesting than "the rule is missing": **the rule exists, is correct, and is
cited by nothing.** Landed as written here, not as argued there.

---

## 2026-08-02 — Running the gates (audit §3.3)

The promotion gates were written on 2026-08-01 and never run. This entry is
what happened when they were run against `resistbot/voyager@e3d5242e`.

### The finding

**Six of thirteen statuses were wrong, in both directions.** Three accents
labelled `canonical` had no implementation at all; two labelled `proposed`
were shipped, specimened and load-bearing. One failed PURPOSE outright. And
**zero of thirteen had an owner** — so OWNER, the only gate that costs nothing
to clear, was blocking every promotion in the system. A gate nobody has ever
walked through is not a process; it is a moratorium with paperwork.

The audit also says the inventory holds twelve accents and then lists
thirteen. It was never counted. That is the whole finding in miniature: **the
statuses were remembered, not checked.**

Underneath it, the thing worth carrying forward: an accent's status had been
tracking *how much had been written about it* rather than what existed.
Guilloche is nominated for promotion three times in `DESIGN.md` on the
strength of how interesting it is. The progress ribbon — four call sites, two
variants, a story and a specimen — was never nominated once. That is the exact
failure the gates were invented to stop, and the spec fell into it about the
very accent it nominated.

### What landed

- **An owner.** Jason — head of product & design, The Governance Company. One owner for the whole inventory, and the same name
  fills the governance role this file had left blank since §3.10 was marked
  resolved. Thirteen owners is how you get zero.
- **Promoted: guilloche and the progress ribbon.** Both had cleared
  IMPLEMENTATION, SPECIMEN and PURPOSE before the gates existed. Guilloche is
  the first accent ever walked through `promotion.gates`.
- **Demoted: the seal, the ruled page, the signature line.** None is built.
  The promotion rule's own demotion clause covers it; it had simply never been
  applied to accents that were never built in the first place. Canonical now
  holds three accents that are all real, instead of four where half were
  aspiration.
- **Retired: paper grain.** The one entry that cannot state a communicative
  purpose. Grain states atmosphere, and the system forbids ornament without
  meaning. Cut rather than carried.
- **A new required key on every entry.** *A status is a claim, and a claim
  carries its evidence.* `canonical` entries carry `implementation:`;
  `proposed` entries carry `blocked-on:`. A missing evidence key is a bug —
  and, unlike a status typed from memory, it is greppable. Three of the four
  canonical entries had no `implementation:` key; the one that did was the one
  that was true.

### Two spec bugs fixed

- `tactileAccents.dont` forbade "emboss effects to fake depth" — written
  before the seal became a blind emboss, and never narrowed. **As written it
  forbade the canonical accent.** Audit item #4 (internal contradictions) was
  marked resolved while this one was being created by the resolution of item
  #2. Now narrowed to fake depth on an element that is not paper.
- The rubber stamp's oxblood ENACTED is recorded as a **Known Divergence**.
  Production ships the colour the palette retired in August. Spec ahead; the
  code migrates. Do not un-retire oxblood to match the code.

### The rule that changed for a reason nobody had written down

Guilloche's spec said *procedural only — never raster import*, justified as
legal risk and laziness. Production imports an 800×44 SVG and scales it, which
breaks the rule for neither of those reasons — and the rule as stated missed
the defect it should have caught. **A band authored once and scaled takes its
stroke weight with it.** The specified 0.6px engraving renders at 0.29px on a
390pt phone, under a device pixel, and the band greys into a smear.

This is audit §3.7 recurring: the ledger number reached 5px by exactly this
route. It was caught once, on one artifact, and never generalised. The rule
was right and its stated reason was wrong — "procedural" does not protect us
from a lawsuit, it protects the stroke weight, because a procedural band is
redrawn at the width it is rendered at. **The redraw is owed**; promotion was
granted on the artifact existing, not on it being correct.

### What a signature is — closed the same day, in production's favour

Running the gates surfaced what looked like a flat contradiction: the
signature-line rule said signatures are authored and never simulated, while
the Receipt renders the user's typed account name in Amerika Signature. Two
rules written the same month about the same act. Put to the user, and the
answer went production's way:

> **A signature is a name the constituent affirmed** — by co-signing an ask,
> endorsing a candidate, pledging, sending. The act of signing is what makes
> it a signature. It is not a handwriting sample, and the system was never
> claiming it was one.

So the shipped Receipt has been right all along and the rule was aimed at a
different worry — a decorative script face standing in for a person's mark.
That worry is real, so the rule was **narrowed rather than deleted** — and on
a follow-up correction from the user, narrowed further than the first pass
had it. The licence is **second person only**: the script face renders your
name, on your receipt, for an action you took. Nowhere else.

That excludes more than the first wording did. A co-signer roll, a signer
list, an endorsement feed are other people's names and set in the normal
register — someone else's signature rendered for your eyes is a facsimile of
a mark they did not draw and cannot correct, on an artifact built to be
screenshotted. **The audience is the constraint, not the typeface.** Also
excluded, as before: any name the user did not affirm. Now a top-level
`signature` block; script stays banned as system typography everywhere else.

A useful side effect: the signature LINE stops being a contradiction and
becomes a separate artifact worth building. The Receipt records an act
already taken; the dotted rule at the close of a composed letter anticipates
one. Different jobs, different surfaces.

### Opened, not closed

`openQuestions` is new and holds one thing: **who writes the plain sentence**
for 464,269 bills (carried from §3.1). **Owned as of this session — Tyler,
who owns the summarization pipeline — but not answered.** Lightweight
summaries are already generated in `resistbot/deepspace`; the prompt that
governs them has never been read against this spec. Access was requested and
had not landed by end of session.

The reason this matters more than it sounds: if that prompt does not encode
the lede's rules, then **the voice the newcomer reads was written by whoever
typed the prompt**, not by the system — the same shape as the email brand
navy, and the urgent kind of divergence. The next session's first move is to
read it.

### Spanish, closed as out of scope

Confirmed 2026-08-02: there is no Spanish anywhere in the product. Audit §3.8
listed it as a missing surface; it is not a gap, and a future session should
not design for it speculatively. The warning is kept in the audit rather than
the spec, with one correction to the original framing — the audit costed it
as a layout problem (HEXP-60 chrome, 65ch measures, fixed-width badges) and
the expensive part is **voice**. The newcomer's lede is *one sentence, three
facts, one action* in English idiom; that is a claim about how English
carries plain meaning and may not survive translation.

### Rejected

**Relaxing the guilloche rule to match production.** The shipped SVG is
hand-authored and vector, so it violates neither stated reason for the rule,
and the tidy move was to narrow the rule to permit it. That would have
codified the sub-pixel stroke bug as policy. The rule keeps its teeth and
gains the real reason instead.

**Promoting guilloche alone.** `promotion.priority` had nominated exactly one
accent and it would have been easy to honour that and stop. The progress
ribbon was doing more work in production and had never been mentioned — which
is the more useful half of the finding.

### Carried caveat

Also spotted, not fixed here: the shipped Receipt sets its place-of-issue
caption at `text-[0.6rem]` — **9.6px**, under the 12px floor, on a line
`registers.issued` lists as mandatory at every export ratio. The ledger number
beside it is 12px and clears. Session 3's proof rule is obeyed in production;
the caption under it is not.

---

## 2026-08-02 — Email is a viewport (audit §3.8)

The first item closed with the production repo readable. `resistbot/voyager`
became accessible mid-session, and what it showed reframed the work twice.

### What production had already decided, and what nobody had

Email ships today as `react-email` + Tailwind through Resend, in exactly two
notification types (`welcome`, `cosign.confirmation`). The letter reaching a
legislator — the product's core artifact — has no email at all.

Three kinds of difference, and the third is the one that mattered:

- **Spec ahead** — Merriweather still in `app/layout.tsx`. Known Divergence;
  audit §9 is closed in the spec only.
- **Production ahead** — the hosted asset pipeline, the dark-mode mechanism, the
  hand-authored `text/plain` part, and a signed founder's voice in the welcome
  email that breaks three Content Fundamentals rules and is obviously right.
- **Unowned default** — `brand: "#033271"`, a navy on every button and link in
  the highest-volume surface, plus `bg-white` and the absent serif. Nobody chose
  these; `react-email` did, sensibly, in the absence of a rule. **The system's
  missing surfaces are not blank — they are furnished by whatever library got
  there first.**

### The rejected model, and the one that replaced it

**Rejected: email is the ink layer alone on paper.** Argued at length in
`explorations/The Letter in the Inbox v1.html` and `v2.html`, and wrong. It
treated the email body as a physical sheet, which left the receipt nowhere to
sit and made every message one cream page.

**Landed: an email is a VIEWPORT, not a canvas** — the same role the browser
window plays on the web. Objects are placed into it, so paper appears only where
a paper artifact appears. One message can hold two registers: a live ask on a
card above an issued receipt on paper, which is exactly what the co-sign email
now does.

The reframe paid for itself immediately: **email is the system's
reduced-transparency mode, permanently.** That collapse was already specified in
`colors_and_type.css` — glass drops its blur, becomes solid zinc, layout does
not shift. Nothing was invented for email except `#e7edf4`, a flat stand-in for
the aurora derived by compositing its three lobes over the canvas. It is
deliberately **not** a token: a hex in the token file is a hex someone will use
on the aurora.

### Also landed

- **The type stack**, approved. No web fonts — a webfont reaches a minority of
  clients while blocking render in the rest. Georgia for headings (production
  ships no serif at all), Verdana for chrome because the register is *wide*, and
  a **12px floor**: with no HEXP axis to expand the face, shrinking it is the
  one move that has nothing left to give.
- **Both colour modes required**, with three marks that cannot survive inversion
  and switch rather than darken: the indigo plate (1.02:1 on zinc-800), green
  ink (`--color-success` is a light-mode-on-light value, 2.72:1), and every
  link — a class on a paragraph does not reach its anchors, so an inline link in
  inverted body copy vanishes silently. **The frame inverts; the artifact does
  not:** paper is lit, not swapped.
- **`registers.issued.proof-rule`** — the one change here that edits something
  already shipped. Every issued artifact must state its ledger number as text,
  on screen too. The emboss and the signature are pictures of authority; neither
  survives email, plain text, a screen reader or a forward. The number survives
  all four, so **the number is the proof and the emboss is its illustration**.
- **The founder's letter, named and fenced** to the welcome email only.
- **The navy is retired** from email; the one call to act on each message is a
  green plate with an ink label, per the fill rule.
- **A boundary worth keeping:** an email that is only an artifact is still not
  the artifact. Issued mail is the *notice* of issuance and links to the real
  thing.

### Files

`explorations/Email Iteration 1.html` (four emails, light/dark toggle) ·
`Email - Cosign On System.html` · `Email - Welcome On System.html` ·
`Email - Letter Delivered On System.html` · `Email - Cosign Production Baseline.html` ·
`The Letter in the Inbox v1.html` / `v2.html` (the rejected model, kept) ·
`preview/email-profile.html` · `github.md` (sync record)

### Still open

Tables, forms, loading states and Spanish — each one a transport with a default.
Real-client dark-mode testing. And §3.1's unowned sub-item, which email made
sharper rather than closer: production answers "who writes the plain sentence"
for asks — the user writes their own title, and the subject line is that title
verbatim. It does not extend to 464,269 bills.

---

## 2026-08-02 — Five rooms, four registers (audit §3.5)

The audit asked for three. It is four, and the reason the count moved is worth
more than the count.

### The test

A register earns its place if it differs in **tokens, not adjectives** — the
same test the newcomer's lede was held to in §3.1. Both of the audit's proposed
merges were rendered side by side against real content
(`explorations/Five Rooms or Three.html`). One passed.

### Merged: Reading Room + Commons -> **Live**

Four of five tokens were already identical — material, canvas, lead family,
column. The fifth, motion posture, was the interesting one: the Reading Room
was specced `generous` while `motion.rules` has always sanctioned motion on
**exactly two** surfaces, Receipt and Commons. That was a contradiction, not a
distinction, and it predates this audit.

Resolving it produced a rule the system was missing:

> **Streaming is not motion.** Text arriving token by token, a typing
> indicator, a skeleton resolving into content — that is content *arriving*,
> not the interface moving. It is permitted anywhere and spends nothing from the
> two-surface budget. The test: is the animated element already on screen and
> already correct? Then it is motion and needs a sanctioned surface. Is it
> putting content on screen for the first time? Then it is arrival.

The Reading Room's posture is now `static`, which it always effectively was.

### Not merged: Writing Desk + Receipt

The audit called these "the same room at two moments — compose, then issue."
Good prose; wrong about the tokens. Every one differs — canvas
(`paper-parchment` vs `paper-cream`), geometry, motion, and state
(editable/unsent vs frozen/keepable). And after §3.7 the Receipt carries a
portrait HTML artifact **and** a three-ratio raster export family. A register
that has to describe both is not one register; it is two wearing one name,
which is how five became five in the first place.

**The Receipt is what the Writing Desk produces.** A product is a different
kind of thing from a workspace.

### What landed

- A `registers:` block in `DESIGN.md` **above** `surfaces:` — Live · Reading ·
  Writing · Issued — each with material, canvas, families, column, motion and a
  palette rule. Every surface now carries a `register:` key. Where a surface's
  tokens and its register disagree, **the register wins** and the disagreement
  is a bug.
- **The five room names stay**, as narrative, in the thesis and the prose. They
  are good writing and useful for talking to the team. What was cut is the
  claim that they are five token sets.
- `motion.rules` gains the streaming carve-out; the motion prose restates it.
- README: a five-rooms-four-registers table, and the consuming instructions now
  say *pick the register, not the room*.

### The one real cost

**Palette scoping moved from surface to condition.** "Momentum green is
Commons-only" was a lookup; it no longer resolves once the two rooms share a
register. The rule is now *green appears where a crowd is counted* — a judgement
call rather than a lookup, and the same class of weakness that sharing a hue
between `momentum` and `success` introduced. Mitigation: a dialogue counts no
crowd, so conversation views stay green-free, and green in Live is a report
rather than an affordance per the fill rule.

### Also fixed in passing

The README's surface table had been split in half by the §3.7 paragraph landing
mid-table, leaving the Commons row orphaned outside it. Repaired.

Touched: `DESIGN.md` · `README.md` · `AUDIT-2026-08.md` · `HANDOFF-2026-08.md`

---

## 2026-08-02 — The Receipt is two artifacts (audit §3.7)

The spec said the Receipt was landscape, max-width 56rem, and called it *a
diploma issued by a phone*. Rendered honestly at 390pt
(`explorations/The Receipt on a Phone.html`, column A) the certificate scales to
40%: the guilloche and the emboss survive, because they are tonal and
procedural, and **the type does not** — the ledger number lands near 5px,
five rungs below the 12px floor the system had just finished enforcing.

### The decision

**Two artifacts, not one shape.**

- **Kept — portrait HTML.** Live, selectable, `paper-cream`, single column at
  34rem, bloom at issuance. The caption stacks, the title sets around 27px,
  and the emboss moves inline with the signature rule — where a notary
  presses, over the signature rather than beside it. The 56rem landscape
  column is retired from the screen entirely.
- **Shared — rasterised image, three ratios.** tall 1080×1920 · square
  1080×1080 · wide 1200×675. Each authored at its own pixel size and rendered
  at 2×, **never produced by scaling another** — that is precisely how the
  ledger number reached 5px. Every ratio carries caption, title, ledger
  number, emboss and guilloche; only wide may drop the attribution line.
  Paper is full-bleed; no glass, no aurora, no motion, because a raster has no
  bloom.

**This is source-derived, not invented.** Production already gives people
images in three aspect ratios because platforms crop differently. The spec had
one shape and no export register at all; the shipped behaviour was better than
the documented rule, which is the second time that has happened
(see `RECONCILIATION-2026-08.md`).

### Two riders

- **The guilloche fades on portrait** instead of drawing left-to-right. A
  320pt rule drawing across the screen reads as a loading bar — the one thing
  an issued artifact must never look like. Landscape export has no motion at
  all, so the draw-on now exists nowhere; it is kept in the spec only as the
  mechanic's description for wide HTML surfaces.
- **The emboss has a stated minimum for the first time: 44px at 1×.** Below
  that the highlight and shadow stop resolving as one pressed form. It matches
  the minimum touch target, which is a useful coincidence rather than a reason.

### Consequence for §3.5

Choosing the export family means the Receipt keeps two geometries **by
design**. A register that has to describe both a portrait screen artifact and
a landscape raster family is not one register, so the audit's three-way
collapse is off the table: **four registers — Live · Reading · Writing ·
Issued — is the honest structure.** Awaiting confirmation before that lands.

### Also fixed in passing

The Receipt prose still described *a fully-saturated Oxblood seal* three months
after oxblood was retired and the seal became a blind emboss. Corrected.

Touched: `DESIGN.md` · `README.md` · `preview/receipt-export-ratios.html` ·
`AUDIT-2026-08.md` · `HANDOFF-2026-08.md`

---

## 2026-08-01 — The newcomer's lede (audit §3.1)

The last critical item, and the one the audit ranked first by consequence: the
system had a voice for institutions and a voice for the crowd, and none for the
person who has never read a bill.

### It is a copy-and-hierarchy rule, not a new type register

Three treatments of the same bill were built on a phone
(`explorations/The Newcomer.html`): the Archive default; plain words in the
Archive's dress; and the audit's own proposal — a sans `body-plain` role, 19px,
48ch, on glass instead of paper.

**The audit's proposal was rejected.** Its recommendation was "explicitly *not*
serif", and setting it against real content is what disproved it: at one family
and one weight, the lede, the three facts and the action all landed at the same
value, and nothing told the eye where to start. Plainness had been assigned to
the *typeface*, which then had no range left to build hierarchy with. The serif
scale — 30px title, 20px lede, 14px facts, one filled plate — already does that
work.

**The newcomer is not failed by the serif. They are failed by the words and by
the order.** Fixing the constraint rather than the symptom means the register
costs no new family, no new canvas, and no fourth voice in a system that is
trying to collapse five surfaces to three.

### What landed

- `.role-lede` — Newsreader at `--serif-text`, 1.25rem / 1.55, measure 52ch. One
  scale step in the existing serif, not a new register. Sits directly beneath
  the bill title, **above** provenance.
- **DESIGN.md → The Newcomer's Lede** — the structure (one sentence · three
  facts · one action), the jargon rule with a replacement table, and the
  **thirty-second path** as a first-class flow. `surfaces.archive` gains a
  required `newcomer-lede` key.
- **The jargon rule:** the term never appears alone — it is replaced, or what it
  means follows in the same sentence. *A tooltip is not a gloss; it is jargon
  with a lid on it.* The audit was explicit that a tooltip is not the answer.
- **The statute is a destination, not the landing state.** Paper begins where
  the statutory text begins. The plain voice stops at that door and never
  overwrites the record.
- Fourth tone signature in the README. Kit: `BillDetail` opens with a lede.
  Specimen: `preview/type-newcomer.html`.

### Deliberately not done

- **No new family, canvas, or measure token.** The rejected sans role also moved
  the landing state onto glass; with the lede in the Archive's own type the
  paper canvas stays where it was and one fewer rule has to be taught.
- **No tooltip, no glossary component.** Per the audit, and because a gloss the
  user has to ask for is a gloss for someone who already knows the word.

### Still open, and not a design decision

**Who writes the sentence.** 464,269 bills need one. Generated then reviewed, or
generated and labelled? A plain sentence that is wrong is worse than jargon that
is opaque, because the newcomer cannot tell. Needs a named owner.

Touched: `colors_and_type.css` · `DESIGN.md` · `README.md` ·
`ui_kits/web/{app.css,screens.jsx}` · `preview/type-newcomer.html` ·
`AUDIT-2026-08.md` · `HANDOFF-2026-08.md`

---

## 2026-08-01 — Newsreader replaces Merriweather; the italic rule narrows

Audit §3.9, the last open item, and the only one flagged *discuss first*.

### The serif is Newsreader

Merriweather was drawn in 2011, sits in the Google Fonts top twenty, and reads
*blog* — the one register a legislative record cannot afford. Four alternatives
were set against real content (`explorations/The Serif.html`): Source Serif 4,
Newsreader, Literata, Libre Caslon Text.

**Newsreader wins on structure, not taste.** It is a Scotch roman — the face of
the nineteenth-century press and the printed record — but the deciding factor is
its **optical-size axis**. Worth correcting the audit here: Merriweather *is*
variable on weight, which the audit understated. What it has no axis for is
optical size, so one drawing had to serve both a 38px bill title and 15px
statutory text. Newsreader has `opsz` 6–72 and serves both properly.

Libre Caslon was the strongest *argument* — Caslon set the Declaration and the
first printings of the Constitution — and was rejected because it is static
400/700. No 800, no optical axis; adopting it would have made the display
register lighter than before.

### Two optical stops, not one

The first pass set `opsz` to 72 everywhere, which is the display extreme, where
a Scotch roman thins its hairlines hardest — body text came out far too fine.
Three tokens now:

| token | stop | use |
|---|---|---|
| `--serif-display` | opsz 60 / wght 800 | headings, bill titles, Receipt |
| `--serif-text` | opsz 16 / wght 450 | body, statute, analysis |
| `--serif-quote` | opsz 24 / wght 400 | quoted voice, 18px and up |

Text weight is 450 rather than 400 — a half-step that reads sturdy rather than
heavy, and it matters most on lamplit dark-room paper, where a fine stroke loses
contrast against the warm tan. **Never set one opsz value for both ends**; that
is the mistake the axis exists to prevent, and it is now written into the token,
the spec, and the kit header.

### Serif italic is reserved for quoted human voice

Newsreader's italic is a true calligraphic italic — single-storey *a*, real
entry strokes — lovely at 20px and genuinely hard at 14. That is not a fault in
the face. **The old rule was asking small italic to do too much**, and it would
have recurred with Literata or Libre Caslon just the same; Merriweather's italic
is simply flat enough to hide it.

- `.role-metadata-italic` → `.role-metadata`, serif **roman** at opsz 16 /
  wght 420 (old class kept as a deprecated alias).
- New `.role-quote`: serif italic, `--serif-quote`, **1.125rem minimum**. A
  constituent's words, a pull quote, an epigraph — never metadata.
- Kit: `.msg-meta`, `.receipt__sub`, `.bill-row__meta`, `.sponsor__meta` and
  `.salutation` all moved off small italic.

Touched: `colors_and_type.css` · `DESIGN.md` · `README.md` · `ui_kits/web/app.css` ·
`preview/{type-roles,type-citizen,type-serif-display}.html` ·
`proposed/design-system/{tokens/tokens.json,patterns/print.md,HISTORY.md}`

**This closes every open item in the August audit.**

---

## 2026-08-01 — the aurora constraint, measured and rewritten

### The old rule was false, and the real one is about placement

The standing constraints said the aurora was three lobes, low chroma,
monochromatic, no violet — and that opacity-based text depended on it.
Production has shipped a five-lobe curtain at hues 150–290, chroma to 0.21,
violet included, above the fold. Rather than argue the rule, I measured it:
both aurora stacks modelled from the real declarations, oklch converted to
sRGB, each lobe's alpha ramped to its transparent stop, composited in order,
sampled on a 26 × 14 grid. Worst case, not average.

|  | inside the band | below the band | needs |
|---|---|---|---|
| 87% ink · light | 10.23 | 14.19 | 4.50 |
| 87% ink · dark | **3.53** | 12.80 | 4.50 |
| 55% ink · light | **4.10** | 4.58 | 4.50 |
| 55% ink · dark | **2.32** | 5.89 | 4.50 |

**Monochrome was never the mechanism. Placement is.** Below the curtain the
canvas falls back to the plain Blue Hour and every rung behaves exactly as
documented. Inside the band nothing is safe — in the dark room even primary
ink measures 3.53:1.

What saves the product today is the composition, not the palette: the hero
headline and both buttons sit well clear of the band. So the rewritten rule
ratifies the design and forbids the thing nobody has done yet — setting a
caption or a control in the light.

- `a11y.contrast` rewritten with the mechanism, the measured table, the band
  geometry, and a `material-chrome` exception for the navbar and eyebrow strip.
- **The violet ban narrows** to what it always meant: no violet *accents* —
  button, badge, chip, stamp, type. Low-opacity light in an ambient gradient is
  not an accent, and the curtain's 290 lobe is permitted.
- "Do not broaden the aurora's hue range" replaced with "do not set bare text
  inside the band", which is the rule that is actually load-bearing.
- Hard limits kept so the curtain stays bounded: chroma ≤ 0.22, ≤ 5 lobes,
  and no widening or moving the band without re-measuring.

### The signature face is permitted — for signatures

Heritage banned script faces outright; production ships one with a
`signature-write` keyframe. The ban **narrows**: script is still forbidden as
system typography — headings, display, UI, absolutely. It is permitted for
rendering a person's name at the moment they put it to something: a co-sign,
an endorsement, a vote-pledge, a sent letter. That is not typography, it is an
artifact of an act. An uploaded signature image still wins where one exists.
New `--font-signature` token and `.role-signature`.

### Font-weight scales — divergence recorded, direction settled

Spec holds at one scale; production has four. New **Known Divergence** section
in `DESIGN.md`: the spec is right, the code migrates, and the spec must not
drift back to match. Author new work against the single scale.

---

## 2026-08-01 (final) — the seal becomes an emboss; the fill rule is decided

### There is no red left in this system except semantic danger

Oxblood survived the action-colour change as the wax seal. It does not survive this
one. The reason is that we kept asking a *printing* question: a registrar's seal, a
notary's seal, a corporate seal — none of them are printed. They are **pressed**. The
mark is a deformation of the paper, not pigment applied to it. And a mark that appears
once, on an artifact already earned, has no business being the heaviest object on the
page.

The seal is now a **blind emboss**: highlight up-left, warm shadow down-right, an inner
rule for the die's border, no ink. It requires paper — an emboss has nothing to press
into on glass or aurora — and it reads *better* in the dark room, because lamplit paper
is warmer so the shadow deepens.

- `--color-seal-*` deleted. Replaced by `--seal-highlight` / `--seal-shadow` /
  `--seal-bite`, which are shadow values on paper, not a brand accent.
- New `.seal-emboss` role in `colors_and_type.css` (+ `--sm` / `--lg`).
- Kit: `WaxSeal` → `Seal`, reimplemented as the emboss; `WaxSeal` kept as a deprecated
  alias. `ReceiptScreen` updated.
- New **Brand — The seal** specimen on daylight and lamplit paper.

The finished Receipt now carries exactly one coloured mark: the signature.

### The fill rule — decided

**A green plate is a control; green ink is a report.** Fill means *press me*. Anything
green that is not a filled plate — a numeral, a chip, a stamp, a rule, a check — is
reporting a fact that is already true. Meters, bars, and ribbons are exempt: they encode
quantity, not affordance.

Rejected: *filled = it happened, outline = it is available*. It reads well on a checkbox
and fails here for two reasons — it ghosts the primary action, which is the whole thing
the bright green exists to make findable, and it turns every completed state into a
filled plate, so the page ends up looking like nothing but buttons.

Where A's quietness on completed states is a problem, the answer is a one-off **bloom**
at the moment of the act, not a permanently heavier badge. The system already has that
mechanic and it already means exactly this.

Written into `DESIGN.md` (`color.momentum.fill-rule` and *Color as a Civic Register*)
and `README.md`. The folder-tab steps were already depending on it.

---

## 2026-08-01 (last) — oxblood reconciled system-wide, and the caret widened

### Oxblood now means one thing

Retiring oxblood from the action slot left it half-applied across the system. Every
remaining use is now resolved against one rule: **oxblood is the wax seal, a mark
pressed onto an ISSUED artifact, and nothing else.**

| Was oxblood | Now |
|---|---|
| `.btn--cta`, `.fab` | Action green, flat. The radial gradient went with it — a bright fill does not need one, and a gradient under an ink label muddies the contrast the label depends on. |
| `.wax-avatar` | `.avatar`, Midnight Indigo. An avatar is the user's trail, which is what the primary ink means. `.wax-avatar` kept as a deprecated alias. |
| Navbar lockup (`app.jsx` used `WaxSeal`) | `mark.svg`. A seal in persistent chrome was a straight rule violation. |
| Reading Room inline citations, blockquote left bar | Midnight Indigo. A citation is a trail into a source — and it is clickable, so oxblood cannot touch it. |
| Rubber stamp, positive status | Action green. Success and action are one hue now, so a red **ENACTED** contradicted the palette. Oxblood left the stamp palette entirely. |
| Folder-tab step: active oxblood / complete slate | Active **Midnight Indigo** (where you *are* = the trail), complete **action green** (a thing that *happened*). This is the fill rule doing real work. |
| `.sponsor__caucus--r` | Unchanged at `#991b1b`, but decoupled and commented: caucus colours are **data**, not brand. They were picked to coordinate with an oxblood action colour and must not now be re-derived from the palette. |

**Kept:** the post-send confirmation stamp, the Receipt seal, the envelope postage
corner, and the Receipt bloom's seal-drop. Each is a mark on something issued.

Touched: `DESIGN.md` · `README.md` · `ui_kits/web/{app.css,app.jsx,civic.jsx,components.jsx}` ·
`preview/{color-accents,avatar-waxseal,fab,buttons,surface-commons}.html` ·
`proposed/design-system/{tokens/tokens.json,HISTORY.md,patterns/data-viz.md,patterns/forms.md}`

### The caret went wider, not steeper

First correction made it a filled triangle; second made it steeper. Both wrong.
Steepening a mark makes it *more* letter-shaped, because letters are tall and narrow.
The caret now sits at a **95° apex** (30.5 × 14 units against the 56px em), past the
point where any Readex Pro capital could be that squat — so it stops competing with
the letterforms. Stroke stays at 3.2 against the type's 4.2 stem.

---

## 2026-08-01 (later still) — the wordmark loses its terminal period

The wordmark shipped with an Oxblood full stop that was never adopted in product —
neither production screenshot renders it. Dropped on two grounds. A full stop means
*this sentence is finished*, and the thesis is that the rule of law is a living
document the people keep writing; the punctuation contradicted the product. And with
Oxblood retired to the wax seal, a red period in persistent chrome would have been the
last place red survived as decoration rather than as a mark on an issued artifact.

**Sanctioned alternative where there is room:** the proofreader's insertion caret.
`‸` means *something goes here* — a real editorial and legislative artifact, and the
literal gesture of amending a text. Drawn as an open two-stroke angle at the wordmark's
own stem weight, never a filled triangle. **Not for persistent chrome:** beside
dropdowns, sort headers, and collapse toggles it reads as an affordance before it reads
as punctuation.

New assets: `wordmark.svg` (rebuilt, no terminal mark), `wordmark-cutout.svg`
(knockout — a real gap, dark chrome had none), `wordmark-caret.svg`,
`wordmark-caret-cutout.svg`. `assets/README.md` and the Brand — Wordmark specimen
updated. Geometry measured against the live font rather than guessed: "AMENDMENT" sets
to 487.2 units at 56 / 430 / 2.8, so the viewBox tightened from 560 to 490.

---

## 2026-08-01 (later) — §3.2 resolved: one action colour, and a source reconciliation

### The action colour is Momentum green `oklch(.66 .148 160)`

Oxblood is retired from every interactive surface — CTA, FAB, avatars. It failed four
ways: it shared a hue with `--color-danger` (Send looked like Delete), sat at L .35
against an L .22 dark canvas, muddied against Midnight Indigo, and was stock red-900
in the system's most meaning-bearing slot.

**It survives as `color.seal`** — the wax seal, and only the wax seal. Wax is red; a
control is not. The kit ships `WaxSeal` and uses it on the letter receipt, so the mark
is real even though the co-sign receipt carries none.

**Action and momentum are now one token.** Co-signing *is* joining; a constituent
signing and the counter moving are one event seen twice. `--color-momentum` aliases
`--color-action`; `--color-momentum-on-dark` is retired — a bright accent needs no
dark-mode variant.

**The label is ink, not white.** At L .66 white measures 2.90:1 and ink 6.42:1. Below
about L .55 that reverses, and between L .55–.60 *neither* clears 4.5:1 — a saturated
green sits almost exactly between white and black there. This inverts the CTA against
the ink button: navigation is dark-with-light-type, action is light-with-dark-type, so
the two cannot be confused at any size, in any room, or in grayscale (5.04:1
desaturated separation, against 2.53:1 for a deep green).

**Pressed states are newly constrained.** A bright fill has ~6 points of lightness
headroom before the ink label fails; beyond that, pressed must come from ring or inset,
never more fill. New section in `DESIGN.md`.

### Reconciled against voyager `globals.css`

First source-derived pass this project has had. Full findings in
`RECONCILIATION-2026-08.md`. Adopted here:

- **Dark-mode paper is a desk lamp.** Both prior accounts were wrong — the spec said
  paper renders identically in both modes; this stylesheet darkened it to near-black.
  Production keeps it light and warms it to lamp temperature under two viewport-anchored
  light pools. Now shipped verbatim and corrected in the spec.
- **The green is sampled from `--aurora-curtain`**, which ships five chromatic lobes the
  spec does not admit exist. That made §3.2's premise wrong in a useful way: the ownable
  colour did not need authoring, only recognising.

### Also fixed — a Phase 1 regression

`ui_kits/web/app.css` still shipped `.sig-line__label` at 10px and `.receipt__caption`
at 11px — two of the exact violations the entry below claims were raised to the 12px
floor. The spec was edited last turn; the code was not. Both are 12px now.

### Files touched

`colors_and_type.css` · `DESIGN.md` · `README.md` · `ui_kits/web/app.css` ·
`RECONCILIATION-2026-08.md` (new) · `explorations/` (2 new sheets)

### Still open — needs a human decision

1. **The fill rule.** Action and success are one hue; filled vs unfilled has to carry the
   difference. Not yet written.
2. **The aurora constraint.** `--aurora-curtain` ships five lobes at hues 150–290 and
   chroma 0.15–0.21, including violet. The standing constraints forbid all of it.
   Production has been ignoring the rule; the rule should probably narrow. Not changed
   unilaterally.
3. **The signature typeface.** `--font-amerika-signature` ships with a `signature-write`
   keyframe. Heritage explicitly rules script faces out. Production wins on quality.
4. **Weight scales.** Four in production, one in the spec. The spec is ahead; either the
   code follows or the spec concedes.
5. **§3.9 Merriweather** — still held, untouched.

---

## 2026-08-01 — Phase 1 of the August audit

Source: `AUDIT-2026-08.md` §4 Phase 1. Cheap, unblocking, no visual redesign.
Nothing in §2 ("do not touch — they are the good part") was altered.

### Contradictions resolved (§3.4)

| Was | Now |
|---|---|
| `navbar` transparent at scroll 0, chrome at ≥48px — contradicting motion.rules and the prose | Always `material-chrome`. Prose wins; the component entry now carries the reason the scroll variant was removed. |
| "three elevation tiers" in *What NOT to Do*, five tiers in the `elevation:` block | Five named tiers everywhere — `flat`, `whisper`, `raised`, `floating`, `chrome`. Whisper and chrome each have a real job. |
| 12px type floor stated, then violated at 10px (tab-bar labels, signature-line label, ribbon milestone labels) and 11px (line numbers) | All raised to 12px. The floor rule now says explicitly that there is **no chrome exception**. |
| `momentum.emerald*` identical in value to `semantic.success*` under two names | Documented as aliases, not forked. The Commons-only scoping rule is editorial and enforced in review — not by the token layer. |
| `momentum.emerald-dark: #34d399` — named "dark" but lighter than the base | Renamed `momentum.emerald-onDark` / `--color-momentum-on-dark`. It is a dark-*mode* substitute, not a darker value. |
| `assets/README.md` described the mark as "flag bars"; the spec forbids nationalist iconography | Renamed to **chamber columns**. The geometry never changed — only the wrong name for it. |
| No stated color-space rule (hex, oklch, and `rgb(… / %)` all in use) | Stated at the top of the `color:` block: oklch for anything authored; hex only where it aliases an annotated Tailwind default; opacity-on-black/white for text and borders, because those must composite over glass, paper, and aurora alike. |

### One font-weight scale (§3.6)

`typography.fontWeights.sans-light` and `.sans-dark` (nine paired values each)
collapsed to a single `sans` scale. Dark-mode optical bloom is real but only
visible at display sizes, so it is corrected once in the CSS layer on the
display roles rather than by a parallel scale every contributor must track.
`colors_and_type.css` already shipped one scale; the spec now matches it.

### Tactile accents cut twelve → four (§3.3)

**Canonical:** rubber-stamp status, wax seal, ruled page, signature line.

**Moved to `tactileAccents.proposed`:** postmark, jurisdiction seal, line
numbers, folder-tab step, lapel-pin, progress ribbon, paper grain, envelope
preview, guilloche. Their full specs are preserved verbatim — nothing was
deleted, only re-labelled as unsanctioned. Surface `skeuomorphic-accents`
lists mark them `[proposed]` inline so a reader of a single surface entry
cannot miss it.

**New:** `tactileAccents.promotion` — the four gates (named owner, shipped
implementation, specimen in `preview/`, stated communicative purpose) and the
matching demotion rule. Guilloche is flagged as first in line.

### Governance added (§3.10)

New **Governance** section in `DESIGN.md`: ownership, how a change lands
(ship → spec → changelog, in that order), promotion and demotion, quarterly
reconciliation against the codebase, and this file.

### Files touched

`DESIGN.md` · `README.md` · `assets/README.md` · `colors_and_type.css` · `CHANGELOG.md` (new)

### Not done — still open from the audit

- §3.5 collapse five surfaces to three registers *(Phase 2)*
- §3.1 newcomer register — the critical one *(Phase 3)*
- §3.2 one ownable color; needs the 4–6 oxblood swatch exploration first *(Phase 3)*
- §3.7 mobile, incl. the Receipt's unresolved portrait behavior *(Phase 3)*
- §3.8 email, Spanish, printed letter, and the `proposed/` pattern list *(Phase 4)*
- §3.9 Merriweather — held for human decision; do not act unilaterally
- Fold all of the above into the `proposed/` file restructuring rather than
  re-doing it
