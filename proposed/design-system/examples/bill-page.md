# Bill page

Archive surface — the most layered composition in the system. Combines a flat header on aurora, paper-cream bill text with line numbers and rubber-stamp status, plus a glass sidebar with sponsors and votes.

```tsx
import { Breadcrumb } from "@/components/chrome";
import { Button, Card, OfficialBubble, PartyChip } from "@/components/ui";
import {
  Postmark,
  RubberStamp,
  ProgressRibbon,
  JurisdictionWatermark,
  RuledPage,
  LineNumbers,
} from "@/components/civic";

export default function BillDetailPage({ bill }) {
  const STAGES = ["Prefiled", "Introduced", "Committee", "Engrossed", "Enrolled", "Enacted"];

  return (
    <main className="max-w-[60rem] mx-auto px-6 pt-8 pb-24 relative z-[1]">
      <Breadcrumb
        items={[
          { label: "Oversight", href: "/" },
          { label: bill.jurisdiction },
          { label: "Bills", href: `/oversight/${bill.jurisdiction}/bills` },
          { label: bill.number }
        ]}
      />

      {/* ───── Bill header — FLAT (no plate). Browser frames the page. ───── */}
      <div className="grid grid-cols-[1fr_auto] gap-8 items-start mt-6">
        <div>
          {/* bill-number is mono only because it's a machine code shown as a reference label */}
          <div className="font-mono text-[13px] text-black/55 font-medium tracking-[0.04em]">
            {bill.number} · {bill.session}
          </div>
          <h1 className="
            font-serif font-extrabold
            text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.18] tracking-[-0.01em]
            text-black/87 mt-2 mb-4 text-balance
          ">
            {bill.title}
          </h1>
          {/* italic-serif temporal caption — forward signal preferred */}
          <div className="font-serif italic text-sm text-black/55">
            Introduced {bill.daysAgo} days ago.
            {bill.nextEvent && (
              <span title={bill.nextEvent.date}> Next: {bill.nextEvent.label}.</span>
            )}
          </div>
          {/* Progress ribbon — 8px segmented, HEXP-60 milestone labels */}
          <div className="mt-5 max-w-md">
            <ProgressRibbon
              steps={STAGES}
              currentIndex={bill.stageIndex}
              status={bill.status}
            />
          </div>
          <div className="mt-4 flex gap-2.5">
            <Button variant="default" leadingIcon="bookmark-simple">Track</Button>
            <Button variant="secondary" leadingIcon="envelope">Write your rep</Button>
            <Button variant="ghost" leadingIcon="share-network">Share</Button>
          </div>
        </div>
        {/* Postmark sits adjacent — NEVER on aurora chrome below */}
        <Postmark
          jurisdiction={bill.jurisdictionUpper}
          date={bill.introducedShort}
          year={bill.year}
          rotation={-6}
        />
      </div>

      {/* ───── Two-column: bill text on paper-cream + glass sidebar ───── */}
      <div className="grid grid-cols-[minmax(0,1fr)_280px] gap-6 mt-9">
        {/* Bill text — paper-cream canvas with watermark, stamp, line numbers */}
        <article className="
          relative rounded-sm overflow-hidden
          bg-[oklch(0.965_0.012_85)] dark:bg-[oklch(0.20_0.010_70)]
          ring-1 ring-inset ring-black/8 dark:ring-white/10
          shadow-raised p-12
        ">
          <JurisdictionWatermark />

          <div className="flex justify-between items-start mb-4 relative">
            <div>
              <div className="
                text-xs font-semibold uppercase tracking-chrome hexp-chrome
                text-black/55 dark:text-white/55
              ">Statutory text</div>
              <div className="font-serif italic text-[13px] text-black/55 mt-1">
                As introduced
              </div>
            </div>
            <RubberStamp label="In Committee" status="procedural" />
          </div>

          <LineNumberedRuledPage>{bill.text}</LineNumberedRuledPage>
        </article>

        {/* Sidebar — glass material-regular */}
        <aside className="flex flex-col gap-5">
          <Card>
            <div className="
              text-xs font-semibold uppercase tracking-chrome hexp-chrome
              text-black/55 dark:text-white/55
            ">Sponsors</div>
            <ul className="mt-2.5">
              {bill.sponsors.map(s => (
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

          <Card>
            <div className="
              text-xs font-semibold uppercase tracking-chrome hexp-chrome
              text-black/55 dark:text-white/55
            ">Vote history</div>
            <ul className="mt-3 grid gap-2.5">
              {bill.votes.map(v => (
                <li key={v.id} className="grid grid-cols-[1fr_auto] gap-2">
                  <div>
                    <div className="font-serif font-bold text-sm">{v.committee}</div>
                    <div className="font-serif italic text-xs text-black/55">
                      {v.kind} · {v.date}
                    </div>
                  </div>
                  <div className="font-mono text-xs text-black/55 text-right tabular-nums">
                    {v.yea ?? "—"}–{v.nay ?? "—"}
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card variant="thin">
            <div className="
              text-xs font-semibold uppercase tracking-chrome hexp-chrome
              text-black/55 mb-2.5
            ">Position</div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" leadingIcon="thumbs-up" className="flex-1 justify-center">For</Button>
              <Button variant="secondary" size="sm" leadingIcon="thumbs-down" className="flex-1 justify-center">Against</Button>
            </div>
          </Card>
        </aside>
      </div>
    </main>
  );
}
```

## What this composition demonstrates

- **The two-layer system at full strength.** Glass sidebar floats on aurora; opaque paper holds the verbatim text. Both register correctly because the room rules are obeyed.
- **HEXP-60 chrome on every label** (Statutory text, Sponsors, Vote history, Position).
- **Italic-serif metadata** for *all* provenance: temporal captions, sponsor districts, vote kind/date.
- **Stamp/postmark/watermark live on paper** (the postmark in the header is the one exception — it sits adjacent to the header, not on aurora chrome).
- **Mono only for machine identifiers** (`§ 38-12-301` inline, line numbers, vote tallies).
- **No "Status on date" caption** below the ribbon — the stamp + active segment encode status; the temporal caption surfaces *next event* instead.

## Don't

- ❌ Plate the header on a card. Browser frames the page; the header is metadata, not an artifact.
- ❌ Put the watermark on aurora chrome. Paper-cream only.
- ❌ Use mono for the bill title (host is serif heading; bill numbers in serif headings stay serif).
- ❌ Animate the progress ribbon transitions. The system is still on Archive.
- ❌ Caption the ribbon `{status} on {date}` (redundant). Date goes as italic-serif metadata adjacent to the ribbon, or in the temporal caption above.
- ❌ Sidebar cards on `material-thick` (too dense for the sidebar register — `material-regular` is correct).
