#!/bin/bash
# deploy.sh — Deploy plays.muonnoi.org to Cloudflare Pages
# Prerequisites: npm install -g wrangler (or npx wrangler)
#                CLOUDFLARE_API_TOKEN set in environment
# Usage: bash plays/deploy.sh

set -euo pipefail

cd "$(dirname "$0")"

echo "=== Deploying plays.muonnoi.org ==="
echo "Project: plays-muonnoi"
echo "Directory: $(pwd)"
echo ""

# Verify files exist
if [ ! -f "index.html" ]; then
  echo "ERROR: index.html not found in $(pwd)"
  exit 1
fi
if [ ! -f "assets/catalog.js" ]; then
  echo "ERROR: assets/catalog.js not found"
  exit 1
fi
if [ ! -f "assets/plays-sdk.js" ]; then
  echo "ERROR: assets/plays-sdk.js not found"
  exit 1
fi

# Verify catalog has games
LIVE_COUNT=$(node -e "const c=require('./assets/catalog.js'); console.log(c.games.filter(g=>g.status==='live').length)")
TOTAL_COUNT=$(node -e "const c=require('./assets/catalog.js'); console.log(c.games.length)")
echo "Catalog: $LIVE_COUNT live / $TOTAL_COUNT total games"

echo "Files verified. Starting deploy..."
npx wrangler pages deploy . \
  --project-name=plays-muonnoi \
  --branch=main \
  --commit-hash=$(git -C .. rev-parse HEAD)

echo ""
echo "=== Deploy complete ==="
echo "Verify: curl -sI https://plays.muonnoi.org/"
