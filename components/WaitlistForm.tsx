'use client'

import { useState, type FormEvent } from 'react'
import { ArrowRight, Check, Loader2, Sparkles } from 'lucide-react'
import { supabase } from '@/lib/supabase'

type Status = 'idle' | 'submitting' | 'success' | 'error'

// Pragmatic email shape check — the real validation is the unique column +
// whatever we do downstream; this just stops obvious typos before a round-trip.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Waitlist email capture. Inserts into the Supabase `waitlist` table (anon
 * INSERT only — see migration 20260602130000_waitlist). A duplicate email
 * (unique violation, code 23505) is treated as success: you're already on it.
 */
export function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)
  const [already, setAlready] = useState(false)
  // Honeypot: bots fill hidden fields, humans don't. If set, we silently no-op.
  const [company, setCompany] = useState('')

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (status === 'submitting') return

    const value = email.trim().toLowerCase()
    if (!EMAIL_RE.test(value)) {
      setStatus('error')
      setError('Please enter a valid email address.')
      return
    }
    if (company) {
      // Honeypot tripped — pretend it worked, store nothing.
      setStatus('success')
      return
    }

    setStatus('submitting')
    setError(null)

    const { error: insertError } = await supabase
      .from('waitlist')
      .insert({ email: value, source: 'landing' })

    if (insertError) {
      // 23505 = unique_violation → already signed up, which is a good outcome.
      if (insertError.code === '23505') {
        setAlready(true)
        setStatus('success')
        return
      }
      setStatus('error')
      setError('Something went wrong. Please try again.')
      return
    }

    setStatus('success')
  }

  if (status === 'success') {
    return (
      <div className="mx-auto mt-10 flex max-w-md flex-col items-center gap-3">
        <div
          className="flex items-center gap-2 rounded-full border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/15 px-4 py-2 text-sm text-[var(--color-accent)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <Check className="h-4 w-4" />
          {already ? "You're already on the list" : "You're on the list"}
        </div>
        <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
          {already
            ? "We've got your email — we'll be in touch when your invite is ready."
            : "Thanks for joining. We'll email you the moment your invite is ready."}
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="mx-auto mt-10 flex max-w-md flex-col items-center gap-3"
    >
      <div className="flex w-full items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] p-1.5 backdrop-blur transition-colors focus-within:border-[var(--color-accent)]/40">
        {/* Honeypot — visually hidden, off-screen, not announced. */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="pointer-events-none absolute h-0 w-0 opacity-0"
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (status === 'error') setStatus('idle')
          }}
          placeholder="you@circle.com"
          aria-label="Email address"
          className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none"
          style={{ fontFamily: 'var(--font-mono)' }}
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-2 text-sm font-semibold text-black transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Joining
            </>
          ) : (
            <>
              Join the waitlist
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </div>

      {status === 'error' && error ? (
        <p className="text-xs text-red-400" style={{ fontFamily: 'var(--font-mono)' }}>
          {error}
        </p>
      ) : (
        <p
          className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <Sparkles className="h-3 w-3 text-[var(--color-ai)]" />
          No spam · just your invite when it's ready
        </p>
      )}
    </form>
  )
}
