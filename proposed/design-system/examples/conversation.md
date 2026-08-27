# Conversation

Reading Room surface with a streamed AI reply, inline citations, and suggested follow-ups.

```tsx
import { Avatar } from "@/components/ui";
import { Breadcrumb } from "@/components/chrome";
import { MessageBubble, CitationCard, SuggestedFollowups, Composer } from "@/components/reading-room";

export default function ConversationPage({ initialQuestion }) {
  const [messages, setMessages] = useState(() => [{ role: "user", text: initialQuestion }]);
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef(null);

  // Stream first reply on mount
  useEffect(() => {
    streamReply(initialQuestion);
  }, []);

  function streamReply(text) {
    setStreaming(true);
    // … token-by-token append into the latest AI message …
    // Auto-scroll to bottom as tokens arrive (smooth, but only when user is already near bottom)
  }

  return (
    <main className="max-w-tight mx-auto px-6 pt-6 pb-24 relative z-[1]">
      <Breadcrumb
        items={[
          { label: "Conversations", href: "/" },
          { label: "Today" }
        ]}
      />

      <div ref={scrollRef} className="mt-6 min-h-[60vh]">
        {messages.map((m, i) => (
          <MessageBubble
            key={i}
            message={m}
            streaming={streaming && i === messages.length - 1}
          />
        ))}
      </div>

      {/* Suggested follow-ups — material-regular plate, text-sm, wrapped flex row */}
      {!streaming && messages.length >= 2 && (
        <SuggestedFollowups
          followups={[
            "What's the bill's full text?",
            "Who's sponsoring it?",
            "Has it had a hearing yet?",
          ]}
          onSelect={(f) => askFollowup(f)}
        />
      )}

      <Composer
        onSend={(text) => askFollowup(text)}
        placeholder="Ask a follow-up…"
      />
    </main>
  );
}
```

## What this composition demonstrates

- **Single centered column** at `max-w-tight` (48rem). The conversation is a vertical transcript, not a multi-pane workspace.
- **Material-thin AI message** vs **slate-tinted user message** — the user's *trail* is Midnight Indigo; the AI is neutral on glass.
- **Italic-serif AI prose** — the model is writing something to be read (per [`../patterns/prose.md`](../patterns/prose.md)).
- **Inline citations [1] [2]** — Oxblood superscripts in the prose; full citation cards below the message.
- **Suggested follow-ups are `button-secondary`, not chips** — the dialogue continuing, not the home-page question-starter pattern.
- **Sticky composer** at the bottom with the page using flex layout so it pins to viewport bottom on long pages.

## Streaming reveal

The typing indicator (three dots) appears for ~300ms before tokens start arriving, then sits at the end of the latest token until streaming finishes. See [`../patterns/feedback.md`](../patterns/feedback.md#streaming-reveal).

The streamed message must keep the same DOM container across renders — don't re-mount the message bubble per token, or you'll lose scroll position.

## Citation handling

The model writes `[1]` and `[2]` inline. The renderer converts to clickable Oxblood superscripts. Citation cards render *below* the message body (not inline) — they're follow-up material, not part of the prose.

If the cited source is a bill, the click navigates to `/oversight/[jurisdiction]/bill/[number]`. If it's a statute, it opens a popover with the relevant subsection.

## Don't

- ❌ Render AI prose in sans-serif. The voice is *authored*, not *transactional*.
- ❌ Plate the user message on `material-regular` (it'd over-emphasize the user turn). Slate-tint is enough.
- ❌ Use the celebration motion (aurora bloom, seal drop) anywhere in this surface. Receipt-only.
- ❌ Show a "thinking…" skeleton instead of typing dots. Skeletons are for content that's *about* to arrive in a known shape; dots are for in-progress streaming where the shape is being authored.
- ❌ Add emoji to system copy (citation labels, follow-up prompts, etc.). Emoji is content-level only (user-assigned to threads).
