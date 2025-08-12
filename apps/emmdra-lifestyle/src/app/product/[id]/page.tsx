import Image from 'next/image'
import { products } from '@/data/sample'
import Link from 'next/link'

export default function ProductDetail({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === params.id)
  if (!product) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-semibold">Product not found</h1>
        <Link href="/store" className="text-emerald-700 underline">Back to store</Link>
      </main>
    )
  }
  return (
    <main className="max-w-5xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-8">
      <div className="relative aspect-square rounded-lg overflow-hidden bg-white">
        <Image src={product.image} alt={product.title} fill className="object-cover" />
      </div>
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold">{product.title}</h1>
        <div className="mt-2 text-xl text-emerald-700 font-bold">₦{product.price.toLocaleString('en-NG')}</div>
        <p className="mt-4 text-gray-700">Beautifully crafted for everyday elegance. Ships within Nigeria.</p>
        <button
          className="snipcart-add-item mt-6 px-5 py-3 rounded bg-emerald-600 hover:bg-emerald-700 text-white"
          data-item-id={product.id}
          data-item-price={product.price.toFixed(2)}
          data-item-url={`/product/${product.id}`}
          data-item-description={product.title}
          data-item-image={product.image}
          data-item-name={product.title}
          data-item-currency="NGN"
        >
          Add to Cart
        </button>
        <div className="mt-8">
          <h2 className="font-semibold">How to Use</h2>
          <ul className="list-disc ml-5 text-gray-700">
            <li>Carefully follow included instructions.</li>
            <li>Suitable for Lagos and nationwide delivery.</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
