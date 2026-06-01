import type { CSSProperties } from 'react'

type IconProps = {
  className?: string
  style?: CSSProperties
}

/**
 * Apple wordmark logo. The standard mono silhouette — no leaf-with-stem
 * shorthand like the lucide-react "Apple" icon, which doesn't read as the
 * Apple brand. Path traced from the public Apple identity guidelines.
 */
export function AppleLogo({ className, style }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
      aria-hidden
    >
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  )
}

/**
 * Windows 11 four-pane logo (true brand mark). Replaces the generic
 * lucide "Monitor" so each download CTA wears the real OS identity.
 */
export function WindowsLogo({ className, style }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
      aria-hidden
    >
      <path d="M3 5.46 10.5 4.44v6.94H3V5.46Zm0 13.08v-5.92h7.5v6.94L3 18.54Zm8.5-7.16V4.31L21 3v8.38h-9.5Zm0 1.16H21V21l-9.5-1.31v-7.15Z" />
    </svg>
  )
}
