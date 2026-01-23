# ⚡ Quick Start - Get CMS Working

## 🎯 CMS URL

**Access your Payload CMS here:**
```
https://alassali-jewelry.vercel.app/cms
```

## 🔐 Generate PAYLOAD_SECRET (Do This Now)

Run this command:

```bash
openssl rand -base64 32
```

**Copy the output** - it will be a long random string like:
```
aBc123XyZ456DeF789GhI012JkL345MnO678PqR901StU234VwX567YzA890
```

## 📋 Add to Vercel (2 minutes)

1. Go to: https://vercel.com/dashboard
2. Click **Alassali-Jewelry** project
3. **Settings** → **Environment Variables**
4. Add/Update:

```
PAYLOAD_SECRET = <paste the generated secret>
PAYLOAD_PUBLIC_SERVER_URL = https://alassali-jewelry.vercel.app
SENDER_EMAIL = Alassali Jewelry <inquiries@thedreamsagency.com>
ADMIN_EMAIL = inquiries@thedreamsagency.com
```

(You already have DATABASE_URL and RESEND_API_KEY ✅)

## 🚀 Redeploy

1. In Vercel dashboard
2. **Deployments** → Click **⋯** → **Redeploy**
3. Wait 2-3 minutes

## ✅ Access CMS

1. Visit: **https://alassali-jewelry.vercel.app/cms**
2. Click **"Create First User"**
3. Enter email, password, name
4. **Done!** 🎉

## 📧 Email Setup

Emails will be sent:
- **From:** `Alassali Jewelry <inquiries@thedreamsagency.com>`
- **To:** `inquiries@thedreamsagency.com` (when new inquiry is created)

Make sure `inquiries@thedreamsagency.com` is verified in Resend if needed.
