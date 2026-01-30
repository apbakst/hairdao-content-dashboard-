'use client';

import { useState } from 'react';
import { ApprovalItem } from '@/types/agents';

interface ApprovalQueueProps {
  items: ApprovalItem[];
  onApprove: (id: string) => void;
  onReject: (id: string, feedback: string) => void;
  onRevision: (id: string, feedback: string) => void;
}

const platformIcons: Record<string, string> = {
  twitter: '🐦',
  instagram: '📸',
  tiktok: '🎵',
  linkedin: '💼',
  discord: '💬',
};

const categoryColors: Record<string, { bg: string; text: string }> = {
  ugc: { bg: 'bg-pink-100', text: 'text-pink-700' },
  authority: { bg: 'bg-blue-100', text: 'text-blue-700' },
  educational: { bg: 'bg-green-100', text: 'text-green-700' },
};

export function ApprovalQueue({ items, onApprove, onReject, onRevision }: ApprovalQueueProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');

  const pendingItems = items.filter(i => i.status === 'pending');

  if (pendingItems.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
        <div className="text-4xl mb-2">✅</div>
        <h3 className="font-medium text-gray-900">All caught up!</h3>
        <p className="text-sm text-gray-500">No items pending approval</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-yellow-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">⏳</span>
            <h2 className="font-bold text-gray-900">Awaiting Your Approval</h2>
          </div>
          <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
            {pendingItems.length} pending
          </span>
        </div>
      </div>

      <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
        {pendingItems.map(item => {
          const isExpanded = expandedId === item.id;
          const catColors = categoryColors[item.category || 'educational'];

          return (
            <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{platformIcons[item.platform || 'twitter']}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${catColors.bg} ${catColors.text}`}>
                      {item.category}
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-900 truncate">{item.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Submitted by {item.submittedBy} • {new Date(item.submittedAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => onApprove(item.id)}
                    className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    ✓ Approve
                  </button>
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors"
                  >
                    {isExpanded ? 'Close' : 'Review'}
                  </button>
                </div>
              </div>

              {/* Expanded View */}
              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  {/* Preview */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{item.preview}</p>
                  </div>

                  {/* Feedback Input */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Feedback (optional)
                    </label>
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Add notes or revision requests..."
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows={2}
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        onApprove(item.id);
                        setExpandedId(null);
                        setFeedback('');
                      }}
                      className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors"
                    >
                      ✓ Approve & Schedule
                    </button>
                    <button
                      onClick={() => {
                        onRevision(item.id, feedback);
                        setExpandedId(null);
                        setFeedback('');
                      }}
                      className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg transition-colors"
                    >
                      ↻ Request Revision
                    </button>
                    <button
                      onClick={() => {
                        onReject(item.id, feedback);
                        setExpandedId(null);
                        setFeedback('');
                      }}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
                    >
                      ✕ Reject
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ApprovalQueueCompact({ items, onApprove }: { items: ApprovalItem[]; onApprove: (id: string) => void }) {
  const pendingItems = items.filter(i => i.status === 'pending').slice(0, 5);

  return (
    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4 border border-orange-100">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span>⏳</span>
          <span className="font-semibold text-gray-900">Pending Approval</span>
        </div>
        <span className="text-sm font-medium text-orange-600">{items.filter(i => i.status === 'pending').length}</span>
      </div>
      
      <div className="space-y-2">
        {pendingItems.map(item => (
          <div key={item.id} className="flex items-center justify-between bg-white rounded-lg px-3 py-2">
            <div className="flex items-center gap-2 min-w-0">
              <span>{platformIcons[item.platform || 'twitter']}</span>
              <span className="text-sm truncate">{item.title}</span>
            </div>
            <button
              onClick={() => onApprove(item.id)}
              className="px-2 py-1 bg-green-500 hover:bg-green-600 text-white text-xs font-medium rounded transition-colors"
            >
              ✓
            </button>
          </div>
        ))}
      </div>
      
      {items.filter(i => i.status === 'pending').length > 5 && (
        <p className="text-xs text-gray-500 mt-2 text-center">
          +{items.filter(i => i.status === 'pending').length - 5} more
        </p>
      )}
    </div>
  );
}
