import { Post, Platform, ContentType, Status } from '@/types/content';

// Parse the markdown content files to extract posts
export function parseContentBatch(markdown: string, batchNum: number): Post[] {
  const posts: Post[] = [];
  const lines = markdown.split('\n');
  
  let currentPlatform: Platform | null = null;
  let currentTitle = '';
  let currentContent = '';
  let currentRef = '';
  let inCodeBlock = false;
  let postIndex = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Detect platform sections
    if (line.startsWith('## Twitter')) currentPlatform = 'twitter';
    else if (line.startsWith('## Instagram')) currentPlatform = 'instagram';
    else if (line.startsWith('## TikTok')) currentPlatform = 'tiktok';
    else if (line.startsWith('## LinkedIn')) currentPlatform = 'linkedin';
    else if (line.startsWith('## Discord')) currentPlatform = 'discord';
    
    // Detect post titles (### headers)
    if (line.startsWith('### ') && currentPlatform) {
      // Save previous post if exists
      if (currentTitle && currentContent.trim()) {
        posts.push({
          id: `B${batchNum}-${currentPlatform}-${postIndex}`,
          title: currentTitle,
          content: currentContent.trim(),
          platform: currentPlatform,
          type: inferContentType(currentTitle, currentContent),
          status: 'draft',
          ref: currentRef || `B${batchNum}-${postIndex}`,
        });
        postIndex++;
      }
      
      currentTitle = line.replace('### ', '').replace(/—/g, '-').trim();
      currentContent = '';
      currentRef = '';
      continue;
    }
    
    // Track code blocks
    if (line.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    
    // Collect content
    if (currentTitle && currentPlatform) {
      if (inCodeBlock || (!line.startsWith('##') && !line.startsWith('**Thread'))) {
        currentContent += line + '\n';
      }
    }
  }
  
  // Don't forget last post
  if (currentTitle && currentContent.trim() && currentPlatform) {
    posts.push({
      id: `B${batchNum}-${currentPlatform}-${postIndex}`,
      title: currentTitle,
      content: currentContent.trim(),
      platform: currentPlatform,
      type: inferContentType(currentTitle, currentContent),
      status: 'draft',
      ref: `B${batchNum}-${postIndex}`,
    });
  }
  
  return posts;
}

export function parseCalendar(markdown: string): Post[] {
  const posts: Post[] = [];
  const lines = markdown.split('\n');
  
  let currentWeek = 0;
  let currentDay = 0;
  let dayOfMonth = 1;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Detect week
    const weekMatch = line.match(/## Week (\d+)/);
    if (weekMatch) {
      currentWeek = parseInt(weekMatch[1]);
      continue;
    }
    
    // Detect day
    const dayMatch = line.match(/### Day (\d+)/);
    if (dayMatch) {
      currentDay = parseInt(dayMatch[1]);
      dayOfMonth = currentDay;
      continue;
    }
    
    // Parse table rows (skip headers and separators)
    if (line.startsWith('|') && !line.includes('Platform') && !line.includes('---')) {
      const cells = line.split('|').map(c => c.trim()).filter(c => c);
      if (cells.length >= 4) {
        const [platform, content, type, ref] = cells;
        const platformLower = platform.toLowerCase() as Platform;
        
        if (['twitter', 'instagram', 'tiktok', 'linkedin', 'discord'].includes(platformLower)) {
          // Extract the actual content from quotes if present
          const contentMatch = content.match(/"([^"]+)"/);
          const cleanContent = contentMatch ? contentMatch[1] : content;
          
          posts.push({
            id: `CAL-W${currentWeek}-D${currentDay}-${platformLower}`,
            title: cleanContent.substring(0, 50) + (cleanContent.length > 50 ? '...' : ''),
            content: cleanContent,
            platform: platformLower,
            type: mapContentType(type),
            status: 'scheduled',
            scheduledDate: `2026-02-${String(dayOfMonth).padStart(2, '0')}`,
            week: currentWeek,
            day: currentDay,
            ref: ref || undefined,
          });
        }
      }
    }
  }
  
  return posts;
}

function inferContentType(title: string, content: string): ContentType {
  const combined = (title + ' ' + content).toLowerCase();
  
  if (combined.includes('meme') || combined.includes('humor') || combined.includes('pov:') || combined.includes('joke')) {
    return 'humor';
  }
  if (combined.includes('trial') || combined.includes('recruit') || combined.includes('apply')) {
    return 'community';
  }
  if (combined.includes('product') || combined.includes('buy') || combined.includes('order') || combined.includes('lexy')) {
    return 'product';
  }
  if (combined.includes('results') || combined.includes('before') || combined.includes('after') || combined.includes('glow')) {
    return 'results';
  }
  if (combined.includes('routine') || combined.includes('day in') || combined.includes('lifestyle')) {
    return 'lifestyle';
  }
  return 'educational';
}

function mapContentType(type: string): ContentType {
  const lower = type.toLowerCase();
  if (lower.includes('education')) return 'educational';
  if (lower.includes('product') || lower.includes('promo')) return 'product';
  if (lower.includes('community') || lower.includes('trial')) return 'community';
  if (lower.includes('humor') || lower.includes('meme')) return 'humor';
  if (lower.includes('result') || lower.includes('glow')) return 'results';
  if (lower.includes('lifestyle') || lower.includes('routine')) return 'lifestyle';
  if (lower.includes('engagement') || lower.includes('poll')) return 'engagement';
  if (lower.includes('bts') || lower.includes('behind')) return 'bts';
  return 'educational';
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}
