import { NextResponse } from 'next/server'

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const { slug } = params
  // TODO: fetch from Supabase by slug
  const cake = { id: 1, name: 'Vanilla Bliss', slug, base_price: 20000, description: 'Light sponge with vanilla buttercream.' }
  return NextResponse.json({ data: cake })
}
