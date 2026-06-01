import Link from 'next/link'
import {
  ArrowRight,
  Sparkles,
  Star,
  FolderOpen,
  Trophy,
  AtSign,
  Search,
  Mail,
  Brain,
  ChevronDown,
} from 'lucide-react'
import { ChannelMockup } from '@/components/ChannelMockup'
import { DigestPreview } from '@/components/DigestPreview'
import { SiteHeader } from '@/components/SiteHeader'
import { Reveal } from '@/components/Reveal'
import { AppleLogo, WindowsLogo } from '@/components/BrandIcons'
import { LATEST_VERSION, releaseUrl, REPO_README } from '@/lib/release'

export default function Page() {
  return (
    <>
      {/* Page-top gold halo. Lives at the very top of the document so it sits
          BEHIND the floating header and reads as "light entering from above"
          rather than glowing from under the nav. Pointer-events disabled so
          it never interferes with clicks. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[420px]"
        style={{
          background:
            'radial-gradient(ellipse 80% 100% at 50% 0%, rgba(201,168,76,0.16) 0%, rgba(201,168,76,0.06) 35%, transparent 70%)',
        }}
      />
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Idea />
        <Features />
        <HowItWorks />
        <Download />
        <FAQ />
      </main>
      <SiteFooter />
    </>
  )
}

/* ───────────────────────────── Hero ───────────────────────────── */

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Drifting violet orb in the background. */}
      <div
        className="pointer-events-none absolute -right-32 top-40 h-96 w-96 rounded-full opacity-50 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(167,139,250,0.22), transparent 70%)',
          animation: 'floatOrb 18s ease-in-out infinite',
        }}
      />
      <div
        className="pointer-events-none absolute -left-32 top-96 h-80 w-80 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(201,168,76,0.22), transparent 70%)',
          animation: 'floatOrb 22s ease-in-out infinite reverse',
        }}
      />

      {/* Centred hero: huge headline, single subhead, two CTAs, preview below.
          Inspired by useorigin's cinema-style hero — typography does the work,
          not layout. */}
      <div className="relative mx-auto max-w-5xl px-6 pt-32 pb-12 text-center md:pt-44">
        <Reveal>
          <p
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-muted)] backdrop-blur"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            <Sparkles className="h-3 w-3 text-[var(--color-ai)]" />
            AI-native memory for private circles
          </p>
          <h1
            className="text-balance text-5xl leading-[0.98] text-[var(--color-text-primary)] md:text-7xl lg:text-[84px]"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              letterSpacing: '-0.04em',
            }}
          >
            Your circle already thinks together.
            <br />
            Now it{' '}
            <span className="bg-gradient-to-br from-[#e8c66a] via-[var(--color-accent)] to-[#9b7d2e] bg-clip-text text-transparent">
              remembers
            </span>{' '}
            together.
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-balance text-lg leading-relaxed text-[var(--color-text-muted)]">
            An AI-native space where every article, video, and insight your
            circle shares becomes{' '}
            <span className="text-[var(--color-text-primary)]">permanent</span>,{' '}
            <span className="text-[var(--color-text-primary)]">searchable</span>
            , and{' '}
            <span className="text-[var(--color-text-primary)]">ranked for you</span>
            .
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <CTAButton href="#download" primary>
              Download for free
              <ArrowRight className="h-4 w-4" />
            </CTAButton>
            <CTAButton href="#how">
              See how it works
              <ChevronDown className="h-4 w-4" />
            </CTAButton>
          </div>
          <p
            className="mt-7 text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            macOS · Windows · Invitation-only
          </p>
        </Reveal>
      </div>

      {/* Channel mockup floats below the hero, anchored on a mesh-gradient
          surface so the conversation reads as the product, not a decoration. */}
      <Reveal delay={250}>
        <div className="relative mx-auto -mt-2 max-w-3xl px-6 pb-24">
          <div
            className="relative overflow-hidden rounded-3xl border border-white/10 p-6 shadow-[0_40px_120px_-40px_rgba(201,168,76,0.4)] md:p-8"
            style={{
              background:
                'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(167,139,250,0.10), transparent 60%), linear-gradient(180deg, rgba(24,24,28,0.7), rgba(10,10,13,0.9))',
              // Reserve enough height so the outer card never resizes between
              // the embed's pending and resolved states.
              minHeight: 460,
            }}
          >
            <ChannelMockup />
          </div>
        </div>
      </Reveal>
    </section>
  )
}

