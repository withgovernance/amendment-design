# Receipt composition

**Status: aspirational.** The post-action surface. Only the single letter-sent flow ships; petition-signed, vote-recorded, and bill-tracked Receipt variants are specified but not built.

A *diploma issued by a phone.* A *banknote of participation.* Issued once and kept. Landscape, not portrait. The one surface where motion is permitted to bloom — and the only place the guilloche border is allowed.

> **Surface defaults:** `paper-cream` canvas. Serif throughout. `HEXP 100` ceremonial caption (place + date), once per page. IBM Plex Mono for the ledger number. **Arrival motion at issuance, then static for the rest of the artifact's life.**

## Anatomy

```
┌──────────────────────────────────────────────────────────┐
│ Navbar                                                    │
├──────────────────────────────────────────────────────────┤
│ Breadcrumb: Take Action › Letter › Receipt                │
│                                                           │
│  ╲∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿╱           │  ← Guilloche (top band)
│                                                           │
│        COLORADO · 2026 REGULAR SESSION · MAY 23           │  ← place-of-issue (HEXP 100)
│                                                           │
│      Your letter has been delivered.                      │  ← title (Merriweather 800)
│        Issued to Jordan Hale · on behalf of HB 21         │  ← italic-serif attribution
│                                                           │
│                      ┌────┐                                │
│                      │ A  │                                │  ← WaxSeal (drop-in animation)
│                      └────┘                                │
│                                                           │
│      LETTER NO. 14,508 · RECIPIENT · REP. BENSKY          │  ← LedgerEntry (HEXP-60 + mono)
│                                                           │
│           [ Save PDF ] [ Share ] [ Home ]                 │
│                                                           │
│  ╱∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿╲           │  ← Guilloche (bottom band, mirrored)
│                                                           │
└──────────────────────────────────────────────────────────┘
        max-width: 56rem (landscape proportion)
```

## ReceiptFrame

Wraps everything. `paper-cream` body bracketed by two guilloche bands. Landscape proportion (max-width 56rem, wider than tall).

```tsx
<div className="max-w-[56rem] mx-auto mt-8" style={{perspective: 1200}}>
  <div className="
    relative rounded-sm overflow-hidden
    bg-[oklch(0.965_0.012_85)] dark:bg-[oklch(0.20_0.010_70)]
    ring-1 ring-inset ring-black/10 dark:ring-white/10
    shadow-floating
  ">
    <Guilloche width={800} height={28} className="block w-full h-auto" />

    <div className="px-16 py-11 text-center relative">
      <CeremonialCaption>Colorado · 2026 Regular Session · May 23</CeremonialCaption>
      <h1 className="font-serif font-extrabold text-[clamp(2rem,4.5vw,3rem)] leading-[1.1] mt-3 mb-1">
        Your letter has been delivered.
      </h1>
      <div className="font-serif italic text-base text-black/55">
        Issued to Jordan Hale · on behalf of HB 21
      </div>

      <div className="seal-drop inline-block mt-7">
        <WaxSeal size={104} monogram="A" />
      </div>

      <LedgerEntry letterNo={14508} recipient="Rep. Carla Bensky" method="Electronic delivery" />

      <div className="mt-7 flex justify-center gap-2.5">
        <Button variant="secondary" leadingIcon="download-simple">Save PDF</Button>
        <Button variant="secondary" leadingIcon="share-network">Share</Button>
        <Button variant="default" leadingIcon="house" onClick={goHome}>Home</Button>
      </div>
    </div>

    <Guilloche
      width={800}
      height={28}
      className="block w-full h-auto"
      style={{ transform: 'scaleY(-1)' }}
    />
  </div>
</div>
```

## CeremonialCaption

HEXP 100 — the ceremonial register. ≤ 1 per page, this is where it earns the use. Uppercase, 0.18em tracking, semibold, secondary ink.

```tsx
<div className="
  font-sans font-semibold uppercase text-[11px] tracking-[0.18em]
  text-black/55 dark:text-white/55
  [font-variation-settings:'HEXP'_100]
">
  {children}
</div>
```

## LedgerEntry

HEXP-60 label, IBM Plex Mono tabular-nums for the number. The number counts up during the issuance animation; here we render the final value.

```tsx
<div className="
  mt-6 text-xs font-semibold uppercase tracking-[0.08em] hexp-chrome
  text-black/55 dark:text-white/55
">
  Letter no.
  <b className="
    font-mono font-semibold text-sm text-black/87 dark:text-white/87
    tabular-nums mx-1.5
  ">{letterNo.toLocaleString()}</b>
  &nbsp;·&nbsp; Recipient · {recipient}
  &nbsp;·&nbsp; Method · {method}
</div>
```

## Issuance celebration (the one place motion blooms)

The Receipt is the **only** surface where the system is permitted to pay off the user's commitment with motion. ~250–400ms total.

| Mechanic | Timing |
|---|---|
| Aurora deepens ~15% chroma at all three stops, then settles back | Page-level, 1200ms |
| Wax seal scales in 0.85 → 1.0 with a 100ms drop-shadow lag | seal-drop, 420ms |
| Guilloche border draws on left-to-right | 250ms |
| Ledger number counts up to its final value (ease-out) | 600ms |

```tsx
// On the page wrapper:
<div className="page receipt-aurora-bloom">…</div>
```

`.receipt-aurora-bloom::after` is the celebration overlay; `.seal-drop` carries the seal-arrival keyframe. Both clamp to no-animation under `prefers-reduced-motion`. See [`../tokens/globals.example.css`](../tokens/globals.example.css) for the full keyframes.

> **Critical:** the receipt itself is **visible at rest** (opacity 1, no transform). Don't tie the receipt's visibility to a keyframe — under paused-timeline conditions (screenshot capture, reduced motion) it'd be stranded invisible. The *theatre* lives on the seal-drop + aurora-bloom + ledger count-up, which can all start from a visible-enough state.

## Variants (aspirational)

Per spec, four Receipt variants share the frame:

- **letter-sent** (shipping) — *"Your letter has been delivered."*
- **petition-signed** — *"You've signed."* + signer-no. ledger
- **bill-tracked** — *"You're tracking this bill."* + tracker-no. ledger
- **vote-recorded** — *"Your vote is recorded."* + voter-no. ledger

Frame, guilloche, ceremonial caption, ledger entry, wax seal — all reused. Only the title + attribution + action verbs change.

## Don't on this surface

- ❌ Bounce, overshoot, spring physics on the seal arrival — *the receipt is issued, not delivered by a confetti cannon.*
- ❌ Sound effects.
- ❌ Magenta, synthwave, off-palette gradients — the existing palette already does the work.
- ❌ Guilloche borders anywhere except top and bottom of a Receipt artifact.
- ❌ Reuse of the celebration mechanics on any non-Receipt surface — celebration is what makes Receipts feel earned; if it leaks, it dilutes.
- ❌ Photographic banknote engraving for the guilloche — procedural SVG sine waves only ([`civic.md`](./civic.md#guilloche)).
- ❌ "Achievement unlocked" copy — the Receipt earns its weight by *being issued*, not by congratulating.
