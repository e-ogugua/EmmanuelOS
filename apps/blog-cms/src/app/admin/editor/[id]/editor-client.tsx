'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import { supabase } from '@/lib/supabase/client';
import { slugify, calculateReadTime } from '@/lib/utils';

// Dynamically import the Markdown editor to avoid SSR issues (with proper props typing)
type MarkdownEditorProps = {
  value?: string;
  onChange?: (value?: string) => void;
  height?: number;
  className?: string;
  preview?: 'edit' | 'live' | 'preview';
  visibleDragbar?: boolean;
};

const MDEditor = dynamic(() =>
  import('@uiw/react-md-editor').then((mod) => mod.default as unknown as ComponentType<MarkdownEditorProps>)
, { ssr: false });

export default function EditorClient({ postId }: { postId: string }) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Load post data if editing
  useEffect(() => {
    if (postId === 'new') return;

    const loadPost = async () => {
      try {
        const { data: post, error: fetchError } = await supabase
          .from('posts')
          .select('*')
          .eq('id', postId)
          .single();

        if (fetchError) throw fetchError;
        if (!post) throw new Error('Post not found');

        setTitle(post.title);
        setSlug(post.slug);
        setExcerpt(post.excerpt || '');
        setContent(post.content || '');
        setTags(post.tags?.join(', ') || '');
        setIsPublished(post.published || false);
      } catch (err) {
        console.error('Error loading post:', err);
        setError('Failed to load post');
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [postId]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    // Auto-generate slug from title if it hasn't been manually changed
    if (!slug || slug === '' || slug === slugify(title)) {
      setSlug(slugify(newTitle));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');

    try {
      const postData = {
        title,
        slug,
        excerpt,
        content,
        tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
        published: isPublished,
        read_time: calculateReadTime(content),
        updated_at: new Date().toISOString(),
      };

      if (postId === 'new') {
        // Create new post
        const { error: createError } = await supabase
          .from('posts')
          .insert([{ ...postData, created_at: new Date().toISOString() }]);

        if (createError) throw createError;
      } else {
        // Update existing post
        const { error: updateError } = await supabase
          .from('posts')
          .update(postData)
          .eq('id', postId);

        if (updateError) throw updateError;
      }

      router.push('/admin/dashboard');
      router.refresh();
    } catch (err) {
      console.error('Error saving post:', err);
      setError('Failed to save post');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading && postId !== 'new') {
    return <div className="p-8">Loading...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-600">{error}</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        {postId === 'new' ? 'Create New Post' : 'Edit Post'}
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Slug *
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
              ceowrites.dev/blog/
            </span>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(slugify(e.target.value))}
              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Excerpt
          </label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content *
          </label>
          <div className="mt-1">
            <MDEditor
              value={content}
              onChange={(value) => setContent(value || '')}
              height={400}
              className="w-full"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., technology, business, leadership"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="published"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="published" className="ml-2 block text-sm text-gray-700">
            Publish this post
          </label>
        </div>

        {error && <div className="text-red-600 text-sm">{error}</div>}

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => router.push('/admin/dashboard')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Saving...' : 'Save Post'}
          </button>
        </div>
      </form>
    </div>
  );
}
