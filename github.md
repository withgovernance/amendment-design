repo: resistbot/voyager
branch: main

## Last sync
date: 2026-08-15T03:02:43Z
read-at-ref: e440076210f2 (resolved from `main`; recorded as the ref read, not asserted as a commit sha)

### Updated in this project
- Re-read `app/globals.css` in full at `e440076210f2` to build handoff targets from current source rather than from the Aug 2 reconciliation notes. Confirmed §4 (paper desk-lamp) verbatim; found three new defects in the material layer (below).
- Built `preview/material-tiers-in-situ.html` — the five tiers composed on the real Blue Hour aurora, both modes, exact opacity/ring/shadow/blur values. Replaces nothing; `preview/surface-system.html` still ships the stale 10/45/85/95 specimen and should be corrected or retired.
- Built `preview/paper-lamp-dark.html` — correct (`background-attachment: fixed`) beside the likely regression (attachment omitted), scrollable, since the rule is invisible standing still.
- **Chrome ships two conflicting light values.** `--material-chrome-bg: rgb(255 255 255 / 75%)` feeds the `navbar-materialize` keyframe; `@utility material-chrome` is `bg-white/55`. An animating navbar lands at 75%, static chrome sits at 55%. RECONCILIATION recorded 55, DESIGN.md recorded 75 — both are true of the code. **Unowned default; needs a decision, not a reconciliation.**
- **The spec's wrong material numbers came from production's own stale comment.** The doc block above the utilities still reads *thin ~45%, regular ~85%, thick ~100%, chrome 75%* and *"DARK MODE (black overlays)"*; the utilities beneath it say 30/55/75 and white overlays. §3 is therefore not spec drift — the spec faithfully transcribed a comment that had stopped being true. Fix the comment in the same PR or the error regenerates.
- **`material-thick` is not opaque.** The comment claims "~100% effective"; it is 75% white. `.popover-surface` exists precisely because `thick` cannot occlude — worth stating as a rule so nobody reaches for `thick` to solve a nesting problem.
- **Production's sans is Readex Pro, not Archivo.** `--font-sans: var(--font-readex)`, and the 160–700 weight scale plus every `hexp-*` utility is tuned to Readex's `HEXP` axis. This project's adherence config lists Archivo and the README explains Archivo's `wdth` axis, while `colors_and_type.css` ships `--hexp-*` tokens — so the design system currently asserts a font it does not describe the axes of. Same class of gap as Merriweather/Newsreader (audit §9), but not previously recorded. **Resolved 2026-08-25: Archivo is the target** — deliberately chosen 2026-08-13 (see CHANGELOG), self-hosted with verified `wdth`/italic axes; `--hexp-*` survive only as deprecated aliases. Production's Readex Pro is a Known Divergence, spec ahead; the code migrates.
- Relabelled `ui_kits/web/index.html`'s `@dsCard` from "UI Kit — Web" to an archive group marked spec-derived and dated. It predates repo access, its README says so, and it ships four values the reconciliation has since overturned (oxblood FAB, black dark-overlays, near-black paper, seal + signature line as canonical). Excluded from the handoff on purpose: it is the most legible artifact here and would otherwise be ported over real production components.

## Screen map
| Project file | Built from (voyager@main) |
|---|---|
| preview/material-tiers-in-situ.html | app/globals.css @ e440076210f2 — the five `@utility material-*`, four `@utility shadow-*`, `body` aurora, `--material-chrome-*` |
| preview/paper-lamp-dark.html | app/globals.css @ e440076210f2 — `.dark .paper-cream`, `.dark .paper-parchment`, `@custom-variant dark` |
| explorations/Running the Gates.html | components/receipt/{GuillocheBand,ReceiptCertificate,AmendmentEmblem,LedgerCounter}.tsx, RubberStamp.tsx, bill-status-progress-bar.tsx, app/globals.css |
| explorations/The Tab Bar at 390.html | components/global/TabBar.tsx, components/global/Sidebar/nav-items.ts |
| explorations/Tables, Forms, Loading.html | components/ui/{input,label,textarea}.tsx, 11 *Skeleton components, app/globals.css (--clerk-* block) |
| explorations/Loading Without a Count.html | same — second pass, answering the unknown-cardinality objection |
| preview/loading.html | the landed loading rule |
| preview/tabbar.html | same pair — the landed spec |
| preview/accent-inventory.html | same set — the graded inventory, condensed |
| explorations/Email - Cosign Production Baseline.html | email/cosign-ask.tsx |
| explorations/The Letter in the Inbox v2.html | email/cosign-ask.tsx, email/welcome.tsx, inngest/services/email.ts, lib/notifications/types.ts, app/layout.tsx |
| explorations/Email - Cosign On System.html | email/cosign-ask.tsx, components/asks/AskSummaryCard.tsx, AskMomentum.tsx, AskDetailCounts.tsx, ask-receipt.ts |
| explorations/Email - Welcome On System.html | email/welcome.tsx |
| explorations/Email - Letter Delivered On System.html | net new — no production counterpart |
| explorations/Email - Bill Notice.html | superseded proposal (paper-canvas model, rejected) |
| explorations/Email - Letter Delivered.html | superseded proposal (paper-canvas model, rejected) |

