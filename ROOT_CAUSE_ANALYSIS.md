# Root Cause Analysis: Payload Loading Loop

## 1. What’s Going Wrong

- **Symptom:** `relation "users" does not exist` → DB has no Payload tables.
- **Effect:** `/admin` and other Payload features fail because the schema was never created.

## 2. How Tables Are Supposed to Be Created

Two mechanisms:

1. **`push` (pushDevSchema)**  
   - Used in **development**.  
   - Syncs schema from code to DB (creates/alters tables).  
   - Can show **interactive prompts** (e.g. `prompts`) when there are warnings or data‑loss risks.

2. **`migrate` (migration files)**  
   - Used in **production**.  
   - Runs migration files from `migrations/` (e.g. `up`).  
   - No push, no interactive prompts.

## 3. Root Cause #1: Adapter Never Pushes in Production

**Code:** `@payloadcms/db-postgres` → `connect.js`:

```js
// Only push schema if not in production
if (process.env.NODE_ENV !== 'production' && process.env.PAYLOAD_MIGRATING !== 'true' && this.push !== false) {
  await pushDevSchema(this);
}
if (process.env.NODE_ENV === 'production' && this.prodMigrations) {
  await this.migrate({ migrations: this.prodMigrations });
}
```

- **Push:** Runs **only** when `NODE_ENV !== 'production'`.  
  → On Vercel, `NODE_ENV === 'production'`, so **push is never run**.
- **Migrate:** Runs only when `this.prodMigrations` is set.  
  → We don’t pass `prodMigrations`; the adapter uses `readMigrationFiles` from `migrationDir` when doing `migrate()`.  
  → Our `migrations/` is effectively empty (no migration files).  
  → Result: **no migrations run**, **no tables created**.

So in production:

- No push.
- No migrations (no files).
- **Tables are never created.**

## 4. Root Cause #2: CLI Config Load Fails → No Migrations Generated

We run `payload migrate:create initial` to **generate** migration files.  
That loads `payload.config.ts`, which does:

```ts
import { Users } from './collections/Users'
```

The Payload CLI runs the config via **tsx** (see `node_modules/payload/bin.js`).  
We get:

```
Error [ERR_MODULE_NOT_FOUND]: Cannot find module '.../collections/Users' imported from payload.config.ts
```

- Config is **found** (e.g. `findConfig`), but **import resolution** of `./collections/Users` fails when the CLI runs it.
- Without a loadable config, **`payload migrate:create`** (and `payload migrate`) **cannot run**.
- So we **never generate** migration files, and **never** run them.

## 5. Root Cause #3: /api/migrate Errors Are Hidden

Our `/api/migrate` route calls `pushDevSchema(adapter)` to create tables at runtime.  
In `runPush` we have:

```ts
try {
  await pushDevSchema(adapter)
  return { ok: true, method: 'pushDevSchema(adapter)' }
} catch {
  return { ok: false, method: '' }  // error swallowed
}
```

- Any error from `pushDevSchema` is **caught and discarded**.
- We return “Push not available” but **don’t log or return the real error**.
- So we can’t see **why** push fails (e.g. prompts in serverless, DB, drizzle‑kit, etc.).

## 6. Root Cause #4: pushDevSchema Uses Interactive Prompts

**Code:** `@payloadcms/drizzle` → `pushDevSchema.js`:

- Uses `prompts` (e.g. `confirm`) when there are **warnings** or **data‑loss** hints.
- On Vercel (serverless, **no TTY**), interactive prompts can **hang or fail**.
- So even if we call `pushDevSchema` from `/api/migrate`, it can break in production when drizzle wants to “confirm” something.

## 7. Summary of the Loop

| Step | What we do | What actually happens |
|------|------------|------------------------|
| Deploy | Vercel build → `next build` | No migrations, no push. |
| Production | Adapter `connect` | No push (prod), no migration files → no tables. |
| Hit `/admin` | Payload queries `users` | `relation "users" does not exist`. |
| Hit `/api/migrate?run=1` | We call `pushDevSchema` | May fail (prompts, etc.); we hide the error. |
| Try `payload migrate:create` | Generate migrations | Config import fails → CLI fails. |
| Try `payload migrate && next build` | Run migrations at build | Same CLI config failure → build fails. |

So we’re stuck:

- **Production** never creates tables (no push, no migrations).
- **CLI** can’t run (config load fails).
- **Runtime push** via `/api/migrate` can fail, and we don’t see why.

## 8. Fixes Applied

1. **Config resolution (CLI):**
   - **`payload.config.ts`**: Use explicit **`.ts`** extensions in imports (e.g. `./collections/Users.ts`, `./lib/db.ts`) so the Payload CLI (tsx) can resolve them when loading the config.
   - **Collections**: Change `import { CollectionConfig } from 'payload/types'` → `import type { CollectionConfig } from 'payload'`. The package does not export `payload/types`; it led to `ERR_PACKAGE_PATH_NOT_EXPORTED`.

2. **Initial migration:**
   - Run **`pnpm payload migrate:create initial`**. This now works and generates `migrations/20260124_050508_initial.ts` (and `.json`), which creates `users`, `media`, `gallery`, etc.

3. **Build and Vercel:**
   - **`package.json`** `"build": "next build"` for local (no DB required).
   - **`vercel.json`** `"buildCommand": "payload migrate && next build"` so **Vercel runs migrations before the app build**. Tables are created at deploy time.

4. **`/api/migrate`:**
   - **Log** and **return** `pushError` and `pushStack` when `pushDevSchema` fails, so we can debug if we ever fall back to runtime push.

5. **`tsconfig.json`:**
   - **`"baseUrl": "."`** for path resolution (kept for consistency).

---

**Bottom line:**  
Tables didn’t exist because **production never ran push** and **never ran migrations** (no files). We couldn’t generate migrations because **the CLI couldn’t load the config** (extension resolution + `payload/types`).  
With **`.ts` extensions**, **`import from 'payload'`**, **`migrate:create initial`**, and **`payload migrate && next build`** on Vercel, migrations run at deploy, tables are created, and Payload loads correctly.
