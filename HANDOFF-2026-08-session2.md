# Handoff — Amendment Design System, August 2026 (session 2)

**Read this, then `HANDOFF-2026-08.md` (session 1), then `DESIGN.md`.** Session 1's
memo is still accurate about the ink/aurora thesis, the action colour, the serif,
and the seal — do not re-litigate any of that. This memo covers what session 2
closed, the one decision that reversed an audit recommendation, and the four
traps (session 1 listed three; there is a fourth now, and I fell into it twice).

---

## 1 · Where the audit stands

Six of ten items resolved; four remain. Status table at the top of
`AUDIT-2026-08.md` is current and authoritative.

| # | Item | State |
|---|---|---|
| 1 | Newcomer register | ✅ **the lede** — one sub-item unowned |
| 2 | Ownable colour | ✅ Momentum green |
| 3 | Twelve tactile accents | **partial** — inventory not cut, gate unwritten |
| 4 | Internal contradictions | ✅ (+3 more found by reconciling) |
| 5 | Five surfaces → three | ✅ **four registers, not three** |
| 6 | Dual weight scales | **partial** — code migration, no decision needed |
| 7 | Mobile assumed | **partial** — Receipt resolved, tab bar open |
| 8 | Missing surfaces | **open, untouched** — email is the big one |
| 9 | Merriweather | ✅ Newsreader, three optical stops |
| 10 | Governance | ✅ |

---

## 2 · What session 2 closed

### §3.1 — the newcomer's lede, and an audit recommendation rejected

The audit prescribed *"a plain-language type role, explicitly **not** serif."* I
built it — sans, 19px, 48ch, on glass — set it against a real bill on a phone,
and it read flat: lede, facts and action all landed at the same value and nothing
told the eye where to start. **Plainness had been assigned to the typeface, which
then had no range left to build hierarchy with.**

What shipped instead is a copy-and-hierarchy rule in the Archive's own type:

- `.role-lede` — Newsreader at `--serif-text`, 1.25rem / 1.55, **52ch**. One step
  up the existing serif scale, not a new register. Sits directly beneath the bill
  title, **above** provenance.
- Structure: **one sentence · three facts · one action.** Second person, present
  tense, what the bill does *to the reader*.
- **The jargon rule:** the term never appears alone — it is replaced, or what it
  means follows in the same sentence, same voice. *A tooltip is not a gloss; it is
  jargon with a lid on it.*
- The **thirty-second path** as a first-class flow. The plain voice stops at the
  door to the statute and never overwrites the record.

The generalisable lesson, and it got used twice more the same session: **a
register earns its place if it differs in tokens, not adjectives.**

### §3.7 — the Receipt is two artifacts

The spec said landscape, 56rem, and called the Receipt *a diploma issued by a
phone*. Rendered honestly at 390pt it scales to 40%: guilloche and emboss
survive (tonal, procedural), **the type does not** — the ledger number lands near
5px, five rungs under the 12px floor.

- **Kept artifact — portrait HTML.** `paper-cream`, single column 34rem, bloom at
  issuance. The emboss moved **inline with the signature rule**: a notary presses
  over the signature, not beside it.
- **Shared artifact — raster, three ratios.** tall 1080×1920 · square 1080×1080 ·
  wide 1200×675. Each **authored at its own pixel size and rendered at 2×, never
  scaled from another** — scaling is precisely how the ledger number reached 5px.
  Only wide may drop the attribution line. Paper full-bleed; no glass, no aurora,
  no motion — a raster has no bloom.

**This was source-derived, not invented.** The user told me production already
gives people three aspect ratios because platforms crop differently. The spec had
one shape and no export register at all. That is session 1's trap #2 paying off a
second time: *the shipped artifact was better than the documented rule.*

Riders: the guilloche **fades** on portrait instead of drawing left-to-right (a
320pt rule drawing across reads as a loading bar, the one thing an issued artifact
must never look like), and the emboss now has a stated **44px floor**.

### §3.5 — five rooms, four registers

The audit asked for three. Both proposed merges were rendered side by side. One
held.

**Merged — Reading Room + Commons → `live`.** Four of five tokens were already
identical. The fifth, motion posture, was specced `generous` while `motion.rules`
has always sanctioned motion on **exactly two** surfaces. That was a
contradiction predating the audit, not a distinction. Resolving it produced a
rule the system was missing:

> **Streaming is not motion.** Text arriving token by token, a typing indicator,
> a skeleton resolving — content *arriving*, permitted anywhere, spending nothing
> from the two-surface budget. **The test: is the animated element already on
> screen and already correct?** Then it is motion and needs a sanctioned surface.

**Not merged — Writing Desk and Receipt.** "Compose, then issue" is good prose
over a real geometry difference. Every token differs, and after §3.7 the Receipt
carries a portrait HTML artifact *and* a three-ratio raster family. A register
describing both is not one register. **The Receipt is what the Writing Desk
produces**, and a product is a different kind of thing from a workspace.

Landed as a `registers:` block **above** `surfaces:` in `DESIGN.md`; every surface
carries a `register:` key. **Where a surface's tokens and its register disagree,
the register wins — that disagreement is a bug.** Five room names kept as
narrative; what was cut is the claim they are five token sets.

