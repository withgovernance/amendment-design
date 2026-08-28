---
# ---------------------------------------------------------------------------
# PROVENANCE — check this before citing anything below.
#
# canonical-repo: withgovernance/amendment-design
# spec-version:   v2026.08.28.5
# authored-in:    Claude Design project 151c8ef0-0bee-488c-a286-bb4aeda9470b
#
# This file has TWO homes, which is the condition that produced every drift in
# CHANGELOG.md. The rule that keeps it honest:
#
#   RATIFICATIONS ARE AUTHORED HERE. THE REPO IS THE ONLY PUBLISHER.
#
# A ratification is not finished when this file changes. It is finished when
# the change is committed to the canonical repo, `spec-version` above is
# bumped in the same commit, and the consumer's pin moves. Until then the
# change exists but has not shipped, and no consumer should be told to follow
# it.
#
# STALENESS CHECK, first thing in any session that will cite this file:
# compare `spec-version` above against the canonical repo's latest tag.
#   - equal        → this file is current; proceed.
#   - repo newer   → THIS FILE IS STALE. Something was committed to the repo
#                    without coming through here. Reconcile before citing it;
#                    do not assume the difference is unimportant.
#   - repo older   → unpublished ratifications are sitting here. Publish them
#                    before starting new work, or the next consumer to sync
#                    gets a version that silently lacks them.
#
# Never hand-edit this file's copy in a consuming repo. Consumers pin a tag.
#
# VERSION SCHEME, ratified 2026-08-28: `vYYYY.MM.DD`, dated in UTC, with a
# `.N` serial appended from the SECOND ratification onward on the same UTC
# day (v2026.08.28, then v2026.08.28.2). The scheme was silent on this and
# the second pass of 2026-08-28 hit it immediately: the date was taken and
# the only alternatives were overwriting a published tag or inventing a
# convention per session. Dated in UTC because the first 08-28 pass already
# was, and a mixed convention makes tag order stop matching history order.
# ---------------------------------------------------------------------------
name: Living Document
description: >-
  The design system for a legislative-intelligence product whose thesis is that
  the rule of law is a living document — rooted in history and institutions,
  but designed to evolve. The system has two layers. The ink layer is
  permanent: serif headings, Midnight Indigo primary, and one Momentum green
  carrying every action and every act of assent — the colors of constitutional
  stationery, archive paper, and the wax seal kept for issued artifacts. The
  aurora layer is alive: a soft blue-hour gradient that breathes beneath
  frosted glass surfaces, never competing with the ink but never static.
  Ink beneath, living breath above.

color:
  # -----------------------------------------------------------------------
  # INK LEGIBILITY — read this before choosing any coloured text token.
  # Three rules, ratified 2026-08-28 from measured renders. They compose:
  # the pair is necessary, the ground is necessary, and neither alone is
  # sufficient.
  # -----------------------------------------------------------------------
  ink-switch-is-palette-wide: >-
    RATIFIED 2026-08-28. THE LIGHT/INVERTED INK SWITCH IS A PROPERTY OF THE
    PALETTE, NOT OF GREEN. Every semantic family behaves the same way: the
    BASE token is the ink on light and fails inverted; the -soft counterpart
    does the reverse. success/success-soft, warning/warning-soft,
    danger/danger-soft, functional/functional-light, and action all measure
    the same shape. NOT ONE TOKEN IN THE PALETTE CLEARS 4.5:1 IN BOTH
    SCHEMES, which is why there is no such thing as "the" colour for a
    semantic meaning — there is a pair, and the scheme picks.
      SO: a semantic ink is its base token on light and its -soft
      counterpart under inversion. color.action.fill-rule-which-green is now
      ONE INSTANCE of this rule, not the rule; green was simply the family
      that got measured first.
      NO CONTRAST TABLE IS RECORDED HERE ON PURPOSE. See
      ink-ground-is-a-placement, which is why any such table would be a
      false constant.
  ink-ground-is-a-placement: >-
    RATIFIED 2026-08-28. ON THE LIVE CANVAS, CONTRAST IS A FUNCTION OF WHERE
    THE ELEMENT SITS, NOT OF THE TOKEN PAIR. The canvas carries the aurora,
    which is a gradient, so the ground moves continuously down the page and
    a token's contrast moves with it. MEASURED on the shipped render, dark
    scheme, one token (action) against the bare canvas at five vertical
    positions: 2.15:1 inside the aurora band at the top, rising to 6.32:1
    below it — a THREEFOLD swing with no change to the token, the scheme, or
    the material.
      SO: "--color-success is the light-mode ink" is necessary and NOT
      sufficient. The pair from ink-switch-is-palette-wide holds on an
      opaque, aurora-free ground. Inside the aurora band nothing in the
      palette holds; see ink-needs-an-opaque-ground.
      COROLLARY, and the reason this is a rule rather than a note: A SINGLE
      CONTRAST NUMBER FOR A TOKEN IS MEANINGLESS UNLESS IT NAMES THE
      POSITION IT WAS TAKEN AT. Two sessions measuring the same token on the
      same page disagreed by a factor of two, and both were correct for
      where they sampled. Quote the position or do not quote the number.
  materials-are-a-second-copy: >-
    RECORDED 2026-08-28. The token EXTRACTION sanctioned on 2026-08-28
    covers colour and radii; THE MATERIALS ARE NOT EXTRACTED. The consumer
    hand-reimplements every material as a Tailwind @utility, and at least
    one has drifted hard — material-chrome dark is 90% zinc there and
    bg-white/12 here, which is not a rounding difference, it is the
    opposite treatment. Worse, the consumer's stylesheet carries PROSE
    documenting the drift ("material-chrome: 12% white") in the register of
    a rule, so the copy reads as authoritative to anyone who opens it.
    This is trap 4 at file scale: a file that restates values IS a competing
    copy of the system, and the materials now have two homes the way
    DESIGN.md once did.
    NEEDS: the materials brought under the same regenerate-and-diff guard as
    the colour tokens. Until then, every material citation should be checked
    against colors_and_type.css rather than the consumer's utility.
  canvas-divergence-2026-08-28: >-
    UNOWNED DEFAULT, recorded not resolved. TWO DIFFERENT CANVASES ARE IN
    PLAY UNDER ONE NAME. This spec's .amendment-app paints var(--canvas) =
    neutral-100 light / neutral-900 inverted. The shipped body paints
    slate-100 light and a hardcoded #080c17 inverted, plus the aurora layer.
    The value that reaches the rendered surface is the shipped one, so that
    is what the system currently MEANS.
    THEY ARE NOT THE SAME ROLE, which is why this is a naming bug rather
    than a mismatch: #080c17 plus aurora is the LIVE register's ground, and
    the neutral pair is the OPAQUE ground that ink-needs-an-opaque-ground
    requires. One token is doing both jobs and can only be right for one.
    NEEDS: a named Blue Hour token for the Live base, leaving --canvas as
    the opaque reading/writing ground. Not decided here because the naming
    touches the register table and should move with it.
  ink-needs-an-opaque-ground: >-
    RATIFIED 2026-08-28, and it RETIRES A HARD RULE THAT HAD NEVER BEEN
    RENDERED. The rule said: chrome that must overlap the aurora carries
    material-chrome, "which re-establishes a ground." MEASURED, IT DOES NOT.
      Dark scheme, one position inside the aurora band, action as ink:
        glass with backdrop-blur   2.87:1
        glass, blur removed        3.45:1
        OPAQUE ground (--canvas)   6.10:1
      And ordering the materials by thickness does not help — every material
      lands between 2.6:1 and 3.0:1 for danger-soft in the band, with
      material-thick and material-chrome among the WORST, not the best.
      TWO MECHANISMS, and the second is the surprise. (1) Translucency
      passes the aurora through: a partly transparent panel over a gradient
      is still over the gradient. (2) backdrop-filter: blur(50px) samples a
      wide neighbourhood and AVERAGES NEIGHBOURING BRIGHT LOBES INTO the
      panel — so a glass panel near a bright lobe is LIGHTER than the canvas
      beneath it, which is the opposite of what a darkening overlay is
      supposed to do. Glass does not cover the aurora; it blends it.
      SO: COLOURED INK REQUIRES AN OPAQUE GROUND. Glass is legal for
      primary/secondary text, which is a luminance ramp against its own
      material and does not depend on hue separation. Anything carrying a
      semantic hue as text — status, error, success, a stamp, a count —
      needs an opaque plate, and inside the aurora band it needs one
      regardless of scheme.
      This is trap 3 collecting: the rule had no specimen, so it was wrong
      somewhere, and it was wrong exactly where it was most confidently
      cited.
  # -----------------------------------------------------------------------
  # COLOR SPACE — the authoring rule. Anything this system AUTHORS is
  # written in oklch(). Hex survives only where the value is a verbatim
  # Tailwind default we are aliasing, and is annotated as such, so the
  # alias stays greppable against the framework.
  #
  # CORRECTED 2026-08-28: for the NEUTRAL ramp that escape no longer holds.
  # Tailwind authors its own palette in oklch as of v4, so the hex is no
  # longer verbatim and no longer greps against anything — see color.neutral,
  # which now cites the framework instead of copying it. The escape still
  # covers a genuine one-for-one alias; it does not cover "this used to
  # match."  Text and border colors
  # are the one standing exception: they are opacity on pure black or
  # white (`rgb(0 0 0 / N%)`) because they must composite predictably
  # over glass, paper, and aurora alike — see color.text. A new authored
  # value must not enter the system as hex.
  # -----------------------------------------------------------------------
  # PRIMARY — Midnight Indigo. The institutional ink. Used for active nav,
  # default buttons, selected states — the user's own trail through the
  # product.
  # -----------------------------------------------------------------------
  primary:
    midnight-indigo-light: "#334155"   # slate-700 — hover / gradient top light
    midnight-indigo:       "#1e293b"   # slate-800 — default
    midnight-indigo-dark:  "#0f172a"   # slate-900 — active / gradient top dark
    plate-not-mark: >-
      RATIFIED 2026-08-28. PRIMARY IS A PLATE COLOUR. IT HAS NO INVERTED
      COUNTERPART AS A MARK, AND THAT IS A LIMITATION, NOT A GAP TO FILL.
      Midnight Indigo is dark by definition, so under inversion a primary
      RULE, UNDERLINE, BORDER or INK disappears into the canvas — measured
      on the shipped dark render, primary is 1.03:1 and primary-light
      1.37:1 against the ground, both far under the 3:1 non-text threshold.
      A primary PLATE is unaffected and correct in both schemes: the avatar
      is white on indigo and reads either way.
      NO TOKEN IN THE PALETTE CAN CARRY THIS. The one light-enough neutral
      family is functional, and functional MEANS the system — so borrowing
      it to mark the user's own trail would say the opposite of what the
      mark exists to say.
      SO: under inversion a primary mark resolves to the hairline neutral,
      and THE PRIMARY/SLATE DISTINCTION IS A LIGHT-MODE DISTINCTION. In dark
      the difference between "your trail" and "the system listening" is
      carried by position and label, not by hue. Say this out loud rather
      than shipping a substitute hue that quietly means something else — the
      blockquote bar already ships the neutral, and it is correct.
  # -----------------------------------------------------------------------
  # ACTION — Momentum green. Reserved for moments of intent AND for the
  # crowd's assent: CTAs, FAB, co-signs, counts, thresholds, answered
  # positions. One accent, because co-signing IS joining.
  # -----------------------------------------------------------------------
  action:
    # Momentum green. Sampled from the SHIPPED --aurora-curtain (lobe 2,
    # oklch .72 .19 160) brought down to button lightness — the product's own
    # light, not an authored hue. Replaced Oxblood 2026-08.
    action:       "oklch(.66 .148 160)"
    action-hover: "oklch(.72 .150 161)"
    action-active: "oklch(.60 .145 160)"
    action-label: "rgb(0 0 0 / 87%)"   # INK, not white — see below
    # One value in both modes. A bright fill needs no dark variant, and on the
    # dark canvas it is the only control that behaves like the aurora rather
    # than sitting on it.
    label-rule: >-
      The CTA label is ink. At L .66 white measures 2.90:1 and ink 6.42:1.
      Below about L .55 that reverses. Between roughly L .55 and L .60
      NEITHER label clears 4.5:1 — a saturated green sits almost exactly
      between white and black there. Do not move this token's lightness
      without re-measuring both labels.
  # -----------------------------------------------------------------------
  # SEAL — not a colour. A registrar's seal, a notary's seal, a corporate
  # seal: none of them are printed. They are PRESSED. The mark is a
  # deformation of the paper, not pigment applied to it. So the seal is a
  # BLIND EMBOSS — highlight up-left, warm shadow down-right, no ink at all.
  #
  # Oxblood is therefore retired from the system ENTIRELY (2026-08). It went
  # from the CTA because it shared a hue with semantic danger, vanished on the
  # dark canvas, and muddied against Midnight Indigo; it then went from the
  # seal too, because a seal that only appears once, on an artifact already
  # earned, has no business being the heaviest object on the page.
  #
  # There is no red in this system now except semantic danger.
  # -----------------------------------------------------------------------
  seal:
    treatment:  "blind emboss — see the .seal-emboss role"
    highlight:  "rgb(255 255 255 / 90%)"
    shadow:     "rgb(96 62 28 / 30%)"    # warm, because it is paper
    bite:       "rgb(96 62 28 / 10%)"    # the die's inner rule
    requires:   "paper. An emboss deforms a sheet; it has nothing to press into on glass or aurora."
    dark-mode:  "Better, not worse. Lamplit paper is warmer, so the shadow deepens."
    when:       "Issued artifacts only — post-send confirmation, Receipt, envelope postage corner. Never a button, never an avatar, never chrome."
  # -----------------------------------------------------------------------
  # FUNCTIONAL — Slate Blue. Attention without alarm. Used for focus rings,
  # the page-load progress bar, icon-button hover, and form highlighter
  # states. Never carries brand meaning on its own — only confirms that the
  # system is listening.
  # -----------------------------------------------------------------------
  functional:
    slate-light: "#94a3b8"     # slate-400
    slate:       "#64748b"     # slate-500 — default focus / loading
    slate-dark:  "#475569"     # slate-600 — hover
  # -----------------------------------------------------------------------
  # SEMANTIC — reserved for their conventional meaning. Never used for
  # brand-level decoration.
  # -----------------------------------------------------------------------
  semantic:
    success:      "#047857"   # emerald-700 — bill enacted, action completed
    success-soft: "#10b981"   # emerald-500 — positive badges
    warning:      "#b45309"   # amber-700 — admin notices, non-blocking alerts
    warning-soft: "#f59e0b"   # amber-500 — warning icon fills
    danger:       "#b91c1c"   # red-700 — destructive, error states
    danger-soft:  "#ef4444"   # red-500 — error badges. Red is now the ONLY warm
                              # in the system outside the seal, which makes
                              # destructive states clearer than they have been.
    danger-moved-to-red-700: >-
      RATIFIED 2026-08-28. MEASURED 4.39:1 as ink on the light opaque ground
      — under AA, on the very ground color.ink-needs-an-opaque-ground now
      REQUIRES. At red-700 it is 5.89:1. The plate improves too: a white
      label goes 4.83:1 to 6.47:1.
      THE STRUCTURAL ARGUMENT IS BETTER THAN THE NUMBER. Every other
      semantic base is the -700 step — success emerald-700, warning
      amber-700 — and danger alone sat at -600. It was the odd one out and
      it was the only one failing; those are the same fact. Moving it
      restores the convention rather than making an exception to it.
      The pair is unaffected: inverted ink is danger-soft, measured 4.71:1
      on the opaque canvas, unchanged.
      REPORTED AS UNFIXABLE — "there is no darker option, danger is already
      the darker red." There was: -soft is the LIGHTER neighbour, and the
      ramp continues downward past the base. Worth naming because the
      report was otherwise exactly right, and the one wrong clause would
      have turned a token change into a permanent AA exemption.
      NOT IN SCOPE: functional measures 4.33:1 on the same ground and is NOT
      moving. Its declared role is focus rings, progress, and hover states —
      graphical objects, which take the 3:1 threshold, and its own entry
      forbids it from carrying meaning as text. Do not "fix" it to match.
    opaque-ground-is-not-uniformly-safer: >-
      RATIFIED 2026-08-28, and it is the honest cost of
      ink-needs-an-opaque-ground. THE OPAQUE GROUND IS DARKER THAN GLASS IN
      LIGHT AND LIGHTER THAN GLASS IN DARK, so requiring it moves every
      token in OPPOSITE DIRECTIONS BY SCHEME. It rescues inverted ink and it
      makes light-mode ink harder. Danger was the first token to fall off
      that edge and it is why danger moved.
      SO: when a surface moves onto the opaque ground, re-measure BOTH
      schemes. A rule that fixes one scheme is not neutral in the other, and
      this one was written from dark-mode evidence.
    danger-inverted-is-not-broken: >-
      INVESTIGATED AND CLOSED 2026-08-28, NO TOKEN CHANGE. Stage 2.5 reported
      that danger is the one family with no ink passing inverted, measuring
      danger-soft at 4.37:1 on glass and proposing a lighter token. RE-
      MEASURED against the actual grounds: danger-soft is 4.71:1 on the
      opaque canvas and 4.88:1 on the flat lower page — IT PASSES. It fails
      only on glass (3.8:1) and inside the aurora band (2.2–3.0:1), which is
      where EVERY token in the palette fails.
      SO THE FAMILY IS FINE AND THE GROUND WAS THE PROBLEM. The fix is
      color.ink-needs-an-opaque-ground, not a new red. Worth recording as a
      method note: the entry was measured at one position on one material
      and generalised to "the palette has a hole," which would have bought a
      token change to fix a placement bug. Measure the ground before
      changing the ink.
  # -----------------------------------------------------------------------
  # MOMENTUM — Emerald. The crowd's assent and accountability met: co-signs,
  # endorsements, "candidate answered", counts climbing. Shares emerald with
  # semantic success ON PURPOSE — "a demand advancing" and "a bill enacted"
  # are the same meaning, learned once. Sanctioned as a BRAND accent ONLY on
  # the Commons surface; elsewhere emerald stays strictly semantic. Belongs
  # to neither party — which is what makes it the right color for civic
  # participation (civic is not partisan).
  # -----------------------------------------------------------------------
  momentum:
    # These are ALIASES of semantic.success*, not separate values. The
    # sharing is deliberate — "a demand advancing" and "a bill enacted"
    # are one meaning, learned once — so do not fork the values in order
    # to make the Commons-only scoping rule machine-enforceable. That rule
    # is editorial and it is enforced in review, not by the token layer.
    emerald:        "= color.action"   # THE SAME GREEN as the CTA, deliberately.
                                       # Co-signing IS joining; a constituent
                                       # signing and the counter moving are one
                                       # event seen twice. Giving them one colour
                                       # states the thesis instead of hedging it.
    emerald-soft:   "= semantic.success-soft"   # #10b981 — small count chips
    emerald-onDark: "= color.action"   # retired as a distinct value 2026-08;
                                       # a bright accent needs no dark variant.
    fill-rule: >-
      DECIDED 2026-08. A green PLATE is a control; green INK is a report.
      Fill means press me. Anything green that is not a filled plate — a
      numeral, a chip, a stamp, a rule, a check — is reporting a fact that is
      already true. Meters, bars, and ribbons are exempt: they encode
      quantity, not affordance. The rejected alternative was filled-means-done
      / outline-means-available, which reads well on a checkbox and is wrong
      here: it ghosts the primary action, and a page where every state is a
      filled plate is a page where everything looks like a button.
    fill-rule-which-green: >-
      SCOPE NARROWED 2026-08-28: this is ONE INSTANCE of
      color.ink-switch-is-palette-wide, which governs every semantic family.
      Read that first; what follows is the green case and its history.
      RATIFIED 2026-08-28, after stage 2 read the rule as self-contradictory
      and shipped the permissive branch. The two sentences do not disagree;
      they govern DIFFERENT TOKENS, and the missing sentence was this one.
      THREE distinct claims, and conflating any two produces the apparent
      contradiction:
        (1) FILL vs INK is global. A filled green plate is a control anywhere
            in the system; green ink is a report anywhere in the system.
        (2) WHICH green is ink is a CONTRAST fact, not a taste one.
            --color-action is a PLATE colour; as text it measures 2.62:1 and
            is FORBIDDEN. Green ink is --color-success on light, switching to
            --color-action under inversion. This was already specified — see
            registers.email.action and .inversion, where the switch is
            spelled out — but it lived only inside a profile, so the general
            case never found it. Stage 2 re-derived it by measurement and
            arrived at the same pair (success light / action dark), which is
            the best possible evidence that it is right and that it was in
            the wrong section.
        (3) WHERE A CROWD IS COUNTED scopes the MOMENTUM ACCENT — the brand
            use of green for co-signs, endorsements, tallies, threshold
            meters, per registers.live.palette-rule. It does NOT withdraw
            semantic success from its conventional meanings. `success` still
            means enacted, completed, verified, wherever those occur; that is
            what the "single, scoped exception" clause in the prose section
            was distinguishing, and reading the scope as global deletes the
            semantic family's entire reason to exist.
      SO, AS AN INSTANCE AND NOT A RULE: an ENACTED stamp is legal green
      ink (a bill enacted is success in its conventional sense), which
      means --color-success on light and --color-action under inversion,
      per the switch in (2). It is never --color-action on light. AMENDED
      2026-08-28: this closing line previously read absolutely -- "it is
      --color-success ink ... NOT the action green" -- which, read alone,
      forbids in dark exactly what (2) requires there and ships the label
      at 3.56:1. The example is what a hurried reader reads, so the
      example has to carry the switch. A green plate that cannot be
      pressed is a violation under (1) regardless of which token it uses.
    fill-rule-corollary: >-
      A RULE THAT LIVES ONLY INSIDE A PROFILE OR A REGISTER IS INVISIBLE TO
      THE GENERAL CASE. The which-green answer sat in the email profile for
      three weeks and cost a full re-derivation. When a rule is discovered
      while writing a profile, hoist it to the section it actually governs
      and let the profile cite it — profiles are where general rules go to
      hide, because everyone reads them as being about email.
      ESCALATED 2026-08-28 — THIRD INSTANCE, SO IT IS NOW A PROCEDURE, NOT A
      LESSON. (1) which-green sat in the email profile and cost a full
      re-derivation. (2) The ENACTED example outranked its own rule in four
      more places nobody swept. (3) motion.rules said "never transition
      transform" while components.toggle specified a thumb slide — and a
      session applying the general rule literally removed a specified
      behaviour without ever reading the component entry.
      THE PROCEDURE: BEFORE DECLARING A GENERAL RULE ABSOLUTE, GREP THE
      COMPONENT AND PROFILE ENTRIES FOR ITS EXCEPTIONS. If one exists, hoist
      it into the general rule in the same pass. A general rule whose
      exception lives in a component is not a rule with an exception — it
      reads as absolute to everyone who does not happen to open that
      component, which is everyone.
    fill-rule-ink-ground: >-
      RATIFIED 2026-08-28. GENERALISED THE SAME DAY — the placement half of
      this entry is now color.ink-ground-is-a-placement, which governs the
      whole palette and supersedes the flat-canvas numbers below; they were
      taken on a nominal ground with no aurora and hold only there. The tint
      ceiling stands. GREEN INK IS ONLY AS LEGAL AS THE GROUND UNDER
      IT, AND "ON LIGHT" IS NOT A GROUND. (2) says --color-success is the
      light-mode ink; it does not say what it is legible ON, and the
      answer moves fast enough to matter. MEASURED, success ink:
      5.48:1 on pure white, 4.99:1 on the neutral-100 page ground the app
      actually renders, 4.32:1 on neutral-200 — a FAIL one plate step
      down. So:
        - Measure ink against THE GROUND IT LANDS ON, never a nominal
          canvas. The shipped stamp is background-transparent; it inherits
          whatever it is placed on, so its contrast is a property of the
          placement, not of the component. A number measured against white
          overstates the headroom by roughly a full point.
        - A GREEN TINT PLATE CARRYING GREEN INK CAPS AT 10%. Measured on
          the neutral-100 page ground, --color-action at 10% behind
          --color-success ink is 4.52:1 — clearing the bar by two
          hundredths. At 15% it is 4.31:1 and fails. The 10% that ships is
          a framework step nobody chose; it survives on measurement, not
          on intent, and it has no room to grow. Under inversion the same
          plate with --color-action ink has more slack (6.03:1 at 10%),
          which is why this reads as a light-mode ceiling.
      RESOLVED 2026-08-28, see color.action.tint-is-not-a-plate. A tint is
      not a plate; this entry's ceiling stands as the contrast half.
    tint-is-not-a-plate: >-
      RATIFIED 2026-08-28 from a rendered ladder, which is the only way this
      could have been settled. THE "FILLED PLATE" IN THE FILL RULE MEANS THE
      TOKEN AT FULL STRENGTH. A tint is not a plate at any alpha, and the
      question "at what alpha does tint become fill" has no answer because
      alpha is not the channel carrying the affordance.
      THE RENDER: a co-signed chip at 0 / 10 / 20 / 40% action tint beside a
      real CTA, both schemes. At 40% the chip reads as a filled badge and
      still does not read as the CTA, because the control's identity is
      carried by FOUR channels the tint never touches — full-strength fill,
      elevation, corner radius (a control is rounded-md, a chip is
      rounded-full), and an ink label rather than coloured ink.
      THE PHOTOMETRY AGREES: measured as share of the CTA's own separation
      from its ground, the ladder reaches at most 30% in light and 17% in
      dark. A tint never approaches the control at any alpha on the ladder.
      SO: status is INK ON NEUTRAL MATERIAL. A coloured plate belongs to a
      control. This answers the general case as well as the green one —
      there is no tint token in any family and there should not be one; a
      surface wanting to show status reaches for ink, not a plate.
      The 10% ceiling in fill-rule-ink-ground still binds, and it binds for
      contrast, not affordance. It sits well below where affordance would
      even become arguable, so one number does both jobs.
      DISSENT RECORDED: the implementation session read the dark ladder as
      "even 40% still reads as a label" and concluded the affordance
      threshold is scheme-dependent. Reviewing the same render
      independently, 40% dark reads as a filled pill, not a label. The
      disagreement does not change the outcome — no alpha reaches the
      control in either scheme — but it is exactly why the render is
      reviewed by someone who did not build it.
  # -----------------------------------------------------------------------
  # NEUTRAL — the paper. Zinc scale, chosen for a warm-gray undertone that
  # complements slate-blue better than pure gray.
  #
  # THE FRAMEWORK OWNS THESE VALUES, not this file. CORRECTED 2026-08-28:
  # the ramp shipped here as hex, annotated "verbatim Tailwind default we are
  # aliasing" — which stopped being true when Tailwind moved its palette to
  # oklch in v4. MEASURED at v4.3.1: the framework has
  # oklch(96.7% 0.001 286.375) where this file had #f4f4f5, and
  # oklch(21% 0.006 285.885) where it had #18181b. Near-identical, and not
  # the same value — so a consumer re-emitting the hex would nudge every
  # zinc-* utility in its product off the framework's own value, in the
  # gamut where the difference actually shows, to fix nothing.
  #
  # So the ramp is named here and valued THERE. A consumer takes zinc, white
  # and black from Tailwind and does not redeclare them. This entry exists to
  # say WHICH ramp and WHY, which is the part a framework cannot carry.
  # -----------------------------------------------------------------------
  neutral:
    ramp:   "Tailwind `zinc` — the framework's values, not restated here"
    steps:  "50 · 100 (page canvas, light) · 200 · 400 · 500 · 700 · 800 · 900 (page canvas, dark)"
    white:  "Tailwind `--color-white`"
    black:  "Tailwind `--color-black`"
    why-zinc: >-
      Warm-gray undertone. Pure gray reads colder than the slate-blue
      primary and makes the aurora look like a cast rather than a light.
  # -----------------------------------------------------------------------
  # TEXT — opacity on black/white, per Apple HIG three-rung hierarchy.
  # NOTE: This approach is only safe because the Living Document aurora is
  # monochromatic low-chroma. On a rainbow aurora, opacity-text suffers
  # variable contrast; on this aurora it holds.
  # -----------------------------------------------------------------------
  text:
    primary-light:   "rgb(0 0 0 / 87%)"
    secondary-light: "rgb(0 0 0 / 55%)"
    tertiary-light:  "rgb(0 0 0 / 38%)"
    primary-dark:    "rgb(255 255 255 / 87%)"
    secondary-dark:  "rgb(255 255 255 / 55%)"
    tertiary-dark:   "rgb(255 255 255 / 38%)"
  border:
    hairline-light: "rgb(0 0 0 / 5%)"
    hairline-dark:  "rgb(255 255 255 / 20%)"
    subtle-light:   "rgb(0 0 0 / 10%)"
    subtle-dark:    "rgb(255 255 255 / 10%)"
  # -----------------------------------------------------------------------
  # BACKGROUND — the Blue Hour. Three stops, all within indigo / slate /
  # parchment territory. Decoupled from the accent tokens in source but
  # derived from the same hue family: 250 and 270 (matching primary slate)
  # with a warm 60 parchment lowlight.
  # -----------------------------------------------------------------------
  background:
    canvas-light: "#f4f4f5"
    canvas-dark:  "#18181b"
    aurora-light:
      - "radial-gradient(ellipse 72% 55% at 15% 8%,  oklch(0.88 0.05 250 / 0.40), transparent)"
      - "radial-gradient(ellipse 58% 46% at 85% 20%, oklch(0.90 0.04 270 / 0.32), transparent)"
      - "radial-gradient(ellipse 60% 50% at 50% 90%, oklch(0.94 0.03  60 / 0.28), transparent)"
    aurora-dark:
      - "radial-gradient(ellipse 72% 55% at 15% 8%,  oklch(0.30 0.08 250 / 0.45), transparent)"
      - "radial-gradient(ellipse 58% 46% at 85% 20%, oklch(0.25 0.06 270 / 0.35), transparent)"
      - "radial-gradient(ellipse 60% 50% at 50% 90%, oklch(0.40 0.03  60 / 0.20), transparent)"

