# Markdown rules for AI prose

The Reading Room renders AI-authored markdown. The rules are stricter than `react-markdown` defaults because we have a typographic system to honor.

## Family rule

AI prose is **Merriweather 300** body, line-height 1.65. The same register as a long-form analysis or a letter — *the model is writing something to be read*. Sans is reserved for chrome (citations, suggested-follow-ups, message metadata).

## Allowed elements (and treatment)

| Markdown | Render |
|---|---|
| Paragraph | Merriweather 300, 16px, line-height 1.65. Spacing `mb-4`. |
| `**bold**` | `font-weight: 700` Merriweather. |
| `*italic*` | Italic Merriweather 300. |
| Inline ``` `code` ``` | IBM Plex Mono 14px, `bg-black/5 px-1 py-0.5 rounded-sm`. |
| Block ``` ```code``` ``` | IBM Plex Mono 14px in `bg-black/5 p-4 rounded-md` block. Never syntax-highlight unless the language is `tsx`, `json`, `bash`, `sql`. |
| `> blockquote` | Italic Merriweather 300, full ink weight (`text-black/87`), 4px Oxblood/60 left bar, padding-left `pl-4`. **No plate, no fill, no rounded corners.** |
| `# H1` | **Suppress.** AI prose shouldn't author top-level headings. If present, render as `## H2`. |
| `## H2` | Merriweather 700, 20px, mt-6 mb-3. |
| `### H3` | Merriweather 700, 16px, mt-4 mb-2. |
| `- list` | Merriweather 300 with bullet at `text-black/55`. Indent `pl-5`. |
| `1. list` | Numbered, IBM Plex Mono tabular for the number, Merriweather 300 for the item. |
| `[link](url)` | `underline decoration-black/38 underline-offset-4 hover:decoration-black/87`. |
| `![image]` | **Suppress.** AI doesn't author images. If a citation references a chart, link to it. |
| Tables | Render with the table treatment in [`tables.md`](./tables.md); max-width = message bubble. |
| Footnote `[^1]` | Convert to inline Oxblood superscript citation `[1]` (see Citations below). |
| `---` hr | Render as `<hr>` with hairline border. Suppress if it's the only line in a paragraph (the model uses it as a section break visually; we use vertical rhythm). |

## Citations (custom syntax)

Inline numeric citations `[1]` `[2]` render as Oxblood superscripts that open the source card. Citation list appears below the message, not inline. Source cards use `material-thin` plate, 12px padding, Phosphor `LinkSimpleIcon` leading.

## Forbidden in AI prose

- Emoji (`react-markdown` plugin: `disallowedElements`). The model's voice is calm and clerical.
- Inline HTML.
- Strikethrough (no semantic meaning; reserve `<del>` for amendment redlines).
- Subscript / superscript outside the citation pattern.
