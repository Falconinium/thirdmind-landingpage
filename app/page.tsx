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
  Apple,
  Monitor,
} from 'lucide-react'
import { ChannelPreview } from '@/components/ChannelPreview'
import { DigestPreview } from '@/components/DigestPreview'
import { LATEST_VERSION, releaseUrl, REPO_README } from '@/lib/release'

export default function Page() {
  return (
    <>
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

/* ───────────────────────────── Header ───────────────────────────── */

function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-40 border-b border-white/5"
      style={{
        background:
          'linear-gradient(180deg, rgba(10,10,13,0.92) 0%, rgba(10,10,13,0.7) 100%)',
        backdropFilter: 'saturate(140%) blur(10px)',
      }}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
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
        <nav
          className="hidden items-center gap-6 text-xs uppercase tracking-wide text-[var(--color-text-muted)] md:flex"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <Link href="#features" className="hover:text-[var(--color-text-primary)]">
            Features
          </Link>
          <Link href="#how" className="hover:text-[var(--color-text-primary)]">
            How it works
          </Link>
          <Link href="#faq" className="hover:text-[var(--color-text-primary)]">
            FAQ
          </Link>
        </nav>
        <Link
          href="#download"
          className="rounded-full bg-[var(--color-accent)] px-3.5 py-1.5 text-xs font-semibold text-black transition-colors hover:bg-[var(--color-accent-hover)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Download
        </Link>
      </div>
    </header>
  )
}

/* ───────────────────────────── Hero ───────────────────────────── */

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[640px]"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,0.10), transparent 70%)',
        }}
      />
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 pt-24 pb-20 md:grid-cols-2 md:pt-32 md:pb-28">
        <div className="animate-reveal">
          <p
            className="mb-5 text-[10px] uppercase tracking-[0.2em] text-[var(--color-accent)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            For private circles of thinkers
          </p>
          <h1
            className="text-5xl leading-[1.05] text-[var(--color-text-primary)] md:text-6xl"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
          >
            A collective brain
            <br />
            for your{' '}
            <span className="text-[var(--color-accent)]">circle</span>.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--color-text-muted)]">
            Third Mind is a private desktop app where small groups of thinkers
            turn their conversations into a living, AI-curated knowledge base.
            Share a link — the third mind summarizes it, classifies it, and
            ranks it for each member.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="#download"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[var(--color-accent-hover)]"
            >
              Download for free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#how"
              className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
            >
              See how it works
              <ChevronDown className="h-3.5 w-3.5" />
            </Link>
          </div>
          <p
            className="mt-6 text-[10px] uppercase tracking-wide text-[var(--color-text-muted)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            macOS · Windows · v{LATEST_VERSION} · Invitation-only
          </p>
        </div>
        <div className="relative">
          <ChannelPreview />
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────────── The Idea ───────────────────────────── */

function Idea() {
  return (
    <section className="border-t border-white/5 bg-[var(--color-surface)]/30">
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p
          className="mb-3 text-[10px] uppercase tracking-[0.2em] text-[var(--color-accent)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          The idea
        </p>
        <h2
          className="text-3xl leading-tight text-[var(--color-text-primary)] md:text-4xl"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
        >
          A mastermind works because minds align.
        </h2>
        <p className="mt-5 text-base leading-relaxed text-[var(--color-text-muted)]">
          But the knowledge that emerges from those conversations — the article
          someone brought up, the podcast they mentioned, the framework that
          explained everything — usually slips through the cracks.
        </p>
        <p className="mt-3 text-base leading-relaxed text-[var(--color-text-primary)]">
          Third Mind catches it.{' '}
          <span className="text-[var(--color-accent)]">
            The circle, augmented.
          </span>
        </p>
        <blockquote className="mt-12 border-l-2 border-[var(--color-accent)]/40 pl-6 text-left text-sm italic leading-relaxed text-[var(--color-text-muted)]">
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
      </div>
    </section>
  )
}

/* ───────────────────────────── Features ───────────────────────────── */

const FEATURES = [
  {
    icon: Sparkles,
    title: 'AI summaries that respect your time',
    body:
      'Every shared link gets a 3-sentence summary, the 3 key points that actually matter, and tags from a curated vocabulary. Powered by Gemini 2.5 Flash.',
  },
  {
    icon: Star,
    title: 'Personalized relevance',
    body:
      'The AI scores every resource for every member based on their domain, bio, and interests. The same shared timeline — but your stars are yours alone.',
  },
  {
    icon: FolderOpen,
    title: 'Smart folders, auto-classified',
    body:
      "Resources file themselves into folders the moment they're shared. No tagging chore. No quarterly clean-up.",
  },
  {
    icon: Trophy,
    title: 'Levels, streaks & a leaderboard',
    body:
      'Each contribution earns XP. Streaks reward daily participation. A team leaderboard creates gentle, motivating accountability.',
  },
  {
    icon: Search,
    title: 'Full-text search',
    body:
      'Across every resource ever shared. Find that podcast someone mentioned three months ago — Third Mind has it indexed.',
  },
  {
    icon: AtSign,
    title: '@Mentions with native notifications',
    body:
      'Tag a teammate in a message; they get a real macOS or Windows notification — even with the app closed.',
  },
] as const