typography:
  fontFamilies:
    sans:  "Archivo, ui-sans-serif, system-ui, sans-serif"
    serif: "Newsreader, ui-serif, Georgia, serif"   # Scotch roman, opsz 6-72
    mono:  "IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
  notes:
    sansAxis: >-
      Archivo is variable along weight (100–900) and wdth (62–125), and it has
      a TRUE ITALIC at every weight. Replaced Readex Pro 2026-08-13: Readex was
      excellent chrome and wrong as a body face — wide, soft, evenly weighted,
      so word silhouettes flatten at paragraph length — and it had no italic at
      all, which is the real reason every italic in the system had to be serif.
      Body copy sits at wdth 100; institutional chrome (navbar, breadcrumbs,
      column heads) moves to wdth 125 with 0.12em uppercase letterspacing —
      a register that reads clerical without shouting.
      Two costs, stated. The chrome register is ~4% NARROWER than before:
      Readex at HEXP 60 measured 334px for "ARCHIVE COMMONS WRITING DESK" at
      12px; Archivo at wdth 125 — its ceiling — measures 322px. HEXP was the
      more powerful axis; the loss is recovered in tracking, not in size.
      SELF-HOSTED as of 2026-08-13 (fonts/Archivo-VariableFont_wdth_wght.ttf +
      the italic), so the chrome register no longer depends on a reachable CDN;
      verified on upload that wdth is alive (251.7px → 315.7px across 100 → 125)
      and the italic is drawn, not synthesized. Newsreader and IBM Plex Mono are
      still CDN. The standing hazard is a REPLACEMENT cut with the axis stripped:
      it loads cleanly and silently collapses chrome to normal width. And
      because chrome now sits at the ceiling, WIDTH can no longer separate four
      registers: ceremonial is distinguished by tracking and size instead.
      Correct hierarchy anyway, but a spec change, not a token swap.
      Consequence worth stating plainly: the width presets are NOT a monotonic
      ladder — chrome (125) is wider than display (120). Width separates the
      CLERICAL register from the EDITORIAL one; display escalates by size and
      weight, ceremonial by tracking. Do not normalize this into 100/110/120/125.
    serifIntent: >-
      Newsreader carries every heading. A serif for the ink layer is a
      deliberate civic gesture: this is a document, not an app UI. A SCOTCH
      ROMAN specifically — the face of the nineteenth-century press and the
      printed record. It reads "set and issued" rather than "posted".
      Replaced Merriweather 2026-08 (audit §3.9). The deciding factor was
      structural, not stylistic: Merriweather is variable on WEIGHT but has
      no OPTICAL SIZE axis, so a single drawing had to serve both a 38px bill
      title and 15px statutory text.
    serifOpticalStops: >-
      ALWAYS set an opsz stop; the axis defaults high and a Scotch roman at
      the display end has hairlines far too fine for body copy.
        --serif-display  opsz 60 / wght 800   headings, bill titles, Receipt
        --serif-text     opsz 16 / wght 450   body, statute, analysis
        --serif-quote    opsz 24 / wght 400   quoted voice, 18px and up
      Text weight is 450, a half-step above regular: it reads sturdy rather
      than heavy, and it matters most on lamplit dark-room paper where a fine
      stroke loses contrast against the warm tan.
    weightCalibration: >-
      ONE sans weight scale (typography.fontWeights.sans). The former
      parallel light/dark scales are retired. The sans does bloom on a
      dark canvas, but only visibly at display sizes, so the correction is
      a single CSS-layer rule on the display roles — under `.dark`,
      display-hero and display-stat drop roughly 45 weight units — and it
      appears nowhere in component code. Contributors name one weight.
      Merriweather uses the canonical 100–900 scale.
      RECALIBRATED TO CANONICAL 2026-08-13. The old ladder (160/227/295/362/
      430/497/565/632/700) interpolated Readex's range to compensate for Readex
      reading optically heavy; Archivo does not, and its named instances at
      100…900 are the designer's own drawn stops. MEASURED by ink coverage of a
      fixed pangram at 16px (scratch/weight-measure.html): the old upper ladder
      ran one to two steps under its own name — "semibold" 497 had the ink of
      Archivo's MEDIUM (297,388 vs 298,483 at 500), "bold" 565 was lighter than
      its SemiBold, "black" 700 was exactly its BOLD, and 800/900 were
      unreachable. The scale is now plain 100…900.
      THE COST: --sans-semibold moves 497 → 600, +13% ink, and that token is the
      CTA label, the chrome label, the ceremonial register and the seal — all
      get visibly heavier. Correct, since they were rendering as Medium under a
      SemiBold name, but it is the visible change. Body moves 362 → 400 (+5%).
    weightLiterals-warning: >-
      ADDED 2026-08-27, after the recalibration's retired values came back
      into this file twice — once in a block written the same week the
      recalibration was ratified. Prose quoting a weight is a copy of a
      token, and 497 survives an edit that 600 would not, because 497 looks
      deliberate: nobody re-derives a number that specific. THE RULE: when
      citing a weight in prose, cite the TOKEN (--sans-semibold), not the
      number; if a number is unavoidable, it is a candidate for the next
      grep. Every retired-ladder value (160/227/295/362/430/497/565/632)
      is a search term, permanently.
    darkMetrics-invariant: >-
      ESTABLISHED 2026-08-27, and it is a property to protect rather than a
      note. Retiring the parallel dark weight scale left exactly THREE
      dark-scoped rules in the stylesheet that touch a type metric, and all
      three are lighter-or-equal (role-stat-display 700 → 650, and one
      dark:font-medium utility on a free-wrapping bubble). A lighter weight is
      narrower, so it cannot clip where the light mode did not. THEREFORE:
      light-clean implies dark-clean for clipping and horizontal overflow,
      provable over the whole stylesheet instead of sampled over stories.
      This is what a single weight scale BUYS — it is not merely tidier.
      Do not reintroduce a dark-only size, weight, tracking, or family
      without knowing that this invariant is what you are spending.
    widthDiscipline: >-
      Chrome width + uppercase is a specific signal (institutional chrome
      label). It should not become ambient noise. Use it for nav, breadcrumbs,
      form labels, and footer column heads — not for every small caption.
    widthDiscipline-measured: >-
      MEASURED 2026-08-27, and the measurement decided a reading the prose
      could not. A stat caption was called "chrome drift" and moved TO
      role-label-caps; at wdth 125 + 0.12em tracking "Endorsements" is 150px
      of unbreakable word in the twin-plate's 144px slot. It clipped. The
      clip is the argument: the chrome register is WIDER than the caption
      register, so a small label in a fixed narrow plate cannot be chrome
      without the plate being widened — and widening is layout, not type.
      Stat captions are `role-caption` (12px, weight 400, sentence case).
      The general rule: when it is ambiguous whether a small label drifted
      OFF chrome or INTO chrome, set it at chrome width and see whether its
      container can hold it. Chrome is for labels whose container was
      designed for chrome's width.
  fontWeights:
    # One scale. Dark-mode optical bloom is handled at the CSS layer on the
    # display roles only — see typography.notes.weightCalibration.
    sans:
      thin: 100
      extralight: 200
      light: 300
      normal: 400
      medium: 500
      semibold: 600
      bold: 700
      extrabold: 800
      black: 900
    serif:
      thin: 100
      light: 300
      normal: 400
      medium: 500
      semibold: 600
      bold: 700
      extrabold: 800
      black: 900
  widthPresets:
    # 104, NOT the axis default, and not a rounding. Widening a face lowers its
    # character count: measured in a 28rem column at 16px, Readex at HEXP 2 (the
    # face the measure was calibrated on) set 56 characters; Archivo sets 63 at
    # wdth 100, 60 at 104, 59 at 106, 57 at 110. At the default, body copy is
    # seven characters a line tighter than before the family changed — a silent
    # change nobody chose. 104 is also where Archivo's O is a circle (ink ratio
    # 1.014; true 1.000 at ~102). Parity with Readex needs ~110, where lowercase
    # stops reading as a text register. Applied 2026-08-14.
    sans-body:        '"wdth" 104'   # paragraphs, UI text
    sans-chrome:      '"wdth" 125'   # institutional chrome labels — use sparingly
    sans-display:     '"wdth" 120'   # hero stat numerals
    sans-ceremonial:  '"wdth" 125'   # once per page; tracking carries it, not width
  tracking:
    track-chrome:     "0.12em"
    track-ceremonial: "0.20em"
  # DEPRECATED — hexp-* survive as aliases onto the width presets so shipped
  # component code and the adherence lint keep resolving mid-migration.
  hexpAxisDeprecated:
    hexp-2:   "alias → sans-body"
    hexp-10:  "alias → sans-body"
    hexp-40:  "alias → sans-body"
    hexp-60:  "alias → sans-chrome"
    hexp-80:  "alias → sans-display"
    hexp-100: "alias → sans-ceremonial"
  # OPEN — THIS LIST IS NOT THE ROLE LAYER'S FULL INVENTORY. The roles below
  # are the type scale's rungs; colors_and_type.css implements those plus
  # lede, quote, metadata, stat-display, ceremonial, signature, and action.
  # Named 2026-08-27, when the role layer was first built in production and
  # the gap became a real question ("which of these am I allowed to use?").
  # Either the missing seven get entries here or this block states that it
  # covers the text scale only and points at the stylesheet for the rest.
  roles:
    display-hero:
      family: serif
      size: 1.875rem        # 30px mobile, scales up with responsive modifiers
      weight: 800
      lineHeight: 1.15
      tracking: "-0.01em"
    display-section:
      family: serif
      size: 1.5rem          # 24px
      weight: 800
      lineHeight: 1.2
    # RATIFIED 2026-08-27. A third display rung, added because markdown emits
    # h3/h4 and the scale had nowhere to put them: every call site was picking
    # its own text-lg/text-base + font-medium. Not a new idea — the rung was
    # already being improvised in component code, which is the condition the
    # role layer exists to end. Weight steps DOWN from 800 rather than up in
    # size: a minor heading is a quieter instance of the same voice, not a
    # smaller shout. h3 and h4 share it; markdown four levels deep is a
    # content problem, not a type problem.
    display-minor:
      family: serif
      size: 1.125rem        # 18px
      weight: 700
      lineHeight: 1.3
    body-lead:
      family: sans
      size: 1.125rem        # 18px mobile → 1.25rem sm+
      weight: 200           # extralight for marketing lead paragraphs
      lineHeight: 1.5
    body:
      family: sans
      size: 1rem
      weight: 400           # sans normal (was 362 on the retired ladder)
      lineHeight: 1.5
    body-serif:
      family: serif
      size: 1rem            # 1.125rem at lg
      weight: 300
      lineHeight: 1.625
    label-caps:
      family: sans
      size: 0.75rem         # 12px
      weight: 600           # semibold (was 497 on the retired ladder)
      lineHeight: 1
      tracking: "0.12em"          # track-chrome — recovers Archivo's narrower ceiling
      textTransform: uppercase
      fontVariationSettings: '"wdth" 125'
    # Metadata is serif ROMAN, not italic. Newsreader's italic is a true
    # calligraphic italic - single-storey a, real entry strokes - lovely at
    # 20px and genuinely hard at 14. That is not a fault in the face; it is
    # the old rule asking small italic to do too much, and it would recur
    # with any real serif. Merriweather's italic was just flat enough to hide
    # it. Changed 2026-08; metadata-italic kept as a deprecated alias.
    metadata:
      family: serif          # Newsreader roman, opsz 16 / wght 420
      size: 0.875rem         # 14px
      weight: 400
      style: italic
      color: secondary
      use: >-
        Byline, provenance, relationship descriptors, action-verbs in
        activity feeds. The distinct voice for *who / when / how*.
        Examples: "started by Brad Feld", "registered voter in Eldorado
        Springs, Colorado", "endorsed an hour ago", "representing you in
        Washington, D.C." This role is load-bearing on Archive sponsor
        cards and on any activity feed.
    caption:
      family: sans
      size: 0.75rem
      weight: 400
      lineHeight: 1.25
      color: "secondary"
    # -------------------------------------------------------------------
    # INLINE EMPHASIS INSIDE SERIF PROSE. Stated 2026-08-27; it was implied
    # by the metadata change and nowhere written, so the correct move looked
    # like a violation at review time.
    #
    # "Serif italic is quoted human voice" holds ABOVE 1.125rem, where
    # Newsreader's true calligraphic italic is legible. Inside body-serif
    # prose at 1rem it is not — the same finding that took metadata to roman,
    # same face, same size. So:
    #
    #   em / i inside serif prose at < 1.125rem  →  ROMAN, weight 600
    #   blockquote, pull quote, quoted voice      →  italic, --serif-quote,
    #                                                >= 1.125rem (role-quote)
    #   em inside SANS copy                       →  Archivo's real italic
    #
    # A caveat is roman. A voice is italic. Size is what decides which one
    # the reader can actually read.
    # -------------------------------------------------------------------
    emphasis-serif-inline:
      family: serif
      style: normal
      weight: 600
      use: "em / i within role-body-serif. Never italic at this size."
    code:
      family: mono
      size: 0.875rem
      weight: 400
      lineHeight: 1.5

spacing:
  unit: 4px
  inset:
    sm: 8px
    md: 16px
    lg: 24px
    xl: 32px
  container:
    # A CONTAINER IS A SHELL — the width a layout may occupy. It is not a
    # measure. See `measure` below; the two were the same token until
    # 2026-08-04 and that is how the prose column reached 97 characters.
    tight:  "max-width: 48rem"                 # 3xl — conversation columns, feeds
    normal: "max-width: min(31rem, 100%)"      # a prose page: measure.body + its 24px gutters
    wide:   "max-width: 80rem"                 # 7xl — navbar, footer
  measure:
    # -------------------------------------------------------------------
    # THE MEASURE — decided 2026-08-04, explorations/What 65ch Measures.html.
    # Stated mobile-first, in rem, DERIVED FROM A COUNTED LINE. Never in `ch`.
    #
    # `ch` is the advance width of the ZERO GLYPH OF THE ELEMENT CARRYING THE
    # RULE. `.page--prose` carried `max-width: 65ch`, inherited the body sans,
    # and was filled with serif prose: 65 sans zeros (9.79px) holding
    # Newsreader characters (6.53px) = 636px = 97 CHARACTERS. Nobody chose 97.
    # Two ambiguities stack — zero vs average glyph WITHIN a face (42% in
    # Newsreader), and the measuring face vs the rendered face BETWEEN two
    # (50%). Self-consistency fixes only the second: 65ch set on the serif
    # itself is still 92 characters.
    #
    # A MEASURE GOES ON THE ELEMENT THAT HOLDS THE TEXT, not on the shell.
    # The count is the intent; the rem is the value; re-derive the rem when a
    # text face or a role size changes.
    # -------------------------------------------------------------------
    body:  "max-width: min(28rem, 100% - 2rem)"   # 69 chars of role-body-serif @16px (avg glyph 6.53px)
    lede:  "max-width: min(24rem, 100% - 2rem)"   # 47 chars of role-lede @20px (avg glyph 8.17px)
    print: "6.5in"                                # paper takes its measure from the margin, not a count
    # OPEN — SANS BODY COPY HAS NO COUNTED MEASURE. `body` above (69 characters,
    # 28rem) was counted in NEWSREADER. Grading sans copy against a serif count
    # is the same category error `ch` was banned for. The 2026-08-14 width
    # calibration counted Archivo at 60 characters in that column at wdth 104,
    # which is inside the 45–75 range but is a byproduct, not a decision. A
    # counted sans measure is still owed.
    range: >-
      45–75 characters for continuous copy. 69 is the target, 75 is the
      ceiling, and anything past 75 is arithmetic rather than a choice.
      Metadata grids, tallies and rolls are not copy and may run wider.
    rule: >-
      NO LENGTH TOKEN MAY BE STATED IN `ch`. A `ch` value in a custom property
      is not resolved where it is defined — it is resolved at every use site,
      in that element's font, so the same token computed 636px on a page shell
      and 601px on a serif element. A length that computes differently per
      consumer is not a token, and it cannot be audited by reading, which is
      why four sessions of reading missed it.
  rhythm:
    section-y-mobile: 64px
    section-y-desktop: 128px
    card-gap: 12px

breakpoints:
  # Voyager uses Tailwind v4's default breakpoints — no custom
  # --breakpoint-* tokens are defined in app/globals.css's @theme block,
  # which means the defaults below are authoritative. Reach for the
  # Tailwind prefix in JSX (sm:, md:, lg:, xl:, 2xl:); do not invent
  # custom @media queries unless coordinating with the system owner.
  sm:   "40rem"     # 640px  — narrow tablets / very wide phones
  md:   "48rem"     # 768px  — tablets / small laptops
  lg:   "64rem"     # 1024px — laptops / small desktops
  xl:   "80rem"     # 1280px — desktop
  2xl:  "96rem"     # 1536px — wide desktop

  # Mobile / desktop boundary used by the rhythm tokens above:
  # "mobile" = below sm (i.e. < 640px). "desktop" = sm and above.
  # Use section-y-mobile by default, then bump to section-y-desktop
  # at the sm: breakpoint (e.g. py-16 sm:py-32).
  mobile-boundary: "< sm (i.e. < 640px)"
  desktop-boundary: ">= sm (i.e. >= 640px)"

radii:
  # Simplified from the prior system. Logic: sharper for chrome / inputs,
  # softer for content cards, softer still for floating surfaces.
  sm:   "0.25rem"   # 4px — inputs, chrome fragments, status pills
  md:   "0.5rem"    # 8px — buttons, cards, most content surfaces
  lg:   "0.75rem"   # 12px — modals, FAB, floating overlays
  full: "9999px"    # pills, toggles, avatars

borders:
  hairline:
    width: 1px
    color-light: "rgb(0 0 0 / 5%)"
    color-dark:  "rgb(255 255 255 / 20%)"
  subtle:
    width: 1px
    color-light: "rgb(0 0 0 / 10%)"
    color-dark:  "rgb(255 255 255 / 10%)"
  dashed-empty:
    width: 2px
    style: dashed
    color-light: "rgb(0 0 0 / 30%)"
    color-dark:  "rgb(255 255 255 / 30%)"

