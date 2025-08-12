import { createClient } from '@supabase/supabase-js'

export function supabaseServer() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY as string
  if (!url || !service) throw new Error('Missing Supabase server env vars')
  return createClient(url, service, { auth: { persistSession: false } })
}
