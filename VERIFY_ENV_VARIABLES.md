# Verify Environment Variables - Alassali Jewelry

## ✅ What You Have (From Screenshot)

- ✅ `DATABASE_URL` (All Environments)
- ✅ `DATABASE_URL_UNPOOLED` (Production & Development)
- ✅ `PAYLOAD_SECRET` (All Environments)
- ✅ `RESEND_API_KEY` (All Environments)
- ✅ `NEXT_PUBLIC_CMS_URL` (All Environments)
- ✅ `CLIENT_SECRET` (All Environments)
- ✅ `NEXT_PUBLIC_GA_ID` (All Environments)
- ✅ `DB_SCHEMA` (All Environments)

## ❌ What's Missing (Required for Payload CMS)

### 1. PAYLOAD_PUBLIC_SERVER_URL ⚠️ CRITICAL

**Required for:** Payload CMS admin panel to work correctly

**Add this:**
```
PAYLOAD_PUBLIC_SERVER_URL = https://alassali-jewelry.vercel.app
```

**Environment:** All Environments

### 2. SENDER_EMAIL ⚠️ IMPORTANT

**Required for:** Resend email notifications

**Add this:**
```
SENDER_EMAIL = Alassali Jewelry <inquiries@thedreamsagency.com>
```

**Environment:** All Environments

### 3. ADMIN_EMAIL ⚠️ IMPORTANT

**Required for:** Where inquiry emails are sent

**Add this:**
```
ADMIN_EMAIL = inquiries@thedreamsagency.com
```

**Environment:** All Environments

## 📋 Complete Checklist

### Required for Payload CMS:
- [x] `DATABASE_URL` ✅
- [x] `PAYLOAD_SECRET` ✅
- [ ] `PAYLOAD_PUBLIC_SERVER_URL` ❌ **MISSING - ADD THIS!**
- [x] `RESEND_API_KEY` ✅
- [ ] `SENDER_EMAIL` ❌ **MISSING - ADD THIS!**
- [ ] `ADMIN_EMAIL` ❌ **MISSING - ADD THIS!**

### Optional (You Have):
- `DATABASE_URL_UNPOOLED` ✅ (good to have)
- `NEXT_PUBLIC_CMS_URL` ✅ (if you use it)
- `CLIENT_SECRET` ✅ (if you use it)
- `NEXT_PUBLIC_GA_ID` ✅ (analytics)
- `DB_SCHEMA` ✅ (if you use it)

## 🎯 Add These 3 Variables

Go to Vercel → Settings → Environment Variables → Add:

1. **PAYLOAD_PUBLIC_SERVER_URL**
   - Value: `https://alassali-jewelry.vercel.app`
   - Environment: All Environments

2. **SENDER_EMAIL**
   - Value: `Alassali Jewelry <inquiries@thedreamsagency.com>`
   - Environment: All Environments

3. **ADMIN_EMAIL**
   - Value: `inquiries@thedreamsagency.com`
   - Environment: All Environments

## ✅ After Adding

1. **Redeploy** in Vercel
2. Visit `/cms` to test
3. Create admin user
4. Test inquiry form (should send email)

## 🐛 If CMS Still Doesn't Work

Check:
- ✅ `DATABASE_URL` is correct (from Neon)
- ✅ `PAYLOAD_SECRET` is set (32+ characters)
- ✅ `PAYLOAD_PUBLIC_SERVER_URL` matches your Vercel URL
- ✅ All variables are in "All Environments" or at least "Production"