elevation:
  # FIVE named tiers: flat, whisper, raised, floating, chrome. Three carry
  # the ordinary range; whisper and chrome each have a real job (whisper is
  # the resting state of glass, chrome is the persistent navbar's wider
  # spread) and neither is a variant of the other three. Author shadows
  # from these five and no others. Materials carry surface definition;
  # elevation carries only shadow depth. They are orthogonal.
  #
  # Shadow ink is sourced from slate-900 (rgb 15 23 42) — one color
  # across the system. Slate-900 is the deepest stop of the Blue Hour
  # aurora, so cool shadows sit naturally on the canvas. Tinting with
  # neutral grey (zinc-800) reads as harsh artificial drop-shadow
  # against a blue aurora — wrong register.
  #
  # Each tier is a TWO-LAYER shadow (long-soft pass for depth + tight
  # pass for contact). Single-layer Tailwind defaults (shadow-sm /
  # shadow-md / shadow-lg) don't reproduce the spec geometry, so we
  # ship utility classes (shadow-whisper / shadow-raised /
  # shadow-floating / shadow-chrome) and components reach for those
  # instead of mixing Tailwind defaults with a tint.
  flat:
    shadow: "none"
    ring: "1px solid rgb(0 0 0 / 5%)"
  whisper:
    shadow: "0 1px 2px 0 rgb(15 23 42 / 0.04), 0 1px 1px -1px rgb(15 23 42 / 0.04)"
    use: "material-thin, ghost-button hover, default-button rest"
  raised:
    shadow: "0 4px 6px -1px rgb(15 23 42 / 0.12), 0 2px 4px -2px rgb(15 23 42 / 0.12)"
    ring: "1px solid rgb(0 0 0 / 10%)"
    use: "material-regular, default-button hover, cards"
  floating:
    shadow: "0 20px 25px -5px rgb(15 23 42 / 0.18), 0 8px 10px -6px rgb(15 23 42 / 0.18)"
    ring: "1px solid rgb(0 0 0 / 12%)"
    use: "material-thick, modal, FAB, dropdowns, secondary-button hover"
  chrome:
    shadow: "0 8px 16px -4px rgb(15 23 42 / 0.12), 0 3px 6px -3px rgb(15 23 42 / 0.12)"
    use: "material-chrome (persistent navbar). Wider spread than raised."

materials:
  # Five glass tiers. Uniform 50px blur (25px for chrome). Fall back to
  # solid zinc surfaces when the OS sets prefers-reduced-transparency or
  # prefers-contrast: more.
  material-ultrathin:
    description: Toggles, hover states, progress bars, form input backings
    bg-light: "rgb(255 255 255 / 10%)"
    bg-dark:  "rgb(0 0 0 / 2%)"
    backdropFilter: "blur(50px)"
    ring-light: "1px solid rgb(0 0 0 / 5%)"
    ring-dark:  "1px solid rgb(255 255 255 / 5%)"
  material-thin:
    description: Cards, ghost buttons, secondary containers
    bg-light: "rgb(255 255 255 / 45%)"
    bg-dark:  "rgb(0 0 0 / 26%)"
    backdropFilter: "blur(50px)"
    ring-light: "1px solid rgb(0 0 0 / 5%)"
    ring-dark:  "1px solid rgb(255 255 255 / 8%)"
  material-regular:
    description: Primary content cards, forms, search bars
    bg-light: "rgb(255 255 255 / 85%)"
    bg-dark:  "rgb(0 0 0 / 41%)"
    backdropFilter: "blur(50px)"
    ring-light: "1px solid rgb(0 0 0 / 10%)"
    ring-dark:  "1px solid rgb(255 255 255 / 10%)"
  material-thick:
    description: Modals, dropdowns, floating overlays
    bg-light: "rgb(255 255 255 / 95%)"
    bg-dark:  "rgb(0 0 0 / 60%)"
    backdropFilter: "blur(50px)"
    ring-light: "1px solid rgb(0 0 0 / 15%)"
    ring-dark:  "1px solid rgb(255 255 255 / 12%)"
  material-chrome:
    description: Persistent window chrome (navigation bar, mobile tab bar)
    # RESOLVED 2026-08-27. Two light values had been shipping side by side:
    # 75% on a --animate-navbar default with no call site, and 55% on the
    # material-scroll utility that every rendered navbar actually takes.
    # Nobody chose either — an unowned default, session 8's open item. The
    # 75% reached no surface, so it is deleted rather than reconciled: the
    # value in the code is the value the system means. Dark stays 90%,
    # because translucent chrome over a dark canvas reads as smoke.
    bg-light: "rgb(255 255 255 / 55%)"
    bg-dark:  "rgb(24 24 27 / 90%)"
    dark-is-a-dark-wash-and-that-is-load-bearing: >-
      REAFFIRMED 2026-08-28 against a render that appeared to argue the
      opposite. Stage 3 reported that material-chrome "is a white wash
      (bg-white/12)" in dark, that composited over the action green the bar
      drifts teal, and proposed replacing the spec's treatment with a dark
      tint. THE SPEC ALREADY SPECIFIES A DARK WASH — 90%, right above this
      line — and has since 2026-08-27. What the comparison rendered was the
      CONSUMER'S REIMPLEMENTATION, which ships dark:bg-white/12, labelled
      "MATERIAL-CHROME (SPEC)".
      RENDERED BOTH: at bg-white/12 the bar composites to a saturated green
      and does not read as chrome. At the spec's rgb(24 24 27 / 90%), over
      the same full-width green CTA, the bar is neutral charcoal with NO
      green cast — better than the shipped navbar's own material-thin plus
      tint, which still carries one.
      SO: CONFORMANCE, NOT RATIFICATION. Nothing in the palette changes. The
      navbar takes material-chrome as components.navbar already says, once
      the utility implements the value on this line.
      WHY IT LOOKED LIKE A SPEC PROBLEM, and this is the part worth
      remembering: the physics the report describes is REAL — a white wash
      cannot absorb the hue it blurs, which is the same mechanism as
      color.ink-needs-an-opaque-ground, one channel over. Correct physics
      applied to a mislabelled specimen produces a confident, well-evidenced
      argument for changing the wrong thing. A specimen that names which
      value it is rendering is not a nicety.
    backdropFilter: "blur(25px)"
    ring-light: "1px solid rgb(0 0 0 / 10%)"
    ring-dark:  "1px solid rgb(255 255 255 / 10%)"

# --------------------------------------------------------------------------
# CANVASES — opaque paper surfaces. Distinct from materials (which are
# translucent glass on aurora). A canvas is what you reach for when
# prolonged reading or writing needs to escape the aurora's chromatic
# motion and sit on something that behaves like paper.
#
# Glass is correct for chrome, cards, modals, and navigation.
# Paper is correct for statutory text, composed letters, and long-form
# analysis. The choice is functional, not aesthetic.
# --------------------------------------------------------------------------
canvases:
  paper-cream:
    description: >-
      Warm parchment for Archive reading surfaces. Bill text viewers,
      statute excerpts, long-form AI analysis on bill pages.
    bg-light: "oklch(0.965 0.012 85)"     # warm cream
    bg-dark:  "oklch(0.20 0.010 70)"      # aged ivory inverted (deep warm)
    rounded: "0.25rem"
    ring-light: "1px solid rgb(0 0 0 / 8%)"
    ring-dark:  "1px solid rgb(255 255 255 / 10%)"
    shadow: "raised"
    pairs-with: [ruled-page, line-numbers]
    when: "Archive bill-text viewers, statute excerpts."
  paper-parchment:
    description: >-
      Aged-paper tint for Writing Desk composition canvases. Slightly
      warmer than paper-cream — the tint of letterhead stock.
    bg-light: "oklch(0.955 0.018 80)"     # aged parchment
    bg-dark:  "oklch(0.22 0.012 65)"      # deep warm manila
    rounded: "0.25rem"
    ring-light: "1px solid rgb(0 0 0 / 10%)"
    ring-dark:  "1px solid rgb(255 255 255 / 10%)"
    shadow: "raised"
    pairs-with: [ruled-page, paper-grain, signature-line]
    when: "Writing Desk letter canvas, call-script composition."

motion:
  durations:
    instant: 100ms
    fast:    150ms
    base:    200ms     # default for buttons
    slow:    300ms
    marquee: 240s
    hero-fade: 1s
  easings:
    standard:   "cubic-bezier(0.4, 0, 0.2, 1)"
    emphasized: "cubic-bezier(0.2, 0, 0, 1)"
    linear:     "linear"
  rules:
    - "Transition only background, box-shadow, color, opacity, and ring. Never transition transform — EXCEPT a control drawing a state the user just committed. See committed-state-is-not-motion."
    - "committed-state-is-not-motion (RATIFIED 2026-08-28). A CONTROL DRAWING THE STATE THE USER JUST CHANGED IS NOT MOTION, and it is not on the two-surface budget. A toggle thumb crossing its track, a disclosure caret turning — these draw the change the person just made, at the moment they made it, on the control they touched. That is what 'no motion without meaning' says motion is FOR; refusing it spends the rule against its own purpose. THE PROHIBITION IS ABOUT HOVER AND DECORATION: scale() and brightness() on hover, sub-pixel wobble, compositing jank on an element nobody touched. Stage 5 read 'never transition transform' as unconditional and made four controls snap — including the toggle, whose OWN ENTRY specifies `transition-transform duration-200` and has since it was written. The general rule read absolute because its exception lived in a component. TEST: did the user just act on this element, and is the animation drawing the result of that act? Then it is feedback and it is permitted. Does it animate on its own, on hover, or on an element nobody touched? Then it is motion and needs a sanctioned surface."
    - "THE AURORA IS A LAYER, NOT A SURFACE, and its breathing is not on the budget (RATIFIED 2026-08-28). This document's own thesis says so twice — 'the aurora layer is alive… never static' and 'It breathes; it is the reason the page does not feel printed.' The budget governs what SURFACES do; the aurora is the light the surfaces sit on. The ink layer is still, surfaces get the two sanctioned motions, and the aurora breathes: that is the three-layer statement the prose always made and motion.rules never encoded, which is why stage 5 found a thesis and a rule pointing opposite ways."
    - "MARKETING IS OUTSIDE THE REGISTER TABLE, and so is its motion (RATIFIED 2026-08-28). The two-surface budget governs the FIVE PRODUCT ROOMS. Marketing surfaces are not rooms — they persuade rather than keep a record, which is why the restraint that makes the product trustworthy is not the right rule for them. Marketing motion is AMBIENT AND BOUNDED, and the bounds are the point, not a formality: it must be pausable on hover, gated to viewports where it is not competing for a small screen, motion-safe, and NEVER on a surface carrying record state — a bill, a count, a receipt, a signature. The 240s marquee at 6% opacity behind the campaigns card and the MarketingHome shimmer both already satisfy this; the rule ratifies what shipped rather than inventing a licence. motion.durations.marquee is theirs and stays declared."
    - "Never use scale() or filter:brightness() on hover — they cause compositing jank and sub-pixel icon wobble."
    - "Respect prefers-reduced-motion — all animations clamp to 0.01ms."
    - "Motion is permitted on exactly two surfaces: the Receipt (one-shot bloom at issuance) and the Commons (accruing momentum under real collective action). Both obey 'no motion without meaning' — motion reflects real state a person changed, never decoration. Hover states never move, on any surface."
    - "STREAMING IS NOT MOTION (stated 2026-08-02, audit §3.5). Text arriving token by token, a typing indicator, a skeleton resolving into content — these are CONTENT ARRIVING, not the interface moving, and they are permitted anywhere without spending the two-surface budget. The test: does it animate an element that is already on screen and already correct? Then it is motion and needs a sanctioned surface. Does it put content on screen for the first time? Then it is arrival. This carve-out is why the Reading Room's old 'generous' posture was a contradiction and not a third sanctioned surface."
    - "Chrome is still. The navbar is always chrome (material-chrome) and does not animate on scroll — the earlier scroll-timeline fade-in was removed because it broke on app routes whose content scrolls inside an inner container rather than the document root."

focus:
  color-light: "#64748b"   # slate-500
  color-dark:  "#94a3b8"   # slate-400
  width: 2px
  offset: 4px
  rules:
    - "Focus is slate — never amber, never the primary. It is the system listening, not the system celebrating."
    - "Buttons use outline-offset 4px; links 8px; inputs use a 2px inset slate ring."
    - "Focus styles are suppressed on mouse-only focus (focus:not(:focus-visible))."

components:
  # ==========================================================================
  # TOUCH TARGETS — cited 2026-08-11. Every entry below that has a target now
  # names `a11y.targetSize` and states its own minimum, because that rule's
  # own enforcement clause says a component that does not is not enforced.
  #
  # WHAT CITING IT FOUND, and it is the tab bar's finding again in four more
  # places: NONE of these controls declared a target, and four of them
  # arrive under the floor by the same arithmetic — padding plus the natural
  # height of their content. Measured at the specified values:
  #
  #   button-default / cta / secondary / ghost  0.5rem 1rem + 16px×1.5  = 40px
  #   input                                     8px + 16px×1.5         = 40px
  #   toggle                                    24px track             = 24px
  #   breadcrumb                                12px, line-height 1    = 12px
  #   button-fab                                declared               = 48px ✓
  #   button-icon                               declared               = 44px ✓
  #
  # The two that comply are the two that state a size. That is the whole
  # argument: 40px is not a decision anybody made about buttons, it is
  # `padding + line-height`, and the tab bar shipped 40 the same way.
  #
  # THE FIX IS `min-height`, NOT MORE PADDING. Padding changes the plate's
  # proportions and the type's optical centring; a declared minimum leaves
  # a compliant control alone and only grows the ones that fall short.
  # For a control shorter than the floor whose SIZE must stay small (the
  # breadcrumb's 12px caps, a dense inline chip), the target is expanded
  # around it — a transparent ::before at the minimum, centred — rather
  # than the visible box being inflated to match.
  # ==========================================================================
  button-default:
    description: Primary button — Midnight Indigo gradient. The workhorse.
    backgroundLight: "radial-gradient(from slate-700 to slate-800)"
    backgroundDark:  "radial-gradient(from slate-600 to slate-700)"
    hoverLight:      "radial-gradient(from slate-600 to slate-700)"
    activeLight:     "radial-gradient(from slate-800 to slate-900)"
    color: "white"
    rounded: "0.5rem"
    padding: "0.5rem 1rem"
    typography: "sans body semibold"
    shadow: "flat → raised on hover"
    ring: "1px solid rgb(0 0 0 / 5%)"
    transition: "background, box-shadow, color, ring 200ms standard"
    touchTarget:
      rule: "min-height: 44px, declared. See a11y.targetSize."
      why: >-
        The specified padding and type arrive at 40px — 8px + 24px + 8px — so
        every button in the system was 4px under the floor and no line of the
        spec said so. Applies to button-secondary and button-ghost, which
        inherit this geometry.
      known-divergence: "Production ships the 40px height. Spec ahead; the code migrates."
  button-cta:
    description: >-
      High-intent action — Momentum green, flat. No gradient: a bright fill
      does not need one, and a gradient under an ink label muddies the
      contrast the label depends on.
    background: "color.action (same value in both modes)"
    color: "color.action-label — INK, not white"
    implementation-home: >-
      STATED 2026-08-27. The CTA recipe lives in ONE place: the Button
      component's default variant. There is deliberately no `role-action`
      CSS utility — role-* is the TYPE layer, and a button is fill + ink +
      radius + padding + elevation + three interaction states, which is a
      component, not a role. A parallel utility would give the CTA two
      sources of truth, and the one that lost would drift silently.
      colors_and_type.css ships a .role-action for standalone HTML
      specimens; that is a specimen affordance, not the production home.
    known-divergence: >-
      MEASURED 2026-08-27, and this is the live one. Production's Button
      default ships an emerald-600 → 700 RADIAL GRADIENT with `text-white!`,
      and `--color-action` does not exist in globals.css at all. Both halves
      of this entry's first two lines are therefore violated on the most
      consequential control in the product — and in exactly the direction
      the description above warns about: a gradient under a label, and the
      label pushed to white because ink stopped being legible on it. The ink
      label is not a preference; it is what the fill's lightness was chosen
      for. Spec ahead; PR 2 (colour) owns the fix, and it is the highest
      priority item in it.
    rounded: "0.5rem"
    padding: "0.5rem 1rem"
    typography: "sans body semibold"
    hover: "color.action-hover (oklch(.72 .150 161)) — flat fill one step lighter, no gradient. Pressed is color.action-active (darker); ~6 points of lightness headroom before the ink label fails, so pressed never comes from more fill. (Corrected 2026-08-25: this line read 'red-700 → red-800 gradient', an oxblood leftover contradicting the description two lines above.)"
    touchTarget:
      rule: "min-height: 48px, declared — NOT 44. See a11y.targetSize.not-the-floor."
      why: >-
        This is the Send / Co-sign button: consequential, thumb-reached, and
        frequently the last control before something irreversible reaches a
        legislator. `targetSize` names exactly this case as the one that goes
        to Android's 48, and the CTA is the clearest instance of it in the
        system.
  button-secondary:
    description: Neutral action on a material-regular plate
    background: "material-regular"
    color: "primary text"
    rounded: "0.5rem"
  button-ghost:
    description: Tertiary / chip-style button (sample-question chips)
    background: "material-ultrathin"
    color: "secondary text"
    rounded: "0.75rem"
    hover: "material-thin alpha"
  button-fab:
    description: Fixed bottom-right action button — Momentum green.
    background: "color.action"
    color: "color.action-label — ink"
    rounded: "0.75rem"
    size: "48px mobile, 56px desktop"
    position: "fixed bottom: 20px; right: 20px; z-index: 10"
    shadow: "floating, intensified"
    touchTarget:
      rule: "Satisfied by `size` — 48px, above the 44 floor. See a11y.targetSize."
      why: >-
        One of only two controls that already complied, and it complies
        because it states a size rather than accumulating one. 48 is also the
        right number for it independently: fixed, thumb-reached, and the
        primary action of the surface.
  button-icon:
    description: Bare icon button. Slate on hover, never amber.
    background: transparent
    color: "primary text"
    hoverColor: "slate-500 (light) / slate-400 (dark)"
    rounded: "0.75rem"
    size: "44px"
    touchTarget:
      rule: "Satisfied by `size` — exactly 44px. See a11y.targetSize."
      why: >-
        The other control that already complied. Its 44 predates the
        provenance and is where the floor was in fact being honoured; the
        glyph inside is 16–20px, so the target is the button, not the icon.
        Do not let a smaller icon shrink it.
  avatar:
    description: >-
      Midnight Indigo, not a wax seal. An avatar is the user's trail through
      the product, which is precisely what the primary ink means. A seal is a
      mark pressed onto an ISSUED artifact and has no business in persistent
      chrome — changed 2026-08 with the rest of the oxblood retirement.
    background: "primary (gradient primary-light → primary)"
    color: "white"
    rounded: "full"
    typography: "sans semibold"
  navbar:
    description: >-
      Sticky top chrome. ALWAYS material-chrome — it does not fade in,
      blur in, or otherwise animate on scroll. See motion.rules and
      "Elevation Without Motion". A scroll-driven variant was removed:
      on app routes that scroll inside an inner container it never
      advanced past blur(0), leaving unblurred chrome over content.
    background: "material-chrome at every scroll position"
    height: "56px"
    padding: "8px"
    layout: "max-width 80rem, three-column flex (leading / middle / trailing)"
  tabbar:
    # Specified 2026-08-02 against components/global/TabBar.tsx and
    # Sidebar/nav-items.ts, measured at 390pt. Audit §3.7 asked for heights,
    # safe-area, active state and label treatment; only the last two existed.
    # Working file: explorations/The Tab Bar at 390.html
    description: Mobile-only bottom navigation
    background: "material-chrome"
    position: "fixed inset-x-0 bottom-0"
    visibility: "< sm breakpoint only; signed-in users only"
    activeColor: "slate-800 (light) / slate-300 (dark) — Midnight Indigo trail"
    activeTreatment: "Phosphor icon switches regular → fill, plus the active colour on icon and label. No motion: chrome is still."
    labelTypography: "sans-chrome 12px uppercase tracking-wider — text-xs is the floor, no exception for chrome"
    labelFit: >-
      MEASURED, not assumed. At 390pt the five slots are 74.8px each. At 12px
      the widest short label ("Races") measures 53.8px — 72% of its slot, with
      about a quarter spare. The audit worried the 12px floor might not
      survive five tab labels and resolved it on paper by raising the floor
      anyway; the tension never existed. What makes it fit is `shortLabel`
      (below), not the type size.
    items: >-
      A CURATED FIVE, not the whole nav. The sidebar carries seven
      destinations; the tab bar carries Dashboard · Asks · Elections · Bills ·
      Conversations. Actions and Tracked live in the account menu on mobile.
      Both navs compose from ONE list (`Sidebar/nav-items.ts`) so they cannot
      drift — keep that.
    shortLabel-required: >-
      Every tab bar item MUST define `shortLabel` (Home, Asks, Races, Bills,
      Chat). It is the single design decision that makes the 12px floor fit,
      and it was undocumented until 2026-08-02. Org-mode rows fall back to
      `item.label`, which is not written for a 75px slot — one long org name
      breaks the row. Require the short label there too.
    safeArea:
      rule: "padding-bottom: max(8px, env(safe-area-inset-bottom)). The spacer that reserves room for the fixed bar grows to match."
      why: >-
        Not handled at all as of e3d5242e. On any device with a home
        indicator the labels overlap the system gesture area by about 6px —
        the bottom of our tap target is the OS's, not ours.
    touchTarget:
      rule: "Each tab is an explicit 44×44 minimum. The gaps between tabs belong to their neighbouring targets, not to nothing."
      why: >-
        The tab is a bare link around a 40px icon span and a label, so the
        target is whatever the content happens to measure. Measured at 12px:
        Home 48.0, Asks 43.6, Races 53.8, Bills 50.8, Chat 43.3. Raising the
        label to 12px lifts three of five clear and leaves the two shortest
        words fractionally under — which is exactly why the minimum has to be
        declared rather than inherited from type size. See `a11y.targetSize`,
        which has said 44×44 since before any of this and was never applied.
    hidden-on:
      routes: ["/conversation/*", "/action/*"]
      rule: >-
        COMPOSING SURFACES SURRENDER THE CHROME. The dialogue and the Writing
        Desk are full-screen on mobile. This is the phone's version of a rule
        the system already holds — if the user reads or writes for more than
        thirty seconds they need paper beneath the text — and on a 390pt
        screen they also need the chrome out of the way. Production decided
        this; the spec is adopting it.
    signed-out: "No tab bar. It renders nothing until Clerk resolves; the spacer prevents the late arrival from shifting layout."
    known-divergence: >-
      Production ships `text-[10px]` labels and no safe-area inset. Spec
      ahead on both — the code migrates. 10px was never a constraint anyone
      met; it is a default nobody revisited, and audit §3.4 had already
      raised the floor with no chrome exception.
  card:
    description: Standard content card surface
    background: "material-regular"
    rounded: "0.5rem"
    padding: "16px"
  card-empty:
    description: Empty-state dashed placeholder
    background: "transparent"
    border: "2px dashed rgb(0 0 0 / 30%)"
    rounded: "0.5rem"
    padding: "32px"
    textAlign: "center"
    color: "tertiary text"
  modal:
    description: Popover and dropdown surface
    background: "linear-gradient from rgb(255 255 255 / 25%) to rgb(255 255 255 / 40%)"
    rounded: "0.75rem"
    padding: "4px"
    shadow: "floating"
    backdropFilter: "blur(8px)"
  modal-backdrop:
    background: "rgb(232 232 237 / 40%)"
    backgroundDark: "rgb(0 0 0 / 40%)"
    backdropFilter: "blur(20px)"
  input:
    description: >-
      Text field — a quiet recess on a translucent plate. The fill is
      intentionally faint (5% / 6%); the inset shadow and 1px inset ring
      do most of the recess work. Going heavier on the bg makes the
      input read as a dark slab on light card surfaces.
    background: "rgb(0 0 0 / 5%)"
    backgroundDark: "rgb(255 255 255 / 6%)"
    rounded: "0.25rem"
    padding: "8px"
    shadow: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)"
    ring: "inset 1px solid rgb(0 0 0 / 10%)"
    focusRing: "2px slate-500/80 inset"
    placeholder: "tertiary text"
    touchTarget:
      rule: "min-height: 44px, declared. See a11y.targetSize."
      why: >-
        8px padding on 16px text at 1.5 is 40px — the same 4px shortfall as
        the buttons, from the same arithmetic. A text field is a touch target
        before it is anything else: it is what a thumb aims at to start
        writing to a legislator, and a miss puts the caret nowhere.
      note: >-
        The recess is unaffected. The extra height goes to the field box, not
        the inset shadow or the 1px ring, so the "quiet recess" reading holds.
  input-label:
    typography: "sans-chrome 12px uppercase tracking-wide semibold secondary"
  toggle:
    track-off: "rgb(0 0 0 / 5%) / rgb(255 255 255 / 5%)"
    track-on:  "material-ultrathin"
    thumb:     "rgb(0 0 0 / 87%) / rgb(255 255 255 / 87%)"
    size: "44px × 24px track, 16px thumb"
    rounded: "full"
    touchTarget:
      rule: >-
        44×44 minimum, achieved by EXPANDING THE TARGET, not the track: the
        control keeps its 44×24 appearance and carries a transparent
        44×44 hit area centred on it. See a11y.targetSize.
      why: >-
        The 44 in `size` is the track's WIDTH, and it reads at a glance like
        compliance with a rule about a square — which is how this one hid.
        Vertically the target is 24px, the worst shortfall in the system after
        the breadcrumb. A 24px-tall control is 55% of the floor.
      do-not: >-
        Do not grow the track to 44px tall. A toggle that tall stops reading
        as a switch and starts reading as a plate, and the thumb geometry
        (16px in a 24px track) is what makes the state legible.
    motion: >-
      Thumb slides via `transition-transform duration-200`. Press
      feedback comes from `active:opacity-80` on the track, never a
      thumb scale — `scale()` on the press state caused compositing-
      layer jank and contradicted the system's no-transform-transitions
      rule (motion.rules).
      HOISTED 2026-08-28: the slide is not an exception this entry was
      keeping to itself — it is motion.rules.committed-state-is-not-motion,
      which now states the principle in the general case. It is recorded
      here because THIS ENTRY WAS THE ONLY PLACE THE PRINCIPLE EXISTED, and
      a session applying motion.rules literally removed the slide without
      ever reading this line.
  separator:
    height: "1px"
    background: "rgb(0 0 0 / 10%) / rgb(255 255 255 / 10%)"
    margin: "4px 0"
  link:
    color: "inherit (primary text)"
    decoration: "underline"
    decorationColor: "rgb(0 0 0 / 38%)"
    decorationOffset: "4px"
    hoverDecorationColor: "rgb(0 0 0 / 87%)"
    transition: "color 200ms"
  breadcrumb:
    typography: "sans-chrome 12px uppercase, tracking exactly 0.12em (--track-chrome). Corrected 2026-08-27: shipped 0.05em, which is chrome's width without chrome's tracking — the tracking is what recovers Archivo's narrower ceiling, so half of it is a different register."
    weightHierarchy: >-
      STATED 2026-08-27, found by implementation. role-label-caps sets
      weight 600, so applying it to the <ol> flattens every crumb to one
      weight and destroys the only signal that says which one you are on.
      Ancestors step back to weight 400; the current page keeps 600. A
      breadcrumb is a trail with a position on it — if every crumb weighs the
      same it is a list of links, not a trail.
    separator: "Phosphor CaretRightIcon, size 12px, tertiary text"
    activeColor: "primary text semibold"
    touchTarget:
      rule: >-
        Each crumb is a link with a 44px minimum target, expanded around the
        12px type rather than inflating it. Vertical padding may be as little
        as the layout needs; the hit area is declared. See a11y.targetSize.
      why: >-
        At 12px with line-height 1 and no declared padding the target is
        ~12px tall — 27% of the floor, the worst in the system, and on a
        surface where the crumb is often the only way back up a bill's
        hierarchy. This is the case the enforcement clause was written for:
        the type size is correct and the target is not, and they are not the
        same number.
      horizontal: >-
        The separator caret is NOT a target and takes no hit area — it is
        decoration between two of them. Adjacent crumbs' targets must not
        overlap; if a crumb's label is narrower than the space its target
        wants, the target stops at the caret.
  card-select:
    description: Icon + label radio tile group (e.g. jurisdiction picker)
    border: "2px solid rgb(0 0 0 / 8%)"
    borderSelected: "2px solid slate-800"
    backgroundSelected: "rgb(30 41 59 / 5%)"   # slate-800 at 5%
    rounded: "0.5rem"
    padding: "16px"
    touchTarget:
      rule: "Satisfied by geometry — an icon-and-label tile at 16px padding clears 44px in both axes. See a11y.targetSize."
      why: >-
        Recorded rather than declared, because this is the one control where
        the target genuinely does follow from the content and the arithmetic
        can be shown. Stated so that a future dense variant of the tile has
        to argue with a number instead of discovering one.
  progress-bar:
    description: Page-load top-of-window loader
    color: "slate-500"
    height: "2px"

