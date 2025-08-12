-- Create authors table
create table if not exists public.authors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  username text unique not null,
  bio text,
  photo_url text,
  social_links jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create tags table
create table if not exists public.tags (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  slug text unique not null
);

-- Create posts table
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content_md text,
  content_html text,
  status text check (status in ('draft', 'published')) default 'draft',
  published_at timestamp with time zone,
  author_id uuid references public.authors(id),
  cover_url text,
  tags uuid[],
  read_time integer,
  canonical_url text,
  og_image text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create comments table
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references public.posts(id) not null,
  author_name text not null,
  author_email text not null,
  body text not null,
  approved boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create views table
create table if not exists public.views (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references public.posts(id) not null,
  view_count integer default 0
);

-- Create newsletter_subscribers table
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text,
  source text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on all tables
alter table public.authors enable row level security;
alter table public.tags enable row level security;
alter table public.posts enable row level security;
alter table public.comments enable row level security;
alter table public.views enable row level security;
alter table public.newsletter_subscribers enable row level security;
