#!/usr/bin/env node
/**
 * pnpm design:lint — the mechanical half of the hard rules.
 *
 * A lint error is obeyed; a rule read three files ago is not. Every check here
 * exists because the rule it enforces was already broken in this codebase at
 * least once, usually silently and usually for weeks.
 *
 * These are greps rather than Biome rules because Biome has no way to match
 * inside a Tailwind class string. That is the same trade the design system's
 * own CI makes for its retired-value grep, and it is worth the crudeness: the
 * check runs in a second and fails with a file and a line.
 *
 * NOT covered here, deliberately: whether an interactive element reaches 44px.
 * That is a computed box, not a class — five controls reached the floor by
 * `padding + line-height` where no single line was wrong, and a grep would
 * have passed all five. It needs a render.
 */
import fs from "node:fs";
import path from "node:path";

// MOVED to the design repo 2026-08-30. Adherence is the design system's job
// to check, not the consumer's to carry.
//
//   node tools/lint-rules.mjs --target <consumer-repo>
const repoRoot = (() => {
  const i = process.argv.indexOf("--target");
  const given = i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : null;
  return path.resolve(given ?? path.join(process.env.HOME ?? "", "git", "voyager"));
})();
const ROOTS = ["app", "components", "lib", "email"];

/**
 * Files exempt by name, so an exemption is visible rather than implied by a
 * rule quietly not firing. The statutory surface (`BillFullText` and its
 * siblings) sat here through the composition pass and has been released —
 * an empty list is the honest state, and it is worth keeping the mechanism
 * for the next surface that needs to be held rather than swept.
 */
const HELD = [];

