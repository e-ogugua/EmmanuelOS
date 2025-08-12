import { createClient } from '@supabase/supabase-js'

export function supabaseServer() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string | undefined
  const key = (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) as string | undefined
  if (!url || !key) return null as unknown as ReturnType<typeof createClient>
  return createClient(url, key, { auth: { persistSession: false } })
}
