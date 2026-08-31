import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { featuredProjects, indexProjects, projectBySlug, publishedProjects } from '@/content/loader'
import { answerFor, describedImages, LANE_LABELS, STATUS_LABELS } from '@/content/types'
import { SpecTable } from '@/components/SpecTable'
import { Section } from '@/components/Section'

export function generateStaticParams() {
  return publishedProjects().map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = projectBySlug(slug)
  if (!project) return {}

  return {
    title: project.title,
    description: project.oneLine,
    openGraph: {
      title: project.title,
      description: project.oneLine,
      images: project.hero ? [{ url: project.hero.src }] : undefined,
    },
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projectBySlug(slug)
  if (!project) notFound()

  const constraint = answerFor(project, 'constraint')
  const decision = answerFor(project, 'decision')
  const evidence = answerFor(project, 'number')
  const broke = answerFor(project, 'broke')
  const differently = answerFor(project, 'differently')
  const gallery = describedImages(project.gallery)

  const specs = {
    Lane: LANE_LABELS[project.lane],
    Status: STATUS_LABELS[project.status],
    ...project.specs,
  }

  // Sections are numbered as they appear, so an omitted section never leaves a gap.
  let n = 1
  const next = () => String(n++).padStart(2, '0')

  const ordered = [...featuredProjects(), ...indexProjects()]
  const position = ordered.findIndex((p) => p.slug === project.slug)
  const nextProject = position >= 0 ? ordered[(position + 1) % ordered.length] : null

  return (
    <article>
      {project.hero ? (
        <div className="mx-auto max-w-[var(--page-max)] px-5 pt-8 md:px-8 md:pt-10">
          <figure>
            {/* Scaled by height with width auto, so the whole frame stays intact
                rather than being cropped to fill the column. */}
            <Image
              src={project.hero.src}
              alt={project.hero.alt}
              width={project.hero.width}
              height={project.hero.height}
              priority
              sizes="(max-width: 84rem) 100vw, 84rem"
              className="mx-auto max-h-[68vh] w-auto border border-rule"
            />
          </figure>
        </div>
      ) : null}

      <div className="mx-auto max-w-[var(--page-max)] px-5 py-12 md:px-8 md:py-16">
        <div className="grid gap-6 md:grid-cols-[var(--rail)_1fr] md:gap-10">
          <p className="label">{LANE_LABELS[project.lane]}</p>
          <div>
            <h1 className="text-[clamp(2rem,5vw,3.25rem)]">{project.title}</h1>
            <p className="prose-measure mt-6 text-xl text-ink-muted">{project.oneLine}</p>
          </div>
        </div>
      </div>

      <Section number={next()} label="Spec">
        <SpecTable specs={specs} />

        {project.headlineNumber.value.trim() ? (
          <p className="num mt-8 text-4xl">
            {project.headlineNumber.value}
            <span className="label ml-3">{project.headlineNumber.unit}</span>
          </p>
        ) : null}

        {project.links.length > 0 ? (
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {project.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline num text-sm"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </Section>

      {constraint ? (
        <Section number={next()} label="Constraint" title="What made it hard">
          <div className="prose-measure text-lg">
            {constraint.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </Section>
      ) : null}

      {decision ? (
        <Section number={next()} label="Decision" title="What I chose, and what I rejected">
          <div className="prose-measure text-lg">
            {decision.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </Section>
      ) : null}

      {evidence || gallery.length > 0 || project.video ? (
        <Section number={next()} label="Evidence">
          {evidence ? <p className="prose-measure num text-lg">{evidence}</p> : null}

          {project.video ? (
            <video
              controls
              preload="none"
              poster={project.video.poster}
              className="mt-8 w-full border border-rule"
            >
              <source src={project.video.src} type="video/mp4" />
            </video>
          ) : null}

          {gallery.length > 0 ? (
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              {gallery.map((image) => (
                <figure key={image.src}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes="(max-width: 640px) 100vw, 45vw"
                    className="w-full object-cover"
                  />
                  {image.caption ? (
                    <figcaption className="label mt-2">{image.caption}</figcaption>
                  ) : null}
                </figure>
              ))}
            </div>
          ) : null}
        </Section>
      ) : null}

      {broke ? (
        <Section number={next()} label="Failure" title="What broke">
          <div className="prose-measure text-lg">
            {broke.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </Section>
      ) : null}

      {differently ? (
        <Section number={next()} label="Hindsight" title="What I would do differently">
          <p className="prose-measure text-lg">{differently}</p>
        </Section>
      ) : null}

      {nextProject ? (
        <Section number={next()} label="Next">
          <Link href={`/projects/${nextProject.slug}/`} className="group block">
            <p className="label">Next project</p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-3xl group-hover:text-accent">
              {nextProject.title}
            </p>
          </Link>
        </Section>
      ) : null}
    </article>
  )
}
