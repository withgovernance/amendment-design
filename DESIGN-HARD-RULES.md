# Amendment — Hard Rules (the lookable checklist)

Source of truth: `DESIGN.md`. This file is the short list every visual change is checked against — by `/design-iterate` against screenshots, by `/review-pr` against the diff, by `designer` against story renders. If a rule here contradicts `DESIGN.md`, `DESIGN.md` wins; fix this file in the same pass.

> **Before trusting a clean lint run:** enforcement reads the *class layer*. A surface that draws imperatively — d3 `.attr("font-size", …)`, canvas, a third-party API taking a literal — is invisible to every check this system has, and is where the last three violations hid. Go look at those by hand.

## Look at the render and ask

1. **Text on the aurora?** Permitted as of 2026-08-28 — desktop chrome takes no material and its ink sits on the band. **The protection moved from placement to the ground:** the band must be bounded so `--text-secondary` clears 4.5:1 at every point, both schemes (`a11y.contrast.band-is-bounded`). **Blend by removing the plate, never by lowering ink** — a label at 38% over a gradient is an unmeasured contrast failure, not an aesthetic. **Coloured ink is the exception and still needs an OPAQUE ground** — measured, every material lands 2.6–3.0:1 in the band and the thicker ones are worse, because translucency passes the gradient through and `blur(50px)` averages neighbouring bright lobes *in* (`--canvas` 6.10:1 where glass was 2.87:1). **Not yet true:** the shipped five-lobe curtain fails the bound at every alpha in light; the three-lobe token band passes. Until that lands, this rule describes the target, not the product. → violation
   - **Check a material against `colors_and_type.css`, not the app's own utility.** The consumer hand-reimplements the materials and `material-chrome` dark has drifted to the opposite treatment (90% zinc in the system, 12% white in the app). A specimen must name which value it renders.
   - **Corollary: a contrast number without a position is not a measurement.** The canvas is a gradient; the same token swings ~3× top-to-bottom of the page. Quote where you sampled or don't quote the number.
2. **Is the green obeying the fill rule?** Three separate questions, and they are the most-violated rules in the system:
   - **A filled green plate is a control** (*press me*). One per surface, on the primary act. A green plate that isn't pressable is a violation.
   - **Green ink is a report** (*this happened*) — and green ink is **`--color-success`** on light, switching to **`--color-action`** under inversion. The action green **as text is forbidden** (2.62:1). A plate colour used as ink is a contrast failure, not a style choice.
   - **Green ink is only as legal as the ground under it.** Measure against the ground the element actually lands on, not white — `--color-success` is 4.99:1 on the neutral-100 page but 4.32:1 one plate step down. A **green tint plate carrying green ink caps at 10%**; at 15% the ink fails.
   - **The Momentum accent is scoped to where a crowd is counted** — co-signs, endorsements, tallies, threshold meters. A dialogue counts no crowd, so conversation views stay green-free. This scopes the *brand accent*; it does not forbid semantic success from its conventional meanings (enacted, completed, verified).
3. **Any red that isn't semantic danger?** No oxblood, no red CTAs, no red ENACTED. Red-600 danger / "dead" only. No violet/pink/magenta accents; no amber except warning.
4. **Anything moving on hover?** Hover = one background step + one shadow tier. No `scale()`, no `brightness()`, no transform transitions. Chrome is still. Motion exists on exactly two **product surfaces** — Receipt bloom (once, at issuance) and Commons accrual (real aggregate state) — and never swaps or leaks. Streaming text and resolving skeletons are not motion. **An idle loop or a decorative ping is a violation wherever it is.**
   - **Three things are outside the budget, not exceptions to it.** A control drawing a state the user just committed (a toggle thumb, a disclosure caret) is *feedback* — permitted, and the toggle's slide is specified. The **aurora is a layer, not a surface**; it breathes, per the system's own thesis. **Marketing is outside the register table** — its motion must be pausable, viewport-gated, motion-safe, and never on a surface carrying record state.
   - **Before applying a general rule as absolute, grep the component entries for its exception.** Three rules have now read absolute because their exception lived in a component or profile. Hoist it in the same pass.
