# Third Mind — landing page

Public marketing site for the Third Mind desktop app.
Single-page Next.js 16 app, fully static, deployed on Vercel.

- Hero with channel-embed preview (ported from the desktop app's auth screen)
- Idea / features / how-it-works / download / FAQ sections
- All download CTAs pull from `lib/release.ts` — update the constant on every release

## Development

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build
npm start
```

The build is static, so any CDN works.

## Updating the download links

When a new app version ships, bump `LATEST_VERSION` in [`lib/release.ts`](lib/release.ts).
Every CTA and footer chip picks it up automatically.

## Deploy

Hosted on Vercel. `main` auto-deploys; no env vars required.
