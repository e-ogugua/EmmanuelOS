import { supabaseServer } from '@/lib/supabase/server'
import { Post } from '@/lib/supabase/types'
import { formatDate } from '@/lib/utils'
import { generateBlogMetadata } from '@/lib/seo'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { data: post } = await supabaseServer
    .from('posts')
    .select('*')
    .eq('slug', params.slug)
    .single()

  const metadata = generateBlogMetadata(post || undefined)
  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: metadata.openGraph,
    twitter: metadata.twitter,
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { data: post, error } = await supabaseServer
    .from('posts')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (error || !post) {
    console.error('Error fetching post:', error)
    notFound()
  }

  // Increment view count
  await supabaseServer
    .from('views')
    .upsert({ post_id: post.id, view_count: 1 }, { onConflict: 'post_id' })
    .select()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8 sm:p-8">
            <div className="mb-6">
              <Link 
                href="/blog"
                className="text-matrix hover:text-matrix/80 font-medium inline-flex items-center"
              >
                ← Back to blog
              </Link>
            </div>
            
            <header className="mb-8">
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                {post.title}
              </h1>
              
              <div className="flex items-center mt-4 text-gray-600 dark:text-gray-400">
                <time dateTime={post.published_at || post.created_at}>
                  {formatDate(post.published_at || post.created_at)}
                </time>
                {post.read_time && (
                  <>
                    <span className="mx-2">•</span>
                    <span>{post.read_time} min read</span>
                  </>
                )}
              </div>
            </header>
            
            {post.cover_url && (
              <div className="mb-8 rounded-lg overflow-hidden">
                <img 
                  src={post.cover_url} 
                  alt={post.title} 
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
            
            <div 
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content_html || '' }}
            />
          </div>
        </article>
        
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Subscribe to Newsletter</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Get the latest posts delivered right to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Your email"
              className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-matrix focus:border-matrix bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-matrix text-white font-medium rounded-md hover:bg-matrix/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-matrix whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