/* ───────────────────────────── CTA Button ───────────────────────────── */

function CTAButton({
  href,
  primary,
  children,
}: {
  href: string
  primary?: boolean
  children: React.ReactNode
}) {
  if (primary) {
    return (
      <Link
        href={href}
        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-black transition-all hover:scale-[1.02]"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.6), transparent 70%)',
          }}
        />
        <span className="relative inline-flex items-center gap-2">{children}</span>
      </Link>
    )
  }
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm text-[var(--color-text-primary)] backdrop-blur transition-colors hover:border-white/25 hover:bg-white/[0.06]"
    >
      {children}
    </Link>
  )
}

/* ───────────────────────────── The Idea ───────────────────────────── */

function Idea() {
  return (
    <section>
      <Reveal className="mx-auto max-w-3xl px-6 py-32 text-center">
        <p
          className="mb-4 text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          The idea
        </p>
        <h2
          className="text-balance text-4xl leading-[1.05] text-[var(--color-text-primary)] md:text-5xl lg:text-6xl"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            letterSpacing: '-0.03em',
          }}
        >
          Signal without memory is just noise with extra steps.
        </h2>

        <p className="mt-7 text-base leading-relaxed text-[var(--color-text-muted)]">
          Your circle already generates signal —{' '}
          <span className="text-[var(--color-text-primary)]">
            articles forwarded at midnight
          </span>
          ,{' '}
          <span className="text-[var(--color-text-primary)]">
            podcasts debated on calls
          </span>
          ,{' '}
          <span className="text-[var(--color-text-primary)]">
            frameworks sketched on whiteboards
          </span>
          .
        </p>

        <p className="mt-4 text-base leading-relaxed text-[var(--color-text-muted)]">
          And every week, most of it disappears. Slack scrolls past it.
          Bookmarks pile up. The one person who needed that article never sees
          it.
        </p>

        <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-primary)]">
          Third Mind is the{' '}
          <span className="text-[var(--color-accent)]">memory layer</span>. An
          AI that listens to what your group shares, learns what each member
          cares about, and surfaces the right knowledge at the right time.
        </p>

        <blockquote className="mx-auto mt-14 max-w-xl border-l-2 border-[var(--color-accent)]/40 pl-6 text-left text-sm italic leading-relaxed text-[var(--color-text-muted)]">
          &ldquo;No two minds ever come together without thereby creating a
          third, invisible, intangible force, which may be likened to a third
          mind.&rdquo;
          <footer
            className="mt-2 not-italic text-[10px] uppercase tracking-wide text-[var(--color-text-muted)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            — Napoleon Hill, <i>Think and Grow Rich</i>
          </footer>
        </blockquote>
      </Reveal>
    </section>
  )
}

/* ───────────────────────────── Features ───────────────────────────── */

const FEATURES = [
  {
    icon: Sparkles,
    title: 'Drop a link. Get the brief.',
    body:
      "3-sentence summary, key points, auto-tags. Generated before you've finished typing your comment.",
  },
  {
    icon: Star,
    title: 'Same feed. Different stars.',
    body:
      'The AI knows your domain. A paper on tokenization scores 5 stars for the ML engineer, 2 for the designer. Same channel — personal signal.',
  },
  {
    icon: FolderOpen,
    title: 'It files itself.',
    body:
      'No folders to create. No tags to maintain. Resources organize on arrival, by the AI that read them.',
  },
  {
    icon: Trophy,
    title: 'Contribution becomes culture.',
    body:
      'XP for sharing, streaks for showing up, a leaderboard for the whole circle. Gentle accountability, no anxiety.',
  },
  {
    icon: Search,
    title: 'That podcast from three months ago? Found.',
    body:
      "Full-text search across everything your circle has ever shared. The summary is indexed, not just the title.",
  },
  {
    icon: AtSign,
    title: 'The right person, the moment it matters.',
    body:
      'Tag a teammate; they get a real macOS or Windows notification — even with the app closed.',
  },
] as const

