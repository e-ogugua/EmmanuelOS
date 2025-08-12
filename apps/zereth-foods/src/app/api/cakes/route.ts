import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')
  // TODO: fetch from Supabase
  const cakes = [
    { id: 1, name: 'Vanilla Bliss', slug: 'vanilla-bliss', category: 'Birthday', base_price: 20000, image_url: 'https://images.unsplash.com/photo-1541976076758-347942db1970' },
  ].filter(c => !category || c.category === category)
  return NextResponse.json({ data: cakes })
}
