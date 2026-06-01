/** Update this on every release. Anchors all download CTAs. */
export const LATEST_VERSION = '0.3.2'

export const RELEASE_BASE = 'https://github.com/Falconinium/thirdmind-releases'

export const releaseUrl = (v: string = LATEST_VERSION) =>
  `${RELEASE_BASE}/releases/tag/v${v}`

export const REPO_README = `${RELEASE_BASE}#readme`
