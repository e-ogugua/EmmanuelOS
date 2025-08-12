import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabaseServer'

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const { slug } = params
  const supabase = supabaseServer()
  const { data, error } = await supabase
    .from('cakes')
    .select('id,name,slug,category,base_price,description,image_url,gallery')
    .eq('slug', slug)
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 404 })
  return NextResponse.json({ data })
}
