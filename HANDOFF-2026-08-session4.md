# Handoff — Amendment Design System, August 2026 (session 4)

**Read this, then `HANDOFF-2026-08-session3.md`, then session 2, then session 1,
then `DESIGN.md`.** Nothing in the earlier memos was reversed. This one covers
the shift in what the work *is*, the two people who now own things, what closed
(most of the audit), and three new traps — two of which cost real turns.

---

## 1 · The shift: the system's problem is no longer missing rules

Sessions 1–3 found gaps and wrote rules. This session found that **the rules
were already there and nobody had applied them.** Four of four items went this
way, and it was not a coincidence:

- **§3.3 accents** — the inventory had been cut and the four promotion gates
  written on 2026-08-01. They had never been *run*. Run against the repo, six
  of thirteen statuses were wrong in both directions.
- **The 44px touch floor** — `a11y.targetSize` has said "interactive targets are
  at least 44×44 px" since the beginning and is cited by no component. The tab
  bar ships targets as narrow as 40px.
- **The 12px chrome floor** — audit §3.4 raised it and declared no chrome
  exception without checking whether any of the four violating components could
  comply. (They can. Nobody looked.)
- **`motion.rules`' streaming carve-out** — written in session 2 to resolve the
  Reading Room's motion posture. It also, unnoticed, made the spinner illegal
  for content loading, which nobody spotted for a month.

So the useful question changed from *what is missing?* to **what is written and
unenforced?** That produced this session's one reusable rule:

> **A status is a claim, and a claim carries its evidence.** Every `canonical`
> accent names the file it ships in (`implementation:`); every `proposed` one
> names the gate it is stuck at (`blocked-on:`). A status with no evidence key
> is a bug — and unlike a status typed from memory, it is greppable.

Generalise it when you touch anything else: **a rule stated once at the top and
cited by no component is not enforced.** `a11y.targetSize` is the proof.

---

## 2 · Ownership exists now

This was the single biggest unblock and it cost one plain question.

- **Jason** — head of product & design, The Governance Company. Owns the design
  system, the whole accent inventory, and the governance role `CHANGELOG.md`
  had left blank since §3.10 was marked resolved. **Zero of thirteen accents
  had an owner**, so OWNER — the only gate that costs nothing — was blocking
  every promotion in the system. A gate nobody has walked through is not a
  process; it is a moratorium with paperwork.
- **Tyler** — owns the summarization pipeline, and therefore
  `openQuestions.who-writes-the-plain-sentence`. Owned, **not answered** (§4).

Ask for names early. Two of this session's three biggest unblocks were a person,
not a design.

---

## 3 · Where the audit stands

**Nine of ten resolved.** #6 is partial *by design* — direction settled,
recorded as a Known Divergence, no decision to make. The table at the top of
`AUDIT-2026-08.md` is authoritative.

| # | Item | State |
|---|---|---|
| 1 | Newcomer register | ✅ — sub-item now owned (Tyler) |
| 2 | Ownable colour | ✅ Momentum green |
| 3 | Tactile accents | ✅ — by *running* the gates, not re-cutting the list |
| 4 | Internal contradictions | ✅ — one more found and fixed this session |
| 5 | Five surfaces → three | ✅ four registers |
| 6 | Dual weight scales | **partial by design** — Known Divergence, do not drift back |
| 7 | Mobile assumed | ✅ — tab bar specified, measured at 390pt. Column tokens open |
| 8 | Missing surfaces | ✅ — except the printed letter |
| 9 | Merriweather | ✅ in spec; production still ships it |
| 10 | Governance | ✅ — **owner named** |

---

## 4 · What session 4 closed

### §3.3 — the gates, run for the first time

Guilloche and the progress ribbon **promoted** (both shipped and load-bearing
while labelled `proposed`). The seal, the ruled page and the signature line
**demoted** (none is built; the ruled page's only trace in production is a CSS
comment saying what it pairs with). Paper grain **retired** for failing PURPOSE.

Two spec bugs fixed: `tactileAccents.dont` forbade "emboss effects", which as
written banned the canonical blind emboss; and the rubber stamp's oxblood
ENACTED is recorded as a Known Divergence rather than un-retiring the colour.

**The finding worth carrying:** an accent's status had been tracking *how much
had been written about it*, not what existed. Guilloche is nominated three times
in `DESIGN.md` on the strength of how interesting it is; the progress ribbon,
shipped in four call sites, was never nominated once.

