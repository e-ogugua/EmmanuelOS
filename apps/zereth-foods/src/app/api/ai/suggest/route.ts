import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { occasion, mood, colors } = await req.json()
  // TODO: call OpenAI/HF; return stub for now
  return NextResponse.json({
    suggestion: `For a ${occasion} with a ${mood} vibe, use ${colors?.join(', ') || 'soft pastels'} and gold accents.`,
    prompt: 'A two-tier pastel cake with gold leaf, delicate florals, and elegant piping, studio lighting, 50mm lens',
    images: ['https://images.unsplash.com/photo-1541976076758-347942db1970']
  })
}
