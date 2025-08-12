import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabaseServer'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const { id } = params
  const supabase = supabaseServer()

  const { data: order, error } = await supabase
    .from('orders')
    .select('id, status, total_price, delivery_datetime, notes, channel, created_at, customer:customers(id,name,phone,email), items:order_items(id,cake_id,custom_size,flavor,icing_style,custom_text,price)')
    .eq('id', id)
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 404 })
  return NextResponse.json({ data: order })
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { id } = params
  const { status } = await req.json()
  const supabase = supabaseServer()
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', id)
    .select('id,status')
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data)
}