# --------------------------------------------------------------------------
# REGISTERS — resolved 2026-08-02, audit §3.5. FOUR, not five and not three.
#
# The five rooms below are still the rooms; they are how the team talks about
# the product and they stay in the prose. But they were never five distinct
# TOKEN SETS, and the register list is what a contributor reads to pick
# defaults. A register earns its place if it differs in TOKENS, not adjectives
# — the same test the newcomer's lede was held to in §3.1.
#
# The audit proposed three. One of its two merges held and the other did not:
#   MERGED  Reading Room + Commons -> live. Four of five tokens were already
#           identical; the fifth (motion posture) was a contradiction rather
#           than a distinction. See motion.rules — streaming is not motion.
#   KEPT    Writing Desk and Receipt stay separate. Every token differs, and
#           after §3.7 the Receipt carries a portrait screen artifact AND a
#           three-ratio raster export family. A register that has to describe
#           both is not one register. "Compose, then issue" is good prose over
#           a real geometry difference.
# --------------------------------------------------------------------------
registers:
  live:
    rooms: [reading-room, commons]
    material: material-thin
    canvas: none                    # on the aurora
    lead-family: sans
    heading-family: serif
    column-width: "max-width 48rem"
    motion: "accrual permitted — counts climbing, rolls growing, aurora warming near a threshold"
    palette-rule: >-
      Momentum green appears WHERE A CROWD IS COUNTED. This replaces the old
      surface-scoped rule ("Commons only"), which no longer resolves now that
      the two rooms share a register. Green is a report here, never an
      affordance, per the fill rule — a co-signer count is a fact.
      A dialogue counts no crowd, so conversation views stay green-free.
  reading:
    rooms: [archive]
    material: material-regular
    canvas: paper-cream
    lead-family: serif
    heading-family: serif
    column-width: "measure.body — 69 characters (28rem)"
    motion: none                    # documents do not dance
    palette-rule: "Semantic status only. Rubber-stamp for state, slate ink for everything else."
  writing:
    rooms: [writing-desk]
    material: material-regular
    canvas: paper-parchment
    lead-family: serif
    heading-family: serif
    column-width: "measure.body, portrait — a letter is a letter"
    motion: minimal
    state: "editable, unsent"       # this is what makes it a workspace, not a product
    palette-rule: "Action green on Send. Everything else slate ink."
  issued:
    rooms: [receipt]
    material: paper-cream
    canvas: paper-cream
    lead-family: serif
    heading-family: serif
    column-width: "34rem portrait on screen; 56rem lives only in the wide raster export"
    motion: "bloom, once, at issuance"
    state: "frozen, keepable"
    formats: [html-portrait, raster-tall, raster-square, raster-wide]
    palette-rule: "Blind emboss carries no pigment. Exactly one coloured mark: the signature."
    # ADDED 2026-08-02 (audit §3.8). The emboss and the signature are PICTURES
    # of authority: the first needs a light model, the second needs
    # AmerikaSignature.otf. Neither survives email, plain text, a screen reader,
    # a forwarded quote or a low-bandwidth client. The NUMBER survives all five.
    proof-rule: >-
      Every issued artifact MUST state its ledger number as text — "LETTER NO.
      14,508", "SIGNER NO. 319" — on screen as well as in every export and every
      degraded transport. The number is the proof; the emboss is its
      illustration. An artifact that proves itself only by ornament cannot be
      forwarded, read aloud, or filed, and those are three of the things people
      actually do with a receipt. Where the number and the emboss disagree about
      which is load-bearing, the number wins.

# --------------------------------------------------------------------------
# PROFILES — a register carried into a transport that cannot run the system.
# Added 2026-08-02, audit §3.8. A profile is NOT a fifth register: it is an
# existing register plus a fixed substitution table. If a transport needs new
# TOKENS it is a register; if it needs the same tokens rendered by poorer
# machinery, it is a profile.
#
# THE VIEWPORT MODEL (the correction that produced this block). An email is a
# VIEWPORT, not a canvas — the same role the browser window plays on the web.
# Objects are placed into it. So paper is not email's background; paper appears
# only where a paper ARTIFACT appears, and one message can therefore hold two
# registers: a live ask on a card ABOVE an issued receipt on paper. The earlier
# proposal — "email is the ink layer alone on a cream sheet" — was rejected
# because it treated the window as a physical thing and left the receipt
# nowhere to sit.
#
# EMAIL IS THE SYSTEM'S REDUCED-TRANSPARENCY MODE, permanently. That collapse
# is already specified in colors_and_type.css for prefers-reduced-transparency:
# glass drops backdrop-filter and becomes solid zinc, and layout does not
# shift. Nothing was invented for email except a flat stand-in for the aurora.
# --------------------------------------------------------------------------
profiles:
  email:
    transport-note: >-
      Authored in production as react-email + Tailwind (pixelBasedPreset) and
      sent through Resend, so the tables are EMITTED, not written. This profile
      is therefore a Tailwind config plus a component set — not a rulebook
      about <td>. Registry lives in lib/notifications/types.ts; every new type
      declares a register here alongside its opt-out label.
    dead-on-arrival: [aurora, oklch, backdrop-filter, width-axis, web-fonts, gap, custom-properties, motion, seal-emboss, signature-face]
    substitutions:
      viewport: >-
        "#e7edf4" — the three aurora lobes composited over --canvas at their
        mean coverage, then rasterised. A DERIVED value, not a new token, and it
        does not belong in colors_and_type.css: a hex in the token file is a hex
        someone will use on the aurora. Dark: "#0f172a".
      cards: >-
        The reduced-transparency collapse, verbatim: material-thin/ultrathin →
        zinc-50 "#fafafa", material-regular → zinc-100. Cards separate from the
        viewport by RING, not contrast (1.13:1) — exactly as they do on the
        aurora. Dark: zinc-800 "#27272a", ring "#3f3f46".
      paper: >-
        "#f7f3eb" paper-cream, used ONLY for an issued artifact inside the
        message. Paper DOES NOT INVERT in dark mode — paper is lit, not
        swapped — so an issued artifact is the same artifact in both modes.
        The rule in one line: the frame inverts, the artifact does not.
      action: >-
        Momentum green plate "#08ad72" with the ink label "#01160f" (6.44:1).
        The fill rule transports intact: a green plate is a control, green ink
        is a report. Green INK on cards is --color-success "#047857" (5.25:1);
        the action green as text measures 2.62:1 and is forbidden.
      motion: >-
        A stopped accrual is a count. Sanctioned motion degrades to the state
        it was animating toward, stated plainly — "319 co-signs", "2,301 of
        2,500". Nothing is lost that the user needed, which is a fair test of
        whether the motion was carrying meaning.
      issuance: >-
        Typesetting, not pressing: the ledger number in mono, a double rule
        "#b6ac97", a signature line. See registers.issued.proof-rule — this
        profile is where that rule came from.
    type-stack:
      # Approved 2026-08-02. NO WEB FONTS: a webfont reaches a minority of
      # clients while blocking render in the rest (reasoning lifted from
      # voyager email/*.tsx). Georgia and Verdana are real answers, not
      # compromises — one is a screen serif, the other is genuinely wide.
      newsreader: "Georgia, 'Times New Roman', serif"
      archivo-body: "'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', Arial, sans-serif"
      archivo-chrome: >-
        "Verdana, Geneva, sans-serif" + uppercase + letter-spacing .12–.24em,
        NEVER below 12px. With no axis to expand the face, shrinking it is the
        one move that has nothing left to give.
      ibm-plex-mono: "ui-monospace, Menlo, Consolas, 'Courier New', monospace"
    dark-mode: >-
      Required, both modes, in every email — production already ships the
      mechanism (Tailwind dark: variants + both colour-scheme metas); this
      profile supplies the values. THREE MARKS CANNOT SURVIVE INVERSION and
      must switch rather than darken: the indigo plate (1.02:1 on zinc-800 →
      light plate with ink numerals), green ink (--color-success 2.72:1 → the
      bright action green), and EVERY LINK — a class on a paragraph does not
      reach its anchors, so an inline indigo link inside inverted body copy
      measures 1.02:1 and vanishes silently.
    registers:
      reading: "Bill notices, digests, status changes. The profile that barely degrades — canvas, column, serif lead and motion:none all survive transport."
      issued: "Delivery records, co-sign confirmations, receipts. An inbox is a filing cabinet, which is close to the artifact's intent."
      live: "NO EMAIL FORM. A stream cannot stream into an inbox. What arrives is a summary of live state — the reading profile with a count in it. Green is permitted on the crowd rule: a district summary IS a crowd counted."
      writing: "NO EMAIL FORM. You do not compose in an inbox. An email that invites writing is a reading email whose one action links to the Writing Desk."
    boundary: >-
      An email that is only an artifact is still not the artifact. A sheet in an
      inbox cannot be re-issued, cannot be exported to the three share ratios,
      and dies with the mailbox. Issued mail is the NOTICE of issuance —
      typeset like the thing it reports — and always links to the artifact.
    open: >-
      Real-client testing (dark mode in Gmail Android darkens the sheet and the
      double rule is first to disappear); tables, forms, loading states and
      Spanish are still unaddressed under §3.8.