**The one real cost, recorded as such:** palette scoping moved from surface to
condition. "Momentum green is Commons-only" was a lookup and no longer resolves;
the rule is now *green appears where a crowd is counted*. A dialogue counts no
crowd, so conversation views stay green-free.

---

## 3 · What is still open

### §3.8 — missing surfaces `[OPEN, untouched]` — do email next

Email, tables, forms, loading states, Spanish. **Email is the one to take**, and
not because it is next in the list: the letter that lands in a legislator's inbox
is the product's core artifact, and it is generated entirely outside the system.
Aurora, `oklch()`, `backdrop-filter`, the HEXP axis, variable fonts, `gap`,
custom properties — **all of it dies in email.** So this is not a template job.
It needs a **stated fallback register**: what the ink layer degrades to when the
aurora layer cannot exist at all. That is a genuinely interesting constraint and
it will probably teach the system something, the way the phone taught it the
Receipt was two artifacts.

Note it interacts with §3.1: the letter is what the newcomer's action *produces*,
and the lede's register has no email equivalent yet.

### Also open

- **§3.3 tactile accents** — smallest remaining item. Cut twelve to four; write
  the promotion gate. `promotion.gates` exists in `DESIGN.md` as a rule but no
  accent has been walked through it.
- **§3.7 the rest** — tab bar, mobile-first reading of the column tokens.
- **§3.6 weight scales** — **no decision needed.** Spec holds at one, production
  ships four, direction settled, recorded as a Known Divergence. **Do not let the
  spec drift back to match the code** — parallel scales are how it reached four.
- **§3.1's unowned sub-item — who writes the plain sentence.** 464,269 bills need
  one. Generated then reviewed? Generated and labelled? **A plain sentence that is
  wrong is worse than jargon that is opaque, because the newcomer cannot tell.**
  This is not a design decision and must not be closed by one. It needs a named
  owner, and it is the single most consequential open question in the project.

---

## 4 · Four traps

Session 1's three still hold verbatim. Read them. There is now a fourth, and it
is the one that actually cost turns this session.

**1 · Specimens lag tokens, and there is no shared stylesheet.** Now **40**
`preview/` cards, all hand-written with inline styles. Still recommended:
build `preview/_card.css` before the next system-wide change. I did not, and see
trap 4.

**2 · The spec has drifted from production before and will again.** Paid off
again this session — the three export ratios. **Check production source, and ask
the user, before rewriting a rule.**

**3 · Measure contrast by rasterising, not by parsing.** `getComputedStyle`
returns `oklch()` verbatim in Chrome. Paint into a 1×1 canvas and read the pixel
back. See trap 4 for how bad this gets when you forget.

**4 · Do not invent token names, and do not invent measurements. `[new]`**

Two failures in one card, both caught by the verifier, both mine:

- I wrote `var(--material-thin-bg)`, `var(--surface-raised)` and
  `var(--color-action-text)`. **None exist.** They resolve to empty, silently:
  the glass rendered fully transparent, the token strips showed page canvas
  through, and the green count rendered black. **The material tiers ship as role
  classes (`.material-thin`, `.material-regular`), not custom properties** — the
  README says so. There is no `--surface-*` family at all.
- Then, fixing the green, I wrote a comment citing trap #3 **while falling into
  trap #3** — asserting `--color-action-active` was "L .56, 5.1:1" when it is
  L .60 and measures **3.44** on glass. I had swapped one failing green for
  another and annotated it with numbers I had not measured.

Measured, rasterised, as ink on `material-thin` over the canvas:

| ink | ratio |
|---|---|
| `--color-action` / `--color-momentum` L .66 | 2.76 |
| `--color-action-active` L .60 | 3.44 |
| `--color-success` `#047857` | **5.21** |

Green **ink** on glass is `--color-success`. It is also semantically right: action
and success are one hue with fill carrying the difference, so a count is a report
already true. Over a saturated blue-hour lobe it drops under 4.5 regardless —
which is why **"no bare text inside the curtain band"** already exists.

**The rule: before using a token name, grep it. Before writing a ratio, rasterise
it.** A `preview/` card is read as the system's guidance, so a wrong number in one
is worse than a wrong number in a scratch sheet.

---

## 5 · How to work here

Unchanged from session 1, and it kept working:

**Show an artifact and ask the user to decide.** Every decision this session got a
standalone file in `explorations/` that argued the case with real content on real
surfaces, ended with an explicit numbered ask, and said *nothing here is
committed*. Two of the three reversed or narrowed what the audit prescribed — and
that only happened because the thing was rendered rather than argued.

**Fix the constraint, not the symptom.** The newcomer was not failed by the serif;
they were failed by the words and the order. The Receipt was not failed by the
phone; it was failed by pretending one shape serves two jobs.

**Then land it in one pass** — token layer, `DESIGN.md`, `README.md`, the kit, the
specimen, the audit status table, and `CHANGELOG.md` with the reasoning *and the
rejected alternative*. The changelog recording *why* is what made both handoffs
possible.

### Files added this session

`explorations/The Newcomer.html` · `explorations/Five Rooms or Three.html` ·
`explorations/The Receipt on a Phone.html` · `preview/type-newcomer.html` ·
`preview/receipt-export-ratios.html` · `preview/foundations-registers.html`