## Sync history
### 2026-08-02T16:12:00Z
- Ran audit §3.3's promotion gates against source for the first time. Six of thirteen accent statuses were wrong in both directions; landed in `DESIGN.md` (`tactileAccents`), `README.md`, `CHANGELOG.md`, `AUDIT-2026-08.md`, `preview/accent-inventory.html`.
- Specified the tab bar from `components/global/TabBar.tsx` + `Sidebar/nav-items.ts`, measured at 390pt. The audit's 12px-floor worry was unfounded (widest short label uses 72% of its slot); the real defects were a missing safe-area inset and tap targets sized by their content. Landed in `components.tabbar`, `a11y.targetSize`, `preview/tabbar.html`. Audit §3.7 closed except the mobile-first column tokens.
- Adopted two production decisions into the spec: composing surfaces (`/conversation/*`, `/action/*`) hide the tab bar, and the tab bar is a curated five requiring `shortLabel`.
- Closed the rest of audit §3.8. **Tables** are out of scope (no `<table>` anywhere in the product); **loading** got the rule it lacked (promises shape, never quantity — under-reserve so the settle is downward); **forms** turned out to be furnished by Clerk through nineteen `--clerk-*` variables, now recorded as `profilesClerk` with three drifted values.
- Added `--skeleton-block` / `--spinner-ink` tokens and `.skeleton-block` / `.spinner-inline` roles to `colors_and_type.css`, replacing `bg-black/5|8|10` at four ad-hoc heights across six production files.
- Promoted **guilloche** (`components/receipt/GuillocheBand.tsx`) and the **progress ribbon** (`bill-status-progress-bar.tsx`) to canonical — both shipped and load-bearing while labelled proposed.
- Demoted **the seal**, **the ruled page** and **the signature line** out of canonical — none has an implementation in the repo.
- Found the guilloche's stroke-weight defect: an 800×44 SVG scaled to fit renders its 0.6px engraving at 0.29px on a 390pt phone. Same failure as the ledger number reaching 5px (audit §3.7).
- Found that the Receipt's place-of-issue caption ships at `text-[0.6rem]` (9.6px), under the 12px floor, on a line `registers.issued` marks mandatory. Not fixed; carried.
- Recorded the rubber stamp's oxblood ENACTED as a Known Divergence — production ships the colour the palette retired in August.
- Confirmed session 3's `registers.issued.proof-rule` is already obeyed in production: `LedgerCounter` renders the ledger number as 12px text.

## Notes
- **Bounded search is not evidence of absence.** `github_search_code` scans a subset in path order; a first pass over `app/` concluded the Receipt was unbuilt because `components/receipt/` sorts past the cutoff. Scope with `path_prefix` before concluding something does not exist.
- `resistbot/deepspace` (backend, owns the bill-summary generation) is NOT accessible — 404s under `resistbot`, `putorti` and `deepvest-ai` as of 2026-08-02, consistent with a pending org approval. Needed to close `openQuestions.who-writes-the-plain-sentence`; Tyler owns that pipeline.
- There are **no tables in the product** — no `<table>`, `<thead>`, `<tbody>` or `role="table"` in `app/` or `components/`, and no table primitive in `components/ui/`. Bills render as `bill-list-item.tsx` cards.
- Loading ships two mechanisms: a spinner (`CircleNotchIcon animate-spin`) in three route-level fallbacks all named `*Skeleton`, and true pulse skeletons in six other components.
- The Receipt IS built: `components/receipt/` holds ReceiptDialog → ReceiptCertificate → {GuillocheBand, AmendmentEmblem, LedgerCounter}, with stories. Reached from `EndorseCandidateButton` via `buildEndorseReceiptContext`.
- All five bloom keyframes in `app/globals.css` are consumed (receipt-arrival, receipt-aurora, emblem-land, signature-write, guilloche-reveal).
- Email surface in production is exactly two notification types: `welcome`, `cosign.confirmation` (`lib/notifications/types.ts`). No bill notice, no delivery record.
- Email is authored in `react-email` + Tailwind `pixelBasedPreset` and sent via Resend; the tables are emitted, not hand-written.
- `app/layout.tsx` loads `AmerikaSignature-Regular.otf` — receipt signature only, never body or UI. It renders the user's typed Clerk name; see `openQuestions.what-is-a-signature`.
- Merriweather (not Newsreader) still ships in `app/layout.tsx` — audit §9 closed in the spec only.
- **Readex Pro (not Archivo) ships as `--font-sans`** in `app/globals.css` at `e440076210f2`, and the entire 160–700 weight scale plus the `hexp-*` utilities are Readex's `HEXP` axis. Resolved 2026-08-25: Archivo is the target (chosen 2026-08-13; `--hexp-*` kept as deprecated aliases only). Spec-ahead divergence; the code migrates.
- `--material-chrome-bg` (75%) and `@utility material-chrome` (55%) disagree in light mode. Do not "reconcile" one to the other without deciding which surface each governs — the token only feeds `navbar-materialize`.

## Sync history (earlier)
### 2026-08-02T12:05:00Z
- Landed audit §3.8 (`profiles.email`), rebuilt both shipped emails on-system plus a net-new delivery record, and recorded four spec/production divergences found in email: brand navy `#033271`, the system font stack, `bg-white`, and the signed founder's voice in `welcome.tsx`.
