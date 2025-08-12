import Image from 'next/image'
import Link from 'next/link'
import { tutorials } from '@/data/sample'

export const dynamic = 'force-static'

export default function DIYPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl md:text-3xl font-semibold">DIY & Tutorials</h1>
      <p className="text-gray-600">Learn and create with accessible, family-friendly guides.</p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {tutorials.map(t => (
          <div key={t.id} className="border rounded-lg overflow-hidden bg-white">
            <div className="relative aspect-video">
              <Image src={t.image} alt={t.title} fill className="object-cover" />
            </div>
            <div className="p-3">
              <div className="font-medium">{t.title}</div>
              <div className="text-sm text-gray-600">Difficulty: {t.difficulty}</div>
              <Link
                href={{ pathname: '/contact', query: { topic: 'tutorial', ref: t.id } }}
                className="inline-block mt-2 px-3 py-1.5 text-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded"
              >
                Try this tutorial
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
