# Handoff — Amendment Design System, August 2026 (session 3)

**Read this, then `HANDOFF-2026-08-session2.md`, then `HANDOFF-2026-08.md`, then
`DESIGN.md`.** Sessions 1 and 2 are still accurate; nothing in them was
reversed. This memo covers the one thing that changed the working conditions
permanently — **the production repo is readable now** — plus what §3.8 cost, and
the two traps that actually burned turns.

---

## 1 · The thing that changed: `resistbot/voyager` is accessible

Every prior session worked from the spec alone and said so. That caveat is
retired. GitHub is connected, the repo reads, and `github.md` at the project
root is the sync record — repo, branch, last-sync date, and a **screen map**
tying each project file to the source files it was built from. **Refresh
`github.md` every time you read from or rebuild against the repo**, not just the
first time.

What this does to the method: session 1's trap #2 (*check production before
rewriting a rule*) stops being a discipline you have to remember and becomes a
step you can actually perform. Do it early. It reframed §3.8 twice in one
session, after I had already written a long exploration from the spec.

**Sort every difference into three kinds** — this is now in `CLAUDE.md` and it
is the most useful thing to come out of this session:

- **Spec ahead** — production hasn't caught up. Known Divergence; do NOT let the
  spec drift back. (Merriweather still ships in `app/layout.tsx`, so audit §9 is
  closed *in the spec only*.)