5. **Nav labels in caps?** They take `role-body`, sentence case — a nav label is a *destination name*, not a field label, and "the navbar is chrome" is a claim about the surface, not its content. Measured, tracked caps also fill 95% of the sidebar's label slot with `truncate` hiding it.
6. **ALL CAPS in a heading?** Uppercase has **two** homes and no others: `role-label-caps` (chrome — 12px, `--track-chrome`) and `role-ceremonial` (display size, `--track-ceremonial`, once per page). Headings are serif, mixed case, never tracked out. A heading tag carrying a tracked uppercase label is not a heading — it's one of those two roles and stays sans.
   - **Designation or sentence?** Ceremonial is for a *designation* — a bill identifier, a place of issue, a seal monogram. A sentence someone wrote ("Browse bills by state") is a heading, and setting it in tracked uppercase makes it hard to read at the size meant to make it grand.
   - **Take the role, don't rebuild it.** A width preset is not a register: chrome and ceremonial share `wdth` 125 and are separated by *tracking and size*. Width without its tracking is a different register — `tracking-wide` (0.025em) where `--track-ceremonial` (0.20em) belongs is 8× under.
7. **Type below 12px?** Hard floor, no chrome exception. **If a label no longer fits at 12px, the layout is the problem** — the type is not there to fix a layout decision.
8. **Touch target under 44px?** Interactive ≥44px; primary CTA 48px — by `min-height` or an expanded transparent hit area, never by inflating padding. Appearance and target are two geometries.
   - **Except a link inside a sentence**, which takes no minimum — both WCAG target-size criteria carve out inline targets, and at `role-body`'s 24px line box a 44px target overhangs 10px into the lines above and below and starts catching their taps. A link with its own line box is not inline and does take the floor.
9. **Serif italic doing decoration?** Italic serif is quoted human voice only, ≥1.125rem (`role-quote`). Below that it's roman 600 (`emphasis-serif-inline`). Metadata is roman. Sans emphasis uses Archivo's real italic.
10. **Script face on anything but the user's own affirmed name, on their own artifact?** Never other names, never decoration. No name → serif "A constituent".
11. **Emboss without paper under it, or below 44px?** The emboss needs a paper canvas. It can't print or survive email — the ledger number, always present as text, is the proof.
12. **Both colour schemes checked?** Light and dark are both first-class. Glass collapses to solid zinc under `prefers-reduced-transparency`; email lives there permanently (no webfonts — Georgia / Segoe stack / Verdana chrome ≥12px). Honour `prefers-reduced-motion` and `prefers-contrast`.
13. **Wrong icons or imagery?** *(These bind the system's own voice, not user-authored content — see `color.rules-bind-the-system-not-the-user`. A rule that cannot tell a model's output from a user's keystroke is being applied at the wrong layer.)* Phosphor only, never Lucide. No flags, eagles, or partisan marks; no stock photography, no photographic textures, no faux-3D. No 🎉 register — the Receipt is *issued*, not cheered.
14. **A `ch` unit, or a hand-typed value a token already owns?** Widths in rem (`measure.body` = min(28rem, 100% − 2rem)). Colours, shadows, materials, weights from tokens. **Cite the token, never the number** — a literal is how every drift in this system started, and a specific number survives edits a token name wouldn't, because it looks deliberate.

## The four registers (pick the register, not the room)

| Register | Rooms | Canvas | Material | Column | Motion |
|---|---|---|---|---|---|
| Live | Reading Room · Commons | none (aurora) | material-thin | 48rem | accrual only |
| Reading | Archive | paper-cream | material-regular | 28rem | none |
| Writing | Writing Desk | paper-parchment | material-regular | 28rem portrait | minimal |
| Issued | Receipt | paper-cream | paper | 34rem portrait | bloom once, then static |

Aurora limits, now load-bearing rather than advisory: chroma ≤ 0.22, ≤ 5 lobes, and **the band is bounded so `--text-secondary` clears 4.5:1 at every point** — text on the band is safe by construction, not by placement. No full-bleed photography, no repeating patterns.

## Where findings go

- **Spec clear, code disagrees** → conformance. Fix it. No queue entry.
- **Spec silent, two readings, or a framework's default nobody chose** → append to `RATIFY.md` with the *kind* named and **the evidence attached, not the argument**. Render both readings and let the container decide; a clip, an overflow, or a contrast number settles it far cheaper than prose.
- **A rule that exists only inside a profile or a register is invisible to the general case.** If you go looking for a rule and find it in an unexpected section, that is a finding worth queueing on its own.
