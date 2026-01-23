#!/bin/bash
# Commit, push, and trigger Vercel redeploy

set -e
cd /Users/salamalassali/Alassali-Jewelry

echo "=== Committing changes ==="
git add -A
git commit -m "chore: update Payload CMS configuration and documentation" || echo "No changes to commit"

echo ""
echo "=== Pushing to GitHub ==="
git push origin main

echo ""
echo "✅ Pushed to GitHub!"
echo ""
echo "Vercel will automatically redeploy when it detects the push."
echo "You can also manually redeploy in Vercel dashboard:"
echo "  https://vercel.com/dashboard"
echo ""
echo "After deployment, access CMS at:"
echo "  https://alassali-jewelry.vercel.app/cms"
