# 🔍 Environment Variables Clarification

## Understanding DATABASE_URL vs DATABASE_URL_UNPOOLED

### What Payload CMS Uses
Payload CMS **only uses `DATABASE_URL`** (not `DATABASE_URL_UNPOOLED`).

Looking at `payload.config.ts`:
```typescript
db: postgresAdapter({
  pool: {
    connectionString: process.env.DATABASE_URL || 'postgresql://localhost:5432/jewelry',
  },
}),
```

### Your Current Setup

You have:
- ✅ `DATABASE_URL` - **This is what Payload uses** (needs to be fixed - remove `psql '` prefix)
- ⚠️ `DATABASE_URL_UNPOOLED` (Production) - Not used by Payload
- ⚠️ `DATABASE_URL_UNPOOLED` (Preview) - Not used by Payload

## Recommendation

### Option 1: Keep Both DATABASE_URL_UNPOOLED (Recommended)
**Keep both `DATABASE_URL_UNPOOLED` variables** if:
- You use them elsewhere in your codebase
- You want them for reference/documentation
- You might use them in the future

**But ensure:**
- `DATABASE_URL` is set correctly for **each environment** (Production, Preview, Development)
- `DATABASE_URL` should use the **pooler** version (better for serverless/Vercel)

### Option 2: Remove Both DATABASE_URL_UNPOOLED
**Remove both** if:
- You're not using them anywhere
- You want to simplify your environment variables

## ✅ Correct Setup

### For Production Environment:
- `DATABASE_URL` = `postgresql://neondb_owner:npg_H5KuwLQ7MJYb@ep-proud-cake-ahigfwk3-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
- `DATABASE_URL_UNPOOLED` (Production) = Keep if you want, or remove
- `DATABASE_URL_UNPOOLED` (Preview) = Keep if you want, or remove

### For Preview Environment:
- `DATABASE_URL` = Should be set to your preview database (if you have one)
- Or use the same as production (if you share the database)

### For Development Environment:
- `DATABASE_URL` = Your local database or development database

## 📋 Action Items

1. **Fix DATABASE_URL for Production:**
   - Remove `psql '` prefix and trailing `'`
   - Ensure it's set for Production environment

2. **Set DATABASE_URL for Preview (if different):**
   - If you have a separate preview database, add it
   - If not, you can use the same as production

3. **Set DATABASE_URL for Development (optional):**
   - Add if you want a separate dev database

4. **DATABASE_URL_UNPOOLED:**
   - ✅ **Keep both** if you use them elsewhere
   - ❌ **Remove both** if you don't use them

## 🎯 Summary

- **DATABASE_URL** = What Payload CMS uses (MUST be set correctly for each environment)
- **DATABASE_URL_UNPOOLED** = Optional, keep if you use it, remove if you don't

The key is making sure `DATABASE_URL` is correct for Production, Preview, and Development environments!
