#!/usr/bin/env node
/**
 * pnpm design:tokens — regenerate `app/design-tokens.css` from the design
 * system's `colors_and_type.css`.
 *
 * The colour layer is canonical in `resistbot/amendment-design`, symlinked in
 * at `design/`. Nothing in voyager may restate one of its values, so this is
 * the one place they cross the boundary — written by this script, never by
 * hand.
 *
 * Why a generated file rather than `@import "../design/colors_and_type.css"`:
 *
 *   1. `design/` is a symlink out of the repo and gitignored, so it does not
 *      exist on CI or on Vercel. A build input that lives there fails every
 *      deploy.
 *   2. Turbopack refuses a CSS import that leaves the project root, fatally:
 *      `FileSystemPath("").join("../amendment-design/colors_and_type.css")
 *      leaves the filesystem root` — a panic, not a warning.
 *   3. `colors_and_type.css` is a standalone drop-in. It pulls Newsreader and
 *      IBM Plex Mono from the Google Fonts CDN (voyager self-hosts both via
 *      `next/font`), declares `@font-face` against paths inside the design
 *      repo, and ships `role-*` / `material-*` as plain classes — which
 *      voyager implements as Tailwind `@utility` so they can carry `dark:`
 *      and `hover:`. Imported whole it would double-load three families and
 *      give every type role a second definition at higher specificity.
 *
 * So: take the token layer, verbatim, and commit it. Queued in
 * `design/RATIFY.md` — the design system's own notes describe the consumer as
 * importing `colors_and_type.css` directly, and it cannot.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// MOVED to the design repo 2026-08-30. The generator belongs with the thing
// it generates from: this repo owns the spec, so it owns the tool that emits
// the consumer's token file and the check that they agree.
//
//   node tools/build-tokens.mjs --target <consumer-repo>            (write)
//   node tools/build-tokens.mjs --target <consumer-repo> --check    (verify)
//
// Source is this repo directly — no `design/` symlink hop, because here the
// canonical files ARE the local ones.
const specRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const argTarget = (() => {
  const i = process.argv.indexOf("--target");
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : null;
})();
const targetRoot = path.resolve(
  argTarget ?? path.join(process.env.HOME ?? "", "git", "voyager"),
);
const repoRoot = specRoot; // spec-side reads resolve here
const sourcePath = path.join(specRoot, "colors_and_type.css");
const outPath = path.join(targetRoot, "app", "design-tokens.css");

/**
 * Tailwind ships `--color-white`, `--color-black` and the zinc ramp itself,
 * and since v4 authors them in oklch. The design system carries the same ramp
 * as hex, annotated as a verbatim Tailwind alias — which it stopped being.
 * Re-emitting the hex would nudge every `zinc-*` utility in the product to fix
 * nothing, so the alias block stays with the framework.
 */
const FRAMEWORK_ALIAS = /^--color-(white|black|zinc-)/;

/**
 * Body of the first `selector {` block at column 0, brace-matched.
 *
 * FIXED 2026-08-30. This matched the selector as a LITERAL STRING, so a
 * selector list broken across lines — which `.dark, :root[data-theme="dark"]`
 * has been since the repo split — never matched and the tool threw. It threw
 * in its old home too, which means `design:tokens:check`, the guard the spec
 * made mandatory when it sanctioned extraction, HAS NOT RUN. A check that
 * cannot execute reports nothing, and nothing is indistinguishable from
 * agreement.
 * Now whitespace-tolerant between the parts of a selector list.
 */
function block(css, selector) {
  const pattern = selector
    .split(/\s*,\s*/)
    .map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("\\s*,\\s*");
  const match = new RegExp(`^${pattern}\\s*\\{`, "m").exec(css);
  const open = match ? match.index : -1;
  if (open === -1) {
    throw new Error(`design:tokens — no \`${selector}\` block in the source`);
  }
  let depth = 0;
  for (let i = open; i < css.length; i++) {
    if (css[i] === "{") depth++;
    else if (css[i] === "}" && --depth === 0) {
      return css.slice(css.indexOf("{", open) + 1, i);
    }
  }
  throw new Error(`design:tokens — unterminated \`${selector}\` block`);
}

