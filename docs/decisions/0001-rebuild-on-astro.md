# 0001 - Rebuild the portfolio on Astro + TypeScript

- Status: accepted
- Date: 2026-10-11
- Plan: Obsidian `Projects/Portfolio/Portfolio - Design Doc.md`

## Context

The site was a Create React App SPA last updated December 2025. The content
refresh cuts or rewrites nearly every component (hero, carousel, skills grid,
about, all projects), so little code carries over. CRA is deprecated and lacks
React 19 support. As a client-rendered SPA it serves an empty `<div id="root">`
to crawlers and link-preview bots, and the planned project detail pages need
real routes with pre-rendered HTML.

## Decision

Rebuild as a static Astro site in TypeScript (strict), with content in typed
content collections. Keep Firebase Hosting (`portfolio-79301`), with
`public` pointed at `dist/`, so DNS for `kishanrajagunathas.ca` is untouched.
Interactive pieces (diagrams, command palette) ship as small islands only.

## Consequences

- Pre-rendered HTML per page: correct SEO and link previews, near-zero JS.
- Content edits happen in data files, not JSX.
- The SPA catch-all rewrite is removed; unknown paths return 404 (a custom
  `404.astro` page is served by Firebase automatically).
- New framework to learn (Astro component syntax), though islands can be React.
- Old CRA code lives only in git history.

## Alternatives considered

- **Refresh CRA in place** - keeps dead tooling and SPA SEO problems for
  almost no saved work.
- **Vite + React** - modern tooling, but still client-rendered.
- **Next.js static export** - pre-rendered, but heavier JS for a content site.
- **Move hosting to Vercel / Cloudflare Pages** - better PR previews, but needs
  a DNS change; Firebase preview channels are enough.
