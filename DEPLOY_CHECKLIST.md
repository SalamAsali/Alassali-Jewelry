# Deploy Checklist – Alassali Jewelry

## 1. Vercel environment variables (required)

In **Vercel** → Project → **Settings** → **Environment Variables**, set:

| Name | Value | Notes |
|------|--------|--------|
| `DATABASE_URL` | `postgresql://...@....neon.tech/neondb?sslmode=require` | Neon connection string. Use `?sslmode=require` **once** only. |
| `PAYLOAD_SECRET` | `<random secret>` | e.g. `openssl rand -hex 32` |
| `PAYLOAD_PUBLIC_SERVER_URL` | `https://alassali-jewelry.vercel.app` | Your production URL. |
| `NEXT_PUBLIC_SERVER_URL` | `https://alassali-jewelry.vercel.app` | Optional fallback. |

**Optional (for `/api/migrate` fallback):** `ENABLE_PUSH_MIGRATIONS` = `true`.

After changing env vars, **redeploy**.

## 2. Build and migrations

**Vercel** uses `vercel.json` → `"buildCommand": "payload migrate && next build"`.

- **`payload migrate`** runs first: applies migration files from `migrations/` and creates tables (e.g. `users`, `media`, `gallery`).
- **`next build`** runs after: builds the app.

So **tables are created during deploy**. You do **not** need to call `/api/migrate?run=1` before using `/admin`, as long as the build succeeds.

## 3. Open the admin panel

After a successful deploy, go to:

```
https://alassali-jewelry.vercel.app/admin
```

Create your first admin user when prompted.

## 4. If build fails (e.g. "cannot connect to Postgres")

- Check **`DATABASE_URL`** in Vercel (correct Neon URL, `?sslmode=require` once).
- Ensure the Neon DB is reachable from Vercel (no IP allowlists blocking it, etc.).

## 5. If you see "Application error" or blank `/admin`

- **Tables missing:** Build may have failed before `payload migrate` completed, or migration failed. Check build logs.
- **Fix:** Ensure all env vars from **step 1** are set, redeploy, and confirm `payload migrate` runs and succeeds in the build logs.

## 6. Fallback: `/api/migrate?run=1`

If you **cannot** run `payload migrate` at build (e.g. old deploy without it), you can still create tables at runtime:

1. Set `ENABLE_PUSH_MIGRATIONS` = `true` in Vercel.
2. Redeploy.
3. Open `https://alassali-jewelry.vercel.app/api/migrate?run=1` once.
4. Then go to `/admin`.

If push fails, the response now includes `pushError` and `pushStack` for debugging.

---

**Summary:** Set Vercel env vars → **Redeploy** (migrations run at build) → open **`/admin`** and create your first user.
