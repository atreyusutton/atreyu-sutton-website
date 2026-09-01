import Image from 'next/image'
import Link from 'next/link'
import { featuredProjects, indexProjects } from '@/content/loader'
import { WorkBrowser } from '@/components/WorkBrowser'

export default function HomePage() {
  const featured = featuredProjects()
  const index = indexProjects()

  return (
    <>
      <section className="mx-auto max-w-[var(--page-max)] px-5 pb-12 pt-8 md:px-8 md:pb-16 md:pt-12">
        <div className="grid gap-10 md:grid-cols-[var(--rail)_1fr] md:gap-10">
          <p className="label">01 / Thesis</p>

          <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-start lg:gap-16">
            <div>
              <h1>
                I design the part, machine it, and write the firmware that runs it.
              </h1>
              <p className="prose-measure mt-6 text-lg text-ink-muted">
                Atreyu Sutton. Engineering graduate student at the ATLAS Institute in Boulder,
                Colorado, working across mechanical design, software and hardware.
              </p>

              <nav aria-label="Start here" className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-3">
                <Link href="/projects/" className="link-underline">
                  Work
                </Link>
                <Link href="/about/" className="link-underline">
                  About
                </Link>
                <span className="flex items-baseline gap-2">
                  <a href="/resume.pdf" className="link-underline">
                    Resume
                  </a>
                  <span className="label">PDF</span>
                </span>
              </nav>
            </div>

            <figure className="relative">
              <Image
                src="/home.jpeg"
                alt="Atreyu in a welding helmet and jacket in the shop, smoke still rising from the work in front of him"
                width={666}
                height={1000}
                priority
                sizes="320px"
                className="mx-auto w-full max-w-[320px] lg:max-w-none"
              />
            </figure>
          </div>
        </div>
      </section>

      <WorkBrowser featured={featured} index={index} />

    </>
  )
}
