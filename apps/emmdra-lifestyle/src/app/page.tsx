import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="relative h-[70vh] overflow-hidden">
        <Image
          src="https://res.cloudinary.com/demo/image/upload/c_fill,w_1600,h_900,q_auto,f_auto/fashion.jpg"
          alt="Emmdra Lifestyle hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-5xl mx-auto h-full flex flex-col items-center justify-center px-6 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold">Emmdra Lifestyle</h1>
          <p className="mt-3 md:mt-4 text-lg md:text-2xl">Live. Create. Style. Empower.</p>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-3">
            <span className="px-4 py-2 bg-white/10 rounded-full">Fashion</span>
            <span className="px-4 py-2 bg-white/10 rounded-full">Beauty</span>
            <span className="px-4 py-2 bg-white/10 rounded-full">DIY</span>
            <span className="px-4 py-2 bg-white/10 rounded-full">Learn</span>
            <span className="px-4 py-2 bg-white/10 rounded-full">Shop</span>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-md text-white" href="#store">Explore Store</Link>
            <Link className="px-6 py-3 bg-amber-500 hover:bg-amber-600 rounded-md text-white" href="#diy">Watch DIY</Link>
            <Link className="px-6 py-3 bg-violet-600 hover:bg-violet-700 rounded-md text-white" href="#community">Join Community</Link>
          </div>
        </div>
      </section>

      <section id="store" className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-semibold">Featured Products</h2>
        <p className="text-gray-600">Clean, mobile-friendly product grid in ₦ Naira.</p>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1,2,3,4,5,6,7,8].map(i => (
            <div key={i} className="border rounded-lg overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image src={`https://res.cloudinary.com/demo/image/upload/c_fill,w_800,h_600,q_auto,f_auto/fashion${i%3}.jpg`} alt="Product" fill className="object-cover" />
              </div>
              <div className="p-3">
                <div className="font-medium">Sample Product {i}</div>
                <div className="text-emerald-700 font-semibold">₦{(i*2500).toLocaleString('en-NG')}</div>
                <button className="mt-2 w-full px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="diy" className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-semibold">DIY & Tutorials</h2>
        <p className="text-gray-600">Video/photo guides for African creators and families.</p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1,2,3].map(i => (
            <div key={i} className="border rounded-lg overflow-hidden">
              <div className="relative aspect-video">
                <Image src={`https://res.cloudinary.com/demo/image/upload/c_fill,w_1200,h_675,q_auto,f_auto/beauty${i}.jpg`} alt="Tutorial" fill className="object-cover" />
              </div>
              <div className="p-3">
                <div className="font-medium">DIY Tutorial {i}</div>
                <div className="text-sm text-gray-600">Difficulty: {i % 2 === 0 ? 'Medium' : 'Easy'}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
