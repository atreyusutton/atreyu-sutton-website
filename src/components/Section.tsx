import type { ReactNode } from 'react'

/**
 * A page section on the drafting sheet: a left rail carrying the section
 * number and a mono label, a hairline rule across the top, content on the right.
 */
export function Section({
  number,
  label,
  title,
  children,
  aside,
}: {
  number: string
  label: string
  title?: string
  children: ReactNode
  aside?: ReactNode
}) {
  return (
    <section className="rule-top">
      <div className="mx-auto max-w-[var(--page-max)] px-5 py-12 md:px-8 md:py-16">
        <div className="grid gap-6 md:grid-cols-[var(--rail)_1fr] md:gap-10">
          <div className="flex items-baseline gap-3 md:block">
            <p className="label !text-accent">{number}</p>
            <p className="label md:mt-2">{label}</p>
            {aside ? <div className="hidden md:mt-6 md:block">{aside}</div> : null}
          </div>

          <div className="min-w-0">
            {title ? <h2 className="mb-8">{title}</h2> : null}
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}
