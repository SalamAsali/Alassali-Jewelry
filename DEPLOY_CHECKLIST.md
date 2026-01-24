# Deploy Checklist – Alassali Jewelry

## 1. Vercel environment variables (required)

In **Vercel** → Project → **Settings** → **Environment Variables**, set:

| Name | Value | Notes |
|------|--------|--------|
| `DATABASE_URL` | `postgresql://...@....neon.tech/neondb?sslmode=require` | Neon connection string. Use `?sslmode=require` **once** only. |
| `PAYLOAD_SECRET` | `<random secret>` | e.g. `openssl rand -hex 32` |
| `PAYLOAD_PUBLIC_SERVER_URL` | `https://alassali-jewelry.vercel.app` | Your production URL. |
| `ENABLE_PUSH_MIGRATIONS` | `true` | Required for `/api/migrate?run=1` to create tables. |

After changing env vars, **redeploy**.

## 2. Build (no migrate at build)

**Vercel** uses `"buildCommand": "next build"`. We **do not** run `payload migrate` during build because it can fail if the DB is unreachable (e.g. wrong `DATABASE_URL`, Neon paused), which would break deployment.

## 3. Create tables after deploy

**Right after each deploy**, open once:

```
https://alassali-jewelry.vercel.app/api/migrate?run=1
```

You should see:

```json
{ "success": true, "message": "Database tables created successfully", ... }
```

If you see `"Push not available"`, the response includes `pushError` and `pushStack` — check those and ensure `DATABASE_URL` and `ENABLE_PUSH_MIGRATIONS=true` are set in Vercel, then redeploy and try again.

## 4. Open the admin panel

Then go to:

```
https://alassali-jewelry.vercel.app/admin
```

Create your first admin user when prompted.

## 5. If deploy fails

- **Build error:** Check Vercel build logs. The build runs `next build` only (no DB connection).
- **`/admin` "Application error" or blank:** Tables missing. Complete **step 3** (`/api/migrate?run=1`), then open `/admin` again.

---

**Summary:** Set env vars → **Redeploy** → open **`/api/migrate?run=1`** once → then **`/admin`**.
