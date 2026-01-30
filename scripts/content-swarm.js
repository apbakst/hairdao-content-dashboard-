#!/usr/bin/env node

/**
 * HairDAO Content Swarm
 * 
 * Generates content from trend signals using multiple "agents":
 * 1. UGC Agent - Community content ideas
 * 2. Authority Agent - Scientific/medical content
 * 3. Educational Agent - Explainers and how-tos
 * 4. Video Agent - Tags posts for video (founder or AI-generated)
 * 
 * Integrates with:
 * - Nanobanana for AI video generation
 * - Remotion for programmatic video
 */

const fs = require('fs');
const path = require('path');

const TRENDS_PATH = path.join(__dirname, '../trends.json');
const ARCHIVE_PATH = path.join(__dirname, '../content-archive.json');
const VIDEO_QUEUE_PATH = path.join(__dirname, '../video-queue.json');

// Nanobanana API config
const NANOBANANA_API_KEY = 'AIzaSyBPQ5M28KjKp1_3xL8RG8Nj8-Ql3DYDXN8';

// Video types
const VIDEO_TYPES = {
  FOUNDER: 'founder',      // Andrew on camera
  AI_GENERATED: 'ai',      // Nanobanana/AI generated
  REMOTION: 'remotion',    // Programmatic/data visualization
  NONE: null,
};

// Content templates by category
const TEMPLATES = {
  ugc: {
    reddit_response: {
      title: 'Community Discussion: {topic}',
      template: `Hot topic from the community:

"{original_post}"

Our take:
{response}

What do you think? Reply below 👇`,
      videoType: VIDEO_TYPES.NONE,
    },
    success_story: {
      title: 'Success Story: {topic}',
      template: `Another win from the community 🎉

{story}

Your results could be next. Join us: hairdao.xyz`,
      videoType: VIDEO_TYPES.FOUNDER,
    },
  },
  authority: {
    new_study: {
      title: 'New Research: {topic}',
      template: `🧬 New study just dropped

{summary}

Key finding:
{finding}

What this means for treatment:
{implication}

Source: {source}`,
      videoType: VIDEO_TYPES.FOUNDER,
    },
    trial_update: {
      title: 'Trial Update: {trial}',
      template: `📊 {trial} Update

{stats}

Latest observations:
{observations}

Full data: hairdao.xyz/trials`,
      videoType: VIDEO_TYPES.REMOTION,
    },
    data_explainer: {
      title: 'Data Deep Dive: {topic}',
      template: `Let's look at the data 📈

{data_point}

What this tells us:
{analysis}

Thread continues 🧵`,
      videoType: VIDEO_TYPES.REMOTION,
    },
  },
  educational: {
    myth_bust: {
      title: 'Myth vs Reality: {myth}',
      template: `❌ Myth: "{myth}"

✅ Reality: {reality}

The science:
{explanation}

Stop believing everything you read.`,
      videoType: VIDEO_TYPES.FOUNDER,
    },
    explainer: {
      title: '{topic} Explained',
      template: `{topic} - Quick explainer:

{explanation}

Key takeaways:
• {point1}
• {point2}
• {point3}

Questions? Ask below 👇`,
      videoType: VIDEO_TYPES.AI_GENERATED,
    },
    comparison: {
      title: '{option1} vs {option2}',
      template: `{option1} vs {option2} - Which is better?

{option1}:
✅ {pro1}
❌ {con1}

{option2}:
✅ {pro2}
❌ {con2}

The verdict: {verdict}`,
      videoType: VIDEO_TYPES.NONE,
    },
  },
};

function generateId() {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 7);
  return `swarm-${timestamp}-${random}`;
}

function loadTrends() {
  try {
    if (fs.existsSync(TRENDS_PATH)) {
      return JSON.parse(fs.readFileSync(TRENDS_PATH, 'utf8'));
    }
  } catch (e) {}
  return { trends: [] };
}

function loadArchive() {
  try {
    if (fs.existsSync(ARCHIVE_PATH)) {
      return JSON.parse(fs.readFileSync(ARCHIVE_PATH, 'utf8'));
    }
  } catch (e) {}
  return { posts: [] };
}

function loadVideoQueue() {
  try {
    if (fs.existsSync(VIDEO_QUEUE_PATH)) {
      return JSON.parse(fs.readFileSync(VIDEO_QUEUE_PATH, 'utf8'));
    }
  } catch (e) {}
  return { queue: [], processed: [] };
}

