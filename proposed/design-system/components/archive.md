# Archive composition

Bill pages, statutes, jurisdiction landings. *The stacks.* A document with authority, meant to be read carefully. This is where skeuomorphism earns its keep — rubber stamps, postmarks, ruled lines, line numbers, jurisdiction watermarks.

> **Surface defaults:** `material-regular` for primary cards, `paper-cream` for verbatim bill text *only*. Serif throughout. IBM Plex Mono for machine identifiers (bill numbers in body, line numbers, statutory citations). **Static motion.**

## Bill detail anatomy

```
┌────────────────────────────────────────────────────────┐
│ Navbar                                                  │
├────────────────────────────────────────────────────────┤
│ Breadcrumb: Oversight › Colorado › Bills › HB 21       │
│                                                         │
│  HB 21 · Colorado General Assembly · 2026 Regular      │  ← bill-number (HEXP-60 chrome, NOT mono)
│  ╔══════════════════════════════════════════╗          │
│  ║ Concerning local authority to enact rent ║   [📅]   │  ← BillHeader (FLAT — no plate)
│  ║ stabilization in home-rule municipalities║           │     postmark sits adjacent
│  ╚══════════════════════════════════════════╝           │
│  Introduced 12 days ago. Next: hearing on May 28.      │  ← italic-serif metadata
│                                                         │
│  ▓▓▓▓ ▓▓▓▓ ▓▓░░ ░░░░ ░░░░ ░░░░                         │  ← ProgressRibbon (civic.md)
│  PREFILED INTRODUCED COMMITTEE ENGROSSED ENROLLED ENACT │
│                                                         │
│  [ Track ] [ Write your rep ] [ Share ]                │
│                                                         │
│  ┌────────────────────────────┐ ┌──────────────────┐  │
│  │ Bill text (paper-cream)     │ │ Sponsors         │  │
│  │ ┌─ Jurisdiction watermark ─┐│ │ — — —            │  │  ← Sidebar (material-regular)
│  │ │ (5-8% opacity behind)    ││ │ Vote history     │  │
│  │ └──────────────────────────┘│ │ — — —            │  │
│  │ [Stamp: In Committee]       │ │ Position         │  │
│  │                             │ └──────────────────┘  │
│  │ 1 § Section 1. In CRS,      │                       │
│  │ 2 § 38-12-301 …             │                       │
│  └────────────────────────────┘                        │
└────────────────────────────────────────────────────────┘
```

## BillHeader — flat, no plate

The browser viewport frames the page; the header is *metadata about* the bill, not an artifact, so it doesn't get its own card chrome. Document accents (stamp, watermark) belong on the bill text paper below, not here.

```tsx
<div className="grid grid-cols-[1fr_auto] gap-8 items-start mt-6">
  <div>
    <div className="font-mono text-[13px] text-black/55 font-medium tracking-[0.04em]">
      HB 21 · Colorado General Assembly · 2026 Regular Session
    </div>
    <h1 className="font-serif font-extrabold text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.18] tracking-[-0.01em] text-black/87 mt-2 mb-4 text-balance">
      Concerning local authority to enact rent stabilization in home-rule municipalities.
    </h1>
    <div className="font-serif italic text-sm text-black/55">
      Introduced 12 days ago. <span title="April 16, 2026">Next: hearing on May 28.</span>
    </div>
    <div className="mt-5 max-w-md">
      <ProgressRibbon steps={STAGES} currentIndex={2} status="active" />
    </div>
    <div className="mt-4 flex gap-2.5">
      <Button variant="default" leadingIcon="bookmark-simple">Track</Button>
      <Button variant="secondary" leadingIcon="envelope">Write your rep</Button>
      <Button variant="ghost" leadingIcon="share-network">Share</Button>
    </div>
  </div>
  <Postmark jurisdiction="COLORADO · STATE" date="APR 16" year="2026" rotation={-6} />
</div>
```

> **Temporal caption rule:** Don't repeat `{status} on {date}` (the stamp + active ribbon segment + label encode status already). Surface either *forward signal* (`Next: hearing on May 28`) or *humanized recency* (`Introduced 12 days ago`) with the exact date in `title`.

## Bill text on paper-cream

The *only* place `paper-cream` appears on Archive. Verbatim statutory text — what the user came to read when they want the bill's literal language.

