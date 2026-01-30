'use client';

import { Platform, Status, ContentType, ProductTag, ContentTypeLabels, ProductLabels } from '@/types/content';

interface FilterBarProps {
  platform: Platform | 'all';
  status: Status | 'all';
  type: ContentType | 'all';
  product: ProductTag | 'all';
  search: string;
  onPlatformChange: (platform: Platform | 'all') => void;
  onStatusChange: (status: Status | 'all') => void;
  onTypeChange: (type: ContentType | 'all') => void;
  onProductChange: (product: ProductTag | 'all') => void;
  onSearchChange: (search: string) => void;
}

export function FilterBar({
  platform,
  status,
  type,
  product,
  search,
  onPlatformChange,
  onStatusChange,
  onTypeChange,
  onProductChange,
  onSearchChange,
}: FilterBarProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
      <div className="flex flex-wrap gap-4">
        {/* Content Type Filter - Primary */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Content Type
          </label>
          <select
            value={type}
            onChange={(e) => onTypeChange(e.target.value as ContentType | 'all')}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="ugc">🎥 UGC / Community</option>
            <option value="authority">🔬 Authority (Scientific)</option>
            <option value="educational">📚 Educational</option>
          </select>
        </div>

        {/* Product Filter */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Product
          </label>
          <select
            value={product || 'all'}
            onChange={(e) => onProductChange(e.target.value === 'all' ? 'all' : e.target.value as ProductTag)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Products</option>
            <option value="anagen-shampoo">🧴 Anagen Shampoo</option>
            <option value="anagen-serum">💧 Anagen Serum</option>
            <option value="precision-dut">🎯 Precision Dutasteride</option>
            <option value="clinical-trial">🧪 Clinical Trials</option>
            <option value="hairdao-general">💇 HairDAO General</option>
          </select>
        </div>

        {/* Platform Filter */}
        <div className="flex-1 min-w-[150px]">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Platform
          </label>
          <select
            value={platform}
            onChange={(e) => onPlatformChange(e.target.value as Platform | 'all')}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Platforms</option>
            <option value="twitter">🐦 Twitter</option>
            <option value="instagram">📸 Instagram</option>
            <option value="tiktok">🎵 TikTok</option>
            <option value="linkedin">💼 LinkedIn</option>
            <option value="discord">💬 Discord</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="flex-1 min-w-[150px]">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value as Status | 'all')}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="draft">📝 Draft</option>
            <option value="scheduled">📅 Scheduled</option>
            <option value="posted">✅ Posted</option>
          </select>
        </div>

        {/* Search */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Search
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search content..."
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Category Quick Stats */}
      <div className="flex gap-4 mt-4 pt-4 border-t border-gray-100">
        <button
          onClick={() => onTypeChange('ugc')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            type === 'ugc' 
              ? 'bg-pink-100 text-pink-700 border-2 border-pink-300' 
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          }`}
        >
          🎥 UGC / Community
        </button>
        <button
          onClick={() => onTypeChange('authority')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            type === 'authority' 
              ? 'bg-blue-100 text-blue-700 border-2 border-blue-300' 
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          }`}
        >
          🔬 Authority
        </button>
        <button
          onClick={() => onTypeChange('educational')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            type === 'educational' 
              ? 'bg-green-100 text-green-700 border-2 border-green-300' 
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          }`}
        >
          📚 Educational
        </button>
        <button
          onClick={() => onTypeChange('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            type === 'all' 
              ? 'bg-purple-100 text-purple-700 border-2 border-purple-300' 
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          }`}
        >
          All
        </button>
      </div>
    </div>
  );
}
