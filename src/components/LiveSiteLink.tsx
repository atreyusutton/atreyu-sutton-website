import type { Project } from '@/content/types'

/**
 * The link out to a project's running site. Filled with the accent so it is
 * the first thing read after the title, on the card and on the project page.
 */
export function LiveSiteLink({
  site,
  size,
}: {
  site: NonNullable<Project['site']>
  size: 'card' | 'page'
}) {
  const sizing =
    size === 'page'
      ? 'gap-x-4 px-6 py-4 text-xl'
      : 'w-full justify-between gap-x-3 px-4 py-3 text-base'

  return (
    <a
      href={site.href}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open the live site, ${site.label}, in a new tab`}
      className={`inline-flex max-w-full items-center border-2 border-accent bg-accent font-semibold text-accent-ink transition-colors hover:bg-transparent hover:text-accent ${sizing}`}
    >
      <span className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="label !text-inherit">Live site</span>
        <span className="num [overflow-wrap:anywhere]">{site.label}</span>
      </span>
      <span aria-hidden="true" className="num shrink-0">
        &#8599;
      </span>
    </a>
  )
}
