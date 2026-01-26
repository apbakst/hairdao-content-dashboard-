'use client';

import { useState } from 'react';
import { Post } from '@/types/content';
import { downloadCSV, downloadJSON } from '@/lib/export';

interface ExportButtonProps {
  posts: Post[];
}

export default function ExportButton({ posts }: ExportButtonProps) {
  const [showMenu, setShowMenu] = useState(false);

  const handleExportCSV = () => {
    downloadCSV(posts);
    setShowMenu(false);
  };

  const handleExportJSON = () => {
    downloadJSON(posts);
    setShowMenu(false);
  };

  const scheduledPosts = posts.filter(p => p.scheduledDate);

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium transition-colors flex items-center gap-2"
      >
        <span>📤</span>
        <span>Export</span>
      </button>

      {showMenu && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute right-0 mt-2 w-64 bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl z-20 overflow-hidden">
            <div className="p-3 border-b border-zinc-700">
              <p className="text-sm text-zinc-400">
                Export {posts.length} posts ({scheduledPosts.length} scheduled)
              </p>
            </div>
            
            <button
              onClick={handleExportCSV}
              className="w-full px-4 py-3 text-left hover:bg-zinc-700 transition-colors flex items-center gap-3"
            >
              <span className="text-xl">📊</span>
              <div>
                <div className="font-medium text-white">Export CSV</div>
                <div className="text-xs text-zinc-400">For spreadsheets & scheduling tools</div>
              </div>
            </button>

            <button
              onClick={handleExportJSON}
              className="w-full px-4 py-3 text-left hover:bg-zinc-700 transition-colors flex items-center gap-3"
            >
              <span className="text-xl">📋</span>
              <div>
                <div className="font-medium text-white">Export JSON</div>
                <div className="text-xs text-zinc-400">For developers & APIs</div>
              </div>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
