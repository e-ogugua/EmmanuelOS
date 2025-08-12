import { NextResponse } from 'next/server'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const { id } = params
  // TODO: fetch from Supabase with RLS for staff
  return NextResponse.json({ data: { id, status: 'New' } })
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { id } = params
  const { status } = await req.json()
  // TODO: update in Supabase with server auth
  return NextResponse.json({ id, status })
}
