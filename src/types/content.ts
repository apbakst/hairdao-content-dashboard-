export type Platform = 'twitter' | 'instagram' | 'tiktok' | 'linkedin' | 'discord' | 'all';
export type Status = 'draft' | 'scheduled' | 'posted';

// New 3-category system
export type ContentType = 'ugc' | 'authority' | 'educational';

// Content type labels for display
export const ContentTypeLabels: Record<ContentType, string> = {
  ugc: '🎥 UGC / Community',
  authority: '🔬 Authority (Scientific)',
  educational: '📚 Educational',
};

// Content type descriptions
export const ContentTypeDescriptions: Record<ContentType, string> = {
  ugc: 'User-generated content, community highlights, testimonials, reposts',
  authority: 'Scientific studies, medical insights, research updates, clinical trial data',
  educational: 'Hair loss education, treatment explainers, myth-busting, how-tos',
};

// Product tags for Anagen
export type ProductTag = 'anagen-shampoo' | 'anagen-serum' | 'anagen-supplement' | 'precision-dut' | 'clinical-trial' | 'hairdao-general' | null;

export const ProductLabels: Record<NonNullable<ProductTag>, string> = {
  'anagen-shampoo': '🧴 Anagen Shampoo',
  'anagen-serum': '💧 Anagen Serum',
  'anagen-supplement': '💊 Anagen Supplement',
  'precision-dut': '🎯 Precision Dutasteride',
  'clinical-trial': '🧪 Clinical Trial',
  'hairdao-general': '💇 HairDAO General',
};

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
  // New fields
  product?: ProductTag;
  source?: string; // For UGC - link to original
  author?: string; // For UGC - original creator
  createdAt?: string;
  updatedAt?: string;
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
  type: ContentType | 'all';
  product: ProductTag | 'all';
  search: string;
}
