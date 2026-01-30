#!/usr/bin/env node

/**
 * Weekly Content Generator for HairDAO Content Dashboard
 * 
 * This script generates new content ideas for the 3 categories:
 * - UGC / Community Highlights
 * - Authority (Scientific + Medical)
 * - Educational
 * 
 * It appends to the existing content archive, never deletes old content.
 * 
 * Run manually: node scripts/generate-weekly-content.js
 * Or via cron: Every Monday at 9am UTC
 */

const fs = require('fs');
const path = require('path');

// Content templates for each category
const contentTemplates = {
  ugc: [
    {
      title: 'Community Results - Week of {date}',
      template: `Another week, another transformation 📸

This week's community highlight:

[Member] has been on the protocol for {months} months.

Results:
• {result1}
• {result2}
• {result3}

Want to share your progress? DM us or post in #results on Discord.

Your journey could inspire thousands.`,
      platforms: ['twitter', 'instagram'],
    },
    {
      title: 'Discord Highlight',
      template: `From our Discord this week:

"{quote}"

— {member} in #{channel}

Join 15k+ members: discord.gg/hairdao`,
      platforms: ['twitter'],
    },
    {
      title: 'Community Question of the Week',
      template: `Question from the community:

"{question}"

Our answer: 👇

{answer}

Got questions? Drop them in Discord or reply here.`,
      platforms: ['twitter'],
    },
    {
      title: 'User Testimonial - {product}',
      template: `"{testimonial}"

— Real feedback from a community member

Try it yourself: {link}`,
      platforms: ['twitter', 'instagram'],
    },
  ],
  authority: [
    {
      title: 'Trial Update - {trial_name}',
      template: `📊 {trial_name} - Week {week} Update

Participants: {n}
Completion rate: {completion}%

Key observations:
• {finding1}
• {finding2}

Full data dashboard: hairdao.xyz/trials

This is open science in action.`,
      platforms: ['twitter', 'linkedin'],
    },
    {
      title: 'Research Digest - {topic}',
      template: `New research on {topic} 🧬

Study: "{study_title}"
Published: {journal}

Key finding:
{finding}

What this means for treatment:
{implication}

Link: {link}`,
      platforms: ['twitter', 'linkedin'],
    },
    {
      title: 'Lab Update',
      template: `Lab update from our research partners 🔬

This week:
• {update1}
• {update2}

Next steps:
{next_steps}

Science moves slow. But it moves.`,
      platforms: ['twitter'],
    },
    {
      title: 'Clinical Data Deep Dive',
      template: `Let's talk data. 📈

{metric}: {value}

What does this mean?

{explanation}

Thread on methodology: 🧵`,
      platforms: ['twitter'],
    },
  ],
  educational: [
    {
      title: '{topic} Explained',
      template: `{topic} - What you need to know:

The basics:
{basics}

Common misconceptions:
❌ {myth1}
✅ {truth1}

❌ {myth2}
✅ {truth2}

Questions? Reply below 👇`,
      platforms: ['twitter', 'instagram'],
    },
    {
      title: 'Treatment Comparison: {treatment1} vs {treatment2}',
      template: `{treatment1} vs {treatment2}

{treatment1}:
• {pro1}
• {con1}

{treatment2}:
• {pro2}
• {con2}

Which is right for you? It depends on:
{factors}

Always consult a dermatologist.`,
      platforms: ['twitter', 'instagram'],
    },
    {
      title: 'Myth Busting Monday',
      template: `Myth: "{myth}"

Reality: {reality}

The science:
{science}

Stop believing everything you read. Do your research.`,
      platforms: ['twitter'],
    },
    {
      title: 'Quick Tip: {tip_topic}',
      template: `Quick tip for better results:

{tip}

Why it works:
{explanation}

Small changes compound over time.`,
      platforms: ['twitter', 'instagram', 'tiktok'],
    },
  ],
};

// Product options for tagging
const products = [
  'anagen-shampoo',
  'precision-dut', 
  'clinical-trial',
  'hairdao-general',
];

