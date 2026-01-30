#!/bin/bash

# HairDAO Content Swarm - Full Pipeline
# 
# 1. Scout trends from Reddit, PubMed, etc.
# 2. Generate content using multi-agent swarm
# 3. Update content archive
# 4. Build and deploy to Vercel
#
# Run manually: bash scripts/run-swarm.sh
# Or via cron: Every 6 hours

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_DIR"

echo "╔═══════════════════════════════════════════════════════════╗"
echo "║         HairDAO Content Swarm - $(date +%Y-%m-%d\ %H:%M)         ║"
echo "╚═══════════════════════════════════════════════════════════╝"

# Step 1: Scout Trends
echo ""
echo "🔍 Step 1: Scouting Trends..."
node scripts/trend-scout.js

# Step 2: Run Content Swarm
echo ""
echo "🐝 Step 2: Running Content Swarm..."
node scripts/content-swarm.js

# Step 3: Update content-data.ts from archive
echo ""
echo "📝 Step 3: Updating content data..."
node scripts/generate-weekly-content.js

# Step 4: Build
echo ""
echo "🔨 Step 4: Building..."
npm run build

# Step 5: Git commit and push
echo ""
echo "🚀 Step 5: Deploying..."
git add -A
git commit -m "🐝 Content Swarm Update - $(date +%Y-%m-%d\ %H:%M)

- Scouted new trends from Reddit/PubMed
- Generated content via multi-agent swarm
- Updated video queue
- Archive preserved" || echo "No changes to commit"

git push origin main

echo ""
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║                    ✅ Swarm Complete!                     ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""
echo "📊 Check dashboard: https://hairdao-content-dashboard.vercel.app/"
echo "🎬 Check video queue: cat video-queue.json"
