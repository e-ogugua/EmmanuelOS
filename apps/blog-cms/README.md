# CEOWrites Blog Platform

A modern, SEO-friendly, and responsive personal blog built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Features

- **Admin Panel**: Secure authentication and content management
- **Markdown Editor**: Write posts in Markdown with live preview
- **Public Blog**: Responsive blog feed and individual post pages
- **SEO Optimization**: Automatic metadata generation for posts
- **Newsletter Integration**: Subscription management
- **Social Auto-posting**: Automatic posting to social media when publishing
- **Analytics**: Page view and event tracking
- **Responsive Design**: Mobile-first design with Tailwind CSS

## Tech Stack

- **Next.js 14+** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Supabase** (Authentication, Database, Storage)
- **MDX** for content rendering
- **@uiw/react-md-editor** for admin Markdown editing

## Setup Instructions

1. **Supabase Setup**:
   - Create a new Supabase project
   - Run the SQL migration from `src/lib/db/migrations/001_initial_schema.sql`
   - Configure authentication settings
   - Set up storage buckets for images if needed

2. **Environment Variables**:
   Create a `.env.local` file in the root directory with the following variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

3. **Development**:
   ```bash
   npm run dev
   ```

4. **Build**:
   ```bash
   npm run build
   ```

5. **Deployment**:
   - Deploy to Vercel for seamless Next.js integration
   - Configure environment variables in Vercel dashboard
   - Set up Supabase webhooks for social auto-posting

## Project Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── page.tsx          # Admin login
│   │   ├── dashboard/
│   │   │   └── page.tsx     # Admin dashboard
│   │   └── editor/
│   │       ├── page.tsx     # Create new post
│   │       └── [id]/
│   │           └── page.tsx # Edit existing post
│   ├── blog/
│   │   ├── page.tsx          # Blog feed
│   │   └── [slug]/
│   │       └── page.tsx     # Individual blog post
│   └── api/
│       ├── newsletter/
│       │   └── subscribe/
│       │       └── route.ts # Newsletter subscription endpoint
│       └── webhooks/
│           └── social-post/
│               └── route.ts # Social media auto-posting webhook
├── lib/
│   ├── supabase/
│   │   ├── client.ts       # Supabase client config
│   │   ├── server.ts       # Supabase server config
│   │   └── types.ts        # TypeScript types
│   ├── db/
│   │   └── migrations/
│   │       └── 001_initial_schema.sql # Database schema
│   ├── seo.ts              # SEO metadata utilities
│   ├── analytics.ts        # Analytics tracking utilities
│   ├── social.ts           # Social media posting utilities
│   └── utils.ts            # General utility functions
└── components/
    └── (future components)
```

## Integration with Portfolio Site

To integrate with your portfolio site (emmanuelogugua.dev):

1. Add a link to `/blog` in your portfolio navigation
2. Create a blog section on your portfolio homepage that fetches recent posts
3. Ensure consistent branding and styling between the two sites

## Future Enhancements

- Comment system integration
- RSS feed generation
- Dark mode toggle
- Search functionality
- Tag-based filtering
- Author profiles
- Post sharing buttons
- Rich text editor options
