---
name: ratify
description: Empty the Amendment design system's ratification queue and run an independent review pass on shipped work. Use when RATIFY.md has entries, when a migration stage has been handed off from voyager, or when the spec and production disagree and someone has to decide which is right. Produces one spec commit — DESIGN.md, CHANGELOG.md, and a spec-version bump — plus conformance fixes routed back to the code side.
---

# Ratify

The session running this skill is the **only writer** of `DESIGN.md` and `CHANGELOG.md`. This skill is how spec change happens: deliberately, in its own commit, with its reasoning recorded.

## Before you start

- `git status` in this repo — if the spec is already dirty, something bypassed the authoring surface. Reconcile before writing.
- Read `DESIGN.md`'s provenance header (`spec-version`) and **the last four `CHANGELOG.md` entries.** Most "obvious improvements" were already tried and recorded; re-opening a settled question is this system's most repeated failure.
- Read `RATIFY.md` end to end before deciding anything. Entries interact — two readings of one rule often turn out to be one missing sentence.

## Settle each entry, then a person decides

Sort by kind first, because the kind determines the action:

| Kind | Action |
|---|---|
| **Conformance** | Shouldn't be here. Route back to the code side as a fix. |
| **Spec ahead** | Record as a Known Divergence on the relevant entry. **Do not** let the spec drift back to match the code. |
| **Production ahead** | The shipped artifact met a real constraint the spec didn't know. Update the spec. |
| **Unowned default** | Nobody chose it; a framework did. Decide. *The value that reaches a rendered surface is the value the system means.* |
| **Two readings** | Ask for both rendered, then let the container decide. |
| **Spec silent** | Write the rule and its rationale. |

Three habits that do most of the work:

- **A contradiction is usually a missing sentence.** When a rule appears to disagree with itself, look for the third claim being conflated with the other two before rewriting either. The fill rule read as self-contradictory for a day; nothing in it was wrong.
- **Demand the measurement.** The asker frames the question and usually gets the answer they were leaning toward. Take the render, the contrast number, the clip — deciding from prose is how both readings get ratified.
- **Check whether the rule already exists somewhere narrower.** A rule stated only inside a profile or a register is invisible to the general case, and re-deriving it wastes a session. If you find one there, hoist it to the section it governs and let the profile cite it.

Ratification is a person's decision (Jason). Bring him one line per entry — the render or measurement that settles it, a recommendation — and the batch in the order you'd take them. Conformance routing needs no decision. **Write nothing into `DESIGN.md` until the entry is decided.**

## Write it down

One commit in this repo, containing:

1. **`DESIGN.md`** — the edit, in role and token names. **Cite the token, never the number.** A weight or hex in prose is an uncontrolled copy that ages silently and survives edits a token name wouldn't, because a specific number looks deliberate. Nobody re-derives `497`.
2. **`CHANGELOG.md`** — a dated entry: what was decided, **why**, and what it retires. The rationale is the load-bearing part; a decision without it gets re-litigated within a month.
3. **`spec-version`** bumped in the provenance header, in this same commit, per the scheme written there; tag the commit with it.
4. **The retirement sweep** — when a decision retires a value, grep for it across `SKILL.md`, `README.md`, `DESIGN-HARD-RULES.md`, `colors_and_type.css`, and `preview/` **in the same pass.** The entry points are the stalest files in the project precisely because they are the most read and the least rendered; one taught retired rules for 24 days and every consuming agent inherited them.
5. **Delete the ratified entries** from `RATIFY.md`. Leave anything still open with a note on what it is waiting for — usually a measurement someone has to take.

Never fold a spec change into a feature commit. That discipline is the only reason this system has a usable history.

## Then review independently

The code side self-checks with `/design-iterate` — that catches clips, targets under the floor, type under 12px, motion on hover. It is not review; the builder excuses what it just decided.

The other pass belongs to the read-only `design-reviewer` agent: spawn it on the stage's stories or specimens. It gets its own pixels (both schemes, 390 and 1440) and judges what a checklist can't: is this green a control or a report; is this label chrome or caption; does the composition hold; does the surface belong to the register it claims. **A curated screenshot set inherits the framing of whoever curated it** — don't hand it one.

Split what it finds: conformance back to the code side, new ratifications into the queue.

## Close out

Report: what was ratified (one line each, with the reasoning that decided it), what is still open and what it waits on, conformance fixes owed by the code side, and the new `spec-version`.

Then tell the code session the version moved so it re-reads the rules instead of citing what is already in its context. A stale session is the same failure as a stale entry point, at conversation scale.
