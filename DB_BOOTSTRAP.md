# Database bootstrap (relation "users" does not exist)

## Root cause

`relation "users" does not exist` means **no Payload tables exist** yet. The DB is empty.

## What’s in place

1. **`payload.config`**
   - Uses **`DATABASE_URL`** only (no `channel_binding` or other terminal-only flags).
   - `lib/db.sanitizeDatabaseUrl()` strips `channel_binding` and fixes duplicate `?sslmode=require`.
   - **`push: true`** (temporary) to allow schema sync.
   - **`migrationDir`** → `./migrations`.

2. **Build**
   - `"build": "next build"` (and Vercel `buildCommand`: `next build`).  
   - **`payload migrate && next build`** is not used because `payload migrate` fails (see below) before connecting to the DB.

3. **`/api/migrate?run=1`**
   - Calls `pushDevSchema` to create tables at runtime. **Use this after deploy** to bootstrap.

## `payload migrate` / `migrate:create` failing

`payload migrate` and `payload migrate:create initial` fail with:

```
Error [ERR_MODULE_NOT_FOUND]: Cannot find module '.../collections/Users' imported from payload.config.ts
```

Payload runs the config with **tsx** + ESM; resolution of `./collections/Users` fails outside Next.js. So **CLI-based** migrate does not work until that’s fixed. The build never reaches a DB connection step.

## What to do (bootstrap tables)

1. Set **Vercel env**: `DATABASE_URL`, `ENABLE_PUSH_MIGRATIONS=true`, `PAYLOAD_SECRET`, `PAYLOAD_PUBLIC_SERVER_URL`.
2. Deploy (`next build`).
3. Open **`https://<your-domain>/api/migrate?run=1`** once.
4. Then use **`/admin`** and create your first user.

## Verify locally

```bash
pnpm build
```

Uses `next build` only. Build succeeds; no DB connection during build. Bootstrap via **`/api/migrate?run=1`** after deploy.

## Summary

- **Config**: `DATABASE_URL` only, no `channel_binding`, `push: true`, `migrationDir` set.
- **Bootstrap**: Use **`/api/migrate?run=1`** after deploy. Re-enable **`payload migrate && next build`** only after fixing Payload CLI config resolution.
- **`push: true`**: Temporary; can set back to `false` after tables exist and migrations are used.
