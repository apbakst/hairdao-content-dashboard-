# HairDAO Content Dashboard

A Next.js 14 content management dashboard for HairDAO's social media strategy. Built with TypeScript, Tailwind CSS, and the App Router.

![Dashboard Preview](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss)

## Features

### 📱 Content Management
- **Post Cards**: View all content with copy-to-clipboard functionality
- **Platform Filtering**: Filter by Twitter, Instagram, TikTok, LinkedIn, Discord
- **Status Tracking**: Mark posts as Draft, Scheduled, or Posted
- **Search**: Full-text search across titles, content, and references

### 📅 Calendar View
- **Week/Month Toggle**: Switch between weekly and monthly views
- **Visual Scheduling**: See posts mapped to their scheduled dates
- **Click to Expand**: Select a day to see all scheduled posts

### 📤 Export
- **CSV Export**: For spreadsheets and scheduling tools (Hootsuite, Buffer, etc.)
- **JSON Export**: For developers and API integrations

### 🎨 Design
- Dark theme matching HairDAO brand
- Responsive design (mobile-friendly)
- Platform-specific color coding
- Smooth animations and transitions

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/apbakst/hairdao-content-dashboard-.git
cd hairdao-content-dashboard-

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx        # Main dashboard page
│   ├── layout.tsx      # Root layout with metadata
│   └── globals.css     # Global styles
├── components/
│   ├── PostCard.tsx    # Individual post card component
│   ├── Calendar.tsx    # Calendar view component
│   ├── FilterBar.tsx   # Platform/status/search filters
│   └── ExportButton.tsx # CSV/JSON export functionality
├── lib/
│   ├── content-data.ts # Pre-loaded content posts
│   ├── content-parser.ts # Markdown parsing utilities
│   └── export.ts       # Export functions
└── types/
    └── content.ts      # TypeScript interfaces
```

## Content Structure

Posts are defined with the following properties:

```typescript
interface Post {
  id: string;           // Unique identifier
  title: string;        // Post title/headline
  content: string;      // Full post content
  platform: Platform;   // twitter | instagram | tiktok | linkedin | discord
  type: ContentType;    // educational | product | community | humor | results | lifestyle
  status: Status;       // draft | scheduled | posted
  scheduledDate?: string; // YYYY-MM-DD format
  scheduledTime?: string; // HH:MM format
  ref?: string;         // Reference code from content batches
}
```

## Adding New Content

1. Edit `src/lib/content-data.ts`
2. Add new posts to the `initialPosts` array
3. Follow the existing format for consistency

Example:
```typescript
{
  id: 'B3-twitter-1',
  title: 'New Research Update',
  content: `Your post content here...`,
  platform: 'twitter',
  type: 'educational',
  status: 'draft',
  ref: 'B3-T1',
}
```

## Workflow

1. **Create Content**: Add posts to the content data file
2. **Review**: Use Grid view to review and copy content
3. **Schedule**: Set dates/times using the calendar picker
4. **Track**: Update status as posts go live
5. **Export**: Download CSV for bulk scheduling tools

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Fonts**: Inter (via next/font)

## Related Resources

- [HairDAO Website](https://hairdao.xyz)
- [Content Calendar (Markdown)](/public/content/30-day-content-calendar.md)
- [Content Batches](/public/content/)

## License

MIT

---

Built with 💇 by HairDAO
