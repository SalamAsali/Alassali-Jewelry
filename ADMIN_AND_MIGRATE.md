# Admin & /api/migrate Setup

## 1. Environment variables (both Vercel projects)

In **Vercel → Project → Settings → Environment Variables**, set these for **Production** (and Preview if you use it):

| Name | Value |
|------|--------|
| `DATABASE_URL` | Your Neon Postgres URL, ending with `?sslmode=require` (once only) |
| `PAYLOAD_SECRET` | Long random string (e.g. `openssl rand -hex 32`) |
| `ENABLE_PUSH_MIGRATIONS` | `true` |

Optional but recommended:

- `PAYLOAD_PUBLIC_SERVER_URL` = your deployment URL (e.g. `https://alassali-jewelry-dreams3.vercel.app` or `https://payload-website-starter-dreams3.vercel.app`). If unset, Vercel uses `VERCEL_URL` automatically.

**Important:** **payload-website-starter** and **alassali-jewelry** are separate projects. Set the same env vars in **both** if you use both.

## 2. Create database tables

1. Open **`https://<your-deployment>/api/migrate?run=1`** in the browser (same domain as the deployment).
2. You should see JSON: `{ "success": true, "message": "Database tables created successfully", ... }`.
3. If you see `Payload not initialized` or `Push not available`, check `DATABASE_URL` and `ENABLE_PUSH_MIGRATIONS=true`.

## 3. Access Payload admin

1. Go to **`https://<your-deployment>/admin`**.
2. Create your first user (email + password).
3. Log in and manage content.

## 4. If /admin or /api/migrate still fail

- Confirm **Project → Settings → Environment Variables** has `DATABASE_URL`, `PAYLOAD_SECRET`, and `ENABLE_PUSH_MIGRATIONS` for the correct environment.
- Redeploy after changing env vars.
- For **`/api/migrate`** without `?run=1`: you get JSON with usage info. Use **`/api/migrate?run=1`** to run migrations.
