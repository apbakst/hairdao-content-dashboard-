import { SwarmState, Agent, Task, ApprovalItem, AGENTS, TaskStatus, AgentRole } from '@/types/agents';
import { Post } from '@/types/content';

// Initialize swarm state
export function initializeSwarmState(posts: Post[]): SwarmState {
  const pendingApproval = posts.filter(p => p.status === 'draft');
  const published = posts.filter(p => p.status === 'posted');
  
  // Create approval queue from draft posts
  const approvalQueue: ApprovalItem[] = pendingApproval.slice(0, 20).map(post => ({
    id: `approval-${post.id}`,
    taskId: `task-${post.id}`,
    postId: post.id,
    title: post.title,
    type: 'post',
    submittedBy: inferAgentFromPost(post),
    submittedAt: post.createdAt || new Date().toISOString(),
    status: 'pending',
    preview: post.content.substring(0, 200) + '...',
    platform: post.platform,
    category: post.type,
  }));

  // Update agent stats based on posts
  const agents = AGENTS.map(agent => {
    const agentPosts = posts.filter(p => inferAgentFromPost(p) === agent.role);
    return {
      ...agent,
      tasksCompleted: agentPosts.filter(p => p.status === 'posted').length,
      tasksInQueue: agentPosts.filter(p => p.status === 'draft').length,
      status: agentPosts.some(p => p.status === 'draft') ? 'working' : 'idle',
      lastActive: new Date().toISOString(),
    } as Agent;
  });

  return {
    agents,
    tasks: generateTasksFromPosts(posts),
    approvalQueue,
    stats: {
      totalPosts: posts.length,
      pendingApproval: pendingApproval.length,
      publishedToday: 0,
      publishedThisWeek: published.length,
      trendsTracked: 10,
      videosInQueue: posts.filter(p => (p as any).videoType).length,
      agentsActive: agents.filter(a => a.status === 'working' || a.status === 'active').length,
    },
    lastUpdated: new Date().toISOString(),
  };
}

function inferAgentFromPost(post: Post): AgentRole {
  if (post.type === 'authority') return 'content-writer';
  if (post.type === 'ugc') return 'community-researcher';
  if (post.type === 'educational') return 'content-writer';
  if ((post as any).videoType) return 'video-producer';
  return 'content-writer';
}

function generateTasksFromPosts(posts: Post[]): Task[] {
  return posts.slice(0, 30).map(post => ({
    id: `task-${post.id}`,
    title: `Create: ${post.title}`,
    description: `Generate ${post.type} content for ${post.platform}`,
    assignedTo: inferAgentFromPost(post),
    createdBy: 'lead',
    status: mapPostStatusToTaskStatus(post.status),
    priority: 'normal',
    createdAt: post.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    relatedPostId: post.id,
  }));
}

function mapPostStatusToTaskStatus(postStatus: string): TaskStatus {
  switch (postStatus) {
    case 'draft': return 'review';
    case 'scheduled': return 'approved';
    case 'posted': return 'published';
    default: return 'pending';
  }
}

// Actions
export function approveItem(state: SwarmState, itemId: string): SwarmState {
  return {
    ...state,
    approvalQueue: state.approvalQueue.map(item =>
      item.id === itemId ? { ...item, status: 'approved' } : item
    ),
    stats: {
      ...state.stats,
      pendingApproval: state.stats.pendingApproval - 1,
    },
  };
}

export function rejectItem(state: SwarmState, itemId: string, feedback: string): SwarmState {
  return {
    ...state,
    approvalQueue: state.approvalQueue.map(item =>
      item.id === itemId ? { ...item, status: 'rejected', notes: feedback } : item
    ),
  };
}

export function requestRevision(state: SwarmState, itemId: string, feedback: string): SwarmState {
  return {
    ...state,
    approvalQueue: state.approvalQueue.map(item =>
      item.id === itemId ? { ...item, status: 'revision-requested', notes: feedback } : item
    ),
  };
}
