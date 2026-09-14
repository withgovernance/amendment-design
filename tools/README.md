# tools

Verification for the design system, owned by the design system.

These used to live in the consumer repo (`~/git/voyager/scripts/design/`). They
were moved here on 2026-08-30 because the consumer should carry the generated
artifact and nothing about how it is produced — and because a guard that lives
in the repo it checks has nobody checking it. See
`CHANGELOG.md` → 2026-08-30 and `DESIGN.md` →
`color.a-guard-that-cannot-run-reports-agreement`.

## build-tokens.mjs

Regenerates the consumer's `app/design-tokens.css` from `colors_and_type.css`.

```sh
node tools/build-tokens.mjs --target ~/git/voyager           # write
node tools/build-tokens.mjs --target ~/git/voyager --check   # verify, exit 1 on drift
```

`--target` defaults to `~/git/voyager`.

## lint-rules.mjs

Adherence pass over a consumer's source — role classes, retired axes, literals
where a token exists.

```sh
node tools/lint-rules.mjs --target ~/git/voyager
```

## check-retired.mjs

The retired-value grep (`CLAUDE.md` → CI item 1), run over **this** repo.
`lint-rules.mjs` scans a consumer; this scans the design system's own
specimens, entry points and stylesheet.

```sh
node tools/check-retired.mjs   # exit 1 on any hit, 2 if a scanned file is missing
```

**Scanned:** every `.html` and `.css` under `preview/` (except `history/`),
`SKILL.md`, `README.md`, `DESIGN-HARD-RULES.md`, `CLAUDE.md`,
`colors_and_type.css`. **Not scanned:** `DESIGN.md`, `CHANGELOG.md`,
`RATIFY.md`, `history/`, `HANDOFF-*`, `AUDIT-*`, `RECONCILIATION-*` — the
record, where a retired value is quoted on purpose.

**Hits:** the retired families and colours (`CLAUDE.md` → "Cite the token,
never the number"), case-insensitive; any length in `ch` (`DESIGN.md` →
`spacing.measure.rule`); and a ladder rung **only where it is bound to a
weight** — a `font-weight` value (CSS, svg attribute, JS), a `wght` axis value,
the weight in a `font` shorthand, or the value of a `--sans-*` or `--*weight*`
custom property. Bare digits are hue angles and coordinates far more often
than weights, and a check that cries wolf gets muted (`fa2ff6d`).

### The exemption marker: `retired-ok`

A line that quotes a retired value as history, or as the defect a specimen
renders, carries `retired-ok` **inside a comment** — `<!-- retired-ok -->` in
Markdown and HTML, `/* retired-ok */` in CSS, `// retired-ok` in a script.
Say why after it: `/* retired-ok: the measure specimen renders the defect */`.

- The marker exempts every line of the comment it sits in.
- A comment **standing alone on its line** also exempts the next line.
- A comment trailing code, or a multi-line block, exempts nothing past its own
  last line — the line after a history block is usually a live declaration.
- `retired-ok` outside a comment is not honoured, and is reported as such.
- **Entry points take no marker.** In `SKILL.md`, `README.md` and
  `DESIGN-HARD-RULES.md` a marker is itself a hit and exempts nothing: an entry
  point states the current rule, and a retirement there is a deletion, not a
  note. Markers belong in `CLAUDE.md` (the grep set), the stylesheet's history
  comments, and specimens that render a defect.

Every run prints how many hits were exempted and lists each marker with the
span it covers and its count; a marker that exempts nothing is flagged for
removal. An exemption is visible, never implied by a check quietly not firing.

## The one rule these tools must obey

**Never parse by layout.** Match selectors as patterns, not literal strings;
accumulate declarations to their semicolon, not to their newline. Every defect
found in these two files on 2026-08-30 was a tool reading formatting instead of
structure, and formatting is the one thing this system does not record and does
not control.
