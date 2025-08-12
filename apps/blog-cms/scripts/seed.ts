import dotenv from 'dotenv'
import { supabaseServer } from '../src/lib/supabase/server'
import { slugify } from '../src/lib/utils'

dotenv.config({ path: '.env.local' })

// Sample author data
const authors = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    name: 'Emmanuel Ogugua',
    username: 'ceotr',
    bio: 'Developer, hacker, business strategist, and serial entrepreneur building solutions for the African market.',
    photo_url: 'https://emmanuelogugua.dev/images/profile.jpg',
    social_links: JSON.stringify({
      twitter: 'https://twitter.com/ceotr_',
      linkedin: 'https://linkedin.com/in/emmanuelogugua',
      github: 'https://github.com/ceotr'
    }),
    created_at: new Date().toISOString()
  }
]

// Sample tags
const tags = [
  { id: '22222222-2222-2222-2222-222222222222', name: 'Technology', slug: 'technology' },
  { id: '33333333-3333-3333-3333-333333333333', name: 'Business', slug: 'business' },
  { id: '44444444-4444-4444-4444-444444444444', name: 'Faith', slug: 'faith' },
  { id: '55555555-5555-5555-5555-555555555555', name: 'Personal Growth', slug: 'personal-growth' }
]

// Sample posts
const posts = [
  {
    id: '66666666-6666-6666-6666-666666666666',
    slug: slugify('Welcome to CEOWrites - A New Era of Content Creation'),
    title: 'Welcome to CEOWrites - A New Era of Content Creation',
    excerpt: 'Introducing a modern, SEO-friendly, and responsive personal blog for sharing insights on technology, business, and faith.',
    content_md: `# Welcome to CEOWrites

This is the first post on CEOWrites, a personal blog platform built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## What is CEOWrites?

CEOWrites is a modern blogging platform designed for developers, entrepreneurs, and content creators who want to share their insights with the world. It features:

- **SEO Optimization**: Built-in SEO utilities for better search engine visibility
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Markdown Support**: Write posts in Markdown with code syntax highlighting
- **Social Media Integration**: Auto-posting to Twitter and LinkedIn
- **Newsletter Integration**: Built-in subscriber management
- **Analytics**: Track page views and user engagement

## Why CEOWrites?

As part of the EmmanuelOS ecosystem, CEOWrites represents my commitment to creating elegant, well-structured applications that reflect my professional identity as a developer, hacker, business strategist, and serial entrepreneur.

This platform will be used to share insights on:
- Technology and development
- Business strategies for the African market
- Personal growth and faith
- My journey in building 1,000 apps over 10,000 hours

Stay tuned for more content coming soon!

*Published on ${new Date().toLocaleDateString()}*`,
    content_html: null,
    status: 'published',
    published_at: new Date().toISOString(),
    author_id: '11111111-1111-1111-1111-111111111111',
    cover_url: 'https://emmanuelogugua.dev/images/blog-cover.jpg',
    tags: ['22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333'],
    read_time: 2,
    canonical_url: null,
    og_image: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '77777777-7777-7777-7777-777777777777',
    slug: slugify('Building a Modular Monorepo Ecosystem with Nx'),
    title: 'Building a Modular Monorepo Ecosystem with Nx',
    excerpt: 'How I structured my personal digital OS using Nx workspaces to create a scalable, maintainable ecosystem of 18 interconnected applications.',
    content_md: `# Building a Modular Monorepo Ecosystem with Nx

Creating a monorepo for the EmmanuelOS ecosystem required careful planning and architecture decisions.

## Why a Monorepo?

A monorepo approach offers several advantages:
- **Shared Code**: Libraries and components can be easily shared between apps
- **Consistent Tooling**: All apps use the same build tools, linters, and configurations
- **Atomic Changes**: Related changes across multiple apps can be committed together
- **Simplified Dependency Management**: Dependencies are managed centrally

## Structure

The EmmanuelOS monorepo is structured as follows:
- \`apps/\` - Contains all 18 core applications
- \`libs/\` - Shared libraries and components
- \`tools/\` - Custom tools and scripts

Each app is a standalone Next.js or Svelte application that can be developed, built, and deployed independently while still benefiting from shared code and consistent tooling.

## Benefits

This approach has allowed me to:
1. Build apps faster with shared components
2. Maintain consistency across all projects
3. Easily refactor and update shared code
4. Test integrations between apps

More posts on the technical implementation coming soon!

*Published on ${new Date().toLocaleDateString()}*`,
    content_html: null,
    status: 'published',
    published_at: new Date().toISOString(),
    author_id: '11111111-1111-1111-1111-111111111111',
    cover_url: 'https://emmanuelogugua.dev/images/monorepo-cover.jpg',
    tags: ['33333333-3333-3333-3333-333333333333', '55555555-5555-5555-5555-555555555555'],
    read_time: 3,
    canonical_url: null,
    og_image: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '88888888-8888-8888-8888-888888888888',
    slug: slugify('Faith and Technology - Finding Balance in the Digital Age'),
    title: 'Faith and Technology - Finding Balance in the Digital Age',
    excerpt: 'Exploring how faith and technology can coexist harmoniously in our modern world.',
    content_md: `# Faith and Technology

In today's digital world, finding balance between faith and technology is more important than ever.

## The Challenge

Technology can be both a blessing and a distraction when it comes to our spiritual lives.

## Finding Harmony

Here are some ways to maintain that balance:
- Set boundaries for technology use
- Use technology to enhance faith practices
- Stay mindful of digital distractions

More content coming soon!

*Published on ${new Date().toLocaleDateString()}*`,
    content_html: null,
    status: 'published',
    published_at: new Date().toISOString(),
    author_id: '11111111-1111-1111-1111-111111111111',
    cover_url: 'https://emmanuelogugua.dev/images/faith-tech-cover.jpg',
    tags: ['44444444-4444-4444-4444-444444444444'],
    read_time: 4,
    canonical_url: null,
    og_image: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '99999999-9999-9999-9999-999999999999',
    slug: slugify('Personal Growth Strategies for Entrepreneurs'),
    title: 'Personal Growth Strategies for Entrepreneurs',
    excerpt: 'Key personal development strategies that every entrepreneur should adopt for long-term success.',
    content_md: `# Personal Growth for Entrepreneurs

Entrepreneurship is as much about personal growth as it is about business success.

## Core Principles

Here are essential growth strategies:
- Continuous learning
- Resilience building
- Mindfulness practices
- Networking and mentorship

## Implementation

These strategies form the foundation of my 10,000-hour journey to build 1,000 apps.

More content coming soon!

*Published on ${new Date().toLocaleDateString()}*`,
    content_html: null,
    status: 'published',
    published_at: new Date().toISOString(),
    author_id: '11111111-1111-1111-1111-111111111111',
    cover_url: 'https://emmanuelogugua.dev/images/growth-cover.jpg',
    tags: ['55555555-5555-5555-5555-555555555555'],
    read_time: 5,
    canonical_url: null,
    og_image: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

async function seedDatabase() {
  console.log('Seeding database...')
  
  // Insert authors
  console.log('Inserting authors...')
  const { data: authorData, error: authorError } = await supabaseServer
    .from('authors')
    .upsert(authors, { onConflict: 'id' })
  
  if (authorError) {
    console.error('Error inserting authors:', authorError)
    return
  }
  
  // Insert tags
  console.log('Inserting tags...')
  const { data: tagData, error: tagError } = await supabaseServer
    .from('tags')
    .upsert(tags, { onConflict: 'id' })
  
  if (tagError) {
    console.error('Error inserting tags:', tagError)
    return
  }
  
  // Insert posts
  console.log('Inserting posts...')
  const { data: postData, error: postError } = await supabaseServer
    .from('posts')
    .upsert(posts, { onConflict: 'id' })
  
  if (postError) {
    console.error('Error inserting posts:', postError)
    return
  }
  
  console.log('Database seeded successfully!')
}

seedDatabase()
