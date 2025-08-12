import './globals.css'
import type { Metadata } from 'next'

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
      <body className="min-h-screen antialiased text-gray-900">
        {children}
      </body>
    </html>
  )
}
