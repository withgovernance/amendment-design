# Forms & validation

Field labels are HEXP-60 chrome, fields are `bg-black/5` recess (see [`../components/primitives.md`](../components/primitives.md#input-text-field-textarea)).

## Validation states

| State | Treatment |
|---|---|
| Default | `ring-1 ring-inset ring-black/10` |
| Focused | `ring-2 ring-inset ring-functional` |
| Error | `ring-2 ring-inset ring-danger`, error message below: `text-xs text-danger mt-1 font-serif italic` |
| Success (rare) | No green ring. A subtle `CheckIcon weight="fill" text-success` at the trailing edge of the field instead. We don't celebrate filling in a valid field; we celebrate Receipts. |

## Multi-step forms

Use the `FolderTabSteps` accent for Writing Desk-style flows. **Don't** use it for two-step forms — folder-tabs imply a multi-step filing process. Two-step or fewer just shows both panels stacked.

## Inline error messages

Italic serif, 12px, `text-danger`, below the field. Never red-background field highlights — the ring carries the read.

```tsx
<p role="alert" className="text-xs text-danger mt-1 font-serif italic">
  We couldn't find a representative at this address. Try a more specific street.
</p>
```

## Submit-button state

- **Disabled until valid** — show button at `opacity-50 cursor-not-allowed`. Never hide it.
- **Submitting** — leading Phosphor `CircleNotchIcon` with `animate-spin`, label "Sending…", button stays action green (CTA variant) but loses hover state.
- **Sent** — toast confirmation + optional Receipt issuance for civic actions.
