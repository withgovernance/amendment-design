# Writing Desk composition

**Status: aspirational.** Specified but only partially built. Many components below don't yet exist; flag clearly when adding.

The user *produces* something — a letter, a call script, a letter to the editor. *Authoring correspondence that will be delivered.* The surface should feel like sitting down with good paper and a pen.

> **Surface defaults:** `material-regular` for UI chrome around the canvas; the composition canvas itself is `paper-parchment` (opaque, warmer than Archive's reading paper). Serif throughout. **Minimal motion.** Oxblood is ceremonial — appears only on Send/Seal/Publish.

## Anatomy

```
┌────────────────────────────────────────────────────────┐
│ Navbar                                                  │
├────────────────────────────────────────────────────────┤
│ Breadcrumb: Take Action › Write your rep                │
│                                                         │
│ [Destination][Topic][Compose][Preview][Send]            │  ← FolderTabSteps (civic.md)
│ ┌─ Letter (paper-parchment) ─────────────────────────┐ │
│ │  Rep. Carla Bensky                                  │ │  ← AddressBlock
│ │  Colorado House of Representatives                  │ │
│ │  200 East Colfax Avenue                             │ │
│ │  Denver, CO 80203                                   │ │
│ │                                                     │ │
│ │  Dear Representative Bensky,                        │ │  ← Salutation (italic serif)
│ │                                                     │ │
│ │  [letter body — Merriweather 400, 65ch column]      │ │  ← LetterBody
│ │                                                     │ │
│ │  Sincerely,                                         │ │
│ │  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─                            │ │  ← SignatureLine (civic.md)
│ │     YOUR NAME · CITY, STATE                         │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ ⌨ Saved a moment ago         [ Back ] [ Seal & send ]  │  ← composer footer
└────────────────────────────────────────────────────────┘
```

## LetterCanvas

The hero of the surface. `paper-parchment` opaque canvas, 64-72px padding, faint horizontal ruling, ≤2% procedural paper grain.

```tsx
<article className="
  relative rounded-sm overflow-hidden
  bg-[oklch(0.955_0.018_80)] dark:bg-[oklch(0.22_0.012_65)]
  ring-1 ring-inset ring-black/10 dark:ring-white/10
  shadow-raised
  p-16
  font-serif text-base leading-[1.65] text-black/87 dark:text-white/87
">
  <PaperGrainOverlay />

  <AddressBlock recipient={recipient} />
  <Salutation>Dear Representative {recipient.lastName},</Salutation>
  <LetterBody value={body} onChange={setBody} />

  <div className="mt-4 font-serif">Sincerely,</div>
  <SignatureLine name={user.printedName} />
</article>
```

`<PaperGrainOverlay>` and `<SignatureLine>` live in [`civic.md`](./civic.md). The paper-grain SVG noise is ≤ 2% opacity, fine scale, monochromatic. *Not* on bill pages.

## AddressBlock

Formatted as letterhead. Serif. Recipient name bold, address italic.

```tsx
<div className="mb-5 font-serif text-[14px]">
  <div className="font-bold text-base text-black/87">{recipient.title} {recipient.fullName}</div>
  <div className="italic text-black/55">{recipient.chamber}</div>
  <div className="italic text-black/55">{recipient.street}</div>
  <div className="italic text-black/55">{recipient.city}, {recipient.state} {recipient.zip}</div>
</div>
```

## Salutation

Italic Merriweather, 17px, mb-3.5. Always opens with "Dear" — never "Hi" / "Hey" / "To whom it may concern."

```tsx
<div className="font-serif italic text-[17px] text-black/87 mb-3.5">
  {children}
</div>
```

## LetterBody

Textarea on the canvas. **Transparent background** — no `material-*`, no field-recess. The paper *is* the field.

```tsx
<textarea
  value={body}
  onChange={(e) => setBody(e.target.value)}
  rows={11}
  className="
    block w-full bg-transparent border-0 outline-none resize-y
    font-serif text-base leading-[1.65] text-black/87 dark:text-white/87
    placeholder:text-black/38
  "
/>
```

## Seal & send button

The *one* place Oxblood lands ceremonially on Writing Desk. CTA variant, leading Phosphor `SealIcon` at `weight="bold"`.

```tsx
<Button variant="cta" leadingIcon="seal" onClick={sendLetter}>
  Seal &amp; send
</Button>
```

On click: triggers the wax-seal stamp animation overlay (fades in, no bounce, no rotate), then navigates to the Receipt surface.

## FolderTabSteps (composition flow)

See [`civic.md`](./civic.md#foldertabsteps).

```tsx
<FolderTabSteps
  steps={["Destination", "Topic", "Compose", "Preview", "Send"]}
  current={2}
/>
```

> Don't use folder-tabs for two-step forms — folder-tabs imply a multi-step filing process. Two-step shows both panels stacked. See [`../patterns/forms.md`](../patterns/forms.md#multi-step-forms).

## Save-state indicator

Italic-serif metadata. `text-black/55`. Phosphor `FloppyDiskIcon` leading at 14px.

```tsx
<div className="flex items-center gap-2 text-black/38">
  <FloppyDiskIcon size={14} />
  <span className="font-serif italic text-[13px]">Saved a moment ago</span>
</div>
```

## Aspirational (not yet built)

These are spec'd but don't ship as components yet — flag when adding:

- **EnvelopePreview** (post-send state, 3:4 with fold shadow + postage corner — see [`civic.md`](./civic.md#envelopepreview))
- **WaxSealStampAnimation** (Send-button click overlay; fades in over the letter, no bounce)
- **CallScriptCanvas** (variation of LetterCanvas for phone-call scripts; different rhythm)
- **LetterToTheEditorCanvas** (longer-form variation)

## Don't on this surface

- ❌ Glass material on the composition canvas — the canvas is paper.
- ❌ Sans-serif body in the letter body (correspondence is serif).
- ❌ Bounce / overshoot on the seal animation.
- ❌ Folder-tabs for ≤ 2 steps (use stacked panels).
- ❌ ALL CAPS in the salutation. *"Dear Senators & Representatives,"* — title case, italic serif.
- ❌ Oxblood anywhere except Send button and post-send stamp.
