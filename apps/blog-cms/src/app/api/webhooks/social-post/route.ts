import { supabaseServer } from '@/lib/supabase/server'
import { postToSocialMedia } from '@/lib/social'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { postId } = await request.json()
    
    if (!postId) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      )
    }
    
    // Fetch the post details
    const { data: post, error } = await supabaseServer
      .from('posts')
      .select('*')
      .eq('id', postId)
      .single()
    
    if (error || !post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }
    
    // Only post to social media if the post is published
    if (post.status !== 'published') {
      return NextResponse.json(
        { message: 'Post is not published, skipping social media post' },
        { status: 200 }
      )
    }
    
    // Create social media content
    const socialContent = `${post.title} - Read the full article:`
    
    // Post to social media platforms
    const platforms = ['twitter', 'linkedin'] // Add more platforms as needed
    const results = []
    
    for (const platform of platforms) {
      try {
        const result = await postToSocialMedia(platform, socialContent, `https://emmanuelogugua.dev/blog/${post.slug}`)
        results.push({ platform, success: true, result })
      } catch (error) {
        results.push({ platform, success: false, error: (error as Error).message })
      }
    }
    
    return NextResponse.json(
      { message: 'Social media posting completed', results },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error in social media webhook:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
