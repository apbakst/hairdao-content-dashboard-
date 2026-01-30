'use client';

import { useState, useMemo } from 'react';
import { FilterBar } from '@/components/FilterBar';
import { PostCard } from '@/components/PostCard';
import { Calendar } from '@/components/Calendar';
import { ExportButton } from '@/components/ExportButton';
import { initialPosts } from '@/lib/content-data';
import { Platform, Status, ContentType, ProductTag, Post } from '@/types/content';

export default function Home() {
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [platform, setPlatform] = useState<Platform | 'all'>('all');
  const [status, setStatus] = useState<Status | 'all'>('all');
  const [type, setType] = useState<ContentType | 'all'>('all');
  const [product, setProduct] = useState<ProductTag | 'all'>('all');
  const [search, setSearch] = useState('');

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

  // Stats by category
  const stats = useMemo(() => {
    const ugc = initialPosts.filter(p => p.type === 'ugc').length;
    const authority = initialPosts.filter(p => p.type === 'authority').length;
    const educational = initialPosts.filter(p => p.type === 'educational').length;
    const drafts = initialPosts.filter(p => p.status === 'draft').length;
    const scheduled = initialPosts.filter(p => p.status === 'scheduled').length;
    const posted = initialPosts.filter(p => p.status === 'posted').length;
    
    return { ugc, authority, educational, drafts, scheduled, posted, total: initialPosts.length };
  }, []);

  // Stats by product
  const productStats = useMemo(() => {
    const products: Record<string, number> = {};
    initialPosts.forEach(p => {
      if (p.product) {
        products[p.product] = (products[p.product] || 0) + 1;
      }
    });
    return products;
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">💇</span>
              <div>
                <h1 className="text-xl font-bold text-gray-900">HairDAO Content Dashboard</h1>
                <p className="text-sm text-gray-500">Manage • Schedule • Track</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setView('list')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    view === 'list' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  📋 List
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
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-500">Total Posts</div>
          </div>
          <div className="bg-pink-50 rounded-xl p-4 shadow-sm border border-pink-100">
            <div className="text-2xl font-bold text-pink-600">{stats.ugc}</div>
            <div className="text-sm text-pink-600">🎥 UGC</div>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 shadow-sm border border-blue-100">
            <div className="text-2xl font-bold text-blue-600">{stats.authority}</div>
            <div className="text-sm text-blue-600">🔬 Authority</div>
          </div>
          <div className="bg-green-50 rounded-xl p-4 shadow-sm border border-green-100">
            <div className="text-2xl font-bold text-green-600">{stats.educational}</div>
            <div className="text-sm text-green-600">📚 Educational</div>
          </div>
          <div className="bg-yellow-50 rounded-xl p-4 shadow-sm border border-yellow-100">
            <div className="text-2xl font-bold text-yellow-600">{stats.drafts}</div>
            <div className="text-sm text-yellow-600">📝 Drafts</div>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 shadow-sm border border-purple-100">
            <div className="text-2xl font-bold text-purple-600">{stats.scheduled}</div>
            <div className="text-sm text-purple-600">📅 Scheduled</div>
          </div>
          <div className="bg-emerald-50 rounded-xl p-4 shadow-sm border border-emerald-100">
            <div className="text-2xl font-bold text-emerald-600">{stats.posted}</div>
            <div className="text-sm text-emerald-600">✅ Posted</div>
          </div>
        </div>

        {/* Product Stats Row */}
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.entries(productStats).map(([prod, count]) => (
            <button
              key={prod}
              onClick={() => setProduct(prod as ProductTag)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                product === prod
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-purple-300'
              }`}
            >
              {prod === 'anagen-shampoo' && '🧴'}
              {prod === 'anagen-serum' && '💧'}
              {prod === 'precision-dut' && '🎯'}
              {prod === 'clinical-trial' && '🧪'}
              {prod === 'hairdao-general' && '💇'}
              {' '}{count}
            </button>
          ))}
          {product !== 'all' && (
            <button
              onClick={() => setProduct('all')}
              className="px-3 py-1.5 rounded-full text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              ✕ Clear
            </button>
          )}
        </div>

        {/* Filters */}
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

        {/* Content */}
        {view === 'list' ? (
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
        ) : (
          <Calendar posts={filteredPosts} />
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-400">
          Last updated: {new Date().toLocaleDateString()} • {filteredPosts.length} posts shown
        </div>
      </div>
    </main>
  );
}
