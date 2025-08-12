import { NextResponse } from 'next/server'
import { z } from 'zod'

const Item = z.object({
  cake_id: z.number(),
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

  // TODO: write to Supabase, send notifications
  const orderId = Math.floor(Math.random()*100000)
  return NextResponse.json({ id: orderId })
}
