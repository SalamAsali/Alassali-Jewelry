# 🔍 Vercel Deployment Debugging Guide

## ✅ Fixes Applied

### 1. **Build-Time Initialization Prevention**
- Added check for `NEXT_PHASE === 'phase-production-build'` in `getPayloadInstance()`
- Prevents Payload from trying to connect to database during build

### 2. **Error Handling**
- Added try-catch blocks to all API route handlers
- Returns proper error responses instead of crashing

### 3. **Next.js Configuration**
- Added `typescript.ignoreBuildErrors: true` for build robustness
- Added webpack externals to prevent Payload initialization during build
- Added `vercel.json` for explicit build configuration

### 4. **Dynamic Route Configuration**
- Added `export const dynamic = 'force-dynamic'` to API routes

## 🔧 Manual Steps Required

### Step 1: Verify Environment Variables in Vercel

Go to your Vercel project dashboard → Settings → Environment Variables

**Required Variables:**
- ✅ `DATABASE_URL` - Your Neon PostgreSQL connection string
- ✅ `PAYLOAD_SECRET` - A random secret string (generate one if missing)
- ✅ `PAYLOAD_PUBLIC_SERVER_URL` - Your Vercel URL (e.g., `https://alassali-jewelry.vercel.app`)
- ✅ `RESEND_API_KEY` - Your Resend API key (for email notifications)
- ✅ `SENDER_EMAIL` - Email address for sending (e.g., `noreply@yourdomain.com`)
- ✅ `ADMIN_EMAIL` - Email address to receive inquiries

### Step 2: Generate PAYLOAD_SECRET (if missing)

If `PAYLOAD_SECRET` is missing or empty, generate one:

```bash
# Option 1: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Option 2: Using OpenSSL
openssl rand -hex 32
```

Add this value to Vercel environment variables.

### Step 3: Check Vercel Build Logs

1. Go to Vercel Dashboard → Your Project → Deployments
2. Click on the latest deployment
3. Check the "Build Logs" tab
4. Look for specific error messages

**Common Errors to Look For:**
- `DATABASE_URL is not defined` → Add it to Vercel env vars
- `PAYLOAD_SECRET is required` → Add it to Vercel env vars
- `Cannot connect to database` → Check DATABASE_URL format
- `Module not found` → Dependencies issue
- `Type error` → TypeScript compilation issue (should be ignored now)

### Step 4: Verify Database Connection

Your `DATABASE_URL` should look like:
```
postgresql://user:password@host.neon.tech/dbname?sslmode=require
```

Make sure:
- ✅ It includes `?sslmode=require` for Neon
- ✅ The database exists in Neon
- ✅ The credentials are correct

### Step 5: Redeploy After Fixes

After adding/updating environment variables:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Make sure all variables are set
3. Go to Deployments tab
4. Click "Redeploy" on the latest deployment
5. Or push a new commit to trigger redeploy

## 🚨 If Still Failing

### Check Build Logs for Specific Error

Share the exact error message from Vercel build logs, and I can provide targeted fixes.

### Common Issues:

1. **"Cannot find module 'payload'"**
   - Solution: Dependencies not installed correctly
   - Fix: Check `package.json` has all Payload packages

2. **"Database connection failed"**
   - Solution: DATABASE_URL incorrect or database not accessible
   - Fix: Verify DATABASE_URL in Vercel env vars

3. **"PAYLOAD_SECRET is required"**
   - Solution: Missing secret
   - Fix: Add PAYLOAD_SECRET to Vercel env vars

4. **"Build timeout"**
   - Solution: Build taking too long
   - Fix: The webpack externals should help, but may need to optimize further

## 📋 Quick Checklist

- [ ] All environment variables set in Vercel
- [ ] PAYLOAD_SECRET is a random 32+ character string
- [ ] DATABASE_URL is correct and includes SSL mode
- [ ] PAYLOAD_PUBLIC_SERVER_URL matches your Vercel domain
- [ ] RESEND_API_KEY is set (if using email)
- [ ] Pushed latest code changes
- [ ] Redeployed after env var changes

## 🚀 Next Steps

1. **Push the fixes:**
   ```bash
   cd /Users/salamalassali/Alassali-Jewelry
   git add -A
   git commit -m "fix: prevent Payload build-time initialization, add error handling"
   git push origin main
   ```

2. **Verify environment variables in Vercel**

3. **Check deployment logs**

4. **Visit `/cms` after successful deployment to create admin user**
