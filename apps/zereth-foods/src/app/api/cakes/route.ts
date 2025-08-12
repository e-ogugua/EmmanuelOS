import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabaseServer'
import { demoCakes } from '@/lib/demoCakes'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')
  const supabase = supabaseServer()

  let query = supabase
    .from('cakes')
    .select('id,name,slug,category,base_price,image_url')
    .order('created_at', { ascending: false })

  if (category) {
    query = query.eq('category', category)
  }

  const { data, error } = await query
  if (error) {
    const filtered = category ? demoCakes.filter(c=>c.category===category) : demoCakes
    return NextResponse.json({ data: filtered })
  }
  if (!data || data.length === 0) {
    const filtered = category ? demoCakes.filter(c=>c.category===category) : demoCakes
    return NextResponse.json({ data: filtered })
  }
  return NextResponse.json({ data })
}
