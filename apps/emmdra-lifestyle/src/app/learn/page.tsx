import Image from 'next/image'
import Link from 'next/link'
import { courses } from '@/data/sample'

export const dynamic = 'force-static'

export default function LearnPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl md:text-3xl font-semibold">Learn</h1>
      <p className="text-gray-600">Short courses to grow your lifestyle brand and skills.</p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses.map(c => (
          <div key={c.id} className="border rounded-lg overflow-hidden bg-white">
            <div className="relative aspect-[4/3]">
              <Image src={c.image} alt={c.title} fill className="object-cover" />
            </div>
            <div className="p-3">
              <div className="font-medium">{c.title}</div>
              <div className="text-emerald-700 font-semibold">₦{c.price.toLocaleString('en-NG')}</div>
              <div className="text-sm text-gray-600">Duration: {c.duration}</div>
              <Link
                href={{ pathname: '/contact', query: { topic: 'course', ref: c.id } }}
                className="inline-block mt-2 px-3 py-1.5 text-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded"
              >
                Enroll interest
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
