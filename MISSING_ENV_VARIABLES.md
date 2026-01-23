# ❌ Missing Environment Variables

## ✅ What You Have (Good!)

- ✅ `DATABASE_URL` (All Environments)
- ✅ `DATABASE_URL_UNPOOLED` (Production & Development)
- ✅ `PAYLOAD_SECRET` (All Environments)
- ✅ `RESEND_API_KEY` (All Environments)
- ✅ `NEXT_PUBLIC_CMS_URL` (All Environments)
- ✅ `CLIENT_SECRET` (All Environments)
- ✅ `NEXT_PUBLIC_GA_ID` (All Environments)
- ✅ `DB_SCHEMA` (All Environments)

## ❌ What's Missing (Add These!)

### 1. PAYLOAD_PUBLIC_SERVER_URL ⚠️ CRITICAL

**Why:** Payload CMS needs this to know its server URL for the admin panel.

**Add to Vercel:**
```
Name: PAYLOAD_PUBLIC_SERVER_URL
Value: https://alassali-jewelry.vercel.app
Environment: All Environments
```

### 2. SENDER_EMAIL ⚠️ IMPORTANT

**Why:** Resend needs this to send inquiry notification emails.

**Add to Vercel:**
```
Name: SENDER_EMAIL
Value: Alassali Jewelry <inquiries@thedreamsagency.com>
Environment: All Environments
```

### 3. ADMIN_EMAIL ⚠️ IMPORTANT

**Why:** Where inquiry emails are sent when someone submits a form.

**Add to Vercel:**
```
Name: ADMIN_EMAIL
Value: inquiries@thedreamsagency.com
Environment: All Environments
```

## 🎯 Quick Add (3 Steps)

1. **Go to Vercel** → Your project → **Settings** → **Environment Variables**
2. **Click "Add"** and add each variable above
3. **Redeploy** after adding

## ✅ After Adding

Once you add these 3 variables and redeploy:
- ✅ Payload CMS admin panel will work at `/cms`
- ✅ Email notifications will send correctly
- ✅ Everything will be fully functional

## 📋 Complete Checklist

**Required for Payload CMS:**
- [x] `DATABASE_URL` ✅
- [x] `PAYLOAD_SECRET` ✅
- [ ] `PAYLOAD_PUBLIC_SERVER_URL` ❌ **ADD THIS**
- [x] `RESEND_API_KEY` ✅
- [ ] `SENDER_EMAIL` ❌ **ADD THIS**
- [ ] `ADMIN_EMAIL` ❌ **ADD THIS**

**You're 3 variables away from being complete!**
