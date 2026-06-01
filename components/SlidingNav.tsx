'use client'

import { useEffect, useRef, useState } from 'react'

interface BubbleRect {
  left: number
  width: number
}

export interface NavItem {
  label: string
  href: string
  /** When true the item renders as a gold CTA pill instead of a plain tab.
   *  The sliding bubble skips it (CTAs always own their own style). */
  cta?: boolean
}

/**
 * Pill nav with a bubble that glides to whatever tab is hovered, snapping to
 * the active item on mouse-leave. Mirrors the desktop app's Topbar nav so the
 * landing feels like the same product.
 *
 * Active state is driven by scroll position: we observe each section's
 * `id` and set the matching nav item active when it enters the viewport.
 */
export function SlidingNav({ items }: { items: NavItem[] }) {
  const navRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<Record<string, HTMLAnchorElement | null>>({})
  const [bubble, setBubble] = useState<BubbleRect | null>(null)
  const [activeHref, setActiveHref] = useState<string>(items[0]?.href ?? '')

  function moveBubbleTo(href: string | null) {
    const el = href ? tabRefs.current[href] : null
    const nav = navRef.current
    if (!el || !nav) {
      setBubble(null)
      return
    }
    const navBox = nav.getBoundingClientRect()
    const box = el.getBoundingClientRect()
    setBubble({ left: box.left - navBox.left, width: box.width })
  }

  // Snap to the active tab on mount and whenever it changes.
  useEffect(() => {
    moveBubbleTo(activeHref)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeHref])

  // Observe each section that the nav links to. The "most visible" wins.
  useEffect(() => {
    const sections = items
      .map((i) => {
        const id = i.href.replace(/^#/, '')
        return document.getElementById(id)
      })
      .filter((el): el is HTMLElement => el !== null)
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to "fully in view": highest intersectionRatio
        // among the currently intersecting ones.
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (best) setActiveHref(`#${best.target.id}`)
      },
      {
        rootMargin: '-30% 0px -50% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [items])

  return (
    <nav
      ref={navRef}
      onMouseLeave={() => moveBubbleTo(activeHref)}
      className="relative inline-flex items-center gap-1 rounded-xl border border-white/5 bg-white/[0.03] p-1 backdrop-blur"
    >
      {bubble && (
        <span
          aria-hidden
          className="pointer-events-none absolute top-1 bottom-1 rounded-lg bg-white/[0.07] shadow-sm transition-all duration-300 ease-out"
          style={{ left: bubble.left, width: bubble.width }}
        />
      )}
      {items.map((item) => {
        const active = item.href === activeHref && !item.cta
        if (item.cta) {
          return (
            <a
              key={item.href}
              ref={(el) => {
                tabRefs.current[item.href] = el
              }}
              href={item.href}
              onMouseEnter={() => moveBubbleTo(item.href)}
              className="relative z-10 rounded-lg bg-[var(--color-accent)] px-3.5 py-1.5 text-sm font-semibold text-black transition-all hover:bg-[var(--color-accent-hover)] hover:scale-[1.03]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {item.label}
            </a>
          )
        }
        return (
          <a
            key={item.href}
            ref={(el) => {
              tabRefs.current[item.href] = el
            }}
            href={item.href}
            onMouseEnter={() => moveBubbleTo(item.href)}
            className={
              'relative z-10 rounded-lg px-4 py-1.5 text-sm transition-colors ' +
              (active
                ? 'text-[var(--color-text-primary)]'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]')
            }
          >
            {item.label}
          </a>
        )
      })}
    </nav>
  )
}
