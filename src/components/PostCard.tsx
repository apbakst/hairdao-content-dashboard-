'use client';

import { Post, Status } from '@/types/content';
import { useState } from 'react';

interface PostCardProps {
  post: Post;
  onStatusChange?: (id: string, status: Status) => void;
  onSchedule?: (id: string, date: string, time: string) => void;
}

const platformEmoji: Record<string, string> = {
  twitter: '🐦',
  instagram: '📸',
  tiktok: '🎵',
  linkedin: '💼',
  discord: '💬',
};

const platformColors: Record<string, string> = {
  twitter: 'border-blue-500/30 bg-blue-500/10',
  instagram: 'border-pink-500/30 bg-pink-500/10',
  tiktok: 'border-cyan-500/30 bg-cyan-500/10',
  linkedin: 'border-blue-700/30 bg-blue-700/10',
  discord: 'border-indigo-500/30 bg-indigo-500/10',
};

const statusColors: Record<Status, string> = {
  draft: 'bg-zinc-600 text-zinc-200',
  scheduled: 'bg-amber-600 text-amber-100',
  posted: 'bg-emerald-600 text-emerald-100',
};

const typeColors: Record<string, string> = {
  educational: 'bg-blue-600/20 text-blue-300',
  product: 'bg-purple-600/20 text-purple-300',
  community: 'bg-green-600/20 text-green-300',
  humor: 'bg-yellow-600/20 text-yellow-300',
  results: 'bg-emerald-600/20 text-emerald-300',
  lifestyle: 'bg-pink-600/20 text-pink-300',
  engagement: 'bg-orange-600/20 text-orange-300',
  bts: 'bg-cyan-600/20 text-cyan-300',
};

export default function PostCard({ post, onStatusChange, onSchedule }: PostCardProps) {
  const [copied, setCopied] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);
  const [scheduleDate, setScheduleDate] = useState(post.scheduledDate || '');
  const [scheduleTime, setScheduleTime] = useState(post.scheduledTime || '09:00');

  const handleCopy = async () => {
    await navigator.clipboard.writeText(post.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSchedule = () => {
    if (scheduleDate && onSchedule) {
      onSchedule(post.id, scheduleDate, scheduleTime);
      setShowScheduler(false);
    }
  };

  return (
    <div className={`rounded-xl border ${platformColors[post.platform]} p-4 transition-all hover:shadow-lg hover:shadow-black/20`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{platformEmoji[post.platform]}</span>
          <span className="text-sm font-medium text-zinc-300 capitalize">{post.platform}</span>
        </div>
        <div className="flex gap-2">
          <span className={`px-2 py-0.5 rounded text-xs font-medium ${typeColors[post.type]}`}>
            {post.type}
          </span>
          <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusColors[post.status]}`}>
            {post.status}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-white mb-2">{post.title}</h3>

      {/* Content Preview */}
      <div className="bg-zinc-900/50 rounded-lg p-3 mb-3 max-h-48 overflow-y-auto">
        <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-sans leading-relaxed">
          {post.content}
        </pre>
      </div>

      {/* Schedule Info */}
      {post.scheduledDate && (
        <div className="text-xs text-zinc-400 mb-3 flex items-center gap-2">
          <span>📅</span>
          <span>{post.scheduledDate} {post.scheduledTime && `at ${post.scheduledTime}`}</span>
        </div>
      )}

      {/* Scheduler */}
      {showScheduler && (
        <div className="bg-zinc-800/50 rounded-lg p-3 mb-3 space-y-2">
          <input
            type="date"
            value={scheduleDate}
            onChange={(e) => setScheduleDate(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-1.5 text-sm text-white"
          />
          <input
            type="time"
            value={scheduleTime}
            onChange={(e) => setScheduleTime(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-1.5 text-sm text-white"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSchedule}
              className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded py-1.5 text-sm font-medium transition-colors"
            >
              Set Schedule
            </button>
            <button
              onClick={() => setShowScheduler(false)}
              className="px-3 bg-zinc-700 hover:bg-zinc-600 text-white rounded py-1.5 text-sm transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
            copied
              ? 'bg-emerald-600 text-white'
              : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
          }`}
        >
          {copied ? '✓ Copied!' : '📋 Copy'}
        </button>
        
        <button
          onClick={() => setShowScheduler(!showScheduler)}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
        >
          📅
        </button>

        {onStatusChange && (
          <select
            value={post.status}
            onChange={(e) => onStatusChange(post.id, e.target.value as Status)}
            className="px-2 py-2 rounded-lg text-sm bg-zinc-800 text-zinc-300 border-none cursor-pointer"
          >
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
            <option value="posted">Posted</option>
          </select>
        )}
      </div>

      {/* Ref Tag */}
      {post.ref && (
        <div className="mt-2 text-xs text-zinc-500">
          Ref: {post.ref}
        </div>
      )}
    </div>
  );
}
