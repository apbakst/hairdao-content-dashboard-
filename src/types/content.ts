export type Platform = 'twitter' | 'instagram' | 'tiktok' | 'linkedin' | 'discord' | 'all';
export type Status = 'draft' | 'scheduled' | 'posted';
export type ContentType = 'educational' | 'product' | 'community' | 'humor' | 'results' | 'lifestyle' | 'engagement' | 'bts';

export interface Post {
  id: string;
  title: string;
  content: string;
  platform: Platform;
  type: ContentType;
  status: Status;
  scheduledDate?: string;
  scheduledTime?: string;
  ref?: string;
  day?: number;
  week?: number;
}

export interface CalendarDay {
  date: Date;
  posts: Post[];
  isCurrentMonth: boolean;
  isToday: boolean;
}

export interface FilterState {
  platform: Platform;
  status: Status | 'all';
  search: string;
}
