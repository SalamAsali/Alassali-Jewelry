# Environment Audit – Alassali Jewelry

## Vercel Production (sync with local `.env.local`)

| Variable | Required | Notes |
|----------|----------|--------|
| `DATABASE_URL` | ✅ | PostgreSQL (Neon). Use exactly `?sslmode=require` — no duplicate (e.g. `?sslmode=require?sslmode=require`). |
| `PAYLOAD_SECRET` | ✅ | Secure random string. From env only; never committed. |
| `PAYLOAD_PUBLIC_SERVER_URL` | ✅ | `https://alassali-jewelry.vercel.app` |
| `NEXT_PUBLIC_SERVER_URL` | Optional | Fallback if `PAYLOAD_PUBLIC_SERVER_URL` unset. |
| `ENABLE_PUSH_MIGRATIONS` | ✅ | `true` to allow DB table creation. |
| `PAYLOAD_CONFIG_PATH` | ❌ | Not used. Config is `payload.config.ts` at root (`@payload-config`). |

## DATABASE_URL (Neon)

- **SSL**: Must include `?sslmode=require` for Neon.
- **Duplicate fix**: If you accidentally have `?sslmode=require?sslmode=require`, the app sanitizes it at runtime. Prefer fixing it in Vercel env: use exactly `?sslmode=require` once.

## CORS / CSRF

- `payload.config` sets `cors` and `csrf` to `https://alassali-jewelry.vercel.app`, the dynamic `serverURL`, and `http://localhost:3000`.
- No extra env vars needed for CORS/CSRF.

## Digest 3263770923 (server-side exception on `/admin`)

Typically caused by:

1. **Missing DB tables** (`relation "users" does not exist`): Run `GET /api/migrate?run=1` or `POST /api/migrate` once after deploy, then open `/admin`.
2. **Invalid `DATABASE_URL`** (e.g. duplicate `?sslmode=require`): Sanitizer fixes it at runtime; better to correct in Vercel env.
3. **Missing `PAYLOAD_SECRET`**: Must be set in production.
