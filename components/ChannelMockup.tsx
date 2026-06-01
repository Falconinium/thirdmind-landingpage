'use client'

import { ExternalLink, Sparkles, Play, Brain } from 'lucide-react'
import { useEffect, useState, type CSSProperties } from 'react'

/**
 * Hero mock-up: a Third Mind channel with three messages — including one that
 * cycles between "AI is analyzing" and the resolved embed, so visitors see the
 * AI moment itself, not just the result.
 */
export function ChannelMockup() {
  // Karpathy embed loops: pending (~2.4s) → done (~5.4s) → restart.
  // `doneCycle` increments every time we land on 'done', so we can key the
  // brain reaction wrapper to force a fresh confetti burst per cycle.
  const [analyzing, setAnalyzing] = useState(true)
  const [doneCycle, setDoneCycle] = useState(0)

  useEffect(() => {
    let cancelled = false
    let timer = 0
    let isPending = true

    function schedule(ms: number) {
      timer = window.setTimeout(() => {
        if (cancelled) return
        isPending = !isPending
        setAnalyzing(isPending)
        if (!isPending) setDoneCycle((c) => c + 1)
        // Pending lasts 2.4s; done lasts 5s so the viewer can read it.
        schedule(isPending ? 2400 : 5000)
      }, ms)
    }
    // Initial wait, then flip to 'done' first.
    schedule(2400)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
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
          align="right"
          loading={analyzing}
          burstKey={doneCycle}
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
  align = 'left',
  loading = false,
  burstKey = 0,
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
  align?: 'left' | 'right'
  loading?: boolean
  burstKey?: number
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
          style={{ minHeight: 280 }}
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
              <div className="mt-2 space-y-2">
                <div
                  className="flex items-center gap-1.5 text-[11px] text-[var(--color-ai)]"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  <Sparkles className="h-3 w-3" />
                  <span className="ai-dots">AI is analyzing</span>
                </div>
                {/* Skeleton lines fill the reserved space so the card looks
                    "alive" during pending instead of collapsing top-aligned. */}
                <div className="space-y-1.5 pt-1">
                  <div className="h-1.5 w-full rounded-full bg-white/[0.06]" />
                  <div className="h-1.5 w-[92%] rounded-full bg-white/[0.06]" />
                  <div className="h-1.5 w-[78%] rounded-full bg-white/[0.06]" />
                </div>
                <div className="flex flex-wrap gap-1 pt-1.5">
                  <div className="h-3 w-9 rounded-sm bg-[var(--color-ai)]/10" />
                  <div className="h-3 w-12 rounded-sm bg-[var(--color-ai)]/10" />
                </div>
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
                    'mt-1.5 flex items-center gap-1 ' +
                    (reverse ? 'justify-start' : 'justify-end')
                  }
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  <BrainReaction burstKey={burstKey} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Brain reaction wrapper: a gold confetti burst of mini brains + a soft
 * shockwave glow + the pulsing brain icon itself. Mirrors the desktop
 * ReactionBar's BrainBurst component so the landing matches the app.
 *
 * The burst plays exactly once per mount — the parent uses `key={burstKey}`
 * to remount this on every new "done" cycle, so we never get stacked or
 * looping bursts.
 */
const CONFETTI_COLORS = [
  'var(--color-accent)',
  '#e8c66a',
  '#9b7d2e',
  'var(--color-ai)',
  '#f5ead0',
]

function BrainReaction({ burstKey }: { burstKey: number }) {
  // Particles are randomised per mount. We don't need SSR-stable values
  // (the parent uses 'use client' and the bursts only render after mount).
  const particles = Array.from({ length: 8 }, (_, i) => {
    const angle =
      -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.9
    const power = 32 + Math.random() * 28
    const peakX = Math.cos(angle) * power
    const peakY = Math.sin(angle) * power
    const fallY = 50 + Math.random() * 30
    const fallX = peakX * 0.35 + (Math.random() - 0.5) * 12
    const size = 8 + Math.random() * 6
    const rotateStart = (Math.random() - 0.5) * 60
    const rotateEnd = rotateStart + (Math.random() - 0.5) * 540
    const delay = Math.random() * 80
    const duration = 800 + Math.random() * 400
    const color =
      CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)]!
    return {
      i,
      peakX,
      peakY,
      fallX,
      fallY,
      size,
      rotateStart,
      rotateEnd,
      delay,
      duration,
      color,
    }
  })

  return (
    <span
      key={burstKey}
      className="relative inline-flex items-center"
      style={{ animationDelay: '0.6s' }}
    >
      {/* Glow + confetti fire at the exact moment the brain begins its pulse
          (the 30% mark of brain-click ≈ 0.48s). We use 0.5s as the delay. */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-0 w-0"
      >
        <span
          className="brain-glow absolute left-1/2 top-1/2"
          style={{ animationDelay: '0.5s' }}
        />
        {particles.map((p) => (
          <span
            key={p.i}
            className="brain-confetti absolute inline-flex"
            style={
              {
                color: p.color,
                '--peak-x': `${p.peakX}px`,
                '--peak-y': `${p.peakY}px`,
                '--fall-x': `${p.fallX}px`,
                '--fall-y': `${p.fallY}px`,
                '--rot-start': `${p.rotateStart}deg`,
                '--rot-end': `${p.rotateEnd}deg`,
                animationDelay: `${0.5 + p.delay / 1000}s`,
                animationDuration: `${p.duration}ms`,
              } as CSSProperties
            }
          >
            <Brain style={{ width: p.size, height: p.size }} />
          </span>
        ))}
      </span>

      <Brain className="brain-click h-3.5 w-3.5" />
    </span>
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
