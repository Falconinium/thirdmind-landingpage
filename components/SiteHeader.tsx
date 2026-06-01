'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { SlidingNav } from './SlidingNav'

const NAV_ITEMS = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how' },
  { label: 'FAQ', href: '#faq' },
]

/**
 * Floating pill header. Sits at the top of the page on initial load and
 * "compacts" — narrower padding, deeper background — once the user scrolls
 * past 24px. Matches the desktop app's Topbar visual: gold-tinted gradient,
 * brand mark on the left, sliding-bubble nav center, CTA right.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="pointer-events-none sticky top-0 z-50 flex justify-center">
      <header
        className={
          'pointer-events-auto mt-3 flex w-[min(100%-1.5rem,72rem)] items-center justify-between gap-4 rounded-2xl border border-white/5 px-3 transition-all duration-300 ease-out ' +
          (scrolled ? 'h-12 backdrop-blur-md' : 'h-14')
        }
        style={{
          background: scrolled
            ? 'linear-gradient(180deg, rgba(24,24,28,0.85), rgba(24,24,28,0.7))'
            : 'linear-gradient(180deg, rgba(201,168,76,0.10) 0%, rgba(201,168,76,0.02) 55%, rgba(10,10,13,0.6) 100%)',
        }}
      >
        {/* Left: brand */}
        <Link href="/" className="flex items-center gap-2">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--color-accent)] text-sm text-black"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
          >
            ◆
          </div>
          <span
            className="text-sm text-[var(--color-text-primary)]"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
          >
            Third Mind
          </span>
        </Link>

        {/* Center: sliding nav (hidden on narrow screens) */}
        <div className="hidden md:block">
          <SlidingNav items={NAV_ITEMS} />
        </div>

        {/* Right: CTA */}
        <Link
          href="#download"
          className="rounded-full bg-[var(--color-accent)] px-3.5 py-1.5 text-xs font-semibold text-black transition-all hover:bg-[var(--color-accent-hover)] hover:scale-[1.03]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Download
        </Link>
      </header>
    </div>
  )
}
