export interface Author {
  id: string
  name: string
  username: string
  bio: string | null
  photo_url: string | null
  social_links: Record<string, string> | null
  created_at: string
}

export interface Tag {
  id: string
  name: string
  slug: string
}

export interface Post {
  id: string
  slug: string
  title: string
  excerpt: string | null
  content_md: string | null
  content_html: string | null
  status: 'draft' | 'published'
  published_at: string | null
  author_id: string | null
  cover_url: string | null
  tags: string[] | null
  read_time: number | null
  canonical_url: string | null
  og_image: string | null
  created_at: string
  updated_at: string
}

export interface Comment {
  id: string
  post_id: string
  author_name: string
  author_email: string
  body: string
  approved: boolean
  created_at: string
}

export interface View {
  id: string
  post_id: string
  view_count: number
}

export interface NewsletterSubscriber {
  id: string
  email: string
  name: string | null
  source: string | null
  created_at: string
}
