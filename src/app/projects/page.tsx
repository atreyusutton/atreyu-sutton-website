import type { Metadata } from 'next'
import { featuredProjects, indexProjects } from '@/content/loader'
import { WorkBrowser } from '@/components/WorkBrowser'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Every project, filterable by discipline.',
}

export default function ProjectsPage() {
  return (
    <>
      <section className="mx-auto max-w-[var(--page-max)] px-5 pb-10 pt-12 md:px-8 md:pb-14 md:pt-16">
        <div className="grid gap-6 md:grid-cols-[var(--rail)_1fr] md:gap-10">
          <p className="label">01 / Work</p>
          <div>
            <h1 className="text-[clamp(2.25rem,6vw,3.75rem)]">Everything I have built</h1>
            <p className="prose-measure mt-6 text-lg text-ink-muted">
              Filter by discipline. Mechanical includes fabrication.
            </p>
          </div>
        </div>
      </section>

      <WorkBrowser featured={featuredProjects()} index={indexProjects()} />
    </>
  )
}