/**
 * The token groups voyager has migrated, pulled by the source's own section
 * markers so a rename fails loudly here instead of silently dragging a group
 * voyager has not migrated yet (type is stage 1's and already landed; spacing,
 * shadows and motion belong to later stages).
 *
 * Each entry is [start marker, end marker) — the slice runs from the start
 * marker's comment box to the one before the end marker's.
 */
const MIGRATED_SECTIONS = [
  ["COLOR", "TYPE"],
  ["RADII", "SHADOWS"],
  ["FOCUS", null],
];

function section(rootBody, [from, to]) {
  const at = (marker) => {
    const i = rootBody.indexOf(`--------------------------- ${marker}`);
    if (i === -1) {
      throw new Error(
        `design:tokens — no ${marker} divider in :root; section markers moved`,
      );
    }
    return i;
  };
  const start = from === "COLOR" ? 0 : rootBody.lastIndexOf("/*", at(from));
  const end =
    to === null ? rootBody.length : rootBody.lastIndexOf("/*", at(to));
  return rootBody.slice(start, end);
}

function migratedSections(rootBody) {
  return MIGRATED_SECTIONS.map((range) => section(rootBody, range)).join("\n");
}

/**
 * Theme-namespaced colours generate utilities (`bg-action`, `text-momentum`);
 * everything else is a plain custom property. Comments ride with the
 * declaration they introduce.
 */
function partition(sectionCss) {
  const theme = [];
  const root = [];
  let carried = [];
  let pending = null; // lines of a declaration still accumulating
  let depth = 0;

  // A declaration is not a line. `--aurora` sets three radial-gradients across
  // fourteen lines, and the line-based version of this function pushed only
  // `--aurora:` and swept the gradients into `carried`, where they were
  // discarded. It emitted a property with an EMPTY VALUE — valid CSS, no
  // parse error, no build failure, and no aurora in light mode. It stayed
  // invisible because the tool that would have printed it could not run at
  // all (see `block`). Accumulate to the semicolon at paren depth zero.
  const flush = () => {
    const text = pending.join("\n");
    pending = null;
    const name = text.match(/^\s*(--[\w-]+)\s*:/)[1];
    if (FRAMEWORK_ALIAS.test(name)) {
      carried = [];
      return;
    }
    const namespaced =
      name.startsWith("--color-") || name.startsWith("--radius-");
    (namespaced ? theme : root).push(...carried, text);
    carried = [];
  };

  for (const line of sectionCss.split("\n")) {
    if (pending) {
      pending.push(line);
      depth += count(line, "(") - count(line, ")");
      if (depth <= 0 && line.includes(";")) flush();
      continue;
    }
    if (!/^\s*--[\w-]+\s*:/.test(line)) {
      carried.push(line);
      continue;
    }
    pending = [line];
    depth = count(line, "(") - count(line, ")");
    if (depth <= 0 && line.slice(line.indexOf(":") + 1).includes(";")) flush();
  }
  if (pending) flush();

  return { theme: theme.join("\n").trim(), root: root.join("\n").trim() };
}

const count = (s, ch) => s.split(ch).length - 1;

/**
 * The stamp is `spec-version` and nothing else. It has to be a pure function of
 * the source, because CI regenerates this file and fails on any diff — a stamp
 * that also carried the local `git describe` would differ between a laptop and
 * the runner and make the guard cry wolf. `spec-version` is the authoritative
 * field anyway: DESIGN.md's own provenance header says a ratification is not
 * finished until it is bumped.
 */
