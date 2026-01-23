#!/bin/bash

# Complete deployment and table creation script
# Run this in your terminal

echo "🚀 Step 1: Pushing changes to deploy..."
cd /Users/salamalassali/Alassali-Jewelry
git push origin main

echo ""
echo "⏳ Step 2: Waiting for Vercel deployment (30 seconds)..."
sleep 30

echo ""
echo "📊 Step 3: Creating database tables..."
echo "   (Replace 'alassali-jewelry.vercel.app' with your actual Vercel URL if different)"
curl -X POST https://alassali-jewelry.vercel.app/api/migrate

echo ""
echo "✅ Step 4: Verifying tables were created..."
curl https://alassali-jewelry.vercel.app/api/payload/gallery?limit=0

echo ""
echo "🎉 Done! Check your admin panel at: https://alassali-jewelry.vercel.app/admin"
