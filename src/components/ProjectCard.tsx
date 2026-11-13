import Image from 'next/image'
import Link from 'next/link'
import { LANE_LABELS, type Project } from '@/content/types'
import { GeneratedNotice, isGenerated } from './GeneratedNotice'

/**
 * One photograph, the name, one line, a lane tag and a number if there is a
 * real one. A project with no photograph yet says so in the image slot. A stub
 * is the title alone, with no link, because there is no page behind it.
 */
export function ProjectCard({ project }: { project: Project }) {
  const number = project.headlineNumber.value.trim()
  const stub = project.stub === true

  return (
    <article className="group relative flex h-full flex-col border-t border-rule pt-4">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <p className="label">{LANE_LABELS[project.lane]}</p>
        {number ? (
          <p className="num text-sm text-ink">
            {number}
            <span className="label ml-1.5">{project.headlineNumber.unit}</span>
          </p>
        ) : null}
      </div>

      {project.hero ? (
        <>
          {isGenerated(project.hero) ? <GeneratedNotice short /> : null}
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-ground-sunken">
            <Image
              src={project.hero.src}
              alt={project.hero.alt}
              width={project.hero.width}
              height={project.hero.height}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        </>
      ) : (
        <div className="flex aspect-[4/3] w-full items-center justify-center bg-ground-sunken">
          <p className="label">{stub ? 'Details to come' : 'Image to come'}</p>
        </div>
      )}

      <h3 className="mt-5 text-[1.35rem]">
        {stub ? (
          project.title
        ) : (
          <Link href={`/projects/${project.slug}/`} className="after:absolute after:inset-0">
            {project.title}
          </Link>
        )}
      </h3>

      {project.oneLine.trim() ? (
        <p className="prose-measure mt-2 text-[0.98rem] text-ink-muted">{project.oneLine}</p>
      ) : null}

      {project.chips && project.chips.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.chips.map((chip) => (
            <li key={chip} className="label border border-rule px-2 py-1">
              {chip}
            </li>
          ))}
        </ul>
      ) : null}

      {/* Sits above the card-wide link so it stays clickable on its own. */}
      {project.site ? (
        <p className="relative z-10 mt-5">
          <a
            href={project.site.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex max-w-full flex-wrap items-baseline gap-x-3 gap-y-1 border border-rule-strong px-4 py-2.5 text-base hover:border-accent hover:text-accent"
          >
            <span className="label !text-inherit">Live site</span>
            <span className="num [overflow-wrap:anywhere]">{project.site.label}</span>
          </a>
        </p>
      ) : null}
    </article>
  )
}
