// Agent System Types for HairDAO Content Swarm

export type AgentRole = 
  | 'lead'
  | 'content-writer'
  | 'social-manager'
  | 'seo-analyst'
  | 'community-researcher'
  | 'video-producer'
  | 'trend-scout';

export type AgentStatus = 'active' | 'idle' | 'working' | 'error';

export type TaskStatus = 'pending' | 'in-progress' | 'review' | 'approved' | 'rejected' | 'published';

export type TaskPriority = 'low' | 'normal' | 'high' | 'urgent';

export interface Agent {
  id: string;
  name: string;
  role: AgentRole;
  emoji: string;
  description: string;
  status: AgentStatus;
  currentTask: string | null;
  tasksCompleted: number;
  tasksInQueue: number;
  lastActive: string;
  capabilities: string[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: AgentRole;
  createdBy: AgentRole;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  output?: TaskOutput;
  feedback?: string;
  relatedPostId?: string;
}

export interface TaskOutput {
  type: 'post' | 'report' | 'keywords' | 'testimonials' | 'video-brief';
  content: any;
  attachments?: string[];
}

export interface ApprovalItem {
  id: string;
  taskId: string;
  postId?: string;
  title: string;
  type: 'post' | 'campaign' | 'video' | 'report';
  submittedBy: AgentRole;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected' | 'revision-requested';
  preview: string;
  platform?: string;
  category?: string;
  notes?: string;
}

export interface SwarmState {
  agents: Agent[];
  tasks: Task[];
  approvalQueue: ApprovalItem[];
  stats: SwarmStats;
  lastUpdated: string;
}

export interface SwarmStats {
  totalPosts: number;
  pendingApproval: number;
  publishedToday: number;
  publishedThisWeek: number;
  trendsTracked: number;
  videosInQueue: number;
  agentsActive: number;
}

// Agent definitions
export const AGENTS: Agent[] = [
  {
    id: 'pierce',
    name: 'Pierce',
    role: 'lead',
    emoji: '🤖',
    description: 'Orchestrates the team. Assigns tasks, reviews work, coordinates strategy.',
    status: 'active',
    currentTask: null,
    tasksCompleted: 0,
    tasksInQueue: 0,
    lastActive: new Date().toISOString(),
    capabilities: ['task-assignment', 'review', 'strategy', 'coordination'],
  },
  {
    id: 'writer',
    name: 'Content Writer',
    role: 'content-writer',
    emoji: '✍️',
    description: 'Creates blog posts, video scripts, email copy, landing pages.',
    status: 'active',
    currentTask: null,
    tasksCompleted: 0,
    tasksInQueue: 0,
    lastActive: new Date().toISOString(),
    capabilities: ['blog-posts', 'video-scripts', 'email-copy', 'landing-pages', 'social-posts'],
  },
  {
    id: 'social',
    name: 'Social Manager',
    role: 'social-manager',
    emoji: '📱',
    description: 'Manages Twitter, Instagram, TikTok. Optimizes for each platform.',
    status: 'active',
    currentTask: null,
    tasksCompleted: 0,
    tasksInQueue: 0,
    lastActive: new Date().toISOString(),
    capabilities: ['platform-optimization', 'scheduling', 'engagement', 'hashtags', 'trends'],
  },
  {
    id: 'seo',
    name: 'SEO Analyst',
    role: 'seo-analyst',
    emoji: '🔍',
    description: 'Keyword research, competitor analysis, ranking opportunities.',
    status: 'active',
    currentTask: null,
    tasksCompleted: 0,
    tasksInQueue: 0,
    lastActive: new Date().toISOString(),
    capabilities: ['keyword-research', 'competitor-analysis', 'serp-tracking', 'content-optimization'],
  },
  {
    id: 'community',
    name: 'Community Researcher',
    role: 'community-researcher',
    emoji: '👥',
    description: 'Discord/Reddit analysis, testimonials, case studies, ICP refinement.',
    status: 'active',
    currentTask: null,
    tasksCompleted: 0,
    tasksInQueue: 0,
    lastActive: new Date().toISOString(),
    capabilities: ['community-monitoring', 'testimonials', 'case-studies', 'sentiment-analysis'],
  },
  {
    id: 'video',
    name: 'Video Producer',
    role: 'video-producer',
    emoji: '🎬',
    description: 'Creates video briefs, AI video generation, Remotion data viz.',
    status: 'active',
    currentTask: null,
    tasksCompleted: 0,
    tasksInQueue: 0,
    lastActive: new Date().toISOString(),
    capabilities: ['video-briefs', 'ai-video', 'remotion', 'thumbnails', 'captions'],
  },
  {
    id: 'scout',
    name: 'Trend Scout',
    role: 'trend-scout',
    emoji: '🔭',
    description: 'Monitors Reddit, PubMed, Twitter for trending topics and opportunities.',
    status: 'active',
    currentTask: null,
    tasksCompleted: 0,
    tasksInQueue: 0,
    lastActive: new Date().toISOString(),
    capabilities: ['reddit-monitoring', 'pubmed-tracking', 'twitter-trends', 'news-alerts'],
  },
];
