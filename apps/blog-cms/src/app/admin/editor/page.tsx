'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import type { ComponentType } from 'react'
import { supabase } from '@/lib/supabase/client'
import { slugify, calculateReadTime } from '@/lib/utils'
import toast from 'react-hot-toast'

// Dynamically import the Markdown editor with explicit props typing
type MarkdownEditorProps = {
  value?: string
  onChange?: (value?: string) => void
  height?: number
  className?: string
  preview?: 'edit' | 'live' | 'preview'
  visibleDragbar?: boolean
}

const MDEditor = dynamic(() =>
  import('@uiw/react-md-editor').then((mod) => mod.default as unknown as ComponentType<MarkdownEditorProps>)
, { ssr: false })

export default function PostEditor() {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const [coverUrl, setCoverUrl] = useState('')
  const [canonicalUrl, setCanonicalUrl] = useState('')
  const [ogImage, setOgImage] = useState('')
  const [status, setStatus] = useState<'draft' | 'published'>('draft')
  const [publishedAt, setPublishedAt] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Auto-generate slug when title changes
  useEffect(() => {
    if (title) {
      setSlug(slugify(title))
    }
  }, [title])

  const handleSave = async () => {
    setLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase
        .from('posts')
        .insert([
          {
            title,
            slug,
            excerpt,
            content_md: content,
            tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
            cover_url: coverUrl,
            canonical_url: canonicalUrl,
            og_image: ogImage,
            status,
            published_at: status === 'published' ? (publishedAt || new Date().toISOString()) : null,
            read_time: calculateReadTime(content)
          }
        ])
        .select()

      if (error) {
        setError(error.message)
        toast.error(error.message)
      } else {
        const action = status === 'published' ? 'Published' : 'Draft saved'
        toast.success(action)
        router.push('/admin/dashboard')
      }
    } catch (err) {
      setError('An unexpected error occurred')
      toast.error('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create Post</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-matrix rounded-md hover:bg-matrix/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-matrix disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Draft'}
            </button>
            <button
              onClick={() => {
                setStatus('published')
                handleSave()
              }}
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              {loading ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4 mb-6">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-matrix focus:border-matrix bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Post title"
              />
            </div>
            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Slug
              </label>
              <input
                type="text"
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-matrix focus:border-matrix bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="auto-generated-from-title"
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Excerpt
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                Brief description of the post (150 characters max)
              </span>
            </label>
            <textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-matrix focus:border-matrix bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Post excerpt"
              maxLength={150}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tags
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                  Comma separated
                </span>
              </label>
              <input
                type="text"
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-matrix focus:border-matrix bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="technology, business, faith"
              />
            </div>
            <div>
              <label htmlFor="coverUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Cover Image URL
              </label>
              <input
                type="text"
                id="coverUrl"
                value={coverUrl}
                onChange={(e) => setCoverUrl(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-matrix focus:border-matrix bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="canonicalUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Canonical URL
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                  (Optional) Original source URL
                </span>
              </label>
              <input
                type="text"
                id="canonicalUrl"
                value={canonicalUrl}
                onChange={(e) => setCanonicalUrl(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-matrix focus:border-matrix bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="https://original-source.com/post"
              />
            </div>
            <div>
              <label htmlFor="ogImage" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                OpenGraph Image URL
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                  (Optional) Custom social media image
                </span>
              </label>
              <input
                type="text"
                id="ogImage"
                value={ogImage}
                onChange={(e) => setOgImage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-matrix focus:border-matrix bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="https://example.com/og-image.jpg"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Content
            </label>
            <div className="border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
              <MDEditor
                value={content}
                onChange={(value) => setContent(value || '')}
                height={500}
                visibleDragbar={false}
                preview="edit"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
