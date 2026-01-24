#!/usr/bin/env bash
# Push Alassali Jewelry (frontend migration) to payload-website-starter repo
# so the new Vercel project deploys our design. Run from project root.
set -e
cd "$(dirname "$0")/.."
REPO="git@github.com:SalamAsali/payload-website-starter.git"
echo "Pushing main to payload-website-starter (no remote added)..."
git push "$REPO" main --force
echo ""
echo "Done. Vercel will deploy from payload-website-starter."
echo "New link: https://payload-website-starter-dreams3.vercel.app"