function Features() {
  return (
    <section id="features" className="border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p
            className="mb-3 text-[10px] uppercase tracking-[0.2em] text-[var(--color-accent)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Headline features
          </p>
          <h2
            className="text-3xl leading-tight text-[var(--color-text-primary)] md:text-4xl"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
          >
            Curation as infrastructure.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-text-muted)]">
            Every feature exists to do one thing: turn what your circle reads
            and watches into something you can come back to.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => {
            const Icon = f.icon
            return (
              <div
                key={f.title}
                className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition-colors hover:border-white/15"
              >
                <div
                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
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
                  className="text-base text-[var(--color-text-primary)]"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
                >
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                  {f.body}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────────── How it works ───────────────────────────── */

function HowItWorks() {
  return (
    <section
      id="how"
      className="relative overflow-hidden border-t border-white/5 bg-[var(--color-surface)]/30"
    >
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p
            className="mb-3 text-[10px] uppercase tracking-[0.2em] text-[var(--color-accent)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            How it works
          </p>
          <h2
            className="text-3xl leading-tight text-[var(--color-text-primary)] md:text-4xl"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
          >
            A weekly rhythm. A daily channel.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="order-2 space-y-8 md:order-1">
            <Step
              n="1"
              icon={Brain}
              title="Share what you find."
              body="Paste a link, write a note. The AI generates a structured embed (summary, key points, tags) right in your message."
            />
            <Step
              n="2"
              icon={Star}
              title="Get ranked for you."
              body="Every resource is scored against your domain and interests. The same channel — but each member's stars are personal."
            />
            <Step
              n="3"
              icon={Mail}
              title="Monday morning, a digest lands."
              body="The 5 resources ranked highest for you that week, delivered as a clean email. Zero noise, signal only."
            />
          </div>
          <div className="order-1 md:order-2">
            <DigestPreview />
          </div>
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
    <section id="download" className="border-t border-white/5">
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p
          className="mb-3 text-[10px] uppercase tracking-[0.2em] text-[var(--color-accent)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Download · v{LATEST_VERSION}
        </p>
        <h2
          className="text-3xl leading-tight text-[var(--color-text-primary)] md:text-4xl"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
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
            icon={Apple}
            os="macOS"
            note="Apple Silicon or Intel · .dmg"
            href={url}
          />
          <DownloadCard
            icon={Monitor}
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
      </div>
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
    a: "Free during the private beta. The AI pipeline runs on Gemini 2.5 Flash, so operational costs are minimal (~$1.50/month for a 15-person team).",
  },
  {
    q: "Why isn't the macOS build signed?",
    a: "It will be — but the Apple Developer ID isn't free, and during the beta we'd rather invest that elsewhere. The release page walks you through bypassing Gatekeeper on first launch. Auto-updates work normally on Windows.",
  },
  {
    q: 'Where is data stored?',
    a: 'Supabase (Postgres + Storage + Auth), with row-level security so each team only sees its own resources. The desktop binary holds no secrets — all privileged work runs in Edge Functions.',
  },
  {
    q: 'Can I use it solo?',
    a: 'Technically yes (a team of one). But it shines with 5–20 people who already talk to each other — a mastermind, a study group, a small founding team.',
  },
] as const

function FAQ() {
  return (
    <section
      id="faq"
      className="border-t border-white/5 bg-[var(--color-surface)]/30"
    >
      <div className="mx-auto max-w-3xl px-6 py-24">
        <div className="text-center">
          <p
            className="mb-3 text-[10px] uppercase tracking-[0.2em] text-[var(--color-accent)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            FAQ
          </p>
          <h2
            className="text-3xl leading-tight text-[var(--color-text-primary)] md:text-4xl"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
          >
            Questions, before you commit.
          </h2>
        </div>
        <div className="mt-12 space-y-3">
          {FAQS.map((f) => (
            <details
              key={f.q}
              className="group rounded-xl border border-white/5 bg-white/[0.02] open:border-white/15 open:bg-white/[0.04]"
            >
              <summary
                className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-sm text-[var(--color-text-primary)]"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
              >
                {f.q}
                <ChevronDown className="h-4 w-4 shrink-0 text-[var(--color-text-muted)] transition-transform group-open:rotate-180" />
              </summary>
              <p className="border-t border-white/5 px-5 py-4 text-sm leading-relaxed text-[var(--color-text-muted)]">
                {f.a}
              </p>
            </details>
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
