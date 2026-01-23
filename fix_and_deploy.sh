#!/bin/bash
# Fix errors and redeploy

set -e
cd /Users/salamalassali/Alassali-Jewelry

echo "=== Fixing errors ==="
echo "✅ Updated API route handler for Payload 3.0"
echo "✅ Fixed Payload secret fallback"

echo ""
echo "=== Committing fixes ==="
git add -A
git commit -m "fix: update Payload API route handler and configuration" || echo "No changes to commit"

echo ""
echo "=== Pushing to GitHub ==="
git push origin main

echo ""
echo "✅ Pushed! Vercel will automatically redeploy."
echo ""
echo "Wait 2-3 minutes, then access CMS at:"
echo "  https://alassali-jewelry.vercel.app/cms"
