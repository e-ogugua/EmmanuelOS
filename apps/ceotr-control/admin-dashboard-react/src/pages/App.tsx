import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export function App() {
  const [email, setEmail] = useState('')
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => { sub.subscription.unsubscribe() }
  }, [])

  if (!session) {
    return (
      <div className="min-h-screen grid place-items-center bg-slate-50">
        <div className="card p-8 w-full max-w-md">
          <h1 className="text-xl font-semibold text-brand-blue mb-4">Sign in</h1>
          <form onSubmit={async (e) => { e.preventDefault(); await supabase.auth.signInWithOtp({ email }) }} className="grid gap-3">
            <input className="border rounded-2xl px-3 py-2" placeholder="you@example.com" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <button className="btn-primary" type="submit">Send magic link</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <img src="/logo.svg" alt="CEOTR Ltd" className="h-8 w-auto" />
            <span className="font-semibold text-brand-blue">CEOTR Control Center</span>
          </a>
          <button className="text-sm" onClick={()=>supabase.auth.signOut()}>Sign out</button>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {['Leads','Proposals','Projects','Tasks','Clients','Invoices','Expenses'].map((k) => (
            <div key={k} className="card p-4">
              <div className="font-medium text-brand-blue">{k}</div>
              <div className="text-sm text-slate-600 mt-1">Coming soon.</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
