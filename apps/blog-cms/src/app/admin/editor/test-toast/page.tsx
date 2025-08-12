'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function TestToastPage() {
  const router = useRouter()

  useEffect(() => {
    const id = setTimeout(() => {
      router.push('/admin/dashboard')
    }, 1500)
    return () => clearTimeout(id)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center gap-4">
      <button
        onClick={() => toast.success('Success toast works!')}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Success
      </button>
      <button
        onClick={() => toast.error('Error toast works!')}
        className="px-4 py-2 bg-red-600 text-white rounded"
      >
        Error
      </button>
      <span className="text-sm text-gray-500">Auto-redirecting to dashboard…</span>
    </div>
  )
}


