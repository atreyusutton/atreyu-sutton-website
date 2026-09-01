'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './ThemeToggle'

export function SiteHeader() {
  const pathname = usePathname()

  const links = [
    { href: '/projects/', label: 'Work' },
    { href: '/about/', label: 'About' },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-ground/90 backdrop-blur">
      <div className="mx-auto flex max-w-[var(--page-max)] items-center justify-between gap-4 px-5 py-3 md:px-8">
        <Link href="/" className="label !text-ink hover:!text-accent">
          Atreyu Sutton
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-1 sm:gap-2">
          {links.map((link) => {
            const active = pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`label px-2 py-1 transition-colors hover:!text-ink ${
                  active ? '!text-ink' : ''
                }`}
              >
                {link.label}
              </Link>
            )
          })}
          <a
            href="/resume.pdf"
            className="label hidden px-2 py-1 transition-colors hover:!text-ink sm:inline-block"
          >
            Resume
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
