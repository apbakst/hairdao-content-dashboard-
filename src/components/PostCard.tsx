'use client';

import { Post, ContentType, ProductTag } from '@/types/content';

interface PostCardProps {
  post: Post;
}

const typeColors: Record<ContentType, { bg: string; text: string; border: string }> = {
  ugc: { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200' },
  authority: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  educational: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
};

const typeLabels: Record<ContentType, string> = {
  ugc: '🎥 UGC',
  authority: '🔬 Authority',
  educational: '📚 Educational',
};

const platformIcons: Record<string, string> = {
  twitter: '🐦',
  instagram: '📸',
  tiktok: '🎵',
  linkedin: '💼',
  discord: '💬',
};

const statusColors: Record<string, { bg: string; text: string }> = {
  draft: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  scheduled: { bg: 'bg-purple-100', text: 'text-purple-700' },
  posted: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
};

const productLabels: Record<NonNullable<ProductTag>, string> = {
  'anagen-shampoo': '🧴 Shampoo',
  'anagen-serum': '💧 Serum',
  'anagen-supplement': '💊 Supplement',
  'precision-dut': '🎯 Precision Dut',
  'clinical-trial': '🧪 Trial',
  'hairdao-general': '💇 General',
};

export function PostCard({ post }: PostCardProps) {
  const typeStyle = typeColors[post.type];
  const statusStyle = statusColors[post.status];

  return (
    <div className={`bg-white rounded-xl shadow-sm border-2 ${typeStyle.border} overflow-hidden hover:shadow-md transition-shadow`}>
      {/* Header */}
      <div className={`${typeStyle.bg} px-4 py-3 border-b ${typeStyle.border}`}>
        <div className="flex items-center justify-between">
          <span className={`text-sm font-semibold ${typeStyle.text}`}>
            {typeLabels[post.type]}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-lg">{platformIcons[post.platform]}</span>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusStyle.bg} ${statusStyle.text}`}>
              {post.status}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-gray-900 mb-2">{post.title}</h3>
        <p className="text-sm text-gray-600 whitespace-pre-wrap line-clamp-6">
          {post.content}
        </p>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {post.product && (
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                {productLabels[post.product]}
              </span>
            )}
            {post.ref && (
              <span className="text-xs text-gray-400">
                Ref: {post.ref}
              </span>
            )}
          </div>
          {post.author && (
            <span className="text-xs text-gray-400">
              by {post.author}
            </span>
          )}
        </div>
        {post.scheduledDate && (
          <div className="mt-2 text-xs text-purple-600">
            📅 {post.scheduledDate} {post.scheduledTime && `at ${post.scheduledTime}`}
          </div>
        )}
      </div>
    </div>
  );
}
