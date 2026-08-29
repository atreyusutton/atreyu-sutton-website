import Image from 'next/image'
import type { TimelineEntry } from '@/content/education'

/**
 * Education and experience as a dated list on a rule, with each institution's
 * mark next to it. Schools with no usable mark get a typeset monogram tile,
 * which is a deliberate treatment rather than a broken image.
 */
export function Timeline({ items }: { items: TimelineEntry[] }) {
  return (
    <ol className="border-t border-rule">
      {items.map((item) => (
        <li
          key={`${item.institution}-${item.start}`}
          className="grid grid-cols-[3rem_1fr] items-start gap-4 border-b border-rule py-5 sm:grid-cols-[3rem_9rem_1fr] sm:gap-6"
        >
          <div className="flex h-12 w-12 items-center justify-center border border-rule bg-ground-raised">
            {item.logo ? (
              <Image
                src={item.logo}
                alt={`${item.institution} logo`}
                width={128}
                height={128}
                sizes="48px"
                className="h-8 w-8 object-contain"
              />
            ) : (
              <span
                className="num text-[0.7rem] font-medium tracking-wider text-ink-muted"
                aria-hidden="true"
              >
                {item.monogram}
              </span>
            )}
          </div>

          <p className="label col-start-2 self-center sm:self-start sm:pt-1">
            {item.start}
            <span className="mx-1.5 opacity-50">to</span>
            {item.end}
          </p>

          <div className="col-span-2 min-w-0 sm:col-span-1 sm:col-start-3">
            <h3 className="text-[1.15rem] leading-snug">{item.title}</h3>
            <p className="mt-1 text-sm text-ink-muted">
              {item.institution}
              {item.location ? `, ${item.location}` : ''}
            </p>
            {item.note ? <p className="num mt-1 text-sm text-accent">{item.note}</p> : null}
          </div>
        </li>
      ))}
    </ol>
  )
}
