import { supabaseServer } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email, name, source } = await request.json()
    
    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }
    
    // Insert subscriber into database
    const { data, error } = await supabaseServer
      .from('newsletter_subscribers')
      .insert([
        {
          email,
          name: name || null,
          source: source || 'blog'
        }
      ])
      .select()
    
    if (error) {
      // Check if it's a duplicate email error
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'This email is already subscribed' },
          { status: 400 }
        )
      }
      
      console.error('Error subscribing:', error)
      return NextResponse.json(
        { error: 'Failed to subscribe' },
        { status: 500 }
      )
    }
    
    // TODO: Integrate with actual newsletter service (e.g., Mailchimp, ConvertKit)
    // For now, we'll just store in Supabase
    
    return NextResponse.json(
      { message: 'Successfully subscribed!', data: data?.[0] },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error in newsletter subscription:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
