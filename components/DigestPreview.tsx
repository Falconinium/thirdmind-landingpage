import { Sparkles, FileText, Play, Mic } from 'lucide-react'

/**
 * Static preview of the weekly digest card. Same source as AuthDigestPreview
 * in the desktop app.
 */
export function DigestPreview() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden p-10">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(167,139,250,0.08), transparent 70%)',
        }}
      />

      <div className="relative w-full max-w-sm">
        <div className="overflow-hidden rounded-xl border border-white/5 bg-[var(--color-surface)] p-5 shadow-xl">
          <div className="mb-5 flex items-center justify-between">
            <div
              className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-[var(--color-text-muted)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <Sparkles className="h-3 w-3 text-[var(--color-ai)]" />
              Weekly digest
            </div>
            <span
              className="text-[10px] uppercase tracking-wide text-[var(--color-text-muted)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              This week
            </span>
          </div>

          <div className="space-y-2.5">
            {DIGEST_ITEMS.map((item, i) => (
              <div
                key={item.title}
                className="flex animate-reveal items-center gap-3 rounded-lg border border-white/5 bg-[var(--color-background)]/60 px-3 py-2.5"
                style={{ animationDelay: `${0.1 + i * 0.08}s` }}
              >
                <span
                  className="w-5 text-[10px] uppercase tracking-wide text-[var(--color-text-muted)]"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  #{i + 1}
                </span>
                <item.icon className="h-3.5 w-3.5 shrink-0 text-[var(--color-text-muted)]" />
                <span
                  className="flex-1 truncate text-xs text-[var(--color-text-primary)]"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
                >
                  {item.title}
                </span>
                <span className="text-[10px] text-[var(--color-accent)]">
                  {'★'.repeat(item.score)}
                  <span className="text-[var(--color-text-muted)]">
                    {'★'.repeat(5 - item.score)}
                  </span>
                </span>
              </div>
            ))}
          </div>

          <div
            className="mt-5 flex items-center justify-between border-t border-white/5 pt-3 text-[10px] uppercase tracking-wide text-[var(--color-text-muted)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            <span>5 resources · ranked for you</span>
            <span className="text-[var(--color-ai)]">Monday 08:00</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const DIGEST_ITEMS = [
  { title: 'The Future of AI Agents', icon: FileText, score: 5 },
  { title: 'How Stripe scaled its data team', icon: FileText, score: 4 },
  { title: 'Latent Space — Eval-driven dev', icon: Mic, score: 4 },
  { title: 'Andrej Karpathy on tokenization', icon: Play, score: 3 },
  { title: 'The EU AI Act, in plain English', icon: FileText, score: 3 },
] as const
