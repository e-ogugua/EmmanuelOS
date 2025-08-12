import Image from 'next/image'
import Link from 'next/link'
import { sanityClient } from '@/lib/sanity'
import { posts as samplePosts } from '@/data/sample'

export const revalidate = 60

type Post = { _id: string; title: string; slug: string; image?: string; body?: any }

async function getPost(slug: string): Promise<Post | null> {
  try {
    const data = await sanityClient.fetch(
      `*[_type == "post" && slug.current == $slug][0]{
        _id, title, "slug": slug.current, "image": mainImage.asset->url, body
      }`,
      { slug }
    )
    if (data) return data as Post
  } catch {}
  const fallback = samplePosts.find(p => p.id === slug)
  if (!fallback) return null
  return { _id: fallback.id, title: fallback.title, slug: fallback.id, image: fallback.image }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  if (!post) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-semibold">Post not found</h1>
        <Link href="/blog" className="text-emerald-700 underline">Back to blog</Link>
      </main>
    )
  }
  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl md:text-3xl font-semibold">{post.title}</h1>
      {post.image && (
        <div className="relative aspect-[16/9] rounded-lg overflow-hidden mt-4">
          <Image src={post.image} alt={post.title} fill className="object-cover" />
        </div>
      )}
      <article className="prose max-w-none mt-6">
        <p>Coming soon: rich text content from Sanity.</p>
      </article>
    </main>
  )
}
