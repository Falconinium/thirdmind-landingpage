'use client'

import {
  ExternalLink,
  Sparkles,
  FileText,
  Play,
  Brain,
} from 'lucide-react'
import { useEffect, useState, type CSSProperties } from 'react'

/**
 * Hero mock-up: a Third Mind channel with three messages — including one that
 * cycles between "AI is analyzing" and the resolved embed, so visitors see the
 * AI moment itself, not just the result.
 */
export function ChannelMockup() {
  // Karpathy embed loops: pending (~2.4s) → done (~5.4s) → restart.
  const [analyzing, setAnalyzing] = useState(true)

  useEffect(() => {
    let isPending = true
    function tick() {
      isPending = !isPending
      setAnalyzing(isPending)
    }
    // Initial transition into 'done' first
    const start = window.setTimeout(() => {
      tick()
      const interval = window.setInterval(tick, isPending ? 2400 : 5400)
      ;(window as unknown as { __mockupInterval?: number }).__mockupInterval =
        interval
    }, 2400)
    return () => {
      window.clearTimeout(start)
      const w = window as unknown as { __mockupInterval?: number }
      if (w.__mockupInterval) window.clearInterval(w.__mockupInterval)
    }
  }, [])

  return (
    <div className="relative w-full">
      {/* Day separator */}
      <div className="mb-5 flex items-center gap-4">
        <div
          className="h-px flex-1"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(201,168,76,0.18), rgba(201,168,76,0.32))',
          }}
        />
        <span
          className="rounded-full border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/[0.04] px-3 py-0.5 text-[10px] uppercase tracking-[0.18em] text-[var(--color-accent)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Today
        </span>
        <div
          className="h-px flex-1"
          style={{
            background:
              'linear-gradient(90deg, rgba(201,168,76,0.32), rgba(201,168,76,0.18), transparent)',
          }}
        />
      </div>

      <Message
        name="Andrew Carnegie"
        tint={{ bg: 'rgba(201,168,76,0.18)', text: '#e8c66a' }}
        level={4}
        time="09:14"
        message="Best 40 min I've spent this month."
        embed={{
          type: 'Article',
          domain: 'stanford-hai.edu',
          title: 'The Future of AI Agents',
          summary:
            'A frank conversation on where multi-agent systems break, why verification beats generation, and how to ship reliable AI without losing weekends to eval debt.',
          tags: ['AI', 'Research', 'Tech'],
          stars: 4,
          icon: FileText,
        }}
        brains={6}
      />

      <PlainMessage
        name="Henry Ford"
        tint={{ bg: 'rgba(167,139,250,0.18)', text: '#c0aafd' }}
        level={2}
        time="10:18"
        message={
          <>
            <span className="text-[var(--color-accent)]">@Andrew</span>{' '}
            this nails it. Verification beats generation — &nbsp;the third mind
            paragraph is going on the wall.
          </>
        }
      />

      <div className="mt-4">
        <Message
          name="Maxime"
          tint={{ bg: 'rgba(63,182,122,0.18)', text: '#6dd6a0' }}
          level={3}
          time="10:24"
          embed={{
            type: 'Video',
            domain: 'youtube.com',
            title: 'Andrej Karpathy — Deep Dive on Tokenization',
            summary:
              'Two hours dissecting BPE, byte-level vs unicode tradeoffs, and why most LLM bugs trace back to how you split text.',
            tags: ['AI', 'Research'],
            stars: 5,
            icon: Play,
            gradient:
              'linear-gradient(135deg, rgba(167,139,250,0.22), rgba(201,168,76,0.12))',
          }}
          brains={9}
          align="right"
          loading={analyzing}
        />
      </div>
    </div>
  )
}

/* ───────────────────────────── primitives ───────────────────────────── */

type Tint = { bg: string; text: string }

function Avatar({
  name,
  tint,
}: {
  name: string
  tint: Tint
}) {
  return (
    <div
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs"
      style={{ background: tint.bg, color: tint.text } as CSSProperties}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  )
}

function NameRow({
  name,
  level,
  time,
}: {
  name: string
  level: number
  time: string
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-[var(--color-text-primary)]">
        {name}
      </span>
      {level > 1 && (
        <span
          className="rounded border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/[0.06] px-1 py-0.5 text-[9px] uppercase tracking-wide text-[var(--color-accent)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Lv.{level}
        </span>
      )}
      <span
        className="text-[10px] text-[var(--color-text-muted)]"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {time}
      </span>
    </div>
  )
}

