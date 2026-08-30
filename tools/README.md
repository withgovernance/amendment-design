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

## The one rule these tools must obey

**Never parse by layout.** Match selectors as patterns, not literal strings;
accumulate declarations to their semicolon, not to their newline. Every defect
found in these two files on 2026-08-30 was a tool reading formatting instead of
structure, and formatting is the one thing this system does not record and does
not control.
