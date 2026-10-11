# Portfolio

Source for [kishanrajagunathas.ca](https://www.kishanrajagunathas.ca).
Static site built with Astro + TypeScript, hosted on Firebase Hosting.

## Run locally

Requires Node >= 22.12.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs dist/
npm run check    # type check
```

## Deploy

```bash
firebase login
firebase hosting:channel:deploy preview   # temporary preview URL
firebase deploy --only hosting            # production
```

## Decisions

Architecture decisions live in [`docs/decisions/`](docs/decisions/).
