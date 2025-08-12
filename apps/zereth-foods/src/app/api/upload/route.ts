import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  // TODO: integrate Cloudinary or Supabase Storage
  // For now, return a placeholder URL
  return NextResponse.json({ url: 'https://res.cloudinary.com/demo/image/upload/sample.jpg' })
}
