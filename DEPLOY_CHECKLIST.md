# Deploy Checklist – Alassali Jewelry

## 1. Vercel environment variables (all required)

In **Vercel** → Project → **Settings** → **Environment Variables**, add **every** variable below.  
**Name** and **Value** must match exactly (including `ENABLE_PUSH_MIGRATIONS` = `true`).

| Name | Value | Notes |
|------|--------|--------|
| `DATABASE_URL` | `postgresql://...@....neon.tech/neondb?sslmode=require` | Neon connection string. End with `?sslmode=require` **once** — no `?sslmode=require?sslmode=require` or `requireneondb`. |
| `ENABLE_PUSH_MIGRATIONS` | `true` | Literal string `true`. Required for `/api/migrate?run=1` to create tables. |
| `PAYLOAD_SECRET` | `<random secret>` | e.g. `openssl rand -hex 32` |
| `PAYLOAD_PUBLIC_SERVER_URL` | `https://alassali-jewelry.vercel.app` | Your production URL. |
| `NEXT_PUBLIC_SERVER_URL` | `https://alassali-jewelry.vercel.app` | Optional fallback; can match above. |

`PAYLOAD_CONFIG_PATH` is **not** used. After changing env vars, **redeploy** (e.g. trigger a new deployment).

## 2. Create database tables (do this once after each deploy)

Before using the admin panel, create the Payload tables:

**Option A – Browser**  
Open:

```
https://alassali-jewelry.vercel.app/api/migrate?run=1
```

You should see something like:

```json
{ "success": true, "message": "Database tables created successfully", ... }
```

**Option B – cURL**

```bash
curl "https://alassali-jewelry.vercel.app/api/migrate?run=1"
# or
curl -X POST "https://alassali-jewelry.vercel.app/api/migrate"
```

## 3. Open the admin panel

Go to:

```
https://alassali-jewelry.vercel.app/admin
```

Create your first admin user when prompted.

## 4. If you see “Application error” (Digest 3263770923) or blank /admin

- Usually means **tables are missing** (`relation "users" does not exist`) or **Payload not initialized**.
- **Fix:** Complete **step 2** (open `/api/migrate?run=1`), then open `/admin` again.
- Ensure **all** vars from **step 1** are set in Vercel and you **redeployed** after adding them.

## 5. If you see “Push not available” from `/api/migrate?run=1`

- The response includes `diagnostics`: `hasDatabaseUrl`, `enablePushMigrations`, `nodeEnv`.
- **Fix:**
  1. Set `DATABASE_URL` in Vercel (Neon URL ending with `?sslmode=require` once).
  2. Set `ENABLE_PUSH_MIGRATIONS` = `true` in Vercel (exact name and value).
  3. **Redeploy** (env vars apply to new deployments only).
  4. Call `/api/migrate?run=1` again.

## 6. No custom middleware

There is no `middleware.ts` in this project. Payload and Next.js routing are used as-is.

---

**Summary:** Add **all** Vercel env vars → **Redeploy** → open `/api/migrate?run=1` once → then `/admin`.
