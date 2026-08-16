# Alassali Jewelry

A luxury custom jewelry website for [Al-Asali Jewelry Studio](https://www.alasalicustomjewelry.ca), Toronto.

## Tech Stack

- **Frontend**: Next.js 15 (App Router)
- **CMS**: [Sanity](https://www.sanity.io) — project `oh0jn4tt`, dataset `production`
- **Styling**: Tailwind CSS
- **Auth**: Clerk
- **Payments**: Stripe
- **Ops**: Notion (orders/customers), Resend (email)
- **Deployment**: Vercel

The Sanity Studio lives in a separate repo, deployed at
[cms.alasalicustomjewelry.ca](https://cms.alasalicustomjewelry.ca).

## Getting Started

### Prerequisites

- Node.js 18+
- Access to the Vercel project `alassali-jewelry` (scope `dreams3`)

### Environment Variables

The project is **not** git-connected on Vercel, so pull env vars with the CLI
rather than maintaining `.env.local` by hand:

```bash
npx vercel link --yes --project alassali-jewelry --scope dreams3
npx vercel env pull .env.local --environment production --scope dreams3
```

Key variables: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`,
`SANITY_API_WRITE_TOKEN`, `SANITY_WEBHOOK_SECRET`, `CLERK_SECRET_KEY`,
`STRIPE_SECRET_KEY`, `NOTION_TOKEN`, `RESEND_API_KEY`, `GOLDAPI_TOKEN`,
`GOOGLE_PLACES_API_KEY`, `NEXT_PUBLIC_CALENDLY_URL` (optional override for
the Calendly event link used by the post-inquiry "book a consultation" step;
the live default is baked into `lib/calendly.ts`).

### Installation

```bash
npm install --legacy-peer-deps
npm run dev
```

### Building

```bash
npm run build
```

### Deploying

Vercel is not connected to GitHub, so merging to `main` does not ship
anything. Deploy explicitly from the repo root:

```bash
npx vercel --prod --yes --scope dreams3
```

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` / `build` / `start` / `lint` | Standard Next.js commands |
| `npm run portfolio:audit` | Audit portfolio items in Sanity |
| `npm run portfolio:remove-first-image` | Strip the leading image from portfolio items |

Additional one-off utilities live in `scripts/` (chain image uploads, Tecimer
catalog scrapers). They are run directly with `node` or `npx tsx`.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Homepage |
| `/custom/[type]` | Bespoke landing pages, served at the flat public URLs below |
| `/[city]/[service]` | Geo service pages |
| `/about/master-jeweler/[slug]` | Master jeweler profile |
| `/portfolio`, `/faq`, `/locations` | Static content pages |
| `/blog`, `/blog/<post>` | Blog index and four posts (each a static route folder) |
| `/chains`, `/chains/[metal]`, `/chains/[metal]/[chainType]`, `/chain/[slug]` | Chain catalog — **paused** behind `CHAINS_ENABLED` (`lib/featureFlags.ts`); URLs 307 to `/` |
| `/account/**` | Clerk-authenticated customer account area |
| `/cms/[[...segments]]` | Embedded Studio entry |

### URL rewrites

Bespoke pages are authored at `/custom/<slug>` but served publicly as
`/custom-<slug>-toronto` (and `-oakville` for the geo variants) via rewrites in
`next.config.mjs`. The inquiry form is the one place the public slug diverges
from the route segment: `/custom-form` is served by `/custom/general`.

Redirect matching in `next.config.mjs` is **first-wins** — specific rules must
be listed ahead of any `:path*` catch-all, or URLs resolve in two hops.

## API Routes

| Route | Purpose |
| --- | --- |
| `GET /api/gallery`, `/api/gallery/[id]` | Gallery items |
| `GET /api/homepage`, `/api/pages` | Page content |
| `GET /api/chains`, `/api/chains/[slug]` | Chain catalog data |
| `GET /api/pricing/config` | Live pricing configuration |
| `GET /api/reviews` | Google Places reviews |
| `POST /api/inquiries`, `/api/inquiries/chain`, `/api/inquiries/upload` | Inquiry submission |
| `POST /api/sync/dato-to-notion` | **Sanity** → Notion webhook (legacy folder name) |
| `POST /api/sync/notion-to-dato` | Notion → **Sanity** webhook (legacy folder name) |
| `POST /api/webhooks/clerk` | Clerk user events |
| `POST /api/revalidate`, `/api/indexnow` | Cache revalidation, IndexNow submission |
| `GET /api/cron/gold-price` | Daily gold price refresh (Vercel cron, 07:00 UTC) |

> The two `/api/sync/*dato*` routes are named after the CMS this project used
> before Sanity. Both are live and speak to Sanity — the folder names are kept
> only because the webhook URLs are configured externally in Sanity and Notion.

## License

Private.
