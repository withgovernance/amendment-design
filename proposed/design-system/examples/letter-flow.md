# Letter flow — Writing Desk → Receipt

The two-step *act* of correspondence: compose on parchment, then receive an issued artifact.

> **Both surfaces are aspirational.** Many components below are spec'd but not yet built. Flag clearly when adding.

```tsx
// app/(action)/write/[bill]/page.tsx
import { Breadcrumb } from "@/components/chrome";
import { LetterCanvas, SealAndSendButton } from "@/components/writing-desk";
import { FolderTabSteps } from "@/components/civic";

export default function LetterFlow({ bill, recipient }) {
  const [step, setStep] = useState(2);  // 0..4 — Destination/Topic/Compose/Preview/Send
  const [body, setBody] = useState(seedBody(bill, recipient));
  const router = useRouter();

  async function sealAndSend() {
    await api.send({ bill, recipient, body });
    router.push(`/receipt/${id}`);
  }

  return (
    <main className="max-w-[720px] mx-auto px-6 pt-6 pb-24 relative z-[1]">
      <Breadcrumb
        items={[
          { label: "Take Action", href: "/" },
          { label: "Write your rep" }
        ]}
      />

      <FolderTabSteps
        steps={["Destination", "Topic", "Compose", "Preview", "Send"]}
        current={step}
      />

      <LetterCanvas
        recipient={recipient}
        salutation={`Dear Representative ${recipient.lastName},`}
        body={body}
        onBodyChange={setBody}
        signatureName={`${user.printedName} · ${user.city}, ${user.state}`}
      />

      <div className="flex justify-between items-center mt-5">
        <div className="flex items-center gap-2 text-black/38">
          <FloppyDiskIcon size={14} />
          <span className="font-serif italic text-[13px]">Saved a moment ago</span>
        </div>
        <div className="flex gap-2.5">
          <Button variant="secondary" onClick={() => router.back()}>Back to bill</Button>
          <SealAndSendButton onClick={sealAndSend} />
        </div>
      </div>
    </main>
  );
}
```

```tsx
// app/(action)/receipt/[id]/page.tsx
import { Breadcrumb } from "@/components/chrome";
import { ReceiptFrame, CeremonialCaption, LedgerEntry } from "@/components/receipt";
import { Guilloche, WaxSeal } from "@/components/civic";

export default function ReceiptPage({ receipt }) {
  return (
    <main className="max-w-[60rem] mx-auto px-6 pt-6 pb-24 relative z-[1] receipt-aurora-bloom">
      <Breadcrumb
        items={[
          { label: "Take Action", href: "/" },
          { label: "Letter" },
          { label: "Receipt" }
        ]}
      />

      <ReceiptFrame>
        <Guilloche width={800} height={28} />
        <div className="px-16 py-11 text-center">
          <CeremonialCaption>
            {receipt.jurisdiction} · {receipt.session} · {receipt.issuedShort}
          </CeremonialCaption>
          <h1 className="font-serif font-extrabold text-[clamp(2rem,4.5vw,3rem)] leading-[1.1] mt-3 mb-1">
            Your letter has been delivered.
          </h1>
          <div className="font-serif italic text-base text-black/55">
            Issued to {receipt.userName} · on behalf of {receipt.billNumber}
          </div>

          <div className="seal-drop inline-block mt-7">
            <WaxSeal size={104} monogram="A" />
          </div>

          <LedgerEntry
            label="Letter no."
            number={receipt.letterNumber}
            extras={[
              { label: "Recipient", value: receipt.recipient.name },
              { label: "Method", value: "Electronic delivery" },
            ]}
          />

          <div className="mt-7 flex justify-center gap-2.5">
            <Button variant="secondary" leadingIcon="download-simple" onClick={savePDF}>Save PDF</Button>
            <Button variant="secondary" leadingIcon="share-network" onClick={share}>Share</Button>
            <Button variant="default" leadingIcon="house" onClick={() => router.push("/")}>Home</Button>
          </div>
        </div>
        <Guilloche width={800} height={28} style={{ transform: 'scaleY(-1)' }} />
      </ReceiptFrame>

      <p className="
        mt-7 text-center font-serif italic text-sm text-black/55
      ">
        A copy has been saved to your activity. We'll let you know when the bill moves.
      </p>
    </main>
  );
}
```

## What this composition demonstrates

- **Two surfaces, one continuous act.** Writing Desk → Receipt is the canonical civic flow. The Receipt is the proof the user keeps.
- **Folder-tab steps** mark the composition phases (Destination → Topic → Compose → Preview → Send). Rotation 0 — steps are filed, not stamped.
- **Letter canvas is paper-parchment** (warmer than Archive's paper-cream — the letterhead stock register).
- **Oxblood lands ceremonially** on Seal & Send, then again on the wax-seal stamp inside the Receipt. Two appearances, deliberately rare.
- **HEXP 100** appears once per page on the Receipt — the ceremonial place-of-issue caption.
- **Celebration motion** is exclusive to the Receipt arrival: aurora deepens ~15% chroma, wax seal scales in 0.85→1.0 with shadow lag, guilloche draws left-to-right, ledger number counts up. ~400ms total then static.

## Don't

- ❌ Glass material on the letter canvas (paper-parchment required).
- ❌ Confetti or bounce on the seal animation — *the receipt is issued, not delivered by a confetti cannon.*
- ❌ "Achievement unlocked" copy — the certificate language is intentional.
- ❌ Skip the Breadcrumb on either page — the user's path through the act matters.
- ❌ Render the Receipt with `opacity: 0` keyframes — it must be visible at rest so paused-timeline conditions (screenshots, reduced motion) don't strand it invisible. Theatre lives on seal-drop + aurora-bloom + ledger count-up.