- **Production ahead** — a real constraint was met in the live product. Update
  the spec. (Hosted asset pipeline; the dark-mode mechanism; the hand-authored
  `text/plain` part; the founder's voice.)
- **Unowned default** — nobody chose it, a framework did. **This is the urgent
  kind.** (`brand: "#033271"` — a navy on every button and link in the
  highest-volume surface; `bg-white`; the absent serif.)

> **A transport with no design is a transport with a default.** The system's
> missing surfaces are not blank — they are furnished by whatever library got
> there first. That reframes §3.8 from a backlog of templates into: *where else
> is the system being designed by a default?*

---

## 2 · Where the audit stands

Seven of ten resolved; three remain. The table at the top of
`AUDIT-2026-08.md` is current and authoritative.

| # | Item | State |
|---|---|---|
| 1 | Newcomer register | ✅ — one sub-item unowned (below) |
| 2 | Ownable colour | ✅ Momentum green |
| 3 | Twelve tactile accents | **partial** — inventory not cut, gate unwritten |
| 4 | Internal contradictions | ✅ |
| 5 | Five surfaces → three | ✅ four registers |
| 6 | Dual weight scales | **partial** — no decision needed, Known Divergence |
| 7 | Mobile assumed | **partial** — Receipt done, tab bar open |
| 8 | Missing surfaces | **partial** — email closed; tables, forms, loading, Spanish open |
| 9 | Merriweather | ✅ in spec; production still ships it |
| 10 | Governance | ✅ — **owner still unassigned** in `CHANGELOG.md` |

---

## 3 · What session 3 closed: §3.8, the email half

Four decisions were approved by the user and are landed in `DESIGN.md`
(`profiles.email`), `README.md`, `preview/email-profile.html`, the audit table
and `CHANGELOG.md`. **Do not re-litigate these.**

1. **Email is a viewport, not a canvas.** The user's correction, and it did more
   work than my proposal did. An email is a window — the same role the browser
   plays on the web — so objects are placed *into* it. Paper is not email's
   background; paper appears only where a paper **artifact** appears. One
   message can therefore hold two registers: a live ask on a card above an
   issued receipt on paper. **The rejected model** (email = the ink layer alone
   on a cream sheet) is preserved in `explorations/The Letter in the Inbox
   v1.html` and `v2.html` — it treated the window as a physical thing.
2. **A profile is not a fifth register.** *If a transport needs new tokens it is
   a register; if it needs the same tokens rendered by poorer machinery, it is a
   profile.* This is the reusable part — tables, forms and loading states get in
   this way without each inventing a register.
3. **Email is the system's reduced-transparency mode, permanently.** Already
   specified in `colors_and_type.css`: glass drops its blur, becomes solid zinc,
   layout does not shift. **Nothing was invented for email** except `#e7edf4`, a
   flat stand-in for the aurora derived by compositing its three lobes over the
   canvas — and it is deliberately **not a token**, because a hex in the token
   file is a hex someone will use on the aurora.
4. **`registers.issued.proof-rule`** — the one change that edits something
   already shipped. Every issued artifact states its ledger number as text, on
   screen too. The emboss and the signature are *pictures of authority*; neither
   survives email, plain text, a screen reader or a forward. The number survives
   all four. **The number is the proof; the emboss is its illustration.**

Also settled: the no-webfont **type stack** (Georgia / system sans / Verdana for
chrome / mono stack) with a **12px floor**; **both colour modes required**; the
navy retired from email; and **the founder's letter** named and fenced to the
welcome email only.

---

## 4 · What is still open, with the first move for each

### §3.8's remainder — tables, forms, loading states, Spanish

Each is a transport with a default, and now you can go find out *whose*. Start
by grepping the repo for what furnishes them today (shadcn? a table primitive?
Clerk's form styling?), then apply the profile test from §3 above: same tokens
poorly rendered → profile; genuinely new tokens → register. **Spanish is the odd
one out** and probably the most consequential: it is not a rendering constraint,
it is a *voice* constraint, and the newcomer's lede rules (§3.1) are written in
English idiom — "one sentence, three facts, one action" may not survive
translation intact.

### §3.3 tactile accents — the smallest remaining item

Cut twelve to four; write the promotion gate. `promotion.gates` exists in
`DESIGN.md` as a rule but **no accent has ever been walked through it** —
guilloche is first in line and is confirmed shipped in production. Entirely
self-contained; needs no source access.

### §3.7's remainder — the tab bar

Now cheap: production ships `components/global/TabBar.tsx` and mounts it in
`app/layout.tsx`. Read it rather than inventing one. The mobile-first reading of
the column tokens rides along with it.

### §3.6 weight scales — **no decision needed**

Spec holds at one, production ships four, direction settled. Recorded as a Known
Divergence. **Do not let the spec drift back to match the code** — parallel
scales are how it reached four.

### The two unowned items — neither is a design decision

- **Who writes the plain sentence.** 464,269 bills need one. Production answers
  it *for asks*: the user writes their own title, and the subject line is that
  title verbatim — which is why *"You co-signed: Cap rent increases at 5% a
  year"* works. It does not extend to bills, and a bill-notice subject line
  **is** the plain sentence at 45 characters with no page around it to correct a
  wrong one. **A plain sentence that is wrong is worse than jargon that is
  opaque, because the newcomer cannot tell.** Needs a named owner.
- **Governance owner.** `CHANGELOG.md` still says *unassigned*. Governance
  requires one named person; §10 is marked resolved while the role is empty.

### Carried caveat

**Real-client dark-mode testing** on the three emails. Cream survives Apple Mail
and iOS; Gmail Android darkens the sheet and the double rule is the first thing
to disappear. Cannot be closed from here.

---

## 5 · Traps — the four still hold, and here are two more

Sessions 1 and 2's four are unchanged. Read them. Two additions, both of which
cost real turns this session:

**5 · A half-wired mode is worse than no mode. `[new]`**
Dark mode took three rounds because I fixed the elements I remembered instead of
enumerating every colour-bearing one. Round 1: the `.vp` class went on the body
but not on the wrapper table that actually paints the viewport — light frame,
dark card. Round 2: links. **A class on a paragraph does not reach its anchors**,
so an inline indigo link inside inverted body copy measures 1.02:1 and vanishes
*silently*. When you add a mode, walk the whole file element by element and
measure each declared value in **both** states — a ratio comment that says
"measured" while covering one state is trap #4 wearing a new hat.

**6 · The specimen must obey the rule it states. `[new]`**
The `preview/` card that establishes the 12px chrome floor shipped with a 10.5px
caption. Session 2's version of this was a comment citing trap #3 while falling
into trap #3. Same shape, twice, two sessions running: **the file that declares
a rule is the file most likely to break it**, because you are concentrating on
the argument rather than the artifact. Before publishing a specimen, apply its
own rule to it as a checklist.

Worth noting: both of these, and the sub-12px chrome across all three emails,
were caught by verification rather than by me. Let the check run and read it
properly.

---

## 6 · How to work here

Unchanged from sessions 1 and 2, and it kept working:

**Show an artifact and ask the user to decide.** Every decision this session got
a standalone file in `explorations/` that argued with real content, ended with a
numbered ask, and said nothing was committed. The user's single most valuable
correction — *email is a viewport* — came in response to a rendered wrong
answer, not to a question.

**Ask fewer, plainer questions.** Two of my seven asks came back as "don't know
what you're asking" because they were written in system jargon. Restating them
in plain language got both answered in one line. Ask what you actually need
decided, and state your own recommendation so a yes closes it.

**Fix the constraint, not the symptom.** Email was not failed by lacking a
template; it was failed by nobody deciding what the second layer degrades to.

**Then land it in one pass** — token layer, `DESIGN.md`, `README.md`, the
specimen, the audit table, `github.md`, and `CHANGELOG.md` **with the reasoning
and the rejected alternative**. The changelog recording *why* is what has made
three handoffs possible.

### Files added this session

`explorations/The Letter in the Inbox v1.html` · `v2.html` ·
`explorations/Email Iteration 1.html` (four emails, light/dark toggle) ·
`Email - Cosign Production Baseline.html` · `Email - Cosign On System.html` ·
`Email - Welcome On System.html` · `Email - Letter Delivered On System.html` ·
`Email - Bill Notice.html` · `Email - Letter Delivered.html` (both superseded) ·
`preview/email-profile.html` · `github.md` · `CLAUDE.md` (the three-kinds rule)
