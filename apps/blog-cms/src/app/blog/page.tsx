import { getSupabaseServer } from '@/lib/supabase/server'
import { Post } from '@/lib/supabase/types'
import { formatDate, getExcerpt } from '@/lib/utils'
import { generateBlogMetadata } from '@/lib/seo'
import Link from 'next/link'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const metadata = generateBlogMetadata()
  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: metadata.openGraph,
    twitter: metadata.twitter,
  }
}

export default async function BlogPage() {
  const supabase = getSupabaseServer()
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts:', error)
    return <div className="text-red-500">Error loading posts</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            CEOWrites Blog
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 sm:mt-4">
            Insights on technology, business, and faith from Emmanuel Ogugua
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts?.map((post) => (
            <div 
              key={post.id} 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {post.cover_url && (
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.cover_url} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <time dateTime={post.published_at || post.created_at}>
                    {formatDate(post.published_at || post.created_at)}
                  </time>
                  {post.read_time && (
                    <span className="mx-2">•</span>
                  )}
                  {post.read_time && (
                    <span>{post.read_time} min read</span>
                  )}
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {getExcerpt(post.excerpt || post.content_md || '')}
                </p>
                <div className="flex justify-between items-center">
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="text-matrix font-medium hover:text-matrix/80"
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
