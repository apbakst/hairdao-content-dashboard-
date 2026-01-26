'use client';

import { Platform, Status } from '@/types/content';

interface FilterBarProps {
  platform: Platform;
  status: Status | 'all';
  search: string;
  onPlatformChange: (platform: Platform) => void;
  onStatusChange: (status: Status | 'all') => void;
  onSearchChange: (search: string) => void;
  postCount: number;
}

const platforms: { value: Platform; label: string; emoji: string }[] = [
  { value: 'all', label: 'All', emoji: '📱' },
  { value: 'twitter', label: 'Twitter', emoji: '🐦' },
  { value: 'instagram', label: 'Instagram', emoji: '📸' },
  { value: 'tiktok', label: 'TikTok', emoji: '🎵' },
  { value: 'linkedin', label: 'LinkedIn', emoji: '💼' },
  { value: 'discord', label: 'Discord', emoji: '💬' },
];

const statuses: { value: Status | 'all'; label: string }[] = [
  { value: 'all', label: 'All Status' },
  { value: 'draft', label: 'Draft' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'posted', label: 'Posted' },
];

export default function FilterBar({
  platform,
  status,
  search,
  onPlatformChange,
  onStatusChange,
  onSearchChange,
  postCount,
}: FilterBarProps) {
  return (
    <div className="space-y-4">
      {/* Platform Tabs */}
      <div className="flex gap-2 flex-wrap">
        {platforms.map(p => (
          <button
            key={p.value}
            onClick={() => onPlatformChange(p.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
              platform === p.value
                ? 'bg-emerald-600 text-white'
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            <span>{p.emoji}</span>
            <span>{p.label}</span>
          </button>
        ))}
      </div>

      {/* Search and Status Filter */}
      <div className="flex gap-4 flex-wrap items-center">
        <div className="flex-1 min-w-64">
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
          />
        </div>

        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value as Status | 'all')}
          className="px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 cursor-pointer"
        >
          {statuses.map(s => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>

        <div className="text-sm text-zinc-400">
          {postCount} post{postCount !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
}
