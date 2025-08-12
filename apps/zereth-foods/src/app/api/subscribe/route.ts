import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { email } = await req.json()
  // TODO: store in Supabase table subscribers
  return NextResponse.json({ ok: true })
}
