import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Emmdra Lifestyle — Live. Create. Style. Empower.',
  description: 'A Nigerian family lifestyle brand merging fashion, beauty, DIY, learning, and shopping.',
  openGraph: {
    title: 'Emmdra Lifestyle',
    description: 'Live. Create. Style. Empower.',
    locale: 'en_NG'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG">
      <head>
        {/* Snipcart styles */}
        <link rel="stylesheet" href="https://cdn.snipcart.com/themes/v3.6.0/default/snipcart.css" />
        {/* Flutterwave */}
        <script src="https://checkout.flutterwave.com/v3.js" async></script>
      </head>
      <body className="min-h-screen antialiased text-gray-900">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b">
          <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
            <Link href="/" className="font-bold text-lg">Emmdra Lifestyle</Link>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/store" className="hover:text-emerald-700">Store</Link>
              <Link href="/diy" className="hover:text-emerald-700">DIY</Link>
              <Link href="/learn" className="hover:text-emerald-700">Learn</Link>
              <Link href="/blog" className="hover:text-emerald-700">Blog</Link>
              <Link href="/contact" className="hover:text-emerald-700">Contact</Link>
              <button className="snipcart-checkout px-3 py-1.5 rounded bg-emerald-600 text-white">Cart</button>
            </div>
          </nav>
        </header>
        {children}
        {/* Snipcart script and container */}
        <script async src="https://cdn.snipcart.com/themes/v3.6.0/default/snipcart.js"></script>
        <div
          hidden
          id="snipcart"
          data-api-key={process.env.NEXT_PUBLIC_SNIPCART_PUBLIC_API_KEY}
          data-currency="NGN"
        />
      </body>
    </html>
  )
}
