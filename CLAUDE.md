# Project instructions — Amendment Design System

## The spec and production have different jobs

`DESIGN.md` is deliberately **ahead of** `resistbot/voyager`. It is where the
system is going; production is where it is today. So a divergence is not
automatically a spec bug, and "production ships X" is not by itself an argument
for changing the spec.

But production is the **live truth about what is actually being built right
now** — the surfaces in flight, the copy real users read, the defaults nobody
chose. Read it before rewriting a rule (session 1's trap #2), and treat what it
reveals as evidence, not as authority.

When recording a difference, say which kind it is:

- **Spec ahead** — production hasn't caught up yet. Record as a Known
  Divergence; do NOT let the spec drift back to match the code.
- **Production ahead** — the shipped artifact is better than the documented
  rule, usually because it met a real constraint (the Receipt's three export
  ratios, the phone). Update the spec.
- **Unowned default** — neither chose it; a framework did (the email brand navy
  `#033271`). Needs a decision, not a reconciliation.
