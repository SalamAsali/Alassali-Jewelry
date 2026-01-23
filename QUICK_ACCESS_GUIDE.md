# 🚀 Quick Access Guide - Alassali Jewelry CMS

## Current Status: ✅ Code Deployed, ⏳ Environment Setup Needed

Your Payload CMS code is **pushed to GitHub and deployed to Vercel**, but you need to add environment variables before accessing the CMS.

## 🎯 Access the CMS

**URL:** `https://alassali-jewelry.vercel.app/cms`

**But first, you MUST add these environment variables in Vercel:**

## 📋 Required Environment Variables

1. **PAYLOAD_SECRET** - Generate with: `openssl rand -base64 32`
2. **PAYLOAD_PUBLIC_SERVER_URL** - `https://alassali-jewelry.vercel.app`
3. **DATABASE_URL** - Your PostgreSQL connection string
4. **RESEND_API_KEY** - From https://resend.com
5. **SENDER_EMAIL** - `Alassali Jewelry <noreply@alassalijewelry.com>`
6. **ADMIN_EMAIL** - `inquiries@alassalijewelry.com`

## ⚡ Quick Setup (5 minutes)

### 1. Generate PAYLOAD_SECRET
```bash
openssl rand -base64 32
```

### 2. Get Database
- Sign up at https://neon.tech (free)
- Create database
- Copy connection string

### 3. Get Resend API Key
- Sign up at https://resend.com (free)
- Get API key from dashboard

### 4. Add to Vercel
- Go to Vercel dashboard
- Project → Settings → Environment Variables
- Add all 6 variables above

### 5. Redeploy
- Click "Redeploy" in Vercel
- Wait for deployment

### 6. Access CMS
- Visit: `https://alassali-jewelry.vercel.app/cms`
- Create admin user
- Done! 🎉

## 📍 Where to Add Variables

**Vercel Dashboard:**
1. https://vercel.com/dashboard
2. Click your **Alassali-Jewelry** project
3. **Settings** → **Environment Variables**
4. Add each variable
5. **Redeploy**

## ✅ After Setup

Once environment variables are set and deployed:
- CMS available at: `/cms`
- Admin login at: `/cms`
- API endpoints at: `/api/payload/*`

## 🆘 Need Help?

See `HOW_TO_ACCESS_CMS.md` for detailed instructions.
