'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion'
import { FILTER_LANES, LANE_LABELS, type Lane, type Project } from '@/content/types'
import { ProjectCard } from './ProjectCard'
import { Section } from './Section'

type Filter = 'all' | Lane

// Fabrication work is what a mechanical recruiter is looking for, so the
// mechanical chip includes it rather than hiding it behind a fourth chip.
function matches(project: Project, filter: Filter) {
  if (filter === 'all') return true
  if (filter === 'mechanical') return project.lane === 'mechanical' || project.lane === 'fab'
  return project.lane === filter
}

export function WorkBrowser({
  featured,
  index,
  future = [],
}: {
  featured: Project[]
  index: Project[]
  future?: Project[]
}) {
  const [filter, setFilter] = useState<Filter>('all')
  const reduceMotion = useReducedMotion()

  const shownFeatured = useMemo(() => featured.filter((p) => matches(p, filter)), [featured, filter])
  const shownIndex = useMemo(() => index.filter((p) => matches(p, filter)), [index, filter])
  const shownFuture = useMemo(() => future.filter((p) => matches(p, filter)), [future, filter])

  const counts = useMemo(() => {
    const all = [...featured, ...index, ...future]
    return Object.fromEntries(
      FILTER_LANES.map((lane) => [lane.id, all.filter((p) => matches(p, lane.id)).length]),
    ) as Record<Filter, number>
  }, [featured, index, future])

  let section = 1
  const nextNumber = () => String(section++).padStart(2, '0')

  const transition = reduceMotion ? { duration: 0 } : { type: 'spring' as const, stiffness: 320, damping: 34 }

  return (
    <>
      <div className="rule-top">
        <div className="mx-auto max-w-[var(--page-max)] px-5 py-5 md:px-8">
          <div className="grid gap-4 md:grid-cols-[var(--rail)_1fr] md:gap-10">
            <p className="label">Filter</p>
            <div
              role="group"
              aria-label="Filter work by discipline"
              className="flex flex-wrap items-center gap-2"
            >
              {FILTER_LANES.map((lane) => {
                const active = filter === lane.id
                return (
                  <button
                    key={lane.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setFilter(lane.id)}
                    className={`label border px-3 py-1.5 transition-colors ${
                      active
                        ? 'border-accent bg-accent !text-accent-ink'
                        : 'border-rule hover:border-rule-strong hover:!text-ink'
                    }`}
                  >
                    {lane.label}
                    <span className="ml-2 opacity-60">{counts[lane.id]}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <LayoutGroup>
        {shownFeatured.length > 0 ? (
          <Section number={nextNumber()} label="Selected work">
            <motion.div layout className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-6">
              <AnimatePresence mode="popLayout" initial={false}>
                {shownFeatured.map((project, i) => {
                  // Asymmetric by design: the first of every three runs wide.
                  const wide = i % 3 === 0
                  return (
                    <motion.div
                      key={project.slug}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={transition}
                      className={wide ? 'lg:col-span-4' : 'lg:col-span-2'}
                    >
                      <ProjectCard project={project} size={wide ? 'wide' : 'regular'} />
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </motion.div>
          </Section>
        ) : null}

        <Section number={nextNumber()} label="Index" title="Everything else">
          <motion.ul layout className="border-t border-rule">
            <AnimatePresence mode="popLayout" initial={false}>
              {shownIndex.map((project) => (
                <motion.li
                  key={project.slug}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={transition}
                  className="border-b border-rule"
                >
                  <Link
                    href={`/projects/${project.slug}/`}
                    className="grid grid-cols-[4rem_1fr] items-center gap-4 py-3 transition-colors hover:bg-ground-raised sm:grid-cols-[4rem_1fr_9rem] md:gap-6"
                  >
                    {project.hero ? (
                      <Image
                        src={project.hero.src}
                        alt=""
                        width={project.hero.width}
                        height={project.hero.height}
                        sizes="64px"
                        className="aspect-square w-16 object-cover"
                      />
                    ) : (
                      <span className="aspect-square w-16 bg-ground-sunken" />
                    )}

                    <span className="min-w-0">
                      <span className="block font-[family-name:var(--font-display)] text-lg">
                        {project.title}
                      </span>
                      <span className="block truncate text-sm text-ink-muted">{project.oneLine}</span>
                    </span>

                    <span className="label hidden justify-self-end sm:block">
                      {LANE_LABELS[project.lane]}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>

          {shownIndex.length === 0 ? (
            <p className="label mt-6">No work in this lane yet.</p>
          ) : null}
        </Section>
        {shownFuture.length > 0 ? (
          <Section number={nextNumber()} label="Future" title="Still ahead">
            <p className="prose-measure mb-8 text-ink-muted">
              Planned, not built. Listed here so the list stays honest about what exists
              and what does not.
            </p>

            <motion.ul layout className="border-t border-rule">
              <AnimatePresence mode="popLayout" initial={false}>
                {shownFuture.map((project) => (
                  <motion.li
                    key={project.slug}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={transition}
                    className="border-b border-rule"
                  >
                    <Link
                      href={`/projects/${project.slug}/`}
                      className="grid grid-cols-[1fr] items-baseline gap-1 py-3 transition-colors hover:bg-ground-raised sm:grid-cols-[1fr_9rem] sm:gap-6"
                    >
                      <span className="min-w-0">
                        <span className="block font-[family-name:var(--font-display)] text-lg">
                          {project.title}
                        </span>
                        <span className="block truncate text-sm text-ink-muted">
                          {project.oneLine}
                        </span>
                      </span>

                      <span className="label hidden justify-self-end sm:block">
                        {LANE_LABELS[project.lane]}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </Section>
        ) : null}
      </LayoutGroup>
    </>
  )
}
