#!/usr/bin/env node

/**
 * Initialize the content archive with existing posts
 * Run once to migrate existing content to the archive system
 */

const fs = require('fs');
const path = require('path');

// Read the existing content-data.ts and extract posts
const CONTENT_DATA_PATH = path.join(__dirname, '../src/lib/content-data.ts');
const ARCHIVE_PATH = path.join(__dirname, '../content-archive.json');

function extractPosts() {
  const content = fs.readFileSync(CONTENT_DATA_PATH, 'utf8');
  
  // Find the initialPosts array
  const match = content.match(/export const initialPosts: Post\[\] = (\[[\s\S]*?\]);/);
  
  if (!match) {
    console.log('Could not find initialPosts in content-data.ts');
    return [];
  }
  
  try {
    // This is a bit hacky but works for our simple case
    const postsStr = match[1];
    // Use eval carefully here since we control the source
    const posts = eval(postsStr);
    return posts;
  } catch (e) {
    console.log('Error parsing posts:', e.message);
    return [];
  }
}

function main() {
  console.log('Initializing content archive...');
  
  // Check if archive already exists
  if (fs.existsSync(ARCHIVE_PATH)) {
    const existing = JSON.parse(fs.readFileSync(ARCHIVE_PATH, 'utf8'));
    console.log(`Archive already exists with ${existing.posts.length} posts`);
    console.log('To reset, delete content-archive.json and run again');
    return;
  }
  
  // Read existing content from TypeScript file
  // Since we can't easily eval the TS, we'll manually create the initial archive
  // from our known content
  
  const initialPosts = [
    // UGC / Community
    { id: 'ugc-001', title: 'Community Results Spotlight', type: 'ugc', platform: 'twitter', status: 'draft', product: 'hairdao-general', createdAt: '2026-01-30', week: 5 },
    { id: 'ugc-002', title: 'Discord Community Win', type: 'ugc', platform: 'twitter', status: 'draft', product: 'hairdao-general', createdAt: '2026-01-30', week: 5 },
    { id: 'ugc-003', title: 'User Testimonial - Anagen Shampoo', type: 'ugc', platform: 'twitter', status: 'draft', product: 'anagen-shampoo', createdAt: '2026-01-30', week: 5 },
    { id: 'ugc-004', title: 'Trial Participant Story', type: 'ugc', platform: 'instagram', status: 'draft', product: 'precision-dut', createdAt: '2026-01-30', week: 5 },
    { id: 'ugc-005', title: 'Community Meme Repost', type: 'ugc', platform: 'instagram', status: 'draft', product: 'hairdao-general', createdAt: '2026-01-30', week: 5 },
    
    // Authority
    { id: 'auth-001', title: 'T4 Trial Update - Clinical Data', type: 'authority', platform: 'twitter', status: 'draft', product: 'clinical-trial', createdAt: '2026-01-30', week: 5 },
    { id: 'auth-002', title: 'New Study: DHT Receptor Density', type: 'authority', platform: 'twitter', status: 'draft', product: 'hairdao-general', createdAt: '2026-01-30', week: 5 },
    { id: 'auth-003', title: 'Precision Dut Pharmacokinetics', type: 'authority', platform: 'twitter', status: 'draft', product: 'precision-dut', createdAt: '2026-01-30', week: 5 },
    { id: 'auth-004', title: 'Research Partnership Announcement', type: 'authority', platform: 'twitter', status: 'draft', product: 'clinical-trial', createdAt: '2026-01-30', week: 5 },
    { id: 'auth-005', title: 'Lab Update - University of Brasilia', type: 'authority', platform: 'twitter', status: 'draft', product: 'clinical-trial', createdAt: '2026-01-30', week: 5 },
    { id: 'auth-006', title: 'Medical Advisory Board', type: 'authority', platform: 'linkedin', status: 'draft', product: 'hairdao-general', createdAt: '2026-01-30', week: 5 },
    
    // Educational
    { id: 'edu-001', title: 'DHT Explained Simply', type: 'educational', platform: 'twitter', status: 'draft', product: 'hairdao-general', createdAt: '2026-01-30', week: 5 },
    { id: 'edu-002', title: 'Finasteride vs Dutasteride', type: 'educational', platform: 'twitter', status: 'draft', product: 'precision-dut', createdAt: '2026-01-30', week: 5 },
    { id: 'edu-003', title: 'The Hair Growth Cycle', type: 'educational', platform: 'instagram', status: 'draft', product: 'hairdao-general', createdAt: '2026-01-30', week: 5 },
    { id: 'edu-004', title: 'Minoxidil Myth Busting', type: 'educational', platform: 'twitter', status: 'draft', product: 'hairdao-general', createdAt: '2026-01-30', week: 5 },
    { id: 'edu-005', title: 'Why Shampoo Ingredients Matter', type: 'educational', platform: 'instagram', status: 'draft', product: 'anagen-shampoo', createdAt: '2026-01-30', week: 5 },
    { id: 'edu-006', title: 'DeSci Explained', type: 'educational', platform: 'twitter', status: 'draft', product: 'hairdao-general', createdAt: '2026-01-30', week: 5 },
    { id: 'edu-007', title: 'When to See a Dermatologist', type: 'educational', platform: 'twitter', status: 'draft', product: 'hairdao-general', createdAt: '2026-01-30', week: 5 },
    
    // Anagen Products
    { id: 'anagen-001', title: 'Anagen Shampoo Launch', type: 'educational', platform: 'twitter', status: 'draft', product: 'anagen-shampoo', createdAt: '2026-01-30', week: 5 },
    { id: 'anagen-002', title: 'How to Use Anagen Shampoo', type: 'educational', platform: 'instagram', status: 'draft', product: 'anagen-shampoo', createdAt: '2026-01-30', week: 5 },
    { id: 'anagen-003', title: 'Precision Dut Waitlist', type: 'authority', platform: 'twitter', status: 'draft', product: 'precision-dut', createdAt: '2026-01-30', week: 5 },
  ];
  
  const archive = {
    posts: initialPosts,
    lastGenerated: new Date().toISOString(),
    version: 1,
  };
  
  fs.writeFileSync(ARCHIVE_PATH, JSON.stringify(archive, null, 2));
  console.log(`Archive initialized with ${initialPosts.length} posts`);
}

main();