/**
 * The MATERIALS, brought under the same guard as colour and radii — queued in
 * `design/RATIFY.md` as `materials-are-a-second-copy` after voyager's
 * hand-written `@utility` blocks drifted to the opposite treatment
 * (`material-chrome` dark was a white wash where the system specifies a dark
 * one) and the stylesheet's own prose documented the drift as if it were a rule.
 *
 * Values are lifted from `colors_and_type.css` and CROSS-CHECKED against
 * `DESIGN.md`'s `materials:` table. Where the two disagree, DESIGN.md wins —
 * it is the spec, and the stylesheet is an implementation of it — and the
 * disagreement is printed and recorded in the output so it cannot pass quietly.
 */
const MATERIALS = [
  "material-ultrathin",
  "material-thin",
  "material-regular",
  "material-thick",
  "material-chrome",
];

/** `background` / `box-shadow` / `backdrop-filter` out of one CSS rule. */
function ruleProps(css, selector) {
  // Whitespace-tolerant for the same reason as `block()` — see its note. The
  // material rules are grouped selectors broken across lines, so a literal
  // match never found them.
  const pattern = selector
    .split(/\s*,\s*/)
    .map((part) => part.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+"))
    .join("\\s*,\\s*");
  const match = new RegExp(`${pattern}\\s*\\{`, "m").exec(css);
  const at = match ? match.index : -1;
  if (at === -1) throw new Error(`design:tokens — no \`${selector}\` rule`);
  const body = css.slice(at, css.indexOf("}", at));
  const prop = (name) =>
    body.match(new RegExp(`${name}:\\s*([^;]+);`))?.[1].trim();
  return {
    background: prop("background"),
    shadow: prop("box-shadow"),
    backdrop: prop("backdrop-filter"),
  };
}

/** DESIGN.md's `materials:` table, read without a YAML dependency. */
function specMaterials(designMd) {
  const table = designMd.slice(designMd.indexOf("\nmaterials:"));
  const out = {};
  for (const name of MATERIALS) {
    const at = table.indexOf(`  ${name}:`);
    if (at === -1) continue;
    const block = table.slice(at, at + 900);
    const grab = (key) => block.match(new RegExp(`${key}:\\s*"([^"]+)"`))?.[1];
    out[name] = { light: grab("bg-light"), dark: grab("bg-dark") };
  }
  return out;
}

function materials(css, designMd) {
  const spec = specMaterials(designMd);
  const light = [];
  const dark = [];
  const conflicts = [];

  for (const name of MATERIALS) {
    const l = ruleProps(css, `.${name}`);
    const d = ruleProps(css, `.dark .${name}, [data-theme="dark"] .${name}`);
    const reconcile = (scheme, fromCss) => {
      const fromSpec = spec[name]?.[scheme];
      if (fromSpec && fromCss && fromSpec !== fromCss) {
        conflicts.push(
          `${name} ${scheme}: DESIGN.md ${fromSpec} vs colors_and_type.css ${fromCss}`,
        );
        return fromSpec;
      }
      return fromCss;
    };
    light.push(
      `  --${name}-bg: ${reconcile("light", l.background)};`,
      `  --${name}-shadow: ${l.shadow};`,
      `  --${name}-backdrop: ${l.backdrop};`,
    );
    dark.push(
      `  --${name}-bg: ${reconcile("dark", d.background)};`,
      `  --${name}-shadow: ${d.shadow};`,
    );
  }
  return { light: light.join("\n"), dark: dark.join("\n"), conflicts };
}

function provenance() {
  const header = fs
    .readFileSync(path.join(specRoot, "DESIGN.md"), "utf8")
    .slice(0, 4096);
  return header.match(/^#\s+spec-version:\s+(\S+)/m)?.[1] ?? "unknown";
}

if (!fs.existsSync(sourcePath)) {
  console.error(
    "design:tokens — design/colors_and_type.css not found. `design/` is a symlink to the design system repo; see CLAUDE.md.",
  );
  process.exit(1);
}

const css = fs.readFileSync(sourcePath, "utf8");
const designMd = fs.readFileSync(
  path.join(specRoot, "DESIGN.md"),
  "utf8",
);
const { theme, root } = partition(migratedSections(block(css, ":root")));
const dark = block(css, '.dark, :root[data-theme="dark"]').trim();

/**
 * THE SCOPES THE FIRST VERSION OF THIS TOOL DID NOT KNOW ABOUT, found by the
 * consumer session on 2026-08-30 one turn after the parsers were repaired.
 *
 * `--text-secondary` is declared in FIVE places in the source. This tool
 * emitted TWO and said "in sync". A guard reports agreement about what it
 * looks at and is silent about everything else, which is the same defect it
 * was built to prevent, one level up.
 *
 * `[data-paper]` is the ink scope for paper surfaces. Its absence is why
 * raising :root from 55% to 60% moved PAPER to 60% as well — the transfer the
 * spec explicitly forbids, because paper is an opaque, aurora-free ground and
 * the 60% was argued for the aurora band.
 *
 * PRINT IS DELIBERATELY NOT HERE. Its block is a real stylesheet — hidden
 * chrome, measure in inches, the emboss rule, page-break behaviour — and
 * lifting only its three token lines would produce a partial copy that READS
 * as coverage. See DESIGN.md -> color.a-guard-that-cannot-run-reports-agreement.
 */
const paper = block(css, "[data-paper], [data-paper] *").trim();
const contrastMore = block(css, "@media (prefers-contrast: more)")
  .trim()
  .replace(/^\s*\.dark\s*\{/m, '  .dark,\n  :root[data-theme="dark"] {');
const mat = materials(css, designMd);

const rendered = `/* ---------------------------------------------------------------------------
 * GENERATED — DO NOT EDIT.
 *
 * The colour token layer of the Amendment design system, lifted verbatim from
 * its \`colors_and_type.css\`. Every value here is the design system's; voyager
 * states none of its own. To change one, change it in the design system, then
 * re-run:
 *
 *   node tools/build-tokens.mjs --target <consumer-repo>
 *
 * from the design system repo, which is where that tool now lives.
 *
 * source: design/colors_and_type.css @ spec-version ${provenance()}
 * --------------------------------------------------------------------------- */

/* In \`@theme\` so the tokens also generate utilities — \`bg-action\`,
 * \`text-momentum\`, \`ring-danger\` — and no component reaches for
 * \`var(--color-action)\` by hand. */
@theme {
  ${theme}
}

:root {
  ${root}

  /* Materials — see the MATERIALS block in this generator for why these are
     extracted rather than hand-written. The utilities in globals.css consume
     these and state no values of their own. */
${mat.light}
}

.dark,
:root[data-theme="dark"] {
  ${dark}
${mat.dark}
}

/* Paper islands. \`data-paper\` is a THEME SCOPE, not a decoration: a paper
 * surface carries the paper canvas AND this attribute, or it paints paper and
 * inks it like the screen.
 *
 *     <article class="paper-cream" data-paper> … </article>
 */
[data-paper],
[data-paper] * {
  ${paper}
}
[data-paper] {
  color: var(--text-primary);
}

@media (prefers-contrast: more) {
  ${contrastMore}
}
`;

// `--check` verifies without writing. It is the same code path CI runs, so a
// green check locally and a green check in CI mean the same thing.
if (process.argv.includes("--check")) {
  const onDisk = fs.existsSync(outPath) ? fs.readFileSync(outPath, "utf8") : "";
  if (onDisk !== rendered) {
    console.error(
      "design:tokens --check — app/design-tokens.css is out of sync with the spec.\n" +
        "  Run `node tools/build-tokens.mjs --target <repo>` and commit the result.",
    );
    process.exit(1);
  }
  console.log(`design:tokens --check — in sync with ${provenance()}`);
} else {
  fs.writeFileSync(outPath, rendered);
  console.log(`design:tokens — app/design-tokens.css written`);
}
if (mat.conflicts.length > 0) {
  console.warn(
    "design:tokens — DESIGN.md and colors_and_type.css disagree on a material.\n" +
      "  DESIGN.md wins and was used; the stylesheet is behind its own spec.\n" +
      mat.conflicts.map((c) => `    ${c}`).join("\n"),
  );
}
