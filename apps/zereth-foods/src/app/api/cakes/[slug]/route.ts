import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabaseServer'
import { demoCakes } from '@/lib/demoCakes'

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const { slug } = params
  const supabase = supabaseServer()
  if (!supabase) {
    const fallback = demoCakes.find(c=>c.slug===slug)
    if (!fallback) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ data: fallback })
  }
  const { data, error } = await supabase
    .from('cakes')
    .select('id,name,slug,category,base_price,description,image_url,gallery')
    .eq('slug', slug)
    .single()

  if (error || !data) {
    const fallback = demoCakes.find(c=>c.slug===slug)
    if (!fallback) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ data: fallback })
  }
  return NextResponse.json({ data })
}
