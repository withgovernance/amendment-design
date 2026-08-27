# Reading Room composition

Conversations, AI dialogue. The one surface where motion is generous (token streaming, typing indicators) because dialogue is *genuinely alive* rather than authored. **No tactile accents** — a conversation is not a document.

> **Surface defaults:** `material-thin` cards, aurora canvas (no paper), max-width 48rem, generous vertical rhythm. Reading Room artifacts use *italic-serif* for AI prose, *sans* for chrome and turn-taking mechanics.

## Anatomy

```
┌─────────────────────────────────────────────────────────┐
│ Navbar (material-chrome, sticky)                        │  ← chrome.md
├─────────────────────────────────────────────────────────┤
│  Breadcrumb: Conversations › Today                       │  ← chrome.md
│                                                          │
│  ┌─ user message ──────────────────────┐                 │
│  │ slate-tinted plate, sans, 87% ink   │   YD            │  ← MessageBubble (user)
│  └─────────────────────────────────────┘                 │
│                                                          │
│   A  ┌─ AI message ────────────────────────────────┐    │
│      │ material-thin, italic-serif body,            │    │  ← MessageBubble (ai)
│      │ inline [1] [2] oxblood superscript citations │    │
│      └──────────────────────────────────────────────┘    │
│      ┌─ Citation card ─┐  ┌─ Citation card ─┐            │  ← CitationCard
│      │ HB 21 · Colorado│  │ § 38-12-301     │            │
│      └─────────────────┘  └─────────────────┘            │
│                                                          │
│   [ Suggested follow-up 1 ] [ Suggested follow-up 2 ]   │  ← SuggestedFollowups
│                                                          │
│ ┌─ Composer (material-regular, raised) ───────────┐    │  ← Composer (sticky bottom)
│ │ [textarea]                                  [→] │    │
│ └──────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

## MessageBubble — user

Slate-tinted plate so the user's *trail* is visible. Sans-serif body — turn-taking mechanics are conversational, not authored.

```tsx
<div className="flex flex-row-reverse gap-3 mb-6">
  <Avatar initials="YD" />
  <div>
    <div className="
      max-w-[80%] px-4 py-3.5 rounded-md
      bg-primary/[0.08] ring-1 ring-inset ring-primary/[0.12]
      dark:bg-primary/[0.18] dark:ring-primary/30
      font-sans text-[15px] leading-[1.55] text-black/87 dark:text-white/87
    ">
      {message.text}
    </div>
    <div className="font-serif italic text-xs text-black/55 text-right mt-1">you · now</div>
  </div>
</div>
```

## MessageBubble — AI

`material-thin` plate, italic-serif body (the model is *writing*, not chatting). Inline citations are Oxblood superscripts.

```tsx
<div className="flex gap-3 mb-6">
  <span className="
    inline-flex items-center justify-center w-9 h-9 rounded-full shrink-0
    bg-primary dark:bg-primary text-[#fefce8]
    font-bold text-xs
  ">A</span>
  <div className="max-w-[80%]">
    <div className="
      px-4 py-3.5 rounded-md
      bg-white/45 backdrop-blur-material ring-1 ring-inset ring-black/5
      dark:bg-black/26 dark:ring-white/8
      font-serif font-light text-base leading-[1.65] text-black/87 dark:text-white/87
    ">
      <Markdown components={proseRules}>{message.text}</Markdown>
    </div>
    <CitationList citations={message.citations} />
    <div className="font-serif italic text-xs text-black/55 mt-1">
      Amendment · grounded in primary sources
    </div>
  </div>
</div>
```

Markdown rules (per-element treatment, citations, forbidden elements): [`../patterns/prose.md`](../patterns/prose.md).

## Inline citation

Render `[1]` inside AI prose as an Oxblood superscript that opens the source card.

```tsx
<sup
  onClick={() => openSource(n)}
  className="
    text-action font-sans font-semibold text-[11px]
    align-super leading-none cursor-pointer px-px
  "
>{n}</sup>
```

## CitationCard

Below the AI message, not inline. `material-thin` plate, type icon + serif title + italic-serif disambiguator.

```tsx
<button onClick={() => navigate(citation.href)} className="
  flex items-start gap-2 p-3 rounded-md
  bg-white/45 backdrop-blur-material
  ring-1 ring-inset ring-black/[0.08]
  dark:bg-black/26 dark:ring-white/8
  hover:bg-white/70 dark:hover:bg-black/41
  transition-[background] duration-200
  text-left
">
  <span className="text-[11px] uppercase tracking-chrome font-semibold text-action hexp-chrome mt-px">
    [{n}]
  </span>
  <span className="flex-1 min-w-0">
    <span className="block font-serif font-bold text-[13px]">{citation.title}</span>
    <span className="block font-serif italic text-[11px] text-black/55">{citation.where}</span>
  </span>
</button>
```

## SuggestedFollowups

`button-secondary` (`material-regular` plate), `size="sm"`, wrapped flex row with `whitespace-normal text-left` so each button sizes to its content. **Distinct from home-page sample-question chips** (which stay `button-ghost` `material-ultrathin` `rounded-lg`).

```tsx
<div className="flex flex-wrap gap-2 mt-2 mb-6">
  {followups.map(f => (
    <button key={f} className="
      btn-secondary text-sm whitespace-normal text-left
      hover:bg-white/95 hover:shadow-floating
      dark:hover:bg-black/55
    ">{f}</button>
  ))}
</div>
```

## Composer

Sticky bottom, `material-regular` plate, raised shadow. Send button is CTA Oxblood (action moment), with leading `PaperPlaneTiltIcon` at `weight="bold"` size 16.

```tsx
<div className="sticky bottom-0 bg-white/75 backdrop-blur-material-chrome pt-3 pb-5">
  <div className="
    flex gap-2.5 items-end p-3 rounded-md
    bg-white/85 backdrop-blur-material
    ring-1 ring-inset ring-black/10 shadow-raised
    dark:bg-black/40 dark:ring-white/10
  ">
    <textarea
      placeholder="Ask a follow-up…"
      rows={1}
      className="
        flex-1 bg-transparent resize-none
        font-sans text-[15px] leading-6 text-black/87
        focus:outline-none placeholder:text-black/38
      "
      onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
    />
    <button className="btn btn-cta" onClick={send} disabled={!text.trim()}>
      <PaperPlaneTiltIcon size={16} weight="bold" /> Send
    </button>
  </div>
</div>
```

## TypingDots (during streaming first 300ms)

See [`../patterns/feedback.md`](../patterns/feedback.md#streaming-reveal).

## Don't on this surface

- ❌ Paper canvas (`paper-cream`, `paper-parchment`). Reading Room stays on aurora.
- ❌ Tactile accents (stamps, postmarks, watermarks). A conversation isn't an artifact.
- ❌ Bounce / overshoot / spring physics on the streaming reveal.
- ❌ Long-form headings (`# H1`) authored by the model — suppress per [`../patterns/prose.md`](../patterns/prose.md).
