#!/bin/bash

# HairDAO Content Dashboard - Weekly Content Generation & Deploy
# This script generates new content, builds the site, and pushes to GitHub
# Vercel auto-deploys from GitHub

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_DIR"

echo "=== HairDAO Weekly Content Generation ==="
echo "Date: $(date)"
echo "Directory: $PROJECT_DIR"

# Generate new content (appends to archive, never deletes)
echo ""
echo "Generating new content..."
node scripts/generate-weekly-content.js

# Build to verify everything works
echo ""
echo "Building..."
npm run build

# Commit and push
echo ""
echo "Committing changes..."
git add -A
git commit -m "feat: Weekly content generation - $(date +%Y-%m-%d)

- Added new UGC/Community posts
- Added new Authority/Scientific posts  
- Added new Educational posts
- Archive preserved, no content deleted" || echo "No changes to commit"

echo ""
echo "Pushing to GitHub..."
git push origin main

echo ""
echo "=== Complete ==="
echo "Vercel will auto-deploy from GitHub"
echo "Check: https://hairdao-content-dashboard.vercel.app/"
