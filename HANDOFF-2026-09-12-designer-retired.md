# Handoff → amendment-design: the `designer` agent is retired; this repo owns the system — 2026-09-12

> **Applied 2026-09-13.** The live rules are `CLAUDE.md` and `.claude/skills/ratify/SKILL.md`; of this file, only "Not decided yet" is still open.

## Verdict
Jason retired the `designer` agent on 2026-09-12 (archived to `~/agents/_archive/designer-retired/`). This repo was already the canonical system; now a session opened here owns it outright: **the session running `/ratify` is the one writer of `DESIGN.md` and `CHANGELOG.md`**, and independent render review moves to the read-only `design-reviewer` agent (`~/.claude/agents/design-reviewer.md`). Five edits below, then a first `/ratify` pass — `RATIFY.md` is 591 lines, last touched 09-09. Open with `cd ~/git/amendment-design && claude`, then "apply HANDOFF-2026-09-12-designer-retired.md". Commit per this repo's conventions.

## Edits
1. **`CLAUDE.md` L36 (One writer).** "exactly one writer: the `designer` agent" → exactly one writer: **a session in this repo running `/ratify`**, one at a time; `git status` clean before a pass. Everything else (other sessions here, voyager) still appends to `RATIFY.md`.
2. **`DESIGN-HARD-RULES.md` L3.** "by `designer` against story renders" → "by the `design-reviewer` agent against story renders". This file is in the spec set, so land it through `/ratify` with a `CHANGELOG.md` line.
3. **Add `.claude/skills/ratify/SKILL.md`** — port `~/agents/_archive/designer-retired/skills/ratify/SKILL.md` (59 lines). Make paths repo-relative and change "You are the only writer" to "The session running this skill is the only writer". Confirm a fresh session in this repo lists `/ratify`.
4. **Port what `CLAUDE.md` lacks** from `~/agents/_archive/designer-retired/CLAUDE.md` — diff first, most of it is already here (How a change happens, One writer, Cite the token, Dark mode, Traps). Candidates: the register table and five-step workflow (L40–55), the three divergence kinds (spec ahead · production ahead · unowned default, L100–104), the `RATIFY.md` cadence (empty at ~5 entries or the end of a migration stage; tell the code session the version moved, L110), and "the entry point is the stalest file" (Traps 1). Keep `CLAUDE.md` ≤150 lines; put the register table in `SKILL.md` if it doesn't fit.
5. **Name the review pass** in `CLAUDE.md`: after a builder's own `/design-iterate`, spawn `design-reviewer` (it renders both schemes at 390 and 1440 itself, and splits findings into conformance fixes and `RATIFY.md` entries). It is read-only — it never edits the spec or the canvas.

Leave historical mentions of `designer` alone (CHANGELOG, DESIGN.md provenance notes, RATIFY entries, dated HANDOFF/AUDIT files).

## Then
- First `/ratify` pass on `RATIFY.md`. Ratifications are a person's decision (this repo's own rule): bring Jason the decisions, one line per entry with the render or measurement that settles it.
- **Not decided yet — do not start without Jason:** a Paper pilot as the hi-fi surface in place of the Claude Design project `151c8ef0`. Checked 2026-09-12 (read-only): Paper has Archivo with the `wdth` axis (62–125), Newsreader (`opsz`), IBM Plex Mono (static); its tokens take Tailwind v4 namespaces (`--color/--font/--text/--font-weight/--tracking/--leading/--radius/--breakpoint`) but not shadows, motion or materials; `get_computed_styles`/`get_jsx` read the canvas back. Unverified: whether `write_html` honours `font-variation-settings`/`font-stretch` — test that first. Rule if adopted: tokens flow repo → Paper only; canvas changes come back as `RATIFY.md` entries.

## Done when
- No live file names the `designer` agent as writer or reviewer (`grep -rn '\bdesigner\b' CLAUDE.md DESIGN-HARD-RULES.md SKILL.md README.md`).
- `/ratify` is listed in a fresh session opened in this repo.
- The edits are committed; this handoff is deleted or committed alongside them.