function Features() {
  return (
    <section id="features" className="relative">
      <div className="mx-auto max-w-6xl px-6 py-32">
        <div className="mx-auto max-w-2xl text-center">
          <p
            className="mb-4 text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Headline features
          </p>
          <h2
            className="text-balance text-4xl leading-[1.05] text-[var(--color-text-primary)] md:text-5xl lg:text-6xl"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              letterSpacing: '-0.03em',
            }}
          >
            The AI does the work.
            <br />
            You keep the circle.
          </h2>
          <p className="mt-5 text-balance text-base leading-relaxed text-[var(--color-text-muted)]">
            Every feature does one thing — turn what your circle reads and
            watches into something you can come back to.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 70}>
              <FeatureCard icon={f.icon} title={f.title} body={f.body} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────────── How it works ───────────────────────────── */

function FeatureCard({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ComponentType<{
    className?: string
    style?: React.CSSProperties
  }>
  title: string
  body: string
}) {
  return (
    <div
      className="group relative h-full overflow-hidden rounded-2xl border border-white/5 p-7 transition-all hover:-translate-y-1 hover:border-[var(--color-accent)]/30"
      style={{
        background:
          'linear-gradient(180deg, rgba(24,24,28,0.7) 0%, rgba(10,10,13,0.85) 100%)',
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(circle, rgba(201,168,76,0.35), transparent 70%)',
        }}
      />
      <div className="relative">
        <div
          className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
          style={{
            background:
              'color-mix(in srgb, var(--color-accent) 14%, transparent)',
          }}
        >
          <Icon
            className="h-5 w-5"
            style={{ color: 'var(--color-accent)' }}
          />
        </div>
        <h3
          className="text-lg text-[var(--color-text-primary)]"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
          {body}
        </p>
      </div>
    </div>
  )
}

function HowItWorks() {
  return (
    <section
      id="how"
      className="relative overflow-hidden"
    >
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p
            className="mb-4 text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            How it works
          </p>
          <h2
            className="text-balance text-4xl leading-[1.05] text-[var(--color-text-primary)] md:text-5xl lg:text-6xl"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              letterSpacing: '-0.03em',
            }}
          >
            One channel. One ritual.
            <br />
            Zero noise.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="order-2 space-y-8 md:order-1">
            <Reveal>
              <Step
                n="1"
                icon={Brain}
                title="Share a link. The AI does the rest."
                body="Paste a URL — the AI reads it, summarizes it in three sentences, lifts the key points, picks the tags. All before you've finished typing your note."
              />
            </Reveal>
            <Reveal delay={120}>
              <Step
                n="2"
                icon={Star}
                title="Ranked for your brain, not the algorithm's."
                body="Each resource is scored against your domain and your interests. Your circle sees the same channel; everyone sees their own stars."
              />
            </Reveal>
            <Reveal delay={240}>
              <Step
                n="3"
                icon={Mail}
                title="Monday morning: your top 5, zero noise."
                body="The five resources the AI ranked highest for you that week, delivered as a clean email. Nothing else."
              />
            </Reveal>
          </div>
          <Reveal delay={200} className="order-1 md:order-2">
            <DigestPreview />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Step({
  n,
  icon: Icon,
  title,
  body,
}: {
  n: string
  icon: React.ComponentType<{
    className?: string
    style?: React.CSSProperties
  }>
  title: string
  body: string
}) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 text-xs text-[var(--color-accent)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {n}
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-[var(--color-accent)]" />
          <h3
            className="text-base text-[var(--color-text-primary)]"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
          >
            {title}
          </h3>
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-text-muted)]">
          {body}
        </p>
      </div>
    </div>
  )
}

/* ───────────────────────────── Download ───────────────────────────── */

function Download() {
  const url = releaseUrl()
  return (
    <section id="download">
      <Reveal className="mx-auto max-w-3xl px-6 py-32 text-center">
        <p
          className="mb-4 text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Download · v{LATEST_VERSION}
        </p>
        <h2
          className="text-balance text-4xl leading-[1.05] text-[var(--color-text-primary)] md:text-5xl lg:text-6xl"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            letterSpacing: '-0.03em',
          }}
        >
          Get the desktop app.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-[var(--color-text-muted)]">
          Free during the private beta. Auto-updates on Windows. The release
          page has a step-by-step guide for macOS Gatekeeper and Windows
          SmartScreen.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DownloadCard
            icon={AppleLogo}
            os="macOS"
            note="Apple Silicon or Intel · .dmg"
            href={url}
          />
          <DownloadCard
            icon={WindowsLogo}
            os="Windows"
            note="10 / 11 · .exe installer"
            href={url}
          />
        </div>

        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)]"
        >
          <ArrowRight className="h-4 w-4" />
          See full release notes on GitHub
        </a>
      </Reveal>
    </section>
  )
}

