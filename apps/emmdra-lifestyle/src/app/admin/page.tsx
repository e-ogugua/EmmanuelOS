'use client'

import { useEffect, useState } from 'react'

async function getAuthBundle() {
  if (typeof window === 'undefined') return null
  const { initializeApp, getApps } = await import('firebase/app')
  const { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } = await import('firebase/auth')
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!
  }
  const app = getApps().length ? getApps()[0] : initializeApp(config)
  const auth = getAuth(app)
  return { auth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut }
}

export default function AdminPage() {
  const [user, setUser] = useState<null | { email: string | null; name: string | null }>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let unsub: (() => void) | undefined
    getAuthBundle().then(bundle => {
      if (!bundle) return
      unsub = bundle.onAuthStateChanged(bundle.auth, (u) => {
        if (u) setUser({ email: u.email, name: u.displayName })
        else setUser(null)
        setLoading(false)
      })
    })
    return () => { if (unsub) unsub() }
  }, [])

  const login = async () => {
    try {
      const bundle = await getAuthBundle()
      if (!bundle) return
      await bundle.signInWithPopup(bundle.auth, new bundle.GoogleAuthProvider())
    } catch (e) {
      alert('Login failed. Configure Firebase Auth providers in console.')
    }
  }

  const logout = async () => {
    const bundle = await getAuthBundle()
    if (!bundle) return
    await bundle.signOut(bundle.auth)
  }

  if (loading) return <main className="max-w-3xl mx-auto px-6 py-10">Loading...</main>

  if (!user) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-2xl md:text-3xl font-semibold">Admin</h1>
        <p className="text-gray-600">Sign in to manage products, posts, tutorials, and courses.</p>
        <button onClick={login} className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded">Sign in with Google</button>
      </main>
    )
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-semibold">Admin Dashboard</h1>
        <button onClick={logout} className="px-3 py-1.5 bg-gray-200 rounded">Sign out</button>
      </div>
      <p className="text-gray-600 mt-2">Welcome {user.name || user.email}</p>

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <div className="border rounded p-4">
          <h2 className="font-semibold">Products</h2>
          <p className="text-sm text-gray-600">Create and edit store items. (Coming soon)</p>
        </div>
        <div className="border rounded p-4">
          <h2 className="font-semibold">Blog Posts</h2>
          <p className="text-sm text-gray-600">Publish to Sanity or local. (Coming soon)</p>
        </div>
        <div className="border rounded p-4">
          <h2 className="font-semibold">Tutorials</h2>
          <p className="text-sm text-gray-600">Add DIY content. (Coming soon)</p>
        </div>
        <div className="border rounded p-4">
          <h2 className="font-semibold">Courses</h2>
          <p className="text-sm text-gray-600">Manage course previews. (Coming soon)</p>
        </div>
      </div>
    </main>
  )
}
