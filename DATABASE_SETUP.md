# Database Setup - Payload CMS

## Issue
Getting error: `"Failed query: select count(*) from \"gallery\""`

This means the database tables haven't been created yet.

## Solution

### Option 1: Run Payload Migrations (Recommended)

Payload CMS needs to create the database tables. Run this command:

```bash
cd /Users/salamalassali/Alassali-Jewelry
npx payload migrate
```

This will:
- Create all database tables for your collections
- Set up the schema
- Make the CMS functional

### Option 2: Auto-Migration on First Request

Payload 3.0 might auto-migrate on first request. Try:
1. Access `/cms` again
2. Click on a collection
3. If it still fails, run the migration command above

### Option 3: Check Database Connection

Make sure your `DATABASE_URL` in Vercel is correct:
- Should be: `postgresql://user:pass@host/db?sslmode=require`
- Should NOT have: `psql '` prefix
- Should be the pooled connection string

## After Migration

Once tables are created:
- ✅ Collections will load in admin UI
- ✅ You can create/edit/delete items
- ✅ Count queries will work
- ✅ All CMS features functional

## Manual Steps

1. **Run migration locally** (if you have database access):
   ```bash
   npx payload migrate
   ```

2. **Or let Vercel handle it**:
   - On first API request, Payload might auto-migrate
   - Check Vercel logs for migration messages

3. **Verify tables exist**:
   - Check Neon dashboard
   - Look for tables: `gallery`, `pages`, `homepage`, `media`, `inquiries`, `users`, `form_fields`

## Next Steps

1. Push current changes: `git push origin main`
2. After deployment, try accessing `/cms` again
3. If still failing, run `npx payload migrate` locally or check Vercel logs
