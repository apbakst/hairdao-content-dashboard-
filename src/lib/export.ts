import { Post } from '@/types/content';

export function exportToCSV(posts: Post[]): string {
  const headers = ['ID', 'Platform', 'Title', 'Content', 'Type', 'Status', 'Scheduled Date', 'Scheduled Time', 'Ref'];
  
  const rows = posts.map(post => [
    post.id,
    post.platform,
    `"${post.title.replace(/"/g, '""')}"`,
    `"${post.content.replace(/"/g, '""').replace(/\n/g, '\\n')}"`,
    post.type,
    post.status,
    post.scheduledDate || '',
    post.scheduledTime || '',
    post.ref || '',
  ]);

  return [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
}

export function downloadCSV(posts: Post[], filename: string = 'hairdao-content-schedule.csv') {
  const csv = exportToCSV(posts);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportToJSON(posts: Post[]): string {
  return JSON.stringify(posts, null, 2);
}

export function downloadJSON(posts: Post[], filename: string = 'hairdao-content-schedule.json') {
  const json = exportToJSON(posts);
  const blob = new Blob([json], { type: 'application/json' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
