import Image from 'next/image'
import Link from 'next/link'
import { sanityClient } from '@/lib/sanity'
import { posts as samplePosts } from '@/data/sample'

export const revalidate = 60

async function getPosts() {
  try {
    const data = await sanityClient.fetch(
      `*[_type == "post"]|order(_createdAt desc)[0...12]{
        _id, title, "slug": slug.current, "image": mainImage.asset->url
      }`
    )
    return data as { _id: string; title: string; slug: string; image?: string }[]
  } catch {
    return samplePosts.map(p => ({ _id: p.id, title: p.title, slug: p.id, image: p.image }))
  }
}

export default async function BlogPage() {
  const posts = await getPosts()
  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl md:text-3xl font-semibold">Blog</h1>
      <p className="text-gray-600">Stories and insights from Emmdra Lifestyle.</p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts.map(p => (
          <Link key={p._id} href={`/blog/${p.slug}`} className="border rounded-lg overflow-hidden bg-white">
            <div className="relative aspect-[4/3]">
              <Image src={p.image || 'https://res.cloudinary.com/demo/image/upload/c_fill,w_1200,h_900,q_auto,f_auto/fashion.jpg'} alt={p.title} fill className="object-cover" />
            </div>
            <div className="p-3">
              <div className="font-medium">{p.title}</div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
