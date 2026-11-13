import Image from 'next/image'
import Link from 'next/link'
import { featuredProjects, sustainableProjects } from '@/content/loader'
import { about } from '@/content/about'
import { ProjectCard } from '@/components/ProjectCard'
import { Section } from '@/components/Section'
import { SpecTable } from '@/components/SpecTable'

export default function HomePage() {
  const selected = featuredProjects()
  const sustainable = sustainableProjects()

  return (
    <>
      <section className="mx-auto max-w-[var(--page-max)] px-5 pb-12 pt-8 md:px-8 md:pb-16 md:pt-12">
        <div className="grid gap-10 md:grid-cols-[var(--rail)_1fr] md:gap-10">
          <p className="label">01 / Intro</p>

          <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-start lg:gap-16">
            <div>
              <p className="label !text-accent">{about.applyingFor}</p>
              <h1 className="mt-4">{about.headline}</h1>
              <p className="prose-measure mt-6 text-lg text-ink-muted">{about.intro}</p>

              <div className="mt-8 max-w-[44rem]">
                <SpecTable specs={about.atAGlance} />
              </div>

              <nav
                aria-label="Start here"
                className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-3"
              >
                <Link href="/#work" className="link-underline">
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
                <a
                  href="https://www.linkedin.com/in/atreyusutton/"
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline"
                >
                  LinkedIn
                </a>
              </nav>
            </div>

            <figure className="relative">
              <Image
                src={about.portrait.src}
                alt={about.portrait.alt}
                width={about.portrait.width}
                height={about.portrait.height}
                priority
                sizes="320px"
                className="mx-auto w-full max-w-[320px] lg:max-w-none"
              />
            </figure>
          </div>
        </div>
      </section>

      <div id="work" className="scroll-mt-14">
        <Section number="02" label="Selected work" title="Selected work">
          <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {selected.map((project) => (
              <li key={project.slug}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        </Section>
      </div>

      {sustainable.length > 0 ? (
        <Section number="03" label="Sustainable interests" title="Sustainable interests">
          <p className="prose-measure mb-8 text-ink-muted">{about.sustainableIntro}</p>
          <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {sustainable.map((project) => (
              <li key={project.slug}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}
    </>
  )
}
