#!/bin/bash

# Complete Setup Script for Alassali Jewelry
# Run this to install dependencies, test build, and prepare for deployment

set -e

echo "🚀 Alassali Jewelry - Complete Setup"
echo "===================================="
echo ""

cd /Users/salamalassali/Alassali-Jewelry

echo "📦 Step 1: Installing dependencies..."
npm install

echo ""
echo "🔨 Step 2: Testing build..."
npm run build

echo ""
echo "✅ Build successful!"
echo ""
echo "📝 Step 3: Committing changes..."
git add -A
git commit -m "feat: complete frontend conversion to Next.js, integrate with Payload CMS" || echo "No changes to commit"

echo ""
echo "🚀 Step 4: Ready to push!"
echo ""
echo "Run this to deploy:"
echo "  git push origin main"
echo ""
echo "Then:"
echo "  1. Visit your Vercel URL"
echo "  2. Go to /cms to access Payload admin"
echo "  3. Create gallery items in Payload"
echo "  4. View them on your website!"
echo ""
