# Portfolio - kishanrajagunathas.ca

Static Astro + TypeScript (strict) site, deployed to Firebase Hosting
(project `portfolio-79301`, serves `dist/`).

- Plan, decisions, and tickets: Obsidian `Projects/Portfolio/` (design doc +
  `issues/`). ADRs: `docs/decisions/`.
- Canonical domain is `https://www.kishanrajagunathas.ca` (never `.com`).
- Content for Clio and theScore stays at resume-level detail (NDA). Source
  copy: `~/Documents/projects/resume/content.tex`.
- nAIber gets equal weight with other projects; no deep dive here.

## Commands

- `npm run dev` - dev server (background: `npx astro dev --background`;
  manage with `astro dev stop|status|logs`)
- `npm run build` - static build to `dist/`
- `npm run check` - type check (`astro check`)
- `npm test` - Vitest (content schemas) then Playwright e2e against the
  production build, desktop + mobile, incl. axe WCAG AA in light and dark
- `/styleguide` - noindex review page for tokens and all content entries
- `firebase hosting:channel:deploy preview` - preview deploy
- `firebase deploy --only hosting` - production deploy (only when asked)

## Gotchas

- E2E specs import `test`/`expect` from `tests/e2e/fixtures.ts`, not
  `@playwright/test`: the fixture intercepts GA so test runs never send
  real analytics hits. Use its `newContext(browser, opts)` for manual contexts.
- Preview images and icons are generated at build time (`src/lib/og.ts`,
  Satori + resvg). Satori cannot read woff2, so they use Plex Mono (.woff).

- Astro 7 auto-backgrounds `astro preview`/`dev` when it detects a coding
  agent. Use `--ignore-lock` for a foreground one-off server (Playwright's
  webServer relies on this).
- "Current role" in the hero is computed at build time from experience
  dates. `PORTFOLIO_NOW=YYYY-MM` pins the month (Playwright pins 2026-10).
- macOS AirPlay owns port 5000, so the Firebase hosting emulator is pinned
  to 5050 in `firebase.json`.

## Docs

Full documentation: https://docs.astro.build

Consult before related work:

- [Routing](https://docs.astro.build/en/guides/routing/)
- [Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Framework components / islands](https://docs.astro.build/en/guides/framework-components/)
- [Content collections](https://docs.astro.build/en/guides/content-collections/)
- [Styling](https://docs.astro.build/en/guides/styling/)
