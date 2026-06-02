import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/**
 * Browser/anon Supabase client for the landing page — used only to insert
 * waitlist sign-ups. Reads ONLY the NEXT_PUBLIC_* vars (the anon key is public
 * and safe to ship). The `waitlist` table's RLS allows anon INSERT but not
 * SELECT, so the list can't be read back from the client.
 *
 * Built lazily so the module never throws at import time during prerender —
 * only when the client is actually used in the browser.
 */
let cached: SupabaseClient | null = null

function build(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anonKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. ' +
        'Add them to .env.local (local) and to Vercel env vars (prod).'
    )
  }
  return createClient(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  })
}

/** Proxy so `supabase.from(...)` works while the client stays lazily built. */
export const supabase: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop, receiver) {
    if (!cached) cached = build()
    return Reflect.get(cached, prop, receiver)
  },
})