function Message({
  name,
  tint,
  level,
  time,
  message,
  embed,
  brains,
  align = 'left',
  loading = false,
}: {
  name: string
  tint: Tint
  level: number
  time: string
  message?: string
  embed: {
    type: string
    domain: string
    title: string
    summary: string
    tags: string[]
    stars: number
    icon: React.ComponentType<{ className?: string }>
    gradient?: string
  }
  brains: number
  align?: 'left' | 'right'
  loading?: boolean
}) {
  const Icon = embed.icon
  const reverse = align === 'right'
  return (
    <div
      className={
        'mb-4 flex gap-3 ' + (reverse ? 'flex-row-reverse text-right' : '')
      }
    >
      <Avatar name={name} tint={tint} />
      <div className={'min-w-0 flex-1 ' + (reverse ? 'flex flex-col items-end' : '')}>
        <NameRow name={name} level={level} time={time} />
        {message && (
          <p
            className={
              'mt-1 inline-block max-w-[320px] rounded-xl px-3 py-1.5 text-xs text-[var(--color-text-primary)] ' +
              (reverse ? 'bg-[var(--color-accent)] text-black' : 'bg-[var(--color-surface)]')
            }
          >
            {message}
          </p>
        )}

        <div
          className="relative mt-2 max-w-[420px] overflow-hidden rounded-xl border border-white/5 bg-[var(--color-background)]"
          // Reserved height so the card doesn't jump between the pending and
          // resolved states. Tall enough for the full AI summary + tags.
          style={{ minHeight: 244 }}
        >
          {loading && (
            <div
              aria-hidden
              className="ai-shimmer pointer-events-none absolute inset-0 z-0"
            />
          )}

          <div
            className="relative z-10 h-16 w-full"
            style={{
              background:
                embed.gradient ??
                'linear-gradient(135deg, rgba(167,139,250,0.18), rgba(201,168,76,0.14))',
            }}
          />
          <div className="relative z-10 p-3 text-left">
            <div
              className="mb-1.5 flex items-center gap-1.5 text-[9px] uppercase tracking-wide text-[var(--color-text-muted)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <Icon className="h-3 w-3" />
              <span>{embed.type}</span>
              <span>·</span>
              <span>{embed.domain}</span>
            </div>
            <h3
              className="text-[13px] leading-snug text-[var(--color-text-primary)]"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
            >
              {embed.title}
            </h3>

            {loading ? (
              <div
                className="mt-2 flex items-center gap-1.5 text-[11px] text-[var(--color-ai)]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                <Sparkles className="h-3 w-3" />
                <span className="ai-dots">AI is analyzing</span>
              </div>
            ) : (
              <div key="done" className="ai-fade-in">
                <div
                  className="mt-1.5 inline-flex items-center gap-1 rounded-full border border-[var(--color-ai)]/30 bg-[var(--color-ai)]/10 px-1.5 py-0.5 text-[8px] uppercase tracking-wide text-[var(--color-ai)]"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  <Sparkles className="h-2.5 w-2.5" />
                  AI summary
                </div>
                <p className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-[var(--color-text-muted)]">
                  {embed.summary}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {embed.tags.map((t, i) => (
                    <span
                      key={t}
                      className="ai-cascade rounded border border-[var(--color-ai)]/20 bg-[var(--color-ai)]/5 px-1.5 py-0.5 text-[8px] uppercase tracking-wide text-[var(--color-ai)]"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        animationDelay: `${0.4 + i * 0.12}s`,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-2 flex items-center justify-between text-[9px]">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[var(--color-accent)]">
                      {'★'.repeat(embed.stars)}
                      <span className="text-[var(--color-text-muted)]">
                        {'★'.repeat(5 - embed.stars)}
                      </span>
                    </span>
                    <span className="text-[var(--color-text-muted)]">
                      Highly relevant
                    </span>
                  </div>
                  <ExternalLink className="h-3 w-3 text-[var(--color-text-muted)]" />
                </div>
                <div className="mx-1 mt-2 h-px bg-white/5" />
                <div
                  className={
                    'mt-1.5 flex items-center gap-1 text-[var(--color-accent)] ' +
                    (reverse ? 'justify-start' : 'justify-end')
                  }
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  <Brain className="h-3.5 w-3.5" />
                  <span className="text-[10px]">{brains}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function PlainMessage({
  name,
  tint,
  level,
  time,
  message,
}: {
  name: string
  tint: Tint
  level: number
  time: string
  message: React.ReactNode
}) {
  return (
    <div className="flex gap-3">
      <Avatar name={name} tint={tint} />
      <div className="min-w-0 flex-1">
        <NameRow name={name} level={level} time={time} />
        <p className="mt-1 inline-block max-w-[400px] rounded-xl bg-[var(--color-surface)] px-3 py-1.5 text-xs leading-relaxed text-[var(--color-text-primary)]">
          {message}
        </p>
      </div>
    </div>
  )
}