// Generate a unique ID
function generateId() {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 7);
  return `gen-${timestamp}-${random}`;
}

// Get current week number
function getWeekNumber(date) {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date - startOfYear) / (24 * 60 * 60 * 1000));
  return Math.ceil((days + startOfYear.getDay() + 1) / 7);
}

// Format date as YYYY-MM-DD
function formatDate(date) {
  return date.toISOString().split('T')[0];
}

// Generate content for the week
function generateWeeklyContent() {
  const today = new Date();
  const weekNum = getWeekNumber(today);
  const dateStr = formatDate(today);
  
  const newPosts = [];
  
  // Generate 2-3 posts per category
  Object.entries(contentTemplates).forEach(([category, templates]) => {
    const numPosts = Math.floor(Math.random() * 2) + 2; // 2-3 posts
    
    for (let i = 0; i < numPosts; i++) {
      const template = templates[Math.floor(Math.random() * templates.length)];
      const platform = template.platforms[Math.floor(Math.random() * template.platforms.length)];
      const product = products[Math.floor(Math.random() * products.length)];
      
      newPosts.push({
        id: generateId(),
        title: template.title.replace('{date}', dateStr),
        content: template.template,
        platform,
        type: category,
        status: 'draft',
        product,
        createdAt: dateStr,
        week: weekNum,
        generatedAt: new Date().toISOString(),
      });
    }
  });
  
  return newPosts;
}

// Archive file path
const ARCHIVE_PATH = path.join(__dirname, '../content-archive.json');
const CONTENT_DATA_PATH = path.join(__dirname, '../src/lib/content-data.ts');

// Load existing archive
function loadArchive() {
  try {
    if (fs.existsSync(ARCHIVE_PATH)) {
      return JSON.parse(fs.readFileSync(ARCHIVE_PATH, 'utf8'));
    }
  } catch (e) {
    console.log('No existing archive found, starting fresh');
  }
  return { posts: [], lastGenerated: null };
}

// Save archive
function saveArchive(archive) {
  fs.writeFileSync(ARCHIVE_PATH, JSON.stringify(archive, null, 2));
  console.log(`Archive saved: ${archive.posts.length} total posts`);
}

// Update content-data.ts with new posts
function updateContentData(allPosts) {
  const postsJson = JSON.stringify(allPosts, null, 2);
  
  const fileContent = `import { Post } from '@/types/content';

// Auto-generated content archive
// Last updated: ${new Date().toISOString()}
// Total posts: ${allPosts.length}

export const initialPosts: Post[] = ${postsJson};

export function getPostsByType(type: string): Post[] {
  if (type === 'all') return initialPosts;
  return initialPosts.filter(p => p.type === type);
}

export function getPostsByProduct(product: string): Post[] {
  if (product === 'all') return initialPosts;
  return initialPosts.filter(p => p.product === product);
}

export function getPostsByPlatform(platform: string): Post[] {
  if (platform === 'all') return initialPosts;
  return initialPosts.filter(p => p.platform === platform);
}

export function getPostsByWeek(week: number): Post[] {
  return initialPosts.filter(p => p.week === week);
}
`;

  fs.writeFileSync(CONTENT_DATA_PATH, fileContent);
  console.log('content-data.ts updated');
}

// Main execution
function main() {
  console.log('=== HairDAO Weekly Content Generator ===');
  console.log(`Date: ${new Date().toISOString()}`);
  
  // Load existing archive
  const archive = loadArchive();
  console.log(`Existing posts in archive: ${archive.posts.length}`);
  
  // Generate new content
  const newPosts = generateWeeklyContent();
  console.log(`Generated ${newPosts.length} new posts`);
  
  // Append to archive (never delete old content)
  archive.posts = [...archive.posts, ...newPosts];
  archive.lastGenerated = new Date().toISOString();
  
  // Save archive
  saveArchive(archive);
  
  // Update the TypeScript content file
  updateContentData(archive.posts);
  
  console.log('=== Complete ===');
  console.log(`Total posts now: ${archive.posts.length}`);
  console.log('Run "npm run build" and push to deploy');
}

main();
