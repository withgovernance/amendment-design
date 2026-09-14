#!/usr/bin/env node
/**
 * node tools/check-retired.mjs — CLAUDE.md → CI item 1, run over THIS repo.
 *
 * lint-rules.mjs scans a consumer. Nothing scanned the design system's own
 * specimens, entry points and stylesheet for the values it has retired — and
 * the entry points are exactly where retired values survived longest
 * (CLAUDE.md → Traps 1: SKILL.md taught Merriweather for 24 days after it went).
 *
 * Scanned: every .html and .css under preview/, the entry points, the
 * stylesheet. NOT scanned: DESIGN.md, CHANGELOG.md, RATIFY.md, history/,
 * HANDOFF-*, AUDIT-*, RECONCILIATION-* — the record, where a retired value is
 * quoted on purpose.
 *
 * A line that quotes a retired value as history, or as the defect, carries a
 * `retired-ok` marker inside a comment. Every run counts and lists the
 * exemptions it honoured, so an exemption is visible rather than implied by a
 * check quietly not firing.
 *
 *   node tools/check-retired.mjs              # this repo; exit 1 on any hit
 *   node tools/check-retired.mjs --root <dir> # another checkout of it
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = (() => {
  const i = process.argv.indexOf("--root");
  const given = i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : null;
  return path.resolve(
    given ?? path.join(path.dirname(fileURLToPath(import.meta.url)), ".."),
  );
})();

const ENTRY_FILES = [
  "SKILL.md",
  "README.md",
  "DESIGN-HARD-RULES.md",
  "CLAUDE.md",
  "colors_and_type.css",
];
const SPECIMEN_DIR = "preview";
const SPECIMEN_EXT = /\.(?:html|css)$/;

// 160/227/295/362/430/497/565/632 — the interpolated ladder, a permanent grep
// set. A rung only as a whole number: not 1600, 160.5, 160px or 160%.
const LADDER = "160|227|295|362|430|497|565|632";
const RUNG = `(?<![\\w.])(?:${LADDER})(?!\\.?\\d|[\\w%])`;

/**
 * Each rule yields { index, term } for every hit in a whole file's text.
 *
 * Whole-text, not line-at-a-time: a declaration runs to its semicolon, and a
 * `font-variation-settings` value is routinely wrapped (preview/_card.css sets
 * its `"wght"` on the line after the property). tools/README.md → never parse
 * by layout.
 */
const RULES = [
  { name: "retired family", pattern: /\b(?:Merriweather|Readex)\b/gi },
  // \b, not a hyphen guard: `--hexp-60` is the axis too.
  { name: "retired axis", pattern: /\bHEXP\b/gi },
  { name: "retired colour", pattern: /\bOxblood\b|#7f1d1d(?![0-9a-f])/gi },
  {
    // DESIGN.md → spacing.measure.rule (2026-09-14): no length is stated in
    // `ch`, in a token or in prose. Needs a digit, so `.ch` the class name and
    // `el.ch` the property are not lengths.
    name: "ch length",
    pattern: /(?<![\w.])\d*\.?\d+ch\b/g,
  },
  // The ladder is bound to a WEIGHT, never to bare digits (fa2ff6d): bare, these
  // numbers are hue angles, svg coordinates and filter percentages far more
  // often than they are weights, and a check that cries wolf gets muted.
  {
    // CSS `font-weight: 497`, svg `font-weight="497"`, JS `fontWeight = 497`,
    // `setProperty('font-weight', '497')`.
    name: "retired weight",
    pattern: new RegExp(
      `(?:font-weight|fontWeight)(?:\\s*[:=]|["']\\s*,)\\s*["']?\\s*(${RUNG})`,
      "gid",
    ),
  },
  {
    // The axis, wherever it is written: `'wght' 497`, `"wght" 497`, `wght 497`.
    name: "retired weight",
    pattern: new RegExp(`\\bwght\\b["']?\\s*[:,]?\\s*(${RUNG})`, "gid"),
  },
  {
    // A custom property that carries a weight — `--sans-*` or anything named
    // for one — read to the end of its value, however it is wrapped.
    name: "retired weight",
    pattern: /(?<![\w-])--(?:sans-[\w-]+|[\w-]*weight[\w-]*)\s*:([^;{}<>"`]*)/gid,
    inner: new RegExp(RUNG, "g"),
  },
  {
    // The `font` shorthand: its one unitless number before the slash is the
    // weight; after the slash it is a line-height.
    name: "retired weight",
    pattern: /(?<![\w-])font\s*:([^;{}<>"`]*)/gid,
    inner: new RegExp(`(?<!/\\s*)${RUNG}`, "g"),
  },
];

const MARKER = /\bretired-ok\b/g;
/** The comment forms a marker may sit in, per file type. */
const COMMENTS = {
  ".md": [["<!--", "-->"]],
  ".css": [["/*", "*/"]],
  ".html": [
    ["<!--", "-->"],
    ["/*", "*/"],
    ["//", "\n"],
  ],
};

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "history" || entry.name.startsWith(".")) continue;
      yield* walk(full);
    } else if (SPECIMEN_EXT.test(entry.name)) {
      yield full;
    }
  }
}

function lineIndex(text) {
  const starts = [0];
  for (let i = 0; i < text.length; i++) if (text[i] === "\n") starts.push(i + 1);
  return (offset) => {
    let lo = 0;
    let hi = starts.length - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (starts[mid] <= offset) lo = mid;
      else hi = mid - 1;
    }
    return lo + 1;
  };
}