**Guilloche's rule was right for a reason nobody had written down.** "Procedural
only" was justified as legal risk and laziness. The real reason is stroke
weight: production imports an 800×44 SVG and scales it, so the specified 0.6px
engraving renders at **0.29px on a 390pt phone** and greys into a smear. That is
audit §3.7 recurring — the ledger number reached 5px by exactly this route,
caught once and never generalised. The redraw is owed; promotion was granted on
the artifact existing, not on it being correct.

### §3.7 — the tab bar, measured

The audit's premise was wrong twice. The 12px floor was never in tension with
five tab labels (widest uses 72% of its slot), and the two real defects were not
in the audit: **no safe-area inset** (~6px overlap with the home indicator) and
**tap targets sized by their content** (as narrow as 40px). What makes 12px fit
is `shortLabel` — a field production wrote for this component, undocumented
until now, and the real design decision in it.

Adopted from production: **composing surfaces surrender the chrome** (the bar
hides on `/conversation/` and `/action/` — the phone's version of *reading or
writing for thirty seconds needs paper*), and the tab bar is a curated five
composed from the same list as the sidebar so the two cannot drift.

### §3.8's remainder — three different kinds of nothing

- **Tables — out of scope.** There is no `<table>` anywhere in the product.
  Designing one would be inventing a transport in order to furnish it.
- **Loading — got the rule it lacked.** See §5; this is the one the user
  corrected and it came out better.
- **Forms — Clerk is a profile.** Nineteen `--clerk-*` variables hand our
  palette to their components; no new tokens, so it is a profile, not a
  register — the second user of session 3's mechanism. Three values drift; one
  (yellow-500 for warning) contradicts a standing rule and is fixed in spec.

New **`outOfScope:`** block holds tables and Spanish with their reasoning,
because *in a list of missing things, a gap and a decision look identical.*

### Two questions the user answered

- **What is a signature?** Production was right. A signature is a name the
  constituent affirmed — the act of signing makes it one; it is not a
  handwriting sample. Narrowed rather than deleted, then narrowed again on a
  follow-up correction to **second person only**: your name, your receipt, your
  action. A co-signer roll is other people's names and sets in the normal
  register. **The audience is the constraint, not the typeface.**
- **Spanish** — none exists in the product. Closed as out of scope, with the
  warning kept for whoever picks it up: the audit costed it as layout and the
  expensive part is *voice*.

---

## 5 · The correction that produced the best rule

I filed the spinner as a violation of `motion.rules`. The user pushed back: a
five-row skeleton is a lie when one row arrives, and **the front end does not
know the count until load time.** That is correct, it makes the spinner
production-ahead rather than an unowned default, and my framing was wrong.

The premise still had a hole worth rendering: **a spinner does not avoid the
height claim, it makes an uninformative one.** `min-h-48` is a fixed 192px guess
made without a count — the same guess, carrying no information, and it
over-reserves so it usually settles by *shrinking*.

What resolved it is that the two claims are not equally knowable:

> **The lie is never in the shape. It is in the count.**
> A loading state promises the shape of what is coming, never how much of it.
> **Under-reserve, so the settle is always downward.**

One row — the shortest plausible item — container sized to content, no
`min-height`. One row is the floor of what can arrive, so the card can only
grow, and growth pushes the page down, which is what a page does as it loads. A
shrink pulls content up under a reader's eyes and a thumb already moving.

**Explicitly rejected: persisting a last-known count.** It was in my first
recommendation. It makes the design depend on a fact the front end may never
have. The user's second message — *resolving that is a technical issue, so how
should we handle it in the design?* — is the right instinct and worth copying:
**a design rule that needs the data layer to change is not a design rule.**

---

## 6 · What is still open, with the first move for each

### The printed letter — the last of §3.8
A physical artifact the user prints and mails. `proposed/` lists a print
stylesheet; the letter needs its own treatment. Note it interacts with the
signature decision (§4) — a printed letter is where an *actual* signature goes.

### Mobile-first column tokens — the last of §3.7
Every column-width token is written desktop-first. An hour's work. Start from
the tab-bar entry, which is now the only component with real measured mobile
geometry.

### `preview/_card.css` — recommended in sessions 1, 2, 3 and still not done
**Do this before the next system-wide change.** 44 cards, every one hand-written
with inline styles. It is no longer a tidiness argument: I missed a card's
declared viewport three times this session and shipped a card that broke its own
rule, and hand-authoring every card is the mechanism.