// Generate content from a trend
function generateFromTrend(trend) {
  const category = trend.category || 'educational';
  const templates = TEMPLATES[category];
  const templateKeys = Object.keys(templates);
  const templateKey = templateKeys[Math.floor(Math.random() * templateKeys.length)];
  const template = templates[templateKey];
  
  const platforms = ['twitter', 'instagram', 'tiktok'];
  const platform = platforms[Math.floor(Math.random() * platforms.length)];
  
  const products = ['anagen-shampoo', 'precision-dut', 'clinical-trial', 'hairdao-general'];
  const product = products[Math.floor(Math.random() * products.length)];
  
  return {
    id: generateId(),
    title: template.title.replace('{topic}', trend.title || 'Hair Loss'),
    content: template.template,
    platform,
    type: category,
    status: 'draft',
    product,
    createdAt: new Date().toISOString().split('T')[0],
    sourceTrend: trend.url || null,
    // Video metadata
    videoType: trend.founderVideo ? VIDEO_TYPES.FOUNDER : template.videoType,
    videoStatus: template.videoType ? 'pending' : null,
    videoNotes: trend.founderVideo ? 'High engagement topic - founder video recommended' : null,
  };
}

// Agent: UGC Content Generator
function ugcAgent(trends) {
  const ugcTrends = trends.filter(t => t.category === 'ugc' || t.source === 'reddit');
  return ugcTrends.slice(0, 3).map(generateFromTrend);
}

// Agent: Authority Content Generator  
function authorityAgent(trends) {
  const authTrends = trends.filter(t => t.category === 'authority' || t.source === 'pubmed');
  return authTrends.slice(0, 3).map(generateFromTrend);
}

// Agent: Educational Content Generator
function educationalAgent(trends) {
  const eduTrends = trends.filter(t => t.category === 'educational');
  return eduTrends.slice(0, 3).map(generateFromTrend);
}

// Agent: Video Queue Manager
function videoAgent(posts) {
  const videoQueue = loadVideoQueue();
  
  const videoPosts = posts.filter(p => p.videoType);
  
  for (const post of videoPosts) {
    videoQueue.queue.push({
      postId: post.id,
      title: post.title,
      type: post.videoType,
      status: 'pending',
      priority: post.videoType === VIDEO_TYPES.FOUNDER ? 'high' : 'normal',
      addedAt: new Date().toISOString(),
      notes: post.videoNotes,
    });
  }
  
  fs.writeFileSync(VIDEO_QUEUE_PATH, JSON.stringify(videoQueue, null, 2));
  
  return videoQueue.queue.length;
}

async function main() {
  console.log('=== HairDAO Content Swarm ===');
  console.log(`Time: ${new Date().toISOString()}`);
  
  // Load trends
  const { trends } = loadTrends();
  console.log(`Loaded ${trends.length} trends`);
  
  if (trends.length === 0) {
    console.log('No trends found. Run trend-scout.js first.');
    return;
  }
  
  // Run agents
  console.log('\n--- Running Agents ---');
  
  const ugcPosts = ugcAgent(trends);
  console.log(`UGC Agent: ${ugcPosts.length} posts`);
  
  const authPosts = authorityAgent(trends);
  console.log(`Authority Agent: ${authPosts.length} posts`);
  
  const eduPosts = educationalAgent(trends);
  console.log(`Educational Agent: ${eduPosts.length} posts`);
  
  const allNewPosts = [...ugcPosts, ...authPosts, ...eduPosts];
  console.log(`\nTotal new posts: ${allNewPosts.length}`);
  
  // Process video queue
  const videoQueueSize = videoAgent(allNewPosts);
  console.log(`Video queue size: ${videoQueueSize}`);
  
  // Update archive
  const archive = loadArchive();
  archive.posts = [...archive.posts, ...allNewPosts];
  archive.lastSwarm = new Date().toISOString();
  
  fs.writeFileSync(ARCHIVE_PATH, JSON.stringify(archive, null, 2));
  console.log(`\nArchive updated: ${archive.posts.length} total posts`);
  
  // Summary
  const founderVideos = allNewPosts.filter(p => p.videoType === VIDEO_TYPES.FOUNDER).length;
  const aiVideos = allNewPosts.filter(p => p.videoType === VIDEO_TYPES.AI_GENERATED).length;
  const remotionVideos = allNewPosts.filter(p => p.videoType === VIDEO_TYPES.REMOTION).length;
  
  console.log('\n=== Summary ===');
  console.log(`🎬 Founder videos needed: ${founderVideos}`);
  console.log(`🤖 AI videos to generate: ${aiVideos}`);
  console.log(`📊 Remotion videos to create: ${remotionVideos}`);
  console.log(`📝 Text-only posts: ${allNewPosts.length - founderVideos - aiVideos - remotionVideos}`);
}

main().catch(console.error);
