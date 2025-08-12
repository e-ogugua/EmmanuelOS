import { Post } from '@/lib/supabase/types'

export function generateBlogMetadata(post?: Post) {
  if (!post) {
    return {
      title: 'CEOWrites Blog',
      description: 'Insights on technology, business, and faith from Emmanuel Ogugua',
      openGraph: {
        title: 'CEOWrites Blog',
        description: 'Insights on technology, business, and faith from Emmanuel Ogugua',
        type: 'website',
        locale: 'en_US',
        url: 'https://emmanuelogugua.dev/blog',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'CEOWrites Blog',
        description: 'Insights on technology, business, and faith from Emmanuel Ogugua',
      }
    }
  }

  return {
    title: post.title,
    description: post.excerpt || 'Read more on CEOWrites blog',
    openGraph: {
      title: post.title,
      description: post.excerpt || 'Read more on CEOWrites blog',
      type: 'article',
      locale: 'en_US',
      url: `https://emmanuelogugua.dev/blog/${post.slug}`,
      images: post.og_image ? [{ url: post.og_image }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || 'Read more on CEOWrites blog',
      images: post.og_image ? [post.og_image] : [],
    }
  }
}
