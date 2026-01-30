'use client';

import { useState, useMemo } from 'react';
import { Post, Status } from '@/types/content';
import { PostCard } from './PostCard';

interface CalendarProps {
  posts: Post[];
}

const platformEmoji: Record<string, string> = {
  twitter: '🐦',
  instagram: '📸',
  tiktok: '🎵',
  linkedin: '💼',
  discord: '💬',
};

export function Calendar({ posts }: CalendarProps) {
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1)); // Feb 2026 to match content
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const scheduledPosts = useMemo(() => {
    return posts.filter(p => p.scheduledDate);
  }, [posts]);

  const postsByDate = useMemo(() => {
    const map: Record<string, Post[]> = {};
    scheduledPosts.forEach(post => {
      if (post.scheduledDate) {
        if (!map[post.scheduledDate]) {
          map[post.scheduledDate] = [];
        }
        map[post.scheduledDate].push(post);
      }
    });
    return map;
  }, [scheduledPosts]);

  const daysInMonth = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: Date[] = [];
    
    // Add days from previous month to fill first week
    const startPadding = firstDay.getDay();
    for (let i = startPadding - 1; i >= 0; i--) {
      const d = new Date(year, month, -i);
      days.push(d);
    }
    
    // Add all days in month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    // Add days to complete last week
    const endPadding = 6 - lastDay.getDay();
    for (let i = 1; i <= endPadding; i++) {
      days.push(new Date(year, month + 1, i));
    }
    
    return days;
  }, [currentDate]);

  const currentWeekDays = useMemo(() => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      return d;
    });
  }, [currentDate]);

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const isCurrentMonth = (date: Date) => date.getMonth() === currentDate.getMonth();
  const isToday = (date: Date) => formatDate(date) === formatDate(new Date());

  const navigateMonth = (delta: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + delta);
    setCurrentDate(newDate);
  };

  const navigateWeek = (delta: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (delta * 7));
    setCurrentDate(newDate);
  };

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const renderDayCell = (date: Date, isWeekView = false) => {
    const dateStr = formatDate(date);
    const dayPosts = postsByDate[dateStr] || [];
    const isSelected = selectedDay === dateStr;
    
    return (
      <div
        key={dateStr}
        onClick={() => setSelectedDay(isSelected ? null : dateStr)}
        className={`
          ${isWeekView ? 'min-h-48' : 'min-h-24'} 
          p-2 border border-gray-200 rounded-lg cursor-pointer transition-all
          ${!isCurrentMonth(date) ? 'opacity-40' : ''}
          ${isToday(date) ? 'border-purple-500 bg-purple-50' : ''}
          ${isSelected ? 'ring-2 ring-purple-500 bg-purple-50' : 'hover:bg-gray-50'}
        `}
      >
        <div className={`text-sm font-medium mb-1 ${isToday(date) ? 'text-purple-600' : 'text-gray-600'}`}>
          {date.getDate()}
          {isWeekView && <span className="ml-1 text-gray-400">{dayNames[date.getDay()]}</span>}
        </div>
        
        <div className="space-y-1">
          {dayPosts.slice(0, isWeekView ? 6 : 3).map(post => (
            <div
              key={post.id}
              className="text-xs px-1.5 py-0.5 rounded bg-gray-100 truncate flex items-center gap-1"
              title={post.title}
            >
              <span>{platformEmoji[post.platform]}</span>
              <span className="truncate">{post.title}</span>
            </div>
          ))}
          {dayPosts.length > (isWeekView ? 6 : 3) && (
            <div className="text-xs text-gray-400 px-1">
              +{dayPosts.length - (isWeekView ? 6 : 3)} more
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-gray-900">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <div className="flex gap-1">
            <button
              onClick={() => viewMode === 'month' ? navigateMonth(-1) : navigateWeek(-1)}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
            >
              ←
            </button>
            <button
              onClick={() => viewMode === 'month' ? navigateMonth(1) : navigateWeek(1)}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
            >
              →
            </button>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('week')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'week' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setViewMode('month')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'month' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Month
          </button>
        </div>
      </div>

      {/* Day names header */}
      <div className="grid grid-cols-7 gap-2">
        {dayNames.map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {viewMode === 'month'
          ? daysInMonth.map(date => renderDayCell(date, false))
          : currentWeekDays.map(date => renderDayCell(date, true))
        }
      </div>

      {/* Selected Day Posts */}
      {selectedDay && postsByDate[selectedDay] && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Posts for {selectedDay}
          </h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {postsByDate[selectedDay].map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