function DownloadCard({
  icon: Icon,
  os,
  note,
  href,
}: {
  icon: React.ComponentType<{
    className?: string
    style?: React.CSSProperties
  }>
  os: string
  note: string
  href: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-5 text-left transition-colors hover:border-[var(--color-accent)]/40 hover:bg-white/[0.04]"
    >
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
        style={{
          background:
            'color-mix(in srgb, var(--color-accent) 14%, transparent)',
        }}
      >
        <Icon className="h-6 w-6" style={{ color: 'var(--color-accent)' }} />
      </div>
      <div className="flex-1">
        <p
          className="text-sm text-[var(--color-text-primary)]"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
        >
          Download for {os}
        </p>
        <p
          className="text-xs text-[var(--color-text-muted)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {note}
        </p>
      </div>
      <ArrowRight className="h-4 w-4 text-[var(--color-text-muted)] transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--color-accent)]" />
    </a>
  )
}

/* ───────────────────────────── FAQ ───────────────────────────── */

const FAQS = [
  {
    q: 'Is Third Mind invitation-only?',
    a: 'Yes. New teams are seeded by invite codes that an existing member generates. There is no public sign-up flow — by design.',
  },
  {
    q: 'How much does it cost?',
    a: "Free during the private beta. We'll share pricing before that changes — never as a surprise.",
  },
  {
    q: 'First launch on macOS — what to expect.',
    a: "macOS will ask you to approve the app on first launch. It's a 10-second click-through; the release page walks you through it.",
  },
  {
    q: 'Where is data stored?',
    a: 'Supabase (Postgres + Storage + Auth), with row-level security so each team only sees its own resources. The desktop binary holds no secrets — all privileged work runs in Edge Functions on the server.',
  },
  {
    q: 'Who is it for?',
    a: 'Small groups who already think together — a mastermind, a research collective, a founding team, a reading club. Third Mind shines from 5 to 20 people. Solo works, but the magic is in the third mind.',
  },
] as const

function FAQ() {
  return (
    <section
      id="faq"
      className=""
    >
      <div className="mx-auto max-w-3xl px-6 py-32">
        <div className="text-center">
          <p
            className="mb-4 text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            FAQ
          </p>
          <h2
            className="text-balance text-4xl leading-[1.05] text-[var(--color-text-primary)] md:text-5xl lg:text-6xl"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              letterSpacing: '-0.03em',
            }}
          >
            Questions, before you commit.
          </h2>
        </div>
        <div className="mt-12 space-y-3">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 60}>
              <details className="group rounded-xl border border-white/5 bg-white/[0.02] transition-colors open:border-white/15 open:bg-white/[0.04]">
                <summary
                  className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-sm text-[var(--color-text-primary)]"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                  }}
                >
                  {f.q}
                  <ChevronDown className="h-4 w-4 shrink-0 text-[var(--color-text-muted)] transition-transform group-open:rotate-180" />
                </summary>
                <p className="border-t border-white/5 px-5 py-4 text-sm leading-relaxed text-[var(--color-text-muted)]">
                  {f.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────────── Footer ───────────────────────────── */

function SiteFooter() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <div className="flex items-center gap-2">
          <div
            className="flex h-6 w-6 items-center justify-center rounded-md bg-[var(--color-accent)] text-xs text-black"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
          >
            ◆
          </div>
          <span
            className="text-xs text-[var(--color-text-muted)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Third Mind · v{LATEST_VERSION}
          </span>
        </div>
        <div
          className="flex items-center gap-5 text-xs uppercase tracking-wide text-[var(--color-text-muted)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <a
            href={REPO_README}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[var(--color-text-primary)]"
          >
            Releases
          </a>
          <Link href="#features" className="hover:text-[var(--color-text-primary)]">
            Features
          </Link>
          <Link href="#faq" className="hover:text-[var(--color-text-primary)]">
            FAQ
          </Link>
        </div>
      </div>
    </footer>
  )
}
