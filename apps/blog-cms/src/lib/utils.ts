import { Post } from '@/lib/supabase/types'

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .trim()
}

export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function getExcerpt(content: string, length: number = 150): string {
  if (!content) return ''
  const cleanContent = content.replace(/<[^>]*>/g, '')
  return cleanContent.length > length 
    ? cleanContent.substring(0, length) + '...' 
    : cleanContent
}
