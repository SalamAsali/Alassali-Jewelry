# DatoCMS migration scripts

One-shot scripts to provision every model in `DATOCMS_MODELS.md` and seed it
with the same content the site currently ships as `FALLBACK_*` constants.

All scripts are **idempotent** — safe to re-run. Models/fields/records that
already exist are updated in place, not duplicated.

## Prerequisites

1. A DatoCMS **CMA (Content Management API) token** with write access.
   This is a different token than the read-only CDA token used at runtime.
   Create one at DatoCMS → Settings → API Tokens → New token → role `Admin`
   (or a custom role with schema + records + uploads + environments write).

2. Add the token to `.env.local` at the repo root:

   ```
   DATOCMS_CMA_TOKEN=<your-cma-token>
   ```

   Optional — target a specific environment instead of primary:

   ```
   DATOCMS_ENVIRONMENT=migration-content-polish
   ```

3. Install dependencies (the scripts use `@datocms/cma-client-node`):

   ```
   npm install
   ```

## Run order

```
npm run migrate:models      # creates all 11 models + fields
npm run migrate:uploads     # uploads public/images/portfolio/* to DatoCMS
npm run migrate:records     # creates every record, linking images and categories
```

Or do everything in one shot:

```
npm run migrate:all
```

Output is progress-logged to stdout. Every line says whether a model /
field / record was `created`, `updated`, or `exists` (skipped).

## What each script does

| Script | Purpose |
|---|---|
| `01-models.mjs` | Creates `header`, `footer`, `portfolio_page`, `portfolio_category`, `portfolio_item`, `faq_page`, `faq_category`, `faq_item`, `blog_index`, `blog_post`, `master_jeweller` with the exact fields specified in `DATOCMS_MODELS.md`. |
| `02-uploads.mjs` | Uploads every file in `public/images/portfolio/` to DatoCMS. Writes a filename → upload-id map to `scripts/migrate/.uploads.json` (gitignored). Uses md5 to avoid duplicate uploads on re-run. |
| `03-records.mjs` | Seeds `portfolio_page`, 7 portfolio categories, 23 portfolio items (linked to categories + images), `faq_page`, 4 FAQ categories, 13 FAQ items (linked to categories), `blog_index`, 4 blog posts, 1 `master_jeweller` record (`mohammad-al-assali`), and `footer` copy. Re-runs update in place. |

## Troubleshooting

- **"Missing CMA token"** — add `DATOCMS_CMA_TOKEN` to `.env.local`.
- **"Model <x> not found"** from `03-records.mjs` — run `01-models.mjs` first.
- **"Missing upload map"** from `03-records.mjs` — run `02-uploads.mjs` first.
- **Rate limits** — DatoCMS's CMA is rate-limited. If a script fails with 429,
  wait 60 seconds and re-run; idempotency means no work is lost.
- **Portfolio images missing on the site after seed** — the site reads from
  the environment the CDA token targets. Verify `DATOCMS_API_TOKEN` (read) on
  Vercel points to the same environment as the CMA token used here.

## Known limitations

- `header.nav_items` and `footer.nav_items` aren't migrated — the current
  GraphQL query in `lib/getGlobals.ts` isn't shaped for modular content
  blocks, so nav is still rendered from hardcoded defaults. Wire that up in
  a follow-up if the client wants editable nav.
- Individual blog post bodies and toronto/gta location page copy remain
  hardcoded; only the index listing is CMS-driven.

## Cleanup after running

Once you've verified the production site renders CMS content (visit
`/portfolio`, `/faq`, `/blog`, `/about/master-jeweller/mohammad-al-assali`):

1. Delete the CMA token in DatoCMS → Settings → API Tokens.
2. Remove `DATOCMS_CMA_TOKEN` from `.env.local`.
3. Optionally delete the stale DatoCMS environments (`migration-setup`,
   `migration-setup-v2`) from Settings → Environments.
