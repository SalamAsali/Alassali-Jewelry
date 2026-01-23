# How to Access Payload CMS Admin Panel

## ✅ Setup Status

Your code is **pushed to GitHub** and ready! But you need to complete these steps before accessing the CMS:

## 🔐 Step 1: Add Environment Variables to Vercel

**CRITICAL:** The CMS won't work without these environment variables.

1. Go to your Vercel project: https://vercel.com/dashboard
2. Select the **Alassali-Jewelry** project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

### Required Variables:

```env
# Payload CMS Secret (generate a random 32+ character string)
PAYLOAD_SECRET=<run: openssl rand -base64 32>

# Server URL
PAYLOAD_PUBLIC_SERVER_URL=https://alassali-jewelry.vercel.app

# PostgreSQL Database
DATABASE_URL=postgresql://user:password@host:5432/database

# Resend Email Service
RESEND_API_KEY=re_xxxxxxxxxxxxx
SENDER_EMAIL=Alassali Jewelry <noreply@alassalijewelry.com>
ADMIN_EMAIL=inquiries@alassalijewelry.com
```

### How to Generate PAYLOAD_SECRET:

Run this command:
```bash
openssl rand -base64 32
```

Copy the output and use it as `PAYLOAD_SECRET`.

## 🗄️ Step 2: Set Up PostgreSQL Database

You need a PostgreSQL database. Options:

1. **Neon** (Recommended - Free tier available):
   - Go to https://neon.tech
   - Create account and database
   - Copy connection string
   - Add as `DATABASE_URL` in Vercel

2. **Supabase** (Free tier available):
   - Go to https://supabase.com
   - Create project
   - Get connection string from Settings → Database
   - Add as `DATABASE_URL` in Vercel

3. **Other PostgreSQL providers** work too!

## 📧 Step 3: Set Up Resend

1. Go to https://resend.com
2. Create account
3. Get API key from dashboard
4. Add as `RESEND_API_KEY` in Vercel
5. (Optional) Verify your domain for custom sender email

## 🚀 Step 4: Redeploy on Vercel

After adding environment variables:

1. Go to Vercel dashboard
2. Click **Deployments**
3. Click **Redeploy** on the latest deployment
4. Or push a new commit to trigger redeploy

## 🎯 Step 5: Access CMS Admin Panel

Once deployed with environment variables:

1. Visit: **https://alassali-jewelry.vercel.app/cms**
2. You'll see the Payload CMS login page
3. Click **"Create First User"** or **"Sign Up"**
4. Create your admin account:
   - Email: your email
   - Password: choose a strong password
   - Name: your name

## ✅ You're Done!

After creating the admin user, you can:
- Manage inquiries
- Upload gallery images
- Configure form fields
- Manage media files
- View all collections

## 🐛 Troubleshooting

**"Cannot access /cms":**
- Check environment variables are set in Vercel
- Verify `PAYLOAD_SECRET` is set
- Check Vercel build logs for errors

**"Database connection failed":**
- Verify `DATABASE_URL` is correct
- Check database is accessible
- Ensure SSL is enabled if required

**"Cannot create user":**
- Check database is connected
- Verify `PAYLOAD_SECRET` is set
- Check Vercel logs for errors

## 📝 Quick Checklist

- [ ] Environment variables added to Vercel
- [ ] PostgreSQL database created and connected
- [ ] Resend API key added
- [ ] Vercel deployment successful
- [ ] Visit `/cms` and create admin user
- [ ] Test creating an inquiry
- [ ] Verify email notifications work

## 🎉 That's It!

Once you complete these steps, your CMS will be fully functional!
