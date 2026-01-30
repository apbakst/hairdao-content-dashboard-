'use client';

import { SwarmStats } from '@/types/agents';

interface SwarmStatsProps {
  stats: SwarmStats;
}

export function SwarmStatsPanel({ stats }: SwarmStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
      <StatCard
        label="Total Posts"
        value={stats.totalPosts}
        icon="📝"
        color="gray"
      />
      <StatCard
        label="Pending Approval"
        value={stats.pendingApproval}
        icon="⏳"
        color="orange"
        highlight={stats.pendingApproval > 0}
      />
      <StatCard
        label="Published Today"
        value={stats.publishedToday}
        icon="🚀"
        color="green"
      />
      <StatCard
        label="This Week"
        value={stats.publishedThisWeek}
        icon="📅"
        color="blue"
      />
      <StatCard
        label="Trends Tracked"
        value={stats.trendsTracked}
        icon="📈"
        color="purple"
      />
      <StatCard
        label="Videos Queued"
        value={stats.videosInQueue}
        icon="🎬"
        color="pink"
      />
      <StatCard
        label="Agents Active"
        value={stats.agentsActive}
        icon="🤖"
        color="emerald"
      />
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: number;
  icon: string;
  color: 'gray' | 'orange' | 'green' | 'blue' | 'purple' | 'pink' | 'emerald';
  highlight?: boolean;
}

const colorClasses = {
  gray: 'bg-gray-50 border-gray-100',
  orange: 'bg-orange-50 border-orange-100',
  green: 'bg-green-50 border-green-100',
  blue: 'bg-blue-50 border-blue-100',
  purple: 'bg-purple-50 border-purple-100',
  pink: 'bg-pink-50 border-pink-100',
  emerald: 'bg-emerald-50 border-emerald-100',
};

const valueColors = {
  gray: 'text-gray-900',
  orange: 'text-orange-600',
  green: 'text-green-600',
  blue: 'text-blue-600',
  purple: 'text-purple-600',
  pink: 'text-pink-600',
  emerald: 'text-emerald-600',
};

function StatCard({ label, value, icon, color, highlight }: StatCardProps) {
  return (
    <div className={`rounded-xl p-3 border ${colorClasses[color]} ${highlight ? 'ring-2 ring-orange-300 animate-pulse' : ''}`}>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">{icon}</span>
        <span className={`text-2xl font-bold ${valueColors[color]}`}>{value}</span>
      </div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}

export function SwarmStatsCompact({ stats }: SwarmStatsProps) {
  return (
    <div className="flex flex-wrap gap-4 text-sm">
      <div className="flex items-center gap-1">
        <span>📝</span>
        <span className="font-medium">{stats.totalPosts}</span>
        <span className="text-gray-500">posts</span>
      </div>
      <div className="flex items-center gap-1">
        <span>⏳</span>
        <span className="font-medium text-orange-600">{stats.pendingApproval}</span>
        <span className="text-gray-500">pending</span>
      </div>
      <div className="flex items-center gap-1">
        <span>🤖</span>
        <span className="font-medium text-emerald-600">{stats.agentsActive}</span>
        <span className="text-gray-500">agents</span>
      </div>
      <div className="flex items-center gap-1">
        <span>🎬</span>
        <span className="font-medium text-pink-600">{stats.videosInQueue}</span>
        <span className="text-gray-500">videos</span>
      </div>
    </div>
  );
}
