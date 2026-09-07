import Image from 'next/image'
import Link from 'next/link'
import { LANE_LABELS, type Project } from '@/content/types'
import { GeneratedNotice, isGenerated } from './GeneratedNotice'

/**
 * One photograph, the name, one line, a lane tag, one hard number.
 * `size` drives the asymmetric grid: wide cards get the taller crop.
 */
export function ProjectCard({ project, size = 'regular' }: { project: Project; size?: 'wide' | 'regular' }) {
  const number = project.headlineNumber.value.trim()

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
        <div
          className={`relative w-full overflow-hidden bg-ground-sunken ${
            size === 'wide' ? 'aspect-[16/10]' : 'aspect-[4/3]'
          }`}
        >
          <Image
            src={project.hero.src}
            alt={project.hero.alt}
            width={project.hero.width}
            height={project.hero.height}
            sizes={size === 'wide' ? '(max-width: 768px) 100vw, 60vw' : '(max-width: 768px) 100vw, 33vw'}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
        </>
      ) : null}

      <h3 className="mt-5 text-[1.35rem]">
        <Link href={`/projects/${project.slug}/`} className="after:absolute after:inset-0">
          {project.title}
        </Link>
      </h3>

      <p className="prose-measure mt-2 text-[0.98rem] text-ink-muted">{project.oneLine}</p>
    </article>
  )
}
