# 🚀 Deploy Commands

## Quick Deploy (Copy & Paste)

```bash
cd /Users/salamalassali/Alassali-Jewelry
git add -A
git commit -m "chore: update configuration"
git push origin main
```

## Or Use the Script

```bash
bash /Users/salamalassali/Alassali-Jewelry/commit_and_deploy.sh
```

## What Happens

1. **Commits** all changes
2. **Pushes** to GitHub
3. **Vercel automatically detects** the push and redeploys
4. **Wait 2-3 minutes** for deployment
5. **Access CMS** at: `https://alassali-jewelry.vercel.app/cms`

## Manual Redeploy (If Needed)

If automatic redeploy doesn't work:

1. Go to: https://vercel.com/dashboard
2. Click **Alassali-Jewelry** project
3. Go to **Deployments**
4. Click **⋯** (three dots) on latest deployment
5. Click **Redeploy**
