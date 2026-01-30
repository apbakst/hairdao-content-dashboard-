#!/usr/bin/env node

/**
 * HairDAO Content Trend Scout
 * 
 * Monitors multiple sources for trending hair loss content:
 * - Reddit r/tressless, r/hairloss
 * - Twitter/X searches
 * - PubMed new studies
 * - News sites
 * 
 * Outputs trend signals for content generation
 */

const fs = require('fs');
const path = require('path');

const TRENDS_PATH = path.join(__dirname, '../trends.json');

// Trend sources to monitor
const SOURCES = {
  reddit: [
    'https://www.reddit.com/r/tressless/hot.json?limit=25',
    'https://www.reddit.com/r/hairloss/hot.json?limit=25',
    'https://www.reddit.com/r/HairlossResearch/hot.json?limit=25',
  ],
  pubmed: [
    'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=hair+loss+treatment&retmax=10&sort=date&retmode=json',
    'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=androgenetic+alopecia&retmax=10&sort=date&retmode=json',
  ],
};

// Keywords that indicate high-value content opportunities
const HOT_KEYWORDS = [
  'breakthrough', 'new study', 'clinical trial', 'fda', 'approved',
  'results', 'before after', 'progress', 'regrowth', 'sides', 'side effects',
  'minoxidil', 'finasteride', 'dutasteride', 'microneedling', 'prp',
  'topical', 'oral', 'natural', 'dht', 'hormone',
];

// Keywords for founder video opportunities
const FOUNDER_VIDEO_KEYWORDS = [
  'controversial', 'debate', 'myth', 'truth about', 'unpopular opinion',
  'announcement', 'launch', 'breaking', 'exclusive', 'insider',
  'personal', 'story', 'journey', 'update', 'ama', 'q&a',
];

async function fetchJSON(url) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'HairDAO-TrendScout/1.0',
      },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (e) {
    console.log(`Failed to fetch ${url}: ${e.message}`);
    return null;
  }
}

async function scoutReddit() {
  const trends = [];
  
  for (const url of SOURCES.reddit) {
    const data = await fetchJSON(url);
    if (!data?.data?.children) continue;
    
    for (const post of data.data.children) {
      const { title, selftext, score, num_comments, url: postUrl, subreddit } = post.data;
      const combined = `${title} ${selftext}`.toLowerCase();
      
      // Check for hot keywords
      const matchedKeywords = HOT_KEYWORDS.filter(kw => combined.includes(kw));
      const founderVideoMatch = FOUNDER_VIDEO_KEYWORDS.some(kw => combined.includes(kw));
      
      if (matchedKeywords.length > 0 || score > 100) {
        trends.push({
          source: 'reddit',
          subreddit,
          title,
          score,
          comments: num_comments,
          url: postUrl,
          keywords: matchedKeywords,
          founderVideo: founderVideoMatch,
          scrapedAt: new Date().toISOString(),
        });
      }
    }
  }
  
  return trends;
}

async function scoutPubMed() {
  const trends = [];
  
  for (const url of SOURCES.pubmed) {
    const data = await fetchJSON(url);
    if (!data?.esearchresult?.idlist) continue;
    
    for (const pmid of data.esearchresult.idlist.slice(0, 5)) {
      trends.push({
        source: 'pubmed',
        pmid,
        url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`,
        type: 'new_study',
        founderVideo: false,
        scrapedAt: new Date().toISOString(),
      });
    }
  }
  
  return trends;
}

function scoreTrend(trend) {
  let score = 0;
  
  // Reddit scoring
  if (trend.source === 'reddit') {
    score += Math.min(trend.score / 10, 50); // Up to 50 points for upvotes
    score += Math.min(trend.comments / 5, 30); // Up to 30 points for comments
    score += trend.keywords.length * 5; // 5 points per keyword match
    if (trend.founderVideo) score += 20; // Bonus for founder video potential
  }
  
  // PubMed scoring
  if (trend.source === 'pubmed') {
    score += 30; // Base score for new research
  }
  
  return score;
}

function categorizeTrend(trend) {
  const title = (trend.title || '').toLowerCase();
  
  // Determine content type
  if (title.includes('results') || title.includes('progress') || title.includes('before')) {
    return 'ugc';
  }
  if (trend.source === 'pubmed' || title.includes('study') || title.includes('research')) {
    return 'authority';
  }
  return 'educational';
}

async function main() {
  console.log('=== HairDAO Trend Scout ===');
  console.log(`Time: ${new Date().toISOString()}`);
  
  // Gather trends from all sources
  const redditTrends = await scoutReddit();
  const pubmedTrends = await scoutPubMed();
  
  console.log(`Reddit trends: ${redditTrends.length}`);
  console.log(`PubMed trends: ${pubmedTrends.length}`);
  
  // Combine and score
  const allTrends = [...redditTrends, ...pubmedTrends].map(t => ({
    ...t,
    score: scoreTrend(t),
    category: categorizeTrend(t),
  }));
  
  // Sort by score
  allTrends.sort((a, b) => b.score - a.score);
  
  // Load existing trends
  let existing = { trends: [], lastScout: null };
  try {
    if (fs.existsSync(TRENDS_PATH)) {
      existing = JSON.parse(fs.readFileSync(TRENDS_PATH, 'utf8'));
    }
  } catch (e) {}
  
  // Merge (avoid duplicates by URL)
  const existingUrls = new Set(existing.trends.map(t => t.url));
  const newTrends = allTrends.filter(t => !existingUrls.has(t.url));
  
  // Keep last 7 days of trends
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const recentTrends = existing.trends.filter(t => 
    new Date(t.scrapedAt).getTime() > weekAgo
  );
  
  const output = {
    trends: [...newTrends, ...recentTrends].slice(0, 100),
    lastScout: new Date().toISOString(),
    stats: {
      total: allTrends.length,
      new: newTrends.length,
      founderVideoOpportunities: allTrends.filter(t => t.founderVideo).length,
    },
  };
  
  // Save
  fs.writeFileSync(TRENDS_PATH, JSON.stringify(output, null, 2));
  
  console.log('\n=== Top 10 Trends ===');
  output.trends.slice(0, 10).forEach((t, i) => {
    console.log(`${i + 1}. [${t.category}] ${t.title || t.pmid} (score: ${t.score}${t.founderVideo ? ' 🎬' : ''})`);
  });
  
  console.log(`\n✅ Saved ${output.trends.length} trends to trends.json`);
  console.log(`🎬 Founder video opportunities: ${output.stats.founderVideoOpportunities}`);
}

main().catch(console.error);
