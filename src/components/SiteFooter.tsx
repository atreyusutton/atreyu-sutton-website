import Link from 'next/link'

const contact = [
  { label: 'Email', href: 'mailto:me@atreyusutton.com', text: 'me@atreyusutton.com' },
  { label: 'GitHub', href: 'https://github.com/atreyusutton', text: 'github.com/atreyusutton' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/atreyusutton/',
    text: 'linkedin.com/in/atreyusutton',
  },
  { label: 'Resume', href: '/resume.pdf', text: 'resume.pdf' },
]

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-rule">
      <div className="mx-auto max-w-[var(--page-max)] px-5 py-12 md:px-8">
        <div className="grid gap-8 md:grid-cols-[var(--rail)_1fr]">
          <p className="label">Contact</p>
          <div>
            <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {contact.map((item) => (
                <div key={item.label} className="flex flex-wrap items-baseline gap-x-3">
                  <dt className="label w-20 shrink-0">{item.label}</dt>
                  <dd className="num text-sm">
                    <a
                      href={item.href}
                      className="link-underline"
                      {...(item.href.startsWith('http')
                        ? { target: '_blank', rel: 'noreferrer' }
                        : {})}
                    >
                      {item.text}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>

            <p className="label mt-10">
              Boulder, Colorado.{' '}
              <Link href="/projects/" className="link-underline">
                All work
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