```tsx
<article className="
  relative rounded-sm overflow-hidden
  bg-[oklch(0.965_0.012_85)] dark:bg-[oklch(0.20_0.010_70)]
  ring-1 ring-inset ring-black/8 dark:ring-white/10
  shadow-raised p-12
">
  <JurisdictionWatermark />

  <div className="flex justify-between items-start mb-4 relative">
    <div>
      <div className="section-eyebrow">Statutory text</div>
      <div className="font-serif italic text-[13px] text-black/55 mt-1">As introduced</div>
    </div>
    <RubberStamp label="In Committee" status="procedural" />
  </div>

  <div className="grid grid-cols-[2rem_1fr] gap-4 relative">
    <div className="font-mono text-[11px] text-black/38 leading-[1.625] text-right">
      <div>1</div><div>2</div><div>3</div>{/* … */}
    </div>
    <div className="ruled font-serif font-light text-base leading-[1.625] text-black/87">
      <p>
        <span className="font-serif font-bold" style={{fontVariant:'small-caps'}}>Section 1.</span> In
        Colorado Revised Statutes, <code className="font-mono text-[0.92em] font-medium">§ 38-12-301</code>,
        the introductory portion is amended to read:
      </p>
      {/* … */}
      <p>
        (1) The general assembly hereby finds and declares that
        <ins className="underline decoration-success">
          each statutory and home-rule municipality may, by ordinance,
        </ins>
        enact rent stabilization measures
        <del className="decoration-danger">subject only to the limitations of this section</del>.
      </p>
    </div>
  </div>
</article>
```

The `<JurisdictionWatermark>`, `<RubberStamp>`, `.ruled` pattern, and line-number gutter all live in [`civic.md`](./civic.md).

## Summary view ≠ paper

The Summary & Analysis card (AI-authored content *about* the bill) sits on `material-regular` glass, **not** paper-cream. Putting paper under model prose falsely claims "this is the document" when the user is reading analysis.

```tsx
<section className="card mt-6">
  <div className="section-eyebrow">Summary & Analysis</div>
  <div className="font-serif font-light text-base leading-[1.65] text-black/87 mt-2">
    <Markdown components={proseRules}>{aiSummary}</Markdown>
  </div>
</section>
```

## SponsorList

Lapel-pin avatars (vector, civic), serif name + italic-serif metadata, party chip on the right. **Reuse `PartyChip` and `OfficialBubble`** — don't recreate.

```tsx
<Card>
  <div className="section-eyebrow">Sponsors</div>
  <ul className="mt-2.5">
    {sponsors.map(s => (
      <li key={s.id} className="
        flex gap-3 items-center py-2.5
        border-b border-black/8 last:border-0
      ">
        <OfficialBubble official={s} size={40} />
        <div className="flex-1 min-w-0">
          <div className="font-serif font-bold text-sm">
            {s.title} {s.name}
            <PartyChip party={s.party} className="ml-2" />
          </div>
          <div className="font-serif italic text-xs text-black/55">
            {s.district} · {s.role}
          </div>
        </div>
      </li>
    ))}
  </ul>
</Card>
```

## VoteHistoryCard

Mono tabular-nums for vote tallies. Italic-serif metadata for committee names.

```tsx
<Card>
  <div className="section-eyebrow">Vote history</div>
  <ul className="mt-3 grid gap-2.5">
    {votes.map(v => (
      <li key={v.id} className="grid grid-cols-[1fr_auto] gap-2 items-start">
        <div>
          <div className="font-serif font-bold text-sm">{v.committee}</div>
          <div className="font-serif italic text-xs text-black/55">
            {v.kind} · {v.date}
          </div>
        </div>
        <div className="font-mono text-xs text-black/55 text-right tabular-nums">
          {v.yea}–{v.nay}
        </div>
      </li>
    ))}
  </ul>
</Card>
```

## Bill list rows

See [`../patterns/tables.md`](../patterns/tables.md#bill-list-row-pattern).

## Don't on this surface

- ❌ Paper canvas under Summary view (AI prose isn't the document).
- ❌ Floating stamps / postmarks on aurora chrome — they belong on the paper-cream canvas.
- ❌ Captioning the ribbon with `{status} on {date}` (redundant with stamp + segment).
- ❌ Mono for bill numbers in serif headings (host context wins — bill numbers in a heading stay serif).
- ❌ Decorative timelines below the ribbon — the ribbon *is* the timeline.