### Six code fixes now owed to production, none ticketed
Guilloche redraw · the Receipt's 9.6px place-of-issue caption (under the floor,
on a line `registers.issued` marks mandatory) · oxblood ENACTED · tab-bar 10px
labels, safe-area inset and 44px minimums · skeleton token migration · Clerk's
yellow warning. Every one is spec-ahead. **Ask who owns each before assuming
Jason does.**

### Blocked
- **`resistbot/deepspace`** — 404s under `resistbot`, `putorti` and
  `deepvest-ai`; a pending org approval. It holds the prompt that generates bill
  summaries. **First move when access lands:** read that prompt against
  `surfaces.archive.newcomer-lede`. Three outcomes, three different fixes, and
  the third is urgent — if the prompt encodes no rules, the voice the newcomer
  reads was written by whoever typed it, which is the email-navy shape.
- **Real-client dark-mode testing** on the three emails (carried from session 3).

---

## 7 · Traps — six still hold, three more now

Sessions 1–3's six are unchanged. Read them. Three additions:

**7 · A bounded search is not evidence of absence. `[new]`**
`github_search_code` scans a subset in path order and *says so in its own
output*. A first pass over `app/` found no Receipt implementation, and I got as
far as drafting the finding "the entire bloom is five unused keyframes" before
checking — `components/receipt/` simply sorts past the scan cutoff. It is fully
built. **Scope with `path_prefix` and re-run before concluding something does
not exist**, especially when the absence is the interesting part. The more a
missing thing would make a good finding, the harder you should look for it.

**8 · Measure a specimen before declaring its viewport. `[new]`**
Three cards in one session declared a `@dsCard` viewport shorter than their
content — 620 vs 778, 430 vs 612, 560 vs 731. Every one clipped silently: the
top half looked complete and the bottom third vanished, including, twice, the
rule the card existed to state. Saying "I'll measure from now on" did not work
(I said it, then did it again on the next card). **Make it a step: write the
card, measure `document.documentElement.scrollHeight` at the declared width,
then write the marker.**

**9 · Trap #6 is not learnable by intention — four sessions running. `[new]`**
The card establishing the 12px floor shipped a 10.5px caption (session 3). The
card arguing that loading states must not misstate quantity shipped a column
headed "Five rows" containing four (session 4). Same shape, both times caught by
verification rather than by me. **Before publishing a specimen, apply its own
stated rule to it as an explicit checklist** — count the thing it says to count,
measure the thing it says to measure.

Worth repeating from session 3, because it held again: **almost everything on
this list was caught by the verifier, not by me.** Let the check run and read it
properly. It also caught a 4.07 contrast failure on saturated red at 12px sitting
bare on the aurora — the "no bare text inside the curtain band" problem
occurring *outside* the band, because the lobes lighten the canvas everywhere.

---

## 8 · How to work here

Unchanged, and it kept working.

**Show an artifact and ask the user to decide.** Four decisions, four
`explorations/` files, each arguing with real content and ending in a numbered
ask with a stated recommendation. Two of the four came back corrected, and both
corrections were better than what I proposed.

**Ask plainly.** "Name an owner" came back as *"I don't understand what you mean
by owner"* — the question was written in system jargon. Restated in plain
English, it was answered in one line, and it unblocked the whole session.

**Measure instead of arguing.** The tab bar's central question had been open
since the audit and took one render at 390pt to settle. The guilloche's stroke
defect is invisible in prose and obvious in a side-by-side.

**Then land it in one pass** — token layer, `DESIGN.md`, `README.md`, the
specimen, the audit table, `github.md`, and `CHANGELOG.md` with the reasoning
*and the rejected alternative*. Four handoffs have now been possible because the
changelog records why.

### Files added this session

`explorations/Running the Gates.html` · `explorations/The Tab Bar at 390.html` ·
`explorations/Tables, Forms, Loading.html` ·
`explorations/Loading Without a Count.html` · `preview/accent-inventory.html` ·
`preview/tabbar.html` · `preview/loading.html`

### Files substantially changed

`DESIGN.md` — `tactileAccents` restructured with evidence keys; `components.tabbar`
from 7 lines to a full spec; `a11y.targetSize`; new top-level `signature`,
`openQuestions`, `outOfScope`, `loading` and `profilesClerk` blocks ·
`colors_and_type.css` — `--skeleton-block`, `--spinner-ink`, `.skeleton-block`,
`.spinner-inline` · `README.md` · `CHANGELOG.md` · `AUDIT-2026-08.md` ·
`github.md`
