import { ImageResponse } from 'next/og'

/**
 * Social share preview (Open Graph + Twitter) generated at build time. Mirrors
 * the landing page's look — near-black background, a gold halo bleeding from
 * the top, the ◆ brand mark, and the hero line. Next wires this into both
 * `og:image` and `twitter:image` automatically via the file convention.
 */
export const alt =
  'Third Mind — Your circle already thinks together. Now it remembers together.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const BG = '#0a0a0d'
const ACCENT = '#c9a84c'
const ACCENT_HOVER = '#e8c66a'
const TEXT = '#f0ede8'
const MUTED = '#6b6867'
const AI = '#a78bfa'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: BG,
          padding: '72px 80px',
          position: 'relative',
        }}
      >
        {/* Gold halo entering from the top, same as the page-top glow. */}
        <div
          style={{
            position: 'absolute',
            top: -260,
            left: 0,
            right: 0,
            height: 600,
            background:
              'radial-gradient(ellipse 70% 100% at 50% 0%, rgba(201,168,76,0.22), rgba(201,168,76,0.05) 45%, transparent 70%)',
          }}
        />
        {/* Violet orb drifting in from the right, echoing the hero. */}
        <div
          style={{
            position: 'absolute',
            right: -120,
            top: 180,
            width: 420,
            height: 420,
            borderRadius: 420,
            background:
              'radial-gradient(circle, rgba(167,139,250,0.18), transparent 70%)',
          }}
        />

        {/* Brand row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          {/* ◆ drawn as a rotated square — avoids next/og failing to fetch a
              dynamic font for the diamond glyph. */}
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: ACCENT,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                background: '#000',
                transform: 'rotate(45deg)',
                borderRadius: 4,
              }}
            />
          </div>
          <div style={{ fontSize: 32, color: TEXT, fontWeight: 600 }}>
            Third Mind
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div
            style={{
              fontSize: 68,
              lineHeight: 1.05,
              color: TEXT,
              fontWeight: 700,
              letterSpacing: '-0.03em',
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            Your circle already thinks together. Now it{' '}
            <span style={{ color: ACCENT_HOVER, marginLeft: 14 }}>
              remembers
            </span>{' '}
            together.
          </div>
          <div style={{ fontSize: 30, color: MUTED, maxWidth: 880 }}>
            A private collective brain for masterminds — every link, video, and
            insight, curated and searchable.
          </div>
        </div>

        {/* Footer tag */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontSize: 22,
            color: MUTED,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 10,
              background: AI,
            }}
          />
          AI-native memory for private circles
        </div>
      </div>
    ),
    { ...size }
  )
}
