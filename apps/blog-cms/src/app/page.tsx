import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
          CEOWrites Blog Platform
        </h1>
        <p className="mt-6 text-xl text-gray-500 dark:text-gray-400">
          A modern, SEO-friendly, and responsive personal blog for sharing insights on technology, business, and faith.
        </p>
        
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Public Blog</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Read the latest articles and insights from Emmanuel Ogugua.
            </p>
            <Link 
              href="/blog"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Visit Blog
            </Link>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Admin Panel</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Manage blog content, write new posts, and configure settings.
            </p>
            <Link 
              href="/admin"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Access Admin
            </Link>
          </div>
        </div>
        
        <div className="mt-12 text-gray-600 dark:text-gray-300">
          <p>Built with Next.js, TypeScript, Tailwind CSS, and Supabase</p>
        </div>
      </div>
    </div>
  )
}
