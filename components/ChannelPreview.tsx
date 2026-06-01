import { ExternalLink, Sparkles, FileText } from 'lucide-react'

/**
 * Static preview of a channel AI embed. Used as the hero visual on the landing
 * page — visualizes what the product does in a single card: a member shares a
 * link, the AI generates a structured embed with summary, tags, and relevance.
 *
 * Ported from the desktop app's AuthPreview component so both surfaces look
 * identical.
 */
export function ChannelPreview() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden p-10">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.10), transparent 70%)',
        }}
      />

      <div className="relative w-full max-w-sm">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.04] text-sm text-[var(--color-accent)]">
            A
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-[var(--color-text-primary)]">
              Andrew Carnegie
            </span>
            <span
              className="text-[10px] uppercase tracking-wide text-[var(--color-text-muted)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              11:02
            </span>
          </div>
        </div>

        <p className="mb-2 inline-block max-w-[280px] rounded-xl bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text-primary)]">
          Best 40 min I&apos;ve spent this month.
        </p>

        <div className="relative overflow-hidden rounded-xl border border-white/5 bg-[var(--color-background)] shadow-xl">
          <div
            className="h-24 w-full"
            style={{
              background:
                'linear-gradient(135deg, rgba(167,139,250,0.18), rgba(201,168,76,0.14))',
            }}
          />
          <div className="p-4">
            <div
              className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-wide text-[var(--color-text-muted)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <FileText className="h-3 w-3" />
              <span>Article</span>
              <span>·</span>
              <span>stanford-hai.edu</span>
            </div>

            <h3
              className="text-sm leading-snug text-[var(--color-text-primary)]"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
            >
              The Future of AI Agents
            </h3>

            <div
              className="mt-2 inline-flex items-center gap-1 rounded-full border border-[var(--color-ai)]/30 bg-[var(--color-ai)]/10 px-1.5 py-0.5 text-[9px] uppercase tracking-wide text-[var(--color-ai)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <Sparkles className="h-2.5 w-2.5" />
              AI summary
            </div>

            <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-[var(--color-text-muted)]">
              A frank conversation on where multi-agent systems break, why
              verification beats generation, and how to ship reliable AI without
              losing weekends to eval debt.
            </p>

            <div className="mt-3 flex flex-wrap gap-1">
              {['AI', 'Research', 'Tech'].map((t) => (
                <span
                  key={t}
                  className="rounded border border-[var(--color-ai)]/20 bg-[var(--color-ai)]/5 px-1.5 py-0.5 text-[9px] uppercase tracking-wide text-[var(--color-ai)]"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-3 flex items-center gap-2 text-[10px]">
              <span className="text-[var(--color-accent)]">★★★★</span>
              <span className="text-[var(--color-text-muted)]">★</span>
              <span className="text-[var(--color-text-muted)]">
                Highly relevant for you
              </span>
              <ExternalLink className="ml-auto h-3 w-3 text-[var(--color-text-muted)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
