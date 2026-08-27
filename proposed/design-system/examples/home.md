# Home

The product entry. A Reading Room artifact embedded on a marketing-hero surface — the conversation starter inherits Reading Room's rhythm but sits in a centered hero layout.

```tsx
import { Wordmark, WaxSeal } from "@/components/civic";
import { Avatar, IconButton, Card, Button, Chip } from "@/components/ui";
import { Navbar } from "@/components/chrome";
import { ChatsCircleIcon, ScalesIcon, EnvelopeIcon, ReceiptIcon, PaperclipIcon, MapPinIcon, ArrowRightIcon } from "@phosphor-icons/react/ssr";

export default function HomePage() {
  const [question, setQuestion] = useState("");
  const samples = [
    "What's happening with HB 21 in Colorado?",
    "Who voted against the broadband bill?",
    "Which committees handle housing in California?",
    "Find me a bill about EV tax credits this session.",
  ];

  return (
    <>
      <Navbar />

      <main className="max-w-wide mx-auto px-6 pt-12 pb-24 relative z-[1]">
        <div className="max-w-[740px] mx-auto text-center">
          {/* HEXP-60 eyebrow */}
          <div className="
            text-xs font-semibold uppercase tracking-chrome hexp-chrome
            text-black/55 mb-4
          ">
            A more perfect union, rendered
          </div>

          {/* Display-hero — Merriweather 800, balanced */}
          <h1 className="
            font-serif font-extrabold
            text-[clamp(2rem,4.5vw,3.75rem)]
            leading-[1.1] tracking-[-0.01em] text-balance
            mb-3.5
          ">
            Ask Amendment anything about the law that's being written.
          </h1>

          {/* body-lead — extralight sans, secondary ink */}
          <p className="
            font-sans font-extralight text-lg leading-[1.5]
            text-black/55 max-w-xl mx-auto mb-8
          ">
            Track legislation, ask grounded questions, and write to your representatives — all rooted in the primary sources.
          </p>

          {/* ConversationStarter — Reading Room artifact on a marketing-hero card */}
          <Card className="p-3.5 text-left">
            <textarea
              placeholder="What would you like to know?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) ask(question); }}
              className="
                w-full bg-transparent resize-none px-1 py-1 min-h-16
                font-sans text-base text-black/87
                focus:outline-none placeholder:text-black/38
              "
            />
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center gap-1.5">
                <IconButton><PaperclipIcon size={20} /></IconButton>
                <IconButton><MapPinIcon size={20} /></IconButton>
                {/* italic-serif metadata — provenance/role */}
                <span className="font-serif italic text-xs text-black/38">
                  Representing you in
                  <strong className="not-italic font-bold text-black/55"> Boulder, Colorado</strong>
                </span>
              </div>
              <Button variant="cta" disabled={!question.trim()} onClick={() => ask(question)}>
                Ask <ArrowRightIcon size={16} weight="bold" />
              </Button>
            </div>
          </Card>

          {/* Sample-question chips — material-ultrathin, rounded-lg, secondary ink */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {samples.map((s, i) => (
              <Chip key={i} onClick={() => ask(s)}>{s}</Chip>
            ))}
          </div>
        </div>

        {/* Coverage marquee — HEXP-80 stat numerals */}
        <div className="
          grid grid-cols-2 md:grid-cols-4 gap-4 mt-24 pt-8
          border-t border-black/8
        ">
          {[
            ["52", "Legislatures"],
            ["464,269", "Bills tracked"],
            ["12,308", "Legislators followed"],
            ["1986", "Earliest session indexed"],
          ].map(([num, label]) => (
            <div key={label} className="text-center">
              <div className="
                font-sans font-bold text-[clamp(2rem,4vw,2.75rem)] leading-none
                tracking-[-0.01em] text-black/87
                [font-variation-settings:'HEXP'_80]
              ">{num}</div>
              <div className="
                text-[11px] font-semibold uppercase tracking-chrome hexp-chrome
                text-black/55 mt-1
              ">{label}</div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
```

## What this composition demonstrates

- **HEXP register usage** — 60 on the eyebrow + section labels (uppercase), 80 on the hero stats (display register), body stays HEXP 2 default.
- **Italic-serif metadata** — the "Representing you in Boulder, Colorado" line is the canonical provenance voice.
- **Chip distinction** — sample questions are `button-ghost` (`material-ultrathin`, `rounded-lg`, secondary ink). Distinct from `button-secondary` (which is used for suggested-follow-ups inside conversations).
- **CTA discipline** — Oxblood appears once, on Ask. Everything else is slate ink.
- **Aurora behind everything** — the page wrapper has `relative z-[1]` so content sits above the aurora pseudo on body.

## Don't

- ❌ ALL CAPS the hero title.
- ❌ Use HEXP-60 on the hero title (mixed-case headings stretch and break legibility).
- ❌ Use HEXP-80 on subheadings or section labels — it's reserved for hero stat numerals.
- ❌ Use the secondary button variant for sample questions — they're chips (`button-ghost`).
- ❌ Add a "Watch the demo" gradient button. Oxblood + secondary cover the action space.
