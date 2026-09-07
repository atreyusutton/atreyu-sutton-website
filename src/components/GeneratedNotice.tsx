import type { Media } from '@/content/types'

// Synthetic heroes all land in public/generated/ via scripts/generate-images.mjs,
// so the path is the only signal needed. Nothing else writes to that directory.
export function isGenerated(image: Media | null | undefined): boolean {
  return Boolean(image?.src.startsWith('/generated/'))
}

/**
 * Sits directly above a synthetic image and says so. A portfolio that shows an
 * AI image without labelling it is claiming work that was not done, so this
 * renders whether or not anyone is looking for it.
 */
export function GeneratedNotice({ short = false }: { short?: boolean }) {
  return (
    <p className="label !text-notice-ink bg-notice px-2.5 py-1.5">
      {short ? 'Generated stand-in' : 'Generated stand-in image. Not a photograph of the real build.'}
    </p>
  )
}
