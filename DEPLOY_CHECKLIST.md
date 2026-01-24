# Deploy Checklist – Alassali Jewelry

## 1. Vercel environment variables

Set these in your Vercel project (Settings → Environment Variables):

| Variable | Required | Notes |
|----------|----------|--------|
| `DATABASE_URL` | ✅ | PostgreSQL connection string (e.g. Neon) |
| `PAYLOAD_SECRET` | ✅ | Random secret, e.g. `openssl rand -hex 32` |
| `PAYLOAD_PUBLIC_SERVER_URL` | ✅ | `https://alassali-jewelry.vercel.app` |
| `ENABLE_PUSH_MIGRATIONS` | ✅ | `true` (enables DB table creation) |

`NEXT_PUBLIC_SERVER_URL` is also supported as a fallback if you use that instead.

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

## 4. If you see “Application error” or blank /admin

- The `relation "users" does not exist` (and similar) errors mean **tables are missing**.
- Fix: complete **step 2** (visit `/api/migrate?run=1`), then try `/admin` again.
- Ensure `ENABLE_PUSH_MIGRATIONS=true` and `DATABASE_URL` are set in Vercel.

## 5. No custom middleware

There is no `middleware.ts` in this project. Payload and Next.js routing are used as-is, so there are no middleware-related conflicts.

---

**Summary:** Set env vars → deploy → open `/api/migrate?run=1` once → then use `/admin`.
