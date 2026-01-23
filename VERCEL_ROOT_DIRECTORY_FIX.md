# 🔧 Vercel Root Directory Fix

## ❌ Error
```
The specified Root Directory "apps/jewelry-store" does not exist. 
Please update your Project Settings.
```

## 🔍 Problem

Your Vercel project is configured to look for `apps/jewelry-store` (from the `dreams-agency-monorepo`), but `Alassali-Jewelry` is a **separate repository** with a different structure.

The `Alassali-Jewelry` repository structure:
```
Alassali-Jewelry/
├── app/
├── collections/
├── lib/
├── payload.config.ts
├── next.config.mjs
├── package.json
└── ...
```

**NOT:**
```
Alassali-Jewelry/
└── apps/
    └── jewelry-store/  ❌ This doesn't exist!
```

## ✅ Solution: Update Vercel Project Settings

### Step 1: Go to Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Navigate to your **Alassali-Jewelry** project
3. Click on **Settings**

### Step 2: Update Root Directory
1. In Settings, find **"Root Directory"** section
2. Click **"Edit"** or **"Change"**
3. **Clear the field** (remove `apps/jewelry-store`)
4. Leave it **empty** or set it to `.` (root of repository)
5. Click **"Save"**

### Step 3: Redeploy
1. Go to **Deployments** tab
2. Click **"Redeploy"** on the latest deployment
3. Or push a new commit to trigger redeploy

## 📋 Alternative: Check Project Settings

If you can't find Root Directory setting:

1. Go to **Settings** → **General**
2. Look for **"Root Directory"** or **"Project Root"**
3. Make sure it's set to:
   - **Empty** (default)
   - OR **`.`** (current directory)
   - NOT `apps/jewelry-store`

## 🎯 Why This Happened

This likely happened because:
- The Vercel project was originally created for the `dreams-agency-monorepo`
- Or the project settings were copied from another project
- The `Alassali-Jewelry` repository is separate and doesn't have the `apps/jewelry-store` structure

## ✅ After Fixing

Once you update the Root Directory:
- Vercel will look for files in the repository root
- `package.json` will be found at the root
- `next.config.mjs` will be found at the root
- Build should proceed normally

## 🚀 Quick Fix Summary

1. **Vercel Dashboard** → Your Project → **Settings**
2. Find **"Root Directory"**
3. **Clear it** (set to empty or `.`)
4. **Save**
5. **Redeploy**

That's it! The build should work after this change.