# --------------------------------------------------------------------------
# SURFACES — the five rooms of the same civic building, mapped to the four
# registers above. Each surface carries its own PROSE, examples and accent
# list; its tokens come from its register. Where a surface's tokens and its
# register disagree, the register wins — that disagreement is a bug.
# --------------------------------------------------------------------------
surfaces:
  reading-room:
    register: live                  # merged with commons 2026-08-02, audit §3.5
    purpose: "Conversations, chatbot research, AI dialogue."
    mental-model: "Dialogue in session. A transcript unfolding in real time."
    lead-family: sans
    heading-family: serif
    default-material: material-thin
    canvas: none                    # stays on aurora; a dialogue is not a document
    motion-posture: static          # CORRECTED 2026-08-02. Streaming text is
                                    # content ARRIVING, not interface moving —
                                    # it obeys none of the bloom/accrual
                                    # mechanics. "generous" here was a
                                    # contradiction with motion.rules, which
                                    # has always sanctioned exactly two
                                    # surfaces. See motion.rules.
    rhythm: loose-vertical
    column-width: "max-width 48rem (3xl)"
    palette-emphasis: "Primary (Midnight Indigo) for user contributions and for inline citations — a citation is a trail into a source. Secondary-text heavy."
    skeuomorphic-accents: []        # intentionally digital — a dialogue, not a document
    examples:
      - conversation view (/conversation/:id)
      - conversation starter hero
      - inline AI analysis embedded in other surfaces
  archive:
    register: reading
    purpose: "Bill pages, statute references, primary-source legal documents."
    mental-model: "The stacks. A document with authority, meant to be read carefully."
    lead-family: serif
    heading-family: serif
    mono-family-presence: high      # bill numbers, statutory citations, line numbers
    default-material: material-regular
    canvas: paper-cream             # bill text sits on opaque warm parchment
    motion-posture: static          # documents do not dance
    rhythm: dense-hierarchical      # title → sponsors → summary → text → history → votes
    column-width: "measure.body for body text, wider grids for metadata"
    palette-emphasis: "Semantic status (success / warning / danger). Rubber-stamp for state — action green for enacted, slate for procedural, amber for vetoed. Slate ink for everything else."
    skeuomorphic-accents:
      - "rubber-stamp status badge (ENACTED / VETOED / IN COMMITTEE / PASSED HOUSE)"
      - "[proposed] postmark-style introduction-date stamp"
      - "[proposed] jurisdiction seal watermark at 8–12% opacity behind the header"
      - "[proposed] ruled-line bill text with [proposed] marginal line numbers (IBM Plex Mono, tertiary) — one artifact, demoted together 2026-08-02"
      - "§ section markers rendered at full serif weight"
      - "amendment redlines: strike-through for deletions, underline for insertions"
      - "progress-ribbon for bill journey"
      - "[proposed] lapel-pin avatars for sponsors (alternative to wax-seal monogram)"
      - "italic serif metadata for provenance ('started by X', 'representing Y')"
    newcomer-lede:                # audit §3.1, resolved 2026-08-01
      required: true              # every bill page has one; not optional chrome
      role: role-lede             # serif, --serif-text, 1.25rem/1.55, 52ch
      position: "Directly beneath the bill title, ABOVE provenance metadata and above the progress ribbon."
      content: "One sentence, second person, present tense: what the bill would do to the reader. Then three facts — who it affects, where it stands, who represents them — then exactly one action."
      register: >-
        The Archive's type, plainly written. The lede is not a second
        typographic voice; a sans 'plain' role was designed and rejected
        (see CHANGELOG 2026-08-01). Hierarchy does the work the family was
        being asked to do.
    examples:
      - bill detail (/oversight/:jurisdiction/bill/:bill)
      - bill text viewer
      - bill list (/oversight/bills)
      - jurisdiction landing pages
  writing-desk:
    register: writing               # NOT merged with receipt — see registers
    purpose: "Composing letters to representatives, call scripts, letters to the editor."
    mental-model: "Sitting down to write. Authoring a correspondence that will be delivered."
    lead-family: serif              # produced content is a letter; it should look like one
    heading-family: serif
    default-material: material-regular
    canvas: paper-parchment         # the composition canvas is aged-paper opaque
    motion-posture: minimal
    rhythm: centered-prose-column
    column-width: "measure.body — a letter is a letter"
    palette-emphasis: "Action green on the Send / Seal / Publish button. The oxblood WAX SEAL appears once, on the post-send confirmation — the letter is now an issued artifact. Everything else slate ink."
    skeuomorphic-accents:
      - "[proposed] faint horizontal ruling at line-height (4% black) on the letter canvas"
      - "[proposed] folder-tab step markers for the composition flow"
      - "[proposed] signature line with dotted rule and printed-name label beneath"
      - "[proposed] wax-seal confirmation stamp animation on Send (fades in, no bounce)"
      - "[proposed] envelope preview with postage-corner treatment on sent state"
      - "recipient address block formatted as letterhead"
      - "italic serif opening salutation ('Dear Senators & Representatives,')"
    examples:
      - action composer (/action/*)
      - letter preview / editing
      - call-script view
      - letters-to-the-editor composer
  receipt:
    register: issued                # NOT merged with writing-desk — see registers
    purpose: "Post-action confirmations — certificate-style artifacts issued after a civic action completes (letter sent, petition signed, bill tracked, vote recorded)."
    mental-model: "The receipt. The artifact you keep proving you did the thing. A diploma issued by a phone."
    lead-family: serif
    heading-family: serif
    mono-family-presence: medium    # ledger numbers, dates, place codes
    default-material: paper-cream
    canvas: paper-cream             # opaque parchment — this is an issued document
    motion-posture: arrival         # one moment of celebration on issuance, then static
    rhythm: centered-certificate    # wider than tall, like a diploma or banknote
    rhythm-note: >-
      CORRECTED 2026-08-02 (audit §3.7). The Receipt is TWO artifacts, not one
      shape: the artifact the user keeps is portrait HTML on the device it was
      issued to; the artifact the user shares is a rasterised image, and only
      that one is landscape. "A diploma issued by a phone" has to be issued AT
      the phone.
    screen:
      format: html                # live, selectable, linkable, keepable
      geometry: "portrait-native, single column, max-width 34rem"
      canvas: paper-cream
      motion: bloom-at-issuance
      note: "The 56rem landscape column is retired from the screen entirely. It survives only in the export family below."
    export:
      format: raster              # PNG image assets — never live HTML
      why: >-
        Production already ships this: people are given images, in three
        aspect ratios, because the platforms they share to crop differently.
        The system documents it rather than inventing something else.
      ratios:
        - "tall — 1080 × 1920 (9:16), stories and status"
        - "square — 1080 × 1080 (1:1), feeds"
        - "wide — 1200 × 675 (16:9), link previews and timelines"
      authoring: >-
        Each ratio is authored at its 1× pixel size and rendered at 2×, so
        type is set in real pixels and never scales below the 12px floor.
        Never produce a ratio by scaling another one.
      mandatory: "place-of-issue caption · title · ledger number · emboss · guilloche top and bottom"
      droppable: "the attribution line ('Issued to …') may be dropped at the wide ratio only"
      constraints: >-
        Paper is full-bleed in every export — the emboss has nothing to press
        into otherwise. No glass, no backdrop-filter, no aurora, no motion:
        a raster has no bloom. The emboss is never smaller than 44px at 1×.
    column-width: "max-width 34rem portrait on screen; the 56rem landscape proportion lives in the wide export only"
    palette-emphasis: >-
      Restraint everywhere, including the moment of issuance. The seal is a
      blind emboss and carries no pigment at all, so the finished Receipt has
      exactly one coloured mark on it: the signature. Aurora intensifies to its deepest stop
      for the celebration arrival. Otherwise palette-pure — no synthwave,
      no magenta, no off-system gradients. The receipt earns its glow by
      meaning, not by sparkle.
    skeuomorphic-accents:
      - "guilloche line-work border (top + bottom — the unmistakable issued-document signature)"
      - "place-of-issue caption (jurisdiction · date · session) in IBM Plex Mono"
      - "numbered ledger entry (e.g. 'SIGNER NO. 2,301', 'LETTER NO. 14,508')"
      - "[proposed] signature line with optional uploaded user signature"
      - "[proposed] wax-seal stamp at lower-right corner"
      - "[proposed] postmark with issue date in the header band"
      - "italic serif attribution ('Issued to / on behalf of')"
    motion-discipline: >-
      The issuance moment is the single time motion is generous on a
      Receipt. The certificate fades and scales in (250–400ms ease-out),
      the wax seal lands last with a subtle shadow drop. After that, the
      surface is static — receipts do not pulse, animate, or shimmer.
    examples:
      - "letter-sent confirmation (post-Writing Desk)"
      - "petition-signed certificate"
      - "'you tracked this bill' attestation"
      - "vote-recorded receipt"
      - "shareable civic-action card (downloadable / linkable)"
  commons:
    purpose: >-
      Asks, co-signs, candidate responses, endorsements, vote-pledges —
      the public, collective, accountability surface.
    mental-model: >-
      The public square. Where one person's demand becomes a district's,
      and where candidates answer on the record. Freedom of assembly and
      the right to petition, rendered as product.
    lead-family: sans              # present tense — live and social, not an archived document
    heading-family: serif          # the ask itself is authored; serif gives the demand weight
    default-material: material-thin
    canvas: none                   # stays on aurora — the Commons is live and public, never an artifact
    motion-posture: accruing       # the one surface besides Receipt where motion is permitted
    rhythm: feed-and-roll          # a vertical feed of asks; within an ask, a roll of co-signers
    column-width: "max-width 48rem for the feed; rolls, tallies, and meters may expand wider"
    palette-emphasis: >-
      TWO accents, not three. Midnight Indigo for your trail. Momentum green
      for everything else that matters here — your own intent AND the crowd's:
      co-signs, endorsements, candidate-answered, counts climbing. They are one
      colour on purpose; signing IS joining. Fill carries the difference: a
      filled green plate means DO THIS, an unfilled green mark means THIS
      HAPPENED.
    skeuomorphic-accents:
      - "signature roll — co-signers accumulate as a roll of names/avatars (the petition-sheet artifact)"
      - "on-the-record entry — a candidate response as a dated ledger line (position · bill · date)"
      - "tally — live count in IBM Plex Mono tabular-nums; the one number meant to be watched, not read"
      - "district threshold meter — an accruing bar that warms toward emerald as a district nears critical mass"
    motion-discipline: >-
      Momentum motion must reflect REAL aggregate state — a count that
      actually rose, a co-sign that actually landed, a threshold actually
      neared. Never decorative, never an idle loop. The aurora may warm up
      to ~10% chroma toward emerald as a threshold approaches, then holds
      at the new level (it does not pulse). Distinct from the Receipt's
      one-shot bloom: the Commons ACCRUES; the Receipt is ISSUED.
    examples:
      - asks feed (/asks)
      - ask detail with co-signer roll
      - candidate response / position card
      - endorsement + vote-pledge
      - campaigns strip

# --------------------------------------------------------------------------
# TACTILE ACCENTS — the rules that govern skeuomorphic detail.
# Tactile accents are garnish, not wallpaper. The system is primarily flat,
# translucent, and modern. Tactile references appear sparingly and only
# where they communicate meaning.
# --------------------------------------------------------------------------
tactileAccents:
  rule: >-
    A tactile accent must reference a real civic artifact (rubber stamp,
    embossed seal, signature line, postmark, ruled statute page,
    jurisdiction seal, envelope) AND serve a communicative purpose (status, authority,
    confirmation, identity). Ornament without meaning is forbidden.
  register: >-
    Accents are drawn in a 2026 register — vector-constructed with slight
    imperfection, never photographic. Textures stay below 4% noise.
    Ink-break on stamps is subtle (≤ 15% alpha variation). Paper grain
    is monochromatic and barely perceptible.
  dont:
    - "No drop-shadow faux-3D (iOS 6 skeuomorphism is a museum piece)."
    - "No gradient bevels, inner glows, or drop-shadow depth faked on a flat element. This is NOT a ban on the blind emboss: the canonical wax seal IS an emboss. As written this line forbade it from 2026-08 until running the promotion gates caught the conflict. What is forbidden is fake depth on something that is not paper; what is sanctioned is a real press into a real paper canvas."
    - "No American-flag accents, eagle icons, or other nationalist iconography — civic is not partisan."
    - "No photographic paper textures. Grain is procedural and monochromatic."
    - "No tactile accent without meaning — ornament is forbidden."
  # ------------------------------------------------------------------------
  # CANONICAL — three accents. Built, enforced, and safe to reach for without
  # asking. EVERY entry here carries `owner:` and `implementation:`. A
  # canonical entry without both is a bug — see `promotion.evidence`.
  #
  # The inventory was cut from twelve to four in 2026-08 because
  # documented-but-unbuilt is the worst state a component can be in. But the
  # cut was made from the document, not from the code: when the gates were
  # finally RUN against resistbot/voyager on 2026-08-02, six of thirteen
  # statuses were wrong in both directions. Three "canonical" accents had no
  # implementation at all (wax-seal, ruled-page, signature-line — demoted
  # below); two "proposed" accents were shipped and load-bearing (guilloche,
  # progress-ribbon — promoted here). See `explorations/Running the Gates.html`.
  # ------------------------------------------------------------------------
  canonical:
    rubber-stamp-status:
      description: "Rubber-stamp treatment for bill status on Archive surfaces."
      geometry: "Rectangular border, 2px stroke (`ring-2 ring-inset`), 2–4° rotation applied via inline transform so each render lands at a deterministic angle per status."
      typography: "sans semibold uppercase, sans-chrome, tracked 0.12em."
      ink-break: "Alpha noise 0–15% varying across the mark. Clean geometry."
      when: "Bill detail page, sits adjacent to the title row. One stamp per bill."
      owner: "Jason — head of product & design, The Governance Company"
      colors: "Green ink for positive status (enacted, signed) — per color.action.fill-rule-which-green that is --color-success on light and --color-action under inversion, NOT action green on light, which is 2.62:1 as text. Success and action are one hue, so a red ENACTED would contradict the palette; slate-700 for procedural (in committee, introduced, engrossed, enrolled); warning amber-700 for vetoed; danger red (--color-danger) only for truly dead/failed. Oxblood left the stamp palette in 2026-08. CORRECTED 2026-08-28: this field said \"action green\" flat, which the 08-28 which-green ratification forbids as ink."
      implementation: "app/(data)/oversight/[jurisdiction]/bill/[bill]/components/RubberStamp.tsx"
      divergence-resolved: >-
        CLOSED 2026-08-28. This entry recorded oxblood (`text-red-900`) shipping
        for enacted/signed and called it Spec ahead. The code migrated:
        RubberStamp.tsx now ships success ink on light and action under
        inversion, which is the which-green rule applied. The divergence is
        gone and the record is deleted rather than softened — a resolved
        divergence left standing teaches the next reader that none of the
        others can be trusted either.
    guilloche:
      owner: "Jason — head of product & design, The Governance Company"
      description: >-
        Engraved-line-work border in the tradition of banknotes, diplomas,
        stock certificates, and passports. The visual signature of an
        *issued document* — a piece of paper that proves something
        happened. Used exclusively on Receipt surfaces.
      promoted: >-
        2026-08-02, the first accent ever walked through `promotion.gates`.
        It had cleared IMPLEMENTATION, SPECIMEN and PURPOSE since before the
        gates were written; the only thing it lacked was a named owner, which
        is what had blocked every accent in the inventory.
      geometry: >-
        Two horizontal bands at top and bottom of the receipt artifact,
        drawn as overlapping low-amplitude sine waves at varying phases.
      density: >-
        20–40 lines per band, stroke 0.5–0.75 px, slate-700 at 20–30%
        opacity. Bands are 24–40 px tall on standard-size receipts.
      rules:
        - "PROCEDURAL ONLY — generate via SVG path or CSS pattern at the width the band is rendered at. Never import one fixed drawing and scale it."
        - "Used only on the Receipt surface. Never on Reading Room, Archive, or Writing Desk."
        - "Density tuned to mid-band: too dense reads as Federal Reserve cosplay; too sparse reads as decorative trim."
        - "Color stays inside the Living Document palette — slate-700 ink, never magenta or synthwave gradient lines."
      why-procedural: >-
        The rule used to justify itself as legal risk (do not trace a real
        banknote) and laziness. Both are true and neither is the reason. The
        reason is STROKE WEIGHT: a band authored once and scaled to fit takes
        its stroke weight with it. Production imports an 800×44 SVG and scales
        it, so the specified 0.6px engraving renders at 0.29px on a 390pt
        phone — under a device pixel at 1×, where the band greys into a smear.
        This is the Receipt's own history repeating: the ledger number reached
        5px the same way (audit §3.7). A procedural band is redrawn at its
        rendered width and its stroke is constant everywhere.
      when: "Top and bottom borders of every Receipt-surface artifact."
      implementation: "components/receipt/GuillocheBand.tsx (+ .stories.tsx)"
      specimen: "preview/brand-guilloche.html"
      owed: >-
        The shipped implementation is a scaled raster-style import and violates
        `rules[0]`. Promotion was granted on the artifact existing, not on it
        being correct; the redraw is owed. Do not close this by relaxing the rule.
    progress-ribbon:
      owner: "Jason — head of product & design, The Governance Company"
      description: >-
        Horizontal ribbon progress indicator for bill journeys
        (prefiled → introduced → engrossed → enrolled → complete). Thicker
        and more physical than a standard UI progress bar — evokes a
        filing strip or stamp-progression sheet.
      promoted: >-
        2026-08-02. Shipped in four call sites with two variants, a story and
        a specimen, and had been labelled `proposed` the whole time. Nobody
        had ever nominated it; the spec nominated guilloche instead, on the
        strength of how interesting it was rather than what existed.
      height: "8px"
      rounded: "full per segment, 1px gap between segments"
      track-light: "slate-400/20"
      track-dark: "slate-400/15"
      fill-active: "slate-500/70 + animate-pulse"
      fill-completed: "slate-700 / slate-500 (dark)"
      fill-success: "emerald-600 / emerald-500 (dark) — entire bar"
      fill-failure: "--color-danger — only the segment where the bill died"
      markers: >-
        Chrome-width uppercase 12px label centered beneath each segment.
        Earlier versions added a 2px tick mark above each label, but
        segments + labels alone are sufficient to encode the milestone
        positions; the ticks were a third graphic claim on the same
        row and read as redundancy.
      status-redundancy: >-
        The ribbon renders status alongside a RubberStamp that spells
        out the same value (ENGROSSED / ENROLLED / VETOED / ENACTED).
        Do not also caption the ribbon with "{status} on {date}" — the
        stamp + active segment + label already encode the status. The
        *date* is real new information; render it as italic-serif
        metadata adjacent to the ribbon, not as a chrome caption.
      failure-honesty: >-
        All failure statuses fuzzy-match to one terminal step, so the stage
        of death is not known. Production renders a single red pin at the
        first segment and replaces the milestone row with one caption rather
        than implying progress through unverified stages. Keep this.
      variants:
        ribbon: "8px segmented bar + sans-chrome label per step. Used on bill detail pages."
        compact: "Mini-bar (h-2) without milestone labels. Used in bill list tables."
      when: "Archive bill detail pages, on the paper-cream canvas."
      implementation: "app/(data)/oversight/bills/components/bill-status-progress-bar.tsx"
      specimen: "preview/progress-ribbon.html"

  # ------------------------------------------------------------------------
  # PROPOSED — described, not sanctioned. Do NOT ship one of these from the
  # spec alone. Each must clear `promotion.gates` first. A surface's
  # skeuomorphic-accents list marks these entries [proposed].
  #
  # EVERY entry here carries `blocked-on:` naming the gate it is stuck at.
  # An entry with no `blocked-on:` is a bug — see `promotion.evidence`.
  # ------------------------------------------------------------------------
  proposed:
    postmark:
      blocked-on: IMPLEMENTATION
      description: "Introduction-date stamp on bill pages."
      geometry: "Circular or date-roller rectangle. Slight rotation (2–6°)."
      typography: "IBM Plex Mono, uppercase. Jurisdiction abbreviation curved above; date straight below."
      ink-break: "Moderate — postmarks are imperfect by nature."
      when: "Near the top of a bill page. One per bill."
    jurisdiction-seal:
      blocked-on: PURPOSE            # the form is undecided, not just unbuilt
      description: "Jurisdiction seal as background watermark on bill pages."
      placement: "Centered behind the document content, on the paper-cream canvas (not on aurora chrome). The seal is what the document is *printed on* — it sits behind the title block."
      opacity: "5–8% — paper provides its own background contrast. Visible on inspection, invisible to scan."
      form: "Pending custom design. Earlier iterations tried (1) the JurisdictionFlag SVG passed through `saturate-0`, which read as a chromatic decal because flags are graphic-rectangular even when desaturated; and (2) a generic capitol-dome circular seal, which read as decorative ornament rather than civic mark. Both were pulled. The right form needs to dissolve into the cream paper as background ink, not compete with content as artwork."
      status: "Implementation removed; design TBD. Its absence is deliberately commented in production (BillContentSection.tsx) — the one entry in this inventory the system has always been honest about."
    line-numbers:
      blocked-on: IMPLEMENTATION     # blocked with ruled-page; they are one artifact
      description: "Statute-style line numbers in the left margin."
      typography: "IBM Plex Mono 12px, tertiary text"
      alignment: "right-aligned in a 2rem gutter"
      when: "Bill text viewer only. Numbers reset per section."
    ruled-page:
      blocked-on: IMPLEMENTATION
      demoted: >-
        2026-08-02, from canonical. There is no ruled-page implementation and
        there never was. Its only trace in production is a comment inside the
        `paper-cream` utility — "Pairs with ruled-page and line-numbers per
        spec" — a canonical accent cited in the codebase as though it existed.
        Canonical has to mean built or the next contributor ships their own
        ruling. Ships with line-numbers when it ships.
      description: "Faint horizontal ruling behind serif body text on statute views."
      stroke: "rgb(0 0 0 / 4%) / rgb(255 255 255 / 4%)"
      spacing: "line-height (every text baseline)"
      when: "Bill text canvas, Writing Desk letter canvas."
    wax-seal:
      blocked-on: IMPLEMENTATION
      demoted: >-
        2026-08-02, from canonical. The blind emboss is not built. What ships
        on the Receipt (`AmendmentEmblem.tsx`) is the brand mark at 40% opacity
        in `mix-blend-multiply` — a watermark, nearer the proposed
        jurisdiction-seal than the accent it was filed under. The emboss is
        still the right design; it is just not a fact yet. Do NOT let the
        watermark become the seal by default.
      description: "A blind emboss — the seal is PRESSED into the paper, with no ink at all. ISSUED ARTIFACTS ONLY: the post-send confirmation, the Receipt, an envelope's postage corner. Not on avatars (those are Midnight Indigo) and never in persistent chrome. It needs paper beneath it; an emboss has nothing to press into on glass."
      geometry: "Full circle with an inner rule (the die's raised border), monogram at centre. Everything is the paper's own surface — highlight up-left, warm shadow down-right."
      monogram: >-
        The monogram OWNS ITS PROPORTIONS — it does not inherit the ceremonial
        text register, and this was a real bug until 2026-08-13. A die is drawn
        to fill a circle, so the glyph size is a function of the die, not of
        whatever the body copy's widest preset happens to be. MEASURED at the old
        settings (26px, inheriting the ceremonial preset): the A spanned 24.9px
        inside a 63.8px inner rule — 39%, a monogram rattling around in its own
        seal. Under Readex's HEXP 100 it filled far more, which is the whole
        reason the spec art read wider than the render. Now sized to ~54% of the
        inner rule at every size (36px on the 84px die, 24px on --sm, 44px on
        --lg), at an explicit "wdth" 125. Letter-spacing is ZERO: on a single
        glyph, tracking is pure trailing space, so the 0.06em it used to carry
        shoved the letter left of the die's centre.
      ink-break: "None. There is no ink."
      minimum-size: "44px. Below that the highlight and shadow stop resolving as one pressed form and the seal reads as a smudge — which is also the minimum touch target, a useful coincidence. On portrait the emboss sits INLINE WITH THE SIGNATURE RULE rather than in a far corner: a notary presses over the signature, not beside it."
      when: "Post-Send confirmation on Writing Desk; the Receipt."
    signature-line:
      blocked-on: IMPLEMENTATION
      demoted: >-
        2026-08-02, from canonical. No dotted rule or printed-name label
        exists anywhere in the product. Running the gates also surfaced what
        looked like a contradiction — the Receipt renders typed names in the
        script face, which this entry's old rule appeared to forbid — and the
        answer went the other way: production was right, and the rule was
        aimed at a different worry. See `signature.definition`. What is left
        here is a genuinely separate artifact: the DOTTED RULE at the close of
        a composed letter on the Writing Desk, which says *a person signs
        here* on a document that is still being written. The Receipt records
        an act already taken; the letter's rule anticipates one.
      description: "Horizontal dotted rule with 'Your Name' label below."
      stroke: "dotted 1px rgb(0 0 0 / 30%)"
      label: "sans-chrome uppercase 12px tertiary text, centered under the rule"
      when: "Writing Desk — end of composed letter, preview mode."
      optional-user-asset: >-
        Users may upload a signature image (PNG with transparency) that
        renders above the dotted rule at ≤ 60px height. Default state is the
        dotted rule + printed name. See `signature` for what the script face
        may and may not render — the short version is that it records an act,
        so it belongs on the issued artifact rather than on the blank rule of
        a letter still being composed.
    folder-tab-step:
      blocked-on: IMPLEMENTATION
      description: >-
        Numbered step marker that juts out of a section header like a
        manila-folder tab. Used for multi-step Writing Desk flows
        (choose destination → choose topic → compose → preview → send).
      geometry: >-
        Rounded-corner polygon jutting 24–32px above the section header
        baseline. The tab is attached to the top-left of its section, not
        floating. Subtle shadow underneath the jut.
      typography: "sans-chrome 16px semibold, centered in the tab"
      color-active: "Midnight Indigo fill with white number — active is where you ARE, which is the trail"
      color-complete: "Action green fill with ink number — complete is a thing that HAPPENED"
      color-upcoming: "paper-cream fill with tertiary-text number"
      rotation: "0 — steps are filed, not stamped"
      when: >-
        Writing Desk composition flows; Archive pages with strongly
        ordered chapters (Title → Sponsors → Text → Votes) may also
        adopt this, but only when the order is semantically load-bearing.
    lapel-pin:
      blocked-on: IMPLEMENTATION     # votizen.svg exists but ships as the Receipt emblem, not as an avatar
      description: >-
        Circular vector illustration avatar for featured civic entities —
        bill sponsors, campaign leads, jurisdiction landing pages. An
        alternative to the monogram avatar, used when the entity deserves
        iconographic rather than monogram treatment.
      geometry: "Full circle, 48–80px. Vector illustration inside with 1px hairline ring."
      ink-break: "None — pins are printed clean."
      when: "Archive sponsor cards, jurisdiction landings, home-page hero."
      forbidden:
        - "No photographic rendering (no chrome, no bevel, no gloss)."
        - "No flag, eagle, or partisan iconography."
        - "No campaign-poster typography inside the pin."
    envelope-preview:
      blocked-on: IMPLEMENTATION
      description: "Envelope-shaped preview of sent correspondence."
      form: "Rectangular card with 3:4 aspect, subtle fold shadow along horizontal center."
      postage-corner: "Small oxblood stamp shape in upper-right with bill number or campaign ID — permitted because a sent envelope is an issued artifact."
      when: "Writing Desk — post-Send state."

  # ------------------------------------------------------------------------
  # RETIRED — removed from the inventory rather than carried. An accent that
  # cannot state a communicative purpose is ornament, and the system forbids
  # ornament. Recorded here so it is not re-proposed from memory.
  # ------------------------------------------------------------------------
  retired:
    paper-grain:
      retired: "2026-08-02"
      was: "Procedural monochromatic noise overlay (≤ 2%) for the Writing Desk composition canvas."
      why: >-
        Failed the PURPOSE gate, alone in the inventory. Every other accent
        states a communicative job — status, authority, confirmation, identity.
        Grain states atmosphere. `tactileAccents.rule` forbids ornament without
        meaning, and this was the entry the rule was describing.

  # ------------------------------------------------------------------------
  # PROMOTION — the route from proposed to canonical. There was no such
  # route before 2026-08, which is how twelve accents accumulated.
  # ------------------------------------------------------------------------
  promotion:
    rule: >-
      An accent moves from `proposed` to `canonical` only when all four
      gates are met. Meeting three is not a partial promotion; it stays
      proposed. Demotion runs the same way in reverse: an accent whose
      implementation is removed goes back to `proposed` in the same
      change that removes it — never left described as if it exists.
    gates:
      - "OWNER — a named person accountable for the accent, recorded in CHANGELOG.md."
      - "IMPLEMENTATION — shipped in the product. A spec paragraph is not an implementation."
      - "SPECIMEN — a rendered example in preview/, so the accent can be seen before it is used."
      - "PURPOSE — a stated communicative job (status, authority, confirmation, identity) that passes tactileAccents.rule. Ornament without meaning is forbidden."
    owner: "Jason — head of product & design, The Governance Company"    # one owner for the whole inventory; thirteen owners is how you get zero
    evidence: >-
      A STATUS IS A CLAIM, AND A CLAIM CARRIES ITS EVIDENCE. Every `canonical`
      entry must carry `owner:` and `implementation:` naming a real file.
      Every `proposed` entry must carry `blocked-on:` naming the gate it is
      stuck at. An entry missing its evidence key is a bug, and — unlike a
      status typed from memory — it is greppable. Added 2026-08-02, because
      the inventory had gone a full month with statuses nobody could check.
    first-run: >-
      The gates were written on 2026-08-01 and first RUN on 2026-08-02, against
      resistbot/voyager@e3d5242e. Six of thirteen statuses were wrong in both
      directions: three canonical accents had no implementation, two proposed
      accents were shipped and load-bearing, and one failed PURPOSE outright.
      Zero of thirteen had an owner — so OWNER, the only gate that costs
      nothing, was blocking every promotion in the system. A gate nobody has
      ever walked through is not a process; it is a moratorium with paperwork.
      Working file: `explorations/Running the Gates.html`.
    priority: >-
      Guilloche was promoted 2026-08-02 and this recommendation is spent. The
      lesson it left is worth more than the nomination was: guilloche was
      nominated three times in this document on the strength of how
      interesting it is, while the progress ribbon — shipped in four call
      sites — was never nominated at all. An accent's status had been tracking
      HOW MUCH HAD BEEN WRITTEN ABOUT IT, not what existed. That is the exact
      failure the gates were invented to stop, and the spec fell into it about
      the very accent it nominated. Next promotions in line: ruled-page and
      line-numbers together (one artifact, one implementation).
    jurisdiction-seal-note: >-
      The jurisdiction seal is the most evocative entry here and has the
      least design. Two attempts were pulled (a desaturated flag SVG, which
      read as a chromatic decal; a generic capitol dome, which read as
      ornament). It stays proposed with no ship date until someone owns the
      form. Do not improvise one on a bill page in the meantime.

# --------------------------------------------------------------------------
# OPEN QUESTIONS — things the system has NOT decided, kept here so they are
# not accidentally closed by a design decision. Each needs a named owner and
# an answer, not a token. Do not resolve one of these by picking whichever
# rule is more convenient to the change you are making.
#
# Closed 2026-08-02: what-is-a-signature. Production was right — see
# `signature.definition` below.
# --------------------------------------------------------------------------
openQuestions:
  who-writes-the-plain-sentence:
    opened: "2026-08-01, audit §3.1"
    owner: "Tyler — owns the summarization pipeline (named 2026-08-02)"
    status: >-
      OWNED, NOT ANSWERED. The role is filled; the mechanism is not yet
      reconciled with this spec.
    question: >-
      464,269 bills each need one plain sentence. Who writes it? Generated
      then reviewed, generated and labelled, or authored?
    what-is-known: >-
      Lightweight summaries are already generated in code, in `resistbot/deepspace`
      (backend), likely by a small model. The prompt that governs them has
      not been read against this spec. Access to deepspace was requested
      2026-08-02 and had not landed by end of session — repo 404s under
      `resistbot`, `putorti` and `deepvest-ai`, consistent with a pending
      org approval.
    next-move: >-
      Read the generating prompt and hold it against `surfaces.archive.newcomer-lede`:
      one sentence, three facts, one action; second person, present tense;
      no jargon left unglossed. Three outcomes, three different fixes —
      (1) the prompt already encodes the rules, in which case cite it as the
      lede's `implementation:` the way accents now cite theirs; (2) it is
      reasonable but was not written against the spec, in which case
      reconcile and let the spec own the wording; (3) there is no rule, only
      a summarize instruction — in which case the newcomer's voice is an
      UNOWNED DEFAULT written by whoever typed the prompt, which is the same
      shape as the email brand navy and the urgent kind.
    the-stake: >-
      A plain sentence that is WRONG is worse than jargon that is opaque,
      because the newcomer cannot tell. Production answers this for asks —
      the user writes their own title and the subject line is that title
      verbatim — and it does not extend to bills.

# --------------------------------------------------------------------------
# PROFILES · CLERK — the second user of the profile mechanism. Written down
# 2026-08-02, audit §3.8. Clerk needs no new tokens; it needs ours, handed
# over one variable at a time. Same tokens, poorer machinery — a profile.
# --------------------------------------------------------------------------
profilesClerk:
  what-it-furnishes: >-
    Every account, sign-in, and profile form in the product. Our own form
    layer is three utilities (`input-text`, `input-textarea`, `input-label`)
    wrapped by three components so thin they are almost nothing —
    `input.tsx` is 499 bytes. Everything else a user types into is Clerk's.
  mechanism: "Nineteen `--clerk-*` custom properties in globals.css mapping our palette, weights and semantics onto their components."
  the-test: >-
    Session 3's rule, second application: if a transport needs new tokens it
    is a register; if it needs the same tokens rendered by poorer machinery,
    it is a profile. Clerk invents nothing. It is a profile, and writing it
    down here makes the mapping a design artifact instead of nineteen lines
    in a stylesheet that no one reviews.
  correct-mappings: >-
    Primary, neutral and input text all map to Midnight Indigo and the slate
    ramp correctly, and the three font weights (500 / 600 / 700 — restated
    2026-08-27 from the retired 430/497/565 ladder) were taken from the sans
    scale deliberately. This mapping had care in it; it
    simply had no spec to check against.
  divergences:
    warning:
      ships: "yellow-500"
      system: "amber-700 (--color-warning)"
      verdict: >-
        FIXED IN SPEC 2026-08-02. Contradicts a standing rule — amber is
        warning, and yellow is not in the palette at all. The code migrates.
    success:
      ships: "emerald-500"
      system: "emerald-700 (--color-success); emerald-500 is --color-success-soft"
      verdict: >-
        Maps to the FILL value where the INK value is meant. Adopted as a
        deliberate profile value: Clerk renders success mostly as small solid
        indicators rather than as text, where the soft stop is correct.
        Recorded rather than silently kept.
    danger:
      ships: "rose-500"
      system: "--color-danger"
      verdict: >-
        A different red from the only red the system has left. Adopted as a
        deliberate profile value — Clerk's danger is inline validation on
        their lighter input grounds. Recorded rather than silently kept.
  material-note: >-
    Clerk inputs are OPAQUE (slate-50 / slate-600); ours are translucent
    (`bg-black/5` on glass). Nobody decided the product's two form registers
    should differ in material — the variable only accepts a colour, so a
    colour was supplied. Known Divergence, low priority; no clean fix is
    available through the variable surface.

# --------------------------------------------------------------------------
# LOADING — what a loading state owes the user. Specified 2026-08-02, audit
# §3.8. The system had a rule about whether loading may animate (yes —
# "streaming is not motion") and no rule about what it should SAY.
# --------------------------------------------------------------------------
# --------------------------------------------------------------------------
# PRINT — the mailed letter. Decided 2026-08-04, explorations/The Printed
# Letter.html. A PROFILE by session 3's test: no new tokens, the same ink
# layer rendered by poorer machinery — with one addition no profile has
# needed before, `requires`, because paper has content requirements the
# screen has no equivalent for. Paper is not a degraded screen; it is this
# register's home. paper-cream, the emboss, the guilloche, the ledger number
# and a Scotch roman are all imitations of it, so print is the one transport
# where the ink layer is literally true and the aurora cannot exist — which
# costs nothing, because the aurora never carried meaning.
# --------------------------------------------------------------------------
profilesPrint:
  status: canonical
  scope: >-
    IN SCOPE AS AN ARTIFACT, not merely a copy of something sent. A
    constituent whose representative ignores email has no other path, and it
    is the one surface where an actual signature happens.
  applies-to: >-
    The mailed letter (registers.issued, composed output). Receipt and bill
    PDFs inherit `canvas`, `ink` and `measure`; folds, continuation headers
    and postal blocks are the letter's alone.
  canvas: >-
    THE SHEET IS THE PAPER CANVAS. `paper-cream` / `paper-parchment` do not
    print — a cream fill is an ink wash across a whole page, it bands on
    consumer printers, and the stock already has a colour. This is not
    "restore solid surfaces"; the canvas token was always standing in for
    this.
  ink: >-
    RE-BASED, NOT FLATTENED: primary 100%, secondary 45%, tertiary does not
    print — it promotes to secondary or is dropped. `* { color: #000 }`
    deletes the 87/55/38 scale, and that scale is how ink sits on a page,
    not a screen affordance.
  measure: >-
    6.5in — 1in margins on US Letter. Paper takes its measure from the
    margin; see spacing.measure.rule for why `ch` does not travel. The
    character count is then whatever the face makes it, which is correct for
    correspondence at that width.
  emboss: >-
    DOES NOT PRINT. An emboss is a deformation of a sheet; a printer can only
    print a picture of one. RENDERED RATHER THAN ASSUMED (2026-08-12,
    preview/print-profile.html): on a white sheet the real .seal-emboss comes
    out a PALE GREY RING — not the grey mud this line predicted, which was a
    guess. The correction strengthens the rule rather than softening it: the
    failure is not that it prints badly, it is that it prints as a picture of
    relief and therefore carries no authority at all. A faint ring is worse
    than a smudge, because a smudge at least looks like an accident. The
    ledger number carries the proof instead — registers.issued.proof-rule
    load-bearing in a third transport.
  signature: >-
    HERE THE DOTTED RULE IS CANONICAL, NOT PROPOSED: on screen it anticipates
    an act, on paper the act happens. 0.4in minimum clear space above the
    printed name, and the printed name is mandatory — a hand-signed name is
    not always legible and the recipient has to know who wrote.
  ledger-number: >-
    Printed, as a single line in the closing — and this is THE ONE PLACE A
    USER MAY SUPPRESS IT, because on a mailed letter it also discloses that
    the letter came through a platform.
  pages: >-
    `break-inside: avoid` is unobeyable past one sheet. Continuation header on
    every sheet after the first: surname, subject, ledger number, page n of m.
    Never strand a single line, and never break between the closing and the
    signature.
  folds: >-
    Tri-fold at 3⅔in and 7⅓in. Nothing consequential on a fold line — not the
    ask, not the bill number, not the signature.
  requires:
    - >-
      THE USER'S POSTAL ADDRESS — confirmed present 2026-08-04. The product
      holds it to place the user in the correct districts and displays it to
      nobody but them. The return block is therefore PRINTED, not ruled for a
      pen; printing the user's own address on the letter that user mails
      discloses nothing new.
    - >-
      The recipient office's postal address, not just the representative the
      screen picked.
  supersedes: >-
    proposed/design-system/patterns/print.md. Its `* { color: #000 }` and
    "restore solid surfaces" lines are wrong per `ink` and `canvas` above.

loading:
  rule: >-
    A LOADING STATE PROMISES THE SHAPE OF WHAT IS COMING, NEVER HOW MUCH OF
    IT. The shape of a row — title, meta line, status mark — is fixed by the
    component and known before any fetch. The number of rows is not known
    until the data lands, and the front end must not pretend otherwise.
  count-is-unknowable: >-
    Treat the count as UNAVAILABLE. It is a load-time fact and resolving it
    earlier is an architectural question, not a design one — so the design
    must be correct without it. Do not build a loading treatment that needs
    a count, a cached count, or a guess at one.
  the-direction-rule: >-
    UNDER-RESERVE, SO THE SETTLE IS ALWAYS DOWNWARD. Render ONE skeleton row
    — the shortest plausible item — in a container sized by its content, with
    no minimum height. One row is the floor of what can arrive, so the card
    can only ever grow. Growth pushes the page down, which is what a page
    does as it loads and which nobody experiences as a fault. A shrink pulls
    content UP under a reader's eyes and under a thumb that is already
    moving, and that is the failure people actually notice.
  why-not-a-spinner: >-
    A spinner does not avoid the height claim; it makes an uninformative one.
    The shipped fallbacks reserve `min-h-48` — a fixed 192px box guessed
    without a count, exactly like a five-row skeleton, but carrying no
    information about what is coming. It also over-reserves, so it usually
    settles by shrinking. This is the correction to the first pass: the
    spinner was a REASONED answer to unknown cardinality (a five-row skeleton
    is a lie when one row arrives) and not an unowned default. The reasoning
    was right and the conclusion over-corrected — the fix for "do not claim
    five" is "claim one", not "claim nothing and take 192px to do it".
  spinner-scope: >-
    The spinner keeps one job: an in-place indeterminate wait where there is
    no shape to promise — a button mid-submit, a control resolving, an inline
    action. Never a route-level content fallback. Its ink is ONE value in
    both modes; the shipped 20% light / 55% dark split is not an optical
    adjustment, it is two people guessing.
  zero-results: >-
    No loading treatment fixes the empty case, and the spinner is worse at
    it: the user waits in an empty box and is then handed an empty box. That
    is what `card-empty` is for. A one-row skeleton resolving into an empty
    state is the smallest possible wrong promise.
  header-first: >-
    A card's header is static and known. Render it immediately and let only
    the body be skeletal, so the region that moves is as small as possible.
  tokens:
    block: "One skeleton block role. Ships today as bg-black/5, /8 and /10 across six files at heights h-2.5 / h-3 / h-3.5 / h-5 — invented per component."
    motion: "Pulse, not shimmer. Sanctioned by motion.rules — a skeleton resolving is CONTENT ARRIVING, not the interface moving."
  naming: >-
    A component called Skeleton contains a skeleton. `TrackedSkeleton`,
    `ActionsSkeleton` and `ConversationsSkeleton` are spinners.

# --------------------------------------------------------------------------
# OUT OF SCOPE — surfaces the system deliberately does NOT design, with the
# reasoning, so a future session does not re-open them as unmet obligations.
# A gap and a decision look identical in a list of missing things.
# --------------------------------------------------------------------------
outOfScope:
  tables:
    closed: "2026-08-02, audit §3.8"
    finding: >-
      There is no table element, thead, tbody or role="table" anywhere in
      `app/` or `components/`, and no table primitive in `components/ui/`.
      Bills — the most tabular data the product owns — render as
      `bill-list-item.tsx`: a card with a title, a rubber stamp and a compact
      progress ribbon.
    why-not: >-
      The audit inherited "tables" from a generic list of eleven pattern gaps
      and never asked whether this product has any. Designing one now would
      be inventing a transport in order to furnish it — the inverse of the
      rule the email work produced. A row of cells is also the register of a
      spreadsheet, and the thesis is that legislative data is a document.
    if-it-ever-lands: >-
      Two things are already decided and should be reused rather than
      re-argued: metadata grids may run wider than `measure.body`, and
      the progress ribbon's `compact` variant exists for dense rows.
  spanish:
    closed: "2026-08-02"
    finding: "There is no Spanish anywhere in the product."
    why-not: "Not an unmet obligation. Do not design for it speculatively."
    when-it-lands: >-
      Start with VOICE, not layout. The audit costed this as a rendering
      problem — chrome-width labels, prose measures, fixed-width badges — and those
      are real but cheap. The expensive part is that the newcomer's lede is
      specified as one sentence, three facts, one action, in English idiom,
      second person, present tense. That is a claim about how English carries
      plain meaning and it may not survive translation intact.

# --------------------------------------------------------------------------
# SIGNATURE — what the script face asserts, and when it may be used.
# Resolved 2026-08-02. Production was ahead of the spec here.
# --------------------------------------------------------------------------
signature:
  definition: >-
    A SIGNATURE IS A NAME THE CONSTITUENT AFFIRMED — by co-signing an ask,
    endorsing a candidate, pledging, or sending a letter. The act of signing
    is what makes it a signature. It is not a handwriting sample, and the
    system is not claiming it is one.
  therefore: >-
    Rendering an affirmed name in --font-signature is correct, and the
    Receipt has been right all along. The old rule — "no system handwriting
    font substitutes this; signatures are authored, not simulated" — was
    written about a different worry (a decorative script face standing in for
    a person's mark) and it read as a ban on what the product actually does.
    Narrowed rather than deleted; the worry it was protecting against is real
    and is stated below.
  the-line: >-
    SECOND PERSON ONLY. The script face renders YOUR name, on YOUR receipt,
    for an action YOU took. Nowhere else. It is not a style for names — it is
    the record of your own act, shown back to you.
  never:
    - "Another person's name in script, shown to you. A co-signer roll, a signer list, an endorsement feed — those are other people's names and they set in the normal register. Someone else's signature rendered for your eyes is a facsimile of their mark."
    - "A name the user did not affirm: pulled from a data source, a bill sponsor, a legislator receiving a letter, a placeholder, or decoration."
    - "Any surface that is not the user's own issued artifact. The Commons counts a crowd; it does not sign for them."
  why-second-person: >-
    A signature is evidence that a specific person did a specific thing.
    Shown to that person on their own receipt, it is a record. Shown to
    anyone else, it is a picture of someone's mark that they did not draw and
    cannot correct — and the artifact may be screenshotted and shared. The
    audience is the constraint, not the typeface.
  uploaded-asset: >-
    A user may still upload a real signature image (PNG with transparency,
    ≤ 60px height). It is an alternative rendering of the same affirmation,
    not a truer one — the typed-and-affirmed name is a signature on its own.
  implementation: "components/receipt/ReceiptCertificate.tsx (font-signature, animate-signature-write); app/layout.tsx loads AmerikaSignature-Regular.otf"
  anonymous: >-
    Where no name exists, production prints a serif fallback attribution
    ("A constituent") rather than script. Correct: there is no name to have
    been affirmed, so there is nothing for the face to record.
  not-system-typography: >-
    Unchanged and load-bearing. Script is banned everywhere else in the
    system — headings, UI, chrome, body. This block is the entire licence.

# --------------------------------------------------------------------------
# CELEBRATION — the one moment in the system where motion and intensity
# are permitted to bloom. Reserved for the issuance of a Receipt — the
# instant a civic action completes — and never used elsewhere.
# --------------------------------------------------------------------------
celebration:
  rule: >-
    Restraint is the rule across every surface — except two, different in
    kind. The Receipt's one-shot BLOOM at issuance (this block), and the
    Commons' ongoing ACCRUAL under collective action (see
    surfaces.commons.motion-discipline). This block governs the Receipt
    bloom: for 250–400ms the system pays off the user's commitment with
    intensified light and a settled seal, then the receipt is static.
  mechanics:
    - "Aurora deepens by ~15% chroma at all three Blue Hour stops, then settles back."
    - "The embossed seal scales in from 0.8 → 1.0 with a 100ms shadow lag, landing last — the press of a die, arriving after the page has settled."
    - "The guilloche border draws on left-to-right (250ms) — like ink applied across the page. ON PORTRAIT IT FADES INSTEAD (audit §3.7): a 320pt rule drawing left-to-right reads as a loading bar, which is the one thing an issued artifact must never look like."
    - "Numbered ledger entry counts up to its final value (~600ms, ease-out)."
  forbidden:
    - "No magenta, synthwave, or off-palette gradients — the palette already does the work."
    - "No bounce / overshoot / spring physics — the receipt is being issued, not delivered by a confetti cannon."
    - "No sound effects."
    - "Never reuse the BLOOM mechanics (one-shot aurora deepen + seal drop + guilloche draw-on) on non-Receipt surfaces — that is what makes Receipts feel issued. This is distinct from the Commons' ACCRUAL motion (counts/rolls climbing under real collective action), which is a different mechanic with its own discipline — not a leak of the bloom."

a11y:
  reducedTransparency:
    description: >-
      When the OS sets prefers-reduced-transparency, all glass materials
      collapse to solid zinc surfaces (zinc-50 / zinc-100 in light mode,
      zinc-800 / zinc-900 in dark mode) and backdrop-filter is removed.
      The layout does not shift; only the material does.
  highContrast:
    description: >-
      prefers-contrast: more boosts secondary text from 55% to 75% opacity
      and swaps glass for solid surfaces.
  reducedMotion:
    description: "All animations and transitions clamp to 0.01ms."
  targetSize:
    rule: "Interactive targets are at least 44×44 px, EXCEPT inline targets in prose — see inline-exception."
    inline-exception: >-
      RATIFIED 2026-08-28. A LINK INSIDE A SENTENCE IS EXEMPT, and this is
      not a concession — it is in both authorities the 44 came from. WCAG
      2.5.5 (AAA) and 2.5.8 (AA, 24×24) each carve out a target that "is in
      a sentence" or whose size "is otherwise constrained by the
      line-height of non-target text." The rule above inherited the number
      from those criteria without their exceptions, so it read
      unconditional and no component could satisfy it.
      THE GEOMETRY IS THE ARGUMENT, and it was measured before it was
      looked up: role-body is 1rem on a 1.5 line box — 24px — so a 44px
      target centred on an inline link OVERHANGS 10px ABOVE AND 10px BELOW,
      into the line boxes of the sentences around it. The enlarged target
      does not just fail to help; it starts catching taps meant for the
      lines above and below. Making the target compliant makes the page
      less usable, which is the signal that the rule was being applied
      outside its scope.
      SO: an inline link in prose takes no minimum. It stays legible by
      being underlined and by the paragraph's own line-height. This exempts
      the LINK IN A SENTENCE only — a link that is its own block, a list
      row, a card, or anything with its own line box is a target and takes
      the floor. If you are unsure which you have, ask whether removing the
      link would leave a gap in a sentence.
    # PROVENANCE — added 2026-08-02. The number was inherited, not derived, and
    # a rule whose source is unstated gets argued with by whoever wants 40.
    provenance:
      primary: >-
        Apple's Human Interface Guidelines: "maintain a minimum tappable area
        of 44pt × 44pt for all controls." Verified still current 2026-08-02;
        it has been Apple's guidance since the original iPhone HIG, which is
        why it reads as self-evident.
      corroborating: >-
        WCAG 2.5.5 Target Size (Enhanced), level AAA, independently arrives at
        44×44 CSS px. Two different authorities, two different unit systems,
        the same number — that agreement is the reason to hold the line here.
      units: >-
        Apple's 44 is POINTS; ours is CSS PIXELS. On a mobile viewport with a
        correct meta viewport these coincide (1pt = 1 CSS px), which is why
        the tab bar measured at 390pt and specified in px is not a unit error.
        Off a mobile viewport they diverge and the CSS pixel is what governs.
      not-the-floor: >-
        Material/Android specifies 48×48 dp — larger. So 44 is a MINIMUM
        arrived at by the most permissive of the three authorities, not a
        target. Where a control is dense, consequential, or thumb-reached
        (Send, Co-sign, the tab bar), go to 48.
      do-not-downgrade: >-
        WCAG 2.2 added 2.5.8 Target Size (Minimum) at 24×24 px, level AA. It
        is the newer criterion and the smaller number, which makes it the one
        someone will cite to justify shrinking a control. This system's floor
        is 44, and 24 is recorded here only so that it is recognised when it
        appears in an argument rather than mistaken for an update.
    enforcement: >-
      Stated since the beginning and applied nowhere. As of 2026-08-02 the
      tab bar shipped targets as narrow as 40px because a bare link inherits
      whatever its content measures, and the only other place in this
      document that mentions the number is the emboss's minimum size, which
      cites it as "a useful coincidence" rather than as this rule.
      **A COMPONENT WITH A TOUCH TARGET DECLARES ITS OWN MINIMUM.** Do not
      rely on type size, icon size, or padding to arrive at 44 by accident —
      measure it, and if the number is not in the component's spec entry, it
      is not enforced.
    how: >-
      DECLARE `min-height`, DO NOT ADD PADDING. Padding changes a plate's
      proportions and the optical centring of its label; a declared minimum
      leaves an already-compliant control untouched and grows only the ones
      that fall short. Where the control's visible size must stay smaller than
      the floor — the breadcrumb's 12px caps, a toggle track that has to read
      as a switch — EXPAND THE TARGET AROUND IT: a transparent hit area at the
      minimum, centred on the control, rather than inflating the box. The
      appearance and the target are two different geometries and this rule
      only governs the second.
    cited-by: >-
      Added 2026-08-11. button-default (and secondary/ghost by inheritance),
      button-cta at 48, button-fab, button-icon, input, toggle, breadcrumb,
      card-select, tabbar. Specimen: preview/touch-targets.html. Before that
      date the rule was cited by one component and violated by five — four of
      them arriving under the floor by `padding + line-height`, which is the
      same way the tab bar shipped 40.
  contrast:
    # The old rule claimed the aurora was MONOCHROMATIC and that opacity-based
    # text depended on that. Both halves were false. Production has shipped a
    # five-lobe chromatic curtain (hues 150-290, chroma to 0.21, violet
    # included) above the fold for some time, and monochrome was never the
    # mechanism. PLACEMENT is.
    #
    # Measured on a 26x14 grid, both aurora stacks composited in order
    # (explorations/The Aurora Constraint.html):
    #
    #                    inside the band    below the band    needs
    #   87% ink  light        10.23             14.19          4.50
    #   87% ink  dark          3.53             12.80          4.50
    #   55% ink  light         4.10              4.58          4.50
    #   55% ink  dark          2.32              5.89          4.50
    #
    mechanism: >-
      Opacity-based text is safe BELOW the curtain, where the canvas has
      fallen back to the plain three-lobe Blue Hour. Inside the band it is
      not safe at any rung, in either room — in the dark room even 87% ink
      drops to 3.53:1. The band is light, not a text surface.
    rule: >-
      NO BARE TEXT INSIDE THE CURTAIN BAND. Headlines, prose, captions, form
      labels and metadata all sit below it. This ratifies how the home page is
      already composed — the hero headline and both buttons clear the band —
      rather than changing it. What it forbids is the thing nobody has done
      yet: setting a caption or a control in the light.
    band-exception: >-
      Chrome that must overlap the band (the navbar, the research eyebrow
      strip) carries its own material. material-chrome is opaque enough to
      re-establish a ground, so its text is measured against the material and
      not against the curtain. Never place bare text on the band.
    limits:
      max-lobe-chroma: 0.22
      max-lobes-per-stack: 5
      hue-range: "free — hue was never the mechanism"
      band-geometry: "narrow, tall lobes anchored near 12% down the page; the band ends by ~34%"
    tertiary-rung: >-
      38% ink is decorative only — placeholders, disabled states, hairline
      dividers. It clears 4.5:1 nowhere, on any aurora, and never did. This
      predates the curtain and is not a curtain problem.
    do-not: >-
      Do not widen the band or move it down the page without re-measuring.
      Its safety comes entirely from where it is.
---

# Living Document

This is the design system for Amendment. Amendment's thesis is that the
rule of law is a *living document* — and that **the people are its
authors**. The Constitution's own mechanism for change is the amendment;
the document stays alive because citizens keep writing it. The product
exists so an ordinary person can put a demand on the record, gather their
neighbors behind it, and make the candidates who would represent them
answer for it.

This system began as a way to *read* the law, and it still reads
beautifully — the Archive and the Reading Room are unchanged and
excellent at it. But the product's center of gravity has moved from
**understanding to acting**: from the solitary reader to the constituent
who wants to be heard, and from one letter to a district that gathers
behind a single demand. The system now has two jobs that used to be one.
It must hold the calm authority of a document *and* carry the momentum of
a movement.

Ink beneath, living breath above — and now, the crowd.

## Two Layers

Every screen is composed of two stacked layers:

**The Ink Layer** is permanent. It is Newsreader for headings, Archivo
for chrome and body, Midnight Indigo for the user's own trail through
the product, and Momentum green for every moment of intent. It is the
signature, the statute number, the chamber vote — and, on an issued
artifact and nowhere else, the oxblood wax seal. The ink layer does not
move, does not brighten, does not dance. It holds.

**The Aurora Layer** is alive. It is a three-stop *Blue Hour* gradient —
indigo, slate, and a warm parchment lowlight — painted in oklch behind
every surface. It breathes; it is the reason the page does not feel
printed. Glass cards sit on top of it and let some of it through. This
is the "living" part of a living document: the institutional substance
is unchanged, but the light on it moves.

These two layers describe the *institution*. There is a third thing they
do not, by themselves, capture: the **people acting on it**. In the
original product that action was implicit — a reader, alone. In this one
it is the point, and it is collective. Momentum and the crowd are not a
new layer of paint; they are what the aurora was always standing in for.
The light moves because people are moving it.

These two layers are the entire system. Every decision below is a
consequence of them.

## Color as a Civic Register

**Two accents carry the brand, not three.** Midnight Indigo is the ink and the
user's trail. **Momentum green is everything the user does and everything the
crowd does** — the CTA, the co-sign, the count, the threshold, the answered
position. Oxblood is retired from every interactive surface and survives only
as the wax seal.

The merge was the point. Separating *your intent* from *the crowd* was a
distinction without a difference: co-signing **is** joining, and a constituent
putting their name to a demand and the counter moving by one are the same
event seen twice. One colour states the thesis; two hedged it.

The green is not authored from nothing — it is sampled from the product's own
`--aurora-curtain`, brought down to button lightness. And its label is **ink,
not white**, which inverts the relationship with the ink button: navigation is
dark-with-light-type, action is light-with-dark-type. The two can never be
confused at any size, in any room, or in grayscale — desaturated, the action
button separates from the navigation button at 5.04:1, where a deep green
would manage 2.53:1. An action belongs to the living half of the system, not
the institutional half. Deep green is more ink; bright green is more light.

The section below describes the palette as it stood before this change; the
three-accent framing is superseded.

Three accents carry the brand, each with one job — plus a fourth,
**Emerald**, sanctioned as a brand color on the Commons surface only:

- **Midnight Indigo** (`slate-700/800/900`) is the primary. It is the
  default button, the active nav, the selected card border, the ink on
  the tab bar. If the user made something happen — answered, navigated,
  committed — the trail is Midnight Indigo. The color reads *ink on
  archival paper*, which is the register we want for a product about law.
- **Momentum green** (`oklch(.66 .148 160)`) is the action *and* the
  crowd — the CTA, the FAB, the co-sign, the count, the threshold, the
  answered position. Its label is ink, not white, which makes it the one
  control on any page whose type polarity is inverted. Fill carries the
  action/success distinction: filled means *do this*, unfilled means
  *this happened*.
- **The seal has no colour at all.** It is a **blind emboss** — pressed
  into the paper, highlight up-left, warm shadow down-right. Oxblood is
  retired from the system entirely: first from the CTA, then from the seal
  itself, because a mark that appears once on an already-earned artifact
  should not be the heaviest object on the page. There is now no red in
  this system except semantic danger.

**The fill rule.** Because action and success share a hue, fill carries the
difference: **a green plate is a control; green ink is a report.** Fill means
*press me*. A numeral, a chip, a stamp, a rule, a check — anything green that
is not a filled plate is stating a fact that is already true. Meters and
ribbons are exempt; they encode quantity, not affordance. The alternative —
filled-means-done, outline-means-available — reads fine on a checkbox and
fails here, because it ghosts the primary action and turns every state on the
page into something that looks pressable.
- **Slate Blue** (`slate-400/500/600`) is functional. It is the focus
  ring, the page-load progress bar, the icon-button hover. It never
  carries brand meaning — it only confirms attention.
- **Emerald** (`emerald-500/700`, `emerald-400` dark) is *the crowd* —
  co-signs, endorsements, "candidate answered", and counts climbing. It
  is the Momentum Accent, and it is a **brand** color only on the Commons
  surface (asks, co-sign rolls, accountability). Everywhere else emerald
  stays strictly semantic (success). This is deliberate: "a demand
  advancing" and "a bill enacted" are the same meaning, so the user
  learns one color once. Emerald belongs to neither party — which is what
  makes it the right hue for civic participation.

Semantic states (success emerald, warning amber, danger red) are
reserved for their conventional meanings and never pressed into service
as brand decoration — with the single, scoped exception of emerald as
the Commons' Momentum Accent above, where "success" and "the demand is
working" are the same idea.

Text color is expressed through **opacity on black or white** following
the Apple HIG three-rung scale (87% / 55% / 38%). This works here
because the Blue Hour aurora is monochromatic and low-chroma by design;
a rainbow aurora would break the invariant. The palette and the backdrop
are built to support each other.

## Typography as an Institutional Gesture

Three families, all intentional, all carried over from the original system
because typography was not the problem:

- **Archivo** — variable sans, 100–900 weight, with a width axis from 62 to
  125 and a true italic at every weight. Body runs at `wdth` 100. The width
  axis has three discrete chrome registers:

  - **`wdth` 125 · chrome** — institutional chrome. Default for navbar, breadcrumbs,
    footer column heads, form labels, table heads, status stamps,
    progress-ribbon milestone labels, count chips, jurisdiction-code
    badges, "Sources:" prefixes. Reads clerical, calm, like the
    engraved label tape on a filing cabinet drawer. The axis goes
    further but going further changes the *gesture's intent*, not just
    its size.
  - **`wdth` 120 · display** — display register. The letters themselves are the
    visual gesture. Reserved for big stat numerals on hero callouts
    (the marketing coverage section's "52 Legislatures",
    "464,269 Bills Tracked"), display headers in monumental positions,
    and hero callouts that are meant to be *looked at* before they're
    *read*.
  - **`wdth` 125 + 0.20em tracking · ceremonial.** Once-per-page maximum. Reserved for the
    Receipt's place-of-issue caption and any typographic moment where the type
    is the visual event. **Not** the embossed seal's monogram, which sets its own
    size and width against the die — see `skeuomorphic-accents.seal.monogram`.

  Chrome is the load-bearing register and should not become ambient
  noise — use it for true chrome, not for every caption. Display and
  ceremonial are escalations, not "more chrome." Note that chrome now sits at
  Archivo's width ceiling, so ceremonial cannot go wider: it is separated by
  tracking and size, and the presets are therefore not a monotonic ladder —
  chrome (125) is wider than display (120).

  **Italic policy.** Serif italic remains the italic of *record* — quoted human
  voice, 18px and up, never metadata. What Archivo changes is enforcement, not
  the rule: Readex had no italic at all, so an `<em>` inside sans copy got a
  browser-*synthesized* oblique — a mechanical slant with wrong joins. The old
  "every italic is serif" line was partly a description of that constraint.
  Archivo ships a drawn italic at every weight, so inline emphasis in sans copy
  is now real and needs no role of its own. This is not a licence for sans
  italic display or sans pull quotes; quoted voice is still serif.
- **Newsreader** — variable Scotch roman with a real optical-size axis
  (`opsz` 6–72), used for every heading. A serif for the ink layer is a
  deliberate civic gesture: this is a document, not an app — and a Scotch
  roman is specifically the face of the printed record. Always set an
  optical stop: `--serif-display` for headings, `--serif-text` for body,
  `--serif-quote` for quoted voice. One value for both ends is the mistake
  the axis exists to prevent.
- **Serif italic is reserved for quoted human voice** at 18px and up — a
  constituent's words, a pull quote, an epigraph. Never for metadata, and
  never below 1.125rem. Metadata is serif roman at 420.
- **IBM Plex Mono** — reserved for **machine identifiers in body
  prose**: statutory citations inline with text (`§ 791.02(1)`,
  `42 U.S.C. § 1983`), line numbers in a left gutter, debug strings
  meant to be copy-pasted (Clerk user IDs, env-var names), and `<code>`
  spans inside markdown. The test: if a code is a *signpost* the user
  is *navigating by*, it's chrome-width sans, not mono. If a code is a
  *literal verbatim string* the user is *reading or copying*, it's
  mono. Bill numbers and jurisdiction abbreviations are **not** mono
  in the general case — they're referent names, and they take their
  type from the host context: serif inside serif headings (matching
  how the actual artifact prints them), chrome-width sans inside chrome (table
  columns, breadcrumbs, badges, status stamps).

  **Conventional exceptions**: animating numeric counters and small
  count-badge chips next to headings can use `font-mono tabular-nums`
  even though the value isn't being copied — the typewriter contrast
  against typeset prose reads as a deliberate counter badge, and
  tabular figures keep the digits from jittering as the count
  changes. Reserved use only.

The sans ships **one** weight scale. An earlier version dual-calibrated
it — a light scale and a dark scale, the dark one shifted about 7/8 to
offset optical bloom — and the system called that *brittle but correct*.
It was brittle, and it was not correct. It doubled every weight decision
forever, the delta was imperceptible below display sizes, and a scale that
half the components track and half don't is worse than either choice. The
bloom is real, but only at display sizes, so it is corrected once in the
CSS layer on the display roles. Component code names one weight and moves
on.

### Icons

Icons are **Phosphor Icons** (`@phosphor-icons/react/ssr` for the
component, `@phosphor-icons/react/lib` for the `Icon` type). The system
deliberately avoided Lucide because Lucide's stroked-path rendering
causes visible sub-pixel overlap and `currentColor` darken-on-intersect
on dense glyphs (X, search, settings). Phosphor draws each icon as a
single merged outline path, eliminating the bleed.

Weight register:

- **`weight="regular"`** — default. Outline icons for navigation,
  inactive state, and most chrome. Reads as ink.
- **`weight="fill"`** — reserved for *active* states (selected tab,
  current sidebar item, selected `CardSelect` option). Carries the same
  "user's trail" signal as Midnight Indigo ink — fill = the user is here.
- **`weight="light"`** — illustration weight. Reserved for the large
  empty-state hero glyph in `EmptyState` (48 px stroke-1 thin).
- **`weight="bold"`** — for tiny inline icons that need to read at
  12–14 px (button leading-icon glyphs at `size={16}`).

Phosphor names use the `Icon` suffix (Phosphor v2.1+):
`MagnifyingGlassIcon`, `EnvelopeIcon`, `CaretDownIcon`, `GearIcon`,
etc. Bare names (e.g. `MagnifyingGlass`) are deprecated by the library.

#### When icons earn their place

Icons are signal, not decoration. The system is restrained on purpose —
when every card title gets an icon, users go blind to all of them. An
icon belongs in the UI only when it does one of these jobs:

1. **Replaces text.** Icon-only buttons (close X, search magnifier,
   chevron toggle, hamburger). The icon *is* the label.
2. **Disambiguates text.** Thumbs-up/down for For/Against position,
   D/R caucus badges on sponsors, jurisdiction seals on bills, status
   dots on activity. The icon carries information the text alone
   cannot.
3. **Signals state.** Checkmark for completed step, warning triangle
   for errors, spinner for loading, ping for live. Semantic glyph,
   not decoration.
4. **Aids wayfinding at a glance.** Primary navigation with a small,
   stable set of destinations (sidebar). The user scans by shape, not
   by reading. Limited to durable nav — not every list of links.
5. **Is content, not chrome.** Emoji on conversation cards, brand
   logo, jurisdiction seal on bill detail. The icon is data the user
   came for.

Icons become noise when they:

- Sit next to a clear text label that already names the thing.
  "Conversations" does not need a chat bubble — it's literally the
  word "Conversations." Card titles, section headers, and form-row
  labels stand on text alone.
- Repeat on every item in a homogeneous list. If every group header
  in a settings page gets an icon, the icons stop functioning as
  signal and become wallpaper.
- Decorate a button that already has a descriptive verb. A leading
  icon on "Save" is noise; a leading icon on "Track" or "Generate"
  may earn its place if it carries action semantics the verb alone
  doesn't (a bookmark glyph for tracking, a sparkle for generation).

Test: if the user can tell what something is from the text label
alone, the icon is decoration — drop it. If the icon is the *fastest*
path to recognition (nav, status, action affordance, content), it
earns the pixels.

## Elevation Without Motion

Elevation is strictly a function of **shadow depth and ring opacity**.
The system's cardinal rule: hover states never transform. No `scale()`,
no `filter: brightness()`, no lift animation. A button on hover
brightens its background by one step and bumps its shadow one tier —
that is the entire vocabulary. This was chosen after observing that
`filter: brightness()` promotes elements to a new compositing layer and
causes sub-pixel icon wobble, and that `scale()` on cards causes layout
jitter on constrained screens.

The system is still *at rest* — but not inert. **Streaming is not
motion**: text arriving token by token, a typing indicator, a skeleton
resolving — that is content arriving, not the interface moving, and it
costs nothing from the budget below. The test is whether the thing being
animated is already on screen and already correct. Two surfaces are
permitted to move, and only two: the **Receipt** blooms once at
issuance, and the **Commons** accrues under collective action (a count
climbing, a co-signer roll growing, the aurora warming as a district
nears a threshold). Both are governed by the same discipline — *no
motion without meaning*: motion reflects something a person actually
did, never decoration. Everywhere else, and on every hover anywhere, the
system holds. The navbar is always chrome (`material-chrome`)
and does not animate on scroll. An earlier version used a scroll-driven
animation to fade the navbar in from transparent past the first 48 px,
but it broke on app routes whose content scrolls inside an inner
container rather than the document root — the navbar would never
advance past `blur(0)`, leaving the chrome looking unblurred over
content. Static chrome everywhere is the correct register: a living
document does not bounce, and the chrome does not wait to arrive.

## Pressed States

A bright fill with an ink label cannot darken far on press: the label breaks
before the fill reads as pressed. `action-active` at `oklch(.60 .145 160)` is
about six points of lightness below rest, which is the whole available budget
— below roughly L .58 the ink label drops under 4.5:1.

Six points is a real but shallow press. Where a component needs a stronger
pressed signal than that, it must come from **ring or inset shadow**, never
from more fill darkening. This is a genuine constraint the previous
dark-fill-with-white-label CTA did not have, and it is the honest cost of the
inversion.

## Shape

Radii collapse to a short, meaningful scale:

- `0.25rem` (4 px) — inputs, status pills, chrome fragments. Sharper
  because they belong in a form, not on a dashboard.
- `0.5rem` (8 px) — buttons, cards, most content surfaces. Friendly but
  not novelty-cute.
- `0.75rem` (12 px) — modals, FABs, floating overlays. Softer to
  signal their temporary, floating status.
- `9999px` (full) — pills, toggles, avatars.

No 2xl, no 3xl. If a surface is bigger than a modal, it is a page, and
pages don't have corners.

## Accessibility Is a Hard Line

Three OS-level preferences are honored at the CSS layer:

- **Reduce Transparency** — glass collapses to solid zinc-50 / zinc-100
  (light) or zinc-800 / zinc-900 (dark). The layout does not shift.
- **Increase Contrast** — secondary text opacity rises from 55% to 75%
  and materials solidify.
- **Reduce Motion** — all animations and transitions clamp to 0.01 ms.

Focus is always slate, always visible, always at 2 px with a 4 px offset
(8 px on inline links). Focus is *never* removed for cosmetic reasons;
it is suppressed only when focus arrives from a mouse click
(`:focus:not(:focus-visible)`).

Interactive targets are never smaller than 44 × 44 px — Apple's HIG minimum
tappable area (44pt, current as of 2026-08), corroborated at 44 CSS px by WCAG
2.5.5 (AAA). Android asks for 48dp, so 44 is the floor of the three, not a
target: go to 48 where a control is dense, consequential, or thumb-reached.
WCAG 2.2's newer 2.5.8 says 24px at AA; it is not an update to this number.
**A component with a touch target declares its own minimum** — arriving at 44
by way of padding and icon size is how the tab bar shipped 40. See
`a11y.targetSize`.

## Dark Mode: Paper Islands

Dark mode is class-based, not system-preference-based. A `.dark` class on
an ancestor (set by the theme toggle, persisted to local storage)
switches the entire tree. This is deliberate — the operator chooses
the room's lighting; we do not flip on them mid-session because the OS
changed.

**The Paper Islands Rule.** Inside dark mode, the `paper-cream` and
`paper-parchment` canvases — and every descendant of them — opt out.
Paper stays light and warm in both modes. The room around the page
dims; the page itself does not. This is enforced at the variant level
in `app/globals.css`:

```css
@custom-variant dark (&:is(.dark *):not(
  .paper-cream,
  .paper-cream *,
  .paper-parchment,
  .paper-parchment *
));
```

So `dark:` utility classes on anything inside a paper canvas are
**inert**. Ink renders the same on paper in both modes. This is the
point — statutory text, composed letters, and long-form analysis
should feel like paper under a lamp regardless of how the surrounding
chrome is lit.

**Paper in the dark room is lit, not swapped.** This corrects both prior
accounts. The rule used to say ink renders *identically* on paper in both
modes; `colors_and_type.css` meanwhile darkened paper to near-black. Neither
is what ships. The sheet stays light and **warms to lamp temperature** —
`oklch(.78 .058 68)` cream, `oklch(.77 .067 64)` parchment — under two radial
light pools anchored to the viewport with `background-attachment: fixed`, so
scrolling passes the page beneath a stationary desk lamp rather than dragging
a cone of light along with it. Deep warm shadows, a warm inset ring. Ink stays
dark on warm paper, which is the part the original rule got right. Source:
voyager `globals.css`; see `RECONCILIATION-2026-08.md` §4.

**Canvas pairing.** The body's canonical pair is `bg-slate-100` →
`dark:bg-slate-900`. Both are stops of the Blue Hour aurora; the dark
canvas is not a separate palette but the deeper end of the same one.
Default border color flips from `oklch(0 0 0 / 0.05)` to
`oklch(1 0 0 / 0.2)` automatically — components that rely on the
default border do not need a `dark:` modifier.

**Materials in dark mode.** Every glass tier in the `materials:` token
block ships both `bg-light` and `bg-dark` variants. They are not
symmetric — light glass is white with high opacity; dark glass is
black with much lower opacity, because dark backgrounds need less veil
to read as a distinct surface. Use the matched pair; never mix a
light tier's bg with a dark tier's ring.

| Tier | bg-light | bg-dark | Notes |
|------|----------|---------|-------|
| ultrathin | 10% white | 2% black | Toggles, hover states |
| thin | 45% white | 26% black | Cards, ghost buttons |
| regular | 85% white | 41% black | Primary content cards |
| thick | 95% white | 60% black | Modals, dropdowns |
| chrome | 55% white | 90% zinc-900 | Persistent navbar — chrome solidifies in dark mode rather than thinning, because translucent chrome over a dark canvas reads as smoke. Light value resolved 2026-08-27: 55% is what every rendered navbar takes; the 75% default reached no surface and was deleted |

**What `dark:` modifies — and what it does not.**

- ✅ Glass/material backgrounds, rings, text opacity ramps, default borders, semantic state colors
- ❌ Anything inside a paper canvas (the paper-islands rule above)
- ❌ Brand colors — Midnight Indigo, Momentum green, and the oxblood seal have no dark variants. They are *the ink* and *the light* in both modes, and they hold regardless of room lighting.

## Surfaces: Five Rooms of the Same Building

The product has five distinct modes of use. Each deserves a different
register — but *not* a different system. Think of them as five rooms in
the same civic building, lit by the same Blue Hour and furnished in the
same ink. What changes between them is which material is the default,
which font family leads the content, and how much motion is permitted.

Four are *ongoing surfaces* the user can return to indefinitely — the
Reading Room, the Archive, the Writing Desk, and the Commons. The first
three are *solitary*: you read or write alone. The Commons is *plural*:
it is where the crowd gathers behind a demand and a candidate answers on
the record. The fifth, the Receipt, is different in kind from all of
them: it is *issued once* and kept. A diploma or a banknote, not a
workspace.

### The Reading Room — Conversations

The Reading Room is where someone asks a question and gets a grounded,
cited answer. It is *dialogue in session*: a transcript unfolding in
real time. This is the one surface where motion is generous — tokens
stream, citations appear, a typing indicator pulses — because it is
the one surface that is genuinely alive rather than authored.

- **Lead family:** sans for the turn-taking mechanics; serif for AI
  prose where the model is writing something that will be read rather
  than scanned.
- **Default material:** `material-thin`. Messages float; the transcript
  is not meant to feel like a static document.
- **Rhythm:** loose vertical, generous gap between turns, a single
  centered column at ≤48rem.
- **Palette emphasis:** the user's own contributions sit on a faintly
  Midnight Indigo–tinted plate — the user's trail is the primary color.
  Model responses are neutral on glass. Inline citations are Midnight
  Indigo (small, numeric, superscripted) — a citation is a trail into a
  source, which is what the primary ink means. They were oxblood until
  2026-08; a citation is also clickable, and oxblood no longer touches
  anything interactive.
- **Tactile accents:** none. A conversation is a live exchange, not an
  artifact. The Reading Room stays digital.
- **Blockquotes (in AI prose):** italic Newsreader at `--serif-quote`, full ink
  weight (`text-black/87 · /white/87`), indented behind a 4 px Midnight
  Indigo (`primary/60`) left bar. **No plate, no fill, no rounded corners.**
  The bar marks "an external voice / cited source" — distinct from
  slate, which is reserved for the system listening. Quotes flow inline
  with the transcript per "messages float / intentionally digital,
  not a document." A blockquote is a citation in long form, not a
  callout box.
- **Auto-suggested follow-ups (`SegmentFollowups`):** rendered as
  `button-secondary` (`material-regular` plate, `rounded-md`, primary
  ink), `size="sm"`, `text-sm`, wrapped flex row with
  `whitespace-normal text-left` so each button sizes to its content.
  Follow-ups are *the dialogue continuing* — the system holding the
  door open to the next likely question — so they sit at the AI
  message's content weight, not below it. Wrapped widths (rather than
  full-width vertical stacks) preserve visual rhythm in the row and
  let the user scan options naturally. **Distinct from home-page
  sample-question chips**, which stay `button-ghost`
  (`material-ultrathin`, `rounded-lg`, secondary ink) per the
  sample-question pattern in §Components.

### The Archive — Bill Pages

The Archive is where the primary source lives. Bill titles, sponsor
lists, chamber histories, vote tallies, full statutory text. This is a
*document with authority*, meant to be read carefully. It is the one
surface that deliberately echoes the physical legislative record.

- **Lead family:** serif throughout — bill titles are Newsreader at
  `--serif-display`, body analysis at `--serif-text`, and any structural metadata
  (bill number, session, line numbers, section markers) is IBM Plex
  Mono. This is the only surface where the monospace family has
  prominent visual presence.
- **Default material:** `material-regular`. The "paper" is more opaque
  here. The aurora still bleeds through, but faintly — you are reading,
  not chatting.
- **Rhythm:** dense and hierarchical. A bill page moves top-down through
  title, jurisdiction, sponsors, status, summary, text, history, votes.
  The column for body text holds to the body measure — 69 characters,
  28rem; metadata grids expand wider.
- **Palette emphasis:** semantic status drives the color. Enacted bills
  carry a green-ink **ENACTED** rubber stamp — `--color-success` here on
  cream, `--color-action` under inversion, per the which-green switch;
  success and action are one hue, so a red ENACTED would contradict the
  palette. Vetoed bills carry a
  warning-amber **VETOED** stamp. In-committee bills carry a slate
  procedural stamp. The primary visual accent is the status stamp, not
  a button.
- **Tactile accents:** this is where skeuomorphism earns its keep. Bill
  pages can carry a faint jurisdiction-seal watermark, a postmark-style
  introduction-date stamp with a 2–6° rotation, ruled lines behind the
  statutory text with IBM Plex Mono line numbers in the left margin,
  and redline amendments where strikes are deletions and underlines
  are insertions. These are not ornaments — each signals something a
  reader needs (authority, provenance, reference, edit history).
- **Paper is reserved for the verbatim bill text view.** Only the
  `view=text` rendering of `BillContentSection` (statutory language as
  it appears in the legislative record) uses `paper-cream` parchment.
  That's the actual legislative artifact — what the user came to read
  when they want the bill's literal language. The **Summary & Analysis
  view** is AI-authored content *about* the bill, not the bill itself,
  and sits on a glass `material-regular` card. Putting paper under our
  analysis falsely claims "this is the document" when the user is
  reading our prose, not the legislature's.
- **Header summary sits flat — no plate.** The browser viewport
  already frames the page; the header (title + progress ribbon +
  temporal caption) is metadata about the bill, not an artifact, and
  doesn't need its own card chrome. Document accents (stamp,
  watermark) belong on the bill text paper below, not here.
- **Where document accents live:** rubber-stamp status,
  jurisdiction-seal watermark, postmark, ruled lines, line numbers —
  these belong **on the bill text paper canvas**, not on the
  Summary view, not on the header, and not on aurora chrome. A real
  legislative document carries its stamps and seals on the document
  itself; that's how a bill copy looks when it leaves the chamber.
  Per spec line 776, the rubber stamp sits at the top-right of the
  paper; the watermark sits centered behind the preamble at 6–8%
  opacity.
- **Temporal caption beneath the ribbon.** Don't repeat the active
  ribbon segment + RubberStamp ("INTRODUCED on 4/16/26"). Instead
  surface forward-looking signal when available — `Next: hearing on
  X` if there's an upcoming `calendarEvent` — or humanized recency —
  `Introduced 12 days ago` — with the exact date in the `title`
  attribute. Italic-serif metadata register per spec line 200.

### The Writing Desk — Take Action

The Writing Desk is where the user *produces* something: a letter to
their representative, a call script, a letter to the editor, an op-ed.
This is *authoring correspondence that will be delivered*. The surface
should feel like sitting down with good paper and a pen.

- **Lead family:** serif for the produced content. A letter should look
  like a letter — Newsreader `--serif-text` body, 700 addressee,
  Archivo sans for the UI chrome around the composition canvas (save
  state, recipient picker, send button).
- **Default material:** `material-regular`. The canvas itself is more
  opaque than the surrounding UI — it is the "paper" you are writing on.
- **Rhythm:** a single centered prose column at the body measure (28rem,
  69 characters), generous margins,
  no sidebars crowding the canvas. The letter is the hero.
- **Palette emphasis:** the **Send / Seal / Publish** button is action
  green — it is the most consequential control in the product. The
  post-send confirmation is an **embossed seal**, pressed into the letter
  paper with no pigment at all. Slate ink everywhere else.
- **Tactile accents:** the canvas carries a procedural paper grain at
  ≤2% noise and faint horizontal ruling at line-height (4% black). The
  closing of the letter includes a dotted signature line with a
  letter-spaced "Your Name" label beneath it. On Send, a wax-seal stamp
  fades in (no bounce, no rotate) to confirm the correspondence has
  been sealed — pressed into the sheet, no pigment. Post-send views can show an envelope preview with a
  small oxblood postage corner — the envelope has been issued.

### Room Tints

The ongoing rooms share one light source (the Blue Hour aurora) but not
one surface color. Reading Room stays on the aurora directly — glass
cards, translucent transcript flow, never landing on paper. The
**Commons** stays on the aurora too, for the same reason in reverse: an
ask is *live*, still gaining signatures and awaiting a reply, so it
belongs on breathing glass, not on settled paper. Archive introduces an
opaque **paper-cream** canvas where bill text actually lives — the aurora
still lights the room around it, but the statute itself sits on parchment
because you cannot read long prose through colored glass without fatigue.
Writing Desk uses a slightly warmer **paper-parchment** for the
composition canvas — the letterhead stock register, aged a shade beyond
the Archive's reading paper.

The rule: glass is for chrome, cards, modals, and navigation. Paper is
for statutory text, composed correspondence, and long-form analysis.
The choice is functional, not decorative — if the user is reading or
writing for more than thirty seconds, they need paper beneath the text.

### The Receipt — Post-Action Surface

The Receipt is the surface the user receives *after* a civic action
completes. A letter sent to their representative produces a Receipt. A
petition signed produces a Receipt. A bill tracked, a vote recorded, a
piece of correspondence delivered — each one mints an artifact the user
keeps. It is a *diploma issued by a phone*, a *banknote of
participation*. The Receipt is the only surface in the system whose job
is to commemorate.

Receipts do not behave like the other rooms. They are issued *once*,
and they are kept. They sit on opaque parchment so the
artifact reads as paper, not a glass interface. They borrow every
tactile accent the system has — wax seal, postmark, signature line,
ledger numbering, ruled-page provenance — though the seal is now an
emboss rather than a wax disc — and they introduce one
exclusive accent of their own: the **guilloche** line-work border,
the unmistakable visual signature of an issued document since the era
of engraved banknotes.

The Receipt is also the one place in the system where motion is
permitted to bloom. The aurora intensifies briefly at the moment of
issuance; the embossed seal lands last with a small shadow; the
guilloche border draws on left-to-right; the ledger number counts up
to its final value. After about 400 ms, the receipt is static — a
piece of paper the user can keep, share, screenshot, or download. On
portrait the guilloche **fades** rather than drawing left-to-right: a
320pt rule drawing across the screen reads as a loading bar, and an
issued artifact must never look like it is still loading.
Crucially, this *celebration moment* lives only on the Receipt. If
the same intensification leaked onto Reading Room messages or bill
pages, it would lose its meaning. Restraint everywhere else is what
makes the Receipt feel issued.

The palette stays disciplined even here. There is no synthwave
gradient, no magenta, no off-system color. The Receipt earns its glow
by *meaning* — the user just did something worth marking — not by
sparkle. The system already has the colors it needs to make a moment
feel ceremonial: deepened Blue Hour, a seal pressed into the sheet,
parchment that catches more light. Anything more would make the
Receipt look like a coupon.

#### The Receipt is two artifacts

*Corrected 2026-08-02, audit §3.7. The spec said landscape, max-width 56rem.
A landscape certificate on a portrait phone is not a layout problem to solve
later; it is the surface most likely to be screenshotted, and it was the
contradiction blocking the register collapse in §3.5.*

**The kept artifact is portrait HTML.** Live, selectable, linkable, on
`paper-cream`, single column at 34rem, bloom at issuance. It is issued at the
phone because that is what *a diploma issued by a phone* has to mean. The
caption stacks, the title sets around 27px, and the emboss moves inline with
the signature rule — where a notary actually presses, over the signature
rather than beside it.

**The shared artifact is a rasterised image, in three ratios.** This is not a
new idea; it is what production already does, because platforms crop
differently and a person sharing to a story and a person posting a link are
not doing the same thing.

| ratio | size at 1× | where it goes |
|---|---|---|
| tall | 1080 × 1920 (9:16) | stories, status |
| square | 1080 × 1080 (1:1) | feeds |
| wide | 1200 × 675 (16:9) | link previews, timelines |

Each ratio is **authored at its own pixel size and rendered at 2×** — never
produced by scaling another one, which is exactly how the ledger number ended
up at 5px on a phone. Every ratio carries the place-of-issue caption, the
title, the ledger number, the emboss and the guilloche. Only the wide ratio
may drop the attribution line, because it is read at thumbnail size in someone
else's feed.

**Paper is full-bleed in every export.** No glass, no backdrop-filter, no
aurora, no motion — a raster has no bloom, and the emboss has nothing to press
into unless the paper reaches the edges. The emboss is never smaller than 44px
at 1×.

### The Commons — Asks & Accountability

The Commons is the surface the other rooms were missing. The Reading
Room, Archive, and Writing Desk are all things you do *alone* — read
alone, write alone. The Commons is where you are **not** alone. It is
where one person's demand becomes a district's, where neighbors co-sign
the same words, and where a candidate has to answer for them on the
record. If the Writing Desk is the First Amendment's right to petition
exercised privately, the Commons is the **right of assembly** — the same
impulse, made plural and made public.

- **Lead family:** sans for the live, social mechanics (counts,
  co-signers, candidate responses, timestamps) — this is the present
  tense, not an archived document. Serif still carries the *ask itself*:
  a demand a constituent authored deserves the same weight a bill title
  gets.
- **Default material:** `material-thin` on aurora. The Commons never
  lands on paper — paper is for issued and archived artifacts, and an ask
  is *live*, still gaining signatures, still awaiting a reply. Glass keeps
  it breathing.
- **Rhythm:** a vertical feed of asks at ≤48rem; inside a single ask, a
  **roll** of co-signers and a ledger of responses that can run wider
  than the prose column.
- **Palette emphasis — three accents, three jobs.** Midnight Indigo is
  *your trail* (where you've navigated, what you've selected). Oxblood is
  *your intent* — when you put your name to a demand, the act lands at
  full wax-seal saturation, because signing your name is the most
  consequential thing you do here. **Emerald is the crowd**: co-signs,
  endorsements, "candidate answered", and counts climbing. This is the
  one surface where green is a brand color, not just a semantic one (see
  the Momentum Accent).
- **Tactile accents:** the **signature roll** (co-signers accruing as a
  roll of names and avatars — the petition sheet), the **on-the-record
  entry** (a candidate's reply as a dated ledger line: position · bill ·
  date), the **tally** (live count in IBM Plex Mono tabular figures — the
  one place a number is meant to be *watched*), and the **threshold
  meter** (a bar that warms toward emerald as a district nears critical
  mass).
- **Motion — momentum, not ceremony.** This is the second and last
  surface where the system is allowed to move (the Receipt is the first).
  But the two are different in kind. The Receipt's motion is a *one-shot
  bloom* at the instant of issuance, then static forever. The Commons
  **accrues**: a count ticks up because a real signature landed, the roll
  grows by one real avatar, the aurora warms a notch as a real threshold
  nears — and then *holds* at the new state. It never pulses idly and it
  never invents motion that doesn't correspond to something a person
  actually did. The rule that keeps it honest is the same rule that
  governs every tactile accent: *no motion without meaning.* A moving
  number that isn't really moving is the Commons' version of
  ornament-without-meaning — forbidden.

The Commons is loud the way a full town hall is loud: not from
decoration, but because the room is full. The system's job here is to
make a single voice feel joined, and an answer feel owed.

### Where surfaces meet

Some screens sit at a boundary. The **Conversation Starter** on the home
page is a Reading Room artifact embedded in a marketing surface — the
textarea carries the Reading Room's loose rhythm but sits on a
marketing-hero material. Inline **AI analysis on a bill page** is a
Reading Room snippet embedded in Archive — it should visibly adopt the
Archive's serif body while keeping the Reading Room's citation
treatment. The rule: when a surface is quoting another surface, it
borrows the quoted surface's family but keeps its own material.

## The Newcomer's Lede

The system had a voice for institutions (Archive — clerical, exact) and a voice
for the crowd (Commons — present tense, live). It had no voice for the person
who has never read a bill, who is the user the product exists for. Every
default optimised for gravitas and prolonged reading; the newcomer arrives from
a text message, on a phone, and leaves in ninety seconds.

**The fix is not a fourth typographic register.** That was built and rejected —
a sans, larger, looser "plain" role read flat: lede, facts and action all landed
at one value and nothing told the eye where to begin. Plainness had been
assigned to the *typeface*, which then had no range left to build hierarchy
with. The newcomer is not failed by the serif. They are failed by the **words**
and by the **order**.

So the register is a writing rule and a hierarchy rule, in the Archive's own
type:

**One sentence.** Second person, present tense, what it would do to the reader.
`.role-lede` — Newsreader at `--serif-text`, 1.25rem / 1.55, measure 52ch. It sits
directly beneath the title, above provenance. *"If you rent and you get an
eviction notice, this bill gives you 30 days to respond instead of 10."*

**Three facts.** Who it affects · where it stands · who represents you.
Secondary ink, one line each. The stage answers the newcomer's actual question
— *is it too late?*

**One action.** A single filled green plate. Everything else green on the page
is a report, per the fill rule.

**The statute is a destination, not the landing state.** Paper begins where the
statutory text begins; that transition is the door from the register into the
artifact, and it should feel like one.

### The jargon rule

The jargon term never appears alone. Either it is replaced, or what it means
follows immediately, in the same sentence, in the same voice. **A tooltip is not
a gloss** — it is jargon with a lid on it, and it fails the newcomer exactly
where they are least able to ask.

| Instead of | Write |
|---|---|
| Engrossed | Passed the House. The Senate votes next. |
| Referred to committee | A small group of legislators is deciding whether it goes to a full vote. |
| Sine die | The session ended. This bill is dead until someone files it again. |
| Fiscal note pending | Nobody has priced it yet. |
| The bill was amended on second reading | They changed it before the vote — *[what changed]*. |
| "Concerning the creation of…" | Start with the reader: *"If you rent…"* |

Sentences under 25 words. No exclamation. No second-person imperative outside
the action itself. Numbers are facts, never emphasis — *1 in 3 households*, not
*a THIRD of renters*. **Plain is not peppy**; the forbidden register still
holds. This asks the system to be legible, not friendly.

### The thirty-second path

A first-class flow, so the register has somewhere to live.

| When | What | Register |
|---|---|---|
| **0–5s · arrive** | The lede. What this does to you, before anything else paints. | newcomer |
| **5–20s · orient** | Three facts. The stage answers *is it too late*. | newcomer |
| **20–30s · act** | One green plate. | newcomer |
| **after · go deeper** | Statute, sponsors, history, full text on paper. | **Archive — the plain voice stops at this door.** |

The lede does not persist past the door and never overwrites the record. The
Archive's clerical voice is correct for the artifact; it was only ever wrong as
the *entrance*.

### Open: who writes the sentence

Every bill needs one and there are 464,269 of them. Generated then reviewed?
Generated and labelled as such? **A plain sentence that is wrong is worse than
jargon that is opaque, because the newcomer cannot tell.** This is the part of
§3.1 that is not a design decision and must not be closed by one. Unassigned.

## Tactile Accents

The system is primarily flat, translucent, and modern. Tactile detail is
permitted — encouraged, even — but only as garnish. The rule:

> A tactile accent must reference a real civic artifact (rubber stamp,
> embossed seal, signature line, postmark, ruled statute page, jurisdiction
> seal, envelope) **and** serve a communicative purpose (status,
> authority, confirmation, identity). Ornament without meaning is
> forbidden.

Accents are drawn in a 2026 register, not an iOS-6 one. They are
vector-constructed with slight imperfection — never photographic.
Textures stay below 4% noise. Ink-break on rubber stamps is a subtle
0–15% alpha variation across the mark; the geometry stays clean.

The inventory is deliberately short, and its statuses are now checkable.
It was thirteen entries in July 2026 — the audit said twelve and listed
thirteen, which tells you how carefully anyone had counted — most of them
unbuilt and one carrying the words *design TBD*. A described-but-unbuilt
accent is worse than a missing one: it reads as available, and the next
four people who need it each build a different version.

The list was cut in August. But it was cut **from the document**, and on
2026-08-02 the promotion gates were run against the codebase for the first
time. Six of thirteen statuses were wrong, in both directions. Three
"canonical" accents had never been built; two "proposed" accents were
shipped and load-bearing. The status of an accent had been tracking how
much had been written about it rather than what existed — which is the
exact failure the gates were invented to prevent.

So the rule now is: **a status is a claim, and a claim carries its
evidence.** Every canonical entry names the file it ships in. Every
proposed entry names the gate it is stuck at. A status with no evidence is
a bug, and unlike a status typed from memory, it is greppable.

**Canonical — build these, reach for them freely:**

- **Rubber-stamp status** — rectangular or oval border, 2 px stroke,
  2–4° rotation, chrome-width uppercase typography, used for bill status on
  Archive surfaces. One stamp per bill. Green ink for enacted/signed —
  `--color-success` on light, `--color-action` inverted, never action
  green as light-mode ink — amber for vetoed, slate for procedural,
  --color-danger only for dead. It carries real information and it appears on
  every bill. *The oxblood divergence recorded here is closed: the code
  migrated 2026-08.*
- **Guilloche** — engraved line-work bands, top and bottom, on every
  Receipt artifact. Overlapping low-amplitude sine waves, 20–40 lines per
  band, slate-700 at 20–30%. The visual signature of an issued document
  since the era of engraved banknotes, and the single thing that most
  makes a Receipt read as *issued* rather than *rendered*. **Drawn
  procedurally at the width it is rendered at** — a band authored once and
  scaled takes its stroke weight with it, and at phone scale a 0.6 px
  engraving lands under one device pixel and greys into a smear. That is
  the ledger-number bug wearing a different hat.
- **Progress ribbon** — 8 px segmented bar with a chrome-width milestone label
  beneath each segment, on Archive bill pages. It encodes where a bill
  actually stands. On a failed bill it deliberately refuses to draw a
  journey it cannot verify: one red pin, one caption, no milestone row.

**Proposed — described, not sanctioned. Do not ship one from this
document alone:** postmark, jurisdiction seal, ruled page, line numbers,
the seal, the signature line, folder-tab step, lapel-pin, and envelope
preview. Each is fully specified in `tactileAccents.proposed`, each names
the gate it is blocked at, and every one of them is blocked at
IMPLEMENTATION except the jurisdiction seal, whose form is still undecided.

Three of those were canonical until the gates were run. **The seal** is
specified as a blind emboss and ships as a 40%-opacity watermark. **The
ruled page** has no implementation at all — its only trace in the codebase
is a comment saying what it pairs with. **The signature line** is not
built, and the Receipt simulates signatures in a script face, which that
accent's own rule forbids; see `openQuestions.what-is-a-signature`.
Canonical has to mean built, or it means nothing.

**Retired:** paper grain. It was the one entry that could not state a
communicative purpose — grain states atmosphere — and the system forbids
ornament without meaning.

What is forbidden: drop-shadow faux-3D, gradient bevels, inner glows,
fake depth on an element that is not paper (this is *not* a ban on the
blind emboss — the seal is a real press into a real paper canvas, and the
old wording forbade the accent the system had just specified),
photographic paper, American-flag accents, eagle
icons, or any nationalist iconography. Civic is not partisan. Ornament
without meaning is not civic — it is decoration, and decoration belongs
in a product that does not care whether its users act.

## Celebration

The system is restrained on every surface, every interaction, every
state — *with two exceptions, different in kind*. The first is the
Receipt's **bloom**; the second is the Commons' **accrual** (described
in its surface section). This section governs the bloom. When a Receipt
is issued, the system is permitted, for 250–400 ms, to bloom. The Blue Hour aurora deepens by
about 15% chroma at all three stops and then settles back. The Oxblood
wax seal scales in from 0.8 to 1.0 with a small drop-shadow lag,
landing last so it reads as *applied* rather than *drawn*. The
guilloche border draws on left-to-right like ink applied across the
page. The numbered ledger entry counts up to its final value. After
that moment, the receipt is static — a piece of paper the user can
keep, share, or download.

This bloom is exclusive to the Receipt — the only place where the aurora
*intensifies in a single arc* and where Oxblood lands in full saturation
as a *visual event* rather than a button color. Restraint everywhere
else is what gives this moment its weight. If the same bloom leaked into
Reading Room messages or Archive bill pages, it would stop meaning
anything. The Commons also moves, but it does not *bloom* — it
**accrues**, a slow gathering that reflects real collective action
rather than a one-shot payoff. The two are not the same motion, and
neither dilutes the other; the bloom marks an *issuance*, the accrual
marks a *gathering*.

What is forbidden in the celebration moment: magenta, synthwave,
off-palette gradients (the existing palette already does this work);
bounce or overshoot or spring physics (the receipt is *issued*, not
delivered by a confetti cannon); sound effects; reuse of the
celebration mechanics on any non-Receipt surface.

## Patterns

- **The Conversation Starter** — a serif-headed hero sits above a
  `material-regular` plate containing the jurisdiction picker and the
  question textarea. It is the canonical entry point. Every question
  starts here.
- **Bill Cards** — `material-thin` tiles with a small semantic status
  dot, a mono bill number, and a short title. They tile in a responsive
  grid. They do not cast heavy shadows; they float on the aurora.
- **The Map** — a state-level hex grid where population weight is
  encoded as slate opacity (previously violet). Active jurisdictions
  fill; out-of-session ones fall to a pale zinc hex with a thin ring.
- **Empty States** — never blank. A Phosphor illustration icon at
  `weight="light"` sits centered inside a dashed `card-empty`, under
  a sans-serif label that names the missing thing.
- **The FAB** — Oxblood, fixed bottom-right, appears only on screens
  where the primary action is ambiguous or discovery-driven. It is the
  wax seal on the correspondence.

## What NOT to Do

- Do not use violet, pink, magenta, or fuchsia as a **brand accent** — a
  button, badge, chip, stamp, or type colour. They read as consumer-SaaS
  and conflict with the civic register, and that is what the ban was
  always about. It does **not** extend to ambient light: the aurora
  curtain's 290 lobe is low-opacity gradient, not an accent, and it is
  permitted. Narrowed 2026-08 to match what shipped and what the rule
  actually meant.
- Do not use amber as a brand accent. Amber's job in this system is
  *warning*, nothing else.
- Do not color text with named grays. Use `text-black/87 · /55 · /38`
  (or the dark-mode inverse) exclusively.
- Do not use `scale()` or `filter: brightness()` in hover states.
- Do not use `transition-all` on interactive elements. Enumerate
  `background, box-shadow, color, ring` explicitly so layout-sensitive
  transitions never fire.
- Do not render headings in all-caps. The serif provides gravity; caps
  are reserved for chrome-width sans labels.
- Do not use solid paint fills for cards. If a surface needs to be
  opaque, it should feel like a modal, not a card.
- Do not author shadows outside the five elevation tiers
  (`flat`, `whisper`, `raised`, `floating`, `chrome`), and never
  tint shadows by content
  category. Shadow ink is sourced from slate-900 — one color across
  the system. Statistical marks (map tiles, status pills, sparklines,
  hex grids) get no shadow at all; color, opacity, and ring carry the
  read.
- Do not use arbitrary font-size values like `text-[9px]`,
  `text-[10px]`, `text-[11px]`, `text-[15px]`. Stay on Tailwind's
  named scale: `text-xs` (12px) is the floor for any text the user
  reads, and there is **no chrome exception** — tab-bar labels,
  signature-line labels, ribbon milestone labels, and gutter line
  numbers all sit at 12px. (Each of those was silently below the floor
  until 2026-08; if a label no longer fits at 12px, the layout is the
  problem.) Anything below 12px fails accessibility and signals that
  the design is asking the type to fix a layout problem instead of
  fixing the layout. The rare exception — a `text-[number]px` for a
  display-register treatment that genuinely needs an off-step value
  — must round up to a named step on the next lower viewport (i.e.
  never below `text-xs` even at the smallest breakpoint).
- Do not let a value's wrapped lines spread further apart than the gap
  between the value and its label. Vertical space encodes grouping: a
  label and its value are one unit, so the label→value gap must read
  as tighter than the value's own line-height (and than the gap to the
  next field). When a value can wrap — status notes, vote lines,
  addresses — tighten its leading (`leading-tight`/`leading-snug`) and
  add a hair of space under the label (`mb-1`) so the wrapped value
  coheres as one block instead of the label reading orphaned.
- Do not set bare text inside the aurora curtain band. Hue was never what
  protected opacity-based text — placement was. Below the band every rung
  behaves as documented; inside it, in the dark room, even 87% ink measures
  3.53:1. Chrome that must overlap the band carries `material-chrome`,
  which re-establishes a ground. See `a11y.contrast`.
- Do not use guilloche line-work outside the Receipt surface. The
  border is what makes the receipt feel issued; if the same line-work
  appears on bill pages or chat surfaces, it stops signaling
  *issuance* and becomes ambient ornament.
- Do not borrow the Receipt's *bloom* motion (aurora deepen, seal drop,
  guilloche draw-on) on any other surface — with the Commons as the
  deliberate exception, whose *accrual* motion (counts and rolls climbing
  under real collective action) is a distinct mechanic, not the bloom.
  The bloom makes Receipts feel issued; if it leaks elsewhere, it
  dilutes.

## Known Divergence: font-weight scales

The spec holds **one** sans weight scale. Production has **four** —
`:root` sans, `.dark` sans, `.font-serif`, and `.dark .font-serif`, each a
full nine values, the dark pair shifted ~7/8 for optical bloom.

This is recorded as a divergence rather than resolved in either direction,
and the direction is settled: **the spec is right and the code migrates.**
Deleting the three extra scales is a one-file change in `globals.css` plus a
visual pass on display type in dark mode. Do not let the spec drift back to
match the code — parallel scales are how it reached four in the first place,
and the audit's finding stands: contributors cannot track them, so half the
components eventually stop.

Until the code catches up, treat any dark-mode weight in production as
legacy. Author new work against the single scale.

## Governance

The system had none of this until 2026-08, which is how it accumulated
twelve tactile accents, two font-weight scales, and six clauses that
contradicted each other. The rules are short on purpose.

**Ownership.** The system has one owner, named in `CHANGELOG.md`. The
owner is not a gate on using the system — reach for anything marked
canonical without asking — but is the tiebreaker on anything that changes
a token, adds a role, or promotes an accent.

**How a change lands.** In this order: the change ships in the product,
then the spec is updated in the same week, then `CHANGELOG.md` records it
with a date and a one-line reason. Spec-first is how the twelve accents
happened. A spec entry with no implementation behind it must say so in
its own text — `[proposed]`, or a `status:` key — never sit alongside
built things as though it were one of them.

**Promotion.** An accent, a role, or a surface moves from proposed to
canonical only through `tactileAccents.promotion.gates`: a named owner, a
shipped implementation, a specimen in `preview/`, and a stated
communicative purpose. Demotion runs the same way in reverse and in the
same change that removes the implementation.

**Reconciliation.** This document is spec-derived, not source-derived,
and it will drift. Once a quarter someone reads it against the codebase
and marks what is real. Anything that survives two reconciliations
unbuilt gets cut, not re-promised.

**Versioning.** Dated entries in `CHANGELOG.md`, newest first. No
semantic version — the system is not consumed as a package, and a version
number would imply a stability contract nobody is keeping.

## Heritage

This system has ancestors, and it is worth naming them so future
contributors know what is being honored and what is being left behind.

The closest ancestor is **Votizen** (2011–12) — a civic platform from
the late skeuomorphism era that figured out, in advance of most of the
industry, what a letter-writing interface could feel like if it took
the metaphor of a letter seriously. Votizen is where the wax-seal
confirmation stamp, the folder-tab step markers, the italic-serif
metadata voice, the rubber-stamp accent on the letter body, and the
parchment-canvas-for-composed-content patterns come from. Wherever
this system uses an opaque paper surface under serif prose, a faint
circular stamp on produced content, or a numbered tab jutting above a
section header — that is Votizen's work, translated into a 2026
register.

What is deliberately **not** carried forward from Votizen:

- **Americana star patterns** in header bands, page backgrounds, or
  ornamentation. The Blue Hour aurora does the atmospheric work
  without the nationalist connotation. Civic is not partisan.
- **Photorealistic lapel-pin renders** with chrome bevels, gloss, and
  drop-shadow dimensionality. That is iOS-6 aesthetic. The modern
  equivalent is a flat vector pin with a 1px hairline ring, as in the
  existing voting-button mark.
- **Script/handwriting fonts** as *system typography* — as a heading face,
  a display face, or anywhere in the UI. That was always the real point of
  this rule and it stands absolutely.

  **Narrowed 2026-08:** the ban does not reach signatures. A script face is
  permitted for **rendering a person's name at the moment they put it to
  something** — a co-sign, an endorsement, a vote-pledge, a sent letter — and
  nowhere else. That is not typography; it is an artifact of an act. An
  uploaded signature image still wins wherever one exists. Production ships
  `--font-signature` with a `signature-write` keyframe that draws the name
  on left-to-right; the insets deliberately over-extend so script swashes are
  not clipped.
- **Slab-serif condensed campaign-poster display type** for bill
  titles. Newsreader at `--serif-display` (opsz 60 / wght 800) carries
  gravity without pulling the register toward campaign poster.
- **Second-hue secondary CTAs** ("Follow" chips in their own accent
  colour). One action colour does that job here — Momentum green, and
  only as a filled plate on the primary act; secondary actions sit on
  neutral plates. The fill rule keeps the green scarce.

The second ancestor, loosely, is **Designing Obama** (Scott Thomas's
2009 design documentation of the Obama '08 campaign) — specifically
its discipline around institutional typography (Gotham), restrained
palette, and the principle that civic design should feel confident
rather than combative. Amendment is not a campaign and does not carry
a candidate's identity, but the temperature of that work — calm,
deliberate, modern — is the temperature this system aims for.

Neither ancestor is being imitated. Both are being cited.

## The North Star

Civic information is too often rendered in interfaces that look either
**bureaucratic** (spreadsheet gray, system-font dense) or **combative**
(cable-news reds, outrage outlines). Amendment is neither. The
bureaucratic version assumes you only want to read; the combative version
assumes you only want to fight. This system aims for a third thing:
**calm, legible, confidently modern — and quietly on your side.** The
visual equivalent of someone who knows how the system works, takes you
seriously, and helps you be heard.

**Calm is not the same as still.** The system keeps its composure
everywhere — but when a neighbor co-signs your demand, when your district
crosses a threshold, when a candidate finally answers on the record, the
interface is allowed to show that something is happening. Restraint is
the resting state, not a vow of silence. The dignity is in never
manufacturing a moment that isn't real — *not* in refusing to mark the
ones that are.

The metaphor is a living document, and the people are its authors: ink,
paper, and wax seal for the institutions; the Blue Hour light — and the
gathering crowd — for the voice that keeps amending them. Institutions
beneath, participation above. A more perfect union, rendered, and signed.
