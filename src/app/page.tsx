'use client';

import { useState, useMemo } from 'react';
import { Post, Platform, Status } from '@/types/content';
import { initialPosts } from '@/lib/content-data';
import PostCard from '@/components/PostCard';
import FilterBar from '@/components/FilterBar';
import Calendar from '@/components/Calendar';
import ExportButton from '@/components/ExportButton';

type ViewMode = 'grid' | 'calendar';

export default function Dashboard() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [platform, setPlatform] = useState<Platform>('all');
  const [status, setStatus] = useState<Status | 'all'>('all');
  const [search, setSearch] = useState('');

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      // Platform filter
      if (platform !== 'all' && post.platform !== platform) return false;
      
      // Status filter
      if (status !== 'all' && post.status !== status) return false;
      
      // Search filter
      if (search) {
        const searchLower = search.toLowerCase();
        const matchesTitle = post.title.toLowerCase().includes(searchLower);
        const matchesContent = post.content.toLowerCase().includes(searchLower);
        const matchesRef = post.ref?.toLowerCase().includes(searchLower);
        if (!matchesTitle && !matchesContent && !matchesRef) return false;
      }
      
      return true;
    });
  }, [posts, platform, status, search]);

  const handleStatusChange = (id: string, newStatus: Status) => {
    setPosts(prev => prev.map(post => 
      post.id === id ? { ...post, status: newStatus } : post
    ));
  };

  const handleSchedule = (id: string, date: string, time: string) => {
    setPosts(prev => prev.map(post => 
      post.id === id 
        ? { ...post, scheduledDate: date, scheduledTime: time, status: 'scheduled' as Status }
        : post
    ));
  };

  const stats = useMemo(() => {
    return {
      total: posts.length,
      draft: posts.filter(p => p.status === 'draft').length,
      scheduled: posts.filter(p => p.status === 'scheduled').length,
      posted: posts.filter(p => p.status === 'posted').length,
      byPlatform: {
        twitter: posts.filter(p => p.platform === 'twitter').length,
        instagram: posts.filter(p => p.platform === 'instagram').length,
        tiktok: posts.filter(p => p.platform === 'tiktok').length,
        linkedin: posts.filter(p => p.platform === 'linkedin').length,
        discord: posts.filter(p => p.platform === 'discord').length,
      },
    };
  }, [posts]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <nav className="border-b border-zinc-800 sticky top-0 bg-zinc-950/95 backdrop-blur z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">💇</span>
              <h1 className="text-xl font-bold">HairDAO Content Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-4">
              {/* View Toggle */}
              <div className="flex gap-1 bg-zinc-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-emerald-600 text-white' 
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  📱 Grid
                </button>
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'calendar' 
                      ? 'bg-emerald-600 text-white' 
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  📅 Calendar
                </button>
              </div>

              <ExportButton posts={filteredPosts} />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
            <div className="text-2xl font-bold text-white">{stats.total}</div>
            <div className="text-sm text-zinc-400">Total Posts</div>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-700 rounded-xl p-4">
            <div className="text-2xl font-bold text-zinc-400">{stats.draft}</div>
            <div className="text-sm text-zinc-500">Drafts</div>
          </div>
          <div className="bg-amber-900/20 border border-amber-800/50 rounded-xl p-4">
            <div className="text-2xl font-bold text-amber-400">{stats.scheduled}</div>
            <div className="text-sm text-amber-500/70">Scheduled</div>
          </div>
          <div className="bg-emerald-900/20 border border-emerald-800/50 rounded-xl p-4">
            <div className="text-2xl font-bold text-emerald-400">{stats.posted}</div>
            <div className="text-sm text-emerald-500/70">Posted</div>
          </div>
          <div className="bg-blue-900/20 border border-blue-800/50 rounded-xl p-4">
            <div className="text-2xl font-bold text-blue-400">{stats.byPlatform.twitter}</div>
            <div className="text-sm text-blue-500/70">🐦 Twitter</div>
          </div>
          <div className="bg-pink-900/20 border border-pink-800/50 rounded-xl p-4">
            <div className="text-2xl font-bold text-pink-400">{stats.byPlatform.instagram}</div>
            <div className="text-sm text-pink-500/70">📸 Instagram</div>
          </div>
          <div className="bg-cyan-900/20 border border-cyan-800/50 rounded-xl p-4">
            <div className="text-2xl font-bold text-cyan-400">{stats.byPlatform.tiktok}</div>
            <div className="text-sm text-cyan-500/70">🎵 TikTok</div>
          </div>
        </div>

        {/* Filters (only in grid view) */}
        {viewMode === 'grid' && (
          <div className="mb-6">
            <FilterBar
              platform={platform}
              status={status}
              search={search}
              onPlatformChange={setPlatform}
              onStatusChange={setStatus}
              onSearchChange={setSearch}
              postCount={filteredPosts.length}
            />
          </div>
        )}

        {/* Content */}
        {viewMode === 'grid' ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                onStatusChange={handleStatusChange}
                onSchedule={handleSchedule}
              />
            ))}
            
            {filteredPosts.length === 0 && (
              <div className="col-span-full text-center py-12 text-zinc-500">
                No posts match your filters
              </div>
            )}
          </div>
        ) : (
          <Calendar 
            posts={posts} 
            onStatusChange={handleStatusChange}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-sm text-zinc-500">
          <p>HairDAO Content Dashboard • Built with Next.js + Tailwind</p>
          <p className="mt-1">
            <a href="https://hairdao.xyz" className="text-emerald-500 hover:text-emerald-400">hairdao.xyz</a>
            {' • '}
            <a href="https://github.com/apbakst/hairdao-content-dashboard-" className="text-emerald-500 hover:text-emerald-400">GitHub</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
