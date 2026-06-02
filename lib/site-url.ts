/**
 * Absolute base URL for the site, used as `metadataBase` so Open Graph /
 * Twitter image URLs resolve to absolute links.
 *
 * On Vercel, `VERCEL_PROJECT_PRODUCTION_URL` is injected at build time (the
 * stable production domain, no protocol) — we don't hardcode the .vercel.app
 * host. Locally it falls back to the dev server.
 */
export const siteUrl = new URL(
  process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000'
)