function* hits(text) {
  for (const rule of RULES) {
    for (const m of text.matchAll(rule.pattern)) {
      if (!rule.inner) {
        const at = m.indices?.[1] ? m.indices[1][0] : m.index;
        const term = m[1] ?? m[0];
        yield { index: at, term: rule.name.endsWith("weight") ? `weight ${term}` : term };
        continue;
      }
      const [valueStart] = m.indices[1];
      for (const r of m[1].matchAll(rule.inner)) {
        yield { index: valueStart + r.index, term: `weight ${r[0]}` };
      }
    }
  }
}

/**
 * A marker exempts every line of the comment it sits in; a comment standing
 * alone on its line also exempts the next line. A marker outside a comment of
 * this file type is returned as an orphan — reported, not honoured.
 */
function markers(text, ext, lineOf) {
  const forms = COMMENTS[ext] ?? [];
  const out = [];
  for (const m of text.matchAll(MARKER)) {
    let best = null;
    for (const [open, close] of forms) {
      const o = text.lastIndexOf(open, m.index);
      if (o === -1) continue;
      // The nearest opener only encloses the marker if no closer sits between.
      const firstClose = text.indexOf(close, o + open.length);
      if (firstClose !== -1 && firstClose < m.index) continue;
      if (open === "//" && !/(?:^|\s)$/.test(text.slice(Math.max(0, o - 1), o)))
        continue; // `https://` is not a comment
      if (!best || o > best.o)
        best = {
          o,
          c: firstClose === -1 ? text.length : firstClose,
          closeLen: close === "\n" ? 0 : close.length,
        };
    }
    const line = lineOf(m.index);
    if (!best) {
      out.push({ line, from: line, to: line - 1, orphan: true, used: 0 });
      continue;
    }
    const from = lineOf(best.o);
    const last = lineOf(Math.max(best.o, best.c - 1));
    // Only a comment standing alone on one line reaches the line after it. A
    // block comment, or one trailing code, exempts its own lines and no more:
    // the line after a history block is usually a live declaration.
    const lineStart = text.lastIndexOf("\n", best.o - 1) + 1;
    const lineEnd = text.indexOf("\n", best.o) === -1 ? text.length : text.indexOf("\n", best.o);
    const closeEnd = Math.min(text.length, best.c + best.closeLen);
    const alone =
      from === last &&
      text.slice(lineStart, best.o).trim() === "" &&
      text.slice(closeEnd, lineEnd).trim() === "";
    out.push({ line, from, to: alone ? last + 1 : last, orphan: false, used: 0 });
  }
  return out;
}

function excerpt(line, column) {
  const t = line.trim();
  if (t.length <= 160) return t;
  const lead = line.length - line.trimStart().length;
  const at = Math.max(0, column - lead - 60);
  return `${at > 0 ? "…" : ""}${t.slice(at, at + 160)}${at + 160 < t.length ? "…" : ""}`;
}

// ---------------------------------------------------------------------------

const files = [];
const missing = [];
for (const f of ENTRY_FILES) {
  const full = path.join(repoRoot, f);
  if (fs.existsSync(full)) files.push(full);
  else missing.push(f);
}
const specimenDir = path.join(repoRoot, SPECIMEN_DIR);
if (fs.existsSync(specimenDir)) files.push(...walk(specimenDir));
else missing.push(`${SPECIMEN_DIR}/`);

// A guard that cannot find what it checks must not report agreement.
if (missing.length) {
  console.error(`check-retired — cannot run: missing ${missing.join(", ")} under ${repoRoot}`);
  process.exit(2);
}

const found = [];
const allMarkers = [];
for (const file of files) {
  const rel = path.relative(repoRoot, file);
  const text = fs.readFileSync(file, "utf8");
  const lines = text.split("\n");
  const lineOf = lineIndex(text);
  const marks = markers(text, path.extname(file), lineOf);
  for (const mk of marks) {
    mk.rel = rel;
    allMarkers.push(mk);
  }

  const seen = new Set();
  for (const h of [...hits(text)].sort((a, b) => a.index - b.index)) {
    const line = lineOf(h.index);
    const key = `${line}:${h.term.toLowerCase()}`;
    if (seen.has(key)) continue; // one report per term per line
    seen.add(key);
    const mk = marks.find((x) => !x.orphan && line >= x.from && line <= x.to);
    if (mk) {
      mk.used++;
      continue;
    }
    const lineStart = text.lastIndexOf("\n", h.index - 1) + 1;
    found.push(`${rel}:${line}: ${h.term} — ${excerpt(lines[line - 1], h.index - lineStart)}`);
  }
}

for (const f of found) console.error(f);

const honoured = allMarkers.reduce((n, m) => n + m.used, 0);
const live = allMarkers.filter((m) => !m.orphan);
console.log(
  `\ncheck-retired — ${files.length} files, ${found.length} hit(s); ` +
    `${honoured} exemption(s) honoured by ${live.length} retired-ok marker(s).`,
);
for (const m of allMarkers) {
  if (m.orphan) {
    console.log(`  ${m.rel}:${m.line}  retired-ok outside a comment — not honoured`);
  } else {
    // The span printed is the span exempted, so a wide one is seen.
    console.log(
      `  ${m.rel}:${m.from === m.to ? m.from : `${m.from}-${m.to}`}  ${m.used} exempted${m.used === 0 ? " — unused, remove it" : ""}`,
    );
  }
}

process.exit(found.length > 0 ? 1 : 0);
