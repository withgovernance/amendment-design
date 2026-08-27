// Amendment — Tailwind configuration (example)
// Wire `design-system/tokens/tokens.json` into Tailwind so utility classes
// resolve to the canonical tokens. Generated from tokens.json; regenerate
// when tokens change.

import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Brand
        primary: { light: "#334155", DEFAULT: "#1e293b", dark: "#0f172a" },
        action:  { light: "#991b1b", DEFAULT: "#7f1d1d", dark: "#450a0a" },
        functional: { light: "#94a3b8", DEFAULT: "#64748b", dark: "#475569" },
        // Semantic (conventional only, NEVER brand decoration)
        success: { DEFAULT: "#047857", soft: "#10b981" },
        warning: { DEFAULT: "#b45309", soft: "#f59e0b" },
        danger:  { DEFAULT: "#dc2626", soft: "#ef4444" },
        // Paper canvases (opaque — Archive bill text + Writing Desk letter)
        cream: "oklch(0.965 0.012 85)",
        parchment: "oklch(0.955 0.018 80)",
      },
      fontFamily: {
        sans: ['"Readex Pro"', "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Merriweather", "ui-serif", "Georgia", "serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      fontWeight: {
        // Calibrated Readex Pro weights. Use Tailwind's font-* shortcuts;
        // dark-mode swap is handled by a CSS layer (see globals.css), so
        // do NOT manually pick a "dark-mode weight."
        // Canonical 100…900 as of 2026-08-13 — the old interpolated ladder
        // compensated for Readex reading heavy; Archivo needs no compensation
        // and its named instances are the designer's own stops.
        thin: "100",
        extralight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "900",
        extrabold: "800",
        black: "900",
      },
      borderRadius: {
        sm: "0.25rem",   // inputs, pills
        md: "0.5rem",    // buttons, cards
        lg: "0.75rem",   // modals, FAB
        full: "9999px",
      },
      boxShadow: {
        // Slate-900 ink, two-layer. Never tint by content category.
        whisper:  "0 1px 2px 0 rgb(15 23 42 / 0.04), 0 1px 1px -1px rgb(15 23 42 / 0.04)",
        raised:   "0 4px 6px -1px rgb(15 23 42 / 0.12), 0 2px 4px -2px rgb(15 23 42 / 0.12)",
        floating: "0 20px 25px -5px rgb(15 23 42 / 0.18), 0 8px 10px -6px rgb(15 23 42 / 0.18)",
        chrome:   "0 8px 16px -4px rgb(15 23 42 / 0.12), 0 3px 6px -3px rgb(15 23 42 / 0.12)",
      },
      backdropBlur: {
        material: "50px",   // ultrathin / thin / regular / thick
        "material-chrome": "25px",
      },
      transitionTimingFunction: {
        standard:   "cubic-bezier(0.4, 0, 0.2, 1)",
        emphasized: "cubic-bezier(0.2, 0, 0, 1)",
      },
      transitionDuration: {
        "100": "100ms",   // instant
        "150": "150ms",   // fast
        "200": "200ms",   // base
        "300": "300ms",   // slow
      },
      maxWidth: {
        tight: "48rem",   // conversation columns
        wide: "80rem",    // navbar, footer
      },
      letterSpacing: {
        chrome: "0.05em",       // HEXP-60 default
        ceremonial: "0.18em",   // HEXP-100 Receipt caption
      },
    },
  },
  plugins: [
    // Plugin to expose HEXP variation-axis shortcuts. Lets you write
    //   <span className="hexp-chrome uppercase tracking-chrome ...">
    // instead of inlining font-variation-settings everywhere.
    function({ addUtilities }: any) {
      addUtilities({
        ".hexp-body":       { fontVariationSettings: '"HEXP" 2' },
        ".hexp-chrome":     { fontVariationSettings: '"HEXP" 60' },
        ".hexp-display":    { fontVariationSettings: '"HEXP" 80' },
        ".hexp-ceremonial": { fontVariationSettings: '"HEXP" 100' },
      });
    },
  ],
};

export default config;