const RULES = [
  {
    // Lightning CSS (Turbopack's minifier) treats the prefixed and unprefixed
    // backdrop-filter as ONE property and keeps only the last. Written
    // standard-first, the build shipped only `-webkit-backdrop-filter`, which
    // this Chrome does not support at all — every glass material rendered as a
    // flat wash with no blur. It was invisible in Storybook, whose pipeline
    // kept both, and invisible in review, because the source looked correct.
    name: "prefixed backdrop-filter must come before the standard one",
    why: "Lightning CSS keeps only the last of the two. Standard-first ships the -webkit- form alone, and the blur silently disappears.",
    // A whole-file pattern: the defect is an ORDERING between two adjacent
    // lines, which a line-at-a-time scan structurally cannot see. The first
    // version of this rule was written line-based, reported clean against the
    // reintroduced bug, and would have shipped as a guard that never fires.
    filePattern: /backdrop-filter:[^\n]*\n\s*-webkit-backdrop-filter:/,
    roots: ["app"],
  },
  {
    name: "type floor",
    why: "12px floor, no chrome exception. If a label no longer fits at 12px, the layout is the problem.",
    pattern: /text-\[(?:[0-9]|1[01])(?:\.\d+)?px\]|text-\[0\.[0-6]\d?rem\]/,
    exempt: HELD,
  },
  {
    name: "hover never moves",
    why: "motion.rules — hover is one background step and one shadow tier. A control's own committed state may transition transform; a hover may not.",
    pattern: /(?:hover|group-hover|peer-hover):(?:scale-|translate-|rotate-)/,
  },
  {
    name: "no brightness filter",
    why: "filter:brightness() promotes a compositing layer and makes SVG icons wobble sub-pixel on hover.",
    pattern: /brightness\(/,
  },
  {
    name: "no transition-all",
    why: "Transition only background, box-shadow, color, opacity and ring. `transition-all` sweeps in layout properties nobody chose.",
    pattern: /\btransition-all\b/,
  },
  {
    name: "no ch widths",
    why: "`ch` is the advance width of the element's own zero glyph, so one token computes differently on a shell and on the serif it wraps. Widths in rem, from a counted line.",
    pattern: /\b(?:max-w|min-w|w)-\[\d+(?:\.\d+)?ch\]/,
    exempt: HELD,
  },
  {
    name: "no raw hex outside the token layer",
    why: "Colour values live in app/design-tokens.css, generated from the design system. A hex in a component is a copy that ages.",
    pattern: /#[0-9a-fA-F]{6}\b/,
    // The token file IS the token layer. A logo's colours are the logo, not a
    // palette choice. A PWA manifest and a Satori-rendered OG image are both
    // rasterised outside the browser and cannot read a custom property. Email
    // is a separate profile whose transported values are hex by necessity.
    exempt: ["design-tokens.css", "AmendmentLogo.tsx", "manifest.ts"],
    exemptDirs: [`${path.sep}og${path.sep}`],
    roots: ["app", "components", "lib"],
    skipEmail: true,
  },
  {
    name: "a width preset is not a register",
    // 46 sites had rebuilt the chrome register by hand out of `sans-chrome` +
    // `uppercase` + a Tailwind tracking step, and every one got the tracking
    // wrong: `wide` is 0.025em, `wider` 0.05em, `widest` 0.1em, against
    // --track-chrome's 0.12em — 1.2x to 5x under. Seven carried no tracking at
    // all. `role-label-caps` composes family, width, weight, case, tracking and
    // the 12px floor together; ratified for the breadcrumb on 2026-08-27 as
    // "chrome's width without chrome's tracking is a different register", then
    // fixed at one site and never swept. This is the rule so it does not
    // regrow, because "did someone rebuild a register here" is not greppable
    // and this is.
    why: "Use `role-label-caps` (chrome) or `role-ceremonial` (display) — do not reassemble a register from a width preset.",
    pattern:
      /sans-chrome(?=[^"'`]*\buppercase\b)|uppercase(?=[^"'`]*\bsans-chrome\b)/,
    exempt: HELD,
  },
  {
    name: "retired axis: HEXP",
    // Scans COMMENTS as well as code, and that is the point. The migration
    // deleted every `hexp-*` the compiler reads and left seven comments a
    // person reads — including one that set `'HEXP' 100` in live code on a
    // face with no HEXP axis, so it silently did nothing. A comment at a call
    // site is a competing copy of the system WITH STANDING, because the next
    // reader trusts it for being local.
    why: "Archivo has no HEXP axis. The register is carried by the `wdth` presets, and composed by the role classes.",
    pattern: /\bHEXP\b/i,
    exempt: ["lint-rules.mjs"],
  },
  {
    name: "retired weight ladder",
    // 160/227/295/362/430/497/565/632 — a permanent grep set. It re-entered
    // the spec twice, once in a block written the same week its retirement was
    // ratified, because a specific number reads as a measurement someone took.
    why: "The interpolated weight ladder was retired; weights are 100-900 named tokens.",
    pattern: /\b(?:160|227|295|362|430|497|565|632)\b/,
    roots: ["app", "components"],
    exempt: ["lint-rules.mjs"],
    commentsOnly: true,
  },
  {
    name: "Phosphor icons only",
    why: "Icons are Phosphor, never Lucide.",
    pattern: /from\s+["']lucide-react["']/,
  },
];

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
      yield* walk(full);
    } else if (/\.(tsx|ts|css)$/.test(entry.name)) {
      yield full;
    }
  }
}

let failures = 0;
for (const rule of RULES) {
  const roots = rule.roots ?? ROOTS;
  for (const root of roots) {
    const dir = path.join(repoRoot, root);
    if (!fs.existsSync(dir)) continue;
    for (const file of walk(dir)) {
      const base = path.basename(file);
      if (rule.exempt?.some((e) => base === e)) continue;
      if (rule.skipEmail && file.includes(`${path.sep}email${path.sep}`))
        continue;
      if (rule.exemptDirs?.some((d) => file.includes(d))) continue;
      // Stories are specimens of production code and are held to it, but a
      // story may legitimately render a violation to document it.
      const text = fs.readFileSync(file, "utf8");
      if (rule.filePattern) {
        const m = rule.filePattern.exec(text);
        if (m) {
          failures++;
          const line = text.slice(0, m.index).split("\n").length;
          console.error(
            `${path.relative(repoRoot, file)}:${line}  ${rule.name}\n    ${m[0].trim().split("\n")[0].slice(0, 120)}\n    ${rule.why}`,
          );
        }
        continue;
      }
      const lines = text.split("\n");
      lines.forEach((line, i) => {
        if (line.includes("design-lint-ignore")) return;
        // The ladder's digits are legitimate in code (a z-index, a duration);
        // it is the PROSE that teaches a retired value, so that rule reads
        // comments only.
        if (rule.commentsOnly && !/^\s*(?:\/\/|\*|\/\*|\{\/\*)/.test(line))
          return;
        if (!rule.pattern.test(line)) return;
        failures++;
        console.error(
          `${path.relative(repoRoot, file)}:${i + 1}  ${rule.name}\n    ${line.trim().slice(0, 120)}\n    ${rule.why}`,
        );
      });
    }
  }
}

if (failures > 0) {
  console.error(`\ndesign:lint — ${failures} violation(s).`);
  process.exit(1);
}
console.log("design:lint — clean.");
