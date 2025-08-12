import { NextResponse } from 'next/server'
import { z } from 'zod'
import { supabaseServer } from '@/lib/supabaseServer'

const Item = z.object({
  cake_id: z.string(),
  custom_size: z.string().optional(),
  flavor: z.string(),
  icing_style: z.string().optional(),
  custom_text: z.string().optional(),
  price: z.number(),
})

const OrderSchema = z.object({
  customer: z.object({ name: z.string(), phone: z.string(), email: z.string().email().optional() }),
  items: z.array(Item).min(1),
  delivery_datetime: z.string(),
  notes: z.string().optional(),
  channel: z.enum(['web','whatsapp']).default('web')
})

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = OrderSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 400 })

  const { customer, items, delivery_datetime, notes, channel } = parsed.data
  const supabase = supabaseServer()

  // 1) find or create customer by phone
  const { data: existingCustomer, error: fetchCustErr } = await supabase
    .from('customers')
    .select('id')
    .eq('phone', customer.phone)
    .maybeSingle()
  if (fetchCustErr) return NextResponse.json({ error: fetchCustErr.message }, { status: 500 })

  let customerId = existingCustomer?.id as string | undefined
  if (!customerId) {
    const { data: createdCustomer, error: createCustErr } = await supabase
      .from('customers')
      .insert({ name: customer.name, phone: customer.phone, email: customer.email })
      .select('id')
      .single()
    if (createCustErr) return NextResponse.json({ error: createCustErr.message }, { status: 500 })
    customerId = createdCustomer.id as string
  }

  // 2) create order
  const total = items.reduce((sum, it) => sum + it.price, 0)
  const { data: createdOrder, error: orderErr } = await supabase
    .from('orders')
    .insert({
      customer_id: customerId,
      total_price: total,
      delivery_datetime,
      status: 'New',
      notes,
      channel,
    })
    .select('id')
    .single()
  if (orderErr) return NextResponse.json({ error: orderErr.message }, { status: 500 })

  const orderId = createdOrder.id as string

  // 3) create order_items
  const itemsPayload = items.map((it) => ({
    order_id: orderId,
    cake_id: it.cake_id,
    custom_size: it.custom_size,
    flavor: it.flavor,
    icing_style: it.icing_style,
    custom_text: it.custom_text,
    price: it.price,
  }))
  const { error: itemsErr } = await supabase.from('order_items').insert(itemsPayload)
  if (itemsErr) return NextResponse.json({ error: itemsErr.message }, { status: 500 })

  // TODO: notifications (email/WhatsApp)
  return NextResponse.json({ id: orderId })
}
