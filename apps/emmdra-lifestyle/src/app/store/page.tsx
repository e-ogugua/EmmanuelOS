import ProductCard from '@/components/ProductCard'
import { products } from '@/data/sample'

export const dynamic = 'force-static'

export default function StorePage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl md:text-3xl font-semibold">Store</h1>
      <p className="text-gray-600">Shop curated African fashion, beauty, and DIY kits.</p>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(p => (
          <ProductCard key={p.id} id={p.id} title={p.title} price={p.price} image={p.image} />
        ))}
      </div>
    </main>
  )
}
