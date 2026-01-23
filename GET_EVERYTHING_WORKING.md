# 🚀 Get Everything Working - Complete Guide

## ✅ What You've Done

- ✅ Database set up (Neon)
- ✅ Resend API key added
- ✅ Code deployed

## 🎯 CMS Access URL

**Your Payload CMS Admin Panel:**
```
https://alassali-jewelry.vercel.app/cms
```

## 🔐 Generate PAYLOAD_SECRET

Run this command in your terminal:

```bash
openssl rand -base64 32
```

**Or use this one-time generated secret:**
```bash
# Run this:
openssl rand -base64 32
```

Copy the output (it will look like: `aBc123XyZ...` - about 44 characters)

## 📋 Complete Environment Variables Checklist

Go to **Vercel Dashboard → Your Project → Settings → Environment Variables**

Make sure you have ALL of these:

### 1. PAYLOAD_SECRET ⚠️ (REQUIRED)
```
Value: <paste the output from openssl rand -base64 32>
```
**Generate it:** `openssl rand -base64 32`

### 2. PAYLOAD_PUBLIC_SERVER_URL
```
https://alassali-jewelry.vercel.app
```

### 3. DATABASE_URL ✅ (You have this)
```
postgresql://user:password@host:5432/database
```
(Your Neon connection string)

### 4. RESEND_API_KEY ✅ (You have this)
```
re_xxxxxxxxxxxxx
```
(Your Resend API key)

### 5. SENDER_EMAIL (For inquiries@thedreamsagency.com)
```
Alassali Jewelry <inquiries@thedreamsagency.com>
```

### 6. ADMIN_EMAIL (Where to send inquiry notifications)
```
inquiries@thedreamsagency.com
```

## 🔧 Quick Setup Steps

### Step 1: Generate PAYLOAD_SECRET

```bash
openssl rand -base64 32
```

Copy the output.

### Step 2: Add to Vercel

1. Go to: https://vercel.com/dashboard
2. Click **Alassali-Jewelry** project
3. **Settings** → **Environment Variables**
4. Add/Update these variables:
   - `PAYLOAD_SECRET` = (paste generated secret)
   - `PAYLOAD_PUBLIC_SERVER_URL` = `https://alassali-jewelry.vercel.app`
   - `SENDER_EMAIL` = `Alassali Jewelry <inquiries@thedreamsagency.com>`
   - `ADMIN_EMAIL` = `inquiries@thedreamsagency.com`
   - `DATABASE_URL` = (your Neon connection string) ✅
   - `RESEND_API_KEY` = (your Resend key) ✅

### Step 3: Redeploy

1. In Vercel dashboard
2. Go to **Deployments**
3. Click **⋯** (three dots) on latest deployment
4. Click **Redeploy**
5. Wait for deployment to finish (2-3 minutes)

### Step 4: Access CMS

1. Visit: **https://alassali-jewelry.vercel.app/cms**
2. You should see Payload CMS login page
3. Click **"Create First User"** or **"Sign Up"**
4. Enter:
   - Email: your email
   - Password: choose a strong password
   - Name: your name
5. Click **Create User**

## ✅ Verify Everything Works

After creating admin user:

1. **Test CMS Access:**
   - Visit `/cms` - should see admin dashboard
   - Can navigate collections

2. **Test Database:**
   - Go to Collections → Inquiries
   - Try creating a test inquiry
   - Should save to database

3. **Test Email:**
   - Create a new inquiry
   - Check `inquiries@thedreamsagency.com` inbox
   - Should receive email notification

## 🐛 Troubleshooting

### "Cannot access /cms"
- ✅ Check `PAYLOAD_SECRET` is set in Vercel
- ✅ Verify deployment completed successfully
- ✅ Check Vercel build logs for errors

### "Database connection failed"
- ✅ Verify `DATABASE_URL` is correct
- ✅ Check Neon database is running
- ✅ Ensure connection string includes SSL if required

### "Cannot create user"
- ✅ Check database is connected
- ✅ Verify `PAYLOAD_SECRET` is set
- ✅ Check Vercel function logs

### "Emails not sending"
- ✅ Verify `RESEND_API_KEY` is correct
- ✅ Check `SENDER_EMAIL` format is correct
- ✅ Verify `inquiries@thedreamsagency.com` is verified in Resend
- ✅ Check Resend dashboard for errors

## 📧 Email Configuration

Your emails will be sent:
- **From:** `Alassali Jewelry <inquiries@thedreamsagency.com>`
- **To:** `inquiries@thedreamsagency.com` (admin notifications)
- **Reply-To:** Customer's email (from inquiry form)

**Important:** Make sure `inquiries@thedreamsagency.com` is verified in your Resend account if you want to use it as the sender.

## 🎯 Quick Reference

**CMS URL:** `https://alassali-jewelry.vercel.app/cms`

**Generate Secret:**
```bash
openssl rand -base64 32
```

**Vercel Settings:**
https://vercel.com/dashboard → Your Project → Settings → Environment Variables

## ✅ Final Checklist

- [ ] Generated `PAYLOAD_SECRET` with `openssl rand -base64 32`
- [ ] Added `PAYLOAD_SECRET` to Vercel
- [ ] Added `PAYLOAD_PUBLIC_SERVER_URL` = `https://alassali-jewelry.vercel.app`
- [ ] Added `SENDER_EMAIL` = `Alassali Jewelry <inquiries@thedreamsagency.com>`
- [ ] Added `ADMIN_EMAIL` = `inquiries@thedreamsagency.com`
- [ ] Verified `DATABASE_URL` is set (Neon)
- [ ] Verified `RESEND_API_KEY` is set
- [ ] Redeployed in Vercel
- [ ] Visited `/cms` and created admin user
- [ ] Tested creating an inquiry
- [ ] Verified email was received

## 🎉 You're Done!

Once you complete these steps, your CMS will be fully functional!
