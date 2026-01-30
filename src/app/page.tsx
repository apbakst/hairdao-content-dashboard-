'use client';

import { useState, useMemo } from 'react';
import { FilterBar } from '@/components/FilterBar';
import { PostCard } from '@/components/PostCard';
import { Calendar } from '@/components/Calendar';
import { ExportButton } from '@/components/ExportButton';
import { AgentPanel, AgentPanelCompact } from '@/components/AgentPanel';
import { ApprovalQueue, ApprovalQueueCompact } from '@/components/ApprovalQueue';
import { SwarmStatsPanel } from '@/components/SwarmStats';
import { initialPosts } from '@/lib/content-data';
import { initializeSwarmState, approveItem, rejectItem, requestRevision } from '@/lib/swarm-state';
import { Platform, Status, ContentType, ProductTag, Post } from '@/types/content';

export default function Home() {
  const [view, setView] = useState<'dashboard' | 'list' | 'calendar' | 'agents'>('dashboard');
  const [platform, setPlatform] = useState<Platform | 'all'>('all');
  const [status, setStatus] = useState<Status | 'all'>('all');
  const [type, setType] = useState<ContentType | 'all'>('all');
  const [product, setProduct] = useState<ProductTag | 'all'>('all');
  const [search, setSearch] = useState('');

  // Initialize swarm state
  const [swarmState, setSwarmState] = useState(() => initializeSwarmState(initialPosts));

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      if (platform !== 'all' && post.platform !== platform) return false;
      if (status !== 'all' && post.status !== status) return false;
      if (type !== 'all' && post.type !== type) return false;
      if (product !== 'all' && post.product !== product) return false;
      if (search && !post.title.toLowerCase().includes(search.toLowerCase()) && 
          !post.content.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [platform, status, type, product, search]);

  // Handlers
  const handleApprove = (id: string) => {
    setSwarmState(prev => approveItem(prev, id));
  };

  const handleReject = (id: string, feedback: string) => {
    setSwarmState(prev => rejectItem(prev, id, feedback));
  };

  const handleRevision = (id: string, feedback: string) => {
    setSwarmState(prev => requestRevision(prev, id, feedback));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">💇</span>
              <div>
                <h1 className="text-xl font-bold text-gray-900">HairDAO Content Command</h1>
                <p className="text-sm text-gray-500">AI Marketing Swarm • {swarmState.stats.agentsActive} agents active</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* View Tabs */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setView('dashboard')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    view === 'dashboard' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  🎯 Dashboard
                </button>
                <button
                  onClick={() => setView('agents')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    view === 'agents' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  🤖 Agents
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    view === 'list' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  📋 Content
                </button>
                <button
                  onClick={() => setView('calendar')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    view === 'calendar' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  📅 Calendar
                </button>
              </div>
              <ExportButton posts={filteredPosts} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Dashboard View */}
        {view === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats */}
            <SwarmStatsPanel stats={swarmState.stats} />

            {/* Two Column Layout */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left Column - Approval Queue */}
              <div className="lg:col-span-2">
                <ApprovalQueue
                  items={swarmState.approvalQueue}
                  onApprove={handleApprove}
                  onReject={handleReject}
                  onRevision={handleRevision}
                />
              </div>

              {/* Right Column - Agent Status */}
              <div className="space-y-6">
                <AgentPanelCompact agents={swarmState.agents} />
                
                {/* Quick Stats */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">📊 Content Mix</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">🎥 UGC / Community</span>
                      <span className="font-medium">{initialPosts.filter(p => p.type === 'ugc').length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">🔬 Authority</span>
                      <span className="font-medium">{initialPosts.filter(p => p.type === 'authority').length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">📚 Educational</span>
                      <span className="font-medium">{initialPosts.filter(p => p.type === 'educational').length}</span>
                    </div>
                  </div>
                </div>

                {/* Video Queue */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">🎬 Video Queue</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-pink-600">🎥 Founder Videos</span>
                      <span className="font-medium">{swarmState.stats.videosInQueue}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-blue-600">🤖 AI Generated</span>
                      <span className="font-medium">0</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-purple-600">📊 Data Viz</span>
                      <span className="font-medium">0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Posts */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">📝 Recent Content</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.slice(0, 6).map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Agents View */}
        {view === 'agents' && (
          <div className="space-y-6">
            <SwarmStatsPanel stats={swarmState.stats} />
            <AgentPanel agents={swarmState.agents} />
            
            {/* Task List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <h3 className="font-semibold text-gray-900 mb-4">📋 Recent Tasks</h3>
              <div className="space-y-2">
                {swarmState.tasks.slice(0, 10).map(task => (
                  <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className={`w-2 h-2 rounded-full ${
                        task.status === 'review' ? 'bg-yellow-500' :
                        task.status === 'approved' ? 'bg-green-500' :
                        task.status === 'published' ? 'bg-blue-500' :
                        'bg-gray-400'
                      }`} />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{task.title}</div>
                        <div className="text-xs text-gray-500">Assigned to: {task.assignedTo}</div>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      task.status === 'review' ? 'bg-yellow-100 text-yellow-700' :
                      task.status === 'approved' ? 'bg-green-100 text-green-700' :
                      task.status === 'published' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* List View */}
        {view === 'list' && (
          <>
            {/* Category Quick Filters */}
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => setType('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  type === 'all' ? 'bg-purple-600 text-white' : 'bg-white text-gray-600 border hover:bg-gray-50'
                }`}
              >
                All ({initialPosts.length})
              </button>
              <button
                onClick={() => setType('ugc')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  type === 'ugc' ? 'bg-pink-600 text-white' : 'bg-white text-gray-600 border hover:bg-gray-50'
                }`}
              >
                🎥 UGC ({initialPosts.filter(p => p.type === 'ugc').length})
              </button>
              <button
                onClick={() => setType('authority')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  type === 'authority' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border hover:bg-gray-50'
                }`}
              >
                🔬 Authority ({initialPosts.filter(p => p.type === 'authority').length})
              </button>
              <button
                onClick={() => setType('educational')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  type === 'educational' ? 'bg-green-600 text-white' : 'bg-white text-gray-600 border hover:bg-gray-50'
                }`}
              >
                📚 Educational ({initialPosts.filter(p => p.type === 'educational').length})
              </button>
            </div>

            <FilterBar
              platform={platform}
              status={status}
              type={type}
              product={product}
              search={search}
              onPlatformChange={setPlatform}
              onStatusChange={setStatus}
              onTypeChange={setType}
              onProductChange={setProduct}
              onSearchChange={setSearch}
            />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
              {filteredPosts.length === 0 && (
                <div className="col-span-full text-center py-12 text-gray-500">
                  No posts match your filters
                </div>
              )}
            </div>
          </>
        )}

        {/* Calendar View */}
        {view === 'calendar' && <Calendar posts={filteredPosts} />}

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-400">
          Last updated: {new Date().toLocaleDateString()} • {filteredPosts.length} posts • Swarm v1.0
        </div>
      </div>
    </main>
  );
}
